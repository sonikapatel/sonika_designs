import React, { useRef, useState } from "react";
import "./systemDiagram.css";

/* The Check-Ins product system, before and after. Both views share the same rows, so
   switching tabs shows what changed in place. Each panel shares one grid cell, which
   keeps the taller view's height and stops the page below from jumping. */

function Arrow() {
  return (
    <svg className="sd-arrow" width="12" height="18" viewBox="0 0 12 18" aria-hidden="true">
      <path
        d="M6 1v15M1.5 11.5 6 16l4.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Node({ node }) {
  return (
    <article className={`sd-node${node.tag ? ` sd-node--${node.tag.toLowerCase()}` : ""}`}>
      {node.role && <p className="sd-role">{node.role}</p>}
      <p className="sd-node-title">{node.title}</p>
      <p className="sd-node-body">{node.body}</p>
    </article>
  );
}

function Row({ label, children }) {
  return (
    <div className="sd-row">
      <p className="sd-label">{label}</p>
      <div className="sd-cells">{children}</div>
    </div>
  );
}

function Connector({ branch }) {
  return (
    <div className="sd-row sd-row--connector" aria-hidden="true">
      <span />
      {branch ? (
        <div className="sd-branch">
          <div className="sd-branch-arrows">
            <Arrow />
            <Arrow />
            <Arrow />
          </div>
          <div className="sd-branch-single">
            <Arrow />
          </div>
        </div>
      ) : (
        <div className="sd-single">
          <Arrow />
        </div>
      )}
    </div>
  );
}

function View({ view }) {
  return (
    <div className="sd-view">
      <Row label="Check-in">
        <Node node={view.capture} />
      </Row>
      <Connector />
      <Row label="Signal">
        <Node node={view.signal} />
      </Row>
      <Connector branch />
      <Row label="Delivery">
        <div className="sd-roles">
          {view.delivery.map((node) => (
            <Node key={node.role} node={node} />
          ))}
        </div>
      </Row>
      <Connector />
      <Row label="Loop">
        <Node node={view.loop} />
      </Row>
      <div className="sd-foundation">
        <Row label="Foundation">
          <div className="sd-pair">
            {view.foundation.map((node) => (
              <Node key={node.title} node={node} />
            ))}
          </div>
        </Row>
      </div>
    </div>
  );
}

export default function SystemDiagram({ block }) {
  const [index, setIndex] = useState(0);
  const tabs = useRef([]);
  const last = block.views.length - 1;

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

  return (
    <figure className="sd-wrap">
      <div className="st-role-tabs" role="tablist" aria-label="System version">
        {block.views.map((view, i) => (
          <button
            key={view.key}
            ref={(el) => (tabs.current[i] = el)}
            type="button"
            role="tab"
            id={`sd-tab-${view.key}`}
            aria-selected={i === index}
            aria-controls={`sd-panel-${view.key}`}
            tabIndex={i === index ? 0 : -1}
            className={`st-role-tab${i === index ? " is-active" : ""}`}
            onClick={() => goTo(i)}
            onKeyDown={onTabKey}
          >
            {view.tab}
          </button>
        ))}
      </div>

      <div className="sd-stage">
        {block.views.map((view, i) => {
          const active = i === index;
          return (
            <div
              key={view.key}
              id={`sd-panel-${view.key}`}
              role="tabpanel"
              aria-labelledby={`sd-tab-${view.key}`}
              aria-hidden={!active}
              inert={active ? undefined : ""}
              className={`sd-panel${active ? " is-active" : ""}`}
            >
              <p className="sd-status">{view.status}</p>
              <View view={view} />
            </div>
          );
        })}
      </div>

      {block.caption && <figcaption className="cs-media-caption">{block.caption}</figcaption>}
    </figure>
  );
}
