import { ArrowUp } from "lucide-react";
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
          <p className={`text-sm uppercase tracking-widest opacity-80 ${theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? 'font-bold' : 'font-light'}`}>
            © {new Date().getFullYear()} Roshinth Sojan
          </p>

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
