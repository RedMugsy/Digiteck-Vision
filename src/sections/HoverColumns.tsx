import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function HoverColumns() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useScene(root, () => {
    // Odometer animation for numbers in row - delayed to ensure elements exist
    setTimeout(() => {
      const numberElements = root.current?.querySelectorAll('.stat-number');
      if (numberElements) {
        numberElements.forEach((el, index) => {
          const stat = siteContent.hoverColumns.row.stats[index];
          if (stat && el) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.number,
              duration: 2.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: root.current!,
                start: "top center",
                toggleActions: "play none none none",
              },
              onUpdate: function () {
                el.textContent = Math.floor(obj.val).toString();
              },
            });
          }
        });
      }
    }, 100);
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
      className="panel" 
      style={{ 
        height: window.innerWidth <= 768 ? "auto" : "200vh", 
        minHeight: window.innerWidth <= 768 ? "100vh" : "auto",
        overflow: "visible" 
      }}
    >
      {/* Section Title - top left */}
      <h2
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          fontSize: window.innerWidth <= 768 ? "2rem" : "2.9rem",
          margin: 0,
          color: "#FFAD01",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          zIndex: 100,
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
          background: "#0b0b0f",
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
            background: "#0b0b0f",
            position: "relative",
            backgroundImage: `url(/Media/Images/Whatwedobg.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: window.innerWidth <= 768 ? "70% center" : "center",
            padding: "4rem 4rem 0 4rem",
          }}
        >
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
            style={{
              position: "relative",
              zIndex: 5,
              maxWidth: window.innerWidth <= 768 ? "75vw" : "50vw",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              transform: window.innerWidth <= 768 ? "translateY(-25%)" : "none",
            }}
          >
            {/* Title Container */}
            <div>
              <h3
                style={{
                  fontSize: "3rem",
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
                  fontSize: "1.275rem",
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

        {/* Section 3.2 - Current columns section (100vh) */}
        <div
          style={{
            height: window.innerWidth <= 768 ? "auto" : "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "#0b0b0f",
          }}
        >
        {/* Columns - fixed height */}
        <div
          id="hoverColumns-container"
          className="hoverColumns-container"
          style={{
            height: window.innerWidth <= 768 ? "auto" : "65vh",
            display: "flex",
            flexDirection: window.innerWidth <= 768 ? "column" : "row",
            gap: window.innerWidth <= 768 ? "1rem" : 0,
            position: "relative",
            background: "#000",
            padding: window.innerWidth <= 768 ? "2rem" : "0",
          }}
        >
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
                }}
              >
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
                    backgroundColor: "#000",
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
                    inset: 0,
                    backgroundColor: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    transition: "transform 0.5s ease",
                    transform: hoveredIndex === index ? "translateY(0)" : "translateY(100%)",
                    zIndex: 1,
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

        {/* Row - fixed height aligned to bottom */}
        <div
          className="hoverColumns-stats-row"
          style={{
            height: "20vh",
            background: "#FFAD01",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "2rem 4rem",
            gap: "2rem",
            boxSizing: "border-box",
          }}
        >
          {siteContent.hoverColumns.row.stats.map((stat, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="stat-number"
                style={{
                  fontSize: "4rem",
                  fontWeight: 700,
                  color: "#000000",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#000000",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}