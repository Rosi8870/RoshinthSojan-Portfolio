import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function FloatingDevBar() {
  const [isGraffitiActive, setIsGraffitiActive] = useState(false);
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);

  // ==========================================
  // GRAFFITI (PAINT) LOGIC
  // ==========================================
  useEffect(() => {
    if (!isGraffitiActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const updateSize = () => {
      // Create a temporary canvas to save current drawing
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      if (canvas.width > 0 && canvas.height > 0) {
        tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
      }

      canvas.width = document.documentElement.scrollWidth;
      canvas.height = document.documentElement.scrollHeight;
      
      // Restore drawing
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
      // Cool dynamic neon color based on mouse position
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
      {/* 🎨 GRAFFITI CANVAS LAYER */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 z-40"
        style={{ 
          pointerEvents: isGraffitiActive ? 'auto' : 'none',
          cursor: isGraffitiActive ? 'crosshair' : 'default'
        }}
      />

      {/* 🎛️ FLOATING DEV TOOLBAR */}
      <motion.div 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="fixed bottom-8 left-8 z-[60] flex flex-col gap-4"
      >
        {/* Graffiti Button */}
        <button 
          onClick={() => {
            setIsGraffitiActive(!isGraffitiActive);
            // Clear canvas when turning off
            if (isGraffitiActive && canvasRef.current) {
               const ctx = canvasRef.current.getContext('2d');
               ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
          }}
          className={`relative group w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl transition-all duration-300 ${
            isGraffitiActive 
              ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.6)] scale-110' 
              : 'bg-black/50 text-white border border-white/10 backdrop-blur-md hover:bg-white/10 hover:scale-105'
          }`}
        >
          <span className="relative z-10">🎨</span>
          <span className="absolute left-full ml-4 px-3 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isGraffitiActive ? 'Clear Canvas & Close' : 'Graffiti Mode'}
          </span>
        </button>
      </motion.div>
    </>
  );
}
