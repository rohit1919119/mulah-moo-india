import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { COMIC_CSS, CIRCLE_CSS } from "@/comic/styles";
import { Icon, type IconName } from "@/comic/Icon";
import { Logo } from "@/comic/Logo";
import { CIRCLE_SHEET_URL, FONT_LINKS } from "@/comic/data";

export const Route = createFileRoute("/moo-circle")({
  head: () => ({
    meta: [
      { title: "The Moo Circle" },
      { name: "description", content: "A private referral partnership for the creative ecosystem." },
      // The page is reachable by anyone, so it is left indexable. Add
      // { name: "robots", content: "noindex, nofollow" } here if search traffic
      // starts producing requests that are not worth reviewing.
    ],
    links: FONT_LINKS,
  }),
  component: MooCircle,
});

const PERKS: { icon: IconName; tint: string; amount?: string; title: string; body: string }[] = [
  {
    icon: "rupee", tint: "#F5D547", amount: "₹30,000",
    title: "Per client you refer",
    body: "Introduce a brand, studio or creator. They hire through us. You get paid.",
  },
  {
    icon: "star", tint: "#FF5CA8", amount: "₹8,000",
    title: "Per hire you send",
    body: "Share our talent form freely. Every placement earns.",
  },
  {
    icon: "ticket", tint: "#7BE0AD",
    title: "Free or half price at every event",
    body: "Webinars and meetups, for as long as you are in the Circle.",
  },
  {
    icon: "chart", tint: "#6D3FD1",
    title: "Where the market is moving",
    body: "What we learn running placements each week, before it is common knowledge.",
  },
];

type Form = { name: string; email: string; phone: string; linkedin: string };
const EMPTY: Form = { name: "", email: "", phone: "", linkedin: "" };

function MooCircle() {
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
    if (!f.name.trim()) return setErr("Name is required.");
    if (!f.email.includes("@")) return setErr("A valid email is required.");
    if (!f.phone.trim()) return setErr("Contact number is required.");
    if (!f.linkedin.trim()) return setErr("LinkedIn URL is required.");

    setSending(true);
    try {
      await fetch(CIRCLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // marks the row so the Apps Script can route Circle sign-ups away
          // from talent applications, which have a different shape
          form_type: "moo-circle",
          ...f,
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

  return (
    <div className="moo">
      <style dangerouslySetInnerHTML={{ __html: COMIC_CSS + CIRCLE_CSS }} />

      <header className="moo-header">
        <Link to="/" aria-label="Mulah Moo home"><Logo height={23} /></Link>
      </header>

      <section className="circle-hero">
        <div className="dots" />
        <div className="in">
          <div className="circle-badge">
            <Icon name="lock" size={13} color="#C6A9FF" />
            By review only
          </div>
          <h1>
            The Moo <span className="accent">Circle</span>
          </h1>
          <p className="circle-sub">
            A referral partnership for people who already know the best in this industry.
            Introduce talent or clients. Earn when it closes.
          </p>
          <div className="circle-note">
            <Icon name="star" size={15} color="#C6A9FF" />
            <span>
              Anyone can read this page. Very few get in. We review every request
              personally and decline most.
            </span>
          </div>
        </div>
      </section>

      <section className="circle-band band-perks">
        <div className="in">
          <h2>
            What you <span className="accent">get</span>
          </h2>
          <div className="perks">
            {PERKS.map((p) => (
              <div className="perk" key={p.title}>
                <span className="perk-ic" style={{ background: p.tint }}>
                  <Icon name={p.icon} size={23} color="#fff" />
                </span>
                {p.amount && <div className="amt">{p.amount}</div>}
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="circle-band band-tracks">
        <div className="in">
          <h2>
            Two ways <span className="accent">in</span>
          </h2>
          <div className="tracks">
            <div className="track-card">
              <span className="track-tag">Track A</span>
              <h3>Talent referral</h3>
              <p>
                Share our talent form as widely as you like. Anyone who enters your name is
                credited to you.
              </p>
              <ul>
                <li><span><b>₹8,000</b> per successful hire</span></li>
                <li><span>No limit on how many you send</span></li>
                <li><span>Paid on <b>placement</b>, not on interviews</span></li>
                <li><span>Settled within <b>14 days</b> of the client&rsquo;s first payment</span></li>
              </ul>
            </div>
            <div className="track-card">
              <span className="track-tag">Track B</span>
              <h3>Client referral</h3>
              <p>
                Introduce a brand, studio or creator who needs creative talent. They hire
                through us.
              </p>
              <ul>
                <li><span><b>₹30,000</b> per client you refer</span></li>
                <li><span>Confirmed in writing within <b>24 hours</b></span></li>
                <li><span>Paid on their <b>first hire</b> with us</span></li>
                <li><span>Settled within <b>14 days</b> of the placement fee landing</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="circle-band band-apply">
        <div className="in">
          <h2>
            Request a <span className="accent">place</span>
          </h2>
          <div className="circle-panel">
            {done ? (
              <div className="circle-done">
                <div className="mark"><Icon name="star" size={34} color="#111111" /></div>
                <h3>We have it.</h3>
                <p>
                  We will email you to confirm our terms. Nothing is committed
                  until you have seen them.
                </p>
                <div style={{ marginTop: 24 }}>
                  <Link to="/" className="btn sm ghost">&larr; Back to Mulah Moo</Link>
                </div>
              </div>
            ) : (
              // noValidate: with type="email"/"url" the browser blocks submit
              // itself and shows its own bubble, so our handler never runs and
              // the message below never appears. One validator, one voice.
              <form onSubmit={submit} noValidate>
                <p className="circle-lede">
                  Four details. We reply personally.
                </p>
                {([
                  ["name", "Full name", "Your name", "text", "name"],
                  ["email", "Email", "you@example.com", "email", "email"],
                  ["phone", "Contact number", "+91 98765 43210", "tel", "tel"],
                  ["linkedin", "LinkedIn profile URL", "https://linkedin.com/in/yourname", "url", "url"],
                ] as const).map(([k, label, ph, type, ac]) => (
                  <div className="field" key={k}>
                    <label htmlFor={`c-${k}`}>{label}</label>
                    <input
                      id={`c-${k}`} type={type} placeholder={ph} autoComplete={ac}
                      value={f[k]} onChange={(e) => set(k, e.target.value)}
                    />
                  </div>
                ))}
                {err && <span className="err">{err}</span>}
                <div style={{ marginTop: 20 }}>
                  <button type="submit" className="btn" disabled={sending}>
                    {sending ? <span className="spinner" /> : "Request an invite"}
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
          <div className="f-logo"><Logo height={32} mono /></div>
          <p className="f-line">Everything here runs on trust, not contracts.</p>
          <div className="f-rule" />
          <div className="f-socials">
            <a href="mailto:rohit@mulahmoo.com">rohit@mulahmoo.com</a>
          </div>
          <div className="f-bot">
            The Moo Circle &middot; membership by review only
          </div>
        </div>
      </footer>
    </div>
  );
}
