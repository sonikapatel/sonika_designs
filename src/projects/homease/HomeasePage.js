import CaseStudyPage from "../caseStudy/CaseStudyPage";
import CardDeck from "../caseStudy/CardDeck";
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
      <CardDeck items={block.cards} label={block.eyebrow} tint="#F3E8E1" />
    </div>
  );
}

const CUSTOM = { "card-stack": CardStack };

export default function HomeasePage() {
  return <CaseStudyPage meta={HOMEASE} nav={HOMEASE_NAV} blocks={HOMEASE_BLOCKS} custom={CUSTOM} />;
}
