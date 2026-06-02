import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeSequence({ onDone }) {
  const [step, setStep] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Small delay to let the user realize it's loaded
    const t = setTimeout(() => setTextVisible(true), 500);
    return () => clearTimeout(t);
  }, [step]);

  const advance = () => {
    setTextVisible(false);
    setTimeout(() => {
      if (step === 1) {
        onDone();
      } else {
        setStep(step + 1);
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col justify-center items-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={
          step === 0
            ? { backgroundColor: "white", color: "black", fontFamily: "Times New Roman, serif" }
            : { backgroundColor: "#f3f4f6", color: "#1f2937", fontFamily: "Inter, system-ui, sans-serif" }
        }
      >
        <div 
          className="w-full transition-all duration-500"
          style={
            step === 0
              ? { padding: "20px", maxWidth: "100%", textAlign: "left" }
              : { padding: "40px", maxWidth: "600px", margin: "0 auto", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }
          }
        >
          {/* Simulated content */}
          <h1 
            style={
              step === 0 
                ? { fontSize: "2em", margin: "0.67em 0", fontWeight: "bold" } 
                : { fontSize: "2.5rem", margin: "0 0 0.5rem 0", fontWeight: "800", color: "#111827", letterSpacing: "-0.05em" }
            }
          >
            Roshinth Sojan
          </h1>
          
          <p
            style={
              step === 0
                ? { margin: "1em 0" }
                : { fontSize: "1.125rem", color: "#4b5563", marginBottom: "2rem", lineHeight: "1.6" }
            }
          >
            Full-stack engineer and interface designer.
          </p>

          <ul
            style={
              step === 0
                ? { display: "block", listStyleType: "disc", marginBlockStart: "1em", marginBlockEnd: "1em", paddingInlineStart: "40px" }
                : { display: "flex", gap: "1.5rem", listStyleType: "none", padding: 0, margin: "0 0 2rem 0" }
            }
          >
            <li>
              <a href="#" onClick={e => e.preventDefault()} style={step === 0 ? { color: "blue", textDecoration: "underline", cursor: "pointer" } : { color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>Home</a>
            </li>
            <li>
              <a href="#" onClick={e => e.preventDefault()} style={step === 0 ? { color: "blue", textDecoration: "underline", cursor: "pointer" } : { color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>About</a>
            </li>
            <li>
              <a href="#" onClick={e => e.preventDefault()} style={step === 0 ? { color: "blue", textDecoration: "underline", cursor: "pointer" } : { color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>Projects</a>
            </li>
            <li>
              <a href="#" onClick={e => e.preventDefault()} style={step === 0 ? { color: "blue", textDecoration: "underline", cursor: "pointer" } : { color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>Contact</a>
            </li>
          </ul>

          <hr style={step === 0 ? {} : { border: "none", borderTop: "1px solid #e5e7eb", margin: "2rem 0" }} />

          <div 
            style={{ 
              opacity: textVisible ? 1 : 0, 
              transition: "opacity 0.3s",
              marginTop: step === 0 ? "2em" : "0"
            }}
          >
            <p style={step === 0 ? { fontWeight: "bold" } : { color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
              {step === 0 ? "Warning: No CSS detected." : "System update: CSS successfully applied."}
            </p>

            <button
              onClick={advance}
              style={
                step === 0
                  ? { backgroundColor: "#efefef", border: "1px solid #767676", color: "black", padding: "1px 6px", cursor: "pointer", fontFamily: "Arial" }
                  : { backgroundColor: "#111827", color: "white", border: "none", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", transition: "transform 0.1s" }
              }
            >
              {step === 0 ? "Add CSS?" : "Add Animations & Magic?"}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
