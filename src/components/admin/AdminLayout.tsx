import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const adminRouteTitles: Record<string, { title: string; subtitle: string }> = {
  '/admin': {
    title: 'Operations Overview',
    subtitle: 'System-wide metrics and pipeline throughput monitoring.',
  },
  '/admin/users': {
    title: 'User Management',
    subtitle: 'Manage dispatcher accounts and role-based permissions.',
  },
  '/admin/analyses': {
    title: 'Emergency Analyses Oversight',
    subtitle: 'Audit log and historical emergency routing queries.',
  },
  '/admin/analytics': {
    title: 'Prediction Analytics',
    subtitle: 'ML inference performance, horizon accuracy, and model telemetry.',
  },
  '/admin/system-health': {
    title: 'System Health & Services',
    subtitle: 'Diagnostic status of backend microservices, database, and cache.',
  },
  '/admin/settings': {
    title: 'System Settings',
    subtitle: 'Configure corridor thresholds, vehicle priorities, and API timeouts.',
  },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const meta = adminRouteTitles[pathname] ?? adminRouteTitles['/admin'];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F6F8]">
      <AdminSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Admin Header */}
        <header className="h-14 flex-shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 bg-white border-b border-[#E4E7EB] sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-md text-[#6B7280] hover:bg-[#F5F6F8]"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-[#111827] text-white text-2xs font-mono font-bold">
                  ADMIN
                </span>
                <h1 className="text-sm font-bold text-[#111827] leading-tight truncate">
                  {meta.title}
                </h1>
              </div>
              <p className="text-2xs text-[#6B7280] leading-tight hidden md:block truncate mt-0.5">
                {meta.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
              Backend Telemetry: Offline
            </span>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 animate-fade-in" id="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
