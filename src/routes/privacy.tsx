import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/comic/Logo";
import { PM_CSS } from "@/comic/PremiumHome";
import { FONT, PREMIUM_FONT_LINKS } from "@/comic/premiumData";
import { LEGAL_NAME } from "@/comic/data";

// mulahmoo.in/privacy: plain language notice for the site's forms.
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy · Mulah Moo" },
      { name: "description", content: "How Mulah Moo and Backstage Creators Club use the details you share through mulahmoo.in." },
    ],
    links: [{ rel: "stylesheet", href: PREMIUM_FONT_LINKS[0] }],
  }),
  component: Privacy,
});

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "Who we are",
    p: [
      `mulahmoo.in is run by ${LEGAL_NAME}, Delhi, India, which operates Mulah Moo and Backstage Creators Club.`,
    ],
  },
  {
    h: "What we collect",
    p: [
      "Only what you type into our forms: your name, email, phone or WhatsApp number, company, role, city, links to your public profiles, and your answers about hiring or the club.",
      "If you register as talent, we also keep the work details you choose to share with us.",
      "On some pages we send out in outreach, such as mulahmoo.in/work, we also record which buttons are clicked and the campaign link you arrived from. This is not linked to your name unless you fill in a form.",
    ],
  },
  {
    h: "Why we use it",
    p: [
      "To reply to your mandate, send the compensation report you asked for, review your club request, and contact you about the thing you asked for.",
      "We do not sell your details and we do not add you to marketing lists you did not ask for.",
    ],
  },
  {
    h: "Where it is stored",
    p: [
      "Submissions are stored in Google Sheets and email accounts controlled by our team. Scheduled calls are booked through Calendly.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "As long as we are working with you, or for up to two years after our last conversation, unless you ask us to delete it sooner.",
    ],
  },
  {
    h: "Your choices",
    p: [
      "You can ask to see, correct or delete your details, or withdraw your consent, at any time. Write to Rohit@mulahmoo.com and we will act on it within 30 days.",
    ],
  },
];

function Privacy() {
  const vars = { "--display": FONT.display, "--ui": FONT.ui, "--dw": 400 } as React.CSSProperties;
  return (
    <div className="pm" style={vars}>
      <style dangerouslySetInnerHTML={{ __html: PM_CSS + PV_CSS }} />
      <div className="pv">
        <Link to="/" className="pv-logo" aria-label="Mulah Moo home"><Logo height={22} /></Link>
        <h1>Privacy</h1>
        <p className="pv-lede">How we use the details you share through this website. Last updated October 2026.</p>
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((t) => <p key={t}>{t}</p>)}
          </section>
        ))}
        <p className="pv-foot">&copy; 2026 {LEGAL_NAME} &middot; <Link to="/">mulahmoo.in</Link></p>
      </div>
    </div>
  );
}

const PV_CSS = `
.pv{ max-width:720px; margin:0 auto; padding:56px 20px 80px; display:flex; flex-direction:column; gap:28px; }
.pv-logo{ align-self:flex-start; }
.pv h1{ font-size:clamp(48px,8vw,80px); line-height:1; margin-top:24px !important; }
.pv-lede{ color:var(--muted); font-size:17px; }
.pv h2{ font-size:30px; line-height:1.15; margin-bottom:10px !important; text-align:left; }
.pv section p + p{ margin-top:10px !important; }
.pv section p{ color:var(--body); }
.pv-foot{ font-size:13px; color:var(--muted); border-top:1px solid var(--line); padding-top:22px; }
.pv a{ text-decoration:underline; text-underline-offset:3px; }
`;
