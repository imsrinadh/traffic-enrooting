import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  GitCompare,
  Clock,
  Sparkles,
  BarChart3,
} from 'lucide-react';

const CAPABILITIES = [
  {
    title: 'Predictive Traffic Forecasting',
    description: 'Forecast future traffic conditions using historical and contextual traffic patterns.',
    icon: <TrendingUp size={15} />,
  },
  {
    title: 'Emergency Route Risk',
    description: 'Evaluate predicted congestion risk across candidate road segments.',
    icon: <ShieldCheck size={15} />,
  },
  {
    title: 'Multi-Corridor Comparison',
    description: 'Compare candidate emergency routes using predicted traffic conditions.',
    icon: <GitCompare size={15} />,
  },
  {
    title: 'What-If Temporal Analysis',
    description: 'Explore how changing departure time may affect future route conditions.',
    icon: <Clock size={15} />,
  },
  {
    title: 'Transparent Decision Support',
    description: 'Explain the factors behind a future route recommendation.',
    icon: <Sparkles size={15} />,
  },
  {
    title: 'Corridor Analytics',
    description: 'Visualize predicted traffic trends and route-risk insights.',
    icon: <BarChart3 size={15} />,
  },
];

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-14 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-2xs font-bold text-accent-600 uppercase tracking-wider block mb-1.5">
            Platform Capabilities
          </span>
          <h2 className="text-lg sm:text-2xl font-extrabold text-[#111827] tracking-tight">
            Decision support for emergency routing
          </h2>
        </div>

        {/* Compact Editorial Grid (No oversized cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="p-4 rounded-lg bg-[#FAFBFD] border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-accent-600 p-1 rounded bg-orange-50" aria-hidden="true">
                  {cap.icon}
                </span>
                <h3 className="text-xs font-bold text-[#111827] leading-snug">
                  {cap.title}
                </h3>
              </div>
              <p className="text-2xs text-[#6B7280] leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
