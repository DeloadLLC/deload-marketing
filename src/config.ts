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
// back on the app's sign-up when the beta ends, and every page's copy follows
// it: in open mode no page mentions the waitlist, /beta and /landing-page
// forward to sign-up, and prices show (founder, 2026-11-12).
export const SIGNUP_MODE: "waitlist" | "open" =
  (import.meta.env.PUBLIC_SIGNUP_MODE as string | undefined)?.trim() === "open" ? "open" : "waitlist";
export const IS_OPEN = SIGNUP_MODE === "open";
/** The free trial, the same length everywhere (founder, 2026-11-12). */
export const TRIAL_DAYS = 14;
export const TRIAL_LABEL = `Start ${TRIAL_DAYS}-day free trial`;
const siteBase = (import.meta.env.BASE_URL as string | undefined) ?? "/";
export const PRIMARY_CTA = IS_OPEN
  ? { label: "Start free trial", href: SIGN_UP_URL }
  : { label: "Join Waitlist", href: `${siteBase.replace(/\/$/, "")}/beta` };

/** Sentences that differ between the waitlist and open sign-up. */
export const SIGNUP_COPY = IS_OPEN
  ? {
      demoAlternative: { lead: "Rather try it yourself?", link: `Start a ${TRIAL_DAYS}-day free trial.` },
      closeTail: `or start a ${TRIAL_DAYS}-day free trial.`,
      individualAccess: `Start with a ${TRIAL_DAYS}-day free trial.`,
    }
  : {
      demoAlternative: { lead: "Rather wait for an invite?", link: "Join the waitlist." },
      closeTail: "or join the waitlist for the Founders Rate.",
      individualAccess: "In private beta: join the waitlist and we'll invite you.",
    };

/**
 * The offer, said once under the hero's button and once in the close
 * (founder, 2026-11-14): a 14-day trial for coaches, athletes free. In
 * waitlist mode the line is the waitlist pitch instead.
 */
export const OFFER_LINE = IS_OPEN
  ? `${TRIAL_DAYS}-day free trial. Your athletes use Deload free.`
  : "Join the waitlist for early access and the Founders Rate. Your athletes use Deload free.";

// The app hosts the one copy of the legal pages (they changed with the beta
// decisions; two copies drifted). The site's /privacy and /terms forward there.
export const PRIVACY_URL = `${trimmedAppUrl}/privacy`;
export const TERMS_URL = `${trimmedAppUrl}/terms`;

// Prices stay hidden during the private beta (founder, 2026-10-19). The tier
// data below is kept for when they're published: PUBLIC_SHOW_PRICES=1. Open
// sign-up always shows them: a free trial needs a price to go with it.
export const SHOW_PRICES =
  IS_OPEN || (import.meta.env.PUBLIC_SHOW_PRICES as string | undefined)?.trim() === "1";

export const TURNSTILE_SITE_KEY =
  (import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined) ?? "";

export const SITE_NAME = "Deload";

// Repositioned per request: lead with "all-in-one" instead of "for serious coaches".
export const SITE_TAGLINE = "The all-in-one AI coaching platform";

export const SITE_DESCRIPTION =
  "The all-in-one AI coaching platform for coaches who write their own training. Generate block-aware programs, edit in plain English, bring in the programs you already have, run your roster, and ship the program straight to your athletes' phones, all in one place.";

// ---------------------------------------------------------------------------
// Information architecture / navigation
// ---------------------------------------------------------------------------
//
// The header renders the Features dropdown plus flat links (Why we're
// different, Pricing, Support). All menu data lives here so a single edit
// updates the header, the footer, and the dynamically generated detail pages.
// Pages that aren't live yet ("Coming soon") keep their code but stay out of
// the menu, the footer and the sitemap, and carry noindex (founder,
// 2026-11-12): see isLive* and HIDDEN_PATHS below.

export type FeatureStatus = "shipped" | "soon";

export interface FeatureEntry {
  slug: string;
  nav: string; // label in the dropdown
  status: FeatureStatus;
  menuBlurb: string; // one line under the nav label
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
    title: "A full training block for each athlete, drafted for you to edit.",
    intro:
      "Deload drafts a block-aware program for the athlete in front of you. You change what you want and assign it.",
    points: [
      "A first-draft block for each athlete's sport, level, equipment, training age and constraints.",
      "Mesocycles, deloads, peaks and tapers that land on the meet or goal date.",
      "Prescribe by RPE, RIR or %1RM in the same block, and the numbers still add up.",
      "Powerlifting, weightlifting, hypertrophy, sport-specific and masters programming.",
    ],
  },
  {
    slug: "program-editing",
    nav: "Plain-English editing",
    status: "shipped",
    menuBlurb: "Edit any block in plain English; downstream weeks adjust.",
    title: "Plain-English edits that ripple through the block.",
    intro:
      "Tell Deload what changed (a tweaked back, a missed week, a meet that moved) and only the affected weeks rewrite.",
    points: [
      "Ask the way you'd say it: “drop the deload,” “add RPE targets,” “make Wednesday upper-body focused.”",
      "Every AI change spelled out.",
      "Edit sets, reps, RPE, rest, tempo and cues by hand.",
      "Exercise swaps that keep the intent.",
      "Move days and exercises around as the week changes.",
      "Every edit kept and reversible.",
    ],
  },
  {
    slug: "program-import",
    nav: "Program import",
    status: "shipped",
    menuBlurb: "Bring in the programs you already wrote.",
    title: "Bring the programs you already have.",
    intro:
      "Your best programs already live in a spreadsheet, Word doc or PDF. Bring them in, in your wording, and build on them instead of retyping.",
    points: [
      "Import from Excel, Word, PDF or pasted text.",
      "Weeks, days, sets, reps, loads, RPE, rest, cues and notes come in as you wrote them.",
      "Supersets and complexes too, for you to check.",
      "Edit and assign them just like AI-written programs.",
    ],
  },
  {
    slug: "populations",
    nav: "Population-specific protocols",
    status: "shipped",
    menuBlurb: "Masters athletes and sport-specific prep.",
    title: "Programming that respects who's actually in front of you.",
    intro:
      "Specialist protocols built in, so the program fits the athlete.",
    points: [
      "Powerlifting, weightlifting, hypertrophy, and sport-specific prep.",
      "Masters athletes, bone-density-aware programming, and fall-prevention GPP.",
      "Each athlete's level, training age, equipment and injuries shape the draft.",
    ],
  },
  {
    slug: "roster",
    nav: "Roster management",
    status: "shipped",
    menuBlurb: "See who needs you this week.",
    title: "Triage the roster, don't refresh it.",
    intro:
      "Know who needs you this week: new and drifting clients, recent PRs, high-RPE weeks.",
    points: [
      "Your whole roster, with who needs you first.",
      "Each athlete's PRs, RPE trends, check-ins and program changes in one place.",
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
    title: "Messaging that doesn't live in your texts.",
    intro:
      "Athletes message you about the session in question, so you answer with the context in front of you.",
    points: [
      "Every conversation tied to the session or week it's about.",
      "New athletes get your welcome note automatically.",
      "Coming soon: an assistant that answers your athletes' “what's my weight today?” questions.",
    ],
  },
  {
    slug: "check-ins",
    nav: "Structured check-ins",
    status: "soon",
    menuBlurb: "Check-ins that land back in your inbox.",
    title: "The weekly check-in, structured and in one place.",
    intro:
      "Weekly check-ins go out on schedule, so you catch readiness, pain and off-target weeks early.",
    points: [
      "Recurring, in the app or by email.",
      "Ask about readiness, pain and adherence in your own words.",
      "Answers land where you'll see them and can alert your team.",
      "Your own intake questions for new athletes.",
    ],
  },
  {
    slug: "athlete-app",
    nav: "Athlete app",
    status: "shipped",
    menuBlurb: "Today's session and fast logging, on any phone.",
    title: "An athlete app built around the next set.",
    intro:
      "Built around the next set, not streaks. Athletes see today's session, log it in seconds and message you when something's off.",
    points: [
      "Works on any phone in the browser; native iOS and Android apps are coming.",
      "Sets, reps, weight and RPE, with PRs caught automatically.",
      "Runs, rows, intervals and more log as naturally as barbell work.",
      "Today's session laid out from warm-up to cool-down.",
    ],
  },
  {
    slug: "scheduling",
    nav: "Scheduling & booking",
    status: "soon",
    menuBlurb: "Paid 1-on-1 sessions, booked without the back-and-forth.",
    title: "Booking and scheduling, handled in the same app.",
    intro:
      "Paid 1-on-1 sessions, booked without the back-and-forth over text.",
    points: [
      "Sell 1-on-1 sessions at your price, length and hours.",
      "Athletes book and pay through Stripe.",
      "An AI booking assistant suggests times from your hours and their history.",
      "One team schedule, with resource and capacity limits.",
      "Coming soon: a whole week scheduled around recovery for you.",
    ],
  },
  {
    slug: "marketplace",
    nav: "Program marketplace",
    status: "shipped",
    menuBlurb: "Sell your programs, paid to your own Stripe account.",
    title: "Sell the programs you're proud of.",
    intro:
      "Sell your programs on the Deload marketplace, paid to your own Stripe account.",
    points: [
      "Sell any program at the price you choose.",
      "Buyers pay by card, get the program in their Deload app and join your roster, ready to message or bring on as clients.",
      "Deload takes 15% of each sale.",
      "Coming soon: no Deload fee on buyers who come to you through your own link.",
    ],
  },
  {
    slug: "billing",
    nav: "Billing & payments",
    status: "soon",
    menuBlurb: "Get paid without leaving the app.",
    title: "Get paid without leaving the app.",
    intro:
      "Bill monthly plans, packages and one-off sessions through Stripe, without a second tool.",
    points: [
      "Monthly plans and session packages.",
      "Payment for 1-on-1 sessions and services at booking.",
      "Invoice one-off charges yourself.",
      "Revenue and billing reports, exported to CSV or PDF.",
    ],
  },
  {
    slug: "analytics",
    nav: "Analytics & reporting",
    status: "soon",
    menuBlurb: "Know how the roster and the business are doing.",
    title: "The numbers that actually tell you something.",
    intro:
      "Turn logged sessions and bookings into decisions, without exporting to a spreadsheet.",
    points: [
      "This week at a glance: new and drifting clients, recent PRs and auto-adjustments.",
      "Schedule, revenue, billing and space-use reports.",
      "Every report exports to CSV or PDF.",
      "Team-wide numbers: seats, invites, programs, sessions and clients.",
    ],
  },
  {
    slug: "team",
    nav: "Team & org",
    status: "shipped",
    menuBlurb: "Org-ready when you're not the only coach.",
    title: "Org-ready when you're not the only coach.",
    intro:
      "Add coaches and run the whole team to one standard.",
    points: [
      "Add coaches as owners, admins, coaches or viewers.",
      "A shared protocol library, with room for each coach to adjust.",
      "Help any coach directly, with every admin action on record.",
      "Enterprise SSO (SAML / OIDC) and SCIM provisioning.",
    ],
  },
  {
    slug: "white-label",
    nav: "White labeling",
    status: "soon",
    menuBlurb: "Your brand on the client-facing experience.",
    title: "Run the client experience under your own brand.",
    intro:
      "Your studio's brand on everything your athletes see, with Deload underneath.",
    points: [
      "Your logo, colours and name on everything clients see.",
      "Your own web address for the athlete portal.",
      "Branded check-in and notification emails.",
      "A branded native app, coming soon.",
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
    title: "Everything a solo coach needs, without the spreadsheet stack.",
    intro:
      "Deload does the heavy lifting, so one coach can coach more athletes well and still take Sunday night off.",
    points: [
      "First drafts in minutes, not evenings.",
      "One roster, one inbox, one athlete app, no tool-switching.",
      SIGNUP_COPY.individualAccess,
    ],
    cta: { label: "", href: "" },
  },
  {
    slug: "new-business",
    nav: "New coaching business",
    menuBlurb: "Opening or just launched? Start here.",
    title: "Start your coaching business on the right foundation.",
    intro:
      "Going independent or opening your first studio? Deload Foundations pairs the platform with help getting the business off the ground.",
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
    title: "A small team that coaches like a big one.",
    intro:
      "A handful of coaches, one standard. Programming stays consistent, every athlete is covered, and the admin is off your plate.",
    points: [
      "Invite your coaches and share defaults.",
      "One roster and one schedule for the whole team.",
      "Shared protocol library so the bar stays high.",
      "The AI keeps each coach's voice, even on shared standards.",
    ],
    comingSoon: true,
  },
  {
    slug: "large-enterprise",
    nav: "Large enterprise & multi-location",
    menuBlurb: "Multi-location studios and large rosters.",
    title: "Multi-location, multi-coach, one source of truth.",
    intro:
      "Across several locations and a large roster, consistency and oversight matter as much as speed.",
    points: [
      "Org defaults, adjustable per location and per coach.",
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
    title: "Run Deload under your own brand.",
    intro:
      "The Deload engine under your name, logo, colours and domain, with a fully branded native app on the way.",
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
    title: "Starting your coaching business.",
    intro:
      "Pricing, packaging, your first clients and the systems that keep the business from eating your week.",
    body: [
      "Your early decisions on pricing, packaging and getting paid set the ceiling on what comes next.",
      "Deload Foundations (coming soon) will help you build the business around the platform.",
    ],
    // Two sentences and a pointer to Foundations, which isn't open yet.
    comingSoon: true,
  },
  {
    slug: "funding",
    nav: "Links to funding",
    menuBlurb: "Financing and funding options for new studios.",
    title: "Funding your studio or business.",
    intro:
      "A space, equipment and your first hire take capital. Here's where to look.",
    body: [
      "Small-business loans, equipment financing, studio lenders: there are more options than most first-time owners realise.",
      "Deload Foundations (coming soon) will connect you with financing partners that fit your stage.",
    ],
    comingSoon: true,
  },
  {
    slug: "blog",
    nav: "Blog",
    menuBlurb: "Programming, business, and product notes.",
    title: "The Deload blog.",
    intro:
      "Notes on programming, running a coaching business and what we're building.",
    comingSoon: true,
  },
  {
    slug: "webinars",
    nav: "Webinars",
    menuBlurb: "Live and recorded sessions with the team.",
    title: "Webinars.",
    intro:
      "Live and recorded walkthroughs of Deload and growing your business. Schedule coming soon.",
    comingSoon: true,
  },
  {
    slug: "support",
    nav: "Support + FAQ",
    menuBlurb: "Answers, docs, and how to reach us.",
    title: "Support & FAQ.",
    intro: "Common questions, plus how to reach a human when you need one.",
  },
];

export function getResource(slug: string): ResourceEntry | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

// What the menu, the footer and the sitemap show: live pages only.
export const isLiveFeature = (f: FeatureEntry) => f.status !== "soon";
export const isLiveBusinessType = (b: BusinessTypeEntry) => !b.comingSoon;
export const isLiveResource = (r: ResourceEntry) => !r.comingSoon;
export const LIVE_FEATURES = FEATURES.filter(isLiveFeature);
export const LIVE_BUSINESS_TYPES = BUSINESS_TYPES.filter(isLiveBusinessType);
export const LIVE_RESOURCES = RESOURCES.filter(isLiveResource);

/**
 * Pages that are built but hidden: noindex, and left out of the sitemap
 * (astro.config.mjs reads this list). The business-type and resource index
 * pages are hubs for pages that are mostly not live, so they go too.
 */
export const HIDDEN_PATHS: string[] = [
  // With open sign-up the waitlist page only forwards to sign-up.
  ...(IS_OPEN ? ["/beta"] : []),
  "/elevate",
  "/business-types",
  "/resources",
  ...FEATURES.filter((f) => !isLiveFeature(f)).map((f) => `/features/${f.slug}`),
  ...BUSINESS_TYPES.filter((b) => !isLiveBusinessType(b)).map((b) => `/business-types/${b.slug}`),
  ...RESOURCES.filter((r) => !isLiveResource(r)).map((r) => `/resources/${r.slug}`),
];
export const isHiddenPath = (pathname: string) =>
  HIDDEN_PATHS.includes(pathname.replace(/\/+$/, "") || "/");

// ---------------------------------------------------------------------------
// Pricing: Individuals vs Teams. Shown with PUBLIC_SHOW_PRICES=1 or open sign-up.
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
  /** A feature that isn't live yet carries soon: true and shows a Soon tag. */
  features: (string | { label: string; soon: true })[];
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
      blurb: "One coach, up to 25 athletes: a full personal roster.",
      cta: { label: TRIAL_LABEL, href: "" },
      features: [
        "AI program generation and editing in plain English",
        "Full edit history on every program",
        "Athlete app and messaging",
        "Program import from Excel, Word or PDF",
      ],
    },
    {
      name: "Pro",
      price: "$199",
      cadence: "/mo",
      blurb: "One coach, up to 50 athletes: for growing past 25 or running groups.",
      cta: { label: TRIAL_LABEL, href: "" },
      highlight: true,
      features: [
        "Everything in Solo, plus…",
        // TODO(founder): confirm what "Optimized" means for 8+ week programs today.
        "Optimized long programs (8+ weeks)",
        "Roster triage + automations",
        { label: "Accounting and reports", soon: true },
        "Priority support",
      ],
    },
    {
      name: "Elite",
      price: "$249",
      cadence: "/mo",
      blurb: "One coach, 100+ athletes: built to scale online programs and growth.",
      cta: { label: TRIAL_LABEL, href: "" },
      features: [
        "Everything in Pro, plus…",
        "No athlete cap",
        { label: "White-label client portal", soon: true },
        // TODO(founder): confirm this is live for Elite, or mark it soon.
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
      cta: { label: TRIAL_LABEL, href: "" },
      features: [
        "Everything in Pro, for every coach",
        "Owner, Admin, Coach and Viewer roles; Viewers are free",
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
      cta: { label: TRIAL_LABEL, href: "" },
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
        // TODO(founder): the multi-location business-type page is still "Coming
        // soon"; confirm multi-location management is live before claiming it.
        "Multi-location management",
        "Single sign-on and directory provisioning",
        "Dedicated success manager",
        // TODO(founder): confirm a negotiated Stripe rate is something Deload offers.
        "Negotiated Stripe processing rate",
      ],
    },
  ],
};

/**
 * The Founders offer (founder, 2026-10-22): what joining the waitlist buys.
 * One source for the hero sub-line, the /beta perks, the /pricing banner and
 * the fine print under each of them. With open sign-up it stays on pricing as
 * a limited offer (founder, 2026-11-12).
 */
const UPGRADE_TERMS =
  "Upgrade discount: 25% off Pro or Elite from the day a Founders-rate coach moves up, for as long as they stay on that plan; it covers one upgrade, and a later move to a different plan is at the standard price.";
export const FOUNDERS_OFFER = IS_OPEN
  ? {
      /** The one-line note under the home hero's buttons. */
      pitch: `${TRIAL_DAYS}-day free trial. Founders Rate while it lasts: Solo at $99/mo instead of $149.`,
      perks: [
        `A ${TRIAL_DAYS}-day free trial of the full platform`,
        "The Founders Rate: the Solo plan at $99/mo instead of $149, for as long as you keep it",
        "25% off one future upgrade to Pro or Elite, for as long as you stay on it",
      ],
      /** Pricing-page banner. */
      headline: "Founders Rate: the Solo plan at $99/mo, for as long as you keep it",
      body:
        `A limited offer for coaches who join now. Start with a ${TRIAL_DAYS}-day free trial; after it, Solo is $99/mo instead of $149 for as long as you keep it, and moving up to Pro or Elite later comes with 25% off that plan.`,
      cta: { label: "Start free trial", href: "" },
      /** The stipulations, kept short and shown wherever the offer is. */
      finePrint:
        `Founders Rate: the Solo plan at $99/mo for coaches who sign up while the offer runs, for as long as they keep that plan; one per account, not transferable. It is a limited offer and can end for new sign-ups at any time; a Founders Rate already granted stays at $99. ${UPGRADE_TERMS} Prices are monthly, in USD, billed through Stripe.`,
    }
  : {
      /** The one-line pitch next to every Join Waitlist button. */
      pitch: "Join the waitlist for early access, the Founders Rate and 25% off a future upgrade.",
      perks: [
        "Early access to the full platform",
        "The Founders Rate: the Solo plan at $99/mo instead of $149, for as long as you keep it",
        "25% off one future upgrade to Pro or Elite, for as long as you stay on it",
      ],
      /** Pricing-page banner. */
      headline: "Founders Rate: the Solo plan at $99/mo, for as long as you keep it",
      body:
        "For coaches who take part in the beta: the private beta from the waitlist, or the public beta once it opens. Beta coaches use Deload free while the beta runs; when we launch, their Solo plan is $99/mo instead of $149, and moving up to Pro or Elite comes with 25% off that plan.",
      cta: { label: "Join the waitlist", href: "" },
      /** The stipulations, kept short and shown wherever the offer is. */
      finePrint:
        `Founders Rate: the Solo plan at $99/mo for coaches who took part in the beta (private or public) before launch, for as long as they keep that plan; one per account, not transferable. ${UPGRADE_TERMS} Prices are monthly, in USD, billed through Stripe; plans and prices may change before launch, but a Founders Rate already granted stays at $99.`,
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
  // The team banner is a beta offer; with open sign-up the Enterprise tier's
  // Book a demo covers multi-location teams.
  teams: IS_OPEN
    ? null
    : {
        headline: "Bring your team into the beta: seats are free while it runs",
        body:
          "Beta coaches can invite their coaches now, and nobody pays for a seat until launch. Running several locations? Book a demo.",
        cta: { label: "Join the waitlist", href: "" },
      },
};

/**
 * Payments note under the tier cards. Client billing is switched off for every
 * account and buyer attribution isn't live, so both are "coming soon"
 * (founder, 2026-11-12).
 */
export const PAYMENTS_NOTE =
  "Program sales on the marketplace are paid to your own Stripe account, and Deload takes 15% of each sale. Coming soon: billing your own clients through Deload with no Deload fee, and no fee on marketplace buyers who come through your own link.";

// ---------------------------------------------------------------------------
// Home-page content blocks
// ---------------------------------------------------------------------------

export const proofPoints = [
  "Powerlifting, weightlifting, hypertrophy, sport and masters athletes.",
  "RPE, RIR and %1RM in the same block, and the math still works.",
  "Mesocycles, deloads and peaks that fit the athlete.",
  // TODO(founder): confirm this matches the edit behaviour in production
  // (the one-week edit change, #306, is still on staging).
  "Change one session and the weeks after it keep up.",
  "Rearrange days and change many sessions at once.",
  "Every edit kept and reversible; you stay the coach of record.",
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
    a: "It learns your phrasing, set/rep cadence and cues, and gets closer as you edit.",
  },
  {
    q: "What about meet preps, injuries and in-season cuts?",
    // TODO(founder): confirm "rebuilds the affected weeks and leaves the rest"
    // against production behaviour (#306 is still on staging).
    a: "Yes. Tell it the constraint in plain English; it rebuilds the affected weeks and leaves the rest.",
  },
  {
    q: "What do my athletes see?",
    a: "Today's session, the weights, fast logging and messages to you, in the browser. Native apps are on the way.",
  },
  {
    q: IS_OPEN ? "How do I start?" : "How do I get access?",
    a: IS_OPEN
      ? `Sign up and start a ${TRIAL_DAYS}-day free trial. Coaches who join while the Founders Rate runs pay $99/mo for Solo instead of $149, plus 25% off one upgrade. Your athletes use Deload free.`
      : "Join the waitlist and answer a short questionnaire; we invite coaches in small groups. It's free during the beta, and at launch beta coaches get the Founders Rate (Solo at $99/mo instead of $149) plus 25% off one upgrade.",
  },
  {
    q: "Can I move my roster over from another tool?",
    a: "Yes: import programs from Excel, Word or PDF and invite athletes by email.",
  },
];
