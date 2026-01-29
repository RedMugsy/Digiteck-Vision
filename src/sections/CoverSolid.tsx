import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function CoverSolid() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    // Roll up from below to cover Hero at 65% of Hero's pinned duration
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

    // Odometer animation for numbers in row
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

  return (
    <section ref={root} className="panel">
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
        {siteContent.coverSolid.sectionTitle}
      </h2>

      <div
        ref={content}
        id="coverSolid-container"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${siteContent.coverSolid.image})`,
          backgroundSize: window.innerWidth <= 768 ? "216%" : "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: window.innerWidth <= 768 ? "flex-start" : "center",
          padding: "4rem",
          paddingTop: window.innerWidth <= 768 ? "6.5rem" : "4rem",
          zIndex: 1,
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

        {/* Content - Left aligned */}
        <div
          className="coverSolid-text-container"
          style={{
            position: "relative",
            zIndex: 5,
            maxWidth: "600px",
            marginLeft: "0",
            marginTop: window.innerWidth <= 768 ? "8vh" : "-15vh",
          }}
        >
          <h3 
            style={{ 
              fontSize: "3rem", 
              margin: 0, 
              color: "#fff", 
              fontWeight: 600, 
              letterSpacing: "-0.02em", 
              textAlign: "left" 
            }}
          >
            {siteContent.coverSolid.title}
          </h3>
          <p 
            style={{ 
              marginTop: "1.5rem", 
              opacity: 0.8, 
              fontSize: "1.5rem", 
              lineHeight: 1.6, 
              textAlign: "left",
              color: "#fff",
            }}
          >
            {siteContent.coverSolid.content}
          </p>
        </div>

        {/* Stats Row - In document flow like Section 3 */}
        <div
          className="coverSolid-stats-row"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "20vh",
            background: "#FFAD01",
            display: window.innerWidth <= 768 ? "grid" : "flex",
            gridTemplateColumns: window.innerWidth <= 768 ? "repeat(2, 1fr)" : undefined,
            gridTemplateRows: window.innerWidth <= 768 ? "repeat(2, 1fr)" : undefined,
            justifyContent: window.innerWidth <= 768 ? undefined : "space-around",
            alignItems: "center",
            padding: "2rem 4rem",
            gap: "2rem",
            boxSizing: "border-box",
            zIndex: 10,
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
