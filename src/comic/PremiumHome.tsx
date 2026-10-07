import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/comic/Logo";
import { MandateForm, PMF_CSS } from "@/comic/PmForms";
import { useClickTracking } from "@/comic/tracking";
import { RAIL_CLIENTS, companyLogo } from "@/comic/clients";
import { CLIENT_CALL_URL, IN_FORMS_URL, LEGAL_NAME, SOCIALS } from "@/comic/data";
import { MOCKS, STEPS, HM_CSS } from "@/comic/HeliumMock";
import { Constellation, CN_CSS } from "@/comic/Constellation";
import { MAP_AE, MAP_CA, MAP_H, MAP_IN, MAP_LAND, MAP_UK, MAP_US, MAP_W, PINS } from "@/comic/worldmap";
import {
  COMP_ROWS, COMPARE, ECOSYSTEM, FONT, HERO_SIGNALS, HIRING_FOR, IMPACT, REACH,
  ROLE_TICKER, TERMS, VOICES, type Country,
} from "@/comic/premiumData";

/**
 * The premium India home page.
 *
 * Each fact lives in one section only (see the map in premiumData.ts). Each
 * section carries one heading and its content, nothing in between.
 */

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ hooks */

export function useReveals() {
  useEffect(() => {
    if (reduced() || typeof IntersectionObserver === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".pm [data-r]"))
      .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    els.forEach((el) => el.classList.add("arm"));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.14 });
    els.forEach((el) => io.observe(el));
    const net = window.setTimeout(() => els.forEach((el) => el.classList.add("in")), 9000);
    return () => { io.disconnect(); window.clearTimeout(net); };
  }, []);
}

export function useCountUp(ref: React.RefObject<HTMLElement | null>, ms = 1500) {
  const [p, setP] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || typeof IntersectionObserver === "undefined") return;
    setP(0);
    let raf = 0;
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - t0) / ms, 1);
        setP(1 - Math.pow(1 - t, 3));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [ref, ms]);
  return p;
}

/** Buttons marked data-mag lean toward the cursor. */
export function useMagnetic() {
  useEffect(() => {
    if (reduced() || window.matchMedia("(hover: none)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".pm [data-mag]"));
    const offs = els.map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
      };
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
    });
    return () => offs.forEach((f) => f());
  }, []);
}

const counted = (big: string, to: number | undefined, p: number) =>
  to === undefined || p >= 1 ? big : big.replace(/[\d,.]+/, Math.round(to * p).toLocaleString("en-IN"));

/* ------------------------------------------------------------------ page */

/** `track` turns on click tracking for outreach copies of this page, such as
 *  /work. The home page itself passes nothing and sends nothing. */
export function PremiumHome({ track = null }: { track?: string | null } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mandate, setMandate] = useState(false);
  const openMandate = () => setMandate(true);
  useReveals();
  useMagnetic();
  useClickTracking(track);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 60);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const vars = { "--display": FONT.display, "--ui": FONT.ui, "--dw": 400 } as React.CSSProperties;

  return (
    <div className="pm" style={vars}>
      <style dangerouslySetInnerHTML={{ __html: PM_CSS + HM_CSS + CN_CSS + PMF_CSS }} />
      <div className="pm-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <header className={scrolled ? "pm-nav solid" : "pm-nav"}>
        <div className="pm-navpill">
          <Link to="/" className="pm-logo" aria-label="Mulah Moo home"><Logo height={20} mono={!scrolled} /></Link>
          <nav className="pm-links" aria-label="Main">
            <a href="#how">How it works</a>
            <a href="#why">Why us</a>
            <a href="#report">Report</a>
          </nav>
          <div className="pm-navcta">
            <Link to="/moo-talent" className="pm-btn sm talent" data-mag>For talent</Link>
            <button type="button" onClick={openMandate} className="pm-btn sm" data-mag>Hire with us</button>
          </div>
        </div>
      </header>

      <Hero onMandate={openMandate} />
      <Strip />
      <Clients />
      <Ecosystem />
      <Positioning />
      <HeliumIntro />
      <How />
      <Why />
      <Terms />
      <Report />
      <Reach />
      <Voices />
      <Community />

      <section className="pm-close">
        <div className="pm-wrap" data-r>
          <h2>Have a marketing mandate?<br /><em>Let&rsquo;s build the team.</em></h2>
          <div className="pm-actions center">
            <button type="button" onClick={openMandate} className="pm-btn lg" data-mag>Send a mandate</button>
            <a href={CLIENT_CALL_URL} {...ext} className="pm-btn ghost lg" data-mag>Book a 30 min call</a>
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
              <button type="button" className="pm-footlink" onClick={openMandate}>Send a mandate</button>
              <a href={CLIENT_CALL_URL} {...ext}>Book a call</a>
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
        <div className="pm-wrap pm-legal">&copy; 2026 {LEGAL_NAME} &middot; mulahmoo.in &middot; <Link to="/privacy">Privacy</Link></div>
      </footer>


      <MandateForm open={mandate} onClose={() => setMandate(false)} />
    </div>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero({ onMandate }: { onMandate: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useCountUp(ref, 1800);
  // Line breaks are explicit: two lines on a laptop, three on a phone.
  // `d` breaks only on wide screens, `m` only on narrow ones.
  const words: [string, boolean, "d" | "m" | ""][] = [
    ["We", false, ""], ["build", false, ""], ["marketing", false, "m"], ["teams", false, "d"],
    ["for", false, ""], ["top", true, "m"], ["internet", true, ""], ["brands.", true, ""],
  ];
  let n = 0;
  return (
    <section className="pm-hero" id="top">
      <div className="pm-hero-glow" aria-hidden="true" />
      <Constellation signals={HERO_SIGNALS} />
      <div className="pm-wrap pm-herobody">
        <h1 aria-label="We build marketing teams for top internet brands.">
          {words.map(([w, accent, br]) => {
            const style = { animationDelay: `${0.08 * n++}s` };
            return (
              <span key={w} aria-hidden="true">
                {accent ? <em className="w" style={style}>{w}</em> : <span className="w" style={style}>{w}</span>}
                {br && <br className={`br-${br}`} />}
              </span>
            );
          })}
        </h1>
        <div className="pm-herofoot">
          <div className="pm-actions">
            <button type="button" onClick={onMandate} className="pm-btn light lg" data-mag>Send a mandate</button>
            <a href="#how" className="pm-btn outline lg" data-mag>See how it works</a>
          </div>
          <div className="pm-impact" ref={ref}>
            {IMPACT.map((s) => (
              <div key={s.label}>
                <b>{counted(s.big, s.to, p)}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Strip({ items = ROLE_TICKER, label = "Roles we hire for" }: { items?: string[]; label?: string }) {
  return (
    <div className="pm-strip" aria-label={label}>
      <div className="pm-striptrack">
        {[0, 1].map((k) => (
          <span key={k} aria-hidden={k === 1 ? true : undefined}>
            {items.map((r) => <span key={r} className="it">{r}<i>&#10022;</i></span>)}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- clients */

/** Two rows drifting in opposite directions, each a different order of the
 *  roster repeated, so the eye reads a field of brands rather than a count. */
export function Clients({ title }: { title?: React.ReactNode }) {
  const a = RAIL_CLIENTS;
  const b = [...a.slice(4), ...a.slice(0, 4)].reverse();
  const row = (list: typeof a, dir: "l" | "r", k: string) => (
    <div className={`pm-mq ${dir}`}>
      <div className="track">
        {[0, 1, 2, 3].map((rep) => list.map((c) => (
          <div
            key={`${k}${rep}${c.name}`}
            className={c.mode === "fit" ? "lg fit" : "lg"}
            style={{ background: c.mode === "bleed" ? "#000" : (c.bg ?? "#fff") }}
            aria-hidden={rep > 0 || k === "b" ? true : undefined}
          >
            <img src={c.img} alt={rep === 0 && k === "a" ? c.name : ""} loading="lazy" />
          </div>
        )))}
      </div>
    </div>
  );
  return (
    <section className="pm-clients" aria-label="Clients">
      <h2 className="pm-wrap pm-cltitle" data-r>{title ?? <>Retained by India&rsquo;s leading <em>internet brands.</em></>}</h2>
      {row(a, "l", "a")}
      {row(b, "r", "b")}
    </section>
  );
}

/* ------------------------------------------------------------- ecosystem */

function Ecosystem() {
  const [on, setOn] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (held || reduced()) return;
    const id = window.setInterval(() => setOn((i) => (i + 1) % ECOSYSTEM.length), 4200);
    return () => window.clearInterval(id);
  }, [held]);
  const nodes: [number, number][] = [[200, 22], [354, 289], [46, 289]];
  return (
    <section className="pm-sec" id="ecosystem">
      <div className="pm-wrap">
        <h2 className="pm-h" data-r>One network. <em>Every way to hire.</em></h2>
        <div className="pm-eco">
        <div className="pm-orbit" data-r aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="178" className="o3" />
            <circle cx="200" cy="200" r="120" className="o2" />
            <g className="spin">
              {Array.from({ length: 18 }, (_, i) => {
                const ang = (i / 18) * Math.PI * 2;
                return <circle key={i} cx={(200 + Math.cos(ang) * 120).toFixed(1)} cy={(200 + Math.sin(ang) * 120).toFixed(1)} r="2.4" className="sat" />;
              })}
            </g>
            {nodes.map(([x, y], i) => (
              <g key={i} className={i === on ? "node on" : "node"}>
                <line x1="200" y1="200" x2={x} y2={y} />
                <circle cx={x} cy={y} r="20" className="halo" />
                <circle cx={x} cy={y} r="9" className="dot" />
              </g>
            ))}
            <circle cx="200" cy="200" r="74" className="core" />
          </svg>
          <div className="pm-orbitcore"><b>10,000+</b><span>professionals with 1 to 10 years of experience</span></div>
        </div>
        <div className="pm-ecotext">
          <div className="pm-ecolist" data-r>
            {ECOSYSTEM.map((e, i) => (
              <button
                key={e.key}
                type="button"
                className={i === on ? "on" : undefined}
                aria-expanded={i === on}
                onClick={() => { setHeld(true); setOn(i); }}
                onMouseEnter={() => { setHeld(true); setOn(i); }}
              >
                <span className="n">0{i + 1}</span>
                <span className="t">{e.title}</span>
                <span className="b">{e.body}</span>
              </button>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ positioning */


function Positioning() {
  return (
    <section className="pm-pos" id="approach">
      <div className="pm-posbg" aria-hidden="true"><span className="b1" /><span className="b2" /><span className="b3" /><span className="lines" /></div>
      <div className="pm-wrap pm-posin">
        <h2 data-r>
          <span className="not">We are not <s>HR</s>.</span>
        </h2>
        <blockquote className="pm-quote" data-r>
          <span className="qm" aria-hidden="true">&ldquo;</span>
          We are <mark>ex creatives</mark> and <mark>business professionals</mark> building the{" "}
          <mark>talent intelligence tool</mark> the creative ecosystem has been missing.
          <span className="qm end" aria-hidden="true">&rdquo;</span>
        </blockquote>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- helium reveal */

/** A tall scene that pins Helium's mark in the middle of the screen. As the
 *  reader scrolls, the mark settles and its introduction writes itself in. */
function HeliumIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(1);
  const [still, setStill] = useState(false);
  useEffect(() => {
    if (reduced()) { setStill(true); return; }
    const el = ref.current;
    if (!el) return;
    const on = () => {
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / (span || 1))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  const k = (a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
  const settle = k(0.05, 0.4);
  const fade = (a: number, b: number) => ({ opacity: k(a, b), transform: `translateY(${(1 - k(a, b)) * 24}px)` });
  return (
    <section className={still ? "pm-hel still" : "pm-hel"} ref={ref} aria-label="Introducing Helium">
      <div className="pm-helstage">
        <div className="rings" aria-hidden="true" style={{ opacity: 1 - k(0.5, 0.9) * 0.6 }}><i /><i /><i /></div>
        <p className="tag" style={fade(0.32, 0.48)}>Our innovation</p>
        <span className="he" aria-hidden="true" style={{ transform: `scale(${1 - settle * 0.47})` }}>
          <small>2</small>He<i>4.0026</i>
        </span>
        <h2 className="name" style={fade(0.42, 0.6)}>Helium</h2>
        <p className="sub" style={fade(0.58, 0.78)}>The talent intelligence platform <em>for the creator economy.</em></p>
        <a href="#how" className="cue" style={{ opacity: k(0.8, 0.95) }}>See how it works <span aria-hidden="true">&darr;</span></a>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- how it works */

function How() {
  const [on, setOn] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) setOn(Number((e.target as HTMLElement).dataset.i));
    }), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const Mock = MOCKS[on];
  return (
    <section className="pm-sec" id="how">
      <div className="pm-wrap">
        <h2 className="pm-h" data-r>From mandate <em>to hire.</em></h2>
        <div className="pm-how">
          <div className="pm-howsteps">
            {STEPS.map((s, i) => {
              const M = MOCKS[i];
              return (
                <div key={s.title} className={i === on ? "step on" : "step"} data-i={i} ref={(el) => { refs.current[i] = el; }}>
                  <p className="n">0{i + 1}</p>
                  <h3>{s.title}</h3>
                  <p className="b">{s.body}</p>
                  <div className="inline"><M /></div>
                </div>
              );
            })}
          </div>
          <div className="pm-howstage" aria-hidden="true">
            <div className="stage">
              <div className="dots">{STEPS.map((_, i) => <i key={i} className={i === on ? "on" : undefined} />)}</div>
              <div className="mock" key={on}><Mock /></div>
              <p className="note">Helium · product preview, sample data</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- why us */

function Why() {
  const [vs, setVs] = useState<"agency" | "boards">("agency");
  return (
    <section className="pm-sec pm-sand" id="why">
      <div className="pm-wrap">
        <div className="pm-whyhead" data-r>
          <h2 className="pm-h">Why we are <em>different.</em></h2>
          <div className="pm-seg" role="tablist" aria-label="Compare with">
            <button type="button" role="tab" aria-selected={vs === "agency"} onClick={() => setVs("agency")}>vs recruitment agencies</button>
            <button type="button" role="tab" aria-selected={vs === "boards"} onClick={() => setVs("boards")}>vs job boards</button>
            <span className={`pm-segthumb ${vs}`} aria-hidden="true" />
          </div>
        </div>
        <div className="pm-why" data-r>
          <div className="pm-whycols" aria-hidden="true">
            <span />
            <span className="us"><Logo height={16} mono /></span>
            <span className="them">{vs === "agency" ? "Recruitment agencies" : "Job boards"}</span>
          </div>
          {COMPARE.map((r, i) => (
            <div key={r.row} className="pm-whyrow">
              <p className="k"><span>0{i + 1}</span>{r.row}</p>
              <p className="us">{r.us}</p>
              <p className="them" key={vs}>{vs === "agency" ? r.agency : r.boards}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Terms() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useCountUp(ref);
  return (
    <section className="pm-terms" aria-labelledby="terms-h">
      <h2 className="pm-h" id="terms-h" data-r>The fine print, <em>in big print.</em></h2>
      <div className="pm-wrap pm-termsin" ref={ref} data-r>
        {TERMS.map((t) => (
          <div key={t.k}>
            <b>{t.to === undefined || p >= 1 ? t.v : `${t.prefix ?? ""}${Math.round(t.to * p)}${t.suffix ?? ""}`}</b>
            <span>{t.k}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- report */

function Report() {
  return (
    <section className="pm-sec" id="report">
      <div className="pm-wrap">
        <h2 className="pm-h" data-r>Compensation benchmark <em>2026.</em></h2>
        <div className="pm-report" data-r>
          <div className="pm-sheet">
            <table className="pm-comp">
              <thead>
                <tr><th scope="col">Role</th><th scope="col">Experience</th><th scope="col">US clients</th><th scope="col">UK clients</th><th scope="col">Indian brands</th></tr>
              </thead>
              <tbody>
                {COMP_ROWS.map((r) => (
                  <tr key={r.role} className={r.open ? undefined : "locked"}>
                    <th scope="row">{r.role}</th>
                    <td>{r.level}</td>
                    <td>{r.us ?? <span className="blur">$0,000 to 0,000</span>}</td>
                    <td><span className="blur">£0,000 to 0,000</span></td>
                    <td><span className="blur">₹00 to 00 LPA</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pm-lock" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16"><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
              25+ roles, three markets
            </div>
          </div>
          <ReportForm />
        </div>
      </div>
    </section>
  );
}

/** Posts form_type "comp-report" to the mulahmoo.in forms script
 *  (apps-script/Code.gs). */
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
      await fetch(IN_FORMS_URL, {
        method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_type: "comp-report", ...f, market: f.market.join(", "), source: "mulahmoo.in", submitted_at: new Date().toISOString() }),
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
        <span className="pm-tick" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <h3>Thank you, {f.name.split(" ")[0]}.</h3>
        <p>The full report will reach {f.email} within one working day.</p>
      </div>
    );
  }
  return (
    <form className="pm-form" onSubmit={submit} noValidate>
      <h3>Get the full report</h3>
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
        <legend>Markets</legend>
        <div className="chips">
          {["United States", "United Kingdom", "India"].map((m) => (
            <button type="button" key={m} aria-pressed={f.market.includes(m)} onClick={() => toggle(m)}>{m}</button>
          ))}
        </div>
      </fieldset>
      {err && <p className="err" role="alert">{err}</p>}
      <button type="submit" className="pm-btn lg block" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Email me the report"}</button>
      <p className="pmf-consent">By sending this you agree to our <a href="/privacy" {...ext}>privacy policy</a>.</p>
    </form>
  );
}

/* ------------------------------------------------------------------ reach */

function Reach() {
  const [on, setOn] = useState<Country | null>(null);
  const cls = (k: Country, base: string) => `${base}${on && on !== k ? " dim" : on === k ? " lit" : ""}`;
  const paths: [Country, string][] = [["us", MAP_US], ["ca", MAP_CA], ["uk", MAP_UK], ["ae", MAP_AE], ["in", MAP_IN]];
  const home = PINS.in;
  return (
    <section className="pm-reach" id="reach">
      <div className="pm-wrap">
        <h2 className="pm-h" data-r>Built in India. <em>Hired across five markets.</em></h2>
        <div className="pm-map" data-r>
          <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="World map highlighting India, the United States, the United Kingdom, the UAE and Canada">
            <path d={MAP_LAND} className="land" />
            {paths.map(([k, d]) => <path key={k} d={d} className={cls(k, k === "in" ? "home" : "hi")} />)}
            {(["us", "ca", "uk", "ae"] as const).map((k) => {
              const [x, y] = PINS[k];
              const lift = Math.max(40, Math.abs(home[0] - x) * 0.32);
              return <path key={k} className={cls(k, "arc")} d={`M${home[0]} ${home[1]} Q ${(home[0] + x) / 2} ${Math.min(home[1], y) - lift} ${x} ${y}`} />;
            })}
            {REACH.map((r) => {
              const [x, y] = PINS[r.key];
              const left = r.key === "ae";
              return (
                <g key={r.key} transform={`translate(${x} ${y})`} className={cls(r.key, "pinwrap")}>
                  <circle r="16" className={r.key === "in" ? "pulse home" : "pulse"} />
                  <circle r="5" className={r.key === "in" ? "pin home" : "pin"} />
                  <text x={left ? -10 : 10} y="-10" textAnchor={left ? "end" : "start"} className="lbl">{r.country}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="pm-reachgrid" data-r>
          {REACH.map((r) => (
            <button
              type="button"
              key={r.key}
              className={`${r.key === "in" ? "home" : ""}${on === r.key ? " on" : ""}`}
              onMouseEnter={() => setOn(r.key)}
              onMouseLeave={() => setOn(null)}
              onFocus={() => setOn(r.key)}
              onBlur={() => setOn(null)}
            >
              <span className="ctry"><i />{r.country}</span>
              <span className="role">{r.role}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- testimonials */

/** The company's logo on a small white tile, shown at the top of a quote. */
export function CompanyLogo({ company }: { company: string }) {
  const l = companyLogo(company);
  if (!l) return null;
  return (
    <span className={l.shape === "square" ? "pm-qlogo sq" : "pm-qlogo"}>
      <img src={l.img} alt={company} loading="lazy" />
    </span>
  );
}

function Voices() {
  const ref = useRef<HTMLDivElement>(null);
  const go = (d: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: d * Math.min(el.clientWidth * 0.8, 460), behavior: "smooth" });
  };
  return (
    <section className="pm-sec" id="voices">
      <div className="pm-wrap pm-voicehead" data-r>
        <h2 className="pm-h">Client <em>voices.</em></h2>
        <div className="pm-arrows">
          <button type="button" onClick={() => go(-1)} aria-label="Previous" data-mag>&larr;</button>
          <button type="button" onClick={() => go(1)} aria-label="Next" data-mag>&rarr;</button>
        </div>
      </div>
      <div className="pm-voices" ref={ref} tabIndex={0} aria-label="Testimonials">
        {VOICES.map((v, i) => (
          <figure key={i} className={i % 3 === 1 ? "dark" : undefined}>
            <CompanyLogo company={v.role} />
            <blockquote>&ldquo;{v.quote}&rdquo;</blockquote>
            <figcaption><b>{v.name}</b><span>{v.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- community */

function Community() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || window.matchMedia("(hover: none)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.querySelectorAll<HTMLElement>("[data-depth]").forEach((n) => {
        const d = Number(n.dataset.depth);
        n.style.transform = `translate(${x * d}px, ${y * d}px)`;
      });
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);
  return (
    <section className="pm-comm" id="community">
      <div className="pm-wrap pm-commin">
        <div className="pm-commtext" data-r>
          <h2 className="pm-h">Backstage <em>Creators Club.</em></h2>
          <p className="pm-body light">
            A WhatsApp first, invite only community for the people behind India&rsquo;s content. City
            editions, closed door evenings and honest shop talk.
          </p>
          <div className="pm-actions center">
            <Link to="/bcc" className="pm-btn sun lg" data-mag>Explore the club</Link>
            <a href="/bcc#invite" className="pm-btn outline lg" data-mag>Request an invite</a>
          </div>
        </div>
        <div className="pm-arc" ref={ref} aria-hidden="true" data-r>
          <svg viewBox="0 0 520 300" className="arcline"><path d="M20 290 A240 240 0 0 1 500 290" /><path d="M80 290 A180 180 0 0 1 440 290" className="in2" /></svg>
          <img src="/bcc/delhi-2.jpg" alt="" className="ph p1" data-depth="16" />
          <img src="/bcc/mumbai-1.jpg" alt="" className="ph p2" data-depth="34" />
          <img src="/bcc/mumbai-2.jpg" alt="" className="ph p3" data-depth="20" />
          <img src="/bcc/members.jpg" alt="" className="ph p4" data-depth="44" />
          <img src="/bcc/delhi-1.jpg" alt="" className="ph p5" data-depth="40" />
          <span className="tagm" data-depth="30">Mumbai</span>
          <span className="dot d1" data-depth="50" /><span className="dot d2" data-depth="42" /><span className="dot d3" data-depth="28" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- css */

export const PM_CSS = `
.pm{ --paper:#FFFCF7; --sand:#F4EFE7; --ink:#1A1614; --body:#3B342E; --muted:#6B6258; --line:rgba(26,22,20,.11);
  --purple:#8856F2; --pink:#6A2FD4; --deep:#241247; --deeper:#140A2B; --sun:#F5C542; --lav:#E3D6FF; --cream:#F1E7FF;
  background:var(--paper); color:var(--ink); font-family:var(--ui); font-size:17px; line-height:1.65; -webkit-font-smoothing:antialiased; }
.pm *{ box-sizing:border-box; }
.pm p, .pm h1, .pm h2, .pm h3, .pm ol, .pm figure, .pm blockquote{ margin:0; }
.pm a{ color:inherit; text-decoration:none; }
.pm-wrap{ max-width:1280px; margin:0 auto; padding-left:40px; padding-right:40px; }
.pm-sec{ padding:180px 0; }
.pm-sand{ background:var(--sand); }
@media (max-width:760px){ .pm-wrap{ padding-left:20px; padding-right:20px; } .pm-sec{ padding:110px 0; } }

/* type: one display face for headings and figures, one UI face for the rest */
.pm h1, .pm h2, .pm-ecolist .t, .pm-how h3, .pm-terms b, .pm-impact b, .pm-orbitcore b, .pm-voices blockquote, .pm-form h3, .pm-reachgrid .role{
  font-family:var(--display); font-weight:var(--dw); }
.pm h2 em, .pm h1 em{ font-style:italic; color:var(--purple); }
.pm h2{ font-size:clamp(42px,5.4vw,84px); line-height:1.02; letter-spacing:-.025em; text-wrap:balance; }
.pm-h{ margin:0 auto 96px !important; max-width:18ch; text-align:center; }
.pm-kicker{ font-size:11.5px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); }
.pm-body{ font-size:19px; line-height:1.6; color:var(--body); max-width:520px; margin-top:28px !important; }
.pm-body.light{ color:#D8CCF2; }
.pm-actions{ display:flex; flex-wrap:wrap; gap:12px; margin-top:44px; }
.pm-actions.center{ justify-content:center; }

/* buttons */
.pm-btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; min-height:48px; padding:0 24px; border-radius:999px;
  background:var(--deep); color:#fff !important; border:1px solid var(--deep); font:600 15px/1 var(--ui); cursor:pointer;
  transition:transform .35s cubic-bezier(.2,.9,.25,1), background .2s, box-shadow .25s; will-change:transform; }
.pm-btn:hover{ background:#33196A; box-shadow:0 14px 30px -12px rgba(36,18,71,.55); }
.pm-btn.sm{ min-height:40px; padding:0 18px; font-size:14px; }
.pm-btn.lg{ min-height:58px; padding:0 32px; font-size:16px; }
.pm-btn.block{ width:100%; }
.pm-btn.ghost{ background:transparent; color:var(--ink) !important; border-color:rgba(26,22,20,.25); }
.pm-btn.ghost:hover{ background:rgba(26,22,20,.04); box-shadow:none; }
.pm-btn.light{ background:var(--paper); color:var(--deep) !important; border-color:var(--paper); }
.pm-btn.outline{ background:transparent; color:#fff !important; border-color:rgba(255,255,255,.35); }
.pm-btn.outline:hover{ background:rgba(255,255,255,.08); box-shadow:none; }
.pm-btn.sun{ background:var(--sun); color:var(--deep) !important; border-color:var(--sun); }
.pm-btn:disabled{ opacity:.6; cursor:default; }

/* progress + nav */
.pm-progress{ position:fixed; top:0; left:0; right:0; height:2px; background:var(--sun); transform-origin:0 50%; z-index:70; }
.pm-nav{ position:fixed; top:16px; left:0; right:0; z-index:60; display:flex; justify-content:center; padding:0 16px; pointer-events:none; }
.pm-navpill{ pointer-events:auto; display:flex; align-items:center; gap:28px; padding:8px 8px 8px 22px; border-radius:999px; color:#fff;
  background:rgba(20,10,43,.35); border:1px solid rgba(255,255,255,.12); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
  transition:background .35s, color .35s, border-color .35s, box-shadow .35s; }
.pm-nav.solid .pm-navpill{ background:rgba(255,252,247,.82); color:var(--ink); border-color:var(--line); box-shadow:0 12px 40px -18px rgba(36,18,71,.35); }
.pm-logo{ display:inline-flex; }
.pm-links{ display:flex; gap:24px; font-size:14.5px; font-weight:500; }
.pm-links a{ opacity:.78; transition:opacity .2s; } .pm-links a:hover{ opacity:1; }
.pm-nav:not(.solid) .pm-btn{ background:var(--paper); color:var(--deep) !important; border-color:var(--paper); }
@media (max-width:640px){ .pm-links{ display:none; } .pm-navpill{ gap:14px; } }

/* hero */
.pm-hero{ position:relative; overflow:hidden; background:var(--deeper); color:#fff; min-height:max(720px,min(960px,100vh)); display:flex; }
.pm-hero-glow{ position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(60% 70% at 85% 10%, rgba(136,86,242,.38), transparent 70%), radial-gradient(40% 50% at 0% 100%, rgba(245,197,66,.10), transparent 70%); }
.pm-herobody{ position:relative; z-index:2; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding-top:150px; padding-bottom:72px; pointer-events:none; }
.pm-herobody a, .pm-herobody button{ pointer-events:auto; }
.pm-hero h1{ font-size:clamp(44px,7.6vw,118px); line-height:1; letter-spacing:-.035em; white-space:nowrap; margin:0 auto !important; }
.pm-hero h1 .br-m{ display:none; }
@media (max-width:700px){ .pm-hero h1{ font-size:clamp(40px,11.4vw,64px); } .pm-hero h1 .br-m{ display:inline; } .pm-hero h1 .br-d{ display:none; } }
.pm-hero h1 .w{ display:inline-block; margin:0 .11em; animation:pmWord 1s cubic-bezier(.2,.9,.25,1) both; }
.pm-hero h1 em.w{ color:#D3C2FF; }
@keyframes pmWord{ from{ opacity:0; transform:translateY(.45em); filter:blur(8px); } to{ opacity:1; transform:none; filter:none; } }
.pm-herofoot{ display:flex; flex-direction:column; align-items:center; gap:64px; margin-top:52px; }
.pm-herofoot .pm-actions{ margin-top:0; justify-content:center; }
.pm-impact{ display:grid; grid-template-columns:repeat(4,auto); gap:0; }
.pm-impact div{ padding:0 36px; border-left:1px solid rgba(255,255,255,.16); display:flex; flex-direction:column; align-items:center; gap:6px; }
.pm-impact div:first-child{ border-left:0; }
.pm-impact b{ font-size:clamp(36px,3.6vw,56px); line-height:1; letter-spacing:-.02em; font-variant-numeric:tabular-nums; }
.pm-impact div:nth-child(4) b{ color:var(--sun); }
.pm-impact span{ font-size:13px; color:#BBAEDD; max-width:14ch; line-height:1.4; }
@media (max-width:1060px){ .pm-impact{ grid-template-columns:repeat(2,auto); row-gap:24px; } }
@media (max-width:640px){ .pm-hero{ min-height:0; } .pm-herobody{ padding-top:130px; } .pm-impact{ width:100%; grid-template-columns:1fr 1fr; }
  .pm-impact div{ padding:0 12px; } .pm-impact div:nth-child(odd){ border-left:0; } }

/* roles strip */
.pm-strip{ background:var(--deep); color:#fff; overflow:hidden; border-top:1px solid rgba(255,255,255,.08); }
.pm-striptrack{ display:flex; width:max-content; animation:pmMarq 52s linear infinite; }
.pm-striptrack > span{ display:flex; }
.pm-strip .it{ display:inline-flex; align-items:center; gap:30px; padding:22px 0 22px 30px; font-family:var(--display); font-weight:var(--dw); font-size:24px; white-space:nowrap; }
.pm-strip .it:first-child{ color:var(--sun); }
.pm-strip i{ font-style:normal; color:var(--purple); font-size:13px; }
@keyframes pmMarq{ to{ transform:translateX(-50%); } }

/* clients */
.pm-clients{ padding:150px 0 160px; overflow:hidden; }
.pm-cltitle{ font-size:clamp(34px,3.8vw,56px) !important; margin-bottom:72px !important; max-width:none !important; text-align:center; }
.pm-mq{ overflow:hidden; mask-image:linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); -webkit-mask-image:linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); }
.pm-mq + .pm-mq{ margin-top:18px; }
.pm-mq .track{ display:flex; gap:18px; width:max-content; animation:pmMq 70s linear infinite; }
.pm-mq.r .track{ animation-direction:reverse; animation-duration:84s; }
.pm-mq:hover .track{ animation-play-state:paused; }
@keyframes pmMq{ to{ transform:translateX(-50%); } }
.pm-mq .lg{ flex:none; width:210px; height:104px; border-radius:20px; border:1px solid var(--line); display:flex; align-items:center; justify-content:center; overflow:hidden;
  transition:transform .4s cubic-bezier(.2,.9,.25,1), box-shadow .4s, filter .4s; filter:saturate(.9); }
.pm-mq .lg img{ width:100%; height:100%; object-fit:cover; }
.pm-mq .lg.fit{ padding:20px 30px; } .pm-mq .lg.fit img{ object-fit:contain; }
.pm-mq .lg:hover{ transform:translateY(-6px) scale(1.03); box-shadow:0 22px 40px -22px rgba(36,18,71,.5); filter:none; }
@media (max-width:640px){ .pm-mq .lg{ width:150px; height:78px; border-radius:16px; } .pm-clients{ padding:100px 0; } }

/* ecosystem */
.pm-eco{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:96px; align-items:center; }
.pm-eco .pm-ecolist{ margin-top:0; }
.pm-orbit{ position:relative; width:100%; max-width:520px; aspect-ratio:1; justify-self:center; }
.pm-orbit svg{ width:100%; height:100%; overflow:visible; }
.pm-orbit .o3{ fill:none; stroke:rgba(36,18,71,.14); stroke-dasharray:2 8; }
.pm-orbit .o2{ fill:none; stroke:rgba(36,18,71,.10); }
.pm-orbit .sat{ fill:var(--lav); }
.pm-orbit .spin{ transform-origin:200px 200px; animation:pmSpin 50s linear infinite; }
@keyframes pmSpin{ to{ transform:rotate(360deg); } }
.pm-orbit .core{ fill:var(--deep); }
.pm-orbit .node line{ stroke:rgba(36,18,71,.14); stroke-width:1; transition:stroke .5s; }
.pm-orbit .node .halo{ fill:var(--purple); opacity:0; transform-box:fill-box; transform-origin:center; transition:opacity .5s; }
.pm-orbit .node .dot{ fill:var(--lav); transition:fill .5s; }
.pm-orbit .node.on line{ stroke:var(--purple); stroke-width:1.5; }
.pm-orbit .node.on .halo{ opacity:.18; animation:pmHalo 2.4s ease-out infinite; }
.pm-orbit .node.on .dot{ fill:var(--sun); }
@keyframes pmHalo{ from{ transform:scale(.6); opacity:.35; } to{ transform:scale(1.8); opacity:0; } }
.pm-orbitcore{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; color:#fff; pointer-events:none; }
.pm-orbitcore b{ font-size:clamp(28px,2.8vw,38px); letter-spacing:-.02em; line-height:1; }
.pm-orbitcore span{ font-size:11.5px; color:#C9B6FF; max-width:15ch; line-height:1.35; margin-top:8px; }
.pm-ecolist{ margin-top:64px; display:flex; flex-direction:column; border-top:1px solid var(--line); }
.pm-ecolist button{ display:grid; grid-template-columns:48px 1fr; text-align:left; padding:26px 0; background:none; border:0; border-bottom:1px solid var(--line);
  font:inherit; color:var(--muted); cursor:pointer; transition:color .3s; }
.pm-ecolist .n{ font-size:13px; font-weight:600; padding-top:10px; }
.pm-ecolist .t{ font-size:clamp(26px,2.4vw,34px); line-height:1.1; letter-spacing:-.015em; }
.pm-ecolist .b{ grid-column:2; font-size:16.5px; color:var(--body); max-height:0; opacity:0; overflow:hidden; transition:max-height .5s, opacity .4s, margin .4s; }
.pm-ecolist button.on{ color:var(--ink); }
.pm-ecolist button.on .n{ color:var(--purple); }
.pm-ecolist button.on .b{ max-height:140px; opacity:1; margin-top:12px; }
@media (max-width:960px){ .pm-eco{ grid-template-columns:1fr; gap:56px; } .pm-orbit{ max-width:340px; order:2; } }

/* positioning */
.pm-pos{ background:var(--deep); color:#fff; position:relative; overflow:hidden; }
.pm-posin{ position:relative; z-index:1; padding-top:220px; padding-bottom:220px; text-align:center; }
.pm-pos h2{ font-size:clamp(56px,7vw,110px); line-height:1; margin:0 auto !important; }
.pm-pos h2 .not{ display:block; }
.pm-pos h2 s{ text-decoration:none; position:relative; display:inline-block; color:rgba(255,255,255,.55); }
.pm-pos h2 s::after{ content:''; position:absolute; left:-6%; right:-6%; top:54%; height:.09em; border-radius:1em; background:var(--sun);
  transform:rotate(-4deg) scaleX(1); transform-origin:0 50%; transition:transform .9s cubic-bezier(.7,0,.2,1) .55s; }
.pm-pos [data-r].arm:not(.in) s::after{ transform:rotate(-4deg) scaleX(0); }
.pm-quote{ position:relative; margin:64px auto 0 !important; max-width:1120px; font-family:var(--ui); font-weight:300; font-size:clamp(20px,2.35vw,35px);
  line-height:1.4; letter-spacing:-.015em; color:#EDE6FF; text-wrap:balance; }
.pm-quote .qm{ font-family:var(--display); font-weight:400; color:var(--sun); font-size:1.6em; line-height:0; vertical-align:-.35em; margin-right:.06em; }
.pm-quote .qm.end{ margin:0 0 0 .04em; }
.pm-quote mark{ background:none; color:#fff; font-family:var(--display); font-style:italic; font-weight:400; font-size:1.14em; letter-spacing:-.01em;
  background-image:linear-gradient(transparent 62%, rgba(245,197,66,.55) 62%, rgba(245,197,66,.55) 90%, transparent 90%);
  background-repeat:no-repeat; background-size:100% 100%; transition:background-size 1.1s cubic-bezier(.7,0,.2,1) .4s; padding:0 .06em; }
.pm-pos [data-r].arm:not(.in) mark{ background-size:0% 100%; }
.pm-posbg{ position:absolute; inset:0; overflow:hidden; pointer-events:none; }
.pm-posbg span{ position:absolute; border-radius:50%; filter:blur(70px); }
.pm-posbg .b1{ width:620px; height:620px; left:-160px; top:-120px; background:rgba(136,86,242,.55); animation:pmBlob1 18s ease-in-out infinite alternate; }
.pm-posbg .b2{ width:520px; height:520px; right:-140px; bottom:-160px; background:rgba(106,47,212,.6); animation:pmBlob2 22s ease-in-out infinite alternate; }
.pm-posbg .b3{ width:360px; height:360px; left:45%; top:40%; background:rgba(245,197,66,.16); animation:pmBlob3 16s ease-in-out infinite alternate; }
.pm-posbg .lines{ inset:-50%; border-radius:0; filter:none; opacity:.35;
  background-image:repeating-linear-gradient(115deg, rgba(255,255,255,.05) 0 1px, transparent 1px 46px); animation:pmLines 30s linear infinite; }
@keyframes pmBlob1{ to{ transform:translate(260px,180px) scale(1.15); } }
@keyframes pmBlob2{ to{ transform:translate(-300px,-140px) scale(.9); } }
@keyframes pmBlob3{ to{ transform:translate(-220px,-120px) scale(1.3); } }
@keyframes pmLines{ to{ transform:translateX(92px); } }
.pm-poschips{ position:absolute; inset:0; pointer-events:none; }
.pm-poschips .chip{ position:absolute; display:inline-flex; align-items:center; gap:9px; padding:10px 16px; border-radius:999px; white-space:nowrap;
  font:500 13.5px/1 var(--ui); color:#E8DEFF; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12);
  backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); animation:pmDrift 9s ease-in-out infinite alternate; }
.pm-poschips .chip i{ width:7px; height:7px; border-radius:50%; background:var(--sun); }
.pm-poschips .chip.c1 i{ background:#C9B6FF; } .pm-poschips .chip.c2 i{ background:#fff; }
@keyframes pmDrift{ from{ transform:translate(0,0); } to{ transform:translate(14px,-18px); } }
@media (max-width:1000px){ .pm-poschips{ display:none; } }
@media (max-width:760px){ .pm-posin{ padding-top:120px; padding-bottom:120px; } }

/* how it works: steps scroll, the product view stays */
.pm-how{ display:grid; grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr); gap:96px; }
.pm-hel{ position:relative; height:260vh; background:var(--deeper); color:#fff; }
.pm-hel.still{ height:auto; }
.pm-helstage{ position:sticky; top:0; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:22px; overflow:hidden; padding:0 20px; }
.pm-hel.still .pm-helstage{ position:relative; height:auto; padding:160px 20px; }
.pm-helstage .rings{ position:absolute; left:50%; top:50%; width:0; height:0; }
.pm-helstage .rings i{ position:absolute; left:-260px; top:-260px; width:520px; height:520px; border-radius:50%; border:1px solid rgba(201,182,255,.22); animation:pmRing 4.5s ease-out infinite; }
.pm-helstage .rings i:nth-child(2){ animation-delay:1.5s; } .pm-helstage .rings i:nth-child(3){ animation-delay:3s; }
@keyframes pmRing{ from{ transform:scale(.25); opacity:1; } to{ transform:scale(1.4); opacity:0; } }
.pm-helstage::before{ content:''; position:absolute; left:50%; top:50%; width:900px; height:900px; transform:translate(-50%,-50%); border-radius:50%;
  background:radial-gradient(circle, rgba(136,86,242,.35), transparent 60%); pointer-events:none; }
.pm-helstage .he{ position:relative; width:240px; height:240px; border-radius:48px; background:linear-gradient(150deg,#3B1F7A,#241247);
  display:flex; align-items:center; justify-content:center; font-family:var(--display); font-weight:var(--dw); font-size:112px; letter-spacing:-.02em;
  box-shadow:0 40px 100px -24px rgba(136,86,242,.7), inset 0 0 0 1.5px rgba(255,255,255,.14); margin:-40px 0; flex:none; }
.pm-helstage .he small{ position:absolute; left:24px; top:18px; font:600 24px var(--ui); color:var(--sun); }
.pm-helstage .he i{ position:absolute; left:0; right:0; bottom:20px; text-align:center; font:500 19px var(--ui); font-style:normal; color:#BBAEDD; }
.pm-helstage .tag{ position:relative; font-size:12px; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:var(--sun); }
.pm-helstage .name{ position:relative; font-size:clamp(64px,9vw,140px) !important; line-height:.95 !important; }
.pm-helstage .sub{ position:relative; font-size:clamp(20px,2vw,28px); color:#D8CCF2; max-width:24ch; line-height:1.35; }
.pm-helstage .sub em{ font-family:var(--display); font-weight:var(--dw); color:#C9B6FF; }
.pm-helstage .cue{ position:absolute; bottom:40px; font-size:13px; font-weight:600; letter-spacing:.08em; color:#BBAEDD; }
.pm-howsteps .step{ min-height:62vh; display:flex; flex-direction:column; justify-content:center; padding:24px 0; opacity:.28; transition:opacity .5s; }
.pm-howsteps .step:first-child{ min-height:44vh; justify-content:flex-start; }
.pm-howsteps .step.on{ opacity:1; }
.pm-howsteps .n{ font-size:13px; font-weight:600; color:var(--purple); margin-bottom:16px !important; }
.pm-how h3{ font-size:clamp(32px,3vw,46px); line-height:1.05; letter-spacing:-.02em; }
.pm-howsteps .b{ font-size:18px; color:var(--body); margin-top:16px !important; max-width:30ch; }
.pm-howsteps .inline{ display:none; }
.pm-howstage{ position:relative; }
.pm-howstage .stage{ position:sticky; top:16vh; padding:44px; border-radius:32px;
  background:radial-gradient(120% 90% at 0% 0%, var(--cream), #FBF8FF 55%, #FFF6DE); }
.pm-howstage .dots{ display:flex; gap:6px; margin-bottom:22px; }
.pm-howstage .dots i{ height:4px; flex:1; border-radius:4px; background:rgba(36,18,71,.12); transition:background .4s; }
.pm-howstage .dots i.on{ background:var(--purple); }
.pm-howstage .mock{ animation:pmIn .6s cubic-bezier(.2,.9,.25,1); }
.pm-howstage .note{ font-size:12.5px; color:var(--muted); text-align:right; margin-top:16px !important; }
@keyframes pmIn{ from{ opacity:0; transform:translateY(16px) scale(.98); } to{ opacity:1; transform:none; } }
@media (max-width:960px){ .pm-how{ grid-template-columns:minmax(0,1fr); gap:0; } .pm-howstage{ display:none; }
  .pm-howsteps .step, .pm-howsteps .step:first-child{ min-height:0; opacity:1; padding:0 0 64px; }
  .pm-howsteps .inline{ display:block; margin-top:28px; } }

/* why us */
.pm-whyhead{ display:flex; flex-direction:column; align-items:center; gap:36px; margin-bottom:80px; }
.pm-whyhead .pm-h{ margin-bottom:0 !important; }
.pm-seg{ position:relative; display:inline-grid; grid-template-columns:1fr 1fr; padding:5px; border-radius:999px; background:#fff; border:1px solid var(--line); }
.pm-seg button{ position:relative; z-index:1; min-height:42px; padding:0 20px; border:0; background:none; border-radius:999px; font:600 14px var(--ui); color:var(--muted); cursor:pointer; transition:color .3s; }
.pm-seg button[aria-selected="true"]{ color:#fff; }
.pm-segthumb{ position:absolute; top:5px; bottom:5px; left:5px; width:calc(50% - 5px); border-radius:999px; background:var(--deep); transition:transform .45s cubic-bezier(.2,.9,.25,1); }
.pm-segthumb.boards{ transform:translateX(100%); }
.pm-why{ border-top:1px solid var(--ink); }
.pm-whycols, .pm-whyrow{ display:grid; grid-template-columns:minmax(0,.85fr) minmax(0,1.2fr) minmax(0,.9fr); gap:32px; }
.pm-whycols{ padding:22px 0; font-size:13px; font-weight:600; color:var(--muted); }
.pm-whycols .us{ color:var(--deep); display:flex; align-items:center; }
.pm-whyrow{ padding:30px 0; border-top:1px solid var(--line); transition:background .3s; }
.pm-whyrow:hover{ background:rgba(255,255,255,.5); }
.pm-whyrow .k{ font-size:16px; font-weight:600; color:var(--ink); display:flex; gap:14px; line-height:1.4; padding-top:3px; }
.pm-whyrow .k span{ color:var(--purple); }
.pm-whyrow .us{ font-family:var(--display); font-weight:var(--dw); font-size:clamp(22px,1.9vw,28px); line-height:1.2; color:var(--ink); }
.pm-whyrow .them{ font-size:16px; color:var(--muted); animation:pmIn .45s ease; padding-top:4px; }
@media (max-width:860px){ .pm-whycols{ display:none; } .pm-whyrow{ grid-template-columns:1fr; gap:8px; }
  .pm-whyrow .them::before{ content:'Others: '; font-weight:600; } }

/* terms band */
.pm-terms{ background:var(--deeper); color:#fff; }
.pm-terms{ padding-top:150px; }
.pm-terms .pm-h{ color:#fff; margin-bottom:80px !important; padding:0 20px; }
.pm-terms .pm-h em{ color:var(--sun); }
.pm-termsin{ display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); padding-top:0; padding-bottom:150px; }
.pm-termsin div{ padding:0 24px; border-left:1px solid rgba(255,255,255,.14); display:flex; flex-direction:column; gap:12px; }
.pm-termsin div:first-child{ border-left:0; padding-left:0; }
.pm-termsin b{ font-size:clamp(34px,3.4vw,52px); line-height:1; letter-spacing:-.02em; font-variant-numeric:tabular-nums; white-space:nowrap; }
.pm-termsin div:last-child b{ color:var(--sun); }
.pm-termsin span{ font-size:14px; color:#BBAEDD; line-height:1.45; }
@media (max-width:1000px){ .pm-termsin{ grid-template-columns:repeat(2,minmax(0,1fr)); row-gap:40px; } .pm-termsin div:nth-child(odd){ border-left:0; padding-left:0; } }

/* report */
.pm-report{ display:grid; grid-template-columns:minmax(0,1.5fr) minmax(330px,.8fr); gap:32px; align-items:start; }
.pm-sheet{ position:relative; overflow-x:auto; border:1px solid var(--line); border-radius:28px; background:#fff; box-shadow:0 40px 80px -50px rgba(36,18,71,.5); }
.pm-comp{ width:100%; border-collapse:collapse; min-width:640px; font-size:15px; }
.pm-comp th, .pm-comp td{ text-align:left; padding:20px 22px; border-bottom:1px solid var(--line); white-space:nowrap; }
.pm-comp thead th{ font-size:12px; font-weight:600; color:var(--muted); letter-spacing:.06em; text-transform:uppercase; }
.pm-comp tbody tr:last-child th, .pm-comp tbody tr:last-child td{ border-bottom:0; }
.pm-comp tbody th{ font-weight:600; }
.pm-comp .blur{ filter:blur(6px); user-select:none; }
.pm-comp tr.locked th, .pm-comp tr.locked td{ filter:blur(3.5px); opacity:.5; }
.pm-lock{ position:absolute; left:50%; bottom:64px; transform:translateX(-50%); display:inline-flex; align-items:center; gap:10px; background:var(--deep); color:#fff;
  padding:12px 20px; border-radius:999px; font-size:14px; font-weight:600; white-space:nowrap; box-shadow:0 16px 34px -14px rgba(36,18,71,.7); }
.pm-form{ border-radius:28px; background:var(--deep); color:#fff; padding:36px 30px; display:flex; flex-direction:column; gap:16px; }
.pm-form h3{ font-size:32px; letter-spacing:-.015em; line-height:1.1; margin-bottom:6px !important; }
.pm-form label, .pm-form legend{ display:flex; flex-direction:column; gap:7px; font-size:12.5px; font-weight:600; color:#D8CCF2; }
.pm-form input, .pm-form select{ width:100%; min-width:0; min-height:48px; border-radius:14px; border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.06);
  color:#fff; padding:0 14px; font:500 15px var(--ui); outline:none; transition:border-color .2s, background .2s; }
.pm-form select option{ color:var(--ink); }
.pm-form input:focus, .pm-form select:focus{ border-color:var(--sun); background:rgba(255,255,255,.1); }
.pm-form .two{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.pm-form fieldset{ border:0; padding:0; margin:0; }
.pm-form legend{ margin-bottom:8px; padding:0; }
.pm-form .chips{ display:flex; flex-wrap:wrap; gap:8px; }
.pm-form .chips button{ min-height:40px; padding:0 15px; border-radius:999px; border:1px solid rgba(255,255,255,.25); background:transparent; color:#fff; font:600 13.5px var(--ui); cursor:pointer; transition:background .2s, color .2s; }
.pm-form .chips button[aria-pressed="true"]{ background:var(--sun); color:var(--deep); border-color:var(--sun); }
.pm-form .err{ font-size:14px; color:#FFD9D3; }
.pm-form .pm-btn{ background:var(--sun); color:var(--deep) !important; border-color:var(--sun); margin-top:6px; }
.pm-form.done{ min-height:340px; justify-content:center; }
.pm-form.done p{ color:#D8CCF2; }
.pm-tick{ width:54px; height:54px; border-radius:50%; background:var(--sun); color:var(--deep); display:inline-flex; align-items:center; justify-content:center; }
@media (max-width:1060px){ .pm-report{ grid-template-columns:1fr; } }
@media (max-width:480px){ .pm-form .two{ grid-template-columns:1fr; } }

/* reach */
.pm-reach{ background:var(--deeper); color:#fff; padding:180px 0; overflow:hidden; }
.pm-reach h2 em{ color:#C9B6FF; }
.pm-reach .pm-h{ margin-bottom:56px !important; }
.pm-map svg{ width:100%; height:auto; display:block; overflow:visible; }
.pm-map .land, .pm-map .hi, .pm-map .home{ fill:none; stroke-linecap:round; transition:stroke .4s, opacity .4s; }
.pm-map .land{ stroke:rgba(201,182,255,.22); stroke-width:3.2; }
.pm-map .hi{ stroke:#C9B6FF; stroke-width:3.8; }
.pm-map .home{ stroke:var(--sun); stroke-width:3.8; }
.pm-map .dim{ opacity:.25; }
.pm-map .hi.lit{ stroke:#fff; }
.pm-map .arc{ fill:none; stroke:rgba(245,197,66,.6); stroke-width:1.5; stroke-dasharray:4 6; animation:pmDash 2.4s linear infinite; transition:opacity .4s, stroke .4s; }
.pm-map .arc.lit{ stroke:var(--sun); }
@keyframes pmDash{ to{ stroke-dashoffset:-20; } }
.pm-map .pinwrap{ transition:opacity .4s; }
.pm-map .pin{ fill:#C9B6FF; stroke:var(--deeper); stroke-width:2; } .pm-map .pin.home{ fill:var(--sun); }
.pm-map .pulse{ fill:rgba(201,182,255,.25); animation:pmPulse 2.6s ease-out infinite; transform-box:fill-box; transform-origin:center; }
.pm-map .pulse.home{ fill:rgba(245,197,66,.3); }
@keyframes pmPulse{ from{ transform:scale(.3); opacity:1; } to{ transform:scale(1.5); opacity:0; } }
.pm-map .lbl{ fill:#fff; font:600 13px var(--ui); paint-order:stroke; stroke:var(--deeper); stroke-width:4px; }
.pm-reachgrid{ display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:14px; margin-top:48px; }
.pm-reachgrid button{ text-align:left; font:inherit; color:#fff; cursor:default; display:flex; flex-direction:column; gap:10px; border:1px solid rgba(255,255,255,.12);
  border-radius:22px; padding:24px; background:rgba(255,255,255,.03); transition:border-color .3s, background .3s, transform .3s; }
.pm-reachgrid button.on{ border-color:rgba(201,182,255,.5); background:rgba(255,255,255,.06); transform:translateY(-4px); }
.pm-reachgrid .home.on{ border-color:rgba(245,197,66,.6); }
.pm-reachgrid .ctry{ display:flex; align-items:center; gap:10px; font-size:12px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:#C9B6FF; }
.pm-reachgrid .ctry i{ width:8px; height:8px; border-radius:50%; background:#C9B6FF; }
.pm-reachgrid .home .ctry{ color:var(--sun); } .pm-reachgrid .home .ctry i{ background:var(--sun); }
.pm-reachgrid .role{ font-size:23px; line-height:1.15; letter-spacing:-.01em; }
.pm-reachgrid .cl{ font-size:14.5px; color:#BBAEDD; }
@media (max-width:1100px){ .pm-reachgrid{ grid-template-columns:repeat(3,minmax(0,1fr)); } }
@media (max-width:700px){ .pm-reachgrid{ grid-template-columns:1fr 1fr; } .pm-reach{ padding:110px 0; } }

/* voices */
.pm-voicehead{ display:flex; flex-direction:column; align-items:center; gap:32px; margin-bottom:72px; }
.pm-voicehead .pm-h{ margin-bottom:0 !important; }
.pm-arrows{ display:flex; gap:10px; }
.pm-arrows button{ width:58px; height:58px; border-radius:50%; border:1px solid rgba(26,22,20,.2); background:transparent; font-size:20px; cursor:pointer; color:var(--ink); transition:background .2s, color .2s, transform .35s cubic-bezier(.2,.9,.25,1); }
.pm-arrows button:hover{ background:var(--deep); color:#fff; border-color:var(--deep); }
.pm-voices{ display:flex; gap:20px; overflow-x:auto; scroll-snap-type:x mandatory; padding:4px max(40px, calc((100vw - 1280px) / 2 + 40px)) 24px; scrollbar-width:none; outline:none; }
.pm-voices::-webkit-scrollbar{ display:none; }
.pm-voices figure{ position:relative; flex:0 0 min(440px, 84vw); scroll-snap-align:start; border-radius:28px; padding:44px 38px 34px;
  background:var(--sand); display:flex; flex-direction:column; justify-content:space-between; gap:40px; min-height:380px; transition:transform .4s cubic-bezier(.2,.9,.25,1); }
.pm-voices figure:hover{ transform:translateY(-6px); }
.pm-voices figure.dark{ background:var(--deep); color:#fff; }
.pm-voices figure{ justify-content:flex-start !important; }
.pm-voices figure figcaption{ margin-top:auto; }
.pm-qlogo{ align-self:flex-start; display:flex; align-items:center; justify-content:center; height:52px; min-width:52px; max-width:150px; padding:8px 14px; border-radius:14px; background:#fff; box-shadow:0 0 0 1px var(--line); overflow:hidden; }
.pm-qlogo img{ display:block; max-height:36px; max-width:122px; width:auto; height:auto; object-fit:contain; }
.pm-qlogo.sq{ padding:0; width:64px; height:64px; }
.pm-qlogo.sq img{ max-height:none; max-width:none; width:100%; height:100%; object-fit:cover; transform:scale(1.2); }
.pm-voices blockquote{ font-size:clamp(23px,2vw,28px); line-height:1.28; letter-spacing:-.01em; }
.pm-voices figcaption{ display:flex; flex-direction:column; gap:2px; }
.pm-voices figcaption b{ font-size:15px; font-weight:600; } .pm-voices figcaption span{ font-size:14px; color:var(--muted); }
.pm-voices figure.dark figcaption span{ color:#BBAEDD; }

/* community */
.pm-comm{ background:#0E0A1A; color:#fff; overflow:hidden; position:relative; }
.pm-comm::before{ content:''; position:absolute; left:40%; bottom:-560px; width:1300px; height:960px; border-radius:50%; background:radial-gradient(circle, rgba(136,86,242,.32), transparent 60%); }
.pm-commin{ position:relative; display:flex; flex-direction:column; align-items:center; gap:72px; padding-top:180px; padding-bottom:180px; text-align:center; }
.pm-commtext .pm-h{ margin-bottom:0 !important; }
.pm-commtext .pm-body{ margin-left:auto; margin-right:auto; }
.pm-comm .pm-arc{ max-width:760px; }
.pm-comm h2 em{ color:var(--sun); }
.pm-arc{ position:relative; aspect-ratio:520/330; width:100%; }
.pm-arc .arcline{ position:absolute; inset:auto 0 0 0; width:100%; }
.pm-arc .arcline path{ fill:none; stroke:rgba(201,182,255,.35); stroke-width:1.5; stroke-dasharray:2 8; }
.pm-arc .arcline path.in2{ stroke:rgba(245,197,66,.4); }
.pm-arc .ph{ position:absolute; border-radius:50%; object-fit:cover; border:3px solid #0E0A1A; box-shadow:0 0 0 1px rgba(201,182,255,.4), 0 24px 50px -12px rgba(0,0,0,.7); transition:transform .25s ease-out; }
.pm-arc .p1{ width:24%; aspect-ratio:1; left:0; top:46%; }
.pm-arc .p2{ width:40%; aspect-ratio:1; left:30%; top:4%; }
.pm-arc .p3{ width:26%; aspect-ratio:1; right:0; top:44%; }
.pm-arc .p4{ width:16%; aspect-ratio:1; left:12%; top:6%; }
.pm-arc .p5{ width:16%; aspect-ratio:1; right:10%; top:2%; }
.pm-arc .tagm{ position:absolute; left:56%; top:2%; padding:7px 12px; border-radius:999px; background:var(--sun); color:var(--deep); font:700 11px var(--ui); letter-spacing:.12em; text-transform:uppercase; transition:transform .25s ease-out; }
.pm-arc .dot{ position:absolute; width:12px; height:12px; border-radius:50%; background:var(--sun); transition:transform .25s ease-out; }
.pm-arc .d1{ left:20%; top:30%; } .pm-arc .d2{ right:22%; top:26%; background:#C9B6FF; } .pm-arc .d3{ left:48%; bottom:2%; }
@media (max-width:900px){ .pm-commin{ padding-top:110px; padding-bottom:110px; } }

/* close + footer */
.pm-close{ padding:200px 0; text-align:center; }
.pm-close h2{ margin:0 auto !important; }
.pm-foot{ background:var(--deeper); color:#CFC5E6; }
.pm-footin{ display:flex; flex-wrap:wrap; justify-content:space-between; gap:40px; padding-top:80px; padding-bottom:56px; }
.pm-foot .brand{ max-width:340px; color:#fff; }
.pm-foot .brand p{ margin-top:18px !important; color:#CFC5E6; font-size:15px; }
.pm-foot .cols{ display:flex; flex-wrap:wrap; gap:72px; font-size:15px; }
.pm-foot .cols div{ display:flex; flex-direction:column; gap:10px; }
.pm-foot .pm-kicker{ color:#9F92C2; margin-bottom:4px !important; }
.pm-foot a:hover{ color:#fff; }
.pm-legal{ padding-top:22px; padding-bottom:32px; border-top:1px solid rgba(255,255,255,.08); font-size:13px; color:#9F92C2; }

/* font tester */

/* reveal, armed from script only */
.pm [data-r].arm{ opacity:0; transform:translateY(40px); transition:opacity 1s ease, transform 1.1s cubic-bezier(.2,.9,.25,1); }
.pm [data-r].arm.in{ opacity:1; transform:none; }
.pm a:focus-visible, .pm button:focus-visible, .pm [tabindex]:focus-visible{ outline:2px solid var(--purple); outline-offset:3px; }
.pm-navcta{ display:flex; gap:8px; }
.pm-btn.talent{ background:transparent; color:inherit !important; border-color:currentColor; border-color:rgba(127,110,160,.45); }
.pm-btn.talent:hover{ background:rgba(127,110,160,.12); box-shadow:none; }
.pm-footlink{ all:unset; cursor:pointer; }
.pm-navcta .pm-btn{ white-space:nowrap; }
.pm-nav:not(.solid) .pm-btn.talent{ background:transparent; color:#fff !important; border-color:rgba(255,255,255,.4); }
@media (max-width:420px){ .pm-navcta{ gap:6px; } .pm-navcta .pm-btn.sm{ padding:0 12px; font-size:13px; min-height:36px; } .pm-navpill{ padding-left:16px; } }
@media (prefers-reduced-motion: reduce){ .pm *, .pm *::before{ animation:none !important; transition:none !important; } }
`;
