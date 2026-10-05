import React from 'react';
import {
  Cpu,
  Radio,
  Route,
  Globe,
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import type { ServiceStatus } from '../../types/api';

interface ServiceItem {
  name: string;
  icon: React.ReactNode;
  description: string;
  status: ServiceStatus;
  message?: string;
}

// ─────────────────────────────────────────────
// Default services — all awaiting backend
// ─────────────────────────────────────────────

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    name:        'Prediction Engine',
    icon:        <Cpu size={15} />,
    description: 'XGBoost traffic forecasting model',
    status:      'waiting',
    message:     'Awaiting backend',
  },
  {
    name:        'Traffic Data',
    icon:        <Radio size={15} />,
    description: 'Live and historical traffic feed',
    status:      'waiting',
    message:     'Awaiting backend',
  },
  {
    name:        'Routing Engine',
    icon:        <Route size={15} />,
    description: 'Route optimization & comparison',
    status:      'waiting',
    message:     'Awaiting backend',
  },
  {
    name:        'API',
    icon:        <Globe size={15} />,
    description: 'Backend REST API connection',
    status:      'waiting',
    message:     'Not connected',
  },
];

// ─────────────────────────────────────────────
// SystemStatus component
// ─────────────────────────────────────────────

interface SystemStatusProps {
  /** Future: pass real service statuses from backend */
  services?: ServiceItem[];
}

const SystemStatus: React.FC<SystemStatusProps> = ({
  services = DEFAULT_SERVICES,
}) => {
  return (
    <section aria-labelledby="system-status-heading">
      <div className="flex items-center justify-between mb-3">
        <h2 id="system-status-heading" className="section-title">
          System Status
        </h2>
        <span className="text-2xs text-[#9CA3AF]">
          Backend not connected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {services.map((service) => (
          <div
            key={service.name}
            className="card p-3.5 flex flex-col gap-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[#9CA3AF]" aria-hidden="true">
                  {service.icon}
                </span>
                <span className="text-sm font-medium text-[#374151]">
                  {service.name}
                </span>
              </div>
              <StatusBadge status={service.status} />
            </div>
            <p className="text-2xs text-[#9CA3AF] leading-relaxed">
              {service.description}
            </p>
            {service.message && (
              <p className="text-2xs text-[#6B7280] italic">{service.message}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SystemStatus;
