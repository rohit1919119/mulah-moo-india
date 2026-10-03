import { createFileRoute } from "@tanstack/react-router";
import { OnboardingForm } from "@/comic/OnboardingForm";
import { FONT_LINKS } from "@/comic/data";

// The details we need to draw up a client's agreement. Submitting posts to the
// onboarding Apps Script, which writes the row, generates the agreement from a
// Google Doc template and emails it. Same reason as /onboarding for noindex.
export const Route = createFileRoute("/onboarding-form")({
  head: () => ({
    meta: [
      { title: "Onboarding - Mulah Moo" },
      {
        name: "description",
        content: "Onboarding details so we can prepare your Mulah Moo agreement.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: FONT_LINKS,
  }),
  component: OnboardingForm,
});
