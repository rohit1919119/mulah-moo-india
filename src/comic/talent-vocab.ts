/**
 * A snapshot of Helium's talent vocabulary, and the live fetch that supersedes it.
 *
 * ── WHY BOTH ───────────────────────────────────────────────────────────────
 * The live list is the source of truth: adding a specialisation in Helium's
 * admin screen should reach this form without a redeploy. But this form is the
 * TOP OF THE FUNNEL, and an applicant who arrives while team.mulahmoo.com is
 * slow or down must still be able to apply. So the fetch has a timeout and
 * falls back to the snapshot below.
 *
 * Failing OPEN is the right direction here and is the opposite of what this
 * codebase does for auth: the cost of a stale option list is one specialisation
 * missing for a few minutes; the cost of failing closed is a lost applicant.
 *
 * ── THE SLUG IS THE POINT ──────────────────────────────────────────────────
 * Helium stores an unrecognised specialisation VERBATIM and shows it in red on
 * the review screen, so a wrong slug is visible rather than silent. `discipline`
 * is the exception: it is a strict enum and a wrong value is refused outright.
 *
 * Snapshot taken from /api/talent-vocabulary, version 1.
 * Regenerate by fetching that endpoint; do not hand-edit.
 */

export type VocabOption = { slug: string; label: string };
export type VocabDiscipline = {
  slug: string;
  label: string;
  desc: string;
  icon: string;
  specialisations: VocabOption[];
};

export const VOCAB_SNAPSHOT: VocabDiscipline[] = [
  {
    slug: "video_editor",
    label: "Video Editor",
    desc: "Post-production specialists who cut, assemble and finish video",
    icon: "film",
    specialisations: [
      { slug: "short_form", label: "Short-form / Reels" },
      { slug: "long_form", label: "Long-form YouTube" },
      { slug: "motion_graphics", label: "Motion graphics" },
      { slug: "documentary", label: "Documentary" },
      { slug: "vlog", label: "Vlog" },
      { slug: "talking_head", label: "Talking head" },
      { slug: "podcast", label: "Podcast" },
      { slug: "ads_performance", label: "Ads / performance creative" },
      { slug: "micro_drama", label: "Micro-drama" },
      { slug: "corporate", label: "Corporate" },
      { slug: "film_cinematic", label: "Film / Cinematic" },
      { slug: "product_saas", label: "Product / SaaS launches" },
      { slug: "ai_filmmaking", label: "AI filmmaking" },
      { slug: "wedding", label: "Wedding" },
      { slug: "gaming", label: "Gaming" },
      { slug: "vfx_compositing", label: "VFX / compositing" },
    ],
  },
  {
    slug: "designer",
    label: "Designer",
    desc: "Visual craft across brand, product and platform",
    icon: "brush",
    specialisations: [
      { slug: "thumbnail", label: "Thumbnail designer" },
      { slug: "visual_brand", label: "Visual / Brand designer" },
      { slug: "graphic", label: "Graphic designer" },
      { slug: "ui_ux", label: "UI / UX designer" },
    ],
  },
  {
    slug: "creative_head",
    label: "Creative Head / Production",
    desc: "People who own creative vision or manage production pipelines",
    icon: "target",
    specialisations: [
      { slug: "creative_director", label: "Creative director" },
      { slug: "creative_producer", label: "Creative producer" },
      { slug: "head_of_content", label: "Head of content" },
      { slug: "youtube_producer", label: "YouTube producer" },
      { slug: "short_form_producer", label: "Short form producer" },
      { slug: "news_producer", label: "News producer" },
      { slug: "pre_production_lead", label: "Pre-production lead" },
      { slug: "post_production_lead", label: "Post-production lead" },
    ],
  },
  {
    slug: "content_strategist",
    label: "Content Strategist",
    desc: "Platform-specific growth and content planning",
    icon: "chart",
    specialisations: [
      { slug: "youtube_strategist", label: "YouTube strategist" },
      { slug: "instagram_strategist", label: "Instagram strategist" },
      { slug: "linkedin_strategist", label: "LinkedIn strategist" },
      { slug: "x_twitter_strategist", label: "X / Twitter strategist" },
      { slug: "tiktok_strategist", label: "TikTok strategist" },
      { slug: "podcast_strategist", label: "Podcast strategist" },
    ],
  },
  {
    slug: "writer",
    label: "Writer",
    desc: "Word-first creators across scripts, editorial and ads",
    icon: "pen",
    specialisations: [
      { slug: "ad_film_writer", label: "Ad film writer" },
      { slug: "long_form_scriptwriter", label: "Long form scriptwriter" },
      { slug: "short_form_scriptwriter", label: "Short form scriptwriter" },
      { slug: "screenplay_writer", label: "Screenplay writer" },
      { slug: "news_writer", label: "News writer" },
      { slug: "blog_writer", label: "Blog writer" },
    ],
  },
  {
    slug: "brand_face",
    label: "Brand Face / Creator",
    desc: "On-camera talent who front channels, ads and campaigns",
    icon: "mic",
    specialisations: [
      { slug: "yt_anchor_host", label: "YT anchor / host" },
      { slug: "ugc_creator", label: "UGC creator" },
      { slug: "meta_ad_creator", label: "Meta / performance ad creator" },
      { slug: "actor", label: "Actor" },
      { slug: "podcast_host", label: "Podcast host" },
      { slug: "voice_over_artist", label: "Voice-over artist" },
      { slug: "reels_short_form_face", label: "Reels / short form face" },
      { slug: "brand_ambassador", label: "Brand ambassador" },
    ],
  },
  {
    // Helium migration 088 (2026-10-01). Without this entry the live list's
    // copy_writer is DROPPED by loadVocabulary(), which keeps only pools it
    // has an icon for.
    slug: "copy_writer",
    label: "Copy Writer",
    desc: "Persuasive short-form words — ads, brand voice, social, UX and CRM copy",
    icon: "bubble",
    specialisations: [
      { slug: "ad_copy", label: "Ad copy" },
      { slug: "brand_copy", label: "Brand & website copy" },
      { slug: "social_copy", label: "Social media copy" },
      { slug: "performance_copy", label: "Performance & direct-response" },
      { slug: "ux_copy", label: "UX & product microcopy" },
      { slug: "email_crm_copy", label: "Email & CRM copy" },
      { slug: "seo_content", label: "SEO content" },
      { slug: "campaign_lines", label: "Taglines & campaign lines" },
    ],
  },
  {
    // In Helium's live list already; listed here so loadVocabulary() keeps it.
    slug: "brand_manager",
    label: "Brand Manager / Brand Lead",
    desc: "Own the brand: positioning, launches, campaigns and partnerships",
    icon: "target",
    specialisations: [
      { slug: "brand_strategy", label: "Brand strategy & positioning" },
      { slug: "launches_rebrands", label: "Launches & rebrands" },
      { slug: "integrated_campaigns", label: "Integrated campaigns" },
      { slug: "consumer_insights", label: "Consumer insights & research" },
      { slug: "brand_partnerships", label: "Partnerships & sponsorships" },
      { slug: "brand_guidelines", label: "Brand identity & guidelines" },
      { slug: "d2c_brand_building", label: "D2C brand building" },
      { slug: "trade_retail", label: "Trade & retail marketing" },
    ],
  },
  {
    // In Helium's live list already; listed here so loadVocabulary() keeps it.
    slug: "marketing_manager",
    label: "Marketing Manager / Marketing Lead",
    desc: "Run growth: performance, CRM, content, influencer and media",
    icon: "chart",
    specialisations: [
      { slug: "performance", label: "Performance marketing" },
      { slug: "seo", label: "SEO" },
      { slug: "crm_lifecycle", label: "CRM & lifecycle" },
      { slug: "influencer", label: "Influencer marketing" },
      { slug: "content_marketing", label: "Content marketing" },
      { slug: "product_marketing", label: "Product marketing" },
      { slug: "growth", label: "Growth & experiments" },
      { slug: "events_btl", label: "Events & BTL" },
      { slug: "atl_media", label: "ATL & media planning" },
      { slug: "affiliate", label: "Affiliate & partnerships" },
    ],
  },
];

// 2026-10-01: clean non-overlapping steps with a 3–4 option, matching Helium's
// lib/talent-intake.ts EXPERIENCE_BANDS (which still understands the retired
// "2–3 yrs" / "4–6 yrs" from earlier applications).
export const EXPERIENCE_BANDS: string[] = ["0–1 yr", "1–2 yrs", "3–4 yrs", "5–6 yrs", "7–10 yrs", "10+ yrs"];

/**
 * Helium's own wording. The form used to submit its internal `val`
 * ("Full-time", "Open to all"); Helium's vocabulary is "Full-time role" and
 * "Open to anything", and the conversion step maps on those exact strings —
 * so two of the four arrived unmapped. These are what Helium is sent.
 */
export const OPPORTUNITY_LABELS: string[] = ["Full-time role", "Freelance / contract", "Part-time", "Open to anything"];

/**
 * Where Helium lives.
 *
 * Overridable so a developer can point at a local Helium and actually exercise
 * the live fetch. Without that the fetch silently falls back to the snapshot on
 * every machine but production — which renders identically and therefore proves
 * nothing. Production needs no variable set: the default is the real host.
 *
 *   VITE_HELIUM_API=http://localhost:3000 npm run dev
 */
export const HELIUM_API =
  import.meta.env.VITE_HELIUM_API ?? "https://team.mulahmoo.com";
export const VOCABULARY_URL = `${HELIUM_API}/api/talent-vocabulary`;
export const APPLICATIONS_URL = `${HELIUM_API}/api/talent-applications`;
/**
 * Asks Helium for somewhere to put a résumé. Answers `{ ok, path, signedUrl }`:
 * the browser PUTs the file straight to `signedUrl` (it never passes through
 * Helium), then sends `path` as `resumePath` with the application.
 */
export const RESUME_UPLOAD_URL = `${APPLICATIONS_URL}/resume-upload`;

/** What Helium accepts — keep in step with its lib/resume.ts. */
export const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const RESUME_ACCEPT = [...RESUME_TYPES, ".pdf", ".doc", ".docx"].join(",");
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

/**
 * Fetch the live vocabulary, or fall back to the snapshot.
 *
 * Bounded by an AbortController rather than left to the browser's own timeout,
 * which can be tens of seconds — long enough that a visitor gives up on the
 * first question. Two seconds is past a normal round trip and short enough that
 * a slow answer is indistinguishable from a fast fallback.
 *
 * Any failure at all — network, timeout, a 500, a body that is not the shape we
 * expect — returns the snapshot. There is deliberately no error surfaced to the
 * applicant: they cannot act on it, and a form that apologises for something
 * invisible reads as broken.
 */
export async function loadVocabulary(timeoutMs = 2000): Promise<VocabDiscipline[]> {
  const control = new AbortController();
  const timer = setTimeout(() => control.abort(), timeoutMs);
  try {
    const response = await fetch(VOCABULARY_URL, { signal: control.signal });
    if (!response.ok) return VOCAB_SNAPSHOT;
    const body: unknown = await response.json();
    const live = (body as { disciplines?: unknown })?.disciplines;
    if (!Array.isArray(live) || live.length === 0) return VOCAB_SNAPSHOT;

    // Merged onto the snapshot rather than used raw: the API carries the slugs,
    // the labels and the hint text, but not the icon this form draws — that is
    // a property of this website. An unknown discipline is DROPPED rather than
    // given a default icon, because a tile with the wrong picture on it is
    // worse than one option fewer, and the snapshot is regenerated when the
    // vocabulary genuinely changes.
    const merged = live
      .map((entry) => {
        const d = entry as {
          slug?: string; label?: string; hint?: string;
          specialisations?: { slug?: string; label?: string }[];
        };
        const known = VOCAB_SNAPSHOT.find((s) => s.slug === d.slug);
        if (!known || !d.slug || !d.label) return null;
        const specialisations = (d.specialisations ?? [])
          .filter((s): s is VocabOption => Boolean(s?.slug && s?.label))
          .map((s) => ({ slug: s.slug, label: s.label }));
        if (specialisations.length === 0 && known.specialisations.length > 0) return null;
        return {
          slug: d.slug,
          label: d.label,
          desc: d.hint ?? known.desc,
          icon: known.icon,
          specialisations,
        };
      })
      .filter((d): d is VocabDiscipline => d !== null);

    return merged.length > 0 ? merged : VOCAB_SNAPSHOT;
  } catch {
    return VOCAB_SNAPSHOT;
  } finally {
    clearTimeout(timer);
  }
}
