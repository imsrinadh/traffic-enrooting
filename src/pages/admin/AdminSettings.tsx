import React from 'react';
import { Sliders, Shield, Save } from 'lucide-react';
import Button from '../../components/common/Button';

const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-[#111827]">Emergency Routing Parameters & Thresholds</h2>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Configure risk scoring weights, prediction lookahead limits, and emergency vehicle dispatch defaults.
        </p>
      </div>

      {/* Form sections */}
      <div className="space-y-4">
        {/* Prediction parameters */}
        <div className="card p-5 bg-white border-[#E4E7EB]">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4 pb-2 border-b border-[#F0F2F5] flex items-center gap-2">
            <Sliders size={14} className="text-accent-500" />
            <span>Forecasting & Risk Engine Configurations</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="field-label">Default Forecast Horizon</label>
              <select className="select-base" defaultValue="45">
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes (Recommended)</option>
                <option value="60">60 Minutes</option>
              </select>
              <p className="text-2xs text-[#9CA3AF] mt-1">Maximum forward window computed per route request.</p>
            </div>

            <div>
              <label className="field-label">Severe Congestion Risk Threshold</label>
              <select className="select-base" defaultValue="75">
                <option value="60">60% Probability</option>
                <option value="75">75% Probability (Standard)</option>
                <option value="85">85% Probability</option>
              </select>
              <p className="text-2xs text-[#9CA3AF] mt-1">Triggers severe corridor hazard flags on map overlay.</p>
            </div>
          </div>
        </div>

        {/* Vehicle Priority Weights */}
        <div className="card p-5 bg-white border-[#E4E7EB]">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4 pb-2 border-b border-[#F0F2F5] flex items-center gap-2">
            <Shield size={14} className="text-accent-500" />
            <span>Emergency Vehicle Priority Routing Weights</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { vehicle: 'Ambulance (ALS / BLS)', desc: 'Prioritizes maximum speed consistency and hospital arterial access', weight: 'High (0.9)' },
              { vehicle: 'Fire Engine / Aerial Ladder', desc: 'Penalizes narrow turning radiuses and bridge height restrictions', weight: 'Heavy Vehicle (0.85)' },
              { vehicle: 'Rescue / HazMat Command', desc: 'Balances rapid transit with hazardous corridor clearance buffers', weight: 'Specialized (0.8)' },
            ].map((v) => (
              <div key={v.vehicle} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-[#F9FAFB] border border-[#E4E7EB] gap-2">
                <div>
                  <span className="font-semibold text-[#111827]">{v.vehicle}</span>
                  <p className="text-2xs text-[#6B7280]">{v.desc}</p>
                </div>
                <span className="text-2xs font-mono font-bold text-accent-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded sm:self-center self-start">
                  {v.weight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <Button variant="primary" size="md" icon={<Save size={14} />} disabled>
            Save Configurations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
