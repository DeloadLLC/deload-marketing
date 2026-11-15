# Home page as one story — design

Status: draft for the founder's review (2026-11-15)

## Why

The founder read the home page and found it "too AI": it talks to someone who
already knows Deload ("the brief", "the plan", "the weeks after it keep up")
and reads as a list of features. The page has to tell one story that a
stranger can follow.

## Who it's for (founder's words)

"A coach who's trying to scale their business. A gym who's overwhelmed with
admin work, coaches who need help with retaining and building their business
in that gym. It's not just a coach, these are people who Deload wants to help
them prosper."

## What they should believe when they finish

All three, told in order (founder):

1. **Time back.** Deload takes the programming and admin weight off.
2. **Clients stay.** Athletes get a better experience, so they stay longer.
3. **Room to grow.** More clients or more coaches without things falling apart.

## Goals

- One story, top to bottom, in plain words. A gym owner who has never heard of
  Deload follows it without help.
- Introduce every product idea before its name appears. No insider terms (no
  "brief", "block" or "plan approval" without saying what it is first).
- Every claim is true on production today. Anything not live is "coming soon"
  or left out.
- The founder's voice appears in 2–3 short signed notes.

## Non-goals

- No visual redesign. The look from #32 (fonts, colours, components, Shot
  frames) stays.
- No change to pricing, plans or the waitlist/open sign-up switch.
- Other pages (features, why, about, landing-page) aren't rewritten here. The
  shared FAQ and proof points are, because the home page's story depends on
  them and they show on pricing, resources and landing-page.

## Anti-goals (a failure even if it ships)

- It sounds like an AI wrote it: stacked fragments, semicolons, "seamless",
  "unlock", "supercharge", "effortless", feature lists dressed as sentences.
- It promises scheduling, client billing, a leads inbox, Deload's own AI
  coach or the Discoverable fee (not live; CLAUDE.md forbids the last two).
- AI becomes the headline. AI is how Deload delivers; the reader's business is
  the story.

## Voice

Derek's notes are drafted from his own words on the About page and need his
sign-off as quotes before they ship.

A mix (founder): the page speaks to the reader as "you"; the founder adds short
first-person notes signed "Derek". Short sentences. Gym words, not software
words.

## Approaches considered

- **A. New words, same page.** Rewrite every line, keep today's six sections.
  Fast, but "room to grow" has no section, so the third act is squeezed into
  "One app instead of four".
- **B. Story-first page, same look (chosen by the founder).** Rebuild the
  section order around six acts, reuse the design system and the existing
  screenshots, add an opening, a "room to grow" section with a real team
  screenshot, and the founder's notes.
- **C. Full visual redesign.** Dropped: the look was redone two days ago and
  the problem is the words.

## The page, in order

Copy below is the draft the founder reviews. `{OFFER_LINE}` and the CTA keep
their current waitlist/open logic.

### 1. Opening (hero)

- **H1:** You got into this to coach. Not to do paperwork.
- **Lede:** Deload writes the first draft of every program, keeps your
  athletes on track between sessions, and gives your whole team one place to
  work. You get your evenings back, and your clients stick around.
- CTA + `{OFFER_LINE}`
- Visual: the coach calendar shot, as today.

### 2. Their week (the problem)

- **H2:** Sound familiar?
- **Body:** Sunday night, you're writing next week's programs. Monday, you're
  answering the same texts you answered last week. Somewhere in between, a
  client stops showing up and you don't notice until they've gone. You're good
  at coaching. It's everything around it that wears you down.
- **Derek's note:** "For years I wrote programs at 11pm and rewrote them by
  7am. I built Deload so I'd stop." — Derek

### 3. Time back (programming)

- **H2:** Your programs, drafted for you.
- **Body:** Tell Deload about your athlete the way you'd tell another coach:
  what they're training for, how many days they have, what equipment they've
  got, what hurts. It writes the whole program in your style. You read it,
  change what you'd change, and send it. Nothing reaches your athlete until
  you say so.
- **Supporting lines** (short list):
  - Strength, muscle, sport, endurance and older athletes.
  - RPE, RIR and percentages, the way you already use them.
  - Move a day or swap a lift, and it sorts out the weeks that follow.
  - Every change is saved, and you can undo any of it.
- Visual: the generate/plan screens already on the page (today's "Start from
  a sentence" and "Approve the plan first" shots), merged into one act.
- **Timing:** if the staging measurement supports it, the H2 or a supporting
  line gains the measured time ("a 12-week program in about N minutes"). The
  founder approves the number first.

### 4. They stay (the athlete's side)

- **H2:** Clients who feel coached stay.
- **Body:** Your athletes open Deload on their phone and see today's workout
  with the weights already worked out. They log as they go, even with no
  signal in the gym. They can see themselves getting stronger, and they can
  message you right next to the workout. It's free for them, with nothing to
  install.
- Visual: the three athlete phones. Captions:
  - Today's workout, warm-up to cool-down.
  - Every session they've logged, and how far they've come.
  - You, one tap away.

### 5. Room to grow (teams and selling)

- **H2:** Room to grow.
- **Body:** Bring on another coach and they work from the same programs and
  exercise library you do, so every client gets your standard. Share clients
  across the team when it helps. And sell your best programs to people you've
  never met, paid straight into your own Stripe account.
- **The tools it replaces** (today's list, reworded): your programming
  spreadsheet, the PDFs you send, the group chat, and the storefront you sell
  programs from.
- **Coming soon line:** Booking and billing your own clients are on the way.
- Visual: a new screenshot of the team roster or shared library on fixture
  data (the builder takes it the same way the existing shots were taken).
- **Derek's note:** "Deload is opinionated on purpose. It programs the way I'd
  program, and stays out of the way." — Derek

### 6. Why Deload (the founder)

- Keep the quote "I built Deload because I needed it." and the link to the
  full story. Body, shortened:
  - I coached at Equinox, then on my own with Sportslab NYC and Fitness360NYC,
    from weight-loss clients to marathoners and powerlifters.
  - I tried using AI for my own programming, and it worked. Turning that
    draft into something you can actually run on the gym floor took an
    enormous amount of work. That work is Deload.

### 7. Close

- **H2:** Get your Sunday back. (kept)
- `{OFFER_LINE}` + CTA.

## Shared copy that changes with it

- **FAQ** (`faqs` in `src/config.ts`; pricing and resources pages):
  - *Does it really sound like me?* — It learns from the programs you bring
    in and the changes you make. The more you use it, the more it writes like
    you.
  - *What about meet preps, injuries and in-season cuts?* — Yes. Tell it
    what's coming up or what's bothering your athlete, in your own words, and
    it changes the weeks that need it. You approve every change.
  - *What do my athletes see?* — Today's workout with the weights worked out,
    a quick way to log it, their progress, and messages with you. On any
    phone, in the browser. Apps for iPhone and Android are on the way.
  - The two pricing/access answers keep their facts; reword only if they read
    stiffly.
- **Proof points** (`proofPoints`; landing-page shows the first four): reword
  in the same voice, same facts.
- `SITE_DESCRIPTION` (meta description): rewrite to match the opening.
- PR #34 closes; its offline line lives in act 4.

## Constraints

- Claims are checked against the backend CLAUDE.md "on production" lists.
  Live: AI programs, editing in plain English, logging (offline saves),
  messaging, profiles, teams with shared roster and library (`teamLibraries`
  is behind a switch: the copy says "same programs and exercise library", and
  the builder checks it's on for teams before claiming the team library;
  otherwise the line says "same exercise library"), marketplace selling.
- Accessibility and layout rules from the site's DESIGN.md: 44 px targets,
  checked at 390/820/1280 px, light and dark.
- Waitlist mode stays the default.

## Left to the builder

- Section spacing and which existing shot goes in act 3.
- Taking the team screenshot on fixture data.
- Fitting the founder's notes into the existing type styles (a pull-quote
  style already exists for the founder quote).
