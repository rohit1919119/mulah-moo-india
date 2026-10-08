/**
 * Upcoming Backstage Creators Club rooms, shown as posters on /bcc.
 *
 * The art is drawn here rather than photographed: these rooms have not
 * happened yet, and a photo from another edition captioned with a new city
 * would be misleading. Each poster's motif follows its format: a sun for an
 * afternoon, a lit house for a house party, a moon for an evening, a long
 * table for a dinner. Swap `art` for a photo once a venue is booked.
 *
 * Edit UPCOMING to add, move or retire a room. `city` must match one of the
 * request form's cities so "Request a seat" can preselect it.
 */

export type Upcoming = {
  city: string;
  formCity: string;
  month: string;
  year: string;
  format: string;
  who: string[];
  tone: "sun" | "purple" | "deep" | "lav";
  art: "sun" | "house" | "moon" | "table";
};

export const UPCOMING: Upcoming[] = [
  { city: "Delhi", formCity: "Delhi NCR", month: "October", year: "2026", format: "Afternoon meetup", tone: "sun", art: "sun",
    who: ["Video editors", "Designers", "Motion graphic designers"] },
  { city: "Bangalore", formCity: "Bengaluru", month: "November", year: "2026", format: "House party", tone: "purple", art: "house",
    who: ["YouTube professionals", "Content heads", "Brand YouTube leads", "YouTube creators", "YouTube strategists"] },
  { city: "Delhi", formCity: "Delhi NCR", month: "December", year: "2026", format: "Evening meetup", tone: "deep", art: "moon",
    who: ["Brand managers", "D2C brand leads", "Marketing leads", "D2C content leads"] },
  { city: "Mumbai", formCity: "Mumbai", month: "December", year: "2026", format: "Dinner", tone: "lav", art: "table",
    who: ["Content producers", "Creative producers", "Post producers", "Content studio leads", "Micro drama professionals"] },
];

function Art({ kind }: { kind: Upcoming["art"] }) {
  if (kind === "sun") return (
    <svg viewBox="0 0 300 220" aria-hidden="true">
      <g className="spin">
        {Array.from({ length: 16 }, (_, i) => (
          <rect key={i} x="147" y="18" width="6" height="34" rx="3" transform={`rotate(${i * 22.5} 150 128)`} />
        ))}
      </g>
      <circle cx="150" cy="128" r="58" className="fill" />
      <circle cx="150" cy="128" r="58" className="ring" />
      <path d="M0 196 Q 75 176 150 196 T 300 196 V220 H0Z" className="ground" />
    </svg>
  );
  if (kind === "house") return (
    <svg viewBox="0 0 300 220" aria-hidden="true">
      <path d="M10 40 Q 150 92 290 40" className="wire" />
      {Array.from({ length: 11 }, (_, i) => {
        const x = 10 + i * 28, y = 40 + Math.sin((i / 10) * Math.PI) * 26;
        return <circle key={i} cx={x} cy={y + 8} r="5" className="bulb" style={{ animationDelay: `${i * 0.18}s` }} />;
      })}
      <path d="M82 214 V122 L150 72 L218 122 V214 Z" className="house" />
      <rect x="104" y="138" width="34" height="30" rx="3" className="win" />
      <rect x="162" y="138" width="34" height="30" rx="3" className="win" style={{ animationDelay: ".6s" }} />
      <rect x="134" y="176" width="32" height="38" rx="3" className="door" />
    </svg>
  );
  if (kind === "moon") return (
    <svg viewBox="0 0 300 220" aria-hidden="true">
      {[[40, 40], [80, 120], [250, 50], [220, 150], [130, 30], [270, 110], [60, 180], [190, 25]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 ? 1.8 : 2.8} className="star" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
      <circle cx="160" cy="104" r="62" className="moon" />
      <circle cx="186" cy="88" r="56" className="bite" />
      <path d="M0 214 H40 V176 H62 V194 H90 V160 H112 V214 H140 V184 H170 V150 H196 V214 H224 V170 H250 V190 H300 V220 H0Z" className="city" />
    </svg>
  );
  return (
    <svg viewBox="0 0 300 220" aria-hidden="true">
      <rect x="40" y="70" width="220" height="80" rx="40" className="tbl" />
      {[70, 120, 170, 220].map((x) => (
        <g key={x}>
          <circle cx={x + 5} cy="52" r="15" className="plate" />
          <circle cx={x + 5} cy="168" r="15" className="plate" />
        </g>
      ))}
      {[95, 150, 205].map((x) => <circle key={x} cx={x} cy="110" r="7" className="candle" />)}
      {[95, 150, 205].map((x) => <circle key={`g${x}`} cx={x} cy="110" r="16" className="glow" />)}
    </svg>
  );
}

export function BccUpcoming({ onRequest }: { onRequest: (u: Upcoming) => void }) {
  return (
    <section className="bc-up" id="upcoming">
      <div className="pm-wrap">
        <h2 className="pm-h" data-r>The next <em>rooms.</em></h2>
        <div className="bc-upgrid" data-r>
          {UPCOMING.map((u) => (
            <article key={`${u.city}-${u.month}`} className={`bc-poster ${u.tone}`}>
              <div className="top">
                <span className="when">{u.month} {u.year}</span>
                <span className="fmt">{u.format}</span>
              </div>
              <div className="art"><Art kind={u.art} /></div>
              <h3>{u.city}</h3>
              <ul aria-label="Who the room is for">
                {u.who.map((w) => <li key={w}>{w}</li>)}
              </ul>
              <button type="button" className="go" onClick={() => onRequest(u)}>
                Request a seat <span aria-hidden="true">&rarr;</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const UP_CSS = `
.bc-up{ background:var(--deeper); color:#fff; padding:180px 0; position:relative; overflow:hidden; }
.bc-up .pm-h em{ color:#C9B6FF; }
.bc-upgrid{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:18px; }
.bc-poster{ --bg:#F5C542; --fg:#241247; --soft:rgba(36,18,71,.62); --chip:rgba(36,18,71,.1); --art1:#241247; --art2:#fff;
  position:relative; display:flex; flex-direction:column; gap:14px; min-height:560px; padding:22px 22px 24px; border-radius:28px;
  background:var(--bg); color:var(--fg); overflow:hidden; isolation:isolate;
  transition:transform .55s cubic-bezier(.2,.9,.25,1), box-shadow .55s; }
.bc-poster::after{ content:''; position:absolute; inset:0; z-index:-1; opacity:.5; pointer-events:none;
  background-image:radial-gradient(rgba(255,255,255,.18) 1px, transparent 1.2px); background-size:14px 14px; }
.bc-poster:hover{ transform:translateY(-10px) rotate(-.6deg); box-shadow:0 40px 80px -30px rgba(0,0,0,.6); }
.bc-poster.purple{ --bg:#8856F2; --fg:#fff; --soft:rgba(255,255,255,.75); --chip:rgba(255,255,255,.16); --art1:#F5C542; --art2:#241247; }
.bc-poster.deep{ --bg:#2A1556; --fg:#fff; --soft:rgba(255,255,255,.7); --chip:rgba(255,255,255,.12); --art1:#E3D6FF; --art2:#140A2B; border:1px solid rgba(255,255,255,.12); }
.bc-poster.lav{ --bg:#E3D6FF; --fg:#241247; --soft:rgba(36,18,71,.65); --chip:rgba(36,18,71,.09); --art1:#241247; --art2:#F5C542; }
.bc-poster .top{ display:flex; flex-direction:column; align-items:flex-start; gap:10px; }
.bc-poster .when{ font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; white-space:nowrap; }
.bc-poster .fmt{ font-size:12px; font-weight:600; padding:6px 11px; border-radius:999px; background:var(--chip); white-space:nowrap; }
.bc-poster .art{ margin:4px -6px 0; }
.bc-poster svg{ display:block; width:100%; height:auto; overflow:hidden; }
.bc-poster h3{ font-family:var(--display); font-weight:var(--dw); font-size:clamp(46px,4.2vw,64px); line-height:.92; letter-spacing:-.025em; }
.bc-poster ul{ list-style:none; padding:0; margin:0; display:flex; flex-wrap:wrap; gap:6px; }
.bc-poster li{ font-size:13px; font-weight:500; padding:6px 10px; border-radius:999px; background:var(--chip); line-height:1.2; }
.bc-poster .go{ margin-top:auto; align-self:flex-start; display:inline-flex; gap:8px; align-items:center; border:0; cursor:pointer;
  font:600 14.5px var(--ui); color:var(--bg); background:var(--fg); padding:12px 18px; border-radius:999px; transition:gap .3s; }
.bc-poster .go:hover{ gap:14px; }
.bc-poster .go:focus-visible{ outline:2px solid var(--fg); outline-offset:3px; }

/* art */
.bc-poster .spin{ transform-origin:150px 128px; animation:bcSpin 40s linear infinite; fill:var(--art1); opacity:.9; }
.bc-poster .fill{ fill:#fff; } .bc-poster .ring{ fill:none; stroke:var(--art1); stroke-width:3; }
.bc-poster .ground{ fill:var(--art1); opacity:.9; }
.bc-poster .wire{ fill:none; stroke:var(--fg); stroke-opacity:.5; stroke-width:1.5; }
.bc-poster .bulb{ fill:var(--art1); animation:bcTwinkle 2.4s ease-in-out infinite; }
.bc-poster .house{ fill:var(--art2); }
.bc-poster .win{ fill:var(--art1); animation:bcTwinkle 3.2s ease-in-out infinite; }
.bc-poster .door{ fill:var(--bg); }
.bc-poster .star{ fill:var(--art1); animation:bcTwinkle 2.8s ease-in-out infinite; }
.bc-poster .moon{ fill:var(--art1); } .bc-poster .bite{ fill:var(--bg); }
.bc-poster .city{ fill:var(--art2); }
.bc-poster .tbl{ fill:var(--art1); }
.bc-poster .plate{ fill:#fff; stroke:var(--art1); stroke-width:3; }
.bc-poster .candle{ fill:var(--art2); }
.bc-poster .glow{ fill:var(--art2); opacity:.25; animation:bcTwinkle 2.6s ease-in-out infinite; }
@keyframes bcSpin{ to{ transform:rotate(360deg); } }
@keyframes bcTwinkle{ 0%,100%{ opacity:1; } 50%{ opacity:.35; } }

@media (max-width:1180px){ .bc-upgrid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media (max-width:640px){ .bc-upgrid{ grid-template-columns:1fr; } .bc-poster{ min-height:0; } .bc-up{ padding:110px 0; } }
@media (prefers-reduced-motion:reduce){ .bc-poster, .bc-poster *{ animation:none !important; transition:none !important; } }
`;
