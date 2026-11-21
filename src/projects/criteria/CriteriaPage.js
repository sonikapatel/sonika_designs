import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { CRITERIA, CRITERIA_NAV, CRITERIA_BLOCKS } from "./criteriaData";
import PostItScramble from "./postits";
import CareerHistory from "./careerHistory";
import CheckInFlow from "./checkInFlow";
import OnboardingFlow from "./onboardingFlow";
import Merchandising from "./merchandising";
import SolutionConcepts from "./solutionConcepts";
import SystemDiagram from "./systemDiagram";
import DataSources from "./dataSources";
import { JobStories, ChannelOptions, Reflections } from "./storyBlocks";

const CUSTOM_BLOCKS = {
  "card-sort": PostItScramble,
  "career-history": CareerHistory,
  "check-in-flow": CheckInFlow,
  "onboarding-flow": OnboardingFlow,
  "solution-concepts": SolutionConcepts,
  "job-stories": JobStories,
  "channel-options": ChannelOptions,
  reflections: Reflections,
  merchandising: Merchandising,
  "system-diagram": SystemDiagram,
  "data-sources": DataSources,
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
