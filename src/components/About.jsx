import { motion } from "framer-motion";
import profileImg from "../assets/profile.jpg";
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  
  const skills = [
    "React", "Next.js", "TypeScript", "Tailwind", "Motion", 
    "Java", "Spring", "Node.js", "Express", "PostgreSQL",
    "MongoDB", "Firebase", "SQL", "Docker", "Git",
    "WebGL", "Three.js", "Figma", "REST APIs", "GraphQL"
  ];

  return (
    <section id="about" className={`relative py-32 overflow-hidden ${
      theme === 'editorial' ? 'bg-[#f2efe9] text-[#111111] editorial-border border-x-0 border-b-0' 
      : theme === 'zen' ? 'bg-transparent text-black border-t border-black/10'
      : theme === 'neumorphic' ? 'bg-transparent text-[#31344b] border-t-0'
      : theme === 'retro' ? 'bg-transparent text-black border-t border-black/20 font-mono'
      : theme === 'cyber' ? 'bg-transparent text-[#00ff41] border-t border-[#00ff41]/30 font-mono'
      : 'bg-transparent text-white border-t border-white/10'
    }`}>
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className={`mb-20 flex flex-col md:flex-row md:items-end justify-between pb-10 ${
          theme === 'editorial' || theme === 'zen' ? 'border-b-2 border-[#111111]' 
          : theme === 'neumorphic' || theme === 'retro' ? '' 
          : 'border-b border-white/20'
        }`}>
          <div>
            <span className={`text-xs font-bold tracking-widest uppercase mb-4 block ${
              theme === 'editorial' ? 'text-[#ff5733]' 
              : theme === 'zen' ? 'text-black/50' 
              : theme === 'neumorphic' ? 'text-[#8a96a3]'
              : theme === 'retro' ? 'text-black bg-[#c0c0c0] inline-block px-2'
              : theme === 'cyber' ? 'text-[#00ff41]'
              : 'text-purple-400'
            }`}>Chapter 01</span>
            <h2 className={`text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] m-0 ${
              theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? '' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40'
            }`}>
              About
            </h2>
          </div>
          <p className="max-w-xs text-sm font-bold leading-relaxed mt-8 md:mt-0 md:text-right uppercase tracking-widest opacity-80">
            Bridging the gap between code & creativity.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Image Treatment */}
          <div className="lg:col-span-5 relative group">
            <div className={`aspect-[3/4] p-4 relative transition-transform duration-500 ${
              theme === 'editorial' ? 'editorial-border editorial-shadow bg-white' 
              : theme === 'zen' ? 'bg-transparent border border-black/10'
              : theme === 'neumorphic' ? 'neu-flat rounded-[2rem]'
              : theme === 'retro' ? 'win95-window'
              : 'bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden'
            }`}>
               <div className={`w-full h-full overflow-hidden relative ${
                 theme === 'editorial' ? 'border border-[#111111]/10 bg-[#e8e4db]' 
                 : theme === 'retro' ? 'border-2 border-l-[#808080] border-t-[#808080] border-r-white border-b-white bg-[#008080]'
                 : 'rounded-[1.5rem]'
               }`}>
                 <img
                    src={profileImg}
                    alt="Roshinth"
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                      theme === 'editorial' || theme === 'zen' ? 'mix-blend-multiply grayscale contrast-125 group-hover:grayscale-0' 
                      : theme === 'neumorphic' ? 'opacity-90 grayscale hover:grayscale-0'
                      : theme === 'retro' ? 'mix-blend-luminosity grayscale opacity-80'
                      : 'opacity-90'
                    }`}
                  />
               </div>
               
               {/* Label */}
               <div className={`absolute bottom-6 px-4 py-2 transition-all ${
                 theme === 'editorial' ? 'right-[-20px] bg-[#ffcc00] editorial-border rotate-[-5deg] editorial-shadow group-hover:rotate-0' 
                 : theme === 'zen' ? 'right-6 bg-white/80 backdrop-blur-md border border-black/10'
                 : theme === 'neumorphic' ? 'right-6 neu-flat rounded-full'
                 : theme === 'retro' ? 'right-6 win95-window p-2'
                 : theme === 'cyber' ? 'right-6 bg-black/80 border border-[#00ff41]/50'
                 : 'right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl'
               }`}>
                 <p className={`font-serif italic font-bold text-xl ${theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? 'text-[#31344b]' : theme === 'cyber' ? 'text-[#00ff41] not-italic font-mono' : 'text-white'}`}>The Engineer</p>
               </div>
            </div>
          </div>

          {/* Right: Text & Details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9] ${
                theme === 'cyber' ? 'text-[#00ff41]' : ''
              }`}>
                I build digital <br/>
                <span className={`font-serif italic font-normal lowercase tracking-normal ${
                  theme === 'editorial' ? 'text-[#ff5733]' 
                  : theme === 'zen' ? 'text-black/40 font-light'
                  : theme === 'neumorphic' ? 'text-[#8a96a3]'
                  : theme === 'retro' ? 'text-black bg-[#c0c0c0] px-2 not-italic'
                  : theme === 'cyber' ? 'text-[#00ff41] not-italic'
                  : 'text-purple-400'
                }`}>experiences</span>
              </h3>
              
              <div className={`space-y-6 text-lg leading-relaxed max-w-2xl ${
                theme === 'editorial' ? 'font-medium' 
                : theme === 'zen' ? 'text-black/70 font-light'
                : theme === 'neumorphic' ? 'text-[#8a96a3] font-medium'
                : theme === 'retro' ? 'text-black font-bold'
                : theme === 'cyber' ? 'text-[#00ff41]/80 font-mono'
                : 'text-white/70 font-light'
              }`}>
                <p>
                  I'm Roshinth Sojan, a full-stack engineer and interface designer. 
                  My philosophy is simple: technology should be invisible, leaving only the experience behind. 
                  I specialize in crafting highly interactive, minimalist web applications that demand attention.
                </p>
                <p>
                  By merging rigorous back-end architecture with fluid front-end motion, 
                  I deliver products that aren't just usable—they are memorable.
                </p>
              </div>
            </motion.div>

            {/* Skills List */}
            <div className={`mt-16 pt-8 ${theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'border-t-2 border-[#111111]' : theme === 'cyber' ? 'border-t border-[#00ff41]/30' : theme === 'neumorphic' ? '' : 'border-t border-white/20'}`}>
              <h4 className={`text-xs font-bold tracking-[0.2em] uppercase mb-8 opacity-80 ${theme === 'retro' ? 'bg-[#000080] text-white p-2 inline-block' : theme === 'cyber' ? 'text-[#00ff41]' : ''}`}>Core Capabilities</h4>
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest cursor-default transition-all ${
                      theme === 'editorial' 
                        ? 'editorial-border hover:bg-[#3b82f6] hover:text-white' 
                        : theme === 'zen'
                        ? 'border border-black/10 rounded-none text-black/70 hover:bg-black hover:text-white font-light'
                        : theme === 'neumorphic'
                        ? 'neu-flat rounded-full text-[#31344b] hover:neu-pressed'
                        : theme === 'retro'
                        ? 'win95-window text-black'
                        : theme === 'cyber'
                        ? 'border border-[#00ff41]/30 rounded-none text-[#00ff41] hover:bg-[#00ff41]/20'
                        : 'bg-white/5 border border-white/10 rounded-full hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] font-medium'
                    }`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
