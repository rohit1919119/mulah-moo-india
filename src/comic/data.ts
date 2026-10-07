// Shared content for /moo-talent and /moo-talent-form.

import type { DetailedHTMLProps, LinkHTMLAttributes } from "react";

// Typed as React's link props so crossOrigin keeps its "anonymous" literal
// type. Left untyped it widens to string; `as const` fixes that but makes the
// array readonly, which the route head rejects.
type HeadLink = DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;

export const FONT_LINKS: HeadLink[] = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    // Fraunces carries the SOFT and WONK axes the v4 display type depends on, so
    // the axis ranges have to be requested explicitly or the variation settings
    // silently do nothing.
    href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..900,0..100,0..1;1,9..144,400..900,0..100,0..1&family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&display=swap",
  },
];

export const CLIENTS = [
  { name: "Amy Wang", slug: "amy-wang", url: "https://www.instagram.com/amywang.online/" },
  { name: "Chloe Zhu", slug: "chloe-zhu", url: "https://www.instagram.com/cloiey/" },
  { name: "Aman Manazir", slug: "aman-manazir", url: "https://www.youtube.com/@AmanManazir" },
  { name: "Safwaan Mohammed", slug: "safwaan-mohammed", url: "https://www.linkedin.com/company/talkingheadsco" },
  { name: "Phoenix Learning", slug: "phoenix-learning", url: "https://www.youtube.com/@learningphoenix" },
  { name: "Fiona", slug: "fiona", url: "https://www.instagram.com/fionaylin/" },
];

// Placeholder briefs - swap for real open roles before promoting the page.
export const BRIEFS = [
  { client: "UK based YouTube studio", role: "Video Editor", icon: "film", pay: "$2,400", tint: "#F5D547" },
  { client: "US based creator-brand", role: "Organic Content Strategist", icon: "chart", pay: "$3,200", tint: "#8856F2" },
  { client: "Dubai based fintech", role: "Brand Face", icon: "mic", pay: "$4,500", tint: "#FF5CA8" },
  { client: "US based podcast network", role: "Short Form Producer", icon: "target", pay: "$2,800", tint: "#7BE0AD" },
  { client: "London based agency", role: "Thumbnail Designer", icon: "brush", pay: "$1,800", tint: "#F5D547" },
  { client: "New York creator studio", role: "Scriptwriter", icon: "pen", pay: "$2,100", tint: "#8856F2" },
  { client: "UAE based D2C brand", role: "Motion Designer", icon: "cam", pay: "$3,600", tint: "#FF5CA8" },
  { client: "US based SaaS company", role: "YouTube Strategist", icon: "chart", pay: "$4,000", tint: "#7BE0AD" },
] as const;

export const ROLES = [
  { val: "Video Editor", icon: "film", desc: "Post-production specialists who cut, assemble and finish video" },
  { val: "Designer", icon: "brush", desc: "Visual craft across brand, product and platform" },
  { val: "Creative Head / Production", icon: "target", desc: "People who own creative vision or manage production pipelines" },
  { val: "Content Strategist", icon: "chart", desc: "Platform-specific growth and content planning" },
  { val: "Writer", icon: "pen", desc: "Word-first creators across scripts, editorial and ads" },
  { val: "Brand Face / Creator", icon: "mic", desc: "On-camera talent who front channels, ads and campaigns" },
] as const;

export const SUBROLES: Record<string, string[]> = {
  "Video Editor": [
    "Long form", "Short form / Reels", "Film / Cinematic",
    "Product / SaaS launches", "AI filmmaking", "Motion graphic Designer",
  ],
  Designer: [
    "Thumbnail designer", "Visual / Brand designer",
    "Graphic designer", "UI / UX designer",
  ],
  "Creative Head / Production": [
    "Creative director", "Creative producer", "Head of content",
    "YouTube producer", "Short form producer",
    "News producer", "Pre-production lead", "Post-production lead",
  ],
  "Content Strategist": [
    "YouTube strategist", "Instagram strategist", "LinkedIn strategist",
    "X / Twitter strategist", "TikTok strategist", "Podcast strategist",
  ],
  Writer: [
    "Ad film writer", "Long form scriptwriter", "Short form scriptwriter",
    "Screenplay writer", "News writer", "Blog writer",
  ],
  "Brand Face / Creator": [
    "YT anchor / host", "UGC creator", "Meta / performance ad creator",
    "Actor", "Podcast host", "Voice-over artist",
    "Reels / short form face", "Brand ambassador",
  ],
};

// One list, defined beside Helium's snapshot in talent-vocab.ts. There used to
// be two copies, and changing the wrong one changed nothing on the form.
export { EXPERIENCE_BANDS as EXPERIENCE } from "./talent-vocab";

export const OPPORTUNITY = [
  { val: "Full-time", label: "Full-time role" },
  { val: "Freelance", label: "Freelance / contract" },
  { val: "Part-time", label: "Part-time" },
  { val: "Open to all", label: "Open to anything" },
];

// Google Apps Script endpoint that appends each submission to the talent sheet.
export const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzosXi2fXaE5Sfc5FPxUDYMbkcgv4SHjeYrxqW4oehuttUateqKV5T8LUxeHIt0GCP9SQ/exec";

// Where /moo-circle sign-ups go: the same spreadsheet, but the "moo circle"
// tab. Every row is tagged form_type: "moo-circle" and the Apps Script branches
// on that tag to pick the sheet, writing the columns in this order:
//   Submitted At | Name | Email | Phone | LinkedIn
export const CIRCLE_SHEET_URL = SHEET_URL;

// Where /talent-feedbacks responses go: the same spreadsheet again, this time
// the "talent-feedbacks" tab. Rows are tagged form_type: "talent-feedback" and
// the Apps Script branches on that tag, writing the columns in this order:
//   Timestamp | Full Name | Company | Role | LinkedIn | Experience |
//   Platform Feedback | Would Refer | Source Page
export const FEEDBACK_SHEET_URL = SHEET_URL;

// Where /client-feedbacks responses go: the same spreadsheet, the
// "client-feedbacks" tab. Rows are tagged form_type: "client-feedback" and the
// Apps Script branches on that tag, writing the columns in this order:
//   Submitted At | Full Name | Company | Role | Experience Rating |
//   Experience | Brutal Feedback | Would Recommend | Testimonial | Source
export const CLIENT_FEEDBACK_SHEET_URL = SHEET_URL;

// /onboarding-form posts here, and this is deliberately NOT the shared
// SHEET_URL. Client onboarding lives in its own spreadsheet behind its own
// Apps Script, because that script does more than append a row: it copies a
// Google Doc template, fills in the party block from the submission, exports a
// PDF and emails it. Rows are tagged form_type: "client-onboarding" and land in
// the "client-onboarding" tab with the columns in this order:
//   Submitted At | Full Name | Email | Phone | Country | Channel | Entity |
//   Personal Address | Company Name | Company Address | Designation |
//   Company Number | Notes | Source | Status
export const ONBOARDING_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbw0C1eHR0KopzweMjrvEQFlndW7_T02O-ZySf3_VaxnbEfSHMr9je3fHPc1xYSAo3OC/exec";

export const TOTAL_STEPS = 7;

// Footer links and legal name, defined once so the three footers cannot drift.
export const SOCIALS = [
  { label: "Instagram", url: "https://www.instagram.com/themulahmoo" },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/mulahmoo" },
  { label: "Founder", url: "https://www.linkedin.com/in/aeerohit/" },
];

// Mulah Moo is the brand; Numenize Creations LLP is the entity that owns it,
// so the copyright line carries the legal name and nothing else does.
export const LEGAL_NAME = "Numenize Creations LLP";

/**
 * 1:1 career guidance call, hosted on Topmate.
 *
 * No price, duration or agenda on the page. Its job is recognition: someone
 * should see their own situation and click. Topmate states the price on the
 * next screen, before any payment.
 *
 * The tool sits behind this one constant, so switching later is a URL change
 * rather than an edit to the page.
 */
export const CONSULT = {
  bookingUrl: "https://topmate.io/aeerohit/2242921",
  painPoints: [
    "Applying constantly, hearing nothing back",
    "No idea whether you are charging too little",
    "Watching remote roles go to people you are better than",
    "A portfolio that looks fine but never converts",
  ],
};

// Discovery call for clients who want to hire creatives. Separate tool and
// separate audience from CONSULT, which is the paid talent-side session.
export const CLIENT_CALL_URL = "https://calendly.com/rohit-mulahmoo/30min";

// The talent-side call, used by /moo-verified. Same calendar as the client one
// today, but a separate constant so the two can diverge without hunting through
// components - and so a talent call never accidentally points at CONSULT, which
// is the paid Topmate session and a different thing entirely.
export const TALENT_CALL_URL = "https://calendly.com/rohit-mulahmoo/30min";

/**
 * Monthly intake for engagement 01, building a core content team from scratch.
 * Leadership searches and retained hiring are not capped by this.
 *
 * `taken` is the only number that needs maintaining. Set it at the start of each
 * month and the band derives the tiles, the count line and the fully booked
 * state from it.
 */
export const SLOTS = {
  total: 3,
  taken: 1,
  month: "this month",
};

// How a hire actually runs, client side. Numbered because it is a sequence and
// the order is the reassurance.
export const CLIENT_STEPS = [
  { icon: "bubble", title: "Tell us the brief", body: "Role, level, budget, timezone. One call, about fifteen minutes." },
  { icon: "target", title: "We shortlist", body: "Three to five people from a vetted pool. Not three hundred from a job board." },
  { icon: "film", title: "You test them", body: "A short work trial, so you see the work before you commit to anyone." },
  { icon: "bolt", title: "They start", body: "Usually inside two weeks of that first call." },
];

export const CLIENT_PROMISES = [
  { icon: "star", title: "Vetted before you see them", body: "Every shortlist is people we have already worked with or tested ourselves." },
  { icon: "globe", title: "Built for remote", body: "Creatives working across US, UK, UAE and Asia timezones already." },
  { icon: "users", title: "Free replacement", body: "If a placement does not work out in the first 45 days, we replace them at no cost." },
];

// The platforms almost every brief is for. Icons are drawn in the house style
// rather than the official marks, which we have no licence to reproduce.
export const CLIENT_PLATFORMS = [
  { icon: "youtube", label: "YouTube", tint: "#FF5CA8" },
  { icon: "instagram", label: "Instagram", tint: "#8856F2" },
  { icon: "linkedin", label: "LinkedIn", tint: "#6FA8F5" },
];
