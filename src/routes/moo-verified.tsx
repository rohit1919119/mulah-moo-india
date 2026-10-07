import { createFileRoute } from "@tanstack/react-router";
import { MooVerifiedPage } from "@/comic/TalentPremium";
import { PREMIUM_FONT_LINKS } from "@/comic/premiumData";

// The Moo Verified programme page for video editors, in the premium design.
export const Route = createFileRoute("/moo-verified")({
  head: () => ({
    meta: [
      { title: "Moo Verified · ₹1L+/month contracts for video editors" },
      {
        name: "description",
        content:
          "Long term contracts with creators who already know what they want. Paid assignments, nothing deducted from your rate, and you work with the creator directly.",
      },
      { property: "og:title", content: "Moo Verified" },
      { property: "og:description", content: "₹1L+/month contracts for video editors." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: PREMIUM_FONT_LINKS[0] }],
  }),
  component: MooVerifiedPage,
});
