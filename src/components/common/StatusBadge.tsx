import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import type { ServiceStatus } from '../../types/api';

interface StatusBadgeProps {
  status: ServiceStatus;
  label?: string;
  showIcon?: boolean;
  className?: string;
}

const statusConfig: Record<
  ServiceStatus,
  { label: string; iconColor: string; dotColor: string; bg: string; border: string; text: string; icon: React.ReactNode }
> = {
  connected: {
    label:     'Connected',
    iconColor: 'text-green-600',
    dotColor:  'bg-green-500',
    bg:        'bg-green-50',
    border:    'border-green-200',
    text:      'text-green-700',
    icon:      <CheckCircle2 size={11} />,
  },
  unavailable: {
    label:     'Unavailable',
    iconColor: 'text-[#9CA3AF]',
    dotColor:  'bg-[#9CA3AF]',
    bg:        'bg-[#F5F6F8]',
    border:    'border-[#E4E7EB]',
    text:      'text-[#6B7280]',
    icon:      <XCircle size={11} />,
  },
  waiting: {
    label:     'Awaiting backend',
    iconColor: 'text-amber-600',
    dotColor:  'bg-amber-400',
    bg:        'bg-amber-50',
    border:    'border-amber-200',
    text:      'text-amber-700',
    icon:      <Clock size={11} />,
  },
  error: {
    label:     'Error',
    iconColor: 'text-red-600',
    dotColor:  'bg-red-500',
    bg:        'bg-red-50',
    border:    'border-red-200',
    text:      'text-red-700',
    icon:      <AlertCircle size={11} />,
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  showIcon = true,
  className = '',
}) => {
  const config = statusConfig[status];
  const displayLabel = label ?? config.label;

  return (
    <span
      className={[
        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-2xs font-medium border',
        config.bg,
        config.border,
        config.text,
        className,
      ].join(' ')}
      aria-label={`Status: ${displayLabel}`}
    >
      {showIcon && (
        <span className={config.iconColor} aria-hidden="true">
          {config.icon}
        </span>
      )}
      {displayLabel}
    </span>
  );
};

export default StatusBadge;
