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

import { CLIENT_CALL_URL } from "@/comic/data";

/** PLACEHOLDER: point at the Helium client mandate form once it has a public
 *  URL; until then it books a call. */
export const MANDATE_URL = CLIENT_CALL_URL;

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

/** Short labels the hero constellation lights up, one at a time. */
export const HERO_SIGNALS = [
  "Head of Content · placed",
  "Brand Manager · shortlisted",
  "YouTube Producer · placed",
  "Marketing Lead · in review",
  "Content Strategist · placed",
  "Creative Strategist · shortlisted",
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
  { row: "Source", us: "Referred through Backstage Creators Club, around 50 people a week", agency: "Job ads and database searches", boards: "Whoever applies" },
  { row: "Timing", us: "We hear before a move is even planned", agency: "Once the person starts looking", boards: "Once the person applies" },
  { row: "Depth", us: "20+ data points on every profile", agency: "A CV and a screening call", boards: "A self written profile" },
  { row: "History", us: "Followed for 1 to 1.5 years before an introduction", agency: "Searched in real time", boards: "None" },
  { row: "Relationship", us: "Career growth partners for life, not a job forwarder", agency: "Ends at placement", boards: "None" },
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

export const REACH = [
  { key: "in" as const, country: "India", role: "Home market", clients: "Groww, Wakefit, Traya Health, Leap Scholar, SAHI" },
  { key: "us" as const, country: "United States", role: "Creators and creator led brands", clients: "Amy Wang, Glowie By Her, SEA" },
  { key: "uk" as const, country: "United Kingdom", role: "YouTube studios", clients: "Talking Heads" },
];

/** PLACEHOLDER testimonials. Every card renders a "Sample" tag until these are
 *  swapped for real, attributable quotes. Do not ship them as they are. */
export const VOICES: { quote: string; name: string; role: string }[] = [
  { quote: "They briefed us better than we briefed them. The shortlist read like they had sat in our content meetings.", name: "[Name]", role: "Head of Marketing, listed consumer brand" },
  { quote: "Our Head of Content was hired in under four weeks, and she was not on any job board.", name: "[Name]", role: "Founder, D2C brand" },
  { quote: "Three candidates, all worth the call. We hired two of them.", name: "[Name]", role: "Content Lead, fintech" },
  { quote: "They knew what our editors were paid elsewhere before we asked. That saved us a bad offer.", name: "[Name]", role: "Studio founder" },
  { quote: "Paying after the hire made it an easy yes. The process made it an easy second mandate.", name: "[Name]", role: "Growth Lead, edtech" },
  { quote: "It felt like working with former creatives, because it was. They spoke our team's language.", name: "[Name]", role: "Creative Director, agency" },
  { quote: "Helium kept the whole team in one place. We reviewed assignments together and closed in days.", name: "[Name]", role: "Brand Manager, consumer brand" },
];

/** Font pairings for the on page tester (shown with ?fonts in the URL, and
 *  always in local development). The first one is the default. */
export const FONT_PAIRS: { id: string; name: string; display: string; ui: string; note: string }[] = [
  { id: "instrument", name: "Instrument Serif + Geist", display: "'Instrument Serif', Georgia, serif", ui: "'Geist', system-ui, sans-serif", note: "Editorial, quiet luxury" },
  { id: "clash", name: "Clash Display + Satoshi", display: "'Clash Display', 'Geist', sans-serif", ui: "'Satoshi', 'Geist', sans-serif", note: "Studio grotesk, confident" },
  { id: "zodiak", name: "Zodiak + General Sans", display: "'Zodiak', Georgia, serif", ui: "'General Sans', 'Geist', sans-serif", note: "Sharp serif, magazine" },
  { id: "gloock", name: "Gloock + Geist", display: "'Gloock', Georgia, serif", ui: "'Geist', system-ui, sans-serif", note: "High contrast, couture" },
  { id: "bricolage", name: "Bricolage Grotesque + Geist", display: "'Bricolage Grotesque', 'Geist', sans-serif", ui: "'Geist', system-ui, sans-serif", note: "Characterful, modern" },
];

/** Every family the tester can switch to, in one Google and one Fontshare
 *  request. Trim to the chosen pair before launch. */
export const PREMIUM_FONT_LINKS = [
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300..700&family=Gloock&family=Bricolage+Grotesque:opsz,wght@12..96,400..700&display=swap",
  "https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600&f[]=satoshi@400,500,700&f[]=zodiak@400,500&f[]=general-sans@400,500,600&display=swap",
];
