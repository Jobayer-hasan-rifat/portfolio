"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A floating cosmonaut companion that flies to the active section's side
 * and points at the content with a speech bubble. Cute, ambient guide.
 */

interface Marker {
  id: string;
  side: "left" | "right";
  tip: string;
}

const MARKERS: Marker[] = [
  { id: "hero", side: "right", tip: "Welcome, traveler." },
  { id: "about", side: "left", tip: "Meet Jobayer." },
  { id: "skills", side: "right", tip: "The toolkit." },
  { id: "projects", side: "left", tip: "Real projects, live links." },
  { id: "research", side: "right", tip: "Where curiosity leads." },
  { id: "achievements", side: "left", tip: "Milestones unlocked." },
  { id: "contact", side: "right", tip: "Say hi!" },
];

function Astronaut() {
  return (
    <svg
      viewBox="0 0 120 120"
      width="80"
      height="80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="visor" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#9adfff" />
          <stop offset="0.55" stopColor="#3a6fa8" />
          <stop offset="1" stopColor="#0c1a30" />
        </radialGradient>
        <radialGradient id="helmet" cx="0.5" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cdd6e3" />
        </radialGradient>
        <radialGradient id="body" cx="0.5" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#f6f3ed" />
          <stop offset="1" stopColor="#aab1bd" />
        </radialGradient>
        <linearGradient id="pack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2b14c" />
          <stop offset="1" stopColor="#e8743b" />
        </linearGradient>
      </defs>

      {/* backpack glow */}
      <circle cx="60" cy="74" r="34" fill="#e8743b" opacity="0.18" />

      {/* body */}
      <ellipse cx="60" cy="80" rx="22" ry="20" fill="url(#body)" />
      {/* chest panel */}
      <rect x="50" y="72" width="20" height="14" rx="3" fill="#1a1d24" />
      <circle cx="56" cy="79" r="1.6" fill="#3fb6c4" />
      <circle cx="62" cy="79" r="1.6" fill="#e8743b" />
      <circle cx="68" cy="79" r="1.6" fill="#f2b14c" />

      {/* arms */}
      <ellipse cx="38" cy="78" rx="6" ry="10" fill="url(#body)" transform="rotate(-10 38 78)" />
      <ellipse cx="82" cy="78" rx="6" ry="10" fill="url(#body)" transform="rotate(10 82 78)" />
      <circle cx="33" cy="86" r="4.5" fill="#dcdfe6" />
      <circle cx="87" cy="86" r="4.5" fill="#dcdfe6" />

      {/* helmet */}
      <circle cx="60" cy="48" r="28" fill="url(#helmet)" />
      {/* visor */}
      <ellipse cx="60" cy="48" rx="20" ry="18" fill="url(#visor)" />
      {/* visor shine */}
      <ellipse
        cx="52"
        cy="40"
        rx="6"
        ry="3"
        fill="#ffffff"
        opacity="0.7"
        transform="rotate(-25 52 40)"
      />
      <ellipse cx="67" cy="54" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.45" />

      {/* antenna */}
      <line x1="60" y1="20" x2="60" y2="14" stroke="#9aa6b8" strokeWidth="1.5" />
      <circle cx="60" cy="12" r="2.4" fill="#e8743b">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function AvatarGuide() {
  const [active, setActive] = useState<Marker>(MARKERS[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with greatest intersection
        let best: IntersectionObserverEntry | null = null;
        entries.forEach((e) => {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        });
        if (best && best.isIntersecting) {
          const m = MARKERS.find((x) => x.id === (best as IntersectionObserverEntry).target.id);
          if (m) setActive(m);
        }
      },
      { threshold: [0.35, 0.55, 0.75] }
    );
    MARKERS.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isLeft = active.side === "left";

  return (
    <motion.div
      className="fixed top-1/2 z-40 pointer-events-none hidden md:block"
      animate={{
        left: isLeft ? "4vw" : "auto",
        right: isLeft ? "auto" : "4vw",
        y: "-50%",
      }}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* speech bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.8, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 6 }}
            transition={{ duration: 0.35 }}
            className={`absolute top-2 ${
              isLeft ? "left-[88px]" : "right-[88px]"
            } px-3 py-2 rounded-xl bg-[#0e0e10]/90 backdrop-blur-md border border-white/15 whitespace-nowrap`}
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--fg)]">
              {active.tip}
            </span>
            {/* tail */}
            <span
              className={`absolute top-4 ${
                isLeft ? "-left-1.5" : "-right-1.5"
              } w-3 h-3 rotate-45 bg-[#0e0e10]/90 border-l border-t border-white/15`}
              style={{
                transform: `rotate(45deg)`,
                borderRight: isLeft ? "none" : undefined,
                borderBottom: isLeft ? "none" : undefined,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* astronaut, flipped to face the content */}
        <motion.div
          animate={{ rotate: isLeft ? 8 : -8, scaleX: isLeft ? 1 : -1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <Astronaut />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
