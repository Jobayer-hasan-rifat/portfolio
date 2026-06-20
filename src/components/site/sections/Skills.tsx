"use client";

import { motion } from "framer-motion";
import Reveal from "../Reveal";
import type { GitHubStats } from "@/types/github";

const FALLBACK = [
  { name: "Python", level: 95, color: "#3776ab", icon: "🐍", repoCount: 0 },
  { name: "Machine Learning", level: 90, color: "#e8743b", icon: "🤖", repoCount: 0 },
  { name: "Computer Vision", level: 85, color: "#3fb6c4", icon: "👁️", repoCount: 0 },
  { name: "TypeScript", level: 80, color: "#3178c6", icon: "🔷", repoCount: 0 },
  { name: "React / Next.js", level: 82, color: "#61dafb", icon: "⚛️", repoCount: 0 },
  { name: "Databases", level: 72, color: "#f2b14c", icon: "🗄️", repoCount: 0 },
];

export default function Skills({ stats }: { stats: GitHubStats | null }) {
  const skills =
    stats?.skills && stats.skills.length >= 4 ? stats.skills.slice(0, 8) : FALLBACK;

  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center px-6 md:px-16 py-28"
    >
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">
            02 — Skills
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[10vw] md:text-[5.5vw] leading-[0.95] mt-6">
            The <span className="text-sunset">toolkit</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-base text-[var(--muted)] mt-4 max-w-xl">
            Proficiency derived live from my GitHub — languages, repository
            footprint and how often each shows up across my work.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-14 gap-y-7 mt-14">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={0.05 * i}>
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base text-[var(--fg)]">{s.name}</span>
                  <span className="font-display text-xl text-[var(--muted)]">
                    {s.level}
                  </span>
                </div>
                <div className="h-[3px] bg-white/8 overflow-hidden rounded-full">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${s.color}, var(--accent))`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
