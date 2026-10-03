import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { V4_CSS } from "@/comic/v4";
import { PricingForm } from "@/comic/PricingForm";
import { ArtLeader, ArtTeam, ArtRetainer } from "@/comic/v4art";
import { CLIENT_CALL_URL, LEGAL_NAME, SOCIALS } from "@/comic/data";

/**
 * The India home page, consultancy direction.
 *
 * Replaces the playful v4 home on "/" for mulahmoo.in. The v4 page (ClientHome)
 * is untouched and can be routed back in one line in routes/index.tsx.
 *
 * Type: Fraunces for display (the brand's artistic face, at readable weights)
 * over Manrope for everything a reader has to parse quickly.
 *
 * The pricing dialog is still the v4 PricingForm, so it is wrapped in a `.v4`
 * box with V4_CSS: its styles are all scoped under that class.
 */

type Logo = { name: string; img: string; bg: string; fit: "pad" | "square"; size?: number };

const LOGOS: Logo[] = [
  { name: "Groww", img: "/clients/groww.png", bg: "#FFFFFF", fit: "pad" },
  { name: "Wakefit", img: "/clients/wakefit.jpeg", bg: "#493280", fit: "square", size: 96 },
  { name: "Traya Health", img: "/clients/traya-health.jpeg", bg: "#FFFFFF", fit: "square", size: 92 },
  { name: "SAHI", img: "/clients/sahi.jpg", bg: "#FFFFFF", fit: "square", size: 80 },
  { name: "Leap Scholar", img: "/clients/leap-scholar.png", bg: "#FFFFFF", fit: "pad" },
  { name: "Verse Innovations", img: "/clients/verse-innovations.png", bg: "#000000", fit: "pad" },
  { name: "Trackk", img: "/clients/trackk.jpg", bg: "#FFFFFF", fit: "square", size: 90 },
  { name: "Binge Labs", img: "/clients/binge-labs.jpeg", bg: "#000000", fit: "square", size: 96 },
  { name: "Creator Engine", img: "/clients/creator-engine.jpeg", bg: "#000000", fit: "square", size: 84 },
];

/** `to`, when set, is what the figure counts up to; the rest of `big` is kept as
 *  prefix and suffix. Figures without `to` render as written. */
const STATS: { big: string; to?: number; label: string; accent?: boolean }[] = [
  { big: "50+", to: 50, label: "Teams worked with in the last 18 months" },
  { big: "20+", to: 20, label: "Leadership marketing positions closed" },
  { big: "5+", to: 5, label: "Publicly listed companies" },
  { big: "93%", to: 93, label: "Of placed candidates still in their role", accent: true },
  { big: "10,000+", to: 10000, label: "Marketing and creative professionals in our network" },
  { big: "2 to 9 yrs", label: "Experience band. The only range our database holds" },
];

const MANDATES: [string, string][] = [
  ["Head of Marketing", "Leadership search"],
  ["Head of Content", "Leadership search"],
  ["Brand and Growth Leads", "Leadership search"],
  ["Content and creative teams", "Team build"],
];

const SERVICES = [
  {
    no: "01",
    title: "Leadership search",
    tag: "Core practice",
    body: "Retained search for Heads of Marketing, Heads of Content, Brand Heads, Creative Directors and senior growth leaders.",
    bestFor: "Mid to large companies and listed brands building or rebuilding marketing leadership.",
    Art: ArtLeader,
  },
  {
    no: "02",
    title: "Team build",
    tag: "One engagement",
    body: "We scope and hire a full content and marketing team in one engagement: strategists, editors, designers and producers.",
    bestFor: "D2C brands under ₹40 lakh MRR, recently funded brands, and established brands launching an organic content team.",
    Art: ArtTeam,
  },
  {
    no: "03",
    title: "Talent partnership",
    tag: "Ongoing",
    body: "An ongoing retainer for brands that hire every month. We keep a vetted bench ready, so open roles close fast.",
    bestFor: "Fast scaling content studios and content led brands with a steady need for creative talent.",
    Art: ArtRetainer,
  },
];

const PRACTICE: [string, string[]][] = [
  ["Marketing leadership", ["Head of Marketing", "Head of Content", "Brand Head", "Creative Director", "Growth Marketing Lead"]],
  ["Content and creative", ["Content strategists", "Video editors and producers", "Designers and motion designers", "Scriptwriters", "Performance and D2C marketers"]],
];

const STEPS: [string, string][] = [
  ["Briefing", "A consultation on how your marketing runs today, where it breaks and what the role must own."],
  ["Role scoping and benchmarks", "Scope, level and a market compensation benchmark, agreed before any search begins."],
  ["Search and assessment", "We map the market, assess every candidate ourselves and present a short, considered shortlist."],
  ["Offer and onboarding", "We manage the offer and stay close through the first months so the hire settles in and stays."],
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Counts each figure up from zero the first time the grid scrolls into view.
 *
 * The server renders the final figures, so a reader without script, or with
 * reduced motion, sees the real numbers. On the client the figures drop to zero
 * only if the grid is still below the fold, so nobody sees a number they were
 * reading reset under them.
 */
function useCountUp(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setProgress(0);
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1400, 1);
        setProgress(1 - Math.pow(1 - t, 3));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [ref]);
  return progress;
}

function figure(big: string, to: number | undefined, p: number) {
  if (to === undefined || p >= 1) return big;
  const n = Math.round(to * p).toLocaleString("en-IN");
  return big.replace(/[\d,]+/, n);
}

export function ConsultHome() {
  const [pricing, setPricing] = useState(false);
  const [svc, setSvc] = useState(0);
  const [lit, setLit] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const p = useCountUp(statsRef);

  // the hero's mandate list steps its highlight along, like a search in motion
  useEffect(() => {
    if (reducedMotion()) return;
    const id = window.setInterval(() => setLit((i) => (i + 1) % MANDATES.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  const S = SERVICES[svc];

  return (
    <div className="ch">
      <style dangerouslySetInnerHTML={{ __html: CH_CSS }} />

      <section className="ch-hero" id="top">
        {/* muted, inline and looping so it autoplays everywhere; the poster
            carries the hero until the clip is ready, or if it never is */}
        <video className="ch-video" autoPlay muted loop playsInline preload="auto" poster="/hero/loop-poster.jpg" aria-hidden="true">
          <source src="/hero/loop.webm" type="video/webm" />
          <source src="/hero/loop.mp4" type="video/mp4" />
        </video>
        <div className="ch-veil" aria-hidden="true" />

        <header className="ch-wrap ch-navin">
          <Link to="/" className="ch-logo">mulah<span>moo</span></Link>
          <nav className="ch-links" aria-label="Main">
            <a href="#process">How we work</a>
            <a href="#results">Results</a>
          </nav>
          <div className="ch-navcta">
            <Link to="/moo-talent" className="ch-btn outline sm">For talent</Link>
            <a href={CLIENT_CALL_URL} {...ext} className="ch-btn light sm">Speak to a consultant</a>
          </div>
        </header>

        <div className="ch-wrap ch-herobody">
          <div className="ch-herotext">
            <h1>We build marketing teams for <em>top internet brands.</em></h1>
            <div className="ch-actions">
              <a href={CLIENT_CALL_URL} {...ext} className="ch-btn light lg">Book a consultation</a>
              <button type="button" className="ch-btn outline lg" onClick={() => setPricing(true)}>Request our fees</button>
            </div>
          </div>
          <div className="ch-heroart">
            <p className="ch-artlabel">Mandates we handle</p>
            <ul className="ch-mandates">
              {MANDATES.map(([role, kind], i) => (
                <li key={role} className={i === lit ? "on" : undefined}><span>{role}</span><small>{kind}</small></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ch-band">
        <div className="ch-wrap ch-clients">
          <div className="ch-rowhead">
            <p className="ch-kicker">Retained by India&rsquo;s leading internet brands</p>
            <p className="ch-muted">Listed companies, funded startups and studios</p>
          </div>
          <div className="ch-logos">
            {LOGOS.map((l) => (
              <figure key={l.name}>
                <div className={`tile ${l.fit}`} style={{ background: l.bg, borderColor: l.bg === "#FFFFFF" ? "#DDD6CA" : l.bg }}>
                  <img src={l.img} alt={`${l.name} logo`} style={l.size ? { width: l.size, height: l.size } : undefined} />
                </div>
                <figcaption>{l.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="ch-wrap ch-statement">
        <p>
          We are a recruitment consultancy for marketing. We advise on the role, the level and the pay before we
          search for the person, <em>so the hire fits how your marketing actually runs.</em>
        </p>
      </section>

      <section className="ch-wrap ch-results" id="results">
        <div className="ch-rulehead">
          <h2>Results</h2>
          <p className="ch-muted">The last eighteen months, counted.</p>
        </div>
        <div className="ch-stats" ref={statsRef}>
          {STATS.map((s) => (
            <div key={s.big} className="ch-stat">
              <p className={s.accent ? "big accent" : "big"}>{figure(s.big, s.to, p)}</p>
              <p className="lab">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ch-sand" id="services">
        <div className="ch-wrap ch-pad">
          <div className="ch-split">
            <h2 className="ch-h2">Three ways we <em>partner with brands.</em></h2>
            <p className="ch-lede">Every engagement starts with a consultation on how your content and marketing get made, day to day.</p>
          </div>

          <div className="ch-tabs">
            <div className="ch-tablist" role="tablist" aria-label="Ways we work">
              {SERVICES.map((s, i) => (
                <button
                  key={s.no}
                  type="button"
                  role="tab"
                  id={`svc-tab-${i}`}
                  aria-selected={i === svc}
                  aria-controls="svc-panel"
                  className="ch-tab"
                  onClick={() => setSvc(i)}
                  onMouseEnter={() => setSvc(i)}
                >
                  <span className="no">{s.no}</span>
                  <span className="t">{s.title}</span>
                  <span className="arrow" aria-hidden="true">&rarr;</span>
                </button>
              ))}
            </div>
            <div className="ch-panel" role="tabpanel" id="svc-panel" aria-labelledby={`svc-tab-${svc}`} key={S.no}>
              <div className="art"><S.Art /></div>
              <div className="copy">
                <span className="pill">{S.tag}</span>
                <h3>{S.title}</h3>
                <p className="body">{S.body}</p>
                <div className="best">
                  <p className="ch-kicker">Best for</p>
                  <p>{S.bestFor}</p>
                </div>
                <a href={CLIENT_CALL_URL} {...ext} className="ch-btn sm">Discuss a {S.title.toLowerCase()} mandate</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ch-wrap ch-pad ch-practice">
        <div className="intro">
          <h2 className="ch-h2">Our practice <em>areas.</em></h2>
          <p className="ch-lede">
            Our network holds marketing and creative professionals with two to nine years of experience. Senior
            enough to own the work, early enough to grow with you.
          </p>
        </div>
        <div className="cols">
          {PRACTICE.map(([head, roles]) => (
            <div key={head}>
              <p className="colhead">{head}</p>
              {roles.map((r) => <p key={r} className="role">{r}<span aria-hidden="true">&rarr;</span></p>)}
            </div>
          ))}
        </div>
      </section>

      <section className="ch-topline" id="process">
        <div className="ch-wrap ch-pad">
          <h2 className="ch-h2">How we <em>work.</em></h2>
          <ol className="ch-steps">
            {STEPS.map(([t, b], i) => (
              <li key={t}>
                <p className="n">{String(i + 1).padStart(2, "0")}</p>
                <p className="t">{t}</p>
                <p className="b">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ch-cta" id="call">
        <div className="ch-wrap ch-ctain">
          <h2>Have a marketing mandate? <em>Speak to a consultant.</em></h2>
          <div className="ch-actions">
            <a href={CLIENT_CALL_URL} {...ext} className="ch-btn light lg">Book a consultation</a>
            <button type="button" className="ch-btn outline lg" onClick={() => setPricing(true)}>Request our fees</button>
          </div>
        </div>
      </section>

      <footer className="ch-foot">
        <div className="ch-wrap ch-footin">
          <div className="brand">
            <p className="ch-logo">mulah<span>moo</span></p>
            <p>Marketing recruitment consultants for India&rsquo;s internet brands.</p>
          </div>
          <div className="cols">
            <div>
              <p className="ch-kicker">Clients</p>
              <a href="#services">Leadership search</a>
              <a href="#services">Team build</a>
              <a href={CLIENT_CALL_URL} {...ext}>Book a consultation</a>
            </div>
            <div>
              <p className="ch-kicker">Candidates</p>
              <Link to="/moo-talent-form">Register with us</Link>
              <Link to="/moo-verified">Moo Verified</Link>
              <Link to="/moo-talent">Open roles</Link>
            </div>
            <div>
              <p className="ch-kicker">Follow</p>
              {SOCIALS.map((s) => <a key={s.label} href={s.url} {...ext}>{s.label}</a>)}
            </div>
          </div>
        </div>
        <div className="ch-wrap ch-legal">&copy; 2026 {LEGAL_NAME} &middot; mulahmoo.in</div>
      </footer>

      {/* the dialog keeps its v4 styling, which is scoped under .v4 */}
      <div className="v4 ch-v4host">
        <style dangerouslySetInnerHTML={{ __html: V4_CSS }} />
        <PricingForm open={pricing} onClose={() => setPricing(false)} />
      </div>
    </div>
  );
}

const CH_CSS = `
.ch{ --paper:#F7F4EE; --sand:#EFEAE1; --ink:#16121F; --body:#3A3442; --muted:#4A4453; --line:#DDD6CA;
  --purple:#6A2FD4; --deep:#241247; --sun:#F5C542;
  --display:'Fraunces',Georgia,serif; --ui:'Manrope',system-ui,sans-serif;
  background:var(--paper); color:var(--ink); font-family:var(--ui); font-size:17px; line-height:1.6;
  -webkit-font-smoothing:antialiased; }
.ch *{ box-sizing:border-box; }
.ch p, .ch h1, .ch h2, .ch h3, .ch ol, .ch ul, .ch figure{ margin:0; }
.ch a{ color:inherit; text-decoration:none; }
.ch-wrap{ max-width:1240px; margin:0 auto; padding-left:32px; padding-right:32px; }
.ch-pad{ padding-top:112px; padding-bottom:112px; }
@media (max-width:640px){ .ch-wrap{ padding-left:18px; padding-right:18px; } .ch-pad{ padding-top:72px; padding-bottom:72px; } }

/* Display type: Fraunces at 500 with a little SOFT, so it keeps its character
   without the hairlines that made the 300 weight hard to read. Italic carries
   the accent phrase in each heading. */
.ch h1, .ch-h2, .ch-statement p, .ch-cta h2, .ch-stat .big, .ch-panel h3, .ch-steps .t{
  font-family:var(--display); font-variation-settings:'SOFT' 50,'WONK' 0; font-weight:500; }
.ch h1 em, .ch-h2 em, .ch-statement em, .ch-cta h2 em{ font-style:italic; font-variation-settings:'SOFT' 100,'WONK' 1; font-weight:400; }

.ch-btn{ display:inline-flex; align-items:center; justify-content:center; min-height:44px; padding:0 22px; border-radius:999px;
  background:var(--ink); color:var(--paper) !important; border:1.5px solid var(--ink); font:700 14.5px/1 var(--ui);
  cursor:pointer; transition:transform .15s, background .15s, color .15s; }
.ch-btn:hover{ transform:translateY(-1px); background:#2B2438; }
.ch-btn.lg{ min-height:54px; padding:0 30px; font-size:16px; }
.ch-btn.light{ background:var(--paper); color:var(--ink) !important; border-color:var(--paper); }
.ch-btn.light:hover{ background:#fff; }
.ch-btn.outline{ background:transparent; color:var(--paper) !important; border-color:rgba(247,244,238,.8); }
.ch-btn.outline:hover{ background:rgba(247,244,238,.12); }

/* ---------- hero over the loop ---------- */
.ch-hero{ position:relative; overflow:hidden; background:#140B2B; color:var(--paper); min-height:min(860px,100vh); display:flex; flex-direction:column; }
.ch-video{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; filter:saturate(1.05); }
/* The veil keeps every line of hero text above 4.5:1 wherever the bright blob
   drifts: a flat darkening plus a heavier wash on the reading side. */
.ch-veil{ position:absolute; inset:0; z-index:1;
  background:linear-gradient(90deg, rgba(14,8,32,.72) 0%, rgba(14,8,32,.45) 55%, rgba(14,8,32,.15) 100%),
             linear-gradient(180deg, rgba(14,8,32,.35) 0%, rgba(14,8,32,0) 30%, rgba(14,8,32,.45) 100%); }
.ch-navin{ position:relative; z-index:2; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:16px;
  padding-top:22px; padding-bottom:22px; width:100%; }
.ch-logo{ font-family:var(--ui); font-weight:800; font-size:23px; letter-spacing:-.03em; justify-self:start; color:var(--paper); }
.ch-logo span{ color:#C7B6F0; }
.ch-links{ display:flex; gap:36px; font-size:15.5px; font-weight:600; }
.ch-links a{ opacity:.9; }
.ch-links a:hover{ opacity:1; color:var(--sun); }
.ch-navcta{ display:flex; gap:10px; justify-self:end; }
@media (max-width:860px){ .ch-navin{ grid-template-columns:1fr auto; } .ch-links{ grid-column:1 / -1; grid-row:2; justify-content:center; } }
@media (max-width:520px){ .ch-navcta .outline{ display:none; } }

.ch-herobody{ position:relative; z-index:2; flex:1; width:100%; display:flex; flex-wrap:wrap; align-items:center; gap:56px;
  padding-top:72px; padding-bottom:96px; }
.ch-herotext{ flex:999 1 560px; min-width:0; }
.ch-hero h1{ font-size:clamp(46px,6.4vw,92px); line-height:1.02; letter-spacing:-.03em; text-wrap:balance; }
.ch-hero h1 em{ color:#E3D6FF; }
.ch-actions{ display:flex; flex-wrap:wrap; gap:12px; margin-top:44px; }
.ch-heroart{ flex:1 1 340px; min-width:0; max-width:420px; padding:28px; border-radius:24px;
  background:rgba(20,11,43,.55); border:1px solid rgba(227,214,255,.18); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); }
.ch-artlabel{ margin-bottom:16px !important; font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#C7B6F0; }
.ch-mandates{ list-style:none; padding:0; display:flex; flex-direction:column; gap:10px; }
.ch-mandates li{ display:flex; justify-content:space-between; align-items:center; gap:12px; padding:15px 18px; border-radius:14px;
  background:rgba(247,244,238,.08); font-size:15.5px; font-weight:600; transition:background .45s, color .45s, transform .45s; }
.ch-mandates small{ font-size:12px; color:#D9CCF7; text-align:right; transition:color .45s; }
.ch-mandates li.on{ background:var(--paper); color:var(--ink); transform:translateX(-6px); }
.ch-mandates li.on small{ color:var(--purple); font-weight:700; }
@media (max-width:640px){ .ch-herobody{ padding-top:40px; padding-bottom:64px; gap:36px; } .ch-heroart{ padding:22px; } }

/* ---------- clients ---------- */
.ch-band{ border-bottom:1px solid var(--line); }
.ch-clients{ padding-top:56px; padding-bottom:60px; }
.ch-rowhead{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:baseline; gap:12px; margin-bottom:28px; }
.ch-kicker{ font-size:12.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
.ch-muted{ font-size:15.5px; color:var(--muted); }
.ch-logos{ display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:16px; }
.ch-logos figure{ display:flex; flex-direction:column; gap:10px; }
.ch-logos .tile{ height:96px; border-radius:16px; border:1px solid; display:flex; align-items:center; justify-content:center; overflow:hidden;
  transition:transform .2s, box-shadow .2s; }
.ch-logos figure:hover .tile{ transform:translateY(-4px); box-shadow:0 10px 24px rgba(22,18,31,.12); }
.ch-logos .tile.pad{ padding:24px 20px; }
.ch-logos .tile.pad img{ max-width:100%; max-height:100%; object-fit:contain; }
.ch-logos .tile.square img{ object-fit:contain; }
.ch-logos figcaption{ font-size:14px; font-weight:600; color:var(--body); }

.ch-statement{ padding-top:120px; padding-bottom:40px; }
.ch-statement p{ max-width:980px; font-size:clamp(28px,3.4vw,46px); line-height:1.22; letter-spacing:-.02em; }
.ch-statement em{ color:var(--purple); }

/* ---------- results ---------- */
.ch-results{ padding-top:72px; padding-bottom:120px; }
.ch-rulehead{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:baseline; gap:16px; padding-bottom:22px; border-bottom:2px solid var(--ink); }
.ch-rulehead h2{ font-size:14px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
.ch-stats{ display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); column-gap:48px; }
.ch-stat{ padding:40px 0 36px; border-bottom:1px solid var(--line); }
.ch-stat .big{ font-size:clamp(54px,5.4vw,76px); line-height:1; letter-spacing:-.03em; font-variant-numeric:tabular-nums; }
.ch-stat .big.accent{ color:var(--purple); }
.ch-stat .lab{ margin-top:16px !important; font-size:17px; font-weight:500; color:var(--body); max-width:270px; }

/* ---------- services, interactive ---------- */
.ch-sand{ background:var(--sand); }
.ch-split{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-end; gap:24px; margin-bottom:48px; }
.ch-h2{ max-width:680px; font-size:clamp(34px,4vw,56px); line-height:1.08; letter-spacing:-.025em; }
.ch-h2 em{ color:var(--purple); }
.ch-lede{ max-width:400px; font-size:17px; color:var(--body); }
.ch-tabs{ display:grid; grid-template-columns:minmax(260px,360px) 1fr; gap:24px; align-items:stretch; }
.ch-tablist{ display:flex; flex-direction:column; gap:10px; }
.ch-tab{ display:flex; align-items:center; gap:16px; width:100%; text-align:left; cursor:pointer; padding:22px 22px;
  border-radius:18px; border:1px solid var(--line); background:var(--paper); color:var(--ink); font:inherit;
  transition:background .25s, color .25s, border-color .25s, transform .25s; }
.ch-tab .no{ font-size:13px; font-weight:800; letter-spacing:.1em; color:var(--purple); }
.ch-tab .t{ flex:1; font-family:var(--display); font-weight:500; font-size:22px; letter-spacing:-.01em; }
.ch-tab .arrow{ opacity:0; transform:translateX(-6px); transition:opacity .25s, transform .25s; font-size:20px; }
.ch-tab:hover{ border-color:var(--ink); }
.ch-tab[aria-selected="true"]{ background:var(--deep); color:var(--paper); border-color:var(--deep); transform:translateX(6px); }
.ch-tab[aria-selected="true"] .no{ color:var(--sun); }
.ch-tab[aria-selected="true"] .arrow{ opacity:1; transform:none; }
.ch-panel{ display:grid; grid-template-columns:minmax(0,1.05fr) minmax(0,1fr); gap:32px; align-items:center; background:var(--paper);
  border:1px solid var(--line); border-radius:24px; padding:28px; animation:chIn .45s cubic-bezier(.2,.9,.25,1); }
.ch-panel .art svg{ display:block; width:100%; height:auto; }
.ch-panel .copy{ display:flex; flex-direction:column; align-items:flex-start; gap:14px; }
.ch-panel .pill{ font-size:12px; font-weight:700; padding:6px 12px; border-radius:999px; background:var(--sun); color:var(--ink); }
.ch-panel h3{ font-size:clamp(28px,2.6vw,36px); line-height:1.1; letter-spacing:-.02em; }
.ch-panel .body{ font-size:16.5px; color:var(--body); }
.ch-panel .best{ width:100%; padding-top:14px; border-top:1px solid var(--line); }
.ch-panel .best .ch-kicker{ margin-bottom:6px; }
.ch-panel .best p:last-child{ font-size:15.5px; }
.ch-panel .ch-btn{ margin-top:6px; }
@keyframes chIn{ from{ opacity:0; transform:translateY(10px); } to{ opacity:1; transform:none; } }
@media (max-width:1020px){ .ch-tabs{ grid-template-columns:1fr; } .ch-tablist{ flex-direction:row; flex-wrap:wrap; }
  .ch-tab{ flex:1 1 200px; } .ch-tab[aria-selected="true"]{ transform:none; } }
@media (max-width:760px){ .ch-panel{ grid-template-columns:1fr; padding:20px; } }

/* ---------- practice ---------- */
.ch-practice{ display:flex; flex-wrap:wrap; gap:48px 80px; }
.ch-practice .intro{ flex:1 1 320px; min-width:0; }
.ch-practice .intro .ch-lede{ margin-top:20px; max-width:380px; }
.ch-practice .cols{ flex:2 1 520px; min-width:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:32px 48px; }
.ch-practice .colhead{ padding-bottom:14px; border-bottom:2px solid var(--ink); font-size:13px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--purple); }
.ch-practice .role{ display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-bottom:1px solid var(--line);
  font-size:18px; font-weight:600; transition:padding .2s, color .2s; }
.ch-practice .role span{ opacity:0; transition:opacity .2s; color:var(--purple); }
.ch-practice .role:hover{ padding-left:10px; color:var(--purple); }
.ch-practice .role:hover span{ opacity:1; }

/* ---------- process ---------- */
.ch-topline{ border-top:1px solid var(--line); }
.ch-steps{ margin-top:56px !important; padding:0; list-style:none; display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:32px; }
.ch-steps li{ border-top:2px solid var(--ink); padding-top:22px; }
.ch-steps .n{ font-size:15px; font-weight:800; color:var(--purple); }
.ch-steps .t{ margin:12px 0 8px !important; font-size:24px; line-height:1.15; letter-spacing:-.015em; }
.ch-steps .b{ font-size:16px; color:var(--body); }

/* ---------- closing band ---------- */
.ch-cta{ background:var(--deep); color:var(--paper); }
.ch-ctain{ padding-top:120px; padding-bottom:120px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-end; gap:40px; }
.ch-cta h2{ max-width:780px; font-size:clamp(38px,5vw,72px); line-height:1.04; letter-spacing:-.03em; }
.ch-cta h2 em{ color:var(--sun); }
.ch-cta .ch-actions{ margin-top:0; }
@media (max-width:640px){ .ch-ctain{ padding-top:80px; padding-bottom:80px; } }

.ch-foot{ background:var(--ink); color:#D6D0DE; }
.ch-footin{ padding-top:72px; padding-bottom:40px; display:flex; flex-wrap:wrap; justify-content:space-between; gap:40px; }
.ch-foot .brand{ flex:1 1 280px; }
.ch-foot .brand p:last-child{ margin-top:14px; max-width:320px; font-size:15.5px; }
.ch-foot .cols{ display:flex; flex-wrap:wrap; gap:56px; font-size:15.5px; }
.ch-foot .cols div{ display:flex; flex-direction:column; gap:10px; }
.ch-foot .ch-kicker{ color:#9B92AC; margin-bottom:4px; }
.ch-foot a:hover{ color:#fff; }
.ch-legal{ padding-top:22px; padding-bottom:36px; border-top:1px solid #2E2838; font-size:13.5px; color:#9B92AC; }

/* the v4 host must not paint a block of its own: only the fixed dialog shows */
.ch .ch-v4host{ background:none; min-height:0; }

.ch a:focus-visible, .ch button:focus-visible{ outline:2px solid var(--sun); outline-offset:3px; }
@media (prefers-reduced-motion: reduce){
  .ch *{ transition:none !important; animation:none !important; }
}
`;
