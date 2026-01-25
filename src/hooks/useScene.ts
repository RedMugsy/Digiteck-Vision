import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mount-only helper: runs a GSAP/ScrollTrigger scene for a section.
 * Auto-kills triggers/tweens created in this scope on unmount.
 */
export function useScene(
  ref: React.RefObject<HTMLElement | null>,
  build: () => void
) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      build();
      ScrollTrigger.refresh();
    }, ref);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
