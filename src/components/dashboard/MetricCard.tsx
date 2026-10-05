import React from 'react';

interface MetricCardProps {
  label: string;
  value?: string | number;
  unit?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  description,
  icon,
  className = '',
}) => {
  const isEmpty = value === undefined || value === null || value === '';

  return (
    <div
      className={[
        'card p-4 flex flex-col gap-2',
        className,
      ].join(' ')}
      aria-label={`${label}: ${isEmpty ? 'No data' : value}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xs font-semibold text-[#9CA3AF] uppercase tracking-wider leading-none">
          {label}
        </span>
        {icon && (
          <span className="text-[#D1D5DB] flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1">
        {isEmpty ? (
          <span className="text-xl font-semibold text-[#D1D5DB]" aria-label="No data">
            --
          </span>
        ) : (
          <>
            <span className="text-xl font-semibold text-[#111827]">{value}</span>
            {unit && (
              <span className="text-xs text-[#9CA3AF] font-medium">{unit}</span>
            )}
          </>
        )}
      </div>

      {description && (
        <p className="text-2xs text-[#9CA3AF] leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default MetricCard;
