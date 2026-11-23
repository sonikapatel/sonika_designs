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
      { id: "workshop", label: "Workshop" },
      { id: "outcomes", label: "Outcomes" },
    ],
  },
  {
    group: "TERM LOANS",
    items: [
      { id: "term-loans", label: "Reducing Confusion" },
      { id: "plaid-linking", label: "Plaid Linking" },
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
    id: "workshop",
    variant: "mad-libs",
    eyebrow: "A mad libs workshop for lending",
    body: "Each group filled in the same sentence with sticky notes: what a seller sees first, where they evaluate, how they choose a loan, and how we communicate clear choice. Three final concepts came out of it.",
  },
  {
    id: "outcomes",
    variant: "default",
    eyebrow: "Outcomes",
    body: [[{ text: "Term vs Flex Loan Product prototypes were " }, { text: "presented to leadership to continue developing in the following quarter", bold: true }, { text: " to improve seller experience." }]],
  },
  {
    id: "term-loans",
    variant: "header",
    eyebrow: "Reducing seller confusion and increasing the Loans conversion",
    body: "I improved the user experience of Term Loans to facilitate seller transparency, reduce cognitive overload, and improve seller loyalty to Square Loans.",
  },
  {
    variant: "media",
    // Pre-Terms.mov with its black edges cropped off; the radius follows the phone
    // screen's own corners so the black outside them is cut too.
    src: "/images/square/Pre-Terms-cropped.mp4",
    framed: true,
    radius: "11% / 4.4%",
    caption:
      "Sellers are confused about 1) Loan Eligibility 2) Consent to FICO and 3) What contributes to a higher loan offer due to a clustered original user experience.",
  },
  {
    id: "plaid-linking",
    variant: "default",
    eyebrow: "How Plaid linking led to higher loan offers",
    lead: "A loan offer was sized from a seller’s Square processing data alone.",
    body: "Linking outside bank accounts through Plaid meant we could have a holistic picture of sellers’ finances and provide higher offers for their business. I explored various directions for sellers to get higher loan offers, without compromising on education and seller transparency.",
  },
  {
    id: "explorations",
    variant: "carousel",
    label: "Term Loans explorations",
    slides: [
      {
        src: "/images/square/Banner Only-nomark.mp4",
        alt: "Exploration 1: a banner after the initial loan offer",
        caption: "Exploration 1: Banner concept after receiving initial loan offer.",
      },
      {
        src: "/images/square/FreeForm-nomark.mp4",
        alt: "Exploration 2: a freeform input for the number of bank accounts",
        caption:
          "Exploration 2: Freeform input — the experience holds users accountable for the number of bank accounts.",
      },
      {
        src: "/images/square/TextOnly-nomark.mp4",
        alt: "Exploration 3: copy that holds the seller accountable for the maximum loan",
        caption: "Exploration 3: Copy to hold the seller accountable for maximum loan.",
      },
    ],
  },
  {
    variant: "media",
    src: "/images/square/TabBar-nomark.mp4",
    framed: true,
    caption:
      [{ text: "In this solution that we shipped, sellers can input the number of bank accounts they have to hold the experience accountable. " }, { text: "This solution yielded an increased seller understanding and loan conversion.", bold: true }],
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
