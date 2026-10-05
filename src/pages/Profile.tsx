import React from 'react';
import { Building, Shield, CheckCircle2, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Profile: React.FC = () => {
  const { user, role } = useAuth();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
          Dispatch Profile
        </h1>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Emergency response credentials and dispatch clearance.
        </p>
      </div>

      {/* Profile Overview */}
      <div className="p-6 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-[#F0F2F5]">
          <div className="w-14 h-14 rounded-full bg-orange-100 text-accent-700 text-lg font-bold flex items-center justify-center border border-orange-200">
            {user?.name?.charAt(0) || 'D'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#111827]">{user?.name || 'Dispatcher'}</h2>
              <span className="px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-2xs font-semibold flex items-center gap-1">
                <CheckCircle2 size={11} />
                Active Session
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">{user?.email || 'dispatcher@emergency-response.gov'}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 text-xs">
          <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#E5E7EB]">
            <div className="flex items-center gap-1.5 text-[#6B7280] mb-1">
              <Building size={13} className="text-[#9CA3AF]" />
              <span className="text-2xs font-semibold uppercase tracking-wider">Department</span>
            </div>
            <p className="font-semibold text-[#111827]">{user?.department || 'Emergency Operations'}</p>
          </div>

          <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#E5E7EB]">
            <div className="flex items-center gap-1.5 text-[#6B7280] mb-1">
              <Shield size={13} className="text-[#9CA3AF]" />
              <span className="text-2xs font-semibold uppercase tracking-wider">Role</span>
            </div>
            <p className="font-semibold text-[#111827] capitalize">{role || 'Dispatcher'}</p>
          </div>

          <div className="p-3 rounded-lg bg-[#FAFBFD] border border-[#E5E7EB]">
            <div className="flex items-center gap-1.5 text-[#6B7280] mb-1">
              <Award size={13} className="text-[#9CA3AF]" />
              <span className="text-2xs font-semibold uppercase tracking-wider">Clearance</span>
            </div>
            <p className="font-semibold text-[#111827]">Priority Route Dispatch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
