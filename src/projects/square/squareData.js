/* Content for the Square case study, rendered through the shared sidebar layout in
   src/projects/caseStudy. Copy is carried over verbatim from the Square entry in
   projectData.js.

   The two `big-header` sections there map onto the `header` variant: the statement
   becomes the eyebrow (which this design already runs at sentence length), and the
   framing line becomes the bold lead on the body, so no copy is dropped.

   Videos point at the -nomark crops, which are the same footage above the mock.video
   watermark that was burned into the bottom of the originals. */

export const SQUARE = {
  slug: "square",
  company: "Square",
  title: "Square",
  subtitle: "Rethinking credit for small businesses across merchant categories",
  protected: "sp_project",
  hero: {
    image: "/images/banner_images/Square_Header.png",
    alt: "Square Loans discovery and offer experiences in the seller dashboard",
    bleed: true,
    bg: "#14244D",
  },
};

export const SQUARE_NAV = [
  {
    group: "LOAN DISCOVERY",
    items: [
      { id: "overview", label: "Overview" },
      { id: "flexibility", label: "Loan Flexibility" },
      { id: "outcomes", label: "Outcomes" },
    ],
  },
  {
    group: "TERM LOANS",
    items: [
      { id: "term-loans", label: "Reducing Confusion" },
      { id: "explorations", label: "Explorations" },
      { id: "impact", label: "Impact" },
    ],
  },
];

export const SQUARE_BLOCKS = [
  {
    id: "overview",
    variant: "default",
    eyebrow: "Overview",
    lead: "Small business owners need access to capital but find traditional loan applications intimidating and opaque.",
    body: "At Square, I led credit experiences that felt approachable and contextually relevant within sellers’ existing merchant dashboard. I designed a credit discovery experience that meets merchants where they are in their business journey alongside integrating external bank account linking to yield higher loan offers.",
  },
  {
    id: "flexibility",
    variant: "header",
    eyebrow: "How might we allow more flexibility for small businesses to receive Term and Flex loans?",
    lead: "Sellers are confused about their loans.",
    body: "I led a XFN workshop with research, engineering, and writers to ideate new ways for small businesses to be 1) educated about their loans and 2) get a loan that suits their business needs best.",
  },
  {
    variant: "media",
    src: "/images/square/beforeloan.mov",
  },
  {
    variant: "media",
    src: "/images/square/flexloaneligibility.mov",
    caption:
      "Sellers received different loans product experiences, with varying loan eligibility amounts and fees, based on their processing data, which became a confusing experience for sellers.",
  },
  {
    variant: "media",
    src: "/images/square/customizefinancing.mov",
    caption:
      "In this exploration I designed after the workshop, eligible sellers can see the differences in each loan and how it affects their business, before concluding on 1 to move forward with.",
  },
  {
    variant: "media",
    src: "/images/square/wizard.mov",
    caption:
      "Sellers can feel more sense of ownership by deliberately selecting elements that go into a loan offer in this Loan Selection Wizard.",
  },
  {
    id: "outcomes",
    variant: "default",
    eyebrow: "Outcomes",
    body: "Term vs Flex Loan Product prototypes were presented to leadership to continue developing in the following quarter to improve seller experience.",
  },
  {
    id: "term-loans",
    variant: "header",
    eyebrow: "Reducing seller confusion and increasing the Loans conversion",
    body: "I improved the user experience of Term Loans to facilitate seller transparency, reduce cognitive overload, and improve seller loyalty to Square Loans.",
  },
  {
    variant: "media",
    src: "/images/square/Pre-Terms.mov",
    framed: true,
    caption:
      "Sellers are confused about 1) Loan Eligibility 2) Consent to FICO and 3) What contributes to a higher loan offer due to a clustered original user experience.",
  },
  {
    id: "explorations",
    variant: "media",
    src: "/images/square/Banner Only-nomark.mp4",
    framed: true,
    caption: "Exploration 1: Banner concept after receiving initial loan offer.",
  },
  {
    variant: "media",
    src: "/images/square/FreeForm-nomark.mp4",
    framed: true,
    caption:
      "Exploration 2: Freeform input — the experience holds users accountable for the number of bank accounts.",
  },
  {
    variant: "media",
    src: "/images/square/TextOnly-nomark.mp4",
    framed: true,
    caption: "Exploration 3: Copy to hold the seller accountable for maximum loan.",
  },
  {
    variant: "media",
    src: "/images/square/TabBar-nomark.mp4",
    framed: true,
    caption:
      "In this solution that we shipped, sellers can input the number of bank accounts they have to hold the experience accountable. This solution yielded an increased seller understanding and loan conversion.",
  },
  {
    id: "impact",
    variant: "stats",
    eyebrow: "Impact",
    stats: [
      { value: "45,000", label: "Eligible Term Sellers", caption: "over a 3 month period" },
      { value: "22%", label: "Plaid Linking Conversion" },
      {
        value: "$890K",
        label: "Loan Originations",
        caption: "+24% increase from the original Term Loans experience",
      },
    ],
  },
];
