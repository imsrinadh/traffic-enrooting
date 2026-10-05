import React from 'react';
import { InboxIcon } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center py-14 px-6 text-center',
        className,
      ].join(' ')}
      role="status"
      aria-label={title}
    >
      <div className="w-10 h-10 rounded-lg bg-[#F5F6F8] border border-[#E4E7EB] flex items-center justify-center mb-4 text-[#9CA3AF]">
        {icon ?? <InboxIcon size={18} />}
      </div>
      <p className="text-sm font-semibold text-[#374151] mb-1">{title}</p>
      {description && (
        <p className="text-xs text-[#9CA3AF] max-w-xs leading-relaxed mb-5">
          {description}
        </p>
      )}
      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
