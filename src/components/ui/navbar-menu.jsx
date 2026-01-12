import React from "react";
import { motion } from "motion/react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 14,
  stiffness: 120,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.25 }}
        className="cursor-pointer text-white/90 hover:text-white font-medium tracking-wide"
      >
        {item}
      </motion.p>

      {active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          className="absolute left-1/2 top-[calc(100%_+_1.2rem)] -translate-x-1/2"
        >
          <div
            className="
              backdrop-blur-xl
              bg-white/10
              border border-white/20
              rounded-2xl
              shadow-2xl
              p-4
            "
          >
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="
        flex items-center gap-8
        px-10 py-4
        rounded-full
        backdrop-blur-xl
        bg-white/10
        border border-white/20
        shadow-[0_0_30px_rgba(0,255,255,0.15)]
      "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <a
      href={href}
      className="flex gap-3 items-start hover:opacity-90 transition"
    >
      <img
        src={src}
        width={120}
        height={60}
        alt={title}
        className="rounded-lg"
      />
      <div>
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-white/70 text-sm max-w-[12rem]">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <a
      {...rest}
      className="text-white/70 hover:text-white transition font-medium"
    >
      {children}
    </a>
  );
};
