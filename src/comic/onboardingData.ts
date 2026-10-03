import type { IconName } from "@/comic/Icon";

// Data and styles for the two onboarding pages: "/onboarding" (the page a
// creator lands on straight after their call) and "/onboarding-form" (the
// details we need to draw up their agreement).
//
// Styles are scoped under `.v4` and layered on top of V4_CSS rather than
// replacing it, so these pages inherit the same buttons, section headers,
// nav and footer as the home page. Everything new is prefixed `ob-`.
//
// No new hues. The palette is the five in v4.ts and their tints, per the note
// there - the temptation on a pricing table is to reach for a green tick and a
// red cross, and that is exactly what would make it look like a different site.

export const CREATORS = [
  {
    name: "Amy Wang",
    slug: "amy-wang",
    region: "US",
    field: "Lifestyle",
    url: "https://www.youtube.com/@amywang",
    stats: [
      { icon: "yt", big: "800K", rest: "subscribers on YouTube" },
      { icon: "ig", big: "100K+", rest: "followers on Instagram" },
    ],
  },
  {
    name: "Chance Dubinick",
    slug: "chance-dubinick",
    region: "US",
    field: "Fashion",
    url: "https://www.youtube.com/@ChanceDubinick",
    stats: [{ icon: "yt", big: "600K+", rest: "subscribers on YouTube" }],
  },
  {
    name: "Fiona Lin",
    slug: "fiona-lin",
    region: "US",
    field: "Lifestyle",
    url: "https://www.instagram.com/fionaylin/",
    stats: [{ icon: "ig", big: "234K", rest: "followers on Instagram" }],
  },
  {
    name: "Safwaan Mohammed",
    slug: "safwaan-mohammed",
    region: "UK",
    field: "Creative direction",
    url: "https://www.linkedin.com/in/safmohammed",
    stats: [
      { icon: "star", big: "Ali Abdaal", rest: "ex creative director" },
      { icon: "yt", big: "Talking Heads", rest: "founder" },
    ],
  },
  {
    name: "Chloe Zhu",
    slug: "chloe-zhu",
    region: "Sydney",
    field: "Lifestyle",
    url: "",
    stats: [{ icon: "ig", big: "100K", rest: "followers on Instagram" }],
  },
  {
    name: "Aman Manazir",
    slug: "aman-manazir",
    region: "US",
    field: "Software & education",
    url: "https://www.youtube.com/AmanManazir",
    stats: [
      { icon: "yt", big: "80K", rest: "subscribers on YouTube" },
      { icon: "star", big: "SEA", rest: "founder" },
    ],
  },
  {
    name: "Shawn Hakimi",
    slug: "shawn-hakimi",
    region: "US",
    field: "Finance",
    url: "https://www.youtube.com/@shawnhakimi",
    stats: [{ icon: "yt", big: "10K+", rest: "subscribers on YouTube" }],
  },
  {
    name: "Phoenix Learning",
    slug: "phoenix-learning",
    region: "US",
    field: "Finance education",
    url: "https://www.youtube.com/@learningphoenix",
    stats: [{ icon: "star", big: "Hedge fund", rest: "learning platform" }],
  },
  {
    name: "Golf Busters",
    slug: "golf-busters",
    region: "US",
    field: "Golf",
    url: "https://www.youtube.com/@GolfBusters",
    stats: [{ icon: "yt", big: "70K+", rest: "subscribers on YouTube" }],
  },
] as const;

export const ROLE_WORDS = [
  "Short form editors", "Long form editors", "Scriptwriters", "Designers",
  "Thumbnail designers", "Motion designers", "YouTube strategists",
  "Content managers", "Brand deals managers",
];

export const STATS = [
  { big: "7 days", line: "From first call to someone working in your pipeline" },
  { big: "9 months", line: "Free replacement cover on every placement" },
  { big: "US · CA · UK · EU", line: "Local accounts, so payments skip international wires" },
];

export const STEPS: { no: string; icon: IconName; title: string; body: string }[] = [
  { no: "01", icon: "mail", title: "We send vetted profiles",
    body: "After the call you receive a shortlist by email, with proof of work attached for each person." },
  { no: "02", icon: "clipboard", title: "You set the assignment",
    body: "Send a real task from your own pipeline, so you are assessing the work rather than a portfolio." },
  { no: "03", icon: "users", title: "You choose",
    body: "We narrow the shortlist with you, and the final decision on who joins is yours." },
  { no: "04", icon: "bolt", title: "They start the next day",
    body: "No onboarding queue. They are in your workflow and producing from day one." },
];

// The comparison. `v` is yes / no / mid, which drives the mark rather than a
// colour: purple tick, hollow ring, short dash. Three shapes read faster than
// three colours and survive on a cream ground.
export const COMPARE = [
  {
    row: "Who you work with",
    us: { v: "yes", t: "The person doing the work, directly." },
    agency: { v: "no", t: "An account manager, who briefs someone you never meet." },
    solo: { v: "yes", t: "The person doing the work, directly." },
  },
  {
    row: "Flexibility",
    us: { v: "yes", t: "Add a role, drop a role or swap someone out month to month." },
    agency: { v: "no", t: "Locked to a retainer and a scope until it renews." },
    solo: { v: "mid", t: "Whatever you can renegotiate one to one." },
  },
  {
    row: "What you pay",
    us: { v: "yes", t: "One flat monthly rate per person, so you know what each seat costs." },
    agency: { v: "no", t: "A bundled retainer covering hours you cannot see." },
    solo: { v: "mid", t: "Their rate, plus your own time sourcing and managing." },
  },
  {
    row: "If it is not working",
    us: { v: "yes", t: "Free replacement, any time in the first 9 months." },
    agency: { v: "mid", t: "Reassigned internally, if they agree to it." },
    solo: { v: "no", t: "Start the search again from zero." },
  },
  {
    row: "Time to start",
    us: { v: "yes", t: "About 7 days." },
    agency: { v: "mid", t: "Weeks of onboarding and account setup." },
    solo: { v: "no", t: "Weeks to months of sourcing and testing." },
  },
  {
    row: "Payments",
    us: { v: "yes", t: "Handled through our US, Canada, UK and EU accounts, at a $1–2 transaction fee." },
    agency: { v: "mid", t: "Handled, inside the retainer." },
    solo: { v: "no", t: "International wires, FX spread and chasing invoices." },
  },
  {
    row: "Paperwork",
    us: { v: "yes", t: "We draft a contract for each person you hire, covering deliverables and terms." },
    agency: { v: "mid", t: "One master agreement covering the agency, not the people." },
    solo: { v: "no", t: "Yours to write, send and enforce." },
  },
] as const;

export const TIERS: { tag: string; icon: IconName; amount: string; scope: string; roles: string[]; lead: boolean }[] = [
  {
    tag: "Short form · Instagram",
    icon: "film",
    amount: "$1,300 – $2,000",
    scope: "Up to 22 short form reels a month: standard Instagram edits with light motion graphics. Volume is agreed with you before anyone starts.",
    roles: ["Short form editors", "Scriptwriters", "Designers"],
    lead: false,
  },
  {
    tag: "Long form · YouTube",
    icon: "cam",
    amount: "$1,500 – $2,300",
    scope: "Four long form videos a month, built with full motion animation. Scoped against your average runtime and edit style before we start.",
    roles: ["Long form editors", "Motion designers", "Thumbnail designers"],
    lead: true,
  },
  {
    tag: "Strategy & management",
    icon: "target",
    amount: "$2,000 – $3,500",
    scope: "Priced on scope: how many platforms they run, how much of the calendar they own, and how much of your week they take back.",
    roles: ["YouTube strategists", "Content managers", "Brand deals managers"],
    lead: false,
  },
];

export const INCLUDED: { icon: IconName; head: string; body: string }[] = [
  { icon: "users", head: "Direct access to your talent",
    body: "No account manager sitting between you and the work." },
  { icon: "shield", head: "Free replacement for 9 months",
    body: "No second placement fee for the replacement." },
  { icon: "doc", head: "A contract per person you hire",
    body: "Covering deliverables, output and terms, drafted by us." },
  { icon: "bank", head: "Invoicing kept simple",
    body: "We hold bank accounts in every country we serve — US, Canada, UK and EU — so sending us money usually costs $1–2. We pay your editor locally, in their own market." },
  { icon: "clock", head: "About 7 days to start",
    body: "From the first call to someone working in your pipeline." },
];

export const NEVER_BILLED = [
  "No upfront or setup fee",
  "No monthly commission or retainer to us",
  "No charge for a replacement in the first 9 months",
  "No minimum contract length or lock-in",
  "No fee to end the engagement",
];

export const FAQ = [
  { q: "How do you find the people you send me?",
    a: "We share vetted profiles by email with proof of work attached. You send them an assignment from your own pipeline, we narrow the shortlist with you, and whoever you choose starts the next day." },
  { q: "How long does it take to get someone started?",
    a: "About seven days from the first call to someone working in your pipeline." },
  { q: "Who do I deal with day to day?",
    a: "The person you hired. Briefs, feedback, revisions and calls go directly between the two of you. We stay on payments, paperwork and replacements." },
  { q: "What happens if it is not working out?",
    a: "Tell us and we replace them at no cost, at any point in the first nine months. There is no second placement fee for the replacement." },
  { q: "How do payments work?",
    a: "We hold bank accounts in every country we serve — US, Canada, UK and EU. Sending us money usually costs $1–2, and we pay your editor locally in their own market, so nobody is waiting on an international wire." },
  { q: "Is there a contract?",
    a: "Yes, and we draft it. There is a short agreement to get started, then a separate contract for each person you hire covering their deliverables, output and terms, so responsibilities are written down on both sides." },
  { q: "When is the placement fee charged?",
    a: "Once, after your talent has completed seven days working with you. It is equal to one month at your agreed rate, and nothing is due upfront." },
];

export const AFTER_CALL: { no: string; icon: IconName; body: string }[] = [
  { no: "01", icon: "clipboard", body: "You fill in <b>a short form</b>, so we have the correct legal name and address for the agreement." },
  { no: "02", icon: "mail", body: "Your <b>agreement arrives by email</b>, already filled in. Sign and return it on the same thread within 24 hours." },
  { no: "03", icon: "bolt", body: "We open the shortlist and <b>the engagement begins</b>." },
  { no: "04", icon: "doc", body: "For each person you hire, a <b>separate contract</b> covering their deliverables, output and terms." },
];

export const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Ireland", "Germany", "France",
  "Netherlands", "Spain", "Italy", "Portugal", "Sweden", "Australia",
  "New Zealand", "Singapore", "United Arab Emirates", "India", "Other",
];

export const ONBOARD_CSS = `
/* ---------- creator rail ---------- */
.v4 .ob-rail{ position:relative; overflow:hidden; padding:10px 0 26px; }
.v4 .ob-rail::before,.v4 .ob-rail::after{ content:''; position:absolute; top:0; bottom:0; width:90px; z-index:2; pointer-events:none; }
.v4 .ob-rail::before{ left:0; background:linear-gradient(to right,var(--paper),rgba(255,252,247,0)); }
.v4 .ob-rail::after{ right:0; background:linear-gradient(to left,var(--paper),rgba(255,252,247,0)); }
@media (max-width:640px){ .v4 .ob-rail::before,.v4 .ob-rail::after{ width:34px; } }
.v4 .ob-track{ display:flex; width:max-content; align-items:stretch; }
/* margin not gap: translateX(-50%) must land exactly one set along, and a
   flex gap adds a half-gap of drift that shows up as a jump every lap */
.v4 .ob-track > .ob-card{ width:300px; flex:none; margin-right:20px; }
@media (max-width:640px){ .v4 .ob-track > .ob-card{ width:262px; } }
.v4 .ob-rail.ready .ob-track{ animation:ob-creep 64s linear infinite; }
.v4 .ob-rail.ready:hover .ob-track,
.v4 .ob-rail.ready:focus-within .ob-track{ animation-play-state:paused; }
.v4 .ob-rail:not(.ready){ overflow-x:auto; }
@keyframes ob-creep{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
@media (prefers-reduced-motion:reduce){ .v4 .ob-rail .ob-track{ animation:none !important; } }

.v4 .ob-card{ background:#fff; border:3px solid var(--ink); border-radius:20px; overflow:hidden;
  box-shadow:var(--shadow-sm); display:flex; flex-direction:column; transition:transform .14s cubic-bezier(.34,1.56,.64,1), box-shadow .14s; }
.v4 a.ob-card:hover{ transform:translate(3px,3px); box-shadow:1px 1px 0 var(--ink); }
/* square frame, square source files, so cover crops nothing */
.v4 .ob-shot{ position:relative; width:100%; aspect-ratio:1/1; background:var(--lav); display:grid; place-items:center; overflow:hidden; }
.v4 .ob-shot img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.v4 .ob-shot .ob-mono{ font-family:var(--f-display); font-weight:800; font-size:52px; color:var(--ink); opacity:.5; }
.v4 .ob-badge{ position:absolute; right:12px; bottom:12px; z-index:2; width:34px; height:34px; border:3px solid var(--ink);
  border-radius:50%; background:var(--sun); display:grid; place-items:center; }
.v4 .ob-body{ border-top:3px solid var(--ink); padding:18px 20px 20px; display:flex; flex-direction:column; flex:1; }
.v4 .ob-body h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:21px; letter-spacing:-0.025em; line-height:1.1; }
.v4 .ob-meta{ display:flex; align-items:center; gap:8px; font-size:10px; font-weight:700; letter-spacing:1.2px;
  text-transform:uppercase; color:var(--ink-soft); margin:7px 0 14px; padding-bottom:14px; border-bottom:2px solid var(--cream); }
.v4 .ob-meta i{ width:4px; height:4px; border-radius:50%; background:var(--purple); font-style:normal; }
.v4 .ob-stats{ list-style:none; display:flex; flex-direction:column; gap:8px; margin-top:auto; }
.v4 .ob-stats li{ display:flex; align-items:flex-start; gap:9px; font-size:13.5px; line-height:1.45; color:var(--ink-soft); }
.v4 .ob-stats b{ font-family:var(--f-display); font-weight:800; font-size:15px; letter-spacing:-0.02em; color:var(--ink); }
.v4 .ob-stats .ob-ic{ color:var(--purple); flex:none; margin-top:2px; }

/* ---------- count line ---------- */
.v4 .ob-count{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:clamp(19px,2.7vw,26px); letter-spacing:-0.028em; line-height:1.25; margin-top:22px; }
.v4 .ob-count em{ font-style:normal; color:var(--purple); }

/* ---------- stat band ---------- */
.v4 .ob-band{ background:var(--deep); border-top:3px solid var(--ink); border-bottom:3px solid var(--ink); }
.v4 .ob-bandgrid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); }
.v4 .ob-stat{ padding:28px clamp(20px,3vw,30px); display:flex; gap:15px; align-items:flex-start;
  border-right:2px solid rgba(255,255,255,.14); }
.v4 .ob-stat:last-child{ border-right:0; }
@media (max-width:860px){ .v4 .ob-stat{ border-right:0; border-bottom:2px solid rgba(255,255,255,.14); }
  .v4 .ob-stat:last-child{ border-bottom:0; } }
.v4 .ob-stat .ob-ic{ color:var(--sun); flex:none; margin-top:3px; }
.v4 .ob-stat b{ display:block; font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:23px; letter-spacing:-0.03em; color:#fff; margin-bottom:5px; }
.v4 .ob-stat span{ font-size:13.5px; line-height:1.45; color:var(--lav); }

/* ---------- step cards ---------- */
.v4 .ob-steps{ display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:18px; }
.v4 .ob-step{ background:#fff; border:3px solid var(--ink); border-radius:20px; padding:24px 22px; box-shadow:var(--shadow-sm); }
.v4 .ob-stepic{ width:46px; height:46px; border:3px solid var(--ink); border-radius:14px; background:var(--cream);
  display:grid; place-items:center; margin-bottom:16px; }
.v4 .ob-step .ob-no{ display:block; font-size:10.5px; font-weight:800; letter-spacing:1.4px; color:var(--purple); margin-bottom:8px; }
.v4 .ob-step h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:19px; letter-spacing:-0.02em; line-height:1.15; margin-bottom:8px; }
.v4 .ob-step p{ font-size:14.5px; line-height:1.55; color:var(--ink-soft); }

/* ---------- comparison ---------- */
.v4 .ob-cmpwrap{ overflow-x:auto; border:3.5px solid var(--ink); border-radius:22px; box-shadow:var(--shadow); background:#fff; }
.v4 table.ob-cmp{ border-collapse:collapse; width:100%; min-width:800px; }
.v4 table.ob-cmp th,.v4 table.ob-cmp td{ text-align:left; vertical-align:top; padding:18px 20px;
  border-bottom:2px solid var(--cream); font-size:13.5px; line-height:1.5; color:var(--ink-soft); }
.v4 table.ob-cmp tr:last-child th,.v4 table.ob-cmp tr:last-child td{ border-bottom:0; }
.v4 table.ob-cmp thead th{ font-size:10.5px; font-weight:700; letter-spacing:1.3px; text-transform:uppercase;
  color:var(--ink); background:var(--sun-50); white-space:nowrap; border-bottom:3px solid var(--ink); }
.v4 table.ob-cmp thead th.us{ background:var(--purple); color:#fff; }
.v4 table.ob-cmp tbody th{ font-size:12.5px; font-weight:700; color:var(--ink); width:20%; background:var(--paper); }
.v4 table.ob-cmp tbody th span{ display:flex; align-items:center; gap:10px; }
.v4 table.ob-cmp tbody th .ob-ic{ color:var(--purple); flex:none; }
.v4 table.ob-cmp td.us{ background:#FBF8FF; color:var(--ink); font-weight:500; }
.v4 .ob-cell{ display:flex; gap:11px; align-items:flex-start; }
.v4 .ob-mark{ flex:none; width:17px; height:17px; margin-top:2px; border-radius:50%; display:grid; place-items:center;
  font-size:10px; font-weight:800; line-height:1; }
.v4 .ob-mark.yes{ background:var(--purple); color:#fff; }
.v4 .ob-mark.no{ border:2px solid #C9C0D8; color:transparent; }
.v4 .ob-mark.mid{ background:var(--cream); color:var(--ink-soft); }

/* ---------- pricing ---------- */
.v4 .ob-tiers{ display:grid; grid-template-columns:repeat(auto-fit,minmax(272px,1fr)); gap:20px; align-items:stretch; }
.v4 .ob-tier{ background:#fff; border:3.5px solid var(--ink); border-radius:22px; padding:28px 24px;
  display:flex; flex-direction:column; box-shadow:var(--shadow-sm); }
.v4 .ob-tier.lead{ box-shadow:var(--shadow); border-color:var(--ink); background:var(--sun-50); }
.v4 .ob-tierhead{ display:flex; align-items:center; gap:13px; margin-bottom:18px; }
.v4 .ob-tieric{ width:44px; height:44px; flex:none; border:3px solid var(--ink); border-radius:14px;
  background:var(--cream); display:grid; place-items:center; }
.v4 .ob-tier.lead .ob-tieric{ background:var(--purple); color:#fff; }
.v4 .ob-tiertag{ font-size:10px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:var(--ink-soft); line-height:1.4; }
.v4 .ob-amt{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:clamp(26px,3.6vw,33px); letter-spacing:-0.035em; line-height:1; margin-bottom:5px; }
.v4 .ob-per{ font-size:11.5px; font-weight:700; letter-spacing:.6px; text-transform:uppercase; color:var(--purple); margin-bottom:18px; }
.v4 .ob-scope{ font-size:14px; line-height:1.55; color:var(--ink-soft); padding-bottom:18px; margin-bottom:18px; border-bottom:2px solid var(--ink); }
.v4 .ob-roleslbl{ font-size:10px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:var(--ink-soft); margin-bottom:10px; }
.v4 .ob-roles{ list-style:none; display:flex; flex-wrap:wrap; gap:7px; margin-top:auto; }
.v4 .ob-roles li{ font-size:12px; font-weight:600; border:2px solid var(--ink); border-radius:999px; padding:4px 11px; background:var(--paper); }

/* ---------- included ---------- */
.v4 .ob-incl{ margin-top:24px; background:var(--deep); border:3.5px solid var(--ink); border-radius:22px;
  box-shadow:var(--shadow); padding:32px clamp(22px,3vw,30px); }
.v4 .ob-incl h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:22px; letter-spacing:-0.025em; color:#fff; margin-bottom:22px; }
.v4 .ob-incl ul{ list-style:none; display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:18px 30px; }
.v4 .ob-incl li{ display:flex; gap:13px; align-items:flex-start; font-size:14px; line-height:1.5; color:var(--lav); }
.v4 .ob-incl li .ob-ic{ color:var(--sun); flex:none; margin-top:2px; }
.v4 .ob-incl li b{ display:block; color:#fff; font-weight:600; margin-bottom:2px; }

/* ---------- our fee ---------- */
.v4 .ob-fee{ margin-top:24px; background:#fff; border:3.5px solid var(--purple); border-radius:22px;
  box-shadow:var(--shadow); display:grid; grid-template-columns:1.1fr 1fr; overflow:hidden; }
@media (max-width:860px){ .v4 .ob-fee{ grid-template-columns:1fr; } }
.v4 .ob-feemain{ padding:32px clamp(22px,3vw,30px); border-right:3px solid var(--purple); }
@media (max-width:860px){ .v4 .ob-feemain{ border-right:0; border-bottom:3px solid var(--purple); } }
.v4 .ob-feelbl{ display:inline-flex; align-items:center; gap:9px; font-size:10px; font-weight:700;
  letter-spacing:1.4px; text-transform:uppercase; color:var(--purple); margin-bottom:14px; }
.v4 .ob-feehead{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:clamp(25px,3.4vw,34px); letter-spacing:-0.032em; line-height:1.05; margin-bottom:14px; }
.v4 .ob-feehead em{ font-family:var(--f-display); font-style:italic; font-variation-settings:'SOFT' 90,'WONK' 1;
  font-weight:500; color:var(--purple); }
.v4 .ob-feemain > p{ font-size:14.5px; line-height:1.6; color:var(--ink-soft); max-width:44ch; margin-bottom:20px; }
.v4 .ob-feesplit{ display:grid; gap:14px; border-top:2px solid var(--cream); padding-top:18px; }
.v4 .ob-feesplit div{ display:flex; gap:13px; align-items:flex-start; }
.v4 .ob-feesplit .ob-ic{ color:var(--purple); flex:none; margin-top:2px; }
.v4 .ob-feesplit b{ display:block; font-size:10.5px; font-weight:700; letter-spacing:1.2px;
  text-transform:uppercase; color:var(--ink-soft); margin-bottom:3px; }
.v4 .ob-feesplit span{ font-size:14.5px; line-height:1.45; color:var(--ink); }
.v4 .ob-feenote{ margin-top:18px; padding-top:16px; border-top:2px solid var(--cream);
  font-size:13px; line-height:1.5; color:var(--ink-soft); }
.v4 .ob-feenever{ padding:32px clamp(22px,3vw,30px); background:var(--cream); }
.v4 .ob-feenever .ob-feelbl{ color:var(--ink-soft); }
.v4 .ob-feenever ul{ list-style:none; display:flex; flex-direction:column; gap:12px; }
.v4 .ob-feenever li{ display:flex; gap:11px; align-items:flex-start; font-size:14px; line-height:1.45; color:var(--ink); }

/* ---------- worked example ---------- */
.v4 .ob-worked{ margin-top:24px; background:var(--sun-50); border:3.5px solid var(--ink); border-radius:22px;
  box-shadow:var(--shadow-sm); padding:28px clamp(22px,3vw,26px); }
.v4 .ob-worked .ob-feelbl{ color:var(--ink); }
.v4 .ob-worked ol{ list-style:none; display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:16px 28px; counter-reset:w; }
.v4 .ob-worked li{ counter-increment:w; position:relative; padding-left:34px; font-size:14px; line-height:1.5; color:var(--ink); }
.v4 .ob-worked li::before{ content:counter(w); position:absolute; left:0; top:0; width:24px; height:24px;
  border-radius:50%; background:var(--ink); color:var(--sun); display:grid; place-items:center; font-size:11.5px; font-weight:800; }

/* ---------- faq ---------- */
.v4 .ob-faq{ max-width:820px; }
.v4 .ob-faq details{ background:#fff; border:3px solid var(--ink); border-radius:18px; padding:18px 22px;
  margin-bottom:14px; box-shadow:var(--shadow-sm); }
.v4 .ob-faq summary{ font-size:15.5px; font-weight:700; color:var(--ink); cursor:pointer; list-style:none;
  display:flex; justify-content:space-between; align-items:center; gap:16px; }
.v4 .ob-faq summary::-webkit-details-marker{ display:none; }
.v4 .ob-faq summary i{ flex:none; width:22px; height:22px; border-radius:50%; background:var(--cream);
  display:grid; place-items:center; font-style:normal; font-weight:800; color:var(--purple); transition:transform .15s; }
.v4 .ob-faq details[open] summary i{ transform:rotate(45deg); }
.v4 .ob-faq p{ font-size:14.5px; line-height:1.6; color:var(--ink-soft); margin-top:14px; max-width:66ch; }

/* ---------- after the call ---------- */
.v4 .ob-flow{ display:grid; grid-template-columns:repeat(auto-fit,minmax(218px,1fr)); gap:20px; }
.v4 .ob-flowitem{ border-top:3px solid var(--ink); padding-top:16px; }
.v4 .ob-flowtop{ display:flex; align-items:center; gap:11px; margin-bottom:11px; }
.v4 .ob-flowtop .ob-ic{ color:var(--purple); }
.v4 .ob-flowitem .ob-no{ font-size:10.5px; font-weight:800; letter-spacing:1.4px; color:var(--ink-soft); }
.v4 .ob-flowitem p{ font-size:14px; line-height:1.55; color:var(--ink-soft); }
.v4 .ob-flowitem p b{ color:var(--ink); font-weight:600; }

/* The flow block is reused inside .band, which paints purple with white text.
   Left to inherit, its ink-on-cream colours score 1.7:1 there and the purple
   icons disappear into the ground entirely at 1.0:1, so every colour is
   restated for that context rather than assumed. */
.v4 .band .ob-flow{ text-align:left; }
.v4 .band .ob-flowitem{ border-top-color:rgba(255,255,255,.5); }
/* A shade lighter than the .band paragraph tint the site uses elsewhere: this
   copy is 14px rather than 16px, and #E8DDFF only reaches 3.5:1 on purple. */
.v4 .band .ob-flowitem .ob-no{ color:#F6F1FF; }
.v4 .band .ob-flowtop .ob-ic{ color:var(--sun); }
.v4 .band .ob-flowitem p{ color:#F6F1FF; }
.v4 .band .ob-flowitem p b{ color:#fff; }

/* The shared icon set outlines every shape in near black, which reads on cream
   and turns muddy on the purple and deep panels - and any detail drawn only in
   stroke, like the columns of the bank mark, is lost outright. Restating the
   stroke as the panel's own ground keeps the shapes separated instead. */
.v4 .band .ob-ic [stroke]{ stroke:var(--deep); }
.v4 .ob-band .ob-ic [stroke],
.v4 .ob-incl .ob-ic [stroke]{ stroke:#120829; }

/* ---------- form page ---------- */
/* The nav is position:absolute, so it needs a relative parent that reserves
   its height. Without one the form card slides up underneath it. */
.v4 .ob-topbar{ position:relative; height:clamp(74px,10vw,98px); }
.v4 .ob-formsec{ padding-top:clamp(20px,3vw,34px); }
.v4 .ob-formwrap{ max-width:860px; margin:0 auto; }
.v4 .ob-card-form{ background:#fff; border:3.5px solid var(--ink); border-radius:24px; box-shadow:var(--shadow);
  padding:clamp(24px,4vw,38px); }
.v4 .ob-step-head{ display:flex; align-items:center; gap:11px; font-size:10.5px; font-weight:700;
  letter-spacing:1.4px; text-transform:uppercase; color:var(--purple); margin:0 0 20px;
  padding-bottom:13px; border-bottom:2px solid var(--cream); }
.v4 .ob-step-head:not(:first-child){ margin-top:32px; }
.v4 .ob-fields{ display:flex; flex-direction:column; gap:22px; }
.v4 .ob-pair{ display:grid; grid-template-columns:1fr 1fr; gap:22px; }
@media (max-width:620px){ .v4 .ob-pair{ grid-template-columns:1fr; } }
.v4 .ob-f{ display:flex; flex-direction:column; gap:7px; }
.v4 .ob-f > label{ font-size:13px; font-weight:700; color:var(--ink); }
.v4 .ob-f > label i{ font-style:normal; font-weight:600; color:var(--ink-soft); }
.v4 .ob-hint{ font-size:12.5px; color:var(--ink-soft); }
.v4 .ob-f input,.v4 .ob-f textarea,.v4 .ob-f select{ font:inherit; font-size:15px; color:var(--ink); background:#fff;
  border:2.5px solid var(--ink); border-radius:12px; padding:12px 14px; width:100%; resize:vertical; }
.v4 .ob-f select{ appearance:none; cursor:pointer; padding-right:40px;
  background-image:linear-gradient(45deg,transparent 50%,var(--ink) 50%),linear-gradient(135deg,var(--ink) 50%,transparent 50%);
  background-position:calc(100% - 20px) 21px,calc(100% - 14px) 21px; background-size:6px 6px,6px 6px; background-repeat:no-repeat; }
.v4 .ob-f input:focus,.v4 .ob-f textarea:focus,.v4 .ob-f select:focus{ outline:none; border-color:var(--purple);
  box-shadow:0 0 0 3px rgba(136,86,242,.22); }
.v4 .ob-f.bad input,.v4 .ob-f.bad textarea,.v4 .ob-f.bad select{ border-color:#B3241C; }
.v4 .ob-err{ font-size:13px; font-weight:600; color:#B3241C; }
.v4 .ob-chips{ display:flex; flex-wrap:wrap; gap:8px; }
.v4 .ob-chips button{ cursor:pointer; border:2.5px solid var(--ink); background:var(--paper); border-radius:999px;
  padding:10px 18px; font-size:13.5px; font-weight:600; transition:background .15s,color .15s; }
.v4 .ob-chips button:hover{ background:var(--cream); }
.v4 .ob-chips button.on{ background:var(--ink); color:var(--paper); }
/* the branch that does not apply is unmounted, not hidden, so a half filled
   company address can never ride along on an individual's submission */
.v4 .ob-branch{ display:flex; flex-direction:column; gap:22px; border-left:3px solid var(--lav); padding-left:20px; }
@media (max-width:620px){ .v4 .ob-branch{ padding-left:14px; } }
.v4 .ob-actions{ margin-top:30px; display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
.v4 .ob-note{ font-size:12.5px; color:var(--ink-soft); max-width:42ch; }

.v4 .ob-done{ text-align:left; }
.v4 .ob-tick{ display:inline-flex; align-items:center; justify-content:center; width:62px; height:62px;
  border:3.5px solid var(--ink); border-radius:50%; background:var(--purple); margin-bottom:20px; }
.v4 .ob-done h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:clamp(24px,4vw,31px); letter-spacing:-0.03em; margin-bottom:12px; }
.v4 .ob-done > p{ font-size:15.5px; line-height:1.6; color:var(--ink-soft); max-width:52ch; margin-bottom:24px; }
.v4 .ob-done ol{ list-style:none; counter-reset:t; display:flex; flex-direction:column; gap:13px; }
.v4 .ob-done ol li{ counter-increment:t; position:relative; padding-left:38px; font-size:14.5px; line-height:1.55; color:var(--ink-soft); }
.v4 .ob-done ol li b{ color:var(--ink); font-weight:600; }
.v4 .ob-done ol li::before{ content:counter(t); position:absolute; left:0; top:0; width:26px; height:26px;
  border-radius:50%; background:var(--ink); color:var(--sun); display:grid; place-items:center; font-size:12px; font-weight:800; }
`;
