import React from 'react';
import { Bell, UserCircle, Menu, Home, Trophy, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  activeTab?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab = 'LIVE' }) => {
  const desktopLinks = ['LIVE', 'FIXTURES', 'STANDINGS', 'COMMUNITY'];
  
  const mobileLinks = [
    { name: 'Home', icon: Home, id: 'HOME' },
    { name: 'Matches', icon: Trophy, id: 'FIXTURES' },
    { name: 'Community', icon: Users, id: 'COMMUNITY' },
    { name: 'Predict', icon: TrendingUp, id: 'PREDICTIONS' },
    { name: 'Profile', icon: UserCircle, id: 'PROFILE' },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-bg-primary border-b border-border-color sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-orbitron italic text-accent text-[1.4rem] font-bold tracking-wider cursor-pointer">
                ULTRA_FAN
              </Link>
            </div>

            {/* Center: Desktop Nav Links */}
            <div className="hidden md:flex space-x-8 items-center h-full">
              {desktopLinks.map((link) => (
                <Link key={link} href={`#${link.toLowerCase()}`} className="h-full flex items-center">
                  <span
                    className={`nav-link cursor-pointer uppercase tracking-wide h-full flex items-center mt-[2px] ${
                      activeTab === link ? 'active text-accent border-b-2 border-accent' : 'text-text-secondary border-b-2 border-transparent hover:text-text-primary'
                    }`}
                  >
                    {link}
                  </span>
                </Link>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-5">
              <button className="text-text-secondary hover:text-text-primary transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full border border-bg-primary"></span>
              </button>
              <button className="hidden md:block text-text-secondary hover:text-text-primary transition-colors">
                <UserCircle size={22} />
              </button>
              <button className="btn-outline hidden md:block !py-2 !px-4 text-xs font-bold border-accent text-accent hover:bg-accent-glow">
                LOGIN
              </button>
              {/* Mobile menu button */}
              <button className="md:hidden text-text-secondary hover:text-text-primary transition-colors">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Live Ticker Bar */}
      <div className="bg-bg-secondary border-b border-border-color h-10 flex items-center overflow-hidden whitespace-nowrap relative z-40">
        {/* Ticker Overlay Label */}
        <div className="flex items-center px-4 shrink-0 bg-bg-secondary z-10 h-full border-r border-border-color absolute left-0 top-0 shadow-[10px_0_15px_-3px_rgba(22,27,34,1)]">
          <div className="live-dot mr-2"></div>
          <span className="font-bold text-danger uppercase tracking-wider text-[11px] font-orbitron">Live</span>
        </div>
        
        {/* Scrolling Content */}
        <div 
          className="inline-block w-full"
          style={{ animation: 'ticker 25s linear infinite' }}
        >
          <span className="text-text-primary text-sm tracking-wide">
            • Brazil <span className="text-accent font-mono font-bold">2 - 1</span> Argentina • <span className="text-text-secondary">67&apos;</span> • 
            <span className="mx-3"></span>
            France <span className="text-accent font-mono font-bold">1 - 0</span> England • <span className="text-text-secondary">45&apos;</span> •
            <span className="mx-3"></span>
            Japan <span className="text-accent font-mono font-bold">0 - 0</span> Croatia • <span className="text-text-secondary">12&apos;</span> •
            <span className="mx-3"></span>
            Spain <span className="text-accent font-mono font-bold">3 - 1</span> Italy • <span className="text-text-secondary">89&apos;</span> •
            <span className="mx-3"></span>
            Brazil <span className="text-accent font-mono font-bold">2 - 1</span> Argentina • <span className="text-text-secondary">67&apos;</span> • 
            <span className="mx-3"></span>
            France <span className="text-accent font-mono font-bold">1 - 0</span> England • <span className="text-text-secondary">45&apos;</span> •
          </span>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-border-color z-50 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-16">
          {mobileLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.name}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <link.icon 
                  size={22} 
                  className={isActive ? 'text-accent drop-shadow-[0_0_8px_rgba(0,255,135,0.5)]' : ''} 
                />
                <span className="text-[9px] font-semibold uppercase tracking-wider">{link.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
