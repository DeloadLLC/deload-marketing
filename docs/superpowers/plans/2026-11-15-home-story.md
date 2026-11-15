# Home Page Story Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the home page as the founder-approved seven-act story, and update the shared FAQ, proof points and meta description to match.

**Architecture:** Copy lives in `src/config.ts` (shared strings) and `src/pages/index.astro` (page sections). The visual system from #32 is unchanged: reuse the existing section classes, `Shot` frames and the founder pull-quote style. One new screenshot (the team roster) is taken the same way the existing shots were.

**Tech Stack:** Astro 5, Tailwind 3. There's no unit-test runner, so checks are `pnpm build`, `pnpm typecheck`, a copy-check script over the built HTML, and Playwright screenshots.

**Spec:** `docs/superpowers/specs/2026-11-15-home-story-design.md`. The approved copy is the founder's Google Doc "Deload home page — story copy draft (15 Nov 2026)", id `1reybRhrDZVF-HogldSo8MTTqYvAD72jJkZnhNHQbYYo`. The spec's "The page, in order" section holds the same text; where the two differ, the spec wins, since it records the founder's later answers (narrowed opening, timing line).

## Global Constraints

- **Copy is verbatim:** use the spec's text exactly. Don't reword, and add no new claims.
- **Waitlist mode stays the default:** `PRIMARY_CTA`, `OFFER_LINE` and `SIGNUP_COPY` logic is untouched.
- **Banned in the new copy:** "seamless", "unlock", "supercharge", "effortless", "leverage", "game-changer", and semicolons in body copy.
- **Never claimed:** scheduling, client billing, the leads inbox, Deload's own AI coach, the Discoverable fee, and "same programs" across a team.
- **Founder's notes:** exactly the three in the spec, signed "— Derek", in the existing founder pull-quote style at a smaller size.
- **Layout:** 44 px targets; check at 390, 820 and 1280 px, light and dark. No horizontal scroll at 390.
- **Commits:** end with the session trailer lines. No model ids in repo files.

## Review Focus

1. **Open sign-up mode** (`PUBLIC_SIGNUP_MODE=open`): every act still reads right and CTAs say "Start free trial". Task 3 builds both modes.
2. **A long headline at 390 px:** the H1 ("…Not to spend your nights writing programs and answering texts.") must not overflow or orphan a single word. Task 3 checks it.
3. **Pages that share `faqs` and `proofPoints`:** pricing, resources/[slug] and landing-page still build and read naturally. Task 1's copy check covers their built HTML.
4. **Reduced motion:** the existing `data-reveal` sections still show their content with motion off. Task 3's screenshots use reduced motion.
5. **Images that fail to load:** the new team shot has `alt` text and a fixed ratio, so the layout doesn't jump. Task 2.

---

### Task 1: Shared copy in config

**Files:**
- Modify: `src/config.ts`. Change `SITE_DESCRIPTION`, the three FAQ answers named in the spec, and `proofPoints`, from the spec.
- Create: `scripts/check-home-copy.mjs`. It reads `dist/**/*.html` and exits non-zero on failure.

**Interfaces:**
- Produces: `node scripts/check-home-copy.mjs`. It checks:
  - (a) every required string below is present in `dist/index.html`, plus the FAQ strings in `dist/pricing/index.html`;
  - (b) no banned word appears in `dist/index.html`, `dist/pricing/index.html` or `dist/landing-page/index.html`;
  - (c) none of the "never claimed" phrases appear ("client billing", "scheduling" or "booking" outside the coming-soon line, "Discoverable", "AI coach for athletes").

  Tasks 2 and 3 run it.

- [ ] **Step 1:** Write `scripts/check-home-copy.mjs`. Its REQUIRED list covers the H1 and the five act headlines ("Sound familiar?", "Your programs, drafted for you.", "Clients who feel coached stay.", "Room to grow.", "Get your Sunday back."), the timing line "Your first week is ready to edit in under 4 minutes.", the three "— Derek" notes and the three new FAQ answers.
- [ ] **Step 2:** Run `pnpm build && node scripts/check-home-copy.mjs`. Expected: FAIL, listing the missing strings.
- [ ] **Step 3:** Update `src/config.ts` with the FAQ answers, `proofPoints` and `SITE_DESCRIPTION` from the spec.
- [ ] **Step 4:** Run `pnpm build && pnpm typecheck`. Expected: both pass. The checker still fails on the home-page strings (Task 2), but no FAQ string is missing.
- [ ] **Step 5:** Commit: "Home story: shared FAQ, highlights and description".

### Task 2: The seven acts on the home page

**Files:**
- Modify: `src/pages/index.astro`. Rebuild the sections in the order 1 Opening, 2 Their week, 3 Time back, 4 They stay, 5 Room to grow, 6 Why Deload, 7 Close. Remove the "Start from a sentence", "Approve the plan first" and "One app instead of four" sections as separate sections; their shots move into act 3 and the `replaces` list moves into act 5 as the "What it replaces" line. Remove the hero TODO comments.
- Create: the `team-roster` screenshot, light and dark, at the same sizes and naming as the existing `Shot` assets, on fixture data. Use the repo's existing shot pipeline; look at how `coach-calendar` was produced in the hallmark scripts or README.

**Interfaces:**
- Consumes: the Task 1 checker.

- [ ] **Step 1:** Build the acts with the spec's copy verbatim.
  - Act 3 uses the existing describe-the-athlete and plan shots, plus its five supporting lines and the timing line.
  - Act 4's captions are the spec's three.
  - Act 5 includes the coming-soon line "Booking, billing your clients and intake forms are on the way."
  - The founder notes use the founder-quote style.
- [ ] **Step 2:** Take the team roster shot. Its alt text: "A coaching team's shared roster in Deload: athletes with their coach and this week's training."
- [ ] **Step 3:** Run `pnpm build && pnpm typecheck && node scripts/check-home-copy.mjs`. Expected: all pass.
- [ ] **Step 4:** Commit: "Home story: seven acts, team shot".

### Task 3: Both modes, every width, both themes

**Files:**
- Create: `scripts/shoot-home.mjs`. Playwright takes `dist` previews at 390, 820 and 1280 px, light and dark, with reduced motion, in waitlist and open builds. It writes to the scratchpad, not the repo.

- [ ] **Step 1:** Build with `PUBLIC_SIGNUP_MODE=open pnpm build`. Then run the checker with `--open`, which expects "Start free trial" and no "Join Waitlist" in `dist/index.html`. Expected: pass.
- [ ] **Step 2:** Shoot all 24 combinations. In the shots, check:
  - no horizontal scroll at 390;
  - the H1 wraps cleanly;
  - targets are at least 44 px;
  - the founder notes are readable in dark.

  Fix any issue in `index.astro` styles and re-shoot.
- [ ] **Step 3:** Commit any style fixes: "Home story: layout fixes from the visual check".
- [ ] **Step 4:** Open a PR to `staging` from `feat/home-story`, linking the spec and the copy doc and attaching 6 key shots. Close #34 with a note that it's replaced by this PR.
