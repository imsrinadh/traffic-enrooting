import React from 'react';

// ─────────────────────────────────────────────
// Button variants
// ─────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-500 text-white border border-accent-500 hover:bg-accent-600 hover:border-accent-600 active:bg-accent-700 disabled:bg-accent-300 disabled:border-accent-300 disabled:cursor-not-allowed',
  secondary:
    'bg-white text-[#374151] border border-[#E4E7EB] hover:bg-[#F5F6F8] hover:border-[#D1D5DB] active:bg-[#EEF0F3] disabled:text-[#9CA3AF] disabled:cursor-not-allowed',
  ghost:
    'bg-transparent text-[#4B5563] border border-transparent hover:bg-[#F5F6F8] hover:text-[#111827] active:bg-[#EEF0F3] disabled:text-[#9CA3AF] disabled:cursor-not-allowed',
  danger:
    'bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 active:bg-red-100 disabled:text-[#9CA3AF] disabled:cursor-not-allowed',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-10 px-5 text-sm gap-2',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium rounded transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-500/30',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full spin" />
      ) : (
        icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default Button;
