import React from 'react';
import { FileText, TrendingUp, ShieldAlert, Compass } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Enter Emergency Details',
    description: 'Provide the origin, destination, departure time and emergency vehicle type.',
    icon: <FileText size={15} />,
  },
  {
    number: '02',
    title: 'Predict Future Conditions',
    description: 'Estimate how traffic conditions may evolve during the journey.',
    icon: <TrendingUp size={15} />,
  },
  {
    number: '03',
    title: 'Evaluate Route Risk',
    description: 'Evaluate candidate routes using predicted traffic conditions and congestion risk.',
    icon: <ShieldAlert size={15} />,
  },
  {
    number: '04',
    title: 'Recommend a Route',
    description: 'Compare candidate corridors and identify the most suitable route.',
    icon: <Compass size={15} />,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-14 bg-[#F8F9FA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-2xs font-bold text-accent-600 uppercase tracking-wider block mb-1.5">
            Process
          </span>
          <h2 className="text-lg sm:text-2xl font-extrabold text-[#111827] tracking-tight">
            How emergency route intelligence works
          </h2>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="p-4 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-7 h-7 rounded-md bg-orange-50 text-accent-600 border border-orange-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D1D5DB]">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#111827] mb-1 leading-snug">
                  {step.title}
                </h3>
                <p className="text-2xs text-[#6B7280] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
