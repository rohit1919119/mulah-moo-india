import { createFileRoute } from "@tanstack/react-router";
import { ConsultHome } from "@/comic/ConsultHome";
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
      { title: "Mulah Moo - Marketing recruitment consultants, India" },
      {
        name: "description",
        content:
          "We build marketing teams for top internet brands. Editors, designers, producers, writers, strategists and marketing leaders for creators, agencies and brands across India.",
      },
      { property: "og:title", content: "Mulah Moo - Marketing recruitment consultants, India" },
      {
        property: "og:description",
        content: "Top 1% creative talent for content first brands, creators and studios across India",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      ...FONT_LINKS,
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Sofia+Sans+Condensed:wght@300;400;500&family=Manrope:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  // The consultancy layout. The v4 home is ClientHome in @/comic/ClientHome;
  // swap it back here to restore it.
  component: ConsultHome,
});
