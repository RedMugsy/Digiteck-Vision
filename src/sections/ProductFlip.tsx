import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function ProductFlip() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  useScene(root, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    tl.fromTo(
      content.current!,
      { yPercent: 100 },
      { yPercent: 0, ease: "none" }
    );

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
      <div
        ref={content}
        className="productFlip-content"
        style={{
          position: "absolute",
          inset: 0,
          background: "#0b0b0f",
          padding: "4rem",
        }}
      >
        {/* Section Title - top left */}
        <h2
          className="productFlip-section-title"
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            fontSize: "2.9rem",
            margin: 0,
            color: "#FFAD01",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            zIndex: 10,
          }}
        >
          {siteContent.productFlip.sectionTitle}
        </h2>

        <div className="productFlip-heading" style={{ textAlign: "right", marginBottom: "3rem" }}>
          <h2>{siteContent.productFlip.heading}</h2>
        </div>

        <div
          id="productFlip-grid"
          className="productFlip-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {siteContent.productFlip.products.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setFlipped(product.id)}
              onMouseLeave={() => setFlipped(null)}
              style={{
                aspectRatio: "1",
                perspective: "1000px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s",
                  transform: flipped === product.id ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front side - Image */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    borderRadius: "8px",
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    padding: "1.5rem",
                    paddingRight: 0,
                  }}
                >
                  <div style={{ 
                    background: "rgba(0, 0, 0, 0.7)", 
                    padding: "1rem", 
                    borderRadius: "4px",
                    width: "75%",
                  }}>
                    <h3 style={{ fontSize: "1.1rem", margin: 0, color: "#FFAD01", textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>{product.frontTitle}</h3>
                  </div>
                </div>

                {/* Back side - Description */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>{product.backTitle}</h3>
                  <p style={{ opacity: 0.8, fontSize: "0.9rem", lineHeight: 1.6 }}>{product.backBody}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
