"use client";
import { useState, useEffect, useCallback } from "react";

export interface Match {
  id: number;
  competition: string;
  homeTeam: { name: string; fullName: string; flag: string };
  awayTeam: { name: string; fullName: string; flag: string };
  homeScore: number | null;
  awayScore: number | null;
  minute: number | null;
  status: "LIVE" | "UPCOMING" | "FT";
  kickoff?: string;
}

export function useLiveMatches(filter = "ALL") {
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [source, setSource] = useState<"live" | "mock">("mock");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMatches = async () => {
      try {
        const res = await fetch("/api/matches", { signal: controller.signal });
        const data = await res.json();
        setAllMatches(data.matches);
        setSource(data.source);
        setLastUpdated(new Date());
      } catch (e: any) {
        if (e.name === "AbortError") return;
        // Suppress generic network dropouts that trigger the Next.js error overlay
        if (e.message !== "Load failed" && e.message !== "Failed to fetch") {
          console.error("Failed to fetch matches", e);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchMatches();
    }, 0);
    const intervalId = setInterval(fetchMatches, 30000);
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      controller.abort();
    };
  }, []);

  const matches = filter === "ALL" ? allMatches
    : filter === "LIVE NOW" ? allMatches.filter(m => m.status === "LIVE")
    : filter === "TODAY" ? allMatches.filter(m =>
        m.status === "LIVE" || m.status === "UPCOMING")
    : allMatches;

  return { matches, allMatches, isLoading, lastUpdated, source };
}
