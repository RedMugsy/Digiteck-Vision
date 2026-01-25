import "./App.css";
import HeroVideo from "./sections/HeroVideo";
import HoverColumns from "./sections/HoverColumns";
import CoverSolid from "./sections/CoverSolid";
import CoverImage from "./sections/CoverImage";
import HoverTable from "./sections/HoverTable";
import ImageSwap from "./sections/ImageSwap";
import ProductFlip from "./sections/ProductFlip";
import TripleCards from "./sections/TripleCards";
import MediaLink from "./sections/MediaLink";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="page">
      <HeroVideo />
      <CoverSolid />
      <HoverColumns />
      <ProductFlip />
      <CoverImage />
      <HoverTable />
      <ImageSwap />
      <TripleCards />
      <MediaLink />
      <Footer />
    </div>
  );
}
