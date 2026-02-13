import { useEffect } from "react";
import "../App.css";
import AboutHero from "../sections/AboutHero";
import AboutOverview from "../sections/AboutOverview";
import TripleCards from "../sections/TripleCards";
import Expertise from "../sections/Expertise";
import Metrics from "../sections/Metrics";
import Leadership from "../sections/Leadership";
import Footer from "../sections/Footer";
import { updateMetaTags, injectStructuredData } from "../utils/seo";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  // Initialize SEO tags on mount
  useEffect(() => {
    updateMetaTags();
    injectStructuredData();

    // Refresh ScrollTrigger after layout settles
    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };

    setTimeout(refreshTriggers, 100);
    window.addEventListener("load", refreshTriggers);
    window.addEventListener("resize", refreshTriggers);

    return () => {
      window.removeEventListener("load", refreshTriggers);
      window.removeEventListener("resize", refreshTriggers);
    };
  }, []);

  return (
    <div className="page">
      <AboutHero />
      <AboutOverview />
      <TripleCards />
      <Expertise />
      <Metrics />
      <Leadership />
      <Footer />
    </div>
  );
}
