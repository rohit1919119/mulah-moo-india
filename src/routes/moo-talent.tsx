import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/comic/Landing";
import { CreativeLoader } from "@/comic/Loader";
import { getContent } from "@/comic/content";
import { FONT_LINKS } from "@/comic/data";

// The talent-facing landing. "/" is now the client home, which links here as
// "For talents".
//
// Briefs and clients load from the Google Sheet at request time, cached sixty
// seconds, falling back to the constants in data.ts if the sheet is
// unreachable. See src/comic/content.ts.
export const Route = createFileRoute("/moo-talent")({
  loader: () => getContent(),
  head: () => ({
    meta: [
      { title: "Join the Moo Talent Network" },
      {
        name: "description",
        content:
          "Apply for hidden creative gigs. We place elite content creatives with creator-led brands across the US, UK and UAE.",
      },
      { property: "og:title", content: "Join the Moo Talent Network" },
      { property: "og:description", content: "Apply for hidden creative gigs." },
      { property: "og:type", content: "website" },
    ],
    links: FONT_LINKS,
  }),
  // The loader hits the Google Sheet, so a cold navigation can sit for a second
  // or two. pendingMs is short enough that the wait never feels dead, and
  // pendingMinMs keeps the screen from flashing on a warm cache hit.
  pendingComponent: CreativeLoader,
  pendingMs: 180,
  pendingMinMs: 600,
  component: MooTalent,
});

// The sheet still supplies `clients`, but the page now renders the real client
// roster from clients.ts instead, so only briefs are passed through.
function MooTalent() {
  const { briefs } = Route.useLoaderData();
  return <Landing briefs={briefs} />;
}
