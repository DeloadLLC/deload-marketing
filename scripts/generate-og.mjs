// Generates the Open Graph / link-preview image at public/og-default.png.
//
// Why this exists: the shared-link card (iMessage, Slack, X, etc.) is the
// site's first impression, so its copy has to track the live positioning. The
// image is rendered from the brand tokens below rather than hand-edited in a
// design tool, so updating the message is a one-line change + `pnpm og`.
//
//   Edit COPY, then run:  pnpm og
//
// The committed PNG is what actually ships; this script just keeps it
// reproducible. Inter fonts live in scripts/fonts/ and resvg renders the SVG.

import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_DIR = resolve(__dirname, "fonts");
const PUBLIC_DIR = resolve(__dirname, "..", "public");

// Brand tokens — kept in sync with tailwind.config.mjs.
const C = {
  bg: "#FFFFFF",
  ink: "#14161A",
  sage: "#6B8E6F",
  clay: "#B8724A",
};

// The canonical link-preview headline. Two lines: an ink lead and a sage tail.
// This mirrors the home-page hero so the shared link reads like the site.
const COPY = {
  line1: "AI-assisted, all-in-one software",
  line2: "for your fitness business.",
  domain: "deloadapp.io",
};

const FONTS = [
  "Inter_400Regular.ttf",
  "Inter_500Medium.ttf",
  "Inter_600SemiBold.ttf",
  "Inter_700Bold.ttf",
].map((f) => resolve(FONT_DIR, f));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildSvg({ line1, line2, domain }) {
  const W = 1200;
  const H = 630;
  const marginX = 100;
  const usable = W - marginX * 2;

  // Auto-fit the headline: keep it large, but shrink if a line would overrun.
  // 0.53 is a safe average advance-width ratio for Inter at semibold.
  const longest = Math.max(line1.length, line2.length);
  let fs = 64;
  const estWidth = longest * fs * 0.53;
  if (estWidth > usable) fs = Math.floor((fs * usable) / estWidth);
  const lineGap = Math.round(fs * 1.2);
  // Match the site's headline tracking (Tailwind tracking-tight = -0.02em).
  const headTrack = (-0.02 * fs).toFixed(2);
  const wordTrack = (-0.02 * 60).toFixed(2);

  // Vertical rhythm.
  const logoSize = 80;
  const logoY = 152;
  const logoCenterY = logoY + logoSize / 2;
  const wordSize = 60;
  const line1Y = 352;
  const line2Y = line1Y + lineGap;
  const footerY = 538;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.bg}"/>

  <!-- Wordmark: ink rounded square with cream "d", then lowercase "deload" -->
  <rect x="${marginX}" y="${logoY}" width="${logoSize}" height="${logoSize}" rx="18" fill="${C.ink}"/>
  <text x="${marginX + logoSize / 2}" y="${logoCenterY}" text-anchor="middle" dominant-baseline="central"
        font-family="Inter" font-weight="700" font-size="46" fill="${C.bg}">d</text>
  <text x="${marginX + logoSize + 24}" y="${logoCenterY}" dominant-baseline="central" letter-spacing="${wordTrack}"
        font-family="Inter" font-weight="500" font-size="${wordSize}" fill="${C.ink}">deload</text>

  <!-- Headline -->
  <text x="${marginX}" y="${line1Y}" letter-spacing="${headTrack}" font-family="Inter" font-weight="500" font-size="${fs}" fill="${C.ink}">${esc(line1)}</text>
  <text x="${marginX}" y="${line2Y}" letter-spacing="${headTrack}" font-family="Inter" font-weight="500" font-size="${fs}" fill="${C.sage}">${esc(line2)}</text>

  <!-- Footer: clay dot + domain -->
  <circle cx="${marginX + 6}" cy="${footerY - 9}" r="6" fill="${C.clay}"/>
  <text x="${marginX + 26}" y="${footerY}" font-family="Inter" font-weight="500" font-size="30" fill="${C.ink}" fill-opacity="0.5">${esc(domain)}</text>
</svg>`;
}

function render(copy, outPath) {
  const svg = buildSvg(copy);
  const resvg = new Resvg(svg, {
    font: { fontFiles: FONTS, loadSystemFonts: false, defaultFontFamily: "Inter" },
    fitTo: { mode: "width", value: 1200 },
  });
  writeFileSync(outPath, resvg.render().asPng());
  return outPath;
}

// CLI overrides for previewing alternates: --line1 "..." --line2 "..." --out path
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const m = argv[i].match(/^--([^=]+)(?:=(.*))?$/);
    if (!m) continue;
    out[m[1]] = m[2] !== undefined ? m[2] : argv[++i];
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const copy = {
  line1: args.line1 ?? COPY.line1,
  line2: args.line2 ?? COPY.line2,
  domain: args.domain ?? COPY.domain,
};
const outPath = args.out ?? resolve(PUBLIC_DIR, "og-default.png");
render(copy, outPath);
console.log(`Wrote ${outPath}`);
