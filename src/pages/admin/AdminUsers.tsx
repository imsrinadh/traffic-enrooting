import React, { useState } from 'react';
import { Users, Search, UserPlus } from 'lucide-react';
import Button from '../../components/common/Button';

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#111827]">Registered Dispatchers & Operators</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Manage authorized emergency dispatch users and security clearance levels.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<UserPlus size={13} />}
          iconPosition="left"
          disabled
        >
          Invite Dispatcher
        </Button>
      </div>

      {/* Toolbar */}
      <div className="card px-4 py-3 bg-white border-[#E4E7EB] flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="search"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-base pl-8 h-8 text-xs"
          />
        </div>
        <span className="text-2xs text-[#9CA3AF]">
          0 accounts registered
        </span>
      </div>

      {/* Table */}
      <div className="card overflow-hidden bg-white border-[#E4E7EB]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs" aria-label="Users management table">
            <thead>
              <tr className="bg-[#FAFBFD] border-b border-[#E4E7EB] text-2xs font-bold text-[#6B7280] uppercase tracking-wider">
                <th scope="col" className="px-5 py-3">Dispatcher / User</th>
                <th scope="col" className="px-5 py-3">Email</th>
                <th scope="col" className="px-5 py-3">Role</th>
                <th scope="col" className="px-5 py-3">Department</th>
                <th scope="col" className="px-5 py-3">Status</th>
                <th scope="col" className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center">
                  <Users size={20} className="text-[#D1D5DB] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#374151]">No users registered in database</p>
                  <p className="text-2xs text-[#6B7280] mt-1 max-w-sm mx-auto">
                    User directory will sync automatically with PostgreSQL authentication persistence in Phase 2.
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

export default AdminUsers;
