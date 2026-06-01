"use client";

import React, { useState } from 'react';
import { Search, MoreVertical, Plus, Image as ImageIcon, Smile, Play, Flame, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  const [message, setMessage] = useState('');

  // Mock Data
  const regions = [
    { id: 'brazil', name: 'BRAZIL FANS', flag: '🇧🇷', online: '4,521', active: true },
    { id: 'argentina', name: 'ARGENTINA FANS', flag: '🇦🇷', online: '3,892', active: false },
    { id: 'france', name: 'FRANCE FANS', flag: '🇫🇷', online: '2,105', active: false },
    { id: 'england', name: 'ENGLAND FANS', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', online: '5,022', active: false },
    { id: 'usa', name: 'USA FANS', flag: '🇺🇸', online: '1,433', active: false },
  ];

  const operatives = [
    { rank: 1, name: 'VINI_FAN_99', xp: '124,500 XP', avatar: 'https://i.pravatar.cc/150?u=1' },
    { rank: 2, name: 'PELE_KING', xp: '98,200 XP', avatar: 'https://i.pravatar.cc/150?u=2' },
    { rank: 3, name: 'JOGA_BONITO', xp: '87,150 XP', avatar: 'https://i.pravatar.cc/150?u=3' },
  ];

  const chatHistory = [
    { type: 'separator', text: 'TODAY - MATCH DAY' },
    { type: 'message', id: 1, user: 'CARLOS_BR', avatar: 'https://i.pravatar.cc/150?u=4', time: '18:42', content: 'Lineups are out! We are playing 4-3-3 today!', isOwn: false, flag: '🇧🇷' },
    { type: 'message', id: 2, user: 'THIAGO_SILVA_FAN', avatar: 'https://i.pravatar.cc/150?u=5', time: '18:44', content: 'Defense needs to be solid. Expecting a tough match.', isOwn: false, flag: '🇧🇷' },
    { type: 'system', id: 3, content: '⚽ KICKOFF! THE MATCH HAS STARTED.' },
    { type: 'message', id: 4, user: 'PRO_PLAYER_01', avatar: 'https://i.pravatar.cc/150?u=me', time: '18:55', content: 'They are pressing so high right now...', isOwn: true, flag: '🇧🇷' },
    { type: 'system', id: 5, content: '⚽ GOAL SCORED BY BRAZIL! (24\')' },
    { type: 'message', id: 6, user: 'CARLOS_BR', avatar: 'https://i.pravatar.cc/150?u=4', time: '19:06', content: 'VAMOOOSSSS!!! WHAT A STRIKE! 🔥', isOwn: false, flag: '🇧🇷' },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-bg-primary">
      
      {/* LEFT SIDEBAR (Hidden on mobile) */}
      <div className="hidden md:flex w-[240px] flex-col border-r border-border-color shrink-0 bg-bg-primary h-full">
        <div className="p-4 border-b border-border-color">
          <span className="text-[10px] uppercase text-text-secondary tracking-widest font-bold">GLOBAL REGIONS</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2">
          {regions.map((region) => (
            <div 
              key={region.id} 
              className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                region.active 
                  ? 'bg-[#1C2333] border-l-2 border-accent' 
                  : 'border-l-2 border-transparent hover:bg-bg-secondary'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{region.flag}</span>
                <span className={`text-xs font-bold uppercase tracking-wide ${region.active ? 'text-accent' : 'text-text-primary'}`}>
                  {region.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${region.active ? 'bg-accent shadow-[0_0_5px_#00FF87]' : 'bg-text-muted'}`}></span>
                {region.active && <span className="text-[9px] font-mono text-text-secondary">{region.online}</span>}
              </div>
            </div>
          ))}
        </div>
        
        {/* User Profile Bottom */}
        <div className="p-4 border-t border-border-color bg-[#161B22]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full border border-border-color overflow-hidden bg-bg-card shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://i.pravatar.cc/150?u=me" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase tracking-wider">PRO_PLAYER_01</span>
              <span className="text-[9px] text-text-muted font-mono uppercase">Elite Tier</span>
            </div>
          </div>
          <button className="w-full btn-outline !py-2 !px-3 text-[10px] flex items-center justify-center gap-2 border-accent text-accent hover:bg-accent-glow">
            <Plus size={14} /> NEW CHANNEL
          </button>
        </div>
      </div>

      {/* CENTER CHAT AREA */}
      <div className="flex-1 flex flex-col h-full bg-bg-secondary relative border-r border-border-color min-w-0">
        
        {/* Chat Header */}
        <div className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-border-color shrink-0 bg-[#161B22] shadow-sm z-10">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile Back button */}
            <Link href="/" className="md:hidden text-text-secondary hover:text-white">
              <ChevronLeft size={24} />
            </Link>
            
            <div className="w-10 h-10 md:w-[44px] md:h-[44px] rounded-full overflow-hidden border border-border-color shrink-0 flex items-center justify-center bg-bg-card text-2xl shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              🇧🇷
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-sm md:text-base font-orbitron font-bold text-white uppercase tracking-wider">BRAZIL FANS</h2>
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-glow border border-border-accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_5px_#00FF87]"></span>
                  <span className="text-[9px] font-mono text-accent font-bold">4,521 ONLINE</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-text-muted">PING: 12ms • SECURE CONNECTION</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-text-secondary">
            <button className="hover:text-accent transition-colors"><Search size={20} /></button>
            <button className="hover:text-accent transition-colors"><MoreVertical size={20} /></button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6">
          {chatHistory.map((item, index) => {
            if (item.type === 'separator') {
              return (
                <div key={index} className="flex justify-center my-2">
                  <div className="px-3 py-1 rounded-full bg-bg-card border border-border-color">
                    <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold">{item.text}</span>
                  </div>
                </div>
              );
            }
            
            if (item.type === 'system') {
              return (
                <div key={index} className="flex justify-center my-1">
                  <div className="px-4 py-1.5 rounded-full bg-accent-glow border border-accent shadow-[0_0_10px_rgba(0,255,135,0.1)]">
                    <span className="text-[10px] uppercase tracking-wider text-accent font-bold">{item.content}</span>
                  </div>
                </div>
              );
            }
            
            if (item.type === 'message') {
              return (
                <div key={index} className={`flex gap-3 w-full max-w-[85%] ${item.isOwn ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-border-color shrink-0 mt-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.avatar} alt="User" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className={`flex flex-col ${item.isOwn ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-center gap-2 mb-1.5 ${item.isOwn ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-xs font-bold ${item.isOwn ? 'text-white' : 'text-accent'}`}>{item.user}</span>
                      <span className="text-[10px]">{item.flag}</span>
                      <span className="text-[10px] text-text-muted font-mono">{item.time}</span>
                    </div>
                    
                    <div className={`p-3 text-sm leading-relaxed ${
                      item.isOwn 
                        ? 'bg-accent/10 border border-accent/20 text-[#00FF87] rounded-[12px_12px_0_12px]' 
                        : 'bg-[#1C2333] border border-[#30363D] text-white rounded-[12px_12px_12px_0]'
                    }`}>
                      {item.content}
                    </div>
                  </div>
                </div>
              );
            }
            
            return null;
          })}
        </div>
        
        {/* Bottom Input Bar */}
        <div className="p-4 border-t border-border-color bg-[#161B22] shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-bg-card border border-border-color text-text-secondary hover:text-white hover:border-text-secondary transition-all shrink-0">
              <Plus size={20} />
            </button>
            <button className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center bg-bg-card border border-border-color text-text-secondary hover:text-white hover:border-text-secondary transition-all shrink-0">
              <ImageIcon size={18} />
            </button>
            
            <div className="flex-1 relative flex items-center">
              <input 
                type="text" 
                placeholder="Transmit message to BRAZIL FANS..."
                className="w-full bg-bg-card border border-border-color rounded-full h-10 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-accent placeholder:text-text-muted transition-colors"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="absolute right-3 text-text-muted hover:text-accent transition-colors">
                <Smile size={18} />
              </button>
            </div>
            
            <button className="h-10 px-4 md:px-6 rounded-full bg-accent text-bg-primary font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-accent-dim hover:shadow-[0_0_15px_rgba(0,255,135,0.4)] transition-all shrink-0">
              <span className="hidden sm:inline">SEND</span> <Play size={14} className="fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR (Desktop Only) */}
      <div className="hidden lg:flex w-[280px] flex-col bg-bg-primary h-full overflow-y-auto p-5 gap-8 shrink-0">
        
        {/* Telemetry */}
        <div className="flex flex-col gap-3 mt-2">
          <span className="text-[10px] uppercase text-text-secondary tracking-widest font-bold">TELEMETRY</span>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1C2333] border border-border-color rounded-lg p-3 flex flex-col gap-1 text-center">
              <span className="text-text-muted text-[9px] uppercase tracking-widest">Total Fans</span>
              <span className="font-orbitron font-bold text-white text-lg">1.2M</span>
            </div>
            <div className="bg-[#1C2333] border border-border-color rounded-lg p-3 flex flex-col gap-1 text-center">
              <span className="text-text-muted text-[9px] uppercase tracking-widest">Founded</span>
              <span className="font-orbitron font-bold text-white text-lg">2021</span>
            </div>
          </div>
        </div>

        {/* Pinned Intel */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase text-text-secondary tracking-widest font-bold">PINNED INTEL</span>
          <div className="bg-[#161B22] border border-border-color border-l-2 border-l-accent rounded-lg p-4 shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
            <div className="badge-green inline-block !text-[8px] mb-3">MATCH PREVIEW</div>
            <p className="text-xs text-text-primary leading-relaxed mb-4">
              Tactical breakdown for tonight&apos;s clash. High press expected from the midfield. Keep comms clear during the first 15 mins.
            </p>
            <Link href="#" className="text-accent text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
              READ FULL REPORT <ChevronLeft className="rotate-180" size={12} />
            </Link>
          </div>
        </div>

        {/* Top Operatives */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase text-text-secondary tracking-widest font-bold">TOP OPERATIVES TODAY</span>
          <div className="flex flex-col gap-2">
            {operatives.map((op, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-bg-secondary transition-colors group cursor-pointer border border-transparent hover:border-border-color">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 flex items-center justify-center font-orbitron font-bold text-[10px] ${op.rank === 1 ? 'text-accent' : 'text-text-secondary'}`}>
                    {op.rank === 1 ? <Flame size={16} className="text-danger animate-pulse drop-shadow-[0_0_5px_rgba(255,71,87,0.5)]" /> : `#${op.rank}`}
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border-color overflow-hidden bg-bg-card shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={op.avatar} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-white group-hover:text-accent transition-colors">{op.name}</span>
                    <span className="text-[9px] font-mono text-text-muted">{op.xp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
