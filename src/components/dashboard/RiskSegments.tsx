import React from 'react';
import { TriangleAlert } from 'lucide-react';
import EmptyState from '../common/EmptyState';

const TABLE_HEADERS = ['Road Segment', 'Risk Level', 'Predicted Traffic', 'Horizon'];

const RiskSegments: React.FC = () => {
  return (
    <section aria-labelledby="risk-segments-heading">
      <div className="flex items-center justify-between mb-3">
        <h2 id="risk-segments-heading" className="section-title">
          High-Risk Road Segments
        </h2>
      </div>

      <div className="card overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-4 gap-3 px-4 py-2.5 bg-[#F8F9FA] border-b border-[#E4E7EB]">
          {TABLE_HEADERS.map((h) => (
            <span key={h} className="text-2xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
              {h}
            </span>
          ))}
        </div>

        {/* Empty state */}
        <EmptyState
          icon={<TriangleAlert size={18} />}
          title="No risk predictions available"
          description="Connect the prediction service to view high-risk road segments."
          className="py-10"
        />
      </div>
    </section>
  );
};

export default RiskSegments;
