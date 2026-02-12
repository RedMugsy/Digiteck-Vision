import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function JobDetails() {
  const { jobId } = useParams();
  const root = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("careers");
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    // Find the job by ID
    const foundJob = siteContent.careers.openings.positions.find(
      (position) => position.id === jobId
    );
    setJob(foundJob);
  }, [jobId]);

  useScene(root, () => {
    gsap.fromTo(root.current!, 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1,
        scrollTrigger: {
          trigger: root.current!,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        }
      }
    );
  });

  if (!job) {
    return (
      <div style={{ background: "#0A0A0A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#E0E0E0", fontSize: "1.2rem" }}>Job not found</p>
      </div>
    );
  }

  return (
    <section 
      ref={root} 
      className="panel" 
      style={{ 
        background: "#0A0A0A", 
        minHeight: "100vh",
        height: "auto",
        position: "relative",
        paddingBottom: "2rem"
      }}
    >
      {/* Left-aligned design element ON TOP of section background - Desktop only */}
      <div
        className="job-details-design-element"
        style={{
          position: "absolute",
          left: "15%",
          top: 0,
          height: "100%",
          width: "150px",
          backgroundImage: "url('/Media/Images/careers background design element.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          zIndex: 2,
          opacity: 0.6,
          display: window.innerWidth <= 768 ? "none" : "block",
          pointerEvents: "none"
        }}
      />
      {/* Minimalist menu overlay */}
      <div className="nav">
        <div className="navLeft">
        </div>
        <div className="navLinks">
          <a href="/" className={activeSection === "home" ? "active" : ""} onClick={() => setActiveSection("home")}>Home</a>
          <a href="/about" className={activeSection === "about" ? "active" : ""} onClick={() => setActiveSection("about")}>About Us</a>
          <a href="/solutions" className={activeSection === "solutions" ? "active" : ""} onClick={() => setActiveSection("solutions")}>Solutions</a>
          <a href="/contact" className={activeSection === "contact" ? "active" : ""} onClick={() => setActiveSection("contact")}>Contact</a>
          <a href="/careers" className={activeSection === "careers" ? "active" : ""} onClick={() => setActiveSection("careers")}>Careers</a>
        </div>

        {/* Hamburger menu button - shown on mobile/tablet */}
        <button
          className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ display: 'none' }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(11, 11, 15, 0.98)',
            backdropFilter: 'blur(10px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '3rem',
          }}
        >
          <a href="/" style={{ color: '#fff', textDecoration: 'none', padding: '1rem 0', fontSize: '1.2rem' }}>Home</a>
          <a href="/about" style={{ color: '#fff', textDecoration: 'none', padding: '1rem 0', fontSize: '1.2rem' }}>About Us</a>
          <a href="/solutions" style={{ color: '#fff', textDecoration: 'none', padding: '1rem 0', fontSize: '1.2rem' }}>Solutions</a>
          <a href="/contact" style={{ color: '#fff', textDecoration: 'none', padding: '1rem 0', fontSize: '1.2rem' }}>Contact</a>
          <a href="/careers" style={{ color: '#FFAD01', textDecoration: 'none', padding: '1rem 0', fontSize: '1.2rem' }}>Careers</a>
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "8rem 4rem 6rem",
          color: "#E0E0E0",
          position: "relative",
          zIndex: 3
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: "#FFAD01",
              margin: "0 0 1rem 0",
              lineHeight: 1.1
            }}
          >
            {job.role}
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: window.innerWidth <= 768 ? "1fr" : "repeat(3, 1fr)",
              gap: "2rem",
              marginBottom: "2rem"
            }}
          >
            <div>
              <strong style={{ color: "#FFAD01" }}>Job Reference No.:</strong><br />
              {job.jobRef}
            </div>
            <div>
              <strong style={{ color: "#FFAD01" }}>Date Listed:</strong><br />
              {new Date(job.dateListed).toLocaleDateString()}
            </div>
            <div>
              <strong style={{ color: "#FFAD01" }}>Closing Date:</strong><br />
              {new Date(job.closingDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Job Details Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth <= 768 ? "1fr" : "1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem"
          }}
        >
          {/* Left Column */}
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#FFAD01", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Job Type</h3>
              <p style={{ margin: 0, fontSize: "1rem" }}>{job.type}</p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#FFAD01", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Job Location</h3>
              <p style={{ margin: 0, fontSize: "1rem" }}>{job.location}</p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#FFAD01", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Department</h3>
              <p style={{ margin: 0, fontSize: "1rem" }}>{job.department}</p>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#FFAD01", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Reporting to</h3>
              <p style={{ margin: 0, fontSize: "1rem" }}>{job.reportingTo}</p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#FFAD01", fontSize: "1.2rem", marginBottom: "0.5rem" }}>No. of Reportees</h3>
              <p style={{ margin: 0, fontSize: "1rem" }}>{job.numberOfReportees}</p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div style={{ marginBottom: "3rem" }}>
          <h3 style={{ color: "#FFAD01", fontSize: "1.4rem", marginBottom: "1rem" }}>Job Description</h3>
          <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.6 }}>{job.jobDescription}</p>
        </div>

        {/* Candidate Requirements */}
        <div style={{ marginBottom: "3rem" }}>
          <h3 style={{ color: "#FFAD01", fontSize: "1.4rem", marginBottom: "1rem" }}>Person Specification / Candidate Requirements</h3>
          <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.6 }}>{job.candidateRequirements}</p>
        </div>

        {/* Apply Button */}
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <button
            style={{
              background: "#FFAD01",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              padding: "1.5rem 3rem",
              fontSize: "1.1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.3s ease"
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
              // Handle application submission
              alert("Application functionality would be implemented here");
            }}
          >
            SUBMIT APPLICATION
          </button>
        </div>

        {/* Back to Careers */}
        <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "2rem" }}>
          <a
            href="/careers"
            style={{
              color: "#FFAD01",
              textDecoration: "none",
              fontSize: "1rem",
              borderBottom: "1px solid #FFAD01"
            }}
          >
            ← Back to Careers
          </a>
        </div>
      </div>
    </section>
  );
}