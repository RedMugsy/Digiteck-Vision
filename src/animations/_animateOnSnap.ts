import gsap from "gsap";

const ioMap = new WeakMap<Element, IntersectionObserver>();

/**
 * Plays a timeline when its section becomes the active snapped section.
 * Uses IntersectionObserver so it works with CSS scroll-snap.
 */
export function animateOnSnap(section: Element, tl: gsap.core.Timeline) {
  // Kill any previous observer for this section (dev HMR safe)
  const prev = ioMap.get(section);
  if (prev) prev.disconnect();

  const io = new IntersectionObserver(
    ([entry]) => {
      // When the section is mostly in view, play
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        tl.play();
      } else {
        // optional: reset when leaving
        tl.pause(0);
      }
    },
    {
      threshold: [0, 0.25, 0.6, 0.9, 1]
    }
  );

  io.observe(section);
  ioMap.set(section, io);

  return () => {
    io.disconnect();
    ioMap.delete(section);
    tl.kill();
  };
}
