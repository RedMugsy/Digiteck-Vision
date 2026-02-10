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

  const isMobile = window.innerWidth <= 768;

  useScene(root, () => {
    // Skip all animations and pinning on mobile — show metrics statically
    if (isMobile) return;

    // Pin the section during animation - longer duration for smoother scroll
    ScrollTrigger.create({
      trigger: root.current!,
      start: "top top",
      end: "+=400%",
      pin: true,
      pinSpacing: true,
    });

    const metrics = [metric1.current!, metric2.current!, metric3.current!];

    // Set initial state for all metrics
    metrics.forEach((metric) => {
      gsap.set(metric, {
        scale: 3,
        opacity: 0,
        filter: "blur(30px)",
      });
    });

    // Animate each metric sequentially with overlap
    metrics.forEach((metric, index) => {
      const startProgress = index * 25; // 0%, 25%, 50%
      const endProgress = startProgress + 50; // 50%, 75%, 100%

      gsap.to(metric, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current!,
          start: `top+=${startProgress}% top`,
          end: `top+=${endProgress}% top`,
          scrub: 2,
        },
      });
    });
  });

  return (
    <section ref={root} className="panel" style={{ background: "#000" }}>
      <div
        style={{
          position: isMobile ? "relative" : "absolute",
          inset: isMobile ? undefined : 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? "2rem" : "4rem",
          padding: isMobile ? "4rem 2rem" : "4rem",
          minHeight: isMobile ? "100vh" : undefined,
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
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    fontSize: "6rem",
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
    </section>
  );
}
