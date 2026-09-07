import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { CRITERIA, CRITERIA_NAV, CRITERIA_BLOCKS } from "./criteriaData";
import PostItScramble from "./postits";

const CUSTOM_BLOCKS = {
  "card-sort": PostItScramble,
};

export default function CriteriaPage() {
  return (
    <CaseStudyPage
      meta={CRITERIA}
      nav={CRITERIA_NAV}
      blocks={CRITERIA_BLOCKS}
      custom={CUSTOM_BLOCKS}
    />
  );
}
