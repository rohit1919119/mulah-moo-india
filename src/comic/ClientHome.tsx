import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { V4_CSS } from "@/comic/v4";
import { ClientRail, Stamp, Footer, SectionCta, Nav, SlotBand, useReveal } from "@/comic/v4parts";
import { PricingForm } from "@/comic/PricingForm";
import { ENGAGEMENTS, STATS } from "@/comic/clients";
import { ArtTeam, ArtLeader, ArtRetainer } from "@/comic/v4art";
import { CLIENT_CALL_URL } from "@/comic/data";

const MODEL_ART = [ArtTeam, ArtLeader, ArtRetainer];

/**
 * The client-facing home page at "/".
 *
 * Everything above the case studies is the offer; the case studies and the rail
 * are the proof. The feedback quotes are still placeholder copy and render a
 * DUMMY tag until real ones arrive - real faces with invented words is a
 * liability, not a placeholder.
 */
export function ClientHome() {
  const [pricing, setPricing] = useState(false);
  const artRef = useReveal<HTMLDivElement>();
  const statRef = useReveal<HTMLDivElement>();

  return (
    <div className="v4">
      <style dangerouslySetInnerHTML={{ __html: V4_CSS }} />

      <section className="hero">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="grid-bg" />

        <Nav
          links={[
            { label: "What we do", href: "#what" },
            { label: "Results", href: "#numbers" },
            { label: "For creatives ↗", to: "/moo-talent", grad: true },
          ]}
          cta="Book a call"
          ctaHref={CLIENT_CALL_URL}
        />

        <Stamp />

        <div className="hero-in">
          {/* breaks are explicit so "internet's" always rides with "behind the",
              and the marker only ever wraps around "best content IPs" */}
          {/* max-width lifted so "for" rides on the marker line on desktop; on a
              phone the marker is nowrap, so "for" drops to its own line */}
          <h1 className="disp" style={{ maxWidth: "none" }}>
            We build
            <br />
            marketing teams
            <br />
            for <span className="mark">top internet brands</span>
          </h1>
          <div className="hero-actions">
            <a className="btn" href={CLIENT_CALL_URL} target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
            <button type="button" className="btn ghost" onClick={() => setPricing(true)}>
              Request our pricing
            </button>
          </div>
        </div>
      </section>

      <section className="rail-sec">
        <div className="in">
          <div className="shead">
            <span className="sno">01</span>
            <h2>
              The people who<br />
              <span className="it">trust us</span>.
            </h2>
          </div>
          <p className="slede">
            Creators, agencies and brands across India.
          </p>
        </div>
        <ClientRail />
        <div className="in">
          <SectionCta
            line="These teams were all built the same way. Yours can be next."
            cta="Talk to us about your team"
          />
        </div>
      </section>

      <section id="what">
        <div className="in">
          <div className="shead">
            <span className="sno">02</span>
            <h2>
              Three ways we build<br />
              <span className="it">your creative team</span>.
            </h2>
          </div>
          <p className="slede">
            Before we recommend a single hire, we map how your content actually gets made, day to day.
          </p>

          <div className="artgrid" data-reveal ref={artRef}>
            {ENGAGEMENTS.map((e, i) => {
              const Art = MODEL_ART[i];
              return (
                <div className="artcard" key={e.no}>
                  <div className="artframe"><Art /></div>
                  <div className="artbody">
                    <span className="artno">{e.no}</span>
                    <h3>{e.title}</h3>
                    <p className="artstrap">{e.strap}</p>
                    <div className="bestfor">
                      <b>Best for</b>
                      <span>{e.bestFor}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <SectionCta
            line="Not sure which one fits? That is exactly what the call is for."
            cta="Find the right fit"
          />
        </div>
      </section>

      {/* Case studies are hidden for now. The CaseStudies component and the CASES
          data in clients.ts are untouched, so bringing the section back is one
          block placed here. */}

      <section className="cases nums" id="numbers">
        <div className="in">
          <div className="shead">
            <span className="sno">03</span>
            <h2>
              The numbers<br />
              <span className="it">behind the work</span>.
            </h2>
          </div>
          <p className="slede">Eighteen months of building marketing teams, counted.</p>
          <div className="statgrid" data-reveal ref={statRef}>
            {STATS.map((s) => (
              <div className={`stat ${s.fill}`} key={s.big}>
                <span className="statbig">{s.big}</span>
                <span className="statlabel">{s.label}</span>
              </div>
            ))}
          </div>
          <SectionCta
            line="Every one of these teams began with a single thirty minute conversation."
            cta="Start yours"
          />
        </div>
      </section>

      {/* The testimonials section is hidden until real quotes land. The markup and
          styles are kept in DUMMY_QUOTES and v4.ts, so restoring it is one block. */}

      <SlotBand href={CLIENT_CALL_URL} />

      <section className="band" id="brief">
        <div className="rings" />
        <div className="band-in">
          <h2>
            Tell us who you need.<br />
            <span className="it">We will go and find them.</span>
          </h2>
          <div className="band-actions">
            <a className="btn" href={CLIENT_CALL_URL} target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
            <button type="button" className="btn ghost" onClick={() => setPricing(true)}>
              Request our pricing
            </button>
          </div>
        </div>
      </section>

      <Footer
        line="The team you keep meaning to build."
        crossLink={<Link to="/moo-talent">For creatives</Link>}
      />

      <PricingForm open={pricing} onClose={() => setPricing(false)} />
    </div>
  );
}
