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
      { text: "I designed and developed Fika – a new way to help creatives connect in a more meaningful way, whether it's a new friendship, collaborator, or opportunity. Fika connects people over coffee IRL, inspired by the Swedish ritual. The app I built features a variety of creatives across LA/ NYC who met for coffee." },
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
        body: "My team and I held events all throughout NYC and LA to make sure creatives can connect with one another in natural settings. See examples of coworking, happy hours, and more we hosted! ",
      },
      {
        type: "image",
        src: "/images/fika/fika_events.png",
        variant: "framed",
      },
      {
        type: "text-center",
        body: "As the Founder and Product Designer AND Brand Designer, I designed social media assets to ensure the right creatives were aligned to Fika. Here are a few top performing Instagram posts.",
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
    company: "https://www.criteriacorp.com/files/Criteria-logo-web.png",
    title: "AI-powered coaching for managers",
    role: "Product Designer",
    status: "Completed",
    bannerBg: "#16112E",
    bannerImage: "/images/criteria/Criteria_1.png",
    problem:
      "Managers become managers without training or people management abilities. Criteria developed 'Develop', a way to give managers real-time, personalized coaching at scale - without adding headcount. I designed an AI-powered coaching experience that surfaces relevant insights and suggested actions directly in the manager's workflow.",
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
          { src: "/images/criteria/Criteria_1.png", caption: "Expanded & Incomplete - Information about who receives Weekly Check-Ins." },
          { src: "/images/criteria/Criteria2.png", caption: "Expanded and Complete - An overview of the step that was previously configured." },
          { src: "/images/criteria/Criteria3.png", caption: "Configuring each step - Full Page View." },
        ],
      },
    ],
  },
  {
    slug: "honeybee-health",
    company: "Honeybee Health",
    title: "E-prescription for doctors",
    role: "Product Designer",
    status: "Completed",
    bannerBg: "#0D1917",
    bannerImage: "/images/honeybee.png",
    problem:
      "Doctors spend more time on paperwork than patients. Honeybee Health set out to simplify the e-prescription flow for independent physicians — reducing friction, minimizing errors, and enabling faster care. I designed an end-to-end prescribing experience tailored to the clinical context and workflow of busy practitioners.",
    team: [{ name: "Sonika Patel", role: "Lead Designer" }],
    context: { label: "honeybeehealth.com", url: "https://www.honeybeehealth.com" },
    sections: [
      {
        type: "image",
        src: "/images/honeybee.png",
        caption:
          "The streamlined prescribing flow reduces the average time to send a prescription and surfaces patient history inline to support better clinical decisions.",
      },
    ],
  },
  {
    slug: "square",
    company: "Square",
    title: "Credit options for small businesses",
    role: "Product Designer",
    status: "Completed",
    bannerBg: "#3D5445",
    bannerImage: "/images/square.png",
    problem:
      "Small business owners need access to capital but find traditional loan applications intimidating and opaque. Square wanted to surface credit options that felt approachable and contextually relevant within their existing merchant dashboard. I designed a credit discovery and application experience that meets merchants where they are in their business journey.",
    team: [{ name: "Sonika Patel", role: "Lead Designer" }],
    context: { label: "squareup.com", url: "https://squareup.com" },
    sections: [
      {
        type: "image",
        src: "/images/square.png",
        caption:
          "Credit options are surfaced contextually within the Square dashboard, with clear eligibility signals and a simplified application flow.",
      },
    ],
  },
];
