#!/usr/bin/env node
// Copy check for the home page story (spec: docs/superpowers/specs/
// 2026-11-15-home-story-design.md). Run after `pnpm build`:
//
//   node scripts/check-home-copy.mjs          waitlist build (the default)
//   node scripts/check-home-copy.mjs --open   PUBLIC_SIGNUP_MODE=open build
//
// It reads the built HTML in dist/ and exits non-zero on any failure:
//   (a) every approved line is on the home page, the FAQ answers are on
//       pricing and on the support resource page, and the first four proof
//       points are on landing-page (waitlist build: open sign-up forwards it);
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
    // Inline tags join their text; block tags separate it.
    .replace(/<\/?(span|a|em|strong|b|i|abbr)\b[^>]*>/gi, "")
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
// resources/[slug] shows the FAQ on the support page only.
const RESOURCE = "resources/support/index.html";

const COMING_SOON = "Booking, billing your clients and intake forms are on the way.";

// Every approved line on the home page, in page order (copy doc, 15 Nov).
const REQUIRED_HOME = [
  // 1. Opening
  "You got into this to coach. Not to spend your nights writing programs and answering texts.",
  "Deload writes the first draft of every program, keeps your athletes on track between sessions, and gives your whole team one place to work. You get your evenings back, and your clients stick around.",
  // 2. Their week
  "Sound familiar?",
  "Sunday night, you're writing next week's programs. Monday, you're answering the same texts you answered last week. Somewhere in between, a client stops showing up and you don't notice until they've gone. You're good at coaching. It's everything around it that wears you down.",
  "For years I wrote programs at 11pm and rewrote them by 7am. I built Deload so I'd stop.",
  // 3. Time back
  "Your programs, drafted for you.",
  "Tell Deload about your athlete the way you'd tell another coach: what they're training for, how many days they have, what equipment they've got, what hurts. It writes the whole program in your style. You read it, change what you'd change, and send it. Nothing reaches your athlete until you say so.",
  "Your first week is ready to edit in under 4 minutes.",
  "Strength, muscle, sport, endurance and older athletes.",
  "RPE, RIR and percentages, the way you already use them.",
  "Move a day or swap a lift, and it sorts out the weeks that follow.",
  "Every change is saved, and you can undo any of it.",
  "Already have programs? Bring them in from Excel, Word or PDF.",
  // 4. They stay
  "Clients who feel coached stay.",
  "Your athletes open Deload on their phone and see today's workout with the weights already worked out. They log as they go, even with no signal in the gym. They can see themselves getting stronger, and they can message you right next to the workout. It's free for them, with nothing to install.",
  "Today's workout, warm-up to cool-down.",
  "Every session they've logged, and how far they've come.",
  "You, one tap away.",
  // 5. Room to grow
  "Room to grow.",
  "Bring on another coach and they work from the same exercise library you do, so every client gets your standard. Share clients across the team when it helps. And sell your best programs to people you've never met, paid straight into your own Stripe account.",
  "Coach burnout is real. If Deload takes some of that weight off and helps your business grow, it was worth building.",
  "What it replaces",
  "Your programming spreadsheet, the PDFs you send, the group chat, and the storefront you sell programs from.",
  COMING_SOON,
  // 6. Why Deload
  "I built Deload because I needed it.",
  "— Derek Miranda, founder",
  "I coached at Equinox, then on my own with Sportslab NYC and Fitness360NYC, from weight-loss clients to marathoners and powerlifters.",
  "I tried using AI for my own programming, and it worked. Turning that draft into something you can actually run on the gym floor took an enormous amount of work. That work is Deload.",
  "Read the full story",
  // 7. Close
  "Get your Sunday back.",
];

const REQUIRED_FAQ = [
  "It learns from the programs you bring in and the changes you make. The more you use it, the more it writes like you.",
  "Yes. Tell it what's coming up or what's bothering your athlete, in your own words, and it changes the weeks that need it. You approve every change.",
  "Today's workout with the weights worked out, a quick way to log it, their progress, and messages with you. On any phone, in the browser. Apps for iPhone and Android are on the way.",
];

// The first four proof points, which landing-page shows.
const REQUIRED_LANDING = [
  "Powerlifters, weightlifters, bodybuilders, sport and masters athletes.",
  "RPE, RIR and percentages in the same program, and the numbers still add up.",
  "Training blocks, lighter weeks and peaks planned around each athlete.",
  "Move a day or swap a lift, and the weeks after it follow.",
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
  /\bAI coach\b/i,
  /leads inbox/i,
  /same programs/i,
];

const home = pageText(HOME);
const pricing = pageText(PRICING);
const landing = pageText(LANDING);
const resource = pageText(RESOURCE);
const homeHtml = existsSync(join(dist, HOME)) ? readFileSync(join(dist, HOME), "utf8") : "";

// (a) required strings
for (const s of REQUIRED_HOME) if (!home.includes(s)) failures.push(`${HOME}: missing "${s}"`);
// The founder's three signed notes (copy doc: "you add three short signed
// notes"): two short notes signed "— Derek" in the note style (acts 2 and 5,
// class "note-by"), and the act 6 founder quote, signed "— Derek Miranda,
// founder" (required above).
const noteBys = [...homeHtml.matchAll(/<figcaption[^>]*class="[^"]*\bnote-by\b[^"]*"[^>]*>([^<]*)</g)].map((m) => m[1].trim());
if (noteBys.length !== 2) failures.push(`${HOME}: expected 2 founder notes (.note-by), found ${noteBys.length}`);
for (const by of noteBys) if (by !== "— Derek") failures.push(`${HOME}: a founder note is signed "${by}", not "— Derek"`);
const quoteSigs = (home.match(/— Derek Miranda, founder/g) ?? []).length;
if (quoteSigs !== 1) failures.push(`${HOME}: expected the founder quote signed once, found ${quoteSigs}`);
for (const s of REQUIRED_FAQ) {
  if (!pricing.includes(s)) failures.push(`${PRICING}: missing FAQ answer "${s}"`);
  if (!resource.includes(s)) failures.push(`${RESOURCE}: missing FAQ answer "${s}"`);
}
if (!open) for (const s of REQUIRED_LANDING) if (!landing.includes(s)) failures.push(`${LANDING}: missing proof point "${s}"`);

// (b) banned words; semicolons in the home page's copy
for (const [rel, text] of [[HOME, home], [PRICING, pricing], [LANDING, landing], [RESOURCE, resource]]) {
  for (const w of BANNED) {
    if (new RegExp(`\\b${w}`, "i").test(text)) failures.push(`${rel}: banned word "${w}"`);
  }
}
const main = home.split(/\bSkip to\b/).pop() ?? home;
const semi = main.match(/.{0,40};.{0,20}/g);
if (semi) for (const m of semi) failures.push(`${HOME}: semicolon in copy: "…${m.trim()}…"`);

// (c) never claimed
for (const [rel, text] of [[HOME, home], [PRICING, pricing], [LANDING, landing], [RESOURCE, resource]]) {
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
