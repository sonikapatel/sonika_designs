import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { CRITERIA, CRITERIA_NAV, CRITERIA_BLOCKS } from "./criteriaData";
import PostItScramble from "./postits";
import SolutionConcepts, { ImageCarousel } from "./solutionConcepts";
import { JobStories, ChannelOptions } from "./storyBlocks";

const CUSTOM_BLOCKS = {
  "card-sort": PostItScramble,
  "solution-concepts": SolutionConcepts,
  "image-carousel": ImageCarousel,
  "job-stories": JobStories,
  "channel-options": ChannelOptions,
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
