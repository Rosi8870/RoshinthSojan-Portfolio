import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Certificates from "./components/Certificates";
import Projects from "./components/Projects";
import Comments from "./components/Comments";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import IntentPause from "./components/WelcomeScreen";
import SectionDivider from "./components/SectionDivider"; // Import divider

export default function App() {
  const [paused, setPaused] = useState(true);

  return (
    <>
      {paused && <IntentPause onDone={() => setPaused(false)} />}

      <SmoothScroll>
        <div className="relative overflow-hidden bg-[#020617] text-white">
          <Navbar />
          <main>
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Certificates />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Comments />
            <SectionDivider />
            <Contact />
            <Footer />
          </main>
        </div>
      </SmoothScroll>
    </>
  );
}