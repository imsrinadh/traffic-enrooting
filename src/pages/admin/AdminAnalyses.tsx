import React, { useState } from 'react';
import { FileSpreadsheet, Search, RefreshCw } from 'lucide-react';
import Button from '../../components/common/Button';

const AdminAnalyses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#111827]">Emergency Route Analyses Oversight</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            System-wide audit trail for all emergency route computations and corridor queries.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<RefreshCw size={13} />}
          iconPosition="left"
          disabled
        >
          Refresh Audit Log
        </Button>
      </div>

      {/* Toolbar */}
      <div className="card px-4 py-3 bg-white border-[#E4E7EB] flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="search"
            placeholder="Search by analysis ID, corridor, or vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-base pl-8 h-8 text-xs"
          />
        </div>
        <span className="text-2xs text-[#9CA3AF]">
          0 analyses recorded
        </span>
      </div>

      {/* Table */}
      <div className="card overflow-hidden bg-white border-[#E4E7EB]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs" aria-label="Admin emergency analyses table">
            <thead>
              <tr className="bg-[#FAFBFD] border-b border-[#E4E7EB] text-2xs font-bold text-[#6B7280] uppercase tracking-wider">
                <th scope="col" className="px-5 py-3">Analysis ID</th>
                <th scope="col" className="px-5 py-3">Timestamp</th>
                <th scope="col" className="px-5 py-3">Origin / Destination</th>
                <th scope="col" className="px-5 py-3">Vehicle</th>
                <th scope="col" className="px-5 py-3">Recommended Corridor</th>
                <th scope="col" className="px-5 py-3">Risk Assessment</th>
                <th scope="col" className="px-5 py-3">Execution Latency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center">
                  <FileSpreadsheet size={20} className="text-[#D1D5DB] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#374151]">No routing logs stored</p>
                  <p className="text-2xs text-[#6B7280] mt-1 max-w-sm mx-auto">
                    Centralized audit logging will persist all operational routing requests once database integration is active.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyses;
