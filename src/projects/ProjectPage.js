import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import logo from "../assets/SPFavicon1.png";
import { PROJECTS } from "./projectData";

function PasswordModal({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onUnlock(value, () => setError(true));
  }

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.box}>
        <p style={modalStyles.label}>This project is password protected.</p>
        <form onSubmit={handleSubmit} style={modalStyles.form}>
          <input
            type="password"
            placeholder="Enter password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            style={{ ...modalStyles.input, borderColor: error ? "#c0392b" : "rgba(0,0,0,0.15)" }}
            autoFocus
          />
          {error && <p style={modalStyles.error}>Incorrect password. Try again.</p>}
          <button type="submit" style={modalStyles.button}>Enter</button>
        </form>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  box: {
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.09)",
    borderRadius: 16,
    padding: "40px 48px",
    width: "100%",
    maxWidth: 360,
    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  label: {
    margin: "0 0 24px",
    fontSize: 14,
    color: "#4E4E4E",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: "10px 14px",
    fontSize: 14,
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 8,
    outline: "none",
    fontFamily: "inherit",
    color: "#111",
  },
  error: {
    margin: 0,
    fontSize: 12,
    color: "#c0392b",
  },
  button: {
    padding: "10px 0",
    fontSize: 14,
    fontWeight: 600,
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

function Carousel({ images }) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next]);

  const current = images[index];
  const src = typeof current === "string" ? current : current.src;
  const caption = typeof current === "object" ? current.caption : null;

  return (
    <div style={carouselStyles.wrapper}>
      <div style={carouselStyles.imageWrapper}>
        <button style={{ ...carouselStyles.arrow, left: 16 }} onClick={prev} aria-label="Previous">‹</button>
        <img
          key={index}
          src={src}
          alt=""
          style={carouselStyles.image}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <button style={{ ...carouselStyles.arrow, right: 16 }} onClick={next} aria-label="Next">›</button>
      </div>
      <div style={carouselStyles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{ ...carouselStyles.dot, background: i === index ? "#111" : "rgba(0,0,0,0.18)" }}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
      {caption && <p style={carouselStyles.caption}>{caption}</p>}
    </div>
  );
}

const carouselStyles = {
  wrapper: {
    width: "100%",
    userSelect: "none",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    borderRadius: 12,
    display: "block",
  },
  caption: {
    marginTop: 16,
    marginBottom: 0,
    fontSize: 14,
    lineHeight: 1.7,
    color: "rgba(0,0,0,0.52)",
    textAlign: "center",
    maxWidth: 520,
    marginLeft: "auto",
    marginRight: "auto",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.85)",
    border: "none",
    borderRadius: "50%",
    width: 40,
    height: 40,
    fontSize: 22,
    lineHeight: "38px",
    textAlign: "center",
    cursor: "pointer",
    zIndex: 2,
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    padding: 0,
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    gap: 6,
    marginTop: 14,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "background 0.2s",
  },
};

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];

  const sessionKey = `unlocked_${slug}`;
  const [unlocked, setUnlocked] = useState(
    () => !project?.protected || sessionStorage.getItem(sessionKey) === "1"
  );

  function handleUnlock(value, onError) {
    if (value === project.protected) {
      sessionStorage.setItem(sessionKey, "1");
      setUnlocked(true);
    } else {
      onError();
    }
  }

  if (!project) {
    return (
      <div style={styles.notFound}>
        <p>Project not found.</p>
        <Link to="/" style={styles.backLink}>← Back to projects</Link>
      </div>
    );
  }

  const next = PROJECTS[index + 1] || null;

  return (
    <div style={styles.page}>
      {!unlocked && <PasswordModal onUnlock={handleUnlock} />}
      {/* ── Header ── */}
      <header className="proj-header" style={styles.header}>
        <div style={styles.headerLeft}>
          <Link to="/">
            <img
              src={project.logo || logo}
              alt={project.company}
              style={project.logo ? styles.projectLogo : styles.logo}
            />
          </Link>
          <span style={styles.headerRole}>{project.role}</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.headerTitle}>{project.title}</span>
          <span style={styles.headerStatus}>{project.status}</span>
        </div>
      </header>

      {/* ── Banner — full viewport width, 500 px tall ── */}
      <div className="proj-banner" style={{ ...styles.banner, background: project.bannerBg }}>
        <img
          src={project.bannerImage}
          alt={project.company}
          style={styles.bannerImage}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>

      {/* ── Overview ── */}
      <section className="proj-overview" style={styles.overview}>
        <div style={styles.problemCol}>
          <p style={styles.sectionLabel}>Problem</p>
          <p style={styles.problemText}>
            {Array.isArray(project.problem)
              ? project.problem.map((seg, i) => {
                  if (seg.break) return <span key={i} style={{ display: "block", marginTop: "1em" }} />;
                  if (seg.bold) return <strong key={i}>{seg.text}</strong>;
                  return seg.text;
                })
              : project.problem}
          </p>
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
          const isFramed = section.variant === "framed";
          return (
            <section key={i} className="proj-section" style={styles.contentSection}>
              <img
                src={section.src}
                alt=""
                style={isFramed ? styles.framedImage : styles.contentImage}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              {section.caption && (
                <p style={styles.caption}>{section.caption}</p>
              )}
            </section>
          );
        }

        if (section.type === "carousel") {
          return (
            <section key={i} className="proj-section" style={styles.contentSection}>
              <Carousel images={section.images} />
            </section>
          );
        }

        if (section.type === "text-center") {
          return (
            <section key={i} className="proj-section" style={styles.textCenterSection}>
              {section.header && (
                <p style={{ ...styles.textCenter, fontWeight: 600, color: "#111", marginBottom: 8 }}>
                  {section.header}
                </p>
              )}
              <p style={styles.textCenter}>{section.body}</p>
            </section>
          );
        }

        if (section.type === "big-header") {
          return (
            <section key={i} className="proj-section" style={styles.bigHeaderSection}>
              {section.eyebrow && <p style={styles.sectionLabel}>{section.eyebrow}</p>}
              <p style={styles.bigHeader}>{section.text}</p>
              {section.body && <p style={{ ...styles.textCenter, marginTop: 20 }}>{section.body}</p>}
            </section>
          );
        }

        if (section.type === "grid") {
          const cls = section.columns === 2 ? "proj-grid-2" : "proj-grid-3";
          return (
            <section key={i} className="proj-section" style={styles.gridSection}>
              {section.label && <p style={styles.sectionLabel}>{section.label}</p>}
              <div
                className={cls}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {section.images.map((entry, j) => {
                  if (Array.isArray(entry)) {
                    return (
                      <div key={j} style={{ display: "flex", gap: 24, maxWidth: 900, margin: "0 auto", width: "100%" }}>
                        {entry.map((item, k) => {
                          const src = typeof item === "string" ? item : item.src;
                          const extra = item.maxHeight ? { maxHeight: item.maxHeight, objectFit: "contain" } : {};
                          return (
                            <img
                              key={k}
                              src={src}
                              alt=""
                              style={{ ...styles.gridImage, flex: 1, minWidth: 0, ...extra }}
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                          );
                        })}
                      </div>
                    );
                  }
                  const src = typeof entry === "string" ? entry : entry.src;
                  const extra = typeof entry === "object" && entry.maxHeight ? { maxHeight: entry.maxHeight, objectFit: "contain" } : {};
                  return (
                    <img
                      key={j}
                      src={src}
                      alt=""
                      style={{ ...styles.gridImage, ...extra }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  );
                })}
              </div>
              {section.caption && (
                <p style={styles.caption}>{section.caption}</p>
              )}
            </section>
          );
        }

        if (section.type === "video") {
          const boxed = section.height || section.bg;
          return (
            <section key={i} className="proj-section" style={styles.contentSection}>
              {boxed ? (
                <div
                  style={{
                    width: "100%",
                    height: section.height || 400,
                    background: section.bg || "#000",
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    padding: section.padding ?? 0,
                  }}
                >
                  <video
                    src={section.src}
                    controls
                    playsInline
                    muted={!!section.muted}
                    style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
                  />
                </div>
              ) : (
                <video
                  src={section.src}
                  controls
                  playsInline
                  muted={!!section.muted}
                  style={styles.video}
                />
              )}
              {section.caption && <p style={styles.caption}>{section.caption}</p>}
            </section>
          );
        }

        if (section.type === "text") {
          return (
            <section key={i} className="proj-section" style={styles.contentSection}>
              {section.label && <p style={styles.sectionLabel}>{section.label}</p>}
              <p style={styles.bodyText}>{section.body}</p>
            </section>
          );
        }

        return null;
      })}

      {/* ── Bottom nav ── */}
      <nav className="proj-bottom-nav" style={styles.bottomNav}>
        <button style={styles.navBtn} onClick={() => navigate("/")}>
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

/* Shared constraint applied to every section except the banner */
const constrained = {
  maxWidth: 800,
  marginLeft: "auto",
  marginRight: "auto",
  boxSizing: "border-box",
};

const styles = {
  page: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#111",
    background: "#fff",
    minHeight: "100vh",
  },
  notFound: { padding: 80, textAlign: "center" },
  backLink: { color: "#111", fontSize: 14 },

  /* Header */
  header: {
    ...constrained,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "28px 48px 24px",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  headerLeft: { display: "flex", flexDirection: "column", gap: 8 },
  logo: { width: 32, height: 32, objectFit: "contain" },
  projectLogo: { height: 28, maxWidth: 120, objectFit: "contain", display: "block" },
  headerRole: {
    fontSize: 11,
    color: "rgba(0,0,0,0.42)",
    letterSpacing: "0.01em",
    maxWidth: 260,
    lineHeight: 1.5,
  },
  headerRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 },
  headerTitle: { fontSize: 14, fontWeight: 500, color: "#111", textAlign: "right" },
  headerStatus: { fontSize: 11, color: "rgba(0,0,0,0.38)", letterSpacing: "0.01em" },

  /* Banner — intentionally NOT constrained */
  banner: {
    width: "100%",
    height: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  bannerImage: {
    maxWidth: "60%",
    maxHeight: 440,
    objectFit: "contain",
    display: "block",
  },

  /* Overview */
  overview: {
    ...constrained,
    display: "grid",
    gridTemplateColumns: "1fr 220px",
    gap: 64,
    padding: "56px 48px",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  problemCol: {},
  metaCol: { paddingTop: 2 },
  sectionLabel: {
    margin: "0 0 12px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.38)",
  },
  problemText: { margin: 0, fontSize: 15, lineHeight: 1.75, color: "#4E4E4E" },
  metaItem: { margin: "0 0 4px", fontSize: 13, color: "#2A2A2A" },
  metaSubtitle: { color: "rgba(0,0,0,0.45)", fontWeight: 400 },
  contextLink: { fontSize: 13, color: "#4B44AF", textDecoration: "none" },

  /* Content sections */
  contentSection: {
    ...constrained,
    padding: "48px 48px",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  gridSection: {
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "40px 0 48px",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  bigHeaderSection: {
    ...constrained,
    padding: "56px 48px",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  bigHeader: {
    margin: 0,
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "IvyPresto",
    color: "#111",
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  textCenterSection: {
    ...constrained,
    padding: "40px 48px 48px",
    borderBottom: "1px solid rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  textCenter: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.75,
    color: "rgba(0,0,0,0.52)",
    textAlign: "left",
  },
  contentImage: {
    width: "100%",
    borderRadius: 16,
    display: "block",
  },
  framedImage: {
    width: "100%",
    borderRadius: 12,
    display: "block",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
  },
  caption: {
    marginTop: 28,
    marginBottom: 0,
    fontSize: 14,
    lineHeight: 1.7,
    color: "#4E4E4E",
    textAlign: "center",
    maxWidth: 480,
    marginLeft: "auto",
    marginRight: "auto",
  },
  gridImage: {
    width: "100%",
    display: "block",
    borderRadius: 12,
  },
  video: {
    width: "100%",
    borderRadius: 16,
    display: "block",
  },
  bodyText: { margin: 0, fontSize: 15, lineHeight: 1.75, color: "#4E4E4E" },

  /* Bottom nav */
  bottomNav: {
    ...constrained,
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
  navLink: { fontSize: 14, color: "rgba(0,0,0,0.50)", textDecoration: "none" },
};
