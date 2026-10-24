import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import PreviewModal from "./merchPreview";
import StepVisual, { useBeat } from "./merchSteps";
import "./merchandising.css";

/* In-product merchandising for Weekly Check-Ins (Figma 574:1647), rebuilt in code so
   it can be clicked through: the manager dashboard's entry banner opens the
   three-step "Learn more" walkthrough. Each step plays what its bullets describe
   (merchSteps.js), and Preview experience opens every report a user receives
   (merchPreview.js). */

const STEPS = [
  {
    title: "How It Works",
    image: "/images/criteria/merch/how-it-works.png",
    alt: "A laptop showing the Monday executive report, surrounded by the week's check-in signals",
    points: [
      "End-of-Week: Employees get emailed and complete a 2 minute check-in",
      "Following Completion: Coach Bo processes the responses",
      "Monday Insights: Managers receive email reports and conversation summaries",
    ],
    quote: "I shared personal challenges with Bo and my manager reached out the same day.",
    by: "Team Member",
    org: "Criteria Corp",
  },
  {
    title: "Why You Need It",
    image: "/images/criteria/merch/why-you-need-it.png",
    alt: "A manager beside cards for Celebrate, Needs Support and conversation starters",
    points: [
      "No more 'How was your week?' guesswork",
      "Catch issues before they become crises",
      "Works in the tools you use everyday (email currently with Slack/Teams coming soon)",
    ],
    quote: "In the first week, I learned things my department leaders hadn't heard yet.",
    by: "Josh Millet, CEO",
    org: "Criteria",
  },
  {
    title: "What You Can Expect",
    image: "/images/criteria/merch/what-to-expect.png",
    alt: "A manager and direct report reviewing key wins and a 30 day mood and progress chart",
    points: [
      "Have meaningful 1:1's instead of status updates",
      "50%+ weekly participation across teams",
      "Issues identified 2-4 weeks earlier than traditional methods",
    ],
    quote: "We've seen 20X more engagement and can build a proactive people strategy.",
    by: "Jillian Phelan, CPO",
    org: "Criteria",
  },
];

const MANAGER_RANGES = {
  "Past 30 days": [
    {
      label: "Logins",
      value: "70",
      warn: true,
      delta: "-34 since last 30 days",
      trend: "down",
    },
    {
      label: "Page Views",
      value: "1,364",
      delta: "-440 since last 30 days",
      trend: "down",
    },
    {
      label: "Coach Bo Chats",
      value: "95",
      delta: "-8 since last 30 days",
      trend: "down",
    },
  ],
  "Past 90 days": [
    {
      label: "Logins",
      value: "248",
      delta: "+21 since last 90 days",
      trend: "up",
    },
    {
      label: "Page Views",
      value: "4,912",
      delta: "+310 since last 90 days",
      trend: "up",
    },
    {
      label: "Coach Bo Chats",
      value: "301",
      delta: "-12 since last 90 days",
      trend: "down",
    },
  ],
  "Past 365 days": [
    {
      label: "Logins",
      value: "1,032",
      delta: "+164 since last year",
      trend: "up",
    },
    {
      label: "Page Views",
      value: "19,480",
      delta: "+2,205 since last year",
      trend: "up",
    },
    {
      label: "Coach Bo Chats",
      value: "1,188",
      delta: "+402 since last year",
      trend: "up",
    },
  ],
};

// Laid out at a fixed desktop size and scaled to the column, same as Career History.
const SCREEN_W = 1100;
const SCREEN_H = 600;

function useFitScale(ref) {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let frame = 0;
    const measure = () => setScale(el.clientWidth / SCREEN_W);
    measure();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [ref]);
  return scale;
}

/* ── Small pieces ── */

function Pills({ options, value, onChange }) {
  return (
    <div className="mx-pills" role="group" aria-label="Date range">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`mx-pill${opt === value ? " is-on" : ""}`}
          aria-pressed={opt === value}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Trend({ dir }) {
  if (!dir) return null;
  return (
    <span className={`mx-trend mx-trend--${dir}`} aria-hidden="true">
      {dir === "up" ? "↑" : "↓"}
    </span>
  );
}

function Stats({ stats }) {
  return (
    <div className="mx-stats">
      {stats.map((s) => (
        <div key={s.label} className="mx-stat">
          <p className="mx-stat-label">
            {s.label}{" "}
            <span className="mx-info" aria-hidden="true">
              i
            </span>
          </p>
          <p className="mx-stat-row">
            <span className="mx-stat-value">{s.value}</span>
            {s.warn && (
              <span className="mx-warn" aria-label="Below target">
                ⚠
              </span>
            )}
          </p>
          <p className="mx-stat-delta">
            <Trend dir={s.trend} />
            {s.delta}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── Manager dashboard ── */

function ManagerHome({ onLearnMore, onBookDemo, hint }) {
  const [range, setRange] = useState("Past 30 days");

  return (
    <div className="mx-page mx-page--manager">
      <p className="mx-page-title">Develop Analytics</p>
      <div className="mx-banner mx-banner--manager">
        <div className="mx-banner-copy">
          <p className="mx-overline">
            Weekly Manager Check-In <span className="mx-tag mx-tag--new">New</span>
          </p>
          <p className="mx-banner-title">Turn Weekly Check-ins Into Management Superpowers</p>
          <p className="mx-body">
            AI-powered weekly conversations that give managers actionable insights and early
            warnings about their team's wellbeing and performance.
          </p>
          <div className="mx-actions">
            <button type="button" className="mx-btn mx-btn--navy" onClick={onBookDemo}>
              Book demo
            </button>
            <button
              type="button"
              className={`mx-btn mx-btn--outline${hint ? " mx-hint" : ""}`}
              onClick={onLearnMore}
            >
              Learn more
            </button>
          </div>
        </div>
        <img className="mx-banner-art" src="/images/criteria/merch/career-banner.png" alt="" />
      </div>

      <div className="mx-card mx-insights">
        <p className="mx-section-title">Platform Engagement</p>
        <span className="mx-link">View all insights →</span>
      </div>

      <Pills options={Object.keys(MANAGER_RANGES)} value={range} onChange={setRange} />
      <Stats stats={MANAGER_RANGES[range]} />
    </div>
  );
}

/* ── Learn more walkthrough ── */

function LearnMoreModal({ onClose, onAction, onPreview, initialStep = 0 }) {
  const [[step, dir], setStep] = useState([initialStep, 1]);
  const reduceMotion = useReducedMotion();
  const closeRef = useRef(null);
  const last = step === STEPS.length - 1;
  const s = STEPS[step];
  const { beat, cycle } = useBeat(s.points.length, step, reduceMotion);

  // Functional so rapid clicks and key repeats always step from the latest state.
  const go = (to) =>
    setStep(([cur, d]) => {
      const next = typeof to === "function" ? to(cur) : to;
      if (next < 0 || next >= STEPS.length || next === cur) return [cur, d];
      return [next, next > cur ? 1 : -1];
    });

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") go((i) => i + 1);
    if (e.key === "ArrowLeft") go((i) => i - 1);
  };

  const slide = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, x: 32 * dir }, animate: { opacity: 1, x: 0 } };

  return (
    <>
      <motion.div
        className="mx-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mx-modal-title"
        onKeyDown={onKeyDown}
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
        transition={{ type: "spring", visualDuration: 0.3, bounce: 0.15 }}
      >
        <div className="mx-modal-head">
          <p id="mx-modal-title" className="mx-modal-title">
            Learn more about Weekly Check-Ins
          </p>
          <button
            ref={closeRef}
            type="button"
            className="mx-close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="mx-modal-body">
          {/* Keyed by step so each one slides in fresh; no exit pass, so a step can
              never hang half-gone while the next waits on it. */}
          <motion.div
            key={step}
            className="mx-step"
            {...slide}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <img className="mx-step-art" src={s.image} alt={s.alt} />
            <div className="mx-step-copy">
              <p className="mx-step-title">{s.title}</p>
              <StepVisual step={step} beat={beat} cycle={cycle} points={s.points} />
              {/* Each step's testimonial sits in its own container so the proof
                    reads apart from the pitch above it. */}
              <blockquote className="mx-quote">
                <span className="mx-quote-mark" aria-hidden="true">
                  “
                </span>
                <p className="mx-quote-text">{s.quote}</p>
                <footer className="mx-quote-by">
                  {s.by} — {s.org}
                </footer>
              </blockquote>
            </div>
          </motion.div>
        </div>

        <div className="mx-modal-foot">
          <div className="mx-foot-side">
            {step > 0 && (
              <button
                type="button"
                className="mx-icon-btn"
                aria-label="Previous step"
                onClick={() => go((i) => i - 1)}
              >
                ‹
              </button>
            )}
          </div>
          <div className="mx-dots" role="group" aria-label="Steps">
            {STEPS.map((st, i) => (
              <button
                key={st.title}
                type="button"
                className={`mx-dot-btn${i === step ? " is-on" : ""}`}
                aria-label={`Step ${i + 1}: ${st.title}`}
                aria-current={i === step ? "step" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <div className="mx-foot-side mx-foot-side--end">
            {last ? (
              <>
                <button
                  type="button"
                  className="mx-btn mx-btn--navy"
                  onClick={() => onAction("contact")}
                >
                  Contact us
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="mx-btn mx-btn--outline"
                  onClick={() => onPreview(step)}
                >
                  Preview experience
                </button>
                <button
                  type="button"
                  className="mx-icon-btn mx-icon-btn--solid"
                  aria-label="Next step"
                  onClick={() => go((i) => i + 1)}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

const TOASTS = {
  contact: "Thanks! Your Criteria CSM will reach out within one business day.",
  demo: "Demo request sent. Pick a time from the email in your inbox.",
};

export default function Merchandising({ block }) {
  const fit = useRef(null);
  const scale = useFitScale(fit);
  // null, "learn" or "preview"; the walkthrough reopens on the step it was left at.
  const [view, setView] = useState(null);
  const [learnStep, setLearnStep] = useState(0);
  const [opened, setOpened] = useState(false);
  const [toast, setToast] = useState(null);
  const trigger = useRef(null);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const openModal = (e) => {
    trigger.current = e.currentTarget;
    setLearnStep(0);
    setView("learn");
    setOpened(true);
  };

  const closeModal = () => {
    setView(null);
    trigger.current?.focus({ preventScroll: true });
  };

  const onAction = (kind) => {
    setToast({ id: Date.now(), text: TOASTS[kind] });
  };

  return (
    <figure className="mx">
      <div className="cs-media-frame">
        <div className="mx-fit" ref={fit} style={{ height: SCREEN_H * scale }}>
          <div
            className="mx-screen"
            style={{
              width: SCREEN_W,
              height: SCREEN_H,
              transform: `scale(${scale})`,
            }}
          >
            <ManagerHome
              onLearnMore={openModal}
              onBookDemo={() => onAction("demo")}
              hint={!opened}
            />

            {/* One scrim for both dialogs, so swapping the walkthrough for the
                preview never stacks two. */}
            <AnimatePresence>
              {view && (
                <motion.div
                  key="scrim"
                  className="mx-scrim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onMouseDown={(e) => e.target === e.currentTarget && closeModal()}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {view === "learn" && (
                      <LearnMoreModal
                        key="learn"
                        initialStep={learnStep}
                        onClose={closeModal}
                        onAction={onAction}
                        onPreview={(from) => {
                          setLearnStep(from);
                          setView("preview");
                        }}
                      />
                    )}
                    {view === "preview" && (
                      <PreviewModal
                        key="preview"
                        onClose={closeModal}
                        onBack={() => setView("learn")}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {toast && (
                <motion.div
                  key={toast.id}
                  className="mx-toast"
                  role="status"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  {toast.text}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {block?.caption && <figcaption className="cs-media-caption">{block.caption}</figcaption>}
    </figure>
  );
}
