# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

One web product used on phone, iPad and laptop. Each size is designed for, not squeezed from another (founder, 2026-11-06). Native mobile (`deload-mobile`) is deferred; athletes use the web app at launch, installable on the home screen.

## Users

- **Coaches** (the buyer). Independent and hybrid strength, conditioning and endurance coaches: online clients on a monthly fee, in-person sessions billed separately; small teams and studios next. They write and adjust programs, watch their athletes' logs, message them, and run their business. They do it on the gym floor on a phone, on an iPad between sessions, and at a desk on a laptop, all three equally (founder, 2026-11-06).
- **Athletes** (free, the coach's clients). On their phone in the gym, often mid-set and one-handed: see today's session, log sets, reps, load and RPE, message the coach, keep their profile current.
- **Business owners and admins** (teams). Run a shared roster, seats, billing and a shared library.
- Primary success: a real coach pays for Deload sooner (the prioritization test every repo uses).

## Product Purpose

Deload is an AI-powered, all-in-one platform for coaches: programming, athlete logging and messaging, payments, and teams in one place, replacing three or four tools. A coach only stays if their athletes have a good experience, so the athlete app carries retention.

## Positioning

- AI program generation that works like a copilot: the coach drives every change, sees the agent's reasoning and diffs, accepts or rejects.
- It learns each coach's style from their imports, edits and preferences, so output reads like the coach wrote it.
- Hard guardrails code enforces: athlete injuries and constraints, equipment, safe progression, made-up exercises held as drafts, health clearance before programming.
- The whole coaching business in one place, with no Deload fee on a coach's own clients.

## Operating Context

- A coach's day: generate or import a program in chat, edit it on the calendar (by hand, with quick actions, or by chat), assign it, watch logs and adherence, reply to messages, adjust.
- An athlete's session: open Today, log each set with the load keypad and plate maths, rest timer, works with no signal.
- Programs are weeks → days → exercises with sets × reps, %1RM / RPE / load, rest, tempo, warm-ups and cool-downs, workout formats (AMRAP, EMOM, For Time, intervals), and cardio by time, distance, pace or heart rate.
- Sports in scope for MVP: strength / powerlifting, hybrid and running, general fitness, CrossFit-style conditioning.

## Capabilities and Constraints

- Surfaces: coach app (`deload-coach-ui`), athlete app (`deload-athlete-ui`), marketing site (`deload-marketing`), API (`deload-backend`), shared contracts (`deload-shared`).
- Stack: React + Vite + Tailwind + Radix (coach), React + Vite (athlete), Astro + Tailwind (marketing). Clerk auth, Stripe Connect.
- Private beta with comped coaches. Several surfaces sit behind per-org/per-user beta switches (scheduling, client billing, calendar magic, PAR-Q, assessments, push, swap list, team inbox and libraries); new work ships behind a switch.
- Pricing (Founders $99 / Solo $149 / Pro $199 / Elite $249) is settled but hidden on the site during the beta; a price change after the competitor review is open.
- Coach UX principles (binding, `deload-coach-ui/docs/ux-principles.md`): a sharp, fast, dense pro tool; speed is the defining quality (optimistic updates, skeletons, streamed progress); one implementation per UI concept; no dead-end controls.
- Elite businesses can white-label (their logo and colour); designs must still work under a coach's brand.
- Units: canonical storage (kg, metres, seconds); display follows coach and athlete unit preferences (planned).

## Brand Commitments

- Name: **Deload**. Logo: the Deload monogram and wordmark (`deload-coach-ui/public/deload-monogram.svg`, `deload-wordmark.svg`). These are kept (founder, 2026-11-06).
- Everything else about the look is open for the redesign: colours, type, components (founder, 2026-11-06). The current palettes are evidence, not commitments.
- Voice: plain, direct, coach-to-coach; no hype. AI copy never claims more than it did.

## Evidence on Hand

- Real beta: comped coaches using the product; the founder's own hybrid coaching business is the first live user.
- Testimonials: only coach quotes approved in the app feed the marketing site; none may be invented.
- No customer counts, benchmarks or press to cite. Competitor notes (Relay Athletic, TrainHeroic, TrueCoach, Everfit) live in the founder's plan, not in public copy.
- Assets: monogram, wordmark, favicon, app icons, an Open Graph image (`deload-coach-ui/public/`, `deload-marketing/public/`).

## Product Principles

1. The coach drives; the AI proposes and shows its work.
2. Deterministic code for money and safety; AI for language and judgment.
3. Fast and calm beats clever: a pro tool used many times a day.
4. Every screen works on the gym floor, at the desk, and in an athlete's hand mid-set.
5. Retention runs through the athlete: their app must feel as good as the coach's.

## Accessibility & Inclusion

- Used one-handed, mid-workout, in bright gyms: large touch targets, strong contrast, readable numbers.
- Units and formats vary by athlete (kg/lb, km/mi, m/yd); never assume one.
- Health data is restricted and shown more carefully than the rest.
