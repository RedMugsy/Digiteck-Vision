import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import JobDetails from "./pages/JobDetails";
import AdminWrapper from "./pages/AdminWrapper";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/job-details/:jobId" element={<JobDetails />} />
      <Route path="/admin" element={<AdminWrapper />} />
    </Routes>
  );
}
