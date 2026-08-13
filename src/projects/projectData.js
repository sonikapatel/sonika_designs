export const PROJECTS = [
  {
    slug: "fika",
    company: "Fika",
    title: "Connecting creatives over coffee",
    role: "Founder / Product Designer & Developer / Brand Design",
    status: "2026",
    protected: "fika_connect",
    logo: "/images/fika/fika logo.png",
    bannerBg: "rgb(40, 35, 111)",
    bannerImage: "/images/fika/fika_banner.png",
    problem: [
      { text: "Creative professionals are working in isolation.", bold: true },
      { text: " Whether they're freelancers, business owners, or remote workers, the pandemic has changed the way we interact and the nature of the work is usually in solitude." },
      { break: true },
      { text: "I designed and developed Fika – a new way to help creatives connect in a more meaningful way, whether it's a new friendship, collaborator, or opportunity. Fika connects people over coffee IRL, inspired by the Swedish ritual. By inviting someone inspiring to coffee to matchmaking and events, I designed Fika with creatives' interests in mind. Since launching, Fika connected ~2,500 creatives over biweekly matchmaking at cafes, the product experience, and events hosted in partner locations." },
    ],
    team: [{ name: "Jamie Haberman", role: "co-designer" }],
    context: { label: "www.fikacreatives.co", url: "https://www.fikacreatives.co" },
    sections: [
      {
        type: "grid",
        columns: 2,
        images: [
          [
            { src: "/images/fika/rewards.png", borderRadius: 16 },
            { src: "/images/fika/web.png", borderRadius: 16 },
          ],
        ],
      },
      {
        type: "text-center",
        body: "Fika profiles allow creatives to view other creatives nearby and their work. I refined the product experience based on user feedback and formed partnerships with cafes to offer discounts for creatives who meet for coffees. Most creatives sought building friendships and networking, as meeting other creatives in adjacent domains was crucial for growing inspiration and landing opportunities.",
      },
      {
        type: "image",
        src: "/images/fika/Mobile.png",
        maxWidth: 996,
        caption: "An onboarding experience I designed after iterating based off of dropoff rates in the funnel, improving onboarding by 32% with the low intent to high intent funnel. Creatives can upload their work and what they're looking to gain from Fika to facilitate matchmaking.",
      },
      {
        type: "grid",
        columns: 2,
        sectionBg: "rgb(40, 35, 111)",
        rowMaxWidth: 700,
        rowGap: 64,
        images: [
          [
            { src: "/images/fika/fikahome.mp4", height: 480, objectFit: "contain", borderRadius: 24, caption: 'Browse creatives nearby, and invite someone whose work you find inspiring. We learned roughly 10% of creatives invited others to coffee via the feed, while a larger portion partook in biweekly matchmaking.' },
            { src: "/images/fika/upcoming_fikas.mp4", height: 480, objectFit: "contain", borderRadius: 24, caption: 'A way to view all upcoming fikas and previous fikas. Accept coffee invites in application and confirm via text.' },
          ],
        ],
      },
      {
        type: "text-center",
        body: "My team and I held events all throughout NYC and LA to make sure creatives can connect with one another in natural settings. See examples of coworking, happy hours, and more we hosted! ",
      },
      {
        type: "image",
        src: "/images/fika/fika_events.png",
        variant: "framed",
        maxWidth: 996,
      },
      {
        type: "text-center",
        body: "As the holistic Brand Designer, I designed social media assets to ensure intentional creatives met IRL on Fika. Here are a few top performing Instagram posts.",
      },
      {
        type: "image",
        src: "/images/fika/ads122.png",
        variant: "framed",
        maxWidth: 996,
      },
    ],
  },
  {
    slug: "criteria",
    company: "Criteria",
    title: "AI-powered coaching for managers",
    role: "Lead Product Designer",
    status: "2025",
    bannerBg: "#16112E",
    bannerImage: "/images/criteria/Criteria_1.png",
    logo: "/images/criteria/criteria_logo.png",
    problem: [
      { text: "Managers become managers without formal training or people management abilities.", bold: true },
      { text: " Criteria developed 'Develop', a way to give managers real-time, personalized coaching at scale - without adding headcount. I designed an AI-powered coaching experience that surfaces relevant insights and suggested actions directly in the manager's workflow. The product we launched internally expanded our talent management offering, complementing our core pre-hire product and delivering value across the employee lifecycle." },
    ],
    team: [{ name: "Sonika Patel", role: "Lead Designer" }, { name: "Bryan Romero", role: "Engineer" }],
    context: { label: "criteriacorp.com/weekly-manager-check-ins", url: "https://www.criteriacorp.com/develop/weekly-manager-check-ins" },
    sections: [
      {
        type: "text-center",
        header: "Context ",
        body: "TEAMScan is a product we previously launched to help organizations understand how their teams are performing through quarterly check-ins. HR admins configure TEAMScan for their organization, enabling them to collect quarterly pulses of feedback and gain insight into team health and performance. While many customers complained about not receiving more recurring feedback from their organizations, I worked with a PM and engineer to lead Weekly Check-Ins to solve that core issue."},
      {
        type: "text-center",
        header: "Coach Bo ",
        body: "Coach Bo is an AI-intelligent chat interface I designed the experience and visual interface for. Coach Bo synthesizes information from the core chat, asking 3 core questions of ‘How was last week”, ‘What did you accomplish this week’, and ‘What are you looking to accomplish next’ in a conversational and optimistic manner. \n\n After processing the information, Check-Ins provides managers reports relevant to their roles, including information about organizational health, mood/progress levels of their direct reports, using sentiment analysis. ",
      },
      {
        type: "video",
        src: "/images/criteria/check_in_chat.mov",
        width: 1000,
        center: true,
        sectionBg: "#F8F6F4",
        caption: 'All roles are required to have shared check-ins with their managers weekly to be completed by Friday. I iterated on visual styles for Coach Bo to synthesize each direct report responses through sentiment analysis.'
      },
      {
        type: "text-center",
        header: "Understanding what managers need ",
        body: "Early assumptions from interviewing management suggested that certain variables would be most important to managers during 1:1s. Rather than designing around those assumptions, I led generative research with 7 managers across different levels to understand how they actually coach their direct reports and what information helps them take action. I paired generative interviews with a card-sorting activity to uncover how managers naturally prioritized and interpreted employee signals. The research revealed which information was most meaningful in a coaching context and helped shape the initial direction of the Check-Ins experience.",
      },
      {
        type: "text-center",
        header: "Designing for trust in coaching signals ",
        body: "One of the most important challenges surfaced during the first iteration: the sentiment-analysis scores did not always accurately reflect employee performance. For a manager making decisions about how to coach a direct report, an inaccurate signal can quickly undermine confidence in the entire experience. Rather than treating sentiment scores as objective answers, I focused on creating an experience where managers could understand the signals, interpret them in context, and confidently decide when to act. Trust became a core design principle for Check-Ins: every coaching signal needed to feel grounded enough to inform a conversation, not simply present a score. The resulting experience was designed to help managers move from “What does this score mean?” to “What should I do with this information? I led a generative research study alongside a  card sorting exercise with 10 managers across domains with varying levels of leadership to understand the priority of information when it comes to 1:1s with their direct reports.",
      },
      {
        type: "postits",       
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
      },
      {
        type: "text-center",
        header: "Product Hypothesis ",
        body: "After assessing the product, I thought about the following parameters, including how to integrate role-specific variables, like ARR for Customer Success and Sales, for various employees across organizations?",
      },
      {
        type: "image",
        src: "/images/criteria/check-indata.png",
        maxWidth: 900,
        borderRadius: 16
      },
      {
        type: "video",
        src: "/images/criteria/dashboard.mov",
        width: 1000,
        center: true,
        sectionBg: "#F8F6F4",
        muted: true,
        caption: "A demo of the dashboard managers would use based off of the research, understanding what they care about most when reviewing direct reports' information. The yellow/red/green states are based off of the synthesized mood scores from Coach Bo. In launching Check-Ins, it was important to think about the accuracy of the information shown, if the data accurately conveys if an employee is 'at risk'.",
      },
      {
        type: "text-center",
        header: "Onboarding + Admin Setup",
        body: "Weekly Check-Ins was a confusing experience for HR admins to onboard their 200+ people organizations. To remediate the confusion admins faced prior to Check-Ins launch, I designed a system to ensure admins across varying organizations sizes can easily onboard their employees to the experience. I prioritized education and simplicity as fundamental design principles. ",
      },
      {
        type: "text-center",
        body: "I explored several low-fidelity directions to build trust at scale, while helping users understand the impact of configuring each high-intent step.",
      },
      {
        type: "grid",
        columns: 3,
        sectionMaxWidth: 1200,
        images: [
          [
            { src: "/images/criteria/onboarding-direction-1.png", borderRadius: 12, caption: "An accordion-style checklist that expands each step in place." },
            { src: "/images/criteria/onboarding-direction-2.png", borderRadius: 12, caption: "A single-step wizard with a persistent side panel dedicated to explaining the trust and data implications of the step." },
            { src: "/images/criteria/onboarding-direction-3.png", borderRadius: 12, caption: "An early lo-fidelity skeleton pass, focused purely on step structure and pacing — content and education framing came later." },
          ],
        ],
      },
      {
        type: "video",
        src: "/images/criteria/onboarding.mov",
        width: 1000,
        center: true,
        sectionBg: "#F8F6F4",
        muted: true,
        caption: "A working demo of onboarding setup with different states for in-progress and complete steps, using the visual identity across products and the design system I created in Figma, translated to Typescript components, with Storybook documentation.",
      },
      {
        type: "image",
        header: "BUILDING A SCALABLE DESIGN SYSTEM",
        body: "I leveraged existing colors within Prehire to design the core product experience for Check-Ins, defining the variables that set the precedent for the application.",
        image: '/images/criteria/Criteria_Ds.png',
        maxWidth: 900
      },
      {
        type: "stats",
        eyebrow: "Impact",
        body: "The revised Check-Ins Onboarding was launched with 5% of customers. After launching the revised experience, we saw an overall improved satisfaction with understanding how check-ins works and how it's set up.  ",

        stats: [
          { value: "32%", label: "Reduction in candidate support inquiries" },
          { value: "21%", label: "Increase in admin satisfaction" },
        ],
      }
    ],
  },
  {
    slug: "honeybee-health",
    company: "Honeybee Health",
    title: "E-prescription and Virtual Pharmacy-as-a-Service",
    role: "Product Designer",
    status: "2023",
    bannerBg: "#0D1917",
    bannerImage: "/images/hbh/HBH1.png",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQEv4kv5trlreQ/company-logo_200_200/company-logo_200_200/0/1630619991909/honeybeehealth_logo?e=2147483647&v=beta&t=i2iOeMqvRAfa8v5ASaKzczGOBeV8q_qQPqyt2PEDYh8",
    problem: [
      { text: "Honeybee Health set out to simplify the e-prescription flow for independent physicians — reducing friction, optimizing for privacy, and enabling faster care. An opportunity to provide value to telehealth partners as a vertically integrated pharmacy.", bold: true },
      { text: " I designed an prescribing experience prototype tailored to the clinical context and workflow of busy practitioners. From leading research with 7 clinicians, to forming hypotheses, synthesizing information and 0->1 designing Nectar and creating a design system, I led the end-to-end design processes." },
    ],
    team: [{ name: "Sonika Patel", role: "Lead Designer" }],
    context: { label: "honeybeehealth.com", url: "https://www.honeybeehealth.com" },
    sections: [
      {
        type: "big-header",
        eyebrow: "The CORE UX",
        text: "How might we facilitate privacy for medication abortion patients and for prescribers?",
      },
      {
        type: "text-center",
        header: "Nectar: E-prescription tool for doctors",
        body: "Nectar allows doctors to easily prescribe abortion medications directly to Honeybee Health. With abortion laws in place, many prescribers felt skeptical of existing solutions, losing trust in patient data being shared. With existing solutions, doctors were concerned about privacy with applications like MDToolbox or DoseSpot. I led the experience design for Nectar after conducting research with 7 women's health clinicians, understanding more about their workflows to create a privacy-first experience.",
      },
      {
        type: "image",
        src: "/images/hbh/settings.png",
        variant: "framed",
        caption: "Settings: A global settings portal for admins to easily manage favorites, their provider information, and details about bundle medications.",
      },
     
      {
        type: "image",
        src: "/images/hbh/eprescribe.png",
        variant: "framed",
        caption: "The Core UX: View patient information alongside prescribing typical gestation bundles that physicians are commonly prescribing. This addition reduces time spent manually prescribing each medication in a typically pre-configured bundle.",
      },
      {
        type: "text-center",
        header: "Virtual Pharmacy as a Service",
        body: "I designed VRPH as an opportunity for our telehealth partners to have a seamless patient medication checkout experience. Once a patient checks out of their intake from a telehealth partner like Hey Jane, we designed VRPH as a way to check out and prescribe medications direct to doorstep seamlessly. Virtual Pharmacy was designed with human elements in mind, from packaging to the Rx bottle patients receive, to create a welcoming experience for patients, who traditionally are checking out medications and might feel wary. ",
      },
      {
        type: "video",
        src: "/images/hbh/vrph.mov",
      },
      {
        type: "text-center",
        header: "Outcomes",
        body: "VRPH was designed in close collaboration with engineering and validated through customer research and usability testing. Nectar ultimately was not pursued due to technical constraints integrating e-prescription workflows with EHR data. Beyond product design, I introduced Honeybee Health's team to a human-centered design process, shifting product development from a traditionally requirements-driven, waterfall approach toward one grounded in user research, iterative testing, and cross-functional collaboration.",
      },
    ],
  },
  {
    slug: "square",
    company: "Square",
    title: "Credit options for small businesses",
    role: "Product Designer",
    status: "2022-2023",
    bannerBg: "#14244D",
    bannerImage: "/images/creditoptions1.png",
    problem: [
      { text: "Small business owners need access to capital but find traditional loan applications intimidating and opaque.", bold: true },
      { text: " At Square, I led designing credit experiences that felt approachable and contextually relevant within their existing merchant dashboard. I designed a credit discovery and application experience that meets merchants where they are in their business journey." },
    ],
    team: [{ name: "Sonika Patel", role: "Lead Designer" }],
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/Square%2C_Inc_-_Square_Logo.jpg",
    context: { label: "squareup.com", url: "https://squareup.com" },
    sections: [
      {
        type: "big-header",
        eyebrow: "SELLERS ARE CONFUSED ABOUT THEIR LOANS",
        text: "How might we allow more flexibility for small businesses to receive Term and Flex loans? ",
        body: "I led a XFN workshop with research, engineering, and writers to ideate new ways for small businesses to be 1) educated about their loans and 2) get a loan that suits their business needs best.",
      },
      {
        type: "video",
        src: "/images/square/beforeloan.mov",
      },
      {
        type: "video",
        src: "/images/square/flexloaneligibility.mov",
        caption: 'Sellers received different loans product experiences, with varying loan eligibility amounts and fees, based on their processing data, which became a confusing experience for sellers.'
      },
      {
        type: "video",
        src: "/images/square/customizefinancing.mov",
        caption: "In this exploration I designed after the workshop, eligible sellers can see the differences in each loan and how it affects their business, before concluding on 1 to move forward with."
      },
      {
        type: "video",
        src: "/images/square/wizard.mov",
        caption: "Sellers can feel more sense of ownership by deliberately selecting elements that go into a loan offer in this Loan Selection Wizard."
      },
      {
        type: "text-center",
        header: "Outcomes",
        body: "Term vs Flex Loan Product prototypes were presented to leadership to continue developing in the following quarter to improve seller experience.",
      },
      {
        type: "big-header",
        eyebrow: "Reducing seller confusion and increase the Loans conversion",
        text: "I improved the user experience of Term Loans to facilitate seller transparency, reduce cognitive overload, and improve seller loyalty to Square Loans.",
      },
      {
        type: "video",
        src: "/images/square/Pre-Terms.mov",
        width: 500,
        center: true,
        height: 400,
        bg: "#000",
        padding: "20px 0",
        muted: true,
        caption: "Sellers are confused about 1) Loan Eligibility 2) Consent to FICO and 3) What contributes to a higher loan offer due to a clustered original user experience."
      },
      {
        type: "grid",
        columns: 3,
        sectionMaxWidth: 1800,
        rowMaxWidth: 1350,
        images: [
          [
            { src: "/images/square/1.banners.mp4", height: 400, flex: 1.15, caption: "Exploration 1: Banner concept after receiving initial loan offer" },
            { src: "/images/square/4.freeform.mov", height: 400, caption: "Exploration 2: Freeform Input- Experience holds users accountable for # of bank accounts" },
            { src: "/images/square/2.copyasset.mp4", height: 400, flex: 1.15, caption: "Exploration 3: Copy to hold the seller accountable for maximum loan" },
          ],
        ],
      },
      {
        type: "video",
        src: "/images/square/3.tabs.mov",
        crop: true,
        width: 500,
        height: 500,
        objectPosition: "top",
        center: true,
        caption: "In this solution that I shipped, sellers can input the number of bank accounts they have to hold the experience accountable. This solution yielded an increased seller understanding and loan conversion."
      },
      {
        type: "stats",
        eyebrow: "Impact",
        stats: [
          { value: "45,000", label: "Eligible Term Sellers", caption: "**over 3 month period" },
          { value: "22%", label: "Plaid Linking Conversion" },
          { value: "$890K", label: "Loan Originations", caption: "+24% increase from original Term Loans experience" },
        ],
      },
    ],

  },
];
