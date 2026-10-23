import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { FIKA, FIKA_NAV, FIKA_BLOCKS } from "./fikaData";
import TextThread from "./textThread";

const CUSTOM_BLOCKS = {
  "text-thread": TextThread,
};

export default function FikaPage() {
  return (
    <CaseStudyPage meta={FIKA} nav={FIKA_NAV} blocks={FIKA_BLOCKS} custom={CUSTOM_BLOCKS} />
  );
}
