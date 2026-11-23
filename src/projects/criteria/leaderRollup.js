import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import "./leaderRollup.css";

/* The dashboard at two levels, switched by pills: the direct manager dashboard (the
   recording), then the exec level. The exec level is drawn in the recording's visual
   treatment (nav rail, greeting-style header, icon-titled white cards on the grey ground,
   set in Figtree) and plays by itself like a recording: the page scrolls down through
   its cards and back on a loop. Its content is the Monday Executive Intelligence and
   senior manager reports from the report previews (merchPreview.js), word for word.
   Reduced motion shows the page still, and scrollable. */

const METRICS = [
  { label: "Weekly participation", value: "54%", note: "+4 pts since last week", tone: "good" },
  { label: "Organization mood", value: "3.9", unit: "/5", note: "Steady for 3 weeks", tone: "plain" },
  { label: "Early signals raised", value: "3", note: "Flagged before any escalation", tone: "plain" },
];

const SIGNALS = [
  ["Delivery risk", "Dependencies on the Beta launch are the top blocker across Sales, Product and Customer Success."],
  ["Wellbeing", "Customer Success has reported lower energy two weeks running, tied to support volume."],
  ["Momentum", "Product’s participation reached 92%, the highest of any department this quarter."],
];

const NEXT_STEPS = [
  "Name one owner for Beta launch dependencies this week.",
  "Ask Customer Success leaders where support load can be shared.",
];

const TEAMS = [
  { team: "Krishna Desai’s Team", area: "Sales", rate: "75%", mood: 4.0, trend: "down" },
  { team: "Jim Halpert’s Team", area: "Customer Success", rate: "88%", mood: 3.6, trend: "down" },
  { team: "Stanley Hudson’s Team", area: "Product", rate: "92%", mood: 4.3, trend: "up" },
  { team: "Michael Scott’s Team", area: "Marketing", rate: "64%", mood: 4.1, trend: "up" },
];

const EASE_OUT = [0.23, 1, 0.32, 1];
const EASE_IN_OUT = [0.77, 0, 0.175, 1];

// The loop, in seconds: rest at the top, scroll down, rest at the bottom, scroll back.
const LOOP = 11;
const BEATS = [0, 0.27, 0.41, 0.86, 1];

const RAIL = [
  "M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z",
  "M3 17V3M3 17h14M7 14V9M11 14V6M15 14v-4",
  "M2.5 5.5h5l1.5 2h8.5v8.5h-15z",
  "M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2.5 16c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4M13.5 9a2 2 0 1 0 0-4M14 12c2 .3 3.5 1.7 3.5 4",
  "M3 4.5h14v9H8l-3.5 3v-3H3z",
];

const ICONS = {
  know: "M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM10 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM10 10.2a.2.2 0 1 0 0-.4.2.2 0 0 0 0 .4Z",
  steps: "M10 2.5l1.6 4.4 4.4 1.6-4.4 1.6L10 14.5l-1.6-4.4L4 8.5l4.4-1.6ZM15.5 13.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z",
  teams: RAIL[3],
};

function Glyph({ d }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function CardTitle({ icon, children }) {
  return (
    <p className="lr-card-title">
      <span className="lr-icon">
        <Glyph d={ICONS[icon]} />
      </span>
      {children}
    </p>
  );
}

function ExecDashboard({ alt }) {
  const still = useReducedMotion();
  const windowRef = useRef(null);
  const pageRef = useRef(null);
  const inView = useInView(windowRef, { amount: 0.4 });
  const [travel, setTravel] = useState(0);

  // How far the page has to scroll to show its last card, kept current as it resizes.
  useEffect(() => {
    const measure = () => {
      if (!windowRef.current || !pageRef.current) return;
      setTravel(Math.max(0, pageRef.current.offsetHeight - windowRef.current.clientHeight));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(windowRef.current);
    observer.observe(pageRef.current);
    return () => observer.disconnect();
  }, []);

  const playing = !still && inView && travel > 0;

  return (
    <div className="lr" role="img" aria-label={alt}>
      <div className="lr-frame">
        <div className="lr-rail">
          {RAIL.map((d, i) => (
            <span className={`lr-rail-item${i === 0 ? " is-on" : ""}`} key={d}>
              <Glyph d={d} />
            </span>
          ))}
        </div>

        <div className={`lr-window${still ? " is-still" : ""}`} ref={windowRef}>
          <motion.div
            className="lr-main"
            ref={pageRef}
            animate={playing ? { y: [0, 0, -travel, -travel, 0] } : { y: 0 }}
            transition={
              playing
                ? { duration: LOOP, times: BEATS, ease: EASE_IN_OUT, repeat: Infinity }
                : { duration: 0.3 }
            }
          >
            <div>
              <p className="lr-hi">Criteria Corp · Week of 11/10</p>
              <p className="lr-title">Monday Executive Intelligence</p>
            </div>

            <div className="lr-pair">
              <div className="lr-card">
                <CardTitle icon="know">What leaders should know</CardTitle>
                {SIGNALS.map(([title, text]) => (
                  <div className="lr-signal" key={title}>
                    <p className="lr-name">{title}</p>
                    <p className="lr-text">{text}</p>
                  </div>
                ))}
              </div>
              <div className="lr-card">
                <CardTitle icon="steps">Suggested next steps</CardTitle>
                {NEXT_STEPS.map((step) => (
                  <p className="lr-text lr-step" key={step}>
                    {step}
                  </p>
                ))}
              </div>
            </div>

            <div className="lr-card">
              <CardTitle icon="teams">Check-in overview</CardTitle>

              <div className="lr-metrics">
                {METRICS.map((m) => (
                  <div className="lr-metric" key={m.label}>
                    <p className="lr-label">{m.label}</p>
                    <p className="lr-value">
                      {m.value}
                      {m.unit && <span>{m.unit}</span>}
                    </p>
                    <p className={`lr-note lr-note--${m.tone}`}>{m.note}</p>
                  </div>
                ))}
              </div>

              <div className="lr-reports">
                {TEAMS.map((t, i) => {
                  const tone = t.trend === "up" ? "good" : "warn";
                  return (
                    <div className="lr-team" key={t.team}>
                      <div>
                        <p className="lr-name">{t.team}</p>
                        <p className="lr-small">
                          {t.area} · {t.rate} participation
                        </p>
                      </div>
                      <p className={`lr-status lr-status--${tone}`}>
                        {t.trend === "up" ? "↑ Rising" : "↓ Dipping"}
                      </p>
                      <div className="lr-bar">
                        <motion.span
                          className={`lr-fill lr-fill--${tone}`}
                          initial={still ? false : { scaleX: 0 }}
                          animate={{ scaleX: t.mood / 5 }}
                          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 + i * 0.06 }}
                        />
                      </div>
                      <p className="lr-mood">
                        <span>Mood</span> {t.mood.toFixed(1)}/5
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardVariations({ block }) {
  const [index, setIndex] = useState(0);
  const variation = block.variations[index];

  return (
    <div className="lr-block">
      <div className="lr-tabs" role="tablist" aria-label="Dashboard level">
        {block.variations.map((v, i) => (
          <button
            key={v.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`lr-tab${i === index ? " is-active" : ""}`}
            onClick={() => setIndex(i)}
          >
            {v.name}
          </button>
        ))}
      </div>

      <figure className="cs-media" role="tabpanel" key={variation.name}>
        <div className={`cs-media-frame${variation.src ? "" : " lr-media-frame"}`}>
          {variation.src ? (
            <video src={variation.src} controls playsInline muted preload="metadata" />
          ) : (
            <ExecDashboard alt={variation.alt} />
          )}
          {variation.notes && (
            <div className="cs-media-notes">
              {variation.notes.map((note) => (
                <p key={note} className="cs-media-note">
                  {note}
                </p>
              ))}
            </div>
          )}
        </div>
        {variation.caption && <figcaption className="cs-media-caption">{variation.caption}</figcaption>}
      </figure>
    </div>
  );
}
