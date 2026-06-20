"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.5 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/5">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: progress,
            background:
              "linear-gradient(90deg,#f2b14c,#e8743b,#d8527c)",
          }}
        />
      </div>

      {/* Brand */}
      <button
        onClick={() => go("hero")}
        className="fixed top-6 left-6 md:left-10 z-50 text-left"
      >
        <span className="font-display text-xl tracking-wide text-[var(--fg)]">
          JOBAYER<span className="text-sunset">.</span>
        </span>
      </button>

      {/* Contact shortcut */}
      <button
        onClick={() => go("contact")}
        className="fixed top-6 right-6 md:right-10 z-50 text-[11px] uppercase tracking-[0.25em] text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
      >
        Get in touch
      </button>

      {/* Side dots */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            className="group flex items-center gap-3 justify-end"
          >
            <span
              className={`text-[10px] uppercase tracking-widest transition-all ${
                active === s.id
                  ? "text-[var(--fg)] opacity-100"
                  : "text-[var(--muted)] opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all ${
                active === s.id
                  ? "w-3 h-3 bg-[var(--accent)]"
                  : "w-2 h-2 bg-white/25 group-hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
