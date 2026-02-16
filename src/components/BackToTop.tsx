import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#FFAD01",
        color: "#000",
        border: "none",
        cursor: "pointer",
        display: isVisible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        fontWeight: "bold",
        boxShadow: "0 4px 12px rgba(255, 173, 1, 0.4)",
        transition: "all 0.3s ease",
        zIndex: 1000,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#C08200";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 173, 1, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#FFAD01";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 173, 1, 0.4)";
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
