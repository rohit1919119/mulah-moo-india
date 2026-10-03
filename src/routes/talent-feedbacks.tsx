import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { COMIC_CSS, CIRCLE_CSS, FEEDBACK_CSS } from "@/comic/styles";
import { Icon } from "@/comic/Icon";
import { Logo } from "@/comic/Logo";
import { FEEDBACK_SHEET_URL, FONT_LINKS } from "@/comic/data";

export const Route = createFileRoute("/talent-feedbacks")({
  head: () => ({
    meta: [
      { title: "Tell us how it went" },
      {
        name: "description",
        content: "Feedback from the creatives Mulah Moo has placed.",
      },
      // Not a page we want in search results - it is sent directly to people
      // we have already worked with, and a stranger's submission is noise.
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: FONT_LINKS,
  }),
  component: TalentFeedback,
});

type Form = {
  fullName: string;
  company: string;
  role: string;
  linkedin: string;
  rating: string;
  experience: string;
  platformFeedback: string;
  referral: string;
  testimonial: string;
};

const EMPTY: Form = {
  fullName: "",
  company: "",
  role: "",
  linkedin: "",
  rating: "",
  experience: "",
  platformFeedback: "",
  referral: "",
  testimonial: "",
};

const REFERRAL_OPTIONS = ["Yes", "Maybe", "No"];
const RATING_OPTIONS = ["1", "2", "3", "4", "5"];

// Spelled out rather than left as bare numbers, so the sheet reads on its own
// and nobody has to remember which end of the scale was good.
const TESTIMONIAL_OPTIONS = [
  { val: "Yes, with my name", label: "Yes, with my name" },
  { val: "Yes, anonymously", label: "Yes, anonymously" },
  { val: "No", label: "No" },
];

function TalentFeedback() {
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
    if (!f.rating) return setErr("Please rate your experience.");
    if (!f.experience.trim()) return setErr("Please tell us how it went.");
    if (!f.referral) return setErr("Pick one, even if it's a no.");
    // Consent has to be explicit. An unanswered question is not permission to
    // publish someone's words under their name.
    if (!f.testimonial) return setErr("Please tell us if we can quote you.");

    const linkedin = f.linkedin.trim();

    setSending(true);
    try {
      await fetch(FEEDBACK_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // marks the row so the Apps Script routes feedback to its own tab
          // rather than the talent application sheet
          form_type: "talent-feedback",
          full_name: f.fullName.trim(),
          company: f.company.trim(),
          role: f.role.trim(),
          // a bare linkedin.com/in/... is unclickable in the sheet without this
          linkedin: linkedin && !/^https?:\/\//i.test(linkedin) ? `https://${linkedin}` : linkedin,
          experience_rating: f.rating,
          experience: f.experience.trim(),
          platform_feedback: f.platformFeedback.trim(),
          testimonial: f.testimonial,
          would_refer: f.referral,
          source: "/talent-feedbacks",
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
            For creatives we&rsquo;ve placed
          </div>
          <h1>
            How was it, <span className="accent">really</span>?
          </h1>
          <p className="circle-sub">
            You came through Mulah Moo to land a role. We want the honest version: what worked, what
            didn&rsquo;t, and what we should fix for the next person.
          </p>
        </div>
      </section>

      <section className="circle-band band-apply">
        <div className="in">
          <h2>
            Tell us how it <span className="accent">went</span>
          </h2>
          <div className="circle-panel">
            {done ? (
              <div className="circle-done">
                <div className="mark">
                  <Icon name="star" size={34} color="#111111" />
                </div>
                <h3>Thank you, genuinely.</h3>
                <p>
                  This goes straight to the team. If you flagged something we need to fix, expect to
                  hear from us.
                </p>
                <div style={{ marginTop: 24 }}>
                  <Link to="/" className="btn sm ghost">
                    &larr; Back to Mulah Moo
                  </Link>
                </div>
              </div>
            ) : (
              // noValidate: with type="url" the browser blocks submit itself and
              // shows its own bubble, so our handler never runs and the message
              // below never appears. One validator, one voice.
              <form onSubmit={submit} noValidate>
                {(
                  [
                    ["fullName", "Full name", "Your name", "text", "name"],
                    ["company", "Company", "Where you're working now", "text", "organization"],
                    [
                      "role",
                      "Role",
                      "Video Editor, Content Strategist, ...",
                      "text",
                      "organization-title",
                    ],
                  ] as const
                ).map(([k, label, ph, type, ac]) => (
                  <div className="field" key={k}>
                    <label htmlFor={`fb-${k}`}>{label}</label>
                    <input
                      id={`fb-${k}`}
                      type={type}
                      placeholder={ph}
                      autoComplete={ac}
                      value={f[k]}
                      onChange={(e) => set(k, e.target.value)}
                    />
                  </div>
                ))}

                <div className="field">
                  <label htmlFor="fb-linkedin">
                    LinkedIn <span className="fb-optional">(optional)</span>
                  </label>
                  <input
                    id="fb-linkedin"
                    type="url"
                    placeholder="linkedin.com/in/yourname"
                    autoComplete="url"
                    value={f.linkedin}
                    onChange={(e) => set("linkedin", e.target.value)}
                  />
                </div>

                <fieldset className="field" style={{ border: 0 }}>
                  <legend className="fb-legend">How would you rate your experience with us?</legend>
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
                  <label htmlFor="fb-experience">Your experience with us</label>
                  <span className="fb-hint">
                    How the hiring process went: outreach, the brief, the trial, communication, how
                    you were treated.
                  </span>
                  <textarea
                    id="fb-experience"
                    placeholder="Start anywhere. The specific bits help most."
                    value={f.experience}
                    onChange={(e) => set("experience", e.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="fb-platform">A feedback for our platform</label>
                  <span className="fb-hint">
                    Anything clunky, confusing, or missing, and anything you&rsquo;d want us to
                    build.
                  </span>
                  <textarea
                    id="fb-platform"
                    placeholder="Be blunt. We won't take it personally."
                    value={f.platformFeedback}
                    onChange={(e) => set("platformFeedback", e.target.value)}
                  />
                </div>

                <fieldset className="field" style={{ border: 0 }}>
                  <legend className="fb-legend">Would you refer other folks to us?</legend>
                  <div className="fb-choices">
                    {REFERRAL_OPTIONS.map((opt) => (
                      <label className={`fb-choice${f.referral === opt ? " on" : ""}`} key={opt}>
                        <input
                          type="radio"
                          name="referral"
                          value={opt}
                          checked={f.referral === opt}
                          onChange={() => set("referral", opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="field" style={{ border: 0 }}>
                  <legend className="fb-legend">
                    Can we use your response publicly as a testimonial?
                  </legend>
                  <span className="fb-hint">
                    Only if you say yes. We never publish a name that wasn&rsquo;t offered.
                  </span>
                  <div className="fb-choices">
                    {TESTIMONIAL_OPTIONS.map((opt) => (
                      <label
                        className={`fb-choice${f.testimonial === opt.val ? " on" : ""}`}
                        key={opt.val}
                      >
                        <input
                          type="radio"
                          name="testimonial"
                          value={opt.val}
                          checked={f.testimonial === opt.val}
                          onChange={() => set("testimonial", opt.val)}
                        />
                        <span>{opt.label}</span>
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
