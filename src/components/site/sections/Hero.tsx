"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { scrollState } from "@/lib/scrollState";
import { SITE_CONFIG } from "@/lib/constants";

interface Row {
  text: string;
  size: string;
  style: "solid" | "sunset" | "outline";
  reverse?: boolean;
  duration: number;
  /** Separator between repeats; the name row uses plain spacing. */
  separator?: string;
}

const NAME_ROW: Row = {
  text: "Jobayer Hasan",
  size: "text-[26vw] md:text-[17vw]",
  style: "solid",
  duration: 30,
  separator: "",
};

const LOWER_ROWS: Row[] = [
  { text: "AI Engineer · Full-Stack · Security-minded", size: "text-[8vw] md:text-[3vw]", style: "outline", reverse: true, duration: 40 },
  { text: "React · Node · Flask · PyTorch · OpenCV · Supabase", size: "text-[8vw] md:text-[3vw]", style: "sunset", duration: 44 },
  { text: "BRAC University · CS '26 · Dhaka · Open to work", size: "text-[8vw] md:text-[3vw]", style: "outline", reverse: true, duration: 34 },
];

const STYLE_CLASS: Record<Row["style"], string> = {
  solid: "text-white",
  sunset: "text-sunset",
  outline: "text-stroke-strong",
};

function MarqueeRow({ row }: { row: Row }) {
  const sep = row.separator ?? " · ";
  return (
    <div className="flex whitespace-nowrap overflow-hidden" aria-hidden="true">
      <div
        className={`marquee-track flex shrink-0 ${row.reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${row.duration}s` }}
      >
        {/* Two identical halves of three repeats, so the loop is seamless */}
        {Array.from({ length: 6 }, (_, k) => (
          <span
            key={k}
            className={`font-display uppercase leading-[0.9] whitespace-pre pr-[0.4em] ${row.size} ${STYLE_CLASS[row.style]}`}
          >
            {row.text}
            {sep}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Skew the marquee with scroll velocity for a little momentum
  useEffect(() => {
    let raf = 0;
    let skew = 0;
    const tick = () => {
      const target = Math.max(-12, Math.min(12, scrollState.velocity * 0.6));
      skew += (target - skew) * 0.1;
      sectionRef.current?.querySelectorAll<HTMLElement>("[data-skew]").forEach((el) => {
        el.style.transform = `skewX(${-skew}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-16 pb-10"
    >
      <h1 className="sr-only">Jobayer Hasan — AI Engineer, Full-Stack Developer</h1>

      {/* Stage: only the name runs behind the cut-out portrait */}
      <div className="relative w-full h-[50svh] md:h-[54svh] flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute inset-x-0 bottom-[14%] select-none"
        >
          <div data-skew className="will-change-transform">
            <MarqueeRow row={NAME_ROW} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 h-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portrait.png"
            alt="Portrait of Jobayer Hasan"
            className="sticker h-full w-auto object-contain"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </div>

      {/* Supporting lines sit below the portrait, never over it */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="relative w-full select-none mt-3"
      >
        <div data-skew className="flex flex-col gap-[1vw] will-change-transform">
          {LOWER_ROWS.map((row) => (
            <MarqueeRow key={row.text} row={row} />
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative z-10 mt-8 flex flex-col items-center text-center px-6"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => go("projects")}
            className="rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] hover:scale-[1.03] transition-transform"
            style={{ background: "linear-gradient(90deg,#f2b14c,#e8743b,#d8527c)" }}
          >
            View projects
          </button>
          <a
            href="/resume.pdf"
            download="Jobayer_Hasan_Resume.pdf"
            className="rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] border border-white/30 bg-black/40 backdrop-blur text-white hover:border-white/70 transition-colors"
          >
            Download resume
          </a>
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] border border-white/30 bg-black/40 backdrop-blur text-white hover:border-white/70 transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </motion.div>
    </section>
  );
}
