import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PAINT_CODE = ['p', 'a', 'i', 'n', 't'];

export default function GraffitiSecret() {
  const [typed, setTyped] = useState("");
  const [isGraffitiActive, setIsGraffitiActive] = useState(false);
  const [toast, setToast] = useState(null);
  
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);

  const showToast = (message, icon) => {
    setToast({ message, icon });
    clearTimeout(window.graffitiToastTimeout);
    window.graffitiToastTimeout = setTimeout(() => setToast(null), 3000);
  };

  // --- Keyboard Listener ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle Escape to exit
      if (e.key === 'Escape') {
         if (isGraffitiActive) {
            if (canvasRef.current) {
               const ctx = canvasRef.current.getContext('2d');
               ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            setIsGraffitiActive(false);
            showToast("Graffiti Mode Deactivated", "❌");
         }
         setTyped("");
         return;
      }

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key.length !== 1) return; // ignore Shift, Ctrl, etc

      const key = e.key.toLowerCase();
      
      setTyped(prev => {
        const expectedNextChar = PAINT_CODE[prev.length];
        
        let newTyped = "";
        if (key === expectedNextChar) {
          newTyped = prev + key;
        } else if (key === PAINT_CODE[0]) {
          newTyped = key;
        }

        // If word is completely typed
        if (newTyped.length === PAINT_CODE.length) {
          if (!isGraffitiActive) {
             setIsGraffitiActive(true);
             showToast("Graffiti Mode Activated. Press ESC to exit.", "🎨");
          } else {
             if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
             }
             setIsGraffitiActive(false);
             showToast("Graffiti Mode Deactivated", "❌");
          }
          return "";
        }

        // Auto-clear typing if they stop typing for 3 seconds
        clearTimeout(window.paintTypingTimeout);
        if (newTyped.length > 0 && newTyped.length < PAINT_CODE.length) {
          window.paintTypingTimeout = setTimeout(() => setTyped(""), 3000);
        }

        return newTyped;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGraffitiActive]); // Re-bind listener when active state changes

  // --- Graffiti Canvas Logic ---
  useEffect(() => {
    if (!isGraffitiActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const updateSize = () => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      if (canvas.width > 0 && canvas.height > 0) {
        tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
      }

      canvas.width = document.documentElement.scrollWidth;
      canvas.height = document.documentElement.scrollHeight;
      
      ctx.drawImage(tempCanvas, 0, 0);
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 15;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const startPaint = (e) => {
      setIsPainting(true);
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY + window.scrollY);
    };
    
    const endPaint = () => {
      setIsPainting(false);
      ctx.beginPath();
    };

    const draw = (e) => {
      if (!isPainting) return;
      const hue = ((e.clientX + e.clientY + window.scrollY) / 10) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      
      ctx.lineTo(e.clientX, e.clientY + window.scrollY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY + window.scrollY);
    };

    window.addEventListener('mousedown', startPaint);
    window.addEventListener('mouseup', endPaint);
    window.addEventListener('mousemove', draw);
    
    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousedown', startPaint);
      window.removeEventListener('mouseup', endPaint);
      window.removeEventListener('mousemove', draw);
    };
  }, [isGraffitiActive, isPainting]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 z-40"
        style={{ 
          pointerEvents: isGraffitiActive ? 'auto' : 'none',
          cursor: isGraffitiActive ? 'crosshair' : 'default'
        }}
      />

      {/* Ephemeral Minimalist Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
             initial={{ opacity: 0, y: 40, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 20, scale: 0.95 }}
             className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-[#1a1a1a] text-white px-5 py-3 rounded-full shadow-2xl pointer-events-none flex items-center gap-3 border border-white/10"
          >
             <span className="text-lg leading-none">{toast.icon}</span>
             <span className="font-sans text-sm font-medium tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Typing Indicator */}
      <AnimatePresence>
        {typed.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[50] pointer-events-none flex gap-2"
          >
            {PAINT_CODE.map((char, i) => (
              <motion.div 
                key={i} 
                initial={false}
                animate={{ scale: i < typed.length ? [1, 1.2, 1.1] : 1 }}
                className={`w-12 h-14 flex items-center justify-center text-2xl font-bold font-mono rounded-lg border-2 transition-colors duration-200 ${
                  i < typed.length 
                    ? 'border-purple-500 bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]' 
                    : 'border-gray-400/30 text-gray-400/50 bg-black/5 backdrop-blur-md'
                }`}
              >
                {i < typed.length ? typed[i].toUpperCase() : '_'}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
