import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function CoverSolid() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    // Roll up from below to cover Hero at 65% of Hero's pinned duration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top bottom",
        end: "top top",
        scrub: 0.8, // Smooth scrubbing with 0.8s lag
      },
    });

    tl.fromTo(
      content.current!,
      { yPercent: 100 },
      { yPercent: 0, ease: "power2.inOut" }
    );

    // Pin for exactly one viewport scroll
    ScrollTrigger.create({
      trigger: root.current!,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
    });
  });

  return (
    <section ref={root} className="panel">
      <div
        ref={content}
        id="coverSolid-container"
        style={{
          position: "absolute",
          inset: 0,
          background: "#000",
          display: "flex",
        }}
      >
        {/* Section Title - top left */}
        <h2
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            fontSize: "2.9rem",
            margin: 0,
            color: "#FFAD01",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            zIndex: 10,
          }}
        >
          {siteContent.coverSolid.sectionTitle}
        </h2>

        {/* Left side - Image (50%) */}
        <div id="coverSolid-image-section" style={{ width: "50%", position: "relative", overflow: "hidden" }}>
          <img
            src={siteContent.coverSolid.image}
            alt="Cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(0.93)",
            }}
          />
        </div>

        {/* Right side - Content (50%) */}
        <div id="coverSolid-content-section" style={{ width: "50%", position: "relative", padding: "2rem" }}>
          {/* Content title and body - centered vertically and horizontally */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "calc(100% - 4rem)",
              maxWidth: "500px",
              textAlign: "right",
            }}
          >
            <h3 style={{ fontSize: "3rem", margin: 0, color: "#fff", fontWeight: 600, letterSpacing: "-0.02em", textAlign: "right" }}>
              {siteContent.coverSolid.title}
            </h3>
            <p style={{ marginTop: "1.5rem", opacity: 0.8, fontSize: "1.5rem", lineHeight: 1.6, textAlign: "right" }}>
              {siteContent.coverSolid.content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
