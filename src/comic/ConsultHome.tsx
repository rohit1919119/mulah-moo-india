import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { V4_CSS } from "@/comic/v4";
import { PricingForm } from "@/comic/PricingForm";
import { CLIENT_CALL_URL, LEGAL_NAME, SOCIALS } from "@/comic/data";

/**
 * The India home page, consultancy direction.
 *
 * Replaces the playful v4 home on "/" for mulahmoo.in. The v4 page (ClientHome)
 * is untouched and can be routed back in one line in routes/index.tsx.
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

const STATS: { big: string; label: string; accent?: boolean }[] = [
  { big: "50+", label: "Teams worked with in the last 18 months" },
  { big: "20+", label: "Leadership marketing positions closed" },
  { big: "5+", label: "Publicly listed companies" },
  { big: "93%", label: "Of placed candidates still in their role", accent: true },
  { big: "10,000+", label: "Marketing and creative professionals in our network" },
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
    body: "Retained search for Heads of Marketing, Heads of Content, Brand Heads, Creative Directors and senior growth leaders.",
    bestFor: "Mid to large companies and listed brands building or rebuilding marketing leadership.",
    featured: true,
  },
  {
    no: "02",
    title: "Team build",
    body: "We scope and hire a full content and marketing team in one engagement: strategists, editors, designers and producers.",
    bestFor: "D2C brands under ₹40 lakh MRR, recently funded brands, and established brands launching an organic content team.",
  },
  {
    no: "03",
    title: "Talent partnership",
    body: "An ongoing retainer for brands that hire every month. We keep a vetted bench ready, so open roles close fast.",
    bestFor: "Fast scaling content studios and content led brands with a steady need for creative talent.",
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

export function ConsultHome() {
  const [pricing, setPricing] = useState(false);

  return (
    <div className="ch">
      <style dangerouslySetInnerHTML={{ __html: CH_CSS }} />

      <header className="ch-nav">
        <div className="ch-wrap ch-navin">
          <Link to="/" className="ch-logo">mulah<span>moo</span></Link>
          <nav className="ch-links" aria-label="Main">
            <a href="#process">How we work</a>
            <a href="#results">Results</a>
          </nav>
          <div className="ch-navcta">
            <Link to="/moo-talent" className="ch-btn ghost sm">For talent</Link>
            <a href={CLIENT_CALL_URL} {...ext} className="ch-btn sm">Speak to a consultant</a>
          </div>
        </div>
      </header>

      <section className="ch-wrap ch-hero" id="top">
        <div className="ch-herotext">
          <p className="ch-eyebrow"><i />Marketing recruitment consultants · India</p>
          <h1>We build marketing teams for <span>top internet brands.</span></h1>
          <div className="ch-actions">
            <a href={CLIENT_CALL_URL} {...ext} className="ch-btn lg">Book a consultation</a>
            <button type="button" className="ch-btn ghost lg" onClick={() => setPricing(true)}>Request our fees</button>
          </div>
        </div>
        <div className="ch-heroart" aria-hidden="true">
          <span className="r r1" /><span className="r r2" /><span className="r r3" /><span className="sun" />
          <p className="ch-artlabel">Mandates we handle</p>
          <div className="ch-mandates">
            {MANDATES.map(([role, kind], i) => (
              <div key={role} className={i === 0 ? "on" : undefined}><span>{role}</span><small>{kind}</small></div>
            ))}
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
          search for the person, <span>so the hire fits how your marketing actually runs.</span>
        </p>
      </section>

      <section className="ch-wrap ch-results" id="results">
        <div className="ch-rulehead">
          <h2>Results</h2>
          <p className="ch-muted">The last eighteen months, counted.</p>
        </div>
        <div className="ch-stats">
          {STATS.map((s) => (
            <div key={s.big} className="ch-stat">
              <p className={s.accent ? "big accent" : "big"}>{s.big}</p>
              <p className="lab">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ch-sand" id="services">
        <div className="ch-wrap ch-pad">
          <div className="ch-split">
            <h2 className="ch-h2">Three ways we partner with brands.</h2>
            <p className="ch-lede">Every engagement starts with a consultation on how your content and marketing get made, day to day.</p>
          </div>
          <div className="ch-services">
            {SERVICES.map((s) => (
              <article key={s.no} className={s.featured ? "ch-svc dark" : "ch-svc"}>
                <div className="top">
                  <span className="no">{s.no}</span>
                  {s.featured && <span className="pill">Core practice</span>}
                </div>
                <h3>{s.title}</h3>
                <p className="body">{s.body}</p>
                <div className="best">
                  <p className="ch-kicker">Best for</p>
                  <p>{s.bestFor}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ch-wrap ch-pad ch-practice">
        <div className="intro">
          <h2 className="ch-h2">Our practice areas.</h2>
          <p className="ch-lede">
            Our network holds marketing and creative professionals with two to nine years of experience. Senior
            enough to own the work, early enough to grow with you.
          </p>
        </div>
        <div className="cols">
          {PRACTICE.map(([head, roles]) => (
            <div key={head}>
              <p className="colhead">{head}</p>
              {roles.map((r) => <p key={r} className="role">{r}</p>)}
            </div>
          ))}
        </div>
      </section>

      <section className="ch-topline" id="process">
        <div className="ch-wrap ch-pad">
          <h2 className="ch-h2">How we work.</h2>
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
          <h2>Have a marketing mandate? <span>Speak to a consultant.</span></h2>
          <div className="ch-actions">
            <a href={CLIENT_CALL_URL} {...ext} className="ch-btn light lg">Book a consultation</a>
            <button type="button" className="ch-btn outline lg" onClick={() => setPricing(true)}>Request our fees</button>
          </div>
        </div>
      </section>

      <footer className="ch-foot">
        <div className="ch-wrap ch-footin">
          <div className="brand">
            <p className="ch-logo light">mulah<span>moo</span></p>
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
  background:var(--paper); color:var(--ink); font-family:'Manrope',system-ui,sans-serif; font-size:17px; line-height:1.6;
  -webkit-font-smoothing:antialiased; }
.ch *{ box-sizing:border-box; }
.ch p, .ch h1, .ch h2, .ch h3, .ch ol, .ch figure{ margin:0; }
.ch a{ color:inherit; text-decoration:none; }
.ch-wrap{ max-width:1240px; margin:0 auto; padding-left:32px; padding-right:32px; }
.ch-pad{ padding-top:112px; padding-bottom:112px; }
@media (max-width:640px){ .ch-wrap{ padding-left:18px; padding-right:18px; } .ch-pad{ padding-top:72px; padding-bottom:72px; } }

.ch-btn{ display:inline-flex; align-items:center; justify-content:center; min-height:44px; padding:0 22px; border-radius:999px;
  background:var(--ink); color:var(--paper) !important; border:1.5px solid var(--ink); font:700 14.5px/1 'Manrope',system-ui,sans-serif;
  cursor:pointer; transition:transform .15s, background .15s; }
.ch-btn:hover{ transform:translateY(-1px); background:#2B2438; }
.ch-btn.lg{ min-height:54px; padding:0 30px; font-size:16px; }
.ch-btn.ghost{ background:transparent; color:var(--ink) !important; }
.ch-btn.ghost:hover{ background:#ECE6DA; }
.ch-btn.light{ background:var(--paper); color:var(--ink) !important; border-color:var(--paper); }
.ch-btn.outline{ background:transparent; color:var(--paper) !important; border-color:var(--paper); }
.ch-btn.outline:hover{ background:rgba(247,244,238,.1); }

.ch-nav{ border-bottom:1px solid var(--line); }
.ch-navin{ display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:16px; padding-top:18px; padding-bottom:18px; }
.ch-logo{ font-weight:800; font-size:23px; letter-spacing:-.03em; justify-self:start; }
.ch-logo span{ color:var(--purple); }
.ch-logo.light{ color:var(--paper); }
.ch-logo.light span{ color:#C7B6F0; }
.ch-links{ display:flex; gap:36px; font-size:15.5px; font-weight:600; }
.ch-links a:hover{ color:var(--purple); }
.ch-navcta{ display:flex; gap:10px; justify-self:end; }
@media (max-width:860px){
  .ch-navin{ grid-template-columns:1fr auto; }
  .ch-links{ grid-column:1 / -1; grid-row:2; justify-content:center; }
}
@media (max-width:520px){ .ch-navcta .ghost{ display:none; } }

.ch-hero{ display:flex; flex-wrap:wrap; align-items:center; gap:64px; padding-top:104px; padding-bottom:96px; }
.ch-herotext{ flex:999 1 560px; min-width:0; }
.ch-eyebrow{ display:inline-flex; align-items:center; gap:10px; margin-bottom:26px !important; font-size:13px; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase; color:var(--purple); }
.ch-eyebrow i{ width:8px; height:8px; border-radius:50%; background:var(--sun); }
.ch-hero h1{ font-weight:800; font-size:clamp(42px,6vw,84px); line-height:1.04; letter-spacing:-.04em; }
.ch-hero h1 span{ color:var(--purple); }
.ch-actions{ display:flex; flex-wrap:wrap; gap:12px; margin-top:44px; }
.ch-heroart{ flex:1 1 360px; min-width:0; max-width:460px; aspect-ratio:4/5; background:var(--deep); border-radius:28px;
  position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:flex-end; padding:34px; }
.ch-heroart .r{ position:absolute; border-radius:50%; border:1px solid rgba(227,214,255,.22); }
.ch-heroart .r1{ right:-120px; top:-120px; width:420px; height:420px; }
.ch-heroart .r2{ right:-60px; top:-60px; width:300px; height:300px; }
.ch-heroart .r3{ right:0; top:0; width:180px; height:180px; }
.ch-heroart .sun{ position:absolute; right:64px; top:64px; width:52px; height:52px; border-radius:50%; background:var(--sun); }
.ch-artlabel{ position:relative; margin-bottom:18px !important; font-size:12px; font-weight:700; letter-spacing:.12em;
  text-transform:uppercase; color:#C7B6F0; }
.ch-mandates{ position:relative; display:flex; flex-direction:column; gap:10px; }
.ch-mandates div{ display:flex; justify-content:space-between; align-items:center; gap:12px; padding:15px 18px; border-radius:14px;
  background:rgba(247,244,238,.10); color:var(--paper); font-size:15.5px; font-weight:600; }
.ch-mandates small{ font-size:12px; color:#D9CCF7; text-align:right; }
.ch-mandates div.on{ background:var(--paper); color:var(--ink); font-weight:700; }
.ch-mandates div.on small{ color:var(--purple); font-weight:700; }
@media (max-width:640px){ .ch-hero{ padding-top:56px; padding-bottom:64px; gap:40px; } .ch-heroart{ aspect-ratio:auto; padding:26px; } }

.ch-band{ border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.ch-clients{ padding-top:56px; padding-bottom:60px; }
.ch-rowhead{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:baseline; gap:12px; margin-bottom:28px; }
.ch-kicker{ font-size:12.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
.ch-muted{ font-size:15.5px; color:var(--muted); }
.ch-logos{ display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:16px; }
.ch-logos figure{ display:flex; flex-direction:column; gap:10px; }
.ch-logos .tile{ height:96px; border-radius:16px; border:1px solid; display:flex; align-items:center; justify-content:center; overflow:hidden; }
.ch-logos .tile.pad{ padding:24px 20px; }
.ch-logos .tile.pad img{ max-width:100%; max-height:100%; object-fit:contain; }
.ch-logos .tile.square img{ object-fit:contain; }
.ch-logos figcaption{ font-size:14px; font-weight:600; color:var(--body); }

.ch-statement{ padding-top:120px; padding-bottom:40px; }
.ch-statement p{ max-width:960px; font-weight:700; font-size:clamp(26px,3.2vw,42px); line-height:1.3; letter-spacing:-.025em; }
.ch-statement span{ color:var(--purple); }

.ch-results{ padding-top:72px; padding-bottom:120px; }
.ch-rulehead{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:baseline; gap:16px; padding-bottom:22px; border-bottom:2px solid var(--ink); }
.ch-rulehead h2{ font-size:14px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
.ch-stats{ display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); column-gap:48px; }
.ch-stat{ padding:40px 0 36px; border-bottom:1px solid var(--line); }
.ch-stat .big{ font-weight:800; font-size:clamp(52px,5vw,68px); line-height:1; letter-spacing:-.04em; }
.ch-stat .big.accent{ color:var(--purple); }
.ch-stat .lab{ margin-top:16px !important; font-size:17px; font-weight:500; color:var(--body); max-width:270px; }

.ch-sand{ background:var(--sand); }
.ch-split{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-end; gap:24px; margin-bottom:56px; }
.ch-h2{ max-width:640px; font-weight:800; font-size:clamp(32px,3.8vw,52px); line-height:1.1; letter-spacing:-.035em; }
.ch-lede{ max-width:400px; font-size:17px; color:var(--body); }
.ch-services{ display:grid; grid-template-columns:repeat(auto-fit,minmax(290px,1fr)); gap:24px; }
.ch-svc{ background:var(--paper); border:1px solid var(--line); border-radius:22px; padding:36px 32px; display:flex; flex-direction:column; gap:18px; min-height:440px; }
.ch-svc .top{ display:flex; justify-content:space-between; align-items:center; }
.ch-svc .no{ font-size:13px; font-weight:700; letter-spacing:.12em; color:var(--purple); }
.ch-svc .pill{ font-size:12px; font-weight:700; padding:6px 12px; border-radius:999px; background:var(--sun); color:var(--ink); }
.ch-svc h3{ font-weight:800; font-size:30px; line-height:1.15; letter-spacing:-.03em; }
.ch-svc .body{ font-size:16.5px; color:var(--body); }
.ch-svc .best{ margin-top:auto; padding-top:22px; border-top:1px solid var(--line); }
.ch-svc .best .ch-kicker{ margin-bottom:6px; }
.ch-svc .best p:last-child{ font-size:15.5px; }
.ch-svc.dark{ background:var(--deep); color:var(--paper); border-color:var(--deep); }
.ch-svc.dark .no, .ch-svc.dark .ch-kicker{ color:#C7B6F0; }
.ch-svc.dark .body{ color:#E3D9FA; }
.ch-svc.dark .best{ border-top-color:rgba(217,204,247,.25); }
@media (max-width:640px){ .ch-svc{ min-height:0; padding:28px 24px; } }

.ch-practice{ display:flex; flex-wrap:wrap; gap:48px 80px; }
.ch-practice .intro{ flex:1 1 320px; min-width:0; }
.ch-practice .intro .ch-lede{ margin-top:20px; max-width:380px; }
.ch-practice .cols{ flex:2 1 520px; min-width:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:32px 48px; }
.ch-practice .colhead{ padding-bottom:14px; border-bottom:2px solid var(--ink); font-size:13px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--purple); }
.ch-practice .role{ padding:16px 0; border-bottom:1px solid var(--line); font-size:18px; font-weight:600; }

.ch-topline{ border-top:1px solid var(--line); }
.ch-steps{ margin-top:56px !important; padding:0; list-style:none; display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:32px; }
.ch-steps li{ border-top:2px solid var(--ink); padding-top:22px; }
.ch-steps .n{ font-size:15px; font-weight:800; color:var(--purple); }
.ch-steps .t{ margin:12px 0 8px !important; font-size:20px; font-weight:800; letter-spacing:-.02em; }
.ch-steps .b{ font-size:16px; color:var(--body); }

.ch-cta{ background:var(--deep); color:var(--paper); }
.ch-ctain{ padding-top:120px; padding-bottom:120px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-end; gap:40px; }
.ch-cta h2{ max-width:760px; font-weight:800; font-size:clamp(36px,4.6vw,66px); line-height:1.06; letter-spacing:-.04em; }
.ch-cta h2 span{ color:var(--sun); }
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

.ch a:focus-visible, .ch button:focus-visible{ outline:2px solid var(--purple); outline-offset:3px; }
`;
