import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/comic/Logo";
import { PM_CSS, useMagnetic } from "@/comic/PremiumHome";
import { PMF_CSS } from "@/comic/PmForms";
import { FONT } from "@/comic/premiumData";
import { EXPERIENCE, OPPORTUNITY, SHEET_URL, TOTAL_STEPS } from "@/comic/data";
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
 * /moo-talent-form in the premium design.
 *
 * The validation, the résumé upload and the two submissions (Google Sheet and
 * Helium) are carried over unchanged from the previous version of this page;
 * only the markup and styles are new. Keep the payloads byte for byte: the
 * Sheet's columns and Helium's mapping both depend on them.
 */

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

export function TalentFormPremium() {
  useMagnetic();
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

  const pct = done ? 100 : Math.round(((step + 1) / TOTAL_STEPS) * 100);

  return (
    <div className="pm tf" style={{ "--display": FONT.display, "--ui": FONT.ui, "--dw": 400 } as React.CSSProperties}>
      <style dangerouslySetInnerHTML={{ __html: PM_CSS + PMF_CSS + TF_CSS }} />
      <div className="pm-posbg" aria-hidden="true"><span className="b1" /><span className="b2" /><span className="b3" /></div>

      <header className="tf-top">
        <Link to="/moo-talent" aria-label="Mulah Moo talent"><Logo height={20} mono /></Link>
        <Link to="/moo-talent" className="tf-exit">Back to talent</Link>
      </header>

      <main className="tf-main">
        <div className="tf-card">
          {done ? (
            <div className="tf-done" role="status">
              <span className="pm-tick" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <h1>You&rsquo;re on <em>our radar.</em></h1>
              <p>We review every profile by hand and reach out when a role fits you. Keep making great work.</p>
              <div className="pm-actions center">
                <Link to="/moo-talent" className="pm-btn sun lg" data-mag>Back to Moo Talent</Link>
                <Link to="/moo-verified" className="pm-btn outline lg" data-mag>See Moo Verified</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="tf-meta">
                <span>Question {step + 1} of {TOTAL_STEPS}</span>
                <span>{pct}%</span>
              </div>
              <div className="tf-bar" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>

              <h1 className="tf-q" key={step}>{QUESTIONS[step]}</h1>
              {(step === 1 || step === 4) && <p className="tf-hint">Pick all that apply.</p>}

              {step === 0 && (
                <div className="tf-tiles">
                  {vocab.map((r) => (
                    <button
                      key={r.slug} type="button" aria-pressed={data.role === r.label}
                      onClick={() => {
                        // changing role invalidates any specialty already chosen
                        setData((d) => ({ ...d, role: r.label, subrole: [] }));
                        setErr("");
                      }}
                    >
                      <b>{r.label}</b>
                      <span>{r.desc}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="tf-chips">
                  {subroleOptions.map((option) => {
                    const s = option.label;
                    return (
                      <button
                        key={option.slug} type="button" aria-pressed={data.subrole.includes(s)}
                        onClick={() => {
                          // functional update: two taps in the same batch would
                          // otherwise both read the pre-click list
                          setData((d) => ({
                            ...d,
                            subrole: d.subrole.includes(s) ? d.subrole.filter((x) => x !== s) : [...d.subrole, s],
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
                <div className="tf-fields">
                  {([
                    ["name", "Full name", "Your name", "text", "name"],
                    ["email", "Email", "you@example.com", "email", "email"],
                    ["phone", "Contact number", "+91 98765 43210", "tel", "tel"],
                    ["city", "City", "Mumbai, Delhi, Bengaluru", "text", "address-level2"],
                    ["linkedin", "LinkedIn profile URL (optional)", "https://linkedin.com/in/yourname", "url", "url"],
                  ] as const).map(([k, label, ph, type, ac]) => (
                    <label key={k} htmlFor={`f-${k}`} className={k === "linkedin" ? "wide" : undefined}>
                      <span>{label}</span>
                      <input
                        id={`f-${k}`} type={type} placeholder={ph} autoComplete={ac}
                        value={data[k]}
                        onChange={(e) => { set(k, e.target.value); setErr(""); }}
                      />
                    </label>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="tf-chips big">
                  {EXPERIENCE.map((x) => (
                    <button key={x} type="button" aria-pressed={data.experience === x} onClick={() => { set("experience", x); setErr(""); }}>
                      {x}
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="tf-tiles two">
                  {OPPORTUNITY.map((o) => (
                    <button
                      key={o.val} type="button" aria-pressed={data.opportunity.includes(o.val)}
                      onClick={() => {
                        setData((d) => ({
                          ...d,
                          opportunity: d.opportunity.includes(o.val)
                            ? d.opportunity.filter((x) => x !== o.val)
                            : [...d.opportunity, o.val],
                        }));
                        setErr("");
                      }}
                    >
                      <b>{o.label}</b>
                    </button>
                  ))}
                </div>
              )}

              {step === 5 && (
                <div className="tf-fields one">
                  <label htmlFor="f-portfolio">
                    <span>Portfolio, Behance, Dribbble or YouTube link</span>
                    <input
                      id="f-portfolio" type="url" placeholder="https://" autoComplete="url"
                      value={data.portfolio}
                      onChange={(e) => { set("portfolio", e.target.value); setErr(""); }}
                    />
                  </label>
                  <div className="tf-file">
                    <span className="lbl">Résumé <i>optional · PDF or Word, up to 5MB</i></span>
                    <input
                      ref={fileInput} type="file" accept={RESUME_ACCEPT} tabIndex={-1} aria-hidden
                      style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) void pickResume(f); }}
                    />
                    <button
                      type="button"
                      className={`tf-drop${resume.state === "done" ? " ok" : ""}`}
                      disabled={resume.state === "busy"}
                      onClick={() => fileInput.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) void pickResume(f); }}
                    >
                      <span className="ic" aria-hidden>{resume.state === "busy" ? "…" : resume.state === "done" ? "✓" : "↑"}</span>
                      <span className="t">
                        <b>{resume.state === "busy" ? "Uploading" : resume.state === "done" ? resume.name : "Upload your résumé"}</b>
                        <span>{resume.state === "done" ? "Attached. Tap to replace it." : "Tap to choose a file, or drop it here."}</span>
                      </span>
                    </button>
                    {resume.state === "done" && (
                      <button type="button" className="tf-link" onClick={() => setResume({ state: "none" })}>Remove it</button>
                    )}
                  </div>
                  <label htmlFor="f-referred">
                    <span>Referred by <i>optional</i></span>
                    <input id="f-referred" type="text" placeholder="Name of the person who sent you here" value={data.referredBy} onChange={(e) => set("referredBy", e.target.value)} />
                  </label>
                  <label htmlFor="f-note">
                    <span>Anything else you&rsquo;d like us to know <i>optional</i></span>
                    <textarea id="f-note" rows={3} placeholder="Availability, preferred industries, rate range" value={data.note} onChange={(e) => set("note", e.target.value)} />
                  </label>
                </div>
              )}

              {step === 6 && (
                <>
                  <dl className="tf-summary">
                    {summary.map(([k, v]) => (
                      <div key={k}><dt>{k}</dt><dd>{v || "—"}</dd></div>
                    ))}
                  </dl>
                  <p className="tf-hint">
                    Your details are stored privately in our talent sheet. By submitting you agree to our{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.
                  </p>
                </>
              )}

              {err && <p className="tf-err" role="alert">{err}</p>}

              <div className="tf-nav">
                {step > 0 ? (
                  <button type="button" className="pm-btn outline" onClick={back}>&larr; Back</button>
                ) : (
                  <Link to="/moo-talent" className="pm-btn outline">&larr; Back</Link>
                )}
                <button type="button" className="pm-btn sun" onClick={next} disabled={sending}>
                  {sending ? "Sending..." : step === TOTAL_STEPS - 1 ? "Submit application" : "Continue"}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

const TF_CSS = `
.tf{ min-height:100vh; background:var(--deeper); color:#fff; position:relative; overflow:hidden; display:flex; flex-direction:column; }
.tf .pm-posbg{ position:fixed; }
.tf-top{ position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; padding:28px 40px; }
.tf-exit{ font-size:14px; font-weight:500; color:#CFC5E6; }
.tf-exit:hover{ color:#fff; }
.tf-main{ position:relative; z-index:2; flex:1; display:flex; justify-content:center; align-items:flex-start; padding:32px 20px 96px; }
.tf-card{ width:100%; max-width:780px; border-radius:36px; background:rgba(36,18,71,.72); border:1px solid rgba(255,255,255,.12);
  backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); padding:48px 52px 44px; box-shadow:0 50px 120px -40px rgba(0,0,0,.6); }
.tf-meta{ display:flex; justify-content:space-between; font-size:12.5px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:#BBAEDD; }
.tf-bar{ height:3px; border-radius:3px; background:rgba(255,255,255,.12); margin:14px 0 40px; overflow:hidden; }
.tf-bar i{ display:block; height:100%; background:var(--sun); border-radius:3px; transition:width .6s cubic-bezier(.2,.9,.25,1); }
.tf-q{ font-family:var(--display); font-weight:400; font-size:clamp(34px,4.4vw,52px); line-height:1.06; letter-spacing:-.02em; text-wrap:balance; animation:pmWord .7s cubic-bezier(.2,.9,.25,1) both; }
.tf-hint{ font-size:14.5px; color:#BBAEDD; margin-top:12px !important; }
.tf-hint a{ color:#E6DCFF; text-decoration:underline; text-underline-offset:2px; }
.tf-tiles{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; margin-top:32px; }
.tf-tiles button{ text-align:left; display:flex; flex-direction:column; gap:6px; padding:20px 22px; border-radius:20px; border:1px solid rgba(255,255,255,.16);
  background:rgba(255,255,255,.04); color:#fff; cursor:pointer; font:inherit; transition:border-color .2s, background .2s, transform .3s cubic-bezier(.2,.9,.25,1); }
.tf-tiles button:hover{ border-color:rgba(255,255,255,.36); transform:translateY(-2px); }
.tf-tiles button b{ font-family:var(--display); font-weight:400; font-size:24px; line-height:1.1; }
.tf-tiles button span{ font-size:14px; line-height:1.45; color:#BBAEDD; }
.tf-tiles button[aria-pressed="true"]{ border-color:var(--sun); background:rgba(245,197,66,.12); }
.tf-tiles button[aria-pressed="true"] b{ color:var(--sun); }
.tf-chips{ display:flex; flex-wrap:wrap; gap:10px; margin-top:32px; }
.tf-chips button{ min-height:46px; padding:0 20px; border-radius:999px; border:1px solid rgba(255,255,255,.22); background:transparent; color:#fff; font:500 15px var(--ui); cursor:pointer; transition:background .2s, color .2s, border-color .2s; }
.tf-chips button:hover{ border-color:rgba(255,255,255,.5); }
.tf-chips button[aria-pressed="true"]{ background:var(--sun); color:var(--deep); border-color:var(--sun); font-weight:600; }
.tf-chips.big button{ min-height:56px; padding:0 26px; font-size:16px; }
.tf-fields{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; margin-top:32px; }
.tf-fields.one{ grid-template-columns:1fr; }
.tf-fields .wide{ grid-column:1 / -1; }
.tf-fields label{ display:flex; flex-direction:column; gap:8px; font-size:13px; font-weight:600; color:#D8CCF2; min-width:0; }
.tf-fields label i, .tf-file i{ font-style:normal; font-weight:500; color:#A897D0; }
.tf-fields input, .tf-fields textarea{ width:100%; min-width:0; min-height:52px; border-radius:16px; border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.06);
  color:#fff; padding:0 16px; font:500 16px var(--ui); outline:none; transition:border-color .2s, background .2s; }
.tf-fields textarea{ padding:14px 16px; line-height:1.5; resize:vertical; }
.tf-fields input:focus, .tf-fields textarea:focus{ border-color:var(--sun); background:rgba(255,255,255,.1); }
.tf-fields input::placeholder, .tf-fields textarea::placeholder{ color:rgba(216,204,242,.42); }
.tf-file{ display:flex; flex-direction:column; gap:8px; }
.tf-file .lbl{ font-size:13px; font-weight:600; color:#D8CCF2; }
.tf-drop{ display:flex; align-items:center; gap:16px; text-align:left; padding:18px 20px; border-radius:16px; border:1px dashed rgba(255,255,255,.3); background:rgba(255,255,255,.03); color:#fff; cursor:pointer; font:inherit; }
.tf-drop:hover{ border-color:var(--sun); }
.tf-drop.ok{ border-style:solid; border-color:var(--sun); background:rgba(245,197,66,.1); }
.tf-drop .ic{ width:42px; height:42px; flex:none; border-radius:50%; background:rgba(255,255,255,.08); display:grid; place-items:center; font-size:18px; color:var(--sun); }
.tf-drop .t{ display:flex; flex-direction:column; gap:3px; min-width:0; }
.tf-drop .t b{ font-size:15px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.tf-drop .t span{ font-size:13px; color:#BBAEDD; }
.tf-link{ align-self:flex-start; background:none; border:0; padding:0; color:#E6DCFF; font:500 13px var(--ui); text-decoration:underline; cursor:pointer; }
.tf-summary{ margin:28px 0 0; border-top:1px solid rgba(255,255,255,.12); }
.tf-summary div{ display:grid; grid-template-columns:140px minmax(0,1fr); gap:16px; padding:12px 0; border-bottom:1px solid rgba(255,255,255,.08); }
.tf-summary dt{ font-size:12.5px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:#A897D0; padding-top:2px; }
.tf-summary dd{ margin:0; font-size:15.5px; color:#fff; overflow-wrap:anywhere; }
.tf-err{ margin-top:22px !important; font-size:14.5px; color:#FFD9D3; }
.tf-nav{ display:flex; justify-content:space-between; gap:12px; margin-top:40px; }
.tf-nav .pm-btn{ min-width:140px; }
.tf-done{ text-align:center; display:flex; flex-direction:column; align-items:center; gap:18px; padding:24px 0 8px; }
.tf-done h1{ font-size:clamp(40px,5.4vw,64px); line-height:1.02; }
.tf-done h1 em{ color:#D3C2FF; }
.tf-done p{ color:#D8CCF2; font-size:18px; max-width:40ch; }
.tf-done .pm-actions{ margin-top:16px; }
@media (max-width:640px){
  .tf-top{ padding:20px; }
  .tf-main{ padding:8px 12px 56px; }
  .tf-card{ padding:30px 20px 26px; border-radius:28px; }
  .tf-tiles, .tf-fields{ grid-template-columns:1fr; }
  .tf-summary div{ grid-template-columns:1fr; gap:4px; }
  .tf-nav .pm-btn{ min-width:0; flex:1; }
}
`;
