import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { V4_CSS } from "@/comic/v4";
import { Nav, Footer, Ticker, useReveal } from "@/comic/v4parts";
import { Icon, type IconName } from "@/comic/Icon";
import { CLIENT_CALL_URL } from "@/comic/data";
import {
  ONBOARD_CSS, CREATORS, ROLE_WORDS, STATS, STEPS, COMPARE,
  TIERS, INCLUDED, NEVER_BILLED, FAQ, AFTER_CALL,
} from "@/comic/onboardingData";

/**
 * "/onboarding" - where a creator lands straight after their call.
 *
 * It is not a pitch. They have already said yes, so the job here is to make the
 * commercials unambiguous before they sign, and to get them into the form. Hence
 * the fee panel spelling out the single charge, and the comparison that concedes
 * a point to hiring solo rather than winning every row.
 */

const STAT_ICONS: IconName[] = ["clock", "shield", "bank"];

function Mark({ v }: { v: "yes" | "no" | "mid" }) {
  return (
    <span className={`ob-mark ${v}`} aria-label={v === "yes" ? "yes" : v === "no" ? "no" : "partly"}>
      {v === "yes" ? "✓" : v === "mid" ? "–" : ""}
    </span>
  );
}

function CreatorCard({ c }: { c: (typeof CREATORS)[number] }) {
  const initials = c.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const inner = (
    <>
      <span className="ob-shot">
        <span className="ob-mono">{initials}</span>
        {/* onError removes the img so the monogram behind it shows. Files live
            in public/onboarding and are square, so cover crops nothing. */}
        <img
          src={`/onboarding/${c.slug}.jpg`}
          alt=""
          loading="lazy"
          onError={(e) => e.currentTarget.remove()}
        />
        <span className="ob-badge">
          <Icon name={c.stats[0].icon === "ig" ? "instagram" : c.stats[0].icon === "yt" ? "youtube" : "star"} size={15} />
        </span>
      </span>
      <span className="ob-body">
        <h3>{c.name}</h3>
        <p className="ob-meta">{c.region} <i /> {c.field}</p>
        <ul className="ob-stats">
          {c.stats.map((s) => (
            <li key={s.big}>
              <Icon
                className="ob-ic"
                name={s.icon === "ig" ? "instagram" : s.icon === "yt" ? "youtube" : "star"}
                size={15}
              />
              <span><b>{s.big}</b> {s.rest}</span>
            </li>
          ))}
        </ul>
      </span>
    </>
  );

  return c.url ? (
    <a className="ob-card" href={c.url} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div className="ob-card">{inner}</div>
  );
}

/**
 * The rail loops by translating one full set to the left, which needs a second
 * identical set behind the first. Cloning here rather than duplicating the
 * markup keeps one copy of each creator to edit, and the animation only starts
 * once the clones exist - so if this never runs the row simply sits still and
 * scrolls by hand instead of animating a half empty track.
 */
export function CreatorRail() {
  const rail = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReady(true);
  }, []);

  return (
    <div className={`ob-rail${ready ? " ready" : ""}`} ref={rail}>
      <div className="ob-track">
        {CREATORS.map((c) => <CreatorCard key={c.slug} c={c} />)}
        {ready &&
          CREATORS.map((c) => (
            // decoration only: the nine creators are announced once
            <div key={`${c.slug}-clone`} aria-hidden="true" className="ob-card-clone" style={{ display: "contents" }}>
              <CreatorCard c={c} />
            </div>
          ))}
      </div>
    </div>
  );
}

export function Onboarding() {
  const stepsRef = useReveal<HTMLDivElement>();
  const tiersRef = useReveal<HTMLDivElement>();

  return (
    <div className="v4">
      <style dangerouslySetInnerHTML={{ __html: V4_CSS + ONBOARD_CSS }} />

      <section className="hero">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="grid-bg" />

        <Nav
          links={[
            { label: "How it works", href: "#how" },
            { label: "Pricing", href: "#pricing" },
            { label: "For creatives ↗", to: "/moo-talent", grad: true },
          ]}
          cta="Book a call"
          ctaHref={CLIENT_CALL_URL}
        />

        <div className="hero-in">
          <h1 className="disp">
            Thank you for
            <br />
            <span className="it">trusting</span> us.
          </h1>
          <p className="hero-sub">
            We are excited to work together and help you find the right talent. Start your
            onboarding below and we will have your agreement over to you shortly.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/onboarding-form">
              Start onboarding <span aria-hidden="true">&#8599;</span>
            </Link>
            <a className="btn ghost" href="#pricing">See pricing</a>
          </div>
        </div>
      </section>

      <div className="ob-band">
        <div className="ob-bandgrid">
          {STATS.map((s, i) => (
            <div className="ob-stat" key={s.big}>
              <Icon className="ob-ic" name={STAT_ICONS[i]} size={26} />
              <div>
                <b>{s.big}</b>
                <span>{s.line}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Ticker words={ROLE_WORDS} />

      <section>
        <div className="in">
          <div className="shead">
            <span className="sno">01</span>
            <h2>Creators we<br /><span className="it">work with</span>.</h2>
          </div>
          <p className="ob-count">
            We have worked with <em>50+ creators and brands</em>.
          </p>
        </div>
        <CreatorRail />
      </section>

      <section id="how">
        <div className="in">
          <div className="shead">
            <span className="sno">02</span>
            <h2>How it <span className="it">works</span>.</h2>
          </div>
          <p className="slede">
            Four steps, roughly seven days from the first call to someone working in your pipeline.
          </p>
          <div className="ob-steps" data-reveal ref={stepsRef} style={{ marginTop: 44 }}>
            {STEPS.map((s) => (
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
            <span className="sno">03</span>
            <h2>How this <span className="it">compares</span>.</h2>
          </div>
          <p className="slede">Measured against the two options most creators try first.</p>
          <div className="ob-cmpwrap" style={{ marginTop: 44 }}>
            <table className="ob-cmp">
              <thead>
                <tr>
                  <th />
                  <th className="us">Mulah Moo</th>
                  <th>An agency</th>
                  <th>Hiring on your own</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.row}>
                    <th scope="row"><span>{r.row}</span></th>
                    <td className="us"><span className="ob-cell"><Mark v={r.us.v} />{r.us.t}</span></td>
                    <td><span className="ob-cell"><Mark v={r.agency.v} />{r.agency.t}</span></td>
                    <td><span className="ob-cell"><Mark v={r.solo.v} />{r.solo.t}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="in">
          <div className="shead">
            <span className="sno">04</span>
            <h2><span className="it">Pricing</span>.</h2>
          </div>
          <p className="slede">
            Flat monthly rates in USD. Where you sit within a range depends on your niche,
            production complexity and turnaround.
          </p>

          <div className="ob-tiers" data-reveal ref={tiersRef} style={{ marginTop: 44 }}>
            {TIERS.map((t) => (
              <div className={`ob-tier${t.lead ? " lead" : ""}`} key={t.tag}>
                <div className="ob-tierhead">
                  <span className="ob-tieric"><Icon name={t.icon} size={22} /></span>
                  <span className="ob-tiertag">{t.tag}</span>
                </div>
                <p className="ob-amt">{t.amount}</p>
                <p className="ob-per">per month</p>
                <p className="ob-scope">{t.scope}</p>
                <p className="ob-roleslbl">Roles</p>
                <ul className="ob-roles">
                  {t.roles.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="ob-incl">
            <h3>Every engagement includes</h3>
            <ul>
              {INCLUDED.map((i) => (
                <li key={i.head}>
                  <Icon className="ob-ic" name={i.icon} size={21} />
                  <span><b>{i.head}</b>{i.body}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ob-fee">
            <div className="ob-feemain">
              <p className="ob-feelbl"><Icon name="tag" size={15} /> Our fee</p>
              <p className="ob-feehead">We charge you <em>once</em>.</p>
              <p>
                A single placement fee, equal to one month at your agreed rate, charged after your
                talent has completed seven days working with you. That is the only fee Mulah Moo
                bills you.
              </p>
              <div className="ob-feesplit">
                <div>
                  <Icon className="ob-ic" name="tag" size={20} />
                  <span><b>What you pay us</b>One placement fee. Once, per person you hire.</span>
                </div>
                <div>
                  <Icon className="ob-ic" name="users" size={20} />
                  <span><b>What you pay every month</b>Your talent&rsquo;s agreed monthly rate.</span>
                </div>
              </div>
              <p className="ob-feenote">
                We may separately charge your talent a fee for handling their contracting and
                payments, and for access to our community and resources. It does not affect what
                you pay, or what they deliver.
              </p>
            </div>
            <div className="ob-feenever">
              <p className="ob-feelbl">What we never bill you for</p>
              <ul>
                {NEVER_BILLED.map((n) => (
                  <li key={n}><span className="ob-mark no" aria-hidden="true" />{n}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ob-worked">
            <p className="ob-feelbl"><Icon name="tag" size={15} /> What the first months look like</p>
            <ol>
              <li>You hire one YouTube editor at <b>$2,000 a month</b>.</li>
              <li>Once they have <b>completed 7 days</b> with you, a one-time placement fee of $2,000.</li>
              <li><b>Every month:</b> $2,000 to your editor, via our bank, for as long as you keep them.</li>
              <li>Not working out? Replace them free, any time in the first nine months.</li>
            </ol>
          </div>
        </div>
      </section>

      <section>
        <div className="in">
          <div className="shead">
            <span className="sno">05</span>
            <h2>Common <span className="it">questions</span>.</h2>
          </div>
          <div className="ob-faq" style={{ marginTop: 40 }}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<i>+</i></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="rings" />
        <div className="band-in">
          <h2>
            Let us get your<br />
            <span className="it">agreement drawn up.</span>
          </h2>
          <div className="ob-flow" style={{ margin: "38px 0 34px", textAlign: "left" }}>
            {AFTER_CALL.map((s) => (
              <div className="ob-flowitem" key={s.no}>
                <div className="ob-flowtop">
                  <Icon className="ob-ic" name={s.icon} size={24} />
                  <span className="ob-no">{s.no}</span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: s.body }} />
              </div>
            ))}
          </div>
          <div className="band-actions">
            <Link className="btn" to="/onboarding-form">
              Start onboarding <span aria-hidden="true">&#8599;</span>
            </Link>
            <a className="btn ghost" href={CLIENT_CALL_URL} target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
          </div>
        </div>
      </section>

      <Footer
        line="The team you keep meaning to build."
        crossLink={<Link to="/">Home</Link>}
      />
    </div>
  );
}
