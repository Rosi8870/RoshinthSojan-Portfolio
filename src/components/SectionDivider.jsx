import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative w-full flex justify-center overflow-hidden">
      <motion.div 
        initial={{ width: "0%", opacity: 0 }}
        whileInView={{ width: "70%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
      />
    </div>
  );
}