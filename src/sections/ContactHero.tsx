import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHero() {
  const root = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("contact");

  useScene(root, () => {
    // Pin for exactly one viewport scroll
    ScrollTrigger.create({
      trigger: root.current!,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
    });
  });

  return (
    <section ref={root} className="panel">
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
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: -1,
          backgroundColor: "#000",
        }}
      >
        <img
          src="/Media/Images/contactus.jpg"
          alt="Contact Us"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
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

      {/* Main content - vertically centered, horizontally right-aligned */}
      <div
        ref={root}
        className="hero-content"
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 4rem",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: 700,
            color: "#FFAD01",
            margin: 0,
            textAlign: "right",
            lineHeight: 1.2,
          }}
        >
          Contact Us
        </h1>
      </div>
    </section>
  );
}
