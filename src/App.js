import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ProjectPage from "./projects/ProjectPage";
import Hbh3Page from "./projects/hbh3/Hbh3Page";
import CriteriaPage from "./projects/criteria/CriteriaPage";
import FikaPage from "./projects/fika/FikaPage";
import SquarePage from "./projects/square/SquarePage";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Static path is matched ahead of /projects/:slug by the router's
            specificity ranking, so the redesigned Honeybee page wins here while
            every other project keeps the original ProjectPage layout. */}
        <Route path="/projects/hbh-3" element={<Hbh3Page />} />
        {/* The Honeybee case study moved to hbh-3; keep the old path working for
            links already in the wild. */}
        <Route
          path="/projects/honeybee-health"
          element={<Navigate to="/projects/hbh-3" replace />}
        />
        <Route path="/projects/criteria" element={<CriteriaPage />} />
        <Route path="/projects/fika" element={<FikaPage />} />
        <Route path="/projects/square" element={<SquarePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
      <Analytics />
    </Router>
  );
}
