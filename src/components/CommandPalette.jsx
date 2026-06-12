import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Layers, FileDown, Home, User, Briefcase, Award, Folder, MessageSquare, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { theme, toggleTheme, setTheme } = useTheme();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const commands = [
    { id: 'home', title: 'Go to Home', icon: <Home size={18} />, action: () => scrollTo('home') },
    { id: 'about', title: 'Go to About', icon: <User size={18} />, action: () => scrollTo('about') },
    { id: 'experience', title: 'Go to Experience', icon: <Briefcase size={18} />, action: () => scrollTo('experience') },
    { id: 'projects', title: 'Go to Projects', icon: <Folder size={18} />, action: () => scrollTo('projects') },
    { id: 'certificates', title: 'Go to Awards', icon: <Award size={18} />, action: () => scrollTo('certificates') },
    { id: 'comments', title: 'Go to Feedback', icon: <MessageSquare size={18} />, action: () => scrollTo('comments') },
    { id: 'contact', title: 'Go to Contact', icon: <Mail size={18} />, action: () => scrollTo('contact') },
    { id: 'theme-editorial', title: 'Switch Theme: Editorial', icon: <Layers size={18} />, action: () => setTheme('editorial') },
    { id: 'theme-spatial', title: 'Switch Theme: Spatial', icon: <Layers size={18} />, action: () => setTheme('spatial') },
    { id: 'theme-cyber', title: 'Switch Theme: Cyber', icon: <Layers size={18} />, action: () => setTheme('cyber') },
    { id: 'theme-zen', title: 'Switch Theme: Zen', icon: <Layers size={18} />, action: () => setTheme('zen') },
    { id: 'theme-neumorphic', title: 'Switch Theme: Neumorphic', icon: <Layers size={18} />, action: () => setTheme('neumorphic') },
    { id: 'theme-retro', title: 'Switch Theme: Retro', icon: <Layers size={18} />, action: () => setTheme('retro') },
    { id: 'resume', title: 'Download Resume', icon: <FileDown size={18} />, action: () => alert('Resume download hooked up here!') },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const el = document.getElementById(`cmd-${selectedIndex}`);
    if (el) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K to open palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) setTimeout(() => inputRef.current?.focus(), 100);
          return !prev;
        });
        return;
      }
      
      if (isOpen) {
        if (e.key === "Escape") setIsOpen(false);
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
        if (e.key === "Enter" && filteredCommands[selectedIndex]) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
          setQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, toggleTheme, setTheme]);

  // Click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`w-full max-w-2xl mx-auto mt-[10vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col ${
              theme === 'cyber' ? 'bg-black border border-[#00ff41] shadow-[0_0_30px_rgba(0,255,65,0.2)]' 
              : theme === 'retro' ? 'win95-window'
              : theme === 'neumorphic' ? 'neu-flat'
              : theme === 'zen' ? 'bg-white/90 backdrop-blur-xl border border-gray-200'
              : 'bg-[#111111] text-white border border-white/10' // default dark for spatial/editorial
            }`}
          >
            {/* Search Input Area */}
            <div className={`flex items-center p-4 border-b ${
              theme === 'cyber' ? 'border-[#00ff41]/30' 
              : theme === 'zen' ? 'border-gray-200'
              : theme === 'neumorphic' || theme === 'retro' ? 'border-b-2 border-black/10'
              : 'border-white/10'
            }`}>
              <Search className={`mr-3 ${theme === 'cyber' ? 'text-[#00ff41]' : theme === 'zen' ? 'text-gray-400' : theme === 'retro' ? 'text-black' : 'text-gray-400'}`} size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className={`w-full bg-transparent outline-none border-none text-lg ${
                  theme === 'cyber' ? 'text-[#00ff41] placeholder-[#00ff41]/50 font-mono' 
                  : theme === 'zen' ? 'text-black placeholder-gray-400'
                  : theme === 'neumorphic' ? 'text-[#31344b] placeholder-[#8a96a3]'
                  : theme === 'retro' ? 'text-black font-mono bg-white px-2 py-1 win95-pressed'
                  : 'text-white placeholder-gray-500'
                }`}
              />
              <div className={`flex items-center gap-1 ml-3 px-2 py-1 rounded text-xs font-mono opacity-50 ${
                theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? 'text-black border-black/20' : 'border border-white/20'
              }`}>
                <Command size={12} /> K
              </div>
            </div>

            {/* Results Area */}
            <div data-lenis-prevent className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
              {filteredCommands.length === 0 ? (
                <div className={`p-8 text-center ${theme === 'cyber' ? 'text-[#00ff41]/50' : 'text-gray-500'}`}>
                  No results found.
                </div>
              ) : (
                filteredCommands.map((cmd, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      id={`cmd-${index}`}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                        setQuery("");
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors mb-1 ${
                        isSelected
                          ? theme === 'cyber' ? 'bg-[#00ff41]/20 text-[#00ff41]' 
                            : theme === 'zen' ? 'bg-black/5 text-black'
                            : theme === 'neumorphic' ? 'neu-pressed text-[#31344b]'
                            : theme === 'retro' ? 'bg-[#000080] text-white'
                            : 'bg-white/10 text-white'
                          : theme === 'cyber' ? 'text-[#00ff41]/70 hover:text-[#00ff41]'
                            : theme === 'zen' ? 'text-gray-600 hover:text-black'
                            : theme === 'neumorphic' ? 'text-[#8a96a3] hover:text-[#31344b]'
                            : theme === 'retro' ? 'text-black hover:bg-black/5'
                            : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${isSelected && theme === 'retro' ? 'text-white' : ''}`}>
                          {cmd.icon}
                        </span>
                        <span className={`font-medium ${theme === 'cyber' || theme === 'retro' ? 'font-mono' : ''}`}>
                          {cmd.title}
                        </span>
                      </div>
                      {isSelected && <ArrowRight size={16} className="opacity-50" />}
                    </div>
                  );
                })
              )}
            </div>
            
            {/* Footer */}
            <div className={`p-3 text-xs flex justify-between items-center border-t ${
              theme === 'cyber' ? 'border-[#00ff41]/30 text-[#00ff41]/50' 
              : theme === 'zen' ? 'border-gray-200 text-gray-400'
              : theme === 'neumorphic' || theme === 'retro' ? 'border-t-2 border-black/10 text-black/50'
              : 'border-white/10 text-gray-500'
            }`}>
              <div className="flex gap-4">
                <span className="flex items-center gap-1"><kbd className="font-mono bg-black/10 px-1 rounded">↑↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="font-mono bg-black/10 px-1 rounded">↵</kbd> to select</span>
              </div>
              <span className="flex items-center gap-1"><kbd className="font-mono bg-black/10 px-1 rounded">esc</kbd> to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
