import React, { useState } from 'react';
import { Route } from 'lucide-react';
import RouteCard from './RouteCard';
import EmptyState from '../common/EmptyState';
import type { RouteResult } from '../../types/api';

interface RouteComparisonProps {
  /** Routes provided by the backend — empty until analysis completes */
  routes?: RouteResult[];
  className?: string;
}

const RouteComparison: React.FC<RouteComparisonProps> = ({
  routes,
  className = '',
}) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    routes?.find((r) => r.status === 'recommended')?.id
  );

  const hasRoutes = routes && routes.length > 0;

  return (
    <section
      aria-labelledby="route-comparison-heading"
      className={className}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 id="route-comparison-heading" className="section-title">
          Route Comparison
        </h3>
        {hasRoutes && (
          <span className="text-2xs text-[#9CA3AF]">
            {routes!.length} route{routes!.length !== 1 ? 's' : ''} analyzed
          </span>
        )}
      </div>

      {hasRoutes ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {routes!.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              isSelected={selectedId === route.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      ) : (
        <div className="card">
          <EmptyState
            icon={<Route size={18} />}
            title="No route analysis available"
            description="Submit the form above to analyze emergency routes."
          />
        </div>
      )}
    </section>
  );
};

export default RouteComparison;
