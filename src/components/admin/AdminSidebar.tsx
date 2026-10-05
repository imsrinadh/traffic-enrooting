import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  BarChart3,
  Activity,
  Settings,
  Shield,
  ArrowLeft,
  ChevronRight,
  X,
} from 'lucide-react';

const adminNavItems = [
  { to: '/admin',               label: 'Overview',              icon: <LayoutDashboard size={15} /> },
  { to: '/admin/users',         label: 'Users',                 icon: <Users size={15} /> },
  { to: '/admin/analyses',      label: 'Emergency Analyses',    icon: <FileSpreadsheet size={15} /> },
  { to: '/admin/analytics',     label: 'Prediction Analytics',  icon: <BarChart3 size={15} /> },
  { to: '/admin/system-health', label: 'System Health',         icon: <Activity size={15} /> },
  { to: '/admin/settings',      label: 'Settings',              icon: <Settings size={15} /> },
];

const AdminSidebarContent: React.FC<{ onNavClick?: () => void }> = ({ onNavClick }) => (
  <div className="flex flex-col h-full bg-white">
    {/* Admin Brand */}
    <div className="px-4 py-4 border-b border-[#E4E7EB]">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#111827] flex items-center justify-center text-white flex-shrink-0">
          <Shield size={16} />
        </div>
        <div>
          <p className="text-sm font-bold text-[#111827] leading-tight tracking-tight">
            Admin Console
          </p>
          <p className="text-2xs text-[#6B7280] font-medium leading-tight mt-0.5">
            Operations & Telemetry
          </p>
        </div>
      </div>
    </div>

    {/* Section label */}
    <div className="px-4 pt-4 pb-1">
      <span className="text-2xs font-bold text-[#9CA3AF] uppercase tracking-wider">
        Operations Management
      </span>
    </div>

    {/* Nav list */}
    <nav className="flex-1 px-3 py-1 space-y-1" aria-label="Admin navigation">
      {adminNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/admin'}
          onClick={onNavClick}
          className={({ isActive }) =>
            [
              'group flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 select-none',
              isActive
                ? 'bg-[#111827] text-white shadow-xs'
                : 'text-[#4B5563] hover:bg-[#F5F6F8] hover:text-[#111827]',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              <span className={isActive ? 'text-white' : 'text-[#9CA3AF] group-hover:text-[#4B5563]'}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight size={12} className="text-[#9CA3AF]" />}
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Switch back to user workspace */}
    <div className="p-3 border-t border-[#E4E7EB] bg-[#FAFBFD]">
      <Link
        to="/app"
        className="flex items-center justify-between p-2.5 rounded-lg border border-[#E4E7EB] bg-white text-xs font-semibold text-[#374151] hover:text-accent-600 hover:border-orange-200 transition-colors shadow-xs"
      >
        <span className="flex items-center gap-2">
          <ArrowLeft size={13} />
          <span>Exit to Dispatch App</span>
        </span>
        <span className="text-2xs text-[#9CA3AF]">User Mode</span>
      </Link>
    </div>
  </div>
);

interface AdminSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen, onMobileClose }) => (
  <>
    <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 bg-white border-r border-[#E4E7EB] h-screen sticky top-0 z-20">
      <AdminSidebarContent />
    </aside>

    {mobileOpen && (
      <div
        className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-xs"
        aria-hidden="true"
        onClick={onMobileClose}
      />
    )}

    <aside
      className={[
        'lg:hidden fixed top-0 left-0 z-50 flex flex-col w-64 h-screen bg-white border-r border-[#E4E7EB] shadow-xl transition-transform duration-200',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      aria-label="Admin mobile navigation"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E7EB]">
        <span className="text-xs font-semibold text-[#111827]">Admin Menu</span>
        <button
          onClick={onMobileClose}
          className="p-1.5 rounded text-[#9CA3AF] hover:bg-[#F5F6F8] hover:text-[#111827]"
        >
          <X size={16} />
        </button>
      </div>
      <AdminSidebarContent onNavClick={onMobileClose} />
    </aside>
  </>
);

export default AdminSidebar;
