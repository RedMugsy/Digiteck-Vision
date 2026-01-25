import gsap from "gsap";
import { animateOnSnap } from "./_animateOnSnap";

export function coverSolidScene(section: HTMLElement, panel: HTMLElement) {
  gsap.set(panel, { yPercent: 100 });

  const tl = gsap.timeline({ paused: true });
  tl.to(panel, { yPercent: 0, duration: 0.9, ease: "power3.out" });

  animateOnSnap(section, tl);
}
