import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  Download,
  CheckCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import resume from "../assets/RoshinthSojan.pdf";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!glowRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    glowRef.current.style.left = `${e.clientX - r.left}px`;
    glowRef.current.style.top = `${e.clientY - r.top}px`;
  };

  /* 🔥 FIRESTORE SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "contact-messages"), data);
      setSent(true);
      form.reset();
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-medium text-cyan-300">
              Open to freelance & full-time roles
            </span>

            <h2 className="mt-6 text-4xl font-extrabold sm:text-5xl">
              Let’s build something great
            </h2>

            <p className="mt-6 max-w-lg text-white/65">
              Have a project, idea, or opportunity?  
              I’m always open to discussing meaningful work.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={resume}
                download
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>

              <a
                href="https://github.com/Rosi8870"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>

            <div className="mt-10 space-y-4">
              <ContactLink
                icon={<Mail />}
                label="Email"
                value="roshinthr2004@gmail.com"
                href="mailto:roshinthr2004@gmail.com"
              />
              <ContactLink
                icon={<Linkedin />}
                label="LinkedIn"
                value="roshinth-sojan"
                href="https://www.linkedin.com/in/roshinth-sojan-846880264/"
              />
            </div>
          </motion.div>

          {/* RIGHT — FORM */}
          <motion.div
            onMouseMove={handleMouseMove}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <div
              ref={glowRef}
              className="pointer-events-none absolute h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[120px]"
            />

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="mb-6 text-xl font-semibold">
                    Send a message
                  </h3>

                  <div className="space-y-4">
                    <input
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                    />

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your email"
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                    />

                    <textarea
                      name="message"
                      required
                      rows="5"
                      placeholder="Tell me about your idea..."
                      className="w-full resize-none rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-semibold text-slate-900 shadow-lg disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <CheckCircle className="h-16 w-16 text-cyan-400" />
                  <h4 className="mt-6 text-xl font-semibold">
                    Message sent successfully
                  </h4>
                  <p className="mt-2 text-white/60">
                    I’ll get back to you soon 🚀
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Contact link */
function ContactLink({ icon, label, value, href }) {
  return (
    <a
      href={href}
      target="_blank"
      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md transition hover:-translate-y-1"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-400">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase text-white/50">{label}</p>
        <p className="text-sm text-white/90">{value}</p>
      </div>
    </a>
  );
}
