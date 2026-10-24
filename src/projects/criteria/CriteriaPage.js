import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { CRITERIA, CRITERIA_NAV, CRITERIA_BLOCKS } from "./criteriaData";
import PostItScramble from "./postits";
import CareerHistory from "./careerHistory";
import Merchandising from "./merchandising";
import SolutionConcepts from "./solutionConcepts";
import { JobStories, ChannelOptions, Reflections } from "./storyBlocks";

const CUSTOM_BLOCKS = {
  "card-sort": PostItScramble,
  "career-history": CareerHistory,
  "solution-concepts": SolutionConcepts,
  "job-stories": JobStories,
  "channel-options": ChannelOptions,
  reflections: Reflections,
  merchandising: Merchandising,
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
