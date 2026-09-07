/* Content for the Criteria case study, rendered through the shared sidebar layout in
   src/projects/caseStudy. Copy is carried over verbatim from the Criteria entry in
   projectData.js; every prose block declares one of the Figma `Sections` variants and
   every video/still uses the shared `media` container. */

export const CRITERIA = {
  slug: "criteria",
  company: "Criteria",
  title: "Criteria",
  subtitle: "Enabling managers to have insight into their team performance",
  /* Same gate as the criteria entry in projectData.js. */
  protected: "sp_project",
  hero: {
    image: "/images/banner_images/Criteria_Header.png",
    alt: "Weekly Check-Ins career history and 1:1 preparation views",
    /* The header art is a full-frame photo composition rather than a transparent
       mockup, so it fills the card instead of floating on a padded ground. */
    bleed: true,
    bg: "#16112E",
  },
};

export const CRITERIA_NAV = [
  {
    group: "WEEKLY CHECK-INS",
    items: [
      { id: "overview", label: "Overview" },
      { id: "context", label: "Context" },
      { id: "coach-bo", label: "Coach Bo" },
      { id: "designing-for-trust", label: "Designing for Trust" },
    ],
  },
  {
    group: "BUILDING THE EXPERIENCE",
    items: [
      { id: "onboarding", label: "Onboarding + Admin Setup" },
      { id: "research-to-product", label: "From Research to Product" },
      { id: "design-system", label: "Design System" },
      { id: "impact", label: "Impact" },
    ],
  },
];

export const CRITERIA_BLOCKS = [
  {
    id: "overview",
    variant: "default",
    eyebrow: "Overview",
    lead: "Managers lack visibility into how their teams are doing week over week.",
    body: "Criteria’s post-hire suite, Develop, gives managers real-time, personalized coaching at scale. I designed the core experience for a new company bet: an AI-powered coaching product that surfaces relevant insights and recommends actions directly within a manager’s workflow. The product expanded Criteria’s talent management offering beyond pre-hire assessments, creating an experience that supports managers across the employee lifecycle.",
  },
  {
    id: "context",
    variant: "side-to-side",
    eyebrow: "Context",
    body: "TEAMScan is a product we previously launched to help organizations understand how their teams are performing through quarterly check-ins. HR admins configure TEAMScan for their organization, enabling them to collect quarterly pulses of feedback and gain insight into team health and performance. Since customers consistently sought more frequent feedback, I partnered with a PM and engineer to lead the design of Weekly Check-Ins — an experience built to address the core need and turn recurring employee feedback into actionable insights for managers. ",
  },
  {
    variant: "media",
    src: "/images/criteria/og_check-ins.png",
    alt: "The elements that go into the Check-Ins experience",
    bare: true,
  },
  {
    id: "coach-bo",
    variant: "side-to-side",
    eyebrow: "Coach Bo",
    body: [
      "Coach Bo is an AI-intelligent bot, that synthesizes information from the core chat product, asking ‘How was last week”, ‘What did you accomplish this week’, and ‘What are you looking to accomplish next’ in a conversational manner.",
      "After processing the information, Check-Ins provides managers reports relevant to their roles, including information about organizational health, mood/progress levels of their direct reports, using sentiment analysis. ",
    ],
  },
  {
    variant: "media",
    src: "/images/criteria/check_in_chat.mov",
    notes: [
      "An intuitive chat interface who helps employees think through their work, recognize patterns, and understand performance.",
      "How might we apply information from Coach Bo conversational experience to incentivize employees to complete weekly check-ins?",
    ],
    caption:
      "All roles are required to check-in with their managers weekly. I iterated and prototyped visual styles for an intelligent chat interface that matched our design system for Check-Ins.",
  },
  {
    id: "designing-for-trust",
    variant: "side-to-side",
    eyebrow: "Designing for trust in coaching signals",
    body: "One of the most important challenges surfaced during the first iteration: the sentiment-analysis scores did not always accurately reflect employee performance. For a manager making decisions about how to coach a direct report, an inaccurate signal can quickly undermine confidence in the entire experience. Rather than treating sentiment scores as objective answers, I focused on creating an experience where managers could understand the signals, interpret them in context, and confidently decide when to act. Trust became a core design principle for Check-Ins: every coaching signal needed to feel grounded enough to inform a conversation, not simply present a score. The resulting experience was designed to help managers move from “What does this score mean?” to “What should I do with this information? I led a generative research study alongside a card sorting exercise with 10 managers across domains with varying levels of leadership to understand the priority of information managers care about in 1:1s with their direct reports.",
  },
  {
    variant: "card-sort",
  },
  {
    id: "onboarding",
    variant: "side-to-side",
    eyebrow: "Onboarding + Admin Setup",
    body: "Weekly Check-Ins was a confusing experience for HR admins to onboard their 200+ people organizations. There was a lack of mental model and hierarchy within the original setup configuration. To alleviate the confusion admins faced prior to Check-Ins launch, I designed a system to ensure admins across varying organizations sizes can easily onboard their employees to the experience. I explored lo-fidelity directions to build trust at scale, while helping users understand the impact of configuring each high-intent step. ",
  },
  {
    variant: "media",
    src: "/images/criteria/onboarding-direction-1.png",
    alt: "Accordion-style onboarding checklist",
    caption: "An accordion-style checklist that expands each step in place.",
  },
  {
    variant: "media",
    src: "/images/criteria/LoFidelity2.png",
    alt: "Single-step wizard with a persistent side panel",
    caption:
      "A single-step wizard with a persistent side panel dedicated to explaining the trust and data implications of the step.",
  },
  {
    variant: "media",
    src: "/images/criteria/onboarding-direction-3.png",
    alt: "Lo-fidelity onboarding skeleton",
    caption:
      "An early lo-fidelity skeleton pass, focused purely on step structure and pacing — content and education framing came later.",
  },
  {
    variant: "media",
    src: "/images/criteria/onboarding-sept4.mov",
    caption:
      "A working demo of onboarding setup with different states for in-progress and complete steps, using the visual identity across products and the design system I created in Figma, translated to Typescript components.",
  },
  {
    id: "research-to-product",
    variant: "side-to-side",
    eyebrow: "From research to product",
    body: "Managers, depending on their role within an organization, care about employees achieving their weekly projects, alongside certain metrics being met.  I thought about how to integrate role-specific variables, like ARR for Customer Success and Sales, for employees across various types of organizations into a meaningful coaching experience.",
  },
  {
    variant: "media",
    src: "/images/criteria/check-indata.png",
    alt: "The sources feeding into Check-Ins: HRIS and org data, personality profiles, integrations, team KPIs, weekly data and soft skills guidance",
    bare: true,
  },
  {
    variant: "media",
    src: "/images/criteria/dashboard.mov",
    notes: [
      "Managers can view a high-level overview of their employees' mood, progress, and readiness score pertaining to WoW and engagement with Coach Bo.",
      "The 1:1 preparation guides surface items managers care most about, alongside strengths and motivators for their careers, extrapolated from our prehire assessments.",
    ],
    caption:
      "A demo of the dashboard managers used, understanding what they care about most when reviewing direct reports' information. The yellow/red/green states are based off of the synthesized mood scores from Coach Bo.",
  },
  {
    id: "design-system",
    variant: "header",
    eyebrow: "Building a scalable AI-native design system",
    body: "I leveraged the existing color palette from Prehire to establish semantic tokens for Check-Ins, creating a cohesive visual language that carried seamlessly from Figma into production code.",
  },
  {
    variant: "media",
    src: "/images/criteria/DSWebsite.png",
    alt: "The Check-Ins design system documentation site",
    bare: true,
  },
  {
    id: "impact",
    variant: "default",
    eyebrow: "Impact",
    body: "The redesigned Check-Ins onboarding experience launched to 5% of SMB accounts, alongside a limited beta of Coaching v1. The work created a scalable onboarding foundation that enabled Criteria to expand Check-Ins to larger organizations. It leveraged existing design patterns while introducing a modern component library and flexible UX patterns that could support varying organizational hierarchies.",
  },
];

/* Card-sort exercise run with 10 managers. Coordinates are px within a
   frameWidth x frameHeight canvas; the component positions them as percentages. */
export const CARD_SORT = {
  frameWidth: 1048,
  frameHeight: 393,
  noteSize: 128,
  intervalMs: 2400,
  notes: [
    { label: "Strengths Observed", start: { x: 377, y: 82 }, end: { x: 554, y: 74 } },
    { label: "Overall Motivators", start: { x: 84, y: 166 }, end: { x: 618, y: 183 } },
    { label: "Goals Tracking", start: { x: 201, y: 63 }, end: { x: 163, y: 98 } },
    { label: "Energy Levels", start: { x: 505, y: 188 }, end: { x: 363, y: 92 } },
    { label: "Next Week's goals", start: { x: 265, y: 167 }, end: { x: 68, y: 169 } },
    { label: "Current Blockers", start: { x: 524, y: 56 }, end: { x: 259, y: 145 } },
    { label: "Over past 4 weeks", start: { x: 789, y: 63 }, end: { x: 436, y: 156 } },
    { label: "Growth and Development", start: { x: 642, y: 120 }, end: { x: 873, y: 113 } },
    { label: "Wins and Achievements - current week", start: { x: 760, y: 209 }, end: { x: 724, y: 109 } },
  ],
};
