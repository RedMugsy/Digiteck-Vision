import { useEffect } from "react";
import "./App.css";
import HeroVideo from "./sections/HeroVideo";
import HoverColumns from "./sections/HoverColumns";
import CoverSolid from "./sections/CoverSolid";
import CoverImage from "./sections/CoverImage";
import ExpandingDonuts from "./sections/ExpandingDonuts";
import HoverTable from "./sections/HoverTable";
import ImageSwap from "./sections/ImageSwap";
import ProductFlip from "./sections/ProductFlip";
import TripleCards from "./sections/TripleCards";
import MediaLink from "./sections/MediaLink";
import Footer from "./sections/Footer";
import { updateMetaTags, injectStructuredData } from "./utils/seo";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function App() {
  // Initialize SEO tags from content.ts on mount
  useEffect(() => {
    updateMetaTags();
    injectStructuredData();

    // Refresh ScrollTrigger after layout settles (images loaded, dynamic heights calculated)
    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };

    // Refresh immediately
    setTimeout(refreshTriggers, 100);
    
    // Refresh after images load
    window.addEventListener("load", refreshTriggers);

    // Refresh on resize
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
      <ProductFlip />
      <CoverImage />
      <ExpandingDonuts />
      <HoverTable />
      <ImageSwap />
      <TripleCards />
      <MediaLink />
      <Footer />
    </div>
  );
}
