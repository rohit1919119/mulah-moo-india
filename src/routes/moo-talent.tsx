import { createFileRoute } from "@tanstack/react-router";
import { MooTalentPage } from "@/comic/TalentPremium";
import { getContent } from "@/comic/content";
import { PREMIUM_FONT_LINKS } from "@/comic/premiumData";

// The talent network landing, in the premium design. Live roles load from the
// Google Sheet at request time (cached sixty seconds) and fall back to the
// constants in data.ts. See src/comic/content.ts.
export const Route = createFileRoute("/moo-talent")({
  loader: () => getContent(),
  head: () => ({
    meta: [
      { title: "Mulah Moo Talent · Creative and marketing roles that never reach a job board" },
      {
        name: "description",
        content:
          "Join a network of 10,000+ creatives and marketers. Mulah Moo places talent with India's internet brands and global creators.",
      },
      { property: "og:title", content: "Mulah Moo Talent" },
      { property: "og:description", content: "The roles that never reach a job board." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: PREMIUM_FONT_LINKS[0] }],
  }),
  pendingComponent: TalentPending,
  pendingMs: 180,
  pendingMinMs: 400,
  component: MooTalent,
});

function TalentPending() {
  return (
    <div style={{ minHeight: "100vh", background: "#140A2B", display: "grid", placeItems: "center" }} aria-busy="true">
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5C542", boxShadow: "0 0 0 10px rgba(245,197,66,.15)" }} />
    </div>
  );
}

function MooTalent() {
  const { briefs } = Route.useLoaderData();
  return <MooTalentPage briefs={briefs} />;
}
