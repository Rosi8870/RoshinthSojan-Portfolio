import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,              // lower = more responsive
      duration: 0.9,           // keep under 1
      smoothWheel: true,
      smoothTouch: false,      // IMPORTANT: disables lag on mobile
      wheelMultiplier: 1.2,    // mouse responsiveness
      touchMultiplier: 1,
      infinite: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  return children;
}
