import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef<HTMLDivElement>(null);
  const ticker = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    // Ticker animation - scroll from right to left continuously
    if (ticker.current) {
      gsap.to(ticker.current, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }
  });

  return (
    <section ref={root} className="footer-section" style={{ minHeight: "60vh", height: "auto", position: "relative", marginTop: "4rem" }}>
      <div
        className="footer-container"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "60vh",
          background: "#08080c",
          padding: "4rem 2rem 2rem 2rem",
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            padding: "2rem 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: "3rem",
            lineHeight: 1.2,
          }}
        >
          <div 
            ref={ticker}
            style={{ 
              whiteSpace: "nowrap", 
              fontSize: "2rem", 
              opacity: 0.3,
              display: "inline-block",
              lineHeight: 1.2,
            }}
          >
            {(siteContent.footer?.ticker || "VISTO • INTELLIGENCE • PRECISION • GROWTH • ").repeat(3)}
          </div>
        </div>

        <div
          className="footer-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr minmax(300px, 1fr)",
            gap: "3rem",
            maxWidth: "1400px",
            margin: "0 auto 3rem",
            alignItems: "start",
          }}
        >
          {/** Left block uses hero content for logo/name/tagline */}
          <div className="footer-left-section" style={{ textAlign: "left" }}>
            {/* Logo, Company Name, Tagline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <img src={siteContent.hero.logoSrc || "/Media/Images/logo.png"} alt="Visto Logo" style={{ height: "96px", objectFit: "contain" }} onError={(e) => {(e.target as HTMLImageElement).style.display = 'none';}} />
              <div className="footer-company-name" style={{ fontWeight: 800, fontSize: "2.25rem", lineHeight: 1 }}>{siteContent.hero.title || "DIGITECK VISION"}</div>
              <div style={{ opacity: 0.6, fontSize: "1rem" }}>{siteContent.hero.tagline || "A technology development firm operating from strategy to execution."}</div>
            </div>

            {/* Company Address */}
            {siteContent.footer.address && (
              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ marginBottom: "0.5rem", fontSize: "1rem", fontWeight: 600 }}>Address</h4>
                <p style={{ opacity: 0.6, fontSize: "0.95rem", lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>
                  {siteContent.footer.address}
                </p>
              </div>
            )}

            {/* Contact Rails */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ marginBottom: "0.5rem", fontSize: "1rem", fontWeight: 600 }}>Contact</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {siteContent.footer.contact.phone && (
                  <a href={`tel:${siteContent.footer.contact.phone}`} style={{ opacity: 0.6, fontSize: "0.95rem", textDecoration: "none", color: "inherit" }}>
                    📞 {siteContent.footer.contact.phone}
                  </a>
                )}
                {siteContent.footer.contact.email && (
                  <a href={`mailto:${siteContent.footer.contact.email}`} style={{ opacity: 0.6, fontSize: "0.95rem", textDecoration: "none", color: "inherit" }}>
                    ✉️ {siteContent.footer.contact.email}
                  </a>
                )}
              </div>
            </div>

            {/* Social Media Hexagon Rail */}
            <div style={{ marginBottom: "1.5rem" }}>
              {/* First Row */}
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem", justifyContent: "flex-start" }}>
                {["linkedin.jpg", "x.jpg", "instagram.jpg", "facebook.jpg", "reddit.jpg"].map((img, idx) => (
                  <a
                    key={idx}
                    href={`#${img.replace('.jpg', '')}`}
                    style={{
                      width: "48px",
                      height: "48px",
                      clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 173, 1, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <img
                      src={`/Media/Images/${img}`}
                      alt={img.replace('.jpg', '')}
                      style={{
                        width: "60%",
                        height: "60%",
                        objectFit: "contain",
                      }}
                    />
                  </a>
                ))}
              </div>
              {/* Second Row */}
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-start" }}>
                {["whatsapp.jpg", "telegram.jpg", "discord.jpg"].map((img, idx) => (
                  <a
                    key={idx}
                    href={`#${img.replace('.jpg', '')}`}
                    style={{
                      width: "48px",
                      height: "48px",
                      clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 173, 1, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <img
                      src={`/Media/Images/${img}`}
                      alt={img.replace('.jpg', '')}
                      style={{
                        width: "60%",
                        height: "60%",
                        objectFit: "contain",
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/** Right block: subscribe form + links */}
          <div className="footer-right-section" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {/* Subscribe Form */}
            <div className="footer-subscribe">
              <h4 style={{ marginBottom: "0.75rem" }}>{siteContent.footer.subscribe.heading || "Subscribe"}</h4>
              <input
                type="email"
                placeholder={siteContent.footer.subscribe.placeholder || "Enter your email"}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "4px",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                }}
              />
              <button
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "#FFAD01",
                  border: "none",
                  borderRadius: "4px",
                  color: "#000",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                Subscribe
              </button>
            </div>

            {/** Links grid */}
            <div className="footer-links-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
            <div>
              <h4 style={{ marginBottom: "1rem" }}>{siteContent.footer.company.heading || "Company"}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(siteContent.footer.company.links || []).map((l) => (
                  <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{l.text}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: "1rem" }}>Policies</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { text: "Privacy Policy", href: "#privacy" },
                  { text: "Terms of Service", href: "#terms" },
                  { text: "Cookie Policy", href: "#cookies" },
                ].map((l: { text: string; href: string }) => (
                  <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{l.text}</a>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "3rem 0", width: "100vw", marginLeft: "calc(50% - 50vw)" }} />

        <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ opacity: 0.6, textAlign: "left" }}>© 2026 Visto. All rights reserved.</div>
          </div>
        </div>

        {/* Removed small legal/footer note as requested */}
      </div>
    </section>
  );
}
