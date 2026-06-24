import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import logo from "../assets/SPFavicon1.png";
import { PROJECTS } from "./projectData";

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];

  if (!project) {
    return (
      <div style={styles.notFound}>
        <p>Project not found.</p>
        <Link to="/" style={styles.backLink}>← Back to projects</Link>
      </div>
    );
  }

  const prev = PROJECTS[index - 1] || null;
  const next = PROJECTS[index + 1] || null;

  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link to="/">
            <img src={logo} alt="Sonika Patel" style={styles.logo} />
          </Link>
          <span style={styles.headerRole}>{project.role}</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.headerTitle}>{project.title}</span>
          <span style={styles.headerStatus}>{project.status}</span>
        </div>
      </header>

      {/* ── Banner ── */}
      <div style={{ ...styles.banner, background: project.bannerBg }}>
        <img
          src={project.bannerImage}
          alt={project.company}
          style={styles.bannerImage}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>

      {/* ── Overview ── */}
      <section style={styles.overview}>
        <div style={styles.problemCol}>
          <p style={styles.sectionLabel}>Problem</p>
          <p style={styles.problemText}>{project.problem}</p>
        </div>
        <div style={styles.metaCol}>
          <p style={styles.sectionLabel}>Team</p>
          {project.team.map((member) => (
            <p key={member.name} style={styles.metaItem}>
              {member.name}
              <span style={styles.metaSubtitle}> – {member.role}</span>
            </p>
          ))}

          {project.context && (
            <>
              <p style={{ ...styles.sectionLabel, marginTop: 32 }}>Context</p>
              <a
                href={project.context.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.contextLink}
              >
                {project.context.label}
              </a>
            </>
          )}
        </div>
      </section>

      {/* ── Content Sections ── */}
      {project.sections.map((section, i) => {
        if (section.type === "image") {
          return (
            <section key={i} style={styles.contentSection}>
              <img
                src={section.src}
                alt=""
                style={styles.contentImage}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              {section.caption && (
                <p style={styles.caption}>{section.caption}</p>
              )}
            </section>
          );
        }
        if (section.type === "grid") {
          return (
            <section key={i} style={styles.contentSection}>
              {section.label && <p style={styles.sectionLabel}>{section.label}</p>}
              <div style={{ ...styles.imageGrid, gridTemplateColumns: `repeat(${section.columns || 3}, 1fr)` }}>
                {section.images.map((src, j) => (
                  <img
                    key={j}
                    src={src}
                    alt=""
                    style={styles.gridImage}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ))}
              </div>
              {section.caption && (
                <p style={styles.caption}>{section.caption}</p>
              )}
            </section>
          );
        }
        if (section.type === "text") {
          return (
            <section key={i} style={styles.contentSection}>
              {section.label && <p style={styles.sectionLabel}>{section.label}</p>}
              <p style={styles.bodyText}>{section.body}</p>
            </section>
          );
        }
        return null;
      })}

      {/* ── Bottom nav ── */}
      <nav style={styles.bottomNav}>
        <button
          style={styles.navBtn}
          onClick={() => navigate("/")}
        >
          ← Back to projects
        </button>
        {next ? (
          <Link to={`/projects/${next.slug}`} style={styles.navLink}>
            {next.company} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#111",
    background: "#fff",
    minHeight: "100vh",
  },
  notFound: {
    padding: 80,
    textAlign: "center",
  },
  backLink: {
    color: "#111",
    fontSize: 14,
  },

  /* Header */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "28px 48px 24px",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
    objectFit: "contain",
  },
  headerRole: {
    fontSize: 11,
    color: "rgba(0,0,0,0.42)",
    letterSpacing: "0.01em",
    maxWidth: 260,
    lineHeight: 1.5,
  },
  headerRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: "#111",
    textAlign: "right",
  },
  headerStatus: {
    fontSize: 11,
    color: "rgba(0,0,0,0.38)",
    letterSpacing: "0.01em",
  },

  /* Banner */
  banner: {
    width: "100%",
    minHeight: 340,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  bannerImage: {
    maxWidth: "72%",
    maxHeight: 320,
    objectFit: "contain",
    display: "block",
  },

  /* Overview */
  overview: {
    display: "grid",
    gridTemplateColumns: "1fr 220px",
    gap: 64,
    padding: "56px 48px",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  problemCol: {},
  metaCol: {
    paddingTop: 2,
  },
  sectionLabel: {
    margin: "0 0 12px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.38)",
  },
  problemText: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.75,
    color: "#4E4E4E",
  },
  metaItem: {
    margin: "0 0 4px",
    fontSize: 13,
    color: "#2A2A2A",
  },
  metaSubtitle: {
    color: "rgba(0,0,0,0.45)",
    fontWeight: 400,
  },
  contextLink: {
    fontSize: 13,
    color: "#4B44AF",
    textDecoration: "none",
  },

  /* Content sections */
  contentSection: {
    padding: "48px 48px",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  contentImage: {
    width: "100%",
    borderRadius: 16,
    display: "block",
  },
  caption: {
    marginTop: 28,
    fontSize: 14,
    lineHeight: 1.7,
    color: "rgba(0,0,0,0.52)",
    textAlign: "center",
    maxWidth: 480,
    marginLeft: "auto",
    marginRight: "auto",
  },
  imageGrid: {
    display: "grid",
    gap: 12,
  },
  gridImage: {
    width: "100%",
    borderRadius: 12,
    display: "block",
    objectFit: "cover",
  },
  bodyText: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.75,
    color: "#4E4E4E",
  },

  /* Bottom nav */
  bottomNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "32px 48px 56px",
  },
  navBtn: {
    background: "none",
    border: "none",
    fontSize: 14,
    color: "rgba(0,0,0,0.50)",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: 0,
  },
  navLink: {
    fontSize: 14,
    color: "rgba(0,0,0,0.50)",
    textDecoration: "none",
  },
};
