import React from 'react';
import {
  MapPin,
  Flag,
  Navigation,
  Plus,
  Minus,
  Layers,
  Compass,
  Crosshair,
} from 'lucide-react';

interface MapViewProps {
  /** Future: pass origin from the form */
  origin?: string;
  /** Future: pass destination from the form */
  destination?: string;
  /** Future: pass candidate routes from backend */
  routes?: unknown[];
  /** Future: pass recommended route id from backend */
  recommendedRouteId?: string;
  className?: string;
}

/**
 * MapView — Professional Emergency Route Canvas Workspace.
 *
 * Designed as an API-ready GIS viewport for Phase 2/3 routing integrations.
 */
const MapView: React.FC<MapViewProps> = ({
  origin,
  destination,
  className = '',
}) => {
  return (
    <div
      className={[
        'card overflow-hidden bg-white border-[#E4E7EB]',
        className,
      ].join(' ')}
      role="region"
      aria-label="Emergency route map canvas workspace"
    >
      {/* Map header toolbar */}
      <div className="px-4 py-2.5 border-b border-[#E4E7EB] flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <Navigation size={14} className="text-accent-500" aria-hidden="true" />
          <span className="text-xs font-bold text-[#111827]">
            Emergency Route Canvas
          </span>
          <span className="text-2xs text-[#9CA3AF] hidden sm:inline">
            — GIS Road-Network Overlay
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xs font-medium text-[#6B7280] bg-[#F5F6F8] border border-[#E4E7EB] px-2 py-0.5 rounded">
            Routing Engine: Standby
          </span>
        </div>
      </div>

      {/* Map canvas placeholder body */}
      <div className="relative bg-[#F2F4F7] h-80 sm:h-96 select-none overflow-hidden">
        {/* Subtle GIS coordinate grid */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#D5DAE1 1px, transparent 1px), linear-gradient(90deg, #D5DAE1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        {/* Top-right Map Controls Placeholder */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <div className="bg-white/95 backdrop-blur-xs border border-[#D1D5DB] rounded-md shadow-xs flex flex-col divide-y divide-[#E4E7EB] overflow-hidden text-[#4B5563]">
            <button
              type="button"
              className="p-1.5 hover:bg-[#F5F6F8] hover:text-[#111827] transition-colors"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <Plus size={14} />
            </button>
            <button
              type="button"
              className="p-1.5 hover:bg-[#F5F6F8] hover:text-[#111827] transition-colors"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <Minus size={14} />
            </button>
          </div>

          <div className="bg-white/95 backdrop-blur-xs border border-[#D1D5DB] rounded-md shadow-xs flex flex-col divide-y divide-[#E4E7EB] overflow-hidden text-[#4B5563]">
            <button
              type="button"
              className="p-1.5 hover:bg-[#F5F6F8] hover:text-[#111827] transition-colors"
              title="Reset Heading / Compass"
              aria-label="Compass"
            >
              <Compass size={14} />
            </button>
            <button
              type="button"
              className="p-1.5 hover:bg-[#F5F6F8] hover:text-[#111827] transition-colors"
              title="Layers"
              aria-label="Map layers"
            >
              <Layers size={14} />
            </button>
            <button
              type="button"
              className="p-1.5 hover:bg-[#F5F6F8] hover:text-[#111827] transition-colors"
              title="Recenter Map"
              aria-label="Center viewport"
            >
              <Crosshair size={14} />
            </button>
          </div>
        </div>

        {/* Center state message */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
          <div className="p-5 bg-white/95 backdrop-blur-sm rounded-xl border border-[#DDE1E6] shadow-sm max-w-sm">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-accent-600 flex items-center justify-center mx-auto mb-2 border border-orange-100">
              <Navigation size={18} />
            </div>
            <p className="text-xs font-bold text-[#111827]">
              Route visualization will appear here
            </p>
            <p className="text-2xs text-[#6B7280] mt-1 leading-relaxed">
              Connect the routing service to display real road-network data, candidate corridors, and segment congestion overlays.
            </p>
          </div>
        </div>

        {/* Origin Pin chip */}
        {origin && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs border border-[#D1D5DB] shadow-xs rounded-md px-2.5 py-1 max-w-[200px] z-10">
            <MapPin size={12} className="text-accent-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-2xs text-[#111827] font-semibold truncate">{origin}</span>
          </div>
        )}

        {/* Destination Pin chip */}
        {destination && (
          <div className="absolute bottom-12 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs border border-[#D1D5DB] shadow-xs rounded-md px-2.5 py-1 max-w-[200px] z-10">
            <Flag size={12} className="text-[#374151] flex-shrink-0" aria-hidden="true" />
            <span className="text-2xs text-[#111827] font-semibold truncate">{destination}</span>
          </div>
        )}
      </div>

      {/* Map Footer & Corridor Legend */}
      <div className="px-4 py-2 bg-white border-t border-[#E4E7EB] flex flex-wrap items-center justify-between gap-3 text-2xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-medium text-[#374151]">
            <span className="w-3.5 h-1.5 rounded-xs bg-accent-500" />
            <span>Recommended corridor</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#6B7280]">
            <span className="w-3.5 h-1.5 rounded-xs bg-[#9CA3AF]" />
            <span>Alternative corridor</span>
          </div>
          <div className="flex items-center gap-1.5 text-red-700 font-medium">
            <span className="w-3.5 h-1.5 rounded-xs bg-red-400" />
            <span>High-risk bottleneck</span>
          </div>
        </div>
        <span className="text-[#9CA3AF] font-mono">
          Ready for GIS Provider
        </span>
      </div>
    </div>
  );
};

export default MapView;
