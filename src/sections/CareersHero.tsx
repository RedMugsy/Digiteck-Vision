import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function CareersHero() {
  const root = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("careers");

  useScene(root, () => {
    // Simple fade in animation
    gsap.fromTo(root.current!, 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1,
        scrollTrigger: {
          trigger: root.current!,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        }
      }
    );
  });

  return (
    <section ref={root} className="panel" style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      {/* Minimalist menu overlay */}
      <div className="nav">
        <div className="navLeft">
          <div className="logoDot" />
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
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '3rem',
          }}
        >
          {siteContent.navigation.links.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              style={{ 
                color: link.label === 'Careers' ? '#FFAD01' : '#fff', 
                textDecoration: 'none', 
                padding: '1rem 0', 
                fontSize: '1.34rem' 
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Main content container - custom layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem",
          minHeight: "calc(100vh - 8rem)",
          position: "relative"
        }}
      >
        {/* Title and Text Row - Above Image */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth <= 768 ? "1fr" : "1fr 1fr",
            gap: "4rem",
            width: "100%",
            maxWidth: "1000px",
            marginBottom: "3rem",
            alignItems: "flex-end"
          }}
        >
          {/* Left Side - Title */}
          <div>
            <h1
              style={{
                fontSize: window.innerWidth <= 768 ? "2.5rem" : "3.5rem",
                fontWeight: 700,
                color: "#FFAD01",
                margin: 0,
                lineHeight: 1.1
              }}
            >
              {siteContent.careers.hero.title}
            </h1>
          </div>

          {/* Right Side - Description Text */}
          <div>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#E0E0E0",
                lineHeight: 1.6,
                margin: 0
              }}
            >
              {siteContent.careers.hero.description}
            </p>
          </div>
        </div>

        {/* Image Container - Centered but closer to bottom */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1000px",
            aspectRatio: "16/10",
            borderRadius: "12px",
            overflow: "hidden",
            marginTop: "2rem"
          }}
        >
          <img
            src={siteContent.careers.hero.image}
            alt="Team collaboration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          
          {/* Button positioned at bottom right corner of image */}
          <button
            style={{
              position: "absolute",
              bottom: "1.5rem",
              right: "1.5rem",
              background: "#FFAD01",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.3s ease",
              zIndex: 2
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FF9500";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFAD01";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={() => {
              const openingsSection = document.querySelector('.panel:last-of-type');
              if (openingsSection) {
                openingsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {siteContent.careers.hero.cta}
          </button>
        </div>
      </div>
    </section>
  );
}