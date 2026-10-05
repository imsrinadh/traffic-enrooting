import React from 'react';
import { BarChart3, TrendingUp, Cpu, Zap, Activity } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-[#111827]">Predictive Model Analytics & Performance</h2>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Telemetry for XGBoost traffic prediction models, feature importance distributions, and inference latency.
        </p>
      </div>

      {/* Model telemetry metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4 bg-white border-[#E4E7EB]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xs font-bold text-[#6B7280] uppercase tracking-wider">Inference Latency</span>
            <Zap size={14} className="text-[#9CA3AF]" />
          </div>
          <div className="text-2xl font-bold text-[#D1D5DB] mb-1">-- ms</div>
          <p className="text-2xs text-[#9CA3AF]">P95 model response time</p>
        </div>

        <div className="card p-4 bg-white border-[#E4E7EB]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xs font-bold text-[#6B7280] uppercase tracking-wider">Model RMSE</span>
            <Activity size={14} className="text-[#9CA3AF]" />
          </div>
          <div className="text-2xl font-bold text-[#D1D5DB] mb-1">--</div>
          <p className="text-2xs text-[#9CA3AF]">Traffic speed error metric</p>
        </div>

        <div className="card p-4 bg-white border-[#E4E7EB]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xs font-bold text-[#6B7280] uppercase tracking-wider">Prediction Horizon</span>
            <TrendingUp size={14} className="text-[#9CA3AF]" />
          </div>
          <div className="text-2xl font-bold text-[#D1D5DB] mb-1">-- min</div>
          <p className="text-2xs text-[#9CA3AF]">Max temporal lookahead</p>
        </div>

        <div className="card p-4 bg-white border-[#E4E7EB]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xs font-bold text-[#6B7280] uppercase tracking-wider">Active Model Version</span>
            <Cpu size={14} className="text-[#9CA3AF]" />
          </div>
          <div className="text-lg font-bold text-[#D1D5DB] mb-1">XGB-v1.0 (Standby)</div>
          <p className="text-2xs text-[#9CA3AF]">Production weights ready</p>
        </div>
      </div>

      {/* Feature Importance & Model Health Scaffolding */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5 bg-white border-[#E4E7EB]">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-3 pb-2 border-b border-[#F0F2F5]">
            Feature Importance Weightings
          </h3>
          <div className="p-8 text-center">
            <BarChart3 size={20} className="text-[#D1D5DB] mx-auto mb-2" />
            <p className="text-xs font-bold text-[#374151]">Model telemetry offline</p>
            <p className="text-2xs text-[#6B7280] mt-1 max-w-xs mx-auto">
              Feature gain statistics (temporal lag, incident density, weather) will render once the ML prediction service runs in Phase 3.
            </p>
          </div>
        </div>

        <div className="card p-5 bg-white border-[#E4E7EB]">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-3 pb-2 border-b border-[#F0F2F5]">
            Corridor Prediction Error Distribution
          </h3>
          <div className="p-8 text-center">
            <TrendingUp size={20} className="text-[#D1D5DB] mx-auto mb-2" />
            <p className="text-xs font-bold text-[#374151]">No validation residuals available</p>
            <p className="text-2xs text-[#6B7280] mt-1 max-w-xs mx-auto">
              Real-time residual analysis vs sensor ground-truth will calculate as live traffic feeds stream in Phase 3.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
