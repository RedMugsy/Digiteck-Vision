import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function TripleCards() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

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
        id="tripleCards-container"
        style={{
          position: "absolute",
          inset: 0,
          background: "#0e0e12",
          display: "flex",
          gap: "2rem",
          padding: "4rem",
        }}
      >
        {/* Section Title - top left */}
        <h2
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
          {siteContent.tripleCards.sectionTitle}
        </h2>

        {siteContent.tripleCards.cards.map((card, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              position: "relative",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div
              style={{
                position: "relative",
                width: "100%",
                padding: "2rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                zIndex: 1,
              }}
            >
              <h3>{card.title}</h3>
              <p style={{ marginTop: "0.5rem", opacity: 0.8 }}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
