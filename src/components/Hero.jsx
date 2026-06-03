import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Terminal, Code2, LayoutPanelLeft, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const { theme } = useTheme();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (theme === 'spatial') {
    return (
      <section id="home" className="relative min-h-screen w-full pt-24 overflow-hidden flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium tracking-widest uppercase text-white/90">Web Engineer</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tight leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            Roshinth Sojan.
          </h1>

          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-12">
            I build scalable web applications, bridging the gap between rigorous engineering and outstanding digital experiences in the spatial computing era.
          </p>

          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => scrollTo("projects")}
             className="group flex items-center gap-4 px-8 py-4 rounded-full bg-white text-slate-900 font-semibold tracking-wide shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-shadow"
          >
             View Projects
             <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Spatial Glass Cards Floating in Background */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[20%] left-[10%] w-64 h-40 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl hidden lg:flex items-center justify-center shadow-2xl"
        >
          <Code2 className="w-12 h-12 text-white/20" />
        </motion.div>
        
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[20%] right-[10%] w-56 h-56 bg-white/5 border border-white/10 rounded-full backdrop-blur-2xl hidden lg:flex items-center justify-center shadow-2xl"
        >
          <LayoutPanelLeft className="w-16 h-16 text-white/20" />
        </motion.div>
      </section>
    );
  }

  if (theme === 'cyber') {
    return (
      <section id="home" className="relative min-h-screen w-full pt-24 overflow-hidden flex flex-col items-center justify-center font-mono">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="mb-8 p-4 border border-[#00ff41] bg-black shadow-[0_0_15px_rgba(0,255,65,0.2)] inline-block glitch-hover"
          >
            <p className="text-[#00ff41] text-xs font-bold uppercase tracking-[0.3em]">SYS.STATUS: ONLINE</p>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter leading-none mb-6 text-[#00ff41] glitch-hover mix-blend-screen shadow-[#00ff41]">
            <span className="text-white/50">{'> '}</span>ROSHINTH_SOJAN<span className="animate-pulse">_</span>
          </h1>

          <div className="w-full max-w-2xl text-left bg-black border border-[#00ff41] p-6 mb-12 shadow-[0_0_20px_rgba(0,255,65,0.15)] relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-[#00ff41]"></div>
             <p className="text-xs text-[#00ff41]/50 mb-4">/* SYSTEM.PROFILE.DESC */</p>
             <p className="text-sm md:text-base text-white font-medium leading-relaxed">
               <span className="text-[#00ff41]">root@roshinth:~#</span> execute web_engineer.sh<br/><br/>
               [+] Initializing full-stack environments...<br/>
               [+] Bridging engineering rigor & digital aesthetics...<br/>
               <span className="text-yellow-400">[!] WARNING: Highly interactive web applications detected.</span><br/>
               [+] Status: READY.
             </p>
          </div>

          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => scrollTo("projects")}
             className="group flex items-center gap-4 px-8 py-4 bg-[#00ff41] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
             Initialize_Projects()
             <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </section>
    );
  }

  if (theme === 'zen') {
    return (
      <section id="home" className="relative min-h-screen w-full pt-24 overflow-hidden flex flex-col items-center justify-center font-sans bg-white">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-[9px] uppercase tracking-[0.4em] text-black/40 font-light">Digital Craftsman & Engineer</p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-serif font-light tracking-tighter leading-none mb-12 text-black"
          >
            Roshinth
            <br />
            <span className="italic text-black/70">Sojan</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-px h-24 bg-black/10 mb-12"
          ></motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 1 }}
          >
             <p className="text-xs font-light text-black/50 leading-relaxed max-w-md mx-auto uppercase tracking-widest">
               Simplicity is the ultimate sophistication. Building seamless digital experiences through code.
             </p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (theme === 'neumorphic') {
    return (
      <section id="home" className="relative min-h-screen w-full pt-24 overflow-hidden flex flex-col items-center justify-center font-sans bg-[#e0e5ec]">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 px-6 py-3 rounded-full neu-flat flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-[#31344b] animate-pulse"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#31344b]">System Active</p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none mb-8 text-[#31344b]"
          >
            ROSHINTH
            <br />
            <span className="text-[#8a96a3]">SOJAN</span>
          </motion.h1>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="p-8 rounded-[2rem] neu-flat max-w-2xl mx-auto mb-12"
          >
             <p className="text-sm md:text-lg font-medium text-[#8a96a3] leading-relaxed">
               I engineer digital interfaces that feel <span className="text-[#31344b] font-bold">tactile</span> and <span className="text-[#31344b] font-bold">intuitive</span>.
               Bridging the gap between complex functionality and seamless user experience.
             </p>
          </motion.div>

          <motion.button 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             onClick={() => scrollTo("projects")}
             className="px-10 py-5 rounded-full neu-flat active:neu-pressed flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#31344b] transition-all"
          >
             Explore Work
             <ArrowDownRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    );
  }

  if (theme === 'retro') {
    return (
      <section id="home" className="relative min-h-screen w-full pt-24 overflow-hidden flex flex-col items-center justify-center font-mono bg-[#008080]">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center max-w-4xl">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="win95-window w-full text-left"
          >
            <div className="win95-titlebar flex justify-between items-center px-2 py-1">
              <span>System_Boot.exe</span>
              <div className="flex gap-1">
                <button className="win95-button w-5 h-5 flex items-center justify-center text-[10px] font-bold">_</button>
                <button className="win95-button w-5 h-5 flex items-center justify-center text-[10px] font-bold">□</button>
                <button className="win95-button w-5 h-5 flex items-center justify-center text-[10px] font-bold">x</button>
              </div>
            </div>
            
            <div className="p-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
                Roshinth_Sojan
              </h1>
              
              <div className="bg-white border-2 border-l-[#808080] border-t-[#808080] border-r-white border-b-white p-4 mb-8">
                <p className="text-sm md:text-base font-bold text-black leading-relaxed">
                  &gt; INITIALIZING FULL-STACK ENGINEER...
                  <br />
                  &gt; LOADING INTERFACE DESIGNER...
                  <br />
                  &gt; STATUS: READY.
                  <br /><br />
                  I build digital experiences that bridge the gap between rigorous back-end architecture and fluid front-end interfaces.
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => scrollTo("projects")}
                  className="px-6 py-2 win95-button text-sm font-bold active:win95-pressed"
                >
                  OK
                </button>
                <button 
                  onClick={() => scrollTo("about")}
                  className="px-6 py-2 win95-button text-sm font-bold active:win95-pressed"
                >
                  Details...
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // EDITORIAL THEME
  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen w-full pt-24 overflow-hidden"
    >
      
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-black"></div>
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-black hidden md:block"></div>
        <div className="absolute right-[10%] top-0 bottom-0 w-px bg-black"></div>
      </div>

      <div className="container mx-auto grid min-h-[75vh] w-full grid-cols-1 items-center lg:grid-cols-12 relative z-10 px-4 md:px-0">
        
        {/* ================= LEFT CONTENT ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center px-4 md:px-12 xl:px-24 py-10"
        >
          <div className="mb-8 inline-flex items-center gap-4">
             <div className="px-3 py-1 bg-[#3b82f6] text-white text-[10px] font-bold uppercase tracking-widest shadow-[4px_4px_0px_#111111] border-2 border-[#111111]">
               Available for work
             </div>
             <span className="text-xs font-bold tracking-[0.2em] uppercase">Web Engineer</span>
          </div>
          
          <h1 className="text-[14vw] lg:text-[8vw] font-black uppercase leading-[0.85] m-0 tracking-tighter">
            Roshinth
            <br />
            <span className="font-serif italic text-[#ff5733] font-normal tracking-normal capitalize">
              Sojan
            </span>
          </h1>

          <div className="mt-12 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
             <p className="max-w-sm text-base font-medium leading-relaxed text-[#111111]/80">
               I build scalable web applications, bridging the gap between rigorous engineering and outstanding digital experiences.
             </p>
             
             <button 
                onClick={() => scrollTo("projects")}
                className="group flex items-center justify-center w-24 h-24 rounded-full bg-[#ffcc00] border-2 border-[#111111] shadow-[6px_6px_0px_#111111] hover:bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_#111111] transition-all"
             >
                <ArrowDownRight className="h-8 w-8 text-[#111111]" />
             </button>
          </div>
        </motion.div>

        {/* ================= RIGHT: WEB DEVELOPER COMPOSITION ================= */}
        <div className="lg:col-span-5 relative h-[60vh] lg:h-full w-full flex items-center justify-center p-6 lg:p-12">
           
           {/* Terminal Window */}
           <motion.div 
             style={{ y: y1 }}
             initial={{ opacity: 0, x: 50, rotate: 5 }}
             animate={{ opacity: 1, x: 0, rotate: -2 }}
             transition={{ duration: 1, delay: 0.2, type: "spring" }}
             className="absolute top-[10%] right-[5%] lg:right-[10%] w-64 md:w-80 bg-[#111111] rounded-xl overflow-hidden border-2 border-[#111111] shadow-[8px_8px_0px_rgba(0,0,0,0.2)] z-30"
           >
              <div className="bg-[#222] px-4 py-2 flex items-center gap-2 border-b border-white/10">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 <span className="ml-2 text-[10px] text-white/50 font-mono">bash ~ dev</span>
              </div>
              <div className="p-4 font-mono text-xs text-white/80 leading-loose">
                 <p className="text-green-400">➜  ~</p>
                 <p className="text-cyan-400">npm <span className="text-white">run dev</span></p>
                 <p className="text-white/40 mt-2">VITE v5.0.0  ready in 240 ms</p>
                 <p className="text-green-400 mt-2">➜  Local:   <span className="text-cyan-400 underline">http://localhost:5173/</span></p>
                 <span className="inline-block w-2 h-4 bg-white/80 animate-pulse mt-2"></span>
              </div>
           </motion.div>

           {/* Code Snippet Card */}
           <motion.div 
             style={{ y: y2 }}
             initial={{ opacity: 0, x: -50, rotate: -10 }}
             animate={{ opacity: 1, x: 0, rotate: 6 }}
             transition={{ duration: 1, delay: 0.4, type: "spring" }}
             className="absolute top-[40%] left-[0%] lg:left-[-10%] w-72 bg-white rounded-xl p-5 border-2 border-[#111111] shadow-[12px_12px_0px_#3b82f6] z-20"
           >
             <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-[#ff5733]/10 rounded-lg text-[#ff5733]">
                 <Code2 size={20} />
               </div>
               <div>
                 <p className="text-xs font-bold uppercase tracking-widest text-[#111111]">React Component</p>
                 <p className="text-[10px] font-mono text-[#111111]/50">Hero.jsx</p>
               </div>
             </div>
             <pre className="font-mono text-[10px] text-[#111111]/80 bg-[#f2efe9] p-3 rounded-lg overflow-x-hidden border border-[#111111]/10">
<span className="text-purple-600">export default</span> <span className="text-blue-600">function</span> <span className="text-yellow-600">App</span>() {'{'}
<br/>
{'  '} <span className="text-purple-600">return</span> (
<br/>
{'    '}&lt;<span className="text-red-500">main</span> className=<span className="text-green-600">"app"</span>&gt;
<br/>
{'      '}&lt;<span className="text-red-500">Hero</span> /&gt;
<br/>
{'    '}&lt;/<span className="text-red-500">main</span>&gt;
<br/>
{'  '})
<br/>
{'}'}
             </pre>
           </motion.div>

           {/* UI Element Card */}
           <motion.div 
             style={{ y: y3 }}
             initial={{ opacity: 0, y: 100 }}
             animate={{ opacity: 1, y: 0, rotate: -4 }}
             transition={{ duration: 1, delay: 0.6, type: "spring" }}
             className="absolute bottom-[5%] right-[10%] lg:right-[20%] bg-[#ffcc00] rounded-xl p-4 border-2 border-[#111111] shadow-[8px_8px_0px_#ff5733] z-40 flex items-center gap-4"
           >
              <div className="bg-white p-2 rounded-lg border-2 border-[#111111]">
                 <LayoutPanelLeft size={24} className="text-[#111111]" />
              </div>
              <div>
                 <p className="text-sm font-black uppercase tracking-tight text-[#111111]">Pixel Perfect</p>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/60">UI/UX Design</p>
              </div>
           </motion.div>

        </div>

      </div>

      {/* Marquee Strip */}
      <div className="absolute bottom-0 left-0 w-full bg-[#111111] text-white py-3 border-y-[3px] border-black overflow-hidden flex z-20">
        <div className="animate-marquee flex gap-10 items-center pr-10">
          {[...Array(6)].map((_, i) => (
             <span key={`a-${i}`} className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-10">
               Creative Developer <span className="text-[#ffcc00]">✦</span>
               Interface Design <span className="text-[#3b82f6]">✦</span>
               Full-Stack Engineering <span className="text-[#ff5733]">✦</span>
             </span>
          ))}
          {[...Array(6)].map((_, i) => (
             <span key={`b-${i}`} className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-10">
               Creative Developer <span className="text-[#ffcc00]">✦</span>
               Interface Design <span className="text-[#3b82f6]">✦</span>
               Full-Stack Engineering <span className="text-[#ff5733]">✦</span>
             </span>
          ))}
        </div>
      </div>
    </section>
  );
}
