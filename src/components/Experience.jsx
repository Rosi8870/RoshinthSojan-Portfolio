import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Briefcase } from "lucide-react";
import ondezxLogo from "../assets/ondezx.png";

export default function Experience() {
  const { theme } = useTheme();

  const experiences = [
    {
      company: "Ondezx",
      role: "Research Analyst Trainee",
      date: "April 2026 - Present",
      description: "Working on cutting-edge research methodologies and data analysis to drive actionable insights.",
      logo: ondezxLogo,
      link: "https://ondezx.com/",
    }
  ];

  return (
    <section id="experience" className={`relative py-32 ${
      theme === 'editorial' ? 'bg-[#f2efe9] text-[#111111] editorial-border border-x-0 border-b-0' 
      : theme === 'zen' ? 'bg-transparent text-black border-t border-black/10'
      : theme === 'neumorphic' ? 'bg-transparent text-[#31344b] border-t-0'
      : theme === 'retro' ? 'bg-transparent text-black border-t-2 border-black font-mono'
      : theme === 'cyber' ? 'bg-transparent text-[#00ff41] border-t border-[#00ff41]/30 font-mono'
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
              : theme === 'cyber' ? 'text-[#00ff41]'
              : 'text-indigo-400'
            }`}>Chapter 02</span>
            <h2 className={`text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] m-0 ${
              theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? '' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40'
            }`}>
              Experience
            </h2>
          </div>
        </div>

        {/* Experience List */}
        <div className={theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'border-t-2 border-[#111111]' : theme === 'neumorphic' ? 'grid gap-6' : 'border-t border-white/20'}>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group py-12 px-4 flex flex-col lg:flex-row justify-between cursor-default transition-all duration-300 block ${
                theme === 'editorial' 
                  ? 'border-b-2 border-[#111111] hover:bg-[#3b82f6] hover:text-white' 
                  : theme === 'zen'
                  ? 'border-b border-black/10 hover:bg-black/5 hover:px-8 rounded-none'
                  : theme === 'neumorphic'
                  ? 'neu-flat hover:neu-pressed rounded-[2rem] px-8'
                  : theme === 'retro'
                  ? 'win95-window mb-4 px-6 hover:bg-[#000080] hover:text-white'
                  : theme === 'cyber'
                  ? 'border-b border-[#00ff41]/20 hover:bg-[#00ff41]/10 hover:px-8 rounded-xl my-2'
                  : 'border-b border-white/10 hover:bg-white/5 hover:px-8 rounded-xl my-2'
              }`}
            >
              <div className="flex flex-col lg:w-1/3 mb-6 lg:mb-0">
                <a 
                  href={exp.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 mb-2 hover:opacity-80 transition-opacity w-fit"
                >
                  {exp.logo ? (
                    <div className={`flex shrink-0 h-10 w-10 md:h-12 md:w-12 items-center justify-center overflow-hidden transition-all bg-white rounded-md p-1 ${
                      theme === 'editorial' ? 'editorial-border' 
                      : theme === 'neumorphic' ? 'neu-pressed' 
                      : theme === 'retro' ? 'win95-window' 
                      : ''
                    }`}>
                      <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                  ) : (
                    <div className={`flex shrink-0 h-10 w-10 items-center justify-center transition-all ${
                      theme === 'editorial'
                        ? 'rounded-full bg-[#111111] text-white group-hover:bg-white group-hover:text-[#3b82f6]'
                        : theme === 'zen'
                        ? 'rounded-full border border-black/20 bg-transparent text-black'
                        : theme === 'neumorphic'
                        ? 'rounded-full neu-pressed text-[#31344b]'
                        : theme === 'retro'
                        ? 'win95-button text-black'
                        : 'rounded-full border border-white/20 bg-white/5 text-white'
                    }`}>
                      <Briefcase className="h-4 w-4" />
                    </div>
                  )}
                  <h3 className={`text-3xl md:text-4xl font-bold uppercase tracking-tighter ${
                    theme === 'retro' ? 'group-hover:text-white' : theme === 'cyber' ? 'text-[#00ff41]' : theme === 'spatial' ? 'text-white' : ''
                  }`}>
                    {exp.company}
                  </h3>
                </a>
                <span className={`text-sm font-bold uppercase tracking-widest mt-4 ${
                  theme === 'editorial' ? 'text-[#111111]/60 group-hover:text-white/80' 
                  : theme === 'zen' ? 'text-black/50'
                  : theme === 'neumorphic' ? 'text-[#8a96a3]'
                  : theme === 'retro' ? 'text-black group-hover:text-white'
                  : theme === 'cyber' ? 'text-[#00ff41]'
                  : 'text-indigo-400'
                }`}>
                  {exp.date}
                </span>
              </div>
              
              <div className="lg:w-2/3 flex flex-col justify-center">
                <h4 className={`text-2xl md:text-3xl font-serif italic mb-4 ${
                  theme === 'retro' ? 'not-italic font-bold' : theme === 'cyber' ? 'not-italic font-mono text-[#00ff41]' : theme === 'spatial' ? 'text-white' : ''
                }`}>
                  {exp.role}
                </h4>
                <p className={`text-lg leading-relaxed max-w-2xl ${
                  theme === 'editorial' ? 'font-medium opacity-80 group-hover:opacity-100' 
                  : theme === 'zen' ? 'font-light text-black/70'
                  : theme === 'neumorphic' ? 'font-medium text-[#8a96a3]'
                  : theme === 'retro' ? 'font-bold'
                  : theme === 'cyber' ? 'font-mono text-[#00ff41]/80'
                  : 'font-light text-white/70'
                }`}>
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
