"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import MatchCard from '@/components/MatchCard';
import CommunityCard from '@/components/CommunityCard';
import { useLiveMatches } from '@/hooks/useLiveMatches';
import FanPostCard from '@/components/FanPostCard';
import Link from 'next/link';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { AnimatedSubtitle } from '@/components/ui/animated-subtitle';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const FILTERS = ["ALL", "LIVE NOW", "TODAY", "GROUP STAGE", "KNOCKOUTS"];
  const [activeFilter, setActiveFilter] = React.useState("ALL");
  const { matches, isLoading, lastUpdated, source } = useLiveMatches(activeFilter);

  const communities = [
    { name: 'Brazil Fans', fans: '450K', color: '#FFD700' },
    { name: 'Argentina Fans', fans: '420K', color: '#75AADB' },
    { name: 'France Fans', fans: '380K', color: '#002654' },
    { name: 'England Fans', fans: '395K', color: '#CF081F' },
    { name: 'India Fans', fans: '1.2M', color: '#FF9933' },
    { name: 'USA Fans', fans: '210K', color: '#B31942' },
    { name: 'Spain Fans', fans: '310K', color: '#AA151B' },
    { name: 'Germany Fans', fans: '340K', color: '#FFFFFF' },
  ];

  const posts = [
    { id: 1, user: 'Alex Silva', handle: '@alex_br', time: '2m', content: 'Vini Jr is absolutely tearing up the left flank right now! Unstoppable.', likes: 124, comments: 18 },
    { id: 2, user: 'James Thompson', handle: '@jtommo_eng', time: '14m', content: 'Need a tactical shift immediately. Midfield is getting overrun.', likes: 89, comments: 45 },
    { id: 3, user: 'Sofia Rossi', handle: '@sofia_ita', time: '1h', content: 'The atmosphere at San Siro tonight is going to be electric! Forza Azzurri 🇮🇹', likes: 342, comments: 56 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-104px)] bg-bg-primary flex flex-col justify-center overflow-hidden py-10 md:py-16">

        {/* Dotted Surface 3D Background */}
        <DottedSurface className="opacity-80" />

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-4 w-full">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center gap-4 md:gap-6 w-full">
            <motion.p variants={fadeInUp} className="text-accent text-xs md:text-sm font-bold tracking-[0.25em] uppercase">
              GLOBAL ACCESS PROTOCOL
            </motion.p>

            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold leading-tight uppercase tracking-wider">
              <span className="text-white">WHERE THE </span><span className="text-accent">WORLD</span><br />
              <span className="text-white">WATCHES TOGETHER</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="w-full mt-2 overflow-hidden h-8 md:h-10">
              <AnimatedSubtitle
                texts={['Immersive data streams.', 'Real-time sync.', 'Hyper-local fan networks.']}
                delay={3000}
                className="text-text-secondary text-lg md:text-xl font-bold tracking-wide"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
              <Link href="/watch" className="btn-primary w-full sm:w-auto shadow-[0_0_20px_rgba(0,255,135,0.2)] text-center flex items-center justify-center">WATCH LIVE</Link>
              <Link href="/fanwall" className="btn-outline w-full sm:w-auto text-center flex items-center justify-center">JOIN COMMUNITY</Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Row */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-16 md:mt-24">
          <motion.div
            initial="hidden" animate="visible" variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-border-color pt-8"
          >
            {[
              { label: 'Active Nodes', value: '2.4M' },
              { label: 'Sync Latency', value: '12ms' },
              { label: 'Fan Posts', value: '847K' },
              { label: 'Nations', value: '32' }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col gap-1 items-center text-center">
                <span className="text-2xl md:text-4xl font-orbitron font-bold text-white tracking-widest">{stat.value}</span>
                <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.2em] font-bold">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. LIVE MATCHES SECTION */}
      <section style={{ padding: "80px 24px" }}>

        {/* Section header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: 32
        }}>
          <div>
            <h2 style={{
              color: "var(--text-primary)", fontSize: 32, fontWeight: 900,
              letterSpacing: "0.05em", margin: "0 0 8px",
              textTransform: "uppercase"
            }}>
              ACTIVE OPERATIONS
            </h2>
            <div style={{
              width: 60, height: 3,
              background: "var(--accent)", borderRadius: 2
            }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {source === "mock" && (
              <span style={{
                fontSize: 11, background: "#332200",
                color: "#FFD700", padding: "3px 10px",
                borderRadius: 20, letterSpacing: "0.08em"
              }}>
                DEMO DATA
              </span>
            )}
            {lastUpdated && (
              <span style={{ fontSize: 11, color: "#484F58" }}>
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 28,
          overflowX: "auto", paddingBottom: 4
        }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: "8px 16px", borderRadius: 20, border: "1px solid",
                borderColor: activeFilter === f ? "var(--accent)" : "var(--border)",
                background: activeFilter === f ? "rgba(0,255,135,0.1)" : "transparent",
                color: activeFilter === f ? "var(--accent)" : "#8B949E",
                fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
                cursor: "pointer", whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Match cards - horizontal scroll */}
        {isLoading ? (
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                minWidth: 280, height: 240, background: "var(--bg-card)",
                borderRadius: 16, border: "1px solid var(--border)",
                animation: "shimmer 1.5s infinite",
              }} />
            ))}
          </div>
        ) : matches.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "60px 0",
            color: "#484F58", fontFamily: "monospace"
          }}>
            NO MATCHES FOUND FOR THIS FILTER
          </div>
        ) : (
          <div style={{
            display: "flex", gap: 16,
            overflowX: "auto", paddingBottom: 8,
            scrollbarWidth: "thin",
            scrollbarColor: "var(--accent) transparent",
          }}>
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>

      {/* 3. JOIN YOUR TRIBE */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        className="py-12 md:py-20 px-4 bg-bg-secondary w-full border-y border-border-color"
      >
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl mb-10 font-orbitron font-bold uppercase tracking-wide text-white">JOIN YOUR TRIBE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {communities.map((comm, i) => (
              <CommunityCard key={i} name={comm.name} fans={comm.fans} streakColor={comm.color} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. FAN WALL PREVIEW */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        className="py-12 md:py-20 px-4 max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl mb-10 font-orbitron font-bold uppercase tracking-wide text-white flex items-center gap-3">
              <span className="w-3 h-3 bg-accent rounded-sm inline-block shadow-[0_0_10px_rgba(0,255,135,0.8)]"></span>
              GLOBAL INTEL FEED
            </h2>
            <div className="flex flex-col gap-2">
              {posts.map(post => (
                <FanPostCard key={post.id} {...post} />
              ))}
            </div>
            <button className="mt-8 text-accent text-xs font-bold tracking-[0.2em] uppercase hover:text-white transition-colors flex items-center gap-2">
              VIEW ALL POSTS
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* Right Sidebar - Trending */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="glass-card p-8 sticky top-24">
              <h3 className="text-text-secondary uppercase tracking-[0.2em] text-[10px] mb-6 font-bold border-b border-border-color pb-4">Trending Protocols</h3>
              <div className="flex flex-col gap-5">
                {[
                  { tag: '#WorldCupFinal', posts: '124K' },
                  { tag: '#ViniJrGoal', posts: '89K' },
                  { tag: '#TacticalAnalysis', posts: '45K' },
                  { tag: '#EuroNations', posts: '32K' },
                  { tag: '#RefereeDecision', posts: '28K' }
                ].map((trend, i) => (
                  <div key={i} className="flex justify-between items-center cursor-pointer group">
                    <span className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors tracking-wide">{trend.tag}</span>
                    <span className="text-xs text-text-secondary font-mono">{trend.posts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. PREDICTIONS CTA BANNER */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        className="py-12 md:py-20 px-4 max-w-7xl mx-auto w-full mb-12 md:mb-20"
      >
        <div className="relative rounded-2xl overflow-hidden border-2 border-accent/30 bg-[#121824] p-8 md:p-14 shadow-[0_0_50px_rgba(0,255,135,0.05)]">
          {/* Green Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-white mb-4 uppercase tracking-wide">
                LOCK IN YOUR PREDICTIONS
              </h2>
              <p className="text-text-secondary md:text-lg max-w-xl mx-auto md:mx-0">
                Compete with 2.4M fans globally. Analyze the data, trust your gut, and rise through the ranks.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-5 shrink-0 w-full md:w-auto">
              <div className="badge-green px-5 py-2.5 text-xs font-bold font-mono shadow-[0_0_15px_rgba(0,255,135,0.2)]">
                YOUR RANK #247 GLOBALLY
              </div>
              <Link href="/predictions" className="btn-primary w-full md:w-auto text-lg py-4 px-8 shadow-[0_0_30px_rgba(0,255,135,0.3)] text-center block">
                MAKE PREDICTION
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
