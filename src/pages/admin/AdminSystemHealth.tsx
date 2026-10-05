import React from 'react';
import {
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';

interface ServiceDiagnostic {
  name: string;
  category: string;
  description: string;
  endpoint: string;
  techStack: string;
  status: 'waiting' | 'unavailable';
  message: string;
}

const DIAGNOSTIC_SERVICES: ServiceDiagnostic[] = [
  {
    name: 'Prediction Engine',
    category: 'ML Inference Microservice',
    description: 'XGBoost regression & classification service forecasting temporal roadway velocities.',
    endpoint: 'POST /api/prediction/forecast',
    techStack: 'Python / XGBoost / ONNX Runtime',
    status: 'waiting',
    message: 'Awaiting Phase 3 ML backend connection',
  },
  {
    name: 'Traffic Data Feed',
    category: 'Ingestion & Aggregation',
    description: 'Live sensor loop aggregator and historical corridor speed profile ingestion.',
    endpoint: 'GET /api/traffic/streams',
    techStack: 'Streaming API / ETL Pipeline',
    status: 'waiting',
    message: 'Awaiting live traffic telemetry feed',
  },
  {
    name: 'Routing & Optimization Engine',
    category: 'Network Graph Service',
    description: 'Dijkstra / Contraction Hierarchies graph solver integrating dynamic risk weights.',
    endpoint: 'POST /api/emergency/optimize-route',
    techStack: 'Graph Algorithms / PostGIS Network',
    status: 'waiting',
    message: 'Awaiting Phase 3 route optimization engine',
  },
  {
    name: 'Backend API Gateway',
    category: 'Core REST & Auth Gateway',
    description: 'FastAPI orchestration server handling authentication, validation, and endpoint dispatch.',
    endpoint: 'GET /api/system/status',
    techStack: 'FastAPI / Pydantic / Uvicorn',
    status: 'waiting',
    message: 'Not connected (Phase 2 backend)',
  },
  {
    name: 'Spatial Database',
    category: 'Persistence & Spatial Queries',
    description: 'PostgreSQL relational store with PostGIS extensions for spatial corridor indexing.',
    endpoint: 'postgresql://localhost:5432/traffic_db',
    techStack: 'PostgreSQL 16 / PostGIS 3.4',
    status: 'waiting',
    message: 'Awaiting Phase 4 database migration',
  },
  {
    name: 'Cache & Pub/Sub Buffer',
    category: 'High-Throughput In-Memory Buffer',
    description: 'In-memory state cache buffering high-frequency segment speed updates and session tokens.',
    endpoint: 'redis://localhost:6379/0',
    techStack: 'Redis 7 / Memory Store',
    status: 'waiting',
    message: 'Awaiting cache daemon initialization',
  },
];

const AdminSystemHealth: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#111827]">Backend Microservices & Architecture Telemetry</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Technical health status of backend microservices, database clusters, and inference workers.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<RefreshCw size={13} />}
          iconPosition="left"
          disabled
        >
          Check All Endpoints
        </Button>
      </div>

      {/* Notice Banner */}
      <div className="card p-4 bg-amber-50/70 border-amber-200 text-amber-800 text-xs flex items-start gap-3">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-900">
            Phase 1 Frontend Mode Active
          </p>
          <p className="text-2xs text-amber-700 mt-0.5 leading-relaxed">
            All microservice connection contracts and endpoints are defined in <code className="font-mono bg-amber-100/80 px-1 py-0.5 rounded">src/services/api.ts</code> and will automatically resolve when the FastAPI backend and microservices are spun up in Phase 2 & 3.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DIAGNOSTIC_SERVICES.map((srv) => (
          <div
            key={srv.name}
            className="card p-4 bg-white border-[#E4E7EB] hover:border-[#D1D5DB] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-2xs font-semibold text-[#9CA3AF] uppercase tracking-wider block">
                    {srv.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#111827] mt-0.5">{srv.name}</h3>
                </div>
                <StatusBadge status={srv.status} />
              </div>

              <p className="text-xs text-[#6B7280] leading-relaxed mb-3">
                {srv.description}
              </p>
            </div>

            <div className="space-y-2 border-t border-[#F0F2F5] pt-3 text-2xs">
              <div className="flex items-center justify-between font-mono bg-[#F9FAFB] p-1.5 rounded border border-[#E4E7EB]">
                <span className="text-[#9CA3AF]">Target:</span>
                <span className="text-[#374151] font-semibold truncate ml-2">{srv.endpoint}</span>
              </div>
              <div className="flex items-center justify-between text-[#6B7280]">
                <span>Stack: <strong className="text-[#374151]">{srv.techStack}</strong></span>
              </div>
              <div className="text-[#9CA3AF] italic text-2xs pt-1">
                {srv.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSystemHealth;
