"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLiveMatches } from '@/hooks/useLiveMatches';
import { getLeaderboard, getUserPredictions, savePrediction } from '@/lib/appwrite';
import AuthGuard from '@/components/AuthGuard';
import { PredictionCard } from '@/components/PredictionCard';
import { BGPattern } from '@/components/ui/bg-pattern';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, User as UserIcon } from 'lucide-react';

export default function PredictionsPage() {
  const { user } = useAuth();
  const { matches, isLoading: matchesLoading } = useLiveMatches();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [predictions, setPredictions] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        const [preds, leaders] = await Promise.all([
          getUserPredictions(user.$id),
          getLeaderboard(10)
        ]);
        setPredictions(preds);
        setLeaderboard(leaders);
      } catch (err) {
        // Silently handle if database doesn't exist
      } finally {
        setLoadingData(false);
      }
    }
    loadData();
  }, [user]);

  const handlePredict = async (matchId: string, homeScore: number, awayScore: number) => {
    if (!user) return;
    try {
      const newPred = await savePrediction(user.$id, matchId, homeScore, awayScore);
      setPredictions(prev => [newPred, ...prev]);
    } catch (err) {
      // Silently handle if database doesn't exist yet, but still update the UI
      // locally so the user can see the "Prediction Locked" state.
      const mockPred = { matchId, homeScore, awayScore };
      setPredictions(prev => [mockPred, ...prev]);
    }
  };

  // Filter out full-time matches
  const activeFixtures = matches.filter(m => m.status !== "FT");

  const getMedalColor = (index: number) => {
    if (index === 0) return 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]';
    if (index === 1) return 'text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.8)]';
    if (index === 2) return 'text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.8)]';
    return 'text-text-secondary';
  };

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Trophy size={24} className={getMedalColor(index)} />;
    if (index === 1) return <Medal size={24} className={getMedalColor(index)} />;
    if (index === 2) return <Award size={24} className={getMedalColor(index)} />;
    return <span className="font-orbitron font-bold text-text-secondary w-6 text-center">{index + 1}</span>;
  };

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-[calc(100vh-64px)] bg-bg-primary pt-8 pb-20 px-4 md:px-8 relative text-white">
        <BGPattern variant="dots" mask="fade-center" fill="var(--border)" />

        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">

          {/* HEADER */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-white uppercase tracking-wider">
              Prediction Arena
            </h1>
            <p className="text-text-secondary text-sm md:text-base tracking-wide">
              Lock in your forecast. Dominate the global leaderboard.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 w-full">

            {/* LEFT COLUMN: ACTIVE FIXTURES */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-border-color pb-4">
                <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] animate-pulse"></span>
                <h2 className="text-xl font-orbitron font-bold tracking-widest uppercase">Active Fixtures</h2>
                <span className="ml-auto bg-border-color text-xs font-bold px-3 py-1 rounded-full">
                  {activeFixtures.length}
                </span>
              </div>

              {matchesLoading || loadingData ? (
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-48 bg-bg-secondary animate-pulse rounded-xl border border-border-color"></div>
                  ))}
                </div>
              ) : activeFixtures.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {activeFixtures.map(match => {
                    const existing = predictions.find(p => p.matchId === String(match.id));
                    return (
                      <PredictionCard
                        key={match.id}
                        match={match}
                        onPredict={handlePredict}
                        existingPrediction={existing}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 text-center border border-border-color border-dashed rounded-xl bg-bg-secondary/50">
                  <p className="text-text-secondary font-mono">No active or upcoming fixtures found.</p>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: GLOBAL LEADERBOARD */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-border-color pb-4">
                <Trophy size={20} className="text-gold" />
                <h2 className="text-xl font-orbitron font-bold tracking-widest uppercase">Top Operatives</h2>
              </div>

              <div className="bg-bg-card/80 backdrop-blur-md border border-border-color rounded-xl overflow-hidden shadow-lg">
                {loadingData ? (
                  <div className="p-8 flex justify-center">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : leaderboard.length > 0 ? (
                  <div className="flex flex-col divide-y divide-border-color">
                    {leaderboard.map((leader, index) => (
                      <motion.div
                        key={leader.$id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-4 p-4 hover:bg-border-color/30 transition-colors ${user?.$id === leader.userId ? 'bg-accent/5' : ''}`}
                      >
                        <div className="w-8 flex justify-center shrink-0">
                          {getMedalIcon(index)}
                        </div>

                        <div className="w-10 h-10 rounded-full bg-bg-primary border border-border-color overflow-hidden flex items-center justify-center shrink-0">
                          {leader.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={leader.avatar} alt={leader.name} className="w-full h-full object-cover" />
                          ) : (
                            <UserIcon size={20} className="text-[#484F58]" />
                          )}
                        </div>

                        <div className="flex flex-col flex-1 overflow-hidden">
                          <span className="font-bold font-orbitron truncate text-sm md:text-base">
                            {leader.name}
                            {user?.$id === leader.userId && <span className="ml-2 text-[10px] text-accent border border-accent/30 px-2 py-0.5 rounded-full uppercase tracking-widest">You</span>}
                          </span>
                          <span className="text-xs text-text-secondary tracking-widest uppercase">{leader.favoriteTeam || 'Global'}</span>
                        </div>

                        <div className="flex flex-col items-end shrink-0">
                          <span className="text-accent font-orbitron font-bold text-lg leading-none">
                            {leader.fanPoints?.toLocaleString() || 0}
                          </span>
                          <span className="text-[10px] text-text-secondary tracking-widest uppercase mt-1">XP</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-text-secondary text-sm">Leaderboard is empty.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
