import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { SQUARE, SQUARE_NAV, SQUARE_BLOCKS } from "./squareData";

export default function SquarePage() {
  return <CaseStudyPage meta={SQUARE} nav={SQUARE_NAV} blocks={SQUARE_BLOCKS} />;
}
