import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

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
        scrub: 0.8,
      },
    });

    tl.fromTo(
      content.current!,
      { yPercent: 100 },
      { yPercent: 0, ease: "power2.inOut" }
    );
  });

  return (
    <section ref={root} className="panel" style={{ height: "auto", minHeight: "100vh" }}>
      <div
        ref={content}
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#0a0a0e",
          padding: "4rem",
          paddingTop: "8rem",
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
            zIndex: 100,
          }}
        >
          {siteContent.hoverTable.sectionTitle}
        </h2>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className="hover-table-rows">
            {siteContent.hoverTable.rows.map((row) => {
              const isHovered = hoveredRow === row.n;
              const imageHeight = 300; // Base image height for expanded state
              
              return (
                <div
                  key={row.n}
                  onMouseEnter={() => setHoveredRow(row.n)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    padding: "1.5rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                    overflow: "hidden",
                    height: isHovered ? `${imageHeight + 48}px` : "auto",
                  }}
                  className="hover-table-row"
                >
                  {/* Desktop view */}
                  <div className="desktop-view">
                    {!isHovered ? (
                      // Collapsed view - Serial, Title, and Thumbnail (increased by 15%)
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2rem",
                        }}
                      >
                        <div style={{ fontSize: "2.25rem", color: "#FFAD01", minWidth: "60px" }}>
                          {row.n}
                        </div>
                        <div style={{ flex: 1, fontSize: "1.25rem", fontWeight: 500 }}>
                          {row.title}
                        </div>
                        <div
                          style={{
                            width: "152px",
                            height: "114px",
                            backgroundImage: `url(${row.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "4px",
                            flexShrink: 0,
                          }}
                        />
                      </div>
                    ) : (
                      // Expanded view - Image grows 90% leftward from fixed right position
                      <div
                        style={{
                          display: "flex",
                          gap: "2rem",
                          height: "100%",
                          alignItems: "stretch",
                        }}
                      >
                        {/* Left: Serial, Title, Description, Tags */}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ fontSize: "2.25rem", color: "#FFAD01" }}>{row.n}</div>
                            <div style={{ fontSize: "1.25rem", fontWeight: 500 }}>{row.title}</div>
                          </div>
                          <p style={{ opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
                            {row.description}
                          </p>
                          {row.tags && (
                            <div 
                              style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                              itemScope
                              itemType="https://schema.org/keywords"
                            >
                              {row.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  itemProp="keyword"
                                  style={{
                                    padding: "0.25rem 0.75rem",
                                    background: "rgba(255, 173, 1, 0.1)",
                                    color: "#FFAD01",
                                    borderRadius: "4px",
                                    fontSize: "0.85rem",
                                    border: "1px solid rgba(255, 173, 1, 0.3)",
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Right: Image at 90% of original size, expanding leftward */}
                        <div
                          style={{
                            width: "0%",
                            flexShrink: 0,
                            animation: isHovered ? "expandImage 0.4s ease forwards" : "none",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              right: 0,
                              top: 0,
                              width: "400px",
                              height: `${imageHeight}px`,
                              backgroundImage: `url(${row.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              borderRadius: "8px",
                              opacity: isHovered ? 1 : 0,
                              transition: "opacity 0.4s ease",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile view - Stacked layout */}
                  <div className="mobile-view">
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {/* Image */}
                      <div
                        style={{
                          width: "100%",
                          height: "200px",
                          backgroundImage: `url(${row.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "8px",
                        }}
                      />
                      
                      {/* S.N. and Title */}
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ fontSize: "1.5rem", color: "#FFAD01", fontWeight: 600 }}>
                          {row.n}
                        </div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                          {row.title}
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{ opacity: 0.8, lineHeight: 1.6, margin: 0, fontSize: "0.9rem" }}>
                        {row.description}
                      </p>

                      {/* Tags - aligned right, max 3 per row */}
                      {row.tags && (
                        <div 
                          style={{ 
                            display: "flex", 
                            gap: "0.5rem", 
                            flexWrap: "wrap",
                            justifyContent: "flex-end"
                          }}
                          itemScope
                          itemType="https://schema.org/keywords"
                        >
                          {row.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              itemProp="keyword"
                              style={{
                                padding: "0.25rem 0.5rem",
                                background: "rgba(255, 173, 1, 0.1)",
                                color: "#FFAD01",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                border: "1px solid rgba(255, 173, 1, 0.3)",
                                flexBasis: "calc(33.333% - 0.5rem)",
                                textAlign: "center",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <style>{`
          @keyframes expandImage {
            from {
              width: 0%;
            }
            to {
              width: 400px;
            }
          }

          /* Desktop view - default */
          .mobile-view {
            display: none;
          }
          
          .desktop-view {
            display: block;
          }

          /* Mobile view - tablets and below */
          @media (max-width: 768px) {
            .mobile-view {
              display: block;
            }
            
            .desktop-view {
              display: none;
            }

            .hover-table-row {
              cursor: default !important;
              height: auto !important;
            }

            .hover-table-container {
              padding: 2rem 1rem !important;
            }

            .hover-table-container h2 {
              font-size: 2rem !important;
              top: 1rem !important;
              left: 1rem !important;
            }

            .hover-table-rows {
              margin-top: 3rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
