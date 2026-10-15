import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
}

/** Centered eyebrow + heading + intro shared by every section. */
export default function SectionHeader({ index, label, title, intro }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center mx-auto max-w-3xl">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.4em] text-[var(--accent-2)]">
          {index} — {label}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-[12vw] md:text-[5.5vw] leading-[0.95] mt-5">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.15}>
          <p className="text-base md:text-lg text-white/85 mt-5 max-w-xl leading-relaxed text-shadow-strong">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
