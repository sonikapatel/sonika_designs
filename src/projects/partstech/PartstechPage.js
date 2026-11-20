import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { PARTSTECH, PARTSTECH_NAV, PARTSTECH_BLOCKS } from "./partstechData";

export default function PartstechPage() {
  return <CaseStudyPage meta={PARTSTECH} nav={PARTSTECH_NAV} blocks={PARTSTECH_BLOCKS} />;
}
