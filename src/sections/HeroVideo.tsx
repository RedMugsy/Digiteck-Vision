import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
  const root = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>{siteContent.hero.title}</div>
        </div>
        <div className="navLinks">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#how">How it works</a>
          <a href="#solutions">Solutions</a>
          <button className="btn">Get started</button>
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
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none', padding: '0.5rem 0' }}>
            Home
          </a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none', padding: '0.5rem 0' }}>
            About
          </a>
          <a href="#how" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none', padding: '0.5rem 0' }}>
            How it works
          </a>
          <a href="#solutions" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none', padding: '0.5rem 0' }}>
            Solutions
          </a>
          <button className="btn" style={{ marginTop: '1rem', width: 'fit-content', fontSize: '1.2rem' }}>
            Get started
          </button>
        </div>
      )}

      {/* Fullscreen video carousel container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: -1,
          backgroundColor: "#000",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={siteContent.hero.videos[0]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay container with 40% opacity */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          pointerEvents: "none",
        }}
      />

      {/* Quote container - desktop: right-aligned, mobile: top-centered */}
      <div className="hero-quote-container">
        <div className="hero-quote-text">
          {siteContent.hero.quote}
        </div>
      </div>

      {/* Bottom 25%: full-width line + logo + title */}
      <div className="overlay hero-bottom-container" style={{ height: "25vh", bottom: 0, top: "auto", position: "absolute", left: 0, right: 0 }}>
        <div className="hero-content-wrapper" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "0 56px" }}>
          {/* Full-width line */}
          <div className="heroLine" style={{ width: "100%", marginBottom: "0.5vh" }} />

          {/* 3-column layout - takes full remaining height */}
          <div className="hero-grid-layout" style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: "3rem",
            flex: 1,
            maxWidth: "1400px",
            width: "100%"
          }}>
            {/* Column 1: Logo - aligned to bottom */}
            <div className="hero-logo-column" style={{ display: "flex", alignItems: "flex-end" }}>
              {siteContent.hero.logoSrc && (
                <img
                  src={siteContent.hero.logoSrc}
                  alt="Digiteck Vision Logo"
                  className="hero-logo"
                  style={{
                    height: "clamp(18vh, 24vh, 24vh)",
                    width: "auto",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
            </div>

            {/* Column 2: Title (75% height) and Tagline (25% height) - full height column */}
            <div className="hero-text-column" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Title takes 75% height */}
              <div style={{ flex: "3", display: "flex", alignItems: "flex-end" }}>
                <h1 className="heroTitle" style={{ margin: 0 }}>{siteContent.hero.subtitle}</h1>
              </div>
              {/* Tagline takes 25% height */}
              <div style={{ flex: "1", display: "flex", alignItems: "flex-end" }}>
                <p className="heroTagline" style={{
                  fontSize: "clamp(9.8px, 1.4vw, 22.4px)",
                  margin: 0,
                  opacity: 0.85,
                  lineHeight: 1.4,
                  textAlign: "left"
                }}>
                  {siteContent.hero.tagline}
                </p>
              </div>
            </div>

            {/* Column 3: CTA Button - centered horizontally and vertically aligned to logo middle */}
            <div className="hero-cta-column" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <a
                href={siteContent.hero.ctaLink}
                className="hero-cta-button"
                style={{ pointerEvents: "auto" }}
              >
                {siteContent.hero.ctaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
