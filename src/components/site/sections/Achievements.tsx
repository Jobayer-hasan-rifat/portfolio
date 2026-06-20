"use client";

import { useMemo } from "react";
import Reveal from "../Reveal";
import type { GitHubStats } from "@/types/github";

export default function Achievements({
  stats,
}: {
  stats: GitHubStats | null;
}) {
  const items = useMemo(() => {
    const stars = stats?.totalStars ?? 0;
    const repos = stats?.totalRepos ?? 0;
    const langs = stats?.topLanguages?.length ?? 0;
    const years = stats?.contributionYears?.length ?? 0;
    return [
      { t: "First Light", d: "Shipped the first public repository", on: repos >= 1 },
      { t: "Constellation", d: "10+ public repositories", on: repos >= 10 },
      { t: "Star Forged", d: "Earned community stars", on: stars >= 1 },
      { t: "Supernova", d: "25+ total stars", on: stars >= 25 },
      { t: "Polyglot", d: "5+ languages in active use", on: langs >= 5 },
      { t: "Veteran", d: "3+ years of building", on: years >= 3 },
    ];
  }, [stats]);

  return (
    <section
      id="achievements"
      className="relative min-h-screen flex items-center px-6 md:px-16 py-28"
    >
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">
            05 — Milestones
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[10vw] md:text-[5.5vw] leading-[0.95] mt-6">
            Earned along the <span className="text-sunset">way</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {items.map((a, i) => (
            <Reveal key={a.t} delay={0.05 * i}>
              <div
                className={`rounded-2xl border p-6 h-full transition-colors ${
                  a.on
                    ? "border-[var(--accent)]/30 bg-[var(--accent)]/[0.06]"
                    : "border-white/8 bg-white/[0.01] opacity-50"
                }`}
              >
                <div className="text-3xl mb-3">{a.on ? "🏆" : "🔒"}</div>
                <h3 className="font-display text-xl text-[var(--fg)]">{a.t}</h3>
                <p className="text-xs text-[var(--muted)] mt-1.5 leading-relaxed">
                  {a.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
