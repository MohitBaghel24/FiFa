"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import MatchCard from '@/components/MatchCard';
import CommunityCard from '@/components/CommunityCard';
import FanPostCard from '@/components/FanPostCard';

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
  // Deterministic pseudo-randomness for particles to avoid hydration mismatches and impure functions
  const particles = [...Array(20)].map((_, i) => ({
    top: (i * 37) % 100,
    left: (i * 23) % 100,
    duration: 10 + (i % 10),
    delay: i % 10
  }));

  // Mock Data
  const matches: Array<{
    id: number;
    variant: 'live' | 'upcoming' | 'completed';
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;
    awayScore?: number;
    minute?: string;
    competition: string;
    dateTime?: string;
    countdown?: string;
  }> = [
    { id: 1, variant: 'live', homeTeam: 'Manchester United', awayTeam: 'Real Madrid', homeScore: 2, awayScore: 1, minute: "74'", competition: 'CHAMPIONS LEAGUE' },
    { id: 2, variant: 'live', homeTeam: 'France', awayTeam: 'England', homeScore: 1, awayScore: 0, minute: "45'", competition: 'INTERNATIONAL FRIENDLY' },
    { id: 3, variant: 'upcoming', homeTeam: 'Spain', awayTeam: 'Italy', dateTime: "Tomorrow, 20:00", countdown: "In 24 hours", competition: 'EURO NATIONS' },
    { id: 4, variant: 'completed', homeTeam: 'Germany', awayTeam: 'Netherlands', homeScore: 3, awayScore: 2, competition: 'EURO NATIONS' },
  ];

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
      <section className="relative min-h-[calc(100vh-104px)] bg-bg-primary flex flex-col justify-center overflow-hidden py-12 md:py-20">
        {/* Subtle Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(#30363D 1px, transparent 1px), linear-gradient(90deg, #30363D 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>
        
        {/* Green Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {particles.map((p, i) => (
            <div 
              key={i}
              className="absolute w-1.5 h-1.5 bg-accent rounded-full opacity-30 shadow-[0_0_8px_#00FF87]"
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                animation: `float ${p.duration}s linear infinite alternate`,
                animationDelay: `-${p.delay}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-4 w-full flex-1 justify-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center gap-4 md:gap-6 w-full">
            <motion.p variants={fadeInUp} className="text-accent text-xs md:text-sm font-bold tracking-[0.25em] uppercase">
              GLOBAL ACCESS PROTOCOL
            </motion.p>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold leading-tight uppercase tracking-wider">
              <span className="text-white">WHERE THE </span><span className="text-accent">WORLD</span><br />
              <span className="text-white">WATCHES TOGETHER</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-text-secondary text-base md:text-lg max-w-2xl mt-2">
              Immersive data streams, real-time sync, and hyper-local fan networks.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
              <button className="btn-primary w-full sm:w-auto shadow-[0_0_20px_rgba(0,255,135,0.2)]">WATCH LIVE</button>
              <button className="btn-outline w-full sm:w-auto">JOIN COMMUNITY</button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Row */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-12 md:mt-auto pt-8 md:pt-20">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-border-color pt-8 md:pt-12"
          >
            {[
              { label: 'Active Nodes', value: '2.4M' },
              { label: 'Sync Latency', value: '12ms' },
              { label: 'Fan Posts', value: '847K' },
              { label: 'Nations', value: '32' }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                <span className="text-2xl md:text-4xl font-orbitron font-bold text-white tracking-widest">{stat.value}</span>
                <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.2em] font-bold">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. LIVE MATCHES SECTION */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        className="py-12 md:py-20 px-4 max-w-7xl mx-auto w-full border-t border-border-color"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl inline-block relative pb-3 font-orbitron font-bold uppercase tracking-wide text-white">
              ACTIVE OPERATIONS
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-accent shadow-[0_0_10px_rgba(0,255,135,0.5)]"></span>
            </h2>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide text-xs md:text-sm whitespace-nowrap">
            {['All', 'Live Now', 'Today', 'Group Stage', 'Knockouts'].map((tab, i) => (
              <button 
                key={tab} 
                className={`uppercase tracking-widest font-bold pb-2 transition-colors ${i === 1 ? 'text-accent border-b-2 border-accent shadow-[0_2px_10px_rgba(0,255,135,0.2)]' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4 scrollbar-hide">
          {matches.map(match => (
            <MatchCard key={match.id} {...match} />
          ))}
        </div>
      </motion.section>

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
              <button className="btn-primary w-full md:w-auto text-lg py-4 px-8 shadow-[0_0_30px_rgba(0,255,135,0.3)]">
                MAKE PREDICTION
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
