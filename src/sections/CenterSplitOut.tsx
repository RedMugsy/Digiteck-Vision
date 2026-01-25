import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";

gsap.registerPlugin(ScrollTrigger);

export default function CenterSplitOut() {
  const root = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top top",
        end: "+=110%",
        scrub: true,
        pin: true
      }
    });

    // dissolve text while halves swipe out
    tl.to(text.current!, { opacity: 0, ease: "none" }, 0.25);
    tl.to(left.current!, { xPercent: -120, ease: "none" }, 0.35);
    tl.to(right.current!, { xPercent: 120, ease: "none" }, 0.35);
  });

  return (
    <section ref={root} className="panel">
      {/* base image */}
      <div
        className="paneBg"
        style={{ backgroundImage: "url(/media/images/center-1.jpg)" }}
      />

      {/* split halves overlay */}
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div ref={left} className="pane">
          <div
            className="paneBg"
            style={{ backgroundImage: "url(/media/images/center-2.jpg)" }}
          />
        </div>
        <div ref={right} className="pane">
          <div
            className="paneBg"
            style={{ backgroundImage: "url(/media/images/center-2.jpg)" }}
          />
        </div>
      </div>

      <div
        ref={text}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="cardText">
          <h2>Center text dissolves</h2>
          <p>Then the image splits vertically and both halves swipe out.</p>
        </div>
      </div>
    </section>
  );
}
