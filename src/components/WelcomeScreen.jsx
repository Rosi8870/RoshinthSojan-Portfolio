import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function IntentPause({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[9999] pointer-events-none"
      >
        {/* Blur layer */}
        <motion.div
          initial={{ backdropFilter: "blur(8px)", opacity: 1 }}
          exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-black/20"
        />

        {/* Editor-style hint */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute bottom-8 left-8 text-xs font-mono tracking-wide text-cyan-400"
        >
          // crafting interfaces with intent
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
