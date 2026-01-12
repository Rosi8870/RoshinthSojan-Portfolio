import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CertificateModal({
  certs,
  index,
  setIndex,
  onClose,
}) {
  if (!certs || !certs[index]) return null;

  const total = certs.length;
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const touchX = useRef(0);

  /* ✅ AUTO SLIDESHOW */
  useEffect(() => {
    if (paused) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 3500);

    return () => clearInterval(timerRef.current);
  }, [paused, total, setIndex]);

  /* ✅ KEYBOARD */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setPaused(true);
        setIndex((i) => (i + 1) % total);
      }
      if (e.key === "ArrowLeft") {
        setPaused(true);
        setIndex((i) => (i - 1 + total) % total);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, setIndex, onClose]);

  /* ✅ SWIPE (MOBILE) */
  const start = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const end = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 60) setIndex((i) => (i - 1 + total) % total);
    if (dx < -60) setIndex((i) => (i + 1) % total);
    setTimeout(() => setPaused(false), 2000);
  };

  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={start}
        onTouchEnd={end}
        initial={{ scale: 0.92, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 22 }}
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-3xl border border-white/10 bg-black"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={certs[index].id}
            src={certs[index].Img}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>

        {/* CONTROLS */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"
        >
          <X />
        </button>

        <button
          onClick={() => {
            setPaused(true);
            setIndex((i) => (i - 1 + total) % total);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => {
            setPaused(true);
            setIndex((i) => (i + 1) % total);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20"
        >
          <ChevronRight />
        </button>

        {/* COUNTER */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60">
          {index + 1} / {total} {paused && "• paused"}
        </div>
      </motion.div>
    </motion.div>
  );
}
