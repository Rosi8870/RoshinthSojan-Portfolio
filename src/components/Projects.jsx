import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const projects = [
  { title: "Interactive Jobs", tech: "Jobs Platform", link: "https://interactive-jobs.vercel.app/", desc: "Useful job discovery platform for Freshers & All-Rounders" },
  { title: "Live TV", tech: "Streaming", link: "https://livtv-six.vercel.app/", desc: "Streaming interface inspired by modern digital TV platforms." },
  { title: "Particles", tech: "WebGL Physics", link: "https://rosi8870.github.io/Particles/", desc: "Interactive math-based particle physics playground." },
  { title: "REW", tech: "Corporate", link: "https://rosi8870.github.io/Roshinth-Electrical-Works/", desc: "Corporate showcase for electrical engineering services." },
  { title: "STOT", tech: "Speech To Text", link: "https://rosi8870.github.io/STOT-by-sojan/", desc: "Coverts Speech To Text Fluently." },
  { title: "E Commerce", tech: "Online Store", link: "https://ecomn.vercel.app/", desc: "E commerce platform with modern UI." },
  { title: "BillPro", tech: "Billing Web App", link: "https://billing-one-virid.vercel.app/", desc: "Corporate billing solution for all." },
];

export default function Projects() {
  const { theme } = useTheme();

  return (
    <section id="projects" className={`relative py-32 ${
      theme === 'editorial' ? 'bg-[#f2efe9] text-[#111111] editorial-border border-x-0 border-b-0' 
      : theme === 'zen' ? 'bg-transparent text-black border-t border-black/10'
      : theme === 'neumorphic' ? 'bg-transparent text-[#31344b] border-t-0'
      : theme === 'retro' ? 'bg-transparent text-black border-t-2 border-black font-mono'
      : 'bg-transparent text-white border-t border-white/10'
    }`}>
      
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className={`mb-20 flex flex-col md:flex-row md:items-end justify-between pb-10 ${
          theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'border-b-2 border-[#111111]' 
          : theme === 'neumorphic' ? '' 
          : 'border-b border-white/20'
        }`}>
          <div>
            <span className={`text-xs font-bold tracking-widest uppercase mb-4 block ${
              theme === 'editorial' ? 'text-[#3b82f6]' 
              : theme === 'zen' ? 'text-black/50'
              : theme === 'neumorphic' ? 'text-[#8a96a3]'
              : theme === 'retro' ? 'text-black bg-[#c0c0c0] inline-block px-2'
              : 'text-blue-400'
            }`}>Chapter 03</span>
            <h2 className={`text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] m-0 ${
              theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? '' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40'
            }`}>
              Projects
            </h2>
          </div>
        </div>

        {/* List Layout */}
        <div className={theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'border-t-2 border-[#111111]' : theme === 'neumorphic' ? 'grid gap-6' : 'border-t border-white/20'}>
          {projects.map((p, i) => (
            <motion.a 
              href={p.link}
              target="_blank"
              rel="noreferrer"
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group py-8 px-4 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-all duration-300 block ${
                theme === 'editorial' 
                  ? 'border-b-2 border-[#111111] hover:bg-[#ffcc00]' 
                  : theme === 'zen'
                  ? 'border-b border-black/10 hover:bg-black/5 hover:px-8 rounded-none'
                  : theme === 'neumorphic'
                  ? 'neu-flat hover:neu-pressed rounded-[2rem] px-8'
                  : theme === 'retro'
                  ? 'win95-window mb-4 px-6 hover:bg-[#000080] hover:text-white'
                  : 'border-b border-white/10 hover:bg-white/5 hover:px-8 rounded-xl my-2'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full">
                <span className={`text-sm font-bold uppercase transition-colors ${
                  theme === 'editorial' ? 'text-[#111111]/30 group-hover:text-[#111111]' 
                  : theme === 'zen' ? 'text-black/30 group-hover:text-black'
                  : theme === 'neumorphic' ? 'text-[#8a96a3] group-hover:text-[#31344b]'
                  : theme === 'retro' ? 'text-black group-hover:text-white'
                  : 'text-white/30 group-hover:text-white/80'
                }`}>
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                
                <h3 className={`text-4xl md:text-6xl uppercase tracking-tighter transition-colors ${
                  theme === 'editorial' ? 'font-black group-hover:text-[#111111]' 
                  : theme === 'zen' ? 'font-light group-hover:text-black'
                  : theme === 'neumorphic' ? 'font-bold text-[#8a96a3] group-hover:text-[#31344b]'
                  : theme === 'retro' ? 'font-bold text-black group-hover:text-white'
                  : 'font-black text-white/80 group-hover:text-white'
                }`}>
                  {p.title}
                </h3>
              </div>
              
              <div className="mt-6 md:mt-0 flex flex-col md:flex-row md:items-center gap-6 text-left md:text-right shrink-0">
                <p className={`text-sm font-bold uppercase tracking-widest transition-colors px-3 py-1 ${
                  theme === 'editorial' 
                    ? 'text-[#3b82f6] group-hover:text-[#111111] bg-white/50 editorial-border' 
                    : theme === 'zen'
                    ? 'text-black/50 group-hover:text-black font-light border border-black/10'
                    : theme === 'neumorphic'
                    ? 'text-[#8a96a3] border border-transparent group-hover:text-[#31344b]'
                    : theme === 'retro'
                    ? 'bg-white text-black border-2 border-[#808080] border-r-white border-b-white px-2 py-1'
                    : 'text-blue-400 bg-white/5 rounded-full border border-white/10'
                }`}>
                  {p.tech}
                </p>
                <div className={`hidden md:flex h-12 w-12 items-center justify-center transition-all ${
                  theme === 'editorial'
                    ? 'rounded-full editorial-border bg-white group-hover:bg-[#111111] group-hover:text-white editorial-shadow'
                    : theme === 'zen'
                    ? 'rounded-full border border-black/20 bg-transparent group-hover:bg-black group-hover:text-white'
                    : theme === 'neumorphic'
                    ? 'rounded-full neu-flat text-[#8a96a3] group-hover:neu-pressed group-hover:text-[#31344b]'
                    : theme === 'retro'
                    ? 'win95-button group-hover:win95-pressed'
                    : 'rounded-full border border-white/20 bg-white/5 group-hover:bg-white group-hover:text-slate-900'
                }`}>
                  <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}