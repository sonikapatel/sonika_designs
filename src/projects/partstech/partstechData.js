/* Content for the PartsTech case study, rendered through the shared sidebar layout in
   src/projects/caseStudy. Drawn from the "Features discovery workshop" section of the
   All Projects Outlined Figma file (node 346:89869): the workshop agenda, the problem
   and usage data it opened with, and the explorations that followed. The work ended as
   a direction proposed to leadership, so there are no shipped results here. Images are
   1x exports of the Figma frames. */

export const PARTSTECH = {
  slug: "partstech",
  company: "PartsTech",
  title: "PartsTech",
  subtitle: "Helping upgraded repair shops discover the tire features they paid for",
  hero: {
    image: "/images/partstech/tire-quote.jpg",
    alt: "A good, better and best tire quote for a 2013 Ford F-150 with per-tire prices, fees and totals",
  },
};

export const PARTSTECH_NAV = [
  {
    group: "PARTSTECH",
    items: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "workshop", label: "The Workshop" },
      { id: "challenge", label: "Design Challenge" },
      { id: "directions", label: "Two Directions" },
      { id: "explorations", label: "Explorations" },
      { id: "outcome", label: "Outcome" },
      { id: "learnings", label: "Learnings" },
    ],
  },
];

export const PARTSTECH_BLOCKS = [
  {
    id: "overview",
    variant: "default",
    eyebrow: "Overview",
    body: [
      "PartsTech is where auto repair shops search, compare and order parts and tires from their suppliers. Shops that upgrade to the Plus or Complete plan unlock tire tools: good, better and best tire quotes, out-the-door package pricing and retail pricing matrices.",
      "Usage of those tire tools was low among the shops paying for them. I brought five designers together for a one-hour workshop on how upgraded shops discover what they’ve paid for, first for tires and then across PartsTech, and carried the ideas into a direction I proposed to leadership.",
    ],
  },
  {
    variant: "stats",
    eyebrow: "Quick facts",
    stats: [
      { value: "Workshop", label: "1 hour 5 minutes, five designers" },
      { value: "Tires", label: "Quotes, out-the-door pricing and retail pricing" },
      { value: "Proposed", label: "A direction taken to leadership" },
    ],
  },
  {
    id: "problem",
    variant: "side-to-side",
    eyebrow: "The Problem",
    lead: "Usage of PartsTech’s tire features was low for shops on Plus and Complete.",
    body: "Apart from word of mouth and sales, upgraded shops only learned what their plan included through marketing, onboarding and the settings pages. Nothing in the tools they used every day pointed to what they had just unlocked, so features they were paying for went unnoticed. Tire quotes, which let a shop compare good, better and best options for a customer with fees and taxes in the total, were among the least found.",
  },
  {
    variant: "stats",
    eyebrow: "The Data",
    stats: [
      { value: "49%", label: "of users with a tire supplier ran a tire search" },
      { value: "13%", label: "of SaaS users went from searching to creating a quote" },
      { value: "10%", label: "of active SaaS tire buyers saw, then clicked, out-the-door pricing each week" },
    ],
  },
  {
    id: "workshop",
    variant: "side-to-side",
    eyebrow: "The Workshop",
    body: "The workshop was built to get designers thinking about feature discovery for recently upgraded customers, both in general and specifically for tires. Each part was timeboxed.",
    orderedList: [
      "Current state, 5 minutes: how Plus and Complete shops learn about features today, through marketing, onboarding and plan comparison.",
      "The broader problem, 15 minutes: each designer looked for product education on the web, such as how Figma announces new features, and brought back what worked.",
      "Context, 5 minutes: the problem, the usage data and the design challenge for tires.",
      "Lo-fi ideation, 15 minutes: sketches specific to tires, then asking how each idea could work for every feature.",
      "Share-out, 15 minutes: how each idea carries from tires to introducing every feature in PartsTech.",
    ],
  },
  {
    variant: "media",
    src: "/images/partstech/workshop-board.jpg",
    alt: "The workshop board in Figma: timed sections for current state, web exploration with each designer's sticky notes, context setting with the usage data and design challenge, lo-fi sketches per designer, and the share-out",
    caption:
      "The workshop board in Figma, read left to right: current state, each designer’s notes from the web, the context and design challenge, lo-fi sketches, and the share-out.",
  },
  {
    id: "challenge",
    variant: "default",
    eyebrow: "Design Challenge",
    lead: "How might we help recently upgraded shops learn about tire features, how they work and why they’re worth using?",
    body: "Two questions framed it. Where in the journey, from onboarding to upgrading to using a feature, should this education appear? And how does it fit a way of introducing every PartsTech feature, not just tires?",
  },
  {
    id: "directions",
    variant: "three-column",
    eyebrow: "Two Directions",
    columns: [
      "Centralized: one place, reached from the dashboard, that lists every feature a shop has paid for, with a short description and a clip of how to use each. It keeps everything organized for reference, but learning every premium feature at once can feel overwhelming.",
      "Decentralized: contextual beacons beside the feature itself, like out-the-door pricing on a tire result, opening a short explainer. It teaches at the moment of use, but can add clutter while a shop is working, and features that live in settings are rarely seen.",
      "Open questions: how education differs for a shop owner and a technician sharing one login, when a beacon should go away, and how to point to a settings feature from the tools shops use every day.",
    ],
  },
  {
    id: "explorations",
    variant: "side-to-side",
    eyebrow: "Explorations",
    body: "After the workshop I explored both models in PartsTech’s own screens. Each beacon disappears once a shop has used that feature, and any explainer can be dismissed at any time, so the search results don’t fill with prompts.",
  },
  {
    variant: "media",
    src: "/images/partstech/beacon.jpg",
    alt: "Tire search results with a beacon beside Out-the-door price and its popover",
    caption:
      "A beacon beside Out-the-door price opens a short explainer where the feature already lives.",
  },
  {
    variant: "media",
    src: "/images/partstech/new-pills.jpg",
    alt: "Tire search results with NEW pills on Out-the-door price, Add to quote and the side navigation",
    caption: "A lighter version: NEW pills on features the shop has just unlocked.",
  },
  {
    variant: "media",
    src: "/images/partstech/tires-checklist.jpg",
    alt: "A dashboard card titled Unlock the possibilities of Tires with three features and progress bars",
    caption:
      "The centralized model on the dashboard: “Unlock the possibilities of Tires” lists search, quotes and out-the-door packages, with how far the shop has gotten with each.",
  },
  {
    variant: "media",
    src: "/images/partstech/retail-pricing.jpg",
    alt: "The My shop retail pricing settings with a Tires tab and a markup matrix",
    caption:
      "Retail pricing lives in settings, where shops rarely go. A beacon on the settings tab points them to the tire matrix from the rest of the app.",
  },
  {
    variant: "media",
    src: "/images/partstech/subscription-tiers.jpg",
    alt: "PartsTech Free, Plus and Complete plans compared feature by feature",
    caption:
      "The plan comparison doubled as the map of what to teach: every feature Plus and Complete add is one a shop needs to discover.",
  },
  {
    id: "outcome",
    variant: "side-to-side",
    eyebrow: "Outcome",
    lead: "The work ended as a conceptual direction proposed to leadership.",
    body: "It paired the two models: a dashboard card that sets out what a shop’s plan unlocks, and contextual beacons that teach each feature where it’s used and step aside once it has been. The next step proposed was research with recently upgraded shops, to learn whether they knew about tire quotes, out-the-door pricing, preferred brands and retail pricing when they upgraded, and how useful the explainers were.",
  },
  {
    id: "learnings",
    variant: "three-column",
    eyebrow: "Learnings",
    columns: [
      "What worked: starting from tires gave the workshop something concrete to sketch, and the share-out turned those sketches into a pattern for every feature.",
      "What I’d do differently: talk to recently upgraded shops before the workshop, so the ideas start from what owners and technicians actually missed.",
      "What’s next: test the beacon and the dashboard card with shops, and measure whether tire quote and out-the-door pricing usage rises among upgraded accounts.",
    ],
  },
];
