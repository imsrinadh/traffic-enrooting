import React from 'react';
import { History, TrendingUp, ShieldAlert, GitCompare, Sparkles, ArrowRight } from 'lucide-react';

const PIPELINE_STAGES = [
  {
    step: '01',
    title: 'Historical Patterns',
    description: 'Analyzes recurring temporal speed cycles and baseline corridor congestion trends.',
    icon: <History size={16} />,
  },
  {
    step: '02',
    title: 'Future Traffic Prediction',
    description: 'Forecasts forward traffic density and velocity ahead of the vehicle arrival time.',
    icon: <TrendingUp size={16} />,
  },
  {
    step: '03',
    title: 'Risk Evaluation',
    description: 'Computes segment bottleneck probabilities and severe delay risk scores.',
    icon: <ShieldAlert size={16} />,
  },
  {
    step: '04',
    title: 'Route Comparison',
    description: 'Evaluates candidate emergency trajectories across risk and clearance corridors.',
    icon: <GitCompare size={16} />,
  },
  {
    step: '05',
    title: 'Decision Support',
    description: 'Recommends the optimal emergency route with clear, transparent decision rationale.',
    icon: <Sparkles size={16} />,
    isFinal: true,
  },
];

export const DecisionPipeline: React.FC = () => {
  return (
    <section className="py-16 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-2xs font-bold text-accent-600 uppercase tracking-wider block mb-2">
            Intelligence Architecture
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            From traffic patterns to route decisions
          </h2>
          <p className="text-xs text-[#6B7280] mt-2">
            How predictive analytics turns raw traffic dynamics into actionable emergency route recommendations.
          </p>
        </div>

        {/* Pipeline Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {PIPELINE_STAGES.map((stage, i) => (
            <div
              key={stage.title}
              className={[
                'p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 relative',
                stage.isFinal
                  ? 'bg-orange-50/80 border-accent-300 ring-1 ring-accent-200'
                  : 'bg-[#FAFBFD] border-[#E5E7EB]',
              ].join(' ')}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={[
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      stage.isFinal
                        ? 'bg-accent-500 text-white shadow-xs'
                        : 'bg-white text-[#4B5563] border border-[#E5E7EB]',
                    ].join(' ')}
                  >
                    {stage.icon}
                  </div>
                  <span className="font-mono text-2xs font-bold text-[#9CA3AF]">
                    {stage.step}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-[#111827] mb-1 leading-snug">
                  {stage.title}
                </h3>
                <p className="text-2xs text-[#6B7280] leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {i < PIPELINE_STAGES.length - 1 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#9CA3AF] pointer-events-none">
                  <ArrowRight size={12} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DecisionPipeline;
