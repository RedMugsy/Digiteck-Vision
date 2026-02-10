import { useEffect } from "react";
import "../App.css";
import ContactForm from "../sections/ContactForm";
import Footer from "../sections/Footer";
import { updateMetaTags, injectStructuredData } from "../utils/seo";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Contact() {
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
      <ContactForm />
      <Footer />
    </div>
  );
}
