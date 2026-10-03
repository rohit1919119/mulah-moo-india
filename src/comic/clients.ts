// Real client roster and case studies, shared by "/" and "/moo-talent".
//
// `mode` decides the card interior, not the client type:
//   photo  a portrait, fills the stage edge to edge
//   bleed  a logo that ships on its own black square, also fills the stage so the
//          card reads as a black card with the mark floating in it
//   fit    a mark centred on a light ground
// Driving the treatment off the asset rather than the category is what lets a
// logo and a face sit in the same rail without either one looking compromised.

export type ClientType = "creator" | "studio" | "brand";
export type CardMode = "photo" | "bleed" | "fit";

export type RailClient = {
  name: string;
  type: ClientType;
  mode: CardMode;
  geo: string;
  desc: string;
  img: string;
  bg?: string;
};

export const RAIL_CLIENTS: RailClient[] = [
  { name: "Groww", type: "brand", mode: "fit", geo: "India",
    desc: "Investment platform for stocks, mutual funds and more", img: "/clients/groww.png", bg: "#FFFFFF" },
  { name: "SAHI", type: "brand", mode: "fit", geo: "India",
    desc: "Options trading and stock investing app", img: "/clients/sahi.jpg", bg: "#FFFFFF" },
  { name: "Trackk", type: "brand", mode: "fit", geo: "India",
    desc: "Investment platform for next generation investors", img: "/clients/trackk.jpg", bg: "#FFFFFF" },
  { name: "Creator Engine", type: "studio", mode: "bleed", geo: "India",
    desc: "Post production company working with global studios and YouTube creators", img: "/clients/creator-engine.jpeg" },
  { name: "Leap Scholar", type: "brand", mode: "fit", geo: "India",
    desc: "AI powered study abroad platform with 1.5mn+ followers across Instagram and YouTube", img: "/clients/leap-scholar.png", bg: "#FFFFFF" },
  { name: "Wakefit", type: "brand", mode: "fit", geo: "India",
    desc: "Content first, publicly listed home and sleep company", img: "/clients/wakefit.jpeg", bg: "#FFFFFF" },
  { name: "Binge Labs", type: "studio", mode: "bleed", geo: "India",
    desc: "Top rated personal brand studio for leading entrepreneurs, averaging 7mn+ views a month across channels", img: "/clients/binge-labs.jpeg" },
  { name: "Traya Health", type: "brand", mode: "fit", geo: "India",
    desc: "Leading hair care solutions company with 800K+ subscribers on YouTube", img: "/clients/traya-health.jpeg", bg: "#FFFFFF" },
  { name: "Verse Innovations", type: "brand", mode: "fit", geo: "India",
    desc: "Global content technology platform with a 300mn+ digital consumer base", img: "/clients/verse-innovations.png", bg: "#FFFFFF" },
];

/* All three spines are purple tints now. The type chip in the card band carries
   the distinction, so the spine does not need a third and fourth hue to do it. */
export const TYPE_TINT: Record<ClientType, string> = {
  creator: "#E3D6FF",
  studio: "#F1E7FF",
  brand: "#FFF6DE",
};

/** Shown on every card. "studio" is labelled Agency in the UI. */
export const TYPE_LABEL: Record<ClientType, string> = {
  creator: "Creator",
  studio: "Agency",
  brand: "Brand",
};

export type CaseStudy = {
  id: string;
  name: string;
  img: string;
  desc: string;
  tag: string;
  /** which engagement model this was */
  engagement: string;
  bg: string;
  sub: string;
  /** optional profile links, shown as icon chips under the sub line.
   *  `icon` must be a name the Icon component knows. */
  links?: { icon: "youtube" | "instagram"; label: string; url: string }[];
  problem: string;
  did: string;
  /** figure, caption, and the glyph that sits above it */
  results: [string, string, string][];
};

export const CASES: CaseStudy[] = [
  {
    id: "trackk",
    name: "Trackk",
    img: "/clients/trackk.jpg",
    desc: "Investment platform, India",
    tag: "Brand",
    engagement: "Core content team, newly funded startup",
    bg: "#FFF6DE",
    sub: "Investment platform for next generation investors. Raised $3M+ from investors including Lightspeed and Info Edge.",
    links: [
      { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/trackk.in/" },
    ],
    problem:
      "Needed in house YouTube, Instagram and performance execution teams built from scratch, within five weeks.",
    did: "Consulted on market rates for each role, sourced top candidates, and closed every seat inside the window.",
    results: [
      ["7 roles", "Closed end to end", "users"],
      ["5 weeks", "From first brief to full team", "bolt"],
      ["3 teams", "YouTube, Instagram and performance", "target"],
    ],
  },
];

// Placeholder wording. Real faces carrying invented words is a liability, so every
// card renders a DUMMY tag until these are replaced with actual quotes.
export const DUMMY_QUOTES: [string, string, string, string | null][] = [
  ["I stopped being the bottleneck. The team ships without me in the loop, which is the whole reason I started looking.",
    "Amy Wang", "Lifestyle creator, US", "/clients/amy-wang.jpeg"],
  ["They understood how a studio actually runs before they sent a single profile. That is rare.",
    "Safwaan Mohammed", "Founder, Talking Heads", "/clients/safwaan-mohammed.jpg"],
  ["Seven roles in five weeks, and the rate benchmarks they gave us were accurate to the rupee.",
    "Trackk", "Investment platform, India", "/clients/trackk.jpg"],
  ["Two senior hires in three weeks, both still with us. They did not try to sell us a bigger team than we needed.",
    "Chloe Zhu", "Lifestyle creator, Sydney", "/clients/chloe-zhu.jpeg"],
  ["We came back for the second mandate before the first one had even finished.",
    "Leap Scholar", "Study abroad platform, India", "/clients/leap-scholar.png"],
  ["Every profile was worth the call. Nobody padded the shortlist to look busy.",
    "Sixth slot", "Swap in a real quote", null],
];

/** The numbers band on "/". `fill` picks the card ground from the five brand
 *  colours; the text colour follows from it in v4.ts. */
export type Stat = { big: string; label: string; fill: "sun" | "purple" | "paper" };

export const STATS: Stat[] = [
  { big: "50+", label: "Teams worked with in the last 18 months", fill: "sun" },
  { big: "5+", label: "Publicly listed companies", fill: "purple" },
  { big: "20+", label: "Leadership marketing positions hired", fill: "paper" },
  { big: "93%", label: "Of our talents are still killing it at their company", fill: "purple" },
  { big: "10,000+", label: "Creative talents letting us decide their next role", fill: "paper" },
  { big: "2 to 9 yrs", label: "Of experience. The only talent our database holds", fill: "sun" },
];

export type Engagement = {
  no: string;
  title: string;
  strap: string;
  bestFor: string;
};

export const ENGAGEMENTS: Engagement[] = [
  {
    no: "01",
    title: "Build your core team",
    strap: "For when you are ready to build content seriously.",
    bestFor:
      "D2C brands under ₹40 lakh MRR, recently funded brands, independent creators with up to 500K audience, and established brands launching a new organic content team.",
  },
  {
    no: "02",
    title: "Hire the leader",
    strap: "For when the team needs someone to lead it.",
    bestFor:
      "Mid to large companies hiring Content Heads, Marketing Leads, Creative Directors, and senior production leaders.",
  },
  {
    no: "03",
    title: "Keep your talent pipeline full",
    strap: "For when hiring is an ongoing need.",
    bestFor:
      "Fast scaling content studios and content led brands with a consistent need for editors, writers, producers, designers, strategists, and other creative talent.",
  },
];

export const TICKER_WORDS = [
  "Video editors", "Thumbnail strategists", "Content managers", "Producers", "Scriptwriters",
  "Motion designers", "Growth marketers", "Creative leads", "D2C marketers", "Content strategists",
];
