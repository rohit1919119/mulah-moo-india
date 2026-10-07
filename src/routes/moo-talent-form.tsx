import { createFileRoute } from "@tanstack/react-router";
import { TalentFormPremium } from "@/comic/TalentFormPremium";
import { PREMIUM_FONT_LINKS } from "@/comic/premiumData";

export const Route = createFileRoute("/moo-talent-form")({
  head: () => ({
    meta: [
      { title: "Apply · Mulah Moo Talent" },
      { name: "description", content: "Apply to Mulah Moo's creative and marketing talent network. Seven questions, about two minutes." },
    ],
    links: [{ rel: "stylesheet", href: PREMIUM_FONT_LINKS[0] }],
  }),
  component: TalentFormPremium,
});
