import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { COMIC_CSS } from "@/comic/styles";
import { Icon, type IconName } from "@/comic/Icon";
import { Logo } from "@/comic/Logo";
import {
  EXPERIENCE, OPPORTUNITY,
  SHEET_URL, TOTAL_STEPS, FONT_LINKS, SOCIALS, LEGAL_NAME,
} from "@/comic/data";

export const Route = createFileRoute("/moo-talent-form")({
  head: () => ({
    meta: [
      { title: "Join the Moo Talent Network" },
      { name: "description", content: "Apply to join Mulah Moo's creative talent network." },
    ],
    links: FONT_LINKS,
  }),
  component: MooTalentForm,
});

import {
  APPLICATIONS_URL,
  RESUME_ACCEPT,
  RESUME_MAX_BYTES,
  RESUME_TYPES,
  RESUME_UPLOAD_URL,
  loadVocabulary,
  VOCAB_SNAPSHOT,
  type VocabDiscipline,
} from "@/comic/talent-vocab";

/**
 * The email rule Helium applies, copied from the Zod version it runs
 * (zod v4 `z.string().email()`). Keep the two identical: an address this form
 * accepts and Helium refuses lands in the Sheet and nowhere else.
 */
const HELIUM_EMAIL =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;

type Data = {
  role: string; subrole: string[];
  name: string; email: string; phone: string; city: string; linkedin: string;
  experience: string; opportunity: string[]; portfolio: string;
  referredBy: string; note: string;
};

const EMPTY: Data = {
  role: "", subrole: [],
  name: "", email: "", phone: "", city: "", linkedin: "",
  experience: "", opportunity: [], portfolio: "",
  referredBy: "", note: "",
};

const QUESTIONS = [
  "What kind of creative work do you do?",
  "What's your specific focus?",
  "Let's start with the basics.",
  "How many years have you been creating professionally?",
  "What kind of opportunity are you open to?",
  "Where can we see your work?",
  "One last look before we send it off.",
];

type Resume =
  | { state: "none" }
  | { state: "busy"; name: string }
  | { state: "done"; name: string; path: string };

function MooTalentForm() {
  const [step, setStep] = useState(0);
  // The résumé is uploaded the moment it is picked — straight to storage, on
  // a URL Helium signs — so only its path travels with the application.
  // Optional: nobody is held up for not having one.
  const [resume, setResume] = useState<Resume>({ state: "none" });
  const fileInput = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<Data>(EMPTY);
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  // Starts as the bundled snapshot so the first paint has real options, then
  // swaps to the live list. Loaded ONCE, on mount: refreshing mid-form could
  // remove a specialty the applicant has already ticked, and the mapping at
  // submit would then silently drop it.
  const [vocab, setVocab] = useState<VocabDiscipline[]>(VOCAB_SNAPSHOT);
  useEffect(() => {
    let live = true;
    loadVocabulary().then((v) => { if (live) setVocab(v); });
    return () => { live = false; };
  }, []);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setData((d) => ({ ...d, [k]: v }));
  const discipline = useMemo(
    () => vocab.find((d) => d.label === data.role) ?? null,
    [vocab, data.role],
  );
  const subroleOptions = useMemo(
    () => discipline?.specialisations ?? [],
    [discipline],
  );

  /** Returns an error message for the current step, or "" when it may advance. */
  function validate(): string {
    if (step === 0 && !data.role) return "Please pick one to continue.";
    if (step === 1 && data.subrole.length === 0) return "Pick at least one specialty.";
    if (step === 2) {
      // These three match what Helium accepts (see HELIUM_EMAIL below). The
      // form used to check only for an "@", so an address like "name@gmail"
      // passed here, reached the Sheet, and was silently refused by Helium.
      if (data.name.trim().length < 2) return "Name is required.";
      if (!HELIUM_EMAIL.test(data.email.trim())) return "That email does not look right — check it and try again.";
      if (data.phone.trim().length < 6) return "Contact number is required.";
      if (!data.city.trim()) return "City is required.";
    }
    if (step === 3 && !data.experience) return "Please select your experience level.";
    if (step === 4 && data.opportunity.length === 0) return "Pick at least one.";
    if (step === 5 && !data.portfolio.trim()) return "Please add a portfolio or work link.";
    if (step === 5 && resume.state === "busy") return "Hang on — your résumé is still uploading.";
    return "";
  }

  function next() {
    const message = validate();
    if (message) { setErr(message); return; }
    setErr("");
    if (step === TOTAL_STEPS - 1) { submit(); return; }
    setStep((s) => s + 1);
  }

  async function pickResume(file: File) {
    setErr("");
    if (!RESUME_TYPES.includes(file.type)) return setErr("Résumés must be a PDF or a Word document.");
    if (file.size > RESUME_MAX_BYTES) return setErr("That file is over 5MB. Try exporting it again at a smaller size.");
    if (file.size === 0) return setErr("That file is empty.");
    setResume({ state: "busy", name: file.name });
    try {
      const ask = await fetch(RESUME_UPLOAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, type: file.type, size: file.size }),
      });
      const ticket = (await ask.json()) as { ok: boolean; path?: string; signedUrl?: string; error?: string };
      if (!ticket.ok || !ticket.path || !ticket.signedUrl) throw new Error(ticket.error || "Could not start the upload.");
      const put = await fetch(ticket.signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type, "x-upsert": "false" },
        body: file,
      });
      if (!put.ok) throw new Error("The upload didn't finish. Try again.");
      setResume({ state: "done", name: file.name, path: ticket.path });
    } catch (e) {
      setResume({ state: "none" });
      setErr(e instanceof Error && e.message ? e.message : "The upload didn't finish. Try again.");
    } finally {
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  function back() {
    setErr("");
    setStep((s) => Math.max(0, s - 1));
  }

  /**
   * Sends the application to BOTH the Google Sheet and Helium.
   *
   * ── WHY BOTH, FOR NOW ──────────────────────────────────────────────────
   * The Sheet has been the system of record for every application this form
   * has ever taken, and Helium has received none of them. Cutting straight
   * over would bet the whole intake funnel on a mapping nobody has seen work
   * on real data. Writing to both costs one request and means a wrong slug
   * shows up on Helium's review screen — in red, because it stores an
   * unrecognised specialisation verbatim — while the Sheet keeps working.
   *
   * Drop the Sheet once real applications have landed in Helium correctly.
   *
   * ── THE TWO PAYLOADS ARE DELIBERATELY DIFFERENT ────────────────────────
   * The Sheet's is unchanged, byte for byte, so its existing columns and any
   * formulas built on them keep working. Helium's uses its own field names
   * and its own vocabulary — see the mapping notes below.
   */
  async function submit() {
    setSending(true);

    // Unchanged. `no-cors` stays here because Apps Script sends no CORS
    // headers, which also means this response is opaque and cannot be read.
    const sheetPost = fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: (() => {
        // drop the camelCase key so the payload carries referred_by only,
        // matching the sheet rather than shipping the same value twice
        const { referredBy, ...rest } = data;
        return JSON.stringify({
          ...rest,
          subrole: data.subrole.join(", "),
          opportunity: data.opportunity.join(", "),
          referred_by: referredBy.trim(),
          note: data.note.trim() || "—",
          submitted_at: new Date().toISOString(),
        });
      })(),
    });

    // Labels in, slugs out. The form holds labels throughout so the summary
    // screen and the Sheet are unaffected; only Helium wants slugs.
    //
    // An unmapped SPECIALTY is sent as its label on purpose: Helium keeps it
    // verbatim and flags it for a human, which is how a drift between the two
    // lists becomes visible instead of silent. `discipline` is the exception —
    // it is a strict enum, so an unmapped role would have the whole submission
    // refused. That cannot happen (the role is always one of the tiles the
    // vocabulary produced) and is guarded anyway.
    const byLabel = new Map(subroleOptions.map((o) => [o.label, o.slug]));
    const heliumPost = discipline
      ? fetch(APPLICATIONS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            discipline: discipline.slug,
            fullName: data.name.trim(),
            phone: data.phone.trim(),
            email: data.email.trim(),
            city: data.city.trim(),
            linkedin: data.linkedin.trim(),
            portfolio: data.portfolio.trim(),
            experience: data.experience,
            specialisations: data.subrole.map((label) => byLabel.get(label) ?? label),
            // Helium's wording, not this form's internal `val`. It maps on
            // these exact strings, so "Full-time" and "Open to all" would
            // both have arrived unmapped.
            opportunity: data.opportunity.map(
              (val) => OPPORTUNITY.find((o) => o.val === val)?.label ?? val,
            ),
            referredBy: data.referredBy.trim(),
            note: data.note.trim(),
            // The résumé's path, when one was uploaded. Helium keeps it only
            // if the ticket it was uploaded under is still open.
            resumePath: resume.state === "done" ? resume.path : undefined,
            // A §12 referral code off the link they followed, when there is
            // one. Captured here rather than in state because nothing else
            // needs it, and read at submit so this stays safe under SSR.
            ref: new URLSearchParams(window.location.search).get("ref") ?? undefined,
          }),
        })
      : Promise.reject(new Error("no discipline"));

    const [sheet, helium] = await Promise.allSettled([sheetPost, heliumPost]);

    // Either landing is a success for the applicant. Failing them because ONE
    // of two backends hiccuped would lose a real person from the top of the
    // funnel, which is the thing this whole change exists to stop.
    const sheetOk = sheet.status === "fulfilled";

    // Helium answers a REFUSED application with HTTP 200 and `{ ok: false,
    // error }` in the body, so `response.ok` alone reads a refusal as success.
    // Read the body: only `ok: true` means the application was accepted.
    let heliumOk = false;
    let heliumReason: unknown = helium.status === "rejected" ? helium.reason : undefined;
    if (helium.status === "fulfilled") {
      try {
        const body = (await helium.value.json()) as { ok?: boolean; error?: string };
        heliumOk = helium.value.ok && body?.ok === true;
        if (!heliumOk) heliumReason = body?.error ?? `HTTP ${helium.value.status}`;
      } catch {
        heliumReason = `HTTP ${helium.value.status}, unreadable body`;
      }
    }

    if (!sheetOk && !heliumOk) {
      setErr("Something went wrong — please try again.");
      setSending(false);
      return;
    }

    if (!heliumOk) {
      // Visible to us, invisible to them: they are through, and an applicant
      // cannot act on which of our two backends was unavailable.
      console.warn("[talent-form] Helium did not accept this application:", heliumReason);
    }

    setDone(true);
    setSending(false);
  }

  const summary: [string, string][] = [
    ["Role", data.role],
    ["Specialty", data.subrole.join(", ")],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["City", data.city],
    ["LinkedIn", data.linkedin],
    ["Experience", data.experience],
    ["Opportunity", data.opportunity.join(", ")],
    ["Portfolio", data.portfolio],
    ["Résumé", resume.state === "done" ? resume.name : "—"],
    ["Referred by", data.referredBy.trim() || "—"],
    ["Note", data.note.trim() || "—"],
  ];

  return (
    <div className="moo">
      <style dangerouslySetInnerHTML={{ __html: COMIC_CSS }} />

      <header className="moo-header">
        <Link to="/moo-talent" aria-label="Mulah Moo home"><Logo height={23} /></Link>
      </header>

      <section className="formband">
        <div className="panel">
          {!done && <div className="step-num">{step + 1}</div>}

          {done ? (
            <div className="done">
              <div className="done-mark"><Icon name="star" size={34} color="#111111" /></div>
              <h3>You&rsquo;re on our radar.</h3>
              <p>We&rsquo;ll review your profile and reach out when there&rsquo;s a fit.<br />Keep making great work.</p>
              <div style={{ marginTop: 26 }}>
                <Link to="/moo-talent" className="btn sm ghost">&larr; Back to Moo Talent</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="prog">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                  <i key={i} className={i <= step ? "on" : ""} />
                ))}
              </div>

              <div className="q">{QUESTIONS[step]}</div>
              {(step === 1 || step === 4) && <div className="q-hint">Pick all that apply.</div>}

              {step === 0 && (
                <div className="opts">
                  {vocab.map((r) => (
                    <button
                      key={r.slug} type="button"
                      className={`opt${data.role === r.label ? " sel" : ""}`}
                      onClick={() => {
                        // changing role invalidates any specialty already chosen
                        setData((d) => ({ ...d, role: r.label, subrole: [] }));
                        setErr("");
                      }}
                    >
                      <span className="opt-ic"><Icon name={r.icon as IconName} size={24} color="#8856F2" /></span>
                      <span style={{ flex: 1 }}>
                        <span className="opt-name">{r.label}</span>
                        <span className="opt-desc">{r.desc}</span>
                      </span>
                      <span className="opt-dot" />
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="tags">
                  {subroleOptions.map((option) => {
                    const s = option.label;
                    const on = data.subrole.includes(s);
                    return (
                      <button
                        key={option.slug} type="button" className={`tag${on ? " sel" : ""}`}
                        onClick={() => {
                          // functional update: two taps in the same batch would
                          // otherwise both read the pre-click list, and the
                          // second would drop the first selection
                          setData((d) => ({
                            ...d,
                            subrole: d.subrole.includes(s)
                              ? d.subrole.filter((x) => x !== s)
                              : [...d.subrole, s],
                          }));
                          setErr("");
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 2 && (
                <div>
                  {([
                    ["name", "Full name", "Your name", "text", "name"],
                    ["email", "Email", "you@example.com", "email", "email"],
                    ["phone", "Contact number", "+91 98765 43210", "tel", "tel"],
                    ["city", "City", "e.g. Mumbai, Delhi, Bangalore…", "text", "address-level2"],
                    ["linkedin", "LinkedIn profile URL (optional)", "https://linkedin.com/in/yourname", "url", "url"],
                  ] as const).map(([k, label, ph, type, ac]) => (
                    <div className="field" key={k}>
                      <label htmlFor={`f-${k}`}>{label}</label>
                      <input
                        id={`f-${k}`} type={type} placeholder={ph} autoComplete={ac}
                        value={data[k]}
                        onChange={(e) => { set(k, e.target.value); setErr(""); }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="levels">
                  {EXPERIENCE.map((x) => (
                    <button
                      key={x} type="button"
                      className={`level${data.experience === x ? " sel" : ""}`}
                      onClick={() => { set("experience", x); setErr(""); }}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="opts">
                  {OPPORTUNITY.map((o) => (
                    <button
                      key={o.val} type="button"
                      className={`opt${data.opportunity.includes(o.val) ? " sel" : ""}`}
                      onClick={() => {
                        // functional update so two quick taps cannot both read
                        // the pre-click list and drop the first selection
                        setData((d) => ({
                          ...d,
                          opportunity: d.opportunity.includes(o.val)
                            ? d.opportunity.filter((x) => x !== o.val)
                            : [...d.opportunity, o.val],
                        }));
                        setErr("");
                      }}
                    >
                      <span style={{ flex: 1 }}><span className="opt-name">{o.label}</span></span>
                      <span className="opt-dot" />
                    </button>
                  ))}
                </div>
              )}

              {step === 5 && (
                <div>
                  <div className="field">
                    <label htmlFor="f-portfolio">Portfolio / Behance / Dribbble / YouTube URL</label>
                    <input
                      id="f-portfolio" type="url" placeholder="https://…" autoComplete="url"
                      value={data.portfolio}
                      onChange={(e) => { set("portfolio", e.target.value); setErr(""); }}
                    />
                  </div>
                  <div className="field">
                    <label>Résumé <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 500 }}>(optional · PDF or Word, up to 5MB)</span></label>
                    <input
                      ref={fileInput} type="file" accept={RESUME_ACCEPT} tabIndex={-1} aria-hidden
                      style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) void pickResume(f); }}
                    />
                    <button
                      type="button"
                      className={`drop${resume.state === "done" ? " done" : ""}`}
                      disabled={resume.state === "busy"}
                      onClick={() => fileInput.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) void pickResume(f); }}
                    >
                      <span className="drop-ic" aria-hidden>
                        {resume.state === "busy" ? <span className="spinner dark" /> : resume.state === "done" ? "✓" : "↑"}
                      </span>
                      <span className="drop-t">
                        <b>{resume.state === "busy" ? "Uploading…" : resume.state === "done" ? resume.name : "Upload your résumé"}</b>
                        <span>{resume.state === "done" ? "Attached. Tap to replace it." : "Tap to choose a file, or drop it here."}</span>
                      </span>
                    </button>
                    {resume.state === "done" && (
                      <button type="button" className="linkbtn" onClick={() => setResume({ state: "none" })}>Remove it</button>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="f-referred">Referred by <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 500 }}>(optional)</span></label>
                    <input
                      id="f-referred" type="text" placeholder="Name of the person who sent you here"
                      value={data.referredBy}
                      onChange={(e) => set("referredBy", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="f-note">Anything else you&rsquo;d like us to know?</label>
                    <textarea
                      id="f-note" rows={3} placeholder="Availability, preferred industries, rate range…"
                      value={data.note}
                      onChange={(e) => set("note", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 6 && (
                <>
                  <div className="summary">
                    {summary.map(([k, v]) => (
                      <div className="srow" key={k}><b>{k}</b><span>{v || "—"}</span></div>
                    ))}
                  </div>
                  <p className="q-hint" style={{ marginTop: 14, marginBottom: 0 }}>
                    Your info is stored privately in our talent sheet.
                  </p>
                </>
              )}

              {err && <span className="err">{err}</span>}

              <div className="nav">
                {step > 0 ? (
                  <button type="button" className="btn sm ghost" onClick={back}>&larr; Back</button>
                ) : (
                  <Link to="/moo-talent" className="btn sm ghost">&larr; Back</Link>
                )}
                <button type="button" className="btn sm" onClick={next} disabled={sending}>
                  {sending ? <span className="spinner" /> : step === TOTAL_STEPS - 1 ? "Submit" : "Continue"}
                  {!sending && <Icon name="bolt" size={16} color="#F5D547" />}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <footer className="moo-footer">
        <div className="in">
          <div className="f-logo"><Logo height={32} mono /></div>
          <p className="f-line">The roles that never reach a job board.</p>
          <div className="f-rule" />
          <div className="f-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>
          <div className="f-bot">&copy; 2026 {LEGAL_NAME} &middot; mulahmoo.in</div>
        </div>
      </footer>
    </div>
  );
}
