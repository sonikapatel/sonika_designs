import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* Rotating card deck for every numbered or ordered list in the case studies
   (ordered lists, agendas, three-column takeaways, principles). The items sit as a
   stack: the front card is readable, the next two peek out behind it, slightly
   turned. Every few seconds the front card swings off to the left and tucks in at
   the back, so the list is read one card at a time.

   Autoplay pauses while the pointer or focus is on the deck, while it is off
   screen, and for good once the reader uses the arrows. Reduced motion turns
   autoplay and the swing off; the arrows still step through the cards. */

const HOLD = 5200; // ms each card stays in front
const PEEK = 14; // px each card behind steps down
const TILT = [0, -2.2, 1.8]; // deg for the front card and the two behind it
const SETTLE = { type: "spring", visualDuration: 0.55, bounce: 0.12 };
const SWING = { duration: 0.7, ease: [0.22, 1, 0.36, 1], times: [0, 0.45, 1] };

function Chevron({ flip }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d={flip ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* "What worked: starting from tires…" reads better as a titled card, so a short
   lead-in before a colon becomes the card's title. */
export function splitLead(text) {
  const m = /^([^:.]{2,40}):\s+(.+)$/s.exec(text);
  if (!m || m[1].trim().split(/\s+/).length > 5) return { body: text };
  const body = m[2];
  return { title: m[1].trim(), body: body.charAt(0).toUpperCase() + body.slice(1) };
}

export default function CardDeck({ items, label, tint }) {
  const n = items.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reduceMotion = useReducedMotion();
  const root = useRef(null);

  const go = useCallback(
    (step) => {
      setDir(step);
      setIndex((i) => (i + step + n) % n);
    },
    [n]
  );

  // Only rotate while the deck is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = n > 1 && visible && !hover && !stopped && !reduceMotion;

  useEffect(() => {
    if (!playing) return undefined;
    const id = setTimeout(() => go(1), HOLD);
    return () => clearTimeout(id);
  }, [playing, index, go]);

  const manual = (step) => {
    setStopped(true);
    go(step);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") manual(1);
    if (e.key === "ArrowLeft") manual(-1);
  };

  const pose = (i) => {
    const depth = (i - index + n) % n;
    const shown = depth < 3;
    const base = {
      x: 0,
      y: Math.min(depth, 2) * PEEK,
      scale: 1 - Math.min(depth, 2) * 0.045,
      rotate: TILT[Math.min(depth, 2)],
      opacity: shown ? 1 : 0,
      zIndex: n - depth,
    };
    if (reduceMotion) return { animate: base, transition: { duration: 0 } };
    // Forward: the card that just left the front swings out left, then tucks in behind.
    if (dir > 0 && depth === n - 1 && n > 1) {
      return {
        animate: {
          ...base,
          x: [0, -260, 0],
          rotate: [0, -12, base.rotate],
          zIndex: [n + 1, n + 1, base.zIndex],
          opacity: [1, 1, base.opacity],
        },
        transition: SWING,
      };
    }
    // Backward: the card coming to the front swings out from behind the stack.
    if (dir < 0 && depth === 0 && n > 1) {
      return {
        animate: {
          ...base,
          x: [0, -260, 0],
          rotate: [TILT[2], -12, 0],
          zIndex: [0, n + 1, n + 1],
          opacity: [1, 1, 1],
        },
        transition: SWING,
      };
    }
    return { animate: base, transition: SETTLE };
  };

  return (
    <section
      ref={root}
      className="cs-deck"
      aria-roledescription="carousel"
      aria-label={label || "Cards"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onKeyDown={onKeyDown}
    >
      <ol className="cs-deck-stack">
        {items.map((item, i) => {
          const { animate, transition } = pose(i);
          const front = i === index;
          return (
            <motion.li
              key={i}
              className="cs-deck-card"
              style={tint ? { background: tint, borderColor: "transparent" } : undefined}
              initial={false}
              animate={animate}
              transition={transition}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              aria-hidden={!front}
              onClick={() => !front && manual(((i - index + n) % n) === 1 ? 1 : -1)}
            >
              <p className="cs-deck-num">{String(i + 1).padStart(2, "0")}</p>
              {item.title && <p className="cs-deck-title">{item.title}</p>}
              <p className="cs-deck-body">{item.body}</p>
            </motion.li>
          );
        })}
      </ol>

      {n > 1 && (
        <div className="cs-deck-controls">
          <div className="cs-carousel-arrows">
            <button type="button" aria-label="Previous card" onClick={() => manual(-1)}>
              <Chevron flip />
            </button>
            <button type="button" aria-label="Next card" onClick={() => manual(1)}>
              <Chevron />
            </button>
          </div>
          <div className="cs-deck-dots" aria-hidden="true">
            {items.map((_, i) => (
              <span key={i} className={i === index ? "is-active" : ""}>
                {i === index && playing && <i key={index} className="cs-deck-timer" />}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
