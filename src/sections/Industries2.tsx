import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function Industries2() {
  const root = useRef<HTMLDivElement>(null);
  const centerOctagon = useRef<HTMLDivElement>(null);
  const centerOverlay = useRef<HTMLDivElement>(null);
  const octagon1 = useRef<HTMLDivElement>(null);
  const octagon2 = useRef<HTMLDivElement>(null);
  const octagon3 = useRef<HTMLDivElement>(null);
  const octagon4 = useRef<HTMLDivElement>(null);
  const octagon5 = useRef<HTMLDivElement>(null);
  const octagon6 = useRef<HTMLDivElement>(null);
  const octagon7 = useRef<HTMLDivElement>(null);
  const octagon8 = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Octagon clip-path
  const octagonPath = "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

  useScene(root, () => {
    if (isMobile) return; // Skip animation on mobile

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top bottom",
        end: "center center",
        scrub: 1,
      },
    });

    const surroundingOctagons = [
      octagon1.current,
      octagon2.current,
      octagon3.current,
      octagon4.current,
      octagon5.current,
      octagon6.current,
      octagon7.current,
      octagon8.current,
    ];

    // Initial state: all 8 octagons stacked behind center (visible, same position)
    gsap.set(surroundingOctagons, { x: 0, y: 0, opacity: 1 });

    // Animation: octagons slide out in 8 directions
    const radius = 300; // Distance from center
    const angles = [0, 45, 90, 135, 180, 225, 270, 315]; // 8 directions

    surroundingOctagons.forEach((octagon, index) => {
      const angle = (angles[index] * Math.PI) / 180;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      tl.to(
        octagon,
        {
          x,
          y,
          duration: 1,
          ease: "power2.out",
        },
        0
      );
    });
  });

  const industries = siteContent.hoverTable.rows.slice(0, 8);

  // Mobile view - same as HoverTable
  if (isMobile) {
    return (
      <section
        ref={root}
        className="panel industries2-section"
        style={{
          background: "#000000",
          minHeight: "100vh",
          height: "auto",
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: "100vh",
            background: "#000000",
            padding: "4rem 1.5rem",
            paddingTop: "8rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Section Title */}
          <h2
            className="section-title"
            style={{
              position: "absolute",
              top: "2rem",
              left: "1.5rem",
              fontSize: "2rem",
              margin: 0,
              color: "#FFAD01",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              zIndex: 100,
              textAlign: "left",
            }}
          >
            {siteContent.hoverTable.sectionTitle}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {industries.map((row, index) => (
              <div
                key={row.n}
                style={{
                  padding: "1.5rem",
                  background: index % 2 === 0 ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.06)",
                  borderRadius: "8px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ fontSize: "1.5rem", color: "#FFAD01" }}>{row.n}</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>{row.title}</div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      backgroundImage: `url(${row.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "4px",
                    }}
                  />
                  <p style={{ opacity: 0.8, lineHeight: 1.6, margin: 0, fontSize: "0.95rem" }}>
                    {row.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop view - Octagon animation
  return (
    <section
      ref={root}
      className="panel industries2-section"
      style={{
        background: "#000000",
        position: "relative",
        overflow: "visible",
        minHeight: "150vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        {siteContent.hoverTable.sectionTitle}
      </h2>

      {/* Container for octagons - Desktop only */}
      <div
        style={{
          position: "relative",
          width: "900px",
          height: "900px",
          overflow: "visible",
        }}
      >
        {/* Center Octagon */}
        <div
          ref={centerOctagon}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "300px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/whatwedobg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}
        >
          {/* Black overlay with 70% opacity (will animate to 100%) */}
          <div
            ref={centerOverlay}
            style={{
              position: "absolute",
              inset: 0,
              background: "#000000",
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                color: "#FFAD01",
                fontSize: "2rem",
                fontWeight: 600,
                textAlign: "center",
                margin: 0,
                padding: "1rem",
              }}
            >
              Industries
            </h3>
          </div>
        </div>

        {/* Surrounding 8 Octagons */}
        <div
          ref={octagon1}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-3.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 5,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
            <p style={{ color: "#FFFFFF", fontSize: "0.9rem", fontWeight: 600, textAlign: "center", margin: 0 }}>
              {industries[0]?.title || "Industry 1"}
            </p>
          </div>
        </div>

        <div
          ref={octagon2}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-2.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 5,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
            <p style={{ color: "#FFFFFF", fontSize: "0.9rem", fontWeight: 600, textAlign: "center", margin: 0 }}>
              {industries[1]?.title || "Industry 2"}
            </p>
          </div>
        </div>

        <div
          ref={octagon3}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 5,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
            <p style={{ color: "#FFFFFF", fontSize: "0.9rem", fontWeight: 600, textAlign: "center", margin: 0 }}>
              {industries[2]?.title || "Industry 3"}
            </p>
          </div>
        </div>

        <div
          ref={octagon4}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-8.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 5,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
            <p style={{ color: "#FFFFFF", fontSize: "0.9rem", fontWeight: 600, textAlign: "center", margin: 0 }}>
              {industries[3]?.title || "Industry 4"}
            </p>
          </div>
        </div>

        <div
          ref={octagon5}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-7.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 5,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
            <p style={{ color: "#FFFFFF", fontSize: "0.9rem", fontWeight: 600, textAlign: "center", margin: 0 }}>
              {industries[4]?.title || "Industry 5"}
            </p>
          </div>
        </div>

        <div
          ref={octagon6}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-6.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 5,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
            <p style={{ color: "#FFFFFF", fontSize: "0.9rem", fontWeight: 600, textAlign: "center", margin: 0 }}>
              {industries[5]?.title || "Industry 6"}
            </p>
          </div>
        </div>

        <div
          ref={octagon7}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-5.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 5,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
            <p style={{ color: "#FFFFFF", fontSize: "0.9rem", fontWeight: 600, textAlign: "center", margin: 0 }}>
              {industries[6]?.title || "Industry 7"}
            </p>
          </div>
        </div>

        <div
          ref={octagon8}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-4.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 5,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
            <p style={{ color: "#FFFFFF", fontSize: "0.9rem", fontWeight: 600, textAlign: "center", margin: 0 }}>
              {industries[7]?.title || "Industry 8"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
