import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

// rows are sourced from content.ts (siteContent.hoverTable.rows)

export default function HoverTable() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  useScene(root, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    tl.fromTo(
      content.current!,
      { yPercent: 100 },
      { yPercent: 0, ease: "none" }
    );

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
          background: "#0a0a0e",
          padding: "4rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
        className="hover-table-container"
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
          {siteContent.hoverTable.sectionTitle}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2>{siteContent.hoverTable.heading}</h2>
          <p style={{ marginTop: "1rem", opacity: 0.8 }}>
            {siteContent.hoverTable.subtitle}
          </p>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {siteContent.hoverTable.rows.map((row) => (
              <div
                key={row.n}
                onMouseEnter={() => setHoveredRow(row.n)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  padding: "1.5rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                }}
              >
                {/* Collapsed view */}
                <div
                  style={{
                    display: hoveredRow === row.n ? "none" : "flex",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  <div style={{ fontSize: "2.25rem", color: "#FFAD01" }}>{row.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "1.25rem", fontWeight: 500 }}>{row.title}</div>
                  </div>
                </div>

                {/* Expanded view */}
                <div
                  style={{
                    display: hoveredRow === row.n ? "flex" : "none",
                    gap: "2rem",
                  }}
                >
                  {/* Left: Description (70%) */}
                  <div style={{ flex: "0 0 70%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ fontSize: "2.25rem", color: "#FFAD01" }}>{row.n}</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 500 }}>{row.title}</div>
                    </div>
                    <p style={{ opacity: 0.8, lineHeight: 1.6 }}>{row.description}</p>
                  </div>

                  {/* Right: Image (30%) */}
                  <div style={{ flex: "0 0 30%" }}>
                    <div
                      style={{
                        width: "100%",
                        height: "120px",
                        backgroundImage: `url(${row.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
