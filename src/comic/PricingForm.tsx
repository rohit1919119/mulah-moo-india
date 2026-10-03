import { useState, useEffect } from "react";
import { Icon } from "@/comic/Icon";
import { SHEET_URL } from "@/comic/data";

/**
 * Inbound enquiry form, opened from "Request our pricing".
 *
 * Deliberately short. This is a first touch from a stranger, not an onboarding
 * questionnaire, so it asks only what is needed to price the work and reply.
 *
 * Posts to the same Apps Script as every other form, tagged
 * form_type: "client-pricing" so the script can route it to its own tab.
 * mode: "no-cors" means the response is opaque and a server side failure cannot
 * be detected here, which is the same trade the other forms already make.
 */

const CLIENT_TYPES = ["Creator", "Agency or studio", "Brand"];
const TIMELINES = ["Immediately", "Within a month", "One to three months", "Just exploring"];

type Fields = {
  name: string;
  email: string;
  company: string;
  link: string;
  clientType: string;
  needs: string;
  timeline: string;
  notes: string;
};

const EMPTY: Fields = {
  name: "", email: "", company: "", link: "",
  clientType: "", needs: "", timeline: "", notes: "",
};

export function PricingForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [f, setF] = useState<Fields>(EMPTY);
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  // Escape closes, and the scroll lock is released on unmount too so a route
  // change while the dialog is open cannot strand the page locked.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const set = (k: keyof Fields, v: string) => {
    setF((d) => ({ ...d, [k]: v }));
    setErr("");
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim()) return setErr("Please add your name.");
    if (!f.email.includes("@")) return setErr("Please add a valid work email.");
    if (!f.company.trim()) return setErr("Please add your company or brand.");
    if (!f.needs.trim()) return setErr("Tell us what you are hiring for.");

    setSending(true);
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "client-pricing",
          ...f,
          // shares the sheet with mulahmoo.com, so tag where the enquiry came from
          source: "mulahmoo.in",
          submitted_at: new Date().toISOString(),
        }),
      });
      setDone(true);
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div className="pf" onClick={onClose}>
      <div
        className="pf-in"
        role="dialog"
        aria-modal="true"
        aria-label="Request our pricing"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="pf-x" onClick={onClose} aria-label="Close">
          <span /><span />
        </button>

        {done ? (
          <div className="pf-done">
            <span className="pf-tick"><Icon name="star" size={26} color="#fff" /></span>
            <h3>Thanks. That is with us.</h3>
            <p>
              We will send our rate card and a short note on how we would approach your hiring,
              usually within one working day.
            </p>
            <button type="button" className="btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="pf-head">
              <span className="pf-eyebrow">Request our pricing</span>
              <h3>Tell us what you need.</h3>
              <p>
                Four questions. We will come back with our rate card and live benchmarks for the
                roles you are hiring.
              </p>
            </div>

            <form onSubmit={submit} noValidate>
              <div className="pf-row">
                <label>
                  <span>Your name</span>
                  <input value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" />
                </label>
                <label>
                  <span>Work email</span>
                  <input value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" />
                </label>
              </div>

              <div className="pf-row">
                <label>
                  <span>Company or brand</span>
                  <input value={f.company} onChange={(e) => set("company", e.target.value)} placeholder="Company name" />
                </label>
                <label>
                  <span>Website or Instagram <i>optional</i></span>
                  <input value={f.link} onChange={(e) => set("link", e.target.value)} placeholder="@handle or url" />
                </label>
              </div>

              <label className="pf-full">
                <span>You are a</span>
                <div className="pf-chips">
                  {CLIENT_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={f.clientType === t ? "on" : ""}
                      onClick={() => set("clientType", t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </label>

              <label className="pf-full">
                <span>What are you hiring for?</span>
                <textarea
                  rows={3}
                  value={f.needs}
                  onChange={(e) => set("needs", e.target.value)}
                  placeholder="Two long form editors and a content manager, for example"
                />
              </label>

              <label className="pf-full">
                <span>When do you need them?</span>
                <div className="pf-chips">
                  {TIMELINES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={f.timeline === t ? "on" : ""}
                      onClick={() => set("timeline", t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </label>

              <label className="pf-full">
                <span>Anything else <i>optional</i></span>
                <textarea
                  rows={2}
                  value={f.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Budget, timezone, anything that helps"
                />
              </label>

              {err && <p className="pf-err">{err}</p>}

              <button className="btn pf-submit" disabled={sending}>
                {sending ? "Sending..." : "Send and get pricing"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
