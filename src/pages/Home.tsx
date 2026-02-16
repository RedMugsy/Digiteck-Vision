import { useEffect } from "react";
import "../App.css";
import HeroVideo from "../sections/HeroVideo";
import HoverColumns from "../sections/HoverColumns";
import CoverSolid from "../sections/CoverSolid";
import CoverImage from "../sections/CoverImage";
import ExpandingDonuts from "../sections/ExpandingDonuts";
import ImageSwap from "../sections/ImageSwap";
import ProductFlip from "../sections/ProductFlip";
import MediaLink from "../sections/MediaLink";
import Footer from "../sections/Footer";
import BackToTop from "../components/BackToTop";
import { updateMetaTags, injectStructuredData } from "../utils/seo";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Home() {
  // Initialize SEO tags from content.ts on mount
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
      <HeroVideo />
      <CoverSolid />
      <HoverColumns />
      <ExpandingDonuts />
      <ProductFlip />
      <CoverImage />
      <ImageSwap />
      <MediaLink />
      <Footer />
      <BackToTop />
    </div>
  );
}
