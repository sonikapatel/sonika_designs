import React from "react";
import "./coopBlocks.css";

/* The text layouts the Springboard story needs beyond the shared section variants:
   the project facts row, the audience personas, the research quotes, and a row of
   short clips shown side by side. Same tokens and white-card-on-rule treatment as
   the other case-study blocks. */

export function Facts({ block }) {
  return (
    <dl className="co-facts">
      {block.facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          {fact.lines.map((line) => (
            <dd key={line}>{line}</dd>
          ))}
        </div>
      ))}
    </dl>
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
