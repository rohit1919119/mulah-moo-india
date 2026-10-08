/**
 * A snapshot of Helium's talent vocabulary, and the live fetch that supersedes it.
 *
 * ── WHY BOTH ───────────────────────────────────────────────────────────────
 * The live list is the source of truth: adding a specialisation in Helium's
 * admin screen should reach this form without a redeploy. But this form is the
 * TOP OF THE FUNNEL, and an applicant who arrives while team.mulahmoo.com is
 * slow or down must still be able to apply. So the fetch has a timeout and
 * falls back to the snapshot.
 *
 * Failing OPEN is the right direction here and is the opposite of what Helium
 * does for auth: the cost of a stale option list is one specialisation missing
 * for a few minutes; the cost of failing closed is a lost applicant.
 *
 * ── EACH POOL'S OWN QUESTIONS ──────────────────────────────────────────────
 * Since Helium 099 every pool carries a `form`: the questions written for that
 * pool alone (a brand manager is never asked about editing software), with its
 * own options already filled in. This form draws whatever the pool declares
 * and posts the answers keyed by question key; Helium keeps only the keys that
 * pool declares. Nothing about a craft is hard-coded on this side.
 *
 * ── THE SNAPSHOT IS GENERATED ──────────────────────────────────────────────
 * `talent-vocab.snapshot.json` is written by Helium's `pnpm website:snapshot`
 * from the same function that serves /api/talent-vocabulary. Do not hand-edit
 * it; regenerate it.
 */
import snapshot from "./talent-vocab.snapshot.json";

export type VocabOption = { slug: string; label: string };

export type FormInput = "choice" | "text" | "longtext" | "number" | "url" | "links";
export type FormQuestion = {
  key: string;
  prompt: string;
  hint: string | null;
  placeholder: string | null;
  required: boolean;
  input: FormInput;
  multiple: boolean;
  options: { value: string; label: string }[];
};
export type PoolForm = {
  steps: { title: string; hint: string | null; questions: FormQuestion[] }[];
  work: { label: string; placeholder: string; missing: string; required: boolean };
};

export type VocabDiscipline = {
  slug: string;
  label: string;
  desc: string;
  specialisations: VocabOption[];
  form: PoolForm;
};

type Served = {
  slug?: string;
  label?: string;
  hint?: string;
  specialisations?: { slug?: string; label?: string }[];
  form?: PoolForm;
};

/** A served pool, made safe to draw — or null if it cannot be. */
function toDiscipline(d: Served): VocabDiscipline | null {
  if (!d?.slug || !d.label) return null;
  const form = d.form;
  if (!form || !Array.isArray(form.steps) || !form.work) return null;
  const steps = form.steps
    .map((s) => ({
      title: String(s?.title ?? ""),
      hint: s?.hint ?? null,
      questions: (Array.isArray(s?.questions) ? s.questions : []).filter(
        (q): q is FormQuestion =>
          Boolean(q?.key && q?.prompt && q?.input) &&
          (q.input !== "choice" || (Array.isArray(q.options) && q.options.length > 0)),
      ),
    }))
    .filter((s) => s.title && s.questions.length > 0);
  if (steps.length === 0) return null;
  return {
    slug: d.slug,
    label: d.label,
    desc: d.hint ?? "",
    specialisations: (d.specialisations ?? [])
      .filter((s): s is VocabOption => Boolean(s?.slug && s?.label))
      .map((s) => ({ slug: s.slug, label: s.label })),
    form: { steps, work: form.work },
  };
}

export const VOCAB_SNAPSHOT: VocabDiscipline[] = (snapshot.disciplines as Served[])
  .map(toDiscipline)
  .filter((d): d is VocabDiscipline => d !== null);

// 2026-10-01: clean non-overlapping steps with a 3–4 option, matching Helium's
// lib/talent-intake.ts EXPERIENCE_BANDS (which still understands the retired
// "2–3 yrs" / "4–6 yrs" from earlier applications).
export const EXPERIENCE_BANDS: string[] = ["0–1 yr", "1–2 yrs", "3–4 yrs", "5–6 yrs", "7–10 yrs", "10+ yrs"];

/**
 * Helium's own wording. The form used to submit its internal `val`
 * ("Full-time", "Open to all"); Helium's vocabulary is "Full-time role" and
 * "Open to anything", and the conversion step maps on those exact strings —
 * so two of the four arrived unmapped. These are what Helium is sent.
 */
export const OPPORTUNITY_LABELS: string[] = ["Full-time role", "Freelance / contract", "Part-time", "Open to anything"];

/**
 * Where Helium lives.
 *
 * Overridable so a developer can point at a local Helium and actually exercise
 * the live fetch. Without that the fetch silently falls back to the snapshot on
 * every machine but production — which renders identically and therefore proves
 * nothing. Production needs no variable set: the default is the real host.
 *
 *   VITE_HELIUM_API=http://localhost:3000 npm run dev
 */
export const HELIUM_API =
  import.meta.env.VITE_HELIUM_API ?? "https://team.mulahmoo.com";
export const VOCABULARY_URL = `${HELIUM_API}/api/talent-vocabulary`;
export const APPLICATIONS_URL = `${HELIUM_API}/api/talent-applications`;
/**
 * Asks Helium for somewhere to put a résumé. Answers `{ ok, path, signedUrl }`:
 * the browser PUTs the file straight to `signedUrl` (it never passes through
 * Helium), then sends `path` as `resumePath` with the application.
 */
export const RESUME_UPLOAD_URL = `${APPLICATIONS_URL}/resume-upload`;

/** What Helium accepts — keep in step with its lib/resume.ts. */
export const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const RESUME_ACCEPT = [...RESUME_TYPES, ".pdf", ".doc", ".docx"].join(",");
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

/**
 * Fetch the live vocabulary, or fall back to the snapshot.
 *
 * Bounded by an AbortController rather than left to the browser's own timeout,
 * which can be tens of seconds — long enough that a visitor gives up on the
 * first question. Two seconds is past a normal round trip and short enough that
 * a slow answer is indistinguishable from a fast fallback.
 *
 * Any failure at all — network, timeout, a 500, a body that is not the shape we
 * expect — returns the snapshot. There is deliberately no error surfaced to the
 * applicant: they cannot act on it, and a form that apologises for something
 * invisible reads as broken.
 */
export async function loadVocabulary(timeoutMs = 2000): Promise<VocabDiscipline[]> {
  const control = new AbortController();
  const timer = setTimeout(() => control.abort(), timeoutMs);
  try {
    const response = await fetch(VOCABULARY_URL, { signal: control.signal });
    if (!response.ok) return VOCAB_SNAPSHOT;
    const body: unknown = await response.json();
    const live = (body as { disciplines?: unknown })?.disciplines;
    if (!Array.isArray(live) || live.length === 0) return VOCAB_SNAPSHOT;

    // A pool whose form cannot be drawn is dropped. A live answer with no
    // `form` at all (a Helium older than 099) drops every pool and falls back
    // to the snapshot below.
    const merged = (live as Served[])
      .map(toDiscipline)
      .filter((d): d is VocabDiscipline => d !== null);

    return merged.length > 0 ? merged : VOCAB_SNAPSHOT;
  } catch {
    return VOCAB_SNAPSHOT;
  } finally {
    clearTimeout(timer);
  }
}
