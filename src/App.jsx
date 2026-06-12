import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import Projects from "./components/Projects";
import Comments from "./components/Comments";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import WelcomeSequence from "./components/WelcomeSequence";
import CommandPalette from "./components/CommandPalette";
import KonamiEasterEgg from "./components/KonamiEasterEgg";
import Minimap from "./components/Minimap";
import GraffitiSecret from "./components/GraffitiSecret";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const [paused, setPaused] = useState(true);
  const { theme } = useTheme();

  return (
    <>
      {paused && <WelcomeSequence onDone={() => setPaused(false)} />}

      <SmoothScroll>
        <div className={`relative overflow-hidden transition-colors duration-700 ${
          theme === 'editorial' ? 'bg-[#f2efe9] text-[#111111]' 
          : theme === 'spatial' ? 'bg-[#0f172a] text-white font-sans'
          : theme === 'cyber' ? 'bg-[#050505] text-[#00ff41] font-mono'
          : theme === 'zen' ? 'bg-white text-black font-sans'
          : theme === 'neumorphic' ? 'bg-[#e0e5ec] text-[#31344b] font-sans'
          : 'bg-[#008080] text-black font-mono' // retro
        }`}>
          {/* Cyber Background Overlay */}
          {theme === 'cyber' && (
            <div className="fixed inset-0 z-50 pointer-events-none crt-overlay opacity-30 mix-blend-screen"></div>
          )}

          {/* Spatial Background Mesh Gradients */}
          {theme === 'spatial' && (
            <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
              <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/30 mix-blend-screen blur-[120px]"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/20 mix-blend-screen blur-[120px]"></div>
              <div className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-teal-500/20 mix-blend-screen blur-[100px]"></div>
            </div>
          )}
          
          <div className="relative z-10">
            <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Certificates />
            <Comments />
            <Contact />
            <Footer />
          </main>
          </div>
        </div>
      </SmoothScroll>
      <Minimap />
      <CommandPalette />
      <KonamiEasterEgg />
      <GraffitiSecret />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}