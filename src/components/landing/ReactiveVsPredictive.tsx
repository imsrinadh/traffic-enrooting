import React from 'react';
import { ArrowDown } from 'lucide-react';

export const ReactiveVsPredictive: React.FC = () => {
  return (
    <section className="py-14 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-10">
          <span className="text-2xs font-bold text-accent-600 uppercase tracking-wider block mb-1.5">
            The Difference
          </span>
          <h2 className="text-lg sm:text-2xl font-extrabold text-[#111827] tracking-tight">
            From reactive navigation to predictive route planning
          </h2>
        </div>

        {/* 2 Clean Columns (Light typography & simple lines, no nested card overload) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
          {/* Left Column: Reactive Navigation */}
          <div className="space-y-4 pt-4 md:pt-0">
            <div className="border-b border-[#F0F2F5] pb-2">
              <span className="text-xs font-bold text-[#4B5563] uppercase tracking-wider block">
                Reactive Navigation
              </span>
              <span className="text-2xs text-[#9CA3AF]">
                Conventional consumer routing
              </span>
            </div>

            <div className="space-y-2 text-xs font-medium text-[#4B5563]">
              <div className="p-2.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]">
                Current traffic snapshot
              </div>
              <div className="flex justify-center text-[#9CA3AF]">
                <ArrowDown size={13} />
              </div>
              <div className="p-2.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]">
                Immediate route calculation
              </div>
              <div className="flex justify-center text-[#9CA3AF]">
                <ArrowDown size={13} />
              </div>
              <div className="p-2.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[#374151]">
                Reacts after congestion occurs
              </div>
            </div>
          </div>

          {/* Right Column: Predictive Route Planning */}
          <div className="space-y-4 pt-6 md:pt-0 md:pl-12">
            <div className="border-b border-[#F0F2F5] pb-2">
              <span className="text-xs font-bold text-accent-700 uppercase tracking-wider block">
                Predictive Route Planning
              </span>
              <span className="text-2xs text-accent-600">
                Emergency intelligence framework
              </span>
            </div>

            <div className="space-y-2 text-xs font-medium text-[#374151]">
              <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-200/80">
                Historical traffic patterns
              </div>
              <div className="flex justify-center text-accent-500">
                <ArrowDown size={13} />
              </div>
              <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-200/80">
                Future traffic estimation
              </div>
              <div className="flex justify-center text-accent-500">
                <ArrowDown size={13} />
              </div>
              <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-200/80">
                Route risk evaluation
              </div>
              <div className="flex justify-center text-accent-500">
                <ArrowDown size={13} />
              </div>
              <div className="p-2.5 rounded-lg bg-orange-100/70 border border-orange-300 font-bold text-accent-900">
                Forward route decision
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReactiveVsPredictive;
