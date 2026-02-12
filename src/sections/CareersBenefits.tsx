import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function CareersBenefits() {
  const root = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    gsap.fromTo(root.current!, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: root.current!,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        }
      }
    );
  });

  return (
    <section ref={root} className="panel" style={{ background: "#0A0A0A", padding: "8rem 0" }}>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 4rem",
          display: "grid",
          gridTemplateColumns: window.innerWidth <= 768 ? "1fr" : "1fr 1fr",
          gap: "4rem",
          alignItems: "flex-start"
        }}
      >
        {/* Left Side - Title (aligned with Hero title) */}
        <div>
          <h2
            style={{
              fontSize: window.innerWidth <= 768 ? "2.5rem" : "3.5rem",
              fontWeight: 700,
              color: "#FFAD01",
              margin: 0,
              lineHeight: 1.1
            }}
          >
            {siteContent.careers.benefits.title}
          </h2>
        </div>

        {/* Right Side - Benefits List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}
        >
          {siteContent.careers.benefits.items.map((benefit, index) => (
            <div
              key={index}
              style={{
                color: "#E0E0E0",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                paddingLeft: "1rem",
                borderLeft: "2px solid #FFAD01"
              }}
            >
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}