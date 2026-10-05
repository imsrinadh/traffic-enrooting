import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import HeroSection from '../components/landing/HeroSection';
import DecisionPipeline from '../components/landing/DecisionPipeline';
import ReactiveVsPredictive from '../components/landing/ReactiveVsPredictive';
import HowItWorks from '../components/landing/HowItWorks';
import Capabilities from '../components/landing/Capabilities';
import FinalCTA from '../components/landing/FinalCTA';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] flex flex-col font-sans">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <DecisionPipeline />
        <ReactiveVsPredictive />
        <HowItWorks />
        <Capabilities />
        <FinalCTA />
      </main>
    </div>
  );
};

export default Landing;
