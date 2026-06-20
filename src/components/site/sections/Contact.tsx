"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import { SITE_CONFIG } from "@/lib/constants";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center px-6 md:px-16 py-28"
    >
      <div className="max-w-5xl mx-auto w-full">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">
            06 — Contact
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[12vw] md:text-[7vw] leading-[0.9] mt-6">
            Let&apos;s build <span className="text-sunset">something</span>.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1.1fr] gap-14 mt-16">
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="group flex items-center justify-between border-b border-white/10 pb-4"
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
                  Email
                </span>
                <span className="text-base text-[var(--fg)] group-hover:text-sunset transition-colors">
                  {SITE_CONFIG.email}
                </span>
              </a>
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-white/10 pb-4"
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
                  GitHub
                </span>
                <span className="text-base text-[var(--fg)] group-hover:text-sunset transition-colors">
                  @Jobayer-hasan-rifat →
                </span>
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-white/10 pb-4"
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
                  LinkedIn
                </span>
                <span className="text-base text-[var(--fg)] group-hover:text-sunset transition-colors">
                  Connect →
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                window.open(
                  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
                    `Portfolio message from ${fd.get("name")}`
                  )}&body=${encodeURIComponent(String(fd.get("message") || ""))}`,
                  "_blank"
                );
                setSent(true);
              }}
            >
              <input
                name="name"
                required
                placeholder="Your name"
                className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project…"
                className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="mt-2 rounded-xl py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition-transform hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(90deg,#f2b14c,#e8743b,#d8527c)",
                }}
              >
                {sent ? "Message ready ✓" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="mt-20 text-[11px] uppercase tracking-[0.3em] text-[var(--muted)] text-center">
            © {new Date().getFullYear()} Jobayer Hasan · Built with Next.js &
            Three.js
          </p>
        </Reveal>
      </div>
    </section>
  );
}
