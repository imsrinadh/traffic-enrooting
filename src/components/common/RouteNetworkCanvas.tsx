import React, { useState, useEffect } from 'react';

interface RouteNetworkCanvasProps {
  animated?: boolean;
  className?: string;
}

/**
 * Abstract Road Network Schematic
 * 
 * An asymmetrical, clean schematic of an emergency transport network.
 * Displays candidate corridors branching from an Origin, passing through
 * irregular intersection nodes, and converging at a Destination.
 */
export const RouteNetworkCanvas: React.FC<RouteNetworkCanvasProps> = ({
  animated = true,
  className = '',
}) => {
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    if (!animated) return;
    const interval = setInterval(() => {
      setPulseActive(true);
      const timer = setTimeout(() => setPulseActive(false), 2400);
      return () => clearTimeout(timer);
    }, 4000);
    return () => clearInterval(interval);
  }, [animated]);

  return (
    <div
      className={[
        'relative bg-white border border-[#E5E7EB] rounded-xl overflow-hidden p-4 sm:p-6 select-none',
        className,
      ].join(' ')}
      aria-label="Abstract emergency route network visualization"
    >
      {/* Top clean header */}
      <div className="flex items-center justify-between border-b border-[#F0F2F5] pb-3 mb-4 text-xs text-[#6B7280]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-500" />
          <span className="font-semibold text-[#111827]">Corridor Evaluation Schematic</span>
        </div>
        <span className="text-2xs text-[#9CA3AF]">
          Candidate Corridors
        </span>
      </div>

      {/* SVG Network Schematic */}
      <div className="w-full max-w-lg mx-auto py-1">
        <svg
          viewBox="0 0 460 220"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* BASE NETWORK ROAD SEGMENTS (Thin, neutral lines) */}
          {/* Segment: Origin -> Node 1 */}
          <line x1="80" y1="110" x2="160" y2="55" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
          {/* Segment: Origin -> Node 2 (Center) */}
          <line x1="80" y1="110" x2="175" y2="110" stroke="#FED7AA" strokeWidth="3.5" strokeLinecap="round" />
          {/* Segment: Origin -> Node 3 */}
          <line x1="80" y1="110" x2="150" y2="165" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />

          {/* Cross-corridor connector links */}
          <line x1="160" y1="55" x2="175" y2="110" stroke="#F3F4F6" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="175" y1="110" x2="150" y2="165" stroke="#F3F4F6" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Mid-stage routes */}
          {/* North Corridor: Node 1 -> Node 4 */}
          <line x1="160" y1="55" x2="275" y2="45" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
          {/* Center Corridor (Selected): Node 2 -> Node 5 */}
          <line x1="175" y1="110" x2="290" y2="110" stroke="#FED7AA" strokeWidth="3.5" strokeLinecap="round" />
          {/* South Corridor: Node 3 -> Node 6 */}
          <line x1="150" y1="165" x2="260" y2="175" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />

          {/* Cross-corridor connector links */}
          <line x1="275" y1="45" x2="290" y2="110" stroke="#F3F4F6" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="290" y1="110" x2="260" y2="175" stroke="#F3F4F6" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Convergence to Destination */}
          {/* North Corridor -> Destination */}
          <line x1="275" y1="45" x2="380" y2="110" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
          {/* Center Corridor -> Destination */}
          <line x1="290" y1="110" x2="380" y2="110" stroke="#FED7AA" strokeWidth="3.5" strokeLinecap="round" />
          {/* South Corridor -> Destination */}
          <line x1="260" y1="175" x2="380" y2="110" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />

          {/* ACTIVE EVALUATED CORRIDOR (Emphasized Orange Path) */}
          <path
            d="M 80 110 L 175 110 L 290 110 L 380 110"
            stroke="#f97316"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* SUBTLE TRAVELING SIGNAL */}
          {pulseActive && (
            <path
              d="M 80 110 L 175 110 L 290 110 L 380 110"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="animate-signal-flow-fast"
            />
          )}

          {/* INTERMEDIATE JUNCTION NODES */}
          <circle cx="160" cy="55" r="3.5" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="2" />
          <circle cx="150" cy="165" r="3.5" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="2" />
          <circle cx="275" cy="45" r="3.5" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="2" />
          <circle cx="260" cy="175" r="3.5" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="2" />

          {/* Active path junction nodes */}
          <circle cx="175" cy="110" r="4" fill="#FFFFFF" stroke="#f97316" strokeWidth="2.5" />
          <circle cx="290" cy="110" r="4" fill="#FFFFFF" stroke="#f97316" strokeWidth="2.5" />

          {/* ORIGIN NODE */}
          <g>
            <circle cx="80" cy="110" r="8" fill="#111827" stroke="#FFFFFF" strokeWidth="2" />
            <rect x="35" y="128" width="90" height="18" rx="3" fill="#111827" />
            <text x="80" y="140" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.06em">
              ORIGIN
            </text>
          </g>

          {/* DESTINATION NODE */}
          <g>
            <circle cx="380" cy="110" r="8" fill="#f97316" stroke="#FFFFFF" strokeWidth="2" />
            <rect x="320" y="128" width="120" height="18" rx="3" fill="#f97316" />
            <text x="380" y="140" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.06em">
              DESTINATION
            </text>
          </g>
        </svg>
      </div>

      {/* Subtle Legend */}
      <div className="flex items-center justify-between pt-3 border-t border-[#F0F2F5] text-2xs text-[#6B7280]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-medium text-accent-700">
            <span className="w-3 h-1 rounded-xs bg-accent-500" />
            <span>Evaluated corridor</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#9CA3AF]">
            <span className="w-3 h-1 rounded-xs bg-[#D1D5DB]" />
            <span>Alternative routes</span>
          </div>
        </div>
        <span className="text-[#9CA3AF] text-2xs font-mono">
          Network Topology
        </span>
      </div>
    </div>
  );
};

export default RouteNetworkCanvas;
