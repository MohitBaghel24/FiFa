"use client";

import React from 'react';
import { Share2, Target, Activity, Award, Globe, Trophy, CircleDot, BarChart3, Lock, CheckCircle2, XCircle, MessageSquare } from 'lucide-react';

export default function ProfilePage() {
  const stats = [
    { icon: <Target size={20} className="text-accent" />, label: 'PREDICTIONS', value: '4,821' },
    { icon: <Activity size={20} className="text-accent" />, label: 'ACCURACY', value: '68.4%' },
    { icon: <Award size={20} className="text-accent" />, label: 'FAN POINTS', value: '142K' },
    { icon: <Globe size={20} className="text-accent" />, label: 'GLOBAL RANK', value: '#42' },
  ];

  const badges = [
    { id: 1, earned: true, icon: <Trophy size={28} className="text-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" /> },
    { id: 2, earned: true, icon: <CircleDot size={28} className="text-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" /> },
    { id: 3, earned: true, icon: <BarChart3 size={28} className="text-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" /> },
    { id: 4, earned: false, icon: <Lock size={28} className="text-text-muted" /> },
    { id: 5, earned: false, icon: <Lock size={28} className="text-text-muted" /> },
  ];

  const recentPredictions = [
    { id: 1, match: 'MAD vs BAR', pred: 'MAD 2-1', result: true, points: '+150' },
    { id: 2, match: 'PSG vs BAY', pred: 'BAY 0-2', result: false, points: '-20' },
    { id: 3, match: 'MCI vs ARS', pred: 'MCI 1-1', result: true, points: '+80' },
  ];

  const communityPosts = [
    { id: 1, content: "Can't believe that offside call. Ref needs glasses! 😡", time: "2 hours ago", likes: 45, comments: 12 },
    { id: 2, content: "Madrid's midfield is looking unstoppable this season. Vini for Ballon d'Or.", time: "1 day ago", likes: 320, comments: 84 },
  ];

  // Deterministic pseudo-randomness for GitHub style activity grid to avoid hydration mismatches
  const activityGrid = Array.from({ length: 70 }, (_, i) => {
    const val = (Math.sin(i * 13.5) + 1) / 2; // Returns 0 to 1
    let opacity = 'bg-[#0D1117] border border-[#30363D]'; // 0
    if (val > 0.85) opacity = 'bg-accent opacity-100 shadow-[0_0_5px_#00FF87]';
    else if (val > 0.65) opacity = 'bg-accent opacity-60';
    else if (val > 0.45) opacity = 'bg-accent opacity-30';
    else if (val > 0.25) opacity = 'bg-accent opacity-10';
    return opacity;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] w-full bg-bg-primary pb-20">
      
      {/* HEADER BANNER */}
      <div className="relative w-full h-[280px] bg-[#161B22] border-b border-border-color">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1518605368461-1e1252281136?q=80&w=2000&auto=format&fit=crop" 
            alt="Stadium" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-transparent to-transparent"></div>
        </div>

        {/* Top Right Action Buttons */}
        <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
          <button className="w-10 h-10 rounded-full border border-border-color bg-bg-card/50 backdrop-blur flex items-center justify-center text-white hover:border-accent hover:text-accent transition-colors">
            <Share2 size={18} />
          </button>
          <button className="btn-primary !px-6 !py-2 !h-10 text-xs shadow-[0_0_15px_rgba(0,255,135,0.3)]">
            FOLLOW
          </button>
        </div>

        {/* Bottom Left Profile Info */}
        <div className="absolute -bottom-8 left-6 md:left-12 flex flex-col md:flex-row items-end gap-5 z-10">
          <div className="w-[120px] h-[120px] rounded-full border-4 border-bg-primary overflow-hidden bg-bg-card shadow-xl shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/150?u=AlexStrike" alt="Alex_Strike_99" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col pb-2 md:pb-6 gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-white tracking-wider">Alex_Strike_99</h2>
              <span className="border border-gold text-gold px-2 py-0.5 rounded text-[10px] font-orbitron font-bold uppercase tracking-widest bg-gold/10 drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]">
                ULTRA FAN
              </span>
            </div>
            <div className="text-xs md:text-sm text-text-secondary font-mono">
              <span className="text-white font-bold">1.2K</span> Followers <span className="mx-2 text-border-color">•</span> <span className="text-white font-bold">340</span> Following
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto w-full px-4 md:px-12 mt-16 md:mt-12 flex flex-col gap-10">
        
        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-0">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#1C2333] border border-[#30363D] rounded-xl p-5 md:p-6 flex flex-col gap-3 hover:border-accent/50 transition-colors group relative overflow-hidden shadow-lg">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent/20 group-hover:bg-accent transition-colors"></div>
              <div className="flex items-center gap-2 text-text-muted">
                {stat.icon}
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold">{stat.label}</span>
              </div>
              <span className="text-3xl md:text-4xl font-orbitron font-bold text-white tracking-wide group-hover:text-accent transition-colors">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* BADGE COLLECTION */}
        <div className="flex flex-col gap-5 bg-[#161B22] border border-[#30363D] p-6 rounded-xl">
          <h3 className="text-sm font-orbitron font-bold text-white uppercase tracking-widest">
            Badge Collection
          </h3>
          <div className="flex flex-wrap gap-4 py-2">
            {badges.map((badge) => (
              <div 
                key={badge.id}
                className={`relative w-[72px] h-[80px] flex items-center justify-center transition-all duration-300 ${
                  badge.earned 
                    ? 'hover:scale-110 cursor-pointer z-10' 
                    : 'opacity-40 cursor-not-allowed grayscale'
                }`}
              >
                {/* Outer Hexagon (Border) */}
                <div className={`absolute inset-0 ${badge.earned ? 'bg-gold' : 'bg-[#30363D]'}`} 
                     style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
                
                {/* Inner Hexagon (Background) */}
                <div className={`absolute inset-[2px] ${badge.earned ? 'bg-[#1C2333]' : 'bg-bg-primary'}`} 
                     style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
                
                {/* Glow */}
                {badge.earned && <div className="absolute inset-0 bg-gold/10 blur-xl"></div>}
                
                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center">
                  {badge.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TWO COLUMN BOTTOM */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Left Column (60%) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Recent Predictions */}
            <div className="bg-[#1C2333] border border-[#30363D] rounded-xl overflow-hidden shadow-lg">
              <div className="px-5 py-4 border-b border-[#30363D] bg-[#161B22]">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                  <Target size={14} /> Recent Predictions
                </h3>
              </div>
              <div className="flex flex-col">
                {recentPredictions.map((pred) => (
                  <div key={pred.id} className="flex items-center justify-between px-5 py-4 border-b border-[#30363D] last:border-b-0 hover:bg-[#212A3E] transition-colors">
                    <div className="flex items-center gap-4">
                      {pred.result ? (
                        <CheckCircle2 size={20} className="text-accent drop-shadow-[0_0_5px_rgba(0,255,135,0.5)]" />
                      ) : (
                        <XCircle size={20} className="text-danger drop-shadow-[0_0_5px_rgba(255,71,87,0.5)]" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white tracking-wide">{pred.match}</span>
                        <span className="text-[10px] text-text-muted font-mono uppercase">PREDICTED: {pred.pred}</span>
                      </div>
                    </div>
                    <span className={`text-sm font-bold font-mono ${pred.result ? 'text-accent' : 'text-danger'}`}>
                      {pred.points} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Posts */}
            <div className="bg-[#1C2333] border border-[#30363D] rounded-xl overflow-hidden shadow-lg">
              <div className="px-5 py-4 border-b border-[#30363D] bg-[#161B22] flex justify-between items-center">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} /> Community Posts
                </h3>
                <span className="text-[10px] text-accent font-bold hover:underline cursor-pointer uppercase tracking-widest">VIEW ALL</span>
              </div>
              <div className="flex flex-col p-5 gap-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="flex gap-4 pb-5 border-b border-[#30363D] last:border-b-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full border border-border-color overflow-hidden shrink-0 mt-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://i.pravatar.cc/150?u=AlexStrike" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white tracking-wide">Alex_Strike_99</span>
                        <span className="text-[10px] text-text-muted font-mono">{post.time}</span>
                      </div>
                      <p className="text-sm text-text-primary leading-relaxed">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-[10px] text-text-muted font-bold tracking-widest">
                        <span className="hover:text-accent cursor-pointer transition-colors flex items-center gap-1.5">
                          <Target size={14} /> {post.likes}
                        </span>
                        <span className="hover:text-accent cursor-pointer transition-colors flex items-center gap-1.5">
                          <MessageSquare size={14} /> {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right Column (40%) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Activity */}
            <div className="bg-[#1C2333] border border-[#30363D] rounded-xl overflow-hidden p-6 flex flex-col gap-5 shadow-lg">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} /> Activity Stream
              </h3>
              
              <div className="grid grid-rows-7 grid-flow-col gap-[3px] overflow-x-auto pb-2 scrollbar-hide">
                {activityGrid.map((bgClass, i) => (
                  <div key={i} className={`w-[12px] h-[12px] rounded-[2px] ${bgClass}`}></div>
                ))}
              </div>
              <div className="flex justify-between items-center text-[9px] text-text-muted font-bold tracking-widest uppercase mt-2">
                <span>LESS</span>
                <div className="flex gap-[3px]">
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-[#0D1117] border border-[#30363D]"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-accent opacity-10"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-accent opacity-30"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-accent opacity-60"></div>
                  <div className="w-[12px] h-[12px] rounded-[2px] bg-accent opacity-100 shadow-[0_0_5px_#00FF87]"></div>
                </div>
                <span>MORE</span>
              </div>
            </div>

            {/* Alliances */}
            <div className="bg-[#1C2333] border border-[#30363D] rounded-xl overflow-hidden shadow-lg">
              <div className="px-5 py-4 border-b border-[#30363D] bg-[#161B22]">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                  <Globe size={14} /> Alliances
                </h3>
              </div>
              <div className="p-6 flex flex-col gap-5">
                
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full border border-border-color bg-bg-primary flex items-center justify-center text-3xl shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:border-accent transition-colors">
                    🇪🇸
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-accent font-bold tracking-widest uppercase mb-1">PRIMARY FACTION</span>
                    <span className="text-sm font-bold text-white tracking-wider">REAL MADRID</span>
                  </div>
                </div>
                
                <div className="w-full h-[1px] bg-[#30363D]"></div>
                
                <div className="flex items-center gap-4 group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full border border-border-color bg-bg-primary flex items-center justify-center text-3xl shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:border-accent transition-colors">
                    🇧🇷
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-text-muted font-bold tracking-widest uppercase mb-1">SECONDARY FACTION</span>
                    <span className="text-sm font-bold text-white tracking-wider">BRAZIL</span>
                  </div>
                </div>
                
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
