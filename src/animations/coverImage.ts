import gsap from "gsap";
import { animateOnSnap } from "./_animateOnSnap";

export function coverImageScene(
  section: HTMLElement,
  imageLayer: HTMLElement,
  panel: HTMLElement
) {
  gsap.set(imageLayer, { yPercent: 100 });
  gsap.set(panel, { xPercent: 100 });

  const tl = gsap.timeline({ paused: true });

  tl.to(imageLayer, {
    yPercent: 0,
    duration: 0.8,
    ease: "power3.out"
  })
  .to(panel, {
    xPercent: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.3");

  animateOnSnap(section, tl);
}
