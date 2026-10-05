import React from 'react';
import { History, ExternalLink } from 'lucide-react';
import EmptyState from '../common/EmptyState';
import type { AnalysisSummary, RiskLevel } from '../../types/api';

// ─────────────────────────────────────────────
// Risk level badge (inline)
// ─────────────────────────────────────────────

const riskBadgeStyle: Record<RiskLevel, string> = {
  LOW:    'bg-green-50 text-green-700 border-green-200',
  MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200',
  HIGH:   'bg-red-50 text-red-700 border-red-200',
  SEVERE: 'bg-red-100 text-red-800 border-red-300',
};

const statusBadgeStyle: Record<AnalysisSummary['status'], string> = {
  completed:  'bg-green-50 text-green-700 border-green-200',
  failed:     'bg-red-50 text-red-700 border-red-200',
  processing: 'bg-amber-50 text-amber-700 border-amber-200',
};

// ─────────────────────────────────────────────
// AnalysisTable
// ─────────────────────────────────────────────

interface AnalysisTableProps {
  analyses?: AnalysisSummary[];
  onStartNew?: () => void;
  onViewDetails?: (id: string) => void;
}

const TABLE_HEADERS = [
  'Date',
  'Origin',
  'Destination',
  'Departure',
  'Vehicle',
  'Recommended Route',
  'Predicted ETA',
  'Risk',
  'Status',
  '',
];

const formatDate = (iso: string): string => {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day:   '2-digit',
      month: 'short',
      year:  'numeric',
    });
  } catch {
    return iso;
  }
};

const formatDateTime = (iso: string): string => {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day:    '2-digit',
      month:  'short',
      hour:   '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
};

const AnalysisTable: React.FC<AnalysisTableProps> = ({
  analyses,
  onStartNew,
  onViewDetails,
}) => {
  const hasData = analyses && analyses.length > 0;

  return (
    <div className="card overflow-hidden" role="region" aria-label="Recent analyses">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Emergency route analyses">
          <thead>
            <tr className="bg-[#F8F9FA] border-b border-[#E4E7EB]">
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-4 py-2.5 text-left text-2xs font-semibold text-[#9CA3AF] uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hasData ? (
              analyses!.map((analysis, i) => (
                <tr
                  key={analysis.analysisId}
                  className={[
                    'border-b border-[#F0F2F5] hover:bg-[#F8F9FA] transition-colors',
                    i % 2 === 0 ? '' : 'bg-[#FAFAFA]',
                  ].join(' ')}
                >
                  <td className="px-4 py-3 text-xs text-[#6B7280] whitespace-nowrap">
                    {formatDate(analysis.date)}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#374151] font-medium max-w-[140px] truncate">
                    {analysis.origin}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#374151] max-w-[140px] truncate">
                    {analysis.destination}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#6B7280] whitespace-nowrap">
                    {formatDateTime(analysis.departureDateTime)}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#6B7280]">
                    {analysis.vehicleType}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#374151]">
                    {analysis.recommendedRoute ?? (
                      <span className="text-[#D1D5DB]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-[#111827]">
                    {analysis.predictedETA ?? (
                      <span className="text-[#D1D5DB] font-normal">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {analysis.riskLevel ? (
                      <span
                        className={`inline-block text-2xs font-medium px-1.5 py-0.5 rounded border ${riskBadgeStyle[analysis.riskLevel]}`}
                        aria-label={`Risk: ${analysis.riskLevel}`}
                      >
                        {analysis.riskLevel}
                      </span>
                    ) : (
                      <span className="text-[#D1D5DB] text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-2xs font-medium px-1.5 py-0.5 rounded border capitalize ${statusBadgeStyle[analysis.status]}`}
                    >
                      {analysis.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onViewDetails?.(analysis.analysisId)}
                      className="p-1 rounded text-[#9CA3AF] hover:text-accent-600 hover:bg-accent-50 transition-colors"
                      aria-label={`View details for analysis from ${analysis.origin} to ${analysis.destination}`}
                    >
                      <ExternalLink size={13} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={TABLE_HEADERS.length}>
                  <EmptyState
                    icon={<History size={18} />}
                    title="No emergency analyses yet"
                    description="Submit your first emergency route analysis to see results here."
                    action={onStartNew ? { label: 'Start New Analysis', onClick: onStartNew } : undefined}
                    className="py-12"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisTable;
