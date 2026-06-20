import {
  GitHubRepo,
  GitHubLanguages,
  GitHubProfile,
  GitHubStats,
  ProcessedRepo,
  ProjectCategory,
  SkillRating,
} from "@/types/github";
import { GITHUB_USERNAME, CATEGORY_KEYWORDS, SKILL_CONFIGS } from "./constants";

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

async function githubFetch<T>(endpoint: string): Promise<T> {
  const cached = getCached<T>(endpoint);
  if (cached) return cached;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`https://api.github.com${endpoint}`, {
    headers,
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    if (res.status === 403) {
      const resetHeader = res.headers.get("X-RateLimit-Reset");
      const resetTime = resetHeader
        ? new Date(parseInt(resetHeader) * 1000).toISOString()
        : "unknown";
      throw new Error(`GitHub rate limit exceeded. Resets at ${resetTime}`);
    }
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  setCache(endpoint, data);
  return data as T;
}

function categorizeRepo(repo: GitHubRepo): ProjectCategory {
  const searchText = [
    repo.name,
    repo.description || "",
    ...(repo.topics || []),
    repo.language || "",
  ]
    .join(" ")
    .toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => searchText.includes(kw))) {
      return category as ProjectCategory;
    }
  }
  return "Other";
}

export async function fetchProfile(): Promise<GitHubProfile> {
  return githubFetch<GitHubProfile>(`/users/${GITHUB_USERNAME}`);
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const repos = await githubFetch<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
  );
  return repos.filter((r) => !r.fork && !r.archived);
}

export async function fetchRepoLanguages(
  repoName: string
): Promise<GitHubLanguages> {
  return githubFetch<GitHubLanguages>(
    `/repos/${GITHUB_USERNAME}/${repoName}/languages`
  );
}

export async function fetchProcessedRepos(): Promise<ProcessedRepo[]> {
  const repos = await fetchRepos();

  const processed = await Promise.all(
    repos.map(async (repo) => {
      let languages: GitHubLanguages = {};
      try {
        languages = await fetchRepoLanguages(repo.name);
      } catch {
        // skip if rate-limited
      }
      return {
        ...repo,
        category: categorizeRepo(repo),
        languages,
      };
    })
  );

  return processed.sort((a, b) => b.stargazers_count - a.stargazers_count);
}

function computeSkillRatings(
  repos: ProcessedRepo[],
  totalBytes: number
): SkillRating[] {
  const langStats: Record<string, { bytes: number; repos: number }> = {};

  for (const repo of repos) {
    for (const [lang, bytes] of Object.entries(repo.languages)) {
      if (!langStats[lang]) langStats[lang] = { bytes: 0, repos: 0 };
      langStats[lang].bytes += bytes;
      langStats[lang].repos += 1;
    }
  }

  return Object.entries(langStats)
    .map(([name, stats]) => {
      const percentage = totalBytes > 0 ? (stats.bytes / totalBytes) * 100 : 0;
      const repoFactor = Math.min(stats.repos / repos.length, 1);
      const level = Math.min(
        Math.round(percentage * 0.6 + repoFactor * 40),
        99
      );
      const config = SKILL_CONFIGS[name] || { icon: "📦", color: "#888" };
      return {
        name,
        level: Math.max(level, 10),
        repoCount: stats.repos,
        icon: config.icon,
        color: config.color,
      };
    })
    .sort((a, b) => b.level - a.level)
    .slice(0, 12);
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [profile, repos] = await Promise.all([
    fetchProfile(),
    fetchProcessedRepos(),
  ]);

  let totalStars = 0;
  let totalForks = 0;
  const langTotals: Record<string, number> = {};

  for (const repo of repos) {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
    for (const [lang, bytes] of Object.entries(repo.languages)) {
      langTotals[lang] = (langTotals[lang] || 0) + bytes;
    }
  }

  const totalBytes = Object.values(langTotals).reduce((a, b) => a + b, 0);

  const topLanguages = Object.entries(langTotals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8);

  const years = new Set(repos.map((r) => new Date(r.created_at).getFullYear()));

  return {
    totalStars,
    totalForks,
    totalRepos: repos.length,
    topLanguages,
    skills: computeSkillRatings(repos, totalBytes),
    contributionYears: Array.from(years).sort(),
    profile,
  };
}
