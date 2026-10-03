import { createServerFn } from "@tanstack/react-start";
import { BRIEFS, CLIENTS, SHEET_URL } from "@/comic/data";
import type { IconName } from "@/comic/Icon";

/**
 * Live content for the landing page, edited in the Google Sheet rather than in
 * code. The same Apps Script deployment that receives form posts also answers
 * GET with the "briefs" and "clients" tabs as JSON.
 *
 * Three things this must never do: block the page on a slow Google response,
 * render an empty carousel, or 500 because someone typed in the wrong cell.
 * Hence the timeout, the per-row validation, and the fallback to the constants
 * in data.ts whenever the sheet cannot be trusted.
 */

export type Brief = { client: string; role: string; icon: string; pay: string; tint: string };
export type Client = { name: string; img: string; url: string };
export type Content = { briefs: Brief[]; clients: Client[]; source: "sheet" | "fallback" };

// Named colours so the sheet holds "sun", not "#F5D547".
const TINTS: Record<string, string> = {
  sun: "#F5D547", rose: "#FF5CA8", mint: "#7BE0AD",
  sky: "#6FA8F5", purple: "#8856F2", deep: "#6D3FD1",
};
// Nobody editing a spreadsheet should have to remember we call pink "rose".
const TINT_ALIASES: Record<string, string> = {
  pink: "rose", red: "rose", magenta: "rose",
  yellow: "sun", gold: "sun", amber: "sun",
  green: "mint", teal: "mint",
  blue: "sky", cyan: "sky",
  violet: "purple", lilac: "purple", lavender: "purple",
};
const TINT_CYCLE = ["sun", "purple", "rose", "mint", "sky", "deep"];

/**
 * Pay renders exactly as typed when it carries a currency symbol, so "₹2,300"
 * stays rupees. A bare number becomes dollars and gets grouped, so "2400" reads
 * as $2,400 rather than $2400.
 *
 * Dollars are the default because Sheets swallows the symbol: a cell formatted
 * as currency hands back the bare number, so "$2,400" typed into the sheet
 * arrives here as "2400". Most briefs are US, UK or UAE clients paying in
 * dollars, so that is the safer assumption.
 */
function formatPay(raw: string): string {
  if (/^[₹$€£]/.test(raw)) return raw;
  const digits = raw.replace(/[,\s]/g, "");
  if (/^\d+$/.test(digits)) return `$${Number(digits).toLocaleString("en-US")}`;
  return raw;
}

const ICONS: IconName[] = [
  "bolt", "globe", "star", "film", "brush",
  "target", "chart", "pen", "mic", "cam",
];
const ICON_CYCLE: IconName[] = ["film", "chart", "mic", "target", "brush", "pen"];

// 60s, not 5 minutes: this is content someone edits and then immediately
// reloads to check. A long TTL reads as "the site is broken".
const TTL_MS = 60 * 1000;
const TIMEOUT_MS = 4000;

let cached: { at: number; value: Content } | null = null;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim());

function toBriefs(rows: unknown): Brief[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((raw, i) => {
      const r = (raw ?? {}) as Record<string, unknown>;
      const client = str(r.client);
      const role = str(r.role);
      const pay = str(r.pay);
      // a brief without all three reads as broken on the page, so drop it
      if (!client || !role || !pay) return null;

      const icon = str(r.icon).toLowerCase();
      const named = str(r.colour || r.color).toLowerCase();
      const tint = TINTS[named] ?? TINTS[TINT_ALIASES[named]];
      return {
        client,
        role,
        pay: formatPay(pay),
        icon: (ICONS as string[]).includes(icon) ? icon : ICON_CYCLE[i % ICON_CYCLE.length],
        tint: tint ?? TINTS[TINT_CYCLE[i % TINT_CYCLE.length]],
      } satisfies Brief;
    })
    .filter((b): b is Brief => b !== null);
}

function toClients(rows: unknown): Client[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((raw) => {
      const r = (raw ?? {}) as Record<string, unknown>;
      const name = str(r.name);
      if (!name) return null;
      const src = str(r.image || r.slug);
      // accept a full URL, a filename, a bare slug, or nothing at all
      const img = /^https?:\/\//i.test(src)
        ? src
        : `/creators/${
            src.replace(/\.(jpg|jpeg|png|webp)$/i, "") ||
            name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
          }.jpg`;
      return { name, img, url: str(r.link || r.url) } satisfies Client;
    })
    .filter((c): c is Client => c !== null);
}

const FALLBACK: Content = {
  briefs: BRIEFS.map((b) => ({ ...b })) as Brief[],
  clients: CLIENTS.map((c) => ({ name: c.name, img: `/creators/${c.slug}.jpg`, url: c.url })),
  source: "fallback",
};

export const getContent = createServerFn({ method: "GET" }).handler(async (): Promise<Content> => {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.value;

  try {
    const res = await fetch(SHEET_URL, {
      // AbortSignal caps how long a page render can wait on Google
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Accept: "application/json" },
      // Cloudflare edge cache; ignored anywhere that does not understand it
      cf: { cacheTtl: 60, cacheEverything: true },
    } as RequestInit);
    if (!res.ok) throw new Error(`sheet responded ${res.status}`);

    const raw = (await res.json()) as { briefs?: unknown; clients?: unknown };
    const briefs = toBriefs(raw.briefs);
    const clients = toClients(raw.clients);

    // An empty section looks broken, so each falls back independently. Editing
    // the briefs tab can never blank out the client strip.
    const value: Content = {
      briefs: briefs.length ? briefs : FALLBACK.briefs,
      clients: clients.length ? clients : FALLBACK.clients,
      source: briefs.length || clients.length ? "sheet" : "fallback",
    };
    cached = { at: Date.now(), value };
    return value;
  } catch {
    // Never take the page down because the sheet is slow, private or malformed.
    // Serve the last good copy if there is one, otherwise the constants.
    return cached?.value ?? FALLBACK;
  }
});
