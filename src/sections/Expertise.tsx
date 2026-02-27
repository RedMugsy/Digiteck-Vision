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

const BrainIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 6c-3 0-5.5 1.5-7 4-2.5-.5-5 .5-6.5 3s-1 5.5 1 7.5c-1.5 2-2 5-.5 7.5s4.5 4 7 3.5c1.5 2.5 4 4 7 4s5.5-1.5 7-4c2.5.5 5-.5 6.5-3s1-5.5-1-7.5c1.5-2 2-5 .5-7.5s-4.5-4-7-3.5C29.5 7.5 27 6 24 6z" stroke="#FFAD01" strokeWidth="2" fill="none"/>
    <path d="M24 6v36M16 14c2 2 6 2 8 0M16 26c2-2 6-2 8 0M32 14c-2 2-6 2-8 0M32 26c-2-2-6-2-8 0" stroke="#FFAD01" strokeWidth="1.5" fill="none"/>
  </svg>
);

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "star": return <StarIcon />;
    case "play": return <PlayIcon />;
    case "squares": return <SquaresIcon />;
    case "refresh": return <RefreshIcon />;
    case "brain": return <BrainIcon />;
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
    <section ref={root} className="panel expertise-section" style={{ height: "auto", minHeight: "100vh" }}>
      <div
        ref={content}
        style={{
          position: "relative",
          background: "#0B0B0F",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "2rem 1.5rem" : "clamp(2rem, 3.5vw, 4rem)",
          paddingTop: isMobile ? "5rem" : "clamp(6rem, 8vh, 8rem)",
          paddingBottom: isMobile ? "3rem" : "clamp(3rem, 5vh, 5rem)",
          overflow: "visible",
          minHeight: "100vh",
          width: "100%",
          boxSizing: "border-box",
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
            marginBottom: isMobile ? "1.5rem" : "clamp(1.5rem, 2.5vw, 3rem)",
            opacity: 0,
          }}
        >
          <h2 style={{
            fontSize: isMobile ? "2.2rem" : "clamp(2rem, 2.92vw, 3.5rem)",
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
            gridTemplateColumns: isMobile ? "1fr" : "1.3fr 0.7fr",
            gap: isMobile ? "2rem" : "clamp(1.5rem, 3.5vw, 4rem)",
            alignItems: "start"
          }}
        >
          {/* Left Side - Cards */}
          <div
            ref={cardsContainerRef}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "1.2rem" : "clamp(1rem, 1.8vw, 2rem)",
              opacity: 0,
              marginTop: isMobile ? "1rem" : "clamp(0.5rem, 1.5vw, 2rem)",
            }}
          >
            {siteContent.expertise.cards.map((card, index) => (
              <div
                key={index}
                style={{
                  background: "#1A1A1A",
                  borderRadius: "12px",
                  padding: isMobile ? "1.25rem" : "clamp(1rem, 1.5vw, 2rem)",
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? "0.75rem" : "clamp(0.5rem, 0.8vw, 1rem)",
                }}
              >
                <div>{getIcon(card.icon)}</div>
                <h3 style={{
                  fontSize: isMobile ? "1rem" : "clamp(0.85rem, 1.05vw, 1.25rem)",
                  fontWeight: 600,
                  color: "#fff",
                  margin: 0
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: isMobile ? "0.85rem" : "clamp(0.72rem, 0.78vw, 0.9rem)",
                  color: "#B0B0B0",
                  margin: 0,
                  lineHeight: 1.5,
                  whiteSpace: "pre-line"
                }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Image and Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "1.2rem" : "clamp(1rem, 1.8vw, 2rem)" }}>
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
                fontSize: isMobile ? "0.85rem" : "clamp(0.8rem, 0.9vw, 1rem)",
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