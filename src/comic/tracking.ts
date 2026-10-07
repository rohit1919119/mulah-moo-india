import { useEffect } from "react";
import { GA_MEASUREMENT_ID, SHEET_URL } from "@/comic/data";

/**
 * Click tracking for outreach pages such as /work.
 *
 * Every page view and every click on a link or button is sent to the forms
 * Apps Script as form_type "work-click", which writes one row per event to the
 * "work-clicks" tab. Each row carries the campaign tags from the link you sent
 * (?ref=, ?c=, utm_*), so you can see which outreach drove which clicks.
 *
 * If GA_MEASUREMENT_ID is set in data.ts, the same events also go to Google
 * Analytics 4 as "page_view" and "cta_click".
 *
 * sendBeacon is used so a click that navigates away is still recorded.
 */

type Tags = { ref: string; campaign: string; source: string; medium: string; query: string };

function readTags(): Tags {
  const q = new URLSearchParams(window.location.search);
  return {
    ref: q.get("ref") ?? q.get("p") ?? "",
    campaign: q.get("utm_campaign") ?? q.get("c") ?? "",
    source: q.get("utm_source") ?? q.get("s") ?? "",
    medium: q.get("utm_medium") ?? "",
    query: window.location.search.slice(1),
  };
}

function sessionId(): string {
  try {
    const k = "mm-sid";
    let v = sessionStorage.getItem(k);
    if (!v) { v = Math.random().toString(36).slice(2, 10); sessionStorage.setItem(k, v); }
    return v;
  } catch {
    return "nostorage";
  }
}

function send(page: string, row: Record<string, string>) {
  const body = JSON.stringify({
    form_type: "work-click",
    page,
    session: sessionId(),
    referrer: document.referrer,
    submitted_at: new Date().toISOString(),
    ...readTags(),
    ...row,
  });
  try {
    // text/plain keeps this a simple request that Apps Script accepts
    const ok = navigator.sendBeacon?.(SHEET_URL, new Blob([body], { type: "text/plain" }));
    if (ok) return;
  } catch { /* fall through */ }
  fetch(SHEET_URL, { method: "POST", mode: "no-cors", keepalive: true, body }).catch(() => {});
}

type Gtag = (...args: unknown[]) => void;
function loadGa(): Gtag | null {
  if (!GA_MEASUREMENT_ID) return null;
  const w = window as unknown as { dataLayer: unknown[]; gtag?: Gtag };
  if (!w.gtag) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(s);
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); } as Gtag;
    w.gtag("js", new Date());
    const t = readTags();
    w.gtag("config", GA_MEASUREMENT_ID, {
      campaign_name: t.campaign || undefined,
      campaign_source: t.source || undefined,
      outreach_ref: t.ref || undefined,
    });
  }
  return w.gtag;
}

/** A short, readable name for what was clicked. */
function labelOf(el: HTMLElement): string {
  const own = el.getAttribute("aria-label") || el.textContent || "";
  return own.replace(/\s+/g, " ").trim().slice(0, 80) || el.tagName.toLowerCase();
}

export function useClickTracking(page: string | null) {
  useEffect(() => {
    if (!page) return;
    const gtag = loadGa();
    send(page, { event: "view", label: "", href: "", section: "" });

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button");
      if (!el) return;
      const label = labelOf(el);
      const href = el.getAttribute("href") ?? "";
      const section = el.closest("section, header, footer, [role=dialog]");
      const where = section?.id || section?.getAttribute("aria-label") || section?.tagName.toLowerCase() || "";
      send(page, { event: "click", label, href, section: where });
      gtag?.("event", "cta_click", { button_label: label, link_url: href, page_section: where, outreach_ref: readTags().ref || undefined });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [page]);
}
