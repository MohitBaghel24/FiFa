"use client";
import { useState } from "react";
import Link from "next/link";
import { ALL_TEAMS } from "@/lib/teams";

export default function CommunityHubPage() {
  const [search, setSearch] = useState("");

  const filteredTeams = ALL_TEAMS.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "white" }}>
      
      <div style={{ maxWidth: 1000, margin: "40px auto", padding: "0 24px" }}>
        
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontFamily: "Orbitron, sans-serif", fontSize: 36, color: "var(--accent)", textTransform: "uppercase", marginBottom: 16 }}>
            NATIONS HUB
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 18 }}>
            Join your national community. Analyze tactics, celebrate goals, and connect with fans worldwide.
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 40 }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teams..."
            style={{
              width: "100%",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              color: "white",
              padding: "16px 24px",
              borderRadius: 12,
              fontSize: 16,
              outline: "none",
            }}
          />
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {filteredTeams.map(team => (
            <div key={team.id} style={{
              background: "var(--bg-card)",
              borderRadius: 16,
              border: "1px solid var(--border)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{
                height: 80,
                background: team.color,
                opacity: 0.8,
                position: "relative"
              }} />
              
              <div style={{ padding: 24, position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
                <img 
                  src={team.flag} 
                  alt={`${team.name} flag`} 
                  style={{
                    width: 64, height: 48, objectFit: "cover",
                    borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    position: "absolute",
                    top: -24, left: 24
                  }} 
                />
                
                <h2 style={{ marginTop: 24, fontSize: 24, fontWeight: "bold" }}>{team.name}</h2>
                <div style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24, display: "flex", gap: 16 }}>
                  <span>👥 {team.fanCount} Fans</span>
                  <span>🟢 {team.onlineCount.toLocaleString()} Online</span>
                </div>
                
                <Link href={`/community/${team.id}`} style={{ marginTop: "auto" }}>
                  <button style={{
                    width: "100%",
                    background: "transparent",
                    color: "var(--accent)",
                    border: "1px solid var(--accent)",
                    padding: "12px",
                    borderRadius: 8,
                    fontWeight: "bold",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    transition: "all 0.2s"
                  }}>
                    Enter Arena →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "var(--text-secondary)", background: "var(--bg-secondary)", borderRadius: 12 }}>
            No teams found matching "{search}".
          </div>
        )}

      </div>
    </div>
  );
}
