export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  pushed_at: string;
  size: number;
  open_issues_count: number;
  fork: boolean;
  archived: boolean;
}

export interface GitHubLanguages {
  [language: string]: number;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
}

export type ProjectCategory =
  | "Machine Learning"
  | "Computer Vision"
  | "AI"
  | "Web Development"
  | "Research"
  | "Open Source"
  | "Tools"
  | "Other";

export interface ProcessedRepo extends GitHubRepo {
  category: ProjectCategory;
  languages: GitHubLanguages;
}

export interface SkillRating {
  name: string;
  level: number;
  repoCount: number;
  icon: string;
  color: string;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  topLanguages: { name: string; percentage: number; bytes: number }[];
  skills: SkillRating[];
  contributionYears: number[];
  profile: GitHubProfile;
}
