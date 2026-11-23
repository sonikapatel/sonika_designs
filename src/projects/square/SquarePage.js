import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { SQUARE, SQUARE_NAV, SQUARE_BLOCKS } from "./squareData";
import MadLibs from "./madLibs";

const CUSTOM_BLOCKS = {
  "mad-libs": MadLibs,
};

export default function SquarePage() {
  return (
    <CaseStudyPage meta={SQUARE} nav={SQUARE_NAV} blocks={SQUARE_BLOCKS} custom={CUSTOM_BLOCKS} />
  );
}
