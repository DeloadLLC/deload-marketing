export const APP_URL =
  (import.meta.env.PUBLIC_APP_URL as string | undefined) ??
  "https://app.deloadapp.io";

export const API_BASE_URL =
  (import.meta.env.PUBLIC_API_BASE_URL as string | undefined) ??
  "https://app.deloadapp.io";

const trimmedAppUrl = APP_URL.replace(/\/+$/, "");
// "Try for free" starts the 7-day individual trial via the app sign-up flow.
export const SIGN_IN_URL = `${trimmedAppUrl}/sign-in`;
export const SIGN_UP_URL = `${trimmedAppUrl}/sign-up`;
export const TRIAL_URL = SIGN_UP_URL;

export const TURNSTILE_SITE_KEY =
  (import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined) ?? "";

export const SITE_NAME = "Deload";

// Repositioned per request: lead with "all-in-one" instead of "for serious coaches".
export const SITE_TAGLINE = "The all-in-one AI coaching platform";

export const SITE_DESCRIPTION =
  "The all-in-one AI coaching platform for coaches who write their own training. Generate block-aware programs, edit in plain English, run your roster, bill your clients, and ship the program straight to your athletes' phones — all in one place.";

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
  { heading: "Programming", slugs: ["ai-programming", "program-editing", "populations"] },
  { heading: "Roster", slugs: ["roster", "messaging", "check-ins"] },
  { heading: "Athlete experience", slugs: ["athlete-app", "scheduling"] },
  { heading: "Business", slugs: ["billing", "analytics", "team", "white-label"] },
];

export const FEATURES: FeatureEntry[] = [
  {
    slug: "ai-programming",
    nav: "AI-assisted programming",
    status: "shipped",
    flagship: true,
    menuBlurb: "Generate block-aware programs from a plain-English brief.",
    eyebrow: "AI Programming",
    title: "The first true AI exercise-programming agent.",
    intro:
      "Most “AI” fitness tools autocomplete a workout. Deload writes a real, block-aware program for the athlete in front of you — periodization, intensity schemes, and the constraints you set. Not a template. Not a guess.",
    points: [
      "Generate a full first-draft block from a free-text brief — sport, level, equipment, training age, and constraints.",
      "Built on real programming principles, so it isn't inventing set/rep schemes.",
      "Watch it work: a live plan preview and per-block progress as it writes.",
      "Block-aware periodization — mesocycles, deloads, peaks, and taper logic that match the meet or goal date.",
      "Mixed intensity prescription — RPE, RIR, and %1RM live inside the same block without breaking the math.",
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
      "Tell Deload the constraint — a tweaked back, a missed week, a meet that just moved — and the affected weeks rewrite themselves. You see the before/after diff on every change, and the rest of the block stays exactly where you left it.",
    points: [
      "Chat-based refinement: “drop the deload,” “add RPE targets,” “make Wednesday upper-body focused.”",
      "Before/after diffs and structural change summaries on every AI edit.",
      "Inline grid for sets, reps, RPE, rest, tempo, and cues.",
      "Same-family swaps and exercise substitutions that keep the intent intact.",
      "Drag-and-drop to reorder days or move exercises between sessions.",
      "Full edit history with one-click undo — you stay the coach of record.",
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
    menuBlurb: "Triage who needs attention this week — don't refresh it.",
    eyebrow: "Roster",
    title: "Triage the roster, don't refresh it.",
    intro:
      "A dashboard that surfaces who needs attention this week — new clients, drifting clients, recent PRs, high-RPE weeks, and the auto-adjustments that fired. Then deal with each athlete one click deep.",
    points: [
      "Roster dashboard with “Needs attention” triage and headshots.",
      "Per-athlete history: PRs, RPE trends, check-ins, and edit log.",
      "Automatic high-RPE advisories and target-divergence alerts.",
      "Auto-adjustments that suggest swaps when an athlete logs pain or a brutal RPE — you accept or reject.",
      "Per-athlete distance and load units — lbs / mi or kg / m — set once.",
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
      "Athletes message in-app, on web and mobile. You see the exact session that triggered the question. An AI assistant handles the easy ones so you can spend your replies on the real conversations.",
    points: [
      "In-app inbox tied to the specific session or week in question.",
      "Welcome-note automation when an athlete first joins.",
      "Athlete-side AI assistant for “what's my weight today?”-class questions.",
      "Push notifications when you reply, so nothing gets lost.",
    ],
  },
  {
    slug: "check-ins",
    nav: "Structured check-ins",
    status: "shipped",
    menuBlurb: "Structured check-ins that land back in your inbox.",
    eyebrow: "Check-ins",
    title: "The weekly check-in, structured and in one place.",
    intro:
      "Schedule check-in forms that reach athletes by in-app prompt or email, and catch readiness, pain, and off-target weeks before they become a problem.",
    points: [
      "Schedule recurring check-ins delivered in-app or by email.",
      "Ask about readiness, pain, and adherence with custom forms.",
      "Responses surface on the dashboard and can trigger org alerts.",
      "Custom intake forms for onboarding new athletes.",
    ],
  },
  {
    slug: "athlete-app",
    nav: "Athlete mobile app",
    status: "shipped",
    menuBlurb: "An app athletes actually open — iOS and Android.",
    eyebrow: "Athlete experience",
    title: "An app athletes actually open.",
    intro:
      "Clean, quiet, built around the next set — not gamified streaks. Athletes see today's session, log it in seconds, and message you when something's off. You stay the coach of record.",
    points: [
      "iOS and Android via the Deload mobile app.",
      "Fast in-gym logging: sets, reps, weight, RPE — with automatic PR detection.",
      "Modality-aware fields for runs, rows, intervals, and more — not just barbell work.",
      "Today's session up top, with warm-up, main work, accessories, and cool-down clearly laid out.",
      "Auto-regulated targets based on the previous session's feel and performance, with a badge explaining why.",
    ],
  },
  {
    slug: "scheduling",
    nav: "Scheduling & booking",
    status: "shipped",
    menuBlurb: "1-on-1 booking, availability, and an AI booking assistant.",
    eyebrow: "Scheduling",
    title: "Booking and scheduling, handled in the same app.",
    intro:
      "Set your availability, offer paid 1-on-1 sessions, and let athletes book the right slot — with an AI booking assistant that suggests times based on your availability and their history.",
    points: [
      "Offer paid 1-on-1 services with price, duration, and availability.",
      "Athletes book into open slots and pay through Stripe.",
      "AI booking assistant suggests slots from your availability and their history.",
      "Multi-coach org schedule view with resource and capacity limits.",
      "Smart auto-scheduling that places a whole week around recovery is coming soon.",
    ],
  },
  {
    slug: "billing",
    nav: "Billing & payments",
    status: "shipped",
    menuBlurb: "Get paid without leaving the app.",
    eyebrow: "Billing",
    title: "Get paid without leaving the app.",
    intro:
      "Built-in Stripe billing for subscriptions, packages, and one-off sessions — so the money side stops being a second tool.",
    points: [
      "Stripe-backed subscriptions and athlete packages.",
      "Charge for 1-on-1 sessions and services at the point of booking.",
      "Self-serve invoicing for one-off charges.",
      "Revenue and billing reports with CSV / PDF export.",
    ],
  },
  {
    slug: "analytics",
    nav: "Analytics & reporting",
    status: "shipped",
    menuBlurb: "Dashboards and reports that surface what matters.",
    eyebrow: "Analytics",
    title: "The numbers that actually tell you something.",
    intro:
      "A configurable dashboard and a reports suite that turn logged sessions and bookings into decisions — without exporting to a spreadsheet.",
    points: [
      "Dashboard with triage ribbons: new clients, drifting clients, recent PRs, this week's auto-adjustments.",
      "Schedule, revenue, billing, and resource-utilization reports.",
      "CSV and PDF export on every report.",
      "Org-level analytics: seats, invites, programs, sessions, and clients.",
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
      "Invite coaches with owner / admin / coach / viewer roles.",
      "Org-level defaults and a shared protocol library, with per-coach overrides.",
      "Admin impersonation for support, every action audit-logged.",
      "Enterprise SSO (SAML / OIDC) and SCIM provisioning.",
    ],
  },
  {
    slug: "white-label",
    nav: "White labeling",
    status: "shipped",
    menuBlurb: "Your brand on the client-facing experience.",
    eyebrow: "White labeling",
    title: "Run the client experience under your own brand.",
    intro:
      "Put your studio's name, logo, and colours on the athlete-facing experience — branded portal, branded emails, and your own domain, running on Deload's engine underneath.",
    points: [
      "Custom logo, colours, and email sender name across client-facing surfaces.",
      "Map your own domain to the athlete portal with DNS validation.",
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
      "Built-in billing and booking so you get paid without a separate tool.",
      "Start on the 7-day founders trial; scale to Pro or Elite when you're ready.",
    ],
    cta: { label: "Start your 7-day trial", href: "" },
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
      "One roster and schedule view across the whole team.",
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
      "Admin impersonation for support, every action audit-logged.",
      "Roster and schedule triage across every location from one dashboard.",
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
      "Branded athlete portal with custom logo and colours.",
      "Your own domain on the client-facing surfaces.",
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
      "Deload Foundations exists to help with exactly this. The platform handles the programming and admin; Foundations helps you stand up the business around it.",
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
      "Through Deload Foundations we can connect you with financing partners and walk through what makes sense for your stage.",
    ],
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
// Pricing — Studio vs Individuals, led by the 7-day individual trial.
// Prices are placeholders pending finalisation; clearly marked as such so
// nothing wrong is published. Update `price`/`cadence` when numbers are final.
// ---------------------------------------------------------------------------

export interface PricingTier {
  name: string;
  price: string;
  cadence?: string;
  blurb: string;
  cta: { label: string; href: string };
  highlight?: boolean;
  badge?: string;
  features: string[];
}

// 2026-09 pricing. Individual tiers are the post-beta standard rates; the
// Founders beta rate renders as a banner above the cards (BETA_OFFERS below).
// Keep in sync with the backend's TIER_DETAILS (deload-backend
// src/lib/subscriptions.ts) — the API serves the same numbers at GET /pricing.
export const PRICING: {
  individuals: PricingTier[];
  studio: PricingTier[];
} = {
  individuals: [
    {
      name: "Solo",
      price: "$89",
      cadence: "/mo",
      blurb: "One coach, up to 15 athletes — a full personal roster.",
      cta: { label: "Start 7-day free trial", href: "" },
      features: [
        "$75/mo billed annually — save $168/yr",
        "AI super agent — exercise programming",
        "Plain-English editing with full history",
        "Athlete app + in-app messaging & check-ins",
        "Booking, invoicing, and built-in Stripe billing",
      ],
    },
    {
      name: "Pro",
      price: "$149",
      cadence: "/mo",
      blurb: "One coach, up to 50 athletes — for scaling past 15 or running groups.",
      cta: { label: "Start 14-day free trial", href: "" },
      highlight: true,
      badge: "Most popular",
      features: [
        "$124/mo billed annually — save $300/yr",
        "Everything in Solo, plus…",
        "Long-program optimizer (8+ weeks)",
        "Roster triage + automations",
        "Accounting dashboard + reports",
        "Priority support",
      ],
    },
    {
      name: "Elite",
      price: "$229",
      cadence: "/mo",
      blurb: "One coach, unlimited athletes — high-volume and influencer rosters.",
      cta: { label: "Start 14-day free trial", href: "" },
      features: [
        "$190/mo billed annually — save $468/yr",
        "Everything in Pro, plus…",
        "Unlimited active athletes",
        "White-label client portal",
        "Advanced AI agent customization",
        "Dedicated onboarding call",
      ],
    },
  ],
  studio: [
    {
      name: "Studio",
      price: "$199",
      cadence: "/mo",
      blurb: "Up to 5 coaches and 75 athletes — single-location studios and small group practices.",
      cta: { label: "Book a demo", href: "/book-a-demo" },
      features: [
        "$165/mo billed annually — save $408/yr",
        "5 coach seats included",
        "AI programming per coach",
        "Shared athlete roster + profiles",
        "Studio analytics dashboard",
      ],
    },
    {
      name: "Performance",
      price: "$399",
      cadence: "/mo",
      blurb: "Up to 15 coaches and 200 athletes — growing studios and remote teams.",
      cta: { label: "Book a demo", href: "/book-a-demo" },
      highlight: true,
      badge: "Best value",
      features: [
        "$332/mo billed annually — save $804/yr",
        "Everything in Studio, plus…",
        "15 coach seats included",
        "Admin + coach role hierarchy",
        "Full accounting + revenue reports",
        "White-label client portal",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      blurb: "16+ coaches, 200+ athletes, multi-location — franchises and large gym groups.",
      cta: { label: "Book a demo", href: "/book-a-demo" },
      features: [
        "Everything in Performance, plus…",
        "Unlimited coach seats + multi-location management",
        "Custom branded app + SSO with audit log",
        "Dedicated success manager",
        "Negotiated Stripe processing rate",
      ],
    },
  ],
};

/**
 * Founders / beta rate banners rendered above the tier cards on /pricing.
 * Everyone who joins during beta pays one flat rate for year one and keeps a
 * permanent 25% discount off any standard tier after that.
 */
export const BETA_OFFERS: Record<
  "individuals" | "studio",
  { headline: string; body: string; cta: { label: string; href: string } } | null
> = {
  individuals: {
    headline: "Founders / beta rate — $59/mo flat, locked for your first year",
    body:
      "Every feature as it launches, up to 15 athletes. Year two you keep 25% off any plan — permanently — in exchange for being an early tester. Scale past 15 athletes anytime on Pro or Elite at your founders discount.",
    cta: { label: "Claim the founders rate", href: "" },
  },
  studio: {
    headline: "Enterprise beta — $59 per coach/mo, flat, for year one",
    body:
      "A 5-coach studio runs $295/mo during beta (vs. $1,000–1,700 all-in elsewhere), with a permanent 25% discount off standard enterprise pricing after year one.",
    cta: { label: "Book a demo", href: "/book-a-demo" },
  },
};

/**
 * Payment-processing disclosure shown under the tier cards. Standard Stripe
 * rates pass through with no Deload markup until the negotiated processing
 * agreement is finalized.
 */
export const PAYMENTS_NOTE =
  "Payments are processed by Stripe at the standard 2.9% + $0.30 per transaction — no Deload markup on processing.";

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
    body: "Triage who needs attention, send structured check-ins, message athletes in-app, and catch high-RPE or off-target weeks before they become a problem.",
  },
  {
    eyebrow: "Ship",
    title: "An athlete app athletes actually open.",
    body: "Today's session on the phone, fast logging with RPE and PRs, an in-app chat assistant for quick questions — and you stay the coach of record.",
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
  "Edit any session inline; downstream weeks adjust to match.",
  "Drag-and-drop days and exercises; bulk-edit across sessions.",
  "Full edit history with one-click undo — you stay the coach of record.",
];

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
    a: "A clean mobile app with today's session, fast logging, and a chat tab tied to you. There's also an in-app AI assistant for quick questions so you're not answering “what's my weight today?” at 7am.",
  },
  {
    q: "How does the free trial work?",
    a: "Start a 7-day founders trial with no commitment. During the trial you can add one client and run one program generation, so you can see the voice for yourself. When you subscribe, your normal client and generation limits unlock.",
  },
  {
    q: "Can I move my roster over from another tool?",
    a: "Yes. You can start with a single athlete to evaluate the voice, or migrate an existing client list — and Deload Foundations can help if you're coming from Arketa, Jane, Mindbody, or a spreadsheet.",
  },
];
