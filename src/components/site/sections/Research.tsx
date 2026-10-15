"use client";

import Reveal from "../Reveal";
import SectionHeader from "../SectionHeader";

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
        <SectionHeader
          index="04"
          label="Research"
          title={
            <>
              Curiosity is the <span className="text-sunset">engine</span>.
            </>
          }
        />

        <div className="grid sm:grid-cols-2 gap-px mt-16 bg-white/8 rounded-2xl overflow-hidden">
          {AREAS.map((a, i) => (
            <Reveal key={a.t} delay={0.06 * i} className="bg-black/70 backdrop-blur-md">
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
