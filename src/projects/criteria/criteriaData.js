/* Content for the Criteria case study, rendered through the shared sidebar layout in
   src/projects/caseStudy. Prose blocks declare one of the Figma `Sections` variants,
   videos/stills use the shared `media` container, and anything else (job stories,
   channel options, carousels, card sort) is registered in CriteriaPage.js. */

export const CRITERIA = {
  slug: "criteria",
  company: "Criteria",
  title: "Criteria",
  subtitle: "Enabling managers to have insight into their team performance",
  /* Same gate as the criteria entry in projectData.js. */
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
      { id: "principles", label: "Design Principles" },
      { id: "roles", label: "Who We Designed For" },
      { id: "coach-bo", label: "Coach Bo" },
      { id: "designing-for-trust", label: "Designing for Trust" },
    ],
  },
  {
    group: "BUILDING THE EXPERIENCE",
    items: [
      { id: "onboarding", label: "Onboarding + Admin Setup" },
      { id: "research-to-product", label: "From Research to Experience" },
      { id: "ic-incentive", label: "Giving ICs a Reason" },
      { id: "design-system", label: "Design System" },
      { id: "merchandising", label: "In-Product Merchandising" },
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
    body: [
      "Criteria’s post-hire suite, Develop, gives managers real-time, personalized coaching at scale. I designed the core experience for a new company bet: an AI-powered coaching product that surfaces relevant insights and recommends actions directly within a manager’s workflow. The product expanded Criteria’s talent management offering beyond pre-hire assessments, creating an experience that supports managers across the employee lifecycle.",
      "Weekly feedback only works if checking in is easy for employees and insights reach managers when they can act on them. So the real design question was where Check-Ins should meet each person: inside the tools they already use, like Teams, Slack, email and calendar, or inside Develop.",
    ],
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
    id: "principles",
    variant: "principles",
    items: [
      {
        title: "Ground every signal",
        body: "Scores inform a conversation; they never replace it.",
      },
      {
        title: "Meet managers in their workflow",
        body: "Insights surface where coaching already happens: check-ins and 1:1 prep.",
      },
      {
        title: "Make setup legible at scale",
        body: "Admins of 200+ person orgs should understand the impact of each step before they commit.",
      },
      {
        title: "Coach, don’t judge",
        body: "Language and visuals frame data as support for growth, not evaluation.",
      },
    ],
  },
  {
    id: "roles",
    variant: "job-stories",
    eyebrow: "Who we designed for",
    body: "Four roles touch a single weekly check-in, and each needs it at a different moment. I wrote each need as a job story: the situation first, then what the person wants and why. The situation is what decides the channel.",
    stories: [
      {
        role: "Individual contributor",
        when: "I wrap up my week",
        want: "to say what I did and what’s blocking me in a couple of minutes",
        so: "I get support before my 1:1 without writing a status report",
      },
      {
        role: "Individual contributor",
        when: "I look back on my time at a company",
        want: "to see my projects and growth in one place and credit the people who helped",
        so: "my check-ins build a record that works for me",
      },
      {
        role: "People manager",
        when: "I’m preparing for a 1:1",
        want: "to know what to talk about and why",
        so: "I can coach with confidence instead of decoding a mood score",
      },
      {
        role: "People manager",
        when: "someone on my team starts to struggle",
        want: "to notice early",
        so: "I can step in before it affects their work",
      },
      {
        role: "HR admin",
        when: "I roll out Check-Ins to a 200+ person organization",
        want: "to understand what each setup step does and who it affects",
        so: "I can launch without misconfiguring reports",
      },
      {
        role: "VP / C-suite",
        when: "I review the organization",
        want: "a high-level read on how teams are doing and where burnout may be building",
        so: "I can act where it matters without reading every check-in",
      },
    ],
  },
  {
    id: "coach-bo",
    variant: "side-to-side",
    eyebrow: "Coach Bo",
    body: [
      "Coach Bo is an AI coach that runs the weekly check-in as a conversation, asking “How was last week?”, “What did you accomplish this week?” and “What are you looking to accomplish next?”",
      "Check-Ins then uses sentiment analysis to turn those answers into reports for each role, from organizational health down to the mood and progress of a manager’s direct reports.",
    ],
  },
  {
    variant: "media",
    src: "/images/criteria/check_in_chat.mov",
    notes: [
      "An intuitive chat interface that helps employees think through their work, recognize patterns, and understand performance.",
      "How might we apply information from Coach Bo conversational experience to incentivize employees to complete weekly check-ins?",
    ],
    caption:
      "All roles are required to check-in with their managers weekly. I iterated and prototyped visual styles for an intelligent chat interface that matched our design system for Check-Ins.",
  },
  {
    variant: "side-to-side",
    eyebrow: "Where Coach Bo asks the questions",
    body: "Teams was where employees already were, but a plugin meant an app review, a second build and SSO we didn’t have yet. We evaluated three channels for the weekly questions and launched Coach Bo inside Develop first, which kept the conversation and sentiment pipeline in one place we controlled.",
  },
  {
    variant: "channel-options",
    options: [
      {
        name: "Weekly Coach Bo in Develop",
        decision: "Shipped",
        appeal: "Full control of the chat experience and sentiment pipeline; drives engagement in Develop",
        holdback: "Employees have to remember to open another product",
      },
      {
        name: "Teams / Slack plugin",
        decision: "Deferred",
        appeal: "Meets employees where they already talk; the least effort to answer",
        holdback: "Teams app review, a separate build per platform, and no SSO to link a chat account to Criteria",
      },
      {
        name: "Reply-by-email check-in",
        decision: "Explored",
        appeal: "Works for everyone with nothing to install; easy to roll out",
        holdback: "Free-text replies lose the conversational follow-ups that make Coach Bo useful",
      },
    ],
  },
  {
    id: "designing-for-trust",
    variant: "side-to-side",
    eyebrow: "Designing for trust in coaching signals",
    body: [
      "One of the most important challenges surfaced during the first iteration: the sentiment-analysis scores did not always accurately reflect employee performance. For a manager deciding how to coach a direct report, an inaccurate signal can quickly undermine confidence in the entire experience.",
      "Rather than treating sentiment scores as objective answers, I focused on helping managers understand the signals, interpret them in context, and confidently decide when to act. Trust became a core design principle for Check-Ins: every coaching signal needed to feel grounded enough to inform a conversation, not simply present a score. The goal was to move managers from “What does this score mean?” to “What should I do with this information?”",
      "I led a generative research study alongside a card sorting exercise with managers across domains and levels of leadership, to understand which information managers prioritize in 1:1s with their direct reports.",
    ],
  },
  {
    variant: "card-sort",
  },
  {
    id: "onboarding",
    variant: "side-to-side",
    eyebrow: "Onboarding + Admin Setup",
    lead: "HR admins needed to know what each setup step did, and who it affected, before rolling out to their whole organization.",
    body: "Onboarding a 200+ person organization to Weekly Check-Ins was confusing for HR admins: the original setup had no clear mental model or hierarchy. Before launch, I designed a system so admins at organizations of any size could onboard their employees with confidence. I explored lo-fidelity directions that built trust at scale while showing admins the impact of each high-intent step.",
  },
  {
    variant: "carousel",
    label: "Lo-fidelity onboarding directions",
    slides: [
      {
        src: "/images/criteria/onboarding-direction-1.png",
        alt: "Accordion-style onboarding checklist",
        caption: "An accordion-style checklist that expands each step in place.",
      },
      {
        src: "/images/criteria/LoFidelity2.png",
        alt: "Single-step wizard with a persistent side panel",
        caption:
          "A single-step wizard with a persistent side panel dedicated to explaining the trust and data implications of the step.",
      },
      {
        src: "/images/criteria/onboarding-direction-3.png",
        alt: "Lo-fidelity onboarding skeleton",
        caption:
          "An early lo-fidelity skeleton pass, focused purely on step structure and pacing — content and education framing came later.",
      },
    ],
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
    eyebrow: "From research to experience",
    body: "Depending on their role, managers care about employees finishing their weekly projects and hitting specific metrics. I worked out how to bring role-specific variables, like ARR for Customer Success and Sales, into a meaningful coaching experience for employees across different kinds of organizations.",
  },
  {
    variant: "media",
    src: "/images/criteria/check-indata.png",
    alt: "The sources feeding into Check-Ins: HRIS and org data, personality profiles, integrations, team KPIs, weekly data and soft skills guidance",
    bare: true,
  },
  {
    variant: "side-to-side",
    eyebrow: "Where insights reach managers and leaders",
    body: "Calendar and inbox were where managers prepared, but integrating them meant Outlook and Google Calendar APIs and SSO we didn’t have. As a new company bet, Develop also needed engagement inside the product. I designed the dashboard first, and pushed outward where it was cheap: leaders got an emailed digest.",
  },
  {
    variant: "channel-options",
    options: [
      {
        name: "Dashboard in Develop",
        serves: "managers",
        decision: "Shipped",
        appeal: "Mood, progress and 1:1 prep in one place, built on our own data and design system; keeps managers in Develop",
        holdback: "Managers have to come to it, and red/yellow/green states invite reading scores as verdicts",
      },
      {
        name: "Executive intelligence digest",
        serves: "managers, VPs and the C-suite",
        decision: "Shipped",
        appeal: "A high-level read on team health and burnout risk, with no login",
        holdback: "Needed automatic permissioning so each leader only sees their part of the org",
      },
      {
        name: "1:1 report in calendar or inbox",
        serves: "managers",
        decision: "Explored",
        appeal: "Arrives when managers prepare, with an energy-over-time preview and talking points",
        holdback: "Outlook and Google Calendar APIs, plus mapping calendar events to reporting lines",
      },
      {
        name: "Reminder synced to the upcoming 1:1",
        serves: "managers",
        decision: "Explored",
        appeal: "A light nudge tied to a real meeting",
        holdback: "The same calendar integration cost, and little value without the prep behind it",
      },
    ],
  },
  {
    variant: "solution-concepts",
    label: "Options we evaluated · Meeting people where they work",
  },
  {
    variant: "media",
    src: "/images/criteria/dashboard.mov",
    notes: [
      "Managers get a high-level view of each employee’s mood, progress and readiness scores week over week, along with their engagement with Coach Bo.",
      "1:1 prep guides surface what managers care about most, alongside each employee’s strengths and career motivators drawn from our pre-hire assessments.",
    ],
    caption:
      "A demo of the manager dashboard, built around what managers care about most when reviewing their direct reports. The red, yellow and green states come from the mood scores Coach Bo synthesizes.",
  },
  {
    variant: "side-to-side",
    eyebrow: "Permissioning the executive digest",
    body: "The digest went by email to managers and the C-suite. Access was inherited from the HRIS org chart, from the bottom up: a leader’s digest covers every team that rolls up to them, with no admin setting it up by hand. That turned an access-control problem into something HR admins already maintain.",
  },
  {
    id: "ic-incentive",
    variant: "side-to-side",
    eyebrow: "Giving ICs a reason to check in",
    body: [
      "Every insight a manager or leader sees depends on employees checking in each week, but the first version gave ICs almost nothing back. Most of the value flowed up the org chart.",
      "To close that loop, I explored a personal growth timeline. It turns each check-in into part of an IC’s own record, and lets them credit the teammates who helped. It was explored but not shipped.",
      "The timeline is fed by the check-in itself. Whatever an IC tells Coach Bo they finished becomes a project on their Career History, with the teammate they credited and links to the work, so there is no second place to log it.",
    ],
    orderedList: [
      "Every project logged through Coach Bo, laid out across their tenure",
      "Their progression over time, as a record they own",
      "Shout-outs to the colleagues who were pivotal to a project",
    ],
  },
  {
    variant: "check-in-flow",
    caption:
      "From check-in to Career History. Answer Coach Bo’s weekly check-in, where one follow-up asks who helped so they get a shout-out, then follow the project Bo logs onto Friday of the Career History board. Each completed project links straight to its outputs, so contributors can point to their work in conversations about growth.",
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
    id: "merchandising",
    variant: "side-to-side",
    eyebrow: "Merchandising Check-Ins in the product",
    body: [
      "Shipping Check-Ins to customers meant more than turning it on. Because it rolled out to accounts already using Develop, the product itself had to explain what Check-Ins was and why it mattered, right where managers already worked. I designed an in-app merchandising banner for the manager’s analytics dashboard that framed Check-Ins as management superpowers: AI-powered weekly conversations that give managers actionable insights and early warnings about their team.",
      "The banner opens a three-step walkthrough (How It Works, Why You Need It and What You Can Expect) that answers a manager’s questions in the order they ask them. Each step pairs a short value proposition with a quote from someone already using Check-Ins, set in its own container so the proof reads apart from the pitch. The last step ends on one clear path, Contact us, so curiosity could turn into a conversation without leaving the product.",
    ],
  },
  {
    variant: "merchandising",
    caption:
      "Exploring ways of showcasing inactive products, so Check-Ins could introduce itself inside a dashboard managers already use before their account turned it on. An interactive rebuild of the merchandising screens on the manager dashboard. Click Learn more to explore the merchandising experience that resulted in a 28% increase in engagement for clients using Develop.",
  },
  {
    id: "impact",
    variant: "default",
    eyebrow: "Impact",
    body: [
      [{ text: "The redesigned Check-Ins onboarding experience " }, { text: "launched to 5% of SMB accounts", bold: true }, { text: ", alongside a limited beta of Coaching v1: the weekly Coach Bo chat and the manager dashboard with 1:1 prep. The executive intelligence digest went out by email to managers and the C-suite, and the Check-Ins design system carried from Figma into TypeScript components. In-product merchandising " }, { text: "drove 28% engagement within existing Develop customers", bold: true }, { text: "." }],
      [{ text: "The work created a scalable onboarding foundation that enabled Criteria to expand Check-Ins to larger organizations.", bold: true }, { text: " I left before the remaining post-launch numbers were available." }],
    ],
  },
  {
    variant: "reflections",
    eyebrow: "What I’d do differently",
    items: [
      {
        title: "Plan the integration path from day one.",
        body: "Teams, Outlook and Google Calendar were where people worked, and building the identity and SSO foundation earlier would have let chat and 1:1 prep move there sooner.",
      },
      {
        title: "Lead with talking points, not scores.",
        body: "The dashboard’s red/yellow/green states pull managers toward reading verdicts, which is the trust problem the research flagged.",
      },
      {
        title: "Give ICs something back from the start.",
        body: "The whole system runs on IC participation, so the growth timeline belonged in v1.",
      },
      {
        title: "Channel is a design decision, not a delivery detail.",
        body: "Who gets value, when and where shapes whether a weekly habit forms at all.",
      },
    ],
  },
];

/* Card-sort exercise run with managers. Coordinates are px within a
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
