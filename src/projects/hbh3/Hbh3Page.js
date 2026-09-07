import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { HBH3, HBH3_NAV, HBH3_BLOCKS } from "./hbh3Data";
import { BehaviorsBoard, PainPointsBoard } from "./boards";

const CUSTOM_BLOCKS = {
  "board-behaviors": BehaviorsBoard,
  "board-painpoints": PainPointsBoard,
};

export default function Hbh3Page() {
  return (
    <CaseStudyPage
      meta={HBH3}
      nav={HBH3_NAV}
      blocks={HBH3_BLOCKS}
      custom={CUSTOM_BLOCKS}
    />
  );
}
