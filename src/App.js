import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Analytics />
    </Router>
  );
}
