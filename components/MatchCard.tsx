import React from 'react';
import { CalendarDays, BellRing, BarChart2, FileText } from 'lucide-react';

interface MatchCardProps {
  variant: 'live' | 'upcoming' | 'completed';
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  minute?: string; // e.g., "74'"
  competition: string;
  homeLogo?: string;
  awayLogo?: string;
  dateTime?: string; // e.g., "Tomorrow, 20:00"
  countdown?: string; // e.g., "In 24 hours"
}

const MatchCard: React.FC<MatchCardProps> = ({ 
  variant, homeTeam, awayTeam, homeScore, awayScore, minute, competition, homeLogo, awayLogo, dateTime, countdown 
}) => {
  // Parse minute to calculate progress bar (e.g. "74'" -> 74)
  const minuteNum = minute ? parseInt(minute.replace(/[^0-9]/g, ''), 10) : 0;
  const progressPercent = Math.min(Math.max((minuteNum / 90) * 100, 0), 100);

  // Logo render helper
  const renderLogo = (url?: string, fallbackText?: string) => (
    <div className="w-[60px] h-[60px] rounded-full bg-bg-primary flex items-center justify-center border border-border-color overflow-hidden shadow-lg shrink-0">
      {url ? (
        /* Using normal img for mock purposes */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={url} alt={fallbackText} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xl font-bold font-orbitron text-text-secondary uppercase">
          {fallbackText?.substring(0, 3)}
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-[#1C2333] rounded-[16px] border border-[#30363D] p-5 w-full md:w-[320px] flex-shrink-0 flex flex-col group hover:-translate-y-1 hover:border-[#00FF87] hover:shadow-[0_0_20px_rgba(0,255,135,0.15)] transition-all duration-300">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold truncate pr-2">
          {competition}
        </span>
        
        {variant === 'live' && (
          <div className="flex items-center gap-1.5 text-danger font-bold text-xs font-mono shrink-0">
            <span className="live-dot"></span> • {minute}
          </div>
        )}
        
        {variant === 'upcoming' && (
          <div className="flex items-center gap-1.5 text-text-secondary font-bold text-[10px] font-mono shrink-0">
            <CalendarDays size={14} /> {dateTime}
          </div>
        )}
        
        {variant === 'completed' && (
          <div className="badge-green !bg-bg-secondary !text-text-secondary !border-border-color !px-2 shrink-0">FT</div>
        )}
      </div>
      
      {/* Center content */}
      <div className="flex justify-between items-center mb-4 px-1">
        <div className="flex flex-col items-center gap-3 w-16">
          {renderLogo(homeLogo, homeTeam)}
          <span className="font-bold text-white text-sm tracking-widest uppercase">{homeTeam.substring(0, 3)}</span>
        </div>
        
        {variant === 'live' && (
          <div className="font-mono text-4xl font-bold text-accent px-2 drop-shadow-[0_0_10px_rgba(0,255,135,0.3)] shrink-0">
            {homeScore} - {awayScore}
          </div>
        )}
        
        {variant === 'completed' && (
          <div className="font-mono text-4xl font-bold text-white px-2 shrink-0">
            {homeScore} - {awayScore}
          </div>
        )}
        
        {variant === 'upcoming' && (
          <div className="flex flex-col items-center px-2 shrink-0">
            <div className="font-orbitron text-2xl font-bold text-text-secondary italic">VS</div>
            {countdown && <span className="text-[9px] text-accent mt-2 tracking-wider uppercase font-bold text-center">{countdown}</span>}
          </div>
        )}
        
        <div className="flex flex-col items-center gap-3 w-16">
          {renderLogo(awayLogo, awayTeam)}
          <span className="font-bold text-white text-sm tracking-widest uppercase">{awayTeam.substring(0, 3)}</span>
        </div>
      </div>
      
      {/* variant specific bottom */}
      <div className="mt-auto pt-4 flex flex-col gap-4">
        {variant === 'live' && (
          <>
            <div className="w-full h-1.5 bg-bg-primary rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent relative shadow-[0_0_10px_#00FF87]" 
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute top-0 right-0 w-4 h-full bg-white/50 blur-[2px]"></div>
              </div>
            </div>
            <button className="btn-primary w-full text-xs shadow-[0_0_15px_rgba(0,255,135,0.2)]">
              JOIN DISCUSSION
            </button>
          </>
        )}
        
        {variant === 'upcoming' && (
          <button className="btn-outline w-full flex items-center justify-center gap-2 text-xs group-hover:border-accent group-hover:text-accent transition-colors">
            <BellRing size={16} /> SET REMINDER
          </button>
        )}
        
        {variant === 'completed' && (
          <div className="flex gap-3">
            <button className="btn-outline flex-1 !px-2 flex justify-center items-center gap-1.5 text-[10px] group-hover:border-accent group-hover:text-accent">
              <BarChart2 size={14} /> VIEW STATS
            </button>
            <button className="btn-outline flex-1 !px-2 flex justify-center items-center gap-1.5 text-[10px] group-hover:border-accent group-hover:text-accent">
              <FileText size={14} /> REPORT
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default MatchCard;
