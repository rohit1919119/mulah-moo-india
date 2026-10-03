import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { V4_CSS } from "@/comic/v4";
import { Nav, Footer, Ticker } from "@/comic/v4parts";
import { Icon } from "@/comic/Icon";
import { SHEET_URL, TALENT_CALL_URL } from "@/comic/data";
import { ONBOARD_CSS } from "@/comic/onboardingData";
import { CreatorRail } from "@/comic/Onboarding";
import {
  MV_CSS, MV_STATS, MV_BAR, MV_USPS, MV_PAID, MV_EXPECT, MV_STEPS,
  MV_ARENA, MV_TESTIMONIALS, MV_ROLES, MV_EXPERIENCE,
} from "@/comic/mooVerifiedData";

/**
 * "/moo-verified" - the editor facing page.
 *
 * Editors only. Nothing here mentions writers, designers, strategists or
 * managers even though we place all of them: Moo Verified is a bench of
 * editors, and a page that hedges on that attracts the wrong applications.
 *
 * The application form is a modal, not a section. Three places open it - the
 * nav, the hero and the Arena panel - and inlining it would mean either three
 * copies of the form or a page that jumps somewhere unexpected when clicked.
 *
 * It posts to the same Apps Script as the other talent forms and lands in the
 * "Inbound talents" tab, with Moo Arena interest as a column on the same row
 * rather than a second sheet: one person opting into both should be one row.
 */

type Fields = {
  name: string; email: string; phone: string; city: string;
  role: string; experience: string; portfolio: string; note: string;
};

const EMPTY: Fields = {
  name: "", email: "", phone: "", city: "",
  role: "", experience: "", portfolio: "", note: "",
};

function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [f, setF] = useState<Fields>(EMPTY);
  const [arena, setArena] = useState(false);
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  // Escape closes, and the scroll lock is released on unmount too, so a route
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
    setBad((b) => ({ ...b, [k]: false }));
    setErr("");
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const misses: Record<string, boolean> = {};
    (["name", "city", "role", "experience", "portfolio"] as (keyof Fields)[])
      .forEach((k) => { if (!f[k].trim()) misses[k] = true; });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) misses.email = true;
    setBad(misses);
    if (Object.keys(misses).length) {
      setErr("Please fill in the highlighted fields.");
      return;
    }

    const portfolio = f.portfolio.trim();
    setSending(true);
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        // no-cors, matching the other talent forms: the response is opaque, so
        // a server side failure cannot be seen here. The client onboarding form
        // reads its response instead, because a false success there would leave
        // a paying client waiting on an agreement that was never generated.
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "moo-verified",
          ...f,
          portfolio: /^https?:\/\//i.test(portfolio) ? portfolio : `https://${portfolio}`,
          mooArena: arena ? "Yes" : "",   // "Moo Arena" column on the same row
          note: f.note.trim() || "—",
          submitted_at: new Date().toISOString(),
          source: "/moo-verified",
        }),
      });
      setDone(true);
    } catch {
      setErr("That did not go through. Try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;
  const fld = (k: keyof Fields) => `ob-f${bad[k] ? " bad" : ""}`;

  return (
    <div className="mv-modal" onClick={onClose}>
      <div
        className="mv-modalin"
        role="dialog"
        aria-modal="true"
        aria-label="Apply to Moo Verified"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="mv-x" onClick={onClose} aria-label="Close" />

        {done ? (
          <div className="ob-done">
            <span className="ob-tick"><Icon name="star" size={26} color="#fff" /></span>
            <h3>Got it. Thank you.</h3>
            <p>
              We read every application ourselves. If there is a contract that fits you we will be
              in touch to set up an interview{arena ? ", and your Moo Arena joining link is on its way too" : ""}.
            </p>
            <button type="button" className="btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="mv-modalhead">
              <h3>Apply to Moo Verified</h3>
              <p>
                Basic details only. We shortlist by hand, interview everyone we shortlist, and come
                back to the editors we want to work with.
              </p>
            </div>

            <form onSubmit={submit} noValidate>
              <div className="ob-fields">
                <div className="ob-pair">
                  <div className={fld("name")}>
                    <label htmlFor="mvName">Your name</label>
                    <input id="mvName" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Priya Sharma" />
                  </div>
                  <div className={fld("email")}>
                    <label htmlFor="mvEmail">Email</label>
                    <input id="mvEmail" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
                  </div>
                </div>

                <div className="ob-pair">
                  <div className="ob-f">
                    <label htmlFor="mvPhone">Phone <i>optional</i></label>
                    <input id="mvPhone" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" />
                  </div>
                  <div className={fld("city")}>
                    <label htmlFor="mvCity">City</label>
                    <input id="mvCity" value={f.city} onChange={(e) => set("city", e.target.value)} placeholder="Mumbai" />
                  </div>
                </div>

                <div className={fld("role")}>
                  <label>What kind of editing do you do?</label>
                  <div className="ob-chips">
                    {MV_ROLES.map((r) => (
                      <button key={r} type="button" className={f.role === r ? "on" : ""} onClick={() => set("role", r)}>{r}</button>
                    ))}
                  </div>
                </div>

                <div className={fld("experience")}>
                  <label>How long have you been editing?</label>
                  <div className="ob-chips">
                    {MV_EXPERIENCE.map((x) => (
                      <button key={x} type="button" className={f.experience === x ? "on" : ""} onClick={() => set("experience", x)}>{x}</button>
                    ))}
                  </div>
                </div>

                <div className={fld("portfolio")}>
                  <label htmlFor="mvPortfolio">Showreel or portfolio</label>
                  <span className="ob-hint">This is the part we actually look at. A link to work, not a CV.</span>
                  <input id="mvPortfolio" value={f.portfolio} onChange={(e) => set("portfolio", e.target.value)} placeholder="A Drive folder, a YouTube playlist, your site" />
                </div>

                <div className="ob-f">
                  <label htmlFor="mvNote">Anything else? <i>optional</i></label>
                  <textarea id="mvNote" rows={2} value={f.note} onChange={(e) => set("note", e.target.value)} placeholder="Niches you know well, tools you use, availability" />
                </div>

                <label className="mv-optin">
                  <input type="checkbox" checked={arena} onChange={(e) => setArena(e.target.checked)} />
                  <span>
                    <b>Also send me the Moo Arena joining link</b>
                    <span>$20 a month, cancel any time. Opportunities go to Arena members first.</span>
                  </span>
                </label>
              </div>

              {err && <p className="ob-err" style={{ marginTop: 20 }}>{err}</p>}

              <div className="ob-actions">
                <button className="btn" disabled={sending}>
                  {sending ? "Sending..." : "Apply to join"}
                </button>
                <p className="ob-note">We read every application. No automated rejections.</p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* Anonymous consent means no name, no photo and no link - role and company
   only. `named` comes straight from the consent column on the feedback form. */
function Quote({ q }: { q: (typeof MV_TESTIMONIALS)[number] }) {
  return (
    <figure className="mv-quote">
      <blockquote>&ldquo;{q.quote}&rdquo;</blockquote>
      <figcaption className="mv-who">
        <span className="mv-face">
          <Icon name="users" size={20} />
          {/* An icon stands in until real photos land. Drop a square JPG into
              public/talent named by slug and it covers the icon, no code change.
              Only named people get one: a face on an anonymous quote would
              undo the anonymity. */}
          {q.named && q.slug && (
            <img src={`/talent/${q.slug}.jpg`} alt="" loading="lazy" onError={(e) => e.currentTarget.remove()} />
          )}
        </span>
        <span className="mv-whotext">
          <b>{q.named ? q.name : q.role}</b>
          <span>{q.named ? `${q.role}, ${q.company}` : q.company}</span>
        </span>
        {q.named && q.linkedin && (
          <a className="mv-li" href={q.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${q.name} on LinkedIn`}>
            <Icon name="linkedin" size={16} />
          </a>
        )}
      </figcaption>
    </figure>
  );
}

export function MooVerified() {
  const [apply, setApply] = useState(false);
  const openApply = () => setApply(true);

  return (
    <div className="v4">
      <style dangerouslySetInnerHTML={{ __html: V4_CSS + ONBOARD_CSS + MV_CSS }} />

      <section className="hero mv-hero">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="grid-bg" />

        <Nav
          links={[
            { label: "Who this is for", href: "#bar" },
            { label: "What you get", href: "#what" },
            { label: "Moo Arena", href: "#arena" },
          ]}
          cta="Apply"
          ctaOnClick={openApply}
        />

        <div className="hero-in">
          <h1 className="disp">
            Become Moo Verified.
            <br />
            Access <span className="mv-shine">₹1L+/month</span> contracts.
          </h1>
          <div className="hero-actions">
            <button type="button" className="btn" onClick={openApply}>
              Apply to join <span aria-hidden="true">&#8599;</span>
            </button>
            <a className="btn ghost" href={TALENT_CALL_URL} target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
          </div>
        </div>
      </section>

      <div className="ob-band">
        <div className="ob-bandgrid">
          {MV_STATS.map((s) => (
            <div className="ob-stat" key={s.big}>
              <Icon className="ob-ic" name={s.icon} size={26} />
              <div><b>{s.big}</b><span>{s.line}</span></div>
            </div>
          ))}
        </div>
      </div>

      <Ticker words={MV_ROLES} />

      <section id="bar">
        <div className="in">
          <div className="shead">
            <span className="sno">01</span>
            <h2>Who this is <span className="it">for</span>.</h2>
          </div>
          <p className="slede">
            Moo Verified is not an open network. We interview every editor before they carry the
            tag, and we turn most people down. If the list below sounds like you, apply.
          </p>
          <div className="ob-incl" style={{ marginTop: 44 }}>
            <h3>What we look for</h3>
            <ul>
              {MV_BAR.map((b) => (
                <li key={b.head}>
                  <Icon className="ob-ic" name={b.icon} size={21} />
                  <span><b>{b.head}</b>{b.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="what">
        <div className="in">
          <div className="shead">
            <span className="sno">02</span>
            <h2>What Moo Verified<br /><span className="it">gets you</span>.</h2>
          </div>
          <p className="slede">
            We are not a marketplace and we are not a job board. We place a small number of editors
            into contracts we have already scoped with the creator.
          </p>
          <div className="mv-usps" style={{ marginTop: 44 }}>
            {MV_USPS.map((u) => (
              <div className="mv-usp" key={u.head}>
                <div className="mv-uspic"><Icon name={u.icon} size={24} /></div>
                <h3>{u.head}</h3>
                <p>{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 0 }}>
        <div className="in">
          <div className="shead">
            <span className="sno">03</span>
            <h2>Creators our editors<br /><span className="it">work with</span>.</h2>
          </div>
        </div>
      </section>
      <CreatorRail />

      <section>
        <div className="in">
          <div className="shead">
            <span className="sno">04</span>
            <h2>Every assignment<br />is <span className="it">paid</span>.</h2>
          </div>
          <p className="slede">
            Test edits are work. If we ask you to do one, you are paid for it whether or not the
            contract comes your way.
          </p>
          <div className="mv-paid" style={{ marginTop: 44 }}>
            {MV_PAID.map((a) => (
              <div className="mv-paidcard" key={a.role}>
                <span className="mv-paidic"><Icon name={a.icon} size={24} /></span>
                <div>
                  <p className="mv-amt">{a.amount}</p>
                  <p className="mv-paidrole">{a.role}</p>
                  <p>{a.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="in">
          <div className="shead">
            <span className="sno">05</span>
            <h2>How it <span className="it">works</span>.</h2>
          </div>
          <div className="ob-steps" style={{ marginTop: 44 }}>
            {MV_STEPS.map((s) => (
              <div className="ob-step" key={s.no}>
                <div className="ob-stepic"><Icon name={s.icon} size={24} /></div>
                <span className="ob-no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="in">
          <div className="shead">
            <span className="sno">06</span>
            <h2>What we expect<br /><span className="it">from you</span>.</h2>
          </div>
          <p className="slede">
            Worth reading before you apply. These contracts work because both sides commit.
          </p>
          <div className="mv-usps" style={{ marginTop: 44 }}>
            {MV_EXPECT.map((x) => (
              <div className="mv-usp" key={x.head}>
                <div className="mv-uspic"><Icon name={x.icon} size={24} /></div>
                <h3>{x.head}</h3>
                <p>{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="in">
          <div className="shead">
            <span className="sno">07</span>
            <h2>People we have<br /><span className="it">placed</span>.</h2>
          </div>
          <p className="slede">Their words, from our post-placement feedback form.</p>
          <div className="mv-quotes" style={{ marginTop: 44 }}>
            {MV_TESTIMONIALS.map((q, i) => <Quote key={q.slug || `anon-${i}`} q={q} />)}
          </div>
        </div>
      </section>

      <section id="arena">
        <div className="in">
          <div className="mv-arena">
            <div className="mv-arenacopy">
              <h2 className="disp">Moo <span className="it">Arena</span></h2>
              <p>
                A paid community for editors who want to get better and get first look at what we
                are placing. You do not need to be on a contract with us to join.
              </p>
              <ul className="mv-arenalist">
                {MV_ARENA.map((a) => (
                  <li key={a}><Icon className="ob-ic" name="star" size={18} />{a}</li>
                ))}
              </ul>
            </div>
            <div className="mv-price">
              <p className="mv-pricebig">$20</p>
              <p className="mv-priceper">per month</p>
              <p className="mv-pricenote">
                Tick the Arena box when you apply and we will send you the joining link.
              </p>
              <button type="button" className="btn" onClick={openApply}>Join Moo Arena</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="in">
          <div className="mv-ask">
            <div>
              <h2 className="disp">Still have <span className="it">a question?</span></h2>
              <p>
                Whether Moo Verified is right for you usually depends on what you are working on
                now. Thirty minutes on a call answers that faster than any page can.
              </p>
            </div>
            <div className="mv-askacts">
              <a className="btn" href={TALENT_CALL_URL} target="_blank" rel="noopener noreferrer">
                Book a call <span aria-hidden="true">&#8599;</span>
              </a>
              <button type="button" className="btn ghost" onClick={openApply}>Apply instead</button>
            </div>
          </div>
        </div>
      </section>

      <Footer line="The work you actually want to be doing." crossLink={<Link to="/">Mulah Moo</Link>} />

      <ApplyModal open={apply} onClose={() => setApply(false)} />
    </div>
  );
}
