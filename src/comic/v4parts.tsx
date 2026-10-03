import { useState, useRef, useEffect, type ReactElement } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/comic/Logo";
import { Icon, type IconName } from "@/comic/Icon";
import {
  RAIL_CLIENTS, TYPE_TINT, TYPE_LABEL, CASES, TICKER_WORDS,
  type ClientType, type RailClient,
} from "@/comic/clients";
import { SOCIALS, LEGAL_NAME, CLIENT_CALL_URL, SLOTS } from "@/comic/data";

/**
 * Reveals a block the first time it scrolls into view.
 *
 * The hidden state is armed from JavaScript rather than baked into the server
 * markup: if it shipped as markup and the bundle failed, the page would render
 * permanently invisible. Arming on mount means the worst case is no animation,
 * never no content. It also unobserves after the first hit, so scrolling back up
 * does not replay it, and it opts out entirely under reduced motion.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-in");

    // no observer, or the reader asked for no motion: show it, skip the effect
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    el.classList.add("reveal-armed");

    // An observer that never calls back would leave this block hidden forever,
    // which is a far worse outcome than a missing animation. IntersectionObserver
    // always fires once shortly after observe(), whether or not the target is on
    // screen, so a callback of any kind proves it is alive. If none arrives, the
    // net trips and reveals unconditionally.
    let alive = false;

    const io = new IntersectionObserver(
      (entries) => {
        alive = true;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      // fires a little before the block is fully on screen, so the spread has
      // already begun by the time the reader gets to it
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);

    const net = window.setTimeout(() => { if (!alive) show(); }, 1200);

    return () => {
      window.clearTimeout(net);
      io.disconnect();
    };
  }, []);

  return ref;
}

export type NavLink = {
  label: string;
  /** internal route */
  to?: string;
  /** in page anchor or external url */
  href?: string;
  /** render with the animated gradient treatment */
  grad?: boolean;
};

/**
 * The site nav, shared by "/" and "/moo-talent".
 *
 * One `links` array feeds both the desktop row and the mobile sheet, so the two
 * can never drift apart. Below the breakpoint the row is replaced by a toggle
 * whose three bars morph into a cross.
 */
export function Nav({
  links,
  cta,
  ctaHref,
  ctaTo,
  ctaOnClick,
}: {
  links: NavLink[];
  cta: string;
  ctaHref?: string;
  ctaTo?: string;
  /* For a CTA that opens a dialog rather than navigating. /moo-verified uses
     it: the apply form is a modal, and an anchor to "#apply" would jump the
     page to nowhere before the dialog appeared. */
  ctaOnClick?: () => void;
}) {
  const [open, setOpen] = useState(false);

  // Escape closes, and the scroll lock is undone on unmount as well as on close
  // so a route change while the sheet is open cannot strand the page locked.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const renderLink = (l: NavLink, onClick?: () => void) => {
    const inner = l.grad ? <span className="shine">{l.label}</span> : l.label;
    return l.to
      ? <Link key={l.label} to={l.to} className={l.grad ? "grad" : undefined} onClick={onClick}>{inner}</Link>
      : <a key={l.label} href={l.href} className={l.grad ? "grad" : undefined} onClick={onClick}>{inner}</a>;
  };

  const ctaEl = ctaOnClick
    ? <button type="button" className="btn sm" onClick={ctaOnClick}>{cta}</button>
    : ctaTo
      ? <Link className="btn sm" to={ctaTo}>{cta}</Link>
      : <a className="btn sm" href={ctaHref} target="_blank" rel="noopener noreferrer">{cta}</a>;

  return (
    <>
      <header className="nav">
        <Link to="/" aria-label="Mulah Moo home" className="navlogo"><Logo height={23} /></Link>
        <div className="grow" />
        <nav className="navlinks">{links.map((l) => renderLink(l))}</nav>
        <div className="grow" />
        <div className="navcta">{ctaEl}</div>

        <button
          type="button"
          className={`navtoggle${open ? " on" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      <div
        className={`navsheet${open ? " on" : ""}`}
        hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div className="navsheet-in" onClick={(e) => e.stopPropagation()}>
          {links.map((l) => renderLink(l, () => setOpen(false)))}
          <div className="navsheet-cta" onClick={() => setOpen(false)}>{ctaEl}</div>
        </div>
      </div>
    </>
  );
}

/** Spine glyphs. Inlined rather than referenced via <use>, which fails to resolve
 *  once the markup is injected rather than parsed. */
const SPINE_ICON: Record<ClientType, ReactElement> = {
  creator: <path d="M12 2a5 5 0 100 10 5 5 0 000-10zM3 22a9 9 0 0118 0z" />,
  studio: (
    <>
      <path d="M2 4h20v16H2z" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M6 4v16M18 4v16M2 12h20" stroke="currentColor" strokeWidth="2.4" />
    </>
  ),
  brand: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />,
};

function ClientCard({ c }: { c: RailClient }) {
  return (
    <div className="ucard">
      <div className="spine" style={{ background: TYPE_TINT[c.type] }}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{SPINE_ICON[c.type]}</svg>
        <span className="vlabel">{c.geo}</span>
        <span className="dot" />
      </div>
      <div className="ubody">
        {/* eager, not lazy: the rail moves by transform rather than scroll, so a
            deferred card can slide into view still blank */}
        <div className="stage" style={{ background: c.mode === "bleed" ? "#000" : (c.bg ?? TYPE_TINT[c.type]) }}>
          <img className={c.mode} src={c.img} alt={c.name} />
        </div>
        <div className="uband">
          <div className="uname">{c.name}</div>
          <span className="utype">{TYPE_LABEL[c.type]}</span>
          <div className="udesc">{c.desc}</div>
        </div>
      </div>
    </div>
  );
}

/** The client rail. Rendered twice so translateX(-50%) lands on a seam and the
 *  loop reads as continuous rather than snapping back.
 *
 *  Deliberately not scroll revealed. The track already carries its own constant
 *  speed animation, and a reveal on the same element replaces the `animation`
 *  shorthand, which stops the loop permanently once the reveal finishes. */
// The India roster is shorter than the global one, so one pass of it can come up
// narrower than a wide screen and leave a gap before the loop seam. Repeating the
// roster inside each half keeps every half wider than the viewport.
const RAIL_SET = RAIL_CLIENTS.length < 10 ? [...RAIL_CLIENTS, ...RAIL_CLIENTS] : RAIL_CLIENTS;

export function ClientRail() {
  return (
    <div className="marquee">
      <div className="track">
        {RAIL_SET.map((c, i) => <ClientCard key={`a-${i}-${c.name}`} c={c} />)}
        {RAIL_SET.map((c, i) => <ClientCard key={`b-${i}-${c.name}`} c={c} />)}
      </div>
    </div>
  );
}

export function Ticker({ words = TICKER_WORDS }: { words?: string[] } = {}) {
  const run = (
    <span>
      {words.map((w) => (
        <span key={w} style={{ display: "flex", alignItems: "center", gap: 34 }}>
          {w} <i>&#10022;</i>
        </span>
      ))}
    </span>
  );
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        <div className="tick-track">
          {run}
          {run}
        </div>
      </div>
    </div>
  );
}

/** Case studies: list on the left, detail on the right, Amy Wang by default.
 *
 *  The detail reads as a journey rather than three stacked paragraphs: problem,
 *  action and outcome sit on a connected spine with numbered nodes, so the eye
 *  travels the engagement in order. The panel ground shifts per client so the
 *  section reads as four chapters, and a running gradient rim marks it as the
 *  live one. */
export function CaseStudies() {
  const [active, setActive] = useState(CASES[0].id);
  const idx = Math.max(0, CASES.findIndex((x) => x.id === active));
  const c = CASES[idx];
  const wrapRef = useReveal<HTMLDivElement>();

  const listRef = useRef<HTMLDivElement>(null);
  // refs, not state: the loop reads these every frame and must not restart
  const paused = useRef(false);
  const stopped = useRef(false);

  /* The client list drifts on its own where it overflows, so every name gets seen
   * without the reader having to discover a sideways scroll.
   *
   * This animates scrollLeft rather than translating a track. A translated track
   * moves the buttons out from under the pointer, so a click lands on whatever
   * slid into place; scrolling leaves them stationary inside the scrollport and
   * clicks stay accurate. It also ping pongs instead of wrapping, because a jump
   * back to zero reads as a glitch. */
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 20; // px per second
    let dir = 1;
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const max = el.scrollWidth - el.clientWidth;
      if (!paused.current && !stopped.current && max > 4) {
        let next = el.scrollLeft + SPEED * dt * dir;
        if (next >= max) { next = max; dir = -1; }
        else if (next <= 0) { next = 0; dir = 1; }
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const hold = () => { paused.current = true; };
  const release = () => { paused.current = false; };

  const steps: [string, IconName, string][] = [
    ["The problem", "lock", c.problem],
    ["What we did", "bolt", c.did],
  ];

  return (
    <div className="cs-wrap" data-reveal ref={wrapRef}>
      <div
        className="cs-list"
        role="tablist"
        aria-label="Clients"
        ref={listRef}
        onMouseEnter={hold}
        onMouseLeave={release}
        onTouchStart={hold}
        onFocusCapture={hold}
        onBlurCapture={release}
      >
        {CASES.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            className="cs-item"
            aria-selected={x.id === active}
            onClick={() => {
              // once someone picks a client they are reading, not browsing
              stopped.current = true;
              setActive(x.id);
            }}
          >
            <img src={x.img} alt="" />
            <span>
              <span className="n">{x.name}</span>
              <span className="d">{x.desc}</span>
            </span>
          </button>
        ))}
      </div>

      {/* the shell is the animated rim; the panel sits inside it */}
      <div className="cs-shell">
        <div className="cs-panel" role="tabpanel" style={{ background: c.bg }}>
          <div className="cs-head">
            <span className="cs-av">
              <img src={c.img} alt={c.name} />
            </span>
            <div className="cs-headtext">
              <span className="cs-tag">{c.tag}</span>
              <h3>{c.name}</h3>
              <p className="sub">{c.sub}</p>
              {c.links && (
                <div className="cs-links">
                  {c.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${c.name} on ${l.label}`}
                      title={l.label}
                    >
                      <Icon name={l.icon} size={18} />
                    </a>
                  ))}
                </div>
              )}
              <span className="cs-eng">
                <Icon name="target" size={13} color="#8856F2" />
                {c.engagement}
              </span>
            </div>
            <span className="cs-count">
              {String(idx + 1).padStart(2, "0")}
              <i>/{String(CASES.length).padStart(2, "0")}</i>
            </span>
          </div>

          <div className="cs-steps">
            {steps.map(([label, icon, body], i) => (
              <div className="cs-step" key={label}>
                <span className="cs-node">
                  <Icon name={icon} size={17} color="#fff" />
                  <b>{i + 1}</b>
                </span>
                <div className="cs-stepbody">
                  <span className="cs-steplabel">{label}</span>
                  <p>{body}</p>
                </div>
              </div>
            ))}

            <div className="cs-step">
              <span className="cs-node on">
                <Icon name="star" size={17} color="#fff" />
                <b>3</b>
              </span>
              <div className="cs-stepbody">
                <span className="cs-steplabel">The result</span>
                <div className="cs-results">
                  {c.results.map(([n, l, icon]) => (
                    <div className="cs-res" key={n + l}>
                      <span className="cs-resic">
                        <Icon name={icon as IconName} size={16} color="#8856F2" />
                      </span>
                      <div className="n">{n}</div>
                      <div className="l">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The rotating seal in the hero. Purely decorative. */
export function Stamp({ label = "HAND PICKED · FULLY VETTED · SHIPPED FAST · " }: { label?: string } = {}) {
  return (
    <svg className="stamp" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id="v4ring" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="88" fill="none" stroke="#1A1614" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="52" fill="#F5C542" stroke="#1A1614" strokeWidth="2.5" />
      <text>
        <textPath href="#v4ring" startOffset="0%">{label}</textPath>
      </text>
    </svg>
  );
}

/**
 * Monthly capacity, drawn rather than stated.
 *
 * Three tiles, one per slot, filled or open. A number in a sentence is a claim
 * you skim past; three tiles with two crossed out is a picture of scarcity you
 * read in one glance. Counts come from SLOTS so nothing here is invented.
 */
export function SlotBand({ href }: { href: string }) {
  const open = Math.max(0, SLOTS.total - SLOTS.taken);
  return (
    <div className="slotband">
      <div className="slotband-in">
        <div className="slot-copy">
          <span className="slot-eyebrow">Core team builds</span>
          <h2>
            We take on only <span className="it">{SLOTS.total} new core teams</span> a month.
          </h2>
          <p>
            Building a content team from scratch takes our full attention, so we cap it at{" "}
            {SLOTS.total} a month. Leadership searches and retained hiring run alongside and are not
            affected.
          </p>
        </div>

        <div className="slot-side">
          <div
            className="slot-tiles"
            role="img"
            aria-label={`${open} of ${SLOTS.total} core team spots left ${SLOTS.month}`}
          >
            {Array.from({ length: SLOTS.total }, (_, i) => (
              <span key={i} className={i < SLOTS.taken ? "tile taken" : "tile"}>
                {i < SLOTS.taken ? <Icon name="lock" size={17} color="#fff" /> : <i />}
              </span>
            ))}
          </div>
          <div className="slot-count">
            {open === 0
              ? `Fully booked ${SLOTS.month}`
              : `Only ${open} of ${SLOTS.total} spots left ${SLOTS.month}`}
          </div>
          <a className="btn" href={href} target="_blank" rel="noopener noreferrer">
            Reserve your spot now
          </a>
        </div>
      </div>
    </div>
  );
}

/** Closing line plus a booking button, repeated at the foot of each major section
 *  so the call to action is never more than one screen away. */
export function SectionCta({ line, cta }: { line: string; cta: string }) {
  return (
    <div className="seccta">
      <p>{line}</p>
      <a className="btn" href={CLIENT_CALL_URL} target="_blank" rel="noopener noreferrer">
        {cta}
        <span aria-hidden="true">&#8599;</span>
      </a>
    </div>
  );
}

export function Footer({ line, crossLink }: { line: string; crossLink: ReactElement }) {
  return (
    <footer className="foot">
      <div className="in">
        <Logo height={34} mono />
        <p className="f-line">{line}</p>
        <div className="f-rule" />
        <div className="f-links">
          {crossLink}
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
          ))}
        </div>
        <div className="f-bot">&copy; 2026 {LEGAL_NAME} &middot; mulahmoo.in</div>
      </div>
    </footer>
  );
}
