export const GITHUB_USERNAME = "Jobayer-hasan-rifat";

export const SITE_CONFIG = {
  name: "Jobayer Hasan",
  title: "JOBAYERVERSE",
  description:
    "A living digital universe built from my ideas, projects, research, and creations.",
  tagline:
    "A living digital universe built from my ideas, projects, research, and creations.",
  email: "jobayer9948@gmail.com",
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: "https://www.linkedin.com/in/jobayer-hasan-rifat/",
};

export type PlanetId =
  | "origin"
  | "skills"
  | "nexus"
  | "research"
  | "vault"
  | "comms";

export interface MoonConfig {
  label: string;
  color: string;
}

export interface PlanetConfig {
  id: PlanetId;
  name: string;
  subtitle: string;
  /** Position in the galaxy. The singularity sits at [0,0,0]. */
  position: [number, number, number];
  radius: number;
  /** Core color + atmosphere/glow color. */
  color: string;
  glow: string;
  accent: string;
  objective: string;
  /** Default sub-planets (moons). Data-driven planets may override at runtime. */
  moons: MoonConfig[];
}

/**
 * Six destinations laid out as an ordered ring (a guided tour) around the
 * central Singularity. Consecutive planets are one hop apart, so the player
 * can warp to the "next" world or free-fly. Each sits at a different orbital
 * height so the galaxy reads as 3D, not flat.
 *
 * Order follows the portfolio narrative: About → Skills → Projects →
 * Research → Achievements → Contact.
 */
export const PLANETS: PlanetConfig[] = [
  {
    id: "origin",
    name: "The Origin World",
    subtitle: "About",
    position: [0, 18, 240],
    radius: 26,
    color: "#2e6fb0",
    glow: "#4aa3ff",
    accent: "#7fe7c4",
    objective: "Discover where the journey began",
    moons: [
      { label: "Education", color: "#7fe7c4" },
      { label: "Vision", color: "#4aa3ff" },
      { label: "Interests", color: "#bcd4ff" },
    ],
  },
  {
    id: "skills",
    name: "The Skill Core",
    subtitle: "Skills",
    position: [-208, -22, 120],
    radius: 28,
    color: "#c2410c",
    glow: "#ff8a3d",
    accent: "#ffd27f",
    objective: "Scan the energy towers of mastery",
    moons: [
      { label: "Python", color: "#ffd27f" },
      { label: "ML", color: "#ff8a3d" },
      { label: "Web", color: "#ffb060" },
    ],
  },
  {
    id: "nexus",
    name: "Project Nexus",
    subtitle: "Projects",
    position: [-208, 26, -120],
    radius: 32,
    color: "#7c3aed",
    glow: "#b58cff",
    accent: "#54f0ff",
    objective: "Explore the cyber-city of creations",
    moons: [
      { label: "Featured", color: "#54f0ff" },
      { label: "Recent", color: "#b58cff" },
      { label: "Starred", color: "#e0c0ff" },
    ],
  },
  {
    id: "research",
    name: "Research Singularity",
    subtitle: "Research",
    position: [0, -18, -240],
    radius: 27,
    color: "#0e7490",
    glow: "#34e3ff",
    accent: "#a78bfa",
    objective: "Trace the neural pathways of thought",
    moons: [
      { label: "Vision", color: "#34e3ff" },
      { label: "Learning", color: "#a78bfa" },
      { label: "Future", color: "#7fffd4" },
    ],
  },
  {
    id: "vault",
    name: "Achievement Vault",
    subtitle: "Achievements",
    position: [208, 22, -120],
    radius: 25,
    color: "#b8860b",
    glow: "#ffd700",
    accent: "#fff3b0",
    objective: "Recover the cosmic relics",
    moons: [
      { label: "Bronze", color: "#cd7f32" },
      { label: "Silver", color: "#dfe6f0" },
      { label: "Gold", color: "#ffd700" },
    ],
  },
  {
    id: "comms",
    name: "Communication Station",
    subtitle: "Contact",
    position: [208, -28, 120],
    radius: 22,
    color: "#155e75",
    glow: "#22d3ee",
    accent: "#e0f7ff",
    objective: "Establish interstellar contact",
    moons: [
      { label: "Email", color: "#22d3ee" },
      { label: "GitHub", color: "#e0f7ff" },
      { label: "LinkedIn", color: "#7fd4ff" },
    ],
  },
];

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Machine Learning": [
    "machine-learning",
    "ml",
    "deep-learning",
    "neural-network",
    "tensorflow",
    "pytorch",
    "keras",
    "scikit-learn",
    "sklearn",
  ],
  "Computer Vision": [
    "computer-vision",
    "cv",
    "opencv",
    "image-processing",
    "yolo",
    "detection",
    "segmentation",
  ],
  AI: [
    "artificial-intelligence",
    "ai",
    "nlp",
    "natural-language",
    "gpt",
    "llm",
    "chatbot",
    "transformers",
  ],
  "Web Development": [
    "web",
    "react",
    "nextjs",
    "next",
    "javascript",
    "typescript",
    "html",
    "css",
    "frontend",
    "backend",
    "fullstack",
    "full-stack",
    "node",
    "express",
    "django",
    "flask",
  ],
  Research: ["research", "paper", "thesis", "academic", "survey", "analysis"],
  "Open Source": ["open-source", "oss", "contribution", "community"],
  Tools: ["tool", "cli", "utility", "automation", "script", "bot"],
};

export const SKILL_CONFIGS: Record<
  string,
  { icon: string; color: string }
> = {
  Python: { icon: "🐍", color: "#3776ab" },
  JavaScript: { icon: "⚡", color: "#f7df1e" },
  TypeScript: { icon: "🔷", color: "#3178c6" },
  "Jupyter Notebook": { icon: "📓", color: "#f37626" },
  HTML: { icon: "🌐", color: "#e34c26" },
  CSS: { icon: "🎨", color: "#1572b6" },
  Java: { icon: "☕", color: "#b07219" },
  "C++": { icon: "⚙️", color: "#00599c" },
  C: { icon: "🔧", color: "#555555" },
  Go: { icon: "🐹", color: "#00add8" },
  Rust: { icon: "🦀", color: "#dea584" },
  Shell: { icon: "🐚", color: "#89e051" },
  Dart: { icon: "🎯", color: "#00b4ab" },
  Kotlin: { icon: "🟣", color: "#a97bff" },
  Swift: { icon: "🍎", color: "#f05138" },
  Ruby: { icon: "💎", color: "#cc342d" },
  PHP: { icon: "🐘", color: "#777bb4" },
  R: { icon: "📊", color: "#276dc3" },
  SCSS: { icon: "🎨", color: "#c6538c" },
  Procfile: { icon: "🚀", color: "#3b2f63" },
  Hack: { icon: "🔨", color: "#878787" },
  Blade: { icon: "🗡️", color: "#f7523f" },
  Batchfile: { icon: "📜", color: "#c1f12e" },
  Dockerfile: { icon: "🐳", color: "#384d54" },
  EJS: { icon: "📄", color: "#a91e50" },
  Makefile: { icon: "🔧", color: "#427819" },
  Vue: { icon: "💚", color: "#41b883" },
};

export const SECTION_IDS = {
  hero: "hero",
  playerCard: "player-card",
  training: "training-facility",
  trophyRoom: "trophy-room",
  achievements: "hall-of-achievements",
  matchHistory: "match-history",
  lockerRoom: "locker-room",
  pressConference: "press-conference",
  finale: "finale",
} as const;
