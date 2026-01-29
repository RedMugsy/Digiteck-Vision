import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { img: "/Media/Images/swap-1.jpg", title: "Data Intelligence", body: "Advanced analytics for smarter decisions." },
  { img: "/Media/Images/swap-2.jpg", title: "Market Insights", body: "Real-time market intelligence at your fingertips." },
  { img: "/Media/Images/swap-3.jpg", title: "Strategic Edge", body: "Turn insights into competitive advantage." }
];

export default function ImageSwap() {
  const root = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const textContent = useRef<HTMLDivElement>(null);

  useScene(root, () => {
    // Roll up transition
    const coverTl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top bottom",
        end: "top top",
        scrub: 0.8, // Smooth scrubbing with 0.8s lag
      },
    });

    coverTl.fromTo(
      wrapper.current!,
      { yPercent: 100 },
      { yPercent: 0, ease: "power2.inOut" }
    );

    // Image swap animation
    const img1 = stack.current!.querySelector<HTMLDivElement>("[data-img='1']");
    const img2 = stack.current!.querySelector<HTMLDivElement>("[data-img='2']");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top top",
        end: "+=250%",
        scrub: 0.8, // Smooth scrubbing with 0.8s lag
        pin: true,
        pinSpacing: true,
      }
    });

    // First image (swap-1) slides at 25%, completes at 1.25
    tl.to(img1!, { xPercent: -110, duration: 1, ease: "power2.inOut" }, 0.25)
      .to(textContent.current!, { opacity: 0, duration: 0.1, ease: "power2.inOut" }, 1.1)
      .set(textContent.current!, { innerHTML: `<h2>${slides[1].title}</h2><p>${slides[1].body}</p>` })
      .to(textContent.current!, { opacity: 1, duration: 0.1, ease: "power2.inOut" })
      // Second image (swap-2) slides AFTER img1 completes (at 1.25), completes at 2.25
      .to(img2!, { xPercent: -110, duration: 1, ease: "power2.inOut" }, 1.25)
      .to(textContent.current!, { opacity: 0, duration: 0.1, ease: "power2.inOut" }, 2.1)
      .set(textContent.current!, { innerHTML: `<h2>${slides[2].title}</h2><p>${slides[2].body}</p>` })
      .to(textContent.current!, { opacity: 1, duration: 0.1, ease: "power2.inOut" });
  });

  return (
    <section ref={root} className="panel" id="imageSwap-section">
      <div ref={wrapper} className="imageSwap-wrapper" style={{ position: "absolute", inset: 0, display: "flex" }}>
        {/* Section Title - top right */}
        <h2
          className="imageSwap-title"
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            fontSize: "2.9rem",
            margin: 0,
            color: "#FFAD01",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            zIndex: 10,
          }}
        >
          {siteContent.imageSwap.sectionTitle}
        </h2>

        <div className="imageSwap-images" style={{ flex: 1, position: "relative", background: "#000" }}>
          <div ref={stack} style={{ position: "absolute", inset: 0 }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/Media/Images/swap-3.jpg)", backgroundSize: "cover", backgroundPosition: "center", zIndex: 1 }} />
            <div data-img="2" style={{ position: "absolute", inset: 0, backgroundImage: "url(/Media/Images/swap-2.jpg)", backgroundSize: "cover", backgroundPosition: "center", zIndex: 2 }} />
            <div data-img="1" style={{ position: "absolute", inset: 0, backgroundImage: "url(/Media/Images/swap-1.jpg)", backgroundSize: "cover", backgroundPosition: "center", zIndex: 3 }} />
          </div>
        </div>

        <div className="imageSwap-text" style={{ flex: 1, background: "#14141a", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem" }}>
          <div ref={textContent} style={{ maxWidth: "500px" }}>
            <h2>{slides[0].title}</h2>
            <p style={{ marginTop: "1rem", opacity: 0.8 }}>{slides[0].body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
