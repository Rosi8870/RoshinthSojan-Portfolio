import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeSequence({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cinematic "Aura Singularity" Timeline
    const t1 = setTimeout(() => setPhase(1), 1800); // Orbs converge to singularity
    const t2 = setTimeout(() => setPhase(2), 2400); // Singularity explodes (hole expands)
    const t3 = setTimeout(() => setIsVisible(false), 3800); // Cleanup phase
    const t4 = setTimeout(() => onDone(), 4000); // Unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed -inset-10 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
          
          {/* The Expanding Hole Mask (reveals the website underneath) */}
          <motion.div
            className="absolute rounded-full"
            style={{
              boxShadow: "0 0 0 5000px #030303", // Pitch black screen built out of a shadow
              background: "transparent",
            }}
            initial={{ width: 0, height: 0 }}
            animate={
              phase === 2 
                ? { width: "300vmax", height: "300vmax", opacity: 0 } 
                : { width: 0, height: 0, opacity: 1 }
            }
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Glowing Aura Orbs */}
          <AnimatePresence>
            {phase < 2 && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center filter blur-[60px] sm:blur-[100px] mix-blend-screen"
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.1 }}
              >
                {/* Cyan Orb */}
                <motion.div
                  className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500 rounded-full"
                  initial={{ x: "-50%", y: "-50%", scale: 0.8 }}
                  animate={
                    phase === 1 
                      ? { x: 0, y: 0, scale: 0.1, backgroundColor: "#ffffff" }
                      : { x: ["-50%", "-10%", "-30%"], y: ["-50%", "10%", "-20%"], scale: [0.8, 1.2, 1] }
                  }
                  transition={
                    phase === 1 
                      ? { duration: 0.6, ease: "anticipate" } 
                      : { duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                  }
                />
                
                {/* Magenta Orb */}
                <motion.div
                  className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-fuchsia-600 rounded-full"
                  initial={{ x: "50%", y: "40%", scale: 1 }}
                  animate={
                    phase === 1 
                      ? { x: 0, y: 0, scale: 0.1, backgroundColor: "#ffffff" }
                      : { x: ["50%", "20%", "40%"], y: ["40%", "-10%", "20%"], scale: [1, 0.8, 1.1] }
                  }
                  transition={
                    phase === 1 
                      ? { duration: 0.6, ease: "anticipate" } 
                      : { duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                  }
                />

                {/* Violet Orb */}
                <motion.div
                  className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-violet-600 rounded-full"
                  initial={{ x: "10%", y: "-60%", scale: 0.9 }}
                  animate={
                    phase === 1 
                      ? { x: 0, y: 0, scale: 0.1, backgroundColor: "#ffffff" }
                      : { x: ["10%", "-20%", "10%"], y: ["-60%", "30%", "-20%"], scale: [0.9, 1.3, 0.9] }
                  }
                  transition={
                    phase === 1 
                      ? { duration: 0.6, ease: "anticipate" } 
                      : { duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* High-Tech Shockwave on Explosion */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                className="absolute border-[2px] sm:border-[4px] border-white rounded-full"
                initial={{ width: 0, height: 0, opacity: 1 }}
                animate={{ width: "200vmax", height: "200vmax", opacity: 0, borderWidth: "0px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* Microscopic Premium Text */}
          <AnimatePresence>
            {phase < 2 && (
              <motion.div
                className="absolute bottom-12 text-white/40 font-mono text-[10px] sm:text-xs tracking-[0.5em] sm:tracking-[1em] uppercase"
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                Synthesizing Experience
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </AnimatePresence>
  );
}
