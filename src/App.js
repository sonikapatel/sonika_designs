import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Analytics } from "@vercel/analytics/next"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/h" element={<ApplyFirst />} /> */}
        <Route path="/" element={< Home/>} />
      <Analytics/>
      </Routes>
    </Router>
  );
}