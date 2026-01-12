import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, ArrowUpRight, ExternalLink, Command, Globe, Maximize2, Loader2 } from "lucide-react";

/* ================= DATA ================= */
const projects = [
  { title: "Interactive Jobs", tech: "React / Motion", link: "https://interactive-jobs.vercel.app/", desc: "A motion-first discovery platform with immersive UI transitions." },
  { title: "Alternate Life", tech: "Creative UI", link: "https://alternate-life-engine.vercel.app/", desc: "A choice-driven interactive storytelling engine." },
  { title: "Alt Text Gen", tech: "AI / Accessibility", link: "https://alttextgenerator.vercel.app/", desc: "Generating accessibility descriptions using neural networks." },
  { title: "Live TV UI", tech: "React / OTT", link: "https://livtv-six.vercel.app/", desc: "Streaming interface inspired by modern digital TV platforms." },
  { title: "Particles", tech: "JS / Canvas", link: "https://rosi8870.github.io/Particles/", desc: "Interactive math-based particle physics playground." },
  { title: "OTM", tech: "HTML / CSS", link: "https://rosi8870.github.io/OTM/", desc: "Creative UI experiments with dynamic CSS layouts." },
  { title: "Electrical", tech: "Business", link: "https://rosi8870.github.io/Roshinth-Electrical-Works/", desc: "Corporate showcase for electrical engineering services." },
  { title: "STOT", tech: "Static Arch", link: "https://rosi8870.github.io/STOT-by-sojan/", desc: "Clean and performant static website architecture." },
];

export default function DarkOrbitShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Lock scroll and reset loader when modal toggles
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      setLoading(true); // Reset loading state for new iframe
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  return (
    <section id="projects"className="relative min-h-screen text-white py-24 px-6 overflow-hidden flex flex-col items-center">
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .orbit-container { animation: orbit 50s linear infinite; }
        .orbit-container:hover { animation-play-state: paused; }
        .counter-rotate { animation: orbit 50s linear infinite reverse; }
        .orbit-container:hover .counter-rotate { animation-play-state: paused; }
      `}</style>

      {/* --- CENTERED HEADER --- */}
      <div className="container mx-auto text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-50 inline-block"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            Projects
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-[1px] w-12 bg-white/20" />
            <p className="text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase">I HAVE DONE</p>
            <span className="h-[1px] w-12 bg-white/20" />
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* --- LEFT: THE WHEEL --- */}
        <div className="relative flex items-center justify-center aspect-square w-full max-w-[350px] md:max-w-[450px] mx-auto lg:mx-0">
          <div className="orbit-container absolute inset-0 flex items-center justify-center">
            {projects.map((p, i) => {
              const angle = (i / projects.length) * 360;
              return (
                <div key={i} className="absolute" style={{ transform: `rotate(${angle}deg) translateY(clamp(-130px, -16vw, -190px)) rotate(-${angle}deg)` }}>
                  <div className="counter-rotate">
                    <motion.button
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => { setActiveIndex(i); setShowModal(true); }}
                      className={`relative flex items-center justify-center h-10 w-10 md:h-14 md:w-14 rounded-full border-2 transition-all duration-500 ${
                        activeIndex === i ? 'bg-cyan-500 border-white scale-110 z-50 shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-zinc-900 border-white/10 opacity-30'
                      }`}
                    >
                      <span className="text-[10px] font-bold">0{i + 1}</span>
                    </motion.button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-40 p-6 bg-zinc-950/90 backdrop-blur-3xl rounded-full border border-white/10 w-36 h-36 md:w-56 md:h-56 flex flex-col justify-center items-center text-center shadow-2xl">
             <Command className="text-cyan-500 mb-2 opacity-20" size={20} />
             <AnimatePresence mode="wait">
               <motion.h3 key={activeIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base md:text-lg font-black uppercase tracking-tighter">
                 {projects[activeIndex].title}
               </motion.h3>
             </AnimatePresence>
          </div>
        </div>

        {/* --- RIGHT: PROJECT INFO --- */}
        <div className="text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-cyan-500 font-mono text-xs tracking-widest uppercase mb-4">{projects[activeIndex].tech}</p>
              <h4 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-none uppercase">{projects[activeIndex].title}</h4>
              <p className="text-white/40 text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light italic">"{projects[activeIndex].desc}"</p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <button 
                  onClick={() => setShowModal(true)} 
                  className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black text-sm hover:bg-cyan-500 hover:text-white transition-all shadow-xl"
                >
                  PREVIEW PROJECT <Maximize2 size={16} />
                </button>
                <a 
                  href={projects[activeIndex].link} 
                  target="_blank" 
                  className="flex items-center gap-2 text-white/30 hover:text-white transition-colors font-bold text-[10px] tracking-[0.2em] uppercase"
                >
                  Visit Site <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- REFINED DARK PREVIEW MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10"
          >
            {/* Dark Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setShowModal(false)} />
            
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="relative w-full h-full max-w-6xl bg-black rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            >
              {/* Dark Browser Toolbar */}
              <div className="h-14 bg-zinc-900/80 border-b border-white/5 flex items-center justify-between px-6 shrink-0 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                  </div>
                  <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-black/40 rounded-full border border-white/5">
                     <Globe size={12} className="text-cyan-500/50" />
                     <span className="text-[10px] font-mono text-white/30 truncate max-w-[250px]">{projects[activeIndex].link}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowModal(false)} 
                  className="group h-8 w-8 flex items-center justify-center bg-white/5 hover:bg-red-500 rounded-full transition-all"
                >
                  <X size={16} className="text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Black Iframe Content */}
              <div className="flex-grow relative bg-black">
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
                    <Loader2 className="w-10 h-10 animate-spin text-cyan-500 mb-4 opacity-80" />
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Establishing Connection</p>
                  </div>
                )}
                <iframe 
                  src={projects[activeIndex].link} 
                  className={`w-full h-full border-0 transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setLoading(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}