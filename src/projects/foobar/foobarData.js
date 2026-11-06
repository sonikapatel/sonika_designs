/* Content for the Foo Bar showcase, rendered through the shared sidebar layout in
   src/projects/caseStudy. Foo Bar is a self-initiated concept brewery, so there are no
   launch metrics here. Images are exported from the Foo Bar Figma file
   ("Portfolio export / sonika_designs" section and the two hero scenes). */

export const FOOBAR = {
  slug: "foobar",
  company: "Foo Bar",
  title: "Foo Bar",
  subtitle: "Designing a brand from scratch with AI, from a blank page to a full lineup",
  hero: {
    image: "/images/foobar/foobar-card.jpg",
    alt: "The foo.bar wordmark beside Logger Lager, Std.out Stout and Scale Ale cans",
    bleed: true,
    bg: "transparent",
  },
};

export const FOOBAR_NAV = [
  {
    group: "FOO BAR",
    items: [
      { id: "overview", label: "Overview" },
      { id: "diverge", label: "Diverge" },
      { id: "mark", label: "The Mark" },
      { id: "converge", label: "Converge" },
      { id: "learnings", label: "Learnings" },
    ],
  },
];

export const FOOBAR_BLOCKS = [
  {
    id: "overview",
    variant: "default",
    eyebrow: "Overview",
    lead: "A brand from a blank page.",
    body: [
      "Foo Bar started with nothing: no name, no logo, no palette. It’s a concept brewery for engineers, with taproom cans called Logger Lager, Std.out Stout, API IPA, PILS Pilsner and Scale Ale, and I used it to see how far I could take a brand from scratch working with AI.",
      "The process had two halves. First I went wide, using AI to explore far more directions than I could sketch by hand. Then I narrowed down by composing the brand directly in Figma, on cans, labels and carriers, which is where the system started to hold together.",
    ],
  },
  {
    variant: "stats",
    eyebrow: "Quick facts",
    stats: [
      { value: "Solo", label: "Brand, packaging & pattern design" },
      { value: "5", label: "Beers, one pattern each" },
      { value: "Concept", label: "Self-initiated, 2026" },
    ],
  },
  {
    variant: "media",
    bare: true,
    src: "/images/foobar/foobar-lineup.jpg",
    alt: "Five Foo Bar cans stepping down a grey ledge",
    caption: "The lineup. Each label is the beer’s line card turned on its side, so the name runs up the can.",
  },
  {
    id: "diverge",
    variant: "side-to-side",
    eyebrow: "Diverge",
    lead: "I started wide on purpose.",
    body: [
      "Working with AI meant a new direction cost minutes instead of an afternoon, so I let the exploration run in every direction. Spirals, offset curves and nested squares. Curly braces, prompt chevrons, comment slashes, tags and arrow functions. Bold display type against a quiet grotesque. A bracket bottle and an F with a bottle in its counter.",
      "Each direction was a different answer to the same question: what makes a beer feel like engineers made it? The syntax itself, the repetition of a loop, or the joke in the name. Seeing them side by side made it easier to tell which ideas had a system behind them and which were one-offs.",
    ],
  },
  {
    variant: "media",
    bare: true,
    src: "/images/foobar/foobar-patterns.png",
    alt: "Five line cards in orange, rust, olive, tan and blue, each with a code-syntax pattern",
    caption:
      "Where the patterns landed. Every pattern is one move repeated: nested { } scopes, >_ stdout lines, // comments, </> tags and => arrows.",
  },
  {
    id: "mark",
    variant: "side-to-side",
    eyebrow: "The Mark",
    body: "The marks went through the same loop. One sets a bottle inside square brackets, so the logo reads as syntax first. The other is an F whose counter is a bottle on its side, cap floating at the mouth, so it stands upright once the label turns 90° on the can. The final cans pair the bracket bottle with the foo.bar wordmark.",
  },
  {
    variant: "media",
    bare: true,
    src: "/images/foobar/foobar-logo.png",
    alt: "The bracket bottle mark on tan beside the F bottle mark on black",
    caption: "The syntax bottle and the F with a bottle in its counter.",
  },
  {
    id: "converge",
    variant: "side-to-side",
    eyebrow: "Converge",
    lead: "Composing in Figma is where it came together.",
    body: [
      "A pattern on a flat card only tells you so much. So I moved the work into Figma and composed the brand on the things it would actually live on: front and back labels, 12 oz cans, print dielines, a 6-pack carrier and product shots.",
      "Every view was built from the same label and can components, so changing one label updated the hero shots, can views and print specs at once. That let me judge decisions against the whole lineup instead of one card at a time: which patterns still read at can size, which colors held up next to each other, and where the type needed to move.",
    ],
  },
  {
    variant: "media",
    bare: true,
    src: "/images/foobar/foobar-desk-photo.jpg",
    alt: "A rust can-shaped mini fridge stocked with Std.out Stout and Logger Lager on a wooden desk, beside a monitor showing the label being built in a code editor",
    caption:
      "The label as code, in a real room. In the visual IDE, each beer is a component: change the ground, the pattern or the stroke, and the can in the fridge updates with it.",
  },
  {
    variant: "media",
    bare: true,
    src: "/images/foobar/foobar-plinths.jpg",
    alt: "Foo Bar cans on a cream block and stone plinths in a studio set",
    caption: "The same components, staged in a studio set with the cans on plinths at three heights.",
  },
  {
    id: "learnings",
    variant: "three-column",
    eyebrow: "Learnings",
    columns: [
      "What worked: diverging with AI. Cheap directions meant I could follow the odd ideas, and a couple of them, like the patterns built from syntax, became the system.",
      "What I’d do differently: move into composition sooner. Patterns that looked strong on a card fell apart at can size, and I only saw that once they were on the can.",
      "What’s next: carrying the system into the taproom itself, with tap handles, menus and merch built from the same components.",
    ],
  },
];
