"use client";

import React, { useState } from 'react';
import { TrendingUp, Timer, Trophy, ArrowUpRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function PredictionsPage() {
  const [homeScore, setHomeScore] = useState('2');
  const [awayScore, setAwayScore] = useState('1');

  const leaderboard = [
    { rank: 1, user: 'NeonStriker99', country: 'FRANCE', points: '14,250', accuracy: '87.5%', avatar: 'https://i.pravatar.cc/150?u=a', medal: 'text-gold', dropShadow: 'drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]' },
    { rank: 2, user: 'CyberPitch', country: 'JAPAN', points: '13,840', accuracy: '84.2%', avatar: 'https://i.pravatar.cc/150?u=b', medal: 'text-silver', dropShadow: 'drop-shadow-[0_0_8px_rgba(192,192,192,0.5)]' },
    { rank: 3, user: 'DataGoalie', country: 'BRAZIL', points: '13,100', accuracy: '81.0%', avatar: 'https://i.pravatar.cc/150?u=c', medal: 'text-bronze', dropShadow: 'drop-shadow-[0_0_8px_rgba(205,127,50,0.5)]' },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-bg-primary pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-12">
        
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-white uppercase tracking-wider">
              MATCH PREDICTIONS
            </h1>
            <p className="text-text-secondary text-sm md:text-base tracking-wide">
              Lock in your forecast. Dominate the leaderboard.
            </p>
          </div>
          
          <div className="border border-accent rounded-xl bg-accent-glow p-5 flex flex-col items-center md:items-end min-w-[220px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00FF87]"></span>
              <span className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold">YOUR RANK</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-4xl font-orbitron font-bold text-accent">#247</span>
              <div className="flex flex-col justify-center text-accent text-[10px] font-bold tracking-widest">
                <TrendingUp size={16} className="mb-0.5" />
                <span>GLOBALLY</span>
              </div>
            </div>
          </div>
        </div>

        {/* PREDICTION CARD */}
        <div className="bg-[#1C2333] border border-[#30363D] rounded-2xl p-6 md:p-10 w-full flex flex-col gap-8 shadow-xl relative overflow-hidden group">
          {/* Subtle bg glow on hover */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          {/* Top Bar */}
          <div className="flex justify-between items-center border-b border-[#30363D] pb-5 relative z-10">
            <div className="flex items-center gap-2 text-danger font-bold text-xs uppercase tracking-widest">
              <Timer size={16} />
              <span>CLOSES IN 2H 14M</span>
            </div>
            <div className="bg-bg-primary border border-[#30363D] px-3 py-1 rounded text-[10px] text-text-secondary uppercase font-bold tracking-widest">
              INTERNATIONAL FRIENDLY
            </div>
          </div>
          
          {/* Center Inputs */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20 py-6 relative z-10">
            
            {/* Home Team */}
            <div className="flex flex-col items-center gap-5 w-24">
              <div className="w-[80px] h-[80px] rounded-full bg-bg-primary border-2 border-border-color overflow-hidden flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                🇧🇷
              </div>
              <span className="font-orbitron font-bold text-white tracking-widest uppercase">BRAZIL</span>
            </div>
            
            {/* Scores */}
            <div className="flex items-center gap-6 md:gap-8">
              <input 
                type="text" 
                maxLength={2}
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-[60px] h-[75px] bg-[#0D1117] border-2 border-accent rounded-xl text-center text-4xl font-mono font-bold text-accent focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,135,0.4)] transition-shadow"
              />
              <span className="font-orbitron text-2xl text-text-secondary font-bold italic">VS</span>
              <input 
                type="text" 
                maxLength={2}
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-[60px] h-[75px] bg-[#0D1117] border-2 border-accent rounded-xl text-center text-4xl font-mono font-bold text-accent focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,135,0.4)] transition-shadow"
              />
            </div>
            
            {/* Away Team */}
            <div className="flex flex-col items-center gap-5 w-24">
              <div className="w-[80px] h-[80px] rounded-full bg-bg-primary border-2 border-border-color overflow-hidden flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                🇦🇷
              </div>
              <span className="font-orbitron font-bold text-white tracking-widest uppercase">ARGENTINA</span>
            </div>
            
          </div>
          
          {/* Bottom Button */}
          <div className="flex justify-center pt-4 relative z-10">
            <button className="btn-primary !px-12 !py-4 shadow-[0_0_20px_rgba(0,255,135,0.2)] font-bold tracking-[0.2em]">
              LOCK PREDICTION
            </button>
          </div>
        </div>

        {/* GLOBAL LEADERBOARD */}
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex justify-between items-end">
            <h2 className="text-xl md:text-2xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-3">
              <span className="w-2 h-6 bg-accent"></span>
              GLOBAL LEADERBOARD
            </h2>
            <Link href="#" className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
              VIEW FULL RANKINGS <ArrowUpRight size={14} />
            </Link>
          </div>
          
          <div className="w-full overflow-x-auto scrollbar-hide pb-4">
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="min-w-[600px] w-full flex flex-col"
            >
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#30363D] text-[10px] uppercase text-text-muted font-bold tracking-widest bg-bg-secondary rounded-t-xl">
                <div className="col-span-1 text-center">RANK</div>
                <div className="col-span-6">USER</div>
                <div className="col-span-2 text-right">POINTS</div>
                <div className="col-span-3 text-right">ACCURACY</div>
              </div>
              
              {/* Rows */}
              {leaderboard.map((row) => (
                <motion.div key={row.rank} variants={fadeInUp} className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-[#30363D] items-center hover:bg-[#212A3E] transition-colors cursor-pointer group bg-bg-card">
                  <div className="col-span-1 flex justify-center">
                    <Trophy size={20} className={`${row.medal} ${row.dropShadow}`} />
                  </div>
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-border-color overflow-hidden bg-bg-primary shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={row.avatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-sm group-hover:text-accent transition-colors tracking-wide">{row.user}</span>
                      <span className="text-[10px] text-text-muted font-mono uppercase">{row.country}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-mono text-white font-bold">{row.points}</div>
                  <div className="col-span-3 text-right font-mono text-accent font-bold">{row.accuracy}</div>
                </motion.div>
              ))}
              
              {/* Separator */}
              <motion.div variants={fadeInUp} className="py-6 text-center text-text-muted font-bold tracking-widest text-xl bg-bg-card border-b border-[#30363D]">
                ...
              </motion.div>
              
              {/* Your Row */}
              <motion.div variants={fadeInUp} className="grid grid-cols-12 gap-4 px-6 py-5 border border-accent/30 items-center bg-[#00FF87]/5 rounded-b-xl cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.2)] group hover:bg-[#00FF87]/10 transition-colors">
                <div className="col-span-1 flex justify-center text-accent font-orbitron font-bold text-lg">
                  247
                </div>
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-accent overflow-hidden bg-bg-primary shrink-0 shadow-[0_0_10px_rgba(0,255,135,0.3)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://i.pravatar.cc/150?u=me" alt="You" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-accent text-sm tracking-wide group-hover:text-white transition-colors">You (UltraFan)</span>
                    <span className="text-[10px] text-accent/70 font-mono uppercase">USA</span>
                  </div>
                </div>
                <div className="col-span-2 text-right font-mono text-white font-bold">4,820</div>
                <div className="col-span-3 text-right font-mono text-accent font-bold">62.4%</div>
              </motion.div>
              
            </motion.div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
