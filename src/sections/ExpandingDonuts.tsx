import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";

gsap.registerPlugin(ScrollTrigger);

export default function ExpandingDonuts() {
  const root = useRef<HTMLDivElement>(null);
  const donut1 = useRef<HTMLDivElement>(null);
  const donut2 = useRef<HTMLDivElement>(null);
  const donut3 = useRef<HTMLDivElement>(null);
  const donut4 = useRef<HTMLDivElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const nextPagePreview = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 0.8,
      },
    });

    // Helper to update radial gradient
    const updateGradient = (element: HTMLDivElement | null, innerRadius: number) => {
      if (!element) return;
      element.style.background = `radial-gradient(circle, transparent ${innerRadius}%, #FFAD01 ${innerRadius}%)`;
    };

    // Animation: circles start solid, hollow out while expanding
    // Expansion rate: 9.9 scale units per 0.2 duration (10% increase from 9)
    // Hollowing rate: 0→40→42.5→43.5→44.5→46%
    
    tl
      // 0 to 0.2: Donut 1 appears as solid, begins hollowing and expanding
      .fromTo(
        donut1.current!,
        { scale: 0, opacity: 1 },
        { 
          scale: 9.9, 
          duration: 0.2, 
          ease: "none",
          onUpdate: function() {
            const progress = this.progress();
            updateGradient(donut1.current!, progress * 40);
          }
        },
        0
      )
      
      // 0.2: Donut 2 appears, both grow and hollow at SAME rate
      .set(donut2.current!, { scale: 0, opacity: 1 }, 0.2)
      .to(donut1.current!, { 
        scale: 19.8, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut1.current!, 40 + progress * 2.5);
        }
      }, 0.2)
      .to(donut2.current!, { 
        scale: 9.9, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut2.current!, progress * 40);
        }
      }, 0.2)
      
      // 0.4: Donut 3 appears, all grow and hollow at SAME rate
      .set(donut3.current!, { scale: 0, opacity: 1 }, 0.4)
      .to(donut1.current!, { 
        scale: 29.7, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut1.current!, 42.5 + progress * 1);
        }
      }, 0.4)
      .to(donut2.current!, { 
        scale: 19.8, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut2.current!, 40 + progress * 2.5);
        }
      }, 0.4)
      .to(donut3.current!, { 
        scale: 9.9, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut3.current!, progress * 40);
        }
      }, 0.4)
      
      // 0.6: Donut 4 appears, all grow and hollow at SAME rate
      .set(donut4.current!, { scale: 0, opacity: 1 }, 0.6)
      .to(donut1.current!, { 
        scale: 39.6, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut1.current!, 43.5 + progress * 1);
        }
      }, 0.6)
      .to(donut2.current!, { 
        scale: 29.7, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut2.current!, 42.5 + progress * 1);
        }
      }, 0.6)
      .to(donut3.current!, { 
        scale: 19.8, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut3.current!, 40 + progress * 2.5);
        }
      }, 0.6)
      .to(donut4.current!, { 
        scale: 9.9, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut4.current!, progress * 40);
        }
      }, 0.6)
      
      // 0.8 to 1.0: All expand off screen, becoming thinner
      .to(background.current!, { opacity: 1, duration: 0.1 }, 0.75)
      .to(donut1.current!, { 
        scale: 49.5, 
        opacity: 0, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut1.current!, 44.5 + progress * 1.5);
        }
      }, 0.8)
      .to(donut2.current!, { 
        scale: 39.6, 
        opacity: 0, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut2.current!, 43.5 + progress * 2);
        }
      }, 0.8)
      .to(donut3.current!, { 
        scale: 29.7, 
        opacity: 0, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut3.current!, 42.5 + progress * 2);
        }
      }, 0.8)
      .to(donut4.current!, { 
        scale: 19.8, 
        opacity: 0, 
        duration: 0.2, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut4.current!, 40 + progress * 3.5);
        }
      }, 0.8)
      .fromTo(
        nextPagePreview.current!,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" },
        0.85
      );
  });

  return (
    <section ref={root} className="panel" style={{ background: "#0b0b0f", overflow: "visible" }}>
      {/* Background that reveals */}
      <div
        ref={background}
        style={{
          position: "absolute",
          inset: 0,
          background: "#0b0b0f",
          opacity: 0,
          zIndex: 0,
        }}
      />

      {/* Donuts container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {/* Donut 1 (outermost) */}
        <div
          ref={donut1}
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#FFAD01",
            opacity: 0,
            transform: "scale(0)",
          }}
        />

        {/* Donut 2 */}
        <div
          ref={donut2}
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#FFAD01",
            opacity: 0,
            transform: "scale(0)",
          }}
        />

        {/* Donut 3 */}
        <div
          ref={donut3}
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#FFAD01",
            opacity: 0,
            transform: "scale(0)",
          }}
        />

        {/* Donut 4 (innermost) */}
        <div
          ref={donut4}
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#FFAD01",
            opacity: 0,
            transform: "scale(0)",
          }}
        />
      </div>

      {/* Next page preview (appears in center) */}
      <div
        ref={nextPagePreview}
        style={{
          position: "absolute",
          inset: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "600px" }}>
          <h2 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#FFAD01" }}>
            Transform Your Vision
          </h2>
          <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
            Experience innovation at every level
          </p>
        </div>
      </div>
    </section>
  );
}
