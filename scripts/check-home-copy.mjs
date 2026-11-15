#!/usr/bin/env node
// Copy check for the home page story (spec: docs/superpowers/specs/
// 2026-11-15-home-story-design.md). Run after `pnpm build`:
//
//   node scripts/check-home-copy.mjs          waitlist build (the default)
//   node scripts/check-home-copy.mjs --open   PUBLIC_SIGNUP_MODE=open build
//
// It reads the built HTML in dist/ and exits non-zero on any failure:
//   (a) the approved strings are on the page (home, and the FAQ on pricing);
//   (b) no banned word, and no semicolon in the home page's visible copy;
//   (c) nothing that isn't live is claimed.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const open = process.argv.includes("--open");

/** Visible text of a built page: no scripts, styles, tags or comments, entities decoded, quotes straightened. */
function pageText(rel) {
  const file = join(dist, rel);
  if (!existsSync(file)) {
    failures.push(`${rel}: not built (run pnpm build first)`);
    return "";
  }
  return readFileSync(file, "utf8")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#?[a-z0-9]+;/gi, " ")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ");
}

const failures = [];

const HOME = "index.html";
const PRICING = "pricing/index.html";
const LANDING = "landing-page/index.html";

const COMING_SOON = "Booking, billing your clients and intake forms are on the way.";

const REQUIRED_HOME = [
  // 1. Opening
  "You got into this to coach. Not to spend your nights writing programs and answering texts.",
  // Act headlines
  "Sound familiar?",
  "Your programs, drafted for you.",
  "Clients who feel coached stay.",
  "Room to grow.",
  "Get your Sunday back.",
  // Act 3's timing line
  "Your first week is ready to edit in under 4 minutes.",
  // Act 5's coming-soon line
  COMING_SOON,
  // The founder's notes, each signed
  "For years I wrote programs at 11pm and rewrote them by 7am. I built Deload so I'd stop.",
  "Coach burnout is real. If Deload takes some of that weight off and helps your business grow, it was worth building.",
  "I built Deload because I needed it.",
];
const DEREK_NOTES = 3;

const REQUIRED_FAQ = [
  "It learns from the programs you bring in and the changes you make. The more you use it, the more it writes like you.",
  "Yes. Tell it what's coming up or what's bothering your athlete, in your own words, and it changes the weeks that need it. You approve every change.",
  "Today's workout with the weights worked out, a quick way to log it, their progress, and messages with you. On any phone, in the browser. Apps for iPhone and Android are on the way.",
];

const BANNED = ["seamless", "unlock", "supercharge", "effortless", "leverage", "game-changer", "game changer"];

// Not live, so never claimed. Booking and scheduling may only appear in the
// coming-soon line.
const NEVER = [
  /client billing/i,
  /scheduling/i,
  /\bbooking/i,
  /discoverable/i,
  /AI coach for athletes/i,
  /same programs/i,
];

const home = pageText(HOME);
const pricing = pageText(PRICING);
const landing = pageText(LANDING);

// (a) required strings
for (const s of REQUIRED_HOME) if (!home.includes(s)) failures.push(`${HOME}: missing "${s}"`);
const signed = (home.match(/— Derek\b/g) ?? []).length;
if (signed !== DEREK_NOTES) failures.push(`${HOME}: expected ${DEREK_NOTES} notes signed "— Derek", found ${signed}`);
for (const s of REQUIRED_FAQ) if (!pricing.includes(s)) failures.push(`${PRICING}: missing FAQ answer "${s}"`);

// (b) banned words; semicolons in the home page's copy
for (const [rel, text] of [[HOME, home], [PRICING, pricing], [LANDING, landing]]) {
  for (const w of BANNED) {
    if (new RegExp(`\\b${w}`, "i").test(text)) failures.push(`${rel}: banned word "${w}"`);
  }
}
const main = home.split(/\bSkip to\b/).pop() ?? home;
const semi = main.match(/.{0,40};.{0,20}/g);
if (semi) for (const m of semi) failures.push(`${HOME}: semicolon in copy: "…${m.trim()}…"`);

// (c) never claimed
for (const [rel, text] of [[HOME, home], [PRICING, pricing], [LANDING, landing]]) {
  const rest = text.split(COMING_SOON).join(" ");
  for (const re of NEVER) {
    const m = rest.match(new RegExp(`.{0,40}${re.source}.{0,30}`, re.flags));
    if (m) failures.push(`${rel}: claims something not live (${re}): "…${m[0].trim()}…"`);
  }
}

// Sign-up mode
if (open) {
  if (!home.includes("Start free trial")) failures.push(`${HOME}: open build should say "Start free trial"`);
  if (/Join Waitlist/i.test(home)) failures.push(`${HOME}: open build still says "Join Waitlist"`);
  if (/waitlist/i.test(home)) failures.push(`${HOME}: open build mentions the waitlist`);
} else {
  if (!home.includes("Join Waitlist")) failures.push(`${HOME}: waitlist build should say "Join Waitlist"`);
}

if (failures.length) {
  console.error(`check-home-copy (${open ? "open" : "waitlist"}): ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`check-home-copy (${open ? "open" : "waitlist"}): all checks pass`);
