import { NextResponse } from "next/server";
import { fetchGitHubStats, fetchProcessedRepos } from "@/lib/github";

export const revalidate = 1800;

const FALLBACK_DATA = {
  stats: {
    totalStars: 0,
    totalForks: 0,
    totalRepos: 0,
    topLanguages: [],
    skills: [],
    contributionYears: [],
    profile: {
      login: "Jobayer-hasan-rifat",
      name: "Jobayer Hasan",
      avatar_url: "",
      bio: "AI Engineer & Full Stack Developer",
      public_repos: 0,
      followers: 0,
      following: 0,
      created_at: "2020-01-01T00:00:00Z",
    },
  },
  repos: [],
};

export async function GET() {
  try {
    const [stats, repos] = await Promise.all([
      fetchGitHubStats(),
      fetchProcessedRepos(),
    ]);

    return NextResponse.json(
      { stats, repos },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("[GitHub API]", error instanceof Error ? error.message : error);
    return NextResponse.json(FALLBACK_DATA, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  }
}
