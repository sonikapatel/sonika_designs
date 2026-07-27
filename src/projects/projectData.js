export const PROJECTS = [
  {
    slug: "fika",
    company: "Fika",
    title: "Connecting creatives over coffee",
    role: "Founder / Product Designer & Developer / Brand Design",
    status: "Ongoing",
    protected: "fika_connect",
    logo: "/images/fika/fika logo.png",
    bannerBg: "#244479",
    bannerImage: "/images/fika/fika_banner.png",
    problem: [
      { text: "Creative professionals are working in isolation.", bold: true },
      { text: " Whether they're freelancers, business owners, or remote workers, the pandemic has changed the way we interact and the nature of the work is usually in solitutde." },
      { break: true },
      { text: "I designed and developed Fika – a new way to help creatives connect in a more meaningful way, whether it's a new friendship, collaborator, or opportunity. Fika connects people over coffee IRL, inspired by the Swedish ritual. By inviting someone inspiring to coffee to matchmaking and events, I designed Fika with creatives' interests in mind." },
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
        body: "Fika profiles allow you to see creatives and their work near you. I refined the product experience based on user feedback and formed partnerships with cafes to offer discounts for creatives who meet for coffees.",
      },
      {
        type: "image",
        src: "/images/fika/Mobile.png",
        maxWidth: 996,
        caption: "An onboarding experience I designed after iterating based off of dropoff rates in the funnel. Creatives can upload their work and what they're looking to gain from Fika to facilitate matchmaking.",
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
        body: "As the Founder and Product Designer & Brand Designer, I designed social media assets to ensure the right creatives were aligned to Fika. Here are a few top performing Instagram posts.",
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
      { text: "Managers become managers without training or people management abilities.", bold: true },
      { text: " Criteria developed 'Develop', a way to give managers real-time, personalized coaching at scale - without adding headcount. I designed an AI-powered coaching experience that surfaces relevant insights and suggested actions directly in the manager's workflow. The product we launched internally expanded our talent management offering, complementing our core pre-hire product and delivering value across the employee lifecycle." },
    ],
    team: [{ name: "Sonika Patel", role: "Lead Designer" }, { name: "Bryan", role: "Engineer" }],
    context: { label: "criteriacorp.com", url: "https://www.criteriacorp.com/develop/weekly-manager-check-ins" },
    sections: [
      {
        type: "text-center",
        header: "The Core Weekly Check-Ins Experience ",
        body: "The core Weekly Check-Ins experience enables team members to update how they're feeling, what they completed, so Coach Bo (conversational AI) can surface conversation summaries to managers weekly, through email reports and individual-level reporting that gives insight into how each employee is performing.",
      },
      {
        type: "image",
        src: "/images/criteria/mobile&chat.png",
        maxWidth: 1000,
        borderRadius: 16,
        caption: 'ICs were able to have a shared check-in with their manager or private check-in (not shared with managers). I iterated on visual styles to evidently show the type of conversation.'
      },
      {
        type: "image",
        src: "/images/criteria/full-dash.png",
        maxWidth: 1000,
        borderRadius: 16,
        caption: 'Conversation summaries were originally text-heavy with managers not understanding how to take action on the data. Understanding what managers cared about for 1:1s through card sorting and user research, I redesigned the presentation of information to be easily digestible for managers to understand how their direct reports are performing. The red/yellow/green showcases a performance indicator for each direct report for an easy at-the-glance overview.'
      },
      {
        type: "text-center",
        header: "Onboarding + Admin Setup",
        body: "Weekly Check-Ins was a confusing experience for HR admins to onboard their 200+ people organizations. To remediate the confusion admins faced prior to Check-Ins launch, I designed a system to ensure admins across varying organizations sizes can easily onboard their employees to the experience. I prioritized education and simplicity as fundamental design principles. ",
      },
      {
        type: "image",
        src: "https://vdbpbpjwtbcyhnnwynox.supabase.co/storage/v1/object/sign/landing%20page/onboarding-setup.gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kZGI0MGU3NC04Nzk2LTRhZmItOTViNy0wNDQ5YzAyNWMzZjciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYW5kaW5nIHBhZ2Uvb25ib2FyZGluZy1zZXR1cC5naWYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg1MTE5NzkwLCJleHAiOjE4MTY2NTU3OTB9.n3LHxW4QzfzazfrVw-I0nAzC7LPP7KJTthAfLw_n6FI",
        maxWidth: 1000,
        bg: "#3B3B3B",
        padding: 24,
        borderRadius: 24,
        caption: "A working demo of onboarding setup with different states for in-progress and complete steps.",
      },
      {
        type: "stats",
        eyebrow: "Impact",
        stats: [
          { value: "32%", label: "Reduction in candidate support inquiries" },
          { value: "21%", label: "Increase in admin satisfaction" },
        ],
      },
      {
        type: "text-center",
        header: "Outcomes",
        body: "Check-Ins was pushed to a beta of 100 businesses, driving $12M in anticipated post-launch revenue. The team was able to develop Check-Ins with a robust design library I designed and developed, based off of ShadCN. ",
      },
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
        eyebrow: "EXPLORATIONS",
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
