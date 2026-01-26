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
    // Roll up from below
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top bottom",
        end: "top top",
        scrub: 0.8, // Smooth scrubbing with 0.8s lag
      },
    });

    tl.fromTo(
      content.current!,
      { yPercent: 100 },
      { yPercent: 0, ease: "power2.inOut" }
    );

    // Pin for exactly one viewport scroll
    ScrollTrigger.create({
      trigger: root.current!,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
    });

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
    <section ref={root} className="panel">
      <div
        ref={content}
        className="hoverColumns-content"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        {/* Columns - fill remaining space above the stats row */}
        <div
          id="hoverColumns-container"
          className="hoverColumns-container"
          style={{
            flex: 1,
            display: "flex",
            gap: 0,
            minHeight: 0,
          }}
        >
          {siteContent.hoverColumns.columns.map((column, index) => {
            const bg = hexToRgba(columnColors[index], 0.85);
            const textColor = isLight(columnColors[index]) ? "#000000" : "#ffffff";
            return (
              <div
                key={index}
                className="hoverColumns-column"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  flex: 1,
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
                    justifyContent: "center",
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
                      textAlign: "center",
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

        {/* Row - fixed 25.5% height aligned to bottom */}
        <div
          className="hoverColumns-stats-row"
          style={{
            height: "25.5%",
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
    </section>
  );
}
