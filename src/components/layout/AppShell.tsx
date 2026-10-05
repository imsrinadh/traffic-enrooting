import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F6F8]">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuOpen={() => setMobileOpen(true)} />

        <main
          className="flex-1 overflow-y-auto animate-fade-in"
          id="main-content"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
