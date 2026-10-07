import { createFileRoute } from "@tanstack/react-router";
import { PremiumHome } from "@/comic/PremiumHome";
import { FONT_LINKS } from "@/comic/data";
import { PREMIUM_FONT_LINKS } from "@/comic/premiumData";

// mulahmoo.in/work: the home page, for outreach. Identical content, but every
// view and click is logged with the campaign tags from the link you sent
// (?ref=, ?c=, utm_*) to the "work-clicks" tab. See src/comic/tracking.ts.
//
// Kept out of search results so it never competes with the home page.
export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Mulah Moo · Marketing teams for top internet brands" },
      { name: "description", content: "We build marketing teams for top internet brands." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Mulah Moo · Marketing teams for top internet brands" },
      { property: "og:description", content: "Marketing leaders and content teams for India's internet brands." },
      { property: "og:type", content: "website" },
    ],
    links: [
      ...FONT_LINKS,
      ...PREMIUM_FONT_LINKS.map((href) => ({ rel: "stylesheet", href })),
      { rel: "canonical", href: "https://mulahmoo.in/" },
    ],
  }),
  component: Work,
});

function Work() {
  return <PremiumHome track="/work" />;
}
