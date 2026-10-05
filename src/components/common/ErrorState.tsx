import React from 'react';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
import Button from './Button';

type ErrorType = 'connection' | 'service' | 'generic';

interface ErrorStateProps {
  type?: ErrorType;
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

const errorIcons: Record<ErrorType, React.ReactNode> = {
  connection: <WifiOff size={18} />,
  service:    <AlertCircle size={18} />,
  generic:    <AlertCircle size={18} />,
};

const ErrorState: React.FC<ErrorStateProps> = ({
  type = 'generic',
  title,
  message,
  onRetry,
  retryLabel = 'Retry',
  className = '',
}) => {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center py-14 px-6 text-center',
        className,
      ].join(' ')}
      role="alert"
    >
      <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center mb-4 text-red-400">
        {errorIcons[type]}
      </div>
      {title && (
        <p className="text-sm font-semibold text-[#374151] mb-1">{title}</p>
      )}
      <p className="text-xs text-[#9CA3AF] max-w-xs leading-relaxed mb-5">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw size={12} />}
          iconPosition="left"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
