import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./leaderRollup.css";

/* The dashboard in two variations, switched by tabs: the manager dashboard recording,
   then a second option, the roll-up a leader of several teams would open. The roll-up is
   drawn in the manager dashboard's own shell (nav rail, greeting, white cards on the
   grey ground) and set in Figtree, the face the recording uses. It answers the post-launch interviews: the value grew with distance
   from the team, a dip needed telling apart from a pattern, and one leader wanted to
   set the threshold that flags a team. The teams and numbers are the sample ones the
   "Across your teams" report in merchPreview.js already uses; the trend labels and the
   threshold are sample content written for this concept. */

const METRICS = [
  { label: "Check-in completion", value: "80%", note: "+6 pts since last week", tone: "good" },
  { label: "Average mood", value: "4.0", unit: "/5", note: "-0.1 since last week", tone: "warn" },
  { label: "Teams to watch", value: "2", note: "Customer Success, Sales", tone: "plain" },
];

// Lowest mood first, so the teams that need a conversation lead.
const TEAMS = [
  { area: "Customer Success", team: "Jim Halpert’s Team", rate: "88%", mood: 3.6, trend: "Down 3 weeks", tone: "risk" },
  { area: "Sales", team: "Krishna Desai’s Team", rate: "75%", mood: 4.0, trend: "Dip this week", tone: "warn" },
  { area: "Marketing", team: "Michael Scott’s Team", rate: "64%", mood: 4.1, trend: "Rising", tone: "good" },
  { area: "Product", team: "Stanley Hudson’s Team", rate: "92%", mood: 4.3, trend: "Rising", tone: "good" },
];

const EASE_OUT = [0.23, 1, 0.32, 1];

const RAIL = [
  "M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z",
  "M3 17V3M3 17h14M7 14V9M11 14V6M15 14v-4",
  "M2.5 5.5h5l1.5 2h8.5v8.5h-15z",
  "M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2.5 16c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4M13.5 9a2 2 0 1 0 0-4M14 12c2 .3 3.5 1.7 3.5 4",
  "M3 4.5h14v9H8l-3.5 3v-3H3z",
];

function RailIcon({ d, on }) {
  return (
    <span className={`lr-rail-item${on ? " is-on" : ""}`}>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Rollup({ alt }) {
  const still = useReducedMotion();

  // Plays each time the variation is opened.
  const rise = (i) =>
    still
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, ease: EASE_OUT, delay: 0.05 + i * 0.07 },
        };

  return (
    <div className="lr" role="img" aria-label={alt}>
      <div className="lr-frame">
        <div className="lr-rail">
          {RAIL.map((d, i) => (
            <RailIcon key={d} d={d} on={i === 0} />
          ))}
        </div>

        <div className="lr-main">
          <div className="lr-head">
            <div>
              <p className="lr-hi">Good morning, Amy.</p>
              <p className="lr-title">Here’s how your teams are performing.</p>
            </div>
            <span className="lr-sample">Sample data</span>
          </div>

          <div className="lr-metrics">
            {METRICS.map((m, i) => (
              <motion.div className="lr-card" key={m.label} {...rise(i)}>
                <p className="lr-label">{m.label}</p>
                <p className="lr-value">
                  {m.value}
                  {m.unit && <span>{m.unit}</span>}
                </p>
                <p className={`lr-note lr-note--${m.tone}`}>{m.note}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="lr-card lr-teams" {...rise(3)}>
            <div className="lr-teams-head">
              <p className="lr-card-title">Teams, lowest mood first</p>
              <p className="lr-threshold">Flag a team when mood stays under 3.8 for 3 weeks</p>
            </div>

            {TEAMS.map((t, i) => (
              <div className="lr-team" key={t.area}>
                <div>
                  <p className="lr-name">{t.area}</p>
                  <p className="lr-small">{t.team}</p>
                </div>
                <div className="lr-bar">
                  <motion.span
                    className={`lr-fill lr-fill--${t.tone}`}
                    initial={still ? false : { scaleX: 0 }}
                    animate={{ scaleX: t.mood / 5 }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.4 + i * 0.08 }}
                  />
                </div>
                <p className="lr-mood">
                  {t.mood.toFixed(1)}
                  <span>/5</span>
                </p>
                <p className="lr-rate">{t.rate} checked in</p>
                <span className={`lr-chip lr-chip--${t.tone}`}>{t.trend}</span>
              </div>
            ))}
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
      <div className="lr-tabs" role="tablist" aria-label="Dashboard variations">
        {block.variations.map((v, i) => (
          <button
            key={v.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`lr-tab${i === index ? " is-active" : ""}`}
            onClick={() => setIndex(i)}
          >
            <span className="lr-tab-n">{`0${i + 1}`}</span>
            {v.name}
          </button>
        ))}
      </div>

      <figure className="cs-media" role="tabpanel" key={variation.name}>
        {variation.body && <p className="cs-prose lr-body">{variation.body}</p>}
        <div className={`cs-media-frame${variation.src ? "" : " lr-media-frame"}`}>
          {variation.src ? (
            <video src={variation.src} controls playsInline muted preload="metadata" />
          ) : (
            <Rollup alt={variation.alt} />
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
