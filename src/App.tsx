import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import JobDetails from "./pages/JobDetails";
import AdminWrapper from "./pages/AdminWrapper";
import BookAppointment from "./pages/BookAppointment";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BiometricAddendum from "./pages/BiometricAddendum";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import CookieConsent from "./components/CookieConsent";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/job-details/:jobId" element={<JobDetails />} />
        <Route path="/admin" element={<AdminWrapper />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/biometric-addendum" element={<BiometricAddendum />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
      <CookieConsent />
    </>
  );
}
