"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, UserCircle, Menu, Home, Trophy, Users, TrendingUp, MessageSquare, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLiveMatches } from '@/hooks/useLiveMatches';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn, isLoading, loginGoogle, logout } = useAuth();
  const { matches } = useLiveMatches();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "LIVE", href: "/" },
    { label: "PREDICTIONS", href: "/predictions" },
    { label: "FAN WALL", href: "/fanwall" },
    { label: "COMMUNITY", href: "/community/brazil" },
  ];

  const mobileNavLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Fan Wall", href: "/fanwall", icon: MessageSquare },
    { label: "Community", href: "/community/brazil", icon: Users },
    { label: "Predictions", href: "/predictions", icon: TrendingUp },
    { label: "Profile", href: "/profile", icon: User },
  ];

  // Helper to check active state dynamically
  const isLinkActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    if (href.includes("/community") && pathname.startsWith("/community")) return true;
    if (href.includes("/profile") && pathname.startsWith("/profile")) return true;
    return false;
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-bg-primary border-b border-border-color sticky top-0 z-[100]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16">

            {/* Left: Logo */}
            <Link href="/" className="flex-shrink-0 flex items-baseline gap-0.5 no-underline">
              <span className="font-orbitron italic text-accent text-[1.4rem] font-bold tracking-wider">
                FANs
              </span>
            </Link>

            {/* Center: Desktop Nav Links */}
            <div className="hidden md:flex gap-8 h-full">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`h-full flex items-center text-sm font-bold tracking-wide uppercase transition-colors border-b-2 ${active
                      ? "text-accent border-accent"
                      : "text-text-secondary border-transparent hover:text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button className="text-text-secondary hover:text-accent transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[var(--bg-primary)]"></span>
              </button>

              <div className="hidden md:block relative">
                {isLoading ? (
                  <div style={{
                    width: 80, height: 32,
                    background: "var(--bg-secondary)",
                    borderRadius: 16,
                    animation: "shimmer 1.5s infinite",
                  }}>
                    <style>{`
                      @keyframes shimmer {
                        0% { opacity: 0.5; }
                        50% { opacity: 1; }
                        100% { opacity: 0.5; }
                      }
                    `}</style>
                  </div>
                ) : isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <div className="w-8 h-8 rounded-full bg-bg-card border border-border-color flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(255,255,255,0.05)] overflow-hidden">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    </button>
                    {showDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-bg-secondary border border-border-color rounded-lg shadow-xl overflow-hidden">
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-white hover:bg-bg-card border-b border-border-color">
                          <User size={16} /> My Profile
                        </Link>
                        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-bg-card text-left">
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <UserCircle size={22} className="text-text-secondary" />
                    <button
                      onClick={loginGoogle}
                      className="border border-accent text-accent px-4 py-1.5 rounded text-xs font-bold hover:bg-accent hover:text-[var(--bg-primary)] transition-colors"
                    >
                      LOGIN
                    </button>
                  </div>
                )}
              </div>
              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-text-secondary hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Live Ticker Bar */}
      <div className="bg-bg-secondary h-10 flex items-center overflow-hidden whitespace-nowrap relative border-b border-border-color z-40">
        <div className="flex items-center px-4 shrink-0 bg-bg-secondary h-full border-r border-border-color absolute left-0 top-0 z-10 shadow-[10px_0_15px_-3px_rgba(22,27,34,1)]">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
          <span className="font-bold text-white uppercase tracking-wider text-[11px] font-orbitron">LIVE</span>
        </div>

        <div className="inline-block w-full pl-[80px]" style={{ animation: 'ticker 30s linear infinite' }}>
          <div className="flex items-center space-x-6 whitespace-nowrap text-xs">
            {matches && matches.length > 0 ? (
              matches.map((m) => (
                <span key={m.id} className="flex items-center text-white">
                  <span className="mx-3 text-border-color">•</span>
                  <span className="font-semibold">{m.homeTeam?.fullName || m.homeTeam?.name || "TBD"}</span>
                  <span className="mx-2 text-accent font-bold">{m.homeScore ?? 0} - {m.awayScore ?? 0}</span>
                  <span className="font-semibold">{m.awayTeam?.fullName || m.awayTeam?.name || "TBD"}</span>
                  <span className="ml-2 text-red-400 text-[10px] font-mono">{m.minute ? `${m.minute}'` : m.status}</span>
                </span>
              ))
            ) : (
              <span className="flex items-center text-white">
                <span className="mx-3 text-border-color">•</span>
                <span className="font-semibold">Brazil</span>
                <span className="mx-2 text-accent font-bold">2 - 1</span>
                <span className="font-semibold">Argentina</span>
                <span className="ml-2 text-red-400 text-[10px] font-mono">67'</span>

                <span className="mx-3 text-border-color">•</span>
                <span className="font-semibold">France</span>
                <span className="mx-2 text-accent font-bold">1 - 0</span>
                <span className="font-semibold">England</span>
                <span className="ml-2 text-red-400 text-[10px] font-mono">45'</span>
              </span>
            )}
            <span className="mx-3 text-border-color">•</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[104px] bg-bg-primary z-40 p-4 border-b border-border-color">
          {!isLoggedIn ? (
            <button
              onClick={() => { loginGoogle(); setMobileMenuOpen(false); }}
              className="w-full border border-accent bg-accent/10 text-accent px-4 py-3 rounded font-bold hover:bg-accent hover:text-[var(--bg-primary)] transition-colors mb-4"
            >
              LOGIN WITH GOOGLE
            </button>
          ) : (
            <div className="flex items-center gap-3 mb-6 p-4 bg-bg-secondary rounded-xl border border-border-color">
              <div className="w-10 h-10 rounded-full bg-bg-card border border-border-color flex items-center justify-center text-white font-bold text-lg">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold">{user?.name}</span>
                <span className="text-xs text-text-secondary">{user?.email}</span>
              </div>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="ml-auto text-red-400 p-2">
                <LogOut size={20} />
              </button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-4 rounded-xl font-bold uppercase tracking-wide text-sm flex items-center ${isLinkActive(link.href)
                  ? "bg-accent/10 text-accent border border-accent/30"
                  : "text-text-secondary hover:bg-bg-secondary hover:text-white border border-transparent"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[rgba(13,17,23,0.95)] backdrop-blur-[20px] border-t border-accent/20 shadow-[0_-5px_20px_rgba(255,255,255,0.03)] h-16 z-[100] flex items-center justify-around px-2 pb-safe">
        {mobileNavLinks.map((link) => {
          const active = isLinkActive(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all ${active ? "text-accent -translate-y-1" : "text-text-secondary hover:text-white"
                }`}
            >
              <Icon size={active ? 22 : 20} className={active ? "drop-shadow-[0_0_8px_rgba(0,255,135,0.6)]" : ""} />
              <span className={`text-[10px] font-bold tracking-wider ${active ? "opacity-100" : "opacity-70"}`}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
