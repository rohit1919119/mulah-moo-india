import { createFileRoute } from "@tanstack/react-router";
import { BCC_CSS, BCC_HTML } from "@/comic/bccPage";

// mulahmoo.in/bcc: the Backstage Creators Club page, ported from its Claude
// design. The markup is static (FAQ uses <details>), so it renders on the
// server with no client script.
export const Route = createFileRoute("/bcc")({
  head: () => ({
    meta: [
      { title: "Backstage Creators Club · India's room for content leaders" },
      {
        name: "description",
        content:
          "A WhatsApp first, invite only community for content heads, studio founders and video leads. Closed door evenings, one city at a time.",
      },
      { property: "og:title", content: "Backstage Creators Club" },
      { property: "og:description", content: "Invite only evenings for India's content leaders." },
      { property: "og:image", content: "https://mulahmoo.in/bcc/hero.jpg" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;600;700;800&display=swap" },
      { rel: "icon", href: "/bcc/logo.jpg" },
    ],
  }),
  component: Bcc,
});

function Bcc() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BCC_CSS + "html{scroll-behavior:smooth}" }} />
      <div dangerouslySetInnerHTML={{ __html: BCC_HTML }} />
    </>
  );
}
