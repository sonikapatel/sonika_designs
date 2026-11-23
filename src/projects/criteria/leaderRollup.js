import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import "./leaderRollup.css";

/* The dashboard at two levels, switched by pills: the direct manager dashboard (the
   recording), then the exec level. The exec level is drawn in the recording's visual
   treatment (nav rail, greeting-style header, icon-titled white cards on the grey ground,
   set in Figtree) and plays by itself like a recording: the page scrolls down through
   its cards and back on a loop. Its content is the Monday Executive Intelligence and
   senior manager reports from the report previews (merchPreview.js), word for word, apart
   from the "What you should know" card title.
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

// Each step sits under the teams it concerns, as the signals above name them: the Beta
// launch dependencies block Sales, Product and Customer Success; the support load is
// Customer Success's. Marketing has no step in the report, so it has none here.
const NEXT_STEPS = [
  ["Sales, Product and Customer Success", "Name one owner for Beta launch dependencies this week."],
  ["Customer Success", "Ask Customer Success leaders where support load can be shared."],
];

const TEAMS = [
  { team: "Krishna Desai’s Team", area: "Sales", rate: "75%", mood: 4.0, trend: "down" },
  { team: "Jim Halpert’s Team", area: "Customer Success", rate: "88%", mood: 3.6, trend: "down" },
  { team: "Stanley Hudson’s Team", area: "Product", rate: "92%", mood: 4.3, trend: "up" },
  { team: "Michael Scott’s Team", area: "Marketing", rate: "64%", mood: 4.1, trend: "up" },
];

const EASE_IN_OUT = [0.77, 0, 0.175, 1];

// The loop, in seconds: rest at the top, scroll down, rest at the bottom, scroll back.
const LOOP = 11;
const BEATS = [0, 0.27, 0.41, 0.86, 1];

// The side nav, as in the direct manager recording: the Criteria mark, the expand
// control, then dashboard (current), analytics, files, people, chat and settings.
const RAIL = [
  { d: "M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z" },
  { d: "M3 17V3M3 17h14M7 14V9M11 14V6M15 14v-4" },
  { d: "M2.5 5.5h5l1.5 2h8.5v8.5h-15z" },
  {
    d: "M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2.5 16c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4M13.5 9a2 2 0 1 0 0-4M14 12c2 .3 3.5 1.7 3.5 4",
  },
  { d: "M3 4.5h14v9H8l-3.5 3v-3H3z" },
  {
    box: 24,
    d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  },
];

const ICONS = {
  know: "M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM10 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM10 10.2a.2.2 0 1 0 0-.4.2.2 0 0 0 0 .4Z",
  steps: "M10 2.5l1.6 4.4 4.4 1.6-4.4 1.6L10 14.5l-1.6-4.4L4 8.5l4.4-1.6ZM15.5 13.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z",
  teams: RAIL[3].d,
};

function Glyph({ d, box = 20 }) {
  return (
    <svg viewBox={`0 0 ${box} ${box}`} aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={(1.4 * box) / 20}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// The Criteria mark from the recording's nav: three strokes in teal, orange and grey.
function Mark() {
  return (
    <svg className="lr-mark" viewBox="-1 -1 25 27" aria-hidden="true">
      <g fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.4 8.4 12.5 13.75 21.9 24" stroke="#9aa0ab" />
        <path d="M3.75 5.3 9.4 10 19.4.6" stroke="#2bb5c0" />
        <path d="M.6 18.75 6.25 13.75 11.6 17.8" stroke="#f0921e" />
      </g>
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

// The trend line along the foot of a card: it only says which way the trend points.
const TREND_LINES = {
  up: "0,17 33,14 66,14 100,8",
  down: "0,8 33,9 66,16 100,14",
};

/* One card in the check-in overview, in the format the direct manager dashboard gives
   each employee: who it is, an optional status, its figures, and a trend line along
   the foot.
   Here it holds a team; given a person, a role and a sentiment score it is that card. */
function OverviewCard({ name, detail, status, tone, stats, trend }) {
  const line = TREND_LINES[trend];
  return (
    <div className={`lr-person lr-person--${tone}`}>
      <div className="lr-person-head">
        <span className="lr-avatar">
          <Glyph d={ICONS.teams} />
        </span>
        <div>
          <p className="lr-name">{name}</p>
          <p className="lr-small">{detail}</p>
        </div>
      </div>
      {status && (
        <p className="lr-status">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            {tone === "good" ? (
              <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM6.8 10.2l2.2 2.2 4.2-4.6" />
            ) : (
              <path d="M10 3 2.5 16.5h15ZM10 8.5v3.5M10 14.3v.2" />
            )}
          </svg>
          {status}
        </p>
      )}
      <p className="lr-stats">
        {stats.map(([label, value]) => (
          <span key={label}>
            {label} <strong>{value}</strong>
          </span>
        ))}
      </p>
      <svg className="lr-spark" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
        <polygon className="lr-spark-area" points={`0,24 ${line} 100,24`} />
        <polyline className="lr-spark-line" points={line} />
      </svg>
    </div>
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
          <Mark />
          <span className="lr-expand">
            <Glyph d="M5 5.5 9.5 10 5 14.5M10.5 5.5 15 10l-4.5 4.5" />
          </span>
          {RAIL.map((item, i) => (
            <span className={`lr-rail-item${i === 0 ? " is-on" : ""}`} key={item.d}>
              <Glyph d={item.d} box={item.box} />
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
                <CardTitle icon="know">What you should know</CardTitle>
                {SIGNALS.map(([title, text]) => (
                  <div className="lr-signal" key={title}>
                    <p className="lr-name">{title}</p>
                    <p className="lr-text">{text}</p>
                  </div>
                ))}
              </div>
              <div className="lr-card">
                <CardTitle icon="steps">Suggested next steps</CardTitle>
                {NEXT_STEPS.map(([teams, step]) => (
                  <div className="lr-signal" key={step}>
                    <p className="lr-name">{teams}</p>
                    <p className="lr-text">{step}</p>
                  </div>
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

              <div className="lr-people">
                {TEAMS.map((t) => (
                  <OverviewCard
                    key={t.team}
                    name={t.team}
                    detail={t.area}
                    tone={t.trend === "up" ? "good" : "warn"}
                    trend={t.trend}
                    stats={[
                      ["Mood", `${t.mood.toFixed(1)}/5`],
                      ["Participation", t.rate],
                    ]}
                  />
                ))}
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
        {/* Both levels share one format: the same slim inset, a 16:9 desktop frame, and
            playback that starts by itself and loops, with no player controls. */}
        <div className="cs-media-frame lr-media-frame">
          {variation.src ? (
            <video
              className="lr-video"
              src={variation.src}
              aria-label={variation.alt}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
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
