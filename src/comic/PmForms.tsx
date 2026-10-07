import { useEffect, useRef, useState } from "react";
import { CLIENT_CALL_URL, IN_FORMS_URL, SHEET_URL } from "@/comic/data";

/**
 * The premium site's pop up forms, styled with the same .pm-form look as the
 * report form on the home page.
 *
 *   MandateForm .. "Send a mandate" / "Hire with us"   form_type "client-pricing"
 *   BccForm ...... every BCC invite, partner and host CTA  form_type "bcc-request"
 *
 * The mandate form posts to the shared Apps Script (SHEET_URL). The BCC form
 * posts to the mulahmoo.in forms script (IN_FORMS_URL, apps-script/Code.gs).
 * All use mode "no-cors" and carry form_type and source "mulahmoo.in".
 */

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

async function post(body: Record<string, unknown>, url = SHEET_URL) {
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, source: "mulahmoo.in", submitted_at: new Date().toISOString() }),
  });
}

/* ------------------------------------------------------------ modal shell */

export function Modal({ open, onClose, label, children }: { open: boolean; onClose: () => void; label: string; children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  // onClose is a new function on every render of the parent (every keystroke),
  // so it is read through a ref. With it in the effect's dependencies the
  // effect re-ran on each keystroke and re-focused the first field, which made
  // typing jump out of whatever box you were in.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeRef.current(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // focus the first field so keyboard users land inside the dialog
    const t = window.setTimeout(() => box.current?.querySelector<HTMLElement>("input,button.pmf-x")?.focus(), 60);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); window.clearTimeout(t); };
  }, [open]);
  if (!open) return null;
  return (
    <div className="pmf" onClick={onClose}>
      <div className="pmf-in" role="dialog" aria-modal="true" aria-label={label} ref={box} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="pmf-x" onClick={onClose} aria-label="Close"><span /><span /></button>
        {children}
      </div>
    </div>
  );
}

function Done({ title, body, onClose, extra }: { title: string; body: string; onClose: () => void; extra?: React.ReactNode }) {
  return (
    <div className="pm-form done" role="status">
      <span className="pm-tick" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="pmf-doneact">
        {extra}
        <button type="button" className="pm-btn outline" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function Chips({ options, value, onPick, multi }: { options: string[]; value: string | string[]; onPick: (v: string) => void; multi?: boolean }) {
  return (
    <div className="chips">
      {options.map((o) => (
        <button type="button" key={o} aria-pressed={multi ? (value as string[]).includes(o) : value === o} onClick={() => onPick(o)}>{o}</button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------- mandate form */

const CLIENT_TYPES = ["Indian brand", "Content studio", "Creator", "Agency"];
const SENIORITY = ["Leadership", "Mid level", "Core team"];
const TIMELINES = ["Immediately", "Within a month", "One to three months", "Just exploring"];
const BUDGETS = ["₹8 to 15 LPA", "₹15 to 30 LPA", "₹30 to 50 LPA", "₹50 LPA+"];

/**
 * Keeps the field names of the original pricing form (name, email, company,
 * link, clientType, needs, timeline, notes) so rows land in the existing
 * client-pricing tab. The new fields go in as their own keys and are also
 * folded into notes, so nothing is lost before the script learns the columns.
 */
export function MandateForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const blank = { name: "", email: "", phone: "", company: "", link: "", clientType: "", needs: "", seniority: "", budget: "", timeline: "", notes: "" };
  const [f, setF] = useState(blank);
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const set = (k: keyof typeof f, v: string) => { setF((d) => ({ ...d, [k]: v })); setErr(""); };
  const close = () => { onClose(); if (state === "done") { setF(blank); setState("idle"); } };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim()) return setErr("Please add your name.");
    if (!EMAIL.test(f.email.trim())) return setErr("Please add a valid work email.");
    if (!f.company.trim()) return setErr("Please add your company or brand.");
    if (!f.needs.trim()) return setErr("Tell us the role or team you are hiring for.");
    setState("sending");
    try {
      const folded = [
        f.phone && `Phone: ${f.phone}`,
        f.seniority && `Seniority: ${f.seniority}`,
        f.budget && `Budget: ${f.budget}`,
        f.notes,
      ].filter(Boolean).join(" | ");
      await post({ form_type: "client-pricing", ...f, notes: folded });
      setState("done");
    } catch {
      setState("idle");
      setErr("That did not go through. Please try again.");
    }
  }

  return (
    <Modal open={open} onClose={close} label="Send a mandate">
      {state === "done" ? (
        <Done
          title={`Thank you, ${f.name.trim().split(" ")[0]}.`}
          body="Your mandate is with us. We reply within one working day with our fees and how we would run the search."
          onClose={close}
          extra={<a href={CLIENT_CALL_URL} {...ext} className="pm-btn sun">Book a 30 min call</a>}
        />
      ) : (
        <form className="pm-form" onSubmit={submit} noValidate>
          <p className="pmf-kicker">Send a mandate</p>
          <h3>Tell us who you are hiring.</h3>
          <div className="two">
            <label><span>Full name</span><input id="mf-name" value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></label>
            <label><span>Work email</span><input id="mf-email" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></label>
          </div>
          <div className="two">
            <label><span>Company or brand</span><input id="mf-company" value={f.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" /></label>
            <label><span>Phone or WhatsApp <i>optional</i></span><input id="mf-phone" type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" /></label>
          </div>
          <label><span>Website or Instagram <i>optional</i></span><input id="mf-link" value={f.link} onChange={(e) => set("link", e.target.value)} placeholder="brand.com or @handle" /></label>
          <fieldset><legend>You are</legend><Chips options={CLIENT_TYPES} value={f.clientType} onPick={(v) => set("clientType", v)} /></fieldset>
          <label><span>Roles you are hiring for</span><textarea id="mf-needs" rows={2} value={f.needs} onChange={(e) => set("needs", e.target.value)} placeholder="Head of Marketing, two content strategists" /></label>
          <fieldset><legend>Seniority</legend><Chips options={SENIORITY} value={f.seniority} onPick={(v) => set("seniority", v)} /></fieldset>
          <fieldset><legend>Budget per role (CTC)</legend><Chips options={BUDGETS} value={f.budget} onPick={(v) => set("budget", v)} /></fieldset>
          <fieldset><legend>When do you need them</legend><Chips options={TIMELINES} value={f.timeline} onPick={(v) => set("timeline", v)} /></fieldset>
          <label><span>Anything else <i>optional</i></span><textarea id="mf-notes" rows={2} value={f.notes} onChange={(e) => set("notes", e.target.value)} /></label>
          {err && <p className="err" role="alert">{err}</p>}
          <button type="submit" className="pm-btn lg block" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Send mandate"}</button>
          <p className="pmf-consent">By sending this you agree to our <a href="/privacy" {...ext}>privacy policy</a>.</p>
          <p className="pmf-alt">Prefer to talk first? <a href={CLIENT_CALL_URL} {...ext}>Book a 30 min call</a></p>
        </form>
      )}
    </Modal>
  );
}

/* -------------------------------------------------------------- BCC form */

export type BccIntent = "Attend" | "Partner" | "Host a city";
const BCC_INTENTS: BccIntent[] = ["Attend", "Partner", "Host a city"];
const BCC_CITIES = ["Delhi NCR", "Mumbai", "Bengaluru", "Other"];
const BCC_EXP = ["2 to 4 yrs", "4 to 7 yrs", "7 yrs+"];

const BCC_COPY: Record<BccIntent, { h: string; done: string; btn: string }> = {
  "Attend": { h: "Request your seat.", done: "We review every request by hand and reply on WhatsApp when the next room opens.", btn: "Request invite" },
  "Partner": { h: "Partner with the club.", done: "We will send the partner deck and next edition dates within two working days.", btn: "Send" },
  "Host a city": { h: "Bring the club to your city.", done: "We will reach out to plan a first room in your city.", btn: "Send" },
};

export function BccForm({ open, onClose, intent: start }: { open: boolean; onClose: () => void; intent: BccIntent }) {
  const blank = { intent: start as BccIntent, name: "", email: "", phone: "", city: "", role: "", company: "", experience: "", link: "", note: "" };
  const [f, setF] = useState(blank);
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  useEffect(() => { if (open) setF((d) => ({ ...d, intent: start })); }, [open, start]);
  const set = (k: keyof typeof f, v: string) => { setF((d) => ({ ...d, [k]: v })); setErr(""); };
  const close = () => { onClose(); if (state === "done") { setF(blank); setState("idle"); } };
  const attend = f.intent === "Attend";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim()) return setErr("Please add your name.");
    if (!EMAIL.test(f.email.trim())) return setErr("Please add a valid email.");
    if (f.phone.replace(/\D/g, "").length < 10) return setErr("Please add a WhatsApp number. That is where the club runs.");
    if (!f.role.trim() || !f.company.trim()) return setErr("Please add your role and company.");
    if (attend && !f.link.trim()) return setErr("Please add your LinkedIn or Instagram.");
    setState("sending");
    try {
      await post({ form_type: "bcc-request", ...f }, IN_FORMS_URL);
      setState("done");
    } catch {
      setState("idle");
      setErr("That did not go through. Please try again.");
    }
  }

  return (
    <Modal open={open} onClose={close} label="Backstage Creators Club request">
      {state === "done" ? (
        <Done title={`Thank you, ${f.name.trim().split(" ")[0]}.`} body={BCC_COPY[f.intent].done} onClose={close} />
      ) : (
        <form className="pm-form" onSubmit={submit} noValidate>
          <p className="pmf-kicker">Backstage Creators Club</p>
          <h3>{BCC_COPY[f.intent].h}</h3>
          <fieldset><legend>I want to</legend><Chips options={BCC_INTENTS} value={f.intent} onPick={(v) => set("intent", v)} /></fieldset>
          <div className="two">
            <label><span>Full name</span><input id="bf-name" value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></label>
            <label><span>Email</span><input id="bf-email" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></label>
          </div>
          <div className="two">
            <label><span>WhatsApp number</span><input id="bf-phone" type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+91" /></label>
            <label><span>{attend ? "LinkedIn or Instagram" : "Website or LinkedIn"} {attend ? null : <i>optional</i>}</span><input id="bf-link" value={f.link} onChange={(e) => set("link", e.target.value)} /></label>
          </div>
          <div className="two">
            <label><span>Your role</span><input id="bf-role" value={f.role} onChange={(e) => set("role", e.target.value)} autoComplete="organization-title" placeholder="Head of Content" /></label>
            <label><span>Company</span><input id="bf-company" value={f.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" /></label>
          </div>
          <fieldset><legend>City</legend><Chips options={BCC_CITIES} value={f.city} onPick={(v) => set("city", v)} /></fieldset>
          {attend && <fieldset><legend>Experience in content</legend><Chips options={BCC_EXP} value={f.experience} onPick={(v) => set("experience", v)} /></fieldset>}
          <label><span>{attend ? "What would you bring to the room" : "Tell us a little more"} <i>optional</i></span><textarea id="bf-note" rows={2} value={f.note} onChange={(e) => set("note", e.target.value)} /></label>
          {err && <p className="err" role="alert">{err}</p>}
          <button type="submit" className="pm-btn lg block" disabled={state === "sending"}>{state === "sending" ? "Sending..." : BCC_COPY[f.intent].btn}</button>
          <p className="pmf-consent">By sending this you agree to our <a href="/privacy" {...ext}>privacy policy</a>.</p>
        </form>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------- css */

export const PMF_CSS = `
.pmf{ position:fixed; inset:0; z-index:90; background:rgba(20,10,43,.62); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
  display:flex; align-items:flex-start; justify-content:center; overflow-y:auto; padding:48px 16px; animation:pmfIn .25s ease both; }
.pmf-in{ position:relative; width:100%; max-width:620px; margin:auto 0; animation:pmfUp .35s cubic-bezier(.2,.9,.25,1) both; }
.pmf-in .pm-form{ box-shadow:0 40px 120px -30px rgba(0,0,0,.6); padding:44px 36px 36px; }
.pmf-x{ position:absolute; top:18px; right:18px; z-index:2; width:40px; height:40px; border-radius:50%; border:1px solid rgba(255,255,255,.2); background:transparent; cursor:pointer; }
.pmf-x span{ position:absolute; left:11px; right:11px; top:19px; height:1.6px; background:#fff; transform:rotate(45deg); }
.pmf-x span + span{ transform:rotate(-45deg); }
.pmf-x:focus-visible, .pm-form .chips button:focus-visible{ outline:2px solid var(--sun); outline-offset:2px; }
.pmf-kicker{ font-size:12px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:var(--sun); margin:0 !important; }
.pm-form label i{ font-style:normal; font-weight:500; color:#A897D0; }
.pm-form textarea{ width:100%; min-width:0; border-radius:14px; border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.06);
  color:#fff; padding:12px 14px; font:500 15px/1.5 var(--ui); outline:none; resize:vertical; transition:border-color .2s, background .2s; }
.pm-form textarea:focus{ border-color:var(--sun); background:rgba(255,255,255,.1); }
.pm-form input::placeholder, .pm-form textarea::placeholder{ color:rgba(216,204,242,.45); }
.pmf-alt{ font-size:14px; color:#D8CCF2; text-align:center; margin:0 !important; }
.pmf-alt a{ color:var(--sun); text-decoration:underline; text-underline-offset:3px; }
.pm-form .pm-btn.outline{ background:transparent; color:#fff !important; border-color:rgba(255,255,255,.35); }
.pmf-consent{ font-size:12.5px; color:#A897D0; text-align:center; margin:-4px 0 0 !important; }
.pmf-consent a{ color:#D8CCF2; text-decoration:underline; text-underline-offset:2px; }
.pmf-doneact{ display:flex; flex-wrap:wrap; gap:10px; margin-top:8px; }
@keyframes pmfIn{ from{ opacity:0; } }
@keyframes pmfUp{ from{ opacity:0; transform:translateY(24px) scale(.98); } }
@media (max-width:480px){ .pmf{ padding:16px 12px; } .pmf-in .pm-form{ padding:56px 20px 24px; } }
@media (prefers-reduced-motion:reduce){ .pmf, .pmf-in{ animation:none; } }
`;
