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
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-start" }}>
              <img src={siteContent.hero.logoSrc || "/Media/Images/logo.png"} alt="Visto Logo" style={{ height: "96px", objectFit: "contain" }} onError={(e) => {(e.target as HTMLImageElement).style.display = 'none';}} />
              <div className="footer-company-name" style={{ fontWeight: 800, fontSize: "2.25rem", lineHeight: 1 }}>{siteContent.hero.title || "DIGITECK VISION"}</div>
              <div style={{ opacity: 0.6, fontSize: "1rem" }}>{siteContent.hero.tagline || "A technology development firm operating from strategy to execution."}</div>
            </div>

            <div style={{ height: "1.25rem" }} />
            <div style={{ height: "1.25rem" }} />

            <div>
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
                }}
              />
            </div>
          </div>

          {/** Right block: render two columns (company, policies) */}
          <div className="footer-links-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem", justifyContent: "flex-end" }}>
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

        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "3rem 0", width: "100vw", marginLeft: "calc(50% - 50vw)" }} />

        <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ opacity: 0.6, textAlign: "left" }}>© 2026 Visto. All rights reserved.</div>
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "flex-end" }}>
              <a href="#linkedin" style={{ opacity: 0.6, textDecoration: "none", color: "inherit" }}>LinkedIn</a>
              <a href="#twitter" style={{ opacity: 0.6, textDecoration: "none", color: "inherit" }}>Twitter/X</a>
              <a href="#bluesky" style={{ opacity: 0.6, textDecoration: "none", color: "inherit" }}>BlueSky</a>
              <a href="#instagram" style={{ opacity: 0.6, textDecoration: "none", color: "inherit" }}>Instagram</a>
              <a href="#facebook" style={{ opacity: 0.6, textDecoration: "none", color: "inherit" }}>Facebook</a>
            </div>
          </div>
        </div>

        {/* Removed small legal/footer note as requested */}
      </div>
    </section>
  );
}
