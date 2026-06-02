import React, { useState } from 'react';
import { Match } from '@/hooks/useLiveMatches';
import { Lock, CheckCircle2 } from 'lucide-react';

interface Prediction {
  homeScore: number;
  awayScore: number;
}

interface PredictionCardProps {
  match: Match;
  existingPrediction?: Prediction | null;
  onPredict: (matchId: string, homeScore: number, awayScore: number) => Promise<void>;
}

export function PredictionCard({ match, existingPrediction, onPredict }: PredictionCardProps) {
  const [homeScore, setHomeScore] = useState<string>(existingPrediction ? String(existingPrediction.homeScore) : '');
  const [awayScore, setAwayScore] = useState<string>(existingPrediction ? String(existingPrediction.awayScore) : '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLocked = !!existingPrediction;

  const handleLock = async () => {
    if (isLocked || !homeScore || !awayScore) return;
    setIsSubmitting(true);
    try {
      await onPredict(String(match.id), parseInt(homeScore, 10), parseInt(awayScore, 10));
    } catch (e) {
      console.error(e);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-bg-card/80 backdrop-blur-md border border-border-color rounded-xl p-5 flex flex-col gap-6 shadow-lg">
      
      {/* HEADER: Competition and Status */}
      <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase">
        <span className="text-text-secondary">{match.competition}</span>
        <span className={match.status === 'LIVE' ? 'text-[#FF4757] animate-pulse' : 'text-accent'}>
          {match.status === 'LIVE' ? `LIVE • ${match.minute || 0}'` : 'UPCOMING'}
        </span>
      </div>

      {/* MATCH TEAMS & INPUTS */}
      <div className="flex items-center justify-between">
        
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          {match.homeTeam.flag.startsWith('http') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={match.homeTeam.flag} 
              alt={match.homeTeam.name} 
              className="w-12 h-12 md:w-16 md:h-16 object-contain" 
            />
          ) : (
            <span className="text-3xl md:text-4xl">{match.homeTeam.flag}</span>
          )}
          <span className="font-orbitron font-bold text-white text-xs md:text-sm text-center w-full truncate px-1">{match.homeTeam.name}</span>
        </div>

        {/* Inputs & VS */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0 px-2">
          <input 
            type="number" 
            min="0" max="99"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            disabled={isLocked || isSubmitting}
            className="w-12 h-14 md:w-16 md:h-16 bg-bg-primary border border-border-color rounded-lg text-center font-orbitron font-bold text-2xl text-white outline-none focus:border-accent focus:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all disabled:opacity-80"
            placeholder="-"
          />
          <span className="text-text-secondary font-bold text-sm md:text-base">VS</span>
          <input 
            type="number" 
            min="0" max="99"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            disabled={isLocked || isSubmitting}
            className="w-12 h-14 md:w-16 md:h-16 bg-bg-primary border border-border-color rounded-lg text-center font-orbitron font-bold text-2xl text-white outline-none focus:border-accent focus:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all disabled:opacity-80"
            placeholder="-"
          />
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          {match.awayTeam.flag.startsWith('http') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={match.awayTeam.flag} 
              alt={match.awayTeam.name} 
              className="w-12 h-12 md:w-16 md:h-16 object-contain" 
            />
          ) : (
            <span className="text-3xl md:text-4xl">{match.awayTeam.flag}</span>
          )}
          <span className="font-orbitron font-bold text-white text-xs md:text-sm text-center w-full truncate px-1">{match.awayTeam.name}</span>
        </div>
      </div>

      {/* LOCK BUTTON */}
      <button 
        onClick={handleLock}
        disabled={isLocked || isSubmitting || !homeScore || !awayScore}
        className={`w-full py-3 md:py-4 rounded-lg font-orbitron font-bold tracking-widest text-sm md:text-base uppercase transition-all flex items-center justify-center gap-2
          ${isLocked 
            ? 'bg-bg-primary text-accent border-2 border-accent cursor-not-allowed' 
            : 'bg-accent/10 text-accent border border-accent/50 hover:bg-accent/20 hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed'
          }
        `}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        ) : isLocked ? (
          <>
            <CheckCircle2 size={18} />
            Prediction Locked
          </>
        ) : (
          <>
            <Lock size={18} />
            Lock Prediction
          </>
        )}
      </button>

    </div>
  );
}
