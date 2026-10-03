import { createFileRoute } from "@tanstack/react-router";
import { ClientHome } from "@/comic/ClientHome";
import { FONT_LINKS } from "@/comic/data";

// "/" is the client-facing home page. The talent landing lives at /moo-talent,
// linked from the nav as "For talents".
//
// Two earlier designs are preserved as code but deliberately unrouted - the "-"
// prefix keeps a file out of TanStack's route tree, so neither is served or
// bundled:
//   ./-home.tsx                 the original marketing homepage
//   ../archive/talent-form.tsx  the previous talent form
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulah Moo - Creative Hiring Partner for Elites" },
      {
        name: "description",
        content:
          "We build the creative teams behind India's best content IPs. Editors, designers, producers, writers and strategists for creators, agencies and brands.",
      },
      { property: "og:title", content: "Mulah Moo - Creative Hiring Partner for Elites" },
      {
        property: "og:description",
        content: "Top 1% creative talent for content first brands, creators and studios across India",
      },
      { property: "og:type", content: "website" },
    ],
    links: FONT_LINKS,
  }),
  component: ClientHome,
});
