import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { useIsMobile } from "../hooks/useWindowSize";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function Metrics() {
  const root = useRef<HTMLDivElement>(null);
  const metric1 = useRef<HTMLDivElement>(null);
  const metric2 = useRef<HTMLDivElement>(null);
  const metric3 = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useScene(root, () => {
    const metrics = [metric1.current!, metric2.current!, metric3.current!];

    // Set initial state for all metrics - hidden but ready
    metrics.forEach((metric) => {
      gsap.set(metric, {
        scale: 1,
        opacity: 0,
        filter: "blur(0px)",
      });
    });

    if (isMobile) {
      // Mobile: Pin the section and animate metrics with proper timing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current!,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Metric 1: Appear, grow, dissolve
      tl.to(metrics[0], {
        opacity: 1,
        ease: "power2.out",
        duration: 0.2,
      })
      .to(metrics[0], {
        scale: 2,
        opacity: 1,
        ease: "power2.inOut",
        duration: 0.3,
      })
      .to(metrics[0], {
        scale: 3,
        opacity: 0,
        filter: "blur(8px)",
        ease: "power2.out",
        duration: 0.3,
      })
      // Metric 2: Appear, grow, dissolve
      .to(metrics[1], {
        opacity: 1,
        ease: "power2.out",
        duration: 0.2,
      })
      .to(metrics[1], {
        scale: 2,
        opacity: 1,
        ease: "power2.inOut",
        duration: 0.3,
      })
      .to(metrics[1], {
        scale: 3,
        opacity: 0,
        filter: "blur(8px)",
        ease: "power2.out",
        duration: 0.3,
      })
      // Metric 3: Appear, stay visible
      .to(metrics[2], {
        opacity: 1,
        ease: "power2.out",
        duration: 0.2,
      })
      .to(metrics[2], {
        scale: 1.1,
        opacity: 1,
        ease: "power2.out",
        duration: 0.3,
      })
      // Hold third metric visible before transitioning
      .to(metrics[2], {
        scale: 1.1,
        opacity: 1,
        duration: 0.2,
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

  return (
    <section 
      ref={root} 
      className="panel metrics-section" 
      style={{ 
        background: "#000",
        height: "100vh",
        minHeight: "100vh",
        position: "relative"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          padding: isMobile ? "2rem 1rem" : "4rem",
          minHeight: "100vh",
          height: "100vh",
        }}
      >
        {/* All metrics in same position using absolute positioning within flex container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "0",
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
