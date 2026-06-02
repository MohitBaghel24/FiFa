"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { Search, Menu, Plus, Image as ImageIcon, Smile, Send, Flame, Info } from "lucide-react";

export default function CommunityChatPage({ params }: { params: Promise<{ teamId: string }> | { teamId: string } }) {
  // Handle both Next.js 14 and Next.js 15+ behavior for params gracefully
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const teamId = resolvedParams.teamId?.toLowerCase() || "global";
  const [message, setMessage] = useState("");

  const allTeams: Record<string, { name: string, flag: string, img: string, online: number }> = {
    brazil: { name: "BRAZIL FANS", flag: "🇧🇷", img: "br.png", online: 4521 },
    argentina: { name: "ARGENTINA FANS", flag: "🇦🇷", img: "ar.png", online: 3204 },
    france: { name: "FRANCE FANS", flag: "🇫🇷", img: "fr.png", online: 2891 },
    england: { name: "ENGLAND FANS", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", img: "gb-eng.png", online: 3102 },
    global: { name: "GLOBAL CHAT", flag: "🌍", img: "un.png", online: 12450 },
  };

  const activeTeam = allTeams[teamId] || {
    name: `${teamId.toUpperCase()} FANS`,
    flag: "🏳️",
    img: "un.png",
    online: 124,
  };

  const communities = Object.keys(allTeams).map(key => ({
    name: allTeams[key].name,
    flag: allTeams[key].flag,
    online: allTeams[key].online,
    slug: key,
    active: key === teamId
  }));

  const mockMessages = [
    {
      id: 5, type: "message", user: "Alex_Silva", avatar: "A", flag: "🇧🇷",
      time: "14:32", text: "Vini Jr is absolutely tearing it up! 🔥", isOwn: false,
    },
    {
      id: 4, type: "message", user: "PRO_PLAYER_01", avatar: "P", flag: "🌍",
      time: "14:34", text: "We need more pressure in the midfield. They are getting too much space.", isOwn: true,
    },
    { id: 3, type: "event", text: `⚽ GOAL SCORED BY ${activeTeam.name.replace(' FANS', '')}! (24')` },
    {
      id: 2, type: "message", user: "NeymarFan99", avatar: "N", flag: "🇧🇷",
      time: "14:36", text: "VAMOOOOOS!!! What a finish! 🏆", isOwn: false,
    },
    {
      id: 1, type: "message", user: "TacticalGuru", avatar: "T", flag: "🇬🇧",
      time: "14:38", text: "That transition was textbook. Perfect counter-attack.", isOwn: false,
    }
  ];

  return (
    <div className="flex h-[calc(100vh-164px)] md:h-[calc(100vh-100px)] bg-bg-primary overflow-hidden">
      
      {/* LEFT SIDEBAR (Desktop) */}
      <div className="hidden md:flex flex-col w-[240px] border-r border-border-color bg-bg-secondary flex-shrink-0">
        <div className="p-4 border-b border-border-color">
          <h3 className="text-text-secondary text-[10px] font-bold tracking-widest uppercase">
            Global Regions
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
          {communities.map((comm) => (
            <Link
              key={comm.slug}
              href={`/community/${comm.slug}`}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors no-underline ${
                comm.active
                  ? "bg-accent/10 border-l-2 border-accent"
                  : "hover:bg-bg-card border-l-2 border-transparent"
              }`}
            >
              <span className="text-xl">{comm.flag}</span>
              <div className="flex flex-col">
                <span className={`text-xs font-bold tracking-wide ${comm.active ? "text-accent" : "text-white"}`}>
                  {comm.name}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[10px] text-text-secondary font-mono">
                    {comm.online}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-border-color bg-bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold border border-accent/50">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xs font-bold">PRO_PLAYER_01</span>
              <span className="text-accent text-[10px] font-mono tracking-widest">ELITE TIER</span>
            </div>
          </div>
          <button className="w-full py-2 border border-accent text-accent text-[10px] font-bold tracking-[0.1em] rounded uppercase hover:bg-accent hover:text-bg-primary transition-colors">
            + New Channel
          </button>
        </div>
      </div>

      {/* CENTER CHAT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-bg-primary relative border-r border-border-color">
        
        {/* Header */}
        <div className="h-[72px] border-b border-border-color bg-bg-secondary/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-10">
          <div className="flex items-center gap-3">
            {activeTeam.img !== "un.png" ? (
              <img
                src={`https://flagcdn.com/w80/${activeTeam.img}`}
                alt={activeTeam.name}
                className="w-10 h-10 lg:w-[48px] lg:h-[48px] rounded-full object-cover border-2 border-[#30363D]"
              />
            ) : (
              <div className="w-10 h-10 lg:w-[48px] lg:h-[48px] rounded-full border-2 border-[#30363D] bg-bg-card flex items-center justify-center text-xl">
                {activeTeam.flag}
              </div>
            )}
            <div className="flex flex-col">
              <h2 className="text-white text-sm lg:text-base font-orbitron font-bold uppercase tracking-wider m-0 leading-tight">
                {activeTeam.name}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent text-[10px] font-mono">{activeTeam.online.toLocaleString()} ONLINE</span>
                </span>
                <span className="text-text-secondary text-[10px] font-mono hidden sm:inline">| PING: 12ms</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-text-secondary">
            <button className="hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <button className="hover:text-white transition-colors md:hidden">
              <Info size={20} />
            </button>
            <button className="hover:text-white transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col-reverse gap-6">
          {mockMessages.map((msg) => {
            if (msg.type === "event") {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <div className="border border-accent text-accent bg-accent/10 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest shadow-[0_0_10px_rgba(0,255,135,0.2)]">
                    {msg.text}
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex flex-col ${msg.isOwn ? "items-end" : "items-start"}`}>
                <div className={`flex items-center gap-2 mb-1.5 ${msg.isOwn ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="w-6 h-6 rounded-full bg-bg-card border border-[#30363D] flex items-center justify-center text-[10px] font-bold text-white">
                    {msg.avatar}
                  </div>
                  <span className="text-accent text-xs font-bold">{msg.user}</span>
                  <span className="text-[10px]">{msg.flag}</span>
                  <span className="text-text-muted text-[10px] font-mono">{msg.time}</span>
                </div>
                <div
                  className={`px-4 py-3 max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] text-sm leading-relaxed shadow-sm ${
                    msg.isOwn
                      ? "bg-accent/10 text-white rounded-[16px_16px_0_16px] border border-accent/20"
                      : "bg-[#1C2333] text-[#E6EDF3] rounded-[16px_16px_16px_0] border border-[#30363D]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          
          <div className="flex justify-center my-4">
            <span className="text-text-muted text-[10px] font-bold tracking-widest uppercase">
              TODAY - MATCH DAY
            </span>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 lg:p-4 bg-[#161B22] border-t border-border-color flex-shrink-0 z-10">
          <div className="flex items-center gap-2 lg:gap-3 bg-bg-primary border border-[#30363D] rounded-xl p-1 lg:p-1.5 pr-2 focus-within:border-accent/50 transition-colors">
            <button className="p-2 text-text-secondary hover:text-white transition-colors flex-shrink-0">
              <Plus size={20} />
            </button>
            <button className="p-2 text-text-secondary hover:text-white transition-colors hidden sm:block flex-shrink-0">
              <ImageIcon size={20} />
            </button>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Transmit message to ${activeTeam.name}...`}
              className="flex-1 bg-transparent border-none text-white text-sm px-2 focus:outline-none min-w-0"
            />
            
            <button className="p-2 text-text-secondary hover:text-white transition-colors flex-shrink-0">
              <Smile size={20} />
            </button>
            <button 
              className={`flex items-center gap-1.5 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg ml-1 font-bold text-[11px] tracking-wider uppercase transition-colors flex-shrink-0 ${
                message.trim() ? "bg-accent text-bg-primary shadow-[0_0_15px_rgba(0,255,135,0.3)]" : "bg-bg-card text-text-muted"
              }`}
            >
              <span className="hidden sm:inline">SEND</span>
              <Send size={14} className={message.trim() ? "" : "opacity-50"} />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR (Desktop) */}
      <div className="hidden lg:flex flex-col w-[280px] bg-bg-secondary flex-shrink-0 overflow-y-auto scrollbar-hide">
        <div className="p-6">
          {/* TELEMETRY Section */}
          <h3 className="text-text-secondary text-[10px] font-bold tracking-widest uppercase mb-4 border-b border-border-color pb-2">
            TELEMETRY
          </h3>
          <div className="flex gap-3 mb-8">
            <div className="flex-1 bg-bg-card border border-border-color rounded-lg p-3 text-center">
              <div className="text-xl font-orbitron font-bold text-white mb-1">1.2M</div>
              <div className="text-[9px] text-text-muted tracking-widest uppercase">Total Fans</div>
            </div>
            <div className="flex-1 bg-bg-card border border-border-color rounded-lg p-3 text-center">
              <div className="text-xl font-orbitron font-bold text-white mb-1">2021</div>
              <div className="text-[9px] text-text-muted tracking-widest uppercase">Founded</div>
            </div>
          </div>

          {/* PINNED INTEL Section */}
          <h3 className="text-text-secondary text-[10px] font-bold tracking-widest uppercase mb-4 border-b border-border-color pb-2">
            PINNED INTEL
          </h3>
          <div className="bg-bg-card border border-border-color border-l-2 border-l-accent rounded-r-lg p-4 mb-8">
            <div className="inline-block bg-accent/10 text-accent text-[9px] font-bold px-2 py-0.5 rounded mb-2 tracking-wider">
              MATCH PREVIEW
            </div>
            <p className="text-white text-xs leading-relaxed mb-3">
              Tactical breakdown: How {activeTeam.name.replace(' FANS', '')} plans to dismantle the opposition&apos;s low block using width and quick transitions.
            </p>
            <span className="text-accent text-[10px] font-bold tracking-widest uppercase hover:underline cursor-pointer">
              Read Full Report →
            </span>
          </div>

          {/* TOP OPERATIVES TODAY Section */}
          <h3 className="text-text-secondary text-[10px] font-bold tracking-widest uppercase mb-4 border-b border-border-color pb-2">
            TOP OPERATIVES TODAY
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { rank: 1, name: "ViniMaster99", avatar: "V", xp: "14.2K", icon: <Flame size={14} className="text-accent" /> },
              { rank: 2, name: "SambaKing", avatar: "S", xp: "12.8K", icon: null },
              { rank: 3, name: "RioNights", avatar: "R", xp: "11.1K", icon: null },
            ].map((op) => (
              <div key={op.rank} className="flex items-center justify-between p-2 rounded-lg hover:bg-bg-card transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-text-secondary font-mono text-xs font-bold w-4 text-center">
                    {op.rank}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1C2333] border border-border-color flex items-center justify-center text-xs font-bold text-white relative">
                    {op.avatar}
                    {op.icon && (
                      <div className="absolute -bottom-1 -right-1 bg-bg-primary rounded-full p-0.5 border border-[#30363D]">
                        {op.icon}
                      </div>
                    )}
                  </div>
                  <span className="text-white text-xs font-bold">{op.name}</span>
                </div>
                <span className="text-accent font-mono text-[10px]">{op.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
