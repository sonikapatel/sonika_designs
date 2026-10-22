import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import "./fika.css";

/* The text Fika sends after a match, asking when the creative is free to meet.
   They reply with the numbers of every slot that works, and Fika confirms it will
   follow up with a time and place. Plays through once when it scrolls into view,
   with a typing indicator before each message, like a real thread. */

const THREAD = [
  {
    from: "fika",
    text: "Hi Maya! ☕️ You’ve been matched for a fika this week. When are you free to connect for coffee? Reply with all the dates and times that work best:",
  },
  {
    from: "fika",
    text: "1. Tue, Mar 10 · 9–11am\n2. Wed, Mar 11 · 12–2pm\n3. Thu, Mar 12 · 4–6pm",
  },
  { from: "me", text: "1, 3" },
  {
    from: "fika",
    text: "Thank you! You’ll get a confirmed time and place to connect soon.",
  },
];

const TYPE_MS = 1100; // typing indicator before each Fika message
const GAP_MS = 700; // pause between messages
const REPLY_MS = 1300; // the creative takes a moment to answer

function StatusIcons() {
  return (
    <svg width="68" height="12" viewBox="0 0 68 12">
      {/* cellular */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 4.5} y={8 - i * 2.4} width="3" height={3.6 + i * 2.4} rx="0.8" fill="currentColor" />
      ))}
      {/* wi-fi */}
      <path d="M26 4.4a8 8 0 0 1 10.6 0M27.8 6.6a5.3 5.3 0 0 1 7 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M31.3 10.6 29.6 8.9a2.5 2.5 0 0 1 3.4 0Z" fill="currentColor" />
      {/* battery */}
      <rect x="42.5" y="1" width="21" height="10.5" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="44.3" y="2.8" width="15.5" height="6.9" rx="1.6" fill="currentColor" />
      <path d="M65 4.6v3.3a1.8 1.8 0 0 0 0-3.3Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

function Typing() {
  return (
    <motion.div
      className="ft-row ft-row--fika has-tail"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div className="ft-bubble ft-typing" aria-label="Fika is typing">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function TextThread() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setShown(THREAD.length);
      return undefined;
    }

    setShown(0);
    const timers = [];
    let t = 300;
    THREAD.forEach((msg, i) => {
      if (msg.from === "fika") {
        timers.push(setTimeout(() => setTyping(true), t));
        t += TYPE_MS;
      } else {
        t += REPLY_MS;
      }
      timers.push(
        setTimeout(() => {
          setTyping(false);
          setShown(i + 1);
        }, t)
      );
      t += GAP_MS;
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion]);

  const done = shown === THREAD.length;

  return (
    <figure className="ft" ref={ref}>
      <div className="ft-stage">
        <div className="ft-phone">
          <div className="ft-screen">
            <div className="ft-status" aria-hidden="true">
              <span className="ft-time">10:42</span>
              <span className="ft-island" />
              <span className="ft-status-icons">
                <StatusIcons />
              </span>
            </div>

            <div className="ft-nav">
              <span className="ft-back" aria-hidden="true">
                <svg width="12" height="20" viewBox="0 0 12 20">
                  <path d="M10 2 2 10l8 8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ft-badge">3</span>
              </span>
              <div className="ft-contact">
                <span className="ft-avatar" aria-hidden="true">F</span>
                <p className="ft-name">
                  Fika <span aria-hidden="true">›</span>
                </p>
              </div>
            </div>

            <div className="ft-messages" aria-live="polite">
              <p className="ft-stamp">
                <strong>Text Message</strong>
                <br />
                Today 10:42 AM
              </p>
              <AnimatePresence initial={false}>
                {THREAD.slice(0, shown).map((msg, i, list) => {
                  // iOS only draws the tail on the last bubble of a run.
                  const tail = !list[i + 1] || list[i + 1].from !== msg.from || typing;
                  return (
                    <motion.div
                      key={i}
                      className={`ft-row ft-row--${msg.from}${tail ? " has-tail" : ""}`}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", visualDuration: 0.35, bounce: 0.2 }}
                      layout
                    >
                      <p className="ft-bubble">{msg.text}</p>
                    </motion.div>
                  );
                })}
                {typing && <Typing key="typing" />}
              </AnimatePresence>
              {done && (
                <motion.p
                  className="ft-receipt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Delivered
                </motion.p>
              )}
            </div>

            <div className="ft-compose" aria-hidden="true">
              <span className="ft-plus">+</span>
              <span className="ft-field">
                Text Message
                <svg width="12" height="17" viewBox="0 0 12 17">
                  <rect x="3" y="0.75" width="6" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 8a5 5 0 0 0 10 0M6 13v3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <span className="ft-home" aria-hidden="true" />
          </div>
        </div>
      </div>

      <figcaption className="cs-media-caption">
          After a match, Fika texts each creative to collect every time they’re free, so
          replying takes a few numbers instead of a back-and-forth. Fika then pairs the
          overlap with a partner cafe and sends a confirmed time and place.
      </figcaption>
    </figure>
  );
}
