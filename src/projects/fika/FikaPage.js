import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { FIKA, FIKA_NAV, FIKA_BLOCKS } from "./fikaData";

export default function FikaPage() {
  return <CaseStudyPage meta={FIKA} nav={FIKA_NAV} blocks={FIKA_BLOCKS} />;
}
