import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  TrendingUp,
  ShieldAlert,
  Compass,
  History,
} from 'lucide-react';
import Button from '../components/common/Button';
import RouteNetworkCanvas from '../components/common/RouteNetworkCanvas';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Trip Details',
    desc: 'Origin, destination, vehicle category & departure time',
    icon: <FileText size={14} />,
  },
  {
    step: '02',
    title: 'Future Traffic',
    desc: 'Forecasts roadway conditions across the travel window',
    icon: <TrendingUp size={14} />,
  },
  {
    step: '03',
    title: 'Route Risk',
    desc: 'Evaluates candidate segments for severe delay probability',
    icon: <ShieldAlert size={14} />,
  },
  {
    step: '04',
    title: 'Recommendation',
    desc: 'Identifies the optimal route with transparent rationale',
    icon: <Compass size={14} />,
  },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Hero Action Area */}
      <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-xl">
          <span className="text-2xs font-bold text-accent-600 uppercase tracking-wider block mb-1">
            Dispatch Command
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#111827] tracking-tight">
            Ready to plan an emergency route?
          </h1>
          <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
            Enter your trip details and compare future route conditions before departing.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          icon={<ArrowRight size={14} />}
          iconPosition="right"
          onClick={() => navigate('/app/analysis')}
          className="flex-shrink-0"
        >
          New Emergency Analysis
        </Button>
      </div>

      {/* Route Optimization Process Framework */}
      <section aria-labelledby="framework-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="framework-heading" className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
            Route Optimization Framework
          </h2>
          <span className="text-2xs text-[#9CA3AF]">
            4-Stage Workflow
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6 h-6 rounded-md bg-orange-50 text-accent-600 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-mono text-2xs font-bold text-[#9CA3AF]">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#111827] mb-1">
                  {item.title}
                </h3>
                <p className="text-2xs text-[#6B7280] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Network Schematic Workspace */}
      <section aria-labelledby="network-heading" className="space-y-3">
        <h2 id="network-heading" className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
          Network Topology Evaluation
        </h2>
        <RouteNetworkCanvas />
      </section>

      {/* Secondary Area: Recent Analyses Summary (Compact, non-oversized) */}
      <section aria-labelledby="recent-heading" className="p-5 rounded-xl bg-white border border-[#E5E7EB] text-center">
        <div className="max-w-sm mx-auto py-2">
          <div className="w-8 h-8 rounded-full bg-[#F8F9FA] text-[#9CA3AF] flex items-center justify-center mx-auto mb-2 border border-[#E5E7EB]">
            <History size={15} />
          </div>
          <h2 id="recent-heading" className="text-xs font-bold text-[#111827]">
            No route analyses yet
          </h2>
          <p className="text-2xs text-[#6B7280] mt-0.5 mb-4">
            Completed route plans will appear here.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/app/analysis')}
          >
            New Emergency Analysis →
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
