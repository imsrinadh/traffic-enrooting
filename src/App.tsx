import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import AppShell from './components/layout/AppShell';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';

// User Application Pages
import Dashboard from './pages/Dashboard';
import EmergencyAnalysis from './pages/EmergencyAnalysis';
import RecentAnalyses from './pages/RecentAnalyses';
import Profile from './pages/Profile';

// Admin Console Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAnalyses from './pages/admin/AdminAnalyses';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSystemHealth from './pages/admin/AdminSystemHealth';
import AdminSettings from './pages/admin/AdminSettings';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Product Pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* User Application Routes */}
          <Route
            path="/app"
            element={
              <AppShell>
                <Dashboard />
              </AppShell>
            }
          />
          <Route
            path="/app/analysis"
            element={
              <AppShell>
                <EmergencyAnalysis />
              </AppShell>
            }
          />
          <Route
            path="/app/recent"
            element={
              <AppShell>
                <RecentAnalyses />
              </AppShell>
            }
          />
          <Route
            path="/app/profile"
            element={
              <AppShell>
                <Profile />
              </AppShell>
            }
          />

          {/* Legacy / Direct Route Compatibility */}
          <Route path="/analysis" element={<Navigate to="/app/analysis" replace />} />
          <Route path="/recent" element={<Navigate to="/app/recent" replace />} />

          {/* Admin Operations Console Routes */}
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/analyses"
            element={
              <AdminLayout>
                <AdminAnalyses />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminLayout>
                <AdminAnalytics />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/system-health"
            element={
              <AdminLayout>
                <AdminSystemHealth />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            }
          />

          {/* Fallback to Landing Page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
