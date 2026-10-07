import { createFileRoute } from "@tanstack/react-router";
import { BccPage } from "@/comic/BccPage";
import { PREMIUM_FONT_LINKS } from "@/comic/premiumData";

// mulahmoo.in/bcc: Backstage Creators Club, in the premium home page's design.
export const Route = createFileRoute("/bcc")({
  head: () => ({
    meta: [
      { title: "Backstage Creators Club · India's room for content leaders" },
      {
        name: "description",
        content:
          "A WhatsApp first, invite only community for content heads, brand and marketing leads, studio founders and video leads. Closed door evenings, one city at a time.",
      },
      { property: "og:title", content: "Backstage Creators Club" },
      { property: "og:description", content: "Invite only evenings for India's content leaders." },
      { property: "og:image", content: "https://mulahmoo.in/bcc/mumbai-1.jpg" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: PREMIUM_FONT_LINKS[0] },
      { rel: "icon", href: "/bcc/logo.jpg" },
    ],
  }),
  component: BccPage,
});
