"use client";

import Reveal from "../Reveal";

const AREAS = [
  {
    t: "Computer Vision",
    d: "Detection, segmentation and visual understanding for real-world systems.",
  },
  {
    t: "Machine Learning",
    d: "Model architecture, training pipelines and applied deep learning.",
  },
  {
    t: "AI Engineering",
    d: "Turning research into deployable, production-grade intelligent products.",
  },
  {
    t: "What's next",
    d: "Multimodal models, autonomous agents and on-device inference.",
  },
];

export default function Research() {
  return (
    <section
      id="research"
      className="relative min-h-screen flex items-center px-6 md:px-16 py-28"
    >
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">
            04 — Research
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[9vw] md:text-[5vw] leading-[0.95] mt-6 max-w-4xl">
            Curiosity is the <span className="text-sunset">engine</span>.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-px mt-16 bg-white/8 rounded-2xl overflow-hidden">
          {AREAS.map((a, i) => (
            <Reveal key={a.t} delay={0.06 * i} className="bg-[var(--bg)]">
              <div className="p-8 h-full hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-display text-2xl text-[var(--muted)]">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl text-[var(--fg)]">
                    {a.t}
                  </h3>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
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
