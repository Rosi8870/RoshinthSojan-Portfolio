import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />
      </div>

      {/* Animated gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="origin-left h-[2px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* LEFT */}
          <div>
            <h3 className="text-xl font-semibold tracking-wide">
              Roshinth Sojan
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Frontend developer crafting modern, animation-rich, and
              performance-focused web experiences.
            </p>

            <p className="mt-4 text-xs text-cyan-400/80">
              Based in India · Open to remote work
            </p>
          </div>

          {/* CENTER */}
          <div className="flex flex-col gap-4 text-sm text-white/70">
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#projects">Projects</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>

            <button
              onClick={scrollTop}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs backdrop-blur-md transition hover:bg-white/10 hover:border-cyan-400/40"
            >
              Back to top <ArrowUp className="h-3 w-3" />
            </button>
          </div>

          {/* RIGHT */}
          <div>
            <p className="mb-4 text-sm font-medium text-white/80">
              Find me on
            </p>

            <div className="flex gap-4">
              <SocialIcon
                href="https://github.com/Rosi8870"
                icon={<Github />}
              />
              <SocialIcon
                href="https://www.linkedin.com/in/roshinth-sojan-846880264/"
                icon={<Linkedin />}
              />
              <SocialIcon
                href="mailto:roshinthr2004@gmail.com"
                icon={<Mail />}
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} Roshinth Sojan
          </span>

          {/* Decorative dots */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="h-1 w-1 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Helpers ---------- */

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="relative w-fit transition hover:text-cyan-400"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-cyan-400 transition-all duration-300 hover:w-full" />
    </a>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/70 backdrop-blur-md transition hover:text-cyan-400 hover:border-cyan-400/40"
    >
      {icon}
    </motion.a>
  );
}
