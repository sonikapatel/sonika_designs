import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { HOMEASE, HOMEASE_NAV, HOMEASE_BLOCKS } from "./homeaseData";

export default function HomeasePage() {
  return <CaseStudyPage meta={HOMEASE} nav={HOMEASE_NAV} blocks={HOMEASE_BLOCKS} />;
}
