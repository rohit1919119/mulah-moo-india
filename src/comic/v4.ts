// The v4 design system, shared by the client home ("/") and the talent landing
// ("/moo-talent"). Everything is scoped under `.v4` so it can coexist with the
// older COMIC_CSS while pages are migrated one at a time.
//
// Two deliberate departures from v3:
//   - Fraunces replaces Bricolage for display. Its SOFT and WONK axes let the
//     letterforms go irregular, which is what stops headlines reading generic.
//   - Warm cream ground and a warm black, instead of #FFF on #111. Pure white
//     and pure-ish black are most of what made the old page feel clinical.

export const V4_CSS = `
.v4{
  /* FOUR COLOURS, plus one accent. Everything else on this page is a tint of one
     of them, never a new hue.
       1 paper   warm cream ground
       2 ink     warm black, all text and every border
       3 purple  the brand, the only chromatic lead
       4 deep    purple at grounding strength, used instead of near black
       + sun     the single warm accent, reserved for moments that must survive
                 next to purple: the hero marker and the stamp centre
     Adding a sixth hue is what made this page look busy. Do not reintroduce
     clay, mint, rose or sky. */
  --paper:#FFFCF7; --ink:#1A1614; --purple:#8856F2; --deep:#241247; --sun:#F5C542;

  /* tints, all derived from the five above */
  --ink-soft:#5B5147;
  --cream:#F1E7FF;   /* purple at 8%  */
  --lav:#E3D6FF;     /* purple at 18% */
  --sun-50:#FFF6DE;  /* sun at 12%    */
  /* white on --purple measures 4.51:1, which clears AA only just; at 10px
     uppercase that is too thin, so small white text uses this darker step */
  --purple-ink:#6A2FD4;
  --shadow:7px 7px 0 var(--ink); --shadow-sm:4px 4px 0 var(--ink);
  --f-display:'Fraunces',Georgia,serif;
  --f-ui:'DM Sans',system-ui,sans-serif;
  font-family:var(--f-ui); color:var(--ink); background:var(--paper);
  -webkit-font-smoothing:antialiased;
}
/* No global overflow-x clip here on purpose. Every element that overruns the
   viewport (.hero blobs, .ticker, .marquee) clips itself, and putting
   overflow-x on body would make body its own full height scroll container. */
body:has(.v4){ background:#FFFCF7; }
.v4 *,.v4 *::before,.v4 *::after{ box-sizing:border-box; margin:0; padding:0; }
.v4 a{ text-decoration:none; color:inherit; }
.v4 img{ display:block; max-width:100%; }
.v4 button{ font:inherit; color:inherit; }

/* SOFT rounds the terminals, WONK lets the italics go irregular. Together they
   are the difference between "a serif" and a face with a hand in it. */
.v4 .disp{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; letter-spacing:-0.028em; line-height:1.02; }
.v4 .it{ font-family:var(--f-display); font-style:italic; font-variation-settings:'SOFT' 90,'WONK' 1;
  font-weight:500; letter-spacing:-0.01em; }

.v4 .btn{ display:inline-flex; align-items:center; gap:10px; font-family:var(--f-ui); font-weight:700;
  font-size:clamp(14px,1.5vw,16px); padding:clamp(13px,1.6vw,15px) clamp(22px,3vw,30px); border:3px solid var(--ink); background:var(--purple); color:#fff;
  box-shadow:var(--shadow); cursor:pointer; border-radius:999px;
  transition:transform .14s cubic-bezier(.34,1.56,.64,1), box-shadow .14s; }
.v4 .btn:hover{ transform:translate(3px,3px) rotate(-1deg); box-shadow:2px 2px 0 var(--ink); }
.v4 .btn.sm{ font-size:13.5px; padding:10px 20px; box-shadow:var(--shadow-sm); }
.v4 .btn.clay{ background:var(--purple); }
.v4 .btn.paper{ background:var(--paper); color:var(--ink); }
.v4 .btn.ghost{ background:var(--paper); color:var(--ink); }
.v4 .btn.ghost:hover{ background:var(--cream); }
.v4 .btn:disabled{ opacity:.55; cursor:default; transform:none; }

/* ---------- monthly intake ---------- */
.v4 .slotband{ background:var(--deep); color:var(--paper); padding:clamp(52px,8vw,86px) clamp(18px,4vw,24px); }
.v4 .slotband-in{ max-width:1140px; margin:0 auto; display:grid; grid-template-columns:1fr auto;
  gap:clamp(28px,5vw,56px); align-items:center; }
.v4 .slot-eyebrow{ display:inline-block; border:2.5px solid var(--purple); background:rgba(136,86,242,.18);
  color:#C9AEFF; border-radius:999px; padding:5px 14px; font-size:10.5px; font-weight:700;
  text-transform:uppercase; letter-spacing:1.6px; margin-bottom:16px; }
.v4 .slot-copy h2{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:clamp(28px,4.4vw,48px); letter-spacing:-0.035em; line-height:1.03; }
.v4 .slot-copy h2 .it{ color:#C9AEFF; }
.v4 .slot-copy p{ font-size:15px; line-height:1.62; color:#B3A4D6; margin-top:16px; max-width:48ch; }
.v4 .slot-side{ display:flex; flex-direction:column; align-items:flex-start; gap:16px; }
/* one tile per slot: scarcity you can see at a glance rather than read */
.v4 .slot-tiles{ display:flex; gap:10px; }
.v4 .slot-tiles .tile{ width:clamp(52px,9vw,64px); height:clamp(52px,9vw,64px); border:3.5px solid var(--paper);
  border-radius:16px; display:flex; align-items:center; justify-content:center; background:transparent; }
.v4 .slot-tiles .tile i{ width:13px; height:13px; border-radius:50%; background:var(--paper); display:block; }
.v4 .slot-tiles .tile.taken{ background:var(--purple); border-color:var(--purple); }
/* the lock fills its tile: at a glance the taken slots should read as shut,
   not as a small badge sitting inside an otherwise empty box. Sized in CSS,
   which overrides the width and height attributes the Icon component sets. */
.v4 .slot-tiles .tile svg{ width:84%; height:84%; display:block; }
.v4 .slot-count{ font-size:12.5px; font-weight:700; text-transform:uppercase; letter-spacing:1.6px; color:#C9AEFF; }
.v4 .slotband .btn{ background:var(--paper); color:var(--ink); box-shadow:6px 6px 0 rgba(0,0,0,.35); }
.v4 .slotband .btn:hover{ box-shadow:2px 2px 0 rgba(0,0,0,.35); }
@media (max-width:860px){ .v4 .slotband-in{ grid-template-columns:1fr; }
  .v4 .slot-side{ align-items:stretch; } .v4 .slotband .btn{ justify-content:center; } }

/* ---------- pricing dialog ---------- */
.v4 .pf{ position:fixed; inset:0; z-index:70; background:rgba(36,18,71,.62);
  backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px);
  display:flex; align-items:flex-start; justify-content:center;
  padding:clamp(16px,4vw,48px); overflow-y:auto; animation:pfIn .2s ease both; }
@keyframes pfIn{ from{ opacity:0; } to{ opacity:1; } }
.v4 .pf-in{ position:relative; width:min(660px,100%); background:var(--paper);
  border:4px solid var(--ink); border-radius:24px; box-shadow:var(--shadow);
  padding:clamp(26px,4vw,40px); animation:pfUp .26s cubic-bezier(.32,.72,0,1) both; }
@keyframes pfUp{ from{ transform:translateY(16px); } to{ transform:translateY(0); } }
.v4 .pf-x{ position:absolute; top:16px; right:16px; width:38px; height:38px; cursor:pointer;
  border:3px solid var(--ink); border-radius:12px; background:var(--paper); padding:0; }
.v4 .pf-x:hover{ background:var(--purple); }
.v4 .pf-x span{ position:absolute; left:50%; top:50%; width:16px; height:3px; border-radius:2px; background:var(--ink); }
.v4 .pf-x:hover span{ background:#fff; }
.v4 .pf-x span:nth-child(1){ transform:translate(-50%,-50%) rotate(45deg); }
.v4 .pf-x span:nth-child(2){ transform:translate(-50%,-50%) rotate(-45deg); }
.v4 .pf-eyebrow{ display:inline-block; background:var(--purple-ink); color:#fff; border-radius:999px;
  padding:4px 12px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.6px; }
.v4 .pf-head h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:clamp(25px,3.6vw,33px); letter-spacing:-0.035em; margin-top:12px; }
.v4 .pf-head p{ font-size:14px; line-height:1.6; color:var(--ink-soft); margin-top:9px; max-width:52ch; }
.v4 .pf form{ margin-top:26px; display:flex; flex-direction:column; gap:16px; }
.v4 .pf-row{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.v4 .pf label{ display:flex; flex-direction:column; gap:7px; }
.v4 .pf label > span{ font-size:11.5px; font-weight:700; text-transform:uppercase; letter-spacing:1.3px; }
.v4 .pf label > span i{ font-style:normal; font-weight:500; text-transform:none;
  letter-spacing:0; color:var(--ink-soft); }
.v4 .pf input,.v4 .pf textarea{ font:inherit; font-size:15px; color:var(--ink); background:#fff;
  border:2.5px solid var(--ink); border-radius:12px; padding:12px 14px; width:100%; resize:vertical; }
.v4 .pf input:focus,.v4 .pf textarea:focus{ outline:none; border-color:var(--purple);
  box-shadow:0 0 0 3px rgba(136,86,242,.22); }
.v4 .pf-chips{ display:flex; flex-wrap:wrap; gap:8px; }
.v4 .pf-chips button{ cursor:pointer; border:2.5px solid var(--ink); background:var(--paper);
  border-radius:999px; padding:8px 15px; font-size:13px; font-weight:600; transition:background .15s, color .15s; }
.v4 .pf-chips button:hover{ background:var(--cream); }
.v4 .pf-chips button.on{ background:var(--ink); color:var(--paper); }
.v4 .pf-err{ font-size:13.5px; font-weight:600; color:#B3241C; }
.v4 .pf-submit{ align-self:flex-start; margin-top:4px; }
.v4 .pf-done{ text-align:center; padding:20px 0 8px; }
.v4 .pf-tick{ display:inline-flex; align-items:center; justify-content:center; width:64px; height:64px;
  border:3.5px solid var(--ink); border-radius:50%; background:var(--purple); margin-bottom:20px; }
.v4 .pf-done h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:clamp(24px,3.4vw,31px); letter-spacing:-0.035em; }
.v4 .pf-done p{ font-size:14.5px; line-height:1.6; color:var(--ink-soft); margin:12px auto 26px; max-width:44ch; }
@media (max-width:600px){ .v4 .pf-row{ grid-template-columns:1fr; }
  .v4 .pf-submit{ align-self:stretch; justify-content:center; } }

.v4 .in{ max-width:1140px; margin:0 auto; }
.v4 section{ padding:clamp(64px,9vw,118px) clamp(18px,4vw,24px); position:relative; }

/* section headers sit on a baseline with an oversized outlined index numeral,
   rather than the centred chip + centred heading every template ships with */
.v4 .shead{ display:flex; align-items:flex-end; gap:22px; margin-bottom:10px; }
.v4 .sno{ font-family:var(--f-display); font-variation-settings:'SOFT' 80,'WONK' 1; font-weight:800;
  font-size:clamp(52px,8vw,104px); line-height:.76; color:transparent;
  -webkit-text-stroke:2.5px var(--purple); flex:none; }
.v4 .shead h2{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:clamp(28px,4.4vw,50px); letter-spacing:-0.03em; line-height:1.0; }
.v4 .slede{ font-size:15px; line-height:1.6; color:var(--ink-soft); max-width:52ch; margin-top:16px; }
@media (max-width:640px){ .v4 .shead{ gap:14px; } }

/* ---------- nav ---------- */
.v4 .nav{ position:absolute; top:0; left:0; right:0; z-index:40;
  padding:clamp(14px,2.4vw,22px) clamp(16px,3vw,30px);
  display:flex; align-items:center; gap:clamp(12px,2vw,20px); }
.v4 .nav .grow{ flex:1; }
/* CSS beats the height attribute on the svg, so the mark scales with the viewport */
.v4 .navlogo svg{ height:clamp(18px,4.4vw,23px); width:auto; }
.v4 .navlinks{ display:flex; align-items:center; gap:clamp(16px,2.6vw,28px); }
.v4 .navlinks a{ font-family:var(--f-ui); font-weight:600; font-size:clamp(13px,1.3vw,15px);
  position:relative; white-space:nowrap; }
.v4 .navlinks a::after{ content:''; position:absolute; left:0; right:100%; bottom:-5px; height:2.5px;
  background:var(--purple); transition:right .28s ease; }
.v4 .navlinks a:hover::after{ right:0; }
.v4 .navlinks a.grad::after{ display:none; }
.v4 .shine{ background:linear-gradient(100deg,#8856F2 0%,#F5C542 26%,#8856F2 52%,#F5C542 78%,#8856F2 100%);
  background-size:320% 100%; -webkit-background-clip:text; background-clip:text; color:transparent;
  animation:v4shine 5s linear infinite; }
@keyframes v4shine{ to{ background-position:320% 0; } }

/* ---------- mobile menu ---------- */
.v4 .navtoggle{ display:none; width:46px; height:46px; flex:none; padding:0; cursor:pointer;
  border:3px solid var(--ink); border-radius:14px; background:var(--paper);
  box-shadow:var(--shadow-sm); position:relative;
  transition:transform .14s cubic-bezier(.34,1.56,.64,1), box-shadow .14s, background .18s; }
.v4 .navtoggle:hover{ transform:translate(2px,2px); box-shadow:2px 2px 0 var(--ink); }
.v4 .navtoggle span{ position:absolute; left:50%; width:20px; height:3px; border-radius:2px;
  background:var(--ink); transform:translateX(-50%);
  transition:transform .28s cubic-bezier(.65,0,.35,1), opacity .18s; }
.v4 .navtoggle span:nth-child(1){ top:14px; }
.v4 .navtoggle span:nth-child(2){ top:21px; }
.v4 .navtoggle span:nth-child(3){ top:28px; }
/* three bars fold into a cross */
.v4 .navtoggle.on{ background:var(--purple); }
.v4 .navtoggle.on span{ background:#fff; }
.v4 .navtoggle.on span:nth-child(1){ transform:translateX(-50%) translateY(7px) rotate(45deg); }
.v4 .navtoggle.on span:nth-child(2){ opacity:0; transform:translateX(-50%) scaleX(.2); }
.v4 .navtoggle.on span:nth-child(3){ transform:translateX(-50%) translateY(-7px) rotate(-45deg); }

.v4 .navsheet{ position:fixed; inset:0; z-index:60; background:rgba(36,18,71,.55);
  backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px);
  opacity:0; transition:opacity .22s ease; }
.v4 .navsheet.on{ opacity:1; }
.v4 .navsheet-in{ position:absolute; top:0; right:0; width:min(84vw,340px); height:100%;
  background:var(--paper); border-left:4px solid var(--ink);
  padding:96px clamp(22px,6vw,32px) 32px; display:flex; flex-direction:column; gap:6px;
  transform:translateX(100%); transition:transform .3s cubic-bezier(.32,.72,0,1); overflow-y:auto; }
.v4 .navsheet.on .navsheet-in{ transform:translateX(0); }
.v4 .navsheet-in a{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:clamp(24px,7vw,31px); letter-spacing:-0.03em; padding:14px 0;
  border-bottom:2.5px dashed rgba(26,22,20,.18); }
.v4 .navsheet-cta{ margin-top:26px; }
.v4 .navsheet-cta .btn{ width:100%; justify-content:center; font-size:15px; padding:15px 24px; }
.v4 .navsheet-cta a{ font-family:var(--f-ui); font-size:15px; border-bottom:none; padding:0; }

@media (max-width:880px){
  .v4 .navlinks{ display:none; }
  .v4 .nav .navcta{ display:none; }
  .v4 .navtoggle{ display:block; }
  .v4 .nav .grow{ display:none; }
  .v4 .nav{ justify-content:space-between; }
}
@media (prefers-reduced-motion:reduce){
  .v4 .navsheet-in{ transition:none; }
}

/* ---------- hero ---------- */
.v4 .hero{ position:relative; min-height:100svh; display:flex; align-items:center;
  padding:clamp(104px,14vw,130px) clamp(18px,4vw,24px) clamp(56px,8vw,70px); overflow:hidden; }
.v4 .blob{ position:absolute; border-radius:50%; filter:blur(70px); opacity:.5; z-index:0; }
.v4 .b1{ width:520px; height:520px; background:var(--lav); top:-120px; right:-90px; }
.v4 .b2{ width:420px; height:420px; background:var(--lav); bottom:-140px; left:-110px; }
.v4 .b3{ width:330px; height:330px; background:var(--sun-50); top:36%; right:26%; }
.v4 .grid-bg{ position:absolute; inset:0; z-index:0; opacity:.07;
  background-image:linear-gradient(#1A1614 1px, transparent 1px), linear-gradient(90deg,#1A1614 1px, transparent 1px);
  background-size:78px 78px;
  -webkit-mask-image:radial-gradient(circle at 30% 45%, #000 0%, transparent 68%);
  mask-image:radial-gradient(circle at 30% 45%, #000 0%, transparent 68%); }
.v4 .hero-in{ position:relative; z-index:5; max-width:1140px; margin:0 auto; width:100%; }
.v4 .hero h1{ font-size:clamp(40px,7.4vw,92px); max-width:15ch; }
/* the marker is drawn behind the words rather than as a solid block, so it reads
   as a hand annotating a page instead of a CSS highlight */
.v4 .mark{ position:relative; display:inline-block; white-space:nowrap; }
.v4 .mark::before{ content:''; position:absolute; left:-10px; right:-10px; top:14%; bottom:8%;
  background:var(--sun); transform:rotate(-1.6deg) skewX(-9deg); z-index:-1;
  border-radius:4px 14px 6px 12px; }
.v4 .mark.rose::before{ background:var(--sun); }
.v4 .hero-sub{ font-size:17px; line-height:1.6; color:var(--ink-soft); max-width:46ch; margin-top:26px; }
.v4 .hero-actions{ margin-top:34px; display:flex; align-items:center; gap:20px; flex-wrap:wrap; }
.v4 .hero-meta{ margin-top:20px; font-size:13px; font-weight:500; color:var(--ink-soft); }
.v4 .points{ display:flex; flex-wrap:wrap; gap:11px; margin-top:26px; }
.v4 .point{ display:inline-flex; align-items:center; gap:9px; border:2.5px solid var(--ink);
  background:var(--paper); padding:8px 16px; border-radius:999px; font-size:13.5px; font-weight:600; }
.v4 .stamp{ position:absolute; right:4%; top:22%; z-index:6; width:150px; height:150px;
  animation:v4spin 22s linear infinite; }
.v4 .stamp text{ font-family:var(--f-ui); font-size:11.2px; font-weight:700; letter-spacing:2.6px;
  fill:var(--ink); text-transform:uppercase; }
@keyframes v4spin{ to{ transform:rotate(360deg); } }
@media (max-width:1080px){ .v4 .stamp{ display:none; } }
@media (max-width:760px){ .v4 .hero{ min-height:auto; } .v4 .hero h1{ max-width:none; } }

/* ---------- ticker ---------- */
/* the strip is scaled past the viewport so the tilt has no bald corners, so the
   wrapper has to clip it or the page gains a horizontal scroll */
.v4 .ticker-wrap{ overflow:hidden; }
.v4 .ticker{ background:var(--purple); color:#fff; padding:15px 0; overflow:hidden;
  transform:rotate(-1.1deg) scale(1.04); margin:10px 0;
  border-top:3px solid var(--ink); border-bottom:3px solid var(--ink); }
.v4 .tick-track{ display:flex; gap:34px; width:max-content; animation:v4roll 30s linear infinite; }
.v4 .tick-track span{ font-family:var(--f-display); font-variation-settings:'SOFT' 70,'WONK' 1;
  font-weight:700; font-size:clamp(15px,2.2vw,19px); white-space:nowrap; display:flex; align-items:center; gap:34px; }
.v4 .tick-track i{ color:var(--sun); font-style:normal; }
@keyframes v4roll{ to{ transform:translateX(-50%); } }

/* ---------- client rail ---------- */
.v4 .rail-sec{ background:var(--cream); overflow:hidden; padding-inline:0; }
.v4 .rail-sec .in{ padding-inline:24px; }
.v4 .marquee{ margin-top:56px; overflow:hidden; }
.v4 .track{ display:flex; gap:clamp(14px,2.4vw,22px); width:max-content; padding:14px clamp(18px,4vw,24px) 20px;
  animation:v4roll 64s linear infinite; }

.v4 .ucard{ width:clamp(232px,74vw,296px); flex:none; display:grid; grid-template-columns:38px 1fr;
  border:3.5px solid var(--ink); box-shadow:var(--shadow); background:var(--paper);
  overflow:hidden; border-radius:18px; transition:transform .25s cubic-bezier(.34,1.4,.64,1); }
.v4 .ucard:hover{ transform:translateY(-7px) rotate(.6deg); }
/* the spine carries the icon and the vertical label. it is what makes a bare logo
   card feel authored rather than dropped in */
.v4 .spine{ border-right:3.5px solid var(--ink); display:flex; flex-direction:column;
  align-items:center; justify-content:space-between; padding:11px 0 13px; gap:8px; }
.v4 .spine svg{ width:17px; height:17px; flex:none; }
.v4 .spine .vlabel{ writing-mode:vertical-rl; transform:rotate(180deg); font-size:9.5px;
  font-weight:700; letter-spacing:2.2px; text-transform:uppercase; }
.v4 .spine .dot{ width:8px; height:8px; border:2.5px solid var(--ink); border-radius:50%;
  background:var(--paper); flex:none; }
.v4 .ubody{ min-width:0; display:flex; flex-direction:column; }
.v4 .stage{ height:clamp(158px,44vw,206px); display:flex; align-items:center; justify-content:center;
  overflow:hidden; border-bottom:3.5px solid var(--ink); }
.v4 .stage img.photo{ width:100%; height:100%; object-fit:cover; }
/* a logo that ships on its own black square fills the stage, so the card reads as
   a black card with the mark floating in it rather than a pasted-on square */
.v4 .stage img.bleed{ width:100%; height:100%; object-fit:cover; }
.v4 .stage img.fit{ width:70%; max-height:58%; object-fit:contain; }
.v4 .uband{ padding:15px 16px 17px; flex:1; }
.v4 .uname{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:20px; letter-spacing:-0.025em; line-height:1.1; }
.v4 .utype{ display:inline-block; margin-top:8px; border:2px solid var(--purple); background:var(--cream);
  color:#4A1FA8; border-radius:999px; padding:2px 9px; font-size:9px; font-weight:700;
  text-transform:uppercase; letter-spacing:1.3px; }
.v4 .udesc{ font-size:11.5px; line-height:1.45; color:var(--ink-soft); margin-top:8px; }


/* ---------- live briefs (talent page) ---------- */
.v4 .brief{ width:clamp(224px,72vw,262px); flex:none; border:3.5px solid var(--ink); box-shadow:var(--shadow);
  border-radius:18px; background:var(--paper); padding:18px; display:flex; flex-direction:column;
  gap:16px; min-height:196px; transition:transform .25s cubic-bezier(.34,1.4,.64,1); }
.v4 .brief:hover{ transform:translateY(-7px) rotate(-.6deg); }
.v4 .brief-top{ display:flex; align-items:center; justify-content:space-between; gap:10px; }
/* the sheet supplies an arbitrary tint per brief; override it so the talent page
   cannot drift off the five colour palette */
.v4 .brief-ic{ width:40px; height:40px; border:2.5px solid var(--ink); border-radius:12px;
  display:flex; align-items:center; justify-content:center; flex:none;
  background:var(--purple) !important; }
.v4 .brief-client{ font-size:11.5px; font-weight:600; color:var(--ink-soft); }
.v4 .brief-role{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:19px; letter-spacing:-0.025em; line-height:1.12; margin-top:4px; }
.v4 .brief-foot{ display:flex; align-items:center; justify-content:space-between; gap:10px;
  margin-top:auto; border-top:2.5px solid var(--ink); padding-top:13px; }
.v4 .pay{ font-family:var(--f-display); font-variation-settings:'SOFT' 70,'WONK' 1;
  font-weight:800; font-size:20px; letter-spacing:-0.03em; }
.v4 .per{ font-size:11px; color:var(--ink-soft); }
.v4 .live{ display:inline-flex; align-items:center; gap:6px; font-size:10px; font-weight:700;
  text-transform:uppercase; letter-spacing:1.2px; border:2.5px solid var(--ink);
  border-radius:999px; padding:3px 10px; background:var(--sun); }
.v4 .live i{ width:7px; height:7px; border-radius:50%; background:var(--ink); display:block; }

/* ---------- illustrated engagement cards ---------- */
/* stretch, not start: equal height cards are what let margin-top:auto line the
   three Best for blocks up on one baseline */
.v4 .artgrid{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:60px; align-items:stretch; }
.v4 .artcard{ border:3.5px solid var(--ink); border-radius:22px; overflow:hidden; background:var(--paper);
  box-shadow:var(--shadow); display:flex; flex-direction:column;
  transition:transform .22s cubic-bezier(.34,1.4,.64,1); }
.v4 .artcard:nth-child(1){ transform:rotate(-.6deg); }
.v4 .artcard:nth-child(2){ transform:rotate(.4deg); }
.v4 .artcard:nth-child(3){ transform:rotate(-.3deg); }
.v4 .artcard:hover{ transform:rotate(0deg) translateY(-6px); }
.v4 .artframe{ padding:clamp(12px,2.4vw,16px) clamp(12px,2.4vw,16px) 0; }
.v4 .art{ display:block; width:100%; height:auto; }
.v4 .artbody{ padding:clamp(18px,3vw,20px) clamp(18px,3vw,22px) clamp(20px,3.4vw,24px); display:flex; flex-direction:column; flex:1; }
.v4 .arttop{ display:flex; align-items:baseline; gap:11px; }
.v4 .artno{ display:block; font-family:var(--f-display); font-variation-settings:'SOFT' 80,'WONK' 1;
  font-weight:800; font-size:26px; line-height:1; color:transparent;
  -webkit-text-stroke:2px var(--purple); margin-bottom:8px; }
.v4 .artcard h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:23px; letter-spacing:-0.03em; line-height:1.08; }
.v4 .artcard h3 em{ font-style:italic; font-variation-settings:'SOFT' 90,'WONK' 1; font-weight:500; color:var(--purple); }
/* the strap is the one line that tells you whether this card is about you.
   qualified with p: the generic .v4 .artcard p rule below carries an extra
   element selector and would otherwise win on specificity.
   NB: no backticks anywhere in this file, it is one long template literal */
.v4 .artcard p.artstrap{ font-family:var(--f-display); font-style:italic;
  font-variation-settings:'SOFT' 90,'WONK' 1; font-weight:500; font-size:17px; line-height:1.32;
  color:var(--purple); margin-top:11px; padding-bottom:20px; }
.v4 .artcard p{ font-size:13.5px; line-height:1.6; color:#3B342E; margin-top:11px; }
/* margin-top:auto pins Best for to the bottom, so the three blocks line up across
   cards whose straps run to different line counts */
.v4 .bestfor{ margin-top:auto; padding-top:18px; border-top:2.5px dashed rgba(26,22,20,.2); }
.v4 .bestfor b{ display:inline-block; font-size:9.5px; font-weight:700; text-transform:uppercase;
  letter-spacing:1.6px; background:var(--purple-ink); color:#fff; padding:3px 10px;
  border-radius:999px; margin-bottom:9px; }
.v4 .bestfor span{ display:block; font-size:12.5px; line-height:1.55; color:var(--ink-soft); }
.v4 .artcard .forwho{ align-self:flex-start; }

/* ---------- section closer ---------- */
/* colour is set explicitly: inside .cases the section colour is paper, which would
   otherwise put cream text on this cream panel and make it invisible */
.v4 .seccta{ margin-top:clamp(38px,6vw,62px); display:flex; align-items:center; justify-content:space-between;
  gap:clamp(16px,3vw,24px); flex-wrap:wrap; border:3.5px solid var(--ink); border-radius:22px;
  padding:clamp(20px,3.4vw,24px) clamp(20px,3.4vw,28px);
  background:var(--paper); color:var(--ink); box-shadow:var(--shadow); }
.v4 .seccta p{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:clamp(19px,2.4vw,25px); letter-spacing:-0.028em; line-height:1.16;
  max-width:34ch; }
.v4 .cases .seccta{ background:var(--paper); }
@media (max-width:640px){ .v4 .seccta{ flex-direction:column; align-items:flex-start; padding:22px; }
  .v4 .seccta .btn{ width:100%; justify-content:center; } }
@media (max-width:960px){ .v4 .artgrid{ grid-template-columns:1fr; }
  .v4 .artcard{ transform:none !important; } }

/* ---------- staggered cards ---------- */
.v4 .models{ display:flex; flex-direction:column; gap:22px; margin-top:44px; }
.v4 .model{ border:3.5px solid var(--ink); box-shadow:var(--shadow); padding:28px 30px;
  border-radius:22px; max-width:820px; transition:transform .2s; }
.v4 .model:nth-child(1){ background:var(--sun-50); align-self:flex-start; transform:rotate(-.7deg); }
.v4 .model:nth-child(2){ background:var(--cream); align-self:flex-end;   transform:rotate(.6deg); }
.v4 .model:nth-child(3){ background:var(--lav); align-self:flex-start; transform:rotate(-.4deg); }
.v4 .model:nth-child(1):hover{ transform:rotate(-.7deg) translateY(-4px); }
.v4 .model:nth-child(2):hover{ transform:rotate(.6deg) translateY(-4px); }
.v4 .model:nth-child(3):hover{ transform:rotate(-.4deg) translateY(-4px); }
.v4 .mtop{ display:flex; align-items:center; gap:13px; }
.v4 .mno{ font-family:var(--f-display); font-variation-settings:'SOFT' 80,'WONK' 1; font-weight:800;
  font-size:30px; line-height:1; color:transparent; -webkit-text-stroke:2px var(--ink); }
.v4 .model h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:25px; letter-spacing:-0.03em; }
.v4 .model p{ font-size:14.5px; line-height:1.62; color:#3B342E; margin-top:11px; max-width:58ch; }
.v4 .forwho{ display:inline-flex; align-items:center; gap:8px; margin-top:16px;
  border:2.5px solid var(--purple); background:var(--cream); color:#4A1FA8; padding:6px 14px;
  font-size:12px; font-weight:700; border-radius:999px; }
@media (max-width:760px){ .v4 .model{ transform:none !important; align-self:stretch !important; padding:24px 22px; } }

/* ---------- case studies ---------- */
.v4 .cases{ background:var(--deep); color:var(--paper); }
.v4 .cases .shead h2{ color:var(--paper); }
/* on the deep ground the brand purple goes muddy, so the numeral lifts to a tint */
.v4 .cases .sno{ -webkit-text-stroke-color:#A98BFF; }
.v4 .cases .slede{ color:#B3A4D6; }
.v4 .cs-wrap{ display:grid; grid-template-columns:330px 1fr; gap:26px; margin-top:60px; align-items:start; }
/* the bar is hidden because the list drifts on its own; leaving a native
   scrollbar under a self scrolling row looks like a stuck control */
.v4 .cs-list{ display:flex; flex-direction:column; gap:12px;
  scrollbar-width:none; -ms-overflow-style:none; }
.v4 .cs-list::-webkit-scrollbar{ width:0; height:0; display:none; }
.v4 .cs-item{ display:flex; align-items:center; gap:14px; text-align:left; width:100%; cursor:pointer;
  color:var(--paper); border:3px solid #4A3778; background:transparent; padding:12px; border-radius:16px;
  transition:background .16s, border-color .16s, transform .16s; }
.v4 .cs-item:hover{ background:#35205E; border-color:var(--purple); transform:translateX(4px); }
.v4 .cs-item[aria-selected="true"]{ background:var(--paper); color:var(--ink);
  border-color:var(--paper); transform:translateX(8px); }
.v4 .cs-item img{ width:56px; height:56px; flex:none; object-fit:cover; border:2.5px solid currentColor;
  border-radius:11px; background:#fff; }
.v4 .cs-item .n{ display:block; font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:16px; letter-spacing:-0.02em; line-height:1.15; }
.v4 .cs-item .d{ display:block; font-size:10.5px; color:#A396C4; margin-top:3px; line-height:1.35; }
.v4 .cs-item[aria-selected="true"] .d{ color:var(--ink-soft); }
/* the rim: a gradient wider than the box, slid under a 4px reveal. animating
   background-position works everywhere, where a rotating conic needs @property */
.v4 .cs-shell{ padding:4px; border-radius:26px; box-shadow:var(--shadow);
  background:linear-gradient(100deg,#8856F2,#F5C542,#8856F2,#F5C542,#8856F2);
  background-size:300% 100%; animation:v4flow 9s linear infinite; }
@keyframes v4flow{ to{ background-position:300% 0; } }

.v4 .cs-panel{ border-radius:22px; padding:clamp(22px,4vw,38px) clamp(20px,3.6vw,36px); color:var(--ink); transition:background .3s; }

/* ---- header ---- */
.v4 .cs-head{ display:flex; align-items:flex-start; gap:18px; padding-bottom:24px;
  border-bottom:2.5px dashed rgba(26,22,20,.22); }
.v4 .cs-av{ flex:none; width:clamp(56px,14vw,74px); height:clamp(56px,14vw,74px); border:3.5px solid var(--ink); border-radius:18px;
  overflow:hidden; background:#fff; box-shadow:4px 4px 0 var(--purple); }
.v4 .cs-av img{ width:100%; height:100%; object-fit:cover; }
.v4 .cs-headtext{ flex:1; min-width:0; }
.v4 .cs-tag{ display:inline-block; border:2.5px solid var(--ink); background:var(--paper);
  border-radius:999px; padding:2px 11px; font-size:9.5px; font-weight:700; text-transform:uppercase;
  letter-spacing:1.4px; margin-bottom:9px; }
.v4 .cs-panel h3{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:clamp(26px,3.4vw,36px); letter-spacing:-0.035em; line-height:1.02; }
.v4 .cs-panel .sub{ font-size:13px; color:var(--ink-soft); margin-top:9px; max-width:58ch; line-height:1.58; }
/* icon only, so the chip is a round badge rather than a text pill */
.v4 .cs-links{ display:flex; flex-wrap:wrap; gap:9px; margin-top:13px; }
.v4 .cs-links a{ display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px;
  border:2.5px solid var(--ink); background:var(--paper); border-radius:50%; color:var(--ink);
  transition:background .15s, color .15s, transform .15s; }
.v4 .cs-links a:hover{ background:var(--purple); color:#fff; border-color:var(--purple); transform:translateY(-2px); }
.v4 .cs-links svg{ display:block; }
.v4 .cs-eng{ display:inline-flex; align-items:center; gap:7px; margin-top:13px; border:2.5px solid var(--purple);
  background:var(--cream); color:#4A1FA8; border-radius:999px; padding:5px 13px; font-size:11.5px; font-weight:700; }
.v4 .cs-count{ flex:none; font-family:var(--f-display); font-variation-settings:'SOFT' 80,'WONK' 1;
  font-weight:800; font-size:clamp(22px,4vw,30px); line-height:1; letter-spacing:-0.03em; color:var(--purple); }
.v4 .cs-count i{ font-style:normal; font-size:15px; color:rgba(26,22,20,.32); }

/* ---- the spine ---- */
.v4 .cs-steps{ margin-top:28px; }
.v4 .cs-step{ position:relative; display:grid; grid-template-columns:46px 1fr; gap:18px; padding-bottom:26px; }
.v4 .cs-step:last-child{ padding-bottom:0; }
/* dashes rather than a solid rule, so the connector reads as a route not a border */
.v4 .cs-step:not(:last-child)::before{ content:''; position:absolute; left:21.5px; top:52px; bottom:8px;
  width:3px; background:repeating-linear-gradient(to bottom, var(--purple) 0 6px, transparent 6px 12px); }
.v4 .cs-node{ position:relative; width:46px; height:46px; border:3.5px solid var(--ink); border-radius:50%;
  background:var(--purple); display:flex; align-items:center; justify-content:center; }
.v4 .cs-node.on{ background:var(--ink); }
.v4 .cs-node b{ position:absolute; right:-7px; bottom:-7px; width:21px; height:21px; border-radius:50%;
  border:2.5px solid var(--ink); background:var(--paper); color:var(--ink); font-size:10.5px;
  font-weight:700; display:flex; align-items:center; justify-content:center; }
.v4 .cs-stepbody{ min-width:0; padding-top:2px; }
.v4 .cs-steplabel{ display:inline-block; font-family:var(--f-ui); font-weight:700; font-size:10.5px;
  text-transform:uppercase; letter-spacing:1.6px; background:var(--purple-ink); color:#fff;
  padding:4px 11px; border-radius:999px; margin-bottom:11px; }
.v4 .cs-stepbody p{ font-size:clamp(14px,1.5vw,15px); line-height:1.62; color:#2E2823; max-width:64ch; }

/* ---- results ---- */
.v4 .cs-results{ display:grid; grid-template-columns:repeat(3,1fr); gap:13px; }
.v4 .cs-res{ position:relative; border:3px solid var(--ink); background:var(--paper); padding:16px;
  border-radius:16px; overflow:hidden; transition:transform .18s; }
.v4 .cs-res::after{ content:''; position:absolute; left:0; right:0; top:0; height:4px;
  background:linear-gradient(90deg,#8856F2,#F5C542,#8856F2,#F5C542,#8856F2);
  background-size:300% 100%; animation:v4flow 9s linear infinite; }
.v4 .cs-res:hover{ transform:translateY(-3px); }
.v4 .cs-resic{ display:flex; align-items:center; justify-content:center; width:30px; height:30px;
  border:2.5px solid var(--ink); border-radius:9px; background:var(--cream); margin-bottom:11px; }
.v4 .cs-res .n{ font-family:var(--f-display); font-variation-settings:'SOFT' 70,'WONK' 1;
  font-weight:800; font-size:clamp(21px,3.4vw,27px); letter-spacing:-0.035em; line-height:1; color:var(--purple); }
.v4 .cs-res .l{ font-size:11px; font-weight:500; color:var(--ink-soft); margin-top:8px; line-height:1.4; }

@media (max-width:900px){ .v4 .cs-wrap{ grid-template-columns:1fr; }
  .v4 .cs-list{ flex-direction:row; overflow-x:auto; padding-bottom:8px; }
  .v4 .cs-item{ flex:none; width:clamp(216px,66vw,258px); }
  .v4 .cs-item:hover,.v4 .cs-item[aria-selected="true"]{ transform:none; }
  .v4 .cs-results{ grid-template-columns:1fr; } }
@media (max-width:620px){ .v4 .cs-panel{ padding:24px 20px; }
  .v4 .cs-head{ flex-wrap:wrap; gap:14px; } .v4 .cs-count{ font-size:24px; }
  .v4 .cs-step{ grid-template-columns:38px 1fr; gap:14px; }
  .v4 .cs-node{ width:38px; height:38px; } .v4 .cs-step:not(:last-child)::before{ left:17.5px; top:44px; } }

/* ---------- feedback ---------- */
.v4 .fb-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:44px; align-items:start; }
.v4 .fb-card{ position:relative; border:3.5px solid var(--ink); box-shadow:var(--shadow-sm);
  background:var(--paper); padding:24px 22px; display:flex; flex-direction:column; gap:18px;
  border-radius:20px; transition:transform .2s; }
.v4 .fb-card:nth-child(3n+1){ transform:rotate(-.8deg); }
.v4 .fb-card:nth-child(3n+2){ transform:rotate(.5deg); margin-top:26px; background:#F3EBFF; }
.v4 .fb-card:nth-child(3n+3){ transform:rotate(-.3deg); margin-top:12px; background:var(--sun-50); }
.v4 .fb-card:hover{ transform:rotate(0deg) translateY(-5px); }
.v4 .fb-card .qm{ font-family:var(--f-display); font-style:italic; font-weight:800; font-size:44px;
  line-height:.6; color:var(--purple); height:22px; }
.v4 .fb-card .q{ font-size:15px; line-height:1.6; color:#2E2823; flex:1; }
.v4 .fb-who{ display:flex; align-items:center; gap:12px; border-top:2.5px solid var(--ink); padding-top:15px; }
.v4 .fb-who img{ width:44px; height:44px; flex:none; object-fit:cover; border:2.5px solid var(--ink);
  border-radius:50%; background:#fff; }
.v4 .fb-who .n{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:700; font-size:14.5px; letter-spacing:-0.01em; }
.v4 .fb-who .r{ font-size:11px; color:var(--ink-soft); margin-top:2px; }
.v4 .dummy{ position:absolute; top:-11px; right:14px; background:var(--ink); color:#fff; font-size:9px;
  font-weight:700; letter-spacing:1.2px; padding:4px 9px; border:2.5px solid var(--ink); border-radius:999px; }
@media (max-width:900px){ .v4 .fb-grid{ grid-template-columns:1fr; }
  .v4 .fb-card{ transform:none !important; margin-top:0 !important; } }

/* ---------- consult (talent page) ---------- */
.v4 .consult-in{ display:grid; grid-template-columns:1fr 330px; gap:34px; align-items:center; margin-top:38px; }
.v4 .consult-list{ list-style:none; margin-top:22px; display:flex; flex-direction:column; gap:12px; }
.v4 .consult-list li{ display:flex; align-items:flex-start; gap:12px; font-size:15px; line-height:1.55; color:#3B342E; }
.v4 .consult-list li::before{ content:'\\2726'; color:var(--purple); font-size:15px; line-height:1.5; flex:none; }
.v4 .consult-cta{ border:3.5px solid var(--ink); box-shadow:var(--shadow); border-radius:22px;
  background:var(--sun); padding:30px 26px; display:flex; flex-direction:column; gap:20px;
  transform:rotate(1deg); transition:transform .2s; }
.v4 .consult-cta:hover{ transform:rotate(0deg) translateY(-4px); }
.v4 .consult-cta b{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; font-size:25px; letter-spacing:-0.03em; line-height:1.1; }
.v4 .consult-cta span{ display:inline-flex; align-items:center; justify-content:center; gap:10px;
  border:3px solid var(--ink); background:var(--paper); border-radius:999px; padding:13px 22px;
  font-weight:700; font-size:15px; }
@media (max-width:820px){ .v4 .consult-in{ grid-template-columns:1fr; }
  .v4 .consult-cta{ transform:none; } }

/* ---------- cta band ---------- */
.v4 .band{ position:relative; overflow:hidden; text-align:center; padding:clamp(72px,11vw,130px) clamp(18px,4vw,24px);
  background:var(--purple); color:#fff; }
.v4 .band .rings{ position:absolute; inset:0; opacity:.16;
  background-image:repeating-radial-gradient(circle at 50% 50%, transparent 0 38px, #fff 38px 41px); }
.v4 .band-in{ position:relative; z-index:3; max-width:760px; margin:0 auto; }
.v4 .band h2{ font-family:var(--f-display); font-variation-settings:'SOFT' 60,'WONK' 1; font-weight:800;
  font-size:clamp(32px,5.4vw,62px); letter-spacing:-0.035em; line-height:1.02; }
.v4 .band h2 .it{ color:#FFE79A; }
.v4 .band p{ font-size:16px; line-height:1.6; color:#E8DDFF; margin-top:20px; }
.v4 .band-actions{ display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:34px; }
.v4 .band .btn{ background:var(--paper); color:var(--ink); box-shadow:7px 7px 0 rgba(0,0,0,.28); }
.v4 .band .btn:hover{ box-shadow:2px 2px 0 rgba(0,0,0,.28); }
/* the second action reads as secondary against the purple ground */
.v4 .band .btn.ghost{ background:transparent; color:var(--paper); border-color:var(--paper); }
.v4 .band .btn.ghost:hover{ background:rgba(255,255,255,.12); }
@media (max-width:520px){ .v4 .band-actions{ flex-direction:column; }
  .v4 .band-actions .btn{ justify-content:center; } }

/* ---------- misc ---------- */
.v4 .slot{ border:2.5px dashed #B3A99E; background:rgba(255,255,255,.5); display:flex;
  align-items:center; justify-content:center; color:#8A8076; font-size:11px; font-weight:700; }
.v4 .note{ margin-top:34px; display:flex; align-items:flex-start; gap:11px; border:3px solid var(--ink);
  background:var(--sun); padding:14px 18px; font-size:13px; font-weight:500; text-align:left;
  max-width:72ch; border-radius:16px; line-height:1.55; }

.v4 .foot{ background:var(--deep); color:#E4DBF7; padding:clamp(60px,9vw,96px) clamp(18px,4vw,24px) 40px; text-align:center; }
.v4 .foot svg{ height:clamp(26px,7vw,34px); width:auto; margin:0 auto; }
.v4 .f-line{ font-family:var(--f-display); font-style:italic; font-variation-settings:'SOFT' 90,'WONK' 1;
  font-weight:500; font-size:clamp(21px,3vw,32px); margin-top:28px; letter-spacing:-0.015em; }
.v4 .f-rule{ width:46px; height:2px; background:var(--purple); margin:30px auto; }
.v4 .f-links{ display:flex; justify-content:center; gap:26px; flex-wrap:wrap; }
.v4 .f-links a{ font-size:11.5px; font-weight:600; text-transform:uppercase; letter-spacing:2px; color:#A192CC; }
.v4 .f-links a:hover{ color:#fff; }
.v4 .f-bot{ margin-top:48px; font-size:10.5px; letter-spacing:1.6px; text-transform:uppercase; color:#6A5C96; }

/* ---------- scroll reveal ---------- */
/* Everything here hangs off .reveal-armed, which JavaScript adds on mount. The
   server markup is fully visible, so a failed bundle degrades to no animation
   rather than to a blank page.

   The finished state is deliberately NOT pinned with animation-fill-mode:
   forwards. Filling forwards would keep the animated transform on the element
   and outrank the :hover rules, killing every card hover on the page. With
   backwards, the element holds the opening frame during the delay and then
   drops back to its own CSS once the animation ends. */

.v4 .reveal-armed:not(.is-in) .artcard,
.v4 .reveal-armed:not(.is-in) .cs-list,
.v4 .reveal-armed:not(.is-in) .cs-shell{ opacity:0; }

/* 02 the three engagement cards, thrown outward from the middle */
@keyframes v4spreadL{
  from{ opacity:0; transform:translateX(64%) scale(.86) rotate(-.6deg); }
  to  { opacity:1; transform:translateX(0)   scale(1)   rotate(-.6deg); }
}
@keyframes v4spreadC{
  from{ opacity:0; transform:scale(.82) rotate(.4deg); }
  to  { opacity:1; transform:scale(1)   rotate(.4deg); }
}
@keyframes v4spreadR{
  from{ opacity:0; transform:translateX(-64%) scale(.86) rotate(-.3deg); }
  to  { opacity:1; transform:translateX(0)    scale(1)   rotate(-.3deg); }
}
.v4 .artgrid.is-in .artcard:nth-child(1){ animation:v4spreadL .62s cubic-bezier(.2,.9,.25,1) .04s backwards; }
.v4 .artgrid.is-in .artcard:nth-child(2){ animation:v4spreadC .52s cubic-bezier(.2,.9,.25,1) both;          }
.v4 .artgrid.is-in .artcard:nth-child(3){ animation:v4spreadR .62s cubic-bezier(.2,.9,.25,1) .04s backwards; }
/* the centre card is the only one whose end state matches its base transform
   exactly, so it can fill both ways without fighting hover */
.v4 .artgrid.is-in .artcard:nth-child(2){ animation-fill-mode:backwards; }

/* used by the stacked engagement cards on narrow screens */
@keyframes v4rise{
  from{ opacity:0; transform:translateY(26px) scale(.97); }
  to  { opacity:1; transform:none; }
}

/* 03 list and panel part from the centre line */
@keyframes v4fromL{ from{ opacity:0; transform:translateX(-8%) scale(.96); } to{ opacity:1; transform:none; } }
@keyframes v4fromR{ from{ opacity:0; transform:translateX(8%)  scale(.96); } to{ opacity:1; transform:none; } }
.v4 .cs-wrap.is-in .cs-list { animation:v4fromL .58s cubic-bezier(.2,.9,.25,1) backwards; }
.v4 .cs-wrap.is-in .cs-shell{ animation:v4fromR .58s cubic-bezier(.2,.9,.25,1) .06s backwards; }

@media (max-width:960px){
  /* stacked cards have no centre to spread from, so they just rise */
  .v4 .artgrid.is-in .artcard:nth-child(1),
  .v4 .artgrid.is-in .artcard:nth-child(2),
  .v4 .artgrid.is-in .artcard:nth-child(3){ animation:v4rise .5s cubic-bezier(.2,.9,.25,1) backwards; }
  .v4 .artgrid.is-in .artcard:nth-child(2){ animation-delay:.05s; }
  .v4 .artgrid.is-in .artcard:nth-child(3){ animation-delay:.1s; }
}

@media (prefers-reduced-motion:reduce){
  .v4 *{ animation:none !important; transition:none !important; }
  /* the armed class is never added under reduced motion, but belt and braces:
     nothing may be left hidden by a rule whose animation has been disabled */
  .v4 .reveal-armed:not(.is-in) .artcard,
  .v4 .reveal-armed:not(.is-in) .cs-list,
  .v4 .reveal-armed:not(.is-in) .cs-shell{ opacity:1; }
}
`;
