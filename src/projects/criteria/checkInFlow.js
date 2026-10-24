import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { WEEK, Rail, ProjectCard, useFitScale, SCREEN_W, SCREEN_H } from "./careerHistory";
import "./criteria.css";
import "./checkInFlow.css";

/* From the weekly Coach Bo check-in to Career History, as one flow the reader can
   play. Bo asks the same three questions as the shipped check-in (the recording
   earlier in the case study): how the week went, any blockers, what support would
   help. The one addition is a follow-up that pulls the thread on who helped, so the
   project Bo logs to Friday of Krishna's Career History carries a shout-out. */

// The project this check-in logs.
const PROJECT = {
  title: "Coach Bo onboarding requirements",
  links: ["Requirements Doc", "Onboarding Flows"],
  reviewer: "Aiyu Chen",
};

// The day the check-in lands on: Friday, the board's last column.
const TODAY = WEEK.length - 1;

const THINK_MS = 750;

/* The conversation, one step per question. Each answer waits in the input, already
   written, for the reader to send. Bo's questions are the shipped wording; the
   shout-out thread (the third question and Bo's reply to it) is the one addition. */
const SCRIPT = [
  {
    bo: ["How are you feeling this week?"],
    reply:
      "I'm feeling good! I just finished the requirements for Coach Bo onboarding and look forward to moving on to design systems scaling.",
  },
  {
    bo: ["Sounds like you've had a productive week! Are you facing any challenges or blockers?"],
    reply: "None at the moment.",
  },
  {
    bo: [
      "Great to hear things are moving smoothly!",
      "Did anyone help you with the onboarding requirements this week? I'll pass along a shout-out.",
    ],
    reply: "Yes! Aiyu Chen helped me pressure-test the requirements with engineering.",
  },
  {
    bo: [
      "Love that. I'll let Aiyu know, and add the shout-out to your Career History.",
      "Looking ahead to next week, what support would be most helpful for you?",
    ],
    reply: "Engineering handoff for some of the specs I've outlined.",
  },
];

/* ── Chat ── */

function Typing() {
  return (
    <div className="cf-typing" aria-label="Coach Bo is typing">
      <span />
      <span />
      <span />
    </div>
  );
}

function Chat({ sent, onSend, onView, reduceMotion }) {
  const [thinking, setThinking] = useState(false);
  const log = useRef(null);
  const timer = useRef(null);

  const done = sent === SCRIPT.length;
  const step = SCRIPT[sent];
  const ready = step && !thinking;

  // Keep the newest message in view.
  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [sent, thinking, reduceMotion]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const send = () => {
    if (!ready) return;
    onSend();
    setThinking(true);
    timer.current = setTimeout(() => setThinking(false), reduceMotion ? 0 : THINK_MS);
  };

  const fadeIn = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reduceMotion ? 0 : delay },
  });

  return (
    <div className="cf-chat">
      <div className="cf-head">
        <p className="cf-title">Weekly Check-In</p>
        <p className="cf-sub">
          Your responses will be summarized and shared with your manager and company leaders.
        </p>
      </div>

      <div className="cf-log" ref={log} aria-live="polite">
        {SCRIPT.slice(0, sent).map((s, i) => (
          <React.Fragment key={i}>
            {s.bo.map((line) => (
              <p key={line} className="cf-bo">
                {line}
              </p>
            ))}
            <motion.p className="cf-me" {...fadeIn()}>
              {s.reply}
            </motion.p>
          </React.Fragment>
        ))}
        {ready &&
          step.bo.map((line, j) => (
            <motion.p key={line} className="cf-bo" {...fadeIn(j * 0.25)}>
              {line}
            </motion.p>
          ))}
        {thinking && <Typing />}

        {done && !thinking && (
          <motion.div className="cf-wrap" {...fadeIn()}>
            <p className="cf-bo">
              Got it — I'll make sure that gets passed along. Thanks for sharing these updates,
              sounds like you're making solid progress. Have a great weekend!
            </p>
            <div className="cf-logged">
              <p className="cf-logged-label">Logged to Career History · Friday, Jan 14</p>
              <ProjectCard project={PROJECT} still />
            </div>
            <p className="cf-complete">
              Your check-in is complete for the week of 1/14.{" "}
              <button type="button" className="cf-link" onClick={onView}>
                View it in Career History →
              </button>
            </p>
          </motion.div>
        )}
      </div>

      {/* The answer is already written; sending it is the reader's only move. */}
      <form
        className={`cf-input${ready ? " is-typing" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          className="cf-field"
          readOnly
          value={ready ? step.reply : ""}
          placeholder={done ? "Check-in complete" : "Type your response…"}
          aria-label="Your response"
        />
        <button type="submit" className="cf-send" aria-label="Send" disabled={!ready}>
          ↑
        </button>
      </form>
    </div>
  );
}

/* ── Career History, with the logged project landing on today ── */

function Board({ project }) {
  return (
    <div className="ch-board">
      <div className="ch-head">
        <div>
          <p className="ch-month">January 2026</p>
          <p className="ch-sub">
            Weekly overview of your completed team deliverables and milestone check-ins.
          </p>
        </div>
        <div className="ch-tabs" aria-hidden="true">
          <span>All time</span>
          <span className="is-on">Current week</span>
        </div>
      </div>
      <div className="ch-scroll">
        <div className="ch-grid">
          {WEEK.map((d, di) => {
            const landed = di === TODAY && project;
            return (
              <div key={d.day} className="ch-col">
                <p className="ch-day">{d.day}</p>
                <p className="ch-date">{d.date}</p>
                <div className="ch-stack">
                  {d.projects.map((p) => (
                    <ProjectCard key={p.title} project={p} still />
                  ))}
                  {landed && <ProjectCard project={project} fresh />}
                  {d.projects.length === 0 && !landed && (
                    <div className="ch-empty">
                      <span className="ch-plus" aria-hidden="true">
                        +
                      </span>
                      Add completed project
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CheckInFlow({ block }) {
  const fit = useRef(null);
  const scale = useFitScale(fit);
  const reduceMotion = useReducedMotion();
  const [sent, setSent] = useState(0);
  const [stage, setStage] = useState("chat");
  const [landed, setLanded] = useState(false);
  const [run, setRun] = useState(0);

  const done = sent === SCRIPT.length;

  // The board appears first, then the logged project flies onto today.
  useEffect(() => {
    if (stage !== "history") return undefined;
    setLanded(false);
    const t = setTimeout(() => setLanded(true), reduceMotion ? 0 : 450);
    return () => clearTimeout(t);
  }, [stage, reduceMotion]);

  const restart = () => {
    setSent(0);
    setStage("chat");
    setRun((r) => r + 1);
  };

  return (
    <figure className="ch cf">
      <div className="cs-media-frame cf-frame">
        <div className="cf-bar">
          <ol className="cf-steps" aria-label="Flow">
            <li>
              <button
                type="button"
                className={`cf-step${stage === "chat" ? " is-on" : ""}`}
                aria-current={stage === "chat" ? "step" : undefined}
                onClick={() => setStage("chat")}
              >
                <span className="cf-num">1</span> Coach Bo check-in
              </button>
            </li>
            <li className="cf-arrow" aria-hidden="true">
              →
            </li>
            <li>
              <button
                type="button"
                className={`cf-step${stage === "history" ? " is-on" : ""}`}
                aria-current={stage === "history" ? "step" : undefined}
                disabled={!done}
                onClick={() => setStage("history")}
              >
                <span className="cf-num">2</span> Career History
              </button>
            </li>
          </ol>
          {sent > 0 && (
            <button type="button" className="cf-replay" onClick={restart}>
              ↺ Start over
            </button>
          )}
        </div>

        <div className="ch-fit" ref={fit} style={{ height: SCREEN_H * scale }}>
          <div
            className="ch-frame"
            style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` }}
          >
            <Rail />
            {/* Fade in only: an exit pass would hold the old screen in place while the
                new one waits on it. */}
            {stage === "chat" ? (
              <motion.div
                key={`chat-${run}`}
                className="cf-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Chat
                  sent={sent}
                  onSend={() => setSent((n) => n + 1)}
                  onView={() => setStage("history")}
                  reduceMotion={reduceMotion}
                />
              </motion.div>
            ) : (
              <motion.div
                key="history"
                className="ch-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="ch-titlebar">
                  <p className="ch-title">Krishna’s Career History</p>
                  <p className="ch-role">Product Designer</p>
                </div>
                <Board project={landed ? PROJECT : null} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {block?.caption && <figcaption className="cs-media-caption">{block.caption}</figcaption>}
    </figure>
  );
}
