import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import "./solutionConcepts.css";

/* The options we evaluated alongside the dashboard: the inbox digest, and the
   Microsoft Teams integration (Coach Bo chat, a Check-Ins tab on the 1:1 meeting, a
   synced reminder). Each slide is a small scripted scene rather than a recording, so it
   can be iterated without re-capturing video. Every name, score and line of copy in
   them comes from existing Check-Ins artwork (the 1:1 prep panel and the Check-In
   Response Summary) — nothing is invented for the mock.

   A scene is driven by a step counter: `steps` lists how long each step holds before
   the next one, and the scene toggles classes off `s`. CSS transitions do the motion,
   which keeps every element's resting style its final state — reduced-motion readers
   simply get the last step. */

const HOLD_MS = 2400;

/* Glides to the centre of the element tagged `data-cursor={target}` in its scene, or
   rests in the lower right when there is nothing to point at. Measured rather than
   hand-placed so it stays on target as the stage scales. */
function Cursor({ target, pressed, step }) {
  const ref = useRef(null);
  const [at, setAt] = useState(null);

  useLayoutEffect(() => {
    const scene = ref.current && ref.current.parentElement;
    if (!scene) return;
    const el = target && scene.querySelector(`[data-cursor="${target}"]`);
    const box = scene.getBoundingClientRect();
    if (!el) {
      setAt({ left: box.width * 0.82, top: box.height * 0.84 });
      return;
    }
    const r = el.getBoundingClientRect();
    setAt({ left: r.left - box.left + r.width * 0.5, top: r.top - box.top + r.height * 0.55 });
    // Re-measured every step: content arriving above the target can push it around.
  }, [target, step]);

  return (
    <span
      ref={ref}
      className={`sc-cursor${pressed ? " is-pressed" : ""}`}
      style={at || { opacity: 0 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 20" width="100%" height="100%">
        <path
          d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z"
          fill="#111"
          stroke="#fff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ── 1. Prep digest in the inbox ── */

// Placeholder rows: the inbox around the digest carries no data of its own.
const INBOX_ROWS = 3;

// From Krishna's 1:1 prep panel: next week's goal, blockers, goals tracking, and the
// week-of-11/10 dip in sentiment.
const PREP_POINTS = [
  {
    text: "Ask about the multiple dependencies for clearance.",
    why: "Blocker on redefining the check-ins experience for Beta launch",
  },
  {
    text: "Recognise the UX research study.",
    why: "Goal completed week of 11/10",
  },
  {
    text: "Check in about accountability on the sales project with 3 clients.",
    why: "Dip in sentiment, week of 11/10",
    tone: "warn",
  },
];

function InboxScene({ s }) {
  return (
    <div className="sc-window sc-mail">
      <div className="sc-mail-list">
        <p className="sc-mail-folder">Inbox</p>
        <div
          data-cursor="new-mail"
          className={`sc-mail-row sc-mail-row--new${s >= 1 ? " is-in" : ""}${
            s >= 3 ? " is-selected" : ""
          }`}
        >
          <span className="sc-unread" />
          <div>
            <p className="sc-mail-from">Criteria Check-Ins</p>
            <p className="sc-mail-subject">Prepare for your next 1:1 with Krishna</p>
          </div>
          <span className="sc-mail-time">now</span>
        </div>
        {Array.from({ length: INBOX_ROWS }, (_, i) => (
          <div key={i} className="sc-mail-row sc-mail-row--skeleton">
            <div>
              <span className="sc-bar" />
              <span className="sc-bar sc-bar--short" />
            </div>
          </div>
        ))}
      </div>

      <div className="sc-mail-pane">
        {s < 3 ? (
          <p className="sc-empty">No message selected</p>
        ) : (
          <div className="sc-mail-body">
            <p className="sc-label-caps">1:1 prep · Krishna Desai</p>
            <p className="sc-title">Prepare for your next 1:1 with Krishna.</p>
            <p className="sc-meta">On par for a promotion in Q1 2026 · over the past 4 weeks</p>
            <div className="sc-points">
              {PREP_POINTS.map((p, i) => (
                <div
                  key={p.text}
                  className={`sc-point${s >= 4 + i ? " is-in" : ""}${
                    p.tone === "warn" ? " sc-point--warn" : ""
                  }`}
                >
                  <p className="sc-point-text">{p.text}</p>
                  <p className="sc-point-why">Why: {p.why}</p>
                </div>
              ))}
            </div>
            <div className={`sc-actions${s >= 6 ? " is-in" : ""}`}>
              <span data-cursor="add" className={`sc-btn sc-btn--primary${s >= 8 ? " is-done" : ""}`}>
                {s >= 8 ? "✓ Added to agenda" : "Add to 1:1 agenda"}
              </span>
              <span className="sc-btn">Open full prep</span>
            </div>
          </div>
        )}
      </div>
      <Cursor step={s} target={s < 2 ? null : s < 7 ? "new-mail" : "add"} pressed={s === 3 || s === 8} />
    </div>
  );
}

/* ── Microsoft Teams shell, shared by the three Teams scenes ──
   Title bar with search, the app rail (Activity, Chat, Teams, Calendar, Apps) and
   Teams' own neutrals and brand purple. Check-Ins content inside it keeps the
   Check-Ins tokens, the way a Teams app renders its own UI in a tab or card. */

const RAIL_ICONS = {
  Activity: <path d="M8 2.2a3.8 3.8 0 0 0-3.8 3.8v2.9L2.8 11h10.4l-1.4-2.1V6A3.8 3.8 0 0 0 8 2.2zM6.6 12.6a1.4 1.4 0 0 0 2.8 0" />,
  Chat: <path d="M2.5 3h11v7.5H6.5l-3 2.4v-2.4h-1z" />,
  Teams: (
    <>
      <circle cx="6.2" cy="5.2" r="2" />
      <circle cx="11.2" cy="5.8" r="1.5" />
      <path d="M2.4 12.8c0-2.1 1.7-3.8 3.8-3.8s3.8 1.7 3.8 3.8M10.4 9.3c1.7 0 3.2 1.4 3.2 3.2" />
    </>
  ),
  Calendar: (
    <>
      <rect x="2.4" y="3" width="11.2" height="10.6" rx="1.6" />
      <path d="M2.4 6.4h11.2M5.6 1.8v2.4M10.4 1.8v2.4" />
    </>
  ),
  Apps: (
    <>
      <rect x="2.6" y="2.6" width="4.4" height="4.4" rx="1" />
      <rect x="9" y="2.6" width="4.4" height="4.4" rx="1" />
      <rect x="2.6" y="9" width="4.4" height="4.4" rx="1" />
      <rect x="9" y="9" width="4.4" height="4.4" rx="1" />
    </>
  ),
};

function TeamsShell({ active, avatar, children }) {
  return (
    <div className="sc-window tm">
      <div className="tm-titlebar">
        <span className="tm-nav">‹ ›</span>
        <span className="tm-search">Search</span>
        <span className="tm-me">{avatar}</span>
      </div>
      <div className="tm-body">
        <nav className="tm-rail">
          {Object.keys(RAIL_ICONS).map((name) => (
            <span key={name} className={`tm-rail-item${name === active ? " is-active" : ""}`}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                {RAIL_ICONS[name]}
              </svg>
              {name}
            </span>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}

const BoAvatar = () => <span className="sc-avatar tm-bo">Bo</span>;

/* ── 2. Coach Bo's weekly questions as a Teams chat (the IC's view) ──
   The answers are Pamela's, as Coach Bo summarized them in the Check-In Response
   Summary: overwhelmed by Project Delta, the BigCorp renewal, help prioritizing. */

const BO_TURNS = [
  { q: "How was last week?", a: "Very overwhelmed. The week was a blur of meetings and tight deadlines from Project Delta." },
  { q: "What did you accomplish this week?", a: "I negotiated the BigCorp renewal with a 20% expansion." },
  { q: "What are you looking to accomplish next?", a: "I could use support prioritizing my tasks for next week." },
];

function TeamsChatScene({ s }) {
  // Steps: 1 opens the check-in, then each turn is question (odd) → answer (even).
  const shown = (i) => s >= 1 + i * 2;
  const answered = (i) => s >= 2 + i * 2;
  return (
    <TeamsShell active="Chat" avatar="PB">
      <div className="tm-list">
        <p className="tm-list-title">Chat</p>
        <div className="tm-list-row is-selected">
          <BoAvatar />
          <div>
            <p className="tm-list-name">Coach Bo</p>
            <p className="tm-list-sub">{s >= 7 ? "Your check-in is complete" : "Weekly check-in"}</p>
          </div>
        </div>
        <div className="tm-list-row tm-skeleton" />
        <div className="tm-list-row tm-skeleton" />
      </div>

      <div className="tm-convo">
        <div className="tm-convo-head">
          <BoAvatar />
          <p className="tm-convo-name">Coach Bo</p>
          <span className="tm-tab is-active">Chat</span>
        </div>
        <div className="tm-feed">
          {BO_TURNS.map((t, i) => (
            <React.Fragment key={t.q}>
              <div className={`tm-msg${shown(i) ? " is-in" : ""}`}>
                <BoAvatar />
                <div className="tm-bubble">
                  <p className="tm-msg-meta">Coach Bo</p>
                  {i === 0 && <p className="tm-msg-text">Hi Pamela, it’s time for your weekly check-in.</p>}
                  <p className="tm-msg-text tm-question">{t.q}</p>
                </div>
              </div>
              <div className={`tm-msg tm-msg--me${answered(i) ? " is-in" : ""}`}>
                <div className="tm-bubble">
                  <p className="tm-msg-text">{t.a}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
          <div className={`tm-msg${s >= 7 ? " is-in" : ""}`}>
            <BoAvatar />
            <div className="tm-card">
              <p className="sc-label-caps">Check-In Response Summary</p>
              <p className="tm-card-title">Thanks, Pamela. Your check-in is ready for your next 1:1.</p>
              <p className="tm-visibility">
                This report is currently visible to Pamela, their manager, and admin.
              </p>
              <span className="sc-btn sc-btn--primary">View summary</span>
            </div>
          </div>
        </div>
        <div className={`tm-compose${s >= 1 && s < 7 && s % 2 === 1 ? " is-typing" : ""}`}>
          Type a message
        </div>
      </div>
    </TeamsShell>
  );
}

/* ── 3. Check-Ins tab on the Teams 1:1 meeting (the manager's view) ──
   Scores, conversation starters and the over-time lines are Pamela's, from the
   Check-In Response Summary and its Scores over time tab. */

const STARTERS = [
  "Which specific support tickets or issues are requiring the most follow-up time from you?",
  "What approach did you use with BigCorp that led to the expansion opportunity?",
  "How might we improve the handoff process between support and your team to reduce the manual follow-up needed?",
];

// Weekly averages on the 1–5 scale, read off the Scores over time chart.
const SCORE_WEEKS = ["Dec 26 – Jan 1", "Jan 2 – 8", "Jan 8 – 14", "Jan 15 – Today"];
const SCORE_LINES = [
  { name: "Mood", cls: "tm-line--mood", values: [2.1, 1.6, 3.6, 4.1] },
  { name: "Progress", cls: "tm-line--progress", values: [3.6, 2.2, 1.6, 5.1] },
  { name: "Readiness", cls: "tm-line--readiness", values: [3, 3, 3, 2.7] },
];

function TeamsMeetingScene({ s }) {
  const onTab = s >= 2;
  const toPath = (values) =>
    values.map((v, i) => `${i ? "L" : "M"}${10 + i * 93} ${110 - (v - 1) * 25}`).join(" ");
  return (
    <TeamsShell active="Calendar">
      <div className="tm-meeting">
        <div className="tm-meeting-head">
          <div>
            <p className="tm-meeting-title">1:1 · Pamela Beesly</p>
            <p className="tm-muted">Today · 10:00 – 10:30 AM · Microsoft Teams meeting</p>
          </div>
          <span className="tm-join">Join</span>
        </div>
        <div className="tm-tabs">
          <span className="tm-tab">Chat</span>
          <span className={`tm-tab${onTab ? "" : " is-active"}`}>Details</span>
          <span data-cursor="checkins-tab" className={`tm-tab tm-tab--app${onTab ? " is-active" : ""}`}>
            <span className="tm-app-dot" />
            Check-Ins
          </span>
        </div>

        {!onTab ? (
          <div className="tm-details">
            <p className="tm-label">Attendees</p>
            <div className="tm-attendee">
              <span className="tm-initials">PB</span>
              Pamela Beesly · Sales Manager
            </div>
            <div className="tm-list-row tm-skeleton" />
            <p className="tm-label">Apps</p>
            <div className="tm-attendee">
              <span className="tm-app-dot tm-app-dot--lg" />
              Check-Ins added a tab to this meeting
            </div>
          </div>
        ) : (
          <div className="tm-prep">
            <div className="tm-prep-main">
              <p className="sc-title">Prepare for your 1:1 with Pamela</p>
              <p className="tm-visibility">
                This report is currently visible to Pamela, their manager, and admin.
              </p>
              <div className={`tm-scores${s >= 3 ? " is-in" : ""}`}>
                <span className="tm-score tm-score--warn">Mood score: 2</span>
                <span className="tm-score tm-score--good">Progress score: 4</span>
                <span className="tm-score tm-score--good">Readiness score: 4</span>
              </div>
              <p className="tm-label">Conversation starters</p>
              <ul className="tm-starters">
                {STARTERS.map((q, i) => (
                  <li key={q} className={s >= 4 + i ? "is-in" : ""}>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`tm-prep-side${s >= 3 ? " is-in" : ""}`}>
              <p className="tm-label">Mood, Progress, and Readiness Over Time</p>
              <svg viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                <clipPath id="tm-lines-clip">
                  <rect x="0" y="0" width="300" height="120" className="sc-line-reveal" style={{ transform: `scaleX(${s >= 3 ? 1 : 0})` }} />
                </clipPath>
                <g clipPath="url(#tm-lines-clip)">
                  {SCORE_LINES.map((l) => (
                    <path key={l.name} d={toPath(l.values)} className={`tm-line ${l.cls}`} />
                  ))}
                </g>
              </svg>
              <div className="tm-weeks">
                {SCORE_WEEKS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
              <div className="tm-legend">
                {SCORE_LINES.map((l) => (
                  <span key={l.name} className={l.cls}>
                    Average {l.name}
                  </span>
                ))}
              </div>
              <div className="tm-spot tm-spot--good">
                <p className="tm-spot-label">Win spotlight</p>
                Negotiated the BigCorp renewal with 20% expansion
              </div>
              <div className="tm-spot tm-spot--warn">
                <p className="tm-spot-label">Issue spotlight</p>
                Support ticket follow-through gaps
              </div>
            </div>
          </div>
        )}
      </div>
      <Cursor step={s} target={s >= 1 && s < 3 ? "checkins-tab" : null} pressed={s === 2} />
    </TeamsShell>
  );
}

/* ── 4. Reminder synced to the upcoming 1:1 ── */

function TeamsReminderScene({ s }) {
  return (
    <TeamsShell active="Calendar">
      <div className="tm-day">
        <div className="tm-meeting-head">
          <p className="tm-meeting-title">Calendar</p>
          <span className="tm-muted">Today</span>
        </div>
        <div className="tm-grid">
          {["9 AM", "10 AM", "11 AM", "12 PM"].map((h) => (
            <div key={h} className="tm-hour">
              <span>{h}</span>
            </div>
          ))}
          <div className={`tm-event${s >= 1 ? " is-soon" : ""}`}>
            <p className="tm-event-title">1:1 · Pamela Beesly</p>
            <p className="tm-muted">10:00 – 10:30 AM · Microsoft Teams meeting</p>
          </div>
        </div>
      </div>

      <div className={`tm-toast${s >= 2 ? " is-in" : ""}`}>
        <div className="tm-toast-head">
          <BoAvatar />
          <p className="tm-muted">Coach Bo · Check-Ins</p>
        </div>
        <p className="tm-toast-title">Your 1:1 with Pamela Beesly starts in 15 minutes</p>
        <p className={`tm-toast-line${s >= 2 ? " is-in" : ""}`}>
          <span className="tm-spot-label">Issue spotlight</span> Support ticket follow-through gaps
        </p>
        <p className={`tm-toast-line${s >= 3 ? " is-in" : ""}`}>
          <span className="tm-spot-label">Start with</span> “Which specific support tickets or issues are
          requiring the most follow-up time from you?”
        </p>
        <div className="tm-toast-actions">
          <span data-cursor="open-prep" className={`tm-btn tm-btn--primary${s >= 5 ? " is-pressed" : ""}`}>
            Open prep
          </span>
          <span className="tm-btn">Join</span>
        </div>
      </div>
      <Cursor step={s} target={s >= 4 ? "open-prep" : null} pressed={s === 5} />
    </TeamsShell>
  );
}

const SLIDES = [
  {
    title: "1:1 prep digest in the inbox",
    Scene: InboxScene,
    steps: [700, 900, 700, 600, 450, 450, 900, 800],
    caption:
      "The day before a 1:1, managers get a short email that leads with what to talk about. The mood signal sits underneath as the reason for each suggestion, not as a score to interpret.",
  },
  {
    title: "Coach Bo in Microsoft Teams",
    Scene: TeamsChatScene,
    steps: [600, 900, 800, 900, 800, 900, 900],
    caption:
      "The Teams integration: Coach Bo asks the three weekly questions in a Teams chat, so employees check in where they already work. The summary carries the same visibility note it has in Develop.",
  },
  {
    title: "Check-Ins tab on the Teams 1:1",
    Scene: TeamsMeetingScene,
    steps: [700, 900, 600, 700, 400, 400],
    caption:
      "The 1:1 prep lives as a Check-Ins tab on the Teams meeting itself, with the scores, conversation starters, and mood, progress and readiness over time.",
  },
  {
    title: "Reminder synced to the 1:1",
    Scene: TeamsReminderScene,
    steps: [700, 900, 900, 900, 700],
    caption:
      "Before the 1:1 starts, a Teams notification surfaces the issue spotlight and one conversation starter, and links straight to the full prep.",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function SolutionConcepts({ block }) {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  const slide = SLIDES[index];
  const last = slide.steps.length;

  const goTo = useCallback((i) => {
    setIndex((i + SLIDES.length) % SLIDES.length);
    setStep(0);
  }, []);

  useEffect(() => {
    if (reduced) {
      setStep(last);
      return undefined;
    }
    if (step < last) {
      const id = setTimeout(() => setStep(step + 1), slide.steps[step]);
      return () => clearTimeout(id);
    }
    // Scene finished: hovering replays it in place, otherwise move to the next concept.
    const id = setTimeout(() => (paused ? setStep(0) : goTo(index + 1)), HOLD_MS);
    return () => clearTimeout(id);
  }, [step, last, slide, paused, reduced, index, goTo]);

  const { Scene } = slide;

  return (
    <figure className="cs-media">
      <div
        className="cs-media-frame sc-frame"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="sc-frame-head">
          <p className="sc-frame-label">{block.label}</p>
          <p className="sc-frame-count">
            {slide.title}
          </p>
        </div>

        <div className="sc-stage">
          <button type="button" className="sc-arrow sc-arrow--prev" onClick={() => goTo(index - 1)} aria-label="Previous concept">
            ‹
          </button>
          <Scene key={index} s={step} />
          <button type="button" className="sc-arrow sc-arrow--next" onClick={() => goTo(index + 1)} aria-label="Next concept">
            ›
          </button>
        </div>

        <div className="sc-dots">
          {SLIDES.map((sl, i) => (
            <button
              key={sl.title}
              type="button"
              className={`sc-dot-btn${i === index ? " is-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Show concept ${i + 1}: ${sl.title}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
      <figcaption className="cs-media-caption">{slide.caption}</figcaption>
    </figure>
  );
}
