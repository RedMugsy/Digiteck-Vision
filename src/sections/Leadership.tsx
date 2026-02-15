import { useRef, useState, useEffect } from "react";
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
  
  const [isMobile, setIsMobile] = useState(false);
  const [cardDimensions, setCardDimensions] = useState({ width: 500, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (mobile) {
        const width = window.innerWidth * 0.8;
        const height = width * 1.2;
        setCardDimensions({ width, height });
      } else {
        setCardDimensions({ width: 500, height: 600 });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useScene(root, () => {
    const cards = [card1.current!, card2.current!, card3.current!, card4.current!];
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: Cards slide fully across the viewport, right to left
      const mobileCardWidth = window.innerWidth * 0.8;
      const mobileCardHeight = mobileCardWidth * 1.2;
      const vw = window.innerWidth;
      
      // Position cards off-screen to the right (using left property)
      cards.forEach((card) => {
        gsap.set(card, {
          left: vw,
          opacity: 1,
          width: `${mobileCardWidth}px`,
          height: `${mobileCardHeight}px`,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current!,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      const centerLeft = (vw - mobileCardWidth) / 2;
      const exitLeft = -mobileCardWidth;

      // Each card: slide in from right, pause at center, slide out left
      cards.forEach((card, index) => {
        const isLast = index === cards.length - 1;

        // Slide in from right to center
        tl.to(card, {
          left: centerLeft,
          ease: "power2.out",
          duration: 0.4,
        });

        if (isLast) {
          // Last card holds at center
          tl.to(card, {
            left: centerLeft,
            duration: 0.3,
          });
        } else {
          // Hold at center briefly
          tl.to(card, {
            left: centerLeft,
            duration: 0.15,
          });

          // Slide out to the left, off-screen
          tl.to(card, {
            left: exitLeft,
            ease: "power2.in",
            duration: 0.4,
          });
        }
      });
    } else {
      // Desktop: Cards travel across ENTIRE viewport width
      const cardWidth = 500;
      const viewportWidth = window.innerWidth;
      
      // Starting position: completely off-screen to the right
      const startLeft = viewportWidth;
      
      // Center position: card centered in viewport
      const centerLeft = (viewportWidth - cardWidth) / 2;
      
      // End position: completely off-screen to the left
      const endLeft = -cardWidth;

      cards.forEach((card) => {
        gsap.set(card, {
          left: startLeft,
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
          left: centerLeft,
          ease: "power2.out",
          duration: 0.5,
        });

        if (isLastCard) {
          // Last card: stop and stay at center
          tl.to(card, {
            left: centerLeft,
            duration: 0.5,
          });
        } else {
          // Other cards: continue sliding off-screen to the left
          tl.to(card, {
            left: centerLeft,
            duration: 0.2,
          });

          // Slide completely off-screen to the left
          tl.to(card, {
            left: endLeft,
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
            fontSize: isMobile ? "2rem" : "2.9rem",
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

        {/* Cards Container - Full width for card travel */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: `${cardDimensions.height}px`,
            transform: "translateY(-50%)",
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
                  width: `${cardDimensions.width}px`,
                  top: "50%",
                  transform: "translateY(-50%)",
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
                      transform: "scale(1.4)",
                    }}
                  />
                </div>

                {/* Text Container - Bottom 40% */}
                <div
                  style={{
                    flex: 1,
                    padding: isMobile ? "1.2rem" : "2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: "#fff",
                  }}
                >
                  {/* Title Row */}
                  <h3
                    style={{
                      fontSize: isMobile ? "1.3rem" : "1.8rem",
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
                      fontSize: isMobile ? "0.75rem" : "1rem",
                      fontWeight: 600,
                      color: "#FFAD01",
                      marginBottom: isMobile ? "0.6rem" : "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {leader.title}
                  </div>

                  {/* Bio Text Row */}
                  <p
                    style={{
                      fontSize: isMobile ? "0.75rem" : "0.95rem",
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
