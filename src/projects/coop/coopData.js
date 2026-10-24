/* Content for the Co-op Solutions (Springboard) case study, rendered through the shared
   sidebar layout in src/projects/caseStudy. Copy is carried over verbatim from the
   earlier Springboard case study page, section for section.

   The navigation concepts and inactive-product clips come from the Portfolio Assets
   recordings; the prototype walkthrough is the Springboard Full Product Recording, cut
   before the QuickTime menu at its end; the Vibe Credit Union film is the one Co-op
   Solutions shared on LinkedIn.

   Still to come from the original page, each sitting where its comment marks below:
   the site map, the final navigation pattern and the hypothesis table. */

export const COOP = {
  slug: "coop",
  company: "Co-op Solutions",
  title: "Springboard",
  subtitle:
    "Modernizing legacy credit union software to empower representatives to serve members more effectively.",
  hero: {
    image: "/images/Springboard.png",
    alt: "The redesigned Springboard member overview for a VISA credit account",
    bleed: true,
    bg: "#333930",
  },
};

export const COOP_NAV = [
  {
    group: "SPRINGBOARD",
    items: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "audience", label: "The Audience" },
      { id: "principles", label: "Design Principles" },
    ],
  },
  {
    group: "THE REDESIGN",
    items: [
      { id: "information-architecture", label: "Information Architecture" },
      { id: "navigation", label: "Defining Navigation" },
      { id: "research", label: "User Research" },
      { id: "outcomes", label: "Outcomes" },
    ],
  },
];

export const COOP_BLOCKS = [
  {
    id: "overview",
    variant: "default",
    eyebrow: "Overview",
    body: "During my time at Philosophie, I led the 0-1 redesign of a legacy credit union software that enables representatives to easily service their members. Previously designed and developed by a team of developers, we conducted the redesign applying human-centered design principles, iteratively improving the product based on credit unions’ representatives’ mental models.",
  },
  {
    variant: "facts",
    facts: [
      { label: "Role", lines: ["Product Designer", "Workshop Facilitator"] },
      {
        label: "Team",
        lines: ["Product Designer", "UX Strategist", "Technical Product Owner", "VP of Product Management"],
      },
      { label: "Timeline", lines: ["8 months"] },
      {
        label: "Impact",
        outcome: true,
        lines: ["Reduced time spent per member by 20%", "Reduced customer service calls by 10%"],
      },
    ],
  },
  {
    id: "problem",
    variant: "default",
    className: "co-statement",
    eyebrow:
      "Credit unions are constrained by a card-centric model that prevents a holistic understanding of members’ financial relationships.",
    body: "Our team interviewed credit union representatives across the country to understand their workflows and pain points. We focused on Springboard, a software platform used by credit union staff to serve their members. Originally built by developers in the 1990s, the legacy system presented several challenges. Representatives struggled with a product-centric interface that made it difficult to see a member’s complete financial picture. In addition, the application was slow to load, hindering their ability to provide timely support.",
  },
  {
    id: "audience",
    variant: "default",
    eyebrow: "The Audience",
    body: "Springboard was sold to a variety of credit unions, ranging in asset sizes. The primary user could be a credit union representative who is specialized, such as a fraud specialist or a cards specialist. Alternatively, the some users are more generalized, such as a frontline representative, who can accomplish more specific functions within Springboard.",
  },
  {
    variant: "personas",
    personas: [
      {
        name: "Erin",
        title: "Electronic Service Representative",
        type: "Generalist",
        background: "10-15 years of experience with Springboard",
        actions: ["Investigate possible Fraud", "Review member’s Flex Points Account", "Process replacement card"],
      },
      {
        name: "Casey",
        title: "Card Specialist",
        type: "Specialist",
        background: "8-10 years of experience with Springboard",
        actions: ["Process replacement card", "Review debit transaction history", "Process replacement card"],
      },
      {
        name: "Erin",
        title: "CO-OP Cards Specialist",
        type: "CO-OP representative",
        background: "Acts on behalf of a credit union representative",
        actions: ["Create memos on behalf of reps", "Review a member’s possible fraud"],
      },
    ],
  },
  {
    id: "principles",
    variant: "default",
    eyebrow: "Design Principles",
    body: "After uncovering key frustrations credit union representatives had with Springboard, I partnered with another designer to define our core principles for the redesign. A primary goal was to shift from a product-centric to a member-centric experience—empowering representatives to quickly understand a member’s full financial picture when handling calls about disputes or lost/stolen cards. Since representatives serviced 50-100 customers a day, it was important to optimize for speed and accuracy.",
  },
  {
    variant: "rotating-principles",
    items: [
      {
        title: "Consistency",
        body: "It was crucial for the application to be consistent across experiences and UI Component usage.",
      },
      {
        title: "Promote speed and accuracy",
        body: "We wanted to make sure credit union representatives can efficiently navigate between applications, reducing time spent servicing members.",
      },
      {
        title: "Member-centricity",
        body: "In the redesigned architecture, representatives can easily understand members’ holistic financial picture, including products they have.",
      },
    ],
  },
  {
    id: "information-architecture",
    variant: "side-to-side",
    eyebrow: "Systematizing Springboard’s Capabilities",
    body: "Credit union representatives were used to a certain mental model of Springboard. Frequently conducting actions such as reporting a card lost/stolen, or reviewing transactions, representatives have to navigate frequently between screens. Accounting for all features of the application to maintain consistency, I worked with another designer and the VP of Product to prioritize the site map.",
  },
  // Site map goes here.
  {
    id: "navigation",
    variant: "default",
    eyebrow: "Defining Navigation",
    body: "We converged on a navigation pattern that would easily allow representatives to get a holistic understanding of the member they’re servicing. We diverged and created wireframe concepts to promote the member-centric navigation framework. Before consolidating on a direction, we tested our wireframe concepts against the 30+ screens and features in the Legacy Springboard system to identify where the navigation might fail.",
  },
  {
    variant: "carousel",
    label: "Navigation wireframe concepts",
    slides: [
      {
        src: "/images/coop/nav-left-pane.mp4",
        alt: "Wireframe concept: member details and products in a left pane",
      },
      {
        src: "/images/coop/nav-top-pane.mp4",
        alt: "Wireframe concept: member details and products across a top pane",
      },
      {
        src: "/images/coop/nav-my-products.mp4",
        alt: "Wireframe concept: a My Products home with an overview of activity and service history",
      },
    ],
  },
  {
    variant: "clip-row",
    clips: [
      { src: "/images/coop/inactive-show.mp4", alt: "Inactive products revealed from a Show inactive row" },
      { src: "/images/coop/inactive-toggle.mp4", alt: "Inactive products revealed with a Show Inactive Products toggle" },
    ],
    caption: "Exploring ways of showcasing inactive products.",
  },
  // Final navigation pattern goes here, captioned:
  // "The final navigation pattern - ensures features have a corresponding home at scale."
  {
    id: "research",
    variant: "default",
    eyebrow: "User Research",
    body: "We iteratively tested the product with 72 different representatives, confirming the value of the member-centric view. Taking a hypothesis-driven approach, we gathered feedback that reinforced our direction for the redesigned application.",
  },
  // Hypothesis table goes here.
  {
    variant: "quotes",
    quotes: [
      {
        text: [
          "“I love the look and feel of the Modern Experience. The ability to see a more holistic view of the members entire relationship with the credit union and still maintain the ability to drill down to that card level data is great. This will help us see how the individual transacts with the credit union and give us the ability to offer rewards and cross sell products that are more tailored to the members specific needs more efficiently.”",
        ],
        name: "Crystal",
        role: "Card Services Manager",
        org: "First Tech Credit Union",
      },
      {
        text: [
          "“ It’s super helpful that you can go to ",
          { bold: "transaction history and then it goes into more detail" },
          " about service and you can expand on it.”",
        ],
        name: "Dana",
        role: "Frontline Representative",
        org: "DOW Credit Union",
      },
    ],
  },
  {
    variant: "media",
    src: "/images/coop/springboard-prototype.mp4",
    caption: "The Final Springboard Prototype tested with credit union representatives.",
  },
  {
    id: "outcomes",
    variant: "default",
    eyebrow: "Outcomes",
    body: [[{ text: "We launched a new experience with beta customers, simplifying training and improving overall efficiency for representatives. Customers saw improvement and value in the redesigned product experience, resulting in " }, { text: "a 20% reduction in navigation time and 10% increase in resolved service calls", bold: true }, { text: "." }]],
  },
  {
    variant: "media",
    src: "/images/coop/vibe-credit-union.mp4",
    caption:
      "Co-op Solutions on LinkedIn: “By giving staff real-time access to cardholder information and account activity all in one place, Co-op Springboard has helped Vibe Credit Union remove barriers and deliver solutions in a way that helps tell their members “yes” more often and “no” a whole lot less.”",
  },
];
