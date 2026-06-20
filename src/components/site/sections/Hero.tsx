"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6"
    >
      {/* Soft scrim so the title reads over the 3D core */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[80vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(7,7,8,0.92) 0%, rgba(7,7,8,0.75) 35%, rgba(7,7,8,0.4) 60%, transparent 80%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-[var(--fg)]/80 mb-6"
          style={{ textShadow: "0 2px 18px rgba(0,0,0,0.8)" }}
        >
          AI Engineer · Machine Learning · Full-Stack
        </motion.p>

        <h1 className="font-display leading-[0.85]">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[18vw] md:text-[13vw] text-white"
            style={{ textShadow: "0 4px 32px rgba(0,0,0,0.85), 0 0 80px rgba(0,0,0,0.5)" }}
          >
            JOBAYER
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[18vw] md:text-[13vw] text-sunset"
          >
            HASAN
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="mt-8 max-w-md text-sm md:text-base text-[var(--fg)]/85 leading-relaxed"
          style={{ textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}
        >
          Building intelligent systems where research meets engineering. A
          cinematic look at the work, one chapter at a time.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--fg)]/70">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
