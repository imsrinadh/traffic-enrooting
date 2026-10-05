import React from 'react';
import {
  MapPin,
  Flag,
  Navigation,
  Star,
  Layers,
} from 'lucide-react';

const ProductPreview: React.FC = () => {
  return (
    <section id="product-preview" className="py-20 bg-white border-y border-[#E4E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#F5F6F8] border border-[#E4E7EB] text-2xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">
            <Layers size={12} />
            <span>Interactive Decision Workspace</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#111827] tracking-tight">
            Designed for critical seconds in emergency dispatch.
          </h2>
          <p className="text-sm text-[#6B7280] mt-3">
            A purpose-built interface combining forward traffic forecasting, corridor hazard scoring, and route comparisons.
          </p>
        </div>

        {/* Product Interface Mockup Container */}
        <div className="rounded-xl border border-[#DDE1E6] bg-[#F5F6F8] p-3 sm:p-5 shadow-card-md">
          {/* Mock Window Top Bar */}
          <div className="bg-white rounded-lg border border-[#E4E7EB] p-3 mb-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E4E7EB]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E4E7EB]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E4E7EB]" />
              </div>
              <span className="text-2xs text-[#9CA3AF] font-mono ml-2 border-l border-[#F0F2F5] pl-2">
                Emergency Dispatch Workspace — Active Incident Model
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xs text-[#6B7280] bg-[#F5F6F8] px-2 py-0.5 rounded border border-[#E4E7EB]">
                Preview Mode
              </span>
            </div>
          </div>

          {/* Grid Layout of the Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column: Form & Recommendation (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Parameters Box */}
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3 border-b border-[#F0F2F5] pb-2">
                  <span className="text-xs font-semibold text-[#111827] uppercase tracking-wider">
                    Incident Parameters
                  </span>
                  <span className="text-2xs text-accent-600 bg-orange-50 px-1.5 py-0.5 rounded font-medium">
                    Priority 1
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2 bg-[#F9FAFB] rounded border border-[#E4E7EB] flex items-center gap-2">
                    <MapPin size={13} className="text-accent-500 flex-shrink-0" />
                    <div>
                      <span className="text-2xs text-[#9CA3AF] block">Origin</span>
                      <span className="font-medium text-[#374151]">Trauma Center Station 4</span>
                    </div>
                  </div>
                  <div className="p-2 bg-[#F9FAFB] rounded border border-[#E4E7EB] flex items-center gap-2">
                    <Flag size={13} className="text-[#374151] flex-shrink-0" />
                    <div>
                      <span className="text-2xs text-[#9CA3AF] block">Destination</span>
                      <span className="font-medium text-[#374151]">North Highway Junction</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-2xs text-[#6B7280] pt-1">
                    <div className="p-1.5 bg-[#F9FAFB] rounded border border-[#E4E7EB]">
                      <span className="text-[#9CA3AF] block">Vehicle</span>
                      <span className="font-semibold text-[#111827]">Ambulance (ALS)</span>
                    </div>
                    <div className="p-1.5 bg-[#F9FAFB] rounded border border-[#E4E7EB]">
                      <span className="text-[#9CA3AF] block">Forecast Horizon</span>
                      <span className="font-semibold text-[#111827]">Next 45 min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decision Explanation Preview */}
              <div className="card p-4 border-l-4 border-l-accent-500">
                <div className="flex items-center gap-1.5 mb-2">
                  <Star size={13} className="text-accent-500" />
                  <span className="text-xs font-semibold text-[#111827]">
                    Why this route?
                  </span>
                </div>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Avoids predicted arterial bottleneck near Central Corridor. Route offers continuous emergency shoulder access with minimal predicted congestion variance over the next 30 minutes.
                </p>
              </div>
            </div>

            {/* Right Column: Map Workspace & Comparisons (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Map Placeholder Container */}
              <div className="card overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[#E4E7EB] flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <Navigation size={13} className="text-accent-500" />
                    <span className="text-xs font-semibold text-[#111827]">
                      Predictive Route Map Canvas
                    </span>
                  </div>
                  <span className="text-2xs text-[#9CA3AF]">
                    Road Network Overlay
                  </span>
                </div>

                <div className="relative bg-[#F3F4F6] h-60 sm:h-72">
                  {/* Grid texture */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(#D1D5DB 1px, transparent 1px), linear-gradient(90deg, #D1D5DB 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                    aria-hidden="true"
                  />

                  {/* Visual corridor placeholder line */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center p-4 bg-white/95 rounded-lg border border-[#E4E7EB] shadow-xs max-w-sm">
                      <p className="text-xs font-semibold text-[#111827]">
                        Route visualization canvas
                      </p>
                      <p className="text-2xs text-[#6B7280] mt-0.5">
                        Connects directly to the routing engine to project candidate emergency corridors against predictive hazard zones.
                      </p>
                    </div>
                  </div>

                  {/* Route Legend */}
                  <div className="absolute bottom-3 left-3 right-3 sm:right-auto flex items-center gap-3 bg-white/90 backdrop-blur-xs border border-[#E4E7EB] px-3 py-1.5 rounded-md text-2xs shadow-xs">
                    <span className="flex items-center gap-1 font-medium text-[#374151]">
                      <span className="w-3 h-1 bg-accent-500 rounded-sm" /> Recommended
                    </span>
                    <span className="flex items-center gap-1 text-[#6B7280]">
                      <span className="w-3 h-1 bg-[#9CA3AF] rounded-sm" /> Alternative
                    </span>
                    <span className="flex items-center gap-1 text-[#DC2626]">
                      <span className="w-3 h-1 bg-red-400 rounded-sm" /> High-Risk Segment
                    </span>
                  </div>
                </div>
              </div>

              {/* Route Comparison Row Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="card p-3 border-accent-300 ring-1 ring-accent-200 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#111827]">Route Alpha (Recommended)</span>
                    <span className="text-2xs bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded font-medium">
                      Low Risk
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-2xs">
                    <div>
                      <span className="text-[#9CA3AF] block">Predicted ETA</span>
                      <span className="text-sm font-bold text-[#111827]">-- (Awaiting API)</span>
                    </div>
                    <div>
                      <span className="text-[#9CA3AF] block">Risk Score</span>
                      <span className="text-sm font-bold text-green-700">-- (Awaiting Model)</span>
                    </div>
                  </div>
                </div>

                <div className="card p-3 bg-white border-[#E4E7EB]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#4B5563]">Route Bravo (Alternative)</span>
                    <span className="text-2xs bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-medium">
                      Medium Risk
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-2xs">
                    <div>
                      <span className="text-[#9CA3AF] block">Predicted ETA</span>
                      <span className="text-sm font-bold text-[#4B5563]">--</span>
                    </div>
                    <div>
                      <span className="text-[#9CA3AF] block">Risk Score</span>
                      <span className="text-sm font-bold text-amber-700">--</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
