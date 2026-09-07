/* Content for the hbh-3 portfolio detail page.

   Mirrors the Figma "portfolio-case-study" frame (node 1486:5717). Every prose block
   declares a `variant` matching one of the four Figma `Sections` component variants —
   default / header / three-column / side-to-side — and the richer artifacts (research
   boards, media, screenshot strip) are their own block types. Blocks carrying an `id`
   are the scroll anchors the sidebar navigates to and highlights. */

export const HBH3 = {
  slug: "hbh-3",
  company: "Honeybee Health",
  title: "Honeybee Health",
  subtitle: "Enabling e-prescription workflows",
  /* Same gate as the honeybee-health entry in projectData.js. */
  protected: "sp_project",
  hero: {
    image: "/images/hbh/HBH1.png",
    alt: "Hey Jane intake, Honeybee shipping confirmation, and the Nectar prescribing screen",
  },
};

/* Sidebar groups. `id` on each item points at the block that owns the anchor. */
export const HBH3_NAV = [
  {
    group: "NECTAR",
    items: [
      { id: "nectar-overview", label: "Overview" },
      { id: "initial-assumptions", label: "Initial Assumptions" },
      { id: "market-research", label: "Market Research" },
      { id: "becoming-my-users", label: "Becoming My Users" },
      { id: "competitor-research", label: "Competitor Research" },
      { id: "design-process", label: "Design Process" },
      { id: "the-prototype", label: "The Prototype" },
      { id: "reflection", label: "Reflection" },
    ],
  },
  {
    group: "VRPH",
    items: [
      { id: "vrph-overview", label: "Overview" },
      { id: "vrph-prototype", label: "Prototype" },
      { id: "vrph-outcomes", label: "Outcomes" },
    ],
  },
];

export const HBH3_BLOCKS = [
  {
    id: "nectar-overview",
    variant: "default",
    eyebrow: "Overview",
    body: "Honeybee Health is a fully virtual pharmacy that provides patients direct to doorstep medications. Starting out as a fully e-commerce pharmacy, and expanding into more partner driven verticals, I led the user experience for virtual pharmacy as a service, Nectar, and internal tools to assist with operational improvements.",
  },
  {
    id: "initial-assumptions",
    variant: "header",
    eyebrow: "Nectar   an e-prescription tool for womens' health providers",
    body: "Producing Nectar was halted given EHR integration would be a limiting factor for prescribers to switch to a tool like Nectar, uncovered through persistent research with clinicians. Aside from the core user experience, we instead created an opportunity for providers to see prescription data they’ve sent to Honeybee Health.",
  },
  {
    id: "market-research",
    variant: "side-to-side",
    eyebrow: "EXISTING ISSUES",
    body: "Doctors at telehealth partners with Honeybee Health are typically prescribing medications from applications like Tebra, Dosespot, and MD tool box. Seeing around 15-30 patients a day, specifically for womens’ health medication abortion, these doctors are concerned about patient privacy, especially with concerning medication abortion laws in place. ",
    orderedList: [
      "Existing solutions data policies don’t protect patient privacy. ",
      "Providers are typically prescribing usual bundles for MAB patients.",
    ],
  },
  {
    id: "becoming-my-users",
    variant: "side-to-side",
    eyebrow: "ThE CORE UX",
    body: "How might we protected the privacy and safety of medication abortion patients and prescribers? ",
  },
  {
    id: "competitor-research",
    variant: "side-to-side",
    eyebrow: "RESEARCH",
    body: "I led user research with 7 clinicians to better understand their pain points with existing e-prescription tools, including Tebra, Dosespot, and Toolbox MD. After mapping research insights from current clinician behaviors to MVP goals and design opportunities, I leveraged findings to design a prototype that would enable Honeybee Health to offer value to teleheatlh partners who are already worried about medication privacy with these solutions.",
  },
  {
    variant: "screenshot-grid",
    label: "Current Applications",
    images: [
      { src: "/images/hbh3/current-apps-1.png", width: 225, alt: "Medication list in an existing prescribing tool" },
      { src: "/images/hbh3/current-apps-2.png", width: 265, alt: "Existing e-prescription patient screen" },
      { src: "/images/hbh3/current-apps-3.png", width: 282, alt: "Send Rx screen in an existing tool" },
    ],
  },
  {
    id: "design-process",
    variant: "board-behaviors",
  },
  {
    variant: "board-painpoints",
  },
  {
    id: "the-prototype",
    variant: "side-to-side",
    eyebrow: ["fROM research ", "to product experience"],
    body: "I then translated findings directly from the experience to a clickable prototype that would enable doctors to easily search patients, and prescribe medications straight from Nectar to Honeybee Health. After prescribing typically bundled medications, a doctor can modify parameters for each medication before reviewing an entire bundle order. In designing this experience, I evaluated different layouts, mapped elements across different screens, and leveraged our e-commerce design system to build an on-brand Nectar product experience. ",
  },
  {
    variant: "media",
    src: "/images/hbh/HBH_Prototype.mov",
    aspectRatio: "751 / 392",
    caption: "The Core UX: A doctor can prescribe a patient typical gestational bundle medication direct within this UX. ",
  },
  {
    variant: "media",
    src: "/images/hbh/SettingsPage.mov",
    aspectRatio: "751 / 393",
    caption: "Within Settings, an admin can configure bundle medications, their personal information, and manage favorites.",
  },
  {
    id: "reflection",
    variant: "default",
    eyebrow: "Outcomes",
    body: "Producing Nectar was halted given EHR integration would be a limiting factor for prescribers to switch to a tool like Nectar, uncovered through persistent research with clinicians. Aside from the core user experience, we instead created an opportunity for providers to see prescription data they’ve sent to Honeybee Health.",
  },
  {
    variant: "three-column",
    eyebrow: "Reflections",
    columns: [
      "The research-driven approach to designing Nectar facilitated building a prioiritized MVP that provides value.",
      "Engage with users early and often. Bringing in doctors throughout the process facilitated an iterative design approach.",
      "Integrating the constraints of the existing design system was fundamental to creating an on brand product experience. ",
    ],
  },
  {
    id: "vrph-overview",
    variant: "product-header",
    title: "Virtual Pharmacy-as-a-Service",
    gapAfter: 32,
  },
  {
    variant: "default",
    eyebrow: "Overview",
    body: "I designed VRPH as an opportunity for our telehealth partners to have a seamless patient medication checkout experience. Once a patient checks out of their intake from a telehealth partner like Hey Jane, doctors can prescribe directly from their telehealth platforms, with VRPH retrieving data seamlessly. Virtual Pharmacy was designed with human elements in mind, from packaging to the Rx bottle patients receive, to create a welcoming experience for patients, who traditionally are checking out medications and might feel wary.",
  },
  {
    id: "vrph-prototype",
    variant: "media",
    src: "/images/hbh/vrph.mov",
    aspectRatio: "1380 / 982",
    caption: "Within VRPH, once a customer has checked out their information from a telhealth website, they will be redirected to this VRPH personalized experience, extracting information directly from telehealth checkout.",
  },
  {
    id: "vrph-outcomes",
    variant: "default",
    eyebrow: "Outcomes",
    body: "VRPH was designed in close collaboration with engineering and validated through customer research and usability testing. Nectar ultimately was not pursued due to technical constraints integrating e-prescription workflows with EHR data. Beyond product design, I introduced Honeybee Health's team to a human-centered design process, shifting product development from a traditionally requirements-driven, waterfall approach toward one grounded in user research, iterative testing, and cross-functional collaboration.",
  },
];

/* ── Research board: Current Behaviors → Application Goals ── */
export const BEHAVIORS_BOARD = {
  title: "Current Behaviors → Application Goals",
  subtitle: "Mapping clinical mental models and workarounds to structural tool specifications.",
  rows: [
    {
      icon: "/images/hbh3/icon-search.svg",
      iconBg: "#F9F5FF",
      title: "Current Clinician Behaviors",
      subtitle: "Observational insights & legacy EHR workflows",
      cardStyle: "behavior",
      cards: [
        {
          title: "Navigation Habits",
          body: "Doctors are used to going to a different tab/page to see med history before prescribing.",
        },
        {
          title: "Favorite Medications",
          body: "Clinicians rely heavily on a pre-curated list of favorite medications to speed up entry.",
        },
        {
          title: "Favoriting from Prescribe",
          body: "Dr. Julie has the option to favorite from the prescribe screen and find Drug Favorites on her profile, but prefers the former for contextual flow.",
        },
        {
          title: "Custom Sig/Qty in Favorites",
          body: "Clinicians want a way to change sigs or quantities in favorites to keep multiples of the same drugs with different dosages/qty.",
        },
        {
          title: "Shipping in Pharmacy Notes",
          body: "Doctors ask shipping code (whether it's expedited or not) directly in the pharmacy notes due to lack of a field.",
        },
      ],
    },
    {
      icon: "/images/hbh3/icon-clipboard.svg",
      iconBg: "#F0F9FF",
      title: "Application Requirements and Goals",
      cardStyle: "requirement",
      cards: [
        {
          title: "Flexible Patient Info Layout",
          body: "Patient info doesn't have to all be on the same page. Must be easily accessible in different tabs or pages.",
        },
        {
          title: "Medication Favoriting",
          body: "Ability to favorite medications in both prescription page and doctor profile page.",
          bullets: [
            "Include: name, strength, qty, dispense unit (e.g. tablet)",
            "Support DAW, days supply, and refills count",
            "Toggle yes/no for generic vs. brand",
          ],
        },
        {
          title: "Prescription Controls",
          body: "Critical control selectors on the main prescribing screen to manage renewal and tracking.",
          bullets: ["Effective date field", "Auto expire toggle box", "Auto renew checkbox"],
        },
        {
          title: "Pharmacy Notes Field",
          body: "A dedicated text area strictly reserved for pharmacist use and secure instructions.",
        },
        {
          title: "Patient/Dr. Notes Field",
          body: "Dedicated clinical notes field optimized for inputting clinical status context.",
          bullets: ["Allergies checklist", "Current medication list"],
        },
        {
          title: "Shipping Options",
          body: "Explicit billing/shipping speed options separated from pharmacist notes.",
          bullets: ["Expedited shipping track", "Standard ground delivery"],
        },
      ],
    },
  ],
};

/* ── Research board: Pain Points → Design Opportunities ── */
export const PAIN_POINTS_BOARD = {
  title: "Pain Points → Design Opportunities",
  subtitle: "UX Research Synthesis & Product Strategy • Healthcare Prescribing Tool",
  painPoints: {
    title: "Pain Points",
    subtitle: "Observed friction points during generative physician interviews and witnessing existing workflows",
    cards: [
      { source: "Dr. Julie", body: "Uses a separate external calculator to figure out date of gestation." },
      { source: "Dr. Chieno", body: "Automates date of gestation as date of visit, but strongly needs it mapped to date of last period." },
      { source: "Dr. Lauren & Cindy", body: "Must maintain a manual external Google Sheet of patients after visits to manage follow-ups." },
      { source: "Dr. Lauren & Cindy", body: "Currently uses a siloed automated solution to follow up with patients through RingCentral." },
      { source: "Dr. Julie", body: 'Lacks the capability to bundle multiple medications as "favorites" for quick prescribing.' },
      { source: "Dr. Lauren & Cindy", body: "Unable to create favorite prescription bundles, forcing manual entry for recurring regimens." },
    ],
  },
  opportunities: {
    title: "Design opportunities",
    subtitle: "I paired with the VP of Engineering on ideating opportunities that address doctors’ needs with Nectar.",
    cards: [
      {
        title: "Gestational Date Calculator",
        body: "Integrate an inline calculator directly into the prescribing flow. A doctor should be able to input:",
        bullets: ["Date of Last Period", "Date of Gestation (auto-calculated before prescribing)"],
      },
      {
        title: "Automated Post-Visit Follow-Up",
        body: "A comprehensive system to automatically trigger patient-facing steps after clinical sign-off, removing reliance on Google Sheets:",
        bullets: [
          "Prescription status tracking & educational documents",
          "After care guidelines and follow-up appointment scheduling",
        ],
      },
      {
        title: "Bundle Meds for Favorites",
        body: "Enable doctors to bundle multiple related medications together under a single favorite clinical template. Key requested bundles:",
        bullets: ["Pregnancy regimens BEFORE 6 weeks gestation", "Pregnancy regimens AFTER 6 weeks gestation"],
        highlight: true,
      },
    ],
  },
  context: {
    title: "Current Behaviors and Clinical Context",
    subtitle: "Supporting interview quotes, habits, and critical system integrations to consider",
    cards: [
      {
        title: "How do you qualify a favorite?",
        body: '"Medications I prescribe on a regular basis... all the different birth control medications."',
      },
      {
        title: "EHR Fragmentation Drawback",
        body: "EHR being completely separate from the prescribing platform is a ",
        bold: "massive operational drawback.",
      },
      {
        title: "Legal & Compliance Risks",
        body: "The siloed EHR workflow isn't just slow; it introduces critical double-entry errors that could pose legal issues.",
      },
      {
        title: "Drug-to-Drug Safety",
        body: "Direct access to EHR in prescribe tool provides clinical guardrails: drug-to-drug and drug-to-allergy safety checks.",
      },
      {
        title: "RingCentral Preference",
        body: "Loves RingCentral's patient search, robust color-coding organization, and visual flagging.",
      },
      {
        title: "Search Favorites by Type",
        body: "Would like to search favorite meds grouped intuitively by medical category, i.e.: abortion, birth control, UTI.",
      },
      {
        title: "EHR Integration Roadmap",
        body: "Investigate security models and technical API methods to embed client-side EHR views inside the tool.",
      },
      {
        title: "Mimic RingCentral Usability",
        body: "Replicate cognitive familiarity: simplify patient discovery, color tagging, and status flagging.",
      },
    ],
  },
};
