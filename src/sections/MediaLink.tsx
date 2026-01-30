import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function MediaLink() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    // Set content in position immediately - no slide animation
    gsap.set(content.current!, { yPercent: 0 });

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
        style={{
          position: "absolute",
          inset: 0,
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
            filter: "grayscale(100%)",
          }}
        >
          <source src="/Media/Video/media-link.mp4" type="video/mp4" />
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
