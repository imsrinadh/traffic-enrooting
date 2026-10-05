import React from 'react';
import { BarChart2, TrendingUp, Clock, TriangleAlert } from 'lucide-react';
import EmptyState from '../common/EmptyState';
import type { TrafficDataPoint } from '../../types/api';

// ─────────────────────────────────────────────
// Chart types
// ─────────────────────────────────────────────

type ChartType =
  | 'trafficForecast'
  | 'congestionProbability'
  | 'riskOverTime'
  | 'predictedTravelTime';

interface PredictionChartProps {
  type: ChartType;
  /** Future: populated by backend prediction data */
  data?: TrafficDataPoint[];
  className?: string;
}

// ─────────────────────────────────────────────
// Chart metadata
// ─────────────────────────────────────────────

const CHART_META: Record<
  ChartType,
  { title: string; yLabel: string; icon: React.ReactNode }
> = {
  trafficForecast: {
    title:  'Traffic Forecast',
    yLabel: 'Traffic Volume',
    icon:   <BarChart2 size={14} />,
  },
  congestionProbability: {
    title:  'Congestion Probability',
    yLabel: 'Probability (%)',
    icon:   <TrendingUp size={14} />,
  },
  riskOverTime: {
    title:  'Risk Over Time',
    yLabel: 'Risk Score',
    icon:   <TriangleAlert size={14} />,
  },
  predictedTravelTime: {
    title:  'Predicted Travel Time',
    yLabel: 'Minutes',
    icon:   <Clock size={14} />,
  },
};

// ─────────────────────────────────────────────
// PredictionChart
// ─────────────────────────────────────────────

const PredictionChart: React.FC<PredictionChartProps> = ({
  type,
  data,
  className = '',
}) => {
  const meta = CHART_META[type];
  const hasData = data && data.length > 0;

  return (
    <div
      className={['card overflow-hidden', className].join(' ')}
      role="region"
      aria-label={`${meta.title} chart`}
    >
      {/* Chart header */}
      <div className="px-4 py-2.5 border-b border-[#E4E7EB] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#9CA3AF]" aria-hidden="true">{meta.icon}</span>
          <span className="text-sm font-semibold text-[#374151]">{meta.title}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Historical vs predicted legend */}
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-[#9CA3AF] rounded" />
            <span className="text-2xs text-[#9CA3AF]">Historical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-accent-500 rounded border-dashed" style={{ borderTop: '2px dashed #f97316', height: 0 }} />
            <span className="text-2xs text-[#9CA3AF]">Predicted</span>
          </div>
        </div>
      </div>

      {/* Chart body */}
      <div className="relative h-44 bg-[#FAFAFA]">
        {/* Y-axis label */}
        <div className="absolute left-2 inset-y-0 flex items-center">
          <span
            className="text-2xs text-[#D1D5DB] font-medium"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            aria-hidden="true"
          >
            {meta.yLabel}
          </span>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 ml-6 flex flex-col justify-between py-4 pointer-events-none" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-t border-dashed border-[#F0F2F5]" />
          ))}
        </div>

        {/* Empty state */}
        {!hasData && (
          <div className="absolute inset-0 flex items-center justify-center">
            <EmptyState
              icon={meta.icon}
              title="No prediction data"
              description="Connect the prediction service to view this chart."
              className="py-6"
            />
          </div>
        )}
      </div>

      {/* Time axis */}
      <div className="px-4 py-1.5 border-t border-[#F0F2F5] flex items-center justify-between">
        <span className="text-2xs text-[#D1D5DB]">Time →</span>
        <span className="text-2xs text-[#D1D5DB] italic">Awaiting data</span>
      </div>
    </div>
  );
};

export default PredictionChart;
