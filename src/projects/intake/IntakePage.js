import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { INTAKE, INTAKE_NAV, INTAKE_BLOCKS } from "./intakeData";
import "./intake.css";

/* Problem and Key Decisions: an optional intro, then a vertical stack of cards on
   the intake tint (#E3F7F7). Same shape as Homease's card stack. */
function CardStack({ block }) {
  const paragraphs = block.body ? (Array.isArray(block.body) ? block.body : [block.body]) : [];
  return (
    <div className="in-stack">
      <p className="cs-eyebrow">{block.eyebrow}</p>
      {paragraphs.map((text, i) => (
        <p key={i} className="cs-prose">
          {i === 0 && block.lead && <strong>{block.lead} </strong>}
          {text}
        </p>
      ))}
      <ol className="in-card-list">
        {block.cards.map((card) => (
          <li key={card.title} className="in-card">
            <p className="in-card-title">{card.title}</p>
            <p className="in-card-body">{card.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Three phone screenshots side by side on the intake tint, each with a short caption.
   On narrow screens the row scrolls sideways instead of shrinking the phones. */
function ScreenRow({ block }) {
  return (
    <figure className="in-screens">
      <p className="in-screens-label">{block.label}</p>
      <div className="in-screens-row">
        {block.screens.map((screen) => (
          <div key={screen.src} className="in-screen">
            <img src={screen.src} alt={screen.alt} loading="lazy" />
            <p className="in-screen-caption">{screen.caption}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}

const CUSTOM = { "card-stack": CardStack, "screen-row": ScreenRow };

export default function IntakePage() {
  return <CaseStudyPage meta={INTAKE} nav={INTAKE_NAV} blocks={INTAKE_BLOCKS} custom={CUSTOM} />;
}
