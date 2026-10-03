// Version 2 of the client home: everything on a centre axis, in a different
// typographic voice from v4.
//
// v4 is Fraunces + DM Sans, left weighted and deliberately irregular.
// v5 is Instrument Serif + Space Grotesk, symmetric and editorial. Serif display
// at large sizes with a wide measure reads as a magazine opener rather than a
// landing page, which is what centre alignment wants.
//
// Scoped under `.v5` so it can sit alongside `.v4` with no bleed.

export const V5_CSS = `
.v5{
  --paper:#FDFBF7; --ink:#141210; --ink-soft:#605850; --line:#E4DCD1;
  --purple:#7C4DF0; --clay:#D9542F; --sun:#EFBE35; --mint:#66D6A0;
  --f-display:'Instrument Serif',Georgia,serif;
  --f-ui:'Space Grotesk',system-ui,sans-serif;
  font-family:var(--f-ui); color:var(--ink); background:var(--paper);
  -webkit-font-smoothing:antialiased;
}
body:has(.v5){ background:#FDFBF7; }
.v5 *,.v5 *::before,.v5 *::after{ box-sizing:border-box; margin:0; padding:0; }
.v5 a{ text-decoration:none; color:inherit; }
.v5 img{ display:block; max-width:100%; }
.v5 button{ font:inherit; color:inherit; }

.v5 .disp{ font-family:var(--f-display); font-weight:400; letter-spacing:-0.015em; line-height:1.04; }
.v5 .it{ font-style:italic; }

/* one centre axis for the whole page */
.v5 section{ padding:96px 24px; text-align:center; border-bottom:1px solid var(--line); }
.v5 .in{ max-width:1080px; margin:0 auto; }
.v5 .narrow{ max-width:760px; margin-inline:auto; }

.v5 .eyebrow{ display:inline-block; font-size:11px; font-weight:600; text-transform:uppercase;
  letter-spacing:3px; color:var(--ink-soft); margin-bottom:22px; }
.v5 .eyebrow::before{ content:''; display:block; width:26px; height:1.5px; background:var(--clay);
  margin:0 auto 14px; }
.v5 h2{ font-family:var(--f-display); font-weight:400; font-size:clamp(34px,5vw,58px);
  letter-spacing:-0.02em; line-height:1.06; }
.v5 .lede{ font-size:16px; line-height:1.68; color:var(--ink-soft); max-width:60ch;
  margin:20px auto 0; }

.v5 .btn{ display:inline-flex; align-items:center; gap:10px; font-family:var(--f-ui); font-weight:600;
  font-size:15px; letter-spacing:.01em; padding:16px 34px; border:1.5px solid var(--ink);
  background:var(--ink); color:var(--paper); border-radius:2px; cursor:pointer;
  transition:background .2s, color .2s, transform .2s; }
.v5 .btn:hover{ background:transparent; color:var(--ink); transform:translateY(-2px); }
.v5 .btn.ghost{ background:transparent; color:var(--ink); }
.v5 .btn.ghost:hover{ background:var(--ink); color:var(--paper); }
.v5 .btn.sm{ font-size:13px; padding:11px 22px; }

/* ---------- nav ---------- */
.v5 .nav{ position:absolute; top:0; left:0; right:0; z-index:40; padding:26px 34px;
  display:flex; align-items:center; gap:20px; }
.v5 .nav .grow{ flex:1; }
.v5 .navlinks{ display:flex; align-items:center; gap:34px; }
.v5 .navlinks a{ font-size:13px; font-weight:500; letter-spacing:.04em; position:relative; white-space:nowrap; }
.v5 .navlinks a::after{ content:''; position:absolute; left:0; right:100%; bottom:-6px; height:1.5px;
  background:var(--ink); transition:right .3s ease; }
.v5 .navlinks a:hover::after{ right:0; }
@media (max-width:960px){ .v5 .nav{ padding:16px 18px; gap:12px; } .v5 .navlinks{ gap:18px; }
  .v5 .navlinks a{ font-size:12px; } .v5 .nav .btn{ font-size:11.5px; padding:9px 15px; } }
@media (max-width:700px){ .v5 .navlinks{ display:none; } }

/* ---------- hero ---------- */
.v5 .hero{ position:relative; min-height:100vh; display:flex; align-items:center; justify-content:center;
  text-align:center; padding:150px 24px 90px; overflow:hidden; border-bottom:1px solid var(--line); }
.v5 .hero-glow{ position:absolute; left:50%; top:46%; width:min(1100px,150vw); height:min(1100px,150vw);
  transform:translate(-50%,-50%); z-index:0; border-radius:50%;
  background:radial-gradient(circle, rgba(124,77,240,.09) 0%, rgba(217,84,47,.05) 42%, transparent 68%); }
/* concentric rings on the same axis as the type, so the symmetry is the design */
.v5 .hero-rings{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:0;
  width:min(980px,140vw); height:min(980px,140vw); border-radius:50%;
  background:repeating-radial-gradient(circle at 50% 50%, transparent 0 68px, rgba(20,18,16,.045) 68px 69px); }
.v5 .hero-in{ position:relative; z-index:5; max-width:1000px; }
.v5 .hero h1{ font-size:clamp(46px,8vw,104px); letter-spacing:-0.025em; }
.v5 .hero h1 .it{ color:var(--clay); }
.v5 .rule{ width:1px; height:52px; background:var(--line); margin:0 auto 30px; }
.v5 .hero-actions{ margin-top:44px; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
@media (max-width:760px){ .v5 .hero{ min-height:auto; padding:124px 18px 64px; } }

/* ---------- clients ---------- */
.v5 .rail-sec{ padding-inline:0; overflow:hidden; background:#F7F2EA; }
.v5 .rail-sec .in{ padding-inline:24px; }
.v5 .marquee{ margin-top:52px; overflow:hidden; }
.v5 .track{ display:flex; gap:0; width:max-content; animation:v5roll 62s linear infinite; }
.v5 .marquee:hover .track{ animation-play-state:paused; }
@keyframes v5roll{ to{ transform:translateX(-50%); } }
/* no cards, no borders: a single continuous band of faces and marks, which is the
   quieter counterpart to v4's heavy framed rail */
.v5 .ucard{ width:232px; flex:none; padding:0 26px; text-align:center;
  border-right:1px solid var(--line); }
.v5 .cstage{ height:150px; display:flex; align-items:center; justify-content:center; overflow:hidden;
  margin-bottom:20px; }
.v5 .cstage img.photo{ width:118px; height:118px; object-fit:cover; border-radius:50%; }
.v5 .cstage img.bleed{ width:104px; height:104px; object-fit:cover; border-radius:14px; }
.v5 .cstage img.fit{ max-width:132px; max-height:66px; object-fit:contain;
  filter:grayscale(1) contrast(.85); opacity:.72; transition:filter .3s, opacity .3s; }
.v5 .ucard:hover .cstage img.fit{ filter:none; opacity:1; }
.v5 .uname{ font-family:var(--f-display); font-size:21px; letter-spacing:-0.01em; line-height:1.15; }
.v5 .udesc{ font-size:11.5px; line-height:1.5; color:var(--ink-soft); margin-top:8px; }
.v5 .ugeo{ display:block; font-size:9.5px; font-weight:600; text-transform:uppercase;
  letter-spacing:2px; color:var(--clay); margin-top:12px; }
@media (max-width:560px){ .v5 .ucard{ width:196px; padding:0 18px; } }

/* ---------- engagement ---------- */
.v5 .artgrid{ display:grid; grid-template-columns:repeat(3,1fr); gap:0; margin-top:56px;
  border-top:1px solid var(--line); }
.v5 .artcard{ padding:44px 30px; border-right:1px solid var(--line); border-bottom:1px solid var(--line);
  display:flex; flex-direction:column; align-items:center; transition:background .25s; }
.v5 .artcard:last-child{ border-right:none; }
.v5 .artcard:hover{ background:#F7F2EA; }
.v5 .artframe{ width:100%; max-width:250px; margin-bottom:26px; }
.v5 .art{ display:block; width:100%; height:auto; }
.v5 .artno{ font-family:var(--f-display); font-size:15px; color:var(--clay); letter-spacing:.16em; }
.v5 .artcard h3{ font-family:var(--f-display); font-weight:400; font-size:26px; letter-spacing:-0.015em;
  line-height:1.14; margin-top:12px; }
.v5 .artcard h3 em{ font-style:italic; color:var(--clay); }
.v5 .artcard p{ font-size:13.5px; line-height:1.68; color:var(--ink-soft); margin-top:14px; flex:1; }
.v5 .forwho{ display:inline-block; margin-top:20px; font-size:10.5px; font-weight:600;
  text-transform:uppercase; letter-spacing:1.8px; color:var(--ink); border-top:1px solid var(--line);
  padding-top:14px; }
@media (max-width:940px){ .v5 .artgrid{ grid-template-columns:1fr; }
  .v5 .artcard{ border-right:none; } }

/* ---------- case studies ---------- */
.v5 .cs-tabs{ display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-top:44px; }
.v5 .cs-tab{ display:flex; align-items:center; gap:10px; cursor:pointer; background:transparent;
  border:1.5px solid var(--line); border-radius:999px; padding:8px 18px 8px 8px;
  transition:border-color .2s, background .2s; }
.v5 .cs-tab img{ width:32px; height:32px; border-radius:50%; object-fit:cover; }
.v5 .cs-tab span{ font-size:13px; font-weight:500; }
.v5 .cs-tab:hover{ border-color:var(--ink); }
.v5 .cs-tab[aria-selected="true"]{ background:var(--ink); border-color:var(--ink); color:var(--paper); }

.v5 .cs-panel{ margin-top:48px; max-width:820px; margin-inline:auto; }
.v5 .cs-panel h3{ font-family:var(--f-display); font-weight:400; font-size:clamp(30px,4.4vw,46px);
  letter-spacing:-0.02em; line-height:1.06; }
.v5 .cs-panel .sub{ font-size:14px; line-height:1.66; color:var(--ink-soft); margin:14px auto 0; max-width:56ch; }
.v5 .cs-field{ margin-top:38px; }
.v5 .cs-field b{ display:block; font-size:10px; font-weight:600; text-transform:uppercase;
  letter-spacing:2.6px; color:var(--clay); margin-bottom:12px; }
.v5 .cs-field p{ font-size:16px; line-height:1.72; color:var(--ink); max-width:60ch; margin-inline:auto; }
.v5 .cs-results{ display:grid; grid-template-columns:repeat(3,1fr); gap:0; margin-top:16px;
  border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.v5 .cs-res{ padding:26px 16px; border-right:1px solid var(--line); }
.v5 .cs-res:last-child{ border-right:none; }
.v5 .cs-res .n{ font-family:var(--f-display); font-size:31px; letter-spacing:-0.02em; line-height:1; }
.v5 .cs-res .l{ font-size:11.5px; line-height:1.5; color:var(--ink-soft); margin-top:10px; }
@media (max-width:760px){ .v5 .cs-results{ grid-template-columns:1fr; }
  .v5 .cs-res{ border-right:none; border-bottom:1px solid var(--line); } }

/* ---------- feedback ---------- */
.v5 .fb-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:0; margin-top:52px;
  border-top:1px solid var(--line); }
.v5 .fb-card{ position:relative; padding:40px 30px; border-right:1px solid var(--line);
  border-bottom:1px solid var(--line); display:flex; flex-direction:column; align-items:center; }
.v5 .fb-card:nth-child(3n){ border-right:none; }
.v5 .fb-card .qm{ font-family:var(--f-display); font-style:italic; font-size:52px; line-height:.7;
  color:var(--line); margin-bottom:20px; }
.v5 .fb-card .q{ font-family:var(--f-display); font-size:19px; line-height:1.48; letter-spacing:-0.01em;
  color:var(--ink); flex:1; }
.v5 .fb-who{ margin-top:26px; padding-top:20px; border-top:1px solid var(--line); width:100%; }
.v5 .fb-who img{ width:44px; height:44px; border-radius:50%; object-fit:cover; margin:0 auto 12px; }
.v5 .fb-who .n{ font-size:13.5px; font-weight:600; }
.v5 .fb-who .r{ font-size:11.5px; color:var(--ink-soft); margin-top:3px; }
.v5 .dummy{ position:absolute; top:14px; right:14px; background:#D92D20; color:#fff; font-size:8.5px;
  font-weight:700; letter-spacing:1.2px; padding:3px 8px; border-radius:2px; }
@media (max-width:900px){ .v5 .fb-grid{ grid-template-columns:1fr; }
  .v5 .fb-card{ border-right:none; } }

.v5 .slot{ border:1px dashed var(--line); display:flex; align-items:center; justify-content:center;
  color:var(--ink-soft); font-size:11px; font-weight:600; }
.v5 .note{ margin:44px auto 0; display:flex; align-items:flex-start; gap:11px; text-align:left;
  border:1px solid var(--line); background:#FBF6ED; padding:16px 20px; font-size:12.5px;
  line-height:1.6; max-width:70ch; border-radius:3px; color:var(--ink-soft); }

/* ---------- cta ---------- */
.v5 .band{ background:var(--ink); color:var(--paper); padding:120px 24px; border-bottom:none; }
.v5 .band h2{ font-size:clamp(38px,6vw,72px); }
.v5 .band h2 .it{ color:#E8A87C; }
.v5 .band p{ font-size:16px; line-height:1.68; color:#A69A8D; margin:22px auto 0; max-width:52ch; }
.v5 .band .rule{ background:#3A342E; }
.v5 .band .btn{ background:var(--paper); color:var(--ink); border-color:var(--paper); margin-top:40px; }
.v5 .band .btn:hover{ background:transparent; color:var(--paper); }

.v5 .foot{ background:var(--ink); color:#A69A8D; padding:0 24px 44px; text-align:center; }
.v5 .foot .in{ border-top:1px solid #2C2721; padding-top:52px; }
.v5 .f-line{ font-family:var(--f-display); font-style:italic; font-size:clamp(20px,2.8vw,30px);
  margin-top:26px; color:var(--paper); letter-spacing:-0.01em; }
.v5 .f-links{ display:flex; justify-content:center; gap:30px; flex-wrap:wrap; margin-top:36px; }
.v5 .f-links a{ font-size:10.5px; font-weight:600; text-transform:uppercase; letter-spacing:2.2px; }
.v5 .f-links a:hover{ color:#fff; }
.v5 .f-bot{ margin-top:44px; font-size:10px; letter-spacing:1.8px; text-transform:uppercase; color:#605850; }

@media (prefers-reduced-motion:reduce){ .v5 *{ animation:none !important; transition:none !important; } }
`;
