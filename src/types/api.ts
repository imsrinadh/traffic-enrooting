// ============================================================
// PHASE 1 — FRONTEND API TYPES
// These interfaces define the contract between the frontend
// and the future backend. No implementation exists yet.
// ============================================================

// ─────────────────────────────────────────────
// Enumerations
// ─────────────────────────────────────────────

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'SEVERE';

export type VehicleType = 'Ambulance' | 'FireEngine' | 'RescueVehicle' | 'Other';

export type ServiceStatus = 'connected' | 'unavailable' | 'waiting' | 'error';

export type RouteStatus = 'recommended' | 'alternative' | 'higher-risk';

export type AnalysisStatus = 'completed' | 'failed' | 'processing';

// ─────────────────────────────────────────────
// System
// ─────────────────────────────────────────────

export interface ServiceStatusItem {
  name: string;
  status: ServiceStatus;
  message?: string;
  lastChecked?: string; // ISO timestamp
}

export interface SystemStatus {
  predictionEngine: ServiceStatusItem;
  trafficData: ServiceStatusItem;
  routingEngine: ServiceStatusItem;
  api: ServiceStatusItem;
}

// ─────────────────────────────────────────────
// Risk
// ─────────────────────────────────────────────

export interface CongestionRisk {
  level: RiskLevel;
  score: number; // 0–100
  probability: number; // 0.0–1.0
  description?: string;
}

// ─────────────────────────────────────────────
// Prediction
// ─────────────────────────────────────────────

export interface TrafficDataPoint {
  timestamp: string; // ISO timestamp
  value: number;
  isPredicted: boolean;
}

export interface PredictionResult {
  predictionHorizon: string; // e.g., "2 hours"
  confidence: number; // 0.0–1.0
  trafficForecast: TrafficDataPoint[];
  congestionProbability: TrafficDataPoint[];
  riskOverTime: TrafficDataPoint[];
  predictedTravelTime: TrafficDataPoint[];
  generatedAt: string; // ISO timestamp
}

// ─────────────────────────────────────────────
// Route
// ─────────────────────────────────────────────

export interface RouteResult {
  id: string;
  name: string; // e.g., "Route A", "Route B"
  status: RouteStatus;
  predictedETA: string; // e.g., "18 min"
  distanceKm: number;
  congestionRisk: CongestionRisk;
  waypoints?: string[];
  recommendationReason?: string; // Only on recommended route
}

// ─────────────────────────────────────────────
// Emergency Analysis
// ─────────────────────────────────────────────

export interface EmergencyAnalysisRequest {
  origin: string;
  destination: string;
  departureDate: string; // ISO date string "YYYY-MM-DD"
  departureTime: string; // "HH:MM"
  vehicleType: VehicleType;
}

export interface EmergencyAnalysisResponse {
  analysisId: string;
  request: EmergencyAnalysisRequest;
  recommendedRoute: RouteResult | null;
  alternativeRoutes: RouteResult[];
  prediction: PredictionResult | null;
  status: AnalysisStatus;
  completedAt: string; // ISO timestamp
}

// ─────────────────────────────────────────────
// What-If Analysis
// ─────────────────────────────────────────────

export interface WhatIfRequest {
  baseAnalysisId: string;
  alternativeDepartureTime: string; // "HH:MM"
}

export interface WhatIfResult {
  departureTime: string; // "HH:MM"
  predictedETA: string;
  congestionRisk: CongestionRisk;
  recommendedRoute: string; // Route name
}

export interface WhatIfResponse {
  scenarioId: string;
  results: WhatIfResult[];
  comparedAt: string; // ISO timestamp
}

// ─────────────────────────────────────────────
// Analysis Summary (for Recent Analyses list)
// ─────────────────────────────────────────────

export interface AnalysisSummary {
  analysisId: string;
  date: string; // ISO timestamp
  origin: string;
  destination: string;
  departureDateTime: string; // ISO timestamp
  vehicleType: VehicleType;
  recommendedRoute: string | null; // Route name
  predictedETA: string | null;
  riskLevel: RiskLevel | null;
  status: AnalysisStatus;
}

// ─────────────────────────────────────────────
// API Error
// ─────────────────────────────────────────────

export interface ApiError {
  code: string;
  message: string;
  details?: string;
}
