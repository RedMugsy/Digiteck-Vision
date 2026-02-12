import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function CareersOpenings() {
  const root = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    <section 
      ref={root} 
      className="panel careers-openings-panel" 
      style={{ 
        background: "#0A0A0A", 
        padding: "8rem 4rem", 
        overflow: "visible !important" as any,
        height: "auto",
        minHeight: "100vh"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          overflow: "visible !important" as any
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: 700,
            color: "#FFAD01",
            margin: "0 0 4rem 0"
          }}
        >
          {siteContent.careers.openings.title}
        </h2>

        {/* Job Listings */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
          }}
        >
          {siteContent.careers.openings.positions.map((position, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: window.innerWidth <= 768 ? "1fr" : "150px 200px 120px 1fr 150px",
                gap: "2rem",
                alignItems: "flex-start",
                paddingBottom: "2rem",
                borderBottom: index < siteContent.careers.openings.positions.length - 1 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                overflow: "visible"
              }}
            >
              {/* Location */}
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    color: "#FFAD01",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem"
                  }}
                >
                  Location:
                </div>
                <div
                  style={{
                    color: "#E0E0E0",
                    fontSize: "1rem"
                  }}
                >
                  {position.location}
                </div>
              </div>

              {/* Role */}
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    color: "#E0E0E0",
                    fontSize: "1.2rem",
                    fontWeight: 700
                  }}
                >
                  {position.role}
                </div>
              </div>

              {/* Type */}
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    color: "#FFAD01",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem"
                  }}
                >
                  Type:
                </div>
                <div
                  style={{
                    color: "#E0E0E0",
                    fontSize: "1rem"
                  }}
                >
                  {position.type}
                </div>
              </div>

              {/* Description */}
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    color: "#B0B0B0",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {position.description}
                </p>
              </div>

              {/* Apply Button */}
              <div style={{ textAlign: "right", minWidth: "150px", overflow: "visible" }}>
                <button
                  style={{
                    background: "#FFAD01",
                    color: "#000",
                    border: "none",
                    borderRadius: "50px", 
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    minWidth: "120px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#FF9500";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFAD01";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() => {
                    // Navigate to job details page
                    navigate(`/job-details/${position.id}`);
                  }}
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}