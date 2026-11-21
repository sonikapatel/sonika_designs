import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import "./dataSources.css";

/* The sources that feed Check-Ins, redrawn from the still (check-indata.png) so it
   can move: the six sources land one after another, a line draws from each down to
   Check-Ins, and then a dot travels each line on a loop, the way the data flows in.
   Coordinates are the still's own, on a 2000×620 canvas. Reduced motion shows the
   finished diagram with no drawing and no dots. */

const HUB = { x: 1000, y: 450 };

// Each source: its pill (x, y, width) and the point its line leaves from.
const SOURCES = [
  { label: "HRIS / Org Data", x: 2, y: 420, w: 300, from: { x: 302, y: 446 } },
  { label: "Personality Profiles", x: 305, y: 128, w: 326, from: { x: 520, y: 180 } },
  { label: "Integrations", x: 694, y: 2, w: 262, from: { x: 838, y: 54 } },
  { label: "Team Specific KPIs", x: 1157, y: 2, w: 302, from: { x: 1268, y: 54 } },
  { label: "Weekly Data", x: 1606, y: 128, w: 231, from: { x: 1655, y: 180 } },
  { label: "Soft Skills Guidance", x: 1697, y: 420, w: 301, from: { x: 1697, y: 446 } },
];

const PILL_H = 52;
const EASE_OUT = [0.23, 1, 0.32, 1];
const STAGGER = 0.09; // s between sources
const TRAVEL = 1.7; // s a dot takes to reach Check-Ins
const REST = 1.5; // s before the same line sends another

export default function DataSources({ block }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const flowing = useInView(ref, { amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const shown = inView || reduceMotion;

  return (
    <figure className="ds-figure" ref={ref}>
      <svg className="ds-svg" viewBox="0 0 2000 620" role="img" aria-label={block.alt}>
        {SOURCES.map((s, i) => (
          <motion.line
            key={s.label}
            className="ds-line"
            x1={s.from.x}
            y1={s.from.y}
            x2={HUB.x}
            y2={HUB.y}
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={shown ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{
              pathLength: { duration: 0.8, ease: EASE_OUT, delay: 0.25 + i * STAGGER },
              opacity: { duration: 0.2, delay: 0.25 + i * STAGGER },
            }}
          />
        ))}

        {/* Data on its way in: one dot per line, each a beat after the last. */}
        {!reduceMotion &&
          inView &&
          flowing &&
          SOURCES.map((s, i) => (
            <motion.circle
              key={s.label}
              className="ds-dot"
              r="6"
              initial={{ cx: s.from.x, cy: s.from.y, opacity: 0 }}
              animate={{
                cx: [s.from.x, HUB.x],
                cy: [s.from.y, HUB.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: TRAVEL,
                ease: "easeInOut",
                delay: 1.2 + i * 0.45,
                repeat: Infinity,
                repeatDelay: REST,
                opacity: {
                  duration: TRAVEL,
                  times: [0, 0.12, 0.85, 1],
                  delay: 1.2 + i * 0.45,
                  repeat: Infinity,
                  repeatDelay: REST,
                },
              }}
            />
          ))}

        {SOURCES.map((s, i) => (
          <motion.g
            key={s.label}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={shown ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: i * STAGGER }}
          >
            <rect className="ds-pill" x={s.x} y={s.y} width={s.w} height={PILL_H} rx={PILL_H / 2} />
            <text className="ds-label" x={s.x + s.w / 2} y={s.y + PILL_H / 2}>
              {s.label}
            </text>
          </motion.g>
        ))}

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.7 }}
        >
          {/* Check-Ins takes each arrival in with a soft ring. */}
          {!reduceMotion && <circle className="ds-ring" cx={HUB.x} cy={HUB.y} r="10" />}
          <circle className="ds-hub" cx={HUB.x} cy={HUB.y} r="6" />
          <image href="/images/criteria/criteria_logo.png" x="845" y="486" width="310" height="80" />
          <text className="ds-name" x={HUB.x} y="598">
            Check-Ins
          </text>
        </motion.g>
      </svg>
    </figure>
  );
}
