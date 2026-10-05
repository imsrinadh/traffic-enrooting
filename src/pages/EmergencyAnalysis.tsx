import React, { useState } from 'react';
import EmergencyForm from '../components/emergency/EmergencyForm';
import RouteNetworkCanvas from '../components/common/RouteNetworkCanvas';
import RouteIntelligencePipeline from '../components/emergency/RouteIntelligencePipeline';
import RecommendationPanel from '../components/emergency/RecommendationPanel';
import WhatIfAnalysis from '../components/emergency/WhatIfAnalysis';
import ErrorState from '../components/common/ErrorState';
import { analyzeEmergencyRoute, ApiServiceError } from '../services/api';
import type {
  EmergencyAnalysisRequest,
  EmergencyAnalysisResponse,
} from '../types/api';

const ANALYSIS_STEPS = [
  'Preparing route comparison...',
  'Evaluating traffic patterns...',
  'Predicting future conditions...',
  'Comparing route risk...',
  'Selecting optimal corridor...',
];

export const EmergencyAnalysis: React.FC = () => {
  const [formData, setFormData] = useState<EmergencyAnalysisRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EmergencyAnalysisResponse | null>(null);

  const startAnalysisProgression = () => {
    let step = 0;
    setLoadingStep(0);
    const interval = setInterval(() => {
      step++;
      if (step < ANALYSIS_STEPS.length) {
        setLoadingStep(step);
      } else {
        clearInterval(interval);
      }
    }, 1100);
    return interval;
  };

  const handleFormSubmit = async (request: EmergencyAnalysisRequest) => {
    setFormData(request);
    setLoading(true);
    setError(null);
    setResult(null);

    const interval = startAnalysisProgression();

    try {
      const response = await analyzeEmergencyRoute(request);
      setResult(response);
    } catch (err) {
      if (err instanceof ApiServiceError) {
        setError(err.message);
      } else {
        setError('Route analysis is temporarily unavailable. Please try again.');
      }
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Page Heading */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
          Plan an Emergency Route
        </h1>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Enter the trip details and compare possible routes using future traffic conditions.
        </p>
      </div>

      {/* Guided 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Trip Details Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <EmergencyForm onSubmit={handleFormSubmit} loading={loading} />

          {/* Decision Rationale Container */}
          <RecommendationPanel
            routeName={result?.recommendedRoute?.name}
            reason={result?.recommendedRoute?.recommendationReason}
          />
        </div>

        {/* Right Column: Route Intelligence Workspace (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Decision Intelligence Pipeline */}
          <RouteIntelligencePipeline
            activeStep={loading ? loadingStep + 1 : result ? 5 : 1}
          />

          {/* Loading Transition Banner */}
          {loading && (
            <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3.5 h-3.5 border-2 border-accent-500 border-t-transparent rounded-full spin" />
                <span className="text-xs font-bold text-accent-800">
                  {ANALYSIS_STEPS[loadingStep]}
                </span>
              </div>
              <div className="w-full h-1 bg-orange-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-500 rounded-full transition-all duration-700"
                  style={{ width: `${((loadingStep + 1) / ANALYSIS_STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-xl bg-white border border-[#E5E7EB]">
              <ErrorState
                title="Analysis Unavailable"
                message={error}
                onRetry={() => formData && handleFormSubmit(formData)}
              />
            </div>
          )}

          {/* Abstract Route Network Schematic */}
          <RouteNetworkCanvas />

          {/* Route Options (Neutral Candidate Rows) */}
          <section aria-labelledby="route-options-heading" className="space-y-2">
            <h2 id="route-options-heading" className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Route Options
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
                <div className="font-bold text-[#111827] mb-0.5">Route Option 1</div>
                <div className="text-2xs text-[#9CA3AF]">Awaiting prediction</div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
                <div className="font-bold text-[#111827] mb-0.5">Route Option 2</div>
                <div className="text-2xs text-[#9CA3AF]">Awaiting prediction</div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
                <div className="font-bold text-[#111827] mb-0.5">Route Option 3</div>
                <div className="text-2xs text-[#9CA3AF]">Awaiting prediction</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* What-If Analysis Section */}
      <WhatIfAnalysis baseAnalysisId={result?.analysisId} />
    </div>
  );
};

export default EmergencyAnalysis;
