import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="nav">
      <div className="navLeft">
        <div className="logoDot" />
        <span style={{ fontSize: "14px", fontWeight: 600 }}>DIGITECK VISION</span>
      </div>

      <nav className="navLinks" aria-label="Primary">
        <a href="#solutions">Solutions</a>
        <a href="#products">Products</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
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
          <a href="#solutions" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none' }}>
            Solutions
          </a>
          <a href="#products" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none' }}>
            Products
          </a>
          <a href="#about" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none' }}>
            About
          </a>
          <a href="#contact" onClick={() => setIsOpen(false)} style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none' }}>
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
