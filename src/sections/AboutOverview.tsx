import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function AboutOverview() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    // Set content in position immediately - no slide animation
    gsap.set(content.current!, { yPercent: 0 });
  });

    const isMobile = window.innerWidth <= 768;

    return (
    <section ref={root} className="panel coverSolid-section">
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('/Media/Images/about us overview.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: window.innerWidth <= 768 ? "70% center" : "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />

      {/* Dark overlay for better text readability - gradient from left (opaque) to right (transparent) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.3) 100%)",
          zIndex: 2,
        }}
      />

      {/* Section Title - top left */}
      <h2
        className="section-title"
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          fontSize: "2.9rem",
          margin: 0,
          color: "#FFAD01",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          zIndex: 100,
          textAlign: "left",
        }}
      >
        {siteContent.aboutOverview.sectionTitle}
      </h2>

      <div
        ref={content}
        id="aboutOverview-container"
        className="coverSolid-container"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: isMobile ? "flex-start" : "center",
          alignItems: "flex-start",
          padding: isMobile ? "1rem" : "4rem",
          paddingTop: isMobile ? "6rem" : "7rem",
          paddingBottom: "4rem",
          paddingRight: isMobile ? "1rem" : "4rem",
          zIndex: 3,
          overflow: "hidden",
        }}
      >
        {/* Content - Left aligned, contained within section */}
        <div
          className="coverSolid-text-container"
          style={{
            position: "relative",
            zIndex: 5,
            maxWidth: window.innerWidth <= 768 ? "95vw" : "calc(50vw - 4rem)",
            marginLeft: "0",
            transform: "none",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <p 
            style={{ 
              margin: 0,
              opacity: 0.8, 
              fontSize: window.innerWidth <= 768 ? "clamp(1rem, 1.8vw, 1.53rem)" : "min(1.53rem, 1.8vw, 2.5vh)", 
              lineHeight: 1.6, 
              textAlign: "left",
              color: "#fff",
              whiteSpace: "pre-line",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {siteContent.aboutOverview.content}
          </p>
        </div>
      </div>
    </section>
  );
}
