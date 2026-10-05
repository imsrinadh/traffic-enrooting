// ============================================================
// PHASE 1 — API SERVICE LAYER
//
// This file defines the frontend API client.
// All methods are typed and ready to be wired to the backend.
//
// PHASE 2 will replace the stub implementations with real
// fetch() calls to the backend endpoints.
// ============================================================

import type {
  EmergencyAnalysisRequest,
  EmergencyAnalysisResponse,
  WhatIfRequest,
  WhatIfResponse,
  AnalysisSummary,
  SystemStatus,
  ApiError,
} from '../types/api';

// ─────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

// ─────────────────────────────────────────────
// Custom error class
// ─────────────────────────────────────────────

export class ApiServiceError extends Error {
  public readonly code: string;
  public readonly details?: string;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ApiServiceError';
    this.code = error.code;
    this.details = error.details;
  }
}

// ─────────────────────────────────────────────
// Base fetch helper
// ─────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let errorBody: ApiError;
    try {
      errorBody = (await response.json()) as ApiError;
    } catch {
      errorBody = {
        code: `HTTP_${response.status}`,
        message: `Request failed with status ${response.status}`,
      };
    }
    throw new ApiServiceError(errorBody);
  }

  return response.json() as Promise<T>;
}

// ─────────────────────────────────────────────
// API Methods
// ─────────────────────────────────────────────

/**
 * POST /api/emergency/analyze
 *
 * Submit a new emergency route analysis request.
 * The backend will run traffic prediction, congestion risk scoring,
 * and route optimization — returning the complete result.
 */
export async function analyzeEmergencyRoute(
  request: EmergencyAnalysisRequest
): Promise<EmergencyAnalysisResponse> {
  return apiFetch<EmergencyAnalysisResponse>('/api/emergency/analyze', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

/**
 * POST /api/emergency/what-if
 *
 * Run a What-If scenario for an existing analysis with a different
 * departure time. Returns predicted outcome differences.
 */
export async function runWhatIfScenario(
  request: WhatIfRequest
): Promise<WhatIfResponse> {
  return apiFetch<WhatIfResponse>('/api/emergency/what-if', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

/**
 * GET /api/analysis/recent
 *
 * Retrieve a list of recent emergency route analyses.
 */
export async function getRecentAnalyses(): Promise<AnalysisSummary[]> {
  return apiFetch<AnalysisSummary[]>('/api/analysis/recent');
}

/**
 * GET /api/analysis/{id}
 *
 * Retrieve the full details of a single emergency route analysis.
 */
export async function getAnalysisById(
  id: string
): Promise<EmergencyAnalysisResponse> {
  return apiFetch<EmergencyAnalysisResponse>(`/api/analysis/${id}`);
}

/**
 * GET /api/system/status
 *
 * Retrieve the current status of all backend services.
 */
export async function getSystemStatus(): Promise<SystemStatus> {
  return apiFetch<SystemStatus>('/api/system/status');
}
