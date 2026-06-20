"use client";

import { useState, useEffect } from "react";
import type { GitHubStats, ProcessedRepo } from "@/types/github";

interface GitHubData {
  stats: GitHubStats | null;
  repos: ProcessedRepo[];
  loading: boolean;
  error: string | null;
}

export function useGitHubData(): GitHubData {
  const [data, setData] = useState<GitHubData>({
    stats: null,
    repos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (!cancelled) {
          setData({
            stats: json.stats,
            repos: json.repos,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setData((prev) => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err.message : "Unknown error",
          }));
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
