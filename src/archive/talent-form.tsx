// ARCHIVED - the talent form as it looked before the comic redesign.
//
// Kept for reference only. It lives outside src/routes so it is neither routed
// nor bundled, and the createFileRoute() call is removed because "/talent-form"
// no longer exists in the route tree.
//
// To bring it back: move this file to src/routes/talent-form.tsx and restore
//   export const Route = createFileRoute("/talent-form")({
//     head: () => ({ meta: [{ title: "Join the Moo Talent Network" }] }),
//     component: TalentFormPage,
//   });
import { useEffect, useRef } from "react";

export function TalentFormPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.innerHTML = FORM_HTML;

    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=DM+Serif"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
      document.head.appendChild(link);
    }

    const scripts = el.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      newScript.textContent = oldScript.textContent;
      document.body.appendChild(newScript);
      document.body.removeChild(newScript);
    });
  }, []);

  return <div ref={containerRef} />;
}

const FORM_HTML = `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #faf9f7; --surface: #ffffff; --border: rgba(0,0,0,0.09);
    --border-md: rgba(0,0,0,0.16); --border-dk: rgba(0,0,0,0.65);
    --text: #1a1a18; --muted: #6b6b65; --hint: #a8a8a2;
    --accent: #1a1a18; --radius: 10px; --max: 560px;
    --brand: #8856f2; /* logo purple */
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #111110; --surface: #1c1c1a; --border: rgba(255,255,255,0.09);
      --border-md: rgba(255,255,255,0.18); --border-dk: rgba(255,255,255,0.72);
      --text: #e8e8e2; --muted: #9c9c96; --hint: #5a5a58; --accent: #e8e8e2;
      --brand: #a47cf5; /* lifted for contrast on dark */
    }
  }
  html, body { min-height: 100%; background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased; }
  .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 5.5rem 1.25rem 2rem; }
  /* persistent header - logo sits top-left across both the intro and the form */
  .site-header { position: fixed; top: 0; left: 0; right: 0; z-index: 20; padding: 1.2rem 1.8rem; display: flex; align-items: center; pointer-events: none; }
  .site-logo { display: block; height: 22px; pointer-events: auto; }
  .site-logo svg { height: 100%; width: auto; display: block; }
  @media (max-width: 520px) { .site-header { padding: 1rem 1.2rem; } .site-logo { height: 19px; } }
  .card { background: var(--surface); border: 0.5px solid var(--border); border-radius: 18px; width: 100%; max-width: var(--max); padding: 2.75rem 2.75rem 2rem; position: relative; overflow: hidden; }
  @media (max-width: 520px) { .card { padding: 2rem 1.5rem 1.5rem; border-radius: 14px; } }
  .progress-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--border); }
  .progress-fill { height: 100%; background: var(--accent); transition: width 0.5s cubic-bezier(0.4,0,0.2,1); width: 0%; }
  .form-steps { min-height: 360px; display: flex; flex-direction: column; }
  .step { display: none; flex-direction: column; gap: 1.25rem; animation: fadeUp 0.36s ease both; flex: 1; }
  .step.active { display: flex; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(13px); } to { opacity: 1; transform: translateY(0); } }
  .step-label { font-size: 10.5px; letter-spacing: 0.13em; text-transform: uppercase; color: var(--hint); font-weight: 500; }
  .step-question { font-family: 'DM Serif Display', serif; font-size: clamp(21px, 4.5vw, 27px); line-height: 1.22; color: var(--text); font-style: italic; }
  .hint-text { font-size: 12px; color: var(--hint); }
  .role-list { display: flex; flex-direction: column; gap: 8px; }
  .role-card { display: flex; align-items: center; gap: 14px; padding: 13px 15px; border: 0.5px solid var(--border-md); border-radius: var(--radius); background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif; text-align: left; transition: border-color 0.15s, background 0.15s; width: 100%; }
  .role-card:hover { border-color: var(--border-dk); background: var(--bg); }
  .role-card.selected { border-color: var(--accent); border-width: 1.5px; background: var(--bg); }
  .role-icon { width: 36px; height: 36px; min-width: 36px; border-radius: 8px; border: 0.5px solid var(--border-md); display: flex; align-items: center; justify-content: center; font-size: 16px; background: var(--bg); }
  .role-info { flex: 1; }
  .role-name { font-size: 14px; font-weight: 500; color: var(--text); line-height: 1.3; }
  .role-desc { font-size: 12px; color: var(--muted); margin-top: 1px; line-height: 1.35; }
  .dot { width: 16px; height: 16px; min-width: 16px; border-radius: 50%; border: 1.5px solid var(--border-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.15s; }
  .role-card.selected .dot { background: var(--accent); border-color: var(--accent); }
  .role-card.selected .dot::after { content: ''; display: block; width: 6px; height: 6px; border-radius: 50%; background: var(--surface); }
  .tag-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag-btn { padding: 7px 14px; border: 0.5px solid var(--border-md); border-radius: 999px; background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--muted); transition: all 0.15s; }
  .tag-btn:hover { border-color: var(--border-dk); color: var(--text); }
  .tag-btn.selected { background: var(--accent); color: var(--surface); border-color: var(--accent); }
  .form-field { display: flex; flex-direction: column; gap: 5px; }
  .form-field label { font-size: 10.5px; letter-spacing: 0.09em; text-transform: uppercase; color: var(--hint); font-weight: 500; }
  input[type="text"], input[type="email"], input[type="url"], input[type="tel"], textarea { width: 100%; padding: 10px 0; border: none; border-bottom: 1px solid var(--border-md); background: transparent; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--text); outline: none; transition: border-color 0.2s; -webkit-appearance: none; }
  input:focus, textarea:focus { border-color: var(--accent); }
  input::placeholder, textarea::placeholder { color: var(--hint); }
  textarea { resize: none; min-height: 72px; line-height: 1.5; }
  .level-track { display: flex; gap: 6px; }
  .level-item { flex: 1; padding: 9px 4px; border: 0.5px solid var(--border-md); border-radius: var(--radius); background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 11px; color: var(--muted); text-align: center; transition: all 0.15s; line-height: 1.3; }
  .level-item:hover { border-color: var(--border-dk); color: var(--text); }
  .level-item.selected { border-color: var(--accent); border-width: 1.5px; color: var(--text); font-weight: 500; }
  .choice-col { display: flex; flex-direction: column; gap: 8px; }
  .choice-btn { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border: 0.5px solid var(--border-md); border-radius: var(--radius); background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--text); text-align: left; transition: border-color 0.15s, background 0.15s; width: 100%; }
  .choice-btn:hover { border-color: var(--border-dk); background: var(--bg); }
  .choice-btn.selected { border-color: var(--accent); border-width: 1.5px; background: var(--bg); }
  .choice-btn .dot { border-color: var(--border-md); }
  .choice-btn.selected .dot { background: var(--accent); border-color: var(--accent); }
  .choice-btn.selected .dot::after { content: ''; display: block; width: 6px; height: 6px; border-radius: 50%; background: var(--surface); }
  .error-msg { font-size: 12px; color: #d04040; min-height: 16px; }
  .summary { display: flex; flex-direction: column; }
  .summary-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; font-size: 13px; padding: 9px 0; border-bottom: 0.5px solid var(--border); }
  .summary-row:last-child { border-bottom: none; }
  .summary-key { color: var(--hint); min-width: 100px; flex-shrink: 0; }
  .summary-val { color: var(--text); text-align: right; word-break: break-word; }
  .nav-row { display: flex; align-items: center; justify-content: space-between; margin-top: 1.75rem; padding-top: 1.25rem; border-top: 0.5px solid var(--border); }
  .btn-back { background: transparent; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--hint); display: flex; align-items: center; gap: 5px; transition: color 0.15s; padding: 0; }
  .btn-back:hover { color: var(--text); }
  .btn-back[hidden] { visibility: hidden; pointer-events: none; }
  .btn-next { display: flex; align-items: center; gap: 7px; padding: 10px 22px; border-radius: var(--radius); background: var(--accent); color: var(--surface); border: none; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity 0.15s, transform 0.1s; }
  .btn-next:hover { opacity: 0.85; }
  .btn-next:active { transform: scale(0.98); }
  .btn-next:disabled { opacity: 0.3; cursor: not-allowed; }
  .success-state { display: none; flex-direction: column; align-items: center; justify-content: center; text-align: center; min-height: 360px; gap: 1rem; animation: fadeUp 0.5s ease both; }
  .success-state.visible { display: flex; }
  .success-icon { width: 50px; height: 50px; border: 1.5px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .success-title { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 26px; }
  .success-sub { font-size: 14px; color: var(--muted); max-width: 290px; line-height: 1.65; }
  .btn-reset { margin-top: 6px; background: transparent; border: 0.5px solid var(--border-md); border-radius: var(--radius); padding: 8px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--muted); cursor: pointer; transition: color 0.15s, border-color 0.15s; }
  .btn-reset:hover { color: var(--text); border-color: var(--border-dk); }
  .submit-note { font-size: 11px; color: var(--hint); text-align: center; margin-top: 4px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }

  /* ---------- Brand gate: the screen before the form ---------- */
  .intro { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 5.5rem 1.5rem 0; overflow: hidden; }
  .intro.gone { display: none; }
  .intro-inner { position: relative; z-index: 10; width: 100%; max-width: 640px; display: flex; flex-direction: column; align-items: center; text-align: center; }
  /* staggered reveal - each child lands a beat after the last */
  .intro-inner > * { animation: introUp 0.75s cubic-bezier(0.22,1,0.36,1) both; }
  .intro-inner > *:nth-child(1) { animation-delay: 0.04s; }
  .intro-inner > *:nth-child(2) { animation-delay: 0.13s; }
  .intro-inner > *:nth-child(3) { animation-delay: 0.22s; }
  .intro-inner > *:nth-child(4) { animation-delay: 0.31s; }
  .intro-inner > *:nth-child(5) { animation-delay: 0.42s; }
  .intro-inner > *:nth-child(6) { animation-delay: 0.53s; }
  .intro-inner > *:nth-child(7) { animation-delay: 0.62s; }
  .intro-inner > *:nth-child(8) { animation-delay: 0.7s; }
  @keyframes introUp { from { opacity: 0; transform: translateY(17px); } to { opacity: 1; transform: none; } }

  /* generated background: soft colour blooms under a halftone dot field */
  .bg-blooms { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
  .bg-blooms i { position: absolute; border-radius: 50%; filter: blur(58px); opacity: 0.26; }
  .bloom-1 { width: 340px; height: 340px; background: #8856f2; left: -90px; top: 8%; }
  .bloom-2 { width: 300px; height: 300px; background: #ff5ca8; right: -80px; top: 2%; }
  .bloom-3 { width: 280px; height: 280px; background: #f5d547; right: 12%; bottom: 12%; }
  .bg-halftone { position: absolute; inset: 0; z-index: 1; opacity: 0.45;
    background-image: radial-gradient(circle, rgba(136,86,242,0.32) 1.1px, transparent 1.1px); background-size: 13px 13px;
    -webkit-mask-image: linear-gradient(to bottom, #000, transparent 46%); mask-image: linear-gradient(to bottom, #000, transparent 46%); }
  @media (prefers-color-scheme: dark) { .bg-blooms i { opacity: 0.32; } .bg-halftone { opacity: 0.3; } }

  /* rotating seal + dotted arrow */
  .seal { position: absolute; right: 4.5%; top: 17%; z-index: 6; width: 94px; height: 94px; pointer-events: none; }
  .seal svg { width: 100%; height: 100%; animation: sealSpin 20s linear infinite; }
  @keyframes sealSpin { to { transform: rotate(360deg); } }
  .seal-mid { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 19px; color: var(--brand); }
  .doodle { position: absolute; left: 5%; top: 25%; z-index: 6; color: var(--brand); opacity: 0.8; pointer-events: none; }
  @media (max-width: 900px) { .seal, .doodle { display: none; } }

  .intro-eyebrow { display: inline-flex; align-items: center; gap: 7px; font-size: 10.5px; letter-spacing: 0.19em; text-transform: uppercase; color: var(--brand); font-weight: 500; margin-bottom: 1.25rem; padding: 6px 14px; border-radius: 999px; background: rgba(136,86,242,0.09); border: 0.5px solid rgba(136,86,242,0.26); }
  .intro-eyebrow::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--brand); }
  @media (prefers-color-scheme: dark) { .intro-eyebrow { background: rgba(164,124,245,0.13); border-color: rgba(164,124,245,0.32); } }
  .intro-title { font-size: clamp(30px, 6.4vw, 50px); line-height: 1.08; letter-spacing: -0.012em; font-weight: 700; margin-bottom: 1.05rem; max-width: 640px; }
  .intro-title .blk { display: inline-block; background: var(--brand); color: #fff; border-radius: 9px; padding: 0 0.24em 0.09em; margin: 0 0.02em; }
  .intro-sub { font-size: 14.5px; line-height: 1.68; color: var(--muted); max-width: 420px; margin-bottom: 1.55rem; }
  /* what the network actually does for a creative */
  .intro-values { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; max-width: 560px; margin-bottom: 1.9rem; }
  .intro-value { font-size: 12px; line-height: 1.4; color: var(--text); background: var(--surface); border: 0.5px solid var(--border-md); border-radius: 999px; padding: 7px 15px; }

  .intro-proof { width: 100%; padding: 0; margin: 2.6rem 0 0; }
  .intro-proof-label { display: block; font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--hint); margin-bottom: 1.15rem; }

  /* creator + brand strip - small circular avatars linking out */
  .creators { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem 1.5rem; }
  .creator { display: flex; flex-direction: column; align-items: center; gap: 8px; text-decoration: none; width: 78px; }
  .creator-av { position: relative; width: 56px; height: 56px; border-radius: 50%; overflow: hidden; background: rgba(136,86,242,0.1); border: 1px solid var(--border-md); display: flex; align-items: center; justify-content: center; transition: transform 0.18s ease, border-color 0.18s ease; }
  /* initials show through until (or unless) a photo loads over them */
  .creator-av::before { content: attr(data-initials); font-size: 15px; font-weight: 500; letter-spacing: 0.02em; color: var(--brand); }
  /* hidden until it actually decodes, so a missing file leaves the initials
     visible rather than covering them with an empty box */
  .creator-av img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0; transition: opacity 0.2s ease; }
  .creator-av img.loaded { opacity: 1; }
  .creator:hover .creator-av { transform: translateY(-2px); border-color: var(--brand); }
  .creator-name { font-size: 11px; line-height: 1.3; color: var(--muted); text-align: center; transition: color 0.18s ease; }
  .creator:hover .creator-name { color: var(--text); }
  .creator:focus-visible .creator-av { outline: 2px solid var(--brand); outline-offset: 2px; }
  @media (max-width: 520px) { .creators { gap: 1rem 1.1rem; } .creator { width: 66px; } .creator-av { width: 48px; height: 48px; } .creator-name { font-size: 10px; } }
  .intro-cta { display: inline-flex; align-items: center; gap: 9px; padding: 13px 30px; border: none; border-radius: 999px; background: var(--accent); color: var(--surface); font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500; cursor: pointer; transition: transform 0.15s, background 0.2s, box-shadow 0.25s; box-shadow: 0 8px 22px -10px rgba(0,0,0,0.5); }
  .intro-cta:hover { transform: translateY(-1px); background: var(--brand); color: #fff; box-shadow: 0 12px 30px -10px rgba(136,86,242,0.7); }
  .intro-cta:active { transform: translateY(0); }
  .intro-meta { margin-top: 0.9rem; font-size: 11.5px; color: var(--hint); }

  /* ---------- illustrated card fan ---------- */
  .fan { display: flex; justify-content: center; align-items: flex-end; width: 100%; margin-top: 2.1rem; height: 172px; }
  .fan-card { flex: none; width: 116px; height: 150px; border-radius: 14px; overflow: hidden; margin: 0 -14px; border: 4px solid var(--surface);
    box-shadow: 0 2px 6px rgba(0,0,0,0.09), 0 18px 38px -16px rgba(0,0,0,0.45);
    display: flex; flex-direction: column; justify-content: space-between; padding: 13px 12px 11px;
    transition: transform 0.28s cubic-bezier(0.2,0.9,0.3,1); }
  .fan-title { font-size: 15px; font-weight: 700; line-height: 1.13; letter-spacing: -0.018em; text-align: left; }
  .fan-tag { font-size: 8.5px; font-weight: 500; letter-spacing: 0.13em; text-transform: uppercase; opacity: 0.7; margin-top: 6px; text-align: left; }
  /* the wordmark as a mask, so it takes each card's own text colour */
  .fan-logo { width: 52px; height: 9px; background: currentColor; opacity: 0.72;
    -webkit-mask: url('/mulah-logo-mono.svg') no-repeat left center / contain;
    mask: url('/mulah-logo-mono.svg') no-repeat left center / contain; }
  .fan-card:nth-child(1) { transform: rotate(-15deg) translateY(20px); }
  .fan-card:nth-child(2) { transform: rotate(-9deg) translateY(7px); }
  .fan-card:nth-child(3) { transform: rotate(-3deg); }
  .fan-card:nth-child(4) { transform: rotate(3deg); }
  .fan-card:nth-child(5) { transform: rotate(9deg) translateY(7px); }
  .fan-card:nth-child(6) { transform: rotate(15deg) translateY(20px); }
  .fan-card:hover { transform: translateY(-18px) rotate(0deg) scale(1.05); z-index: 20; }
  .cv-purple { background: #8856f2; color: #fff; }
  .cv-yellow { background: #f5d547; color: #14140f; }
  .cv-pink   { background: #ff5ca8; color: #fff; }
  .cv-mint   { background: #7be0ad; color: #0c2f20; }
  .cv-ink    { background: #17171a; color: #fff; }
  .cv-sky    { background: #6fa8f5; color: #0a1f3d; }
  @media (max-width: 640px) {
    .fan { height: 138px; margin-top: 1.7rem; }
    .fan-card { width: 92px; height: 122px; margin: 0 -11px; padding: 11px 10px 9px; border-width: 3px; }
    .fan-title { font-size: 12px; }
    .fan-tag { font-size: 7px; margin-top: 4px; }
    .fan-logo { width: 40px; height: 7px; }
  }

  .page.gone { display: none; }
  .page.entering { animation: introUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
  @media (prefers-reduced-motion: reduce) {
    .intro-inner > *, .page.entering { animation: none; }
    .seal svg { animation: none; }
    .fan-card { transition: none; }
  }
</style>

<!-- Logo paths are inlined rather than defined as a <symbol> and pulled in
     with <use>. There is only one placement now, so the indirection bought
     nothing and <use> failed to resolve in some browsers once this markup
     was injected via innerHTML. "Mulah" keeps the fixed brand purple; "moo"
     is currentColor so it stays legible in dark mode. -->
<header class="site-header">
  <a class="site-logo" href="/" aria-label="Mulah Moo home">
    <svg role="img" aria-label="Mulah Moo" viewBox="556 767.31 2888 464.38" xmlns="http://www.w3.org/2000/svg">
      <path fill="#8856F2" d="M1032.68 1222.87H946.69V1020.85C946.69 980.857 925.7 952.385 894.553 952.385C862.052 952.385 838.353 982.891 838.353 1023.57V1222.87H750.329V1022.21C750.329 968.655 736.11 955.096 697.515 955.096C662.306 955.096 644.024 976.79 644.024 1020.18V1222.87H556V889.338H638.607V938.148C660.951 894.083 692.098 880.525 736.11 880.525C781.476 880.525 803.144 894.761 828.874 933.403C847.156 896.795 876.948 880.525 918.929 880.525C985.962 880.525 1032.68 929.335 1032.68 991.704V1222.87Z"/>
      <path fill="#8856F2" d="M1366.43 1222.87H1283.15V1176.1C1260.13 1214.06 1225.59 1231.69 1179.55 1231.69C1113.19 1231.69 1066.47 1182.2 1066.47 1108.98V889.338H1154.5V1095.43C1154.5 1137.46 1173.46 1157.79 1210.7 1157.79C1255.39 1157.79 1279.09 1125.93 1279.09 1081.87V889.338H1366.43V1222.87Z"/>
      <path fill="#8856F2" d="M1493.05 1222.87H1405.03V767.312H1493.05V1222.87Z"/>
      <path fill="#8856F2" d="M1731.78 1096.1L1732.46 1059.5C1723.65 1068.31 1708.08 1073.05 1675.58 1079.16C1625.47 1088.65 1609.22 1102.88 1609.22 1131.36C1609.22 1156.44 1624.12 1168.64 1651.88 1168.64C1697.25 1168.64 1731.1 1135.42 1731.78 1096.1ZM1820.48 1222.87H1738.55C1735.84 1214.74 1733.81 1203.21 1733.13 1193.05C1712.14 1216.1 1676.93 1231.69 1632.24 1231.69C1556.41 1231.69 1521.2 1194.4 1521.2 1140.17C1521.2 1043.9 1585.52 1033.06 1674.22 1020.85C1718.24 1014.75 1730.42 1005.94 1730.42 982.891C1730.42 961.197 1708.76 948.317 1674.22 948.317C1634.28 948.317 1618.03 967.977 1613.96 997.805H1532.03C1533.39 928.657 1571.3 880.525 1678.29 880.525C1783.92 880.525 1820.48 927.979 1820.48 1012.04V1222.87Z"/>
      <path fill="#8856F2" d="M2161.29 1222.87H2072.59V1016.11C2072.59 965.943 2055.66 950.351 2015.71 950.351C1971.7 950.351 1947.32 986.958 1947.32 1031.7V1222.87H1859.3V767.312H1947.32V932.725C1960.19 902.896 2000.81 880.525 2045.5 880.525C2113.89 880.525 2161.29 920.522 2161.29 986.958V1222.87Z"/>
      <path fill="currentColor" d="M2679.02 1222.89H2593.04L2628.92 1021.12C2630.28 1013 2630.96 1005.55 2630.96 999.456C2630.96 966.28 2614.03 952.739 2588.3 952.739C2554.46 952.739 2526.7 983.207 2519.93 1023.83L2484.73 1222.89H2396.72L2431.92 1022.48C2433.95 1008.93 2434.63 998.102 2435.3 989.3C2435.3 960.187 2421.09 955.447 2391.3 955.447C2356.1 955.447 2333.76 977.113 2326.31 1020.44L2290.43 1222.89H2202.42L2261.32 889.772H2343.91L2335.11 938.521C2365.57 894.512 2398.75 880.971 2442.75 880.971C2488.11 880.971 2507.07 895.189 2526.02 933.781C2551.07 897.22 2583.57 880.971 2625.54 880.971C2685.11 880.971 2721.67 919.563 2721.67 971.697C2721.67 977.79 2720.99 985.238 2719.64 992.008L2679.02 1222.89Z"/>
      <path fill="currentColor" d="M2888.15 1157.89C2956.52 1157.89 2989.7 1107.79 2989.7 1029.25C2989.7 968.988 2967.36 955.447 2924.03 955.447C2854.98 955.447 2822.48 1004.87 2822.48 1083.41C2822.48 1140.96 2844.14 1157.89 2888.15 1157.89ZM2875.29 1231.69C2781.86 1231.69 2731.09 1173.46 2731.09 1088.83C2731.09 967.634 2815.71 880.971 2936.89 880.971C3026.93 880.971 3079.06 937.167 3079.06 1023.15C3079.06 1145.02 2994.44 1231.69 2875.29 1231.69Z"/>
      <path fill="currentColor" d="M3253.09 1157.89C3321.46 1157.89 3354.64 1107.79 3354.64 1029.25C3354.64 968.988 3332.3 955.447 3288.97 955.447C3219.92 955.447 3187.42 1004.87 3187.42 1083.41C3187.42 1140.96 3209.08 1157.89 3253.09 1157.89ZM3240.23 1231.69C3146.8 1231.69 3096.03 1173.46 3096.03 1088.83C3096.03 967.634 3180.65 880.971 3301.83 880.971C3391.87 880.971 3444 937.167 3444 1023.15C3444 1145.02 3359.38 1231.69 3240.23 1231.69Z"/>
    </svg>
  </a>
</header>

<div class="intro" id="intro">
  <div class="bg-blooms"><i class="bloom-1"></i><i class="bloom-2"></i><i class="bloom-3"></i></div>
  <div class="bg-halftone"></div>

  <div class="seal" aria-hidden="true">
    <svg viewBox="0 0 100 100">
      <defs><path id="seal-path" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs>
      <text font-size="9.2" letter-spacing="2.2" fill="currentColor" style="color:var(--brand)">
        <textPath href="#seal-path">SELECTIVE &middot; INVITE ONLY &middot; SELECTIVE &middot; INVITE ONLY &middot;</textPath>
      </text>
    </svg>
    <div class="seal-mid">&#10022;</div>
  </div>
  <svg class="doodle" width="56" height="56" viewBox="0 0 58 58" fill="none" aria-hidden="true">
    <path d="M4 6C22 14 34 26 40 46" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 7"/>
    <path d="M30 40 L41 48 L44 35" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <div class="intro-inner">
    <span class="intro-eyebrow">Moo Talent Network</span>
    <h1 class="intro-title">Apply for <span class="blk">hidden</span> creative roles.</h1>
    <p class="intro-sub">Work with creator-led brands across the US, Europe, India and UAE.</p>
    <div class="intro-values">
      <div class="intro-value">Jobs that never get posted</div>
      <div class="intro-value">Clients across the globe</div>
      <div class="intro-value">Career guidance, minus the fluff</div>
    </div>
    <button class="intro-cta" id="btn-begin" type="button">Begin your application &rarr;</button>
    <p class="intro-meta">7 questions &middot; about 2 minutes &middot; 70% of assignments are paid</p>
    <div class="intro-proof">
      <span class="intro-proof-label">Creators and brands who hired from our community</span>
      <div class="creators">
        <a class="creator" href="https://www.instagram.com/amywang.online/" target="_blank" rel="noopener noreferrer">
          <span class="creator-av" data-initials="AW"><img src="/creators/amy-wang.jpg" alt="" /></span>
          <span class="creator-name">Amy Wang</span>
        </a>
        <a class="creator" href="https://www.instagram.com/cloiey/" target="_blank" rel="noopener noreferrer">
          <span class="creator-av" data-initials="CZ"><img src="/creators/chloe-zhu.jpg" alt="" /></span>
          <span class="creator-name">Chloe Zhu</span>
        </a>
        <a class="creator" href="https://www.youtube.com/@AmanManazir" target="_blank" rel="noopener noreferrer">
          <span class="creator-av" data-initials="AM"><img src="/creators/aman-manazir.jpg" alt="" /></span>
          <span class="creator-name">Aman Manazir</span>
        </a>
        <a class="creator" href="https://www.linkedin.com/company/talkingheadsco" target="_blank" rel="noopener noreferrer">
          <span class="creator-av" data-initials="SM"><img src="/creators/safwaan-mohammed.jpg" alt="" /></span>
          <span class="creator-name">Safwaan Mohammed</span>
        </a>
        <a class="creator" href="https://www.youtube.com/@learningphoenix" target="_blank" rel="noopener noreferrer">
          <span class="creator-av" data-initials="PL"><img src="/creators/phoenix-learning.jpg" alt="" /></span>
          <span class="creator-name">Phoenix Learning</span>
        </a>
        <a class="creator" href="https://www.instagram.com/fionaylin/" target="_blank" rel="noopener noreferrer">
          <span class="creator-av" data-initials="F"><img src="/creators/fiona.jpg" alt="" /></span>
          <span class="creator-name">Fiona</span>
        </a>
      </div>
    </div>

    <!-- Illustrated role cards. Deliberately not the client photos again -
         these carry the crafts we place, so the fan says something the copy
         does not. Illustrations are inline SVG, no image assets. -->
    <div class="fan" aria-hidden="true">
      <div class="fan-card cv-yellow">
        <div><div class="fan-title">Content<br/>Strategist</div><div class="fan-tag">Now hiring</div></div>
        <div class="fan-logo"></div>
      </div>
      <div class="fan-card cv-purple">
        <div><div class="fan-title">Creative<br/>Lead</div><div class="fan-tag">Consultant</div></div>
        <div class="fan-logo"></div>
      </div>
      <div class="fan-card cv-pink">
        <div><div class="fan-title">Freelance<br/>Gigs</div><div class="fan-tag">Rolling</div></div>
        <div class="fan-logo"></div>
      </div>
      <div class="fan-card cv-mint">
        <div><div class="fan-title">Video<br/>Editor</div><div class="fan-tag">Remote</div></div>
        <div class="fan-logo"></div>
      </div>
      <div class="fan-card cv-ink">
        <div><div class="fan-title">Writer</div><div class="fan-tag">Scripts &amp; ads</div></div>
        <div class="fan-logo"></div>
      </div>
      <div class="fan-card cv-sky">
        <div><div class="fan-title">Social<br/>Media</div><div class="fan-tag">In-house</div></div>
        <div class="fan-logo"></div>
      </div>
    </div>
  </div>
</div>

<div class="page gone" id="form-page">
  <div class="card">
    <div class="progress-bar"><div class="progress-fill" id="progress"></div></div>

    <div class="form-steps" id="form-steps">

      <!-- Step 0: Top-level role -->
      <div class="step active" id="step-0">
        <span class="step-label">1 of 7</span>
        <h1 class="step-question">What kind of creative work do you do?</h1>
        <div class="role-list">
          <button class="role-card" data-val="Video Editor">
            <div class="role-icon">🎬</div>
            <div class="role-info">
              <div class="role-name">Video Editor</div>
              <div class="role-desc">Post-production specialists who cut, assemble and finish video</div>
            </div>
            <div class="dot"></div>
          </button>
          <button class="role-card" data-val="Designer">
            <div class="role-icon">🎨</div>
            <div class="role-info">
              <div class="role-name">Designer</div>
              <div class="role-desc">Visual craft across brand, product and platform</div>
            </div>
            <div class="dot"></div>
          </button>
          <button class="role-card" data-val="Creative Head / Production">
            <div class="role-icon">🎯</div>
            <div class="role-info">
              <div class="role-name">Creative Head / Production</div>
              <div class="role-desc">People who own creative vision or manage production pipelines</div>
            </div>
            <div class="dot"></div>
          </button>
          <button class="role-card" data-val="Content Strategist">
            <div class="role-icon">📊</div>
            <div class="role-info">
              <div class="role-name">Content Strategist</div>
              <div class="role-desc">Platform-specific growth and content planning</div>
            </div>
            <div class="dot"></div>
          </button>
          <button class="role-card" data-val="Writer">
            <div class="role-icon">✍️</div>
            <div class="role-info">
              <div class="role-name">Writer</div>
              <div class="role-desc">Word-first creators across scripts, editorial and ads</div>
            </div>
            <div class="dot"></div>
          </button>
          <button class="role-card" data-val="Brand Face / Creator">
            <div class="role-icon">🎤</div>
            <div class="role-info">
              <div class="role-name">Brand Face / Creator</div>
              <div class="role-desc">On-camera talent who front channels, ads and campaigns</div>
            </div>
            <div class="dot"></div>
          </button>
        </div>
        <span class="error-msg" id="err-0"></span>
      </div>

      <!-- Step 1: Sub-role (built dynamically) -->
      <div class="step" id="step-1">
        <span class="step-label">2 of 7</span>
        <h2 class="step-question" id="subrole-question">What's your specific focus?</h2>
        <span class="hint-text">Pick all that apply</span>
        <div class="tag-grid" id="subrole-tags"></div>
        <span class="error-msg" id="err-1"></span>
      </div>

      <!-- Step 2: Basics — name / email / phone / city / linkedin -->
      <div class="step" id="step-2">
        <span class="step-label">3 of 7</span>
        <h2 class="step-question">Let's start with the basics.</h2>
        <div class="form-field">
          <label for="f-name">Full name</label>
          <input type="text" id="f-name" placeholder="Your name" autocomplete="name" />
        </div>
        <div class="form-field">
          <label for="f-email">Email</label>
          <input type="email" id="f-email" placeholder="you@example.com" autocomplete="email" />
        </div>
        <div class="form-field">
          <label for="f-phone">Contact number</label>
          <input type="tel" id="f-phone" placeholder="+91 98765 43210" autocomplete="tel" />
        </div>
        <div class="form-field">
          <label for="f-city">City</label>
          <input type="text" id="f-city" placeholder="e.g. Mumbai, Delhi, Bangalore…" />
        </div>
        <div class="form-field">
          <label for="f-linkedin">LinkedIn profile URL</label>
          <input type="url" id="f-linkedin" placeholder="https://linkedin.com/in/yourname" autocomplete="url" />
        </div>
        <span class="error-msg" id="err-2"></span>
      </div>

      <!-- Step 3: Experience -->
      <div class="step" id="step-3">
        <span class="step-label">4 of 7</span>
        <h2 class="step-question">How many years have you been creating professionally?</h2>
        <div class="level-track">
          <button class="level-item" data-val="0–1 yr">0–1<br>yr</button>
          <button class="level-item" data-val="2–3 yrs">2–3<br>yrs</button>
          <button class="level-item" data-val="4–6 yrs">4–6<br>yrs</button>
          <button class="level-item" data-val="7–10 yrs">7–10<br>yrs</button>
          <button class="level-item" data-val="10+ yrs">10+<br>yrs</button>
        </div>
        <span class="error-msg" id="err-3"></span>
      </div>

      <!-- Step 4: Opportunity type -->
      <div class="step" id="step-4">
        <span class="step-label">5 of 7</span>
        <h2 class="step-question">What kind of opportunity are you open to?</h2>
        <div class="choice-col" id="opp-choices">
          <button class="choice-btn" data-val="Full-time"><span class="dot"></span>Full-time role</button>
          <button class="choice-btn" data-val="Freelance"><span class="dot"></span>Freelance / contract</button>
          <button class="choice-btn" data-val="Part-time"><span class="dot"></span>Part-time</button>
          <button class="choice-btn" data-val="Open to all"><span class="dot"></span>Open to anything</button>
        </div>
        <span class="error-msg" id="err-4"></span>
      </div>

      <!-- Step 5: Portfolio + note -->
      <div class="step" id="step-5">
        <span class="step-label">6 of 7</span>
        <h2 class="step-question">Where can we see your work?</h2>
        <div class="form-field">
          <label for="f-portfolio">Portfolio / Behance / Dribbble / YouTube URL</label>
          <input type="url" id="f-portfolio" placeholder="https://…" autocomplete="url" />
        </div>
        <div class="form-field">
          <label for="f-note">Anything else you'd like us to know?</label>
          <textarea id="f-note" rows="3" placeholder="Availability, preferred industries, rate range…"></textarea>
        </div>
        <span class="error-msg" id="err-5"></span>
      </div>

      <!-- Step 6: Confirm -->
      <div class="step" id="step-6">
        <span class="step-label">7 of 7</span>
        <h2 class="step-question">One last look before we send it off.</h2>
        <div class="summary" id="summary"></div>
        <p class="submit-note">Your info will be stored privately in our talent sheet.</p>
        <span class="error-msg" id="err-6"></span>
      </div>

    </div>

    <!-- Success -->
    <div class="success-state" id="success">
      <div class="success-icon">✓</div>
      <p class="success-title">You're on our radar.</p>
      <p class="success-sub">We'll review your profile and reach out when there's a fit. Keep creating great work.</p>
      <button class="btn-reset" id="btn-reset">Submit another →</button>
    </div>

    <!-- Nav -->
    <div class="nav-row" id="nav-row">
      <button class="btn-back" id="btn-back" hidden>← Back</button>
      <button class="btn-next" id="btn-next">Continue →</button>
    </div>
  </div>
</div>

<script>
(function() {
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzosXi2fXaE5Sfc5FPxUDYMbkcgv4SHjeYrxqW4oehuttUateqKV5T8LUxeHIt0GCP9SQ/exec';

  const TOTAL = 7;
  let current = 0;
  const data = {};

  const SUBROLES = {
    'Video Editor': [
      'Long form', 'Short form / Reels', 'Film / Cinematic',
      'Product / SaaS launches', 'AI filmmaking', 'Motion graphic Designer'
    ],
    'Designer': [
      'Thumbnail designer', 'Visual / Brand designer',
      'Graphic designer', 'UI / UX designer'
    ],
    'Creative Head / Production': [
      'Creative director', 'Creative producer', 'Head of content',
      'YouTube producer', 'Short form producer',
      'News producer', 'Pre-production lead', 'Post-production lead'
    ],
    'Content Strategist': [
      'YouTube strategist', 'Instagram strategist', 'LinkedIn strategist',
      'X / Twitter strategist', 'TikTok strategist', 'Podcast strategist'
    ],
    'Writer': [
      'Ad film writer', 'Long form scriptwriter', 'Short form scriptwriter',
      'Screenplay writer', 'News writer', 'Blog writer'
    ],
    'Brand Face / Creator': [
      'YT anchor / host', 'UGC creator', 'Meta / performance ad creator',
      'Actor', 'Podcast host', 'Voice-over artist',
      'Reels / short form face', 'Brand ambassador'
    ]
  };

  const $progress  = document.getElementById('progress');
  const $btnNext   = document.getElementById('btn-next');
  const $btnBack   = document.getElementById('btn-back');
  const $navRow    = document.getElementById('nav-row');
  const $formSteps = document.getElementById('form-steps');
  const $success   = document.getElementById('success');
  const $intro     = document.getElementById('intro');
  const $formPage  = document.getElementById('form-page');

  // Creator avatars show initials until a photo genuinely decodes, so missing
  // files degrade to initials rather than empty circles or broken-image icons.
  // Images are injected via innerHTML and may already have settled before this
  // runs, hence the complete check alongside the listeners.
  document.querySelectorAll('.creator-av img').forEach(function(img) {
    const show = function() { if (img.naturalWidth > 0) img.classList.add('loaded'); };
    const drop = function() { if (img.parentNode) img.parentNode.removeChild(img); };
    img.addEventListener('load', show);
    img.addEventListener('error', drop);
    if (img.complete) { img.naturalWidth > 0 ? show() : drop(); }
  });

  // Brand gate -> form. Focus moves to the card so keyboard and screen-reader
  // users land on the question rather than being stranded on the old screen.
  document.getElementById('btn-begin').addEventListener('click', function() {
    $intro.classList.add('gone');
    $formPage.classList.remove('gone');
    $formPage.classList.add('entering');
    const card = $formPage.querySelector('.card');
    card.setAttribute('tabindex', '-1');
    card.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  });

  document.querySelectorAll('.role-card').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  document.querySelectorAll('.level-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-item').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  document.querySelectorAll('#opp-choices .choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#opp-choices .choice-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  function buildSubroles(role) {
    const container = document.getElementById('subrole-tags');
    container.innerHTML = '';
    (SUBROLES[role] || []).forEach(sub => {
      const btn = document.createElement('button');
      btn.className = 'tag-btn';
      btn.dataset.val = sub;
      btn.textContent = sub;
      btn.addEventListener('click', () => btn.classList.toggle('selected'));
      container.appendChild(btn);
    });
    document.getElementById('subrole-question').textContent =
      "What's your specific focus within " + role.toLowerCase() + "?";
  }

  function render() {
    $progress.style.width = (current / (TOTAL - 1) * 100) + '%';
    $btnBack.hidden = current === 0;
    $btnNext.innerHTML = current === TOTAL - 1 ? 'Submit \u2197' : 'Continue \u2192';
    $btnNext.disabled = false;
  }

  function showStep(n) {
    document.querySelectorAll('.step').forEach((s, i) => s.classList.toggle('active', i === n));
    if (n === TOTAL - 1) buildSummary();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function validate() {
    const err = document.getElementById('err-' + current);
    if (err) err.textContent = '';

    if (current === 0) {
      const sel = document.querySelector('.role-card.selected');
      if (!sel) { err.textContent = 'Please pick one to continue.'; return false; }
      data.role = sel.dataset.val;
      buildSubroles(data.role);
    }
    if (current === 1) {
      const sel = [...document.querySelectorAll('#subrole-tags .tag-btn.selected')].map(b => b.dataset.val);
      if (!sel.length) { err.textContent = 'Pick at least one specialty.'; return false; }
      data.subrole = sel.join(', ');
    }
    if (current === 2) {
      const name     = document.getElementById('f-name').value.trim();
      const email    = document.getElementById('f-email').value.trim();
      const phone    = document.getElementById('f-phone').value.trim();
      const city     = document.getElementById('f-city').value.trim();
      const linkedin = document.getElementById('f-linkedin').value.trim();
      if (!name)                          { err.textContent = 'Name is required.'; return false; }
      if (!email || !email.includes('@')) { err.textContent = 'A valid email is required.'; return false; }
      if (!phone)                         { err.textContent = 'Contact number is required.'; return false; }
      if (!city)                          { err.textContent = 'City is required.'; return false; }
      if (!linkedin)                      { err.textContent = 'LinkedIn URL is required.'; return false; }
      data.name = name; data.email = email; data.phone = phone;
      data.city = city; data.linkedin = linkedin;
    }
    if (current === 3) {
      const sel = document.querySelector('.level-item.selected');
      if (!sel) { err.textContent = 'Please select your experience level.'; return false; }
      data.experience = sel.dataset.val;
    }
    if (current === 4) {
      const sel = document.querySelector('#opp-choices .choice-btn.selected');
      if (!sel) { err.textContent = 'Please select an opportunity type.'; return false; }
      data.opportunity = sel.dataset.val;
    }
    if (current === 5) {
      const port = document.getElementById('f-portfolio').value.trim();
      if (!port) { err.textContent = 'Please add a portfolio or work link.'; return false; }
      data.portfolio = port;
      data.note = document.getElementById('f-note').value.trim() || '\u2014';
    }
    return true;
  }

  function buildSummary() {
    const rows = [
      ['Role',        data.role],
      ['Specialty',   data.subrole],
      ['Name',        data.name],
      ['Email',       data.email],
      ['Phone',       data.phone],
      ['City',        data.city],
      ['LinkedIn',    data.linkedin],
      ['Experience',  data.experience],
      ['Opportunity', data.opportunity],
      ['Portfolio',   data.portfolio],
      ['Note',        data.note],
    ];
    document.getElementById('summary').innerHTML = rows.map(([k, v]) =>
      '<div class="summary-row"><span class="summary-key">' + k + '</span><span class="summary-val">' + (v || '\u2014') + '</span></div>'
    ).join('');
  }

  async function submit() {
    const err = document.getElementById('err-6');
    err.textContent = '';
    $btnNext.disabled = true;
    $btnNext.innerHTML = '<span class="spinner"></span>';

    const payload = { ...data, submitted_at: new Date().toISOString() };

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      showSuccess();
    } catch (e) {
      err.textContent = 'Something went wrong \u2014 please try again.';
      $btnNext.disabled = false;
      $btnNext.innerHTML = 'Submit \u2197';
    }
  }

  function showSuccess() {
    $formSteps.style.display = 'none';
    $navRow.style.display    = 'none';
    $success.classList.add('visible');
  }

  document.getElementById('btn-reset').addEventListener('click', function() {
    $formSteps.style.display = '';
    $navRow.style.display    = '';
    $success.classList.remove('visible');
    current = 0;
    showStep(0);
    document.querySelectorAll('.role-card, .level-item, .choice-btn, .tag-btn')
      .forEach(b => b.classList.remove('selected'));
    ['f-name','f-email','f-phone','f-city','f-linkedin','f-portfolio','f-note']
      .forEach(function(id) { var el = document.getElementById(id); if (el) el.value = ''; });
    $btnNext.disabled = false;
  });

  $btnNext.addEventListener('click', async () => {
    if (!validate()) return;
    if (current === TOTAL - 1) { await submit(); return; }
    current++;
    showStep(current);
  });

  $btnBack.addEventListener('click', () => {
    if (current > 0) { current--; showStep(current); }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA') {
      $btnNext.click();
    }
  });

  render();
})();
</script>
`;