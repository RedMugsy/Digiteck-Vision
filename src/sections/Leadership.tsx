import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function Leadership() {
  const root = useRef<HTMLDivElement>(null);
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);
  const card4 = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    const cards = [card1.current!, card2.current!, card3.current!, card4.current!];
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: Use xPercent for relative positioning
      cards.forEach((card) => {
        gsap.set(card, {
          xPercent: 100,
          opacity: 1,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current!,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // Each card slides in from right, then slides out to left
      cards.forEach((card, index) => {
        // Slide in from right to center
        tl.to(card, {
          xPercent: 0,
          ease: "power2.out",
          duration: 0.3,
        });

        // Hold in center briefly
        tl.to(card, {
          xPercent: 0,
          duration: 0.15,
        });

        // Slide out to left (except last card)
        if (index < cards.length - 1) {
          tl.to(card, {
            xPercent: -100,
            ease: "power2.in",
            duration: 0.3,
          });
        } else {
          // Last card stays visible
          tl.to(card, {
            xPercent: 0,
            duration: 0.15,
          });
        }
      });
    } else {
      // Desktop: Cards travel across ENTIRE viewport width
      const cardWidth = 500;
      const containerOffset = (window.innerWidth - cardWidth) / 2; // Container is centered
      
      // Starting position: completely off-screen to the right
      const startX = window.innerWidth - containerOffset;
      
      // Center position: card centered in viewport (x: 0 relative to centered container)
      const centerX = 0;
      
      // End position: completely off-screen to the left
      const endX = -cardWidth - containerOffset;

      cards.forEach((card) => {
        gsap.set(card, {
          x: startX,
          opacity: 1,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current!,
          start: "top top",
          end: "+=400%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Each card slides across the entire viewport
      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;

        // Slide in from right edge to center
        tl.to(card, {
          x: centerX,
          ease: "power2.out",
          duration: 0.5,
        });

        if (isLastCard) {
          // Last card: stop and stay at center
          tl.to(card, {
            x: centerX,
            duration: 0.5,
          });
        } else {
          // Other cards: continue sliding off-screen to the left
          tl.to(card, {
            x: centerX,
            duration: 0.2,
          });

          // Slide completely off-screen to the left
          tl.to(card, {
            x: endX,
            ease: "power2.in",
            duration: 0.5,
          });
        }
      });
    }
  });

  return (
    <section 
      ref={root} 
      className="panel leadership-section"
      style={{
        background: "#000",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
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
          padding: "4rem 2rem",
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
          {siteContent.leadership.sectionTitle}
        </h2>

        {/* Cards Container - Fixed size cards that travel full width */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "500px",
            height: "600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {siteContent.leadership.leaders.map((leader, index) => {
            const cardRef = index === 0 ? card1 : index === 1 ? card2 : index === 2 ? card3 : card4;

            return (
              <div
                key={index}
                ref={cardRef}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(255, 173, 1, 0.3)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image Container - Top 60% */}
                <div
                  style={{
                    width: "100%",
                    height: "60%",
                    overflow: "hidden",
                    background: "#1a1a1a",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${leader.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>

                {/* Text Container - Bottom 40% */}
                <div
                  style={{
                    flex: 1,
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: "#fff",
                  }}
                >
                  {/* Title Row */}
                  <h3
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "#000",
                      margin: 0,
                      marginBottom: "0.5rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {leader.name}
                  </h3>

                  {/* Subtitle/Position */}
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#FFAD01",
                      marginBottom: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {leader.title}
                  </div>

                  {/* Bio Text Row */}
                  <p
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      color: "#333",
                      margin: 0,
                    }}
                  >
                    {leader.bio}
                  </p>
                </div>

                {/* Social media post style decorative element */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#FFAD01",
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#FFAD01",
                      opacity: 0.6,
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#FFAD01",
                      opacity: 0.3,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator - Bottom center */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.85rem",
            color: "#FFAD01",
            opacity: 0.7,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Scroll to see all leaders
          <span style={{ animation: "bounce 2s infinite" }}>↓</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
}
