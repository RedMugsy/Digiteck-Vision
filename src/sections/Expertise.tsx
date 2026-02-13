import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

// Icon components
const StarIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#FFAD01" strokeWidth="2">
    <path d="M24 2l5.09 16.26L45 18l-12.91 10.26 4.91 15.74L24 36l-12.91 8L16 28.26 3 18l15.91.26L24 2z" fill="none"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <polygon points="18,12 18,36 36,24" stroke="#FFAD01" strokeWidth="2" fill="none"/>
  </svg>
);

const SquaresIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="16" height="16" stroke="#FFAD01" strokeWidth="2" fill="none"/>
    <rect x="24" y="24" width="16" height="16" stroke="#FFAD01" strokeWidth="2" fill="none"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 8v8l6-6 6 6-4-4a12 12 0 1 1-8 20" stroke="#FFAD01" strokeWidth="2" fill="none"/>
  </svg>
);

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "star": return <StarIcon />;
    case "play": return <PlayIcon />;
    case "squares": return <SquaresIcon />;
    case "refresh": return <RefreshIcon />;
    default: return <StarIcon />;
  }
};

export default function Expertise() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log("Expertise component mounted");
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useScene(root, () => {
    const isMobile = window.innerWidth <= 768;
    
    // Set content in position immediately
    gsap.set(content.current!, { yPercent: 0 });

    // Animation timeline for elements entering from different directions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top 70%",
        end: "top 20%", 
        toggleActions: "play none none reverse",
      },
    });

    if (isMobile) {
      // Mobile: Elements come from left and right alternately
      tl.fromTo(titleRef.current!, 
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0
      )
      // First make the cards container visible
      .fromTo(cardsContainerRef.current!, 
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0.1
      )
      // Then animate individual cards from different sides
      .fromTo(cardsContainerRef.current!.children[0], 
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.2
      )
      .fromTo(cardsContainerRef.current!.children[1], 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.3
      )
      .fromTo(cardsContainerRef.current!.children[2], 
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.4
      )
      .fromTo(cardsContainerRef.current!.children[3], 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.5
      )
      .fromTo(imageRef.current!, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.6
      )
      .fromTo(descriptionRef.current!, 
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.8
      )
      .fromTo(ctaRef.current!, 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.9
      );
    } else {
      // Desktop: Different directions for each element
      tl.fromTo(titleRef.current!, 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0
      )
      // First make the cards container visible
      .fromTo(cardsContainerRef.current!, 
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0.2
      )
      // Individual cards from different sides with delays
      .fromTo(cardsContainerRef.current!.children[0], 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.3
      )
      .fromTo(cardsContainerRef.current!.children[1], 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.5
      )
      .fromTo(cardsContainerRef.current!.children[2], 
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.7
      )
      .fromTo(cardsContainerRef.current!.children[3], 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.9
      )
      .fromTo(imageRef.current!, 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        1.1
      )
      .fromTo(descriptionRef.current!, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        1.3
      )
      .fromTo(ctaRef.current!, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        1.5
      );
    }
  });

  return (
    <section ref={root} className="panel expertise-section">
      {/* Mobile Spacer for section height fix */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
          zIndex: -1
        }}
      />
      <div
        ref={content}
        style={{
          position: "absolute",
          inset: 0,
          background: "#0B0B0F",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem",
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
          {siteContent.expertise.sectionTitle}
        </h2>

        {/* Main Title */}
        <div
          ref={titleRef}
          style={{
            width: "100%",
            maxWidth: "1200px",
            marginBottom: "3rem",
            opacity: 0,
            paddingTop: "6rem" // Add space below section title
          }}
        >
          <h2 style={{ 
            fontSize: "3.5rem", 
            fontWeight: 700, 
            color: "#fff", 
            margin: 0,
            lineHeight: 1.2
          }}>
            {siteContent.expertise.title}
          </h2>
        </div>

        {/* Main Content Grid */}
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "4rem",
            alignItems: "start"
          }}
        >
          {/* Left Side - Cards */}
          <div
            ref={cardsContainerRef}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "2rem",
              opacity: 0,
              marginTop: "2rem"
            }}
          >
            {siteContent.expertise.cards.map((card, index) => (
              <div
                key={index}
                style={{
                  background: "#1A1A1A",
                  borderRadius: "12px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}
              >
                <div>{getIcon(card.icon)}</div>
                <h3 style={{ 
                  fontSize: "1.25rem", 
                  fontWeight: 600, 
                  color: "#fff", 
                  margin: 0 
                }}>
                  {card.title}
                </h3>
                <p style={{ 
                  fontSize: "0.9rem", 
                  color: "#B0B0B0", 
                  margin: 0, 
                  lineHeight: 1.5 
                }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Image and Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Image */}
            <div
              ref={imageRef}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                aspectRatio: "4/3",
                background: "#333",
                opacity: 0
              }}
            >
              <img
                src={siteContent.expertise.image}
                alt="Team collaboration"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.style.background = '#333';
                }}
              />
            </div>

            {/* Description */}
            <p
              ref={descriptionRef}
              style={{
                fontSize: "1rem",
                color: "#B0B0B0",
                lineHeight: 1.6,
                margin: 0,
                opacity: 0
              }}
            >
              {siteContent.expertise.description}
            </p>

            {/* CTA Button */}
            <a
              ref={ctaRef}
              href={siteContent.expertise.ctaLink}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2rem",
                background: "transparent",
                color: "#FFAD01",
                border: "2px solid #FFAD01",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1rem",
                width: "fit-content",
                transition: "all 0.3s ease",
                opacity: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FFAD01";
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#FFAD01";
              }}
            >
              {siteContent.expertise.ctaText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.146 3.146a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L11.293 8H1.5a.5.5 0 0 1 0-1h9.793L8.146 3.854a.5.5 0 0 1 0-.708z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}