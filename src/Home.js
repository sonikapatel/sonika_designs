import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SiteShell from "./SiteShell";
import HomeaseHouse from "./projects/homease/HomeaseHouse";
import CoachBoCard from "./projects/criteria/CoachBoCard";
import SquareSliderCard from "./projects/square/SquareSliderCard";

/* Company wordmarks live in public/images/logos, each cropped to its ink. They
   sit in a greyed-out strip under the intro, sized to one shared area rather
   than one height, so a near-square mark (AT&T) and a long one (Philosophie)
   carry the same visual weight. `aspect` is each file's width / height; `scale`
   trims the heavy, solid Philosophie wordmark so it doesn't read larger. */
const LOGO_AREA = 1024; // px², a 64 × 16 box, so a wordmark sits in a line of text
const EXPERIENCE = [
  { company: "Criteria",        logo: "/images/logos/criteria-wordmark.png",    aspect: 4.0,  role: "UX Designer" },
  { company: "Honeybee Health", logo: "/images/logos/honeybee-wordmark.png",    aspect: 3.57, role: "Product Designer" },
  { company: "Square (Block)",  logo: "/images/logos/square-wordmark.svg",      aspect: 4.0,  role: "Product Designer" },
  { company: "Philosophie",     logo: "/images/logos/philosophie-wordmark.svg", aspect: 8.93, scale: 0.85, role: "Product Designer" },
  { company: "AT&T",            logo: "/images/logos/att-wordmark.svg",         aspect: 2.43, role: "Engineer / UX Designer" },
];

/* Consecutive companies with the same role, for the "Previously…" line. */
const ROLE_GROUPS = EXPERIENCE.reduce((groups, item) => {
  const last = groups[groups.length - 1];
  if (last && last.role === item.role) last.items.push(item);
  else groups.push({ role: item.role, items: [item] });
  return groups;
}, []);

/* The tools list beside Skills. */
const TOOL_LIST = [
  { name: "Claude Code",          use: "Scaling AI-native design systems" },
  { name: "Cursor",               use: "Bringing prototypes to life" },
  { name: "Adobe CC",             use: "Branding work" },
  { name: "Figma (Make, Figjam)", use: "Canvas to ideate and brainstorm" },
];

const SKILLS = [
  "0→1 Product Design",
  "User Research",
  "Prototyping",
  "Design Systems",
  "Branding",
  "UX Copy and Messaging",
  "App Development",
  "Workshop Design",
];

const VALUES = [
  {
    title: "Systems Thinking",
    icon: "systems",
    bg: "#FFFFFF",
    textColor: "#2A2A2A",
    description: "I apply a system-driven approach to designing large-scale applications.",
  },
  {
    title: "Intentionality",
    icon: "intent",
    /* Its icon sits above the title; the other two sit below. */
    iconAbove: true,
    bg: "#FFFFFF",
    textColor: "#2A2A2A",
    description: "I focus on reducing unnecessary complexity, and creating experiences that feel purposeful rather than just polished.",
  },
  {
    title: "Empathy",
    icon: "empathy",
    bg: "#2D2D2D",
    textColor: "#FFFFFF",
    description: "Great products start with understanding people. I design by uncovering the behaviors and frustrations behind user's actions.",
  },
];


/* Touch screens never hover, so a tap toggles the card there instead. */
const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

/* Abstract line icons for the value cards, drawn on a 32px grid in the card's
   text color. Systems: nodes wired into one network. Intentionality: a wandering
   line that straightens and lands on a single point. Empathy: two circles
   overlapping, a shared space between two people. */
function ValueIcon({ name, color }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (name === "systems") {
    return (
      <svg {...common}>
        <path d="M6 6 L16 16 L26 6 M6 26 L16 16 L26 26 M6 6 L6 26 M26 6 L26 26" opacity="0.45" />
        <circle cx="6" cy="6" r="2.5" fill={color} stroke="none" />
        <circle cx="26" cy="6" r="2.5" fill={color} stroke="none" />
        <circle cx="6" cy="26" r="2.5" fill={color} stroke="none" />
        <circle cx="26" cy="26" r="2.5" fill={color} stroke="none" />
        <circle cx="16" cy="16" r="4" />
      </svg>
    );
  }
  if (name === "intent") {
    return (
      <svg {...common}>
        <path d="M3 22 C6 12, 9 28, 12 18 S16 16, 19 16 L25 16" />
        <circle cx="27.5" cy="16" r="2.5" fill={color} stroke="none" />
      </svg>
    );
  }
  if (name === "empathy") {
    return (
      <svg {...common}>
        <circle cx="12" cy="16" r="8" />
        <circle cx="20" cy="16" r="8" />
        <path d="M16 9.1 A8 8 0 0 1 16 22.9 A8 8 0 0 1 16 9.1 Z" fill={color} stroke="none" opacity="0.35" />
      </svg>
    );
  }
  return null;
}

function ValueCard({ title, description, bg, textColor, icon, iconAbove }) {
  const [flipped, setFlipped] = useState(false);
  const needsBorder = bg === "#FFFFFF";
  return (
    <div
      style={{ perspective: 800, cursor: canHover ? "default" : "pointer", height: "var(--flip-card-height)" }}
      onMouseEnter={canHover ? () => setFlipped(true) : undefined}
      onMouseLeave={canHover ? () => setFlipped(false) : undefined}
      onClick={canHover ? undefined : () => setFlipped(f => !f)}
    >
      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 400ms var(--ease-in-out)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0,
          background: bg,
          border: needsBorder ? "1px solid rgba(0,0,0,0.09)" : "none",
          borderRadius: 24,
          padding: 24,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          {icon && iconAbove && <ValueIcon name={icon} color={textColor} />}
          <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: textColor, fontFamily: "'Schibsted Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{title}</p>
          {icon && !iconAbove && <ValueIcon name={icon} color={textColor} />}
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0,
          background: bg,
          border: needsBorder ? "1px solid rgba(0,0,0,0.09)" : "none",
          borderRadius: 24,
          padding: 24,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          display: "flex",
          alignItems: "center",
        }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: textColor }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* Pinned horizontal gallery for the work cards. On desktop the section sticks to
   the viewport while the page scrolls past it, and that vertical distance drives
   the card track sideways: the region is made exactly as tall as one viewport
   plus the track's overflow, so the last card arrives as the pin releases. On
   phones (600px and under) nothing is pinned and the cards stack (index.css). */
function usePinnedTrack(key) {
  const regionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const region = regionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!region || !viewport || !track) return;
    const wide = window.matchMedia("(min-width: 601px)");
    const sticky = region.firstElementChild;
    let overflow = 0;
    let pinTop = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!overflow) {
        track.style.transform = "";
        return;
      }
      const top = region.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, (pinTop - top) / overflow));
      track.style.transform = `translate3d(${-progress * overflow}px, 0, 0)`;
    };
    /* The pinned block is only as tall as its content and is centered in the
       viewport while it is pinned, so the section ends right after the cards
       instead of leaving a viewport's worth of empty space before the next one. */
    const measure = () => {
      overflow = wide.matches ? Math.max(0, track.scrollWidth - viewport.clientWidth) : 0;
      const pinH = sticky.offsetHeight;
      pinTop = Math.max(0, (window.innerHeight - pinH) / 2);
      sticky.style.top = overflow ? `${pinTop}px` : "";
      region.style.height = overflow ? `${pinH + overflow}px` : "";
      update();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    /* Tabbing to a card that is still off to the side scrolls the page to the
       point where the track has brought it into view. */
    const onFocus = (e) => {
      if (!overflow) return;
      const card = [...track.children].find((c) => c.contains(e.target));
      if (!card) return;
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const progress = Math.min(1, Math.max(0, (card.offsetLeft - pad) / overflow));
      const regionTop = region.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: regionTop - pinTop + progress * overflow });
    };

    const resize = new ResizeObserver(measure);
    resize.observe(track);
    resize.observe(viewport);
    resize.observe(sticky);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    wide.addEventListener("change", measure);
    track.addEventListener("focusin", onFocus);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", measure);
      track.removeEventListener("focusin", onFocus);
      region.style.height = "";
      sticky.style.top = "";
      track.style.transform = "";
    };
  }, [key]);

  return { regionRef, viewportRef, trackRef };
}

const TABS = ["Products", "Brands", "Playground"];

/* Filter pills for the domains product design postings ask for most (B2B SaaS,
   fintech, AI, healthcare and consumer lead TrueUp's 2026 design job counts), so
   a recruiter can jump to the work that matches their role. Each card lists its
   domains in `domains`; a tab shows only the pills it has work for. */
const DOMAINS = ["AI", "Fintech", "Enterprise", "Healthcare", "Consumer"];

/* Every product tile sits on one saturated colour, a different hue per project, built
   the same way: a soft diagonal from a lighter to a deeper shade of that hue. */
const tone = (light, base, deep) => `linear-gradient(160deg, ${light} 0%, ${base} 55%, ${deep} 100%)`;

const CARDS = {
  Products: [
    {
      company: "Criteria",
      description: "AI weekly check-ins that give mid-market managers 1:1 prep and leaders early burnout signals",
      result: "+48% activation",
      industry: "HR Tech",
      bg: "#16112E",
      /* The tile plays a looping, coded Coach Bo check-in (CoachBoCard.js)
         instead of the still and clip below, which stay as the fallback. */
      scene: "coach-bo",
      /* The still's dashboard window is dashboard.mov's first frame, so the clip
         takes over seamlessly on hover. It plays in that window (87,108 /
         798×459 on the 1011×795 tile), and the "Prepare for your next 1:1" panel,
         cut from the same still (465,237 / 462×448), sits back on top of it. */
      image: "/images/criteria.png",
      video: {
        src: "/images/criteria/criteria-card.mp4",
        left: "8.605%",
        top: "13.585%",
        width: "78.932%",
        height: "57.736%",
      },
      layer: {
        src: "/images/criteria/criteria-prep-panel.png",
        left: "45.994%",
        top: "29.811%",
        width: "45.697%",
        height: "56.352%",
      },
      logo: { src: "/images/logos/criteria-wordmark-white.png", aspect: 4.0 },
      slug: "criteria",
      domains: ["AI", "Enterprise"],
    },
    {
      company: "Square",
      description: "Empowering small businesses with flexible financing.",
      result: "40% increase in conversion in 3 months",
      industry: "Financial",
      bg: "#3D5445",
      /* Square_full.png's three panels cut out of its leather, on the same canvas, so
         they sit on the tile's colour. */
      image: "/images/square/square-panels.png",
      /* The three panels (219,75 / 603×647 on the 1014×798 still) fit the inset. */
      fit: [1014, 798, 219, 75, 603, 647],
      ground: tone("#1E9B63", "#10794B", "#0B5F3B"),
      /* The offer panel's slider moves on its own; no clip and no push-in. */
      noMotion: true,
      scene: "square-slider",
      logo: { src: "/images/logos/square-wordmark-white.svg", aspect: 4.0 },
      slug: "square",
      domains: ["Fintech", "Enterprise"],
    },
    {
      company: "Fika",
      description: "Engaging creative connection IRL through coffee",
      result: "Onboarding funnel +32%",
      industry: "Community",
      bg: "#4B44AF",
      image: "/images/fika123.png",
      /* The browser window (69,168 / 873×461), cropped square around the headline. */
      screen: [1011, 795, 69, 168, 873, 461],
      focus: 0.5,
      ground: tone("#6A5EF0", "#4F44D6", "#3D34B4"),
      /* The landing page scrolling top to bottom at a constant speed, captured
         frame by frame from the fika-march-code frontend in headless Chrome at
         1440×762, played in the still's browser window. Position/size mirror the
         window's rect in the Figma card (23,56 / 291×154 on a 337×265 tile). */
      video: {
        src: "/images/fika/fika-landing.mp4",
        left: "6.825%",
        top: "21.13%",
        width: "86.35%",
        height: "58.11%",
        radius: "2.3% / 4.3%",
      },
      logo: { src: "/images/logos/fika-wordmark-white.png", aspect: 2.37 },
      slug: "fika",
      domains: ["Consumer"],
    },
    {
      company: "Honeybee Health",
      description: "Enabling physicians to prescribe medications while protecting patient privacy",
      result: "Dispensing time improved 72%",
      industry: "Healthcare",
      bg: "#0D1917",
      image: "/images/HBH.png",
      /* The app window (126,204 / 885×591), running off the right edge. */
      screen: [1011, 795, 126, 204, 885, 591],
      ground: tone("#F7B733", "#EE9B14", "#D9820A"),
      bleed: true,
      /* HBH_Prototype.mov from the case study, the same E-prescription screen.
         Pinned to the app window in the still (126,204 on the 1011×795 tile) at
         the clip's own 1.9:1, so it runs off the right edge as the still does. */
      video: {
        src: "/images/hbh/hbh-card.mp4",
        left: "12.463%",
        top: "25.660%",
        width: "111.08%",
        height: "74.34%",
        radius: 0,
      },
      logo: { src: "/images/logos/honeybee-wordmark-white.png", aspect: 3.57 },
      slug: "hbh-3",
      domains: ["Healthcare"],
    },
    {
      company: "Co-op Solutions",
      description: "Modernizing legacy credit union software",
      result: "Navigation time cut 28%",
      industry: "Financial",
      image: "/images/Springboard.png",
      /* The app window (468,138 / 1077×657), running off the right edge. */
      screen: [2070, 795, 468, 138, 1077, 657],
      ground: tone("#D0497A", "#B5325F", "#94234B"),
      /* Co-op Solutions is now Velera, so the tile carries Velera's logo. */
      logo: { src: "/images/logos/velera-wordmark-white.png", aspect: 3.67 },
      bleed: true,
      slug: "coop",
      domains: ["Fintech", "Enterprise"],
      fullWidth: true,
    },
    {
      company: "PartsTech",
      description: "Helping upgraded repair shops discover the tire features they paid for",
      industry: "Automotive",
      bg: "#121D45",
      /* The tire search with the out-the-door pricing beacon open, on PartsTech's
         navy at the Co-op card's 2070×795. The screen runs off the bottom edge. */
      image: "/images/partstech/partstech-card.jpg",
      /* The app window (334,110 / 1399×685), running off the right edge. */
      screen: [2070, 795, 334, 110, 1399, 685],
      ground: tone("#3B7BF2", "#1F5BD8", "#1848B0"),
      bleed: true,
      /* PartsTech's own logo file with its "An OEC company" line removed, as in the
         version supplied for this card. */
      logo: { src: "/images/logos/partstech-wordmark-white.svg", aspect: 4.23 },
      slug: "partstech",
      domains: ["Enterprise"],
      fullWidth: true,
    },
  ],
  /* Self-initiated concepts and prototypes. */
  Playground: [
    {
      company: "Homease",
      description: "Mid-term rentals from every source in one search",
      bg: "#86533A",
      /* The card without its house mark; HomeaseHouse draws it in place on a loop
         (Figma node 107:5363). The outline sits at 385.6,208.7 / 132.1×125.3 on
         the 1354×556 tile. */
      image: "/images/homease/homease-card-plain.png",
      /* Wide art in a square card: keep the Homease wordmark in frame. */
      crop: "13%",
      house: {
        left: "28.479%",
        top: "37.536%",
        width: "9.758%",
        height: "22.530%",
      },
      /* The Ask flow recorded from the prototype, pinned over the phone in the Figma
         card (858,72 / 281×608 on a 1354×556 tile). The phone runs off the bottom
         edge, as it does in Figma; the tile clips it. */
      video: {
        src: "/images/homease/cover.mp4",
        left: "63.37%",
        top: "12.95%",
        width: "20.75%",
        height: "109.35%",
        radius: "8.36% / 3.86%",
      },
      slug: "homease",
      domains: ["Consumer"],
      fullWidth: true,
    },
    {
      company: "intake",
      description: "Patient intake you fill out once, not at every front desk",
      bg: "#2C7476",
      image: "/images/intake/intake-card.png",
      /* Wide art in a square card: keep the intake wordmark in frame. */
      crop: "12%",
      /* The splash and health profile recorded from the iOS prototype, pinned over the
         phone at the same rect as the Homease card (858,72 / 281×608 on 1354×556). */
      video: {
        src: "/images/intake/cover.mp4",
        left: "63.37%",
        top: "12.95%",
        width: "20.75%",
        height: "109.35%",
        radius: "8.36% / 3.86%",
      },
      slug: "intake",
      domains: ["Healthcare", "Consumer"],
      fullWidth: true,
    },
  ],
  Brands: [
    {
      image: "/images/fika1.png",
      name: "Fika",
      description: "Connecting creatives over coffee IRL, inspired by the Swedish ritual",
      industry: "Community",
      frame: [2676, 820, 1603, 0, 1074, 820],
      panels: [[1604, 0, 652, 820], [2280, 0, 396, 400], [2280, 424, 396, 396]],
      /* Clicking the card opens reels from @fikacreatives.co, played through
         Instagram's own embed. */
      posts: [
        { reel: "DX7pBBsS6z0", caption: "Brand video: Fika is not a cafe" },
        { reel: "DW64Ks0jxsc", caption: "How to Fika in 3 simple steps" },
        { reel: "DWRs8rOE-Xq", caption: "Can AI replace creativity?" },
        { reel: "DVZJ01zgVOO", caption: "Frieze Week" },
        { reel: "DXhln3gD4pW", caption: "Cowork with Fika Creatives at Union Cowork" },
      ],
    },
    {
      image: "/images/Bib1.png",
      name: "Beauty in Balance",
      description: "A wellness brand for multihyphenates balancing career and creative work",
      industry: "Wellness",
      frame: [2676, 823, 1719, 0, 946, 824],
      panels: [[1720, 0, 460, 820], [2204, 4, 460, 816]],
      /* Clicking the card opens the Instagram posts and event visuals. */
      posts: [
        { src: "/images/bib/bib-website.mp4", poster: "/images/bib/bib-website-poster.jpg", caption: "Website" },
        { src: "/images/bib/bib-brand-intro.jpg", caption: "Brand intro post", alt: "Beauty in Balance intro post: career, community, wellness" },
        { src: "/images/bib/bib-brand-video.mp4", poster: "/images/bib/bib-brand-video-poster.jpg", caption: "Brand video" },
        { src: "/images/bib/bib-signature-series.jpg", caption: "The Signature Series launch", alt: "The Signature Series by Beauty in Balance post" },
        { src: "/images/bib/bib-tour-pillars.jpg", caption: "Signature Series tour", alt: "Post reading: Each pillar of branding, revealed soon" },
      ],
    },
    {
      image: "/images/jaal2.png",
      name: "Jal Sauces",
      description: "An Indian simmer sauce brand to pair with a variety of dishes",
      industry: "Simmer sauce",
      frame: [2676, 817, 1873, 0, 774, 774],
      panels: [[1872, 0, 776, 776]],
    },
    {
      image: "/images/motion1.png",
      name: "Motion Coffee Co.",
      description: "A Range Rover coffee cart concept with Pakistani-inspired flavors",
      industry: "Coffee cart",
      frame: [2682, 817, 1222, 0, 1460, 818],
      panels: [[1224, 0, 844, 816], [2112, 0, 568, 808]],
    },
    {
      image: "/images/ortho1.png",
      name: "Lokahi Orthodontics",
      description: "A Hawaiian-inspired clinic built on beauty, balance and breath",
      industry: "Orthodontics",
      frame: [2676, 816, 1835, 0, 842, 816],
      panels: [[1836, 0, 840, 816]],
      /* Its panel is rounder than the rest; this fills the corners the shared
         radius uncovers, in the panel's own color over the page. */
      panelFill: "#F3EDE9",
      /* Clicking the card opens the brand and graphic style guide, one page per
         slide, rendered from the PDF in /images/lokahi. */
      guide: {
        pdf: "/images/lokahi/lokahi-brand-guide.pdf",
        pages: [
          { src: "/images/lokahi/lokahi-guide-1.jpg", caption: "Cover", alt: "Lokahi Orthodontics wordmark: harmony in every smile" },
          { src: "/images/lokahi/lokahi-guide-2.jpg", caption: "Mission", alt: "Lokahi mission statement, established 2026" },
          { src: "/images/lokahi/lokahi-guide-3.jpg", caption: "Social media assets", alt: "Before and after social media posts" },
          { src: "/images/lokahi/lokahi-guide-4.jpg", caption: "Color palette", alt: "Sage, cream, deep green and blush color swatches" },
          { src: "/images/lokahi/lokahi-guide-5.jpg", caption: "Header type: Ivy Presto Italic", alt: "Ivy Presto Italic header type samples" },
          { src: "/images/lokahi/lokahi-guide-6.jpg", caption: "Body type: Authentic Sans", alt: "Authentic Sans body type samples: Beauty. Balance. Breath." },
          { src: "/images/lokahi/lokahi-guide-7.jpg", caption: "Placements", alt: "The brand applied to signage and print" },
          { src: "/images/lokahi/lokahi-guide-8.jpg", caption: "Sign-off", alt: "Lokahi Orthodontics: beauty, balance, breath" },
        ],
      },
    },
  ],
};


/* Types `text` out once, letter by letter, the first time it scrolls into view,
   with a caret that blinks while typing and then goes away. The full text sits
   invisibly underneath so nothing shifts, and screen readers get it straight away.
   Readers who prefer less motion see the finished text. */
const TYPE_MS = 75;

function Typewriter({ text }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const id = setTimeout(() => setCount((n) => n + 1), TYPE_MS);
    return () => clearTimeout(id);
  }, [started, count, text]);

  const typing = count < text.length;
  return (
    <span ref={ref} className="typewriter" aria-label={text}>
      <span className="typewriter-ghost" aria-hidden="true">{text}</span>
      <span className="typewriter-typed" aria-hidden="true">
        {text.slice(0, count)}
        {typing && <span className="typewriter-caret" />}
      </span>
    </span>
  );
}

/* Section heading + optional muted subtitle, shared by every section below the
   intro so they all open the same way. `typewriter` types the title out once. */
function SectionHeading({ title, subtitle, typewriter }) {
  return (
    <div style={subtitle ? styles.sectionHead : styles.sectionHeadBare}>
      <h2 style={styles.sectionTitle}>{typewriter ? <Typewriter text={title} /> : title}</h2>
      {subtitle && <p style={styles.sectionSubtitle}>{subtitle}</p>}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Products");
  const [domain, setDomain] = useState(null);
  const tabCards = CARDS[activeTab];
  const domains = DOMAINS.filter((d) => tabCards.some((c) => c.domains?.includes(d)));
  const cards = domain ? tabCards.filter((c) => c.domains?.includes(domain)) : tabCards;

  const introRef = useFadeIn();
  const workRef = useFadeIn();
  const { regionRef, viewportRef, trackRef } = usePinnedTrack(`${activeTab}-${domain}`);
  const valuesRef = useFadeIn();
  const toolsRef = useFadeIn();

  return (
    <SiteShell>
        {/* Intro: portrait on the left, copy on the right, kept short so the work
            starts above the fold. */}
        <section ref={introRef} className="fade-section home-intro">
          <div className="home-portrait">
            <img src="/images/sonika-portrait.jpg" alt="Sonika smiling in front of a wall of bougainvillea at sunset" />
          </div>

          <div className="home-intro-copy">
            <h1 className="home-intro-title">
              Hello <span className="wave-emoji" role="img" aria-label="waving hand">👋🏼</span> I'm Sonika.
            </h1>
            <p className="home-intro-lead">
              I'm an AI-native UX/UI designer who cares deeply about <strong>making genuinely valuable products for users</strong>. I've designed tools that help clinicians prescribe medications, small businesses get funding, credit unions experience intuitive software, and managers coach their teams.
            </p>
            {/* Roles in order, with each company's wordmark standing in for its name. */}
            <p className="home-intro-lead home-intro-history">
              Previously{" "}
              {ROLE_GROUPS.map((group, i) => (
                <React.Fragment key={group.role}>
                  {i > 0 && (i === ROLE_GROUPS.length - 1 ? ", and " : ", ")}
                  {group.role} at{" "}
                  {group.items.map((item, j) => (
                    <React.Fragment key={item.company}>
                      {j > 0 && (j === group.items.length - 1 ? " and " : " ")}
                      <img
                        className="home-intro-logo"
                        src={item.logo}
                        alt={item.company}
                        title={item.company}
                        style={{ height: Math.round(Math.sqrt(LOGO_AREA / item.aspect) * (item.scale || 1)) }}
                      />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
              .
            </p>
          </div>
        </section>

        {/* Work */}
        <section ref={workRef} className="fade-section">
          <div ref={regionRef} className="work-region">
          <div className="work-sticky">
          {/* Heading on the left, tabs on the right of the same row. */}
          <div className="work-head">
            <SectionHeading typewriter title="I've built" subtitle="Selected products, brands and side projects." />
            <div style={styles.tabs}>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  style={tab === activeTab ? { ...styles.tab, ...styles.tabActive } : styles.tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setDomain(null);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {domains.length > 0 && (
            <div className="work-filters" role="group" aria-label="Filter by domain">
              {[null, ...domains].map((d) => (
                <button
                  key={d || "all"}
                  type="button"
                  className="work-filter"
                  aria-pressed={domain === d}
                  onClick={() => setDomain(d)}
                >
                  {d || "All"}
                </button>
              ))}
            </div>
          )}

          <div ref={viewportRef} className="work-viewport">
          <div
            ref={trackRef}
            className={activeTab === "Brands" ? "project-grid project-track project-grid--single" : "project-grid project-track"}
            aria-live="polite"
          >
            {cards.length > 0 ? (
              activeTab === "Brands"
                ? cards.map((card) => (
                    <BrandCard
                      key={card.image}
                      image={card.image}
                      name={card.name}
                      description={card.description}
                      industry={card.industry}
                      frame={card.frame}
                      panels={card.panels}
                      panelFill={card.panelFill}
                      campaigns={card.campaigns}
                      posts={card.posts}
                      guide={card.guide}
                    />
                  ))
                : cards.map((card) => (
                    <ProjectCard
                      key={card.company}
                      company={card.company}
                      description={card.description}
                      result={card.result}
                      industry={card.industry}
                      accent={card.bg}
                      image={card.image}
                      video={card.video}
                      layer={card.layer}
                      noMotion={card.noMotion}
                      house={card.house}
                      slug={card.slug}
                      fullWidth={card.fullWidth}
                      crop={card.crop}
                      scene={card.scene}
                      screen={card.screen}
                      focus={card.focus}
                      ground={card.ground}
                      logo={card.logo}
                      brandName={card.brandName}
                      fit={card.fit}
                      bleed={card.bleed}
                    />
                  ))
            ) : (
              <p style={styles.empty}>Coming soon</p>
            )}
          </div>
          </div>
          </div>
          </div>
        </section>

        {/* Tools beside Skills */}
        <section ref={toolsRef} className="fade-section fold-columns">
          <div>
            <SectionHeading typewriter title="I build with" />
            <div className="tools-grid">
              {TOOL_LIST.map((tool) => (
                <div key={tool.name}>
                  <p style={styles.entryTitle}>{tool.name}</p>
                  <p style={styles.entryMeta}>{tool.use}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading typewriter title="I specialize in" />
            <div className="skills-grid">
              {SKILLS.map((skill) => (
                <p key={skill} style={styles.entryTitle}>{skill}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="fade-section">
          <SectionHeading typewriter title="I prioritize" />
          <div className="values-grid">
            {VALUES.map((v) => (
              <ValueCard key={v.title} {...v} />
            ))}
          </div>
        </section>

    </SiteShell>
  );
}

/* Every brand panel is clipped to the same corner radius, as a fraction of the
   tile (18px on a 480px card), whatever radius its artwork was exported with. */
const PANEL_RADIUS = 0.0375;

/* Places a board so the box [x, y, w, h] inside it fits a square tile, centered,
   inset by `pad` (a fraction of the tile) on the box's longer side. */
function frameStyle([boardW, boardH, x, y, w, h], pad = 0.08, top = pad) {
  /* The box fits the area left under `top`, centered in it. */
  const fit = Math.min((1 - 2 * pad) / w, (1 - top - pad) / h);
  const pct = (n) => `${n * 100}%`;
  return {
    position: "absolute",
    maxWidth: "none",
    width: pct(boardW * fit),
    height: pct(boardH * fit),
    left: pct(0.5 - (x + w / 2) * fit),
    top: pct(top + (1 - top - pad) / 2 - (y + h / 2) * fit),
  };
}

/* A clip path of the board's panels, each a rounded rect at PANEL_RADIUS. It is
   in the board image's own box (objectBoundingBox), so the radius is converted
   per axis from tile units to that box. */
function PanelClip({ id, frame: [boardW, boardH, , , w, h], panels, pad = 0.08 }) {
  const fit = (1 - 2 * pad) / Math.max(w, h);
  const rx = PANEL_RADIUS / (boardW * fit);
  const ry = PANEL_RADIUS / (boardH * fit);
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <clipPath id={id} clipPathUnits="objectBoundingBox">
        {panels.map(([x, y, pw, ph]) => (
          <rect key={`${x}-${y}`} x={x / boardW} y={y / boardH} width={pw / boardW} height={ph / boardH} rx={rx} ry={ry} />
        ))}
      </clipPath>
    </svg>
  );
}

function BrandCard({ image, name, description, industry, frame, panels, panelFill, campaigns, posts, guide }) {
  const ref = useFadeIn();
  const dialogRef = useRef(null);
  const clickable = Boolean(campaigns || posts || guide);
  const clipId = `brand-panels-${String(name || image).replace(/[^a-z0-9]/gi, "")}`;
  const kind = guide ? "brand and graphic styles" : posts ? "Instagram posts" : "email campaigns";

  /* Same square tile and caption as the product cards. The board's own copy
     (category, name, blurb) moves into the caption, so the tile shows only the
     visuals from the right of each board, whole: `frame` is the board's size and
     the box around those visuals, [boardW, boardH, x, y, w, h] in pixels, and the
     box is scaled to fit the square with a margin on every side. The boards have
     transparent backgrounds, so the margin is simply the page. */
  const tile = (
    <div className="home-card-tile home-card-tile--still">
      <div className="home-card-zoom">
        {frame && panels ? (
          <>
            <PanelClip id={clipId} frame={frame} panels={panels} />
            <div style={{ ...frameStyle(frame), clipPath: `url(#${clipId})`, background: panelFill }}>
              <img src={image} alt="" className="home-card-image" style={{ height: "100%" }} />
            </div>
          </>
        ) : (
          <img src={image} alt="" className="home-card-image" style={frame ? frameStyle(frame) : undefined} />
        )}
      </div>
    </div>
  );
  const caption = (
    <div className="home-card-caption">
      <div className="home-card-copy">
        {description && <p className="home-card-description">{description}</p>}
        {clickable && <p className="home-card-result">See the {kind}</p>}
      </div>
      <div className="home-card-tags">
        {name && <span className="home-card-tag home-card-tag--name">{name}</span>}
        {industry && <span className="home-card-tag">{industry}</span>}
      </div>
    </div>
  );

  if (!clickable) {
    return (
      <div ref={ref} className="fade-section">
        {tile}
        {caption}
      </div>
    );
  }

  /* Cards with campaigns, posts or a guide are buttons that open a native dialog:
     it traps focus, closes on Escape, and a click on the backdrop closes it too. */
  const title = guide ? "brand and graphic styles" : posts ? "Instagram" : "email campaigns";
  const sub = guide
    ? `Logo, color, type and placements from the ${name} brand guide.`
    : posts
      ? `Posts and event visuals made for the ${name} Instagram.`
      : `Newsletters sent to the ${name} community from beehiiv.`;
  return (
    <div ref={ref} className="fade-section">
      <button
        type="button"
        className="brand-card-button home-card-link"
        onClick={() => dialogRef.current?.showModal()}
      >
        {tile}
        {caption}
      </button>
      <dialog
        ref={dialogRef}
        className="campaign-dialog"
        aria-labelledby={`${name}-campaigns-title`}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      >
        <div className="campaign-dialog-inner">
          <header className="campaign-dialog-head">
            <div>
              <h2 id={`${name}-campaigns-title`} className="campaign-dialog-title">
                {name} {title}
              </h2>
              <p className="campaign-dialog-sub">
                {sub}
                {guide && (
                  <>
                    {" "}
                    <a className="campaign-link" href={guide.pdf} target="_blank" rel="noreferrer">
                      Open the PDF ↗
                    </a>
                  </>
                )}
              </p>
            </div>
            <button type="button" className="campaign-dialog-close" aria-label="Close" onClick={() => dialogRef.current?.close()}>
              ×
            </button>
          </header>
          {guide && (
            <div className="ig-grid ig-grid--single">
              {guide.pages.map((page) => (
                <figure key={page.src} className="ig-post">
                  <img src={page.src} alt={page.alt} loading="lazy" />
                  <figcaption>{page.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
          {posts && (
            <div className="ig-grid">
              {posts.map((post) => (
                <figure key={post.src || post.reel} className="ig-post">
                  {post.reel ? (
                    <div className="ig-reel-frame">
                      <iframe
                        className="ig-reel"
                        src={`https://www.instagram.com/reel/${post.reel}/embed/`}
                        title={`${name} reel: ${post.caption}`}
                        loading="lazy"
                        scrolling="no"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : post.poster ? (
                    <video src={post.src} poster={post.poster} controls muted playsInline preload="none" />
                  ) : (
                    <img src={post.src} alt={post.alt} loading="lazy" />
                  )}
                  <figcaption>{post.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
          {campaigns?.map((c) => (
            <article key={c.url} className="campaign">
              <div className="campaign-meta">
                <p className="campaign-title">{c.title}</p>
                <p className="campaign-date">{c.subtitle} · {c.date}</p>
                <a className="campaign-link" href={c.url} target="_blank" rel="noreferrer">
                  Read on beehiiv ↗
                </a>
              </div>
              <img className="campaign-image" src={c.image} alt={`The "${c.title}" email`} loading="lazy" />
            </article>
          ))}
        </div>
      </dialog>
    </div>
  );
}

/* Every product screen sits the same distance from the tile's edge: SCREEN_INSET
   of the tile on all four sides (the Brands tiles use the same 8%).
   - `screen` [stillW, stillH, x, y, w, h]: the app window's box in the still. The
     window is cropped to a square at the inset and laid on `ground`; `focus`
     (0–1) slides the crop along the screen's longer side. Clips and layers are
     placed in % of the still, so they move with it.
   - `fit` [stillW, stillH, x, y, w, h]: a group of panels already on its own ground
     (Square). The still is scaled so the group fits inside the inset, centered.
   - `bleed`: enterprise screens keep the inset on the top, left and bottom and
     run off the right edge, so more of the wide app shows.
   Without either, the still fills the tile's height as before (`crop`). */
const SCREEN_INSET = 0.08;
/* Tiles on a colour ground carry the project's logo in white along the top, so their
   screen starts lower: BRAND_TOP of the tile from the top edge, not the inset. */
const BRAND_TOP = 0.2;

function Framing({ screen, focus = 0, ground, fit, crop, bleed, brand, children }) {
  const top = brand ? BRAND_TOP : SCREEN_INSET;
  const windowStyle = brand ? { top: `${BRAND_TOP * 100}%` } : undefined;
  if (screen && bleed) {
    /* Inset top, left and bottom; the screen runs off the tile's right edge. The
       screen's height fills the window. */
    const [stillW, stillH, x, y, , h] = screen;
    const tall = 1 - top - SCREEN_INSET;
    const wide = 1 - SCREEN_INSET;
    const pctX = (n) => `${(n / h) * (tall / wide) * 100}%`;
    const pctY = (n) => `${(n / h) * 100}%`;
    return (
      <div className="home-card-ground" style={{ background: ground }}>
        <div className="home-card-window home-card-window--bleed" style={windowStyle}>
          <div
            className="home-card-frame"
            style={{ width: pctX(stillW), height: pctY(stillH), left: pctX(-x), top: pctY(-y) }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
  if (screen) {
    /* The window is square at the plain inset and wider than tall under a logo; the
       screen is cropped to the window's shape, and `focus` slides the crop along
       whichever side has room to spare. */
    const [stillW, stillH, x, y, w, h] = screen;
    const shape = (1 - 2 * SCREEN_INSET) / (1 - top - SCREEN_INSET);
    const cropW = Math.min(w, h * shape);
    const cropH = cropW / shape;
    const offX = focus * (w - cropW);
    const offY = focus * (h - cropH);
    const pctX = (n) => `${(n / cropW) * 100}%`;
    const pctY = (n) => `${(n / cropH) * 100}%`;
    return (
      <div className="home-card-ground" style={{ background: ground }}>
        <div className="home-card-window" style={windowStyle}>
          <div
            className="home-card-frame"
            style={{ width: pctX(stillW), height: pctY(stillH), left: pctX(-(x + offX)), top: pctY(-(y + offY)) }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
  if (fit) {
    const frame = (
      <div
        className={ground ? "home-card-frame home-card-frame--float" : "home-card-frame"}
        style={frameStyle(fit, SCREEN_INSET, brand ? BRAND_TOP : undefined)}
      >
        {children}
      </div>
    );
    /* Panels cut out of their still float on the tile's colour. */
    return ground ? (
      <div className="home-card-ground" style={{ background: ground }}>
        {frame}
      </div>
    ) : (
      frame
    );
  }
  return (
    <div className="home-card-stage" style={crop ? { "--crop": crop } : undefined}>
      {children}
    </div>
  );
}

/* Card clips sit hidden and paused until the card is hovered or focused, then
   fade in and play from the start. Touch screens can't hover, so there they
   autoplay as before; readers who ask for less motion keep the still. */
const prefersStill = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ProjectCard({ company, description, result, industry, accent, image, video, layer, house, noMotion, slug, fullWidth, crop, scene, screen, focus, ground, fit, bleed, logo, brandName }) {
  const ref = useFadeIn();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (video && !canHover && !prefersStill()) setPlaying(true);
  }, [video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [playing]);

  const start = () => {
    if (canHover && !prefersStill()) setPlaying(true);
  };
  const stop = () => {
    if (canHover) setPlaying(false);
  };

  /* A quiet tile with the copy underneath it: the description on the left, the
     project name and industry as small tags on the right (.home-card-* in
     index.css). The caption names the project, so the still's alt stays empty. */
  // Tiles on a colour ground (see `tone`) carry the project's logo along the top.
  const brand = Boolean(ground) || scene === "coach-bo";

  const tile = (
    <div className={video || noMotion ? "home-card-tile" : "home-card-tile home-card-tile--still"}>
      {/* The tile is square; the stage keeps the artwork's own proportions,
          fills the tile's height and crops the sides, so the clip and layer
          percentages below still line up with the still. */}
      <div className="home-card-zoom">
      {scene === "coach-bo" ? (
        <CoachBoCard />
      ) : (
      <Framing screen={screen} focus={focus} ground={ground} fit={fit} crop={crop} bleed={bleed} brand={brand}>
      <img
        src={image}
        alt=""
        className="home-card-image"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      {video && (
        <video
          ref={videoRef}
          className={playing ? "home-card-video is-playing" : "home-card-video"}
          src={video.src}
          preload="metadata"
          loop
          muted
          playsInline
          aria-hidden="true"
          style={{
            left: video.left,
            top: video.top,
            width: video.width,
            height: video.height,
            ...(video.radius !== undefined && { borderRadius: video.radius }),
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
      {layer && (
        <img
          src={layer.src}
          alt=""
          className="home-card-layer"
          style={{ left: layer.left, top: layer.top, width: layer.width, height: layer.height }}
        />
      )}
      {house && <HomeaseHouse style={house} />}
      {scene === "square-slider" && <SquareSliderCard />}
      </Framing>
      )}
      </div>
      {/* The project's logo in white on the colour, outside the zoom so it holds still.
          Projects without a logo file set their name in white instead. */}
      {brand && (
        <div className="home-card-brand" aria-hidden="true">
          {logo ? (
            <img src={logo.src} alt="" style={{ aspectRatio: logo.aspect }} />
          ) : (
            <span>{brandName || company}</span>
          )}
        </div>
      )}
    </div>
  );

  const caption = (
    <div className="home-card-caption">
      <div className="home-card-copy">
        <p className="home-card-description">{description}</p>
        {result && <p className="home-card-result">{result}</p>}
      </div>
      <div className="home-card-tags">
        <span className="home-card-tag home-card-tag--name" style={accent ? { color: accent } : undefined}>
          {company}
        </span>
        {industry && <span className="home-card-tag">{industry}</span>}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className="fade-section"
      style={fullWidth ? { gridColumn: "1 / -1" } : undefined}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      {slug ? (
        <Link to={`/projects/${slug}`} className="home-card-link">
          {tile}
          {caption}
        </Link>
      ) : (
        <>
          {tile}
          {caption}
        </>
      )}
    </div>
  );
}

/* Page width, padding and every grid live in index.css (.home-page and the
   grid block); the spacing tokens used below are defined there too. */
const styles = {
  /* Heading to its content: 24px in all (8px under the title + 16px), tighter
     than the 40px --space-block used between other blocks. */
  sectionHead: {
    marginBottom: 16,
  },
  sectionHeadBare: {
    marginBottom: 16,
  },
  sectionTitle: {
    display: "inline-block",
    margin: "0 0 8px",
    fontSize: 20,
    fontWeight: 600,
    color: "#4E4E4E",
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
  sectionSubtitle: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.6,
    color: "#6B6B6B",
  },
  /* Stacked list entries (Tools): title line, muted line beneath. */
  entryList: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  entryTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    color: "#111",
  },
  entryMeta: {
    margin: "2px 0 0",
    fontSize: 13,
    lineHeight: 1.5,
    color: "#6B6B6B",
  },
  tabs: {
    display: "flex",
    gap: 8,
  },
  tab: {
    border: "none",
    background: "transparent",
    padding: "8px 20px",
    borderRadius: 20,
    /* Same type as the Skills/Experience entries (styles.entryTitle). */
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    color: "rgba(0,0,0,0.62)",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background-color 150ms ease, color 150ms ease",
  },
  tabActive: {
    background: "#E6E2DB",
    color: "#111",
  },
  brandsSubtitle: {
    margin: "0 0 20px",
    fontSize: 14,
    color: "#4E4E4E",
    lineHeight: 1.6,
  },
  empty: {
    color: "#4E4E4E",
    fontSize: 15,
    gridColumn: "1 / -1",
    margin: 0,
    paddingTop: 8,
  },
};
