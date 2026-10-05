import React from 'react';
import { History, TrendingUp, ShieldAlert, GitCompare, Sparkles } from 'lucide-react';

interface RouteIntelligencePipelineProps {
  activeStep?: number; // 0: standby/ready, 1: patterns, 2: prediction, 3: risk, 4: comparison, 5: recommendation
}

const STAGES = [
  { label: 'Traffic Patterns',   icon: <History size={13} /> },
  { label: 'Future Conditions',  icon: <TrendingUp size={13} /> },
  { label: 'Risk Evaluation',    icon: <ShieldAlert size={13} /> },
  { label: 'Route Comparison',   icon: <GitCompare size={13} /> },
  { label: 'Recommendation',    icon: <Sparkles size={13} /> },
];

export const RouteIntelligencePipeline: React.FC<RouteIntelligencePipelineProps> = ({
  activeStep = 5,
}) => {
  return (
    <div className="card p-3.5 bg-white border-[#E5E7EB] mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xs font-bold text-[#6B7280] uppercase tracking-wider">
          Decision Intelligence Pipeline
        </span>
        <span className="text-2xs font-semibold text-accent-700">
          5-Stage Forward Evaluation
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {STAGES.map((s, idx) => {
          const isDone = idx < activeStep;

          return (
            <div
              key={s.label}
              className={[
                'p-2 rounded-lg border text-center flex flex-col items-center justify-center gap-1 transition-all',
                isDone
                  ? 'bg-orange-50/70 border-orange-200 text-accent-800 font-semibold'
                  : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#9CA3AF]',
              ].join(' ')}
            >
              <div
                className={[
                  'w-5 h-5 rounded-full flex items-center justify-center text-xs',
                  isDone ? 'bg-accent-500 text-white' : 'bg-[#E5E7EB] text-[#6B7280]',
                ].join(' ')}
              >
                {s.icon}
              </div>
              <span className="text-2xs leading-tight line-clamp-1">
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RouteIntelligencePipeline;
