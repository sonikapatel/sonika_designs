import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Rail, ProjectCard } from "./careerHistory";
import { SCRIPT, PROJECT, Typing, Board } from "./checkInFlow";
import "./criteria.css";
import "./checkInFlow.css";
import "./coachBoCard.css";

/* The Criteria cover on the home page: the case study's Coach Bo check-in
   (checkInFlow.js), playing itself. Same screen, same classes, same script:
   Bo asks, each answer types into the input and sends, Bo wraps up and logs the
   project, then Career History opens with the project landing on Friday. It
   loops while the card is on screen; reduced motion shows the finished check-in.

   The screen is laid out at a fixed size and scaled to the square tile, the way
   the case study scales its 1100px capture to the column. */

const W = 620;
const H = 620;
const CHAR_MS = 22;

// One entry per beat: Bo's lines, the answer typing in, Bo thinking after it's sent.
const PHASES = [
  ...SCRIPT.flatMap((s, i) => [
    { k: "bo", i, ms: 700 + 350 * s.bo.length },
    { k: "type", i },
    { k: "think", i, ms: 750 },
  ]),
  { k: "done", ms: 2800 },
  { k: "history", ms: 4200 },
  { k: "out", ms: 500 },
];
const DONE = PHASES.findIndex((p) => p.k === "done");
const HISTORY = DONE + 1;

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { delay },
});

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

export default function CoachBoCard() {
  const ref = useRef(null);
  const fit = useRef(null);
  const log = useRef(null);
  const board = useRef(null);
  const inView = useInView(ref);
  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [phase, setPhase] = useState(reduce ? DONE : 0);
  const [typed, setTyped] = useState(0);
  const [landed, setLanded] = useState(false);
  const [scale, setScale] = useState(0.7);
  const [run, setRun] = useState(0);

  // Scale the fixed-size screen to the tile.
  useLayoutEffect(() => {
    const el = fit.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Step through the beats while the card is on screen.
  useEffect(() => {
    if (reduce || !inView) return undefined;
    const p = PHASES[phase];
    if (p.k === "type") {
      const reply = SCRIPT[p.i].reply;
      const t = setTimeout(
        () => {
          if (typed < reply.length) setTyped(typed + 1);
          else {
            setTyped(0);
            setPhase(phase + 1);
          }
        },
        typed < reply.length ? CHAR_MS : 450
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (phase === PHASES.length - 1) {
        setPhase(0);
        setLanded(false);
        setRun((r) => r + 1);
      } else setPhase(phase + 1);
    }, p.ms);
    return () => clearTimeout(t);
  }, [phase, typed, inView, reduce]);

  // In Career History the project flies onto Friday a beat after the board shows.
  useEffect(() => {
    if (phase !== HISTORY) return undefined;
    const sc = board.current?.querySelector(".ch-scroll");
    if (sc) sc.scrollLeft = sc.scrollWidth;
    const t = setTimeout(() => setLanded(true), 450);
    return () => clearTimeout(t);
  }, [phase]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [phase, typed]);

  const cur = PHASES[phase];
  const reached = (k, i) => PHASES.findIndex((p) => p.k === k && p.i === i) <= phase;
  const done = phase >= DONE;
  const typing = cur.k === "type";
  const draft = typing ? SCRIPT[cur.i].reply.slice(0, typed) : "";
  const showHistory = phase >= HISTORY;

  return (
    <div ref={ref} className={`cbo${cur.k === "out" ? " is-out" : ""}`} aria-hidden="true">
      <div className="cbo-fit" ref={fit}>
        <div className="ch cf">
          <div className="ch-frame" style={{ width: W, height: H, transform: `scale(${scale})` }}>
            <Rail />
            {!showHistory ? (
              <motion.div
                key={`chat-${run}`}
                className="cf-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="cf-chat">
                  <div className="cf-head">
                    <p className="cf-title">Weekly Check-In</p>
                    <p className="cf-sub">
                      Your responses will be summarized and shared with your manager and company leaders.
                    </p>
                  </div>

                  <div className="cf-log" ref={log}>
                    {SCRIPT.map((s, i) => (
                      <React.Fragment key={i}>
                        {reached("bo", i) &&
                          s.bo.map((line, j) => (
                            <motion.p key={line} className="cf-bo" {...fadeIn(j * 0.25)}>
                              {line}
                            </motion.p>
                          ))}
                        {reached("think", i) && (
                          <motion.p className="cf-me" {...fadeIn()}>
                            {s.reply}
                          </motion.p>
                        )}
                      </React.Fragment>
                    ))}
                    {cur.k === "think" && <Typing />}

                    {done && (
                      <motion.div className="cf-wrap" {...fadeIn()}>
                        <p className="cf-bo">
                          Got it — I'll make sure that gets passed along. Thanks for sharing these
                          updates, sounds like you're making solid progress. Have a great weekend!
                        </p>
                        <div className="cf-logged">
                          <p className="cf-logged-label">Logged to Career History · Friday, Jan 14</p>
                          <ProjectCard project={PROJECT} still />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className={`cf-input${typing ? " is-typing" : ""}`}>
                    <span className={`cf-field cbo-field${draft ? "" : " is-empty"}`}>
                      {draft || (done ? "Check-in complete" : "Type your response…")}
                    </span>
                    <span className="cf-send">↑</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="history"
                className="ch-screen"
                ref={board}
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
    </div>
  );
}
