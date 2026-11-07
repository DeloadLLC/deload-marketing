export const APP_URL =
  (import.meta.env.PUBLIC_APP_URL as string | undefined) ??
  "https://app.deloadapp.io";

export const API_BASE_URL =
  (import.meta.env.PUBLIC_API_BASE_URL as string | undefined) ??
  "https://app.deloadapp.io";

const trimmedAppUrl = APP_URL.replace(/\/+$/, "");
export const SIGN_IN_URL = `${trimmedAppUrl}/sign-in`;
export const SIGN_UP_URL = `${trimmedAppUrl}/sign-up`;

// Private beta (founder, 2026-10-19): sign-up is by invitation, so every
// sign-up button is "Join Waitlist" and goes to /beta, whose form feeds the
// beta list (Admin → Beta invites). PUBLIC_SIGNUP_MODE=open puts the buttons
// back on the app's sign-up when the beta ends.
export const SIGNUP_MODE: "waitlist" | "open" =
  (import.meta.env.PUBLIC_SIGNUP_MODE as string | undefined)?.trim() === "open" ? "open" : "waitlist";
const siteBase = (import.meta.env.BASE_URL as string | undefined) ?? "/";
export const PRIMARY_CTA =
  SIGNUP_MODE === "open"
    ? { label: "Try for free", href: SIGN_UP_URL }
    : { label: "Join Waitlist", href: `${siteBase.replace(/\/$/, "")}/beta` };

// The app hosts the one copy of the legal pages (they changed with the beta
// decisions; two copies drifted). The site's /privacy and /terms forward there.
export const PRIVACY_URL = `${trimmedAppUrl}/privacy`;
export const TERMS_URL = `${trimmedAppUrl}/terms`;

// Prices stay hidden during the private beta (founder, 2026-10-19). The tier
// data below is kept for when they're published: PUBLIC_SHOW_PRICES=1.
export const SHOW_PRICES = (import.meta.env.PUBLIC_SHOW_PRICES as string | undefined)?.trim() === "1";

export const TURNSTILE_SITE_KEY =
  (import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined) ?? "";

export const SITE_NAME = "Deload";

// Repositioned per request: lead with "all-in-one" instead of "for serious coaches".
export const SITE_TAGLINE = "The all-in-one AI coaching platform";

export const SITE_DESCRIPTION =
  "The all-in-one AI coaching platform for coaches who write their own training. Generate block-aware programs, edit in plain English, bring in the programs you already have, run your roster, and ship the program straight to your athletes' phones — all in one place.";

// ---------------------------------------------------------------------------
// Information architecture / navigation
// ---------------------------------------------------------------------------
//
// The header renders three mega-menu dropdowns (Features, Business types,
// Resources) plus two flat links (Why we're different, Pricing). All menu
// data lives here so a single edit updates the header, the footer, and the
// dynamically generated detail pages.

export type FeatureStatus = "shipped" | "soon";

export interface FeatureEntry {
  slug: string;
  nav: string; // label in the dropdown
  status: FeatureStatus;
  menuBlurb: string; // one line under the nav label
  eyebrow: string;
  title: string; // hero headline on the detail page
  intro: string; // hero sub-paragraph
  points: string[]; // capability bullets
  flagship?: boolean;
}

// Grouped only for the dropdown's column layout (mirrors arketa's mega-menu).
export const FEATURE_GROUPS: { heading: string; slugs: string[] }[] = [
  { heading: "Programming", slugs: ["ai-programming", "program-editing", "program-import", "populations"] },
  { heading: "Roster", slugs: ["roster", "messaging", "check-ins"] },
  { heading: "Athlete experience", slugs: ["athlete-app", "scheduling"] },
  { heading: "Business", slugs: ["marketplace", "billing", "analytics", "team", "white-label"] },
];

export const FEATURES: FeatureEntry[] = [
  {
    slug: "ai-programming",
    nav: "AI-assisted programming",
    status: "shipped",
    flagship: true,
    menuBlurb: "Block-aware first drafts, in minutes instead of evenings.",
    eyebrow: "AI Programming",
    title: "The first true AI exercise-programming agent.",
    intro:
      "Most “AI” fitness tools autocomplete a workout. Deload writes a real, block-aware program for the athlete in front of you — periodization, intensity schemes, and the constraints you set. Not a template. Not a guess.",
    points: [
      "A full first-draft block for each athlete's sport, level, equipment, training age and constraints.",
      "Built on real programming principles, so it isn't inventing set/rep schemes.",
      "Mesocycles, deloads, peaks and tapers that land on the meet or goal date.",
      "Prescribe by RPE, RIR or %1RM in the same block, and the numbers still add up.",
      "Population-aware: powerlifting, weightlifting, hypertrophy, sport-specific, masters, HRT-aware, and post-surgical programming.",
    ],
  },
  {
    slug: "program-editing",
    nav: "Plain-English editing",
    status: "shipped",
    menuBlurb: "Edit any block in plain English; downstream weeks adjust.",
    eyebrow: "Editing",
    title: "Plain-English edits that ripple through the block.",
    intro:
      "Tell Deload the constraint — a tweaked back, a missed week, a meet that just moved — and the affected weeks rewrite themselves. You see exactly what changed, and the rest of the block stays where you left it.",
    points: [
      "Ask the way you'd say it: “drop the deload,” “add RPE targets,” “make Wednesday upper-body focused.”",
      "Every AI change spelled out, so nothing moves without you knowing.",
      "Fine-tune sets, reps, RPE, rest, tempo and cues yourself, any time.",
      "Same-family swaps and exercise substitutions that keep the intent intact.",
      "Rearrange days and move exercises between sessions as the week changes.",
      "Every edit kept and reversible — you stay the coach of record.",
    ],
  },
  {
    slug: "program-import",
    nav: "Program import",
    status: "shipped",
    menuBlurb: "Bring in the programs you already wrote.",
    eyebrow: "Import",
    title: "Bring the programs you already have.",
    intro:
      "Your best programs already exist in a spreadsheet, a Word doc or a PDF. Bring them in and Deload keeps the weeks, days, sets, reps and loads — in your wording — so you can edit, assign and build on them instead of retyping.",
    points: [
      "Import from Excel, Word, PDF or pasted text.",
      "Sets, reps, loads, RPE and rest read as you wrote them — your cues and notes stay word for word.",
      "Supersets and complexes come across too, ready for you to check.",
      "Imported programs work just like AI-written ones: edit, assign and build on them the same way.",
    ],
  },
  {
    slug: "populations",
    nav: "Population-specific protocols",
    status: "shipped",
    menuBlurb: "Protocols general tools quietly skip.",
    eyebrow: "Populations",
    title: "Programming that respects who's actually in front of you.",
    intro:
      "Deload tailors the program to who's actually in front of you, so it isn't generic — including the populations most tools ignore.",
    points: [
      "Powerlifting, weightlifting, hypertrophy, and sport-specific prep.",
      "Masters athletes, bone-density-aware programming, and fall-prevention GPP.",
      "Trans athletes across the HRT spectrum (on / off / pre / post-surgical).",
      "Hypogonadal men with or without TRT, including post-prostate-cancer cases.",
    ],
  },
  {
    slug: "roster",
    nav: "Roster management",
    status: "shipped",
    menuBlurb: "See who needs you this week.",
    eyebrow: "Roster",
    title: "Triage the roster, don't refresh it.",
    intro:
      "Know who needs attention this week — new clients, drifting clients, recent PRs and high-RPE weeks — and deal with each athlete before it becomes a problem.",
    points: [
      "Your whole roster at a glance, with the athletes who need you first.",
      "Each athlete's history in one place: PRs, RPE trends, check-ins and program changes.",
      "A heads-up when RPE runs high or an athlete drifts off target.",
      "Coming soon: suggested swaps when an athlete reports pain or a brutal RPE.",
      "Each athlete in their own units: lb and mi, or kg and m.",
    ],
  },
  {
    slug: "messaging",
    nav: "In-app messaging",
    status: "shipped",
    menuBlurb: "Messaging that doesn't live in your texts.",
    eyebrow: "Communication",
    title: "Messaging that doesn't live in your texts.",
    intro:
      "Athletes message you from their phone or computer, about the session that prompted the question, so you answer with the context in front of you.",
    points: [
      "Every conversation tied to the session or week it's about.",
      "New athletes get your welcome note without you having to remember it.",
      "Coming soon: an assistant that answers your athletes' “what's my weight today?” questions.",
    ],
  },
  {
    slug: "check-ins",
    nav: "Structured check-ins",
    status: "soon",
    menuBlurb: "Structured check-ins that land back in your inbox.",
    eyebrow: "Check-ins",
    title: "The weekly check-in, structured and in one place.",
    intro:
      "Weekly check-ins reach your athletes on schedule, in the app or by email, so you catch readiness, pain and off-target weeks before they become a problem.",
    points: [
      "Recurring check-ins that go out on their own, in the app or by email.",
      "Ask about readiness, pain and adherence in your own words.",
      "Answers land where you'll see them, and can alert the rest of your team.",
      "Your own intake questions for new athletes.",
    ],
  },
  {
    slug: "athlete-app",
    nav: "Athlete app",
    status: "shipped",
    menuBlurb: "An app athletes actually open — on any phone.",
    eyebrow: "Athlete experience",
    title: "An app athletes actually open.",
    intro:
      "Clean, quiet, built around the next set — not gamified streaks. Athletes see today's session, log it in seconds, and message you when something's off. You stay the coach of record.",
    points: [
      "Works on any phone through the browser today; native iOS and Android apps are coming soon.",
      "Athletes log sets, reps, weight and RPE in the gym in seconds, and PRs are caught automatically.",
      "Runs, rows, intervals and more log as naturally as barbell work.",
      "Athletes always know what today's session is, from warm-up to cool-down.",
    ],
  },
  {
    slug: "scheduling",
    nav: "Scheduling & booking",
    status: "soon",
    menuBlurb: "Paid 1-on-1 sessions, booked without the back-and-forth.",
    eyebrow: "Scheduling",
    title: "Booking and scheduling, handled in the same app.",
    intro:
      "Offer paid 1-on-1 sessions and let athletes book times that suit you both — no back-and-forth over text.",
    points: [
      "Sell 1-on-1 sessions at your price, length and hours.",
      "Athletes book and pay through Stripe.",
      "An AI booking assistant suggests times from your hours and their history.",
      "One schedule for the whole team, with resource and capacity limits respected.",
      "Coming soon: a whole week scheduled around recovery for you.",
    ],
  },
  {
    slug: "marketplace",
    nav: "Program marketplace",
    status: "shipped",
    menuBlurb: "Sell your programs, paid to your own Stripe account.",
    eyebrow: "Marketplace",
    title: "Sell the programs you're proud of.",
    intro:
      "Sell your programs on the Deload marketplace. Athletes buy them in the Deload app, and the money goes to your own Stripe account.",
    points: [
      "Put any program up for sale at the price you choose.",
      "Buyers pay by card through Stripe, get the program in their Deload app, and join your roster — ready to message or bring on as a client.",
      "Deload takes 15% only on buyers its marketplace brings you. Buyers who come straight to you through your own link pay no Deload fee, and neither do payments from your own clients.",
      "Sales paid to your own Stripe account, set up once.",
    ],
  },
  {
    slug: "billing",
    nav: "Billing & payments",
    status: "soon",
    menuBlurb: "Get paid without leaving the app.",
    eyebrow: "Billing",
    title: "Get paid without leaving the app.",
    intro:
      "Bill your clients for monthly plans, packages and one-off sessions through Stripe — so the money side stops being a second tool.",
    points: [
      "Monthly plans and session packages for your athletes, paid through Stripe.",
      "Get paid for 1-on-1 sessions and services when they're booked.",
      "Invoice one-off charges yourself.",
      "Revenue and billing reports you can export to CSV or PDF.",
    ],
  },
  {
    slug: "analytics",
    nav: "Analytics & reporting",
    status: "soon",
    menuBlurb: "Know how the roster and the business are doing.",
    eyebrow: "Analytics",
    title: "The numbers that actually tell you something.",
    intro:
      "Turn logged sessions and bookings into decisions — without exporting to a spreadsheet.",
    points: [
      "This week at a glance: new clients, drifting clients, recent PRs and this week's auto-adjustments.",
      "Reports on your schedule, revenue, billing and how your space and equipment are used.",
      "Every report exports to CSV or PDF.",
      "Team-wide numbers: seats, invites, programs, sessions and clients.",
    ],
  },
  {
    slug: "team",
    nav: "Team & org",
    status: "shipped",
    menuBlurb: "Org-ready when you're not the only coach.",
    eyebrow: "For the team",
    title: "Org-ready when you're not the only coach.",
    intro:
      "Bring on additional coaches, share defaults across the team, and keep an audit trail of every admin action — with enterprise sign-on when you need it.",
    points: [
      "Add coaches as owners, admins, coaches or viewers.",
      "One standard and a shared protocol library across the team, with room for each coach to adjust.",
      "Help any coach directly, with every admin action on record.",
      "Enterprise SSO (SAML / OIDC) and SCIM provisioning.",
    ],
  },
  {
    slug: "white-label",
    nav: "White labeling",
    status: "soon",
    menuBlurb: "Your brand on the client-facing experience.",
    eyebrow: "White labeling",
    title: "Run the client experience under your own brand.",
    intro:
      "Put your studio's name, logo, and colours on the athlete-facing experience — branded portal, branded emails, and your own domain, running on Deload's engine underneath.",
    points: [
      "Your logo, colours and name on everything your clients see, emails included.",
      "Your own web address for the athlete portal.",
      "Branded check-in and notification emails.",
      "A fully branded native mobile app is coming soon.",
    ],
  },
];

export function getFeature(slug: string): FeatureEntry | undefined {
  return FEATURES.find((f) => f.slug === slug);
}

// ---------------------------------------------------------------------------
// Business types
// ---------------------------------------------------------------------------

export interface BusinessTypeEntry {
  slug: string;
  nav: string;
  menuBlurb: string;
  eyebrow: string;
  title: string;
  intro: string;
  points: string[];
  // Built, but intentionally held back at launch — surfaced as "Coming soon"
  // everywhere this tier appears (nav, footer, pricing, detail page).
  comingSoon?: boolean;
  cta?: { label: string; href: string };
}

export const BUSINESS_TYPES: BusinessTypeEntry[] = [
  {
    slug: "individual",
    nav: "Individual coach",
    menuBlurb: "Solo coaches running their own roster.",
    eyebrow: "Individual",
    title: "Everything a solo coach needs, without the spreadsheet stack.",
    intro:
      "You write the programs, run the check-ins, and answer the texts. Deload does the heavy lifting so one person can coach more athletes well — and still take Sunday night off.",
    points: [
      "AI-assisted programming so first drafts take minutes, not evenings.",
      "One roster, one inbox, one athlete app — no tool-switching.",
      "Your programs, messages and athletes' logs in one place.",
      "Deload is in private beta — join the waitlist and we'll invite you.",
    ],
    cta: { label: "", href: "" },
  },
  {
    slug: "new-business",
    nav: "Deload Foundations - NewBiz",
    menuBlurb: "Opening or just launched? Start here.",
    eyebrow: "New business",
    title: "Start your coaching business on the right foundation.",
    intro:
      "Whether you're going independent for the first time or opening your first studio, Deload Foundations pairs the platform with guidance on getting the business itself off the ground.",
    points: [
      "Set up programming, billing, and your athlete app on day one.",
      "Migrate an existing client list over from a spreadsheet or another tool.",
      "Guidance on pricing, funding, and operations through Deload Foundations.",
    ],
    comingSoon: true,
    cta: { label: "Explore Deload Foundations", href: "/elevate" },
  },
  {
    slug: "small-enterprise",
    nav: "Small enterprise",
    menuBlurb: "Small teams and single-location studios.",
    eyebrow: "Small enterprise",
    title: "A small team that coaches like a big one.",
    intro:
      "A handful of coaches, one shared standard. Deload keeps everyone's programming consistent, every athlete accounted for, and the admin off your plate.",
    points: [
      "Invite your coaches and share org-level defaults.",
      "One roster and one schedule for the whole team.",
      "Shared protocol library so the bar stays high.",
      "Per-coach voice preserved by the AI, even on shared standards.",
    ],
    comingSoon: true,
  },
  {
    slug: "large-enterprise",
    nav: "Large enterprise & multi-location",
    menuBlurb: "Multi-location studios and large rosters.",
    eyebrow: "Large enterprise",
    title: "Multi-location, multi-coach, one source of truth.",
    intro:
      "When you're running multiple locations and a large roster, consistency and oversight matter as much as speed. Deload gives you org-wide defaults, an audit trail, enterprise SSO, and admin tooling that scales.",
    points: [
      "Org-level defaults with per-location and per-coach overrides.",
      "Enterprise SSO (SAML / OIDC) and SCIM provisioning.",
      "Help any coach directly, with every admin action on record.",
      "See who and what needs attention across every location, in one place.",
    ],
    comingSoon: true,
    cta: { label: "Book a demo", href: "/book-a-demo" },
  },
  {
    slug: "white-label",
    nav: "White labeling",
    menuBlurb: "Your brand on the athlete experience.",
    eyebrow: "White labeling",
    title: "Run Deload under your own brand.",
    intro:
      "For studios and platforms that want the Deload engine behind their own brand — your name, logo, colours, and domain on the athlete portal and client emails today, with a fully branded native app on the way.",
    points: [
      "Your logo and colours on the athlete portal.",
      "Your own web address on everything clients see.",
      "Branded client emails and check-ins.",
      "Branded native mobile app coming soon.",
    ],
    comingSoon: true,
    cta: { label: "Talk to us", href: "/book-a-demo" },
  },
];

export function getBusinessType(slug: string): BusinessTypeEntry | undefined {
  return BUSINESS_TYPES.find((b) => b.slug === slug);
}

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

export interface ResourceEntry {
  slug: string;
  nav: string;
  menuBlurb: string;
  eyebrow: string;
  title: string;
  intro: string;
  body?: string[];
  comingSoon?: boolean;
}

export const RESOURCES: ResourceEntry[] = [
  {
    slug: "starting-your-business",
    nav: "Starting your business",
    menuBlurb: "A playbook for launching your coaching business.",
    eyebrow: "Guide",
    title: "Starting your coaching business.",
    intro:
      "A practical guide to going from coaching on the side to running a business that pays you — pricing, packaging, your first clients, and the systems that keep it from eating your week.",
    body: [
      "Whether you're leaving a gym job or opening your first studio, the early decisions — how you price, how you package, how you get paid — set the ceiling on what comes next.",
      "Deload Foundations (coming soon) is being built to help with exactly this. The platform handles the programming and admin; Foundations will help you stand up the business around it.",
    ],
  },
  {
    slug: "funding",
    nav: "Links to funding",
    menuBlurb: "Financing and funding options for new studios.",
    eyebrow: "Resource",
    title: "Funding your studio or business.",
    intro:
      "Opening a space, buying equipment, or hiring your first coach takes capital. Here's where to look — and how Deload Foundations can point you in the right direction.",
    body: [
      "From small-business loans to equipment financing to studio-specific lenders, there are more options than most first-time owners realise.",
      "Through Deload Foundations (coming soon) we'll connect you with financing partners and walk through what makes sense for your stage.",
    ],
    comingSoon: true,
  },
  {
    slug: "blog",
    nav: "Blog",
    menuBlurb: "Programming, business, and product notes.",
    eyebrow: "Blog",
    title: "The Deload blog.",
    intro:
      "Notes on programming, running a coaching business, and what we're building. New posts as we publish them.",
    comingSoon: true,
  },
  {
    slug: "webinars",
    nav: "Webinars",
    menuBlurb: "Live and recorded sessions with the team.",
    eyebrow: "Webinars",
    title: "Webinars.",
    intro:
      "Live walkthroughs and recorded sessions on getting the most out of Deload and growing your business. Schedule coming soon.",
    comingSoon: true,
  },
  {
    slug: "support",
    nav: "Support + FAQ",
    menuBlurb: "Answers, docs, and how to reach us.",
    eyebrow: "Support",
    title: "Support & FAQ.",
    intro: "Common questions, plus how to reach a human when you need one.",
  },
];

export function getResource(slug: string): ResourceEntry | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

// ---------------------------------------------------------------------------
// Pricing — Individuals vs Teams. Shown only when PUBLIC_SHOW_PRICES=1.
// ---------------------------------------------------------------------------

export interface PricingTier {
  name: string;
  price: string;
  cadence?: string;
  /** A team plan's per-coach line under the price ("+ $79/mo per coach"). */
  perSeat?: string;
  blurb: string;
  cta: { label: string; href: string };
  highlight?: boolean;
  badge?: string;
  features: string[];
}

/**
 * Teams billing (founder, 2026-11-02): a team is Pro or Elite plus a seat for
 * each Coach or Admin besides the owner, billed to the owner and prorated
 * from the day they join. Viewers are free. A Pro seat adds 25 athletes to
 * the roster the team shares; Elite has no cap. Keep in sync with the
 * backend's SEAT_PRICE_USD and SEAT_CLIENT_ALLOWANCE
 * (deload-backend src/lib/teamSeats.ts).
 */
export const TEAM_SEATS = {
  pro: { priceUsd: 79, clientsPerSeat: 25 as number | null },
  elite: { priceUsd: 99, clientsPerSeat: null as number | null },
} as const;

// 2026-10 pricing (founder, 2026-10-22). Individual tiers are the standard
// monthly rates; the Founders rate renders as a banner above the cards
// (FOUNDERS_OFFER below). Keep in sync with the backend's TIER_DETAILS
// (deload-backend src/lib/subscriptions.ts) — the API serves the same numbers
// at GET /pricing. Monthly only: there is no annual plan. Team plans are the
// same Pro and Elite plans plus seats (TEAM_SEATS above); the old Studio
// ($199, 5 coaches) and Performance ($399, 15 coaches) plans are retired.
export const PRICING: {
  individuals: PricingTier[];
  teams: PricingTier[];
} = {
  individuals: [
    {
      name: "Solo",
      price: "$149",
      cadence: "/mo",
      blurb: "One coach, up to 25 athletes — a full personal roster.",
      cta: { label: "Start 7-day free trial", href: "" },
      features: [
        "AI program generation and editing in plain English",
        "Full edit history on every program",
        "Athlete app + in-app messaging & check-ins",
        "Program import from Excel, Word or PDF",
      ],
    },
    {
      name: "Pro",
      price: "$199",
      cadence: "/mo",
      blurb: "One coach, up to 50 athletes — for scaling past 15 or running groups.",
      cta: { label: "Start 14-day free trial", href: "" },
      highlight: true,
      badge: "Most popular",
      features: [
        "Everything in Solo, plus…",
        "Long-program optimizer (8+ weeks)",
        "Roster triage + automations",
        "Accounting dashboard + reports",
        "Priority support",
      ],
    },
    {
      name: "Elite",
      price: "$249",
      cadence: "/mo",
      blurb: "One coach, 100+ athletes — built to scale online programs and growth.",
      cta: { label: "Start 14-day free trial", href: "" },
      features: [
        "Everything in Pro, plus…",
        "No athlete cap",
        "White-label client portal",
        "Advanced AI agent customization",
        "Dedicated onboarding call",
      ],
    },
  ],
  teams: [
    {
      name: "Pro team",
      price: "$199",
      cadence: "/mo",
      perSeat: `+ $${TEAM_SEATS.pro.priceUsd}/mo per coach`,
      blurb: `Your Pro plan covers you and 50 athletes. Each coach you add is $${TEAM_SEATS.pro.priceUsd}/mo and adds ${TEAM_SEATS.pro.clientsPerSeat} athletes to the roster your team shares.`,
      cta: { label: "Start 14-day free trial", href: "" },
      features: [
        "Everything in Pro, for every coach",
        "Owner, Admin, Coach and Viewer roles — Viewers are free",
        "Assign coaches to athletes, or let every coach see the roster",
        "Seats prorated from the day a coach joins",
      ],
    },
    {
      name: "Elite team",
      price: "$249",
      cadence: "/mo",
      perSeat: `+ $${TEAM_SEATS.elite.priceUsd}/mo per coach`,
      blurb: `No athlete cap for the whole team. Each coach you add is $${TEAM_SEATS.elite.priceUsd}/mo.`,
      cta: { label: "Start 14-day free trial", href: "" },
      highlight: true,
      badge: "Growing teams",
      features: [
        "Everything in Elite, for every coach",
        "One uncapped roster the team shares",
        "Org-level defaults and a shared protocol library",
        "An audit trail of every admin action",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      blurb: "Multi-location groups, franchises and large gyms.",
      cta: { label: "Book a demo", href: "/book-a-demo" },
      features: [
        "Everything in Elite team, plus…",
        "Multi-location management",
        "Single sign-on and directory provisioning",
        "Dedicated success manager",
        "Negotiated Stripe processing rate",
      ],
    },
  ],
};

/**
 * The Founders offer (founder, 2026-10-22): what joining the waitlist buys.
 * One source for the hero sub-line, the /beta perks, the /pricing banner and
 * the fine print under each of them.
 */
export const FOUNDERS_OFFER = {
  /** The one-line pitch next to every Join Waitlist button. */
  pitch: "Join the waitlist: early access to Deload, the exclusive Founders Rate, and 25% off a future upgrade.",
  perks: [
    "Early access to the full platform",
    "The Founders Rate — the Solo plan at $99/mo instead of $149, for as long as you keep it",
    "25% off one future upgrade to Pro or Elite, for as long as you stay on it",
  ],
  /** Pricing-page banner. */
  headline: "Founders Rate — the Solo plan at $99/mo, for as long as you keep it",
  body:
    "For coaches who take part in the beta — the private beta from the waitlist, or the public beta once it opens. Beta coaches use Deload free while the beta runs; when we launch, their Solo plan is $99/mo instead of $149, and moving up to Pro or Elite comes with 25% off that plan.",
  cta: { label: "Join the waitlist", href: "" },
  /** The stipulations, kept short and shown wherever the offer is. */
  finePrint:
    "Founders Rate: the Solo plan at $99/mo for coaches who took part in the beta (private or public) before launch, for as long as they keep that plan; one per account, not transferable. Upgrade discount: 25% off Pro or Elite from the day a Founders-rate coach moves up, for as long as they stay on that plan; it covers one upgrade, and a later move to a different plan is at the standard price. Prices are monthly, in USD, billed through Stripe; plans and prices may change before launch, but a Founders Rate already granted stays at $99.",
};

/**
 * Beta banners rendered above the tier cards on /pricing (the individual
 * banner is FOUNDERS_OFFER). Comped beta owners' seats are comped too
 * (deload-backend src/lib/teamSeats.ts), so beta teams pay nothing until launch.
 */
export const BETA_OFFERS: Record<
  "individuals" | "teams",
  { headline: string; body: string; cta: { label: string; href: string } } | null
> = {
  individuals: { headline: FOUNDERS_OFFER.headline, body: FOUNDERS_OFFER.body, cta: FOUNDERS_OFFER.cta },
  teams: {
    headline: "Bring your team into the beta — seats are free while it runs",
    body:
      "Beta coaches can invite their coaches now, and nobody pays for a seat until launch. Running several locations? Book a demo.",
    cta: { label: "Join the waitlist", href: "" },
  },
};

/**
 * Payment-processing disclosure shown under the tier cards. Standard Stripe
 * rates pass through with no Deload markup until the negotiated processing
 * agreement is finalized.
 */
export const PAYMENTS_NOTE =
  "Payments from your own clients are processed by Stripe at the standard 2.9% + $0.30 per transaction — no Deload markup on processing. Marketplace sales carry Deload's 15% fee only when its marketplace brings the buyer; buyers who come straight to you through your own link pay none.";

// ---------------------------------------------------------------------------
// Home-page content blocks
// ---------------------------------------------------------------------------

export const pillars = [
  {
    eyebrow: "Build",
    title: "Programs that sound like you wrote them.",
    body: "AI generation, plain-English edits, mesocycles · deloads · peaks, and a templates library you can pull from. RPE, RIR, and %1RM live inside the same block.",
  },
  {
    eyebrow: "Run",
    title: "A roster you can actually keep up with.",
    body: "See who needs attention, message athletes in-app, and catch high-RPE or off-target weeks before they become a problem.",
  },
  {
    eyebrow: "Ship",
    title: "An athlete app athletes actually open.",
    body: "Today's session on the phone, fast logging with RPE and PRs, messages tied to the training — and you stay the coach of record.",
  },
];

export const absorbed = [
  {
    when: "Sunday night",
    what: "Writing next week's programs for every athlete on the roster.",
  },
  {
    when: "Tuesday, 9pm",
    what: "Rewriting a block because someone tweaked their back at Monday's session.",
  },
  {
    when: "Thursday morning",
    what: "Answering “what's my weight today?” over text before the gym opens.",
  },
  {
    when: "Two weeks out from a meet",
    what: "Pulling intensities back into a peak without losing the work that got them there.",
  },
];

export const proofPoints = [
  "Powerlifting, weightlifting, hypertrophy, sport-specific — plus masters, HRT-aware, and post-surgical programming.",
  "RPE, RIR, and %1RM — mix them inside the same block without breaking the math.",
  "Mesocycles, deloads, and peaks that match the athlete in front of you.",
  "Change one session and the weeks after it keep up.",
  "Rearrange days and change many sessions at once.",
  "Every edit kept and reversible — you stay the coach of record.",
];

// ---------------------------------------------------------------------------
// Waitlist form (/beta) — posts to deload-backend's /api/public/beta-signup,
// which saves the signup, puts it on Clerk's waitlist and emails the
// questionnaire.
// ---------------------------------------------------------------------------

export const BETA_SIGNUP_ENDPOINT = `${API_BASE_URL.replace(/\/+$/, "")}/api/public/beta-signup`;

// The `value`s must match the backend's BETA_ROSTER_BUCKETS /
// BETA_COACHING_TYPES (deload-shared); the server drops anything else.
export const BETA_ROSTER_OPTIONS = [
  { value: "1-5", label: "1–5 athletes" },
  { value: "6-20", label: "6–20 athletes" },
  { value: "21-50", label: "21–50 athletes" },
  { value: "51-150", label: "51–150 athletes" },
  { value: "150+", label: "150+ athletes" },
] as const;

export const BETA_COACHING_TYPE_OPTIONS = [
  { value: "online", label: "Online / remote" },
  { value: "in_person", label: "In person" },
  { value: "hybrid", label: "Hybrid (online + in person)" },
  { value: "gym_studio", label: "Gym / studio" },
  { value: "other", label: "Other" },
] as const;

// Social links, shown after someone joins the waitlist and in the footer.
// Fill in the real ones here; an empty href is left out.
export interface SocialLink {
  label: string;
  href: string;
}
export const SOCIALS: SocialLink[] = [
  { label: "Instagram", href: "" },
  { label: "TikTok", href: "" },
  { label: "YouTube", href: "" },
  { label: "LinkedIn", href: "" },
];
export const ACTIVE_SOCIALS = SOCIALS.filter((s) => s.href.trim() !== "");

// Testimonials are intentionally empty until we have real beta feedback to
// quote. The UI falls back to a "coming soon" state when this is empty.
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}
export const testimonials: Testimonial[] = [];

export const faqs = [
  {
    q: "Does it really sound like me?",
    a: "It learns from how you actually write — your phrasing, your set/rep cadence, the cues you reach for. The first program is a starting point; it adapts as you edit.",
  },
  {
    q: "What about athletes with quirks — meet preps, injuries, in-season volume cuts?",
    a: "All of that is in scope. You tell it the constraint in plain English and it rebuilds the affected weeks; the rest of the block stays.",
  },
  {
    q: "What does the athlete actually see?",
    a: "A clean app on their phone with today's session, the weights to use, fast logging, and messages tied to you — so you're not answering “what's my weight today?” at 7am. It runs in the browser today; native apps are on the way.",
  },
  {
    q: "How do I get access?",
    a: "Deload is in private beta. Join the waitlist and answer a short questionnaire, and we'll invite coaches in small groups. Beta coaches use Deload free while the beta runs, and at launch they get the Founders Rate — the Solo plan at $99/mo instead of $149 — plus 25% off one future upgrade.",
  },
  {
    q: "Can I move my roster over from another tool?",
    a: "Yes. Import the programs you already have from Excel, Word or PDF, and invite your athletes by email. Hands-on migration help from Arketa, Jane, Mindbody and other tools is coming with Deload Foundations.",
  },
];
