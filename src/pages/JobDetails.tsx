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

  const handleApplyClick = () => {
    if (!job) return;
    
    const subject = `I'd like to apply to job reference number: ${job.jobRef}`;
    const body = `Dear HR,
[insert your message here]


Note to user: Ensure you have attached your CV and optionally you may include the Cover Letter and any other supporting documents you many need.`;
    
    const mailtoLink = `mailto:info@digiteckvision.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

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
      <div style={{ 
        background: "#000000", 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        position: "relative"
      }}>
        {/* Background image with gradient opacity */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('/Media/Images/jobsbackground.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            mask: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.5) 100%)",
            WebkitMask: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.5) 100%)",
            zIndex: 0,
            pointerEvents: "none"
          }}
        />
        {/* Black to yellow gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #000000 0%, #CC8A00 100%)",
            opacity: 0.7,
            zIndex: 1,
            pointerEvents: "none"
          }}
        />
        {/* Dark overlay with opacity gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 100%)",
            zIndex: 2,
            pointerEvents: "none"
          }}
        />
        <p style={{ color: "#E0E0E0", fontSize: "1.2rem", position: "relative", zIndex: 3 }}>Job not found</p>
      </div>
    );
  }

  return (
    <section 
      ref={root} 
      className="panel" 
      style={{ 
        background: "#000000", 
        minHeight: "100vh",
        height: "auto",
        position: "relative",
        paddingBottom: "2rem"
      }}
    >
      {/* Background image with gradient opacity */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/Media/Images/jobsbackground.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          mask: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.5) 100%)",
          WebkitMask: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.5) 100%)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      {/* Black to yellow gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, #000000 0%, #CC8A00 100%)",
          opacity: 0.7,
          zIndex: 1,
          pointerEvents: "none"
        }}
      />
      {/* Dark overlay with opacity gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 100%)",
          zIndex: 2,
          pointerEvents: "none"
        }}
      />
      {/* Minimalist menu overlay */}
      <div className="nav">
        <div className="navLeft">
          <div className="logoDot" />
          <span style={{ fontSize: "15.7px", fontWeight: 600 }}>Digiteck Vision</span>
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
          <a href="/" style={{ color: '#fff', textDecoration: 'none', padding: '1rem 0', fontSize: '1.34rem' }}>Home</a>
          <a href="/about" style={{ color: '#fff', textDecoration: 'none', padding: '1rem 0', fontSize: '1.34rem' }}>About Us</a>
          <a href="/solutions" style={{ color: '#fff', textDecoration: 'none', padding: '1rem 0', fontSize: '1.34rem' }}>Solutions</a>
          <a href="/contact" style={{ color: '#fff', textDecoration: 'none', padding: '1rem 0', fontSize: '1.34rem' }}>Contact</a>
          <a href="/careers" style={{ color: '#FFAD01', textDecoration: 'none', padding: '1rem 0', fontSize: '1.34rem' }}>Careers</a>
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: window.innerWidth <= 768 ? "8rem 4rem 6rem 2rem" : "8rem 4rem 6rem",
          color: "#E0E0E0",
          position: "relative",
          zIndex: 4
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
          
          {/* Apply Now Button under title */}
          <div style={{ marginBottom: "2rem" }}>
            <button
              style={{
                background: "#FFAD01",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                padding: "0.8rem 2rem",
                fontSize: "1rem",
                fontWeight: 600,
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
              onClick={handleApplyClick}
            >
              APPLY NOW
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: window.innerWidth <= 768 ? "repeat(2, minmax(200px, 1fr))" : "repeat(3, 1fr)",
              gap: window.innerWidth <= 768 ? "0.3rem" : "1rem",
              marginBottom: "2rem"
            }}
          >
            <div>
              <strong style={{ color: "#FFFFFF" }}>Job Reference No.:</strong><br />
              {job.jobRef}
            </div>
            <div>
              <strong style={{ color: "#FFFFFF" }}>Status:</strong><br />
              Active
            </div>
            {window.innerWidth > 768 && <div></div>}
            
            <div>
              <strong style={{ color: "#FFFFFF" }}>Date Listed:</strong><br />
              {new Date(job.dateListed).toLocaleDateString()}
            </div>
            <div>
              <strong style={{ color: "#FFFFFF" }}>Closing Date:</strong><br />
              {new Date(job.closingDate).toLocaleDateString()}
            </div>
            {window.innerWidth > 768 && <div></div>}
          </div>
        </div>

        {/* Job Details Grid - 2 rows x 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth <= 768 ? "repeat(2, minmax(200px, 1fr))" : "repeat(3, 1fr)",
            gap: window.innerWidth <= 768 ? "0.5rem" : "1rem",
            marginBottom: "3rem"
          }}
        >
          {/* Column 1 - Row 1: Job Type */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Job Type</h3>
            <p style={{ margin: 0, fontSize: "1rem" }}>{job.type}</p>
          </div>

          {/* Column 2 - Row 1: Work Model */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Work Model</h3>
            <p style={{ margin: 0, fontSize: "1rem" }}>{job.workModel}</p>
          </div>

          {/* Column 3 - Row 1: Location */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Location</h3>
            <p style={{ margin: 0, fontSize: "1rem" }}>{job.location}</p>
          </div>

          {/* Column 1 - Row 2: Department */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Department</h3>
            <p style={{ margin: 0, fontSize: "1rem" }}>{job.department}</p>
          </div>

          {/* Column 2 - Row 2: Reporting to */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Reporting to</h3>
            <p style={{ margin: 0, fontSize: "1rem" }}>{job.reportingTo}</p>
          </div>

          {/* Column 3 - Row 2: No. of Reportees */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "0.5rem" }}>No. of Reportees</h3>
            <p style={{ margin: 0, fontSize: "1rem" }}>{job.numberOfReportees}</p>
          </div>
        </div>

        {/* Job Description */}
        <div style={{ marginBottom: "3rem" }}>
          <h3 style={{ color: "#FFFFFF", fontSize: "1.4rem", marginBottom: "1rem" }}>Job Description</h3>
          <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.6 }}>{job.jobDescription}</p>
        </div>

        {/* Candidate Requirements */}
        <div style={{ marginBottom: "3rem" }}>
          <h3 style={{ color: "#FFFFFF", fontSize: "1.4rem", marginBottom: "1rem" }}>Person Specification / Candidate Requirements</h3>
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
            onClick={handleApplyClick}
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