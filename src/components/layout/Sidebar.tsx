import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Siren,
  History,
  User,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ─────────────────────────────────────────────
// Navigation items for normal user
// ─────────────────────────────────────────────

const navItems = [
  { to: '/app',          label: 'Dashboard',          icon: <LayoutDashboard size={16} /> },
  { to: '/app/analysis', label: 'Emergency Analysis',  icon: <Siren size={16} /> },
  { to: '/app/recent',   label: 'Recent Analyses',     icon: <History size={16} /> },
  { to: '/app/profile',  label: 'Dispatch Profile',    icon: <User size={16} /> },
];

// ─────────────────────────────────────────────
// NavItem
// ─────────────────────────────────────────────

const NavItem: React.FC<{
  to: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}> = ({ to, label, icon, onClick }) => (
  <NavLink
    to={to}
    end={to === '/app'}
    onClick={onClick}
    className={({ isActive }) =>
      [
        'group flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 select-none',
        isActive
          ? 'bg-orange-50 text-accent-700 border border-orange-200/80 shadow-xs'
          : 'text-[#4B5563] hover:bg-[#F5F6F8] hover:text-[#111827] border border-transparent',
      ].join(' ')
    }
    aria-label={label}
  >
    {({ isActive }) => (
      <>
        <span
          className={isActive ? 'text-accent-600' : 'text-[#9CA3AF] group-hover:text-[#6B7280]'}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="flex-1">{label}</span>
        {isActive && <ChevronRight size={12} className="text-accent-500" aria-hidden="true" />}
      </>
    )}
  </NavLink>
);

// ─────────────────────────────────────────────
// Sidebar content
// ─────────────────────────────────────────────

const SidebarContent: React.FC<{ onNavClick?: () => void }> = ({ onNavClick }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Brand */}
      <div className="px-4 py-4 border-b border-[#E4E7EB]">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
            <Siren size={16} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#111827] leading-tight tracking-tight">
              Traffic Analytics
            </p>
            <p className="text-2xs text-[#6B7280] font-medium leading-tight mt-0.5">
              Emergency Route Intelligence
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Label */}
      <div className="px-4 pt-4 pb-1">
        <span className="text-2xs font-bold text-[#9CA3AF] uppercase tracking-wider">
          Workspace
        </span>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 px-3 py-1 space-y-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            onClick={onNavClick}
          />
        ))}
      </nav>

      {/* User profile section at bottom */}
      <div className="p-3 border-t border-[#E4E7EB] bg-[#FAFBFD]">
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-[#E4E7EB] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-accent-700 font-bold flex items-center justify-center text-xs flex-shrink-0">
            {user?.name?.charAt(0) || 'D'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#111827] truncate leading-tight">
              {user?.name || 'Dispatcher'}
            </p>
            <p className="text-2xs text-[#6B7280] truncate leading-tight mt-0.5">
              {user?.department || 'Emergency Operations'}
            </p>
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="p-1.5 text-[#9CA3AF] hover:text-[#DC2626] hover:bg-red-50 rounded transition-colors"
            aria-label="Sign out"
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Sidebar container (Desktop + Mobile)
// ─────────────────────────────────────────────

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => (
  <>
    {/* Desktop Sidebar */}
    <aside
      className="hidden lg:flex flex-col w-56 flex-shrink-0 bg-white border-r border-[#E4E7EB] h-screen sticky top-0 z-20"
      aria-label="Application sidebar"
    >
      <SidebarContent />
    </aside>

    {/* Mobile backdrop */}
    {mobileOpen && (
      <div
        className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-xs"
        aria-hidden="true"
        onClick={onMobileClose}
      />
    )}

    {/* Mobile drawer */}
    <aside
      className={[
        'lg:hidden fixed top-0 left-0 z-50 flex flex-col w-64 h-screen bg-white border-r border-[#E4E7EB] shadow-xl transition-transform duration-200',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      aria-label="Mobile navigation"
      aria-hidden={!mobileOpen}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E7EB]">
        <span className="text-xs font-semibold text-[#111827]">Menu</span>
        <button
          onClick={onMobileClose}
          className="p-1.5 rounded text-[#9CA3AF] hover:bg-[#F5F6F8] hover:text-[#111827] transition-colors"
          aria-label="Close navigation"
        >
          <X size={16} />
        </button>
      </div>
      <SidebarContent onNavClick={onMobileClose} />
    </aside>
  </>
);

export const MobileMenuButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="lg:hidden p-2 rounded-md text-[#6B7280] hover:bg-[#F5F6F8] hover:text-[#111827] transition-colors"
    aria-label="Open navigation menu"
  >
    <Menu size={18} />
  </button>
);

export default Sidebar;
