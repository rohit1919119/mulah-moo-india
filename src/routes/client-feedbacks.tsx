import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { COMIC_CSS, CIRCLE_CSS, FEEDBACK_CSS } from "@/comic/styles";
import { Icon } from "@/comic/Icon";
import { Logo } from "@/comic/Logo";
import { CLIENT_FEEDBACK_SHEET_URL, FONT_LINKS } from "@/comic/data";

export const Route = createFileRoute("/client-feedbacks")({
  head: () => ({
    meta: [
      { title: "How did we do?" },
      {
        name: "description",
        content: "Feedback from the companies that have hired through Mulah Moo.",
      },
      // Sent directly to clients we have worked with. A stranger's submission
      // here is noise, and a fake testimonial is worse than noise.
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: FONT_LINKS,
  }),
  component: ClientFeedback,
});

type Form = {
  fullName: string;
  company: string;
  role: string;
  rating: string;
  experience: string;
  brutalFeedback: string;
  recommend: string;
  testimonial: string;
};

const EMPTY: Form = {
  fullName: "",
  company: "",
  role: "",
  rating: "",
  experience: "",
  brutalFeedback: "",
  recommend: "",
  testimonial: "",
};

const RATING_OPTIONS = ["1", "2", "3", "4", "5"];
const RECOMMEND_OPTIONS = ["Yes", "Maybe", "No"];

const TESTIMONIAL_OPTIONS = ["Yes, with my name and company", "Yes, company only", "No"];

function ClientFeedback() {
  const [f, setF] = useState<Form>(EMPTY);
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof Form>(k: K, v: string) => {
    setF((d) => ({ ...d, [k]: v }));
    setErr("");
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.fullName.trim()) return setErr("Name is required.");
    if (!f.company.trim()) return setErr("Company is required.");
    if (!f.role.trim()) return setErr("Role is required.");
    if (!f.rating) return setErr("Please rate working with us.");
    if (!f.experience.trim()) return setErr("Please tell us how it went.");
    if (!f.recommend) return setErr("Pick one, even if it's a no.");
    // Consent has to be explicit. An unanswered question is not permission to
    // put a company's name on our site.
    if (!f.testimonial) return setErr("Please tell us if we can quote you.");

    setSending(true);
    try {
      await fetch(CLIENT_FEEDBACK_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // routes the row to the client-feedbacks tab rather than the talent
          // application sheet
          form_type: "client-feedback",
          full_name: f.fullName.trim(),
          company: f.company.trim(),
          role: f.role.trim(),
          experience_rating: f.rating,
          experience: f.experience.trim(),
          brutal_feedback: f.brutalFeedback.trim(),
          would_recommend: f.recommend,
          testimonial: f.testimonial,
          source: "/client-feedbacks",
          submitted_at: new Date().toISOString(),
        }),
      });
      setDone(true);
    } catch {
      // no-cors gives an opaque response, so this only fires on a network
      // failure - the request never reaching Google at all.
      setErr("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="moo">
      <style dangerouslySetInnerHTML={{ __html: COMIC_CSS + CIRCLE_CSS + FEEDBACK_CSS }} />

      <header className="moo-header">
        <Link to="/" aria-label="Mulah Moo home">
          <Logo height={23} />
        </Link>
      </header>

      <section className="circle-hero">
        <div className="dots" />
        <div className="in">
          <div className="circle-badge">
            <Icon name="bubble" size={13} color="#C6A9FF" />
            For companies we&rsquo;ve hired for
          </div>
          <h1>
            Did we get it <span className="accent">right</span>?
          </h1>
          <p className="circle-sub">
            You trusted us to find you creative talent. Tell us how that actually worked out: the
            brief, the shortlist, the trial, and the person you ended up with.
          </p>
        </div>
      </section>

      <section className="circle-band band-apply">
        <div className="in">
          <h2>
            Tell us how we <span className="accent">did</span>
          </h2>
          <div className="circle-panel">
            {done ? (
              <div className="circle-done">
                <div className="mark">
                  <Icon name="star" size={34} color="#111111" />
                </div>
                <h3>Thank you, genuinely.</h3>
                <p>
                  This goes straight to the team. If you flagged something we got wrong, expect to
                  hear from us.
                </p>
                <div style={{ marginTop: 24 }}>
                  <Link to="/" className="btn sm ghost">
                    &larr; Back to Mulah Moo
                  </Link>
                </div>
              </div>
            ) : (
              // noValidate so our own validator is the only voice, matching the
              // other forms
              <form onSubmit={submit} noValidate>
                {(
                  [
                    ["fullName", "Full name", "Your name", "name"],
                    ["company", "Company", "Your company", "organization"],
                    ["role", "Role", "Founder, Head of Content, ...", "organization-title"],
                  ] as const
                ).map(([k, label, ph, ac]) => (
                  <div className="field" key={k}>
                    <label htmlFor={`cf-${k}`}>{label}</label>
                    <input
                      id={`cf-${k}`}
                      type="text"
                      placeholder={ph}
                      autoComplete={ac}
                      value={f[k]}
                      onChange={(e) => set(k, e.target.value)}
                    />
                  </div>
                ))}

                <fieldset className="field" style={{ border: 0 }}>
                  <legend className="fb-legend">How would you rate working with us?</legend>
                  <div className="fb-choices five">
                    {RATING_OPTIONS.map((opt) => (
                      <label className={`fb-choice${f.rating === opt ? " on" : ""}`} key={opt}>
                        <input
                          type="radio"
                          name="rating"
                          value={opt}
                          checked={f.rating === opt}
                          onChange={() => set("rating", opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                  <div className="fb-anchors">
                    <span>1 &middot; Poor</span>
                    <span>5 &middot; Excellent</span>
                  </div>
                </fieldset>

                <div className="field">
                  <label htmlFor="cf-experience">Your experience with us</label>
                  <span className="fb-hint">
                    How the hire went: the brief, the shortlist, the trial, and how the person has
                    worked out since.
                  </span>
                  <textarea
                    id="cf-experience"
                    placeholder="Start anywhere. The specific bits help most."
                    value={f.experience}
                    onChange={(e) => set("experience", e.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="cf-brutal">Brutal feedback for us</label>
                  <span className="fb-hint">
                    Where we fell short. Please don&rsquo;t soften it, the softened version is no
                    use to us.
                  </span>
                  <textarea
                    id="cf-brutal"
                    placeholder="We would rather read it here than lose the next client over it."
                    value={f.brutalFeedback}
                    onChange={(e) => set("brutalFeedback", e.target.value)}
                  />
                </div>

                <fieldset className="field" style={{ border: 0 }}>
                  <legend className="fb-legend">Would you recommend us to your network?</legend>
                  <div className="fb-choices">
                    {RECOMMEND_OPTIONS.map((opt) => (
                      <label className={`fb-choice${f.recommend === opt ? " on" : ""}`} key={opt}>
                        <input
                          type="radio"
                          name="recommend"
                          value={opt}
                          checked={f.recommend === opt}
                          onChange={() => set("recommend", opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="field" style={{ border: 0 }}>
                  <legend className="fb-legend">Can we use your testimonial on our page?</legend>
                  <span className="fb-hint">
                    Only if you say yes. We never publish a name or a company that wasn&rsquo;t
                    offered.
                  </span>
                  <div className="fb-choices">
                    {TESTIMONIAL_OPTIONS.map((opt) => (
                      <label className={`fb-choice${f.testimonial === opt ? " on" : ""}`} key={opt}>
                        <input
                          type="radio"
                          name="testimonial"
                          value={opt}
                          checked={f.testimonial === opt}
                          onChange={() => set("testimonial", opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {err && <span className="err">{err}</span>}

                <div style={{ marginTop: 20 }}>
                  <button type="submit" className="btn" disabled={sending}>
                    {sending ? <span className="spinner" /> : "Send feedback"}
                    {!sending && <Icon name="bolt" size={17} color="#F5D547" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="moo-footer">
        <div className="in">
          <div className="f-logo">
            <Logo height={32} mono />
          </div>
          <p className="f-line">The team you keep meaning to build.</p>
          <div className="f-rule" />
          <div className="f-socials">
            <a href="mailto:rohit@mulahmoo.com">rohit@mulahmoo.com</a>
          </div>
          <div className="f-bot">Your answers stay internal unless you tell us otherwise.</div>
        </div>
      </footer>
    </div>
  );
}
