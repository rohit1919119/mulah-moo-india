// Content for the premium India home page.
//
// Rule for this page: every fact appears in exactly one section. The map
// below is the single source of where each one lives, so a copy edit never
// reintroduces a repeat.
//
//   Hero ............ 50+ teams, 20+ leadership roles, 5+ listed, 93% in role
//   Ecosystem ....... 10,000+ network, 1 to 10 years, the three ways to hire
//   Positioning ..... not HR, ex creatives and business professionals, Helium
//   How it works .... the five Helium steps, 48 hour applications
//   Why us .......... BCC referrals, hearing first, 20+ data points,
//                     1 to 1.5 years of following, career partners
//   Terms ........... 72 hrs, 14 days, 25 days, ₹8 LPA, fees after hire
//   Community ....... WhatsApp first, editions, invite only
//
// Anything still to be confirmed or replaced is marked PLACEHOLDER.

export const IMPACT: { big: string; to: number; label: string }[] = [
  { big: "50+", to: 50, label: "Teams built in 18 months" },
  { big: "20+", to: 20, label: "Leadership roles closed" },
  { big: "5+", to: 5, label: "Listed companies served" },
  { big: "93%", to: 93, label: "Placements still in role" },
];

export const ROLE_TICKER = [
  "Leadership hiring", "Marketing manager", "Brand manager", "Content strategist", "YouTube producer",
  "Instagram strategist", "Content IP lead", "Creative strategist", "Content lead", "Marketing lead", "And more",
];

/** Profiles the hero constellation lights up, one at a time. Each is a
 *  role plus the one detail that shows the calibre of the pool. Rohit's
 *  examples; keep them true to real people in the network. */
export const HERO_SIGNALS: { role: string; ctx: string }[] = [
  { role: "Brand Manager", ctx: "₹40 Cr MRR brand" },
  { role: "Marketing Lead", ctx: "Series A company" },
  { role: "YouTube Head", ctx: "800K+ subscriber health brand" },
  { role: "Instagram Writer", ctx: "10M+ views on brand reels" },
];

export const ECOSYSTEM = [
  {
    key: "pro",
    title: "Full time professionals",
    body: "Marketing leaders and core team members who join your payroll and stay. Heads of Marketing, brand managers, content strategists and producers.",
  },
  {
    key: "group",
    title: "Freelance groups",
    body: "Small studios and editor collectives that ship volume without you managing every person. Vetted as a unit, not only as individuals.",
  },
  {
    key: "con",
    title: "Contractors",
    body: "Specialists on a defined scope and term: a launch, a channel rebuild, a season of content, with a clear start and end.",
  },
];

/** Why us, as a comparison. The Mulah Moo column is where these facts live. */
export const COMPARE: { row: string; us: string; agency: string; boards: string }[] = [
  { row: "Where talent comes from", us: "Referred through Backstage Creators Club, around 50 people a week", agency: "Job ads and database searches", boards: "Whoever applies" },
  { row: "When we first hear from them", us: "We hear before a move is even planned", agency: "Once the person starts looking", boards: "Once the person applies" },
  { row: "What we know about each person", us: "20+ data points on every profile", agency: "A CV and a screening call", boards: "A self written profile" },
  { row: "How long we know them before an intro", us: "1 to 1.5 years on average", agency: "Searched in real time", boards: "None" },
  { row: "Our relationship with talent", us: "Career growth partners for life, not a job forwarder", agency: "Ends at placement", boards: "None" },
];

export const TERMS: { v: string; to?: number; suffix?: string; prefix?: string; k: string }[] = [
  { v: "72 hrs", to: 72, suffix: " hrs", k: "First shortlist" },
  { v: "14 days", to: 14, suffix: " days", k: "Typical close, content teams" },
  { v: "25 days", to: 25, suffix: " days", k: "Typical close, leadership" },
  { v: "₹8 LPA+", to: 8, prefix: "₹", suffix: " LPA+", k: "Minimum mandate size" },
  { v: "After hire", k: "Fees in two tranches, on hiring and on placement" },
];

/** Compensation preview. US monthly figures are Mulah Moo's published rate
 *  card for US clients. UK and India are PLACEHOLDERS and render blurred. */
export const COMP_ROWS: { role: string; level: string; us?: string; open: boolean }[] = [
  { role: "Short form editor", level: "2 to 4 yrs", us: "$1,300 to 2,000", open: true },
  { role: "Long form editor", level: "3 to 6 yrs", us: "$1,500 to 2,300", open: true },
  { role: "YouTube strategist", level: "3 to 6 yrs", us: "$2,000 to 3,500", open: true },
  { role: "Content manager", level: "3 to 7 yrs", open: false },
  { role: "Brand manager", level: "4 to 8 yrs", open: false },
  { role: "Marketing manager", level: "5 to 8 yrs", open: false },
  { role: "Head of Content", level: "7 to 10 yrs", open: false },
];

export const HIRING_FOR = [
  "Marketing leadership", "Content team", "Video and YouTube", "Brand and design", "Just benchmarking",
];

export type Country = "in" | "us" | "uk" | "ae" | "ca";

/** Markets and the kinds of clients we serve in each. No client names here. */
export const REACH: { key: Country; country: string; role: string }[] = [
  { key: "in", country: "India", role: "Content studios and Indian brands" },
  { key: "us", country: "United States", role: "Brands, creators and studios" },
  { key: "uk", country: "United Kingdom", role: "Brands, creators and studios" },
  { key: "ae", country: "UAE", role: "Brands, creators and studios" },
  { key: "ca", country: "Canada", role: "Creators and studios" },
];

/** Real client testimonials, as given by Rohit. Attributed by role and
 *  company, without personal names. */
export const VOICES: { quote: string; name: string; role: string }[] = [
  { quote: "Mulah Moo closed our senior YouTube roles from a single set of profiles, with a smooth interview process.", name: "Senior HR", role: "Leap Scholar" },
  { quote: "We closed long pending content and product design roles at a fast pace. Replacements were closed within a two week window too.", name: "Senior HR", role: "Traya Health" },
  { quote: "We hired our overall social team through Mulah Moo. A rare match for us, where we got enough space to make our own decisions while closing every hire.", name: "BU Head", role: "Dailyhunt" },
  { quote: "We closed 4 roles within a month for the new YouTube and Instagram team we set up. Highly recommended for content roles.", name: "Founder", role: "Trackk" },
];

/** The locked type pairing: Instrument Serif for display, Geist for UI. */
export const FONT = { display: "'Instrument Serif', Georgia, serif", ui: "'Geist', system-ui, sans-serif" };

export const PREMIUM_FONT_LINKS = [
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300..700&display=swap",
];
