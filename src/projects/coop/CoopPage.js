import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { COOP, COOP_NAV, COOP_BLOCKS } from "./coopData";
import { Facts, Personas, Quotes, ClipRow } from "./coopBlocks";

const CUSTOM_BLOCKS = {
  facts: Facts,
  personas: Personas,
  quotes: Quotes,
  "clip-row": ClipRow,
};

export default function CoopPage() {
  return <CaseStudyPage meta={COOP} nav={COOP_NAV} blocks={COOP_BLOCKS} custom={CUSTOM_BLOCKS} />;
}
