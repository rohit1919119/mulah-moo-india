import { createFileRoute } from "@tanstack/react-router";
import { Onboarding } from "@/comic/Onboarding";
import { FONT_LINKS } from "@/comic/data";

// The page a creator lands on straight after their call, linking to
// /onboarding-form. Not indexed: it is sent directly to people we have already
// spoken to, and it carries commercial terms we would rather not have surfacing
// in search results next to the public pricing.
export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding - Mulah Moo" },
      {
        name: "description",
        content:
          "Your execution team, the commercials in full, and the details we need to draw up your agreement.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: FONT_LINKS,
  }),
  component: Onboarding,
});
