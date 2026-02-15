import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScene } from "../hooks/useScene";
import { siteContent } from "../content";

gsap.registerPlugin(ScrollTrigger);

export default function LeadershipSwap() {
  const root = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const textContent = useRef<HTMLDivElement>(null);

  const leaders = siteContent.leadership.leaders;

  useScene(root, () => {
    const isMobile = window.innerWidth <= 768;

    gsap.set(wrapper.current!, { yPercent: 0 });

    // We have 4 leaders, so 3 transitions (leader 0→1, 1→2, 2→3)
    const img1 = stack.current!.querySelector<HTMLDivElement>("[data-img='1']");
    const img2 = stack.current!.querySelector<HTMLDivElement>("[data-img='2']");
    const img3 = stack.current!.querySelector<HTMLDivElement>("[data-img='3']");

    const buildTextHTML = (index: number) => {
      return `<h2 style="font-size: 2rem; margin: 0; font-weight: 700; color: #fff;">${leaders[index].name}</h2>
              <p style="margin-top: 0.5rem; opacity: 0.6; font-size: 1rem; color: #FFAD01; font-weight: 600;">${leaders[index].title}</p>
              <p style="margin-top: 1rem; opacity: 0.8; line-height: 1.6; font-size: 1.05rem;">${leaders[index].bio}</p>`;
    };

    if (isMobile) {
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current!,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Leader 0 → 1
      mobileTl
        .to(img1!, { xPercent: -110, duration: 1, ease: "power2.inOut" }, 0.25)
        .to(textContent.current!, { opacity: 0, duration: 0.1 }, 0.65)
        .set(textContent.current!, { innerHTML: buildTextHTML(1) }, 0.75)
        .to(textContent.current!, { opacity: 1, duration: 0.1 }, 0.75)
        // Leader 1 → 2
        .to(img2!, { xPercent: -110, duration: 1, ease: "power2.inOut" }, 1.25)
        .to(textContent.current!, { opacity: 0, duration: 0.1 }, 1.65)
        .set(textContent.current!, { innerHTML: buildTextHTML(2) }, 1.75)
        .to(textContent.current!, { opacity: 1, duration: 0.1 }, 1.75)
        // Leader 2 → 3
        .to(img3!, { xPercent: -110, duration: 1, ease: "power2.inOut" }, 2.25)
        .to(textContent.current!, { opacity: 0, duration: 0.1 }, 2.65)
        .set(textContent.current!, { innerHTML: buildTextHTML(3) }, 2.75)
        .to(textContent.current!, { opacity: 1, duration: 0.1 }, 2.75);

      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current!,
        start: "top top",
        end: "+=350%",
        scrub: 0.8,
        pin: true,
        pinSpacing: true,
      },
    });

    // Leader 0 → 1
    tl.to(img1!, { xPercent: -110, duration: 1, ease: "power2.inOut" }, 0.25)
      .to(textContent.current!, { opacity: 0, duration: 0.1, ease: "power2.inOut" }, 0.65)
      .set(textContent.current!, { innerHTML: buildTextHTML(1) }, 0.75)
      .to(textContent.current!, { opacity: 1, duration: 0.1, ease: "power2.inOut" }, 0.75)
      // Leader 1 → 2
      .to(img2!, { xPercent: -110, duration: 1, ease: "power2.inOut" }, 1.25)
      .to(textContent.current!, { opacity: 0, duration: 0.1, ease: "power2.inOut" }, 1.65)
      .set(textContent.current!, { innerHTML: buildTextHTML(2) }, 1.75)
      .to(textContent.current!, { opacity: 1, duration: 0.1, ease: "power2.inOut" }, 1.75)
      // Leader 2 → 3
      .to(img3!, { xPercent: -110, duration: 1, ease: "power2.inOut" }, 2.25)
      .to(textContent.current!, { opacity: 0, duration: 0.1, ease: "power2.inOut" }, 2.65)
      .set(textContent.current!, { innerHTML: buildTextHTML(3) }, 2.75)
      .to(textContent.current!, { opacity: 1, duration: 0.1, ease: "power2.inOut" }, 2.75);
  });

  return (
    <section ref={root} className="panel" id="leadershipSwap-section">
      <div
        ref={wrapper}
        style={{ position: "absolute", inset: 0, display: "flex" }}
      >
        {/* Section Title - top left */}
        <h2
          className="section-title"
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            fontSize: "2.9rem",
            margin: 0,
            color: "#FFAD01",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            zIndex: 100,
            textAlign: "left",
          }}
        >
          {siteContent.leadership.sectionTitle}
        </h2>

        {/* Left side - Stacked leader images */}
        <div
          style={{ flex: 1, position: "relative", background: "#000" }}
        >
          <div ref={stack} style={{ position: "absolute", inset: 0 }}>
            {/* Bottom layer - leader 4 (always visible) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${leaders[3].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                zIndex: 1,
              }}
            />
            {/* Layer 3 - leader 3 */}
            <div
              data-img="3"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${leaders[2].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                zIndex: 2,
              }}
            />
            {/* Layer 2 - leader 2 */}
            <div
              data-img="2"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${leaders[1].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                zIndex: 3,
              }}
            />
            {/* Layer 1 - leader 1 (top) */}
            <div
              data-img="1"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${leaders[0].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                zIndex: 4,
              }}
            />
          </div>
        </div>

        {/* Right side - Text content */}
        <div
          style={{
            flex: 1,
            background: "#14141a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem",
          }}
        >
          <div ref={textContent} style={{ maxWidth: "500px" }}>
            <h2
              style={{
                fontSize: "2rem",
                margin: 0,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {leaders[0].name}
            </h2>
            <p
              style={{
                marginTop: "0.5rem",
                opacity: 0.6,
                fontSize: "1rem",
                color: "#FFAD01",
                fontWeight: 600,
              }}
            >
              {leaders[0].title}
            </p>
            <p
              style={{
                marginTop: "1rem",
                opacity: 0.8,
                lineHeight: 1.6,
                fontSize: "1.05rem",
              }}
            >
              {leaders[0].bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
