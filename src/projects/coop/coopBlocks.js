import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./coopBlocks.css";

/* The text layouts the Springboard story needs beyond the shared section variants:
   the project facts row, the rotating design principles, the audience personas, the
   research quotes, and a row of short clips shown side by side. Same tokens and white-card-on-rule treatment as
   the other case-study blocks. */

export function Facts({ block }) {
  return (
    <dl className="co-facts">
      {block.facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          {fact.lines.map((line) => (
            <dd key={line} className={fact.outcome ? "cs-outcome" : undefined}>
              {line}
            </dd>
          ))}
        </div>
      ))}
    </dl>
  );
}

// Same zero-bounce spring as the shared image carousel.
const SPRING = { type: "spring", visualDuration: 0.4, bounce: 0 };
const ROTATE_MS = 4500;

/* The design principles, one card at a time. They advance on their own, hold while
   the reader hovers or focuses them, and can be paused or picked from the dots.
   Readers who prefer less motion start paused and get a plain swap. */
export function RotatingPrinciples({ block }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const count = block.items.length;
  const running = !paused && !held && !reduceMotion;

  useEffect(() => {
    if (!running) return undefined;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearTimeout(id);
  }, [running, index, count]);

  const offset = reduceMotion ? 0 : 24;

  return (
    <div
      className="co-rotator"
      aria-roledescription="carousel"
      aria-label="Design principles"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
      }}
    >
      {/* Every card shares one grid cell, so the stage keeps the tallest card's
          height and the page below doesn't move as they change. */}
      <div className="co-rotator-stage" aria-live={running ? "off" : "polite"}>
        {block.items.map((item, i) => {
          const active = i === index;
          return (
            <motion.div
              key={item.title}
              className="cs-principle co-rotator-card"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              initial={false}
              animate={{ opacity: active ? 1 : 0, x: active ? 0 : (i < index ? -1 : 1) * offset }}
              transition={reduceMotion ? { duration: 0 } : SPRING}
            >
              <p className="cs-principle-title">{item.title}</p>
              <p className="cs-principle-body">{item.body}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="co-rotator-controls">
        <div className="co-rotator-dots">
          {block.items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              className={`co-rotator-dot${i === index ? " is-active" : ""}`}
              aria-label={`Show ${item.title}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        {!reduceMotion && (
          <button
            type="button"
            className="co-rotator-toggle"
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
    </div>
  );
}

export function Personas({ block }) {
  return (
    <div className="co-cards">
      {block.personas.map((p) => (
        <article key={`${p.name}-${p.title}`} className="co-card">
          <div className="co-persona-head">
            <div>
              <p className="co-persona-name">{p.name}</p>
              <p className="co-persona-title">{p.title}</p>
            </div>
            <span className="co-tag">{p.type}</span>
          </div>
          <dl className="co-persona-meta">
            <div>
              <dt>Background</dt>
              <dd>{p.background}</dd>
            </div>
            <div>
              <dt>Common Actions</dt>
              <dd>
                <ul>
                  {p.actions.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export function Quotes({ block }) {
  return (
    <div className="co-quotes">
      {block.quotes.map((q) => (
        <figure key={q.name} className="co-quote">
          <blockquote>
            {q.text.map((part, i) =>
              typeof part === "string" ? (
                <React.Fragment key={i}>{part}</React.Fragment>
              ) : (
                <strong key={i}>{part.bold}</strong>
              )
            )}
          </blockquote>
          <figcaption>
            <span>- {q.name}</span>
            <span>{q.role}</span>
            <span className="co-quote-org">{q.org}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* Short UI clips that loop like GIFs, side by side on the shared dark ground. */
export function ClipRow({ block }) {
  return (
    <figure className="cs-media">
      <div className="cs-media-frame co-clip-row">
        {block.clips.map((clip) => (
          <video
            key={clip.src}
            src={clip.src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label={clip.alt}
          />
        ))}
      </div>
      {block.caption && <figcaption className="cs-media-caption">{block.caption}</figcaption>}
    </figure>
  );
}
