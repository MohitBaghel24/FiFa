import React from 'react';
import { Users } from 'lucide-react';
import Link from 'next/link';

interface CommunityCardProps {
  name: string;
  fans: string;
  streakColor?: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ name, fans, streakColor = '#00FF87' }) => {
  const slug = name.split(' ')[0].toLowerCase();
  return (
    <Link href={`/community/${slug}`} className="block no-underline">
      <div className="bg-bg-card border border-border-color rounded-xl relative overflow-hidden group min-h-[180px] flex flex-col justify-between p-6 transition-all duration-300 hover:border-border-accent">
        {/* Abstract Streak Background */}
        <div
          className="absolute top-0 right-0 w-full h-full opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${streakColor} 0%, transparent 70%)`
          }}
        ></div>

        <div className="relative z-10">
          <h3 className="text-xl text-white mb-2 font-orbitron font-bold tracking-wide uppercase">{name}</h3>
          <p className="text-xs text-text-secondary flex items-center gap-1.5 uppercase tracking-widest font-semibold">
            <Users size={14} className="text-accent" /> {fans} MEMBERS
          </p>
        </div>

        <div className="relative z-10 flex justify-between items-end mt-6">
          {/* Mock Avatars Row */}
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-card bg-bg-secondary flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-border-color"></div>
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-bg-card bg-bg-secondary flex items-center justify-center text-[9px] font-bold text-text-secondary">
              +99
            </div>
          </div>

          <button className="btn-outline !py-1.5 !px-3 text-[10px] bg-bg-primary group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_10px_rgba(0,255,135,0.2)]">JOIN</button>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
