import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function Metrics() {
  const root = useRef<HTMLDivElement>(null);
  const metric1 = useRef<HTMLDivElement>(null);
  const metric2 = useRef<HTMLDivElement>(null);
  const metric3 = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    const metrics = [metric1.current!, metric2.current!, metric3.current!];
    const isMobile = window.innerWidth <= 768;

    // Set initial state for all metrics - hidden but ready
    metrics.forEach((metric) => {
      gsap.set(metric, {
        scale: 1,
        opacity: 0,
        filter: "blur(0px)",
      });
    });

    if (isMobile) {
      // Mobile: Proper animation without pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current!,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
          // NO pinning on mobile to prevent overlay
        },
      });

      // Restore proper mobile animation with scaling and blur
      tl.to(metrics[0], {
        opacity: 1,
        ease: "power2.out",
        duration: 0.3,
      })
      .to(metrics[0], {
        scale: 2, // Grow effect
        opacity: 1,
        ease: "power2.inOut",
        duration: 0.5,
      }, "+=0.2")
      .to(metrics[0], {
        scale: 3, // Continue growing while dissolving
        opacity: 0,
        filter: "blur(8px)", // Blur dissolve effect
        ease: "power2.out",
        duration: 0.4,
      })
      .to(metrics[1], {
        opacity: 1,
        ease: "power2.out",
        duration: 0.3,
      }, "-=0.2")
      .to(metrics[1], {
        scale: 2,
        opacity: 1,
        ease: "power2.inOut",
        duration: 0.5,
      }, "+=0.2")
      .to(metrics[1], {
        scale: 3,
        opacity: 0,
        filter: "blur(8px)",
        ease: "power2.out",
        duration: 0.4,
      })
      .to(metrics[2], {
        opacity: 1,
        ease: "power2.out",
        duration: 0.3,
      }, "-=0.2")
      .to(metrics[2], {
        scale: 1.1, // Final metric stays with slight emphasis
        opacity: 1,
        ease: "power2.out",
        duration: 0.5,
      });
    } else {
      // Desktop: Full pinning animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current!,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Desktop animation: original behavior
      tl.to(metrics[0], {
        opacity: 1,
        ease: "power2.out",
        duration: 0.3,
      })
      .to(metrics[0], {
        scale: 4,
        opacity: 1,
        ease: "power2.inOut",
        duration: 1.0,
      }, "+=0.4")
      .to(metrics[0], {
        scale: 6,
        opacity: 0,
        filter: "blur(10px)",
        ease: "power2.out",
        duration: 0.6,
      })
      .to(metrics[1], {
        opacity: 1,
        ease: "power2.out",
        duration: 0.3,
      }, "-=0.3")
      .to(metrics[1], {
        scale: 4,
        opacity: 1,
        ease: "power2.inOut",
        duration: 1.0,
      }, "+=0.4")
      .to(metrics[1], {
        scale: 6,
        opacity: 0,
        filter: "blur(10px)",
        ease: "power2.out",
        duration: 0.6,
      })
      .to(metrics[2], {
        opacity: 1,
        ease: "power2.out",
        duration: 0.3,
      }, "-=0.3")
      .to(metrics[2], {
        scale: 1.1,
        opacity: 1,
        ease: "power2.out",
        duration: 1,
      });
    }
  });

  const isMobile = window.innerWidth <= 768;

  return (
    <section 
      ref={root} 
      className="panel metrics-section" 
      style={{ 
        background: "#000",
        height: isMobile ? "60vh" : "100vh", // Much shorter on mobile
        minHeight: isMobile ? "60vh" : "100vh",
        position: "relative"
      }}
    >
      <div
        style={{
          position: isMobile ? "relative" : "absolute",
          inset: isMobile ? undefined : 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          padding: isMobile ? "2rem 1rem" : "4rem",
          minHeight: isMobile ? "60vh" : "100vh",
          height: isMobile ? "60vh" : "100vh",
        }}
      >
        {/* Desktop: All metrics in same position using absolute positioning within flex container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "0" : "0", // Zero height for both to stack metrics in center
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        {siteContent.metrics.items.map((item, index) => {
          const metricRef = index === 0 ? metric1 : index === 1 ? metric2 : metric3;
          
          return (
            <div
              key={index}
              ref={metricRef}
              style={{
                willChange: "opacity, transform, filter",
                transformStyle: "preserve-3d",
                position: "absolute", // Use absolute positioning for both mobile and desktop
                transformOrigin: "center center",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    fontSize: isMobile ? "3rem" : "6rem", // Smaller on mobile
                    fontWeight: 700,
                    color: "#FFAD01",
                    margin: 0,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.text}
                </h2>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
