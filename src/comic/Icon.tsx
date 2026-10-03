// Comic icon set, shared by /moo-talent and /moo-talent-form.
//
// Paths are inlined per instance rather than defined once as an SVG <symbol>
// referenced by <use>. <use> silently fails to resolve in some browsers when
// the markup is injected rather than server-rendered, and a logo that occupies
// the right box but never paints is a hard bug to spot. Inlining removes that
// whole class of failure for a few extra bytes.

export type IconName =
  | "bolt" | "globe" | "star" | "film" | "brush"
  | "target" | "chart" | "pen" | "mic" | "cam"
  | "rupee" | "users" | "ticket" | "lock" | "bubble"
  | "youtube" | "instagram" | "linkedin"
  // Added for /onboarding. Drawn in the same filled-shape-plus-black-outline
  // idiom as the rest of the set - a thin stroke icon dropped in next to these
  // reads as a different site, which is the whole thing these pages are fixing.
  | "mail" | "clipboard" | "shield" | "doc" | "bank" | "clock" | "tag";

// --ink from the v4 palette. This was #111111, which put every icon outline on
// the site fractionally off the brand black, the same way the wordmark was.
const STROKE = "#1A1614";

const PATHS: Record<IconName, React.ReactNode> = {
  bolt: (
    <path d="M13.5 2 4 13.5h6L9.5 22 20 10h-6.5z" fill="currentColor" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.2" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
      <path d="M3 12h18M12 3c3 3.4 3 14.6 0 18M12 3c-3 3.4-3 14.6 0 18" fill="none" stroke={STROKE} strokeWidth="1.4" />
    </>
  ),
  star: (
    <path d="M12 2.4 14.6 9 21.4 9.6 16.2 14l1.7 6.8L12 17.2 6.1 20.8 7.8 14 2.6 9.6 9.4 9z" fill="currentColor" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
  ),
  film: (
    <>
      <rect x="2.6" y="5.2" width="18.8" height="13.6" rx="1.6" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
      <path d="M2.6 9h3.4M2.6 15h3.4M18 9h3.4M18 15h3.4" stroke={STROKE} strokeWidth="1.4" />
      <path d="M10.4 9.6 15 12l-4.6 2.4z" fill="#fff" stroke={STROKE} strokeWidth="1.3" strokeLinejoin="round" />
    </>
  ),
  brush: (
    <>
      <path d="M15.4 3.4 20.6 8.6 10 19.2H4.8v-5.2z" fill="currentColor" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13.2 5.6 18.4 10.8" stroke={STROKE} strokeWidth="1.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="5" fill="#fff" stroke={STROKE} strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.8" fill={STROKE} />
    </>
  ),
  chart: (
    <>
      <rect x="3" y="13" width="4.6" height="8" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
      <rect x="9.7" y="9" width="4.6" height="12" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
      <rect x="16.4" y="4.6" width="4.6" height="16.4" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
    </>
  ),
  pen: (
    <>
      <path d="M5 19.4 4.2 21l1.6-.8L19 7 17 5z" fill="currentColor" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15.4 3.4 17 1.8l5.2 5.2-1.6 1.6z" fill="#fff" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2.6" width="6" height="11.4" rx="3" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
      <path d="M5.4 11.6a6.6 6.6 0 0 0 13.2 0M12 18.2V21.4M8.6 21.4h6.8" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  cam: (
    <>
      <rect x="2.6" y="6.4" width="18.8" height="12.4" rx="2.4" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
      <circle cx="12" cy="12.6" r="3.6" fill="#fff" stroke={STROKE} strokeWidth="1.5" />
      <rect x="8.4" y="3.6" width="6" height="3" fill="currentColor" stroke={STROKE} strokeWidth="1.5" />
    </>
  ),
  rupee: (
    <>
      <circle cx="12" cy="12" r="9.2" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
      <path d="M8.6 7.4h6.8M8.6 10.6h6.8M14 7.4c0 2.6-1.7 3.9-4.2 3.9h-1.2l5.6 5.6" fill="none" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.2" r="3.6" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
      <path d="M2.8 20.2c0-3.7 2.8-6.2 6.2-6.2s6.2 2.5 6.2 6.2z" fill="currentColor" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16.4 5.2a3.4 3.4 0 0 1 0 6.6M17.4 14.4c2.4.6 4 2.7 4 5.8h-3.8" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  ticket: (
    <>
      <path d="M3 7.4h18v3a2.2 2.2 0 0 0 0 4.4v3H3v-3a2.2 2.2 0 0 0 0-4.4z" fill="currentColor" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13.6 8.8v1.8M13.6 13.4v1.8" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  lock: (
    <>
      <rect x="4.4" y="10.4" width="15.2" height="10.4" rx="2" fill="currentColor" stroke={STROKE} strokeWidth="1.6" />
      <path d="M7.8 10.4V7.8a4.2 4.2 0 0 1 8.4 0v2.6" fill="none" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="15.4" r="1.7" fill="#fff" stroke={STROKE} strokeWidth="1.3" />
    </>
  ),
  bubble: (
    <path d="M3.2 4.4h17.6v12H9.4l-4.6 4.2v-4.2H3.2z" fill="currentColor" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
  ),
  // simple platform glyphs, drawn in the house style rather than copied marks
  youtube: (
    <>
      <rect x="2.4" y="5.4" width="19.2" height="13.2" rx="4" fill="currentColor" stroke={STROKE} strokeWidth="1.7" />
      <path d="M10.2 9.4 15.6 12l-5.4 2.6z" fill="#fff" stroke={STROKE} strokeWidth="1.2" strokeLinejoin="round" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.4" fill="currentColor" stroke={STROKE} strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.2" fill="#fff" stroke={STROKE} strokeWidth="1.5" />
      <circle cx="17.1" cy="6.9" r="1.4" fill={STROKE} />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="2.6" fill="currentColor" stroke={STROKE} strokeWidth="1.7" />
      <path d="M7.6 10.4v6.2M7.6 7.4v.1M11.5 16.6v-6.2M11.5 12.6c0-2.3 4.9-2.3 4.9 0v4" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
    </>
  ),
  mail: (
    <>
      <rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2.2" fill="currentColor" stroke={STROKE} strokeWidth="1.7" />
      <path d="m3.4 7 8.6 6.1L20.6 7" fill="none" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
    </>
  ),
  clipboard: (
    <>
      <rect x="4.4" y="4.2" width="15.2" height="16.6" rx="2.2" fill="currentColor" stroke={STROKE} strokeWidth="1.7" />
      <rect x="8.6" y="2.4" width="6.8" height="4" rx="1.3" fill="#fff" stroke={STROKE} strokeWidth="1.5" />
      <path d="M8.2 11.6h7.6M8.2 15.2h5" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.6 4.6 5.8v5.6c0 4.7 3.1 8.1 7.4 9.9 4.3-1.8 7.4-5.2 7.4-9.9V5.8z" fill="currentColor" stroke={STROKE} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m8.8 11.8 2.3 2.3 4-4.2" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  doc: (
    <>
      <path d="M6 2.8h8L19 8v13.2H6z" fill="currentColor" stroke={STROKE} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 2.8V8h5" fill="#fff" stroke={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.8 13h7.4M8.8 16.6h4.8" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  bank: (
    <>
      <path d="M12 2.8 21.4 8H2.6z" fill="currentColor" stroke={STROKE} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M5.6 8v9.4M9.8 8v9.4M14.2 8v9.4M18.4 8v9.4" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" />
      <rect x="2.6" y="17.4" width="18.8" height="3.4" rx="1.2" fill="currentColor" stroke={STROKE} strokeWidth="1.7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9.2" fill="currentColor" stroke={STROKE} strokeWidth="1.7" />
      <path d="M12 6.6V12l3.6 2.2" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  tag: (
    <>
      <path d="M11.4 2.8H21v9.6l-8.8 8.8L2.6 11.6z" fill="currentColor" stroke={STROKE} strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="16.6" cy="7.2" r="1.7" fill="#fff" stroke={STROKE} strokeWidth="1.5" />
    </>
  ),
};

export function Icon({
  name,
  size = 18,
  color,
  className,
}: {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={color ? { color } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
