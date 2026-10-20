import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SiteShell, { NavLink, textStyles } from "./SiteShell";
import HomeaseHouse from "./projects/homease/HomeaseHouse";

/* Company marks live in public/images/logos: square marks as 128px transparent
   PNGs, and mark-plus-name logos (Criteria, Square, AT&T) as wordmarks. They sit
   in a greyed-out strip under the intro, all at one height. */
const EXPERIENCE = [
  { company: "Fika",            logo: "/images/logos/fika.png",        role: "Lead Product Designer / Founder" },
  { company: "Criteria",        logo: "/images/logos/criteria-wordmark.png",    role: "Senior UX Designer" },
  { company: "Honeybee Health", logo: "/images/logos/honeybee.png",    role: "Product Designer" },
  { company: "Square (Block)",  logo: "/images/logos/square-wordmark.svg",       role: "Product Designer" },
  { company: "Philosophie",     logo: "/images/logos/philosophie.png", role: "Product Designer" },
  { company: "AT&T",            logo: "/images/logos/att-wordmark.svg",         role: "Engineer / UX Designer" },
];

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
    title: "Balance",
    bg: "#B8C4B2",
    textColor: "#2A2A2A",
    description: "Not just in visual form, but in interacting with product stakeholders and balancing user needs with a business.",
  },
  {
    title: "Systems Thinking",
    bg: "#FFFFFF",
    textColor: "#2A2A2A",
    description: "I apply a system-driven approach to designing large-scale applications.",
  },
  {
    title: "Collaboration",
    bg: "#E4E4E4",
    textColor: "#2A2A2A",
    description: "Design is a collaborative sport. I align stakeholders to ensure the design process is inclusive.",
  },
  {
    title: "Intentionality",
    bg: "#FFFFFF",
    textColor: "#2A2A2A",
    description: "I focus on reducing unnecessary complexity, and creating experiences that feel purposeful rather than just polished.",
  },
  {
    title: "Empathy",
    bg: "#2D2D2D",
    textColor: "#FFFFFF",
    description: "Great products start with understanding people. I design by uncovering the behaviors and frustrations behind user's actions.",
  },
  {
    title: "Diversity",
    bg: "#E4E4E4",
    textColor: "#2A2A2A",
    description: "I believe work comes from different perspectives, listening to customers, and being exposed to a variety of disciplines.",
  },
];


/* Touch screens never hover, so a tap toggles the card there instead. */
const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

function ValueCard({ title, description, bg, textColor }) {
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
        transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
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
          <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: textColor, fontFamily: "'TT', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{title}</p>
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

const TABS = ["Products", "Brands", "Playground"];

/* Industry filter for the Products tab, so a recruiter can jump to the work that
   matches their space. Each Products card carries one `industry`. */
const INDUSTRIES = ["Fintech", "Healthcare", "HR Tech", "Community"];

const CARDS = {
  Products: [
    {
      company: "Fika",
      description: "Engaging creative connection IRL through coffee",
      industry: "Community",
      bg: "#4B44AF",
      image: "/images/fika123.png",
      /* Looping screen recording layered over the flattened frame baked into
         the PNG. Position/size mirror the recording's rect in the Figma card
         (23,56 / 291×154 on a 337×265 tile) so it lines up with the still. */
      video: {
        src: "/images/fika/fika-card.mp4",
        left: "6.825%",
        top: "21.13%",
        width: "86.35%",
        height: "58.11%",
      },
      slug: "fika",
    },
    {
      company: "Criteria",
      description: "Personalized AI coaching for more effective management",
      industry: "HR Tech",
      bg: "#16112E",
      image: "/images/criteria.png",
      slug: "criteria",
    },
    {
      company: "Honeybee Health",
      description: "Enabling physicians to prescribe medications while protecting patient privacy",
      industry: "Healthcare",
      bg: "#0D1917",
      image: "/images/HBH.png",
      slug: "hbh-3",
    },
    {
      company: "Square",
      description: "Empowering small businesses with flexible financing.",
      industry: "Fintech",
      bg: "#3D5445",
      image: "/images/Square_full.png",
      slug: "square",
    },
    {
      company: "Co-op Solutions",
      description: "Modernizing legacy credit union software - Case study coming soon! ",
      industry: "Fintech",
      image: "/images/Springboard.png",
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
      fullWidth: true,
    },
  ],
  Brands: [
    { image: "/images/Bib1.png" },
    { image: "/images/jaal2.png" },
    { image: "/images/motion1.png" },
    { image: "/images/ortho1.png" },
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
  const [industry, setIndustry] = useState("All");
  const showIndustries = activeTab === "Products";
  const cards =
    showIndustries && industry !== "All"
      ? CARDS.Products.filter((card) => card.industry === industry)
      : CARDS[activeTab];

  const introRef = useFadeIn();
  const workRef = useFadeIn();
  const valuesRef = useFadeIn();
  const toolsRef = useFadeIn();

  return (
    <SiteShell nav={<NavLink to="/about">About</NavLink>}>
        {/* Intro */}
        <section ref={introRef} className="fade-section home-intro">
          <h1 style={{ ...textStyles.heading, fontSize: 44 }}>
            Hello <span className="wave-emoji" role="img" aria-label="waving hand">👋🏼</span> I'm Sonika.
          </h1>
          <p style={{ ...textStyles.lead, fontSize: 19, marginLeft: "auto", marginRight: "auto" }}>
          I'm a 0→1 product designer who cares about <strong>making genuinely valuable products</strong>. I've designed tools that help clinicians prescribe medications, small businesses get funding, credit unions to experience intuitive software, and managers coach their teams.</p>

          <ul className="logo-strip" aria-label="Companies I've worked with">
            {EXPERIENCE.map((item) => (
              <li key={item.company} title={`${item.company} · ${item.role}`}>
                <img src={item.logo} alt={item.company} style={styles.stripLogo} />
              </li>
            ))}
          </ul>
        </section>

        {/* Work */}
        <section ref={workRef} className="fade-section">
          <SectionHeading typewriter title="I've built" subtitle="Selected products, brands and side projects." />

          {/* Tabs on the left; on Products, the industry filter pills on the right
              of the same row. */}
          <div className="work-tabs-row">
          <div style={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab}
                style={tab === activeTab ? { ...styles.tab, ...styles.tabActive } : styles.tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {showIndustries && (
            <nav className="industry-nav" aria-label="Filter projects by industry">
              {["All", ...INDUSTRIES].map((name) => {
                const count =
                  name === "All" ? CARDS.Products.length : CARDS.Products.filter((c) => c.industry === name).length;
                return (
                  <button
                    key={name}
                    type="button"
                    className="industry-pill"
                    aria-pressed={industry === name}
                    onClick={() => setIndustry(name)}
                  >
                    {name}
                    <span className="industry-pill-count">{count}</span>
                  </button>
                );
              })}
            </nav>
          )}
          </div>

          <div className={activeTab === "Brands" ? "project-grid project-grid--single" : "project-grid"} aria-live="polite">
            {cards.length > 0 ? (
              activeTab === "Brands"
                ? cards.map((card) => (
                    <BrandCard key={card.image} image={card.image} />
                  ))
                : cards.map((card) => (
                    <ProjectCard
                      key={card.company}
                      company={card.company}
                      description={card.description}
                      image={card.image}
                      video={card.video}
                      house={card.house}
                      slug={card.slug}
                      fullWidth={card.fullWidth}
                    />
                  ))
            ) : (
              <p style={styles.empty}>Coming soon</p>
            )}
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

function BrandCard({ image }) {
  const [hovered, setHovered] = useState(false);
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className="fade-section"
      style={{
        ...styles.brandCard,
        background: hovered ? "#F7F3EC" : "transparent",
        transition: "background 0.2s ease, opacity 0.65s ease, transform 0.65s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={image} alt="" style={styles.brandImage} />
    </div>
  );
}

function ProjectCard({ company, description, image, video, house, slug, fullWidth }) {
  const ref = useFadeIn();

  /* Name and description sit inside the tile and are revealed by the overlay on
     hover. The hover state lives in CSS rather than React state so that keyboard
     focus and touch devices (which never hover) can be handled there too — see
     .home-card-* in index.css. */
  const tile = (
    <div className="home-card-tile">
      <img
        src={image}
        alt={company}
        className="home-card-image"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      {video && (
        <video
          className="home-card-video"
          src={video.src}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          style={{
            left: video.left,
            top: video.top,
            width: video.width,
            height: video.height,
            ...(video.radius && { borderRadius: video.radius }),
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
      {house && <HomeaseHouse style={house} />}
      <div className="home-card-overlay">
        <p className="home-card-overlay-title">{company}</p>
        <p className="home-card-overlay-text">{description}</p>
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className="fade-section"
      style={fullWidth ? { gridColumn: "1 / -1" } : undefined}
    >
      {slug ? (
        <Link to={`/projects/${slug}`} className="home-card-link" aria-label={company}>
          {tile}
        </Link>
      ) : (
        tile
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
    color: "#8B8B8B",
  },
  /* Stacked list entries (Tools): title line, muted line beneath. */
  entryList: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  stripLogo: {
    display: "block",
    height: 32,
    width: "auto",
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
    color: "#8B8B8B",
  },
  /* Spacing below the row lives on .work-tabs-row (index.css). */
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
    color: "rgba(0,0,0,0.50)",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.15s, color 0.15s",
  },
  tabActive: {
    background: "#E6E2DB",
    color: "#111",
  },
  brandCard: {
    borderRadius: 24,
    padding: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandImage: {
    display: "block",
    maxWidth: "100%",
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
