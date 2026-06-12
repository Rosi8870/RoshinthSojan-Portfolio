import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Minimap() {
  const [sections, setSections] = useState([]);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const minimapRef = useRef(null);

  // Use Framer Motion's useScroll for buttery smooth tracking
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      setProgress(v);
    });
  }, [smoothProgress]);

  useEffect(() => {
    const updateMinimapData = () => {
      // Find all major sections of the portfolio
      const sectionElements = Array.from(document.querySelectorAll('section, header, footer'));
      const docHeight = document.documentElement.scrollHeight;
      
      const mapData = sectionElements.map((sec, index) => {
        const rect = sec.getBoundingClientRect();
        const topRelativeToDoc = rect.top + window.scrollY;
        
        // Generate abstract "code blocks" to represent content
        const numBlocks = Math.max(2, Math.floor(rect.height / 150));
        const blocks = Array.from({ length: numBlocks }).map(() => ({
          width: 30 + Math.random() * 70, // 30% to 100% width
          opacity: 0.1 + Math.random() * 0.4
        }));

        return {
          id: sec.id || `section-${index}`,
          topPercent: (topRelativeToDoc / docHeight) * 100,
          heightPercent: (rect.height / docHeight) * 100,
          blocks
        };
      });

      setSections(mapData);
      setDocumentHeight(docHeight);
      setViewportHeight(window.innerHeight);
    };

    updateMinimapData();
    window.addEventListener('resize', updateMinimapData);
    
    // Automatically recalculate if the DOM changes size
    const observer = new ResizeObserver(updateMinimapData);
    observer.observe(document.body);

    // Minor delay to ensure fonts/images load
    setTimeout(updateMinimapData, 1000);

    return () => {
      window.removeEventListener('resize', updateMinimapData);
      observer.disconnect();
    };
  }, []);

  const handleMinimapClick = (e) => {
    if (!minimapRef.current) return;
    const rect = minimapRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    
    // Where did they click relative to the minimap height?
    const clickPercent = clickY / rect.height;
    
    const targetScroll = clickPercent * documentHeight - (window.innerHeight / 2);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  if (documentHeight <= viewportHeight) return null; // No need for minimap if page doesn't scroll

  const thumbHeightPercent = (viewportHeight / documentHeight) * 100;
  // Progress goes from 0 to 1, so we map it to the remaining space
  const thumbTopPercent = progress * (100 - thumbHeightPercent);

  return (
    <div 
      className="fixed right-0 top-0 bottom-0 w-16 z-40 hidden lg:block pointer-events-none"
      style={{ mixBlendMode: 'difference' }}
    >
      <div 
        ref={minimapRef}
        onClick={handleMinimapClick}
        className="absolute right-4 top-24 bottom-24 w-10 bg-white/5 border border-white/20 rounded-lg overflow-hidden backdrop-blur-md cursor-pointer pointer-events-auto hover:bg-white/10 transition-colors duration-300"
      >
        {/* The abstract code lines representing sections */}
        {sections.map((sec) => (
          <div 
            key={sec.id}
            className="absolute left-0 right-0 px-2 flex flex-col gap-[3px] justify-center"
            style={{ 
              top: `${sec.topPercent}%`, 
              height: `${sec.heightPercent}%` 
            }}
          >
            {sec.blocks.map((block, j) => (
              <div 
                key={j}
                className="h-[2px] bg-white rounded-full transition-opacity"
                style={{ 
                  width: `${block.width}%`,
                  opacity: block.opacity
                }}
              />
            ))}
          </div>
        ))}

        {/* The Viewport Thumb Highlighter */}
        <motion.div 
          className="absolute left-0 right-0 bg-white/20 border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.3)] rounded"
          style={{ 
            height: `${thumbHeightPercent}%`,
            top: `${thumbTopPercent}%`
          }}
        >
          {/* Edge highlights for the thumb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
}
