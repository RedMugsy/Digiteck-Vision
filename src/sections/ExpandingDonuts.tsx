import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function ExpandingDonuts() {
  const root = useRef<HTMLDivElement>(null);
  const donut1 = useRef<HTMLDivElement>(null);
  const donut2 = useRef<HTMLDivElement>(null);
  const donut3 = useRef<HTMLDivElement>(null);
  const donut4 = useRef<HTMLDivElement>(null);
  const background = useRef<HTMLDivElement>(null);
  
  // Octagon refs
  const octagonCover = useRef<HTMLDivElement>(null);
  const coverContainer = useRef<HTMLDivElement>(null);
  const octagon1 = useRef<HTMLDivElement>(null);
  const octagon2 = useRef<HTMLDivElement>(null);
  const octagon3 = useRef<HTMLDivElement>(null);
  const octagon4 = useRef<HTMLDivElement>(null);
  const octagon5 = useRef<HTMLDivElement>(null);
  const octagon6 = useRef<HTMLDivElement>(null);
  const octagon7 = useRef<HTMLDivElement>(null);
  const octagon8 = useRef<HTMLDivElement>(null);

  // Text refs for octagon labels
  const text1 = useRef<HTMLDivElement>(null);
  const text2 = useRef<HTMLDivElement>(null);
  const text3 = useRef<HTMLDivElement>(null);
  const text4 = useRef<HTMLDivElement>(null);
  const text5 = useRef<HTMLDivElement>(null);
  const text6 = useRef<HTMLDivElement>(null);
  const text7 = useRef<HTMLDivElement>(null);
  const text8 = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const octagonPath = "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

  // Get industry titles from content
  const industries = siteContent.hoverTable.rows;
  
  // Map octagon indices to industry indices
  const industryMapping = [2, 3, 4, 5, 6, 7, 0, 1]; // capability-3, 4, 5, 6, 7, 8, 1, 2
  
  const titles = [
    industries[2]?.title, // capability-3 at 0° (right)
    industries[3]?.title, // capability-4 at 45° (bottom-right)
    industries[4]?.title, // capability-5 at 90° (bottom)
    industries[5]?.title, // capability-6 at 135° (bottom-left)
    industries[6]?.title, // capability-7 at 180° (left)
    industries[7]?.title, // capability-8 at 225° (top-left)
    industries[0]?.title, // capability-1 at 270° (top center)
    industries[1]?.title, // capability-2 at 315° (top-right)
  ];

  useScene(root, () => {
    if (isMobile) return; // Skip animation and pinning on mobile

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top top",
        end: "+=1000%",
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
    // Expansion rate: 9.9 scale units per 0.134 duration (10% increase from 9)
    // Hollowing rate: 0→40→42.5→43.5→44.5→46%
    // Animation completes at 0.67, leaving 0.67-1.0 to hold final frame
    
    tl
      // 0 to 0.134: Donut 1 appears as solid, begins hollowing and expanding
      .fromTo(
        donut1.current!,
        { scale: 0, opacity: 1 },
        { 
          scale: 9.9, 
          duration: 0.134, 
          ease: "none",
          onUpdate: function() {
            const progress = this.progress();
            updateGradient(donut1.current!, progress * 40);
          }
        },
        0
      )
      
      // 0.134: Donut 2 appears, both grow and hollow at SAME rate
      .set(donut2.current!, { scale: 0, opacity: 1 }, 0.134)
      .to(donut1.current!, { 
        scale: 19.8, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut1.current!, 40 + progress * 2.5);
        }
      }, 0.134)
      .to(donut2.current!, { 
        scale: 9.9, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut2.current!, progress * 40);
        }
      }, 0.134)
      
      // 0.268: Donut 3 appears, all grow and hollow at SAME rate
      .set(donut3.current!, { scale: 0, opacity: 1 }, 0.268)
      .to(donut1.current!, { 
        scale: 29.7, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut1.current!, 42.5 + progress * 1);
        }
      }, 0.268)
      .to(donut2.current!, { 
        scale: 19.8, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut2.current!, 40 + progress * 2.5);
        }
      }, 0.268)
      .to(donut3.current!, { 
        scale: 9.9, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut3.current!, progress * 40);
        }
      }, 0.268)
      
      // 0.402: Donut 4 appears, all grow and hollow at SAME rate
      .set(donut4.current!, { scale: 0, opacity: 1 }, 0.402)
      .to(donut1.current!, { 
        scale: 39.6, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut1.current!, 43.5 + progress * 1);
        }
      }, 0.402)
      .to(donut2.current!, { 
        scale: 29.7, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut2.current!, 42.5 + progress * 1);
        }
      }, 0.402)
      .to(donut3.current!, { 
        scale: 19.8, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut3.current!, 40 + progress * 2.5);
        }
      }, 0.402)
      .to(donut4.current!, { 
        scale: 9.9, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut4.current!, progress * 40);
        }
      }, 0.402)
      
      // 0.536 to 0.67: All expand off screen, becoming thinner
      .to(background.current!, { opacity: 1, duration: 0.067 }, 0.503)
      .to(donut1.current!, { 
        scale: 49.5, 
        opacity: 0, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut1.current!, 44.5 + progress * 1.5);
        }
      }, 0.536)
      .to(donut2.current!, { 
        scale: 39.6, 
        opacity: 0, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut2.current!, 43.5 + progress * 2);
        }
      }, 0.536)
      .to(donut3.current!, { 
        scale: 29.7, 
        opacity: 0, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut3.current!, 42.5 + progress * 2);
        }
      }, 0.536)
      .to(donut4.current!, { 
        scale: 19.8, 
        opacity: 0, 
        duration: 0.134, 
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          updateGradient(donut4.current!, 40 + progress * 3.5);
        }
      }, 0.536);

    // Octagon animation: cover fades out as donut4 expands, then octagons spread
    const surroundingOctagons = [
      octagon1.current,
      octagon2.current,
      octagon3.current,
      octagon4.current,
      octagon5.current,
      octagon6.current,
      octagon7.current,
      octagon8.current,
    ];

    const textLabels = [
      text1.current,
      text2.current,
      text3.current,
      text4.current,
      text5.current,
      text6.current,
      text7.current,
      text8.current,
    ];

    // Initial state: all octagons stacked behind center
    gsap.set(surroundingOctagons, { x: 0, y: 0, opacity: 1 });
    gsap.set(textLabels, { x: 0, y: 0, opacity: 0 });
    gsap.set(octagonCover.current!, { opacity: 0 });

    // Fade out cover container when last donut appears (0.402-0.536)
    tl.to(coverContainer.current!, { opacity: 0, duration: 0.134, ease: "none" }, 0.402);

    // Spread octagons and text after donuts start fading (0.536-0.67)
    const radius = 300;
    const textRadius = 450; // Text appears further out
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];

    surroundingOctagons.forEach((octagon, index) => {
      const angle = (angles[index] * Math.PI) / 180;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      tl.to(octagon, { x, y, duration: 0.134, ease: "power2.out" }, 0.536);
    });

    textLabels.forEach((text, index) => {
      const angle = (angles[index] * Math.PI) / 180;
      let x = Math.cos(angle) * textRadius;
      let y = Math.sin(angle) * textRadius;

      // Adjust X positions so inner edges are equidistant from Y-axis
      // Right side texts (0, 45, 315): left edge at +450
      // Left side texts (135, 180, 225): right edge at -450
      if (index === 0) {
        x = 450; // Right side (Health & Fitness)
      } else if (index === 1 || index === 7) {
        x = 304; // Right side, moved 25% closer to Y-axis (Government & Municipalities, Higher Education)
      } else if (index === 4) {
        x = -495; // Left side, moved 10% away from Y-axis (Security)
      } else if (index === 3 || index === 5) {
        x = -450; // Left side
      }

      // Adjust Y position for Financial Services (bottom, index 2)
      if (index === 2) {
        y = 427.5; // Moved up 5% from bottom
      }

      tl.to(text, { x, y, opacity: 1, duration: 0.134, ease: "power2.out" }, 0.536);
    });

    // Hold the final position from 0.67 to 0.7525 (forces the section to stay pinned)
    tl.to({}, { duration: 0.0825 }, 0.67);
  });

  return (
    <section ref={root} className="panel" style={{ background: "#000000", overflow: "visible" }}>
      {/* Background that reveals */}
      <div
        ref={background}
        className="desktop-animation"
        style={{
          position: "absolute",
          inset: 0,
          background: "#000000",
          opacity: 0,
          zIndex: 0,
        }}
      />

      {/* Donuts container */}
      <div
        className="desktop-animation donuts-container"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
          pointerEvents: "none",
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



      {/* Octagons - centered and stacked */}
      <div
        className="desktop-animation octagons-container"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        {/* Cover Container - hides octagons until donut hollows */}
        <div
          ref={coverContainer}
          style={{
            position: "absolute",
            width: "915px",
            height: "915px",
            background: "#000000",
            opacity: 1,
            zIndex: 7,
            pointerEvents: "none",
          }}
        />

        {/* Cover that hides octagons initially */}
        <div
          ref={octagonCover}
          style={{
            position: "absolute",
            width: "915px",
            height: "915px",
            backgroundImage: "url(/Media/Images/capability-0.jpg)",
            backgroundSize: "140%",
            backgroundPosition: "center",
            opacity: 0,
            zIndex: 6,
            pointerEvents: "none",
          }}
        />

        {/* Center Octagon (stationary) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "300px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-0.jpg)",
            backgroundSize: "140%",
            backgroundPosition: "center",
            zIndex: 5,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000000",
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                color: "#FFAD01",
                fontSize: "1.86rem",
                fontWeight: 600,
                textAlign: "center",
                margin: 0,
                padding: "1rem",
              }}
            >
              Industries
            </h3>
          </div>
        </div>

        {/* Surrounding Octagons */}
        <div
          ref={octagon1}
          onClick={() => setSelectedIndustry(0)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-3.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 4,
            cursor: "pointer",
          }}
        />
        <div
          ref={octagon2}
          onClick={() => setSelectedIndustry(1)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-4.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 4,
            cursor: "pointer",
          }}
        />
        <div
          ref={octagon3}
          onClick={() => setSelectedIndustry(2)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-5.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 4,
            cursor: "pointer",
          }}
        />
        <div
          ref={octagon4}
          onClick={() => setSelectedIndustry(3)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-6.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 4,
            cursor: "pointer",
          }}
        />
        <div
          ref={octagon5}
          onClick={() => setSelectedIndustry(4)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-7.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 4,
            cursor: "pointer",
          }}
        />
        <div
          ref={octagon6}
          onClick={() => setSelectedIndustry(5)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-8.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 4,
            cursor: "pointer",
          }}
        />
        <div
          ref={octagon7}
          onClick={() => setSelectedIndustry(6)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 4,
            cursor: "pointer",
          }}
        />
        <div
          ref={octagon8}
          onClick={() => setSelectedIndustry(7)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            clipPath: octagonPath,
            WebkitClipPath: octagonPath,
            backgroundImage: "url(/Media/Images/capability-2.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 4,
            cursor: "pointer",
          }}
        />

        {/* Text Labels */}
        <div
          ref={text1}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(0%, -50%)",
            opacity: 0,
            zIndex: 4,
            color: "#FFAD01",
            fontSize: "1.2rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            textAlign: "left",
            pointerEvents: "none",
          }}
        >
          {titles[0]}
        </div>
        <div
          ref={text2}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(0%, 0%)",
            opacity: 0,
            zIndex: 4,
            color: "#FFAD01",
            fontSize: "1.2rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            textAlign: "left",
            pointerEvents: "none",
          }}
        >
          {titles[1]}
        </div>
        <div
          ref={text3}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 0%)",
            opacity: 0,
            zIndex: 4,
            color: "#FFAD01",
            fontSize: "1.2rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {titles[2]}
        </div>
        <div
          ref={text4}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-100%, 0%)",
            opacity: 0,
            zIndex: 4,
            color: "#FFAD01",
            fontSize: "1.2rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            textAlign: "right",
            pointerEvents: "none",
          }}
        >
          {titles[3]}
        </div>
        <div
          ref={text5}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-100%, -50%)",
            opacity: 0,
            zIndex: 4,
            color: "#FFAD01",
            fontSize: "1.2rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            textAlign: "right",
            pointerEvents: "none",
          }}
        >
          {titles[4]}
        </div>
        <div
          ref={text6}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-100%, -100%)",
            opacity: 0,
            zIndex: 4,
            color: "#FFAD01",
            fontSize: "1.2rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            textAlign: "right",
            pointerEvents: "none",
          }}
        >
          {titles[5]}
        </div>
        <div
          ref={text7}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -100%)",
            opacity: 0,
            zIndex: 4,
            color: "#FFAD01",
            fontSize: "1.2rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {titles[6]}
        </div>
        <div
          ref={text8}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(0%, -100%)",
            opacity: 0,
            zIndex: 4,
            color: "#FFAD01",
            fontSize: "1.2rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            textAlign: "left",
            pointerEvents: "none",
          }}
        >
          {titles[7]}
        </div>
      </div>

      {/* Industry Detail Modal */}
      {selectedIndustry !== null && (
        <div
          onClick={() => setSelectedIndustry(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.85)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "90%",
              maxWidth: "900px",
              background: "#1a1a1a",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              border: "2px solid rgba(255, 173, 1, 0.3)",
            }}
          >
            {/* Image Section */}
            <div
              style={{
                width: "50%",
                minHeight: "400px",
                backgroundImage: `url(${industries[industryMapping[selectedIndustry]]?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            
            {/* Content Section */}
            <div
              style={{
                width: "50%",
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h3
                style={{
                  color: "#FFAD01",
                  fontSize: "2.5rem",
                  fontWeight: 600,
                  margin: "0 0 1.5rem 0",
                  lineHeight: 1.2,
                }}
              >
                {industries[industryMapping[selectedIndustry]]?.title}
              </h3>
              <p
                style={{
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  opacity: 0.9,
                  margin: 0,
                }}
              >
                {industries[industryMapping[selectedIndustry]]?.description}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedIndustry(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #FFAD01",
                background: "rgba(0, 0, 0, 0.8)",
                color: "#FFAD01",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FFAD01";
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.8)";
                e.currentTarget.style.color = "#FFAD01";
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Mobile view - Cards layout for Industries */}
      <div className="industries-mobile-view">
        <h2
          style={{
            fontSize: "2.9rem",
            margin: "0 0 2rem 0",
            color: "#FFAD01",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            textAlign: "left",
          }}
        >
          {siteContent.hoverTable.sectionTitle}
        </h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {industries.map((row, index) => (
            <div
              key={row.n}
              style={{
                padding: "1.5rem",
                background: index % 2 === 0 ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.06)",
                borderRadius: "8px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${row.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                  }}
                />
                
                {/* S.N. and Title */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ fontSize: "1.5rem", color: "#FFAD01", fontWeight: 600 }}>
                    {row.n}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                    {row.title}
                  </div>
                </div>

                {/* Description */}
                <p style={{ opacity: 0.8, lineHeight: 1.6, margin: 0, fontSize: "0.9rem" }}>
                  {row.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Desktop view - default */
        .industries-mobile-view {
          display: none;
        }

        /* Mobile view - tablets and below */
        @media (max-width: 768px) {
          /* Hide all animation elements on mobile */
          .panel {
            min-height: auto !important;
            height: auto !important;
          }

          .desktop-animation,
          .donuts-container,
          .octagons-container {
            display: none !important;
          }

          .industries-mobile-view {
            display: block;
            padding: 2rem 1rem;
            margin-top: 0;
          }

          .industries-mobile-view h2 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
