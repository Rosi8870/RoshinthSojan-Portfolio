import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = ['s', 'o', 'j', 'a', 'n'];

export default function KonamiEasterEgg() {
  const [typed, setTyped] = useState("");
  const [isHacked, setIsHacked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isHacked) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key.length !== 1) return; // ignore Shift, Ctrl, etc

      const key = e.key.toLowerCase();
      
      setTyped(prev => {
        const expectedNextChar = KONAMI_CODE[prev.length];
        
        let newTyped = "";
        if (key === expectedNextChar) {
          newTyped = prev + key;
        } else if (key === KONAMI_CODE[0]) {
          newTyped = key;
        }

        if (newTyped.length === KONAMI_CODE.length) {
          setIsHacked(true);
          
          document.body.classList.add('shake-screen');
          document.body.style.filter = 'invert(1) hue-rotate(180deg) saturate(300%) contrast(200%)';

          setTimeout(() => {
            setIsHacked(false);
            setTyped("");
            
            document.body.classList.remove('shake-screen');
            document.body.style.filter = 'none';
          }, 4000);
        }

        // Auto-clear if they stop typing for 3 seconds
        clearTimeout(window.typingTimeout);
        if (newTyped.length > 0 && newTyped.length < KONAMI_CODE.length) {
          window.typingTimeout = setTimeout(() => setTyped(""), 3000);
        }

        return newTyped;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHacked]);

  return (
    <>
      {/* Visual Typing Indicator */}
      <AnimatePresence>
        {typed.length > 0 && !isHacked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[50] pointer-events-none flex gap-2"
          >
            {KONAMI_CODE.map((char, i) => (
              <motion.div 
                key={i} 
                initial={false}
                animate={{
                  scale: i < typed.length ? [1, 1.2, 1.1] : 1,
                }}
                className={`w-12 h-14 flex items-center justify-center text-2xl font-bold font-mono rounded-lg border-2 transition-colors duration-200 ${
                  i < typed.length 
                    ? 'border-[#ff5733] bg-[#ff5733] text-white shadow-[0_0_20px_rgba(255,87,51,0.6)]' 
                    : 'border-gray-400/30 text-gray-400/50 bg-black/5 backdrop-blur-md'
                }`}
              >
                {i < typed.length ? typed[i].toUpperCase() : '_'}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHacked && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center bg-red-600/30 mix-blend-color-burn"
        >
          <motion.h1 
             animate={{ x: [-10, 10, -10], y: [5, -5, 5] }}
             transition={{ duration: 0.1, repeat: Infinity }}
             className="text-[10vw] font-black font-mono text-red-500 uppercase tracking-tighter"
             style={{ textShadow: '4px 4px 0px blue, -4px -4px 0px yellow' }}
          >
            SYSTEM COMPROMISED
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
