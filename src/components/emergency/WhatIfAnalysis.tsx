import React, { useState } from 'react';
import { Clock, Play } from 'lucide-react';
import Button from '../common/Button';
import type { WhatIfResult } from '../../types/api';

interface WhatIfAnalysisProps {
  baseAnalysisId?: string;
  results?: WhatIfResult[];
  loading?: boolean;
  onRun?: (time: string) => void;
  className?: string;
}

export const WhatIfAnalysis: React.FC<WhatIfAnalysisProps> = ({
  results,
  loading = false,
  onRun,
  className = '',
}) => {
  const [selectedTime, setSelectedTime] = useState('');

  const handleRun = () => {
    if (!selectedTime) return;
    onRun?.(selectedTime);
  };

  const hasResults = results && results.length > 0;

  return (
    <section aria-labelledby="whatif-heading" className={['card p-5 bg-white border-[#E5E7EB]', className].join(' ')}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Clock size={15} className="text-accent-500" aria-hidden="true" />
        <h2 id="whatif-heading" className="text-xs font-bold text-[#111827] uppercase tracking-wider">
          What if I leave at a different time?
        </h2>
      </div>
      <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
        Compare how changing the departure time could affect future traffic conditions and route risk.
      </p>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 mb-4">
        <div className="flex-1">
          <label htmlFor="whatif-time" className="field-label">
            Alternative departure time
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" aria-hidden="true">
              <Clock size={14} />
            </span>
            <input
              id="whatif-time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="input-base pl-9 text-xs"
              aria-label="Alternative departure time"
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          loading={loading}
          disabled={!selectedTime}
          onClick={handleRun}
          icon={<Play size={13} />}
          iconPosition="left"
        >
          Compare Scenario
        </Button>
      </div>

      {/* Results / Empty State */}
      <div className="border-t border-[#F0F2F5] pt-3">
        {hasResults ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {results!.map((r, i) => (
              <div key={i} className="bg-[#FAFBFD] border border-[#E5E7EB] rounded-lg p-3">
                <p className="text-2xs text-[#9CA3AF] mb-1">Departure {r.departureTime}</p>
                <p className="text-xs font-bold text-[#111827]">{r.predictedETA}</p>
                <p className="text-2xs text-[#6B7280] mt-1">{r.recommendedRoute}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="text-xs text-[#6B7280]">
              Choose an alternative departure time to compare future route conditions.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatIfAnalysis;
