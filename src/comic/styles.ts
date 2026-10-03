// Comic design system, shared by /moo-talent and /moo-talent-form so the two
// pages cannot drift apart. Scoped under .moo so nothing here can leak into the
// existing /talent-form page, which keeps its own separate design.
export const COMIC_CSS = `
.moo, .moo *, .moo *::before, .moo *::after { box-sizing: border-box; margin: 0; padding: 0; }
.moo {
  --ink:#111111; --paper:#FFFFFF;
  --purple:#8856F2; --deep:#2A1863;
  --lav:#D9CBFB; --cream:#EFE7FA; --mist:#F8F4FE;
  --shadow:7px 7px 0 var(--ink); --shadow-sm:4px 4px 0 var(--ink);
  --f-title:'Bricolage Grotesque', system-ui, sans-serif;
  --f-accent:'Instrument Serif', Georgia, serif;
  --f-ui:'Poppins', system-ui, sans-serif;
  font-family: var(--f-ui); color: var(--ink); background: var(--paper);
  -webkit-font-smoothing: antialiased;
}
.moo a { text-decoration: none; color: inherit; }
.moo img { display: block; max-width: 100%; }
.t-title { font-family: var(--f-title); font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
.t-label { font-family: var(--f-ui); font-weight: 700; text-transform: uppercase; letter-spacing: 1.4px; }
.t-accent { font-family: var(--f-accent); font-style: italic; font-weight: 400; letter-spacing: -0.01em; }

/* ---------- header ---------- */
.moo-header { background: var(--paper); border-bottom: 4px solid var(--ink); padding: 13px 26px; display: flex; align-items: center; position: relative; z-index: 60; }


/* ---------- nav (sits over the coloured hero) ---------- */
.moo-nav { position: absolute; top: 0; left: 0; right: 0; z-index: 40; padding: 22px 30px; display: flex; align-items: center; gap: 18px; }
.moo-nav .spacer { flex: 1; }
.navpill { display: flex; align-items: center; gap: 4px; border: 3px solid var(--ink); background: rgba(255,255,255,.14); padding: 5px; }
.navpill a { font-size: 13.5px; font-weight: 700; color: #fff; padding: 9px 18px; white-space: nowrap; }
.navpill a.on { background: #F5D547; color: var(--ink); }
.navpill a:not(.on):hover { background: rgba(255,255,255,.2); }
.moo-nav .btn.navcta { background: var(--paper); color: var(--ink); font-size: 14px; padding: 11px 22px; box-shadow: var(--shadow-sm); }
@media (max-width: 900px) {
  .moo .moo-nav { padding: 14px 16px; gap: 10px; }
  .moo .moo-nav .logo-link svg { height: 19px; }
  .moo .navpill { padding: 4px; gap: 2px; }
  .moo .navpill a { font-size: 11.5px; padding: 7px 10px; }
  .moo .moo-nav .btn.navcta { font-size: 12px; padding: 8px 12px; box-shadow: 3px 3px 0 var(--ink); }
}
/* on a phone the pill chrome is dropped, but the cross-link must survive -
   hiding it entirely leaves no route to the talent side */
@media (max-width: 620px) {
  .moo .navpill { border: none; background: none; padding: 0; }
  .moo .navpill a.on { display: none; }
  .moo .navpill a { padding: 6px 2px; font-size: 12px; text-decoration: underline; text-underline-offset: 4px; }
  .moo .navpill a:not(.on):hover { background: none; }
}

/* light variant of the nav, for the talent page's pale hero */
.moo-nav.on-light .navpill { border-color: var(--ink); background: rgba(17,17,17,.05); }
.moo-nav.on-light .navpill a { color: var(--ink); }
.moo-nav.on-light .navpill a.on { background: var(--purple); color: #fff; }
.moo-nav.on-light .navpill a:not(.on):hover { background: rgba(17,17,17,.08); }
.moo-nav.on-light .btn.navcta { background: var(--purple); color: #fff; }

/* ---------- buttons ---------- */
.moo .btn { display: inline-flex; align-items: center; gap: 10px; font-family: var(--f-ui); font-weight: 700; font-size: 17px; padding: 15px 32px; border: 3px solid var(--ink); background: var(--purple); color: #fff; box-shadow: var(--shadow); cursor: pointer; transition: transform .12s, box-shadow .12s; }
.moo .btn:hover { transform: translate(3px,3px); box-shadow: 2px 2px 0 var(--ink); }
.moo .btn:disabled { opacity: .55; cursor: not-allowed; transform: none; box-shadow: var(--shadow); }
.moo .btn.ghost { background: var(--paper); color: var(--ink); }
.moo .btn.sm { font-size: 15px; padding: 11px 22px; box-shadow: var(--shadow-sm); }
.moo .btn:focus-visible { outline: 3px solid var(--deep); outline-offset: 3px; }

/* ---------- hero ---------- */
.hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 112px 24px 48px; overflow: hidden; border-bottom: 4px solid var(--ink); background: #F7F0FE; }
.rays { position: absolute; left: 50%; top: 46%; width: 250vmax; height: 250vmax; transform: translate(-50%,-50%); z-index: 0;
  background: repeating-conic-gradient(from 0deg at 50% 50%, #E4D4FB 0deg 7.5deg, #F7F0FE 7.5deg 15deg); }
.soften { position: absolute; inset: 0; z-index: 1; background: radial-gradient(circle at 50% 46%, rgba(255,255,255,.92) 0%, rgba(255,255,255,0) 38%); }
.hero-in { position: relative; z-index: 5; max-width: 820px; width: 100%; }
.badge { display: inline-flex; align-items: center; gap: 8px; background: var(--paper); border: 3px solid var(--ink); padding: 7px 16px; font-size: 12px; box-shadow: var(--shadow-sm); transform: rotate(-2deg); margin-bottom: 22px; }
.hero h1 { font-size: clamp(38px,6.4vw,72px); }
.hero h1 .hl { background: var(--ink); color: #fff; padding: 0 12px; display: inline-block; transform: rotate(-1.2deg); box-shadow: 5px 5px 0 var(--purple); }
.hero h1 .scr { color: var(--deep); }
.points { display: flex; flex-wrap: wrap; justify-content: center; gap: 11px; margin-top: 28px; }
.point { display: flex; align-items: center; gap: 8px; background: var(--paper); border: 3px solid var(--ink); box-shadow: var(--shadow-sm); padding: 9px 16px; font-size: 13.5px; font-weight: 600; }
.point:nth-child(1) { transform: rotate(-1.5deg); }
.point:nth-child(2) { transform: rotate(1deg); }
.hero .btn { margin-top: 30px; }
.meta { margin-top: 14px; font-size: 12.5px; font-weight: 600; color: #3b3646; }

/* ---------- briefs carousel ---------- */
.briefs { position: relative; padding: 60px 0 58px; border-bottom: 4px solid var(--ink); background: var(--mist);
  background-image: radial-gradient(rgba(136,86,242,.22) 1.5px, transparent 1.5px); background-size: 20px 20px; overflow: hidden; }
.briefs-head { text-align: center; padding: 0 24px; margin-bottom: 34px; }
.kicker { display: inline-flex; align-items: center; gap: 8px; border: 3px solid var(--ink); background: var(--paper); padding: 6px 14px; font-size: 11.5px; box-shadow: var(--shadow-sm); margin-bottom: 18px; }
.briefs h2, .clients h2 { font-size: clamp(26px,3.6vw,42px); }
.marquee { display: flex; width: max-content; animation: mooRoll 42s linear infinite; }
.marquee:hover { animation-play-state: paused; }
@keyframes mooRoll { to { transform: translateX(-50%); } }
.track { display: flex; gap: 18px; padding: 6px 9px; }
.brief { width: 280px; flex: none; background: var(--paper); border: 4px solid var(--ink); box-shadow: var(--shadow); padding: 18px 18px 16px; display: flex; flex-direction: column; gap: 12px; }
.brief-top { display: flex; align-items: center; justify-content: space-between; }
.brief-ic { width: 38px; height: 38px; border: 3px solid var(--ink); display: flex; align-items: center; justify-content: center; }
.brief-client { font-size: 12px; font-weight: 600; color: #4a4560; }
.brief-role { font-family: var(--f-title); font-weight: 800; font-size: 22px; line-height: 1.05; letter-spacing: -0.03em; }
.brief-foot { display: flex; align-items: center; justify-content: space-between; border-top: 3px solid var(--ink); padding-top: 12px; margin-top: 2px; }
.pay { font-family: var(--f-title); font-weight: 800; font-size: 19px; letter-spacing: -0.02em;
  background: linear-gradient(100deg,#8856F2 0%,#FF5CA8 22%,#F5D547 42%,#7BE0AD 60%,#8856F2 82%,#FF5CA8 100%);
  background-size: 320% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: mooShine 5s linear infinite; }
@keyframes mooShine { to { background-position: 320% 0; } }
.per { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #6b6580; }
.live { display: flex; align-items: center; gap: 6px; font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--deep); }
.live i { width: 8px; height: 8px; background: #3ED08A; border: 2px solid var(--ink); display: block; }
.briefs-cta { text-align: center; margin-top: 38px; padding: 0 24px; }

/* ---------- consulting call ---------- */
.consult { padding: 62px 24px; border-bottom: 4px solid var(--ink); background: #F5D547;
  background-image: repeating-linear-gradient(-45deg, rgba(17,17,17,.045) 0 2px, transparent 2px 12px); }
.consult-in { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1.05fr .95fr; gap: 36px; align-items: stretch; }
.consult .kicker { background: var(--paper); }
.consult h2 { font-size: clamp(27px,3.8vw,44px); }
.consult h2 .hl { background: var(--ink); color: #fff; padding: 0 11px; display: inline-block; transform: rotate(-1.2deg); box-shadow: 5px 5px 0 var(--purple); }
.consult-list { list-style: none; margin-top: 22px; display: flex; flex-direction: column; gap: 12px; }
.consult-list li { display: flex; gap: 11px; font-size: 14px; font-weight: 500; line-height: 1.5; color: #43391a; }
.consult-list li::before { content: ''; flex: none; width: 10px; height: 10px; margin-top: 6px; background: var(--purple); border: 2px solid var(--ink); }

/* the whole right column is the target, so the click area is unmissable */
.consult-cta { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; text-align: center;
  background: var(--purple); color: #fff; border: 4px solid var(--ink); box-shadow: var(--shadow); padding: 40px 30px;
  transform: rotate(1.2deg); transition: transform .14s ease, box-shadow .14s ease; cursor: pointer; min-height: 210px; }
.consult-cta:hover { transform: rotate(0deg) translate(3px,3px); box-shadow: 2px 2px 0 var(--ink); }
.consult-cta:focus-visible { outline: 4px solid var(--ink); outline-offset: 5px; }
.consult-cta b { font-family: var(--f-title); font-weight: 800; font-size: clamp(24px,3vw,34px); line-height: 1.05; letter-spacing: -0.03em; }
.consult-cta span { display: inline-flex; align-items: center; gap: 9px; background: var(--paper); color: var(--ink); border: 3px solid var(--ink);
  box-shadow: 4px 4px 0 rgba(17,17,17,.55); padding: 11px 22px; font-size: 14px; font-weight: 700; }

@media (max-width: 860px) {
  .consult-in { grid-template-columns: 1fr; gap: 26px; }
  .consult-cta { transform: none; min-height: 0; padding: 32px 24px; }
}

/* ---------- client home ---------- */
/* Shares .hero with the talent page - same swirl, same spacing, same nav - so
   the two never drift. Only the extras below are specific to this page. */
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 30px; }
.moo .hero-actions .btn { margin-top: 0; }
.moo .hero-actions .btn.dark { background: var(--ink); color: #fff; }
.moo .hero-actions .btn.light { background: var(--paper); color: var(--ink); }
.hero-note { margin-top: 16px; font-size: 12.5px; font-weight: 600; color: #6b6580; }

/* sparkles, purely decorative */
.sparks { position: absolute; inset: 0; z-index: 3; pointer-events: none; }
.spark { position: absolute; color: #F5D547; }
.spark:nth-child(1) { left: 9%;  top: 32%; width: 28px; }
.spark:nth-child(2) { right: 11%; top: 27%; width: 20px; color: var(--purple); }
.spark:nth-child(3) { left: 15%; bottom: 26%; width: 18px; color: var(--purple); }
.spark:nth-child(4) { right: 8%; bottom: 30%; width: 30px; }
@media (max-width: 900px) { .sparks { display: none; } }

/* platforms strip */
.plats { border-bottom: 4px solid var(--ink); background: var(--paper); padding: 20px 24px; }
.plats-in { max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: center; gap: 14px 26px; flex-wrap: wrap; }
.plats-label { font-family: var(--f-ui); font-weight: 700; font-size: 10.5px; text-transform: uppercase; letter-spacing: 1.4px; color: #6b6580; }
.plat { display: inline-flex; align-items: center; gap: 9px; border: 3px solid var(--ink); background: var(--paper); box-shadow: 3px 3px 0 var(--ink); padding: 7px 14px; font-size: 13px; font-weight: 700; }
.plat:nth-child(2) { transform: rotate(-1.5deg); }
.plat:nth-child(4) { transform: rotate(1.5deg); }

/* how it works */
.steps { padding: 64px 24px; border-bottom: 4px solid var(--ink); background: var(--lav);
  background-image: repeating-linear-gradient(45deg, rgba(17,17,17,.05) 0 2px, transparent 2px 11px); }
.steps-in { max-width: 1040px; margin: 0 auto; text-align: center; }
.steps h2, .promises h2 { font-family: var(--f-title); font-weight: 800; letter-spacing: -0.03em; font-size: clamp(26px,3.6vw,42px); }
.steps h2 .em, .promises h2 .em { font-family: var(--f-accent); font-style: italic; font-weight: 400; }
.steps .kicker, .promises .kicker { background: var(--paper); }
.step-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 40px; text-align: left; }
.step-card { position: relative; background: var(--paper); border: 4px solid var(--ink); box-shadow: var(--shadow-sm); padding: 26px 18px 20px; }
.step-no { position: absolute; top: -17px; left: -17px; width: 44px; height: 44px; background: var(--purple); color: #fff; border: 4px solid var(--ink);
  display: flex; align-items: center; justify-content: center; font-family: var(--f-title); font-weight: 800; font-size: 15px; }
.step-ic { width: 40px; height: 40px; border: 3px solid var(--ink); background: var(--cream); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
.step-card h3 { font-family: var(--f-title); font-weight: 800; font-size: 17px; letter-spacing: -0.02em; }
.step-card p { font-size: 13px; font-weight: 500; line-height: 1.55; color: #4c4660; margin-top: 6px; }
@media (max-width: 900px) { .step-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; } }
@media (max-width: 560px) { .step-grid { grid-template-columns: 1fr; gap: 26px; } }

/* what we promise */
.promises { padding: 62px 24px; border-bottom: 4px solid var(--ink); background: #F5D547;
  background-image: repeating-linear-gradient(-45deg, rgba(17,17,17,.045) 0 2px, transparent 2px 12px); }
.promises-in { max-width: 1040px; margin: 0 auto; text-align: center; }
.promise-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 36px; text-align: left; }
.promise { background: var(--paper); border: 4px solid var(--ink); box-shadow: var(--shadow-sm); padding: 22px 20px; }
.promise .step-ic { margin-bottom: 13px; background: var(--mist); }
.promise h3 { font-family: var(--f-title); font-weight: 800; font-size: 17px; letter-spacing: -0.02em; }
.promise p { font-size: 13px; font-weight: 500; line-height: 1.55; color: #4c4432; margin-top: 6px; }
@media (max-width: 820px) { .promise-grid { grid-template-columns: 1fr; gap: 22px; } }

/* closing call band */
.cband { padding: 66px 24px; border-bottom: 4px solid var(--ink); background: #150C2B; color: #F3EDFE; position: relative; overflow: hidden; text-align: center; }
.cband .dots { position: absolute; inset: 0; opacity: .5; background-image: radial-gradient(rgba(180,150,255,.32) 1.5px, transparent 1.5px); background-size: 22px 22px; }
.cband-in { position: relative; z-index: 3; max-width: 720px; margin: 0 auto; }
.cband h2 { font-family: var(--f-title); font-weight: 800; letter-spacing: -0.03em; font-size: clamp(28px,4vw,48px); line-height: 1.05; }
.cband h2 .em { font-family: var(--f-accent); font-style: italic; font-weight: 400; color: #C6A9FF; }
.cband p { font-size: 15px; font-weight: 500; color: #C3B6E4; margin-top: 18px; }
.cband .btn { margin-top: 30px; background: var(--paper); color: var(--ink); box-shadow: 7px 7px 0 rgba(243,237,254,.5); }
.cband .btn:hover { box-shadow: 2px 2px 0 rgba(243,237,254,.5); }

/* ---------- clients ---------- */
.clients { padding: 62px 24px; border-bottom: 4px solid var(--ink); background: var(--lav);
  background-image: repeating-linear-gradient(45deg, rgba(17,17,17,.05) 0 2px, transparent 2px 11px); text-align: center; }
.clients-in { max-width: 1000px; margin: 0 auto; }
.client-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 22px; margin-top: 30px; }
.client { display: flex; flex-direction: column; align-items: center; gap: 9px; width: 104px; }
.client-av { width: 72px; height: 72px; border: 3px solid var(--ink); box-shadow: var(--shadow-sm); overflow: hidden; background: var(--paper); transition: transform .12s, box-shadow .12s; }
.client-av img { width: 100%; height: 100%; object-fit: cover; }
.client:hover .client-av { transform: translate(3px,3px); box-shadow: 1px 1px 0 var(--ink); }
.client-name { font-size: 12px; font-weight: 700; line-height: 1.25; }

/* ---------- form ---------- */
.formband { padding: 58px 24px 66px; background: var(--cream); border-bottom: 4px solid var(--ink); min-height: calc(100vh - 58px); }
.panel { max-width: 640px; margin: 0 auto; background: var(--paper); border: 4px solid var(--ink); box-shadow: var(--shadow); padding: 34px 32px 26px; position: relative; }
.step-num { position: absolute; top: -20px; left: -20px; width: 52px; height: 52px; background: var(--purple); color: #fff; border: 4px solid var(--ink); display: flex; align-items: center; justify-content: center; font-family: var(--f-title); font-weight: 800; font-size: 19px; }
.prog { display: flex; gap: 5px; margin-bottom: 22px; }
.prog i { flex: 1; height: 11px; border: 2.5px solid var(--ink); background: var(--paper); }
.prog i.on { background: var(--purple); }
.q { font-family: var(--f-title); font-weight: 800; font-size: clamp(21px,3.4vw,27px); line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 6px; }
.q-hint { font-size: 12.5px; font-weight: 500; color: #57516b; margin-bottom: 18px; }
.opts { display: flex; flex-direction: column; gap: 10px; }
.opt { display: flex; align-items: center; gap: 13px; border: 3px solid var(--ink); background: var(--paper); box-shadow: var(--shadow-sm); padding: 12px 14px; cursor: pointer; text-align: left; font-family: var(--f-ui); transition: transform .12s, box-shadow .12s; width: 100%; }
.opt:hover { transform: translate(3px,3px); box-shadow: 1px 1px 0 var(--ink); }
.opt.sel { background: var(--lav); border-color: var(--deep); transform: translate(3px,3px); box-shadow: 1px 1px 0 var(--deep); }
.opt:focus-visible { outline: 3px solid var(--deep); outline-offset: 3px; }
.opt-ic { width: 44px; height: 44px; min-width: 44px; border: 3px solid var(--ink); background: var(--cream); display: flex; align-items: center; justify-content: center; }
.opt-name { font-weight: 700; font-size: 15px; line-height: 1.2; display: block; }
.opt-desc { font-size: 12px; font-weight: 500; color: #4a4460; margin-top: 2px; line-height: 1.3; display: block; }
.opt-dot { width: 20px; height: 20px; min-width: 20px; border: 3px solid var(--ink); background: var(--paper); }
.opt.sel .opt-dot { background: var(--purple); }
.tags { display: flex; flex-wrap: wrap; gap: 9px; }
.tag { border: 3px solid var(--ink); background: var(--paper); box-shadow: 3px 3px 0 var(--ink); padding: 8px 14px; font-family: var(--f-ui); font-size: 13px; font-weight: 600; cursor: pointer; transition: transform .12s, box-shadow .12s; }
.tag:hover { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--ink); }
.tag.sel { background: var(--purple); color: #fff; }
.levels { display: flex; gap: 8px; flex-wrap: wrap; }
.level { flex: 1; min-width: 78px; border: 3px solid var(--ink); background: var(--paper); box-shadow: 3px 3px 0 var(--ink); padding: 12px 6px; font-family: var(--f-ui); font-size: 13px; font-weight: 700; cursor: pointer; transition: transform .12s, box-shadow .12s; }
.level:hover { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--ink); }
.level.sel { background: var(--purple); color: #fff; }
.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 15px; }
.field label { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.1px; color: #57516b; }
.field input, .field textarea { width: 100%; border: 3px solid var(--ink); background: var(--paper); padding: 11px 13px; font-family: var(--f-ui); font-size: 14.5px; color: var(--ink); outline: none; }
.field input:focus, .field textarea:focus { box-shadow: 4px 4px 0 var(--purple); }
.field textarea { resize: vertical; min-height: 84px; line-height: 1.5; }
.field input::placeholder, .field textarea::placeholder { color: #9d97ad; }
/* the résumé drop, in the field's own language */
.drop { display: flex; align-items: center; gap: 13px; width: 100%; border: 3px dashed var(--ink); background: var(--mist); padding: 14px; cursor: pointer; text-align: left; font-family: var(--f-ui); color: var(--ink); }
.drop:hover { background: var(--lav); }
.drop.done { border-style: solid; background: #E2F7EC; }
.drop:disabled { cursor: progress; }
.drop:focus-visible { outline: 3px solid var(--deep); outline-offset: 3px; }
.drop-ic { width: 44px; height: 44px; min-width: 44px; border: 3px solid var(--ink); background: var(--paper); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; }
.drop-t b { display: block; font-size: 14.5px; }
.drop-t span { display: block; font-size: 12px; font-weight: 500; color: #4a4460; margin-top: 2px; }
.linkbtn { background: none; border: none; padding: 0; margin-top: 8px; font-family: var(--f-ui); font-size: 12.5px; font-weight: 700; color: var(--deep); text-decoration: underline; cursor: pointer; align-self: flex-start; }
.spinner.dark { border-color: rgba(17,17,17,.25); border-top-color: var(--ink); }
.summary { border: 3px solid var(--ink); background: var(--mist); }
.srow { display: flex; justify-content: space-between; gap: 14px; padding: 9px 13px; border-bottom: 2px solid rgba(17,17,17,.12); font-size: 13px; }
.srow:last-child { border-bottom: none; }
.srow b { font-weight: 700; }
.srow span { text-align: right; color: #4a4460; word-break: break-word; }
.err { display: block; margin-top: 12px; font-size: 12.5px; font-weight: 700; color: #C6203F; }
.nav { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 24px; border-top: 3px solid var(--ink); padding-top: 16px; }
.done { text-align: center; padding: 26px 8px 14px; }
.done-mark { width: 74px; height: 74px; border: 4px solid var(--ink); background: #7BE0AD; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); }
.done h3 { font-family: var(--f-title); font-weight: 800; font-size: 28px; letter-spacing: -0.03em; }
.done p { font-size: 14px; font-weight: 500; color: #4a4460; margin-top: 10px; line-height: 1.6; }
.spinner { width: 15px; height: 15px; border: 2.5px solid rgba(255,255,255,.35); border-top-color: #fff; border-radius: 50%; animation: mooSpin .7s linear infinite; }
@keyframes mooSpin { to { transform: rotate(360deg); } }

/* ---------- footer ---------- */
.moo-footer { background: #0E0A17; color: #EFE7FA; padding: 78px 24px 34px; }
.moo-footer .in { max-width: 940px; margin: 0 auto; text-align: center; }
.f-logo { display: flex; justify-content: center; color: #EFE7FA; }
.f-line { font-family: var(--f-accent); font-style: italic; font-size: clamp(20px,2.6vw,29px); line-height: 1.35; margin-top: 30px; letter-spacing: -0.01em; }
.f-rule { width: 44px; height: 2px; background: rgba(239,231,250,.4); margin: 34px auto; }
.f-socials { display: flex; justify-content: center; gap: 26px; flex-wrap: wrap; }
.f-socials a { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #9C8DBE; transition: color .18s; }
.f-socials a:hover { color: #fff; }
.f-bot { margin-top: 52px; font-size: 10.5px; font-weight: 500; letter-spacing: 1.6px; text-transform: uppercase; color: #584D74; }

@media (max-width: 760px) {
  .hero { min-height: auto; padding: 110px 18px 44px; }
  .hero h1 { font-size: 33px; }
  .brief { width: 236px; }
  .client { width: 86px; }
  .client-av { width: 60px; height: 60px; }
  .panel { padding: 26px 18px 20px; }
  .moo-footer { padding: 58px 20px 28px; }
  .moo-header { padding: 12px 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .marquee { animation: none; }
  .pay { animation: none; }
  .moo .btn, .opt, .tag, .level, .client-av { transition: none; }
}
`;

// Styles unique to /moo-circle. Kept separate so the talent pages do not carry
// them, and imported only by that route.
export const CIRCLE_CSS = `
.circle-hero { position: relative; background: #150C2B; color: #F3EDFE; border-bottom: 4px solid var(--ink); padding: 64px 24px 62px; text-align: center; overflow: hidden; }
.circle-hero .dots { position: absolute; inset: 0; opacity: .5; background-image: radial-gradient(rgba(180,150,255,.32) 1.5px, transparent 1.5px); background-size: 22px 22px; }
.circle-hero .in { position: relative; z-index: 3; max-width: 780px; margin: 0 auto; }
.circle-badge { display: inline-flex; align-items: center; gap: 8px; border: 3px solid #F3EDFE; background: transparent; color: #F3EDFE; padding: 7px 16px; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.4px; box-shadow: 4px 4px 0 rgba(243,237,254,.45); transform: rotate(-2deg); margin-bottom: 24px; }
.circle-hero h1 { font-family: var(--f-title); font-weight: 800; letter-spacing: -0.03em; line-height: 1.02; font-size: clamp(38px,6.2vw,68px); }
.circle-hero h1 .accent { font-family: var(--f-accent); font-style: italic; font-weight: 400; color: #C6A9FF; }
.circle-sub { font-size: 15.5px; font-weight: 500; line-height: 1.62; color: #C3B6E4; max-width: 520px; margin: 20px auto 0; }
.circle-note { display: inline-flex; align-items: flex-start; gap: 9px; text-align: left; margin-top: 26px; border: 2px solid rgba(243,237,254,.32); padding: 11px 16px; font-size: 12.5px; font-weight: 500; color: #D6CCF0; max-width: 470px; line-height: 1.55; }

.circle-band { padding: 62px 24px; border-bottom: 4px solid var(--ink); }
.circle-band .in { max-width: 1040px; margin: 0 auto; }
.circle-band h2 { font-family: var(--f-title); font-weight: 800; letter-spacing: -0.03em; font-size: clamp(25px,3.4vw,38px); text-align: center; }
.circle-band h2 .accent { font-family: var(--f-accent); font-style: italic; font-weight: 400; }
.band-perks { background: var(--mist); background-image: radial-gradient(rgba(136,86,242,.2) 1.5px, transparent 1.5px); background-size: 20px 20px; }
.perks { display: grid; grid-template-columns: repeat(auto-fit, minmax(238px, 1fr)); gap: 18px; margin-top: 34px; }
.perk { background: var(--paper); border: 4px solid var(--ink); box-shadow: var(--shadow-sm); padding: 20px 18px; display: flex; flex-direction: column; gap: 11px; }
.perk-ic { width: 44px; height: 44px; border: 3px solid var(--ink); display: flex; align-items: center; justify-content: center; }
.perk h3 { font-family: var(--f-title); font-weight: 800; font-size: 17px; letter-spacing: -0.02em; line-height: 1.15; }
.perk p { font-size: 13px; font-weight: 500; line-height: 1.55; color: #4c4660; }
.perk .amt { font-family: var(--f-title); font-weight: 800; font-size: 22px; letter-spacing: -0.02em;
  background: linear-gradient(100deg,#8856F2 0%,#FF5CA8 25%,#F5D547 48%,#7BE0AD 68%,#8856F2 90%);
  background-size: 320% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: mooShine 5s linear infinite; }

.band-tracks { background: var(--lav); background-image: repeating-linear-gradient(45deg, rgba(17,17,17,.05) 0 2px, transparent 2px 11px); }
.tracks { display: grid; grid-template-columns: repeat(auto-fit, minmax(292px, 1fr)); gap: 20px; margin-top: 34px; }
.track-card { background: var(--paper); border: 4px solid var(--ink); box-shadow: var(--shadow); padding: 24px 22px; position: relative; }
.track-tag { position: absolute; top: -16px; left: 20px; background: var(--purple); color: #fff; border: 3px solid var(--ink); padding: 4px 12px; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; }
.track-card h3 { font-family: var(--f-title); font-weight: 800; font-size: 21px; letter-spacing: -0.02em; margin: 10px 0 8px; }
.track-card p { font-size: 13.5px; font-weight: 500; line-height: 1.6; color: #4c4660; }
.track-card ul { list-style: none; margin-top: 14px; display: flex; flex-direction: column; gap: 8px; }
.track-card li { display: flex; gap: 9px; font-size: 13px; font-weight: 500; line-height: 1.5; color: #3d3752; }
.track-card li b { font-weight: 700; color: var(--ink); }
.track-card li::before { content: ''; flex: none; width: 9px; height: 9px; margin-top: 5px; background: var(--purple); border: 2px solid var(--ink); }

.band-apply { background: var(--cream); }
.circle-panel { max-width: 560px; margin: 30px auto 0; background: var(--paper); border: 4px solid var(--ink); box-shadow: var(--shadow); padding: 32px 30px 26px; }
.circle-lede { font-size: 13.5px; font-weight: 500; line-height: 1.6; color: #4c4660; margin-bottom: 22px; }
.circle-done { text-align: center; padding: 20px 6px 10px; }
.circle-done .mark { width: 74px; height: 74px; border: 4px solid var(--ink); background: #7BE0AD; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); }
.circle-done h3 { font-family: var(--f-title); font-weight: 800; font-size: 26px; letter-spacing: -0.03em; }
.circle-done p { font-size: 14px; font-weight: 500; color: #4a4460; margin-top: 12px; line-height: 1.62; }

@media (max-width: 760px) {
  .circle-hero { padding: 46px 18px 46px; }
  .circle-hero h1 { font-size: 33px; }
  .circle-band { padding: 48px 18px; }
  .circle-panel { padding: 24px 18px 20px; }
}
`;

// /talent-feedbacks. The page reuses CIRCLE_CSS for its hero, band, panel and
// done state; only the three-way referral control below is new.
export const FEEDBACK_CSS = `
.fb-legend { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.1px; color: #57516b; display: block; margin-bottom: 8px; }
.fb-choices { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* flex so a chip whose label wraps to two lines ("Yes, with my name") stays the
   same height as its neighbours instead of leaving a ragged row */
.fb-choice { position: relative; display: flex; }
.fb-choice input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; margin: 0; cursor: pointer; }
/* text-transform is inherited from .field label, which uppercases its text.
   Without this the three choices read YES / MAYBE / NO. */
.fb-choice span { flex: 1; display: flex; align-items: center; justify-content: center; text-align: center; font-family: var(--f-ui); font-weight: 700; font-size: 14px; line-height: 1.3; text-transform: none; letter-spacing: 0; color: var(--ink); background: var(--paper); border: 3px solid var(--ink); padding: 12px 8px; transition: background .12s, color .12s, box-shadow .12s; }
.fb-choice input:hover + span { background: var(--cream); }
.fb-choice input:focus-visible + span { box-shadow: 4px 4px 0 var(--purple); }
/* Selected state is driven by an .on class from React state, the same way
   .navpill a.on works. The bare sibling combinator was losing to the base
   .fb-choice span rule; a class on the label is unambiguous. :checked is kept
   alongside it so the control still paints correctly without JS. */
.fb-choice.on span,
.fb-choice input:checked + span { background: var(--purple); color: #fff; box-shadow: var(--shadow-sm); }
.fb-hint { font-size: 12px; font-weight: 500; color: #6b6580; line-height: 1.5; margin-bottom: 6px; }
/* the 1-5 rating: five narrow chips rather than three wide ones */
.fb-choices.five { grid-template-columns: repeat(5, 1fr); gap: 8px; }
.fb-choices.five .fb-choice span { padding: 12px 4px; font-size: 15px; }
/* the scale is meaningless without saying which end is good */
.fb-anchors { display: flex; justify-content: space-between; margin-top: 7px; font-size: 11px; font-weight: 600; color: #9d97ad; text-transform: none; letter-spacing: 0; }
.fb-optional { font-weight: 500; text-transform: none; letter-spacing: 0; color: #9d97ad; }

@media (max-width: 520px) {
  .fb-choices { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .fb-choice span { transition: none; }
}
`;
