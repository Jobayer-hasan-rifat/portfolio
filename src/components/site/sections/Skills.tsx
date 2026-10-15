"use client";

import { motion } from "framer-motion";
import Reveal from "../Reveal";
import SectionHeader from "../SectionHeader";

const ICON_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";
const MONO_CDN = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons";

interface Tool {
  name: string;
  /** devicon path, e.g. "react/react-original" */
  icon?: string;
  /** Monochrome dark icons need inverting to show on the dark background. */
  invert?: boolean;
  /** simple-icons slug, tinted with `tint` (for tools devicon doesn't cover). */
  mono?: string;
  tint?: string;
}

interface Group {
  title: string;
  badge?: string;
  blurb: string;
  color: string;
  tools: Tool[];
}

const GROUPS: Group[] = [
  {
    title: "Frontend",
    blurb: "Responsive, component-driven interfaces",
    color: "#61dafb",
    tools: [
      { name: "HTML", icon: "html5/html5-original" },
      { name: "CSS", icon: "css3/css3-original" },
      { name: "JavaScript", icon: "javascript/javascript-original" },
      { name: "TypeScript", icon: "typescript/typescript-original" },
      { name: "React", icon: "react/react-original" },
      { name: "Redux", icon: "redux/redux-original" },
      { name: "Next.js", icon: "nextjs/nextjs-original", invert: true },
      { name: "Tailwind", icon: "tailwindcss/tailwindcss-original" },
    ],
  },
  {
    title: "Backend",
    blurb: "REST APIs, JWT auth, role-based access",
    color: "#8cc84b",
    tools: [
      { name: "Node.js", icon: "nodejs/nodejs-original" },
      { name: "Express", icon: "express/express-original", invert: true },
      { name: "Python", icon: "python/python-original" },
      { name: "Flask", icon: "flask/flask-original", invert: true },
      { name: "PHP", icon: "php/php-original" },
      { name: "Laravel", icon: "laravel/laravel-original" },
    ],
  },
  {
    title: "AI & Machine Learning",
    blurb: "CNNs for visual defect detection",
    color: "#ee4c2c",
    tools: [
      { name: "PyTorch", icon: "pytorch/pytorch-original" },
      { name: "TensorFlow", icon: "tensorflow/tensorflow-original" },
      { name: "OpenCV", icon: "opencv/opencv-original" },
      { name: "scikit-learn", icon: "scikitlearn/scikitlearn-original" },
      { name: "NumPy", icon: "numpy/numpy-original" },
    ],
  },
  {
    title: "Databases",
    blurb: "Schema design for document and relational data",
    color: "#47a248",
    tools: [
      { name: "MongoDB", icon: "mongodb/mongodb-original" },
      { name: "MySQL", icon: "mysql/mysql-original" },
      { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
      { name: "Supabase", icon: "supabase/supabase-original" },
    ],
  },
  {
    title: "Tools & Platforms",
    blurb: "Shipping, real-time, and day-to-day workflow",
    color: "#f2b14c",
    tools: [
      { name: "Git", icon: "git/git-original" },
      { name: "GitHub", icon: "github/github-original", invert: true },
      { name: "Vercel", icon: "vercel/vercel-original", invert: true },
      { name: "Netlify", icon: "netlify/netlify-original" },
      { name: "Socket.io", icon: "socketio/socketio-original", invert: true },
      { name: "Postman", icon: "postman/postman-original" },
      { name: "VS Code", icon: "vscode/vscode-original" },
      { name: "Linux", icon: "linux/linux-original" },
    ],
  },
  {
    title: "Cybersecurity",
    badge: "Learning",
    blurb: "Web security, networking, and hands-on labs",
    color: "#9fef00",
    tools: [
      { name: "Kali Linux", mono: "kalilinux", tint: "#6fb3e0" },
      { name: "Wireshark", mono: "wireshark", tint: "#4fa3d9" },
      { name: "Burp Suite", mono: "burpsuite", tint: "#ff6633" },
      { name: "OWASP Top 10", mono: "owasp", tint: "#f2efe9" },
      { name: "Bash", icon: "bash/bash-original", invert: true },
    ],
  },
];

function ToolTile({ tool, color }: { tool: Tool; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-4 hover:border-white/30 transition-colors"
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 30%, ${color}33, transparent 70%)` }}
      />
      {tool.mono ? (
        // Single-color brand marks: use the SVG as a mask and paint it
        <span
          aria-hidden="true"
          className="relative w-9 h-9 md:w-10 md:h-10"
          style={{
            backgroundColor: tool.tint,
            mask: `url(${MONO_CDN}/${tool.mono}.svg) center / contain no-repeat`,
            WebkitMask: `url(${MONO_CDN}/${tool.mono}.svg) center / contain no-repeat`,
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${ICON_CDN}/${tool.icon}.svg`}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className={`relative w-9 h-9 md:w-10 md:h-10 ${tool.invert ? "invert" : ""}`}
        />
      )}
      <span className="relative text-xs md:text-[13px] text-white/90 text-center">{tool.name}</span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen flex items-center px-5 md:px-16 py-28">
      <div className="max-w-6xl mx-auto w-full">
        <SectionHeader
          index="02"
          label="Skills"
          title={
            <>
              The <span className="text-sunset">stack</span>
            </>
          }
          intro="The tools I reach for to ship web apps and train vision models."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-5 mt-14">
          {GROUPS.map((g, i) => (
            <Reveal
              key={g.title}
              delay={0.06 * i}
              // Two rows of three cards on large screens
              className="lg:col-span-2"
            >
              <div className="h-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
                  <h3 className="font-display text-2xl tracking-wide text-white">{g.title}</h3>
                  {g.badge && (
                    <span
                      className="ml-auto text-[11px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border"
                      style={{ color: g.color, borderColor: `${g.color}66` }}
                    >
                      {g.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--muted)] mt-1.5">{g.blurb}</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mt-5">
                  {g.tools.map((t) => (
                    <ToolTile key={t.name} tool={t} color={g.color} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
