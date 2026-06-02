import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import CertificateModal from "./CertificateModal";
import { useTheme } from "../context/ThemeContext";

export default function Certificates() {
  const { theme } = useTheme();
  const [certs, setCerts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchCerts = async () => {
      const snap = await getDocs(collection(db, "certificates"));
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setCerts(data);
    };
    fetchCerts();
  }, []);

  return (
    <>
      <section id="certificates" className={`relative py-32 ${
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
                theme === 'editorial' ? 'text-[#ffcc00] mix-blend-multiply' 
                : theme === 'zen' ? 'text-black/50'
                : theme === 'neumorphic' ? 'text-[#8a96a3]'
                : theme === 'retro' ? 'text-black bg-[#c0c0c0] inline-block px-2'
                : 'text-teal-400'
              }`}>Chapter 04</span>
              <h2 className={`text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] m-0 ${
                theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? '' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40'
              }`}>
                Awards
              </h2>
            </div>
          </div>

          {/* GRID */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {certs.slice(0, visibleCount).map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveIndex(i)}
                className={`group cursor-pointer relative overflow-hidden aspect-[16/10] p-4 transition-all duration-500 hover:-translate-y-2 ${
                  theme === 'editorial' 
                    ? 'bg-white editorial-border editorial-shadow' 
                    : theme === 'zen'
                    ? 'bg-transparent border border-black/10'
                    : theme === 'neumorphic'
                    ? 'neu-flat rounded-[2rem]'
                    : theme === 'retro'
                    ? 'win95-window'
                    : 'bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl hover:bg-white/10'
                }`}
              >
                <div className={`w-full h-full overflow-hidden ${
                  theme === 'editorial' || theme === 'zen' ? 'border border-[#111111]/20' 
                  : theme === 'neumorphic' ? 'rounded-[1.5rem] opacity-90 group-hover:opacity-100 transition-opacity'
                  : 'rounded-2xl'
                }`}>
                  <img
                    src={c.Img}
                    alt="Certificate"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Label */}
                <div className={`absolute bottom-6 px-4 py-2 transition-all z-10 ${
                  theme === 'editorial'
                    ? 'left-[-10px] bg-[#3b82f6] text-white editorial-border editorial-shadow rotate-[3deg] group-hover:rotate-0'
                    : theme === 'zen'
                    ? 'left-6 bg-white/80 backdrop-blur-md border border-black/10'
                    : theme === 'neumorphic'
                    ? 'left-6 neu-flat rounded-full'
                    : theme === 'retro'
                    ? 'left-6 win95-titlebar border-2 border-white border-r-black border-b-black'
                    : 'left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl'
                }`}>
                   <p className={`font-serif italic font-bold text-lg ${theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' ? 'text-black' : 'text-white'}`}>Verified</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* LOAD MORE */}
          {certs.length > 4 && visibleCount < certs.length && (
            <div className="mt-20 flex justify-center">
              <button
                onClick={() => setVisibleCount(certs.length)}
                className={`px-10 py-5 text-xs font-black uppercase tracking-[0.2em] transition-all hover:-translate-y-1 active:translate-y-1 ${
                  theme === 'editorial'
                    ? 'bg-[#ff5733] editorial-border editorial-shadow text-white active:shadow-none'
                    : theme === 'zen'
                    ? 'bg-transparent border border-black/10 text-black hover:bg-black hover:text-white'
                    : theme === 'neumorphic'
                    ? 'neu-flat active:neu-pressed rounded-full text-[#31344b] hover:shadow-none'
                    : theme === 'retro'
                    ? 'win95-button text-black active:win95-pressed hover:-translate-y-0 active:translate-y-0'
                    : 'bg-white text-slate-900 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]'
                }`}
              >
                Load All Credentials
              </button>
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {activeIndex !== null && certs.length > 0 && (
          <CertificateModal
            certs={certs}
            index={activeIndex}
            setIndex={setActiveIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
