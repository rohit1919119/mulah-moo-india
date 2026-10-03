/**
 * Generates public/og-image.png, the link-preview image.
 *
 *   node scripts/make-og-image.cjs
 *
 * SQUARE on purpose. WhatsApp, Telegram and the small LinkedIn card crop an OG
 * image to a centre square. A 1200x630 card loses everything outside that
 * square, which is what sliced the wordmark in half. A square canvas with the
 * mark centred survives that crop and the 1.91:1 crop wide cards apply.
 *
 * There is no text in the picture. The words render beside the thumbnail from
 * og:title and og:description in src/routes/__root.tsx - edit them there.
 *
 * The logo is read out of src/comic/Logo.tsx, so the card cannot drift from the
 * wordmark used on the site. No fonts or external packages needed.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");

const W = 1200, H = 1200;
const INK = "#111111";
const PURPLE = "#8856F2";
const PAPER = "#FFFFFF";

// ---- logo paths, read from the component ----
const logoSrc = fs.readFileSync(path.join(ROOT, "src/comic/Logo.tsx"), "utf8");

function grab(name) {
  const re = new RegExp("const " + name + " = \\[([\\s\\S]*?)\\];");
  const m = logoSrc.match(re);
  if (!m) throw new Error("could not find " + name + " in Logo.tsx");
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}

const MULAH = grab("D");
const MOO = grab("D_MOO");

// Logo.tsx ships a horizontal lockup. Shifting "moo" left and down stacks it
// under "mulah", giving the square-friendly mark.
const DX = -1226;
const DY = 412;
const ART = { x: 556, y: 767.31, w: 2218 - 556, h: 1644 - 767.31 };

const LOGO_W = 620;
const SCALE = LOGO_W / ART.w;
const LOGO_H = ART.h * SCALE;
const LOGO_X = (W - LOGO_W) / 2;
const LOGO_Y = (H - LOGO_H) / 2;

// Wide cards crop to the centre 1200x630 band. Fail loudly rather than ship a
// clipped logo if the size above is ever changed.
const BAND_TOP = (H - 630) / 2;
const BAND_BOTTOM = BAND_TOP + 630;
console.log(`logo ${Math.round(LOGO_W)}x${Math.round(LOGO_H)}, y ${Math.round(LOGO_Y)}..${Math.round(LOGO_Y + LOGO_H)}`);
console.log(`1.91:1 safe band y ${BAND_TOP}..${BAND_BOTTOM}`);
if (LOGO_Y < BAND_TOP || LOGO_Y + LOGO_H > BAND_BOTTOM) {
  console.error("Logo falls outside the wide-crop safe band. Reduce LOGO_W.");
  process.exit(1);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <g transform="translate(${LOGO_X},${LOGO_Y}) scale(${SCALE.toFixed(6)}) translate(${-ART.x},${-ART.y})">
    ${MULAH.map((d) => `<path fill="${PURPLE}" d="${d}"/>`).join("")}
    <g transform="translate(${DX},${DY})">${MOO.map((d) => `<path fill="${INK}" d="${d}"/>`).join("")}</g>
  </g>
</svg>`;

const out = path.join(ROOT, "public/og-image.png");

sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(out)
  .then(async (i) => {
    console.log(`wrote public/og-image.png ${i.width}x${i.height}, ${i.size} bytes`);
    // Write the two crops platforms actually apply, so they can be eyeballed.
    // These are previews only and are not deployed.
    const prev = path.join(ROOT, "scripts/preview");
    fs.mkdirSync(prev, { recursive: true });
    await sharp(out).extract({ left: 0, top: BAND_TOP, width: 1200, height: 630 })
      .toFile(path.join(prev, "crop-wide.png"));
    await sharp(out).resize(600, 600).toFile(path.join(prev, "crop-square.png"));
    console.log("crop previews in scripts/preview/");
  })
  .catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
