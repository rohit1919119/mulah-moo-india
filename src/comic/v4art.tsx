import { useId } from "react";

/**
 * Illustrations for the three engagement models.
 *
 * A calmer, product-shot idiom: soft grounds, a few floating cards with thin
 * ink outlines and small hard shadows, one sun accent per panel. Still the five
 * brand colours plus their tints, still inline SVG so they stay crisp at any
 * size and need no image requests.
 *
 * Every coordinate is a literal. Computed floats serialise differently under
 * Node and the browser and turn into hydration mismatches.
 */

const INK = "#1A1614";
const PURPLE = "#8856F2";
const PURPLE_INK = "#6A2FD4";
const DEEP = "#241247";
const SUN = "#F5C542";
const PAPER = "#FFFCF7";
const LAV = "#E3D6FF";
const CREAM = "#F1E7FF";
const SUN_50 = "#FFF6DE";
const FONT = "'DM Sans', system-ui, sans-serif";

/** Ids must be unique per panel: three panels share the page. */
function useIds() {
  const base = useId().replace(/:/g, "");
  return (name: string) => `${name}-${base}`;
}

/** The frame every illustration sits in. `ground` paints inside the clip. */
function Panel({ ground, children }: { ground: (id: (n: string) => string) => React.ReactNode; children: React.ReactNode }) {
  const id = useIds();
  return (
    <svg viewBox="0 0 320 200" className="art" role="img" aria-hidden="true">
      <defs>
        <clipPath id={id("clip")}>
          <rect x="3" y="3" width="314" height="194" rx="14" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id("clip")})`}>
        {ground(id)}
        {children}
      </g>
      <rect x="3" y="3" width="314" height="194" rx="14" fill="none" stroke={INK} strokeWidth="3.5" />
    </svg>
  );
}

/** A soft dot grid, the quiet texture behind the light panels. */
function Dots({ id, color }: { id: (n: string) => string; color: string }) {
  return (
    <>
      <defs>
        <pattern id={id("dots")} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill={color} />
        </pattern>
      </defs>
      <rect x="0" y="0" width="320" height="200" fill={`url(#${id("dots")})`} />
    </>
  );
}

/** A card with a small offset hard shadow, the site's button idiom scaled down. */
function Card({ x, y, w, h, fill = PAPER, rx = 10, shadow = INK }: {
  x: number; y: number; w: number; h: number; fill?: string; rx?: number; shadow?: string;
}) {
  return (
    <g>
      <rect x={x + 3.5} y={y + 3.5} width={w} height={h} rx={rx} fill={shadow} />
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={INK} strokeWidth="2.2" />
    </g>
  );
}

/** A faceless avatar: head and shoulders clipped to a disc. */
function Avatar({ cx, cy, r, bg, body = INK, ring }: { cx: number; cy: number; r: number; bg: string; body?: string; ring?: string }) {
  const id = useIds();
  return (
    <g>
      <defs>
        <clipPath id={id("av")}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      {ring && <circle cx={cx} cy={cy} r={r + 3.6} fill="none" stroke={ring} strokeWidth="2.6" />}
      <circle cx={cx} cy={cy} r={r} fill={bg} />
      <g clipPath={`url(#${id("av")})`}>
        <circle cx={cx} cy={cy - r * 0.2} r={r * 0.36} fill={body} />
        <ellipse cx={cx} cy={cy + r * 0.92} rx={r * 0.7} ry={r * 0.56} fill={body} />
      </g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="2" />
    </g>
  );
}

/** A placeholder text line. */
function Line({ x, y, w, fill = INK, o = 0.18 }: { x: number; y: number; w: number; fill?: string; o?: number }) {
  return <rect x={x} y={y} width={w} height="4.5" rx="2.25" fill={fill} opacity={o} />;
}

/** Four point sparkle, the one decorative flourish allowed per panel. */
function Spark({ x, y, s = 1, fill = SUN }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -9C1.2 -3 3 -1.2 9 0C3 1.2 1.2 3 0 9C-1.2 3 -3 1.2 -9 0C-3 -1.2 -1.2 -3 0 -9Z"
      fill={fill}
      stroke={INK}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  );
}

function Check({ cx, cy, r = 7, fill = PURPLE }: { cx: number; cy: number; r?: number; fill?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={INK} strokeWidth="1.8" />
      <path
        d={`M${cx - r * 0.42} ${cy + r * 0.02}L${cx - r * 0.1} ${cy + r * 0.34}L${cx + r * 0.46} ${cy - r * 0.3}`}
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* ------------------------------------------------------------------------- */

/** 01 Build your core team: one brief, three roles, wired into a single unit. */
export function ArtTeam() {
  const roles: { x: number; label: string; bg: string; body: string; lift: number }[] = [
    { x: 24, label: "Video editor", bg: LAV, body: DEEP, lift: 6 },
    { x: 117, label: "Strategist", bg: SUN, body: INK, lift: 0 },
    { x: 210, label: "Designer", bg: CREAM, body: PURPLE_INK, lift: 6 },
  ];
  return (
    <Panel
      ground={(id) => (
        <>
          <defs>
            <linearGradient id={id("g")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={CREAM} />
              <stop offset="1" stopColor={LAV} />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="320" height="200" fill={`url(#${id("g")})`} />
          <Dots id={id} color="#C9AEFF" />
        </>
      )}
    >
      {/* connectors: the brief branching into three seats */}
      <g fill="none" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5">
        <path d="M160 52C160 70 66 66 66 90" />
        <path d="M160 52V84" />
        <path d="M160 52C160 70 254 66 254 90" />
      </g>

      {/* the brief */}
      <Card x={98} y={26} w={124} h={26} rx={13} fill={INK} shadow={PURPLE} />
      <circle cx="114" cy="39" r="4" fill={SUN} />
      <text x="124" y="43" fontFamily={FONT} fontSize="10.5" fontWeight="700" fill={PAPER}>Your content team</text>

      {roles.map((r) => {
        const y = 86 + r.lift;
        return (
          <g key={r.label}>
            <Card x={r.x} y={y} w={86} h={88} />
            <Avatar cx={r.x + 43} cy={y + 26} r={15} bg={r.bg} body={r.body} />
            <text
              x={r.x + 43}
              y={y + 56}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize="9.5"
              fontWeight="700"
              fill={INK}
            >
              {r.label}
            </text>
            <rect x={r.x + 19} y={y + 64} width="48" height="15" rx="7.5" fill={CREAM} stroke={PURPLE} strokeWidth="1.4" />
            <Check cx={r.x + 28} cy={y + 71.5} r={4.6} />
            <text x={r.x + 36} y={y + 74.6} fontFamily={FONT} fontSize="7.6" fontWeight="700" fill={PURPLE_INK}>Hired</text>
          </g>
        );
      })}

      <Spark x={278} y={34} s={1.15} />
      <Spark x={36} y={46} s={0.6} fill={PAPER} />
    </Panel>
  );
}

/** 02 Hire the leader: one profile lifted out of the shortlist, under light. */
export function ArtLeader() {
  return (
    <Panel
      ground={(id) => (
        <>
          <defs>
            <radialGradient id={id("glow")} cx="0.5" cy="0.42" r="0.62">
              <stop offset="0" stopColor="#5B34B8" />
              <stop offset="0.55" stopColor="#35196B" />
              <stop offset="1" stopColor={DEEP} />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="320" height="200" fill={`url(#${id("glow")})`} />
          {/* a faint beam from above */}
          <path d="M132 0H188L232 200H88Z" fill="#fff" opacity="0.05" />
        </>
      )}
    >
      {/* the shortlist, set back and dimmed */}
      <g opacity="0.5" transform="rotate(-8 70 112)">
        <rect x="30" y="72" width="80" height="84" rx="10" fill="#3D2378" stroke="#8B6FD6" strokeWidth="1.6" />
        <circle cx="70" cy="98" r="12" fill="#5B34B8" />
        <rect x="48" y="120" width="44" height="4.5" rx="2.25" fill="#8B6FD6" />
        <rect x="56" y="131" width="28" height="4.5" rx="2.25" fill="#8B6FD6" opacity="0.6" />
      </g>
      <g opacity="0.5" transform="rotate(8 250 112)">
        <rect x="210" y="72" width="80" height="84" rx="10" fill="#3D2378" stroke="#8B6FD6" strokeWidth="1.6" />
        <circle cx="250" cy="98" r="12" fill="#5B34B8" />
        <rect x="228" y="120" width="44" height="4.5" rx="2.25" fill="#8B6FD6" />
        <rect x="236" y="131" width="28" height="4.5" rx="2.25" fill="#8B6FD6" opacity="0.6" />
      </g>

      {/* the hire */}
      <Card x={98} y={40} w={124} h={128} rx={14} shadow="#0E0620" />
      <Avatar cx={160} cy={78} r={21} bg={SUN} body={INK} ring={SUN} />
      <text x="160" y="119" textAnchor="middle" fontFamily={FONT} fontSize="11" fontWeight="700" fill={INK}>
        Head of Content
      </text>
      <Line x={128} y={127} w={64} />
      <rect x="117" y="141" width="86" height="17" rx="8.5" fill={SUN} stroke={INK} strokeWidth="1.6" />
      <text x="160" y="152.6" textAnchor="middle" fontFamily={FONT} fontSize="7.8" fontWeight="700" fill={INK} letterSpacing="0.6">
        LEADERSHIP HIRE
      </text>

      {/* the mark of the pick */}
      <circle cx="214" cy="46" r="11" fill={PURPLE} stroke={INK} strokeWidth="2" />
      <path d="M214 39.6l1.9 3.9 4.3.6-3.1 3 .7 4.3-3.8-2-3.8 2 .7-4.3-3.1-3 4.3-.6z" fill={SUN} />

      <Spark x={64} y={34} s={0.9} />
      <Spark x={268} y={172} s={0.6} fill={LAV} />
    </Panel>
  );
}

/** 03 Keep your pipeline full: talent moving through sourced, vetted, placed. */
export function ArtRetainer() {
  const cols = [
    { x: 16, title: "SOURCED", chips: 3 },
    { x: 117, title: "VETTED", chips: 2 },
    { x: 218, title: "PLACED", chips: 1 },
  ];
  const tones: [string, string][] = [[LAV, DEEP], [SUN, INK], [CREAM, PURPLE_INK]];
  return (
    <Panel
      ground={(id) => (
        <>
          <defs>
            <linearGradient id={id("g")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={SUN_50} />
              <stop offset="1" stopColor={PAPER} />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="320" height="200" fill={`url(#${id("g")})`} />
          <Dots id={id} color="#EBD9A6" />
        </>
      )}
    >
      {cols.map((c, ci) => (
        <g key={c.title}>
          {/* lane */}
          <rect x={c.x} y={22} width="86" height="140" rx="12" fill={ci === 2 ? LAV : CREAM} opacity={ci === 2 ? 0.85 : 0.7} />
          <text x={c.x + 12} y={40} fontFamily={FONT} fontSize="7.6" fontWeight="700" fill={PURPLE_INK} letterSpacing="0.9">
            {c.title}
          </text>
          <text x={c.x + 74} y={40} textAnchor="end" fontFamily={FONT} fontSize="7.6" fontWeight="700" fill={INK} opacity="0.45">
            {c.chips === 3 ? "120" : c.chips === 2 ? "18" : "3"}
          </text>

          {Array.from({ length: c.chips }, (_, i) => {
            const y = 50 + i * 36;
            const [bg, body] = tones[(ci + i) % 3];
            const placed = ci === 2;
            return (
              <g key={i}>
                <Card x={c.x + 7} y={y} w={72} h={28} rx={8} fill={placed ? SUN : PAPER} />
                <Avatar cx={c.x + 21} cy={y + 14} r={8} bg={placed ? PAPER : bg} body={body} />
                <Line x={c.x + 34} y={y + 8} w={placed ? 26 : 34} o={0.32} />
                <Line x={c.x + 34} y={y + 16} w={placed ? 18 : 24} />
                {placed && <Check cx={c.x + 69} cy={y + 14} r={5.5} />}
              </g>
            );
          })}
        </g>
      ))}

      {/* hand offs between lanes */}
      <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M105 64l5 5-5 5" />
        <path d="M206 64l5 5-5 5" />
      </g>

      {/* the always-on loop: placed feeds the next brief */}
      <path d="M260 172C260 188 60 188 60 172" fill="none" stroke={PURPLE} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1 5" />
      <path d="M55 176l5-6 5 6" fill="none" stroke={PURPLE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="122" y="174" width="76" height="17" rx="8.5" fill={INK} />
      <circle cx="134" cy="182.5" r="3.4" fill={SUN} />
      <text x="142" y="185.6" fontFamily={FONT} fontSize="8" fontWeight="700" fill={PAPER}>Always on</text>

      <Spark x={296} y={180} s={0.7} />
    </Panel>
  );
}

export const MODEL_ART = [ArtTeam, ArtLeader, ArtRetainer];
