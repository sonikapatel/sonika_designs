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
      { id: "strategy", label: "Product Strategy" },
      { id: "principles", label: "Design Principles" },
      { id: "roles", label: "Who We Designed For" },
      { id: "coach-bo", label: "Coach Bo" },
      { id: "designing-for-trust", label: "Designing for Trust" },
      { id: "ai-uncertainty", label: "Designing for AI Uncertainty" },
    ],
  },
  {
    group: "BUILDING THE EXPERIENCE",
    items: [
      { id: "onboarding", label: "Onboarding + Admin Setup" },
      { id: "research-to-product", label: "From Research to Experience" },
      { id: "research", label: "Research" },
      { id: "ic-incentive", label: "Giving ICs a Reason" },
      { id: "design-system", label: "Design System" },
      { id: "merchandising", label: "In-Product Merchandising" },
      { id: "system", label: "System Before + After" },
      { id: "edge-cases", label: "Overview + Edge Cases" },
      { id: "heuristic-audit", label: "Heuristic Audit" },
      { id: "impact", label: "Impact" },
    ],
  },
];

export const CRITERIA_BLOCKS = [
  {
    id: "overview",
    variant: "default",
    eyebrow: "Overview",
    body: [
      [
        { text: "Weekly Check-Ins " },
        { text: "launched to 5% of mid-market accounts", bold: true },
        { text: ", and " },
        { text: "28% of existing Develop users checked out its in-product merchandising", bold: true },
        { text: " during the four-week rollout. I led design end to end, partnering with a PM and an engineer over six months." },
      ],
      "Managers lacked visibility into how their teams were doing week over week. Criteria’s post-hire suite, Develop, gives managers real-time, personalized coaching at scale. I designed the core experience for a new company bet: an AI-powered coaching product that surfaces relevant insights and recommends actions directly within a manager’s workflow. The product expanded Criteria’s talent management offering beyond pre-hire assessments, creating an experience that supports managers across the employee lifecycle.",
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
    id: "strategy",
    variant: "side-to-side",
    eyebrow: "Product strategy (proposed)",
    lead: "The strategy I’d take Check-Ins forward with focuses on mid-market companies, where a CHRO buys and managers use it every week.",
    agenda: [
      {
        title: "For",
        body: "CHROs at mid-market companies of 200 to 2,000 people, whose small People teams can’t see what’s happening across a growing layer of managers.",
      },
      {
        title: "Who struggle with",
        body: "Hearing about burnout and flight risk too late, in a yearly survey or an exit interview, while managers don’t know what to do in between and employees see no point in giving feedback.",
      },
      {
        title: "Check-Ins is",
        body: "A conversational check-in agent for continuous engagement and retention insight, linked to manager 1:1s.",
      },
      {
        title: "That",
        body: "Turns short weekly conversations into early signals and action. Employees get a 1:1 agenda they shape, personal insight and growth incentives. Managers get individual signals and talking points. Senior leaders and the CHRO see team and company-wide risk.",
      },
      {
        title: "Unlike",
        body: "Yearly and pulse surveys that give a score without the why, and 1:1 tools cut off from engagement data. TEAMscan is a complement, not an alternative: Check-Ins shows where and who; TEAMscan and Develop help fix it at the team level.",
      },
      {
        title: "Because",
        body: "Only Criteria owns the full loop: hire with assessments, listen with Check-Ins and 1:1s, develop with TEAMscan and Develop, backed by validated workforce science.",
      },
      {
        title: "Prove it by",
        body: "Testing the riskiest assumption: employees keep answering honestly each week when their manager sees individual signals, because they get value back. A six to eight week pilot with two or three mid-market design partners, with summaries written by hand.",
      },
      {
        title: "Measured by",
        body: "The share of at-risk signals that get a documented manager action within seven days. Leading signs: a week-12 response rate of 60% or more and 1:1s that use the check-in agenda. Lagging: less regretted attrition, renewals and expansion into Develop.",
      },
    ],
  },
  {
    variant: "side-to-side",
    eyebrow: "1:1s, incentives and guardrails",
    body: "The check-in becomes the 1:1 agenda: the employee picks the topics, the manager gets suggested talking points, and action items carry into the next check-in. Incentives reward showing up, never what someone says, starting with what employees get back: a private month in review, visible follow-through, and growth content from Develop.",
    agenda: [
      {
        title: "Employees see what their manager sees",
        body: "Every signal about an employee is visible to them, in the same words, and they choose what goes on the 1:1 agenda.",
      },
      {
        title: "Support prompts, not scores",
        body: "Managers see “check in about workload”, never “burnout risk: 82%”.",
      },
      {
        title: "Groups of five or more",
        body: "Rolled-up views for senior leaders need at least five people, so no one can be singled out.",
      },
      {
        title: "Reward participation, never content",
        body: "No incentive depends on sentiment, disclosure or a score improving, and there are no individual leaderboards.",
      },
      {
        title: "One privacy story",
        body: "The same promise about who sees what across Check-Ins, TEAMscan and Develop.",
      },
    ],
  },
  {
    id: "principles",
    variant: "principles",
    eyebrow: "Design principles",
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
        holdback: "Teams app review, a separate build per platform and no SSO to link a chat account to Criteria",
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
    variant: "side-to-side",
    eyebrow: "What managers prioritized",
    body: "Across 10 managers, the sort pointed the same way: managers wanted the context behind how someone was doing more than a measure of it. Each finding shaped what 1:1 prep shows first.",
    orderedList: [
      "Current blockers and this week’s wins ranked highest, so 1:1 prep opens with them, before any score.",
      "A trend over the past four weeks mattered more than a single week, so the dashboard shows mood, progress and readiness over time.",
      "Strengths and motivators were wanted but rarely at hand, so prep guides pull them in from each employee’s pre-hire assessments.",
    ],
  },
  {
    variant: "side-to-side",
    eyebrow: "Resolving the trust problem",
    body: [
      "The research gave the trust problem its answer: a score was only as useful as the reason behind it. So every signal explains itself. Each mood and progress score links back to the check-in answers it came from, and 1:1 prep leads with talking points drawn from those answers, not the number.",
    ],
  },
  {
    id: "ai-uncertainty",
    variant: "side-to-side",
    eyebrow: "Designing for AI uncertainty",
    lead: "Coach Bo’s reads could be wrong, so the design never asked managers to take them on faith.",
    agenda: [
      {
        title: "Design the conversation, not just the screen",
        body: "I designed Coach Bo’s conversation flow: the three weekly questions, their order, and a follow-up asking who helped, so every answer had a job downstream. Engineering turned that flow into the prompts.",
      },
      {
        title: "Show where every score came from",
        body: "Each mood and progress score links back to the check-in answers behind it, so a manager can check the AI’s read against what the employee actually said.",
      },
      {
        title: "Lead with what was said, not the score",
        body: "1:1 prep opens with blockers and wins from the employee’s own answers, so an inaccurate score can’t set the agenda for the conversation.",
      },
      {
        title: "Let managers correct the read (proposed)",
        body: "In the v2 direction I proposed, managers can flag a signal that looks wrong, and that flag improves the next read. This was not shipped.",
      },
    ],
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
    variant: "side-to-side",
    eyebrow: "What I’d change next: show value sooner (proposed)",
    body: "The shipped setup asked admins for effort at every step and gave value back only at launch. Applying research on AI product onboarding, I’d open with one question about the admin’s goal and shape the rest around it, bring the org in from the HRIS instead of typing it, start with a pilot team, and let the admin answer a check-in themselves so the first 1:1 brief they see is built from their own words. This direction was not built.",
  },
  {
    variant: "onboarding-flow",
    caption:
      "A video prototype of the proposed onboarding, playing with a sample org. The admin picks a goal, and the side panel shows what Check-Ins will do for them. They import the org, pick a pilot team and see the first question Bo will ask it. Then they see the insight each level of the org gets from the same check-ins: an employee’s Career History, a manager’s 1:1 prep and a leader’s weekly digest of org and team health, burnout trends and wins. Finally, they answer a check-in themselves and launch.",
  },
  {
    id: "research-to-product",
    variant: "side-to-side",
    eyebrow: "From research to experience",
    body: "Depending on their role, managers care about employees finishing their weekly projects and hitting specific metrics. I worked out how to bring role-specific variables, like ARR for Customer Success and Sales, into a meaningful coaching experience for employees across different kinds of organizations.",
  },
  {
    variant: "data-sources",
    alt: "The sources feeding into Check-Ins: HRIS and org data, personality profiles, integrations, team KPIs, weekly data and soft skills guidance",
  },
  {
    variant: "side-to-side",
    eyebrow: "Where insights reach managers and leaders",
    body: "Managers prepared for 1:1s in their calendar and inbox, but meeting them there meant building on the Outlook and Google Calendar APIs and an SSO foundation we didn’t have yet. Develop, a new bet for the company, also needed people engaging inside the product. So I started with the dashboard in Develop and reached beyond it only where that was cheap: leaders received the insights as an emailed digest.",
  },
  {
    variant: "solution-concepts",
    label: "Options we evaluated · Meeting people where they work",
  },
  {
    variant: "dashboard-variations",
    variations: [
      {
        name: "Direct manager",
        src: "/images/criteria/dashboard.mov",
        alt: "A recording of the manager dashboard: Your focus and Your mantra above the check-in overview, which switches from a card for each of eight reports to the team’s completion, mood and progress.",
        notes: [
          "Managers get a high-level view of each employee’s mood, progress and readiness scores week over week, along with their engagement with Coach Bo.",
          "1:1 prep guides surface what managers care about most, alongside each employee’s strengths and career motivators drawn from our pre-hire assessments.",
        ],
        caption:
          "A demo of the manager dashboard, built around what managers care about most when reviewing their direct reports. The red, yellow and green states come from the mood scores Coach Bo synthesizes.",
      },
      {
        name: "Exec level",
        alt: "The exec level dashboard in the manager dashboard’s visual treatment, scrolling by itself: Monday Executive Intelligence for the week of 11/10, with what you should know, suggested next steps grouped by team, weekly participation 54%, organization mood 3.9 of 5, three early signals and four teams with their participation and mood.",
        notes: [
          "Leaders get weekly participation, organization mood and the early signals raised across the business, with each team’s participation and mood.",
          "What you should know and the suggested next steps turn those signals into something to act on that week.",
        ],
        caption:
          "The exec level dashboard, in the manager dashboard’s visual treatment and playing on a loop. It carries the illustrative Monday Executive Intelligence content from the report previews in the merchandising section.",
      },
    ],
  },
  {
    id: "research",
    variant: "side-to-side",
    eyebrow: "Research: what managers said after launch",
    body: "Once Check-Ins was in use inside Criteria, I interviewed four managers and leaders and one individual contributor across People, Customer Success and Account Management. It was a preliminary round, separate from the card sort, and it showed where the dashboard held up and where it didn’t.",
    orderedList: [
      "Mood and the overall score were the signals managers read. Three of the four set aside at least one of progress, readiness, burnout or turnover risk as unclear, less relevant or too loosely defined.",
      "A score sent them to ask, not to conclude. Three of the four treated a dip as a reason to talk to the person, and wanted the trend to tell a bad week from a pattern.",
      "The value grew with distance from the team. A manager of a ten-person team already knew who was unhappy, while a People leader said Check-Ins “opens up a blindspot” across the business.",
      "People checked in when their manager answered. One team held 100% participation, and their manager put part of that down to replying to what they wrote.",
    ],
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
      "The interviews after launch pointed the same way. The individual contributor I spoke with reread each summary Coach Bo wrote to check what was being reported to their manager, and one manager said flatly: “I’m not going to use something unless it’s going to remind me to use it.”",
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
      "From check-in to Career History. Answer Coach Bo’s weekly check-in, where one follow-up asks who helped so teammates get a shout-out, then follow the project Bo logs onto Friday of the Career History board. Each completed project links straight to its outputs, so contributors can point to their work in conversations about growth.",
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
      "I explored ways to showcase inactive products, so Check-Ins could introduce itself inside a dashboard managers already used before their account turned it on. This is an interactive rebuild of the merchandising screens on the manager dashboard. Click Learn more to explore the merchandising experience, which 28% of existing Develop users checked out during the four-week rollout.",
  },
  {
    id: "system",
    variant: "side-to-side",
    eyebrow: "The system, before and after",
    body: [
      "Check-Ins v1 worked as one pipeline: a chat in Develop became scores, and those scores flowed up to managers and leaders. The constraints above made that the right way to launch, but ICs carried the system and got little back.",
      "Looking at it as a whole, I’d propose keeping Coach Bo and the org-chart permissions while changing three things: where the check-in happens, what the signal is made of, and what each role receives. This is my proposed direction, not something that shipped.",
    ],
  },
  {
    variant: "system-diagram",
    views: [
      {
        key: "before",
        tab: "Before",
        status: "Check-Ins v1, as shipped",
        capture: {
          title: "Coach Bo in Develop",
          body: "ICs answer three weekly questions in chat but have to remember to open another product.",
          tag: "Gap",
        },
        signal: {
          title: "Sentiment analysis",
          body: "Answers become mood, progress and readiness scores, each linked to its source answers. Red, yellow and green states can still read as verdicts.",
          tag: "Gap",
        },
        delivery: [
          {
            role: "IC",
            title: "Little comes back",
            body: "The growth timeline was explored but not shipped.",
            tag: "Gap",
          },
          {
            role: "Manager",
            title: "Dashboard in Develop",
            body: "Scores week over week, plus 1:1 prep with strengths and motivators from pre-hire assessments.",
          },
          {
            role: "C-suite",
            title: "Emailed digest",
            body: "A high-level read on how teams are doing, scoped to the teams that roll up to them.",
          },
        ],
        loop: {
          title: "Open loop",
          body: "Every insight depends on ICs checking in, but most of the value flows up the org chart.",
          tag: "Gap",
        },
        foundation: [
          {
            title: "HRIS org chart",
            body: "Sets reporting lines and who can see each digest.",
          },
          {
            title: "No SSO yet",
            body: "Teams, Slack and calendar delivery stayed out of reach.",
            tag: "Gap",
          },
        ],
      },
      {
        key: "after",
        tab: "After (proposed)",
        status: "Proposed direction, not shipped",
        capture: {
          title: "Coach Bo where people work",
          body: "ICs answer in Teams or Slack, with Develop as the fallback. It’s the same conversation in every channel.",
          tag: "Changed",
        },
        signal: {
          title: "Context layer",
          body: "Answers become blockers, wins, projects, shout-outs and a four-week trend. Sentiment is one input, and every signal cites the answers behind it.",
          tag: "Changed",
        },
        delivery: [
          {
            role: "IC",
            title: "Career History",
            body: "Each check-in adds projects and shout-outs to a record they own.",
            tag: "New",
          },
          {
            role: "Manager",
            title: "1:1 prep in the calendar",
            body: "Talking points come first in Outlook or Google Calendar, with trends and early flags in Develop.",
            tag: "Changed",
          },
          {
            role: "C-suite",
            title: "Trend digest",
            body: "Rolled-up team health and burnout trends, without individual check-ins.",
            tag: "Changed",
          },
        ],
        loop: {
          title: "Closed loop",
          body: "ICs get value every week, which supports the habit. Managers flag signals that look wrong, which improves the next read.",
          tag: "New",
        },
        foundation: [
          {
            title: "HRIS org chart",
            body: "Still sets reporting lines and permissions, with no manual setup.",
          },
          {
            title: "SSO and shared identity",
            body: "Links one person across channels. This comes first, since the channel and calendar work depend on it.",
            tag: "New",
          },
        ],
      },
    ],
    caption:
      "A simplified product view of Check-Ins for ICs, managers and the C-suite. Moving into Teams would also mean an app review and a separate build per platform, so I’d sequence SSO and the IC record first.",
  },
  {
    id: "edge-cases",
    variant: "side-to-side",
    eyebrow: "Product overview",
    body: [
      "Weekly Check-Ins is an AI coaching product inside Criteria Develop, built for mid-market companies of 200 to 2,000 people. At that size a CHRO leads a small People team that can’t see what’s happening across a growing layer of managers, and finds out about burnout and flight risk too late.",
      "Each week Coach Bo asks employees three questions in a short conversation, and Check-Ins turns the answers into what each role needs: 1:1 prep for managers and a weekly digest of team health, burnout trends and wins for leaders and the CHRO. A personal Career History for individual contributors is the proposed next step.",
      "Access follows the HRIS org chart, so each person sees only the teams that roll up to them, with no one in HR setting it up by hand. Pre-hire assessments bring each employee’s strengths and motivators into 1:1 prep, and TEAMscan stays the quarterly read on how a team works together.",
    ],
  },
  {
    variant: "side-to-side",
    eyebrow: "Edge cases for mid-market customers",
    lead: "Mid-market companies of 200 to 2,000 people grow, re-org and hire in waves, with a People team of a few people, so every state has to hold up when the data is missing, thin or changing.",
    agenda: [
      {
        title: "No check-in is not a good week",
        body: "A missed week shows as “No check-in” with the date of the last one, never as a neutral score. Streaks pause for PTO and leave pulled from the HRIS.",
      },
      {
        title: "Hiring waves have no baseline",
        body: "When a company hires dozens of people in a quarter, new hires show “Building baseline” for their first four check-ins, so one week can’t read as a pattern.",
      },
      {
        title: "Managers of managers see patterns",
        body: "Direct managers see their own reports. Skip-level managers, department heads and the CHRO see rolled-up patterns, and any view under five people rolls up to the next level.",
      },
      {
        title: "Not everyone works in Develop",
        body: "Hourly, field and frontline employees without a Develop login get the check-in by email or text link, at the end of their own week and time zone.",
      },
      {
        title: "Employees see what their manager sees",
        body: "Before a summary is shared, the employee can review and edit it, so the manager never sees a read the employee hasn’t.",
      },
      {
        title: "Some answers need a person, not a score",
        body: "If someone describes distress, Coach Bo shares support resources right away and follows the company’s escalation policy, instead of waiting for Monday’s prep.",
      },
      {
        title: "The org chart changes mid-cycle",
        body: "After a re-org or manager change, history stays with the employee and a new manager sees check-ins from their start date. People synced without a manager are flagged in setup, not dropped.",
      },
      {
        title: "Low participation lowers confidence",
        body: "When fewer than half a team checks in, the digest shows participation next to mood and marks the read as low confidence.",
      },
    ],
  },
  {
    id: "heuristic-audit",
    variant: "side-to-side",
    eyebrow: "Heuristic audit of the prototypes",
    lead: "I audited each prototype against Nielsen’s ten usability heuristics, rating severity from 0 to 4, where 4 must be fixed before release.",
    agenda: [
      {
        title: "Manager dashboard · Severity 3",
        body: "Red, yellow and green states, “Mood score: 2” and “Needs support” read as verdicts (match the real world), and progress, readiness and burnout are never defined (help and documentation). Lead with talking points, and give each score a one-line definition and its source answers.",
      },
      {
        title: "Promotion readiness · Severity 3",
        body: "“On par for a promotion in Q1 2026” is inferred from sentiment (error prevention). Remove it, or show the evidence behind it.",
      },
      {
        title: "Coach Bo check-in · Severity 3",
        body: "Employees can’t review or edit the summary before it’s shared with their manager (user control and freedom). Add a review step before sharing.",
      },
      {
        title: "Executive digest · Severity 3",
        body: "Mood for a small team can point to individuals (error prevention), and it shows even when few people checked in (visibility of system status). Roll up groups under five and mark low-participation reads as low confidence.",
      },
      {
        title: "Onboarding setup · Severity 3",
        body: "The HRIS import only shows success, with no partial sync or missing-manager state (error recovery), and Continue is disabled without saying why. Flag people who couldn’t be placed and explain what’s missing inline.",
      },
      {
        title: "Skipped check-ins · Severity 2",
        body: "“Skipped check-ins, 3 weeks” gives the manager no next step (error recovery). Suggest an action, and pause the count for PTO and leave.",
      },
      {
        title: "Merchandising and Career History · Severity 2",
        body: "“Book demo” sends at once with no confirmation, and a project Coach Bo logs can’t be edited or removed (user control and freedom). Confirm before sending and let employees edit their record.",
      },
      {
        title: "Unsourced claim · Severity 1",
        body: "The “20X more engagement” quote has no source (match the real world). Attribute it or soften it.",
      },
    ],
  },
  {
    id: "impact",
    variant: "default",
    eyebrow: "Impact",
    body: [
      [{ text: "The redesigned Check-Ins onboarding experience " }, { text: "launched to 5% of mid-market accounts", bold: true }, { text: ", alongside a limited beta of Coaching v1: the weekly Coach Bo chat and the manager dashboard with 1:1 prep. The executive intelligence digest went out by email to managers and the C-suite, and the Check-Ins design system carried from Figma into TypeScript components. In-product merchandising " }, { text: "was checked out by 28% of existing Develop users", bold: true }, { text: " during the four-week rollout." }],
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
        body: "The dashboard’s red/yellow/green states pull managers toward reading verdicts, which is the trust problem the research flagged. In the interviews after launch, managers read mood and the written summaries and passed over the scores they couldn’t explain.",
      },
      {
        title: "Give ICs something back from the start.",
        body: "The whole system runs on IC participation, so the growth timeline belonged in v1.",
      },
      {
        title: "Channel is a design decision, not a delivery detail.",
        body: "Who gets value, and when and where, shapes whether a weekly habit forms at all.",
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
    { label: "Next Week’s Goals", start: { x: 265, y: 167 }, end: { x: 68, y: 169 } },
    { label: "Current Blockers", start: { x: 524, y: 56 }, end: { x: 259, y: 145 } },
    { label: "Over the Past 4 Weeks", start: { x: 789, y: 63 }, end: { x: 436, y: 156 } },
    { label: "Growth and Development", start: { x: 642, y: 120 }, end: { x: 873, y: 113 } },
    { label: "Wins and Achievements This Week", start: { x: 760, y: 209 }, end: { x: 724, y: 109 } },
  ],
};
