import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/SPFavicon1.png";

const EXPERIENCE = [
  { company: "Fika",            industry: "Community/ Consumer tech",        role: "Lead Product Designer / Founder" },
  { company: "Criteria",        industry: "HR tech",                         role: "Senior UX Designer" },
  { company: "Honeybee Health", industry: "Health tech",                     role: "Product Designer" },
  { company: "Square (Block)",  industry: "Fintech",                         role: "Product Designer" },
  { company: "Philosophie",     industry: "Fintech",                         role: "Product Designer" },
  { company: "AT&T",            industry: "Networks and Sales Operations",   role: "Engineer / UX Designer" },
];

/* The tools list that sits above the fold. */
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
  "UX Copy and Messaging",
];

const VALUES = [
  {
    title: "Balance",
    bg: "#B8C4B2",
    textColor: "#2A2A2A",
    description: "Not just in visual form, but in interacting with product stakeholders and balancing user needs with a business.",
  },
  {
    title: "Think in Systems",
    bg: "#FFFFFF",
    textColor: "#2A2A2A",
    description: "Products are not shipped one off. Every feature or product I've designed is considered holistically.",
  },
  {
    title: "Speed",
    bg: "#E4E4E4",
    textColor: "#2A2A2A",
    description: "Never compromising on craft, I balance moments that require intuitive conviction with moments where speed, learning, and iteration lead the way.",
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
    description: "Great products start with understanding people. I design by uncovering the behaviors and frustrations behind user actions.",
  },
  {
    title: "Diversity",
    bg: "#E4E4E4",
    textColor: "#2A2A2A",
    description: "I believe work comes from different perspectives, listening to customers, and being exposed to a variety of disciplines.",
  },
];


function ValueCard({ title, description, bg, textColor }) {
  const [flipped, setFlipped] = useState(false);
  const needsBorder = bg === "#FFFFFF";
  return (
    <div
      style={{ perspective: 800, cursor: "pointer", height: "var(--flip-card-height)" }}
      onClick={() => setFlipped(f => !f)}
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
          borderRadius: 8,
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
          borderRadius: 8,
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

const TABS = ["Product Design", "Brands"];

const CARDS = {
  "Product Design": [
    {
      company: "Fika",
      description: "Empowering creative connections through the usual routine of coffee.",
      bg: "#4B44AF",
      image: "/images/fika123.png",
      slug: "fika",
    },
    {
      company: "Criteria",
      description: "Personalized AI coaching for more effective management",
      bg: "#16112E",
      image: "/images/criteria.png",
      slug: "criteria",
    },
    {
      company: "Honeybee Health",
      description: "Enabling physicians to prescribe medications while protecting patient privacy",
      bg: "#0D1917",
      image: "/images/HBH.png",
      slug: "hbh-3",
    },
    {
      company: "Square",
      description: "Empowering small businesses with flexible financing.",
      bg: "#3D5445",
      image: "/images/Square_full.png",
      slug: "square",
    },
    {
      company: "Co-op Solutions",
      description: "Modernizing legacy credit union software - Case study coming soon! ",
      image: "/images/Springboard.png",
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

const SERVICES = [
  {
    title: "Brand Audit",
    subtitle: "What's working on? What's not?",
    features: ["Audit of existing experience", "1 concept direction", "Logo/ Color palette/ Placement"],
  },
  {
    title: "Brand Conception",
    subtitle: "Businesses starting out who want to elevate the presence.",
    features: ["2 concept directions", "Brand colors", "Social Media Assets"],
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Product Design");
  const topRef = useFadeIn();
  const valuesRef = useFadeIn();
  const workRef = useFadeIn();

  return (
    <div style={styles.page}>
      {/* Above the fold: identity + bio, then experience and tools side by side */}
      <div ref={topRef} className="fade-section" style={styles.fold}>
        <div className="top-section" style={styles.topSection}>
          {/* Left: identity */}
          <div style={styles.leftCol}>
            <img src={logo} style={styles.logo} alt="Sonika Patel" />
            <h1 style={styles.heading}>Sonika Patel</h1>
            <p style={styles.tagline}>
              0→1 product builder. designer. mini-canvas painter.
            </p>
          </div>

          {/* Right: bio */}
          <div style={styles.bioCol}>
            <Link to="/about" style={styles.aboutLink}>About me ↗</Link>
            <p style={styles.bio}>
              Hello <span className="wave-emoji" role="img" aria-label="waving hand">👋🏼</span> I'm Sonika (So-knee-kah), a 0→1 product designer who deeply cares about <strong style={styles.bioEmphasis}>building genuinely valuable products</strong> across B2C community products, with experience building sustainable products for users across B2B healthtech, fintech, and HR tech.
            </p>
          </div>
        </div>

        <div className="fold-columns" style={styles.foldColumns}>
          {/* Experience */}
          <section style={styles.foldColumn}>
            <p style={styles.foldLabel}>Experience</p>
            <div style={styles.foldList}>
              {EXPERIENCE.map((item) => (
                <div key={item.company}>
                  <div style={styles.foldRow}>
                    <p style={styles.foldPrimary}>{item.company}</p>
                    {item.role && <p style={styles.foldRole}>{item.role}</p>}
                  </div>
                  <p style={styles.foldSecondary}>{item.industry}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tools, then Skills beneath it */}
          <div style={styles.foldColumn}>
            <section>
              <p style={styles.foldLabel}>Tools</p>
              <div style={styles.foldToolList}>
                {TOOL_LIST.map((tool) => (
                  <div key={tool.name} style={styles.foldRow}>
                    <p style={styles.foldPrimary}>{tool.name}</p>
                    <p style={styles.foldRole}>{tool.use}</p>
                  </div>
                ))}
              </div>
            </section>

            <section style={styles.foldSubSection}>
              <p style={styles.foldLabel}>Skills</p>
              <div style={styles.foldToolList}>
                {SKILLS.map((skill) => (
                  <p key={skill} style={styles.foldPrimary}>{skill}</p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Values */}
      <div ref={valuesRef} className="fade-section" style={styles.valuesSection}>
        <p style={{ ...styles.valuesLabel, marginBottom: 24 }}>Values</p>
        <div className="values-grid" style={styles.valuesGrid}>
          {VALUES.map((v) => (
            <ValueCard key={v.title} {...v} />
          ))}
        </div>
      </div>

      {/* Work eyebrow */}
      <div ref={workRef} className="fade-section">
      <p style={styles.valuesLabel}>Work</p>

      {/* Tabs */}
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

      {/* Brands subtitle */}
      {activeTab === "Brands" && (
        <p style={styles.brandsSubtitle}>I designed the brand identity &amp; logos for the following businesses.</p>
      )}

      {/* Cards grid */}
      <div className="project-grid" style={activeTab === "Brands" ? { gridTemplateColumns: "1fr" } : undefined}>
        {CARDS[activeTab].length > 0 ? (
          activeTab === "Brands"
            ? CARDS[activeTab].map((card) => (
                <BrandCard key={card.image} image={card.image} />
              ))
            : CARDS[activeTab].map((card) => (
                <ProjectCard
                  key={card.company}
                  company={card.company}
                  description={card.description}
                  image={card.image}
                  slug={card.slug}
                  fullWidth={card.fullWidth}
                />
              ))
        ) : (
          <p style={styles.empty}>Coming soon</p>
        )}
      </div>

      {/* Services */}
      {activeTab === "Brands" && (
        <div className="services-grid" style={styles.servicesGrid}>
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <a href="mailto:sonika2patel@gmail.com" style={styles.footerLink} aria-label="Email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 6-10 7L2 6" />
          </svg>
          <span>sonika2patel@gmail.com</span>
        </a>
        <a href="https://www.linkedin.com/in/sonikapatel/" target="_blank" rel="noopener noreferrer" style={styles.footerIconLink} aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z"/>
          </svg>
        </a>
      </footer>
    </div>
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

function ServiceCard({ title, subtitle, features }) {
  const [buttonHovered, setButtonHovered] = useState(false);
  return (
    <div style={styles.serviceCard}>
      <div>
        <h3 style={styles.serviceTitle}>{title}</h3>
        <p style={styles.serviceSubtitle}>{subtitle}</p>
      </div>
      <div style={styles.serviceFeatures}>
        {features.map((feature) => (
          <p key={feature} style={styles.serviceFeature}>{feature}</p>
        ))}
      </div>
      <a
        href="mailto:sonikapateldesigns@gmail.com"
        style={buttonHovered ? { ...styles.serviceButton, ...styles.serviceButtonHover } : styles.serviceButton}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
      >
        Contact for more information
      </a>
    </div>
  );
}

function ProjectCard({ company, description, image, slug, fullWidth }) {
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

/* Section eyebrows — Values, Work, Experience and Tools all share one treatment. */
const sectionLabel = {
  margin: "0 0 12px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(0,0,0,0.38)",
};

const styles = {
  page: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "56px 40px 80px",
    fontFamily: "'TT', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#111",
    boxSizing: "border-box",
  },
  fold: {
    marginBottom: 96,
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 51,
    marginBottom: 60,
  },
  leftCol: {
    flex: "0 1 320px",
    minWidth: 0,
  },
  bioCol: {
    flex: "0 1 320px",
    minWidth: 0,
  },
  logo: {
    width: 54,
    height: 54,
    objectFit: "contain",
    marginBottom: 12,
    display: "block",
  },
  heading: {
    margin: 0,
    fontSize: 40,
    fontWeight: 800,
    fontFamily: "IvyPresto",
    color: "#4B4B4B",
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  tagline: {
    margin: "6px 0 0",
    fontSize: 12,
    fontWeight: 400,
    color: "#4E4E4E",
    letterSpacing: "0.01em",
  },
  bio: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.488,
    color: "#4E4E4E",
  },
  bioEmphasis: {
    fontWeight: 500,
    color: "#4E4E4E",
  },
  aboutLink: {
    display: "inline-block",
    marginBottom: 14,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.38)",
    textDecoration: "none",
  },
  foldColumns: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 51,
  },
  foldColumn: {
    flex: "0 1 320px",
    minWidth: 0,
  },
  foldSubSection: {
    marginTop: 40,
  },
  foldLabel: { ...sectionLabel, margin: "0 0 15px" },
  foldList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  foldToolList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  foldRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  foldPrimary: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.488,
    color: "#000",
  },
  foldSecondary: {
    margin: 0,
    width: "100%",
    fontSize: 12,
    lineHeight: 1.488,
    color: "#8B8B8B",
  },
  foldRole: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.488,
    color: "#4C4C4C",
    textAlign: "right",
  },
  valuesSection: {
    marginBottom: 96,
  },
  valuesLabel: sectionLabel,
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },
  tabs: {
    display: "flex",
    gap: 8,
    marginBottom: 28,
  },
  tab: {
    border: "none",
    background: "transparent",
    padding: "8px 20px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(0,0,0,0.50)",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.15s, color 0.15s",
  },
  tabActive: {
    background: "#E6E2DB",
    color: "#111",
    fontWeight: 600,
  },
  brandCard: {
    borderRadius: 16,
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
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 16,
    marginTop: 32,
  },
  serviceCard: {
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 16,
    padding: 28,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 260,
    minWidth: 0,
    boxSizing: "border-box",
  },
  serviceTitle: {
    margin: "0 0 8px",
    fontSize: 22,
    fontWeight: 700,
    fontFamily: "IvyPresto",
    color: "#2A2A2A",
  },
  serviceSubtitle: {
    margin: 0,
    fontSize: 13,
    color: "#4E4E4E",
    lineHeight: 1.5,
  },
  serviceFeatures: {
    margin: "20px 0",
  },
  serviceFeature: {
    margin: "0 0 4px",
    fontSize: 13,
    fontWeight: 400,
    color: "#1A1A1A",
  },
  serviceButton: {
    display: "inline-block",
    alignSelf: "flex-start",
    background: "#E6E2DB",
    color: "#111",
    fontSize: 13,
    fontWeight: 500,
    padding: "10px 18px",
    borderRadius: 20,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.15s ease",
  },
  serviceButtonHover: {
    background: "#D8D2C6",
  },
  empty: {
    color: "#4E4E4E",
    fontSize: 15,
    gridColumn: "1 / -1",
    margin: 0,
    paddingTop: 8,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    marginTop: 96,
    paddingTop: 32,
    borderTop: "1px solid rgba(0,0,0,0.07)",
  },
  footerLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "rgba(0,0,0,0.52)",
    fontSize: 13,
    textDecoration: "none",
  },
  footerIconLink: {
    display: "flex",
    alignItems: "center",
    color: "rgba(0,0,0,0.52)",
  },
};
