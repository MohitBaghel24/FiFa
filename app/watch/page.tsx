"use client";

import React, { useState } from "react";
import { useLiveMatches } from "@/hooks/useLiveMatches";
import MatchCard from "@/components/MatchCard";
import { Play, Calendar, Trophy, Activity, Info } from "lucide-react";

export default function WatchLivePage() {
  const { matches, isLoading, source, lastUpdated } = useLiveMatches("ALL");
  const [activeTab, setActiveTab] = useState<"ALL" | "LIVE" | "UPCOMING">("ALL");

  const liveMatches = matches.filter(m => m.status === "LIVE");
  const upcomingMatches = matches.filter(m => m.status === "UPCOMING");

  // Determine which matches to show based on the active tab
  const displayMatches = activeTab === "ALL" 
    ? matches 
    : activeTab === "LIVE" 
      ? liveMatches 
      : upcomingMatches;

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[40vh] min-h-[300px] flex items-end pb-12 border-b border-border-color overflow-hidden bg-bg-primary">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee7ec238e81?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
                  Match Center
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white uppercase tracking-wider leading-none">
                WATCH <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dim">LIVE</span>
              </h1>
              <p className="text-text-secondary mt-4 max-w-xl text-sm leading-relaxed">
                Experience the intensity of the FIFA World Cup. Follow live telemetry, join active community channels, and track real-time statistics as the action unfolds on the pitch.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-bg-card/50 backdrop-blur-sm border border-border-color rounded-xl p-4 shrink-0">
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted font-bold tracking-widest uppercase">Data Source</span>
                <span className="text-white text-xs font-mono mt-1 flex items-center gap-2">
                  <Activity size={12} className="text-accent" />
                  {source === "mock" ? "DEMO FEED" : "LIVE API"}
                </span>
              </div>
              <div className="w-[1px] h-8 bg-border-color"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted font-bold tracking-widest uppercase">Last Sync</span>
                <span className="text-white text-xs font-mono mt-1">
                  {lastUpdated ? lastUpdated.toLocaleTimeString() : "--:--:--"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 md:pt-12">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 border-b border-border-color mb-8 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab("ALL")}
            className={`flex items-center gap-2 pb-4 text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === "ALL" ? "text-accent border-accent" : "text-text-secondary border-transparent hover:text-white"
            }`}
          >
            <Trophy size={16} /> All Matches
          </button>
          <button 
            onClick={() => setActiveTab("LIVE")}
            className={`flex items-center gap-2 pb-4 text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === "LIVE" ? "text-accent border-accent" : "text-text-secondary border-transparent hover:text-white"
            }`}
          >
            <Play size={16} /> Live Now ({liveMatches.length})
          </button>
          <button 
            onClick={() => setActiveTab("UPCOMING")}
            className={`flex items-center gap-2 pb-4 text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === "UPCOMING" ? "text-accent border-accent" : "text-text-secondary border-transparent hover:text-white"
            }`}
          >
            <Calendar size={16} /> Upcoming ({upcomingMatches.length})
          </button>
        </div>

        {/* Matches Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[240px] bg-bg-card rounded-2xl border border-border-color animate-pulse" />
            ))}
          </div>
        ) : displayMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-bg-card border border-border-color rounded-2xl border-dashed">
            <Info size={40} className="text-text-muted mb-4" />
            <h3 className="text-white text-lg font-bold font-orbitron tracking-wider mb-2">NO MATCHES FOUND</h3>
            <p className="text-text-secondary text-sm">There are no {activeTab !== "ALL" ? activeTab.toLowerCase() : ""} matches scheduled at this time.</p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Live Section (only show if LIVE or ALL tab is active and there are matches) */}
            {(activeTab === "ALL" || activeTab === "LIVE") && liveMatches.length > 0 && (
              <section>
                {activeTab === "ALL" && (
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4757] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4757]"></span>
                    </span>
                    <h2 className="text-white text-xl font-bold font-orbitron uppercase tracking-wider">LIVE RIGHT NOW</h2>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming Section (only show if UPCOMING or ALL tab is active and there are matches) */}
            {(activeTab === "ALL" || activeTab === "UPCOMING") && upcomingMatches.length > 0 && (
              <section>
                {activeTab === "ALL" && (
                  <div className="flex items-center gap-3 mb-6 mt-12 pt-12 border-t border-border-color">
                    <Calendar size={18} className="text-text-muted" />
                    <h2 className="text-white text-xl font-bold font-orbitron uppercase tracking-wider">UPCOMING FIXTURES</h2>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
