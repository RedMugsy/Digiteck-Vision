import React from "react";
import ReactDOM from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import App from "./App";
import "./App.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global GSAP configuration for smoother animations
gsap.defaults({
  ease: "power2.out",
  duration: 0.8,
  force3D: true,
});

// Configure ScrollTrigger for smoother scrubbing
ScrollTrigger.defaults({
  // Use a number for scrub to add smoothing (1 = 1 second lag for smooth catch-up)
  // This will be overridden in individual components if needed
});

// Optimize ScrollTrigger performance
ScrollTrigger.config({
  // Reduces scroll listener frequency for smoother performance
  limitCallbacks: true,
  // Sync with RAF for smoother updates
  syncInterval: 40,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
