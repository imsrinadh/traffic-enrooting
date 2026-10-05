import React from 'react';
import {
  Users,
  FileSpreadsheet,
  AlertTriangle,
  Zap,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Welcome Card */}
      <div className="card p-5 sm:p-6 bg-white border-[#E4E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-2xs font-bold text-[#6B7280] uppercase tracking-wider block mb-1">
            Operations Control Center
          </span>
          <h2 className="text-lg font-bold text-[#111827]">
            System Performance & Dispatch Overview
          </h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Monitor real-time prediction pipeline load, dispatcher throughput, and system health status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/system-health"
            className="px-3 py-1.5 rounded-lg border border-[#E4E7EB] bg-[#F9FAFB] hover:bg-white text-xs font-semibold text-[#374151] transition-colors"
          >
            Check System Health
          </Link>
        </div>
      </div>

      {/* KPI Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4 bg-white border-[#E4E7EB]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xs font-bold text-[#6B7280] uppercase tracking-wider">Total Users</span>
            <Users size={15} className="text-[#9CA3AF]" />
          </div>
          <div className="text-2xl font-bold text-[#D1D5DB] mb-1">--</div>
          <p className="text-2xs text-[#9CA3AF]">Active dispatchers registered</p>
        </div>

        <div className="card p-4 bg-white border-[#E4E7EB]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xs font-bold text-[#6B7280] uppercase tracking-wider">Emergency Analyses</span>
            <FileSpreadsheet size={15} className="text-[#9CA3AF]" />
          </div>
          <div className="text-2xl font-bold text-[#D1D5DB] mb-1">--</div>
          <p className="text-2xs text-[#9CA3AF]">Historical routing requests</p>
        </div>

        <div className="card p-4 bg-white border-[#E4E7EB]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xs font-bold text-[#6B7280] uppercase tracking-wider">Prediction Requests</span>
            <Zap size={15} className="text-[#9CA3AF]" />
          </div>
          <div className="text-2xl font-bold text-[#D1D5DB] mb-1">--</div>
          <p className="text-2xs text-[#9CA3AF]">Inference calls executed</p>
        </div>

        <div className="card p-4 bg-white border-[#E4E7EB]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xs font-bold text-[#6B7280] uppercase tracking-wider">High-Risk Routes</span>
            <AlertTriangle size={15} className="text-[#9CA3AF]" />
          </div>
          <div className="text-2xl font-bold text-[#D1D5DB] mb-1">--</div>
          <p className="text-2xs text-[#9CA3AF]">Severe bottlenecks detected</p>
        </div>
      </div>

      {/* Two column layout for recent activity & quick status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent System Activity Log (8 cols) */}
        <div className="lg:col-span-8 card bg-white border-[#E4E7EB] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#E4E7EB] flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Recent System Audit Log
            </h3>
            <span className="text-2xs text-[#9CA3AF]">Audit Trail</span>
          </div>
          <div className="p-8 text-center">
            <Clock size={20} className="text-[#D1D5DB] mx-auto mb-2" />
            <p className="text-xs font-bold text-[#374151]">No system audit entries yet</p>
            <p className="text-2xs text-[#6B7280] max-w-sm mx-auto mt-1">
              Audit events, authentication logs, and routing execution records will populate here once the backend is connected.
            </p>
          </div>
        </div>

        {/* Microservice Health Quick Summary (4 cols) */}
        <div className="lg:col-span-4 card bg-white border-[#E4E7EB] p-5">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4 border-b border-[#F0F2F5] pb-2">
            Pipeline Health Summary
          </h3>
          <div className="space-y-3 text-xs">
            {[
              { name: 'XGBoost Prediction Engine', status: 'Waiting' },
              { name: 'Traffic Ingestion Service', status: 'Waiting' },
              { name: 'Routing & Graph Engine',    status: 'Waiting' },
              { name: 'PostgreSQL Database',       status: 'Waiting' },
            ].map((srv) => (
              <div key={srv.name} className="flex items-center justify-between p-2 rounded bg-[#F9FAFB] border border-[#E4E7EB]">
                <span className="text-xs font-medium text-[#374151] truncate">{srv.name}</span>
                <span className="text-2xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                  {srv.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[#F0F2F5]">
            <Link
              to="/admin/system-health"
              className="text-2xs font-semibold text-accent-700 hover:text-accent-800 flex items-center justify-between"
            >
              <span>View full diagnostics</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
