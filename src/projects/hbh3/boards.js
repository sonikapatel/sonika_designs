import React from "react";
import { BEHAVIORS_BOARD, PAIN_POINTS_BOARD } from "./hbh3Data";

/* The two research artifacts unique to the Honeybee case study. Both reproduce a
   dense Figma "board" — see the --bs scale note in caseStudy.css for how their
   sub-10px type is kept legible on small screens. */

export function BehaviorsBoard() {
  return (
    <div className="cs-board">
      <div className="cs-board-head">
        <p className="cs-board-title">{BEHAVIORS_BOARD.title}</p>
        <p className="cs-board-sub">{BEHAVIORS_BOARD.subtitle}</p>
      </div>
      <div className="cs-board-body">
        {BEHAVIORS_BOARD.rows.map((row) => (
          <section key={row.title}>
            <div className="cs-row-title">
              <span className="cs-row-icon" style={{ background: row.iconBg }}>
                <img src={row.icon} alt="" />
              </span>
              <div>
                <p className="cs-row-heading">{row.title}</p>
                {row.subtitle && <p className="cs-row-subheading">{row.subtitle}</p>}
              </div>
            </div>
            <div className="cs-grid cs-grid-3">
              {row.cards.map((card) => (
                <article
                  key={card.title}
                  className={`cs-card${
                    row.cardStyle === "requirement" ? " cs-card--requirement" : ""
                  }`}
                >
                  <p className="cs-card-title">{card.title}</p>
                  <p className="cs-card-body">{card.body}</p>
                  {card.bullets && (
                    <ul className="cs-bullets">
                      {card.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export function PainPointsBoard() {
  const { painPoints, opportunities, context } = PAIN_POINTS_BOARD;
  return (
    <div className="cs-board cs-board--pain">
      <div className="cs-board-head">
        <p className="cs-board-title">{PAIN_POINTS_BOARD.title}</p>
        <p className="cs-board-sub">{PAIN_POINTS_BOARD.subtitle}</p>
      </div>
      <div className="cs-board-body">
        <section>
          <p className="cs-section-title">{painPoints.title}</p>
          <p className="cs-section-sub">{painPoints.subtitle}</p>
          <div className="cs-grid cs-grid-3">
            {painPoints.cards.map((card) => (
              <article key={card.body} className="cs-pain-card">
                <span className="cs-source-tag">{card.source}</span>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <p className="cs-section-title">{opportunities.title}</p>
          <p className="cs-section-sub">{opportunities.subtitle}</p>
          <div className="cs-grid cs-grid-3">
            {opportunities.cards.map((card) => (
              <article
                key={card.title}
                className={`cs-opp-card${card.highlight ? " cs-opp-card--highlight" : ""}`}
              >
                <h4>{card.title}</h4>
                <p>{card.body}</p>
                <ul className="cs-bullets">
                  {card.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section>
          <p className="cs-section-title">{context.title}</p>
          <p className="cs-section-sub">{context.subtitle}</p>
          <div className="cs-grid cs-grid-4">
            {context.cards.map((card) => (
              <article key={card.title} className="cs-context-card">
                <h4>{card.title}</h4>
                <p>
                  {card.body}
                  {card.bold && <strong>{card.bold}</strong>}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
