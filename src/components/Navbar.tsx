import { useState } from "react";
import { siteContent } from "../content";

interface NavbarProps {
  theme?: "light" | "dark";
}

export default function Navbar({ theme = "dark" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const textColor = theme === "light" ? "#000" : "#fff";
  const logoDotColor = theme === "light" ? "#000" : "#fff";

  return (
    <header className="nav">
      <div className="navLeft">
        <div className="logoDot" style={{ background: logoDotColor }} />
        <span style={{ fontSize: "15.7px", fontWeight: 600, color: textColor }}>{siteContent.hero.title}</span>
      </div>

      <nav className="navLinks" aria-label="Primary">
        {siteContent.navigation.links.map((link, index) => (
          <a key={index} href={link.href} style={{ color: textColor }}>{link.label}</a>
        ))}
      </nav>

      {/* Hamburger menu button - hidden on desktop, shown on mobile/tablet */}
      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        style={{ display: 'none' }}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="mobile-menu-overlay"
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
          }}
        >
          {siteContent.navigation.links.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              style={{ color: '#fff', fontSize: '1.68rem', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
