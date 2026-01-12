import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useRef } from "react";

/* ================= MAGNETIC BUTTON ================= */
function MagneticButton({ children, onClick, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x, y }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ================= WAVE TEXT ================= */
function WaveText({ text }) {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: i * 0.05,
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ================= HERO ================= */
export default function Hero() {
  const [role] = useTypewriter({
    words: [
      "React Developer",
      "Frontend Engineer",
      "UI Animation Specialist",
      "Creative Web Builder",
    ],
    loop: true,
    delaySpeed: 1800,
    typeSpeed: 70,
    deleteSpeed: 40,
  });

  /* Parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home"
      className="hero relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[200px]" />
      </div>

      <motion.div
        style={{ rotateX, rotateY }}
        className="mx-auto max-w-5xl px-6 text-center"
      >
        {/* Headline */}
        <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
          I’m{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Roshinth
          </span>
          <br />
          <span className="text-white/90">
            <WaveText text="I design & build" />{" "}
            <span className="block">
              {role}
              <Cursor cursorColor="#38bdf8" />
            </span>
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-3xl text-white/70 leading-relaxed">
          I create modern, animation-rich, high-performance web interfaces using
          React, Tailwind CSS, and thoughtful motion design.
        </p>

        {/* Actions */}
        <div className="mt-14 flex flex-wrap justify-center gap-6">
          <MagneticButton
            onClick={() => scrollTo("projects")}
            className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-10 py-4 text-sm font-semibold text-slate-900 shadow-lg"
          >
            Explore Projects
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollTo("contact")}
            className="rounded-full border border-white/25 bg-white/5 px-10 py-4 text-sm font-semibold text-white backdrop-blur-md"
          >
            Get in Touch
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
