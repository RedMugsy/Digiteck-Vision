import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import "../App.css";

export default function CookiePolicy() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page" style={{ background: "#fff", position: "relative", minHeight: "100vh" }}>
      {/* Background image with gradient opacity */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/Media/Images/jobsbackground.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          mask: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.5) 100%)",
          WebkitMask: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.5) 100%)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      
      <div style={{ position: "relative", zIndex: 100, pointerEvents: "auto" }}>
        <Navbar theme="light" />
      </div>
      
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "8rem 2rem 4rem",
        color: "#000",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          border: "2px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          padding: "3rem",
          background: "rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 700,
          marginBottom: "1rem",
          color: "#000",
        }}>
          Cookie Policy
        </h1>
        
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          marginBottom: "3rem",
        }}>
          Last Updated: January 2026
        </p>

        <div style={{
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "#333",
        }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem", color: "#000" }}>Cookies and Similar Technologies</h2>
          
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>What are cookies?</h3>
          <p style={{ marginBottom: "1.5rem" }}>
            Cookies are small text files placed on your device when you visit a website. They help websites function, enhance security, remember preferences, and provide analytics about how the site is used. Similar technologies include pixels, tags, SDKs, and local storage.
          </p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>Types of cookies we use</h3>
          <p style={{ marginBottom: "1rem" }}>We use the following categories of cookies:</p>

          <h4 style={{ fontSize: "1.2rem", fontWeight: 600, marginTop: "1.2rem", marginBottom: "0.6rem", color: "#000" }}>Strictly Necessary Cookies</h4>
          <p style={{ marginBottom: "1.5rem" }}>
            These cookies are required for the website to operate securely (e.g., page navigation, session management, fraud prevention, load balancing). These cannot be disabled through our preference center in jurisdictions where they are considered essential.
          </p>

          <h4 style={{ fontSize: "1.2rem", fontWeight: 600, marginTop: "1.2rem", marginBottom: "0.6rem", color: "#000" }}>Functional Cookies</h4>
          <p style={{ marginBottom: "1.5rem" }}>
            These cookies remember choices you make (e.g., language or region) to provide enhanced functionality.
          </p>

          <h4 style={{ fontSize: "1.2rem", fontWeight: 600, marginTop: "1.2rem", marginBottom: "0.6rem", color: "#000" }}>Analytics Cookies</h4>
          <p style={{ marginBottom: "1.5rem" }}>
            These cookies help us understand how visitors interact with our website (e.g., pages visited, time spent, error events). We use this information to improve performance and user experience.
          </p>

          <h4 style={{ fontSize: "1.2rem", fontWeight: 600, marginTop: "1.2rem", marginBottom: "0.6rem", color: "#000" }}>Marketing Cookies (if enabled)</h4>
          <p style={{ marginBottom: "1.5rem" }}>
            These cookies may be used to measure campaign performance and, where applicable, to deliver or evaluate advertising. We do not sell Personal Information. Where applicable law treats certain ad-related disclosures as "sharing," you may have the right to opt out.
          </p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>How we use cookies</h2>
          <p style={{ marginBottom: "1rem" }}>We use cookies to:</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>Operate and secure our website</li>
            <li>Maintain sessions and prevent abuse</li>
            <li>Remember preferences where enabled</li>
            <li>Analyze website performance and improve usability</li>
            <li>Measure the effectiveness of communications and campaigns (where enabled)</li>
          </ul>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>Your choices and consent</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            When you first visit our website, you may see a cookie banner allowing you to accept or reject non-essential cookies and manage preferences. You can update your choices at any time through the cookie preference center available via the banner or website settings (where implemented).
          </p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>Managing cookies in your browser</h2>
          <p style={{ marginBottom: "1rem" }}>
            You can also control cookies using your browser settings. Disabling cookies may affect website functionality.
          </p>
          <p style={{ marginBottom: "1rem" }}>Common browsers:</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: "#FFAD01" }}>Chrome</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={{ color: "#FFAD01" }}>Microsoft Edge</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" style={{ color: "#FFAD01" }}>Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: "#FFAD01" }}>Safari</a></li>
            <li>Mobile browsers (iOS Safari / Android Chrome)</li>
          </ul>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>Cookie retention</h2>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Session cookies</strong> are deleted when you close your browser.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            <strong>Persistent cookies</strong> remain until they expire or are deleted. Retention depends on the cookie purpose and your settings and may range from a few days to longer periods.
          </p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>Contact</h2>
          <p style={{ marginBottom: "2rem" }}>
            Questions about cookies: <a href="mailto:privacy@digiteckvision.com" style={{ color: "#FFAD01" }}>privacy@digiteckvision.com</a>
          </p>

        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
