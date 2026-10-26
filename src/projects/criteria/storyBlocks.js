import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./storyBlocks.css";

/* Text layouts the Criteria story needs beyond the shared section variants: the job
   stories per role, the channel options weighed for chat and insights, and the
   reflections list. All content only — they sit in the same 821px column and type
   scale as the prose. */

// Same zero-bounce spring as the shared image carousel.
const SPRING = { type: "spring", visualDuration: 0.4, bounce: 0 };

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

/* Job stories grouped into one slide per role. The role tabs are the navigation, the
   arrows step through them in order, and each slide moves in from the side of the
   role it came from. */
export function JobStories({ block }) {
  const roles = [];
  block.stories.forEach((story) => {
    const group = roles.find((r) => r.role === story.role);
    if (group) group.stories.push(story);
    else roles.push({ role: story.role, stories: [story] });
  });

  const [index, setIndex] = useState(0);
  const tabs = useRef([]);
  const reduceMotion = useReducedMotion();
  const last = roles.length - 1;

  const goTo = (i, focus = false) => {
    const next = Math.max(0, Math.min(last, i));
    setIndex(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onTabKey = (e) => {
    if (e.key === "ArrowRight") goTo(index + 1, true);
    if (e.key === "ArrowLeft") goTo(index - 1, true);
    if (e.key === "Home") goTo(0, true);
    if (e.key === "End") goTo(last, true);
  };

  const offset = reduceMotion ? 0 : 32;

  return (
    <div className="st-wrap">
      <p className="cs-eyebrow">{block.eyebrow}</p>
      {block.body && <p className="cs-prose">{block.body}</p>}

      <div className="st-roles" aria-roledescription="carousel" aria-label="Job stories by role">
        <div className="st-role-tabs" role="tablist" aria-label="Roles">
          {roles.map((r, i) => (
            <button
              key={r.role}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`st-tab-${i}`}
              aria-selected={i === index}
              aria-controls={`st-role-panel-${i}`}
              tabIndex={i === index ? 0 : -1}
              className={`st-role-tab${i === index ? " is-active" : ""}`}
              onClick={() => goTo(i)}
              onKeyDown={onTabKey}
            >
              {r.role}
            </button>
          ))}
        </div>

        {/* Every role's panel shares one grid cell, so the stage keeps the height of the
            tallest role and the page below doesn't jump as the slides change. */}
        <div className="st-role-viewport">
          {roles.map((r, i) => {
            const active = i === index;
            return (
              <motion.div
                key={r.role}
                id={`st-role-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`st-tab-${i}`}
                aria-hidden={!active}
                inert={active ? undefined : ""}
                className={`st-stories${r.stories.length === 1 ? " st-stories--single" : ""}`}
                initial={false}
                animate={{ opacity: active ? 1 : 0, x: active ? 0 : (i < index ? -1 : 1) * offset }}
                transition={reduceMotion ? { duration: 0 } : SPRING}
              >
                {r.stories.map((story) => (
                  <article key={story.when} className="st-story">
                    <p className="st-text">
                      When {story.when}, I want {story.want},{" "}
                      so {story.so}.
                    </p>
                  </article>
                ))}
              </motion.div>
            );
          })}
        </div>

        <div className="cs-carousel-controls">
          <div className="cs-carousel-arrows">
            <button
              type="button"
              aria-label="Previous role"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
            >
              <Chevron flip />
            </button>
            <button
              type="button"
              aria-label="Next role"
              disabled={index === last}
              onClick={() => goTo(index + 1)}
            >
              <Chevron />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChannelOptions({ block }) {
  return (
    <div className="st-wrap">
      {block.eyebrow && <p className="cs-eyebrow">{block.eyebrow}</p>}
      <div className="st-options">
        {block.options.map((opt) => (
          <article key={opt.name} className="st-option">
            <div className="st-option-head">
              <p className="st-option-name">{opt.name}</p>
              <span className={`st-decision st-decision--${opt.decision.toLowerCase()}`}>
                {opt.decision}
              </span>
            </div>
            {opt.serves && <p className="st-serves">For {opt.serves}</p>}
            <dl className="st-meta">
              <div>
                <dt>Why it appealed</dt>
                <dd>{opt.appeal}</dd>
              </div>
              <div>
                <dt>What held it back</dt>
                <dd>{opt.holdback}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      {block.caption && <p className="cs-media-caption">{block.caption}</p>}
    </div>
  );
}

/* "What I'd do differently" as a list beside its label, like the other side-to-side
   sections. Each point is a bold takeaway with the reason under it. The points ease
   in one after another the first time the list scrolls into view; that happens once
   per visit, so it can afford a little motion. */
export function Reflections({ block }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cs-v-side">
      <p className="cs-eyebrow">{block.eyebrow}</p>
      <ul ref={ref} className={`cs-side-body st-reflections${shown ? " is-shown" : ""}`}>
        {block.items.map((item, i) => (
          <li key={item.title} className="st-reflection" style={{ "--i": i }}>
            <p className="st-reflection-title">{item.title}</p>
            <p className="st-reflection-body">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
