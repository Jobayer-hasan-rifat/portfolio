"use client";

import Reveal from "../Reveal";
import SectionHeader from "../SectionHeader";
import ContributionSnake from "../ContributionSnake";
import type { ContributionCalendar, GitHubStats } from "@/types/github";

export default function About({
  stats,
  contributions,
}: {
  stats: GitHubStats | null;
  contributions: ContributionCalendar | null;
}) {
  const highlights = [
    {
      k: "Education",
      v: "BSc in Computer Science",
      d: "BRAC University, Dhaka · Sept 2026",
    },
    {
      k: "Thesis",
      v: "Automated Visual Inspection for Industrial Environments",
      d: "CNN defect detection with PyTorch and TensorFlow",
    },
    {
      k: "Shipped",
      v: "BRACU Eureka and KajLagbe",
      d: "Full-stack apps, live on Vercel",
    },
    {
      k: "Now",
      v: "Learning cybersecurity",
      d: "Web security and networking fundamentals",
    },
  ];

  const facts = [
    { k: "Repositories", v: stats?.totalRepos ?? "—" },
    { k: "GitHub stars", v: stats?.totalStars ?? "—" },
    { k: "Languages", v: stats?.topLanguages?.length ?? "—" },
  ];

  return (
    <section id="about" className="relative min-h-screen flex items-center px-5 md:px-16 py-28">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        <SectionHeader
          index="01"
          label="About"
          title={
            <>
              I turn <span className="text-sunset">ideas</span> into working systems.
            </>
          }
          intro="I build full-stack web apps and computer-vision models, from the API to the interface."
        />

        <Reveal delay={0.2}>
          <div className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md px-6 py-7 md:px-10 md:py-9">
            <p className="text-lg md:text-xl text-white/95 leading-relaxed">
              Computer Science graduate from BRAC University building full-stack web applications
              with React, Node.js/Express and Python (Flask), backed by MongoDB and MySQL.
            </p>
            <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed">
              I design REST APIs with JWT authentication and role-based access control, add
              real-time features with Socket.io, and deploy to Vercel. I also have a research
              background in deep learning from my computer vision thesis, and I&apos;m currently
              exploring cybersecurity fundamentals.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 mt-6 w-full max-w-3xl text-left">
          {highlights.map((h, i) => (
            <Reveal key={h.k} delay={0.05 * i}>
              <div className="h-full rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md px-5 py-4">
                <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--accent-2)]">{h.k}</div>
                <div className="text-base md:text-lg text-white mt-1.5 leading-snug">{h.v}</div>
                <div className="text-sm text-white/70 mt-1">{h.d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="grid grid-cols-3 gap-4 md:gap-10 mt-12">
            {facts.map((f) => (
              <div key={f.k} className="flex flex-col items-center">
                <div className="font-display text-5xl md:text-7xl text-sunset">{f.v}</div>
                <div className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-white/80 mt-2">
                  {f.k}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {contributions && (
          <Reveal delay={0.1} className="w-full">
            <div className="mt-14 w-full rounded-2xl border border-white/10 bg-black/55 backdrop-blur-md p-5 md:p-7">
              <ContributionSnake calendar={contributions} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
