import CaseStudyPage from "../caseStudy/CaseStudyPage";
import { FOOBAR, FOOBAR_NAV, FOOBAR_BLOCKS } from "./foobarData";
import "./foobar.css";

/* A short Playground showcase: overview, quick facts and stills, all on the shared
   case study blocks. The wrapper scopes the accessible type rules in foobar.css. */
export default function FoobarPage() {
  return (
    <div className="fb-page">
      <CaseStudyPage meta={FOOBAR} nav={FOOBAR_NAV} blocks={FOOBAR_BLOCKS} />
    </div>
  );
}
