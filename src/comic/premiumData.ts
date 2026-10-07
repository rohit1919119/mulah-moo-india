// Content for the premium India home page ("/" on the premium branch).
//
// Everything a person might need to edit lives here, so copy changes never
// touch layout code. Figures are the ones Rohit supplied; anything still to be
// confirmed or replaced is marked PLACEHOLDER in a comment.

import { CLIENT_CALL_URL } from "@/comic/data";

/** Where "Send a mandate" goes. PLACEHOLDER: point at the Helium client
 *  mandate form once it has a public URL; until then it books a call. */
export const MANDATE_URL = CLIENT_CALL_URL;

/** Impact numbers in the hero. `to` drives the count up; `big` is what renders
 *  once it lands (and what the server renders). */
export const IMPACT: { big: string; to?: number; label: string; note: string }[] = [
  { big: "50+", to: 50, label: "Teams built", note: "In the last 18 months, across brands, studios and creator teams" },
  { big: "20+", to: 20, label: "Leadership roles closed", note: "Heads of Marketing, Content and Brand" },
  { big: "5+", to: 5, label: "Listed companies", note: "Publicly listed brands among our clients" },
  { big: "93%", to: 93, label: "Still in role", note: "Of the people we have placed" },
  { big: "10,000+", to: 10000, label: "Professionals tracked", note: "With 1 to 10 years of experience" },
  { big: "72 hrs", to: 72, label: "To a first shortlist", note: "From the moment a mandate is briefed" },
];

export const ROLE_TICKER = [
  "Leadership hiring", "Marketing manager", "Brand manager", "Content strategist", "YouTube producer",
  "Instagram strategist", "Content IP lead", "Creative strategist", "Content lead", "Marketing lead", "And more",
];

export const ECOSYSTEM = [
  {
    key: "pro",
    tag: "Full time",
    title: "Professionals",
    body: "Marketing leaders and core team members who join your payroll and stay. Heads of Marketing, brand managers, content strategists, producers.",
    best: "Building or rebuilding a team you own",
  },
  {
    key: "group",
    tag: "Collectives",
    title: "Freelance groups",
    body: "Small studios and editor collectives that ship volume without you managing every person. Vetted as a unit, not just as individuals.",
    best: "High output on a fixed monthly rhythm",
  },
  {
    key: "con",
    tag: "Contract",
    title: "Contractors",
    body: "Specialists on a defined scope and term. A launch, a channel rebuild, a season of content, with a clear start and end.",
    best: "Expert depth for a defined window",
  },
];

/** The six reasons the pool is different. */
export const EDGE = [
  { n: "50", unit: "a week", title: "A community that refers", body: "Backstage Creators Club adds around 50 professionals every week, all through referrals. No job ads, no scraped lists." },
  { n: "First", unit: "to know", title: "We hear before the market does", body: "Top talent tells us when they are thinking about a move, long before they update a profile or start applying." },
  { n: "20+", unit: "data points", title: "Profiles with real depth", body: "Work samples, team context, pay history, growth goals, how they collaborate. Far more than a CV." },
  { n: "1.5", unit: "years", title: "Followed, not found", body: "On average we follow a professional for one to one and a half years before introducing them. Others search in real time." },
  { n: "Ex", unit: "creatives", title: "A team that has done the job", body: "We have edited, written, produced and run teams. We know what motivates creative people and where their careers are heading." },
  { n: "Career", unit: "partners", title: "We stay after the offer", body: "We are career growth partners for talent, not an HR desk that forwards jobs. That trust is why they pick up our call." },
];

/** Comparison table. Competitor columns describe common practice in general,
 *  not any named firm. */
export const COMPARE: { row: string; us: string; agency: string; boards: string }[] = [
  { row: "Where talent comes from", us: "Referrals through our community, around 50 a week", agency: "Job ads and database searches", boards: "Whoever applies" },
  { row: "When they meet talent", us: "Before a move is planned", agency: "Once the person starts looking", boards: "Once the person applies" },
  { row: "Depth of each profile", us: "20+ data points, followed for 1 to 1.5 years", agency: "A CV and a screening call", boards: "A self written profile" },
  { row: "Who screens", us: "Ex creatives who have done the role", agency: "Generalist recruiters", boards: "You do" },
  { row: "Relationship with talent", us: "Career long", agency: "Ends at placement", boards: "None" },
  { row: "When you pay", us: "Only after a successful hire", agency: "Often a retainer up front", boards: "Subscription or per listing" },
];

export const TERMS = [
  { k: "First shortlist", v: "72 hours", d: "From a briefed mandate" },
  { k: "Typical close", v: "14 days", d: "Content teams" },
  { k: "Typical close", v: "25 days", d: "Leadership roles" },
  { k: "Candidate pool", v: "10,000+", d: "1 to 10 years of experience" },
  { k: "Mandate size", v: "₹8 LPA+", d: "Minimum annual compensation per role" },
  { k: "Fees", v: "After hire", d: "Two tranches: on hiring, and on placement" },
];

/** Compensation preview. US monthly figures are Mulah Moo's published rate
 *  card for US clients. UK and India columns are PLACEHOLDERS until the report
 *  data is in, and render blurred. */
export const COMP_ROWS: { role: string; level: string; us: string; uk: string; india: string; open: boolean }[] = [
  { role: "Short form editor", level: "2 to 4 yrs", us: "$1,300 to 2,000", uk: "£ locked", india: "₹ locked", open: true },
  { role: "Long form editor", level: "3 to 6 yrs", us: "$1,500 to 2,300", uk: "£ locked", india: "₹ locked", open: true },
  { role: "YouTube strategist", level: "3 to 6 yrs", us: "$2,000 to 3,500", uk: "£ locked", india: "₹ locked", open: true },
  { role: "Content manager", level: "3 to 7 yrs", us: "$ locked", uk: "£ locked", india: "₹ locked", open: false },
  { role: "Brand manager", level: "4 to 8 yrs", us: "$ locked", uk: "£ locked", india: "₹ locked", open: false },
  { role: "Marketing manager", level: "5 to 8 yrs", us: "$ locked", uk: "£ locked", india: "₹ locked", open: false },
  { role: "Head of Content", level: "7 to 10 yrs", us: "$ locked", uk: "£ locked", india: "₹ locked", open: false },
];

export const HIRING_FOR = [
  "Marketing leadership", "Content team", "Video and YouTube", "Brand and design", "Just benchmarking",
];

export const REACH = [
  {
    key: "in",
    country: "India",
    role: "Home market",
    body: "Listed companies, funded startups and studios hiring in house marketing and content teams.",
    clients: "Groww, Wakefit, Traya Health, Leap Scholar, SAHI",
  },
  {
    key: "us",
    country: "United States",
    role: "Creators and creator led brands",
    body: "US creators and D2C brands building remote teams with Indian talent.",
    clients: "Amy Wang, Glowie By Her, SEA",
  },
  {
    key: "uk",
    country: "United Kingdom",
    role: "YouTube studios",
    body: "London studios scaling editing and strategy benches for entrepreneur channels.",
    clients: "Talking Heads",
  },
];

/** PLACEHOLDER testimonials. Every card renders a "Sample" tag until these are
 *  swapped for real, attributable quotes. Do not ship them as they are. */
export const VOICES: { quote: string; name: string; role: string }[] = [
  { quote: "They briefed us better than we briefed them. The shortlist read like they had sat in our content meetings.", name: "[Name]", role: "Head of Marketing, listed consumer brand" },
  { quote: "Our Head of Content was hired in under four weeks, and she was not on any job board.", name: "[Name]", role: "Founder, D2C brand" },
  { quote: "Three candidates, all worth the call. We hired two of them.", name: "[Name]", role: "Content Lead, fintech" },
  { quote: "They knew what our editors were paid elsewhere before we asked. The benchmark saved us a bad offer.", name: "[Name]", role: "Studio founder" },
  { quote: "Paying after the hire made it an easy yes. The process made it an easy second mandate.", name: "[Name]", role: "Growth Lead, edtech" },
  { quote: "It felt like working with former creatives, because it was. They spoke our team's language.", name: "[Name]", role: "Creative Director, agency" },
  { quote: "Helium kept the whole team in one place. We reviewed assignments together and closed in days.", name: "[Name]", role: "Brand Manager, consumer brand" },
];
