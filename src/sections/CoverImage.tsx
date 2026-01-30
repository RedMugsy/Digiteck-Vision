import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function CoverImage() {
  const root = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Image 1 elements
  const img1Container = useRef<HTMLDivElement>(null);
  const img1Left = useRef<HTMLDivElement>(null);
  const img1Right = useRef<HTMLDivElement>(null);
  const text1 = useRef<HTMLDivElement>(null);

  // Image 2 elements
  const img2Container = useRef<HTMLDivElement>(null);
  const img2Top = useRef<HTMLDivElement>(null);
  const img2Bottom = useRef<HTMLDivElement>(null);
  const text2 = useRef<HTMLDivElement>(null);

  // Image 3 elements
  const img3Container = useRef<HTMLDivElement>(null);
  const img3Left = useRef<HTMLDivElement>(null);
  const img3Right = useRef<HTMLDivElement>(null);
  const text3 = useRef<HTMLDivElement>(null);

  // Final solid
  const finalSolid = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    // Set content in position immediately - no slide animation
    gsap.set(wrapper.current!, { yPercent: 0 });

    // Main pinned timeline for internal scenes (350% scroll length)
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top top",
        end: "+=350%",
        pin: true,
        pinSpacing: true,
        scrub: 0.8, // Smooth scrubbing with 0.8s lag
      },
    });

    // Scene A: Image 1 visible at start
    // At 25% progress: split vertically - slides complete off at 1.25
    mainTl
      // Fade out text1 before images start animating
      .to(text1.current!, {
        opacity: 0,
        duration: 0.3,
      }, 0.25)
      // Scene B: Image 2 appears instantly when img1 split starts
      .to(img2Container.current!, {
        opacity: 1,
        duration: 0.01,
      }, 0.25)
      .to(img1Left.current!, {
        xPercent: -120,
        duration: 1,
      }, 0.25)
      .to(img1Right.current!, {
        xPercent: 120,
        duration: 1,
      }, 0.25)
      // Scene C: Image 3 appears instantly when img2 split starts (at 110% of img1)
      // Fade out text2 before images start animating
      .to(text2.current!, {
        opacity: 0,
        duration: 0.3,
      }, 1.1667)
      .to(img3Container.current!, {
        opacity: 1,
        duration: 0.01,
      }, 1.1667)
      .to(img2Top.current!, {
        yPercent: -120,
        duration: 1,
      }, 1.1667)
      .to(img2Bottom.current!, {
        yPercent: 120,
        duration: 1,
      }, 1.1667)
      .to(img2Bottom.current!, {
        opacity: 0,
        duration: 0.3,
      }, 2.0667)
      // Scene D: Final solid appears instantly when img3 split starts (at 110% of img2)
      // Fade out text3 before images start animating
      .to(text3.current!, {
        opacity: 0,
        duration: 0.3,
      }, 2.0834)
      .to(finalSolid.current!, {
        opacity: 1,
        duration: 0.01,
      }, 2.0834)
      .to(img3Left.current!, {
        xPercent: -120,
        duration: 1,
      }, 2.0834)
      .to(img3Right.current!, {
        xPercent: 120,
        duration: 1,
      }, 2.0834);
  });

  return (
    <section ref={root} className="panel" id="coverImage-section">
      <div ref={wrapper} className="coverImage-wrapper" style={{ position: "absolute", inset: 0 }}>
        {/* Section Title - top left */}
        <h2
          className="coverImage-title"
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
          }}
        >
          {siteContent.coverImage.sectionTitle}
        </h2>

        {/* Scene A: Image 1 with vertical split */}
        <div ref={img1Container} className="coverImage-scene" style={{ position: "absolute", inset: 0, zIndex: 3 }}>
          <div
            ref={img1Left}
            className="coverImage-split-left"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "50%",
              height: "100%",
              backgroundImage: "url(/Media/Images/split-v1-left.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "right center",
            }}
          />
          <div
            ref={img1Right}
            className="coverImage-split-right"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "50%",
              height: "100%",
              backgroundImage: "url(/Media/Images/split-v1-right.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "left center",
            }}
          />
          <div
            ref={text1}
            style={{
              position: "absolute",
              left: "50%",
              top: "15%",
              transform: "translateX(-50%)",
              maxWidth: "400px",
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(10px)",
              padding: "2rem",
              borderRadius: "8px",
              color: "black",
            }}
          >
            <h3>Data-Driven Insights</h3>
            <p>Real-time market analysis powered by AI.</p>
          </div>
        </div>

        {/* Scene B: Image 2 with horizontal split */}
        <div
          ref={img2Container}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            zIndex: 2,
          }}
        >
          <div
            ref={img2Top}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "50%",
              backgroundImage: "url(/Media/Images/split-h-top.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            ref={img2Bottom}
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              height: "50%",
              backgroundImage: "url(/Media/Images/split-h-bottom.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            ref={text2}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              padding: "2rem",
              borderRadius: "8px",
            }}
          >
            <h3>Strategic Intelligence</h3>
            <p>Transform data into actionable decisions.</p>
          </div>
        </div>

        {/* Scene C: Image 3 with vertical split */}
        <div
          ref={img3Container}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            zIndex: 1,
          }}
        >
          <div
            ref={img3Left}
            className="coverImage-split-left"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "50%",
              height: "100%",
              backgroundImage: "url(/Media/Images/split-v2-left.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "right center",
            }}
          />
          <div
            ref={img3Right}
            className="coverImage-split-right"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "50%",
              height: "100%",
              backgroundImage: "url(/Media/Images/split-v2-right.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "left center",
            }}
          />
          <div
            ref={text3}
            style={{
              position: "absolute",
              right: "5%",
              top: "50%",
              transform: "translateY(-50%)",
              maxWidth: "400px",
              background: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(10px)",
              padding: "2rem",
              borderRadius: "8px",
              color: "black",
            }}
          >
            <h3>Precision Analytics</h3>
            <p>Every insight backed by rigorous analysis.</p>
          </div>
        </div>

        {/* Scene D: Final solid */}
        <div
          ref={finalSolid}
          style={{
            position: "absolute",
            inset: 0,
            background: "#1a1a1f",
            opacity: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 0,
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "800px", padding: "2rem" }}>
            <h2>The Future of Investment Intelligence</h2>
            <p style={{ marginTop: "1rem", opacity: 0.8 }}>
              Combining cutting-edge AI with deep market expertise to deliver
              unprecedented insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
