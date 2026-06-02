import { motion } from "framer-motion";
import { Copy, Mail, MapPin, ExternalLink, ArrowRight, Phone } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const email = "roshinth.sojan@gmail.com"; // Updated with actual email

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className={`relative py-32 overflow-hidden ${
      theme === 'editorial' ? 'bg-[#f2efe9] text-[#111111] editorial-border border-x-0 border-b-0' 
      : theme === 'zen' ? 'bg-transparent text-black border-t border-black/10'
      : theme === 'neumorphic' ? 'bg-transparent text-[#31344b] border-t-0'
      : theme === 'retro' ? 'bg-transparent text-black border-t-2 border-black font-mono'
      : 'bg-transparent text-white border-t border-white/10'
    }`}>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className={`mb-20 flex flex-col md:flex-row md:items-end justify-between pb-10 ${
          theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'border-b-2 border-[#111111]' 
          : theme === 'neumorphic' ? '' 
          : 'border-b border-white/20'
        }`}>
          <div>
            <span className={`text-xs font-bold tracking-widest uppercase mb-4 block ${
              theme === 'editorial' ? 'text-[#ffcc00] mix-blend-multiply' 
              : theme === 'zen' ? 'text-black/50'
              : theme === 'neumorphic' ? 'text-[#8a96a3]'
              : theme === 'retro' ? 'text-black bg-[#c0c0c0] inline-block px-2'
              : 'text-yellow-400'
            }`}>Chapter 06</span>
            <h2 className={`text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] m-0 ${
              theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? '' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40'
            }`}>
              Let's Talk
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left: Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className={`text-2xl sm:text-4xl font-serif italic mb-12 leading-tight ${
                theme === 'editorial' || theme === 'zen' ? 'text-[#111111]' : theme === 'neumorphic' ? 'text-[#8a96a3]' : theme === 'retro' ? 'text-black font-bold not-italic' : 'text-white/80'
              }`}>
                Looking to build something extraordinary? Let's discuss your next project.
              </p>

              <div className="space-y-8">
                {/* Email block */}
                <div className={`p-8 transition-transform duration-300 hover:-translate-y-2 ${
                  theme === 'editorial' 
                    ? 'bg-[#3b82f6] text-white editorial-border editorial-shadow'
                    : theme === 'zen'
                    ? 'bg-transparent border border-black/10'
                    : theme === 'neumorphic'
                    ? 'neu-flat rounded-[2rem]'
                    : theme === 'retro'
                    ? 'win95-window hover:-translate-y-0'
                    : 'bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <Mail className="h-6 w-6 opacity-80" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Direct Line</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold truncate mb-6">{email}</p>
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                      theme === 'editorial'
                        ? 'bg-white text-[#111111] px-6 py-3 editorial-border hover:bg-[#ffcc00]'
                        : theme === 'zen'
                        ? 'bg-transparent border border-black/10 text-black px-6 py-3 hover:bg-black hover:text-white'
                        : theme === 'neumorphic'
                        ? 'neu-pressed text-[#31344b] px-6 py-3 rounded-full'
                        : theme === 'retro'
                        ? 'win95-button text-black px-6 py-3 active:win95-pressed'
                        : 'bg-white/10 text-white px-6 py-3 rounded-full hover:bg-white/20'
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Address Copied!" : "Copy Address"}
                  </button>
                </div>

                {/* Phone block */}
                <div className={`p-8 transition-transform duration-300 hover:-translate-y-2 ${
                  theme === 'editorial' 
                    ? 'bg-[#ffcc00] text-[#111111] editorial-border editorial-shadow'
                    : theme === 'zen'
                    ? 'bg-transparent border border-black/10'
                    : theme === 'neumorphic'
                    ? 'neu-flat rounded-[2rem]'
                    : theme === 'retro'
                    ? 'win95-window hover:-translate-y-0'
                    : 'bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <Phone className="h-6 w-6 opacity-80" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Phone</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold truncate mb-6">+91 7358847752</p>
                  <a href="tel:+917358847752"
                    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                      theme === 'editorial'
                        ? 'bg-white text-[#111111] px-6 py-3 editorial-border hover:bg-[#3b82f6] hover:text-white'
                        : theme === 'zen'
                        ? 'bg-transparent border border-black/10 text-black px-6 py-3 hover:bg-black hover:text-white'
                        : theme === 'neumorphic'
                        ? 'neu-pressed text-[#31344b] px-6 py-3 rounded-full'
                        : theme === 'retro'
                        ? 'win95-button text-black px-6 py-3 active:win95-pressed'
                        : 'bg-white/10 text-white px-6 py-3 rounded-full hover:bg-white/20'
                    }`}
                  >
                    Call Now
                  </a>
                </div>

                {/* Location block */}
                <div className={`p-8 transition-transform duration-300 hover:-translate-y-2 ${
                  theme === 'editorial'
                    ? 'bg-white editorial-border editorial-shadow'
                    : theme === 'zen'
                    ? 'bg-transparent border border-black/10'
                    : theme === 'neumorphic'
                    ? 'neu-flat rounded-[2rem]'
                    : theme === 'retro'
                    ? 'win95-window hover:-translate-y-0'
                    : 'bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <MapPin className={`h-6 w-6 ${
                      theme === 'editorial' ? 'text-[#ff5733]' 
                      : theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? 'text-[#31344b]' 
                      : 'text-purple-400'
                    }`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'text-[#111111]/60' : theme === 'neumorphic' ? 'text-[#8a96a3]' : 'text-white/60'}`}>Base of Operations</span>
                  </div>
                  <p className={`text-2xl font-bold uppercase tracking-tight ${theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? 'text-[#31344b]' : 'text-white'}`}>
                    Tamilnadu, <span className={`font-serif italic font-normal capitalize ${
                      theme === 'editorial' ? 'text-[#3b82f6]' 
                      : theme === 'zen' || theme === 'neumorphic' ? 'text-[#8a96a3]' 
                      : theme === 'retro' ? 'text-black font-bold not-italic'
                      : 'text-blue-400'
                    }`}>India</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Connect Links */}
          <div className="lg:col-span-7 flex flex-col justify-end">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               
               {[
                 { label: "LinkedIn", url: "https://www.linkedin.com/in/roshinth-sojan-846880264/", color: "bg-[#ffcc00]" },
                 { label: "GitHub", url: "https://github.com/Rosi8870", color: "bg-[#ff5733]" }
               ].map((link, i) => (
                 <a 
                   key={i}
                   href={link.url}
                   target="_blank"
                   rel="noreferrer"
                   className={`group relative p-10 flex flex-col justify-between aspect-square transition-all duration-500 overflow-hidden ${
                     theme === 'editorial'
                       ? `editorial-border bg-white editorial-shadow hover:${link.color}`
                       : theme === 'zen'
                       ? 'bg-transparent border border-black/10 hover:bg-black hover:text-white'
                       : theme === 'neumorphic'
                       ? 'neu-flat rounded-[2rem] hover:neu-pressed'
                       : theme === 'retro'
                       ? 'win95-window hover:win95-pressed hover:-translate-y-0'
                       : 'bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl hover:bg-white/10'
                   }`}
                 >
                   <div className="flex justify-between items-start z-10">
                      <span className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
                        theme === 'editorial' ? 'text-[#111111]/50 group-hover:text-[#111111]' 
                        : theme === 'zen' ? 'text-black/50 group-hover:text-white'
                        : theme === 'neumorphic' ? 'text-[#8a96a3] group-hover:text-[#31344b]'
                        : theme === 'retro' ? 'text-black'
                        : 'text-white/50 group-hover:text-white'
                      }`}>
                        Network
                      </span>
                      <ExternalLink className={`h-6 w-6 transition-colors ${
                        theme === 'editorial' ? 'text-[#111111]/30 group-hover:text-[#111111]' 
                        : theme === 'zen' ? 'text-black/30 group-hover:text-white'
                        : theme === 'neumorphic' ? 'text-[#8a96a3] group-hover:text-[#31344b]'
                        : theme === 'retro' ? 'text-black'
                        : 'text-white/30 group-hover:text-white'
                      }`} />
                   </div>
                   
                   <h3 className={`text-4xl md:text-5xl uppercase tracking-tighter z-10 transition-colors ${
                     theme === 'editorial' ? 'font-black text-[#111111]' 
                     : theme === 'zen' ? 'font-light text-black group-hover:text-white'
                     : theme === 'neumorphic' ? 'font-bold text-[#8a96a3] group-hover:text-[#31344b]'
                     : theme === 'retro' ? 'font-bold text-black'
                     : 'font-black text-white/80 group-hover:text-white'
                   }`}>
                     {link.label}
                   </h3>
                   
                   {/* Decorative circle on hover */}
                   {theme === 'editorial' && (
                     <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>
                   )}
                 </a>
               ))}

             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
