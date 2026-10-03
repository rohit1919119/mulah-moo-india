import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
// Inline SVG social icons — avoids external icon lib version mismatch
import logoUrl from "@/assets/mulah-moo-logo.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulah Moo — Join the top 1% of content teams" },
      {
        name: "description",
        content:
          "Mulah Moo places elite content creatives — YouTube, Instagram, LinkedIn & X strategists, editors, scriptwriters, designers — with top creators, brands and studios across US, Europe, India and UAE.",
      },
      { property: "og:title", content: "Mulah Moo — Join the top 1% of content teams" },
      {
        property: "og:description",
        content: "Get matched to leading creator brands in under 2 weeks.",
      },
    ],
  }),
  component: Index,
});

// ---------- Data ----------

const HIRES = [
  { name: "Kayon Karmakar", role: "Senior Video Editor", brand: "VerSe Innovation (DailyHunt)", img: "/hires/kayon.jpg" },
  { name: "Soumya Sidhant", role: "Senior Video Editor", brand: "VerSe Innovation (DailyHunt)", img: "/hires/soumya.png" },
  { name: "Shreyas", role: "Creative Producer", brand: "VerSe Innovation (DailyHunt)", img: "/hires/shreyas.jpg" },
  { name: "Yogesh Kumhar", role: "Long-form Editor", brand: "Amy Wang (US)", img: "/hires/yogesh.png" },
  { name: "Nikhil Rathod", role: "Creative Producer", brand: "Wakefit", img: "/hires/nikhil.jpg" },
  { name: "Jigar Parmar", role: "UI/UX Designer", brand: "Traya Health", img: "/hires/jigar.jpg" },
  { name: "Rashi Gulati", role: "YouTube Manager", brand: "Leap Scholar", img: "/hires/rashi.jpg" },
  { name: "Rashmi Jeena", role: "Content Strategist", brand: "Amy Wang (US)", img: "/hires/rashmi.png" },
  { name: "Omkar Gurav", role: "YouTube Producer", brand: "Traya Health", img: "/hires/omkar.jpg" },
  { name: "Sanket Panchal", role: "Senior Video Editor", brand: "Talking Heads (US)", img: "/hires/sanket.jpg" },
];

const BRANDS = [
  "Wakefit", "Traya Health", "Leap Finance", "Dailyhunt", "Talking Heads",
  "Amy Wang", "Binge Labs", "MensXP", "Dime", "Phoenix Learning",
];

const ROLES = [
  { title: "YouTube Strategist", blurb: "Own channel growth, packaging and retention." },
  { title: "Content Strategist", blurb: "Build organic content distribution channels that compounds." },
  { title: "Creative Director", blurb: "Set taste, story and the visual bar across formats." },
  { title: "Video Editor", blurb: "Pace, sound design and storytelling at frame level." },
  { title: "Scriptwriter", blurb: "Hooks that hold and arcs that pay off." },
  { title: "Creative Producer", blurb: "Move shoots, edits and posts on schedule." },
  { title: "Visual Designer", blurb: "Identity, motion-ready graphics and brand systems." },
  { title: "Thumbnail Designer", blurb: "Make every click feel inevitable." },
  { title: "Cinematographer", blurb: "Frames, lighting and a directorial eye." },
];

const COUNTRIES = ["US", "Europe", "India", "UAE"];

const STEPS = [
  { n: "01", t: "Register now", d: "Tell us your craft, taste and the brands you'd love to work with." },
  { n: "02", t: "Get matched", d: "Receive curated opportunities via email, Slack, and WhatsApp." },
  { n: "03", t: "Interview + assignment", d: "Direct interview and a short assignment (70% of our assignments are paid)" },
  { n: "04", t: "Final round", d: "Meet the creative lead you'll be working with. Negotiate. Sign." },
];

function XLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden>
      <path d="M18.244 2H21l-6.49 7.41L22 22h-6.797l-4.83-6.32L4.7 22H1.944l6.94-7.93L1.5 2h6.96l4.36 5.77L18.244 2Zm-1.19 18.4h1.62L7.04 3.51H5.3L17.054 20.4Z" />
    </svg>
  );
}

function Youtube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

// ---------- Page ----------

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />
      <Hero />
      <HiresMarquee />
      <Brands />
      <Roles />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="Mulah Moo" className="h-8 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#roles" className="hover:text-foreground transition">Roles</a>
          <a href="#brands" className="hover:text-foreground transition">Brands</a>
          <a href="#process" className="hover:text-foreground transition">Process</a>
        </nav>
        <a
          href="/talent-form"
          className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          Get hired
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-6 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-6xl text-center animate-in-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          40+ content teams hiring right now
        </div>
        <h1 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance">
          <span className="block">
            Join the top <em className="text-accent not-italic">1%</em> of
          </span>
          <span className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <Youtube className="size-9 md:size-12 lg:size-14 text-[#FF0000]" />
            <Instagram className="size-9 md:size-12 lg:size-14 text-[#E1306C]" />
            <Linkedin className="size-9 md:size-12 lg:size-14 text-[#0A66C2]" />
            <XLogo className="size-8 md:size-11 lg:size-12 text-foreground" />
            <span>content teams</span>
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
          Work with top content creators, brands &amp; content studios across{" "}
          <span className="text-foreground">US, Europe, India &amp; UAE</span>.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/talent-form"
            className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm md:text-base font-medium hover:opacity-90 transition"
          >
            Get hired
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a href="#process" className="text-sm text-muted-foreground hover:text-foreground transition">
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}

function HiresMarquee() {
  const items = [...HIRES, ...HIRES];
  return (
    <section className="py-10 marquee-mask">
      <div className="flex w-max gap-5 animate-marquee">
        {items.map((p, i) => (
          <figure
            key={i}
            className="relative w-[240px] md:w-[280px] aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shrink-0 group"
          >
            <img
              src={p.img}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white">
              <div className="text-[11px] uppercase tracking-wider opacity-80">{p.role}</div>
              <div className="mt-0.5 font-display text-2xl leading-tight">{p.name}</div>
              <div className="mt-1 flex items-center gap-1.5 text-xs opacity-90">
                <span className="inline-block size-1.5 rounded-full bg-accent" />
                hired at {p.brand}
              </div>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Brands() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section id="brands" className="px-6 py-24 border-y border-border/60">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Now hiring</div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl tracking-tight">
              Content teams currently hiring <em className="text-accent not-italic">creatives like you.</em>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            From 1M+ subscriber YouTubers to unicorn brands, we work with teams where creativity genuinely matters.
          </p>
        </div>

        <div className="marquee-mask">
          <div className="flex w-max gap-3 animate-marquee-slow">
            {row.map((b, i) => (
              <div
                key={i}
                className="shrink-0 rounded-full border border-border bg-card px-6 py-3 font-display text-2xl md:text-3xl whitespace-nowrap"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Roles() {
  return (
    <section id="roles" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Open crafts</div>
          <h2 className="mt-3 font-display text-4xl md:text-6xl tracking-tight">
            The creatives <em className="text-accent not-italic">we place</em>
          </h2>
          <p className="mt-4 text-muted-foreground">
            We hire across the full content stack. If you're top of your craft, there's a seat for you.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {ROLES.map((r, i) => (
            <a
              key={r.title}
              href="/talent-form"
              className="group relative bg-background p-8 hover:bg-card transition-colors"
            >
              <div className="text-xs text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-6 font-display text-3xl leading-tight">{r.title}</div>
              <p className="mt-3 text-sm text-muted-foreground">{r.blurb}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-foreground/80 group-hover:text-accent transition">
                Apply <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="px-6 py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">Process</div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl tracking-tight">
              Hired in <em className="text-accent not-italic">~1.5 weeks</em>
            </h2>
          </div>
          <p className="max-w-sm text-primary-foreground/70">
            No resume black holes. No 7-stage loops. Just your craft, conversation, a real assignment
            and an offer.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/10 rounded-3xl overflow-hidden">
          {STEPS.map((s) => (
            <li key={s.n} className="bg-primary p-8 md:p-10">
              <div className="font-display text-5xl text-accent">{s.n}</div>
              <div className="mt-6 font-display text-2xl">{s.t}</div>
              <p className="mt-3 text-sm text-primary-foreground/70">{s.d}</p>
              {s.n === "01" && (
                <a href="/talent-form" className="mt-4 inline-flex items-center rounded-full bg-primary-foreground/10 text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary-foreground/20 transition">
                  Start here
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section id="apply" className="px-6 py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-5xl md:text-7xl tracking-tight text-balance">
          Ready to work with the content teams <em className="text-accent not-italic">you actually watch</em>?
        </h2>
        <p className="mt-5 text-muted-foreground text-lg max-w-xl mx-auto">
          Drop your email. We'll send open roles that fit your craft.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
          className="mt-10 mx-auto flex flex-col sm:flex-row gap-2 max-w-md"
        >
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@craft.com"
            className="flex-1 rounded-full border border-border bg-card px-5 py-3.5 text-sm outline-none focus:border-foreground transition"
          />
          <button className="rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:opacity-90 transition">
            {sent ? "You're in ✓" : "Get open roles"}
          </button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">Free, always. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top: brand + contact */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-12 border-b border-border">
          <div className="lg:col-span-2">
            <img src={logoUrl} alt="Mulah Moo" className="h-10 w-auto" />
            <p className="mt-5 text-sm text-muted-foreground max-w-sm">
              Mulah Moo places elite content creatives with the world's best creator-led brands
              across the US, Europe, India &amp; UAE.
            </p>
            <div className="mt-6 flex items-center gap-3 text-muted-foreground">
              <a href="#" aria-label="YouTube" className="hover:text-accent transition"><Youtube className="size-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-accent transition"><Instagram className="size-5" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-accent transition"><Linkedin className="size-5" /></a>
              <a href="#" aria-label="X" className="hover:text-accent transition"><XLogo className="size-[18px]" /></a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-foreground">Company</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#brands" className="hover:text-foreground">Brands</a></li>
              <li><a href="#process" className="hover:text-foreground">Process</a></li>
              <li><a href="/talent-form" className="hover:text-foreground">Apply</a></li>
              <li><a href="mailto:hello@mulahmoo.com" className="hover:text-foreground">hello@mulahmoo.com</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-foreground">Hiring in</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {COUNTRIES.map((c) => (
                <li key={c}><a href={`#apply-${c}`} className="hover:text-foreground">{c}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Apply for X based Y role — all country × role combos */}
        <div className="py-12">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Apply by role &amp; region</div>
          <h3 className="mt-3 font-display text-3xl md:text-4xl tracking-tight">
            Open positions, <em className="text-accent not-italic">everywhere</em>
          </h3>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COUNTRIES.map((country) => (
              <div key={country} id={`apply-${country}`}>
                <div className="font-display text-2xl">{country}</div>
                <ul className="mt-4 space-y-2 text-sm">
                  {ROLES.map((r) => (
                    <li key={r.title}>
                      <a
                        href="/talent-form"
                        className="text-muted-foreground hover:text-accent transition"
                      >
                        Apply for {country} based {r.title} role
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} <span className="text-foreground font-medium">Mulah Moo</span> — a brand of Numernize Creations LLP. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="mailto:hello@mulahmoo.com" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
