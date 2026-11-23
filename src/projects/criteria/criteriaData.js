/* DRAFT (branch criteria-esg-draft): the Criteria case study re-ordered to follow the
   ESG Labs case study structure (davidhall.io/esg), told from the approved Weekly
   Check-ins MVP strategy. Complex blocks (job stories, channel options, dashboards,
   system diagram, merchandising, flows, reflections) are reused unchanged from
   criteriaDataV1.js, the copy that was live before this draft.
   Facts are drawn from the v1 case study; nothing here is new data. */

import { CRITERIA_BLOCKS as V1, CARD_SORT } from "./criteriaDataV1";

export { CARD_SORT };

const pick = (variant) => {
  const block = V1.find((b) => b.variant === variant);
  if (!block) throw new Error(`criteriaData: no v1 block with variant "${variant}"`);
  return block;
};

export const CRITERIA = {
  slug: "criteria",
  company: "Criteria",
  title: "Weekly Check-Ins",
  subtitle: "Designing Criteria’s first AI check-in product, from a limited launch to a mid-market bet",
  hero: {
    image: "/images/banner_images/Criteria_Header.png",
    alt: "Weekly Check-Ins career history and 1:1 preparation views",
    bleed: true,
    bg: "#16112E",
  },
};

export const CRITERIA_NAV = [
  {
    group: "THE BET",
    items: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "The Problem" },
      { id: "goals", label: "Goals" },
      { id: "buyer", label: "Selling to the CHRO" },
    ],
  },
  {
    group: "BUILDING IT",
    items: [
      { id: "research", label: "Research" },
      { id: "findings", label: "Findings" },
      { id: "v1-to-mvp", label: "From v1 to the Bet" },
      { id: "coach-bo", label: "Coach Bo + AI" },
      { id: "tradeoffs", label: "Trade-offs" },
      { id: "guardrails", label: "Guardrails" },
      { id: "design-system", label: "Design System" },
      { id: "solution", label: "The MVP" },
    ],
  },
  {
    group: "WHAT WE KNOW",
    items: [
      { id: "outcomes", label: "What We Know" },
      { id: "learnings", label: "Learnings" },
    ],
  },
];

export const CRITERIA_BLOCKS = [
  /* ── Hero: intro, at-a-glance card, stat row ───────────────────────────── */
  {
    id: "overview",
    variant: "default",
    eyebrow: "Overview",
    body: [
      "Criteria knew its customers from pre-hire assessments, and TEAMscan told them how their teams were doing each quarter. Customers kept asking for something more frequent. With a PM and an engineer, I designed Weekly Check-Ins, where an AI coach named Coach Bo turns a short weekly conversation into 1:1 prep for managers and early signals for leaders.",
      [
        { text: "The first version (v1) reached " },
        { text: "5% of mid-market accounts", bold: true },
        { text: ". What we learned from it became the bet I’d take forward: a check-in agent for mid-market CHROs, built around the manager 1:1." },
      ],
    ],
  },
  {
    variant: "at-a-glance",
    eyebrow: "At a glance",
    items: [
      { title: "Role", body: "Product design lead, end to end" },
      { title: "Team", body: "Me, a PM and an engineer, inside Criteria’s Develop suite" },
      { title: "Timeline", body: "6 months" },
      {
        title: "Status",
        body: "The first version launched to 5% of mid-market accounts. The MVP strategy below is proposed, and its pilot hasn’t run.",
      },
      {
        title: "I owned", wide: true,
        body: "Coach Bo’s conversation design, 1:1 prep and dashboards, admin onboarding, in-product merchandising, the design system and the product strategy",
      },
      {
        title: "I influenced", wide: true,
        body: "The prompts, which engineering built from my conversation flow, and the sentiment analysis behind the scores",
      },
    ],
  },

  /* ── 01 The problem ────────────────────────────────────────────────────── */
  {
    id: "problem",
    variant: "side-to-side",
    eyebrow: "Hearing about burnout too late",
    body: "Mid-market People teams find out about burnout and flight risk after it’s too late to act. A People leader in our post-launch interviews said Check-Ins “opens up a blindspot” across the business.",
    agenda: [
      { title: "Too late", body: "People teams learn about burnout and flight risk from a yearly survey or an exit interview." },
      { title: "Nothing in between", body: "Managers don’t know what to do between surveys, and the score never says why." },
      { title: "No reason to answer", body: "Employees see little point in giving feedback that only flows up." },
    ],
  },
  {
    variant: "media",
    src: "/images/criteria/og_check-ins.png",
    alt: "The elements that go into the Check-Ins experience",
    bare: true,
  },

  /* ── 02 Goals ──────────────────────────────────────────────────────────── */
  {
    id: "goals",
    variant: "side-to-side",
    eyebrow: "Goals and how we’d know",
    body: "I set these goals for the MVP pilot to tell whether the bet works. They’re proposed: the pilot hasn’t run yet.",
    agenda: [
      {
        title: "North star: managers act on early signals",
        body: "The share of at-risk signals that get a documented manager action, in a 1:1 or otherwise, within seven days.",
      },
      {
        title: "Employees keep checking in",
        body: "A week-12 IC response rate of 60% or more.",
      },
      {
        title: "Employees stay candid",
        body: "Answers stay honest over time, even though managers see individual signals.",
      },
      {
        title: "The 1:1 runs on the check-in",
        body: "The share of 1:1s that use the check-in agenda.",
      },
      {
        title: "ICs get value back",
        body: "70% or more of ICs say “this helps me.”",
      },
      {
        title: "The business case",
        body: "Lagging signs: less regretted attrition against the baseline, renewals and expansion into Develop and TEAMscan.",
      },
    ],
  },

  /* ── 04 Why the CHRO ───────────────────────────────────────────────────── */
  {
    id: "buyer",
    variant: "side-to-side",
    eyebrow: "Selling to the CHRO",
    body: "The buyer is the CHRO at a mid-market company of 200 to 2,000 people, whose small People team can’t see across a growing layer of managers. They need to learn where burnout is building before the yearly survey. But the product only works if three other people use it every week: the employee who checks in, the manager who preps the 1:1, and the leader who reads the digest.",
    agenda: [
      { title: "Early signal", body: "Where risk is building, not who to blame." },
      { title: "Manager action", body: "The 1:1 is where something changes." },
      { title: "Participation", body: "Employees have to get value back, or the signal dries up." },
    ],
  },
  pick("job-stories"),

  /* ── 05 Research ───────────────────────────────────────────────────────── */
  {
    id: "research",
    variant: "side-to-side",
    eyebrow: "What we learned, before and after v1",
    agenda: [
      {
        title: "Before v1: card sort",
        body: "Ten managers across functions and levels ranked what they need in a 1:1 with a direct report.",
      },
      {
        title: "After v1: interviews",
        body: "Once Check-Ins was in use inside Criteria, I interviewed four managers and leaders and one IC in People, Customer Success and Account Management. It was a preliminary round.",
      },
    ],
  },
  pick("card-sort"),

  /* ── 06 Findings ───────────────────────────────────────────────────────── */
  {
    id: "findings",
    variant: "side-to-side",
    eyebrow: "What managers and ICs told us",
    lead: "The last finding is the riskiest assumption behind the whole product.",
    body: "Every insight depends on employees answering honestly each week, and v1 gave them almost nothing in return.",
    orderedList: [
      "Context over scores. Blockers and wins ranked highest, so 1:1 prep opens with them, before any score.",
      "Trend over a single week. A four-week trend mattered more than a single week, so the dashboard shows mood, progress and readiness over time.",
      "A score is a reason to ask. Three of four managers treated a dip as a cue to talk, and three of four set aside at least one score as unclear.",
      "Value grows with distance. A manager of ten already knew who was unhappy; a People leader didn’t.",
      "ICs got little back. The IC we interviewed reread every summary to check what their manager would see, and one manager said they wouldn’t use a tool unless it reminded them to.",
    ],
  },

  /* ── 07 From v1 to the MVP bet ─────────────────────────────────────────── */
  {
    id: "v1-to-mvp",
    variant: "side-to-side",
    eyebrow: "From v1 to the MVP bet",
    orderedList: [
      "Demand. TEAMscan customers asked for more frequent feedback.",
      "Card sort. Ten managers ranked what they need in a 1:1.",
      "First build. I designed Coach Bo in Develop, 1:1 prep, the exec digest and admin onboarding.",
      "Rollout. Check-Ins reached 5% of mid-market accounts, and 28% of Develop users opened the merchandising.",
      "Post-launch interviews. I spoke with four managers and leaders and one IC.",
      "Proposed: MVP strategy. A check-in agent for mid-market CHROs, built around the 1:1.",
      "Proposed: pilot. A 6–8 week pilot with two or three mid-market design partners.",
    ],
  },
  {
    variant: "side-to-side",
    eyebrow: "The bet (proposed)",
    body: "The bet is a conversational check-in agent for continuous engagement and retention insight, linked to manager 1:1s and built for CHROs at mid-market companies of 200 to 2,000 people. Their small People teams can’t see what’s happening across a growing layer of managers, so they hear about burnout and flight risk too late, in a yearly survey or an exit interview, while managers don’t know what to do in between and employees see no point in giving feedback. Unlike yearly and pulse surveys, which give a score without the why, Check-Ins shows where risk is building and who needs support. TEAMscan and Develop then help fix it at the team level, so TEAMscan is a complement, not an alternative. And only Criteria owns the full loop: hire with assessments, listen with Check-Ins and 1:1s, develop with TEAMscan and Develop, backed by validated workforce science.",
  },
  pick("system-diagram"),

  /* ── 08 Coach Bo + AI uncertainty ──────────────────────────────────────── */
  {
    id: "coach-bo",
    variant: "side-to-side",
    eyebrow: "Designing Coach Bo for AI uncertainty",
    lead: "Coach Bo’s reads could be wrong, so the design never asked managers to take them on faith.",
    body: "Sentiment scores didn’t always reflect how someone was really doing, and for a manager deciding how to coach, a wrong signal could undermine the whole product.",
    agenda: [
      {
        title: "Design the conversation, not just the screen",
        body: "I designed three weekly questions, their order and a follow-up asking who helped, so every answer had a job downstream.",
      },
      {
        title: "Show where every score came from",
        body: "Each mood and progress score links back to the check-in answers behind it.",
      },
      {
        title: "Lead with what was said",
        body: "1:1 prep opens with blockers and wins from the employee’s own answers, so a bad score can’t set the agenda.",
      },
      {
        title: "Let managers correct the read (proposed)",
        body: "Managers can flag a signal that looks wrong, and the flag improves the next read. Not shipped.",
      },
    ],
  },
  {
    variant: "media",
    src: "/images/criteria/check_in_chat.mov",
    caption: "Coach Bo’s weekly check-in. Shipped in v1, inside Develop.",
  },
  pick("data-sources"),

  /* ── 09 Trade-offs ─────────────────────────────────────────────────────── */
  {
    id: "tradeoffs",
    variant: "side-to-side",
    eyebrow: "Trade-offs: where Coach Bo lives",
    body: "Employees spent their days in Teams and Slack, but a plugin meant an app review, a second build and SSO we didn’t have yet. Engineering wanted one pipeline we controlled; I wanted answering to take as little effort as possible. We launched inside Develop and sent leaders an email digest, the one cheap way to reach outside the product.",
  },
  pick("channel-options"),
  pick("solution-concepts"),

  /* ── 10 Guardrails ─────────────────────────────────────────────────────── */
  {
    id: "guardrails",
    variant: "side-to-side",
    eyebrow: "Guardrails and trust patterns",
    body: "Each guardrail is marked with where v1 stood. Parts of v1 break them, and the strategy fixes that.",
    agenda: [
      {
        title: "Employees see what their manager sees",
        body: "v1: partial. Scores link to the answers, but there’s no review step before sharing. MVP: proposed.",
      },
      {
        title: "Support prompts, not scores",
        body: "v1: not yet. It shows red, yellow and green states and promotion readiness. MVP: managers see “check in about workload,” never “burnout risk: 82%.”",
      },
      {
        title: "Groups of five or more",
        body: "v1: no minimum, so mood for a small team could point to individuals. MVP: rolled-up views need at least five people.",
      },
      {
        title: "Reward participation, never content",
        body: "Not in v1. MVP: no incentive depends on sentiment or scores, and there are no leaderboards.",
      },
      {
        title: "One privacy story",
        body: "Not in v1. MVP: the same promise about who sees what across Check-Ins, TEAMscan and Develop.",
      },
    ],
  },

  /* ── 11 Design system ──────────────────────────────────────────────────── */
  {
    id: "design-system",
    variant: "header",
    eyebrow: "Design system",
    body: "I built semantic tokens for Check-Ins on Prehire’s existing palette, so one visual language ran from Figma into TypeScript components.",
  },
  {
    variant: "media",
    src: "/images/criteria/DSWebsite.png",
    alt: "The Check-Ins design system documentation site",
    bare: true,
  },

  /* ── 12 The MVP ────────────────────────────────────────────────────────── */
  {
    id: "solution",
    variant: "side-to-side",
    eyebrow: "The MVP: check-in → 1:1 → signal",
    agenda: [
      {
        title: "Employee",
        body: "Shipped: the weekly Coach Bo check-in. Proposed: a review step before sharing, a choice of 1:1 topics, a private month in review and Career History.",
      },
      {
        title: "Manager",
        body: "Shipped: the dashboard, with 1:1 prep and each employee’s strengths and motivators from pre-hire assessments. Proposed: a shared 1:1 agenda, suggested talking points and action items carried into the next check-in.",
      },
      {
        title: "Leader and CHRO",
        body: "Shipped: the emailed exec digest, scoped through the HRIS org chart. Proposed: a trend digest with no individual check-ins.",
      },
      {
        title: "HR admin",
        body: "Shipped: onboarding setup. Proposed: goal-first onboarding with a pilot team.",
      },
      {
        title: "Out of the MVP",
        body: "A full 1:1 suite, monetary rewards, enterprise controls, SMB self-serve and per-employee flight-risk scores.",
      },
    ],
  },
  pick("dashboard-variations"),
  {
    variant: "media",
    src: "/images/criteria/onboarding-sept4.mov",
    caption: "Shipped: admin onboarding setup, with in-progress and complete states.",
  },
  pick("onboarding-flow"),
  pick("check-in-flow"),
  pick("merchandising"),

  /* ── 13 Outcomes ───────────────────────────────────────────────────────── */
  {
    id: "outcomes",
    variant: "side-to-side",
    eyebrow: "What we know so far",
    body: "Here’s what v1 showed, matched to the goal each signal points toward and labeled by type. The goals themselves aren’t measured: the pilot hasn’t run, and I left before more post-launch numbers came in.",
    agenda: [
      {
        title: "The business case · Measured in v1",
        body: "The first version launched to 5% of mid-market accounts, and 28% of existing Develop users opened the merchandising in four weeks.",
      },
      {
        title: "Employees keep checking in · Qualitative, one team",
        body: "One team held 100% participation; their manager credited replying to what people wrote.",
      },
      {
        title: "Managers act on early signals · Qualitative, n=4",
        body: "Three of four managers used a dip as a reason to talk to the person.",
      },
      {
        title: "MVP targets · Not measured",
        body: "The MVP pilot hasn’t run. This is the honest gap.",
      },
    ],
  },

  /* ── 14 Learnings ──────────────────────────────────────────────────────── */
  { ...pick("reflections"), id: "learnings" },
];
