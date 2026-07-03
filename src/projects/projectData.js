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
        type: "image",
        src: "/images/fika/Profile.png",
        variant: "framed",
      },
      {
        type: "text-center",
        body: "Fika profiles allow you to see creatives and their work near you. I refined the product experience based on user feedback, led the marketing strategy on Instagram, and hosted events throughout LA / NYC to bring creatives together.",
      },
      {
        type: "grid",
        columns: 3,
        images: [
          [
            { src: "/images/fika/Fika-mobile.jpeg", maxHeight: 500 },
            { src: "/images/fika/fika_mobile2.png", maxHeight: 500 },
            { src: "/images/fika/fika_phone.png", maxHeight: 500 },
          ],
        ],
      },
      {
        type: "text-center",
        body: "An onboarding experience I designed after iterating based off of dropoff rates in the funnel",
      },
      {
        type: "text-center",
        body: "My team and I held events all throughout NYC and LA to make sure creatives can connect with one another in natural settings. See examples of coworking, happy hours, and more we hosted! ",
      },
      {
        type: "image",
        src: "/images/fika/fika_events.png",
        variant: "framed",
      },
      {
        type: "text-center",
        body: "As the Founder and Product Designer & Brand Designer, I designed social media assets to ensure the right creatives were aligned to Fika. Here are a few top performing Instagram posts.",
      },
      {
        type: "image",
        src: "/images/fika/ads122.png",
        variant: "framed",
      },
    ],
  },
  {
    slug: "criteria",
    company: "Criteria",
    title: "AI-powered coaching for managers",
    role: "Product Designer",
    status: "2025",
    bannerBg: "#16112E",
    bannerImage: "/images/criteria/Criteria_1.png",
    logo: "/images/criteria/criteria_logo.png",
    problem: [
      { text: "Managers become managers without training or people management abilities.", bold: true },
      { text: " Criteria developed 'Develop', a way to give managers real-time, personalized coaching at scale - without adding headcount. I designed an AI-powered coaching experience that surfaces relevant insights and suggested actions directly in the manager's workflow." },
    ],
    team: [{ name: "Sonika Patel", role: "Lead Designer" }, { name: "Bryan", role: "Engineer" }],
    context: { label: "criteriacorp.com", url: "https://www.criteriacorp.com/develop/weekly-manager-check-ins" },
    sections: [
      {
        type: "image",
        src: "/images/criteria/CriteriaUI.png",
      },
      {
        type: "carousel",
        images: [
          { src: "/images/criteria/Criteria1.png", caption: "Expanded & Incomplete - Information about who receives Weekly Check-Ins." },
          { src: "/images/criteria/Criteria2.png", caption: "Expanded and Complete - An overview of the step that was previously configured." },
          { src: "/images/criteria/Criteria3.png", caption: "Configuring each step - Full Page View." },
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
    title: "E-prescription and Virtual Pharmacy as a Service for doctors",
    role: "Product Designer",
    status: "2023",
    bannerBg: "#0D1917",
    bannerImage: "/images/hbh/HBH1.png",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQEv4kv5trlreQ/company-logo_200_200/company-logo_200_200/0/1630619991909/honeybeehealth_logo?e=2147483647&v=beta&t=i2iOeMqvRAfa8v5ASaKzczGOBeV8q_qQPqyt2PEDYh8",
    problem: [
      { text: "Honeybee Health set out to simplify the e-prescription flow for independent physicians — reducing friction, optimizing for privacy, and enabling faster care.", bold: true },
      { text: " I designed an end-to-end prescribing experience tailored to the clinical context and workflow of busy practitioners. From leading research with 7 clinicians, to synthesizing information and 0->1 designing Nectar and creating a design system, I led the end to end design processes." },
    ],
    team: [{ name: "Sonika Patel", role: "Lead Designer" }],
    context: { label: "honeybeehealth.com", url: "https://www.honeybeehealth.com" },
    sections: [
      {
        type: "text-center",
        header: "Nectar: E-prescription tool for doctors",
        body: "Nectar allows doctors to easily prescribe abortion medications directly to Honeybee Health. With abortion laws in place, many prescribers felt skeptical of existing solutions, losing trust in patient data being shared. I led the experience design for Nectar after conducting research with 7 women's health clinicians, understanding more about their workflows and using findings to inform Nectar.",
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
        caption: "The Core UX: View patient information alongside prescribing typical gestation bundles that physicians are commonly prescribing. ",
      },
      {
        type: "text-center",
        header: "Virtual Pharmacy as a Service",
        body: "I designed VRPH as an opportunity for our telehealth partners to have a seamless patient medication checkout experience. Virtual Pharmacy was designed with human elements in mind, from packaging to the Rx bottle patients receive, to create a welcoming experience for patients, who traditionally are checking out medications and might feel wary. ",
      },
      {
        type: "video",
        src: "/images/hbh/vrph.mov",
      },
      {
        type: "text-center",
        header: "Outcomes",
        body: "VRPH was developed alongside engineering and tested with customers. Alongside Nectar which was developed to production, we didn't continue further pursuing the product, due to constraints with integrating e-prescription with EHR data. I introduced the team at Honeybee Health on a human-centered approach to designing products, being used to traditionally designing products from a requirements-driven waterfall approach.",
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
      { text: " At square, I led designing credit experiences that felt approachable and contextually relevant within their existing merchant dashboard. I designed a credit discovery and application experience that meets merchants where they are in their business journey." },
    ],
    team: [{ name: "Sonika Patel", role: "Lead Designer" }],
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/Square%2C_Inc_-_Square_Logo.jpg",
    context: { label: "squareup.com", url: "https://squareup.com" },
    sections: [
    ],
  },
];
