import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/comic/Logo";
import { V4_CSS } from "@/comic/v4";
import { PricingForm } from "@/comic/PricingForm";
import { RAIL_CLIENTS } from "@/comic/clients";
import { LEGAL_NAME, SHEET_URL, SOCIALS } from "@/comic/data";
import { MOCKS, STEPS, HM_CSS } from "@/comic/HeliumMock";
import { MAP_H, MAP_IN, MAP_LAND, MAP_UK, MAP_US, MAP_W, PINS } from "@/comic/worldmap";
import {
  COMP_ROWS, COMPARE, ECOSYSTEM, EDGE, HIRING_FOR, IMPACT, MANDATE_URL, REACH, ROLE_TICKER, TERMS, VOICES,
} from "@/comic/premiumData";

/**
 * The premium India home page.
 *
 * Order: hero with impact numbers, roles strip, clients, the ecosystem, our
 * positioning, how it works on Helium, why our pool is different and how we
 * compare, the compensation report, global reach, testimonials, the community,
 * close.
 *
 * Type is the brand pair, Fraunces over DM Sans, at weights that read cleanly.
 * Borders are hairlines and shadows are soft: the playful ink outlines of the
 * v4 page are deliberately left out here.
 */

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Adds `in` to every [data-r] block as it scrolls into view. Server markup is
 *  fully visible; the hidden state is armed from script only, with a timeout
 *  net so nothing can stay hidden if the observer never answers. */
function useReveals() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".pm [data-r]"));
    if (reduced() || typeof IntersectionObserver === "undefined") return;
    const below = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
    below.forEach((el) => el.classList.add("arm"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    below.forEach((el) => io.observe(el));
    const net = window.setTimeout(() => below.forEach((el) => el.classList.add("in")), 8000);
    return () => { io.disconnect(); window.clearTimeout(net); };
  }, []);
}

/** 0 to 1 eased progress, started the first time `ref` is on screen. */
function useCountUp(ref: React.RefObject<HTMLElement | null>, ms = 1600) {
  const [p, setP] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || typeof IntersectionObserver === "undefined") return;
    setP(0);
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - t0) / ms, 1);
        setP(1 - Math.pow(1 - t, 3));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [ref, ms]);
  return p;
}

const counted = (big: string, to: number | undefined, p: number) =>
  to === undefined || p >= 1 ? big : big.replace(/[\d,.]+/, Math.round(to * p).toLocaleString("en-IN"));

export function PremiumHome() {
  const [scrolled, setScrolled] = useState(false);
  const [pricing, setPricing] = useState(false);
  const [step, setStep] = useState(0);
  const [held, setHeld] = useState(false);
  const impactRef = useRef<HTMLDivElement>(null);
  const voicesRef = useRef<HTMLDivElement>(null);
  const p = useCountUp(impactRef);
  useReveals();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // the walkthrough advances on its own until someone picks a step
  useEffect(() => {
    if (held || reduced()) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS.length), 5200);
    return () => window.clearInterval(id);
  }, [held]);

  const pick = (i: number) => { setHeld(true); setStep(i); };
  const scrollVoices = (dir: number) => {
    const el = voicesRef.current;
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 440), behavior: "smooth" });
  };
  const Mock = MOCKS[step];

  return (
    <div className="pm">
      <style dangerouslySetInnerHTML={{ __html: PM_CSS + HM_CSS }} />

      {/* ---------------- nav ---------------- */}
      <header className={scrolled ? "pm-nav solid" : "pm-nav"}>
        <div className="pm-wrap pm-navin">
          <Link to="/" className="pm-logo" aria-label="Mulah Moo home"><Logo height={22} mono={!scrolled} /></Link>
          <nav className="pm-links" aria-label="Main">
            <a href="#approach">Approach</a>
            <a href="#how">How it works</a>
            <a href="#why">Why us</a>
            <a href="#report">Compensation</a>
            <a href="#community">Community</a>
          </nav>
          <div className="pm-navcta">
            <Link to="/moo-talent" className="pm-btn ghost sm">For talent</Link>
            <a href={MANDATE_URL} {...ext} className="pm-btn sm">Send a mandate</a>
          </div>
        </div>
      </header>

      {/* ---------------- hero + impact ---------------- */}
      <section className="pm-hero" id="top">
        <div className="pm-hero-bg" aria-hidden="true"><span className="g1" /><span className="g2" /><span className="grid" /></div>
        <div className="pm-wrap pm-herobody">
          <p className="pm-eyebrow light"><i />Talent intelligence for India&rsquo;s creative economy</p>
          <h1>We build marketing teams for <em>top internet brands.</em></h1>
          <p className="pm-herolede">
            One place for India&rsquo;s creative ecosystem: full time professionals, freelance groups and
            contractors, followed for years before they reach your shortlist.
          </p>
          <div className="pm-actions">
            <a href={MANDATE_URL} {...ext} className="pm-btn light lg">Send a mandate</a>
            <a href="#report" className="pm-btn outline lg">Get the compensation report</a>
          </div>
        </div>
        <div className="pm-wrap">
          <div className="pm-impact" ref={impactRef}>
            {IMPACT.map((s) => (
              <div key={s.label} className="pm-imp">
                <p className="big">{counted(s.big, s.to, p)}</p>
                <p className="lab">{s.label}</p>
                <p className="note">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- roles strip ---------------- */}
      <div className="pm-strip" aria-label="Roles we hire for">
        <div className="pm-striptrack">
          {[0, 1].map((k) => (
            <span key={k} aria-hidden={k === 1 ? true : undefined}>
              {ROLE_TICKER.map((r) => <span key={r} className="it">{r}<i>&#10022;</i></span>)}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- clients ---------------- */}
      <section className="pm-wrap pm-clients" data-r>
        <div className="pm-rowhead">
          <p className="pm-kicker">Retained by India&rsquo;s leading internet brands</p>
          <p className="pm-muted">Listed companies, funded startups and studios</p>
        </div>
        <div className="pm-logos">
          {RAIL_CLIENTS.map((c) => (
            <figure key={c.name} title={c.desc}>
              <div className={c.mode === "fit" ? "tile fit" : "tile"} style={{ background: c.mode === "bleed" ? "#000" : (c.bg ?? "#fff") }}>
                <img src={c.img} alt={`${c.name} logo`} loading="lazy" />
              </div>
              <figcaption>{c.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------------- ecosystem ---------------- */}
      <section className="pm-sec pm-eco" id="ecosystem">
        <div className="pm-wrap">
          <div className="pm-head" data-r>
            <p className="pm-eyebrow">The ecosystem</p>
            <h2>India&rsquo;s creative workforce, <em>in one place.</em></h2>
            <p className="pm-lede">
              However you want to work with talent, the people come from the same tracked, referred and
              vetted network.
            </p>
          </div>
          <div className="pm-ecogrid" data-r>
            <div className="pm-orbit" aria-hidden="true">
              <svg viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="186" className="o3" />
                <circle cx="200" cy="200" r="132" className="o2" />
                <circle cx="200" cy="200" r="78" className="o1" />
                <g className="spin">
                  <circle cx="200" cy="14" r="9" className="n1" />
                  <circle cx="361" cy="293" r="9" className="n2" />
                  <circle cx="39" cy="293" r="9" className="n3" />
                </g>
                <g className="spin2">
                  <circle cx="332" cy="200" r="5" className="n4" />
                  <circle cx="134" cy="86" r="5" className="n4" />
                  <circle cx="134" cy="314" r="5" className="n4" />
                </g>
              </svg>
              <div className="core">
                <b>10,000+</b>
                <span>professionals,<br />one network</span>
              </div>
            </div>
            <div className="pm-ecocards">
              {ECOSYSTEM.map((e, i) => (
                <article key={e.key} className="pm-eco-card">
                  <span className="no">0{i + 1}</span>
                  <div>
                    <p className="tag">{e.tag}</p>
                    <h3>{e.title}</h3>
                    <p className="body">{e.body}</p>
                    <p className="best"><span>Best for</span>{e.best}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- positioning ---------------- */}
      <section className="pm-pos" id="approach">
        <div className="pm-wrap pm-posin" data-r>
          <p className="pm-eyebrow light">Our positioning</p>
          <h2 className="pm-posh">
            We are not HR.
            <em> We are ex creatives and business professionals building the talent intelligence tool the
              creative ecosystem has been missing.</em>
          </h2>
          <div className="pm-posgrid">
            <div><b>Ex creative professionals</b><p>Editors, writers, producers and strategists who have sat in the seats we hire for.</p></div>
            <div><b>Business professionals</b><p>People who have run hiring, budgets and growth, so a mandate is read as a business problem.</p></div>
            <div><b>One product, Helium</b><p>Our own talent intelligence tool: every mandate, profile and assignment in one place.</p></div>
          </div>
        </div>
      </section>

      {/* ---------------- how it works ---------------- */}
      <section className="pm-sec" id="how">
        <div className="pm-wrap">
          <div className="pm-head split" data-r>
            <div>
              <p className="pm-eyebrow">How it works</p>
              <h2>From mandate to hire, <em>on Helium.</em></h2>
            </div>
            <p className="pm-lede">Five steps, one workspace. You see every applicant, every assignment and every note we hold.</p>
          </div>
          <div className="pm-how" data-r>
            <ol className="pm-steps">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <button type="button" aria-pressed={i === step} onClick={() => pick(i)} className={i === step ? "on" : undefined}>
                    <span className="n">0{i + 1}</span>
                    <span className="t">{s.title}</span>
                    <span className="b">{s.body}</span>
                    {i === step && !held && <span className="prog" aria-hidden="true" key={step} />}
                  </button>
                </li>
              ))}
            </ol>
            <div className="pm-mock">
              <div className="pm-mockstage" key={step}><Mock /></div>
              <p className="pm-mocknote">Helium · product preview, sample data</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- why us + benchmark ---------------- */}
      <section className="pm-sec pm-sand" id="why">
        <div className="pm-wrap">
          <div className="pm-head" data-r>
            <p className="pm-eyebrow">Why us</p>
            <h2>The intelligence behind <em>every shortlist.</em></h2>
            <p className="pm-lede">Backed by Backstage Creators Club, our community of India&rsquo;s content professionals.</p>
          </div>
          <div className="pm-edge" data-r>
            {EDGE.map((e) => (
              <article key={e.title}>
                <p className="fig"><b>{e.n}</b><span>{e.unit}</span></p>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </article>
            ))}
          </div>

          <div className="pm-cmp" id="benchmark" data-r>
            <h3 className="pm-h3">How we compare</h3>
            <div className="pm-tablewrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col"><span className="sr">Criteria</span></th>
                    <th scope="col" className="us"><Logo height={15} mono /></th>
                    <th scope="col">Typical recruitment agency</th>
                    <th scope="col">Job boards and freelance platforms</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((r) => (
                    <tr key={r.row}>
                      <th scope="row">{r.row}</th>
                      <td className="us"><span className="ck" aria-hidden="true" />{r.us}</td>
                      <td>{r.agency}</td>
                      <td>{r.boards}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pm-terms" data-r>
            <h3 className="pm-h3">Terms at a glance</h3>
            <div className="grid">
              {TERMS.map((t) => (
                <div key={t.k + t.v}>
                  <span>{t.k}</span>
                  <b>{t.v}</b>
                  <small>{t.d}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- compensation report ---------------- */}
      <section className="pm-sec" id="report">
        <div className="pm-wrap">
          <div className="pm-head split" data-r>
            <div>
              <p className="pm-eyebrow">Compensation benchmark 2026</p>
              <h2>What the market pays <em>Indian creative talent.</em></h2>
            </div>
            <p className="pm-lede">
              From our placement data: monthly and annual pay for Indian professionals hired by US, UK and
              Indian teams, by role and experience.
            </p>
          </div>
          <div className="pm-report" data-r>
            <div className="pm-sheet">
              <div className="pm-sheethead">
                <span>Report preview</span>
                <span className="pm-chip">Monthly, remote, full time</span>
              </div>
              <div className="pm-tablewrap flat">
                <table className="pm-comp">
                  <thead>
                    <tr>
                      <th scope="col">Role</th><th scope="col">Experience</th>
                      <th scope="col">US clients</th><th scope="col">UK clients</th><th scope="col">Indian brands</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMP_ROWS.map((r) => (
                      <tr key={r.role} className={r.open ? undefined : "locked"}>
                        <th scope="row">{r.role}</th>
                        <td>{r.level}</td>
                        <td>{r.us.includes("locked") ? <span className="blur" aria-label="Locked">$0,000 to 0,000</span> : r.us}</td>
                        <td><span className="blur" aria-label="Locked">£0,000 to 0,000</span></td>
                        <td><span className="blur" aria-label="Locked">₹00 to 00 LPA</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pm-lock" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18"><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
                  Full report: 25+ roles, three markets
                </div>
              </div>
            </div>
            <ReportForm />
          </div>
        </div>
      </section>

      {/* ---------------- global reach ---------------- */}
      <section className="pm-reach" id="reach">
        <div className="pm-wrap">
          <div className="pm-head split" data-r>
            <div>
              <p className="pm-eyebrow light">Global reach</p>
              <h2>Indian talent, <em>three primary markets.</em></h2>
            </div>
            <p className="pm-lede light">Our network is built in India and hired by teams in India, the United States and the United Kingdom.</p>
          </div>
          <div className="pm-map" data-r>
            <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="World map highlighting India, the United States and the United Kingdom">
              <path d={MAP_LAND} className="land" />
              <path d={MAP_US} className="hi" />
              <path d={MAP_UK} className="hi" />
              <path d={MAP_IN} className="home" />
              <path className="arc" d={`M${PINS.delhi[0]} ${PINS.delhi[1]} Q ${(PINS.delhi[0] + PINS.london[0]) / 2} ${PINS.london[1] - 70} ${PINS.london[0]} ${PINS.london[1]}`} />
              <path className="arc" d={`M${PINS.delhi[0]} ${PINS.delhi[1]} Q ${(PINS.delhi[0] + PINS.newyork[0]) / 2} ${PINS.newyork[1] - 150} ${PINS.newyork[0]} ${PINS.newyork[1]}`} />
              {([["delhi", "Delhi", true], ["london", "London", false], ["newyork", "New York", false]] as const).map(([k, label, home]) => (
                <g key={k} transform={`translate(${PINS[k][0]} ${PINS[k][1]})`}>
                  <circle r="16" className={home ? "pulse home" : "pulse"} />
                  <circle r="5" className={home ? "pin home" : "pin"} />
                  <text x="10" y="-10" className="lbl">{label}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="pm-reachgrid" data-r>
            {REACH.map((r) => (
              <article key={r.key} className={r.key === "in" ? "home" : undefined}>
                <p className="ctry"><i />{r.country}</p>
                <h3>{r.role}</h3>
                <p>{r.body}</p>
                <p className="cl"><span>Clients include</span>{r.clients}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- testimonials ---------------- */}
      <section className="pm-sec" id="voices">
        <div className="pm-wrap">
          <div className="pm-head split" data-r>
            <div>
              <p className="pm-eyebrow">Testimonials</p>
              <h2>In our clients&rsquo; <em>words.</em></h2>
            </div>
            <div className="pm-arrows">
              <button type="button" onClick={() => scrollVoices(-1)} aria-label="Previous testimonials">&larr;</button>
              <button type="button" onClick={() => scrollVoices(1)} aria-label="Next testimonials">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="pm-voices" ref={voicesRef} tabIndex={0} aria-label="Testimonials">
          {VOICES.map((v, i) => (
            <figure key={i} className={i % 3 === 1 ? "dark" : undefined}>
              <span className="pm-sample">Sample</span>
              <span className="q" aria-hidden="true">&ldquo;</span>
              <blockquote>{v.quote}</blockquote>
              <figcaption><b>{v.name}</b><span>{v.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------------- community ---------------- */}
      <section className="pm-comm" id="community">
        <div className="pm-wrap pm-commin">
          <div className="pm-commtext" data-r>
            <p className="pm-eyebrow light">Join the community</p>
            <h2>Backstage <em>Creators Club.</em></h2>
            <p className="pm-lede light">
              A WhatsApp first community for the people who make India&rsquo;s content. Closed door city
              evenings, honest shop talk, and the referrals that power our network.
            </p>
            <div className="pm-commstats">
              <div><b>50</b><span>New members a week, all referred</span></div>
              <div><b>100+</b><span>Registered for Delhi 2.0</span></div>
              <div><b>Invite</b><span>Only, city by city</span></div>
            </div>
            <div className="pm-actions">
              <Link to="/bcc" className="pm-btn sun lg">Explore the club</Link>
              <a href="/bcc#invite" className="pm-btn outline lg">Request an invite</a>
            </div>
          </div>
          <div className="pm-arc" aria-hidden="true" data-r>
            <svg viewBox="0 0 520 300" className="arcline"><path d="M20 290 A240 240 0 0 1 500 290" /><path d="M80 290 A180 180 0 0 1 440 290" className="in2" /></svg>
            <img src="/bcc/delhi-2.jpg" alt="" className="ph p1" />
            <img src="/bcc/members.jpg" alt="" className="ph p2" />
            <img src="/bcc/delhi-1.jpg" alt="" className="ph p3" />
            <span className="dot d1" /><span className="dot d2" /><span className="dot d3" /><span className="dot d4" />
          </div>
        </div>
      </section>

      {/* ---------------- close ---------------- */}
      <section className="pm-close">
        <div className="pm-wrap pm-closein" data-r>
          <h2>Have a marketing mandate? <em>Let&rsquo;s build the team.</em></h2>
          <div className="pm-actions">
            <a href={MANDATE_URL} {...ext} className="pm-btn lg">Send a mandate</a>
            <button type="button" className="pm-btn ghost lg" onClick={() => setPricing(true)}>Request our fees</button>
          </div>
        </div>
      </section>

      <footer className="pm-foot">
        <div className="pm-wrap pm-footin">
          <div className="brand">
            <Logo height={24} mono />
            <p>Talent intelligence and marketing recruitment for India&rsquo;s internet brands.</p>
          </div>
          <div className="cols">
            <div>
              <p className="pm-kicker">Clients</p>
              <a href={MANDATE_URL} {...ext}>Send a mandate</a>
              <a href="#how">How it works</a>
              <a href="#report">Compensation report</a>
            </div>
            <div>
              <p className="pm-kicker">Talent</p>
              <Link to="/moo-talent">Open roles</Link>
              <Link to="/moo-talent-form">Register with us</Link>
              <Link to="/moo-verified">Moo Verified</Link>
            </div>
            <div>
              <p className="pm-kicker">Community</p>
              <Link to="/bcc">Backstage Creators Club</Link>
              {SOCIALS.map((s) => <a key={s.label} href={s.url} {...ext}>{s.label}</a>)}
            </div>
          </div>
        </div>
        <div className="pm-wrap pm-legal">&copy; 2026 {LEGAL_NAME} &middot; mulahmoo.in</div>
      </footer>

      {/* the fees dialog keeps its own v4 styling, scoped under .v4 */}
      <div className="v4 pm-v4host">
        <style dangerouslySetInnerHTML={{ __html: V4_CSS }} />
        <PricingForm open={pricing} onClose={() => setPricing(false)} />
      </div>
    </div>
  );
}

/**
 * Intake for the compensation report. Posts to the shared Apps Script tagged
 * form_type "comp-report"; the script needs a branch for that tag (and a tab)
 * before rows land anywhere useful.
 */
function ReportForm() {
  const [f, setF] = useState({ name: "", email: "", company: "", role: "", hiring: "", market: [] as string[] });
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const set = (k: keyof typeof f, v: string) => { setF((d) => ({ ...d, [k]: v })); setErr(""); };
  const toggle = (m: string) => setF((d) => ({ ...d, market: d.market.includes(m) ? d.market.filter((x) => x !== m) : [...d.market, m] }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim()) return setErr("Please add your name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim())) return setErr("Please add a valid work email.");
    if (!f.company.trim()) return setErr("Please add your company.");
    setState("sending");
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "comp-report",
          ...f,
          market: f.market.join(", "),
          source: "mulahmoo.in",
          submitted_at: new Date().toISOString(),
        }),
      });
      setState("done");
    } catch {
      setState("idle");
      setErr("That did not go through. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="pm-form done" role="status">
        <span className="pm-tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h3>Thank you, {f.name.split(" ")[0]}.</h3>
        <p>We will email the full report to {f.email} within one working day.</p>
      </div>
    );
  }

  return (
    <form className="pm-form" onSubmit={submit} noValidate>
      <h3>Get the full report</h3>
      <p className="sub">Free for hiring teams. Sent to your work email.</p>
      <label>Full name<input value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></label>
      <label>Work email<input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></label>
      <div className="two">
        <label>Company<input value={f.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" /></label>
        <label>Your role<input value={f.role} onChange={(e) => set("role", e.target.value)} autoComplete="organization-title" /></label>
      </div>
      <label>Hiring for
        <select value={f.hiring} onChange={(e) => set("hiring", e.target.value)}>
          <option value="">Select one</option>
          {HIRING_FOR.map((h) => <option key={h}>{h}</option>)}
        </select>
      </label>
      <fieldset>
        <legend>Markets you care about</legend>
        <div className="chips">
          {["United States", "United Kingdom", "India"].map((m) => (
            <button type="button" key={m} aria-pressed={f.market.includes(m)} onClick={() => toggle(m)}>{m}</button>
          ))}
        </div>
      </fieldset>
      {err && <p className="err" role="alert">{err}</p>}
      <button type="submit" className="pm-btn lg block" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Email me the report"}
      </button>
    </form>
  );
}

const PM_CSS = `
.pm{ --paper:#FFFCF7; --sand:#F5F0E8; --ink:#1A1614; --body:#3B342E; --muted:#6B6258; --line:rgba(26,22,20,.11);
  --purple:#8856F2; --pink:#6A2FD4; --deep:#241247; --deeper:#170B30; --sun:#F5C542; --lav:#E3D6FF; --cream:#F1E7FF;
  --display:'Fraunces',Georgia,serif; --ui:'DM Sans',system-ui,sans-serif;
  background:var(--paper); color:var(--ink); font-family:var(--ui); font-size:17px; line-height:1.6; -webkit-font-smoothing:antialiased; }
.pm *{ box-sizing:border-box; }
.pm p, .pm h1, .pm h2, .pm h3, .pm ol, .pm figure, .pm blockquote{ margin:0; }
.pm a{ color:inherit; text-decoration:none; }
.pm-wrap{ max-width:1240px; margin:0 auto; padding-left:32px; padding-right:32px; }
.pm-sec{ padding:128px 0; }
.pm-sand{ background:var(--sand); }
@media (max-width:700px){ .pm-wrap{ padding-left:18px; padding-right:18px; } .pm-sec{ padding:84px 0; } }

/* type */
.pm h1, .pm h2, .pm-h3, .pm-imp .big, .pm-edge .fig b, .pm-terms b, .pm-commstats b, .pm-voices blockquote, .pm-eco-card h3, .pm-orbit .core b{
  font-family:var(--display); font-variation-settings:'SOFT' 50,'WONK' 0; font-weight:500; }
.pm h1 em, .pm h2 em{ font-style:italic; font-weight:400; font-variation-settings:'SOFT' 100,'WONK' 1; color:var(--purple); }
.pm h2{ font-size:clamp(36px,4.4vw,60px); line-height:1.06; letter-spacing:-.025em; text-wrap:balance; }
.pm-h3{ font-size:26px; letter-spacing:-.015em; margin-bottom:22px !important; }
.pm-eyebrow{ display:inline-flex; align-items:center; gap:10px; font-size:12.5px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--pink); margin-bottom:20px !important; }
.pm-eyebrow i{ width:7px; height:7px; border-radius:50%; background:var(--sun); }
.pm-eyebrow.light{ color:#C9B6FF; }
.pm-kicker{ font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
.pm-muted{ font-size:15px; color:var(--muted); }
.pm-lede{ font-size:18px; color:var(--body); max-width:520px; margin-top:20px !important; }
.pm-lede.light{ color:#D8CCF2; }
.pm-head{ margin-bottom:64px; }
.pm-head.split{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-end; gap:24px 48px; }
.pm-head.split .pm-lede{ margin-top:0 !important; max-width:440px; }
.sr{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); }

/* buttons */
.pm-btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; min-height:46px; padding:0 22px; border-radius:999px;
  background:var(--deep); color:#fff !important; border:1px solid var(--deep); font:700 15px/1 var(--ui); cursor:pointer;
  transition:transform .18s, background .18s, box-shadow .18s; }
.pm-btn:hover{ transform:translateY(-1px); background:#33196A; box-shadow:0 10px 24px -10px rgba(36,18,71,.6); }
.pm-btn.sm{ min-height:40px; padding:0 18px; font-size:14px; }
.pm-btn.lg{ min-height:56px; padding:0 30px; font-size:16px; }
.pm-btn.block{ width:100%; }
.pm-btn.ghost{ background:transparent; color:var(--ink) !important; border-color:rgba(26,22,20,.3); }
.pm-btn.ghost:hover{ background:rgba(26,22,20,.05); box-shadow:none; }
.pm-btn.light{ background:var(--paper); color:var(--deep) !important; border-color:var(--paper); }
.pm-btn.light:hover{ background:#fff; }
.pm-btn.outline{ background:transparent; color:#fff !important; border-color:rgba(255,255,255,.4); }
.pm-btn.outline:hover{ background:rgba(255,255,255,.08); box-shadow:none; }
.pm-btn.sun{ background:var(--sun); color:var(--deep) !important; border-color:var(--sun); }
.pm-btn.sun:hover{ background:#FFD35E; }
.pm-btn:disabled{ opacity:.6; cursor:default; transform:none; }
.pm-actions{ display:flex; flex-wrap:wrap; gap:12px; margin-top:40px; }

/* nav */
.pm-nav{ position:fixed; top:0; left:0; right:0; z-index:60; color:#fff; transition:background .3s, color .3s, box-shadow .3s; }
.pm-nav.solid{ background:rgba(255,252,247,.86); color:var(--ink); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); box-shadow:0 1px 0 var(--line); }
.pm-navin{ display:flex; align-items:center; justify-content:space-between; gap:20px; padding-top:18px; padding-bottom:18px; }
.pm-logo{ display:inline-flex; }
.pm-links{ display:flex; gap:30px; font-size:15px; font-weight:500; }
.pm-links a{ opacity:.85; transition:opacity .2s; } .pm-links a:hover{ opacity:1; }
.pm-navcta{ display:flex; gap:10px; }
.pm-nav:not(.solid) .pm-btn{ background:var(--paper); color:var(--deep) !important; border-color:var(--paper); }
.pm-nav:not(.solid) .pm-btn.ghost{ background:transparent; color:#fff !important; border-color:rgba(255,255,255,.4); }
@media (max-width:1060px){ .pm-links{ display:none; } }
@media (max-width:520px){ .pm-navcta .ghost{ display:none; } }

/* hero */
.pm-hero{ position:relative; overflow:hidden; background:var(--deeper); color:#fff; padding:168px 0 0; }
.pm-hero-bg{ position:absolute; inset:0; pointer-events:none; }
.pm-hero-bg .g1{ position:absolute; width:900px; height:900px; right:-260px; top:-380px; border-radius:50%;
  background:radial-gradient(circle, rgba(136,86,242,.55) 0%, rgba(136,86,242,0) 62%); animation:pmFloat 16s ease-in-out infinite alternate; }
.pm-hero-bg .g2{ position:absolute; width:700px; height:700px; left:-280px; bottom:-420px; border-radius:50%;
  background:radial-gradient(circle, rgba(245,197,66,.16) 0%, rgba(245,197,66,0) 60%); animation:pmFloat 20s ease-in-out infinite alternate-reverse; }
.pm-hero-bg .grid{ position:absolute; inset:0; opacity:.5;
  background-image:linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
  background-size:72px 72px; mask-image:linear-gradient(180deg, #000 0%, transparent 85%); -webkit-mask-image:linear-gradient(180deg, #000 0%, transparent 85%); }
@keyframes pmFloat{ from{ transform:translate3d(0,0,0) scale(1); } to{ transform:translate3d(-60px,40px,0) scale(1.08); } }
.pm-herobody{ position:relative; }
.pm-hero h1{ font-size:clamp(46px,7vw,104px); line-height:1.0; letter-spacing:-.035em; max-width:14ch; }
.pm-hero h1 em{ color:#C9B6FF; }
.pm-herolede{ margin-top:30px !important; max-width:600px; font-size:20px; line-height:1.55; color:#D8CCF2; }
.pm-impact{ position:relative; margin-top:96px; display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); border-top:1px solid rgba(255,255,255,.14); }
.pm-imp{ padding:34px 20px 44px; border-right:1px solid rgba(255,255,255,.10); min-width:0; }
.pm-imp:first-child{ padding-left:0; } .pm-imp:last-child{ border-right:0; }
.pm-imp .big{ font-size:clamp(32px,3.1vw,48px); line-height:1; letter-spacing:-.03em; font-variant-numeric:tabular-nums; white-space:nowrap; }
.pm-imp:nth-child(4) .big{ color:var(--sun); }
.pm-imp .lab{ margin-top:14px !important; font-size:15px; font-weight:700; }
.pm-imp .note{ margin-top:6px !important; font-size:13.5px; line-height:1.45; color:#B5A8D6; }
@media (max-width:1100px){ .pm-impact{ grid-template-columns:repeat(3,minmax(0,1fr)); }
  .pm-imp{ border-bottom:1px solid rgba(255,255,255,.10); } .pm-imp:nth-child(3n){ border-right:0; } .pm-imp:nth-child(3n+1){ padding-left:0; } }
@media (max-width:600px){ .pm-hero{ padding-top:128px; } .pm-impact{ grid-template-columns:repeat(2,minmax(0,1fr)); margin-top:64px; }
  .pm-imp{ padding:24px 14px 28px; } .pm-imp:nth-child(3n){ border-right:1px solid rgba(255,255,255,.10); }
  .pm-imp:nth-child(2n){ border-right:0; } .pm-imp:nth-child(2n+1){ padding-left:0; } .pm-herolede{ font-size:17px; } }

/* roles strip */
.pm-strip{ background:var(--deep); color:#fff; overflow:hidden; border-top:1px solid rgba(255,255,255,.08); }
.pm-striptrack{ display:flex; width:max-content; animation:pmMarq 46s linear infinite; }
.pm-striptrack > span{ display:flex; }
.pm-strip .it{ display:inline-flex; align-items:center; gap:28px; padding:20px 0 20px 28px; font-family:var(--display); font-size:22px; font-weight:400; white-space:nowrap; }
.pm-strip .it:first-child{ color:var(--sun); }
.pm-strip i{ font-style:normal; color:var(--purple); font-size:14px; }
@keyframes pmMarq{ to{ transform:translateX(-50%); } }

/* clients */
.pm-clients{ padding-top:72px; padding-bottom:72px; }
.pm-rowhead{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:baseline; gap:10px; margin-bottom:28px; }
.pm-logos{ display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:14px; }
.pm-logos figure{ display:flex; flex-direction:column; gap:10px; }
.pm-logos .tile{ height:92px; border-radius:16px; border:1px solid var(--line); display:flex; align-items:center; justify-content:center; overflow:hidden;
  transition:transform .25s, box-shadow .25s; }
.pm-logos .tile img{ width:100%; height:100%; object-fit:cover; }
.pm-logos .tile.fit{ padding:18px 22px; } .pm-logos .tile.fit img{ object-fit:contain; }
.pm-logos figure:hover .tile{ transform:translateY(-3px); box-shadow:0 14px 28px -16px rgba(36,18,71,.4); }
.pm-logos figcaption{ font-size:13.5px; font-weight:500; color:var(--body); }

/* ecosystem */
.pm-eco{ border-top:1px solid var(--line); }
.pm-ecogrid{ display:grid; grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr); gap:72px; align-items:center; }
.pm-orbit{ position:relative; max-width:460px; width:100%; aspect-ratio:1; margin:0 auto; }
.pm-orbit svg{ width:100%; height:100%; overflow:visible; }
.pm-orbit .o1, .pm-orbit .o2, .pm-orbit .o3{ fill:none; stroke:rgba(36,18,71,.16); }
.pm-orbit .o1{ fill:var(--cream); stroke:none; } .pm-orbit .o3{ stroke-dasharray:3 7; }
.pm-orbit .n1{ fill:var(--purple); } .pm-orbit .n2{ fill:var(--sun); } .pm-orbit .n3{ fill:var(--deep); } .pm-orbit .n4{ fill:var(--lav); }
.pm-orbit .spin{ transform-origin:200px 200px; animation:pmSpin 40s linear infinite; }
.pm-orbit .spin2{ transform-origin:200px 200px; animation:pmSpin 60s linear infinite reverse; }
@keyframes pmSpin{ to{ transform:rotate(360deg); } }
.pm-orbit .core{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
.pm-orbit .core b{ font-size:34px; color:var(--deep); letter-spacing:-.02em; }
.pm-orbit .core span{ font-size:13px; color:var(--muted); line-height:1.35; margin-top:4px; }
.pm-ecocards{ display:flex; flex-direction:column; }
.pm-eco-card{ display:grid; grid-template-columns:56px 1fr; gap:8px; padding:30px 0; border-top:1px solid var(--line); }
.pm-eco-card:last-child{ border-bottom:1px solid var(--line); }
.pm-eco-card .no{ font-family:var(--display); font-size:18px; color:var(--purple); padding-top:4px; }
.pm-eco-card .tag{ font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
.pm-eco-card h3{ font-size:30px; letter-spacing:-.02em; margin:4px 0 10px !important; }
.pm-eco-card .body{ font-size:16.5px; color:var(--body); max-width:56ch; }
.pm-eco-card .best{ margin-top:14px !important; font-size:14.5px; font-weight:600; display:flex; gap:10px; align-items:baseline; flex-wrap:wrap; }
.pm-eco-card .best span{ font-size:11.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--pink); }
@media (max-width:900px){ .pm-ecogrid{ grid-template-columns:1fr; gap:40px; } .pm-orbit{ max-width:320px; } }

/* positioning */
.pm-pos{ background:var(--deep); color:#fff; position:relative; overflow:hidden; }
.pm-pos::after{ content:''; position:absolute; right:-200px; top:-200px; width:640px; height:640px; border-radius:50%;
  background:radial-gradient(circle, rgba(136,86,242,.38), rgba(136,86,242,0) 65%); }
.pm-posin{ position:relative; z-index:1; padding-top:140px; padding-bottom:140px; }
.pm-posh{ font-size:clamp(34px,4.4vw,62px) !important; line-height:1.12 !important; max-width:22ch; }
.pm-posh em{ color:#C9B6FF !important; }
.pm-posgrid{ margin-top:72px; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:32px; border-top:1px solid rgba(255,255,255,.16); }
.pm-posgrid div{ padding-top:26px; }
.pm-posgrid b{ display:block; font-size:18px; margin-bottom:8px; }
.pm-posgrid p{ font-size:15.5px; color:#C7BBE3; }
@media (max-width:800px){ .pm-posgrid{ grid-template-columns:1fr; gap:0; } .pm-posin{ padding-top:96px; padding-bottom:96px; } }

/* how it works */
.pm-how{ display:grid; grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr); gap:56px; align-items:start; }
.pm-steps{ list-style:none; padding:0; display:flex; flex-direction:column; }
.pm-steps button{ position:relative; width:100%; text-align:left; display:grid; grid-template-columns:44px 1fr; gap:2px 6px; padding:22px 0 22px;
  background:none; border:0; border-top:1px solid var(--line); cursor:pointer; font:inherit; color:var(--muted); transition:color .25s; overflow:hidden; }
.pm-steps li:last-child button{ border-bottom:1px solid var(--line); }
.pm-steps .n{ font-family:var(--display); font-size:17px; color:inherit; padding-top:2px; }
.pm-steps .t{ font-size:20px; font-weight:700; color:inherit; }
.pm-steps .b{ grid-column:2; font-size:15.5px; line-height:1.55; max-height:0; opacity:0; overflow:hidden; transition:max-height .4s, opacity .3s, margin .3s; }
.pm-steps button.on{ color:var(--ink); }
.pm-steps button.on .n{ color:var(--purple); }
.pm-steps button.on .b{ max-height:120px; opacity:1; margin-top:8px; color:var(--body); }
.pm-steps button:hover{ color:var(--ink); }
.pm-steps .prog{ position:absolute; left:0; top:-1px; height:2px; background:var(--purple); animation:pmProg 5.2s linear forwards; }
@keyframes pmProg{ from{ width:0; } to{ width:100%; } }
.pm-mock{ position:sticky; top:110px; }
.pm-mockstage{ position:relative; padding:36px; border-radius:28px; background:linear-gradient(160deg, var(--cream), #FBF8FF 60%, var(--sun-50, #FFF6DE));
  animation:pmIn .5s cubic-bezier(.2,.9,.25,1); }
.pm-mocknote{ margin-top:12px !important; font-size:12.5px; color:var(--muted); text-align:right; }
@keyframes pmIn{ from{ opacity:0; transform:translateY(12px); } to{ opacity:1; transform:none; } }
@media (max-width:960px){ .pm-how{ grid-template-columns:1fr; gap:32px; } .pm-mock{ position:static; } .pm-mockstage{ padding:18px; } }

/* why us */
.pm-edge{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; }
.pm-edge article{ background:var(--paper); border:1px solid var(--line); border-radius:22px; padding:30px 28px 32px; transition:transform .25s, box-shadow .25s; }
.pm-edge article:hover{ transform:translateY(-3px); box-shadow:0 24px 40px -28px rgba(36,18,71,.45); }
.pm-edge .fig{ display:flex; align-items:baseline; gap:8px; margin-bottom:18px !important; }
.pm-edge .fig b{ font-size:44px; line-height:1; letter-spacing:-.03em; color:var(--deep); }
.pm-edge .fig span{ font-size:13px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--pink); }
.pm-edge h3{ font-size:19px; font-weight:700; margin-bottom:8px !important; }
.pm-edge p{ font-size:15.5px; color:var(--body); }
@media (max-width:1000px){ .pm-edge{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media (max-width:640px){ .pm-edge{ grid-template-columns:1fr; } }
.pm-cmp{ margin-top:96px; }
.pm-tablewrap{ overflow-x:auto; border-radius:22px; border:1px solid var(--line); background:var(--paper); position:relative; }
.pm-tablewrap table{ width:100%; border-collapse:collapse; min-width:760px; font-size:15.5px; }
.pm-tablewrap th, .pm-tablewrap td{ text-align:left; padding:20px 22px; border-bottom:1px solid var(--line); vertical-align:top; }
.pm-tablewrap tr:last-child th, .pm-tablewrap tr:last-child td{ border-bottom:0; }
.pm-tablewrap thead th{ font-size:13px; font-weight:700; color:var(--muted); background:#FBF8F2; vertical-align:middle; }
.pm-tablewrap tbody th{ font-weight:700; width:24%; }
.pm-tablewrap td{ color:var(--body); }
.pm-tablewrap .us{ background:var(--deep); color:#fff; width:28%; }
.pm-tablewrap thead .us{ background:var(--deep); color:#fff; }
.pm-tablewrap tbody .us{ background:#2B1656; font-weight:500; border-bottom-color:rgba(255,255,255,.08); }
.pm-tablewrap .ck{ display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--sun); margin-right:10px; transform:translateY(-1px); }
.pm-terms{ margin-top:96px; }
.pm-terms .grid{ display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); border-top:1px solid var(--ink); }
.pm-terms .grid div{ padding:24px 18px 0 0; display:flex; flex-direction:column; gap:4px; }
.pm-terms span{ font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
.pm-terms b{ font-size:32px; letter-spacing:-.02em; line-height:1.15; color:var(--deep); }
.pm-terms small{ font-size:14px; color:var(--body); line-height:1.45; }
@media (max-width:1000px){ .pm-terms .grid{ grid-template-columns:repeat(3,minmax(0,1fr)); row-gap:28px; } }
@media (max-width:560px){ .pm-terms .grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }

/* compensation report */
.pm-report{ display:grid; grid-template-columns:minmax(0,1.45fr) minmax(320px,.8fr); gap:28px; align-items:start; }
.pm-sheet{ border:1px solid var(--line); border-radius:24px; overflow:hidden; background:#fff; box-shadow:0 30px 60px -40px rgba(36,18,71,.45); }
.pm-sheethead{ display:flex; justify-content:space-between; align-items:center; gap:12px; padding:18px 22px; border-bottom:1px solid var(--line); font-weight:700; font-size:15px; }
.pm-chip{ font-size:12px; font-weight:700; padding:6px 12px; border-radius:999px; background:var(--cream); color:#4A1FA8; }
.pm-tablewrap.flat{ border:0; border-radius:0; }
.pm-comp{ min-width:640px !important; font-size:14.5px !important; }
.pm-comp th, .pm-comp td{ padding:16px 20px !important; white-space:nowrap; }
.pm-comp tbody th{ width:auto !important; }
.pm-comp .blur{ filter:blur(6px); user-select:none; color:var(--ink); }
.pm-comp tr.locked th, .pm-comp tr.locked td{ filter:blur(3.5px); opacity:.55; }
.pm-lock{ position:absolute; left:50%; bottom:58px; transform:translateX(-50%); display:inline-flex; align-items:center; gap:10px;
  background:var(--deep); color:#fff; padding:12px 18px; border-radius:999px; font-size:14px; font-weight:700; white-space:nowrap;
  box-shadow:0 14px 30px -12px rgba(36,18,71,.6); }
.pm-form{ border-radius:24px; background:var(--deep); color:#fff; padding:32px 28px; display:flex; flex-direction:column; gap:14px; }
.pm-form h3{ font-family:var(--display); font-weight:500; font-size:28px; letter-spacing:-.015em; }
.pm-form .sub{ font-size:14.5px; color:#C7BBE3; margin-top:-6px !important; }
.pm-form label, .pm-form legend{ display:flex; flex-direction:column; gap:6px; font-size:13px; font-weight:700; color:#D8CCF2; }
.pm-form input, .pm-form select{ min-height:46px; border-radius:12px; border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.06);
  color:#fff; padding:0 14px; font:500 15px var(--ui); outline:none; transition:border-color .2s, background .2s; width:100%; min-width:0; }
.pm-form select option{ color:var(--ink); }
.pm-form input:focus, .pm-form select:focus{ border-color:var(--sun); background:rgba(255,255,255,.1); }
.pm-form .two{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.pm-form fieldset{ border:0; padding:0; margin:0; }
.pm-form legend{ margin-bottom:8px; padding:0; }
.pm-form .chips{ display:flex; flex-wrap:wrap; gap:8px; }
.pm-form .chips button{ min-height:38px; padding:0 14px; border-radius:999px; border:1px solid rgba(255,255,255,.25); background:transparent; color:#fff; font:600 13.5px var(--ui); cursor:pointer; }
.pm-form .chips button[aria-pressed="true"]{ background:var(--sun); color:var(--deep); border-color:var(--sun); }
.pm-form .err{ font-size:14px; color:#FFD9D3; }
.pm-form .pm-btn{ background:var(--sun); color:var(--deep) !important; border-color:var(--sun); margin-top:6px; }
.pm-form.done{ align-items:flex-start; min-height:320px; justify-content:center; }
.pm-form.done p{ color:#D8CCF2; }
.pm-tick{ width:52px; height:52px; border-radius:50%; background:var(--sun); color:var(--deep); display:inline-flex; align-items:center; justify-content:center; }
@media (max-width:1000px){ .pm-report{ grid-template-columns:1fr; } }
@media (max-width:480px){ .pm-form .two{ grid-template-columns:1fr; } }

/* global reach */
.pm-reach{ background:var(--deeper); color:#fff; padding:128px 0; overflow:hidden; }
.pm-reach h2 em{ color:#C9B6FF !important; }
.pm-map{ position:relative; margin:-12px -20px 0; }
.pm-map svg{ width:100%; height:auto; display:block; overflow:visible; }
.pm-map .land, .pm-map .hi, .pm-map .home{ fill:none; stroke-linecap:round; }
.pm-map .land{ stroke:rgba(201,182,255,.26); stroke-width:3.2; }
.pm-map .hi{ stroke:#C9B6FF; stroke-width:3.8; }
.pm-map .home{ stroke:var(--sun); stroke-width:3.8; }
.pm-map .arc{ fill:none; stroke:rgba(245,197,66,.7); stroke-width:1.5; stroke-dasharray:4 6; animation:pmDash 2.4s linear infinite; }
@keyframes pmDash{ to{ stroke-dashoffset:-20; } }
.pm-map .pin{ fill:#C9B6FF; stroke:var(--deeper); stroke-width:2; } .pm-map .pin.home{ fill:var(--sun); }
.pm-map .pulse{ fill:rgba(201,182,255,.25); animation:pmPulse 2.6s ease-out infinite; transform-box:fill-box; transform-origin:center; }
.pm-map .pulse.home{ fill:rgba(245,197,66,.3); }
@keyframes pmPulse{ from{ transform:scale(.3); opacity:1; } to{ transform:scale(1.4); opacity:0; } }
.pm-map .lbl{ fill:#fff; font:700 13px var(--ui); paint-order:stroke; stroke:var(--deeper); stroke-width:4px; }
.pm-reachgrid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; margin-top:40px; }
.pm-reachgrid article{ border:1px solid rgba(255,255,255,.12); border-radius:22px; padding:28px; background:rgba(255,255,255,.03); }
.pm-reachgrid article.home{ border-color:rgba(245,197,66,.5); background:rgba(245,197,66,.06); }
.pm-reachgrid .ctry{ display:flex; align-items:center; gap:10px; font-size:13px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#C9B6FF; }
.pm-reachgrid .ctry i{ width:9px; height:9px; border-radius:50%; background:#C9B6FF; }
.pm-reachgrid .home .ctry{ color:var(--sun); } .pm-reachgrid .home .ctry i{ background:var(--sun); }
.pm-reachgrid h3{ font-family:var(--display); font-weight:500; font-size:24px; margin:12px 0 8px !important; }
.pm-reachgrid p{ font-size:15.5px; color:#C7BBE3; }
.pm-reachgrid .cl{ margin-top:18px !important; padding-top:16px; border-top:1px solid rgba(255,255,255,.1); font-size:14px; color:#fff; }
.pm-reachgrid .cl span{ display:block; font-size:11.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#9F92C2; margin-bottom:4px; }
@media (max-width:900px){ .pm-reachgrid{ grid-template-columns:1fr; } .pm-map{ margin:0 -10px; } }

/* testimonials */
.pm-arrows{ display:flex; gap:10px; }
.pm-arrows button{ width:52px; height:52px; border-radius:50%; border:1px solid rgba(26,22,20,.2); background:transparent; font-size:20px; cursor:pointer; color:var(--ink); transition:background .2s; }
.pm-arrows button:hover{ background:var(--deep); color:#fff; border-color:var(--deep); }
.pm-voices{ display:flex; gap:18px; overflow-x:auto; scroll-snap-type:x mandatory; padding:4px max(32px, calc((100vw - 1240px) / 2 + 32px)) 24px;
  scrollbar-width:none; outline:none; }
.pm-voices::-webkit-scrollbar{ display:none; }
.pm-voices figure{ position:relative; flex:0 0 min(400px, 84vw); scroll-snap-align:start; border-radius:24px; padding:36px 32px 30px;
  background:var(--sand); display:flex; flex-direction:column; gap:22px; min-height:340px; }
.pm-voices figure.dark{ background:var(--deep); color:#fff; }
.pm-voices .q{ font-family:var(--display); font-size:72px; line-height:.6; color:var(--purple); height:28px; }
.pm-voices figure.dark .q{ color:var(--sun); }
.pm-voices blockquote{ font-size:22px; line-height:1.35; letter-spacing:-.01em; flex:1; }
.pm-voices figcaption{ display:flex; flex-direction:column; gap:2px; padding-top:18px; border-top:1px solid var(--line); }
.pm-voices figure.dark figcaption{ border-top-color:rgba(255,255,255,.14); }
.pm-voices figcaption b{ font-size:15px; } .pm-voices figcaption span{ font-size:14px; color:var(--muted); }
.pm-voices figure.dark figcaption span{ color:#B5A8D6; }
.pm-sample{ position:absolute; top:18px; right:18px; font-size:10.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
  padding:4px 9px; border-radius:999px; border:1px dashed currentColor; opacity:.55; }

/* community */
.pm-comm{ background:#0E0A1A; color:#fff; overflow:hidden; position:relative; }
.pm-comm::before{ content:''; position:absolute; left:50%; bottom:-520px; width:1200px; height:900px; transform:translateX(-30%); border-radius:50%;
  background:radial-gradient(circle, rgba(136,86,242,.35), rgba(136,86,242,0) 60%); }
.pm-commin{ position:relative; display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:56px; align-items:center; padding-top:128px; padding-bottom:128px; }
.pm-comm h2 em{ color:var(--sun) !important; }
.pm-commstats{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; margin-top:40px; border-top:1px solid rgba(255,255,255,.14); }
.pm-commstats div{ padding-top:20px; display:flex; flex-direction:column; gap:4px; }
.pm-commstats b{ font-size:38px; line-height:1; }
.pm-commstats span{ font-size:14px; color:#B5A8D6; }
.pm-arc{ position:relative; aspect-ratio:520/330; width:100%; }
.pm-arc .arcline{ position:absolute; inset:auto 0 0 0; width:100%; }
.pm-arc .arcline path{ fill:none; stroke:rgba(201,182,255,.35); stroke-width:1.5; stroke-dasharray:2 8; }
.pm-arc .arcline path.in2{ stroke:rgba(245,197,66,.4); }
.pm-arc .ph{ position:absolute; border-radius:50%; object-fit:cover; border:3px solid #0E0A1A; box-shadow:0 0 0 1px rgba(201,182,255,.4), 0 20px 40px -10px rgba(0,0,0,.6); }
.pm-arc .p1{ width:30%; aspect-ratio:1; left:3%; top:38%; }
.pm-arc .p2{ width:40%; aspect-ratio:1; left:30%; top:0; }
.pm-arc .p3{ width:30%; aspect-ratio:1; right:3%; top:38%; }
.pm-arc .dot{ position:absolute; width:12px; height:12px; border-radius:50%; background:var(--sun); }
.pm-arc .d1{ left:20%; top:30%; } .pm-arc .d2{ right:22%; top:26%; background:#C9B6FF; } .pm-arc .d3{ left:48%; bottom:2%; } .pm-arc .d4{ right:6%; top:86%; background:#C9B6FF; width:8px; height:8px; }
@media (max-width:900px){ .pm-commin{ grid-template-columns:1fr; padding-top:96px; padding-bottom:96px; } .pm-commstats{ grid-template-columns:1fr 1fr 1fr; gap:12px; } .pm-commstats b{ font-size:28px; } }

/* close + footer */
.pm-close{ padding:140px 0; text-align:center; }
.pm-closein h2{ font-size:clamp(40px,5.4vw,76px); max-width:18ch; margin:0 auto !important; }
.pm-closein .pm-actions{ justify-content:center; }
.pm-foot{ background:var(--deeper); color:#CFC5E6; }
.pm-footin{ display:flex; flex-wrap:wrap; justify-content:space-between; gap:40px; padding-top:72px; padding-bottom:48px; }
.pm-foot .brand{ max-width:340px; color:#fff; }
.pm-foot .brand p{ margin-top:16px !important; color:#CFC5E6; font-size:15px; }
.pm-foot .cols{ display:flex; flex-wrap:wrap; gap:64px; font-size:15px; }
.pm-foot .cols div{ display:flex; flex-direction:column; gap:10px; }
.pm-foot .pm-kicker{ color:#9F92C2; margin-bottom:4px !important; }
.pm-foot a:hover{ color:#fff; }
.pm-legal{ padding-top:22px; padding-bottom:32px; border-top:1px solid rgba(255,255,255,.08); font-size:13px; color:#9F92C2; }

/* reveal, armed from script only */
.pm [data-r].arm{ opacity:0; transform:translateY(24px); transition:opacity .7s ease, transform .7s cubic-bezier(.2,.9,.25,1); }
.pm [data-r].arm.in{ opacity:1; transform:none; }

.pm a:focus-visible, .pm button:focus-visible, .pm [tabindex]:focus-visible{ outline:2px solid var(--purple); outline-offset:3px; }
.pm .pm-v4host{ background:none; min-height:0; }
@media (prefers-reduced-motion: reduce){ .pm *{ animation:none !important; transition:none !important; } }
`;
