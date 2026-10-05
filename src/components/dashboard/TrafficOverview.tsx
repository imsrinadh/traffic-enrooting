import React from 'react';
import { BarChart2 } from 'lucide-react';
import EmptyState from '../common/EmptyState';

const TrafficOverview: React.FC = () => {
  return (
    <section aria-labelledby="traffic-overview-heading">
      <div className="flex items-center justify-between mb-3">
        <h2 id="traffic-overview-heading" className="section-title">
          Traffic Overview
        </h2>
        <span className="text-2xs text-[#9CA3AF] bg-[#F5F6F8] border border-[#E4E7EB] px-2 py-0.5 rounded">
          No data source
        </span>
      </div>

      <div className="card">
        {/* Chart placeholder area */}
        <div className="h-64 relative border-b border-[#F0F2F5]">
          {/* Grid lines for visual structure */}
          <div className="absolute inset-0 px-6 pt-4 pb-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 flex-shrink-0 text-right">
                  <span className="text-2xs text-[#E4E7EB]">—</span>
                </div>
                <div className="flex-1 border-t border-dashed border-[#F0F2F5]" />
              </div>
            ))}
          </div>

          {/* Empty state overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <EmptyState
              icon={<BarChart2 size={18} />}
              title="No prediction data available"
              description="Connect the prediction service to view traffic forecasts."
            />
          </div>
        </div>

        {/* Legend row */}
        <div className="px-4 py-2.5 flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-0.5 bg-[#E4E7EB] rounded" />
            <span className="text-2xs text-[#9CA3AF]">Historical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-0.5 bg-[#E4E7EB] rounded border-t border-dashed border-[#D1D5DB]" />
            <span className="text-2xs text-[#9CA3AF]">Predicted</span>
          </div>
          <span className="ml-auto text-2xs text-[#D1D5DB] italic">Awaiting data</span>
        </div>
      </div>
    </section>
  );
};

export default TrafficOverview;
