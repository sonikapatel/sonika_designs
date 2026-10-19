import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { HOMEASE, HOMEASE_NAV, HOMEASE_BLOCKS } from "./homeaseData";
import "./homease.css";

/* Problem and Key Decisions: an optional intro, then a vertical stack of cards on
   the Homease tint (#F3E8E1). */
function CardStack({ block }) {
  const paragraphs = block.body ? (Array.isArray(block.body) ? block.body : [block.body]) : [];
  return (
    <div className="hm-stack">
      <p className="cs-eyebrow">{block.eyebrow}</p>
      {paragraphs.map((text, i) => (
        <p key={i} className="cs-prose">
          {i === 0 && block.lead && <strong>{block.lead} </strong>}
          {text}
        </p>
      ))}
      <ol className="hm-card-list">
        {block.cards.map((card) => (
          <li key={card.title} className="hm-card">
            <p className="hm-card-title">{card.title}</p>
            <p className="hm-card-body">{card.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

const CUSTOM = { "card-stack": CardStack };

export default function HomeasePage() {
  return <CaseStudyPage meta={HOMEASE} nav={HOMEASE_NAV} blocks={HOMEASE_BLOCKS} custom={CUSTOM} />;
}
