import { useRef, useState } from "react";
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
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);

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
          background: "#000000",
          display: "flex",
          flexDirection: "row",
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
              className="tripleCards-card"
              style={{
                flex: 1,
                position: "absolute",
                width: "30%",
                height: "80%",
                perspective: "1000px",
                zIndex: i === 1 ? 3 : 2,
              }}
              onMouseEnter={() => {
                const newFlipped = [...flippedCards];
                newFlipped[i] = true;
                setFlippedCards(newFlipped);
              }}
              onMouseLeave={() => {
                const newFlipped = [...flippedCards];
                newFlipped[i] = false;
                setFlippedCards(newFlipped);
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s",
                  transform: flippedCards[i] ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front of card */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
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

                  {/* Hover hint indicator */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: "rgba(255, 173, 1, 0.9)",
                      color: "#000",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      animation: "pulseHint 2s ease-in-out infinite",
                      zIndex: 2,
                    }}
                  >
                    <span style={{ 
                      display: "inline-block",
                      animation: "rotateHint 3s ease-in-out infinite",
                    }}>
                      ⟲
                    </span>
                    Hover to flip
                  </div>

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

                {/* Back of card */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    background: "linear-gradient(135deg, #FFAD01 0%, #FF8801 100%)",
                    borderRadius: "8px",
                    transform: "rotateY(180deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "3rem 2rem",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ 
                    fontSize: "2rem", 
                    marginBottom: "1.5rem", 
                    color: "#000",
                    fontWeight: 700,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{ 
                    fontSize: "1.1rem", 
                    lineHeight: 1.6,
                    color: "#000",
                    opacity: 0.9,
                  }}>
                    {card.backContent}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
