import React from 'react';
import { CheckCircle2, TriangleAlert, AlertCircle, Siren } from 'lucide-react';
import type { RiskLevel } from '../../types/api';

interface RiskConfig {
  label:     string;
  icon:      React.ReactNode;
  bg:        string;
  border:    string;
  text:      string;
  iconColor: string;
  barColor:  string;
  barWidth:  string;
}

const RISK_CONFIG: Record<RiskLevel, RiskConfig> = {
  LOW: {
    label:     'Low Risk',
    icon:      <CheckCircle2 size={14} />,
    bg:        'bg-green-50',
    border:    'border-green-200',
    text:      'text-green-700',
    iconColor: 'text-green-600',
    barColor:  'bg-green-500',
    barWidth:  'w-1/4',
  },
  MEDIUM: {
    label:     'Medium Risk',
    icon:      <TriangleAlert size={14} />,
    bg:        'bg-amber-50',
    border:    'border-amber-200',
    text:      'text-amber-700',
    iconColor: 'text-amber-600',
    barColor:  'bg-amber-400',
    barWidth:  'w-1/2',
  },
  HIGH: {
    label:     'High Risk',
    icon:      <AlertCircle size={14} />,
    bg:        'bg-red-50',
    border:    'border-red-200',
    text:      'text-red-700',
    iconColor: 'text-red-600',
    barColor:  'bg-red-500',
    barWidth:  'w-3/4',
  },
  SEVERE: {
    label:     'Severe Risk',
    icon:      <Siren size={14} />,
    bg:        'bg-red-50',
    border:    'border-red-300',
    text:      'text-red-800',
    iconColor: 'text-red-700',
    barColor:  'bg-red-700',
    barWidth:  'w-full',
  },
};

interface RiskIndicatorProps {
  /** Risk level provided by the backend — never computed in the frontend */
  level: RiskLevel;
  /** Optional 0–100 score from the backend */
  score?: number;
  /** Optional 0.0–1.0 probability from the backend */
  probability?: number;
  /** Size variant */
  size?: 'sm' | 'md';
  className?: string;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  level,
  score,
  probability,
  size = 'md',
  className = '',
}) => {
  const config = RISK_CONFIG[level];

  return (
    <div
      className={[
        'rounded border flex flex-col gap-2 p-3',
        config.bg,
        config.border,
        size === 'sm' ? 'p-2 gap-1.5' : '',
        className,
      ].join(' ')}
      role="status"
      aria-label={`Congestion risk: ${config.label}${score !== undefined ? `, score ${score}` : ''}`}
    >
      {/* Label row — icon + text always together, never color alone */}
      <div className="flex items-center gap-1.5">
        <span className={config.iconColor} aria-hidden="true">
          {config.icon}
        </span>
        <span className={`text-sm font-semibold ${config.text}`}>
          {config.label}
        </span>
      </div>

      {/* Risk bar */}
      <div className="w-full h-1 bg-white/60 rounded-full overflow-hidden border border-white/40">
        <div
          className={`h-full rounded-full ${config.barColor} ${config.barWidth} transition-all`}
          aria-hidden="true"
        />
      </div>

      {/* Score / probability row */}
      {(score !== undefined || probability !== undefined) && (
        <div className="flex items-center gap-3">
          {score !== undefined && (
            <div>
              <span className="text-2xs text-[#9CA3AF] block">Score</span>
              <span className={`text-xs font-semibold ${config.text}`}>{score}/100</span>
            </div>
          )}
          {probability !== undefined && (
            <div>
              <span className="text-2xs text-[#9CA3AF] block">Probability</span>
              <span className={`text-xs font-semibold ${config.text}`}>
                {Math.round(probability * 100)}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RiskIndicator;
