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

  const fetchMatches = useCallback(async () => {
    try {
      const res = await fetch("/api/matches");
      const data = await res.json();
      setAllMatches(data.matches);
      setSource(data.source);
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Failed to fetch matches", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMatches();
    }, 0);
    const intervalId = setInterval(fetchMatches, 30000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [fetchMatches]);

  const matches = filter === "ALL" ? allMatches
    : filter === "LIVE NOW" ? allMatches.filter(m => m.status === "LIVE")
    : filter === "TODAY" ? allMatches.filter(m =>
        m.status === "LIVE" || m.status === "UPCOMING")
    : allMatches;

  return { matches, allMatches, isLoading, lastUpdated, source };
}
