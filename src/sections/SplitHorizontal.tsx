import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";

gsap.registerPlugin(ScrollTrigger);

export default function SplitHorizontal() {
  const root = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);

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

    // split horizontally then move opposite vertically
    tl.fromTo(top.current!, { yPercent: 0 }, { yPercent: -20, ease: "none" }, 0);
    tl.fromTo(bottom.current!, { yPercent: 0 }, { yPercent: 20, ease: "none" }, 0);
  });

  return (
    <section ref={root} className="panel">
      <div className="split twoRows">
        <div ref={top} className="pane">
          <div
            className="paneBg"
            style={{ backgroundImage: "url(/media/images/split-h.jpg)" }}
          />
          <div className="paneContent left">
            <div className="cardText">
              <h2>Top moves up</h2>
              <p>New picture appears with text left.</p>
            </div>
          </div>
        </div>

        <div ref={bottom} className="pane">
          <div
            className="paneBg"
            style={{ backgroundImage: "url(/media/images/split-h.jpg)" }}
          />
          <div className="paneContent right">
            <div className="cardText">
              <h2>Bottom moves down</h2>
              <p>Opposing motion on scroll.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
