/* Content for the Homease case study, rendered through the shared sidebar layout in
   src/projects/caseStudy. Homease is a self-initiated concept, so Outcomes describes
   what the prototype does and what would be measured at launch — no invented metrics.
   Videos are screen recordings of the SwiftUI prototype running in the iOS simulator. */

export const HOMEASE = {
  slug: "homease",
  company: "Homease",
  title: "Homease",
  subtitle: "Finding a mid-term rental without opening six apps",
  hero: {
    image: "/images/homease/homease-card.png",
    alt: "The Homease wordmark beside the Ask screen of the iOS app",
    bleed: true,
    bg: "transparent",
    video: {
      src: "/images/homease/cover.mp4",
      left: "63.37%",
      top: "12.95%",
      width: "20.75%",
      height: "109.35%",
      radius: "8.36% / 3.86%",
    },
  },
};

export const HOMEASE_NAV = [
  {
    group: "HOMEASE",
    items: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "research", label: "Research" },
      { id: "decisions", label: "Key Decisions" },
      { id: "solution", label: "Solution" },
      { id: "prototype", label: "Design to Prototype" },
      { id: "outcomes", label: "Outcomes" },
      { id: "learnings", label: "Learnings" },
    ],
  },
];

export const HOMEASE_BLOCKS = [
  {
    id: "overview",
    variant: "default",
    eyebrow: "Overview",
    lead: "Housing for one to six months lives in the gaps between platforms.",
    body: [
      "Travel nurses, interns and people relocating for work need a furnished place for a few months, not a year. Those listings are spread across Facebook groups, Craigslist, Airbnb and Furnished Finder — each with its own filters, its own way of messaging, and its own blind spots.",
      "Homease is a concept I designed and prototyped end to end: describe your stay once, answer a few quick questions, and get ranked matches from every source, with commute time and real cost up front. When you find the one, Homease drafts the message and hands you off to wherever the host actually lives.",
      "Homease was also my playground for working AI-first on a problem that genuinely needs solving. I vibe coded it, but systematically: Figma stayed the source of truth, tokens and motion rules were set before any code, and each screen was built, run in the iOS simulator and checked against the design before moving on. The same principles shaped the product itself — AI handles the tedious parts, like reading messy posts, turning one message into structured criteria and drafting the first outreach, while the renter stays in control by confirming what it understood and undoing anything it changes.",
    ],
  },
  {
    variant: "stats",
    eyebrow: "Quick facts",
    stats: [
      { value: "Solo", label: "Product design, research & prototyping" },
      { value: "iOS", label: "SwiftUI prototype, designed in Figma" },
      { value: "Concept", label: "Self-initiated, 2026" },
    ],
  },
  {
    variant: "media",
    autoplay: true,
    ground: "#F3E8E1",
    radius: 24,
    src: "/images/homease/splash.mp4",
    caption:
      "The opening moment: listings from different sites scatter and settle, and the house outline draws itself around “ease” — the product promise in one motion.",
  },
  {
    id: "problem",
    variant: "card-stack",
    eyebrow: "The Problem",
    lead: "Mid-term renters do the aggregating themselves.",
    body: "Talking with people who had searched for a short-term lease, the same story kept coming up: a dozen tabs, a spreadsheet, and messages scattered across apps. The search itself wasn’t the hard part. Trusting what they found, and acting before it was gone, was.",
    cards: [
      {
        title: "Listings are fragmented",
        body: "They’re spread across sites that don’t talk to each other, so every search runs four times.",
      },
      {
        title: "Posts leave out what matters",
        body: "Utilities, furniture and minimum stay are often missing, and strict filters silently hide those listings.",
      },
      {
        title: "The listed price isn’t the real price",
        body: "Fees and utilities show up later, so budgets break after the first message.",
      },
      {
        title: "Scams look real, and good places go fast",
        body: "Scam posts look exactly like real ones, and the good places are gone within days.",
      },
    ],
  },
  {
    id: "research",
    variant: "side-to-side",
    eyebrow: "Research",
    body: [
      "Alongside conversations with renters, I mapped the end-to-end journey — brief, search, shortlist, outreach, tour, secure — and benchmarked how conversational and listing products handle search and trust: Mindtrip, Perplexity, Shop, Agoda and Airbnb among them.",
      "The patterns that worked shared one thing: they show their work. Cards before explanation, sources you can see, and criteria that stay visible and editable after you set them.",
    ],
  },
  {
    id: "decisions",
    variant: "card-stack",
    eyebrow: "Key Decisions",
    cards: [
      {
        title: "Ask, then confirm",
        body: "Renters describe their stay in one message; Homease turns it into seven short questions that restate what it heard (“I picked up Nov 1 to Dec 1”) instead of a wall of filters.",
      },
      {
        title: "Unstated isn’t excluded",
        body: "Listings that don’t mention utilities or furniture stay in the results, flagged with “+ utilities?”, so renters ask rather than miss out.",
      },
      {
        title: "Commute and price on every card",
        body: "Minutes to work and the monthly price sit together, right under the photo, because they decide most searches.",
      },
      {
        title: "Message where the host is",
        body: "Facebook group posts open a Messenger-style draft; Craigslist and Furnished Finder open an email. Homease writes the first message instead of replacing the platform.",
      },
      {
        title: "Every change can be undone",
        body: "Criteria live as chips above the results; editing one shows exactly what changed — “Budget changed to $2,500 · 5 places hidden” — with Undo.",
      },
    ],
  },
  {
    id: "solution",
    variant: "side-to-side",
    eyebrow: "Solution",
    body: "Three moments carry the experience: describing the stay, comparing matches, and reaching out. Each recording below is the working iOS prototype.",
  },
  {
    variant: "media",
    autoplay: true,
    ground: "#F3E8E1",
    radius: 24,
    src: "/images/homease/ask-flow.mp4",
    label: { src: "/images/homease/label-ask.svg", alt: "Ask" },
    caption:
      "One message becomes seven confirm-or-adjust questions — dates, commute, budget, space, furniture, must-haves and flexibility. Optional questions can be skipped.",
  },
  {
    variant: "media",
    autoplay: true,
    ground: "#F3E8E1",
    radius: 24,
    src: "/images/homease/matches.mp4",
    label: { src: "/images/homease/label-matches.svg", alt: "Matches" },
    caption:
      "Each card leads with the source and how recently it was posted, then fit, price and commute. Swipe through every room on the card; open a listing for the household, roommate preferences and lease details.",
  },
  {
    variant: "media",
    autoplay: true,
    ground: "#F3E8E1",
    radius: 24,
    src: "/images/homease/email.mp4",
    label: { src: "/images/homease/label-reach-out.svg", alt: "Reach out" },
    caption:
      "“Message Marcus” opens an email to the Furnished Finder host, pre-filled with the listing, dates and workplace. Facebook group listings open a Messenger-style chat instead.",
  },
  {
    id: "prototype",
    variant: "side-to-side",
    eyebrow: "Design to Prototype",
    body: [
      "I designed Homease in Figma first, then built it as a native SwiftUI app with Claude Code, treating the Figma file as the source of truth: every screen, token and prototype transition mapped one to one. A working app let me test what a static prototype can’t — swiping through photos, editing criteria mid-search, and handing off to a different messaging app per source.",
    ],
  },
  {
    id: "outcomes",
    variant: "side-to-side",
    eyebrow: "Outcomes",
    lead: "Homease hasn’t launched, so these describe what the prototype changes rather than measured results.",
    body: [
      "Listings from Facebook groups, Craigslist and Furnished Finder are ranked together in one feed. Seven short questions replace filter forms, each confirming what the renter already said. And reaching a host takes one tap to a drafted first message, sent where that host already is.",
      "At launch I’d measure time from first search to first message, the share of matches with a known all-in price, how often renters edit or undo criteria, and how many reported listings turn out to be scams.",
    ],
  },
  {
    id: "learnings",
    variant: "three-column",
    eyebrow: "Learnings",
    columns: [
      "What worked: building the real app. Interactions like per-source messaging and swipeable galleries surfaced questions a click-through prototype would have hidden.",
      "What I’d do differently: run structured interviews earlier, especially to test the “dual-role mover” — someone subletting their home while renting elsewhere.",
      "What’s next: a browser extension to read the Facebook groups renters already belong to, reply tracking across platforms, and the subletter side of the move.",
    ],
  },
];
