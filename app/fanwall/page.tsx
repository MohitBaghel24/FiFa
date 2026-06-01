"use client";

import React from 'react';
import { Image as ImageIcon, BarChart2, PlaySquare, ThumbsUp, Heart, MessageCircle, Share2, MoreHorizontal, TrendingUp, Trophy } from 'lucide-react';

export default function FanWallPage() {
  const posts = [
    {
      id: 1,
      user: 'VINI_FAN_99',
      avatar: 'https://i.pravatar.cc/150?u=vini',
      flag: '🇧🇷',
      location: 'BRAZIL',
      time: '2m ago',
      content: 'Just arrived at the stadium! The atmosphere is absolutely electric today. Vamos Brazil!! 🇧🇷🔥',
      image: 'https://images.unsplash.com/photo-1518605368461-1e1252281136?q=80&w=1000&auto=format&fit=crop',
      likes: '1.2k',
      hearts: '450',
      comments: '89'
    },
    {
      id: 2,
      user: 'TacticalGenius',
      avatar: 'https://i.pravatar.cc/150?u=tact',
      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      location: 'ENGLAND',
      time: '14m ago',
      content: 'If we don\'t switch to a back 4 in the second half, they are going to overrun our midfield completely. The pivot is way too exposed.',
      image: null,
      likes: '432',
      hearts: '12',
      comments: '104'
    },
    {
      id: 3,
      user: 'MessiMagic10',
      avatar: 'https://i.pravatar.cc/150?u=messi',
      flag: '🇦🇷',
      location: 'ARGENTINA',
      time: '1h ago',
      content: 'What a beautiful assist! Vision 100.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbb6b6923f?q=80&w=1000&auto=format&fit=crop',
      likes: '5.4k',
      hearts: '2.1k',
      comments: '420'
    },
    {
      id: 4,
      user: 'Ultra_Fan_01',
      avatar: 'https://i.pravatar.cc/150?u=me',
      flag: '🇺🇸',
      location: 'USA',
      time: '3h ago',
      content: 'Who else thinks the offside rule needs to be revised? These VAR decisions are taking way too long and ruining the flow of the game. Let the boys play!',
      image: null,
      likes: '890',
      hearts: '44',
      comments: '312'
    }
  ];

  const trending = [
    { hashtag: '#BRAvsARG', title: 'South American Classic', count: '124.5K' },
    { hashtag: '#BallonDor', title: 'Player of the Year Debate', count: '89.2K' },
    { hashtag: '#TransferRumors', title: 'Summer Window Opening', count: '54.2K' },
    { hashtag: '#UCLFinal', title: 'Road to Champions', count: '42.1K' }
  ];

  const topFans = [
    { rank: 1, user: 'NeonStriker99', xp: '14,250 XP', avatar: 'https://i.pravatar.cc/150?u=a' },
    { rank: 2, user: 'CyberPitch', xp: '13,840 XP', avatar: 'https://i.pravatar.cc/150?u=b' },
    { rank: 3, user: 'DataGoalie', xp: '13,100 XP', avatar: 'https://i.pravatar.cc/150?u=c' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-bg-primary pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN FEED (65% -> lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* POST COMPOSER */}
          <div className="bg-[#1C2333] border border-[#30363D] rounded-xl p-5 shadow-lg relative overflow-hidden group">
            {/* Subtle glow edge */}
            <div className="absolute top-0 left-0 w-full h-1 bg-accent/30 group-hover:bg-accent transition-colors"></div>
            
            <div className="flex gap-4 mt-2">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-border-color shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pravatar.cc/150?u=me" alt="You" className="w-full h-full object-cover" />
              </div>
              <textarea 
                placeholder="Share your thoughts on the match..." 
                className="w-full bg-transparent text-white text-lg focus:outline-none resize-none pt-2 placeholder:text-text-muted font-medium tracking-wide"
                rows={2}
              ></textarea>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#30363D]">
              <div className="flex items-center gap-2 md:gap-4 text-text-secondary">
                <button className="hover:text-accent transition-colors flex items-center justify-center p-2 rounded-full hover:bg-accent/10"><ImageIcon size={20} /></button>
                <button className="hover:text-accent transition-colors flex items-center justify-center p-2 rounded-full hover:bg-accent/10"><BarChart2 size={20} /></button>
                <button className="hover:text-accent transition-colors flex items-center justify-center p-2 rounded-full hover:bg-accent/10"><PlaySquare size={20} /></button>
              </div>
              <button className="btn-primary !px-8 !py-2.5 shadow-[0_0_15px_rgba(0,255,135,0.2)]">
                POST
              </button>
            </div>
          </div>

          {/* FAN POST CARDS */}
          <div className="flex flex-col gap-6">
            {posts.map(post => (
              <div key={post.id} className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 md:p-6 shadow-lg hover:border-[#484F58] transition-colors">
                
                {/* Post Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-[50px] h-[50px] rounded-full overflow-hidden border border-border-color shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#161B22] bg-bg-primary flex items-center justify-center text-[10px] shadow-sm">
                        {post.flag}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-[15px] hover:text-accent cursor-pointer transition-colors tracking-wide">{post.user}</span>
                      <span className="text-[11px] text-text-muted font-mono tracking-wide">{post.location} • {post.time}</span>
                    </div>
                  </div>
                  <button className="text-text-muted hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                
                {/* Post Body */}
                <div className="flex flex-col gap-5">
                  <p className="text-text-primary text-[15px] leading-relaxed tracking-wide">
                    {post.content}
                  </p>
                  {post.image && (
                    <div className="w-full h-[250px] md:h-[400px] rounded-xl overflow-hidden border border-border-color shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.image} alt="Post media" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                
                {/* Post Actions */}
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#30363D]">
                  <div className="flex items-center gap-2 md:gap-6 text-text-muted text-[11px] md:text-sm font-bold tracking-widest font-mono">
                    <button className="flex items-center gap-2 hover:text-accent hover:bg-accent/5 p-2 rounded-lg transition-colors group">
                      <ThumbsUp size={18} className="group-hover:scale-110 transition-transform" /> 
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 hover:text-danger hover:bg-danger/5 p-2 rounded-lg transition-colors group">
                      <Heart size={18} className="group-hover:scale-110 transition-transform" /> 
                      {post.hearts}
                    </button>
                    <button className="flex items-center gap-2 hover:text-accent hover:bg-accent/5 p-2 rounded-lg transition-colors group">
                      <MessageCircle size={18} className="group-hover:scale-110 transition-transform" /> 
                      {post.comments}
                    </button>
                  </div>
                  <button className="text-text-muted hover:text-accent hover:bg-accent/5 p-2 rounded-lg transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Infinite Scroll Loader Placeholder */}
          <div className="flex flex-col items-center justify-center py-10 gap-4 opacity-50">
            <span className="w-8 h-8 rounded-full border-[3px] border-accent border-t-transparent animate-spin drop-shadow-[0_0_8px_#00FF87]"></span>
            <span className="text-[10px] text-accent uppercase tracking-widest font-bold">Retrieving more signals...</span>
          </div>
          
        </div>

        {/* RIGHT SIDEBAR (35% -> lg:col-span-4) */}
        <div className="hidden lg:flex flex-col gap-8">
          
          {/* TRENDING */}
          <div className="bg-[#1C2333] border border-[#30363D] rounded-xl p-6 shadow-lg">
            <h3 className="text-xs font-orbitron font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-6">
              <TrendingUp size={16} className="text-accent" /> TRENDING NOW
            </h3>
            <div className="flex flex-col gap-6">
              {trending.map((trend, i) => (
                <div key={i} className="flex flex-col gap-1.5 cursor-pointer group">
                  <span className="text-[10px] text-accent font-bold tracking-[0.15em] uppercase">{trend.hashtag}</span>
                  <span className="text-[15px] font-bold text-white group-hover:text-accent transition-colors tracking-wide">{trend.title}</span>
                  <span className="text-[10px] text-text-muted font-mono tracking-widest uppercase">{trend.count} Posts</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Subtle Separator */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#30363D] to-transparent"></div>
          
          {/* TOP FANS THIS WEEK */}
          <div className="bg-[#1C2333] border border-[#30363D] rounded-xl p-6 shadow-lg">
            <h3 className="text-xs font-orbitron font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-6">
              <Trophy size={16} className="text-gold" /> TOP FANS THIS WEEK
            </h3>
            <div className="flex flex-col gap-3">
              {topFans.map((fan) => (
                <div key={fan.rank} className="flex items-center gap-4 group cursor-pointer p-3 -mx-3 rounded-lg hover:bg-[#212A3E] transition-colors border border-transparent hover:border-[#30363D]">
                  <div className={`w-6 text-center font-orbitron font-bold text-sm transition-colors ${
                    fan.rank === 1 ? 'text-gold' : fan.rank === 2 ? 'text-silver' : fan.rank === 3 ? 'text-bronze' : 'text-text-secondary'
                  }`}>
                    {fan.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-border-color shrink-0 group-hover:border-accent transition-colors shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={fan.avatar} alt={fan.user} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-white text-[13px] tracking-wide group-hover:text-accent transition-colors">{fan.user}</span>
                    <span className="text-[10px] text-text-muted font-mono">{fan.xp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
