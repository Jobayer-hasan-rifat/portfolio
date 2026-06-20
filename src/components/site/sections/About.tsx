"use client";

import Reveal from "../Reveal";
import type { GitHubStats } from "@/types/github";

export default function About({ stats }: { stats: GitHubStats | null }) {
  const facts = [
    { k: "Repositories", v: stats?.totalRepos ?? "—" },
    { k: "Stars", v: stats?.totalStars ?? "—" },
    { k: "Languages", v: stats?.topLanguages?.length ?? "—" },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center px-6 md:px-16 py-28"
    >
      <div className="max-w-6xl mx-auto w-full">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">
            01 — About
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-[10vw] md:text-[5.5vw] leading-[0.95] mt-6 max-w-4xl">
            I turn <span className="text-sunset">ideas</span> into
            intelligent systems.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-[0.9fr_1.3fr_0.9fr] gap-10 md:gap-12 mt-14 items-start">
          {/* Portrait */}
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group">
              <img
                src="/images/profile.jpeg"
                alt="Jobayer Hasan"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              {/* sunset rim */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(232,116,59,0.45) 100%)",
                }}
              />
              {/* edge gradient frame */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
              {/* bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-2)]">
                  Jobayer Hasan
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] mt-0.5">
                  AI Engineer · Dhaka
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-[var(--fg)]/85 leading-relaxed">
              {stats?.profile?.bio ||
                "I'm an AI Engineer and full-stack developer focused on computer vision, machine learning and shipping production-grade intelligent products."}
            </p>
            <p className="mt-6 text-base text-[var(--muted)] leading-relaxed">
              From research notebooks to deployed applications, I work across
              the whole stack — designing models, building the systems around
              them, and crafting the interfaces people actually use.
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.25}>
            <div className="flex flex-col gap-8">
              {facts.map((f) => (
                <div key={f.k} className="border-l border-white/10 pl-5">
                  <div className="font-display text-5xl md:text-6xl text-[var(--fg)]">
                    {f.v}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)] mt-1">
                    {f.k}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
