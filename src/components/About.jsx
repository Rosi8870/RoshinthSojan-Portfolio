import { motion } from "framer-motion";
import {
  Code2,
  Sparkles,
  Layers,
  Gauge,
  Atom,
  Palette,
  GitBranch,
  Zap,
} from "lucide-react";
import profileImg from "../assets/profile.jpg";

/* ---------------- Animations ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function About() {
  const focusCards = [
    {
      icon: Code2,
      title: "Frontend Engineering",
      desc: "Scalable React architecture, reusable components, responsive systems.",
    },
    {
      icon: Sparkles,
      title: "Motion & Interactions",
      desc: "Framer Motion, micro-interactions, scroll-linked animations.",
    },
    {
      icon: Palette,
      title: "Visual Design",
      desc: "Tailwind CSS, dark UI aesthetics, design consistency.",
    },
    {
      icon: Gauge,
      title: "Performance",
      desc: "Optimized rendering, clean logic, smooth user experience.",
    },
  ];

  const techStack = [
    { name: "React", icon: Atom },
    { name: "JavaScript", icon: Zap },
    { name: "Tailwind CSS", icon: Layers },
    { name: "Framer Motion", icon: Sparkles },
    { name: "HTML5", icon: Code2 },
    { name: "CSS3", icon: Palette },
    { name: "Vite", icon: Zap },
    { name: "Git", icon: GitBranch },
  ];

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[260px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-28 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-5xl">
            Who I am & what I do
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/60 leading-relaxed">
            A focused look at my mindset, skills, and how I approach building
            modern web interfaces.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid gap-24 md:grid-cols-2 md:items-center">
          {/* ================= ID CARD PHOTO ================= */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ rotateY: -6, rotateX: 6 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="relative mx-auto w-full max-w-[280px] perspective"
          >
            {/* Glow halo */}
            <div className="absolute -inset-6 rounded-3xl bg-cyan-400/20 blur-3xl" />

            {/* ID Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl">
              {/* Shine sweep */}
              <div className="
                pointer-events-none absolute inset-0
                translate-x-[-120%] skew-x-[-20deg]
                bg-gradient-to-r from-transparent via-white/25 to-transparent
                transition-transform duration-700
                group-hover:translate-x-[120%]
              " />

              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-2">
                {/* ACTIVE LED */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[10px] tracking-widest text-emerald-400">
                    ACTIVE
                  </span>
                </div>

                {/* Serial */}
                <span className="text-[10px] font-mono tracking-widest text-white/60">
                  DEV-07
                </span>
              </div>

              {/* Image */}
              <div className="relative h-[360px] overflow-hidden">
                <img
                  src={profileImg}
                  alt="Roshinth ID"
                  className="
                    h-full w-full object-cover
                    transition duration-700
                    group-hover:scale-110
                    group-hover:contrast-110
                    group-hover:saturate-110
                  "
                />
              </div>

              {/* Info strip */}
              <div className="border-t border-white/10 bg-black/40 px-5 py-4">
                <p className="text-sm font-semibold text-white">
                  Roshinth Sojan
                </p>
                <p className="text-xs tracking-wide text-cyan-400">
                  Full Stack Developer
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= TEXT + FOCUS ================= */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h3 className="mb-8 text-2xl font-semibold">
                I craft experiences, not just interfaces
              </h3>

              <p className="mb-6 text-white/70 leading-relaxed">
                I’m{" "}
                <span className="font-medium text-cyan-400">Roshinth</span>, a
                Fullstack-focused developer passionate about building immersive,
                animation-rich, and performance-driven web experiences.
              </p>

              <p className="text-white/70 leading-relaxed">
                My work lives where design meets engineering — blending clean
                architecture, motion, and usability into polished digital
                products.
              </p>
            </motion.div>

            {/* Focus cards */}
            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              {focusCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    whileHover={{ y: -12 }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
                  >
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-500" />
                    <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                      <div className="absolute -inset-2 rounded-3xl bg-cyan-400/15 blur-2xl" />
                    </div>

                    <div className="relative">
                      <Icon className="mb-5 h-8 w-8 text-cyan-400" />
                      <h4 className="mb-3 text-lg font-semibold text-white">
                        {card.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-white/70">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= TECH STACK ================= */}
        {/* ================= TECHNOLOGY STACK ================= */}
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="mt-32"
>
  <h3 className="mb-16 text-center text-2xl font-semibold">
    Technology I work with
  </h3>

  <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
    {[
      {
        title: "Frontend",
        subtitle: "Interfaces, motion & UX",
        stack: [
          "React",
          "JavaScript (ES6+)",
          "Tailwind CSS",
          "Framer Motion",
          "HTML5",
          "CSS3",
        ],
      },
      {
        title: "Backend",
        subtitle: "Logic, APIs & architecture",
        stack: [
          "Java",
          "Spring Boot",
          "REST APIs",
          "Node.js",
          "JWT Authentication",
          "Validation & Security",
        ],
      },
      {
        title: "Database",
        subtitle: "Structured & realtime data",
        stack: [
          "MySQL",
          "MongoDB",
          "Firebase Firestore",
        ],
      },
      {
        title: "Cloud & DevOps",
        subtitle: "Deployment & delivery",
        stack: [
          "Vercel",
          "Render",
          "Docker",
          "Git & GitHub",
          "CI/CD Basics",
        ],
      },
      {
        title: "Tools & Ecosystem",
        subtitle: "Daily development workflow",
        stack: [
          "Vite",
          "Postman",
          "VS Code",
          "Linux",
          "Browser DevTools",
        ],
      },
      {
        title: "Currently Exploring",
        subtitle: "Learning & growth",
        stack: [
          "System Design",
          "Microservices",
          "Cloud Architecture",
          "Scalable Backend Patterns",
        ],
      },
    ].map((group, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        {/* Top gradient line */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-500" />

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="absolute -inset-3 rounded-3xl bg-cyan-400/20 blur-2xl" />
        </div>

        {/* Shine sweep */}
        <div
          className="
            pointer-events-none absolute inset-0
            translate-x-[-120%] skew-x-[-20deg]
            bg-gradient-to-r from-transparent via-white/20 to-transparent
            transition-transform duration-700
            group-hover:translate-x-[120%]
          "
        />

        <div className="relative">
          <h4 className="text-lg font-semibold text-white">
            {group.title}
          </h4>
          <p className="mb-6 text-sm text-white/50">
            {group.subtitle}
          </p>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/80">
            {group.stack.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

      </div>
    </section>
  );
}
