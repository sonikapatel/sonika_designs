/* Content for the Fika case study, rendered through the shared sidebar layout in
   src/projects/caseStudy. Copy is carried over verbatim from the Fika entry in
   projectData.js. Three passages there had no heading of their own; the eyebrows on
   "Product Experience", "Events" and "Brand Design" are labels added for the sidebar
   to navigate to — edit them freely, no body copy was changed. */

export const FIKA = {
  slug: "fika",
  company: "Fika",
  title: "Fika",
  subtitle: "Connecting creatives over coffee",
  protected: "sp_project",
  hero: {
    image: "/images/banner_images/Fika_Header.png",
    alt: "Fika profiles, matchmaking and rewards across mobile and web",
    bleed: true,
    bg: "rgb(40, 35, 111)",
  },
};

export const FIKA_NAV = [
  {
    group: "FIKA",
    items: [
      { id: "overview", label: "Overview" },
      { id: "product", label: "Product Experience" },
      { id: "events", label: "Events" },
      { id: "brand", label: "Brand Design" },
    ],
  },
];

export const FIKA_BLOCKS = [
  {
    id: "overview",
    variant: "default",
    eyebrow: "Overview",
    lead: "Creative professionals are working in isolation.",
    body: [
      "Whether they’re freelancers, business owners, or remote workers, the pandemic has changed the way we interact and the nature of the work is usually in solitude.",
      "I designed and developed Fika – a new way to help creatives connect in a more meaningful way, whether it’s a new friendship, collaborator, or opportunity. Fika connects people over coffee IRL, inspired by the Swedish ritual. By inviting someone inspiring to coffee to matchmaking and events, I designed Fika with creatives’ interests in mind. Since launching, Fika connected ~2,500 creatives over biweekly matchmaking at cafes, the product experience, and events hosted in partner locations.",
    ],
  },
  {
    variant: "media",
    src: "/images/fika/rewards.png",
    alt: "Fika rewards and cafe partner discounts",
    bare: true,
  },
  {
    variant: "media",
    src: "/images/fika/web.png",
    alt: "The Fika web experience",
    bare: true,
  },
  {
    id: "product",
    variant: "side-to-side",
    eyebrow: "Product Experience",
    body: "Fika profiles allow creatives to view other creatives nearby and their work. I refined the product experience based on user feedback and formed partnerships with cafes to offer discounts for creatives who meet for coffees. Most creatives sought building friendships and networking, as meeting other creatives in adjacent domains was crucial for growing inspiration and landing opportunities.",
  },
  {
    variant: "media",
    src: "/images/fika/Mobile.png",
    alt: "The Fika onboarding funnel",
    bare: true,
    caption:
      "An onboarding experience I designed after iterating based off of dropoff rates in the funnel, improving onboarding by 32% with the low intent to high intent funnel. Creatives can upload their work and what they're looking to gain from Fika to facilitate matchmaking.",
  },
  {
    variant: "media",
    src: "/images/fika/fikahome.mp4",
    caption:
      "Browse creatives nearby, and invite someone whose work you find inspiring. We learned roughly 10% of creatives invited others to coffee via the feed, while a larger portion partook in biweekly matchmaking.",
  },
  {
    variant: "media",
    src: "/images/fika/upcoming_fikas.mp4",
    caption:
      "A way to view all upcoming fikas and previous fikas. Accept coffee invites in application and confirm via text.",
  },
  {
    id: "events",
    variant: "side-to-side",
    eyebrow: "Events",
    body: "My team and I held events all throughout NYC and LA to make sure creatives can connect with one another in natural settings. See examples of coworking, happy hours, and more we hosted! ",
  },
  {
    variant: "media",
    src: "/images/fika/fika_events.png",
    alt: "Fika coworking sessions, happy hours and community events",
    bare: true,
  },
  {
    id: "brand",
    variant: "side-to-side",
    eyebrow: "Brand Design",
    body: [
      [
        { text: "As the holistic Brand Designer, I designed social media assets to ensure intentional creatives met IRL on Fika. Here are a few top performing Instagram posts. Check out " },
        { text: "Fika Instagram", url: "https://www.instagram.com/fikacreatives.co" },
        { text: " for more information." },
      ],
    ],
  },
  {
    variant: "media",
    src: "/images/fika/ads122.png",
    alt: "Top performing Fika Instagram posts",
    bare: true,
  },
];
