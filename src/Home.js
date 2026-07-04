import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/SPFavicon1.png";

const EXPERIENCE = [
  { company: "Fika",            industry: "Community/ Consumer tech" },
  { company: "Criteria",        industry: "HR tech" },
  { company: "Honeybee Health", industry: "Health tech" },
  { company: "Square",          industry: "Fintech" },
  { company: "Philosophie",     industry: "Fintech" },
  { company: "USC",             industry: "Arts, Tech and Business" },
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
    description: "To grow is to be exposed to a variety of people and areas. Throughout my career, I've designed, launched and scaled products across industries." ,
  },
];


function ValueCard({ title, description, bg, textColor }) {
  const [flipped, setFlipped] = useState(false);
  const needsBorder = bg === "#FFFFFF";
  return (
    <div
      style={{ perspective: 800, cursor: "pointer", height: 140 }}
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
          borderRadius: 16,
          padding: 24,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: textColor, fontFamily: "IvyPresto" }}>{title}</p>
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0,
          background: bg,
          border: needsBorder ? "1px solid rgba(0,0,0,0.09)" : "none",
          borderRadius: 16,
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
      title: "Connecting creatives over coffee - Fika",
      bg: "#4B44AF",
      image: "/images/fika.png",
      slug: "fika",
    },
    {
      title: "AI-powered coaching for managers - Criteria",
      bg: "#16112E",
      image: "/images/criteria.png",
      slug: "criteria",
    },
    {
      title: "E-prescription for doctors - Honeybee Health",
      bg: "#0D1917",
      image: "/images/honeybee.png",
      slug: "honeybee-health",
    },
    {
      title: "Credit options for small businesses - Square",
      bg: "#3D5445",
      image: "/images/square.png",
      slug: "square",
    },
  ],
  Brands: [
    { image: "/images/Bib1.png" },
    { image: "/images/jaal2.png" },
    { image: "/images/motion1.png" },
    { image: "/images/ortho1.png" },
  ],
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("Product Design");
  const topRef = useFadeIn();
  const valuesRef = useFadeIn();
  const workRef = useFadeIn();

  return (
    <div style={styles.page}>
      {/* Top two-column section */}
      <div ref={topRef} className="top-section fade-section" style={styles.topSection}>
        {/* Left: identity + bio */}
        <div style={styles.leftCol}>
          <img src={logo} style={styles.logo} alt="Sonika Patel" />
          <h1 style={styles.heading}>Sonika Patel</h1>
          <p style={styles.tagline}>
            0→1 product builder. designer. mini-canvas painter.
          </p>
          <p style={styles.bio}>
            Hello <span className="wave-emoji" role="img" aria-label="waving hand">👋🏼</span> I'm Sonika (So-knee-kah), a 0→1 product designer who loves turning ideas into products people genuinely find valuable. I'm driven by curiosity, strong values, and I bring a technical foundation to designing thoughtful experiences, balancing user needs and business goals.
          </p>
        </div>

        {/* Right: experience list */}
        <div style={styles.rightCol}>
          <p style={styles.expLabel}>Experience</p>
          {EXPERIENCE.map((item) => (
            <div key={item.company} style={styles.expRow}>
              <span style={styles.expCompany}>{item.company}</span>
              <span style={styles.expIndustry}>{item.industry}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div ref={valuesRef} className="fade-section" style={styles.valuesSection}>
        <p style={styles.valuesLabel}>Values</p>
        <p style={styles.valuesQuote}>
          <strong>"When you know your why, you can endure any how."</strong>
        </p>
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
                <ProjectCard key={card.title} title={card.title} image={card.image} slug={card.slug} />
              ))
        ) : (
          <p style={styles.empty}>Coming soon</p>
        )}
      </div>
      </div>
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

function ProjectCard({ title, image, slug }) {
  const [hovered, setHovered] = useState(false);
  const ref = useFadeIn();

  const img = (
    <img
      src={image}
      alt={title}
      style={{
        ...styles.cardImage,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: slug ? "pointer" : "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );

  const inner = slug ? (
    <Link to={`/projects/${slug}`} style={{ display: "block", textDecoration: "none" }}>
      {img}
    </Link>
  ) : img;

  return (
    <div ref={ref} className="fade-section">
      {inner}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "56px 40px 80px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#111",
    boxSizing: "border-box",
  },
  topSection: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 96,
    alignItems: "end",
    marginBottom: 96,
  },
  leftCol: {},
  rightCol: {
    paddingTop: 4,
  },
  logo: {
    width: 42,
    height: 42,
    objectFit: "contain",
    marginBottom: 20,
    display: "block",
  },
  heading: {
    margin: 0,
    fontSize: 48,
    fontWeight: 800,
    fontFamily: "IvyPresto",
    color: "#4B4B4B",
    letterSpacing: "-0.02em",
    lineHeight: 1.05,
  },
  tagline: {
    margin: "8px 0 28px",
    fontSize: 12,
    fontWeight: 400,
    color: "rgba(0,0,0,0.52)",
    letterSpacing: "0.01em",
  },
  bio: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: "#4E4E4E",
  },
  expLabel: {
    margin: "0 0 16px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.38)",
  },
  expRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "12px 0",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  expCompany: {
    fontSize: 14,
    fontWeight: 500,
    color: "#2A2A2A",
  },
  expIndustry: {
    fontSize: 12,
    color: "rgba(0,0,0,0.42)",
    textAlign: "right",
    marginLeft: 12,
  },
  valuesSection: {
    marginBottom: 96,
  },
  valuesLabel: {
    margin: "0 0 12px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.38)",
  },
  valuesQuote: {
    margin: "0 0 24px",
    fontSize: 15,
    color: "#2A2A2A",
    lineHeight: 1.5,
  },
  valuesQuoteSub: {
    color: "rgba(0,0,0,0.42)",
    fontWeight: 400,
  },
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
  cardImage: {
    display: "block",
    width: "100%",
    borderRadius: 20,
    transition: "transform 0.2s ease",
  },
  brandsSubtitle: {
    margin: "0 0 20px",
    fontSize: 14,
    color: "rgba(0,0,0,0.52)",
    lineHeight: 1.6,
  },
  empty: {
    color: "rgba(0,0,0,0.35)",
    fontSize: 15,
    gridColumn: "1 / -1",
    margin: 0,
    paddingTop: 8,
  },
};
