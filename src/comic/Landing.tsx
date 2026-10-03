import { Link } from "@tanstack/react-router";
import { V4_CSS } from "@/comic/v4";
import { Icon, type IconName } from "@/comic/Icon";
import { Logo } from "@/comic/Logo";
import { ClientRail, Ticker, Stamp, Footer, Nav } from "@/comic/v4parts";
import { BRIEFS, CONSULT } from "@/comic/data";
import type { Brief } from "@/comic/content";

function BriefCard({ b }: { b: Brief }) {
  return (
    <div className="brief">
      <div className="brief-top">
        <Logo height={11} mono />
        <span className="brief-ic" style={{ background: b.tint }}>
          <Icon name={b.icon as IconName} size={20} color="#fff" />
        </span>
      </div>
      <div>
        <div className="brief-client">{b.client}</div>
        <div className="brief-role">{b.role}</div>
      </div>
      <div className="brief-foot">
        <span>
          <span className="pay">{b.pay}</span> <span className="per">/ month</span>
        </span>
        <span className="live"><i />Live</span>
      </div>
    </div>
  );
}

/**
 * The Moo Talent landing at "/moo-talent", in the v4 language.
 *
 * Briefs come from the route loader, which reads the Google Sheet. The default
 * keeps the component renderable on its own, in a test or without a loader.
 *
 * The client rail is the same component the home page uses, deliberately: the
 * proof a talent wants ("who would I actually work for") and the proof a client
 * wants ("who else trusts you") are the same roster.
 */
export function Landing({
  briefs = BRIEFS as unknown as Brief[],
}: {
  briefs?: Brief[];
} = {}) {
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
            { label: "Live briefs", href: "#briefs" },
            { label: "Career guidance", href: "#guidance" },
            { label: "For brands ↗", to: "/", grad: true },
          ]}
          cta="Apply now"
          ctaTo="/moo-talent-form"
        />

        <Stamp label="PAID GIGS · GLOBAL CLIENTS · NO JOB BOARD · " />

        <div className="hero-in">
          <h1 className="disp">
            Apply for <span className="mark rose">hidden</span> creative gigs.
          </h1>
          <div className="points">
            <div className="point">
              <Icon name="bolt" size={16} color="#8856F2" />
              Jobs that never get posted
            </div>
            <div className="point">
              <Icon name="globe" size={16} color="#F5C542" />
              Clients across India, US and UK
            </div>
          </div>
          <div className="hero-actions">
            <Link className="btn clay" to="/moo-talent-form">Begin your application</Link>
          </div>
          <div className="hero-meta">
            7 questions &middot; about 2 minutes &middot; 70% of assignments are paid
          </div>
        </div>
      </section>

      <Ticker />

      <section id="briefs">
        <div className="in">
          <div className="shead">
            <span className="sno">01</span>
            <h2>
              Roles moving through<br />
              <span className="it">the network right now</span>.
            </h2>
          </div>
          <p className="slede">
            A live sample of what our clients are hiring for.
          </p>
        </div>

        {/* rendered twice so translateX(-50%) lands on a seam and the loop reads continuous */}
        <div className="marquee">
          <div className="track">
            {briefs.map((b) => <BriefCard key={`a-${b.role}-${b.client}`} b={b} />)}
            {briefs.map((b) => <BriefCard key={`b-${b.role}-${b.client}`} b={b} />)}
          </div>
        </div>

        <div className="in" style={{ marginTop: 40 }}>
          <Link className="btn" to="/moo-talent-form">Wanna explore roles?</Link>
        </div>
      </section>

      <section className="rail-sec">
        <div className="in">
          <div className="shead">
            <span className="sno">02</span>
            <h2>
              The people you<br />
              <span className="it">could be working for</span>.
            </h2>
          </div>
          <p className="slede">
            Creators, agencies and brands across India who have hired from
            this network.
          </p>
        </div>
        <ClientRail />
      </section>

      <section id="guidance">
        <div className="in">
          <div className="shead">
            <span className="sno">03</span>
            <h2>
              Doing good work and<br />
              <span className="it">still invisible</span>?
            </h2>
          </div>

          <div className="consult-in">
            <div>
              <ul className="consult-list">
                {CONSULT.painPoints.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>

            <a
              className="consult-cta"
              href={CONSULT.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>Let&rsquo;s figure out why.</b>
              <span>
                Book a call
                <Icon name="bolt" size={17} color="#8856F2" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="rings" />
        <div className="band-in">
          <h2>
            The roles that never<br />
            <span className="it">reach a job board.</span>
          </h2>
          <p>Seven questions, about two minutes. We will come back to you when something fits.</p>
          <Link className="btn" to="/moo-talent-form">Begin your application</Link>
        </div>
      </section>

      <Footer
        line="The roles that never reach a job board."
        crossLink={<Link to="/">For brands</Link>}
      />
    </div>
  );
}
