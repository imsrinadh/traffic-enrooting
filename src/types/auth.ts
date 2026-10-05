// ============================================================
// PHASE 1 — FRONTEND AUTH & ROLE TYPES
// These types prepare the frontend for Google OAuth and role-based
// resolution in Phase 2 without implementing backend auth yet.
// ============================================================

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  department?: string;
  lastLoginAt?: string;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
}
