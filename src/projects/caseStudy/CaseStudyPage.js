import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./caseStudy.css";

/* ─────────────────────────────────────────────────────────────
   Shared shell for the sidebar case-study layout (Figma node 1486:5717).

   A project supplies `meta`, `nav` and `blocks`; anything it needs beyond the
   standard Figma section variants comes in through `custom`, keyed by variant name.
   ───────────────────────────────────────────────────────────── */

/* Reads the position of every anchored block on scroll and reports the last one whose
   top has passed the highlight line. An IntersectionObserver would be tidier, but the
   blocks vary from ~120px to ~660px tall, so "which section is intersecting" is often
   several sections at once — a single line to compare against is unambiguous. */
function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  /* Holds the nav target while a click's smooth scroll is in flight, so the sections
     the page flies past don't each flash active on the way there. It is released by
     the reader's own next scroll gesture rather than by arrival: a target near the
     foot of the page can't be scrolled to the top at all, so "wait until the measured
     section matches" would never come true and would freeze the spy for good. */
  const lockedTo = useRef(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (lockedTo.current) return;

      // The sticky mobile rail covers the top of the page; put the line below it.
      const line = window.innerWidth < 1024 ? 120 : 96;
      let current = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }

      // Nothing has crossed the line yet: either the reader is still above the first
      // section, or the page has bottomed out with a final section too short to reach
      // it. Bottomed out means the last section is the one being read.
      if (!current) {
        const atBottom =
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
        current = atBottom ? ids[ids.length - 1] : ids[0];
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // A deliberate scroll gesture hands control back to the reader.
    const release = () => {
      lockedTo.current = null;
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
  }, [ids]);

  const goTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    lockedTo.current = id;
    setActiveId(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return [activeId, goTo];
}

function Sidebar({ nav, activeId, onNavigate }) {
  return (
    <aside className="cs-sidebar">
      <div className="cs-sidebar-inner">
        <Link to="/" className="cs-back">
          <img src="/images/hbh3/icon-arrow-left.svg" alt="" />
          Back to projects
        </Link>
        <div className="cs-rule" />
        <nav className="cs-nav" aria-label="Case study sections">
          {nav.map((group) => (
            <React.Fragment key={group.group}>
              <p className="cs-nav-group">{group.group}</p>
              {group.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`cs-nav-link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => onNavigate(item.id)}
                  >
                    {isActive && <span className="cs-nav-indicator" />}
                    {item.label}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </aside>
  );
}

const isVideo = (src) => /\.(mov|mp4|webm)$/i.test(src);

/* Body copy is one paragraph in most sections, but a couple carry a bold opening
   sentence or run to two paragraphs — both still the same prose style. */
function Prose({ lead, body }) {
  const paragraphs = Array.isArray(body) ? body : [body];
  return (
    <>
      {paragraphs.map((part, i) => {
        // A paragraph is either a plain string or, where it carries a link, a list of
        // {text} / {text, url} segments.
        const segments = Array.isArray(part) ? part : [{ text: part }];
        return (
          <p key={i} className="cs-prose">
            {i === 0 && lead && <strong>{lead} </strong>}
            {segments.map((seg, j) =>
              seg.url ? (
                <a
                  key={j}
                  href={seg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-inline-link"
                >
                  {seg.text}
                </a>
              ) : (
                <React.Fragment key={j}>{seg.text}</React.Fragment>
              )
            )}
          </p>
        );
      })}
    </>
  );
}

/* One branch per Figma `Sections` variant, plus the media/grid blocks the case
   studies share. Anything else falls through to the project's `custom` registry. */
function Block({ block, custom }) {
  switch (block.variant) {
    case "default":
    case "header":
      return (
        <div className={block.variant === "header" ? "cs-v-header" : "cs-v-default"}>
          <p className="cs-eyebrow">{block.eyebrow}</p>
          <Prose lead={block.lead} body={block.body} />
        </div>
      );

    case "side-to-side":
      return (
        <div className="cs-v-side">
          <p className="cs-eyebrow">
            {Array.isArray(block.eyebrow)
              ? block.eyebrow.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < block.eyebrow.length - 1 && <br />}
                  </span>
                ))
              : block.eyebrow}
          </p>
          <div className="cs-side-body">
            <Prose lead={block.lead} body={block.body} />
            {block.orderedList && (
              <ol className="cs-ordered">
                {block.orderedList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            )}
          </div>
        </div>
      );

    case "three-column":
      return (
        <div className="cs-v-three">
          <p className="cs-eyebrow">{block.eyebrow}</p>
          <div className="cs-three-cols">
            {block.columns.map((col) => (
              <p key={col}>{col}</p>
            ))}
          </div>
        </div>
      );

    case "stats":
      return (
        <div className="cs-v-stats">
          <p className="cs-eyebrow">{block.eyebrow}</p>
          {block.body && <Prose lead={block.lead} body={block.body} />}
          <div className="cs-stat-row">
            {block.stats.map((stat) => (
              <div key={stat.label} className="cs-stat">
                <p className="cs-stat-value">{stat.value}</p>
                <p className="cs-stat-label">{stat.label}</p>
                {stat.caption && <p className="cs-stat-caption">{stat.caption}</p>}
              </div>
            ))}
          </div>
        </div>
      );

    case "product-header":
      return <p className="cs-product-header">{block.title}</p>;

    case "media":
      return (
        <figure className="cs-media">
          {/* Every video shares one container: the dark ground with 32px padding,
              identical across case studies. `bare` drops it for stills that carry
              their own background. */}
          <div
            className={`cs-media-frame${block.bare ? " cs-media-frame--bare" : ""}${
              block.framed ? " cs-media-frame--framed" : ""
            }`}
          >
            {isVideo(block.src) ? (
              /* No forced aspect ratio: the Figma ratios were measured off still
                 screenshots, and pinning them here would crop the real recordings. */
              <video src={block.src} controls playsInline muted preload="metadata" />
            ) : (
              <img src={block.src} alt={block.alt || ""} />
            )}
            {block.notes && (
              <div className="cs-media-notes">
                {block.notes.map((note) => (
                  <p key={note} className="cs-media-note">
                    {note}
                  </p>
                ))}
              </div>
            )}
          </div>
          {block.caption && (
            <figcaption className="cs-media-caption">{block.caption}</figcaption>
          )}
        </figure>
      );

    case "screenshot-grid":
      return (
        <div className="cs-shots">
          <p className="cs-shots-label">{block.label}</p>
          <div className="cs-shots-row">
            {block.images.map((img) => (
              <figure
                key={img.src}
                /* Widths track the Figma proportions rather than equal thirds, so each
                   screenshot keeps its own crop. Passed as a custom property so the
                   mobile stack rule can still override the flex sizing — an inline
                   `flex` would outrank the stylesheet. */
                style={{ "--shot-w": img.width }}
              >
                <img src={img.src} alt={img.alt} />
              </figure>
            ))}
          </div>
        </div>
      );

    default: {
      const Custom = custom && custom[block.variant];
      return Custom ? <Custom block={block} /> : null;
    }
  }
}

/* ── Password gate — same session-scoped unlock as the other project pages ── */

function PasswordModal({ onUnlock, projectName }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onUnlock(value, () => setError(true));
  }

  const requestSubject = `Password request: ${projectName}`;
  const requestBody = `I'm looking through your portfolio and would like to know the password for the ${projectName} project.`;
  const requestHref = `mailto:sonika2patel@gmail.com?subject=${encodeURIComponent(
    requestSubject
  )}&body=${encodeURIComponent(requestBody)}`;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.box}>
        <p style={modalStyles.label}>This project is password protected.</p>
        <form onSubmit={handleSubmit} style={modalStyles.form}>
          <input
            type="password"
            placeholder="Enter password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            style={{
              ...modalStyles.input,
              borderColor: error ? "#c0392b" : "rgba(0,0,0,0.15)",
            }}
            autoFocus
          />
          {error && <p style={modalStyles.error}>Incorrect password. Try again.</p>}
          <button type="submit" style={modalStyles.button}>
            Enter
          </button>
          <a href={requestHref} style={modalStyles.requestLink}>
            Request password
          </a>
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
    fontFamily: "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  label: { margin: "0 0 24px", fontSize: 14, color: "#4E4E4E" },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: {
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,0.15)",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
  },
  error: { margin: 0, fontSize: 12, color: "#c0392b" },
  button: {
    padding: "12px 14px",
    borderRadius: 8,
    border: "none",
    background: "#4A7A65",
    color: "#fff",
    fontSize: 14,
    fontFamily: "inherit",
    cursor: "pointer",
  },
  requestLink: {
    fontSize: 12,
    color: "#4A7A65",
    textAlign: "center",
    marginTop: 4,
    textDecoration: "none",
  },
};

export default function CaseStudyPage({ meta, nav, blocks, custom }) {
  const sessionKey = `unlocked_${meta.slug}`;
  const [unlocked, setUnlocked] = useState(
    () => !meta.protected || sessionStorage.getItem(sessionKey) === "1"
  );

  const anchorIds = useMemo(
    () => nav.flatMap((group) => group.items.map((item) => item.id)),
    [nav]
  );
  const [activeId, goTo] = useScrollSpy(anchorIds);

  function handleUnlock(value, onError) {
    if (value === meta.protected) {
      sessionStorage.setItem(sessionKey, "1");
      setUnlocked(true);
    } else {
      onError();
    }
  }

  return (
    <div className="cs-page">
      {!unlocked && (
        <PasswordModal onUnlock={handleUnlock} projectName={meta.company} />
      )}
      <div className="cs-shell">
        <Sidebar nav={nav} activeId={activeId} onNavigate={goTo} />

        <main className="cs-main">
          <header className="cs-page-head">
            <h1 className="cs-page-title">{meta.title}</h1>
            {meta.subtitle && <p className="cs-page-subtitle">{meta.subtitle}</p>}
          </header>

          <div
            className={`cs-hero${meta.hero.bleed ? " cs-hero--bleed" : ""}`}
            style={meta.hero.bg ? { background: meta.hero.bg } : undefined}
          >
            <img src={meta.hero.image} alt={meta.hero.alt} />
          </div>

          <div className="cs-blocks">
            {blocks.map((block, i) => (
              <div
                key={block.id || `${block.variant}-${i}`}
                id={block.id}
                className="cs-block"
                style={block.gapAfter ? { marginBottom: block.gapAfter } : undefined}
              >
                <Block block={block} custom={custom} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
