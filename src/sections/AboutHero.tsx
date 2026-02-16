                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const root = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const imageEl = useRef<HTMLImageElement>(null);
  const piecesContainer = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useScene(root, () => {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
      // Desktop only - Extended pin for the multi-phase animation
      ScrollTrigger.create({
        trigger: root.current!,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
      });

      // Create the animation timeline - Desktop only
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current!,
          start: "top top",
          end: "+=150%",
          scrub: 1,
        },
      });

      // Phase 1: Shrink image from both sides (0-33% of scroll)
      tl.to(imageEl.current!, {
        scaleX: 0.3,
        ease: "power2.inOut",
        duration: 1,
      }, 0)
      .to(heroTitle.current!, {
        opacity: 0,
        y: -50,
        ease: "power2.in",
        duration: 0.5,
      }, 0);

      // Phase 2: Hide original image, show pieces (33% mark)
      tl.set(imageEl.current!, { opacity: 0 }, 1)
        .set(piecesContainer.current!, { opacity: 1 }, 1);

      // Phase 3: Slide pieces upward (33-100% of scroll)
      const pieces = piecesContainer.current?.querySelectorAll('.piece');
      if (pieces) {
        pieces.forEach((piece) => {
          const randomDelay = Math.random() * 0.3;
          const randomY = -100 - Math.random() * 50;
          tl.to(piece, {
            y: `${randomY}vh`,
            opacity: 0,
            rotation: Math.random() * 20 - 10,
            ease: "power2.in",
            duration: 1,
          }, 1.2 + randomDelay);
        });
      }
    }
  });

  // Create grid of pieces (8x6 = 48 pieces)
  const rows = 6;
  const cols = 8;
  const pieces = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      pieces.push({ row, col });
    }
  }

  return (
    <section ref={root} className="panel about-hero-panel" style={{ height: "100vh", minHeight: "100vh", position: "relative" }}>
      {/* Minimalist menu overlay */}
      <div className="nav">
        <div className="navLeft">
          <div className="logoDot" />
          <span style={{ fontSize: "15.7px", fontWeight: 600 }}>{siteContent.hero.title}</span>
        </div>
        <div className="navLinks">
          {siteContent.navigation.links.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              className={activeSection === link.label.toLowerCase().replace(" ", "") ? "active" : ""} 
              onClick={() => setActiveSection(link.label.toLowerCase().replace(" ", ""))}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Hamburger menu button - shown on mobile/tablet */}
        <button
          className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ display: 'none' }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(11, 11, 15, 0.98)',
            backdropFilter: 'blur(10px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            gap: '1.5rem',
            pointerEvents: 'auto',
          }}
        >
          {siteContent.navigation.links.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              onClick={() => { setIsMobileMenuOpen(false); setActiveSection(link.label.toLowerCase().replace(" ", "")); }} 
              style={{ 
                color: activeSection === link.label.toLowerCase().replace(" ", "") ? '#FFAD01' : '#fff', 
                fontSize: '1.68rem', 
                textDecoration: 'none', 
                padding: '0.5rem 0' 
              }}
            >
              {link.label}
            </a>
          ))}
          <button className="btn" style={{ marginTop: '1rem', width: 'fit-content', fontSize: '1.2rem' }}>
            {siteContent.navigation.ctaButton}
          </button>
        </div>
      )}

      {/* Fullscreen image background */}
      <div
        ref={imageContainer}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: -1,
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          ref={imageEl}
          src={siteContent.aboutHero.image}
          alt={siteContent.aboutHero.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Pieces container - hidden initially */}
        <div
          ref={piecesContainer}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {pieces.map(({ row, col }, i) => (
            <div
              key={i}
              className="piece"
              style={{
                backgroundImage: `url(${siteContent.aboutHero.image})`,
                backgroundSize: `${cols * 100}% ${rows * 100}%`,
                backgroundPosition: `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
                width: "100%",
                height: "100%",
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay container with 40% opacity */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: 0,
        }}
      />

      {/* Main content - vertically centered, horizontally left-aligned */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: window.innerWidth <= 768 ? "0 2rem" : "0 4rem",
          zIndex: 1,
        }}
      >
        <h1
          ref={heroTitle}
          style={{
            fontSize: window.innerWidth <= 768 ? "2.5rem" : "4rem",
            fontWeight: 700,
            color: "#FFAD01",
            margin: 0,
            textAlign: "left",
            lineHeight: 1.2,
            maxWidth: window.innerWidth <= 768 ? "100%" : "60%",
          }}
        >
          {siteContent.aboutHero.title}
        </h1>
      </div>
    </section>
  );
}
