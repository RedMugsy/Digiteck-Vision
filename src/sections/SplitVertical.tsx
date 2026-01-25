import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";

gsap.registerPlugin(ScrollTrigger);

export default function SplitVertical() {
  const root = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true
      }
    });

    // Split into two and move opposite horizontally
    tl.fromTo(left.current!, { xPercent: 0 }, { xPercent: -20, ease: "none" }, 0);
    tl.fromTo(right.current!, { xPercent: 0 }, { xPercent: 20, ease: "none" }, 0);
  });

  return (
    <section ref={root} className="panel">
      <div className="split twoCols">
        <div ref={left} className="pane">
          <div
            className="paneBg"
            style={{ backgroundImage: "url(/media/images/split-v.jpg)" }}
          />
          <div className="paneContent left">
            <div className="cardText">
              <h2>Left half moves left</h2>
              <p>Vertical split. Left pane drifts left while right drifts right.</p>
            </div>
          </div>
        </div>

        <div ref={right} className="pane">
          <div className="paneSolid" />
          <div className="paneContent right">
            <div className="cardText solid">
              <h2>Right half moves right</h2>
              <p>Text box moves with the pane it belongs to.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
