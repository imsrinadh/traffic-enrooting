import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Siren, History, LayoutDashboard, User } from 'lucide-react';
import { MobileMenuButton } from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const routeMeta: Record<string, { title: string; subtitle: string; icon: React.ReactNode }> = {
  '/app': {
    title:    'Traffic Intelligence',
    subtitle: 'Predictive insights for emergency route planning.',
    icon:     <LayoutDashboard size={15} />,
  },
  '/app/analysis': {
    title:    'Plan an Emergency Route',
    subtitle: 'Enter the trip details and compare possible routes using future traffic conditions.',
    icon:     <Siren size={15} />,
  },
  '/app/recent': {
    title:    'Recent Analyses',
    subtitle: 'Review previous emergency route predictions and recommendations.',
    icon:     <History size={15} />,
  },
  '/app/profile': {
    title:    'Dispatch Profile',
    subtitle: 'Active session credentials and authorization level.',
    icon:     <User size={15} />,
  },
};

interface HeaderProps {
  onMenuOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const meta = routeMeta[pathname] ?? routeMeta['/app'];

  return (
    <header className="h-14 flex-shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
      <div className="flex items-center gap-3 min-w-0">
        <MobileMenuButton onClick={onMenuOpen} />

        {/* Icon & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-md bg-[#F5F6F8] text-[#374151] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0 hidden sm:flex">
            {meta.icon}
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-[#111827] leading-tight truncate">
              {meta.title}
            </h1>
            <p className="text-2xs text-[#6B7280] leading-tight hidden md:block truncate mt-0.5">
              {meta.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Subtle non-technical Dispatch Mode Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F9FAFB] border border-[#E5E7EB] text-2xs text-[#4B5563]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
          <span className="font-semibold">Dispatch Mode</span>
        </div>

        {/* User profile avatar link */}
        <Link
          to="/app/profile"
          className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F5F6F8] transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-orange-100 text-accent-700 text-2xs font-bold flex items-center justify-center">
            {user?.name?.charAt(0) || 'D'}
          </div>
          <span className="text-xs font-medium text-[#374151] hidden sm:inline">
            {user?.name || 'Dispatcher'}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
