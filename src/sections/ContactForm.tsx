import { useState, useRef } from "react";
import { Turnstile } from '@marsidev/react-turnstile';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../phoneInput.css';
import { endpoints } from '../config/api';
import { siteContent } from "../content";

export default function ContactForm() {
  const root = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("contact");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    interests: [] as string[],
    agreeToTerms: false,
  });

  const interestOptions = [
    "Digital Transformation Advisory",
    "Technology Development",
    "Solutions - Mobile/Digital ID",
    "Solutions - Time & Attendance",
    "Solutions - Mawjood",
    "Solutions - BIOID",
    "Solutions - Digital/Mobile Wallet",
    "Solutions - Digital Receipts",
    "Solutions - Emergency & Risk Control",
    "Solutions - Digital Onboarding",
    "Solutions - Digital Business Card",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(endpoints.messages, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          interests: formData.interests,
          turnstileToken: turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      // Success
      setSubmitted(true);
      setTurnstileToken("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        interests: [],
        agreeToTerms: false,
      });

      setTimeout(() => setSubmitted(false), 5000);

    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <section
      ref={root}
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        padding: "8rem 2rem 4rem",
      }}
    >
      {/* Navigation menu */}
      <div className="nav" style={{ background: 'rgba(11, 11, 15, 0.95)', padding: '1rem 2rem', borderRadius: '8px', left: '24px', right: '24px', top: '24px' }}>
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
          <a href="/contact" onClick={() => { setIsMobileMenuOpen(false); setActiveSection("contact"); }} style={{ color: activeSection === "contact" ? '#FFAD01' : '#fff', fontSize: '1.68rem', textDecoration: 'none', padding: '0.5rem 0' }}>
            Contact
          </a>
          <button className="btn" style={{ marginTop: '1rem', width: 'fit-content', fontSize: '1.2rem' }}>
            {siteContent.navigation.ctaButton}
          </button>
        </div>
      )}

      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          background: "#ffffff",
        }}
      >
        {/* Image with shadow */}
        <div
          style={{
            width: "100%",
            marginBottom: "3rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src="/Media/Images/contactus.jpg"
            alt="Contact Us"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>

        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#000",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Contact Us
        </h2>

        <form onSubmit={handleSubmit}>
          {/* First Row: First Name & Last Name */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#333" }}>
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem 0",
                  border: "none",
                  borderBottom: "2px solid #333",
                  fontSize: "1rem",
                  background: "transparent",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#333" }}>
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem 0",
                  border: "none",
                  borderBottom: "2px solid #333",
                  fontSize: "1rem",
                  background: "transparent",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Second Row: Email & Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#333" }}>
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem 0",
                  border: "none",
                  borderBottom: "2px solid #333",
                  fontSize: "1rem",
                  background: "transparent",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#333" }}>
                Phone
              </label>
              <PhoneInput
                international
                defaultCountry="LB"
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value || "" })}
                className="phone-input-custom"
                style={{
                  width: "100%",
                }}
              />
            </div>
          </div>

          {/* Third Row: Company */}
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#333" }}>
              Company *
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              style={{
                width: "50%",
                padding: "0.75rem 0",
                border: "none",
                borderBottom: "2px solid #333",
                fontSize: "1rem",
                background: "transparent",
                outline: "none",
              }}
            />
          </div>

          {/* Message */}
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#333" }}>
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "none",
                borderBottom: "2px solid #333",
                fontSize: "1rem",
                background: "transparent",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Interests Section */}
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "1rem", fontSize: "0.95rem", color: "#333" }}>
              Tell us what you are interested in. *
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {interestOptions.map((option) => (
                <label
                  key={option}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    color: "#333",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(option)}
                    onChange={() => handleInterestChange(option)}
                    style={{
                      width: "18px",
                      height: "18px",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                      accentColor: "#FFAD01",
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              required
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                accentColor: "#FFAD01",
              }}
            />
            <label style={{ fontSize: "0.9rem", color: "#333", cursor: "pointer" }}>
              I agree to the terms & conditions
            </label>
          </div>

          {/* Turnstile Widget */}
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
            <Turnstile
              siteKey="0x4AAAAAACdii85OZzyC5X_N"
              onSuccess={(token: string) => setTurnstileToken(token)}
              onError={() => setTurnstileToken("")}
              onExpire={() => setTurnstileToken("")}
            />
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <button
              type="submit"
              disabled={isSubmitting || !formData.agreeToTerms || !turnstileToken}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                border: "4px solid #FFAD01",
                background: isSubmitting ? "#f0f0f0" : "transparent",
                color: isSubmitting ? "#999" : "#FFAD01",
                fontSize: "1.25rem",
                fontWeight: 700,
                cursor: isSubmitting || !formData.agreeToTerms || !turnstileToken ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                opacity: isSubmitting || !formData.agreeToTerms || !turnstileToken ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && formData.agreeToTerms && turnstileToken) {
                  e.currentTarget.style.background = "#FFAD01";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#FFAD01";
                }
              }}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
            
            {submitted && (
              <span style={{ fontSize: "1.1rem", color: "#28a745", fontWeight: 600, textAlign: "center" }}>
                Thank you for contacting us!<br />We will get back to you soon.
              </span>
            )}
            
            {error && (
              <span style={{ fontSize: "1rem", color: "#dc3545", fontWeight: 600, textAlign: "center" }}>
                {error}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
