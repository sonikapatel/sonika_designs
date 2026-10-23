import React from "react";
import "./storyBlocks.css";

/* Two text layouts the Criteria story needs beyond the shared section variants: the
   job stories per role, and the channel options weighed for chat and insights. Both
   are content only — they sit in the same 821px column and type scale as the prose. */

export function JobStories({ block }) {
  return (
    <div className="st-wrap">
      <p className="cs-eyebrow">{block.eyebrow}</p>
      {block.body && <p className="cs-prose">{block.body}</p>}
      <div className="st-stories">
        {block.stories.map((story) => (
          <article key={story.when} className="st-story">
            <p className="st-role">{story.role}</p>
            <p className="st-text">
              <strong>When</strong> {story.when}, <strong>I want</strong> {story.want},{" "}
              <strong>so</strong> {story.so}.
            </p>
            <dl className="st-meta">
              <div>
                <dt>Evidence</dt>
                <dd>{story.evidence}</dd>
              </div>
              <div>
                <dt>Led to</dt>
                <dd>{story.ledTo}</dd>
              </div>
            </dl>
          </article>
        ))}
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
