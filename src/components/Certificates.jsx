import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import CertificateModal from "./CertificateModal";

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

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
      <section id="certificates"className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-16 text-center text-4xl font-extrabold">
            Certifications
          </h2>

          {/* GRID */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {certs.slice(0, visibleCount).map((c, i) => (
              <motion.div
                key={c.id}
                onClick={() => {
                  console.log("OPEN CERT INDEX:", i); // 🔍 DEBUG
                  setActiveIndex(i);
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative z-10 cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
              >
                {/* glow (non-blocking) */}
                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-cyan-400/20 opacity-0 blur-2xl transition group-hover:opacity-100" />

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/40 flex items-center justify-center">
                  <img
                    src={c.Img}
                    alt="Certificate"
                    className="max-h-full max-w-full object-contain transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* LOAD MORE */}
          {certs.length > 3 && visibleCount < certs.length && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setVisibleCount(certs.length)}
                className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-medium text-white backdrop-blur-md hover:bg-white/10"
              >
                Load More
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
