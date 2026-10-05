import React from 'react';

type LoadingVariant = 'spinner' | 'skeleton' | 'progress';

interface LoadingStateProps {
  variant?: LoadingVariant;
  message?: string;
  /** For skeleton variant: number of rows to render */
  rows?: number;
  /** For progress variant: 0–100 */
  progress?: number;
  className?: string;
}

// ─────────────────────────────────────────────
// Spinner
// ─────────────────────────────────────────────

const Spinner: React.FC<{ message?: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-12" role="status">
    <div className="w-7 h-7 border-2 border-[#E4E7EB] border-t-accent-500 rounded-full spin" />
    {message && (
      <p className="text-xs text-[#9CA3AF] font-medium">{message}</p>
    )}
  </div>
);

// ─────────────────────────────────────────────
// Skeleton rows
// ─────────────────────────────────────────────

const SkeletonRow: React.FC<{ widths: string[] }> = ({ widths }) => (
  <div className="flex gap-3">
    {widths.map((w, i) => (
      <div key={i} className={`h-3.5 rounded skeleton ${w}`} />
    ))}
  </div>
);

const SkeletonLoader: React.FC<{ rows: number; message?: string }> = ({
  rows,
  message,
}) => {
  const rowConfigs = [
    ['w-1/4', 'w-1/3', 'w-1/5'],
    ['w-1/3', 'w-1/4', 'w-1/4'],
    ['w-1/5', 'w-2/5', 'w-1/6'],
    ['w-1/3', 'w-1/5', 'w-1/4'],
    ['w-1/4', 'w-1/3', 'w-1/5'],
  ];

  return (
    <div role="status" aria-label={message ?? 'Loading...'} className="space-y-3 py-4">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} widths={rowConfigs[i % rowConfigs.length]} />
      ))}
      {message && (
        <p className="text-xs text-[#9CA3AF] font-medium pt-2">{message}</p>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Progress bar
// ─────────────────────────────────────────────

const ProgressLoader: React.FC<{ progress?: number; message?: string }> = ({
  progress = 0,
  message,
}) => (
  <div className="flex flex-col gap-3 py-8" role="status">
    <div className="flex items-center justify-between mb-1">
      {message && <p className="text-xs text-[#4B5563] font-medium">{message}</p>}
      <span className="text-xs text-[#9CA3AF] ml-auto">{Math.round(progress)}%</span>
    </div>
    <div className="w-full h-1.5 bg-[#F0F2F5] rounded-full overflow-hidden">
      <div
        className="h-full bg-accent-500 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  </div>
);

// ─────────────────────────────────────────────
// LoadingState
// ─────────────────────────────────────────────

const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'spinner',
  message,
  rows = 4,
  progress,
  className = '',
}) => {
  return (
    <div className={className}>
      {variant === 'spinner' && <Spinner message={message} />}
      {variant === 'skeleton' && <SkeletonLoader rows={rows} message={message} />}
      {variant === 'progress' && <ProgressLoader progress={progress} message={message} />}
    </div>
  );
};

export default LoadingState;
