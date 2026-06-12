import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`${
      theme === 'editorial' 
        ? 'bg-[#111111] text-[#f2efe9] border-t-[3px] border-[#111111]' 
        : theme === 'zen'
        ? 'bg-transparent text-black border-t border-black/10 relative z-10'
        : theme === 'neumorphic'
        ? 'bg-transparent text-[#31344b] border-t-0 relative z-10'
        : theme === 'retro'
        ? 'bg-[#c0c0c0] text-black border-t-2 border-white relative z-10 font-mono shadow-[inset_0_2px_0_#dfdfdf]'
        : 'bg-transparent text-white border-t border-white/10 relative z-10'
    } py-12`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 text-center md:text-left justify-between">
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className={`text-sm uppercase tracking-widest opacity-80 ${theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? 'font-bold' : 'font-light'}`}>
              © {new Date().getFullYear()} Roshinth Sojan
            </p>
            
            <div className="flex items-center gap-6 mt-2">
              <a href="https://github.com/Rosi8870" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className={`transition-all hover:-translate-y-1 ${theme === 'editorial' ? 'text-[#f2efe9]/60 hover:text-[#f2efe9]' : theme === 'zen' || theme === 'retro' ? 'text-black/60 hover:text-black' : theme === 'neumorphic' ? 'text-[#8a96a3] hover:text-[#31344b]' : 'text-white/60 hover:text-white'}`}>
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/roshinth-sojan-846880264/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className={`transition-all hover:-translate-y-1 ${theme === 'editorial' ? 'text-[#f2efe9]/60 hover:text-[#f2efe9]' : theme === 'zen' || theme === 'retro' ? 'text-black/60 hover:text-black' : theme === 'neumorphic' ? 'text-[#8a96a3] hover:text-[#31344b]' : 'text-white/60 hover:text-white'}`}>
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:roshinthr2004@gmail.com" aria-label="Email Address" className={`transition-all hover:-translate-y-1 ${theme === 'editorial' ? 'text-[#f2efe9]/60 hover:text-[#f2efe9]' : theme === 'zen' || theme === 'retro' ? 'text-black/60 hover:text-black' : theme === 'neumorphic' ? 'text-[#8a96a3] hover:text-[#31344b]' : 'text-white/60 hover:text-white'}`}>
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className={`group flex items-center justify-center w-12 h-12 transition-all ${
              theme === 'editorial'
                ? 'bg-[#f2efe9] text-[#111111] hover:bg-[#ffcc00]'
                : theme === 'zen'
                ? 'bg-transparent border border-black/10 text-black hover:bg-black hover:text-white'
                : theme === 'neumorphic'
                ? 'neu-flat active:neu-pressed rounded-full text-[#31344b]'
                : theme === 'retro'
                ? 'win95-button active:win95-pressed text-black rounded-none'
                : 'bg-white/10 text-white rounded-full hover:bg-white/20'
            }`}
          >
            <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
