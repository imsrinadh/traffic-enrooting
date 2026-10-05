import React from 'react';
import { X, MapPin, Flag, Clock, Truck, Calendar } from 'lucide-react';
import RiskIndicator from '../emergency/RiskIndicator';
import RouteCard from '../emergency/RouteCard';
import RecommendationPanel from '../emergency/RecommendationPanel';
import PredictionChart from '../emergency/PredictionChart';
import MapView from '../emergency/MapView';
import type { EmergencyAnalysisResponse } from '../../types/api';

interface AnalysisDetailsProps {
  analysis: EmergencyAnalysisResponse;
  onClose: () => void;
}

const DetailRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <span className="text-[#9CA3AF] mt-0.5 flex-shrink-0" aria-hidden="true">
      {icon}
    </span>
    <div>
      <span className="text-2xs text-[#9CA3AF] block">{label}</span>
      <span className="text-sm font-medium text-[#374151]">{value}</span>
    </div>
  </div>
);

const AnalysisDetails: React.FC<AnalysisDetailsProps> = ({ analysis, onClose }) => {
  const { request, recommendedRoute, alternativeRoutes, prediction } = analysis;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
      role="dialog"
      aria-modal="true"
      aria-labelledby="analysis-details-title"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E7EB] flex-shrink-0">
          <h2 id="analysis-details-title" className="text-sm font-semibold text-[#111827]">
            Analysis Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#9CA3AF] hover:bg-[#F5F6F8] hover:text-[#111827] transition-colors"
            aria-label="Close details"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Emergency Details */}
          <section aria-labelledby="detail-emergency-heading">
            <h3 id="detail-emergency-heading" className="section-title mb-3">
              Emergency Details
            </h3>
            <div className="card p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <DetailRow icon={<MapPin size={13} />}  label="Origin"         value={request.origin} />
              <DetailRow icon={<Flag size={13} />}    label="Destination"    value={request.destination} />
              <DetailRow icon={<Calendar size={13} />} label="Date"          value={request.departureDate} />
              <DetailRow icon={<Clock size={13} />}   label="Departure Time" value={request.departureTime} />
              <DetailRow icon={<Truck size={13} />}   label="Vehicle"        value={request.vehicleType} />
            </div>
          </section>

          {/* Map */}
          <MapView origin={request.origin} destination={request.destination} />

          {/* Route Recommendation */}
          {recommendedRoute && (
            <section aria-labelledby="detail-recommendation-heading">
              <h3 id="detail-recommendation-heading" className="section-title mb-3">
                Route Recommendation
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RouteCard route={recommendedRoute} isSelected />
                <div className="space-y-4">
                  <RiskIndicator
                    level={recommendedRoute.congestionRisk.level}
                    score={recommendedRoute.congestionRisk.score}
                    probability={recommendedRoute.congestionRisk.probability}
                  />
                  <RecommendationPanel
                    routeName={recommendedRoute.name}
                    reason={recommendedRoute.recommendationReason}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Alternative Routes */}
          {alternativeRoutes.length > 0 && (
            <section aria-labelledby="detail-alternatives-heading">
              <h3 id="detail-alternatives-heading" className="section-title mb-3">
                Alternative Routes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {alternativeRoutes.map((route) => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </div>
            </section>
          )}

          {/* Analytics */}
          <section aria-labelledby="detail-analytics-heading">
            <h3 id="detail-analytics-heading" className="section-title mb-3">
              Prediction Analytics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <PredictionChart type="trafficForecast" data={prediction?.trafficForecast} />
              <PredictionChart type="congestionProbability" data={prediction?.congestionProbability} />
              <PredictionChart type="riskOverTime" data={prediction?.riskOverTime} />
              <PredictionChart type="predictedTravelTime" data={prediction?.predictedTravelTime} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetails;
