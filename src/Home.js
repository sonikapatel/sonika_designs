import React, { useState } from "react";
import logo from "./assets/SPFavicon1.png";

const EXPERIENCE = [
  { company: "Fika",            industry: "Community/ Consumer tech" },
  { company: "Criteria",        industry: "HR tech" },
  { company: "Honeybee Health", industry: "Health tech" },
  { company: "Square",          industry: "Fintech" },
  { company: "Philosophie",     industry: "Fintech" },
  { company: "USC",             industry: "Arts, Tech and Business" },
];

const TABS = ["Product Design", "Brands"];

const CARDS = {
  "Product Design": [
    {
      title: "Connecting creatives over coffee - Fika",
      bg: "#4B44AF",
      image: "/images/fika.png",
      url: "https://www.figma.com/proto/hzuWug4uFhP8qjCYA4Md9N/2026-Resume--Portfolio?page-id=51%3A30&node-id=625-2415&viewport=-179%2C-1939%2C0.33&t=ipeir6F65JGpm8ue-1&scaling=contain&content-scaling=fixed&starting-point-node-id=625%3A2415&show-proto-sidebar=1",
    },
    {
      title: "AI-powered coaching for managers - Criteria",
      bg: "#16112E",
      image: "/images/criteria.png",
      url: "https://www.figma.com/proto/hzuWug4uFhP8qjCYA4Md9N/2026-Resume--Portfolio?node-id=251-232&viewport=-234%2C-1010%2C0.24&t=hhd48eQLPawk2T04-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=251%3A232&show-proto-sidebar=1&page-id=51%3A30",
    },
    {
      title: "E-prescription for doctors - Honeybee Health",
      bg: "#0D1917",
      image: "/images/honeybee.png",
      url: "https://www.figma.com/proto/hzuWug4uFhP8qjCYA4Md9N/2026-Resume--Portfolio?node-id=263-577&viewport=-234%2C-1010%2C0.24&t=hhd48eQLPawk2T04-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=263%3A577&page-id=51%3A30",
    },
    {
      title: "Credit options for small businesses - Square",
      bg: "#3D5445",
      image: "/images/square.png",
      url: "https://www.figma.com/proto/hzuWug4uFhP8qjCYA4Md9N/2026-Resume--Portfolio?node-id=454-337&viewport=-266%2C-859%2C0.2&t=XYzWsKb20ubPxXHt-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=454%3A337&show-proto-sidebar=1&page-id=51%3A30",
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

  return (
    <div style={styles.page}>
      {/* Top two-column section */}
      <div className="top-section" style={styles.topSection}>
        {/* Left: identity + bio */}
        <div style={styles.leftCol}>
          <img src={logo} style={styles.logo} alt="Sonika Patel" />
          <h1 style={styles.heading}>Sonika Patel</h1>
          <p style={styles.tagline}>
            0→1 product builder. designer. mini-canvas painter.
          </p>
          <p style={styles.bio}>
            Hello👋 I'm Sonika (So-knee-kah), a 0→ 1 product designer who deeply
            cares about <strong>building genuinely valuable products</strong> across
            industries. I'm a values-driven and data-driven product person & designer.
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

      {/* Cards grid */}
      <div className="project-grid" style={activeTab === "Brands" ? { gridTemplateColumns: "1fr" } : undefined}>
        {CARDS[activeTab].length > 0 ? (
          activeTab === "Brands"
            ? CARDS[activeTab].map((card) => (
                <BrandCard key={card.image} image={card.image} />
              ))
            : CARDS[activeTab].map((card) => (
                <ProjectCard key={card.title} {...card} />
              ))
        ) : (
          <p style={styles.empty}>Coming soon</p>
        )}
      </div>
    </div>
  );
}

function BrandCard({ image }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.brandCard,
        background: hovered ? "#F7F3EC" : "transparent",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={image} alt="" style={styles.brandImage} />
    </div>
  );
}

function ProjectCard({ title, image, url }) {
  const [hovered, setHovered] = useState(false);

  const img = (
    <img
      src={image}
      alt={title}
      style={{
        ...styles.cardImage,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: url ? "pointer" : "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );

  if (!url) return img;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
      {img}
    </a>
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
    marginBottom: 48,
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
  empty: {
    color: "rgba(0,0,0,0.35)",
    fontSize: 15,
    gridColumn: "1 / -1",
    margin: 0,
    paddingTop: 8,
  },
};
