import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const sections = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Awards", id: "certificates" },
  { label: "Projects", id: "projects" },
  { label: "Feedback", id: "comments" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        // Check if section is currently active
        if (r.top <= 200 && r.bottom >= 200) {
          setActive(s.id);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? theme === 'editorial' 
              ? "bg-[#f2efe9]/90 backdrop-blur-md border-b border-[#111111]/10 py-4"
              : theme === 'spatial'
                ? "bg-white/5 backdrop-blur-2xl border-b border-white/10 py-4"
                : theme === 'cyber'
                  ? "bg-black/90 backdrop-blur-md border-b border-[#00ff41]/30 py-4"
                  : theme === 'zen'
                    ? "bg-white/80 backdrop-blur-xl py-4"
                    : theme === 'neumorphic'
                      ? "neu-flat py-4 border-none"
                      : "win95-window py-2" // retro
            : theme === 'retro' ? "win95-window py-2" : "bg-transparent py-6 border-none"
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          
          {/* LOGO */}
          <div 
            onClick={() => scrollTo("home")}
            className={`cursor-pointer text-2xl uppercase flex items-center gap-1 ${
              theme === 'editorial' ? 'font-black text-[#111111] tracking-tighter' 
              : theme === 'spatial' ? 'font-black text-white tracking-tighter'
              : theme === 'cyber' ? 'font-black text-[#00ff41] font-mono glitch-hover tracking-tighter'
              : theme === 'zen' ? 'font-light text-black tracking-[0.2em] text-sm'
              : theme === 'neumorphic' ? 'font-bold text-[#31344b] tracking-wide'
              : 'font-bold text-black font-mono tracking-tighter' // retro
            }`}
          >
            Roshinth<span className={`${
              theme === 'editorial' ? 'font-serif italic text-[#ff5733] font-normal' 
              : theme === 'spatial' ? 'font-serif italic text-purple-400 font-normal'
              : theme === 'cyber' ? 'font-mono text-white font-normal'
              : theme === 'zen' ? 'font-serif italic font-light'
              : theme === 'neumorphic' ? 'font-normal text-[#8a96a3]'
              : 'font-bold text-black' // retro
            }`}>sojan.</span>
          </div>

          {/* DESKTOP LINKS & TOGGLE */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {sections.map((item) => {
                const isActive = active === item.id;
                return (
                  <li
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`cursor-pointer relative group ${
                      theme === 'neumorphic' ? 'px-4 py-2 rounded-full transition-all duration-300 ' + (isActive ? 'neu-pressed' : 'hover:neu-flat') 
                      : theme === 'retro' ? 'px-3 py-1 ' + (isActive ? 'win95-pressed' : 'win95-button')
                      : 'py-2'
                    }`}
                  >
                    <span className={`uppercase transition-colors duration-500 ${
                      theme === 'editorial'
                        ? isActive ? "text-xs font-bold tracking-[0.15em] text-[#3b82f6]" : "text-xs font-bold tracking-[0.15em] text-[#111111] group-hover:text-[#ff5733]"
                        : theme === 'spatial'
                          ? isActive ? "text-xs font-bold tracking-[0.15em] text-white" : "text-xs font-bold tracking-[0.15em] text-white/50 group-hover:text-white"
                          : theme === 'cyber'
                            ? isActive ? "text-xs font-bold tracking-[0.15em] text-white" : "text-xs font-bold tracking-[0.15em] text-[#00ff41]/50 group-hover:text-[#00ff41]"
                            : theme === 'zen'
                              ? isActive ? "text-[10px] tracking-[0.3em] text-black font-medium" : "text-[10px] tracking-[0.3em] text-black/40 group-hover:text-black font-light"
                              : theme === 'neumorphic'
                                ? isActive ? "text-[11px] font-bold tracking-widest text-[#31344b]" : "text-[11px] font-bold tracking-widest text-[#8a96a3] group-hover:text-[#31344b]"
                                : isActive ? "text-xs font-bold text-black" : "text-xs font-bold text-black" // retro
                    }`}>
                      {theme === 'cyber' ? `<${item.label}/>` : item.label}
                    </span>
                    
                    {/* Hover Underline */}
                    {theme !== 'cyber' && theme !== 'zen' && theme !== 'neumorphic' && theme !== 'retro' && (
                      <span 
                        className={`absolute bottom-0 left-0 h-[2px] bg-current transition-all duration-300 ${
                          theme === 'editorial'
                            ? isActive ? "w-full text-[#3b82f6]" : "w-0 group-hover:w-full text-[#ff5733]"
                            : isActive ? "w-full text-white" : "w-0 group-hover:w-full text-white"
                        }`}
                      ></span>
                    )}
                  </li>
                );
              })}
            </ul>

            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 transition-all duration-500 ${
                theme === 'editorial' 
                  ? 'px-4 py-2 bg-[#111111] text-white hover:bg-[#3b82f6] rounded-full text-xs font-bold uppercase tracking-widest' 
                  : theme === 'spatial'
                    ? 'px-4 py-2 bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full text-xs font-bold uppercase tracking-widest'
                    : theme === 'cyber'
                      ? 'px-4 py-2 bg-black text-[#00ff41] border border-[#00ff41] hover:bg-[#00ff41] hover:text-black rounded-none glitch-hover text-xs font-bold uppercase tracking-widest'
                      : theme === 'zen'
                        ? 'px-4 py-2 bg-transparent text-black/50 hover:text-black text-[10px] uppercase tracking-[0.2em] font-light'
                        : theme === 'neumorphic'
                          ? 'px-5 py-3 neu-flat rounded-full text-[#31344b] text-[10px] uppercase tracking-[0.2em] font-bold active:neu-pressed'
                          : 'px-4 py-2 win95-button text-xs font-bold text-black'
              }`}
            >
              <Layers size={theme === 'zen' || theme === 'neumorphic' ? 12 : 14} />
              {theme === 'editorial' ? 'Spatial' : theme === 'spatial' ? 'Cyber' : theme === 'cyber' ? 'Zen' : theme === 'zen' ? 'Neumorphic' : theme === 'neumorphic' ? 'Retro' : 'Editorial'}
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`transition-all ${
                theme === 'editorial' ? 'p-2 bg-[#111111] text-white rounded-full' 
                : theme === 'spatial' ? 'p-2 bg-white/10 text-white border border-white/10 rounded-full'
                : theme === 'cyber' ? 'p-2 bg-black text-[#00ff41] border border-[#00ff41] rounded-none'
                : theme === 'zen' ? 'p-2 text-black/50 hover:text-black rounded-full'
                : theme === 'neumorphic' ? 'p-3 neu-flat text-[#31344b] rounded-full active:neu-pressed'
                : 'p-2 win95-button text-black'
              }`}
            >
              <Layers size={18} />
            </button>
            <button 
              className={`transition-colors ${theme === 'editorial' || theme === 'zen' ? 'text-[#111111]' : theme === 'spatial' ? 'text-white' : 'text-[#00ff41]'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-[70px] left-0 w-full z-40 md:hidden shadow-xl ${
              theme === 'editorial' 
                ? 'bg-[#f2efe9] border-b-2 border-[#111111]' 
                : theme === 'spatial'
                  ? 'bg-slate-900/90 backdrop-blur-2xl border-b border-white/10'
                  : 'bg-black border-b border-[#00ff41]'
            }`}
          >
            <ul className="flex flex-col py-4">
              {sections.map((item) => {
                const isActive = active === item.id;
                return (
                  <li
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] cursor-pointer transition-colors ${
                      theme === 'editorial'
                        ? isActive ? "bg-[#111111]/5 text-[#3b82f6]" : "text-[#111111] hover:bg-[#111111]/5 hover:text-[#ff5733]"
                        : theme === 'spatial'
                          ? isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                          : isActive ? "bg-[#00ff41]/20 text-white" : "text-[#00ff41] hover:bg-[#00ff41]/10"
                    }`}
                  >
                    {theme === 'cyber' ? `> ${item.label}` : item.label}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
