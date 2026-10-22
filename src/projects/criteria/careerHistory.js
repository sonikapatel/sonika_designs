import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import "./criteria.css";

/* Krishna's Career History (Figma 315:9451), rebuilt in code so the week can play
   out: as the board scrolls into view, each project an individual contributor
   completes flies in under its day. The projects are the ones in the Figma frame;
   days without one keep the "Add completed project" slot. */

const WEEK = [
  {
    day: "Monday",
    date: "Jan 10",
    projects: [
      {
        title: "Design System Organization in Figma",
        links: ["Criteria UI Library", "Criteria Platform Library"],
        reviewer: "Aiyu Chen",
      },
      {
        title: "Completed UX Research with 6 participants",
        links: ["Research Findings", "Figjam Synthesis"],
        reviewer: "Sara Zimmerman",
      },
    ],
  },
  {
    day: "Tuesday",
    date: "Jan 11",
    projects: [],
  },
  {
    day: "Wednesday",
    date: "Jan 12",
    projects: [
      {
        title: "Develop Check-Ins v1",
        links: ["Develop Updates"],
        reviewer: "Tarun Singh",
      },
    ],
  },
  {
    day: "Thursday",
    date: "Jan 13",
    projects: [],
  },
  {
    day: "Friday",
    date: "Jan 14",
    projects: [],
  },
];

// Every card in landing order, so each one knows when it flies in.
const ORDER = WEEK.flatMap((d, di) => d.projects.map((_, pi) => `${di}-${pi}`));
const STAGGER_MS = 650;
const LEAD_MS = 400;

const FLY = {
  hidden: { opacity: 0, y: -28, scale: 0.94, rotate: -2 },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", visualDuration: 0.45, bounce: 0.25 },
  },
};

// The rail is Figma's own sidebar artwork (logo, expand button, dashboard,
// analytics, projects, people, messages, settings), pinned to the top of the column.
function Rail() {
  return (
    <div className="ch-rail" aria-hidden="true">
      <img src="/images/criteria/career-rail.png" alt="" />
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.article className="ch-card" variants={FLY} initial="hidden" animate="shown" layout>
      <p className="ch-card-title">{project.title}</p>
      {project.links.map((link) => (
        <p key={link} className="ch-card-link">
          {link}
          <span aria-hidden="true">{"\u00a0"}↗</span>
        </p>
      ))}
      <span className="ch-tag">{project.reviewer}</span>
    </motion.article>
  );
}

// The screen is laid out at a fixed desktop size and scaled to the column, so it
// reads as a real screenshot. Its 16:9 proportions match the dashboard recording
// (3016x1706) in the frame above it.
const SCREEN_W = 1100;
const SCREEN_H = Math.round((SCREEN_W * 1706) / 3016);

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

export default function CareerHistory({ block }) {
  const ref = useRef(null);
  const fit = useRef(null);
  const scale = useFitScale(fit);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [landed, setLanded] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setLanded(ORDER.length);
      return undefined;
    }
    setLanded(0);
    const timers = ORDER.map((_, i) =>
      setTimeout(() => setLanded(i + 1), LEAD_MS + i * STAGGER_MS)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion]);


  return (
    <figure className="ch" ref={ref}>
      {/* Same dark ground as the case study's other screens and recordings. */}
      <div className="cs-media-frame">
        <div className="ch-fit" ref={fit} style={{ height: SCREEN_H * scale }}>
        <div
          className="ch-frame"
          style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` }}
        >
          <Rail />
          <div className="ch-screen">
            <div className="ch-titlebar">
              <p className="ch-title">Krishna’s Career History</p>
              <p className="ch-role">Product Designer</p>
            </div>
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
                    const shown = d.projects.filter(
                      (_, pi) => ORDER.indexOf(`${di}-${pi}`) < landed
                    );
                    return (
                      <div key={d.day} className="ch-col">
                        <p className="ch-day">{d.day}</p>
                        <p className="ch-date">{d.date}</p>
                        <div className="ch-stack">
                          <AnimatePresence initial={false}>
                            {shown.map((p) => (
                              <ProjectCard key={p.title} project={p} />
                            ))}
                          </AnimatePresence>
                          {shown.length === 0 && (
                            <div className="ch-empty">
                              <span className="ch-plus" aria-hidden="true">+</span>
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
          </div>
        </div>
        </div>
      </div>
      {block?.caption && <figcaption className="cs-media-caption">{block.caption}</figcaption>}
    </figure>
  );
}
