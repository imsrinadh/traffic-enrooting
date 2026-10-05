import React from 'react';
import { Clock, Ruler, Star } from 'lucide-react';
import RiskIndicator from './RiskIndicator';
import type { RouteResult } from '../../types/api';

interface RouteCardProps {
  route: RouteResult;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const statusLabels: Record<RouteResult['status'], string> = {
  'recommended':  'Recommended',
  'alternative':  'Alternative',
  'higher-risk':  'Higher Risk',
};

const statusStyles: Record<RouteResult['status'], string> = {
  'recommended': 'bg-accent-50 border-accent-200 text-accent-700',
  'alternative': 'bg-[#F5F6F8] border-[#E4E7EB] text-[#6B7280]',
  'higher-risk': 'bg-red-50 border-red-200 text-red-700',
};

const RouteCard: React.FC<RouteCardProps> = ({ route, isSelected = false, onSelect }) => {
  return (
    <article
      className={[
        'card p-4 transition-all duration-150 cursor-pointer',
        isSelected
          ? 'border-accent-400 ring-2 ring-accent-100'
          : 'hover:border-[#D1D5DB] hover:shadow-card-md',
      ].join(' ')}
      onClick={() => onSelect?.(route.id)}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`${route.name} — ${statusLabels[route.status]}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(route.id);
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {route.status === 'recommended' && (
            <Star size={13} className="text-accent-500 flex-shrink-0" aria-hidden="true" />
          )}
          <span className="text-sm font-semibold text-[#111827]">{route.name}</span>
        </div>
        <span
          className={`text-2xs font-medium px-2 py-0.5 rounded border ${statusStyles[route.status]}`}
        >
          {statusLabels[route.status]}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Clock size={13} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
          <div>
            <span className="text-2xs text-[#9CA3AF] block">Predicted ETA</span>
            <span className="text-sm font-semibold text-[#111827]">{route.predictedETA}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Ruler size={13} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
          <div>
            <span className="text-2xs text-[#9CA3AF] block">Distance</span>
            <span className="text-sm font-semibold text-[#111827]">{route.distanceKm} km</span>
          </div>
        </div>
      </div>

      {/* Risk */}
      <RiskIndicator
        level={route.congestionRisk.level}
        score={route.congestionRisk.score}
        probability={route.congestionRisk.probability}
        size="sm"
      />
    </article>
  );
};

export default RouteCard;
