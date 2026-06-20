"use client";

import { motion } from "framer-motion";
import Reveal from "../Reveal";
import type { ProcessedRepo } from "@/types/github";

const CATEGORY_COLOR: Record<string, string> = {
  "Machine Learning": "#e8743b",
  "Computer Vision": "#3fb6c4",
  AI: "#7a4cf2",
  "Web Development": "#61dafb",
  Research: "#f2b14c",
  "Open Source": "#5fd38d",
  Tools: "#d8527c",
  Other: "#9aa0a6",
};

function ProjectCard({ repo, index }: { repo: ProcessedRepo; index: number }) {
  const color = CATEGORY_COLOR[repo.category] || "#9aa0a6";
  const langs = Object.keys(repo.languages || {}).slice(0, 3);
  const liveUrl = repo.homepage && repo.homepage.trim() ? repo.homepage : null;

  return (
    <Reveal delay={0.04 * (index % 3)}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-sm overflow-hidden p-6 flex flex-col"
      >
        {/* hover glow */}
        <div
          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at 50% 0%, ${color}22, transparent 70%)`,
          }}
        />
        <div className="relative flex flex-col flex-1">
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
              style={{ color, background: `${color}18` }}
            >
              {repo.category}
            </span>
            <span className="text-xs text-[var(--muted)]">
              ★ {repo.stargazers_count}
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl capitalize leading-tight text-[var(--fg)] group-hover:text-sunset transition-colors">
            {repo.name.replace(/[-_]/g, " ")}
          </h3>

          <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed line-clamp-3 min-h-[3.6em]">
            {repo.description || "An exploration in code — open to see the build."}
          </p>

          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {langs.map((l) => (
              <span
                key={l}
                className="text-[10px] text-[var(--muted)] px-2 py-0.5 rounded-full bg-white/5"
              >
                {l}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-5 pt-5 border-t border-white/8">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.2em] px-3 py-2.5 rounded-lg border border-white/15 text-[var(--fg)]/85 hover:border-white/40 hover:text-[var(--fg)] hover:bg-white/[0.04] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              Repo
            </a>
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.2em] px-3 py-2.5 rounded-lg font-semibold text-[#0a0a0a] hover:scale-[1.02] transition-transform"
                style={{
                  background:
                    "linear-gradient(90deg,#f2b14c,#e8743b,#d8527c)",
                }}
              >
                Live ↗
              </a>
            ) : (
              <span className="flex-1 inline-flex items-center justify-center text-[11px] uppercase tracking-[0.2em] px-3 py-2.5 rounded-lg border border-white/8 text-[var(--muted)]/60">
                No demo
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Projects({ repos }: { repos: ProcessedRepo[] }) {
  const list = (repos || []).slice(0, 9);

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center px-6 md:px-16 py-28"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">
                03 — Projects
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[10vw] md:text-[5.5vw] leading-[0.95] mt-6">
                Selected <span className="text-sunset">work</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="text-sm text-[var(--muted)] max-w-xs">
              Pulled straight from GitHub and sorted by impact. Every card opens
              the real repository.
            </p>
          </Reveal>
        </div>

        {list.length === 0 ? (
          <p className="text-[var(--muted)]">
            Syncing projects from GitHub… check back in a moment.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}

        <Reveal delay={0.2}>
          <a
            href="https://github.com/Jobayer-hasan-rifat?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-12 text-sm uppercase tracking-[0.25em] text-[var(--fg)] hover:text-sunset transition-colors"
          >
            All repositories
            <span className="text-[var(--accent)]">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
