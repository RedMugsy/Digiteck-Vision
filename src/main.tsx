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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
