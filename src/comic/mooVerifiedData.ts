import type { IconName } from "@/comic/Icon";

// Data and extra styles for "/moo-verified" - the editor facing page.
//
// Reuses ONBOARD_CSS from onboardingData.ts for cards, steps, tiers, the FAQ
// and the whole form, so the two pages cannot drift apart visually. Only what
// is genuinely new to this page lives here, prefixed `mv-`.
//
// Currency note: this page is priced in INR because the contractor pool is in
// India, while /onboarding is in USD because the clients are not. Nothing here
// should ever quote both in the same sentence.

export const MV_STATS = [
  { big: "₹1L+", line: "Minimum monthly value on the contracts we place", icon: "tag" as IconName },
  { big: "0%", line: "Deducted from your rate. You invoice us, we pay it in full", icon: "bank" as IconName },
  { big: "90%", line: "Are long term, full time engagements, not one off gigs", icon: "clock" as IconName },
  { big: "Direct", line: "You work with the creator, not through an account manager", icon: "users" as IconName },
];

export const MV_USPS = [
  {
    icon: "tag" as IconName,
    head: "Contracts worth ₹1 lakh a month and up",
    body: "We do not send you ₹15,000 gigs. The minimum monthly value on a Moo Verified contract is ₹1 lakh, and most sit above it.",
  },
  {
    icon: "users" as IconName,
    head: "You work with the creator directly",
    body: "No account manager relaying briefs. You talk to the person whose channel it is, agree the work with them, and get feedback from them.",
  },
  {
    icon: "clock" as IconName,
    head: "Long term, not project hopping",
    body: "Around 90% of what we place is a long term engagement with flexible hours and fixed monthly deliverables. You stop pitching and start building.",
  },
  {
    icon: "bolt" as IconName,
    head: "Real ownership of the work",
    body: "You run your projects. These are high agency engagements where the creator treats you like a full time member of their team, not a vendor filling a ticket.",
  },
  {
    icon: "bank" as IconName,
    head: "Nothing comes out of your rate",
    body: "Your rate is your rate. No commission on your invoice, no transfer charges, no FX deductions. You invoice us and we pay it in full, on time, every month.",
  },
  {
    icon: "doc" as IconName,
    head: "You are on contract with us",
    body: "Your contract is with Mulah Moo, so you have one counterparty, one invoice and one place to go when something needs sorting — while working day to day with the creator.",
  },
];

export const MV_PAID = [
  { role: "Short form assignment", amount: "₹1,000", note: "Paid for every short form test assignment you take, whether or not you are selected.", icon: "film" as IconName },
  { role: "Long form assignment", amount: "₹2,000", note: "Paid for every long form test assignment you take, whether or not you are selected.", icon: "cam" as IconName },
];

export const MV_EXPECT = [
  {
    icon: "shield" as IconName,
    head: "Exclusive for the contract, and only for the contract",
    body: "These are around forty hours a week, so we ask that you are not carrying other commitments while a contract runs. It applies for that contract’s duration and no longer. If you already have ongoing work you cannot step away from, this is not the right fit.",
  },
  {
    icon: "users" as IconName,
    head: "You own the project, individually",
    body: "No subcontracting, no passing work down a chain. The creator hired you, and the work should be yours.",
  },
  {
    icon: "bolt" as IconName,
    head: "High agency and clear coordination",
    body: "Bring your own judgement, flag problems early, and keep the creator in the loop. These engagements work because the editor drives them.",
  },
  {
    icon: "clock" as IconName,
    head: "Deliver the monthly output you agreed",
    body: "Hours are flexible. The deliverables are not — they are fixed each month and written into your contract.",
  },
];

// The bar. This page leads with it deliberately: a page that says "not for
// everyone" attracts the senior people we want and filters the rest before
// they fill anything in. Softening this would cost us on both sides.
export const MV_BAR = [
  { icon: "brush" as IconName, head: "Senior",
    body: "You have shipped real work for real audiences, and you do not need hand holding to get there." },
  { icon: "bubble" as IconName, head: "Fluent English",
    body: "You will be on calls and in writing with creators every week. Clear communication is not optional on these contracts." },
  { icon: "users" as IconName, head: "Coordination",
    body: "You keep people informed, and you chase the things that need chasing rather than waiting to be asked." },
  { icon: "bolt" as IconName, head: "Ownership",
    body: "The project is yours. You spot the problem before the creator does." },
  { icon: "clock" as IconName, head: "Discipline",
    body: "Hours are flexible. Deadlines are not." },
  { icon: "star" as IconName, head: "Someone people want to work with",
    body: "Creators keep the editors they enjoy working with. That is most of what makes a contract last a year instead of a month." },
];

export const MV_STEPS = [
  { no: "01", icon: "clipboard" as IconName, title: "Send us your details",
    body: "The short form below. Two minutes, and your portfolio matters far more than the form does." },
  { no: "02", icon: "users" as IconName, title: "We shortlist",
    body: "We review everyone by hand and come back to those we want to work with. We do not onboard everybody." },
  { no: "03", icon: "bubble" as IconName, title: "We interview you",
    body: "A proper conversation about your work and how you operate. Nobody gets the Moo Verified tag without it." },
  { no: "04", icon: "film" as IconName, title: "A paid assignment",
    body: "If a contract fits you, you take a real assignment from the creator's own pipeline — paid, whatever the outcome." },
  { no: "05", icon: "doc" as IconName, title: "Contract and start",
    body: "You sign with Mulah Moo, and start working with the creator directly the next day." },
];

export const MV_ARENA = [
  "Opportunities land here before they go anywhere else",
  "Teardowns, feedback and craft sessions with editors working on the biggest channels",
  "A room full of people solving the same problems you are",
  "Cancel any time, no minimum",
];

// Editors only. Moo Verified is not open to the wider talent pool right now,
// so nothing outside an editing role appears anywhere on this page.
export const MV_ROLES = [
  "Short form editor", "Long form editor", "Motion graphics editor", "Cinematic editor",
];

/* All twelve responses from the talent-feedbacks sheet.
 *
 * CONSENT drives `named`, and it is not a styling flag. The form asked people
 * to choose, and five chose "Yes, anonymously" - so they appear by role and
 * company only, with no name, no photo and no LinkedIn. Attaching a face and a
 * profile link to those five would identify them completely, which is the one
 * thing they asked us not to do.
 *
 * Quotes are trimmed and corrected for spelling and grammar. Nothing is added
 * and no claim appears that the person did not make. Himanshu's entry is short
 * because the sheet cell itself is truncated mid-sentence; the rest of what he
 * wrote was never captured, so it is not invented here.
 */
export const MV_TESTIMONIALS = [
  {
    named: true, name: "Saiyam Verma", slug: "saiyam-verma",
    role: "Video Editor", company: "Talking Heads",
    linkedin: "https://www.linkedin.com/in/saiyamverma",
    quote: "Genuinely great from start to finish. Mulah Moo understood what I was looking for, communicated clearly throughout, and connected me with an opportunity that turned out to be a really great fit. I never felt like just another candidate being passed around.",
  },
  {
    named: true, name: "Shreya Gautam", slug: "shreya-gautam",
    role: "YouTube Host, Content Marketing", company: "Trackk",
    linkedin: "https://www.linkedin.com/in/shreyagautam28",
    quote: "Mine was a rare case of being approached by several agencies for the same role, and Mulah Moo took the baton and handled the whole process skilfully. Rohit got in touch and expedited it, then Dipti carried it all the way through to hiring. It never felt like speaking to a recruitment agency.",
  },
  {
    named: true, name: "Vivek Butola", slug: "vivek-butola",
    role: "Social Media Editor", company: "Creator Engine",
    linkedin: "",
    quote: "One of the best platforms for video editors. The communication was superb and there was a lot of support from their side. The onboarding and hiring process was fabulous, and the companies they work with are genuinely good ones.",
  },
  {
    named: true, name: "Srishti Dhameja", slug: "srishti-dhameja",
    role: "Writer", company: "Trackk",
    linkedin: "",
    quote: "Dipti was a dream. The JD, the coordination, the execution and the final onboarding were all pristine. I have gotten a job and a friend.",
  },
  {
    named: true, name: "Naved Tamboli", slug: "naved-tamboli",
    role: "UX UI Designer", company: "Traya",
    linkedin: "https://www.linkedin.com/in/navedtamboli",
    quote: "The hiring process was pretty smooth. The brief was clear, and the trial task helped me understand the kind of work I would be doing. Communication was good, and everyone was friendly and supportive.",
  },
  {
    named: false, name: "", slug: "",
    role: "Video Editor", company: "Binge Labs",
    linkedin: "",
    quote: "I have given a lot of interviews and turned them down because of poor communication. This time I was impressed by the seriousness and the quality of the process.",
  },
  {
    named: false, name: "", slug: "",
    role: "Content Strategist", company: "Binge Labs",
    linkedin: "",
    quote: "Though there were initial hiccups during interviewing and shortlisting, the overall experience was great. Naman was thorough throughout and helped me a lot.",
  },
  {
    named: false, name: "", slug: "",
    role: "Thumbnail Designer", company: "Talking Heads",
    linkedin: "",
    quote: "Smooth and clear, and I had no issues. There were some delays on the employer side, but those were resolved as well.",
  },
  {
    named: false, name: "", slug: "",
    role: "Content Creator", company: "Trackk",
    linkedin: "",
    quote: "Extremely helpful throughout. Everything was explained and guided very patiently, in a warm and supportive way, and I was genuinely impressed by the quality of the work.",
  },
  {
    named: true, name: "Himanshu Chouhan", slug: "himanshu-chouhan",
    role: "Writer and Director", company: "Pocket FM",
    linkedin: "https://www.linkedin.com/in/himanshu-chouhan-41020b144",
    quote: "The hiring process was quite smooth overall. The initial outreach was clear.",
  },
  {
    named: true, name: "Yash Lakhani", slug: "yash-lakhani",
    role: "Video Editor", company: "SWE Accelerator",
    linkedin: "https://www.linkedin.com/in/yashlakhani45/",
    quote: "Very smooth and professional.",
  },
  {
    named: false, name: "", slug: "",
    role: "Video Editor", company: "YAAS",
    linkedin: "",
    quote: "All good. No improvement needed.",
  },
];

export const MV_EXPERIENCE = ["Under 1 year", "1 to 3 years", "3 to 5 years", "5 years or more"];

export const MV_CSS = `
/* ---------- USP grid ---------- */
.v4 .mv-usps{ display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:20px; }
.v4 .mv-usp{ background:#fff; border:3px solid var(--ink); border-radius:20px; padding:26px 24px; box-shadow:var(--shadow-sm); }
.v4 .mv-uspic{ width:46px; height:46px; border:3px solid var(--ink); border-radius:14px; background:var(--cream);
  display:grid; place-items:center; margin-bottom:16px; }
.v4 .mv-usp h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:19px; letter-spacing:-0.02em; line-height:1.18; margin-bottom:9px; }
.v4 .mv-usp p{ font-size:14.5px; line-height:1.55; color:var(--ink-soft); }

/* ---------- paid assignment cards ---------- */
.v4 .mv-paid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; }
.v4 .mv-paidcard{ background:var(--sun-50); border:3.5px solid var(--ink); border-radius:22px; padding:26px 24px;
  box-shadow:var(--shadow-sm); display:flex; gap:16px; align-items:flex-start; }
.v4 .mv-paidic{ width:46px; height:46px; flex:none; border:3px solid var(--ink); border-radius:14px;
  background:var(--sun); display:grid; place-items:center; }
.v4 .mv-amt{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:30px; letter-spacing:-0.035em; line-height:1; margin-bottom:4px; }
.v4 .mv-paidrole{ font-size:10.5px; font-weight:700; letter-spacing:1.3px; text-transform:uppercase;
  color:var(--ink-soft); margin-bottom:10px; }
.v4 .mv-paidcard p{ font-size:14px; line-height:1.5; color:var(--ink-soft); }

/* ---------- arena ---------- */
.v4 .mv-arena{ background:var(--deep); border:3.5px solid var(--ink); border-radius:24px; box-shadow:var(--shadow);
  padding:clamp(28px,4vw,40px); display:grid; grid-template-columns:1.15fr .85fr; gap:clamp(24px,4vw,44px); align-items:center; }
@media (max-width:860px){ .v4 .mv-arena{ grid-template-columns:1fr; } }
.v4 .mv-arena h2{ color:#fff; font-size:clamp(26px,3.8vw,40px); margin-bottom:14px; }
.v4 .mv-arena h2 .it{ color:var(--sun); }
/* Scoped to the copy column, not a bare .mv-arena descendant rule. That
   selector also matched the paragraphs inside .mv-price, and at 0,2,2 it
   outranked .v4 .mv-pricebig at 0,2,0 - so the price card rendered lavender
   text on its own cream ground at 1.3:1. */
.v4 .mv-arenacopy > p{ font-size:15.5px; line-height:1.6; color:var(--lav); margin-bottom:22px; max-width:46ch; }
.v4 .mv-arenalist{ list-style:none; display:flex; flex-direction:column; gap:12px; }
.v4 .mv-arenalist li{ display:flex; gap:12px; align-items:flex-start; font-size:14.5px; line-height:1.5; color:var(--lav); }
.v4 .mv-arenalist li .ob-ic{ color:var(--sun); flex:none; margin-top:2px; }
.v4 .mv-price{ background:var(--paper); border:3px solid var(--ink); border-radius:20px; padding:28px 24px; text-align:center; }
.v4 .mv-pricebig{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:clamp(38px,5vw,52px); letter-spacing:-0.04em; line-height:1; }
.v4 .mv-priceper{ font-size:11.5px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase;
  color:var(--purple-ink); margin:8px 0 18px; }
.v4 .mv-pricenote{ font-size:13px; line-height:1.5; color:var(--ink-soft); }

/* ---------- opt-in row inside the form ---------- */
.v4 .mv-optin{ display:flex; gap:14px; align-items:flex-start; border:3px solid var(--ink); border-radius:18px;
  background:var(--sun-50); padding:18px 20px; cursor:pointer; }
.v4 .mv-optin input{ width:20px; height:20px; flex:none; margin-top:2px; accent-color:var(--purple); cursor:pointer; }
.v4 .mv-optin b{ display:block; font-size:14.5px; margin-bottom:3px; }
.v4 .mv-optin span{ font-size:13.5px; line-height:1.5; color:var(--ink-soft); }

/* ---------- testimonials ---------- */
.v4 .mv-quotes{ display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:20px; }
.v4 .mv-quote{ background:#fff; border:3px solid var(--ink); border-radius:22px; padding:26px 24px;
  box-shadow:var(--shadow-sm); display:flex; flex-direction:column; }
.v4 .mv-quote blockquote{ font-size:15px; line-height:1.6; color:var(--ink); margin-bottom:22px; }
.v4 .mv-who{ display:flex; align-items:center; gap:14px; margin-top:auto; padding-top:18px; border-top:2px solid var(--cream); }
.v4 .mv-face{ position:relative; width:46px; height:46px; flex:none; border:2.5px solid var(--ink); border-radius:50%;
  background:var(--lav); display:grid; place-items:center; overflow:hidden; }
.v4 .mv-face > svg{ color:var(--ink); opacity:.55; }
.v4 .mv-face img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.v4 .mv-whotext b{ display:block; font-family:var(--f-display); font-weight:800; font-size:15.5px; letter-spacing:-0.02em; }
.v4 .mv-whotext span{ font-size:12.5px; color:var(--ink-soft); }
.v4 .mv-li{ margin-left:auto; flex:none; width:30px; height:30px; border:2.5px solid var(--ink); border-radius:50%;
  background:var(--paper); display:grid; place-items:center; color:var(--ink); }
.v4 a.mv-li:hover{ background:var(--cream); }

/* ---------- arena action column ---------- */
.v4 .mv-price .btn{ width:100%; justify-content:center; margin-top:18px; }

/* ---------- ask a question ---------- */
.v4 .mv-ask{ display:grid; grid-template-columns:1.1fr .9fr; gap:clamp(22px,4vw,44px); align-items:center;
  background:var(--sun-50); border:3.5px solid var(--ink); border-radius:24px; box-shadow:var(--shadow);
  padding:clamp(28px,4vw,40px); }
@media (max-width:860px){ .v4 .mv-ask{ grid-template-columns:1fr; } }
.v4 .mv-ask h2{ font-size:clamp(24px,3.4vw,36px); margin-bottom:12px; }
.v4 .mv-ask p{ font-size:15.5px; line-height:1.6; color:var(--ink-soft); max-width:46ch; }
.v4 .mv-askacts{ display:flex; flex-direction:column; gap:12px; }
.v4 .mv-askacts .btn{ width:100%; justify-content:center; }

/* ---------- apply modal ---------- */
.v4 .mv-modal{ position:fixed; inset:0; z-index:200; background:rgba(26,22,20,.55);
  display:flex; align-items:flex-start; justify-content:center; padding:clamp(16px,4vw,48px); overflow-y:auto; }
.v4 .mv-modalin{ position:relative; width:100%; max-width:760px; background:#fff; border:3.5px solid var(--ink);
  border-radius:24px; box-shadow:var(--shadow); padding:clamp(24px,4vw,38px); }
.v4 .mv-x{ position:absolute; top:14px; right:14px; width:38px; height:38px; border:3px solid var(--ink);
  border-radius:50%; background:var(--paper); cursor:pointer; display:grid; place-items:center; }
.v4 .mv-x::before,.v4 .mv-x::after{ content:''; position:absolute; width:15px; height:3px; background:var(--ink); border-radius:2px; }
.v4 .mv-x::before{ transform:rotate(45deg); }
.v4 .mv-x::after{ transform:rotate(-45deg); }
.v4 .mv-x:hover{ background:var(--cream); }
.v4 .mv-modalhead{ margin-bottom:24px; padding-right:44px; }
.v4 .mv-modalhead h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:clamp(24px,3.4vw,30px); letter-spacing:-0.03em; margin-bottom:8px; }
.v4 .mv-modalhead p{ font-size:14.5px; line-height:1.55; color:var(--ink-soft); max-width:52ch; }

/* ---------- hero ---------- */
/* .hero h1 caps at 15ch for the homepage headline, which forces this one onto
   four lines. Wider measure, slightly smaller type, two lines. */
.v4 .mv-hero h1{ max-width:30ch; font-size:clamp(28px,5.4vw,70px); }

/* A running gradient on the number. Same animation as the nav .shine, but in
   purples only: that one passes through --sun, which measures about 1.8:1 on
   cream. Fine on a 13px nav link, unreadable at 74px. Every stop here clears
   4.5:1 on the hero ground. */
.v4 .mv-shine{
  background:linear-gradient(100deg,#8856F2 0%,#241247 24%,#6A2FD4 50%,#241247 76%,#8856F2 100%);
  background-size:320% 100%;
  -webkit-background-clip:text; background-clip:text; color:transparent;
  animation:v4shine 5s linear infinite;
}
@media (prefers-reduced-motion:reduce){ .v4 .mv-shine{ animation:none; background:none; color:var(--purple); } }
`;
