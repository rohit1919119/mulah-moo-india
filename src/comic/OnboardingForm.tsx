import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { V4_CSS } from "@/comic/v4";
import { Nav, Footer } from "@/comic/v4parts";
import { Icon } from "@/comic/Icon";
import { CLIENT_CALL_URL, ONBOARDING_SHEET_URL } from "@/comic/data";
import { ONBOARD_CSS, COUNTRIES } from "@/comic/onboardingData";

/**
 * "/onboarding-form" - the details we need to draw up a client's agreement.
 *
 * Posts to its own Apps Script, not the shared SHEET_URL: that script writes the
 * row, generates the agreement from a Google Doc template and mails it. See
 * ONBOARDING_SHEET_URL in data.ts.
 *
 * Unlike the other forms here, this one reads the response instead of using
 * mode: "no-cors". The endpoint answers {status:"ok"} as text/plain, so no
 * preflight is triggered and a server side failure is actually visible - which
 * matters more here than elsewhere, because a client who sees a false success
 * would sit waiting for an agreement that was never generated.
 */

type Entity = "" | "Company" | "Individual";

type Fields = {
  fullName: string; email: string; phone: string; country: string; channel: string;
  personalAddress: string;
  companyName: string; companyAddress: string; designation: string; companyNumber: string;
  notes: string;
};

const EMPTY: Fields = {
  fullName: "", email: "", phone: "", country: "", channel: "",
  personalAddress: "",
  companyName: "", companyAddress: "", designation: "", companyNumber: "",
  notes: "",
};

export function OnboardingForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  // Company is the default: most creators signing this are contracting through
  // one, and it is the branch with more to fill in.
  const [entity, setEntity] = useState<Entity>("Company");
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof Fields, v: string) => {
    setF((d) => ({ ...d, [k]: v }));
    setBad((b) => ({ ...b, [k]: false }));
    setErr("");
  };

  /* Switching branch clears the one being left. Without this a client who
     starts as a company and switches to individual would submit a stale
     company address alongside their personal one. */
  const pickEntity = (e: Entity) => {
    setEntity(e);
    setF((d) => ({
      ...d,
      personalAddress: e === "Individual" ? d.personalAddress : "",
      companyName: e === "Company" ? d.companyName : "",
      companyAddress: e === "Company" ? d.companyAddress : "",
      designation: e === "Company" ? d.designation : "",
      companyNumber: e === "Company" ? d.companyNumber : "",
    }));
    setErr("");
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const isCo = entity === "Company";
    const required: (keyof Fields)[] = ["fullName", "email", "country", "channel",
      ...(isCo ? (["companyName", "companyAddress", "designation"] as (keyof Fields)[])
               : (["personalAddress"] as (keyof Fields)[]))];

    const misses: Record<string, boolean> = {};
    required.forEach((k) => { if (!f[k].trim()) misses[k] = true; });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) misses.email = true;
    setBad(misses);
    if (Object.keys(misses).length) {
      setErr("Please fill in the highlighted fields.");
      return;
    }

    const channel = f.channel.trim();
    setSending(true);
    try {
      const res = await fetch(ONBOARDING_SHEET_URL, {
        method: "POST",
        // text/plain keeps this a "simple" request, so the browser skips the
        // CORS preflight. Apps Script cannot answer a preflight and the post
        // would fail before it left the page. The script parses JSON regardless.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          form_type: "client-onboarding",
          ...f,
          entity,
          channel: /^https?:\/\//i.test(channel) ? channel : `https://${channel}`,
          submittedAt: new Date().toISOString(),
          source: "/onboarding-form",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const out = await res.json();
      if (out.status !== "ok" && out.ok !== true) throw new Error(out.message || "Rejected.");
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErr("That did not go through. Try again, or email us and we will take it from there.");
    } finally {
      setSending(false);
    }
  }

  const field = (k: keyof Fields) => `ob-f${bad[k] ? " bad" : ""}`;

  return (
    <div className="v4">
      <style dangerouslySetInnerHTML={{ __html: V4_CSS + ONBOARD_CSS }} />

      {/* No hero copy here: whoever reaches this page has read the pitch on
          /onboarding and clicked through to fill something in. The bar exists
          only to carry the nav, which is absolutely positioned and so needs a
          relative parent with a height of its own. */}
      <div className="ob-topbar">
        <Nav
          links={[{ label: "Back to onboarding", to: "/onboarding" }]}
          cta="Book a call"
          ctaHref={CLIENT_CALL_URL}
        />
      </div>

      <section className="ob-formsec">
        <div className="ob-formwrap">
          <div className="ob-card-form">
            {done ? (
              <div className="ob-done">
                <span className="ob-tick"><Icon name="star" size={26} color="#fff" /></span>
                <h3>That is everything we needed.</h3>
                <p>Your details are with us. Here is what happens next, so nothing is a surprise.</p>
                <ol>
                  <li>We draw up your agreement with the details you have just given us.</li>
                  <li>It lands in your inbox, already filled in. <b>Sign and reply on the same thread within 24 hours.</b></li>
                  <li>Once it is signed, we open your shortlist and send vetted profiles over email.</li>
                  <li>You set an assignment, choose your person, and they start the next day.</li>
                </ol>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <p className="ob-step-head"><Icon name="users" size={15} /> 01 — About you</p>
                <div className="ob-fields">
                  <div className="ob-pair">
                    <div className={field("fullName")}>
                      <label htmlFor="fullName">Full name</label>
                      <span className="ob-hint">As it should appear on the agreement.</span>
                      <input id="fullName" value={f.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Jamie Rivera" />
                    </div>
                    <div className={field("email")}>
                      <label htmlFor="email">Email</label>
                      <span className="ob-hint">We send the agreement to this address.</span>
                      <input id="email" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="you@yourchannel.com" />
                    </div>
                  </div>

                  <div className="ob-pair">
                    <div className={field("country")}>
                      <label htmlFor="country">Country</label>
                      <select id="country" value={f.country} onChange={(e) => set("country", e.target.value)}>
                        <option value="">Select a country</option>
                        {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="ob-f">
                      <label htmlFor="phone">Phone <i>optional</i></label>
                      <input id="phone" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 555 000 1234" />
                    </div>
                  </div>

                  <div className={field("channel")}>
                    <label htmlFor="channel">Channel or profile link</label>
                    <input id="channel" value={f.channel} onChange={(e) => set("channel", e.target.value)} placeholder="youtube.com/@yourchannel" />
                  </div>
                </div>

                <p className="ob-step-head"><Icon name="doc" size={15} /> 02 — Who signs the agreement</p>
                <div className="ob-fields">
                  <div className="ob-f">
                    <label>Are you contracting as an individual or a company?</label>
                    <div className="ob-chips">
                      {(["Company", "Individual"] as const).map((t) => (
                        <button key={t} type="button" className={entity === t ? "on" : ""} onClick={() => pickEntity(t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {entity === "Individual" && (
                    <div className="ob-branch">
                      <div className={field("personalAddress")}>
                        <label htmlFor="personalAddress">Billing address</label>
                        <span className="ob-hint">Where invoices should go. Include postcode and country.</span>
                        <textarea id="personalAddress" rows={3} value={f.personalAddress}
                          onChange={(e) => set("personalAddress", e.target.value)}
                          placeholder={"24 Vine Street\nBrooklyn, NY 11222\nUnited States"} />
                      </div>
                    </div>
                  )}

                  {entity === "Company" && (
                    <div className="ob-branch">
                      <div className={field("companyName")}>
                        <label htmlFor="companyName">Legal company name</label>
                        <span className="ob-hint">The registered name, not a trading or brand name.</span>
                        <input id="companyName" value={f.companyName} onChange={(e) => set("companyName", e.target.value)} placeholder="Rivera Media LLC" />
                      </div>
                      <div className={field("companyAddress")}>
                        <label htmlFor="companyAddress">Billing address</label>
                        <span className="ob-hint">Where invoices should go. Include postcode and country.</span>
                        <textarea id="companyAddress" rows={3} value={f.companyAddress}
                          onChange={(e) => set("companyAddress", e.target.value)}
                          placeholder={"1209 Orange Street\nWilmington, DE 19801\nUnited States"} />
                      </div>
                      <div className="ob-pair">
                        <div className={field("designation")}>
                          <label htmlFor="designation">Your designation</label>
                          <span className="ob-hint">How you sign, e.g. Director or Founder.</span>
                          <input id="designation" value={f.designation} onChange={(e) => set("designation", e.target.value)} placeholder="Director" />
                        </div>
                        <div className="ob-f">
                          <label htmlFor="companyNumber">Company registration number <i>optional</i></label>
                          <span className="ob-hint">If your jurisdiction issues one.</span>
                          <input id="companyNumber" value={f.companyNumber} onChange={(e) => set("companyNumber", e.target.value)} placeholder="12345678" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="ob-f">
                    <label htmlFor="notes">Anything we should know before we draft it? <i>optional</i></label>
                    <span className="ob-hint">Billing contact, purchase order requirements, anything specific to your setup.</span>
                    <textarea id="notes" rows={2} value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Optional" />
                  </div>
                </div>

                {err && <p className="ob-err" style={{ marginTop: 20 }}>{err}</p>}

                <div className="ob-actions">
                  <button className="btn" disabled={sending}>
                    {sending ? "Sending..." : "Submit and get my agreement"}
                  </button>
                  <p className="ob-note">We use these details only to prepare your agreement.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer
        line="The team you keep meaning to build."
        crossLink={<Link to="/onboarding">Onboarding</Link>}
      />
    </div>
  );
}
