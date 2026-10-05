import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, RefreshCw, Search, History } from 'lucide-react';
import AnalysisTable from '../components/analyses/AnalysisTable';
import AnalysisDetails from '../components/analyses/AnalysisDetails';
import LoadingState from '../components/common/LoadingState';
import Button from '../components/common/Button';
import { getRecentAnalyses, getAnalysisById } from '../services/api';
import type {
  AnalysisSummary,
  EmergencyAnalysisResponse,
  VehicleType,
  RiskLevel,
} from '../types/api';

interface FilterState {
  search: string;
  vehicle: VehicleType | '';
  risk: RiskLevel | '';
}

const VEHICLE_OPTIONS: Array<{ value: VehicleType | ''; label: string }> = [
  { value: '', label: 'All vehicles' },
  { value: 'Ambulance',     label: 'Ambulance' },
  { value: 'FireEngine',    label: 'Fire & Rescue' },
  { value: 'RescueVehicle', label: 'Emergency Response' },
  { value: 'Other',         label: 'Other' },
];

const RISK_OPTIONS: Array<{ value: RiskLevel | ''; label: string }> = [
  { value: '',       label: 'All risk levels' },
  { value: 'LOW',    label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH',   label: 'High' },
  { value: 'SEVERE', label: 'Severe' },
];

export const RecentAnalyses: React.FC = () => {
  const navigate = useNavigate();

  const [analyses, setAnalyses] = useState<AnalysisSummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<EmergencyAnalysisResponse | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    vehicle: '',
    risk: '',
  });

  const fetchAnalyses = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);

    try {
      const data = await getRecentAnalyses();
      setAnalyses(data);
    } catch {
      setAnalyses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const filteredAnalyses = analyses?.filter((a) => {
    const q = filters.search.toLowerCase();
    const matchesSearch =
      !q ||
      a.origin.toLowerCase().includes(q) ||
      a.destination.toLowerCase().includes(q);
    const matchesVehicle = !filters.vehicle || a.vehicleType === filters.vehicle;
    const matchesRisk    = !filters.risk    || a.riskLevel === filters.risk;
    return matchesSearch && matchesVehicle && matchesRisk;
  });

  const handleViewDetails = async (id: string) => {
    setDetailLoading(true);
    try {
      const detail = await getAnalysisById(id);
      setSelectedAnalysis(detail);
    } catch {
      // Keep table visible
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
            Recent Analyses
          </h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Review previous emergency route predictions and recommendations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw size={12} className={refreshing ? 'spin' : ''} />}
            iconPosition="left"
            onClick={() => fetchAnalyses(true)}
            disabled={loading || refreshing}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={13} />}
            iconPosition="left"
            onClick={() => navigate('/app/analysis')}
          >
            New Emergency Analysis
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 rounded-xl bg-white border border-[#E5E7EB] flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="search"
            placeholder="Search starting location or destination..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            className="input-base pl-8 h-8 text-xs"
          />
        </div>

        <div className="relative">
          <select
            value={filters.vehicle}
            onChange={(e) => setFilters((f) => ({ ...f, vehicle: e.target.value as VehicleType | '' }))}
            className="select-base h-8 text-xs pr-7 min-w-[140px]"
          >
            {VEHICLE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            value={filters.risk}
            onChange={(e) => setFilters((f) => ({ ...f, risk: e.target.value as RiskLevel | '' }))}
            className="select-base h-8 text-xs pr-7 min-w-[130px]"
          >
            {RISK_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
          <LoadingState variant="skeleton" rows={4} message="Loading analyses..." />
        </div>
      ) : filteredAnalyses && filteredAnalyses.length > 0 ? (
        <AnalysisTable
          analyses={filteredAnalyses}
          onStartNew={() => navigate('/app/analysis')}
          onViewDetails={handleViewDetails}
        />
      ) : (
        <div className="p-8 rounded-xl bg-white border border-[#E5E7EB] text-center">
          <div className="max-w-sm mx-auto py-2">
            <div className="w-8 h-8 rounded-full bg-[#F8F9FA] text-[#9CA3AF] flex items-center justify-center mx-auto mb-2 border border-[#E5E7EB]">
              <History size={15} />
            </div>
            <h2 className="text-xs font-bold text-[#111827]">
              No saved analyses yet
            </h2>
            <p className="text-2xs text-[#6B7280] mt-0.5 mb-4">
              Completed route plans will appear here.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus size={13} />}
              iconPosition="left"
              onClick={() => navigate('/app/analysis')}
            >
              New Emergency Analysis →
            </Button>
          </div>
        </div>
      )}

      {/* Modal Detail Overlay */}
      {detailLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg shadow-xl px-8 py-6">
            <LoadingState variant="spinner" message="Loading details..." />
          </div>
        </div>
      )}

      {selectedAnalysis && (
        <AnalysisDetails
          analysis={selectedAnalysis}
          onClose={() => setSelectedAnalysis(null)}
        />
      )}
    </div>
  );
};

export default RecentAnalyses;
