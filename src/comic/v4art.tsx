import { useId } from "react";

/**
 * Illustrations for the three engagement models.
 *
 * Flat, heavy outlined shapes on a radiating ground, in the Clickables idiom but
 * using our own palette. Drawn as inline SVG rather than shipped as images so
 * they stay crisp at any size and recolour with the design tokens.
 */

// Same four colours plus the sun accent as the stylesheet. The rays are purple
// tints, not new hues.
const INK = "#1A1614";
const PURPLE = "#8856F2";
const SUN = "#F5C542";
const PAPER = "#FFFCF7";
const RAY_A = "#C9AEFF";
const RAY_B = "#B18CFF";
const LAV = "#E3D6FF";

/** Radiating wedges from a point, the ground every panel sits on.
 *
 *  Coordinates are rounded before they reach the path string. Raw Math.cos and
 *  Math.sin results serialise to different last digits under Node and under the
 *  browser, which made every ray a React hydration mismatch. Two decimals is far
 *  more precision than a 320x200 viewBox can show. */
function Rays({ cx = 160, cy = 84, r = 300, n = 18 }: { cx?: number; cy?: number; r?: number; n?: number }) {
  const at = (deg: number) => {
    const a = deg * (Math.PI / 180);
    return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  };
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <path
          key={i}
          fill={i % 2 ? RAY_A : RAY_B}
          d={`M${cx} ${cy} L${at((i * 360) / n)} L${at(((i + 0.5) * 360) / n)} Z`}
        />
      ))}
    </g>
  );
}

/** A person tile: rounded card, round head, shoulders. The repeated unit. */
function Person({ x, y, s = 1, fill = PAPER, tilt = 0 }: { x: number; y: number; s?: number; fill?: string; tilt?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
      <rect x="-22" y="-28" width="44" height="56" rx="10" fill={fill} stroke={INK} strokeWidth="4" />
      <circle cx="0" cy="-9" r="9" fill={INK} />
      <path d="M-13 20a13 13 0 0126 0z" fill={INK} />
    </g>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  // useId, not a constant: three panels render on the page and a shared clipPath
  // id would put duplicate ids in the document
  const clip = `artClip-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 320 200" className="art" role="img" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <rect x="3" y="3" width="314" height="194" rx="14" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect x="0" y="0" width="320" height="200" fill={RAY_A} />
        <Rays />
        {children}
      </g>
      <rect x="3" y="3" width="314" height="194" rx="14" fill="none" stroke={INK} strokeWidth="4.5" />
    </svg>
  );
}

/** 01 Team building: separate people snapping together into one unit. */
export function ArtTeam() {
  return (
    <Panel>
      <rect x="30" y="52" width="260" height="112" rx="12" fill={PAPER} stroke={INK} strokeWidth="4.5" />
      <Person x={78} y={108} />
      <Person x={160} y={108} fill={SUN} />
      <Person x={242} y={108} fill={LAV} tilt={-9} />
      {/* the joins that make three hires into one team */}
      <path d="M112 108h16M194 108h16" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <circle cx="120" cy="108" r="3.4" fill={PURPLE} />
      <circle cx="202" cy="108" r="3.4" fill={PURPLE} />
      <path d="M262 62l7 13 13 7-13 7-7 13-7-13-13-7 13-7z" fill={SUN} stroke={INK} strokeWidth="3" />
    </Panel>
  );
}

/** 02 Leadership: one hire raised above the rest, under a spotlight. */
export function ArtLeader() {
  return (
    <Panel>
      {/* spotlight cone */}
      <path d="M160 -10L246 168H74z" fill={PAPER} opacity=".55" />
      <rect x="34" y="132" width="252" height="34" rx="9" fill={PAPER} stroke={INK} strokeWidth="4.5" />
      {/* the plinth */}
      <rect x="122" y="96" width="76" height="40" rx="8" fill={PURPLE} stroke={INK} strokeWidth="4.5" />
      <Person x={160} y={62} s={0.95} fill={PAPER} />
      {/* the bar everyone else gets measured against */}
      <Person x={62} y={120} s={0.62} fill={RAY_A} />
      <Person x={258} y={120} s={0.62} fill={RAY_A} />
      <path d="M160 6l7.6 15.4 17 2.5-12.3 12 2.9 16.9L160 44.8l-15.2 8 2.9-16.9-12.3-12 17-2.5z"
        fill={SUN} stroke={INK} strokeWidth="3.4" strokeLinejoin="round" />
    </Panel>
  );
}

/** 03 Retained: a belt that keeps delivering, month after month. */
export function ArtRetainer() {
  return (
    <Panel>
      {/* the belt */}
      <rect x="26" y="128" width="268" height="34" rx="17" fill={INK} />
      <circle cx="52" cy="145" r="11" fill={PAPER} stroke={INK} strokeWidth="4" />
      <circle cx="268" cy="145" r="11" fill={PAPER} stroke={INK} strokeWidth="4" />
      <path d="M46 145h12M262 145h12M52 139v12M268 139v12" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />

      <Person x={86} y={100} s={0.72} fill={PAPER} />
      <Person x={160} y={100} s={0.72} fill={SUN} />
      <Person x={234} y={100} s={0.72} fill={LAV} />

      {/* the loop: one brief becomes a roster */}
      <path d="M112 44a48 48 0 0196 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M208 44l-9-11 18-2z" fill={INK} />
      <path d="M112 44l9 11-18 2z" fill={INK} />
      <path d="M52 62l5 10 10 5-10 5-5 10-5-10-10-5 10-5z" fill={SUN} stroke={INK} strokeWidth="2.6" />
    </Panel>
  );
}

export const MODEL_ART = [ArtTeam, ArtLeader, ArtRetainer];
