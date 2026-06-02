import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-400/10 backdrop-blur-sm sm:flex"
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "rgba(34, 211, 238, 0.2)" : "rgba(34, 211, 238, 0.05)",
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="h-1 w-1 rounded-full bg-cyan-400"
          animate={{
            scale: isHovered ? 0 : 1,
          }}
        />
      </motion.div>
    </>
  );
}
