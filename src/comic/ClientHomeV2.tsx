import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { V5_CSS } from "@/comic/v5";
import { Logo } from "@/comic/Logo";
import { ArtTeam, ArtLeader, ArtRetainer } from "@/comic/v4art";
import { RAIL_CLIENTS, CASES, DUMMY_QUOTES } from "@/comic/clients";
import { SOCIALS, LEGAL_NAME, CLIENT_CALL_URL } from "@/comic/data";

/**
 * Version 2 of the client home: an alternative direction, kept but not routed.
 *
 * Same content as "/", rebuilt on a single centre axis in Instrument Serif and
 * Space Grotesk. Where v4 leans on heavy borders and hard shadows, this leans on
 * hairline rules and whitespace, so the two read as genuinely different designs
 * rather than a recolour.
 *
 * v1 was chosen, so src/routes/home-v2.tsx was deleted and this is no longer
 * reachable or bundled. To bring it back, add a route file that renders it.
 */
export function ClientHomeV2() {
  const [active, setActive] = useState(CASES[0].id);
  const c = CASES.find((x) => x.id === active) ?? CASES[0];

  return (
    <div className="v5">
      <style dangerouslySetInnerHTML={{ __html: V5_CSS }} />

      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-rings" />

        <header className="nav">
          <Link to="/" aria-label="Mulah Moo home"><Logo height={22} /></Link>
          <div className="grow" />
          <nav className="navlinks">
            <a href="#what">What we do</a>
            <a href="#cases">Case studies</a>
            <Link to="/moo-talent">For creatives</Link>
          </nav>
          <div className="grow" />
          <a className="btn sm" href={CLIENT_CALL_URL} target="_blank" rel="noopener noreferrer">
            Reserve a spot
          </a>
        </header>

        <div className="hero-in">
          <div className="rule" />
          <h1 className="disp">
            We build content teams
            <br />
            that create an <span className="it">elite online presence</span>.
          </h1>
          <div className="hero-actions">
            <a className="btn" href={CLIENT_CALL_URL} target="_blank" rel="noopener noreferrer">
              Work with us
            </a>
            <a className="btn ghost" href="#cases">See the work</a>
          </div>
        </div>
      </section>

      <section className="rail-sec">
        <div className="in">
          <span className="eyebrow">Who we hire for</span>
          <h2>Creators, studios and <span className="it">brands</span>.</h2>
          <p className="lede">Across the US, UK, Australia and Asia.</p>
        </div>

        {/* rendered twice so translateX(-50%) lands on a seam */}
        <div className="marquee">
          <div className="track">
            {[...RAIL_CLIENTS, ...RAIL_CLIENTS].map((cl, i) => (
              <div className="ucard" key={`${cl.name}-${i}`}>
                <div className="cstage">
                  <img className={cl.mode} src={cl.img} alt={cl.name} />
                </div>
                <div className="uname">{cl.name}</div>
                <div className="udesc">{cl.desc}</div>
                <span className="ugeo">{cl.geo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="what">
        <div className="in">
          <span className="eyebrow">How we engage</span>
          <h2>Three ways to <span className="it">work with us</span>.</h2>
          <p className="lede">
            Before we recommend a single hire, we map how your content actually gets made, day to day.
          </p>

          <div className="artgrid">
            <div className="artcard">
              <div className="artframe"><ArtTeam /></div>
              <span className="artno">01</span>
              <h3>Team building, <em>one time</em></h3>
              <p>
                A content or marketing team stood up from scratch. We scope the roles, benchmark the
                rates, hire them together, and hand over a team that already works as one.
              </p>
              <span className="forwho">Creators, D2C and B2B brands</span>
            </div>

            <div className="artcard">
              <div className="artframe"><ArtLeader /></div>
              <span className="artno">02</span>
              <h3>Leadership, <em>one off</em></h3>
              <p>
                A single senior hire that sets the bar. Creative leads, heads of content, production
                leads. The person everyone you hire next gets measured against.
              </p>
              <span className="forwho">Larger brands and studios</span>
            </div>

            <div className="artcard">
              <div className="artframe"><ArtRetainer /></div>
              <span className="artno">03</span>
              <h3>Retained <em>hiring</em></h3>
              <p>
                We stay on your hiring for months rather than roles. One brief becomes a roster, and we
                keep filling it as the team grows. Over half our mandates each month are repeats.
              </p>
              <span className="forwho">YouTube studios and founders</span>
            </div>
          </div>
        </div>
      </section>

      <section id="cases">
        <div className="in">
          <span className="eyebrow">Case studies</span>
          <h2>Pick a client. See <span className="it">exactly what we did</span>.</h2>

          <div className="cs-tabs" role="tablist" aria-label="Clients">
            {CASES.map((x) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                className="cs-tab"
                aria-selected={x.id === active}
                onClick={() => setActive(x.id)}
              >
                <img src={x.img} alt="" />
                <span>{x.name}</span>
              </button>
            ))}
          </div>

          <div className="cs-panel" role="tabpanel">
            <h3>{c.name}</h3>
            <p className="sub">{c.sub}</p>
            <div className="cs-field">
              <b>The problem</b>
              <p>{c.problem}</p>
            </div>
            <div className="cs-field">
              <b>What we did</b>
              <p>{c.did}</p>
            </div>
            <div className="cs-field">
              <b>The result</b>
              <div className="cs-results">
                {c.results.map(([n, l]) => (
                  <div className="cs-res" key={n + l}>
                    <div className="n">{n}</div>
                    <div className="l">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="in">
          <span className="eyebrow">Feedback</span>
          <h2>What they said <span className="it">afterwards</span>.</h2>

          <div className="fb-grid">
            {DUMMY_QUOTES.map(([q, n, r, img]) => (
              <div className="fb-card" key={n}>
                <span className="dummy">DUMMY</span>
                <div className="qm">&ldquo;</div>
                <p className="q">{q}</p>
                <div className="fb-who">
                  {img
                    ? <img src={img} alt={n} />
                    : <div className="slot" style={{ width: 44, height: 44, borderRadius: "50%", margin: "0 auto 12px" }}>6</div>}
                  <div className="n">{n}</div>
                  <div className="r">{r}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="note">
            <span>&#9888;</span>
            <span>
              <b>These six quotes are invented.</b> Real faces with invented words is a liability if it
              ships, so every card carries a red DUMMY tag until the actual lines land.
            </span>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="in narrow">
          <div className="rule" />
          <h2 className="disp">
            Tell us who you need.
            <br />
            <span className="it">We will go and find them.</span>
          </h2>
          <p>
            Thirty minutes. Bring the roles, the budget and the timezone, and we will walk through live
            benchmarks for your exact need.
          </p>
          <a className="btn" href={CLIENT_CALL_URL} target="_blank" rel="noopener noreferrer">
            Work with us
          </a>
        </div>
      </section>

      <footer className="foot">
        <div className="in">
          <Logo height={30} mono />
          <p className="f-line">The team you keep meaning to build.</p>
          <div className="f-links">
            <Link to="/moo-talent">For creatives</Link>
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
