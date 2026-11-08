---
name: Deload marketing site
description: The coach's week, set in type. Persuade mode, palette A Sage & clay.
colors:
  cream-page: "#F7F4EF"
  paper-surface: "#FFFFFF"
  sunk-cream: "#F3EFE8"
  ink: "#1B1D1A"
  muted-olive: "#6A6C64"
  faint-olive: "#9C9D94"
  hairline: "#E6E1D8"
  muted-on-ink: "#A9AB9F"
  hairline-on-ink: "#343832"
  sage: "#557457"
  clay: "#B8724A"
  needs-you-red: "#B23A2B"
  deep-sage-field: "#3F5F45"
  on-field-muted: "#C9D9CA"
  night-page: "#141613"
  night-surface: "#1B1E1A"
  night-sunk: "#20241F"
  night-ink: "#ECEBE4"
  night-muted: "#A3A69B"
  night-faint: "#7C7F75"
  night-hairline: "#2C312A"
  night-muted-on-cream: "#5C5E57"
  night-hairline-on-cream: "#D6D3CA"
  night-sage: "#8FB393"
  night-clay: "#D99772"
  night-needs-you-red: "#F08A7B"
  night-on-field-muted: "#263429"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.6rem, 1.2rem + 5.4vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  display-hero:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.6rem, 1.2rem + 5.4vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  display-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.3rem + 3.6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.25rem + 2.4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.95rem + 0.45vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
  numeral:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontWeight: 500
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\" 1"
  logo:
    fontFamily: "Space Grotesk, Geist, sans-serif"
    fontWeight: 600
rounded:
  control: "10px"
  control-lg: "12px"
  menu: "16px"
  band: "20px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  container: "78rem"
  button-gap: "10px"
  row: "1.1rem"
  section: "80px"
  section-md: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream-page}"
    rounded: "{rounded.control}"
    padding: "0 1.05rem"
    height: "44px"
  button-primary-lg:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream-page}"
    rounded: "{rounded.control-lg}"
    padding: "0 1.35rem"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 1.05rem"
    height: "44px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.muted-olive}"
    rounded: "{rounded.control}"
    padding: "0 0.5rem"
    height: "44px"
  field-input:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.6rem 0.8rem"
    height: "44px"
  ink-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream-page}"
    rounded: "{rounded.band}"
    padding: "80px 56px 48px"
  sage-field:
    backgroundColor: "{colors.deep-sage-field}"
    textColor: "{colors.cream-page}"
    padding: "112px 0"
  tier-badge:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream-page}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
---

# Design System: Deload marketing site

Recorded 2026-11-07 from the shipped redesign on `redesign/preview` (head
584a260), not from the sketches. Mode: Persuade. Tokens live in
`src/styles/global.css` as RGB triplets (`--t-*` raw, `--c-*` roles) and
reach Tailwind through `tailwind.config.mjs` (`bg`, `surface`, `sunk`, `ink`,
`muted`, `faint`, `rule`, `sage`, `clay`, `warn`). Light and dark follow the
visitor's system setting; there is no toggle. The coach and athlete apps share
the palette and type (see their own DESIGN.md); this site is the Persuade
expression of the same world.

## Overview

**Creative North Star: "The Coach's Week, Set in Type"**

The site sells the outcome (the evening back, one app instead of four) with
type, colour fields and abstract drawn motifs, never with pictures of the
product. A warm cream page carries large tight Geist headlines; one ink field
per page (it inverts to cream at night) holds the thesis and the close; a deep
sage field carries the "whole job" band on the home page. Sage and clay are
the only accents, and clay is reserved for the moments that move: the rotating
hero noun, the strikes through the old tools, the week rail.

Hierarchy comes from scale and weight, not from boxes. Lists are hairline rows
without bullets; sections are separated by a 1px rule and generous vertical
space; wide screens give sections a 14rem side column. Real numerals (times,
weeks, prices, percentages) are set in Geist Mono with tabular figures and
pulled tight inside display type; nothing else is mono.

**Key Characteristics:**
- Type-only persuasion: no screenshots, UI mock-ups, product walk-throughs or photos anywhere.
- Cream page, one ink band, ink primary buttons; sage and clay as the only accents.
- Geist for every word, Geist Mono for every real number, Space Grotesk for the logo only.
- Hairline rules instead of cards; colour fields instead of imagery.
- Motion is a reveal of meaning (a strike drawn, a week filled), off under reduced motion.

## Colors

Warm cream and green-black ink, with sage for "this is fine / done" and clay
for "watch this"; one colour per meaning, never decorative.

### Primary
- **Ink** (`ink`): headlines, body emphasis, primary button fill, the ink band's field. At night it becomes near-white (`night-ink`) and the primary button flips to near-white with green-black text.

### Secondary
- **Sage** (`sage`; night `night-sage`): focus rings (2px outline, 3px offset), the field-input focus halo, success ticks on pricing and beta lists, and the "You're subscribed to updates." note. The apps' `#557457`, one sage across the three surfaces: 5.22:1 on white and 4.76:1 on cream, so it may be small text (the earlier `#5E7F62` was 4.48:1 / 4.08:1).
- **Deep Sage Field** (`deep-sage-field` #3F5F45, `--c-field`; cream text 6.52:1, muted text `on-field-muted` 4.86:1): the "One app, the whole job" band. At night the field becomes `night-sage` with green-black text (7.83:1; `night-on-field-muted` 5.63:1).

### Tertiary
- **Clay** (`clay`; night `night-clay`): the rotating hero noun (display size only: 3.45:1 on cream, large-text use), the strike lines, the week rail fill and dot, the "Coming soon" dot, link hover underline, the text caret, the selection tint, the deload bars in the block diagram, large mono figures on `/elevate`. Never body-size text on cream.

### Neutral
- **Cream Page** (`cream-page` / `night-page`): the page ground.
- **Paper Surface** (`paper-surface` / `night-surface`): form cards, the mega-menu panels, secondary buttons, inputs.
- **Sunk Cream** (`sunk-cream` / `night-sunk`): the pricing beta-offer panel, menu item hover.
- **Muted Olive** (`muted-olive` / `night-muted`): ledes, secondary copy, attribution, nav links at rest. 4.86:1 on cream.
- **Faint Olive** (`faint-olive` / `night-faint`): the scrollbar thumb only. 2.5:1 on cream, so never text.
- **Hairline** (`hairline` / `night-hairline`): every rule, row divider and control border.
- **On-ink roles** (`muted-on-ink`, `hairline-on-ink`; at night `night-muted-on-cream`, `night-hairline-on-cream`): the same muted and rule roles inside an ink band.
- **Needs-you Red** (`needs-you-red` / `night-needs-you-red`): form error messages only.

### Named Rules
**The One Ink Field Rule.** A page gets at most one ink band for its thesis plus the closing band; the `.ink-field` swaps ink and page so everything inside inverts with it, light and dark, with no second set of classes.

**The Solid Role Rule.** Text colour is always a solid role token (`ink`, `muted`, or the on-field / on-ink role). Never tint text with opacity to make it quieter; pick the muted role, which is tuned for 4.5:1 on its own ground.

**The Clay Is Large Rule.** Clay text appears only at display or large-numeral size, or as a drawn line. Body-size clay text on cream fails contrast.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui, -apple-system, Segoe UI)
**Body Font:** Geist
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular, Menlo), tabular figures
**Logo Font:** Space Grotesk 600/700, only the letters of "deload" are fetched

**Character:** One grotesque at two extremes: very large, tight, 600-weight headlines against calm 16px body; mono numerals drop into headlines as anchors ("Sunday, 9:40 pm.", "$99").

### Hierarchy
- **Display** (600, up to 76px, line-height 0.98, -0.04em): the Sunday band, pricing's title, the home close. The home hero is one notch tighter, -0.045em (`.display-hero`), as in the founder's sketch.
- **Display small** (600, up to 60px, line-height 1, -0.04em): every inner page's headline (PageHero), the founder pull quote, inner-page closes.
- **Headline** (600, up to 44px, line-height 1.04, -0.035em): section heads.
- **Title** (600, 22px, line-height 1.2, -0.02em): pillar titles, offer panels, success headings.
- **Lede** (400, 17-19px, line-height 1.55, muted, max 58ch): the paragraph under a headline.
- **Body** (400, 16px, line-height 1.55): running copy; prose capped at 65ch.
- **Small** (15px): supporting lines, nav, footer links, card captions. **Fine print** (13px, 500 for column heads): pricing fine print, mega-menu and footer column headings.
- **Numerals** (Geist Mono 500, tabular, -0.02em; -0.075em inside display, headline and display-small type): prices (52-88px on pricing), times, percentages, weeks, step numbers.

### Named Rules
**The Real Numbers Rule.** Mono is for real numerals only (times, weeks, prices, counts). Words never go mono, and numbers in running copy wrap in `.num`.

**The 12px Floor.** No text below 12px (0.75rem). The week-rail day names, pricing badges and the "Coming soon" tag sit exactly at the floor.

## Layout

One centred container (max 78rem, gutter clamp(16px, 4vw, 40px)). Sections
breathe at 80px top and bottom on phones and 112px from `md`; inner-page
heroes start at 56px / 96px. Eyebrows: not used (founder, 2026-11-08). No
small label sits above or beside a headline; the headline names the section on
its own, and a section that had a label in a 14rem left column now runs its
headline and content across the container (or as an even two-column grid).
`.label` (13px muted) is kept only where it is the text itself: a small section
heading with nothing above it ("Explore more", "Other business types", the
features index columns, testimonials) and captions on data (the Founders Rate
price, the pricing tier caption, the beta form's follow-along line). Feature and
resource pages that are not live yet show the "Coming soon" tag on its own
line above the headline. Outcome lists are hairline
rows (1px rule between, 1.1rem padding, larger rows 1.75rem). Buttons group
with a 10px gap and wrap.

Per page:
- **Home:** hero (headline max 16ch, lede, ink primary + secondary + quiet "Why we're different", founders line) → the rounded ink band "Sunday, 9:40 pm." with the week rail → the five replaced tools in a 1/2/5-column hairline grid, old tool struck in clay → the full-bleed sage field with three big-word pillars → "The hours that don't show up on a roster" rows → "Not a workout app pretending to coach" two-column with outcome rows → founder quote and story → text testimonials (or the honest placeholder) → ink close band.
- **Inner pages** (features, business types, resources, why, about, elevate, book-a-demo, beta, contact): PageHero (display-small headline, lede, actions, optional abstract aside on `lg`) → hairline sections → CloseBand.
- **Pricing:** during the beta, a two-column Founders Rate offer with the price in a rounded ink band; when prices show, an Individuals / Teams segmented toggle, then three tiers separated by vertical hairlines (no cards), the highlighted tier's button turning ink.
- **Landing page / ad pages:** minimal header (logo + one action), no mega-nav.
- Breakpoints are Tailwind's defaults; the desktop mega-nav appears only at `xl` (1280px); below it a 44px menu button opens a full-width disclosure menu.

## Elevation & Depth

Flat. Depth comes from colour fields (ink band, sage field, sunk panel) and
1px hairlines. The only shadows: the mega-menu panel's soft drop (floating
thing), the field-input focus halo, and the logo tile's 1px hairline ring on
light grounds (removed at night). The sticky header is the page colour at 90%
with a 12px backdrop blur over a 70% hairline.

### Named Rules
**The Floating-Only Shadow Rule.** Only things that float (menus) cast a shadow. Bands, forms and tiers stay flat.

## Shapes

Square-ish, not pill. Controls and inputs 10px; large buttons and the
segmented toggle 12px (toggle tabs 9px inside); menu panels 16px with 12px
items; ink bands, form cards and offer panels 20px; badges and the "Coming
soon" tag fully round. Lines are 1px everywhere; the strike is 0.09em (min
2px); the week rail 3px with a 14px dot ringed in the band colour. The logo
tile's corner is 21% of its size.

## Components

### Buttons
Confident and quiet: weight from ink, not from size.
- **Shape:** gently squared (10px; large 12px), 44px tall (large 52px), 600 weight, 15px (large 16px).
- **Primary:** solid ink with page-coloured text; hover deepens to 86% ink; press nudges 1px down.
- **Secondary:** surface with a hairline border; hover darkens the border.
- **Quiet:** no border or fill, muted text turning ink on hover; used for the third, lower-priority action ("Why we're different").
- **Arrow:** a trailing arrow slides 3px right on hover (200ms).
- **Focus:** 2px sage outline, 3px offset. **Disabled:** 55% opacity, not-allowed cursor.

### Tags and badges
- **Coming soon tag:** fully round, hairline border, 12px muted text, a 6px clay dot before the words.
- **Tier badge:** solid ink pill, page-coloured 12px semibold text.

### Bands and fields
- **Ink band** (`.ink-field`): 20px corners, generous padding (48-80px block), page/ink swap so every child inverts. Holds the thesis, the Founders Rate price and every close.
- **Sage field** (`.field`): full-bleed, cream text on deep sage; rules inside it run at half strength.
- **Offer panel:** sunk cream, 20px corners, headline + body left, ink large button right.

### Inputs / Fields
- **Style:** surface fill, hairline border, 10px corners, 44px minimum, 16px text (no iOS zoom), muted placeholder at full opacity, clay caret.
- **Hover:** border to 30% ink. **Focus:** border goes ink plus a 3px sage halo at 25%.
- **Error:** a 14px needs-you-red status line under the form (`role="status"`).
- Forms sit in a 20px surface card with a hairline border; labels 14px medium ink above each field.

### Navigation
- **Header:** sticky, 64px, wordmark left, nav in 15px muted links (ink on hover), then "Sign in", secondary "Book a demo" and ink primary CTA right.
- **Mega-menu:** opens on hover and on focus-within; 16px surface panel with a hairline and soft drop, fades and rises 4px in 200ms; Features in four columns with 13px muted column heads.
- **Phone and iPad:** the primary CTA stays visible from `sm`; a 44px menu button toggles a full-width list of 52px disclosure rows with 44px links.
- **Footer:** a closing call to action row, then the wordmark column and four link columns.

### Struck tools (signature)
Each old tool name ("the spreadsheet", "the PDF") is muted text with a clay
strike drawn left to right as the row scrolls in (700ms, 120ms stagger per
item). With reduced motion or no JS the strike is already drawn.

### Week rail (signature)
In the Sunday band: a 3px rule Mon to Sun in mono 12-13px day names, a clay
fill that runs to 96% (1400ms) and a clay dot that lands on Sunday after it.
Decorative (`aria-hidden`).

### Block diagram
An abstract SVG of three four-week waves, ink bars at rising strength with
the deload week in clay and mono "Block N" labels; bars grow from the base
(900ms, 45ms stagger). A motif, never data and never the product's interface.

### Testimonials
Text only: 24px medium ink quote, 15px attribution (name in ink, role muted).
Quotes load from the approved-quotes API; with none, an honest placeholder
headline and lede. No headshots, even when the API returns one.

### Logo
The supplied monogram (cream tile, Space Grotesk 700 lowercase "d" in
`#14161A`, cream slot) and the lowercase "deload" wordmark in Space Grotesk
600, 28px tile by default. A 1px hairline ring on light grounds only.

### Motion
One easing for the site: an expo-style ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`).
Controls 160ms; arrow nudge 200ms; menu 200ms; hero noun swap 320ms
(fade, 0.12em drop, 4px blur) every 2.4s; strikes 700ms; week rail 1400ms;
block bars 900ms. Under `prefers-reduced-motion: reduce` the noun stops
rotating, strikes and the rail are drawn, bars stand, menus and buttons stop
transitioning.

## Do's and Don'ts

### Do:
- **Do** sell with type, colour fields and abstract drawn motifs; numbers as big mono anchors.
- **Do** use ink for the primary button, a hairline secondary beside it, and a quiet text button for anything third.
- **Do** keep every tap target at 44px or more on phones (buttons, menu rows, links in the phone menu, fields).
- **Do** use solid role tokens for text (`ink`, `muted`, on-ink and on-field muted) so contrast holds at 4.5:1 in both themes.
- **Do** put every real numeral in Geist Mono with tabular figures; inside display type, tighten it to -0.075em.
- **Do** give every motion a reduced-motion end state that shows the finished meaning (strike drawn, rail full).
- **Do** keep the logo exactly as supplied, with its 1px hairline on light grounds.

### Don't:
- **Don't** show product screenshots, UI mock-ups, feature walk-throughs or photos, and don't explain how the product works inside: copy names outcomes, not mechanics (founder, 2026-11-06).
- **Don't** market the R2 self-coaching AI coach or a Discoverable fee.
- **Don't** invent quotes, counts or claims; testimonials come only from approved coach quotes, text only.
- **Don't** use coloured side bars or border-left accents.
- **Don't** tint text with opacity; choose the muted role instead.
- **Don't** set text below 12px.
- **Don't** set body-size text in clay on cream; it falls under 4.5:1 (sage now clears it).
- **Don't** use Space Grotesk anywhere but the logo, or a black "D" tile stand-in.
- **Don't** wrap sections in cards with shadows; use hairlines and fields.
- **Don't** add kicker or eyebrow lines over headlines. Eyebrows: not used (founder, 2026-11-08); the ones the build carried (the hero's "The all-in-one AI coaching platform", PageHero's label, "Built for real programming" and the rest) were removed.
