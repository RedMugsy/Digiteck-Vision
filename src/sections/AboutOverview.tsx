import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function AboutOverview() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    // Set content in position immediately - no slide animation
    gsap.set(content.current!, { yPercent: 0 });

    // Odometer animation for numbers in row
    setTimeout(() => {
      const numberElements = root.current?.querySelectorAll('.stat-number');
      if (numberElements) {
        numberElements.forEach((el, index) => {
          const stat = siteContent.aboutOverview.stats[index];
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
    <section ref={root} className="panel coverSolid-section">
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('/Media/Images/about us overview.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: window.innerWidth <= 768 ? "70% center" : "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />

      {/* Dark overlay for better text readability - gradient from left (opaque) to right (transparent) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.3) 100%)",
          zIndex: 2,
        }}
      />

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
        {siteContent.aboutOverview.sectionTitle}
      </h2>

      <div
        ref={content}
        id="aboutOverview-container"
        className="coverSolid-container"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "4rem",
          paddingTop: "6rem",
          paddingBottom: "22vh",
          zIndex: 3,
          overflow: "hidden",
        }}
      >
        {/* Content - Left aligned, contained within section */}
        <div
          className="coverSolid-text-container"
          style={{
            position: "relative",
            zIndex: 5,
            maxWidth: "600px",
            marginLeft: "0",
            transform: "none",
          }}
        >
          <h3 
            style={{ 
              fontSize: "2.6rem", 
              margin: 0, 
              color: "#fff", 
              fontWeight: 600, 
              letterSpacing: "-0.02em", 
              textAlign: "left" 
            }}
          >
            {siteContent.aboutOverview.title}
          </h3>
          <p 
            style={{ 
              marginTop: "1.5rem", 
              opacity: 0.8, 
              fontSize: "1.8rem", 
              lineHeight: 1.6, 
              textAlign: "left",
              color: "#fff",
            }}
          >
            {siteContent.aboutOverview.content}
          </p>
        </div>

        {/* Stats Row - Bottom of section */}
        <div
          className="coverSolid-stats-row"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "20vh",
            background: "#000000",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "2rem 4rem",
            gap: "2rem",
            boxSizing: "border-box",
            zIndex: 10,
          }}
        >
          {siteContent.aboutOverview.stats.map((stat, index) => (
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
                  fontSize: "4.8rem",
                  fontWeight: 700,
                  color: "#FFAD01",
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
                  color: "#FFAD01",
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
