import { createFileRoute } from "@tanstack/react-router";
import { MooVerified } from "@/comic/MooVerified";
import { FONT_LINKS } from "@/comic/data";

// The Moo Verified programme page for editors and other creative contractors.
// Sits alongside /moo-talent, which is the wider talent network landing: this
// one is specifically the contracted bench, with its own commercial terms.
//
// Indexed, unlike /onboarding - this page is meant to be found.
export const Route = createFileRoute("/moo-verified")({
  head: () => ({
    meta: [
      { title: "Moo Verified - contracts for editors" },
      {
        name: "description",
        content:
          "Long term contracts with creators who already know what they want. Paid assignments, no transaction fees, and you work with the creator directly.",
      },
      { property: "og:title", content: "Moo Verified - contracts for editors" },
      {
        property: "og:description",
        content: "Long term contracts with creators who already know what they want.",
      },
      { property: "og:type", content: "website" },
    ],
    links: FONT_LINKS,
  }),
  component: MooVerified,
});
