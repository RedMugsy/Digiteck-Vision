import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function MediaLink() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const isMobile = window.innerWidth <= 768;

  useScene(root, () => {
    // Set content in position immediately - no slide animation
    gsap.set(content.current!, { yPercent: 0 });

    // Skip pinning on mobile — position:fixed breaks mobile rendering
    if (isMobile) return;

    ScrollTrigger.create({
      trigger: root.current!,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
    });
  });

  return (
    <section ref={root} className="panel mediaLink-section">
      {/* Mobile spacer: prevents section collapse when content is absolutely positioned */}
      <div style={{ height: "100vh", pointerEvents: "none" }} />
      <div
        ref={content}
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
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
          {siteContent.mediaLink.sectionTitle}
        </h2>

        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/Media/Video/media-link.mp4?v=2" type="video/mp4" />
        </video>

        <div
          style={{
            position: "absolute",
            top: "4rem",
            left: "4rem",
            zIndex: 1,
          }}
        >
          <h2 id="mediaLink-heading">{siteContent.mediaLink.heading}</h2>
          <a
            href={siteContent.mediaLink.ctaLink}
            style={{
              display: "inline-block",
              marginTop: "1rem",
              padding: "1rem 2rem",
              background: "#ffffff",
              color: "#000000",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
          >
            {siteContent.mediaLink.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
