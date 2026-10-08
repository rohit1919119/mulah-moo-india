import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PM_CSS, useCountUp, useMagnetic, useReveals } from "@/comic/PremiumHome";
import { FONT } from "@/comic/premiumData";
import { usePageTracking } from "@/comic/tracking";
import { BccUpcoming, UP_CSS, type Upcoming } from "@/comic/BccUpcoming";
import { BccForm, PMF_CSS, type BccIntent } from "@/comic/PmForms";

/**
 * mulahmoo.in/bcc: Backstage Creators Club, in the same design language as
 * the home page (shared PM_CSS, fonts and motion), with its own accents.
 *
 * Every invite, partner and host CTA opens BccForm (form_type "bcc-request").
 * Landing on /bcc#invite opens the invite form straight away.
 */

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const HERO_STATS: { big: string; to?: number; label: string }[] = [
  { big: "100+", to: 100, label: "Registered for Delhi 2.0" },
  { big: "37", to: 37, label: "Leads in the room" },
  { big: "20", to: 20, label: "Seats per edition" },
  { big: "3", to: 3, label: "Editions so far" },
];

const STRIP = ["Invite only", "Content heads", "Brand and marketing leads", "Studio founders", "Video and YouTube leads", "One partner per edition", "City by city"];

const WHO = [
  { t: "Content heads", b: "Who run teams and set the slate." },
  { t: "Studio founders", b: "Who build the shows India watches." },
  { t: "Video and YouTube leads", b: "Who greenlight budgets and vendors." },
  { t: "Brand and marketing leads", b: "Who own the brand and the media plan." },
];

const PASSES = [
  { tag: "Attend", seats: "20 seats", name: "Member seat", tone: "dark", cta: "Request an invite", intent: "Attend" as BccIntent,
    points: ["A closed door evening with senior leads", "Coffee, food and real conversation", "Access to the private member circle"] },
  { tag: "Partner", seats: "1 per edition", name: "Founding partner", tone: "purple", cta: "Become a partner", intent: "Partner" as BccIntent,
    points: ["Personal intros to 20 decision makers", "A warm brand mention on the night", "Featured in recaps across socials"] },
  { tag: "Host", seats: "New cities", name: "Host a city", tone: "light", cta: "Get in touch", intent: "Host a city" as BccIntent,
    points: ["Bring the club to your city", "We curate the room with you", "A co branded edition"] },
];

const PERKS = [
  { t: "Direct room access", b: "A personal intro to around 20 leads who approve tools, vendors and content budgets." },
  { t: "An organic mention", b: "A genuine, warm introduction of your brand during the evening." },
  { t: "Community presence", b: "Featured in member updates and in Instagram and LinkedIn recaps." },
  { t: "First mover position", b: "Be the founding partner of a leadership circuit going city by city." },
];

const EDITIONS = [
  { name: "Delhi 1.0", meta: "12 leads", d: "Where it started. One long table, twelve content leaders.", img: "/bcc/delhi-1.jpg" },
  { name: "Delhi 2.0", meta: "37 attended · 100+ registered", d: "Pickleball courts, coffee and a lot of shop talk.", img: "/bcc/delhi-2.jpg" },
  { name: "Mumbai", meta: "15 brand content heads and studio founders", d: "The club's first room outside Delhi.", img: "/bcc/mumbai-1.jpg" },
];

const FAQS = [
  { q: "Who is the club for?", a: "Content heads, brand and marketing leads, YouTube and video leads, branded content producers and studio founders. People who run teams and budgets, not just accounts." },
  { q: "How do I get an invite?", a: "Request one with a line on what you run and who you make it for. Every request is read by a person, and invites go out city by city." },
  { q: "Does it cost anything to attend?", a: "No. Seats are by invite only. Each edition is supported by a single partner brand." },
  { q: "How many people are in the room?", a: "Around 20 per edition. Small enough that everyone actually talks to everyone." },
  { q: "Which cities do you host in?", a: "Delhi and Mumbai so far, with more cities on the way. Members hear about the next room first." },
  { q: "How can my brand partner with the club?", a: "There is one partner per edition. Use the partner form on this page and we will send the current partner deck." },
];

export function BccPage() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(0);
  const [form, setForm] = useState<BccIntent | null>(null);
  const [intent, setIntent] = useState<BccIntent>("Attend");
  const [preset, setPreset] = useState<{ city?: string; note?: string }>({});
  const ask = (i: BccIntent, p: { city?: string; note?: string } = {}) => { setPreset(p); setIntent(i); setForm(i); };
  const askFor = (u: Upcoming) => ask("Attend", { city: u.formCity, note: `Interested in: ${u.room}, ${u.city}, ${u.month} ${u.year} (${u.format.toLowerCase()})` });
  const statRef = useRef<HTMLDivElement>(null);
  const p = useCountUp(statRef, 1600);
  useReveals();
  usePageTracking();
  useMagnetic();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // /bcc#invite, linked from the home page, opens the invite form directly
  useEffect(() => {
    const check = () => { if (window.location.hash === "#invite") ask("Attend"); };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  const vars = { "--display": FONT.display, "--ui": FONT.ui, "--dw": 400 } as React.CSSProperties;
  const count = (big: string, to: number | undefined) =>
    to === undefined || p >= 1 ? big : big.replace(/\d+/, String(Math.round(to * p)));

  return (
    <div className="pm bc" style={vars}>
      <style dangerouslySetInnerHTML={{ __html: PM_CSS + BC_CSS + PMF_CSS + UP_CSS }} />

      <header className={scrolled ? "pm-nav solid" : "pm-nav"}>
        <div className="pm-navpill">
          <a href="#top" className="bc-brand" aria-label="Backstage Creators Club home">
            <img src="/bcc/logo.jpg" alt="" width="32" height="32" />
          </a>
          <nav className="pm-links" aria-label="Main">
            <a href="#about">About</a>
            <a href="#upcoming">Upcoming</a>
            <a href="#editions">Editions</a>
            <a href="#partner">Partner</a>
            <a href="#faq">FAQ</a>
          </nav>
          <button type="button" onClick={() => ask("Attend")} className="pm-btn sm" data-mag>Request invite</button>
        </div>
      </header>

      <section className="bc-hero" id="top">
        <img className="bc-heroimg" src="/bcc/hero.jpg" alt="" aria-hidden="true" />
        <div className="bc-heroveil" aria-hidden="true" />
        <div className="pm-posbg" aria-hidden="true"><span className="b1" /><span className="b2" /><span className="b3" /></div>
        <div className="pm-wrap bc-herobody">
          <p className="bc-chip"><i />Invite only · City by city</p>
          <h1>Backstage<br /><em>Creators Club.</em></h1>
          <p className="bc-lede">The most senior room in Indian content.</p>
          <div className="pm-actions center">
            <button type="button" onClick={() => ask("Attend")} className="pm-btn sun lg" data-mag>Request an invite</button>
          </div>
          <div className="pm-impact bc-stats" ref={statRef}>
            {HERO_STATS.map((s) => (
              <div key={s.label}><b>{count(s.big, s.to)}</b><span>{s.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <div className="pm-strip" aria-label="About the club">
        <div className="pm-striptrack">
          {[0, 1].map((k) => (
            <span key={k} aria-hidden={k === 1 ? true : undefined}>
              {[...STRIP, ...STRIP].map((r, i) => <span key={`${r}${i}`} className="it">{r}<i>&#10022;</i></span>)}
            </span>
          ))}
        </div>
      </div>

      <section className="pm-sec" id="about">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>Built for the people behind <em>India&rsquo;s content.</em></h2>
          <p className="bc-body" data-r>
            A city by city circuit of closed door evenings for the leads who run teams and greenlight budgets. No
            panels and no pitches: twenty people, one long table, and the conversations that do not happen anywhere else.
          </p>
          <div className="bc-who" data-r>
            {WHO.map((w, i) => (
              <div key={w.t}><span>0{i + 1}</span><h3>{w.t}</h3><p>{w.b}</p></div>
            ))}
          </div>
        </div>
      </section>

      <BccUpcoming onRequest={askFor} />

      <section className="pm-sec pm-sand" id="ways">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>Pick your <em>way in.</em></h2>
          <div className="bc-passes" data-r>
            {PASSES.map((x) => (
              <article key={x.name} className={`bc-pass ${x.tone}`}>
                <div className="top"><span>{x.tag}</span><span>{x.seats}</span></div>
                <h3>{x.name}</h3>
                <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <button type="button" onClick={() => ask(x.intent)} className={x.tone === "purple" ? "pm-btn light" : x.tone === "dark" ? "pm-btn sun" : "pm-btn"} data-mag>{x.cta}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pm-sec" id="partner">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>What partners <em>walk away with.</em></h2>
          <div className="bc-perks" data-r>
            {PERKS.map((x, i) => (
              <div key={x.t}><b>0{i + 1}</b><h3>{x.t}</h3><p>{x.b}</p></div>
            ))}
          </div>
          <div className="pm-actions center" data-r>
            <button type="button" onClick={() => ask("Partner")} className="pm-btn lg" data-mag>Partner with the club</button>
            <button type="button" onClick={() => ask("Partner")} className="pm-btn ghost lg" data-mag>Request the deck</button>
          </div>
        </div>
      </section>

      <section className="bc-editions" id="editions">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>Every room, <em>so far.</em></h2>
          <div className="bc-edgrid" data-r>
            {EDITIONS.map((e) => (
              <article key={e.name}>
                <img src={e.img} alt={`${e.name} edition`} loading="lazy" />
                <div className="veil" aria-hidden="true" />
                <div className="txt">
                  <span className="st">Held</span>
                  <h3>{e.name}</h3>
                  <p className="meta">{e.meta}</p>
                  <p>{e.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pm-sec" id="room">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>From <em>the room.</em></h2>
          <div className="bc-wall" data-r>
            <img className="w1" src="/bcc/mumbai-2.jpg" alt="A Mumbai edition table" loading="lazy" />
            <div className="w2 stat">
              <span className="k">Community reach</span>
              <b>100K+</b>
              <span>talents reached online through organic community updates</span>
            </div>
            <img className="w3" src="/bcc/members.jpg" alt="Members in conversation" loading="lazy" />
            <img className="w4" src="/bcc/delhi-2.jpg" alt="Delhi 2.0 group photo" loading="lazy" />
            <a className="w5 follow" href="https://www.instagram.com/backstagecreatorsclub/" {...ext}>
              <span>Follow the club</span><b>@backstagecreatorsclub</b><i aria-hidden="true">&rarr;</i>
            </a>
          </div>
        </div>
      </section>

      <section className="pm-sec pm-sand" id="faq">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>Good <em>questions.</em></h2>
          <div className="bc-faq" data-r>
            {FAQS.map((f, i) => (
              <div key={f.q} className={open === i ? "q on" : "q"}>
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span><i aria-hidden="true" />
                </button>
                <div className="a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bc-cta" id="invite">
        <div className="pm-posbg" aria-hidden="true"><span className="b1" /><span className="b2" /><span className="b3" /></div>
        <div className="pm-wrap bc-ctain" data-r>
          <p className="bc-chip"><i />Twenty seats per city</p>
          <h2>Join the<br /><em>next room.</em></h2>
          <p className="bc-lede">Tell us what you run and who you make it for. Every request is read by a person.</p>
          <div className="pm-actions center">
            <button type="button" onClick={() => ask("Attend")} className="pm-btn sun lg" data-mag>Request an invite</button>
          </div>
        </div>
      </section>

      <footer className="pm-foot">
        <div className="pm-wrap pm-footin">
          <div className="brand">
            <span className="bc-brand"><img src="/bcc/logo.jpg" alt="" width="32" height="32" /><span>Backstage Creators Club</span></span>
            <p>India&rsquo;s room for the people behind the content. Closed door evenings, one city at a time.</p>
          </div>
          <div className="cols">
            <div>
              <p className="pm-kicker">Club</p>
              <a href="#about">About</a>
              <a href="#editions">Editions</a>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <p className="pm-kicker">Get involved</p>
              <button type="button" className="pm-footlink" onClick={() => ask("Attend")}>Request an invite</button>
              <button type="button" className="pm-footlink" onClick={() => ask("Partner")}>Partner with us</button>
              <button type="button" className="pm-footlink" onClick={() => ask("Host a city")}>Host a city</button>
            </div>
            <div>
              <p className="pm-kicker">Follow</p>
              <a href="https://www.instagram.com/backstagecreatorsclub/" {...ext}>Instagram</a>
              <a href="https://www.linkedin.com/company/backstage-creators-club/" {...ext}>LinkedIn</a>
              <a href="mailto:Rohit@mulahmoo.com">Rohit@mulahmoo.com</a>
            </div>
          </div>
        </div>
        <div className="pm-wrap pm-legal">&copy; 2026 Backstage Creators Club &middot; <Link to="/">A Mulah Moo community</Link> &middot; <Link to="/privacy">Privacy</Link></div>
      </footer>
      <BccForm open={form !== null} intent={intent} city={preset.city} note={preset.note} onClose={() => { setForm(null); if (window.location.hash === "#invite") history.replaceState(null, "", window.location.pathname); }} />
    </div>
  );
}

const BC_CSS = `
.bc-brand{ display:inline-flex; align-items:center; gap:10px; font:600 15px var(--ui); letter-spacing:-.01em; color:inherit; }
.bc-brand img{ border-radius:8px; display:block; }
.bc .pm-navpill{ gap:24px; }
@media (max-width:640px){ .bc-brand span{ display:none; } }

/* hero: the room itself, under a deep veil, with the same drifting light */
.bc-hero{ position:relative; overflow:hidden; background:var(--deeper); color:#fff; min-height:max(720px,min(980px,100vh)); display:flex; }
.bc-heroimg{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:grayscale(.35) contrast(1.05); animation:bcKen 28s ease-in-out infinite alternate; }
@keyframes bcKen{ from{ transform:scale(1.06); } to{ transform:scale(1.16) translate(-1.5%,-1%); } }
.bc-heroveil{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(20,10,43,.82) 0%, rgba(20,10,43,.62) 45%, rgba(20,10,43,.94) 100%); }
.bc-hero .pm-posbg{ opacity:.7; }
.bc-herobody{ position:relative; z-index:2; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding-top:150px; padding-bottom:72px; }
.bc-hero h1{ font-size:clamp(56px,9vw,148px); line-height:.95; letter-spacing:-.035em; }
.bc-hero h1 em{ color:#D3C2FF; }
.bc-chip{ display:inline-flex; align-items:center; gap:10px; padding:9px 16px; border-radius:999px; margin-bottom:34px !important;
  font-size:12.5px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:#EDE6FF; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.16); }
.bc-chip i{ width:7px; height:7px; border-radius:50%; background:var(--sun); }
.bc-lede{ margin-top:28px !important; font-size:clamp(18px,1.8vw,24px); font-weight:300; color:#D8CCF2; }
.bc-stats{ margin-top:72px; }
@media (max-width:640px){ .bc-stats{ width:100%; } }

/* about */
.bc-body{ max-width:640px; margin:-48px auto 0 !important; text-align:center; font-size:19px; font-weight:300; line-height:1.65; color:var(--body); }
.bc-who{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:0; margin-top:88px; border-top:1px solid var(--line); }
.bc-who div{ padding:34px 28px 0; border-left:1px solid var(--line); text-align:center; }
.bc-who div:first-child{ border-left:0; }
.bc-who span{ font-size:13px; font-weight:600; color:var(--purple); }
.bc-who h3{ font-family:var(--display); font-weight:var(--dw); line-height:1.12; font-size:clamp(26px,2.4vw,34px); letter-spacing:-.015em; margin:10px 0 8px !important; }
.bc-who p{ font-size:16px; color:var(--muted); }
.bc-wide{ position:relative; margin-top:96px !important; border-radius:32px; overflow:hidden; aspect-ratio:16/8; }
.bc-wide img{ width:100%; height:100%; object-fit:cover; display:block; transition:transform 1.2s cubic-bezier(.2,.9,.25,1); }
.bc-wide:hover img{ transform:scale(1.03); }
.bc-wide figcaption{ position:absolute; left:24px; bottom:22px; padding:8px 14px; border-radius:999px; background:rgba(20,10,43,.7); color:#fff; font-size:13px; font-weight:600; backdrop-filter:blur(8px); }
@media (max-width:1000px){ .bc-who{ grid-template-columns:repeat(2,minmax(0,1fr)); row-gap:40px; } .bc-who div:nth-child(3){ border-left:0; } }
@media (max-width:760px){ .bc-who{ grid-template-columns:1fr; } .bc-who div{ border-left:0; border-bottom:1px solid var(--line); padding:28px 0; } .bc-wide{ aspect-ratio:4/3; } }

/* ways in */
.bc-passes{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }
.bc-pass{ border-radius:28px; padding:36px 32px; display:flex; flex-direction:column; gap:22px; min-height:460px; transition:transform .4s cubic-bezier(.2,.9,.25,1); }
.bc-pass:hover{ transform:translateY(-6px); }
.bc-pass.dark{ background:var(--deep); color:#fff; } .bc-pass.purple{ background:var(--purple); color:#fff; } .bc-pass.light{ background:var(--paper); border:1px solid var(--line); }
.bc-pass .top{ display:flex; justify-content:space-between; font-size:12px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; opacity:.75; }
.bc-pass h3{ font-family:var(--display); font-weight:var(--dw); font-size:clamp(38px,3.4vw,52px); line-height:1; letter-spacing:-.02em; }
.bc-pass ul{ list-style:none; padding:22px 0 0; margin:0; border-top:1px solid currentColor; border-top-color:rgba(127,127,127,.3); display:flex; flex-direction:column; gap:12px; font-size:16px; }
.bc-pass li{ display:flex; gap:10px; } .bc-pass li::before{ content:''; flex:none; width:6px; height:6px; margin-top:.6em; border-radius:50%; background:var(--sun); }
.bc-pass .pm-btn{ margin-top:auto; }
@media (max-width:960px){ .bc-passes{ grid-template-columns:1fr; } .bc-pass{ min-height:0; } }

/* partner perks */
.bc-perks{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); border-top:1px solid var(--ink); }
.bc-perks div{ padding:32px 24px 0; border-left:1px solid var(--line); }
.bc-perks div:first-child{ border-left:0; padding-left:0; }
.bc-perks b{ font-family:var(--display); font-weight:var(--dw); font-size:56px; line-height:1; color:var(--purple); }
.bc-perks h3{ font-size:19px; font-weight:600; margin:18px 0 8px !important; }
.bc-perks p{ font-size:15.5px; color:var(--body); }
.bc #partner .pm-actions{ margin-top:72px; }
@media (max-width:960px){ .bc-perks{ grid-template-columns:1fr 1fr; row-gap:36px; } .bc-perks div:nth-child(3){ border-left:0; padding-left:0; } }
@media (max-width:560px){ .bc-perks{ grid-template-columns:1fr; } .bc-perks div{ border-left:0; padding-left:0; } }

/* editions */
.bc-editions{ background:var(--deeper); color:#fff; padding:180px 0; }
.bc-editions .pm-h em{ color:#C9B6FF; }
.bc-edgrid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }
.bc-edgrid article{ position:relative; min-height:520px; border-radius:28px; overflow:hidden; }
.bc-edgrid img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform 1s cubic-bezier(.2,.9,.25,1); }
.bc-edgrid article:hover img{ transform:scale(1.04); }
.bc-edgrid .veil{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(20,10,43,.05) 30%, rgba(20,10,43,.94) 100%); }
.bc-edgrid .txt{ position:absolute; left:28px; right:28px; bottom:28px; display:flex; flex-direction:column; gap:8px; }
.bc-edgrid .st{ align-self:flex-start; font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; padding:6px 10px; border-radius:999px; background:rgba(255,255,255,.12); }
.bc-edgrid h3{ font-family:var(--display); font-weight:var(--dw); font-size:56px; line-height:.95; letter-spacing:-.02em; }
.bc-edgrid .meta{ font-size:13px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--sun); }
.bc-edgrid p{ font-size:15.5px; color:#D8CCF2; }
@media (max-width:960px){ .bc-edgrid{ grid-template-columns:1fr; } .bc-edgrid article{ min-height:420px; } .bc-editions{ padding:110px 0; } }

/* from the room */
.bc-wall{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); grid-auto-rows:260px; gap:16px; }
.bc-wall img{ width:100%; height:100%; object-fit:cover; border-radius:24px; display:block; }
.bc-wall .w1{ grid-column:span 2; grid-row:span 2; }
.bc-wall .w3{ grid-column:span 2; }
.bc-wall{ grid-auto-flow:row dense; }
.bc-wall .w4{ grid-column:span 4; }
.bc-wall .stat{ border-radius:24px; background:var(--purple); color:#fff; padding:26px; display:flex; flex-direction:column; justify-content:flex-end; gap:6px; }
.bc-wall .stat .k{ font-size:12px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; opacity:.8; margin-bottom:auto; }
.bc-wall .stat b{ font-family:var(--display); font-weight:var(--dw); font-size:64px; line-height:.9; }
.bc-wall .stat span{ font-size:15px; } .bc-wall .stat small{ font-size:13px; opacity:.8; }
.bc-wall .follow{ border-radius:24px; background:var(--deep); color:#fff; padding:26px; display:flex; flex-direction:column; justify-content:flex-end; gap:4px; position:relative; transition:background .3s; }
.bc-wall .follow:hover{ background:#33196A; }
.bc-wall .follow span{ font-size:13px; color:#BBAEDD; } .bc-wall .follow b{ font-family:var(--display); font-weight:var(--dw); font-size:24px; }
.bc-wall .follow i{ position:absolute; top:22px; right:24px; font-style:normal; font-size:22px; color:var(--sun); }
@media (max-width:900px){ .bc-wall{ grid-template-columns:repeat(2,minmax(0,1fr)); grid-auto-rows:200px; } .bc-wall .w1{ grid-column:span 2; } .bc-wall .w3{ grid-column:span 2; } .bc-wall .w4{ grid-column:span 2; } }
@media (max-width:600px){ .bc-wall .stat, .bc-wall .follow{ grid-column:span 2; } .bc-wall .w4{ grid-column:span 2; } .bc-wall .stat b{ font-size:52px; } .bc-wall .follow b{ font-size:22px; overflow-wrap:anywhere; } }

/* faq */
.bc-faq{ max-width:860px; margin:0 auto; border-top:1px solid var(--ink); }
.bc-faq .q{ border-bottom:1px solid var(--line); }
.bc-faq button{ width:100%; display:flex; justify-content:space-between; align-items:center; gap:24px; text-align:left; padding:28px 0; background:none; border:0; cursor:pointer;
  font-family:var(--display); font-weight:var(--dw); font-size:clamp(22px,2vw,28px); color:var(--ink); letter-spacing:-.01em; }
.bc-faq button i{ position:relative; flex:none; width:40px; height:40px; border-radius:50%; border:1px solid rgba(26,22,20,.2); transition:background .3s, border-color .3s; }
.bc-faq button i::before, .bc-faq button i::after{ content:''; position:absolute; left:50%; top:50%; width:13px; height:1.5px; background:currentColor; transform:translate(-50%,-50%); transition:transform .35s; }
.bc-faq button i::after{ transform:translate(-50%,-50%) rotate(90deg); }
.bc-faq .on button i{ background:var(--deep); border-color:var(--deep); color:#fff; }
.bc-faq .on button i::after{ transform:translate(-50%,-50%) rotate(0deg); }
.bc-faq .a{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .45s cubic-bezier(.2,.9,.25,1); }
.bc-faq .a p{ overflow:hidden; font-size:17px; color:var(--body); max-width:62ch; }
.bc-faq .on .a{ grid-template-rows:1fr; }
.bc-faq .on .a p{ padding-bottom:28px; }

/* closing */
.bc-cta{ position:relative; overflow:hidden; background:var(--deep); color:#fff; padding:200px 0; text-align:center; }
.bc-ctain{ position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; }
.bc-cta h2{ font-size:clamp(56px,8vw,128px); line-height:.95; }
.bc-cta h2 em{ color:var(--sun); }
@media (max-width:760px){ .bc-cta{ padding:120px 0; } }
`;
