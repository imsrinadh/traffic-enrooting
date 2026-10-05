import React from 'react';
import { Sparkles } from 'lucide-react';

interface RecommendationPanelProps {
  routeName?: string;
  reason?: string;
  className?: string;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  routeName,
  reason,
  className = '',
}) => {
  return (
    <div className={['card p-5 bg-white border-[#E5E7EB]', className].join(' ')}>
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#F0F2F5]">
        <Sparkles size={14} className="text-accent-500" />
        <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
          Why this route?
        </h2>
      </div>

      {reason ? (
        <div className="text-xs space-y-1.5 pt-1">
          {routeName && (
            <span className="font-bold text-accent-700 block">
              {routeName}
            </span>
          )}
          <p className="text-[#4B5563] leading-relaxed">
            {reason}
          </p>
        </div>
      ) : (
        <div className="pt-2 text-xs text-[#6B7280] leading-relaxed">
          <p>
            The recommendation will explain how predicted traffic conditions, route risk, and route characteristics influenced the decision.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendationPanel;
