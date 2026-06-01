import React from 'react';
import { Heart, MessageSquare, Share2 } from 'lucide-react';

interface FanPostCardProps {
  user: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

const FanPostCard: React.FC<FanPostCardProps> = ({ user, handle, time, content, likes, comments }) => {
  return (
    <div className="border-b border-border-color py-6 last:border-0 hover:bg-bg-secondary/40 transition-colors px-4 -mx-4 rounded-xl cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-border-color flex-shrink-0"></div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
            <span className="font-bold text-sm text-white group-hover:text-accent transition-colors">{user}</span>
            <span className="text-xs text-text-secondary">{handle}</span>
            <span className="text-xs text-text-muted hidden sm:inline">•</span>
            <span className="text-xs text-text-muted">{time}</span>
          </div>
          <p className="text-sm text-text-primary mb-4 leading-relaxed">
            {content}
          </p>
          <div className="flex gap-6 text-text-muted">
            <button className="flex items-center gap-2 text-xs font-semibold hover:text-danger transition-colors">
              <Heart size={16} /> {likes}
            </button>
            <button className="flex items-center gap-2 text-xs font-semibold hover:text-accent transition-colors">
              <MessageSquare size={16} /> {comments}
            </button>
            <button className="flex items-center gap-2 text-xs font-semibold hover:text-white transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanPostCard;
