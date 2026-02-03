import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pay from "./Pay";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/verify" element={<Verify />} />
        <Route path="/h" element={<ApplyFirst />} />
        <Route path="/" element={< Home/>} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/apply/verify" element={<ApplyVerify />} />
        <Route path="/apply/pay" element={<Pay />} />
        <Route path="/pay/success" element={<PaySuccess />} />
      </Routes>
    </Router>
  );
}