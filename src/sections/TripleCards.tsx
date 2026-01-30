import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function TripleCards() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const leftCard = useRef<HTMLDivElement>(null);
  const centerCard = useRef<HTMLDivElement>(null);
  const rightCard = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    const isMobile = window.innerWidth <= 768;

    // Set content in position immediately - no slide animation
    gsap.set(content.current!, { yPercent: 0 });

    ScrollTrigger.create({
      trigger: root.current!,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
    });

    // Slide-out animation - cards start stacked in center, then slide out
    const slideOutTl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top top",
        end: "+=50%",
        scrub: 0.8,
      },
    });

    if (isMobile) {
      // Mobile: Cards are vertical (tall), animate VERTICALLY
      slideOutTl
        .fromTo(leftCard.current!, 
          { x: 0, y: 0 },
          { x: 0, y: "-110%", ease: "power2.inOut" },
          0
        )
        .fromTo(centerCard.current!, 
          { x: 0, y: 0 },
          { x: 0, y: 0, ease: "power2.inOut" },
          0
        )
        .fromTo(rightCard.current!, 
          { x: 0, y: 0 },
          { x: 0, y: "110%", ease: "power2.inOut" },
          0
        );
    } else {
      // Desktop: Cards start stacked in center, left slides left, right slides right with gap (HORIZONTAL)
      slideOutTl
        .fromTo(leftCard.current!, 
          { x: 0, y: 0 },
          { x: "-110%", y: 0, ease: "power2.inOut" },
          0
        )
        .fromTo(centerCard.current!, 
          { x: 0, y: 0 },
          { x: 0, y: 0, ease: "power2.inOut" },
          0
        )
        .fromTo(rightCard.current!, 
          { x: 0, y: 0 },
          { x: "110%", y: 0, ease: "power2.inOut" },
          0
        );
    }
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
          flexDirection: window.innerWidth <= 768 ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          padding: "4rem",
        }}
      >
        {/* Section Title - top left */}
        <h2
          className="section-title"
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            fontSize: "2.9rem",
            margin: 0,
            color: "#FFAD01",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            zIndex: 100,
            textAlign: "left",
          }}
        >
          {siteContent.tripleCards.sectionTitle}
        </h2>

        {siteContent.tripleCards.cards.map((card, i) => {
          // Assign refs to each card
          const cardRef = i === 0 ? leftCard : i === 1 ? centerCard : rightCard;
          
          return (
            <div
              key={i}
              ref={cardRef}
              style={{
                flex: 1,
                position: "absolute",
                width: window.innerWidth <= 768 ? "80%" : "30%",
                height: window.innerWidth <= 768 ? "30%" : "80%",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                alignItems: "flex-end",
                zIndex: i === 1 ? 3 : 2,
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
          );
        })}
      </div>
    </section>
  );
}
