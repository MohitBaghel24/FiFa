"use client";
import { Match } from "@/hooks/useLiveMatches";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MatchCard({ match }: { match: Match }) {
  const [justScored, setJustScored] = useState(false);
  const [prevScore, setPrevScore] = useState({
    home: match.homeScore, away: match.awayScore
  });

  // Detect goal scored
  useEffect(() => {
    if (
      prevScore &&
      (match.homeScore !== prevScore.home ||
        match.awayScore !== prevScore.away)
    ) {
      const timeout1 = setTimeout(() => {
        setJustScored(true);
        setPrevScore({ home: match.homeScore, away: match.awayScore });
      }, 0);
      const timeout2 = setTimeout(() => setJustScored(false), 4000);
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [match.homeScore, match.awayScore, prevScore.home, prevScore.away]);

  const progress = match.minute ? (match.minute / 90) * 100 : 0;

  return (
    <div style={{
      background: "var(--bg-card)",
      border: `1px solid ${justScored ? "var(--accent)" : "var(--border)"}`,
      borderRadius: 16,
      padding: 20,
      minWidth: 280,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      transition: "border-color 0.3s",
      boxShadow: justScored ? "0 0 20px rgba(0,255,135,0.3)" : "none",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Goal flash overlay */}
      {justScored && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,255,135,0.05)",
          display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 10,
          animation: "fadeOut 4s forwards",
          pointerEvents: "none",
        }}>
          <span style={{
            fontSize: 24, fontWeight: 900,
            color: "var(--accent)", fontFamily: "monospace",
            letterSpacing: "0.2em",
          }}>⚽ GOAL!</span>
        </div>
      )}

      {/* Top row */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{
          fontSize: 11, color: "var(--text-secondary)",
          letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          {match.competition}
        </span>

        {match.status === "LIVE" && (
          <span style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, color: "#FF4757",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#FF4757",
              animation: "pulse-red 1.5s infinite",
              display: "inline-block",
            }} />
            {match.minute}&apos;
          </span>
        )}

        {match.status === "UPCOMING" && (
          <span style={{ fontSize: 11, color: "var(--accent)" }}>
            {match.kickoff}
          </span>
        )}

        {match.status === "FT" && (
          <span style={{
            fontSize: 11, color: "var(--text-secondary)",
            background: "var(--border)", padding: "2px 8px",
            borderRadius: 4,
          }}>FT</span>
        )}
      </div>

      {/* Teams and Score */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Home team */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, flex: 1,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={match.homeTeam.flag}
            alt={match.homeTeam.fullName}
            style={{
              width: 56, height: 56, borderRadius: "50%",
              objectFit: "cover", border: "2px solid var(--border)"
            }}
          />
          <span style={{
            color: "white", fontWeight: 700, fontSize: 14,
            letterSpacing: "0.05em",
          }}>
            {match.homeTeam.name}
          </span>
        </div>

        {/* Score */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 4,
        }}>
          {match.status !== "UPCOMING" ? (
            <span style={{
              fontSize: 36, fontWeight: 900, color: "var(--accent)",
              fontFamily: "monospace", letterSpacing: "0.1em",
              lineHeight: 1,
            }}>
              {match.homeScore ?? 0} - {match.awayScore ?? 0}
            </span>
          ) : (
            <span style={{
              fontSize: 22, fontWeight: 700, color: "var(--text-secondary)",
              fontFamily: "monospace",
            }}>VS</span>
          )}
        </div>

        {/* Away team */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, flex: 1,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={match.awayTeam.flag}
            alt={match.awayTeam.fullName}
            style={{
              width: 56, height: 56, borderRadius: "50%",
              objectFit: "cover", border: "2px solid var(--border)"
            }}
          />
          <span style={{
            color: "white", fontWeight: 700, fontSize: 14,
            letterSpacing: "0.05em",
          }}>
            {match.awayTeam.name}
          </span>
        </div>
      </div>

      {/* Progress bar (live only) */}
      {match.status === "LIVE" && (
        <div style={{
          height: 3, background: "var(--border)",
          borderRadius: 2, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "var(--accent)",
            borderRadius: 2, transition: "width 1s ease",
          }} />
        </div>
      )}

      {/* Join Discussion button */}
      <Link
        href={`/community/match-${match.id}`}
        style={{
          display: "block", textAlign: "center",
          padding: "12px", borderRadius: 8,
          background: "var(--accent)", color: "var(--bg-primary)",
          fontWeight: 700, fontSize: 13,
          letterSpacing: "0.1em", textDecoration: "none",
          textTransform: "uppercase",
          transition: "background 0.2s",
        }}
      >
        JOIN DISCUSSION
      </Link>
    </div>
  );
}
