import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/comic/Logo";
import { Constellation, CN_CSS } from "@/comic/Constellation";
import { Clients, PM_CSS, Strip, useCountUp, useMagnetic, useReveals } from "@/comic/PremiumHome";
import { Chips, Modal, PMF_CSS } from "@/comic/PmForms";
import { FONT } from "@/comic/premiumData";
import { BRIEFS, CONSULT, LEGAL_NAME, SHEET_URL, SOCIALS, TALENT_CALL_URL } from "@/comic/data";
import { CREATORS } from "@/comic/onboardingData";
import type { Brief } from "@/comic/content";
import {
  MV_ARENA, MV_BAR, MV_EXPECT, MV_EXPERIENCE, MV_PAID, MV_ROLES, MV_STATS, MV_STEPS, MV_TESTIMONIALS, MV_USPS,
} from "@/comic/mooVerifiedData";

/**
 * The talent side of mulahmoo.in, in the premium design:
 *
 *   /moo-talent ...... MooTalentPage, the talent network landing
 *   /moo-verified .... MooVerifiedPage, the contracted editor bench
 *
 * /moo-talent-form lives in TalentFormPremium.tsx. All three share the nav,
 * footer and type of the home page (PM_CSS) plus TP_CSS below.
 */

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const VARS = { "--display": FONT.display, "--ui": FONT.ui, "--dw": 400 } as React.CSSProperties;

export const TALENT_TICKER = [
  "Video editor", "Motion designer", "Thumbnail designer", "Scriptwriter", "YouTube strategist",
  "Instagram strategist", "Creative producer", "Content lead", "Brand manager", "Marketing lead", "And more",
];

function useScrolled() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > 60);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return on;
}

/* ------------------------------------------------------------- shell */

export function TalentNav({ links, cta }: { links: { label: string; href: string }[]; cta: React.ReactNode }) {
  const scrolled = useScrolled();
  return (
    <header className={scrolled ? "pm-nav solid" : "pm-nav"}>
      <div className="pm-navpill">
        <Link to="/" className="pm-logo" aria-label="Mulah Moo home"><Logo height={20} mono={!scrolled} /></Link>
        <nav className="pm-links" aria-label="Main">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="pm-navcta">
          <Link to="/" className="pm-btn sm talent" data-mag>For brands</Link>
          {cta}
        </div>
      </div>
    </header>
  );
}

export function TalentFoot() {
  return (
    <footer className="pm-foot">
      <div className="pm-wrap pm-footin">
        <div className="brand">
          <Logo height={24} mono />
          <p>The roles that never reach a job board.</p>
        </div>
        <div className="cols">
          <div>
            <p className="pm-kicker">Talent</p>
            <Link to="/moo-talent">Talent network</Link>
            <Link to="/moo-talent-form">Apply</Link>
            <Link to="/moo-verified">Moo Verified</Link>
            <a href={CONSULT.bookingUrl} {...ext}>Career guidance</a>
          </div>
          <div>
            <p className="pm-kicker">Mulah Moo</p>
            <Link to="/">For brands</Link>
            <Link to="/bcc">Backstage Creators Club</Link>
          </div>
          <div>
            <p className="pm-kicker">Follow</p>
            {SOCIALS.map((s) => <a key={s.label} href={s.url} {...ext}>{s.label}</a>)}
          </div>
        </div>
      </div>
      <div className="pm-wrap pm-legal">&copy; 2026 {LEGAL_NAME} &middot; mulahmoo.in &middot; <Link to="/privacy">Privacy</Link></div>
    </footer>
  );
}

function Stats({ items }: { items: { big: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useCountUp(ref, 1600);
  const count = (big: string) => {
    const m = big.match(/[\d,]+/);
    if (!m || p >= 1) return big;
    const to = Number(m[0].replace(/,/g, ""));
    return big.replace(m[0], Math.round(to * p).toLocaleString("en-IN"));
  };
  return (
    <div className="pm-impact" ref={ref}>
      {items.map((s) => <div key={s.label}><b>{count(s.big)}</b><span>{s.label}</span></div>)}
    </div>
  );
}

function Voices({ id, title, items }: { id?: string; title: React.ReactNode; items: typeof MV_TESTIMONIALS }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (d: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: d * Math.min(el.clientWidth * 0.8, 460), behavior: "smooth" });
  };
  return (
    <section className="pm-sec" id={id}>
      <div className="pm-wrap pm-voicehead" data-r>
        <h2 className="pm-h">{title}</h2>
        <div className="pm-arrows">
          <button type="button" onClick={() => go(-1)} aria-label="Previous" data-mag>&larr;</button>
          <button type="button" onClick={() => go(1)} aria-label="Next" data-mag>&rarr;</button>
        </div>
      </div>
      <div className="pm-voices tp-voices" ref={ref} tabIndex={0} aria-label="Testimonials">
        {items.map((q, i) => (
          <figure key={q.slug || `anon-${i}`} className={i % 3 === 1 ? "dark" : undefined}>
            <blockquote>&ldquo;{q.quote}&rdquo;</blockquote>
            <figcaption>
              {q.named && q.slug
                ? <img src={`/talent/${q.slug}.jpg`} alt="" loading="lazy" onError={(e) => e.currentTarget.remove()} />
                : null}
              <span className="who">
                <b>{q.named ? q.name : q.role}</b>
                <span>{q.named ? `${q.role}, ${q.company}` : q.company}</span>
              </span>
              {q.named && q.linkedin && (
                <a href={q.linkedin} {...ext} className="li" aria-label={`${q.name} on LinkedIn`}>in</a>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ======================================================= /moo-talent */

function BriefCard({ b }: { b: Brief }) {
  return (
    <div className="tp-brief">
      <span className="live"><i />Live</span>
      <div>
        <p className="role">{b.role}</p>
        <p className="client">{b.client}</p>
      </div>
      <p className="pay"><b>{b.pay}</b> / month</p>
    </div>
  );
}

const TALENT_STEPS = [
  { t: "Apply in two minutes", b: "Seven questions and a link to your work. The work matters more than the form." },
  { t: "We read your work", b: "A person on our team reviews every profile. We come back when a role fits you." },
  { t: "A test assignment", b: "Most roles have a short assignment from the real brief, and most of those are paid." },
  { t: "Interviews and offer", b: "We introduce you, prepare you for the interviews and stay with you through the offer." },
];

export function MooTalentPage({ briefs = BRIEFS as unknown as Brief[] }: { briefs?: Brief[] }) {
  useReveals();
  useMagnetic();
  const signals = briefs.slice(0, 8).map((b) => ({ role: b.role, ctx: `${b.client} · ${b.pay}/mo` }));
  const named = MV_TESTIMONIALS.filter((q) => q.named);

  return (
    <div className="pm tp" style={VARS}>
      <style dangerouslySetInnerHTML={{ __html: PM_CSS + CN_CSS + PMF_CSS + TP_CSS }} />
      <TalentNav
        links={[{ label: "Live roles", href: "#roles" }, { label: "How it works", href: "#how" }, { label: "Moo Verified", href: "#paths" }]}
        cta={<Link to="/moo-talent-form" className="pm-btn sm" data-mag>Apply</Link>}
      />

      <section className="pm-hero" id="top">
        <div className="pm-hero-glow" aria-hidden="true" />
        <Constellation signals={signals} />
        <div className="pm-wrap pm-herobody">
          <p className="tp-chip"><i />For creatives and marketers</p>
          <h1 className="tp-h1">The roles that never<br /><em>reach a job board.</em></h1>
          <div className="pm-herofoot">
            <div className="pm-actions">
              <Link to="/moo-talent-form" className="pm-btn light lg" data-mag>Apply to the network</Link>
              <a href="#roles" className="pm-btn outline lg" data-mag>See live roles</a>
            </div>
            <Stats items={[
              { big: "10,000+", label: "Creatives in the network" },
              { big: "1 to 10", label: "Years of experience" },
              { big: "70%", label: "Of assignments are paid" },
              { big: "3", label: "Markets: India, US and UK" },
            ]} />
          </div>
        </div>
      </section>

      <Strip items={TALENT_TICKER} label="Roles we place" />

      <section className="pm-sec tp-roles" id="roles">
        <h2 className="pm-h pm-wrap" data-r>Roles moving <em>right now.</em></h2>
        <div className="tp-mq" data-r>
          <div className="track">
            {[0, 1].map((k) => briefs.map((b) => <BriefCard key={`${k}-${b.role}-${b.client}`} b={b} />))}
          </div>
        </div>
        <div className="pm-actions center" data-r>
          <Link to="/moo-talent-form" className="pm-btn lg" data-mag>Apply to see roles that fit you</Link>
        </div>
      </section>

      <Clients title={<>Where our talent <em>works.</em></>} />

      <section className="pm-sec tp-dark" id="how">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>From application <em>to offer.</em></h2>
          <ol className="tp-steps" data-r>
            {TALENT_STEPS.map((s, i) => (
              <li key={s.t}><span className="n">{String(i + 1).padStart(2, "0")}</span><h3>{s.t}</h3><p>{s.b}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pm-sec pm-sand" id="paths">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>Two more <em>ways in.</em></h2>
          <div className="tp-paths" data-r>
            <Link to="/moo-verified" className="tp-path dark">
              <p className="pm-kicker">For video editors</p>
              <h3>Moo Verified</h3>
              <p>Long term contracts worth ₹1 lakh a month and up, with creators who already know what they want.</p>
              <span className="go">See the programme <span aria-hidden="true">&rarr;</span></span>
            </Link>
            <a href={CONSULT.bookingUrl} {...ext} className="tp-path">
              <p className="pm-kicker">Career guidance</p>
              <h3>Doing good work and still invisible?</h3>
              <ul>{CONSULT.painPoints.map((p) => <li key={p}>{p}</li>)}</ul>
              <span className="go">Book a 1:1 call <span aria-hidden="true">&rarr;</span></span>
            </a>
          </div>
        </div>
      </section>

      <Voices title={<>In their <em>words.</em></>} items={named} />

      <section className="pm-close tp-close">
        <div className="pm-wrap" data-r>
          <h2>Seven questions.<br /><em>About two minutes.</em></h2>
          <div className="pm-actions center">
            <Link to="/moo-talent-form" className="pm-btn sun lg" data-mag>Begin your application</Link>
          </div>
        </div>
      </section>

      <TalentFoot />
    </div>
  );
}

/* ===================================================== /moo-verified */

type VFields = { name: string; email: string; phone: string; city: string; role: string; experience: string; portfolio: string; note: string };
const VEMPTY: VFields = { name: "", email: "", phone: "", city: "", role: "", experience: "", portfolio: "", note: "" };

/** Same payload as the old page, so rows keep landing in the "Inbound
 *  talents" tab: form_type "moo-verified", Moo Arena as a column. */
function VerifiedApply({ open, arenaStart, onClose }: { open: boolean; arenaStart: boolean; onClose: () => void }) {
  const [f, setF] = useState<VFields>(VEMPTY);
  const [arena, setArena] = useState(arenaStart);
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  useEffect(() => { if (open) setArena((a) => a || arenaStart); }, [open, arenaStart]);
  const set = (k: keyof VFields, v: string) => { setF((d) => ({ ...d, [k]: v })); setErr(""); };
  const close = () => { onClose(); if (state === "done") { setF(VEMPTY); setArena(false); setState("idle"); } };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim()) return setErr("Please add your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return setErr("Please add a valid email.");
    if (!f.city.trim()) return setErr("Please add your city.");
    if (!f.role) return setErr("Pick the kind of editing you do.");
    if (!f.experience) return setErr("Pick how long you have been editing.");
    if (!f.portfolio.trim()) return setErr("Please add a link to your work.");
    const portfolio = f.portfolio.trim();
    setState("sending");
    try {
      await fetch(SHEET_URL, {
        method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "moo-verified",
          ...f,
          portfolio: /^https?:\/\//i.test(portfolio) ? portfolio : `https://${portfolio}`,
          mooArena: arena ? "Yes" : "",
          note: f.note.trim() || "—",
          submitted_at: new Date().toISOString(),
          source: "/moo-verified",
        }),
      });
      setState("done");
    } catch {
      setState("idle");
      setErr("That did not go through. Please try again.");
    }
  }

  return (
    <Modal open={open} onClose={close} label="Apply to Moo Verified">
      {state === "done" ? (
        <div className="pm-form done" role="status">
          <span className="pm-tick" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          <h3>Got it. Thank you.</h3>
          <p>We read every application ourselves. If a contract fits you, we will be in touch to set up an interview{arena ? ", and your Moo Arena joining link is on its way" : ""}.</p>
          <div className="pmf-doneact"><button type="button" className="pm-btn outline" onClick={close}>Close</button></div>
        </div>
      ) : (
        <form className="pm-form" onSubmit={submit} noValidate>
          <p className="pmf-kicker">Moo Verified</p>
          <h3>Apply to join.</h3>
          <div className="two">
            <label><span>Full name</span><input id="mv-name" value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></label>
            <label><span>Email</span><input id="mv-email" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></label>
          </div>
          <div className="two">
            <label><span>Phone <i>optional</i></span><input id="mv-phone" type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+91" /></label>
            <label><span>City</span><input id="mv-city" value={f.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" /></label>
          </div>
          <fieldset><legend>What kind of editing do you do</legend><Chips options={MV_ROLES} value={f.role} onPick={(v) => set("role", v)} /></fieldset>
          <fieldset><legend>How long have you been editing</legend><Chips options={MV_EXPERIENCE} value={f.experience} onPick={(v) => set("experience", v)} /></fieldset>
          <label><span>Showreel or portfolio <i>the part we actually look at</i></span><input id="mv-portfolio" value={f.portfolio} onChange={(e) => set("portfolio", e.target.value)} placeholder="Drive folder, YouTube playlist or your site" /></label>
          <label><span>Anything else <i>optional</i></span><textarea id="mv-note" rows={2} value={f.note} onChange={(e) => set("note", e.target.value)} placeholder="Niches you know well, tools, availability" /></label>
          <label className="tp-optin">
            <input type="checkbox" checked={arena} onChange={(e) => setArena(e.target.checked)} />
            <span><b>Also send me the Moo Arena joining link</b><span>$20 a month, cancel any time. Opportunities go to Arena members first.</span></span>
          </label>
          {err && <p className="err" role="alert">{err}</p>}
          <button type="submit" className="pm-btn lg block" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Apply to join"}</button>
          <p className="pmf-consent">By sending this you agree to our <a href="/privacy" {...ext}>privacy policy</a>.</p>
        </form>
      )}
    </Modal>
  );
}

const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");
const PHOTOS = new Set(["amy-wang", "chloe-zhu", "aman-manazir", "safwaan-mohammed", "phoenix-learning", "fiona"]);

function CreatorCard({ c }: { c: (typeof CREATORS)[number] }) {
  const slug = c.slug === "fiona-lin" ? "fiona" : c.slug;
  const inner = (
    <>
      <span className="ph">
        {PHOTOS.has(slug) ? <img src={`/creators/${slug}.jpg`} alt="" loading="lazy" /> : <span>{initials(c.name)}</span>}
      </span>
      <b>{c.name}</b>
      <small>{c.field} &middot; {c.region}</small>
      {c.stats[0] && <span className="st"><em>{c.stats[0].big}</em> {c.stats[0].rest}</span>}
    </>
  );
  return c.url ? <a className="tp-creator" href={c.url} {...ext}>{inner}</a> : <div className="tp-creator">{inner}</div>;
}

export function MooVerifiedPage() {
  useReveals();
  useMagnetic();
  const [apply, setApply] = useState<null | "plain" | "arena">(null);
  const open = () => setApply("plain");
  const editors = MV_TESTIMONIALS.filter((q) => /editor/i.test(q.role));

  return (
    <div className="pm tp" style={VARS}>
      <style dangerouslySetInnerHTML={{ __html: PM_CSS + PMF_CSS + TP_CSS }} />
      <TalentNav
        links={[{ label: "Who it is for", href: "#for" }, { label: "What you get", href: "#get" }, { label: "Moo Arena", href: "#arena" }]}
        cta={<button type="button" onClick={open} className="pm-btn sm" data-mag>Apply</button>}
      />

      <section className="pm-hero tp-vhero" id="top">
        <div className="pm-posbg" aria-hidden="true"><span className="b1" /><span className="b2" /><span className="b3" /></div>
        <div className="pm-wrap pm-herobody">
          <p className="tp-chip"><i />For video editors · By interview only</p>
          <h1 className="tp-h1">Become Moo Verified.<br /><em>Access ₹1L+/month contracts.</em></h1>
          <div className="pm-herofoot">
            <div className="pm-actions">
              <button type="button" onClick={open} className="pm-btn sun lg" data-mag>Apply to join</button>
              <a href={TALENT_CALL_URL} {...ext} className="pm-btn outline lg" data-mag>Book a call</a>
            </div>
            <Stats items={MV_STATS.map((s) => ({ big: s.big, label: s.line }))} />
          </div>
        </div>
      </section>

      <Strip items={[...MV_ROLES, "By interview only", "Paid assignments", "Direct with the creator"]} label="Editing roles" />

      <section className="pm-sec" id="for">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>Who this <em>is for.</em></h2>
          <div className="tp-grid three" data-r>
            {MV_BAR.map((b) => <div key={b.head} className="tp-cell"><h3>{b.head}</h3><p>{b.body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="pm-sec pm-sand" id="get">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>What you <em>get.</em></h2>
          <div className="tp-grid three cards" data-r>
            {MV_USPS.map((u) => <div key={u.head} className="tp-cell"><h3>{u.head}</h3><p>{u.body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="pm-sec tp-dark">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>Every assignment <em>is paid.</em></h2>
          <div className="tp-paid" data-r>
            {MV_PAID.map((a) => (
              <div key={a.role}><b>{a.amount}</b><span className="r">{a.role}</span><p>{a.note}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="pm-sec" id="steps">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>How it <em>works.</em></h2>
          <ol className="tp-steps light five" data-r>
            {MV_STEPS.map((s) => <li key={s.no}><span className="n">{s.no}</span><h3>{s.title}</h3><p>{s.body}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="pm-sec tp-dark tp-creators">
        <h2 className="pm-h pm-wrap" data-r>Creators our editors <em>work with.</em></h2>
        <div className="tp-mq slow" data-r>
          <div className="track">
            {[0, 1].map((k) => CREATORS.map((c) => <CreatorCard key={`${k}-${c.slug}`} c={c} />))}
          </div>
        </div>
      </section>

      <section className="pm-sec pm-sand">
        <div className="pm-wrap">
          <h2 className="pm-h" data-r>What we expect <em>from you.</em></h2>
          <div className="tp-grid two cards" data-r>
            {MV_EXPECT.map((x) => <div key={x.head} className="tp-cell"><h3>{x.head}</h3><p>{x.body}</p></div>)}
          </div>
        </div>
      </section>

      <Voices title={<>Editors we have <em>placed.</em></>} items={editors} />

      <section className="pm-sec tp-dark" id="arena">
        <div className="pm-wrap tp-arena" data-r>
          <div>
            <p className="pm-kicker">Community</p>
            <h2>Moo <em>Arena.</em></h2>
            <p className="lede">A paid community for editors who want to get better and see what we are placing first. You do not need a contract with us to join.</p>
            <ul>{MV_ARENA.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
          <div className="price">
            <b>$20</b>
            <span>per month</span>
            <p>Tick the Arena box when you apply and we send the joining link.</p>
            <button type="button" className="pm-btn sun lg block" onClick={() => setApply("arena")} data-mag>Join Moo Arena</button>
          </div>
        </div>
      </section>

      <section className="pm-close">
        <div className="pm-wrap" data-r>
          <h2>Still have<br /><em>a question?</em></h2>
          <div className="pm-actions center">
            <a href={TALENT_CALL_URL} {...ext} className="pm-btn lg" data-mag>Book a 30 min call</a>
            <button type="button" onClick={open} className="pm-btn ghost lg" data-mag>Apply instead</button>
          </div>
        </div>
      </section>

      <TalentFoot />
      <VerifiedApply open={apply !== null} arenaStart={apply === "arena"} onClose={() => setApply(null)} />
    </div>
  );
}

/* ---------------------------------------------------------------- css */

export const TP_CSS = `
.tp-chip{ display:inline-flex; align-items:center; gap:10px; padding:9px 16px; border-radius:999px; border:1px solid rgba(255,255,255,.2);
  background:rgba(255,255,255,.06); font-size:13px; font-weight:500; color:#E6DCFF; margin-bottom:34px !important; pointer-events:auto; }
.tp-chip i{ width:7px; height:7px; border-radius:50%; background:var(--sun); box-shadow:0 0 0 4px rgba(245,197,66,.2); }
.tp .pm-hero h1.tp-h1{ white-space:normal; font-size:clamp(42px,6.6vw,104px); text-wrap:balance; animation:pmWord 1.1s cubic-bezier(.2,.9,.25,1) both; }
.tp .pm-hero h1.tp-h1 em{ color:#D3C2FF; }
@media (max-width:700px){ .tp .pm-hero h1.tp-h1{ font-size:clamp(38px,10.5vw,60px); } }
.tp-vhero{ min-height:max(680px,min(900px,100vh)); }
.tp-vhero .pm-impact span{ max-width:17ch; }

/* live roles */
.tp-roles{ overflow:hidden; }
.tp-roles .pm-actions{ margin-top:64px; }
.tp-mq{ overflow:hidden; mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); }
.tp-mq .track{ display:flex; gap:18px; width:max-content; animation:pmMq 60s linear infinite; padding:8px 0 16px; }
.tp-mq.slow .track{ animation-duration:80s; }
.tp-mq:hover .track{ animation-play-state:paused; }
.tp-brief{ flex:none; width:300px; min-height:220px; border-radius:24px; background:var(--sand); padding:26px 26px 24px; display:flex; flex-direction:column; justify-content:space-between; gap:22px;
  transition:transform .4s cubic-bezier(.2,.9,.25,1), box-shadow .4s; }
.tp-brief:nth-child(3n+2){ background:var(--deep); color:#fff; }
.tp-brief:hover{ transform:translateY(-6px); box-shadow:0 22px 40px -24px rgba(36,18,71,.5); }
.tp-brief .live{ display:inline-flex; align-items:center; gap:8px; font-size:12px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
.tp-brief:nth-child(3n+2) .live{ color:#BBAEDD; }
.tp-brief .live i{ width:7px; height:7px; border-radius:50%; background:#2FBF71; box-shadow:0 0 0 4px rgba(47,191,113,.18); }
.tp-brief .role{ font-family:var(--display); font-size:30px; line-height:1.08; letter-spacing:-.01em; }
.tp-brief .client{ font-size:14.5px; color:var(--muted); margin-top:8px !important; }
.tp-brief:nth-child(3n+2) .client{ color:#BBAEDD; }
.tp-brief .pay{ font-size:14px; color:var(--muted); }
.tp-brief .pay b{ font-family:var(--display); font-weight:400; font-size:26px; color:var(--ink); }
.tp-brief:nth-child(3n+2) .pay b{ color:var(--sun); }
.tp-brief:nth-child(3n+2) .pay{ color:#BBAEDD; }

/* dark sections */
.tp-dark{ background:var(--deeper); color:#fff; position:relative; overflow:hidden; }
.tp-dark .pm-h em, .tp-dark h2 em{ color:#D3C2FF; }

/* steps */
.tp-steps{ list-style:none; padding:0; margin:0; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:0; counter-reset:s; }
.tp-steps.five{ grid-template-columns:repeat(5,minmax(0,1fr)); }
.tp-steps li{ padding:0 28px 0 0; border-top:1px solid rgba(255,255,255,.18); padding-top:28px; position:relative; }
.tp-steps li::before{ content:''; position:absolute; top:-5px; left:0; width:9px; height:9px; border-radius:50%; background:var(--sun); }
.tp-steps .n{ display:block; font-size:13px; font-weight:600; color:var(--sun); margin-bottom:18px; letter-spacing:.08em; }
.tp-steps h3{ font-family:var(--display); font-weight:400; font-size:clamp(26px,2.2vw,32px); line-height:1.1; margin-bottom:12px !important; }
.tp-steps p{ font-size:16px; line-height:1.55; color:#CFC5E6; }
.tp-steps.light li{ border-top-color:var(--line); }
.tp-steps.light .n{ color:var(--purple); }
.tp-steps.light li::before{ background:var(--purple); }
.tp-steps.light p{ color:var(--body); }
@media (max-width:1000px){ .tp-steps, .tp-steps.five{ grid-template-columns:repeat(2,minmax(0,1fr)); row-gap:48px; } }
@media (max-width:560px){ .tp-steps, .tp-steps.five{ grid-template-columns:1fr; } }

/* two paths */
.tp-paths{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px; }
.tp-path{ border-radius:32px; padding:48px 44px 40px; background:var(--paper); display:flex; flex-direction:column; gap:16px; min-height:440px;
  transition:transform .45s cubic-bezier(.2,.9,.25,1), box-shadow .45s; }
.tp-path:hover{ transform:translateY(-8px); box-shadow:0 30px 60px -30px rgba(36,18,71,.45); }
.tp-path.dark{ background:var(--deep); color:#fff; }
.tp-path.dark .pm-kicker{ color:var(--sun); }
.tp-path h3{ font-family:var(--display); font-weight:400; font-size:clamp(34px,3.2vw,48px); line-height:1.04; letter-spacing:-.015em; }
.tp-path > p:not(.pm-kicker){ font-size:18px; line-height:1.55; color:var(--body); max-width:34ch; }
.tp-path.dark > p:not(.pm-kicker){ color:#D8CCF2; }
.tp-path ul{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
.tp-path li{ font-size:16.5px; line-height:1.45; color:var(--body); padding-left:22px; position:relative; }
.tp-path li::before{ content:''; position:absolute; left:0; top:.6em; width:8px; height:8px; border-radius:50%; background:var(--purple); }
.tp-path .go{ margin-top:auto; font-weight:600; font-size:15.5px; display:inline-flex; gap:8px; }
.tp-path.dark .go{ color:var(--sun); }
@media (max-width:860px){ .tp-paths{ grid-template-columns:1fr; } .tp-path{ min-height:0; padding:38px 28px 32px; } }

/* voices with faces */
.tp-voices figcaption{ flex-direction:row !important; align-items:center; gap:14px !important; }
.tp-voices figcaption img{ width:48px; height:48px; border-radius:50%; object-fit:cover; flex:none; }
.tp-voices figcaption .who{ display:flex; flex-direction:column; gap:2px; min-width:0; }
.tp-voices figcaption .who span{ font-size:14px; color:var(--muted); }
.tp-voices figure.dark figcaption .who span{ color:#BBAEDD; }
.tp-voices .li{ margin-left:auto; flex:none; width:34px; height:34px; border-radius:50%; border:1px solid currentColor; display:grid; place-items:center;
  font-size:13px; font-weight:700; opacity:.6; transition:opacity .2s; }
.tp-voices .li:hover{ opacity:1; }
.tp-voices blockquote{ font-size:clamp(21px,1.8vw,25px) !important; }

.tp-close{ background:var(--deeper); color:#fff; }
.tp-close h2 em{ color:#D3C2FF; }

/* verified grids */
.tp-grid{ display:grid; gap:56px 48px; }
.tp-grid.three{ grid-template-columns:repeat(3,minmax(0,1fr)); }
.tp-grid.two{ grid-template-columns:repeat(2,minmax(0,1fr)); }
.tp-cell{ border-top:1px solid var(--line); padding-top:26px; }
.tp-cell h3{ font-family:var(--display); font-weight:400; font-size:clamp(26px,2.2vw,32px); line-height:1.1; margin-bottom:12px !important; letter-spacing:-.01em; }
.tp-cell p{ font-size:16.5px; line-height:1.6; color:var(--body); }
.tp-grid.cards{ gap:20px; }
.tp-grid.cards .tp-cell{ border-top:0; background:var(--paper); border-radius:28px; padding:36px 32px; }
@media (max-width:1000px){ .tp-grid.three{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media (max-width:640px){ .tp-grid.three, .tp-grid.two{ grid-template-columns:1fr; gap:36px; } .tp-grid.cards{ gap:14px; } }

/* paid */
.tp-paid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px; max-width:1000px; margin:0 auto; }
.tp-paid div{ border-radius:32px; border:1px solid rgba(255,255,255,.14); background:rgba(255,255,255,.04); padding:48px 40px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:10px; }
.tp-paid b{ font-family:var(--display); font-weight:400; font-size:clamp(64px,8vw,120px); line-height:.95; color:var(--sun); letter-spacing:-.02em; }
.tp-paid .r{ font-size:12.5px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:#E6DCFF; }
.tp-paid p{ font-size:16px; color:#CFC5E6; max-width:30ch; line-height:1.55; }
@media (max-width:700px){ .tp-paid{ grid-template-columns:1fr; } }

/* creators */
.tp-creators .pm-h{ margin-bottom:72px !important; }
.tp-creator{ flex:none; width:250px; border-radius:24px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12); padding:22px 22px 24px; display:flex; flex-direction:column; gap:6px; color:#fff;
  transition:transform .4s cubic-bezier(.2,.9,.25,1), background .3s; }
a.tp-creator:hover{ transform:translateY(-6px); background:rgba(255,255,255,.09); }
.tp-creator .ph{ width:64px; height:64px; border-radius:50%; overflow:hidden; background:var(--deep); display:grid; place-items:center; margin-bottom:12px; }
.tp-creator .ph img{ width:100%; height:100%; object-fit:cover; }
.tp-creator .ph span{ font-family:var(--display); font-size:24px; color:var(--sun); }
.tp-creator b{ font-family:var(--display); font-weight:400; font-size:24px; line-height:1.1; }
.tp-creator small{ font-size:13.5px; color:#BBAEDD; }
.tp-creator .st{ margin-top:10px; font-size:13.5px; color:#CFC5E6; }
.tp-creator .st em{ font-style:normal; color:var(--sun); font-weight:600; }

/* arena */
.tp-arena{ display:grid; grid-template-columns:1.2fr .8fr; gap:64px; align-items:center; }
.tp-arena .pm-kicker{ color:var(--sun); }
.tp-arena h2{ margin:14px 0 22px !important; text-align:left; }
.tp-arena .lede{ font-size:19px; line-height:1.6; color:#D8CCF2; max-width:46ch; }
.tp-arena ul{ list-style:none; padding:0; margin:28px 0 0; display:flex; flex-direction:column; gap:14px; }
.tp-arena li{ font-size:16.5px; line-height:1.5; color:#E6DCFF; padding-left:24px; position:relative; }
.tp-arena li::before{ content:''; position:absolute; left:0; top:.55em; width:9px; height:9px; border-radius:50%; background:var(--sun); }
.tp-arena .price{ border-radius:32px; background:var(--paper); color:var(--ink); padding:44px 36px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:8px; }
.tp-arena .price > b{ font-family:var(--display); font-weight:400; font-size:96px; line-height:1; }
.tp-arena .price > span{ font-size:12.5px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--purple); }
.tp-arena .price p{ font-size:15px; color:var(--body); margin:10px 0 18px !important; max-width:28ch; }
@media (max-width:900px){ .tp-arena{ grid-template-columns:1fr; gap:40px; } }

/* opt-in */
.tp-optin{ flex-direction:row !important; align-items:flex-start; gap:14px !important; padding:16px 18px; border-radius:16px; border:1px solid rgba(245,197,66,.4); background:rgba(245,197,66,.08); cursor:pointer; }
.tp-optin input{ width:20px; height:20px; min-height:0 !important; flex:none; accent-color:var(--sun); margin-top:2px; }
.tp-optin > span{ display:flex; flex-direction:column; gap:4px; }
.tp-optin b{ font-size:14.5px; color:#fff; }
.tp-optin > span > span{ font-size:13px; font-weight:500; color:#D8CCF2; line-height:1.45; }
@media (max-width:700px){ .tp-brief{ width:260px; } .tp-creator{ width:220px; } }
`;
