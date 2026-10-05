import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { UserProfile, UserRole } from '../types/auth';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  /** Dev-only switch to inspect user vs admin views in Phase 1 without backend */
  setDevRole: (role: UserRole) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_dispatch_01',
  name: 'Emergency Dispatcher',
  email: 'dispatcher@emergency-response.gov',
  role: 'user',
  department: 'Central Emergency Command',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);

  const loginWithGoogle = async () => {
    // In Phase 2: This will initiate real Google OAuth redirect/popup flow.
    // For Phase 1 frontend: simulates successful session establishment.
    setUser(DEFAULT_USER);
  };

  const logout = () => {
    setUser(null);
  };

  const setDevRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    } else {
      setUser({ ...DEFAULT_USER, role });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        loginWithGoogle,
        logout,
        setDevRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
