import React, { useEffect, useState } from "react";
import "./merchSteps.css";

/* Each Learn more step's bullets as workflow cards: the bullet's copy with a small
   pattern of what it describes, played one card at a time. How It Works is a
   timeline (end-of-week email → Coach Bo → Monday insights), so its cards are joined
   by a line that fills as the week moves on.

   The lines build on each other: a line that has played keeps its finished pattern,
   the playing line carries a thin bar that fills until the next one starts, and the
   timeline rail travels at the same pace so it meets each card as it begins. Once
   every line has played the step holds, then fades back to the first line. */

const BEAT_MS = 2200;
const HOLD_MS = 1800;

/* Where the step is: `beat` is the playing line (`count` while holding at the end),
   `cycle` counts loops so each one starts fresh. Readers who prefer less motion get
   every line finished at once, with nothing moving (beat -1). */
export function useBeat(count, step, still) {
  const [[beat, cycle], setState] = useState([0, 0]);

  useEffect(() => {
    setState(([, c]) => [0, c + 1]);
  }, [step]);

  useEffect(() => {
    if (still) return undefined;
    const holding = beat >= count;
    const id = setTimeout(
      () => setState(([b, c]) => (b >= count ? [0, c + 1] : [b + 1, c])),
      holding ? HOLD_MS : BEAT_MS
    );
    return () => clearTimeout(id);
  }, [beat, count, still]);

  return still ? { beat: -1, cycle } : { beat, cycle };
}

// A line's place in the step: still to come, playing, or played.
const stateOf = (beat, i) => (beat < 0 || i < beat ? "done" : i === beat ? "on" : "idle");

function Icon({ d }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS = {
  mail: "M3 5h14v10H3z M3 5l7 6 7-6",
  bo: "M10 2.5l1.6 4.2 4.4.3-3.4 2.8 1.1 4.3L10 11.7l-3.7 2.4 1.1-4.3L4 7l4.4-.3z",
  report: "M4 16V9 M8 16V5 M12 16v-4 M16 16V7",
  talk: "M4 5h12v8H9l-3 2.5V13H4z",
  alert: "M10 3l7.5 13h-15z M10 8v3.5 M10 14v.01",
  plug: "M7 3v4 M13 3v4 M5 7h10v3a5 5 0 0 1-10 0z M10 15v2.5",
  check: "M4 10.5l4 4 8-9",
  people:
    "M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M2.5 16a4.5 4.5 0 0 1 9 0 M14 8.5a2 2 0 1 0 0-4 M13 11.5a4 4 0 0 1 4.5 4.5",
  clock: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M10 6v4l3 2",
};

/* A bullet's copy, verbatim. A "Label: detail" bullet sets the label as a kicker. */
function Scene({ icon, text, state, children }) {
  const split = text.match(/^([^:]{3,24}):\s+(.+)$/);
  return (
    <li className={`ms-scene is-${state}`}>
      <span className="ms-icon" aria-hidden="true">
        <Icon d={ICONS[icon]} />
      </span>
      <div className="ms-scene-copy">
        {split && <p className="ms-kicker">{split[1]}:</p>}
        <p className="ms-title">{split ? split[2] : text}</p>
      </div>
      <div className="ms-mini" aria-hidden="true">
        {children}
      </div>
    </li>
  );
}

/* ── How It Works ── */

function HowItWorks({ beat, points }) {
  // The rail heads for the next card while this one plays, so it arrives as that
  // card starts. It waits a frame after mounting so it travels from the top.
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const reached = beat < 0 ? 1 : started ? Math.min(beat + 1, 2) / 2 : 0;
  return (
    <ul className="ms-stack ms-stack--timeline" style={{ "--reached": reached }}>
      <Scene icon="mail" text={points[0]} state={stateOf(beat, 0)}>
        <span className="ms-timer">
          <span className="ms-timer-fill" />
        </span>
        <span className="ms-chip">2 min</span>
      </Scene>
      <Scene icon="bo" text={points[1]} state={stateOf(beat, 1)}>
        {["Mood", "Progress", "Blockers"].map((t, i) => (
          <span key={t} className="ms-chip ms-pop" style={{ "--i": i }}>
            {t}
          </span>
        ))}
      </Scene>
      <Scene icon="report" text={points[2]} state={stateOf(beat, 2)}>
        <span className="ms-bars">
          {[0.55, 0.85, 0.4, 0.7].map((h, i) => (
            <span key={i} style={{ "--h": h, "--i": i }} />
          ))}
        </span>
      </Scene>
    </ul>
  );
}

/* ── Why You Need It ── */

function WhyYouNeedIt({ beat, points }) {
  return (
    <ul className="ms-stack">
      <Scene icon="talk" text={points[0]} state={stateOf(beat, 0)}>
        <span className="ms-swap">
          <span className="ms-struck">How was your week?</span>
          <span className="ms-chip ms-chip--good ms-pop">Celebrate a win</span>
        </span>
      </Scene>
      <Scene icon="alert" text={points[1]} state={stateOf(beat, 1)}>
        <svg className="ms-spark" viewBox="0 0 120 28" aria-hidden="true">
          <polyline points="0,14 24,10 48,12 70,22 94,12 120,9" />
          <circle cx="70" cy="22" r="3.5" />
        </svg>
        <span className="ms-chip ms-chip--warn ms-pop">Needs support</span>
      </Scene>
      <Scene icon="plug" text={points[2]} state={stateOf(beat, 2)}>
        <span className="ms-chip ms-chip--live ms-pop">Email</span>
        <span className="ms-chip ms-chip--soon ms-pop" style={{ "--i": 1 }}>
          Slack · soon
        </span>
        <span className="ms-chip ms-chip--soon ms-pop" style={{ "--i": 2 }}>
          Teams · soon
        </span>
      </Scene>
    </ul>
  );
}

/* ── What You Can Expect ── */

function WhatYouCanExpect({ beat, points }) {
  return (
    <ul className="ms-stack">
      <Scene icon="check" text={points[0]} state={stateOf(beat, 0)}>
        {["Talk through blockers", "Recognize a win"].map((t, i) => (
          <span key={t} className="ms-agenda ms-pop" style={{ "--i": i }}>
            <Icon d={ICONS.check} />
            {t}
          </span>
        ))}
      </Scene>
      <Scene icon="people" text={points[1]} state={stateOf(beat, 1)}>
        <span className="ms-meter">
          <span className="ms-meter-fill" />
          <span className="ms-meter-mark" />
        </span>
      </Scene>
      <Scene icon="clock" text={points[2]} state={stateOf(beat, 2)}>
        <span className="ms-track">
          <span className="ms-track-gap" />
          <span className="ms-dot ms-dot--early" />
          <span className="ms-dot ms-dot--late" />
        </span>
      </Scene>
    </ul>
  );
}

const SCENES = [HowItWorks, WhyYouNeedIt, WhatYouCanExpect];

export default function StepVisual({ step, beat, cycle, points }) {
  const Visual = SCENES[step];
  return (
    <div className="ms-visual" style={{ "--beat": `${BEAT_MS}ms` }}>
      {/* Keyed by loop, so a new pass starts from the first line with a soft fade. */}
      <Visual key={cycle} beat={beat} points={points} />
    </div>
  );
}
