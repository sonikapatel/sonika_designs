import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import logo from "../assets/SPFavicon1.png";
import { PROJECTS } from "./projectData";

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

function FadeSection({ as: Tag = "section", className = "", style, children, ...rest }) {
  const ref = useFadeIn();
  return (
    <Tag ref={ref} className={`fade-section ${className}`.trim()} style={style} {...rest}>
      {children}
    </Tag>
  );
}

function PasswordModal({ onUnlock, projectName }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onUnlock(value, () => setError(true));
  }

  const requestSubject = `Password request: ${projectName}`;
  const requestBody = `I'm looking through your portfolio and would like to know the password for the ${projectName} project.`;
  const requestHref = `mailto:sonika2patel@gmail.com?subject=${encodeURIComponent(requestSubject)}&body=${encodeURIComponent(requestBody)}`;

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
          <a href={requestHref} style={modalStyles.requestLink}>Request password</a>
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
    fontFamily: "'TT', -apple-system, sans-serif",
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
  requestLink: {
    textAlign: "center",
    fontSize: 13,
    color: "rgba(0,0,0,0.5)",
    textDecoration: "none",
    padding: "2px 0 0",
  },
};

function Carousel({ images }) {
  const [index, setIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next]);

  useEffect(() => {
    setAspectRatio(null);
    const firstSrc = typeof images[0] === "string" ? images[0] : images[0]?.src;
    if (!firstSrc) return;
    const img = new Image();
    img.onload = () => setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
    img.src = firstSrc;
  }, [images]);

  const current = images[index];
  const src = typeof current === "string" ? current : current.src;
  const caption = typeof current === "object" ? current.caption : null;

  return (
    <div style={carouselStyles.wrapper}>
      <div style={{ ...carouselStyles.imageWrapper, ...(aspectRatio ? { aspectRatio } : {}) }}>
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
    overflow: "hidden",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.10)",
    boxSizing: "border-box",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 12,
    display: "block",
  },
  caption: {
    marginTop: 16,
    marginBottom: 0,
    fontSize: 14,
    lineHeight: 1.7,
    color: "#4E4E4E",
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

/* Sticky notes that continuously reshuffle between two arrangements — used for the
   "Product Hypothesis" scramble. Coordinates come straight from the Figma frames (px,
   in a frameWidth × frameHeight canvas); percentage positioning + a locked aspect-ratio
   wrapper keeps everything responsive without distorting the (square) notes. */
function PostItScramble({ notes, frameWidth, frameHeight, noteSize, intervalMs = 2400, bg = "transparent" }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p === 0 ? 1 : 0)), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  // A little per-note rotation, seeded from index, so the shuffle reads as hand-placed
  // rather than a mechanical swap.
  const rotationFor = (idx, ph) => {
    const base = ((idx * 37) % 7) - 3; // -3..3
    return ph === 0 ? base : -base;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${frameWidth} / ${frameHeight}`,
        background: bg,
      }}
    >
      {notes.map((note, idx) => {
        const pos = phase === 0 ? note.start : note.end;
        return (
          <div
            key={note.label}
            style={{
              position: "absolute",
              left: `${(pos.x / frameWidth) * 100}%`,
              top: `${(pos.y / frameHeight) * 100}%`,
              width: `${(noteSize / frameWidth) * 100}%`,
              height: `${(noteSize / frameHeight) * 100}%`,
              background: "#F9DE8B",
              boxShadow: "0 6px 16px rgba(0,0,0,0.28)",
              // Padding percentages resolve against the containing block (the full frame),
              // not this note's own size — so this is scaled down to read as ~8% of the note.
              padding: `${(0.08 * noteSize / frameWidth) * 100}%`,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              overflow: "hidden",
              transform: `rotate(${rotationFor(idx, phase)}deg)`,
              transition: `left ${intervalMs * 0.55}ms cubic-bezier(.4,0,.2,1), top ${intervalMs * 0.55}ms cubic-bezier(.4,0,.2,1), transform ${intervalMs * 0.55}ms ease`,
              transitionDelay: `${(idx % 5) * 60}ms`,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "clamp(8px, 0.85vw, 11px)",
                fontWeight: 600,
                lineHeight: 1.25,
                color: "#3A3115",
                fontFamily: "'TT', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                textAlign: "left",
              }}
            >
              {note.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

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
      {!unlocked && <PasswordModal onUnlock={handleUnlock} projectName={project.company} />}
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
      <FadeSection as="div" className="proj-banner" style={{ ...styles.banner, background: project.bannerBg }}>
        <img
          src={project.bannerImage}
          alt={project.company}
          style={styles.bannerImage}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </FadeSection>

      {/* ── Overview ── */}
      <FadeSection className="proj-overview" style={styles.overview}>
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
      </FadeSection>

      {/* ── Content Sections ── */}
      {project.sections.map((section, i) => {
        const divider = { borderBottom: "none" };
        if (section.type === "image") {
          const isFramed = section.variant === "framed";
          const sectionStyle = section.maxWidth
            ? { ...styles.contentSection, maxWidth: section.maxWidth, ...divider }
            : { ...styles.contentSection, ...divider };
          const hasContainer = !!section.bg;
          const imageStyle = hasContainer
            ? { width: "100%", display: "block", borderRadius: section.mediaBorderRadius ?? 12 }
            : {
                ...(isFramed ? styles.framedImage : styles.contentImage),
                ...(section.borderRadius !== undefined ? { borderRadius: section.borderRadius } : {}),
              };
          const image = (
            <img
              src={section.src}
              alt=""
              style={imageStyle}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          );
          return (
            <FadeSection key={i} className="proj-section" style={sectionStyle}>
              {section.header && (
                <p style={{ ...styles.textCenter, fontWeight: 600, color: "#111", marginBottom: 8 }}>
                  {section.header}
                </p>
              )}
              {section.body && (
                <p style={{ ...styles.textCenter, marginBottom: 32 }}>{section.body}</p>
              )}
              {hasContainer ? (
                <div
                  style={{
                    background: section.bg,
                    padding: section.padding ?? 0,
                    borderRadius: section.borderRadius ?? 0,
                    boxSizing: "border-box",
                  }}
                >
                  {image}
                </div>
              ) : (
                image
              )}
              {section.caption && (
                <p style={styles.caption}>{section.caption}</p>
              )}
            </FadeSection>
          );
        }

        if (section.type === "carousel") {
          return (
            <FadeSection key={i} className="proj-section" style={{ ...styles.contentSection, ...divider }}>
              <Carousel images={section.images} />
            </FadeSection>
          );
        }

        if (section.type === "text-center") {
          return (
            <FadeSection key={i} className="proj-section" style={{ ...styles.textCenterSection, ...divider }}>
              {section.header && (
                <p style={{ ...styles.textCenter, fontWeight: 600, color: "#111", marginBottom: 8 }}>
                  {section.header}
                </p>
              )}
              <p style={styles.textCenter}>{section.body}</p>
            </FadeSection>
          );
        }

        if (section.type === "big-header") {
          return (
            <FadeSection key={i} className="proj-section" style={{ ...styles.bigHeaderSection, ...divider }}>
              {section.eyebrow && <p style={styles.sectionLabel}>{section.eyebrow}</p>}
              <p style={styles.bigHeader}>{section.text}</p>
              {section.body && <p style={{ ...styles.textCenter, marginTop: 20 }}>{section.body}</p>}
            </FadeSection>
          );
        }

        if (section.type === "stats") {
          return (
            <FadeSection key={i} className="proj-section" style={{ ...styles.contentSection, ...divider }}>
              {section.eyebrow && <p style={styles.sectionLabel}>{section.eyebrow}</p>}
              {section.body && <p style={styles.textCenter}>{section.body}</p>}
              <div style={styles.statsGrid}>
                {section.stats.map((stat, j) => (
                  <div key={j} style={styles.statItem}>
                    <p style={styles.statValue}>{stat.value}</p>
                    <p style={styles.statLabel}>{stat.label}</p>
                    {stat.caption && <p style={styles.statCaption}>{stat.caption}</p>}
                  </div>
                ))}
              </div>
            </FadeSection>
          );
        }

        if (section.type === "grid") {
          const cls = section.columns === 2 ? "proj-grid-2" : "proj-grid-3";
          const isVideoSrc = (src) => /\.(mov|mp4|webm)$/i.test(src);
          const renderGridItem = (item, key, extraStyle) => {
            const src = typeof item === "string" ? item : item.src;
            const caption = typeof item === "object" ? item.caption : null;
            let extra = {};
            if (typeof item === "object" && item.height) {
              extra = { height: item.height, objectFit: item.objectFit || (isVideoSrc(src) ? "cover" : "contain") };
            } else if (typeof item === "object" && item.maxHeight) {
              extra = { maxHeight: item.maxHeight, objectFit: "contain" };
            }
            if (typeof item === "object" && item.borderRadius !== undefined) {
              extra = { ...extra, borderRadius: item.borderRadius };
            }
            const media = isVideoSrc(src) ? (
              <video
                src={src}
                controls
                playsInline
                muted
                style={{ ...styles.gridImage, ...extra, border: "1px solid rgba(0,0,0,0.08)", boxSizing: "border-box" }}
              />
            ) : (
              <img
                src={src}
                alt=""
                style={{ ...styles.gridImage, ...extra }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            );
            return (
              <div key={key} style={extraStyle}>
                {media}
                {caption && (
                  <p style={{ ...styles.gridCaption, ...((section.rowBg || section.sectionBg) ? { color: "#fff" } : {}) }}>
                    {caption}
                  </p>
                )}
              </div>
            );
          };
          const gridBody = (
            <>
              {section.label && <p style={styles.sectionLabel}>{section.label}</p>}
              {section.eyebrow && (
                <p style={{ ...styles.sectionLabel, maxWidth: section.rowMaxWidth || 900, marginLeft: "auto", marginRight: "auto" }}>
                  {section.eyebrow}
                </p>
              )}
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
                      <div
                        key={j}
                        className="proj-grid-row"
                        style={{
                          display: "flex",
                          gap: section.rowGap ?? 24,
                          maxWidth: section.rowMaxWidth || (section.sectionBg ? "100%" : 900),
                          margin: section.rowAlign === "right" ? "0 0 0 auto" : "0 auto",
                          width: "100%",
                          boxSizing: "border-box",
                          ...(section.rowBg ? { background: section.rowBg, padding: section.rowPadding ?? 0, borderRadius: section.rowBorderRadius ?? 0 } : {}),
                        }}
                      >
                        {entry.map((item, k) => renderGridItem(item, k, { flex: (typeof item === "object" && item.flex) || 1, minWidth: 0 }))}
                      </div>
                    );
                  }
                  return renderGridItem(entry, j, {});
                })}
              </div>
              {section.caption && (
                <p style={styles.caption}>{section.caption}</p>
              )}
            </>
          );

          if (section.sectionBg) {
            return (
              <FadeSection key={i} className="proj-section" style={{ width: "100%", boxSizing: "border-box", background: section.sectionBg }}>
                <div style={{ ...constrained, maxWidth: section.sectionMaxWidth || 1200, padding: "48px 48px" }}>{gridBody}</div>
              </FadeSection>
            );
          }

          return (
            <FadeSection key={i} className="proj-section" style={{ ...styles.gridSection, ...(section.sectionMaxWidth ? { maxWidth: section.sectionMaxWidth } : {}), ...divider }}>
              {gridBody}
            </FadeSection>
          );
        }

        if (section.type === "video") {
          const boxed = section.height || section.bg;
          const media = (
            <>
              {section.crop ? (
                <div
                  style={{
                    width: section.width || "100%",
                    maxWidth: "100%",
                    height: section.height,
                    borderRadius: 16,
                    overflow: "hidden",
                    margin: section.center ? "0 auto" : undefined,
                  }}
                >
                  <video
                    src={section.src}
                    controls
                    playsInline
                    muted={!!section.muted}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: section.objectPosition || "center",
                      display: "block",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ) : boxed ? (
                <div
                  style={{
                    width: section.width || "100%",
                    maxWidth: "100%",
                    height: section.height || 400,
                    background: section.bg || "#000",
                    borderRadius: section.borderRadius ?? 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    padding: section.padding ?? 0,
                    margin: section.center ? "0 auto" : undefined,
                  }}
                >
                  <video
                    src={section.src}
                    controls
                    playsInline
                    muted={!!section.muted}
                    style={{ maxWidth: "100%", maxHeight: "100%", display: "block", border: "1px solid rgba(0,0,0,0.08)", boxSizing: "border-box" }}
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
            </>
          );

          if (section.sectionBg) {
            return (
              <FadeSection
                key={i}
                className="proj-section"
                style={{ width: "100%", boxSizing: "border-box", background: section.sectionBg }}
              >
                <div style={{ ...constrained, padding: "48px 48px" }}>{media}</div>
              </FadeSection>
            );
          }

          return (
            <FadeSection key={i} className="proj-section" style={{ ...styles.contentSection, ...divider }}>
              {media}
            </FadeSection>
          );
        }

        if (section.type === "postits") {
          return (
            <FadeSection key={i} className="proj-section" style={{ width: "100%", boxSizing: "border-box", background: section.sectionBg || "transparent", ...divider }}>
              <div style={{ ...constrained, maxWidth: section.sectionMaxWidth || 1000, padding: "48px 48px" }}>
                {section.label && (
                  <p style={{ ...styles.sectionLabel, ...(section.sectionBg ? { color: "rgba(255,255,255,0.45)" } : {}) }}>
                    {section.label}
                  </p>
                )}
                <PostItScramble
                  notes={section.notes}
                  frameWidth={section.frameWidth}
                  frameHeight={section.frameHeight}
                  noteSize={section.noteSize}
                  intervalMs={section.intervalMs}
                  bg={section.sectionBg || "transparent"}
                />
                {section.caption && (
                  <p style={{ ...styles.caption, ...(section.sectionBg ? { color: "rgba(255,255,255,0.6)" } : {}) }}>
                    {section.caption}
                  </p>
                )}
              </div>
            </FadeSection>
          );
        }

        if (section.type === "text") {
          return (
            <FadeSection key={i} className="proj-section" style={{ ...styles.contentSection, ...divider }}>
              {section.label && <p style={styles.sectionLabel}>{section.label}</p>}
              <p style={styles.bodyText}>{section.body}</p>
            </FadeSection>
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
    fontFamily: "'TT', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
    lineHeight: 1.5,
    whiteSpace: "nowrap",
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
  metaSubtitle: { color: "#4E4E4E", fontWeight: 400 },
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
    lineHeight: 1.2,
  },
  statsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 48,
    marginTop: 24,
  },
  statItem: {
    flex: "1 1 180px",
    minWidth: 160,
  },
  statValue: {
    margin: 0,
    fontSize: 40,
    fontWeight: 700,
    color: "#111",
    letterSpacing: "-0.01em",
    lineHeight: 1.1,
    fontVariantNumeric: "proportional-nums",
  },
  statLabel: {
    margin: "10px 0 4px",
    fontSize: 15,
    fontWeight: 500,
    color: "#2A2A2A",
  },
  statCaption: {
    margin: 0,
    fontSize: 12,
    color: "#4E4E4E",
    lineHeight: 1.5,
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
    color: "#4E4E4E",
    textAlign: "left",
    whiteSpace: "pre-line",
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
    maxWidth: 630,
    marginLeft: "auto",
    marginRight: "auto",
  },
  gridImage: {
    width: "100%",
    display: "block",
    borderRadius: 12,
  },
  gridCaption: {
    margin: 0,
    marginTop: 12,
    fontSize: 13,
    lineHeight: 1.6,
    color: "#4E4E4E",
    textAlign: "center",
  },
  video: {
    width: "100%",
    borderRadius: 16,
    display: "block",
    border: "1px solid rgba(0,0,0,0.08)",
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
