import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import RouteNetworkCanvas from '../common/RouteNetworkCanvas';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-18 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F8F9FA] to-[#F1F3F5]">
      {/* Background subtle technical grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-accent-700 text-2xs font-bold mb-5 shadow-2xs">
          <span className="flex h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse" />
          <span>Emergency Route Intelligence Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.12] mb-5">
          Predict the road <br className="hidden sm:inline" />
          <span className="text-accent-500">before you take it.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          Predict future traffic conditions and identify lower-risk routes for emergency response. Moving beyond reactive GPS toward forward-looking corridor intelligence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/app/analysis')}
            icon={<ArrowRight size={15} />}
            iconPosition="right"
            className="w-full sm:w-auto shadow-xs"
          >
            Start Emergency Analysis
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToHowItWorks}
            className="w-full sm:w-auto"
          >
            How It Works
          </Button>
        </div>

        {/* Main Visual: Abstract Road Network Optimization Canvas */}
        <div className="max-w-3xl mx-auto">
          <RouteNetworkCanvas />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
