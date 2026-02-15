import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function HoverColumns() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const ticker = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useScene(root, () => {
    // Ticker animation - scroll from right to left continuously
    if (ticker.current) {
      gsap.to(ticker.current, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }
  });

  const columnColors = ["#FFF4DD", "#FFDE99", "#FFAD01", "#C08200"];
  // helper to convert hex to rgba string (keeps text opaque while background is translucent)
  const hexToRgba = (hex: string, alpha = 0.85) => {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // simple luminance check to pick black or white text for contrast
  const isLight = (hex: string) => {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    // Perceived brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150;
  };

  return (
    <section
      ref={root}
      className="panel hoverColumns-section"
      style={{
        height: "auto",
        minHeight: "100vh",
        overflow: "visible"
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
        {siteContent.hoverColumns.sectionTitle}
      </h2>

      <div
        ref={content}
        className="hoverColumns-content"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#000000",
          minHeight: "100%",
        }}
      >
        {/* Section 3.1 - Upper new content (100vh) */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            padding: window.innerWidth <= 768 ? "1rem" : "4rem 4rem 0 4rem",
            overflow: "hidden",
          }}
        >
          {/* Background Image Layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(/Media/Images/whatwedobg.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: window.innerWidth <= 768 ? "70% center" : "center",
              zIndex: 0,
            }}
          />
          {/* Dark overlay for better text readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 0,
            }}
          />
          
          {/* Right-aligned content container */}
          <div
            className="hoverColumns-section31-content"
            style={{
              position: "relative",
              zIndex: 5,
              maxWidth: window.innerWidth <= 768 ? "95vw" : "50vw",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* Title Container */}
            <div>
              <h3
                style={{
                  fontSize: "2.21rem",
                  margin: 0,
                  color: "#fff",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  textAlign: "left",
                }}
              >
                {siteContent.hoverColumns.section31?.title || ""}
              </h3>
            </div>

            {/* Body Text Container */}
            <div>
              <p
                style={{
                  margin: 0,
                  opacity: 0.8,
                  fontSize: "1.53rem",
                  lineHeight: 1.6,
                  textAlign: "left",
                  color: "#fff",
                  whiteSpace: "pre-line",
                }}
              >
                {siteContent.hoverColumns.section31?.body || ""}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3.2 - Current columns section */}
        <div
          className="hoverColumns-section32"
          style={{
            height: "auto",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "transparent",
            marginTop: "-30vh",
          }}
        >
        {/* Columns - all visible on mobile, no internal scrolling */}
        <div
          id="hoverColumns-container"
          className="hoverColumns-container"
          style={{
            flex: 1,
            minHeight: "65vh",
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            position: "relative",
            background: "transparent",
            padding: 0,
          }}
        >
          {/* Background layer behind columns */}
          <div
            style={{
              position: "absolute",
              top: "25%",
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.65)",
              zIndex: 0,
            }}
          />
        
          {siteContent.hoverColumns.columns.map((column, index) => {
            const bg = hexToRgba(columnColors[index], 0.85);
            const textColor = isLight(columnColors[index]) ? "#000000" : "#ffffff";
            const isMobile = window.innerWidth <= 768;
            const isExpanded = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className="hoverColumns-column"
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                onClick={() => {
                  if (isMobile) {
                    setHoveredIndex(isExpanded ? null : index);
                  }
                }}
                style={{
                  flex: isMobile ? "none" : 1,
                  minHeight: isMobile ? "40vh" : "auto",
                  width: isMobile ? "100%" : "auto",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  zIndex: 1,
                }}
              >
                {/* Black background layer (cropped from top 25%) */}
                <div
                  style={{
                    position: "absolute",
                    top: "25%",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#000",
                    zIndex: 0,
                  }}
                />

                {/* Background Image (show full image without cropping) */}
                <img
                  src={column.image}
                  alt={column.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    zIndex: 1,
                  }}
                />

                {/* Title - centered initially, slides completely off on hover */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "2rem",
                    transition: "transform 0.5s ease",
                    transform: hoveredIndex === index ? "translateY(-150%)" : "translateY(0)",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                >
                  <h2
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      textAlign: "right",
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                  >
                    {column.title}
                  </h2>
                </div>

                {/* Description Container - covers entire column on hover */}
                <div
                  style={{
                    position: "absolute",
                    top: "25%",
                    left: 0,
                    right: 0,
                    bottom: "20vh",
                    backgroundColor: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    transition: "transform 0.5s ease",
                    transform: hoveredIndex === index ? "translateY(0)" : "translateY(calc(100% + 30vh))",
                    zIndex: 3,
                  }}
                >
                  <p
                    style={{
                      color: textColor,
                      fontSize: "1.1rem",
                      lineHeight: 1.6,
                      margin: 0,
                      textAlign: "left",
                      opacity: hoveredIndex === index ? 1 : 0,
                      transition: "opacity 0.3s ease 0.2s",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {column.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row - Ticker */}
        <div
          className="hoverColumns-ticker-row"
          style={{
            height: "20vh",
            background: "#000000",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            padding: "2rem 0",
            marginTop: "-20vh",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div 
            ref={ticker}
            style={{ 
              whiteSpace: "nowrap", 
              fontSize: "3.6rem", 
              fontWeight: 400,
              color: "#FFFFFF",
              display: "inline-block",
              lineHeight: 1.2,
            }}
          >
            {(siteContent.hoverColumns.row.ticker || "SOLUTIONS • INTEGRATOR • ADVISORY • GATEWAY • ").repeat(3)}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}