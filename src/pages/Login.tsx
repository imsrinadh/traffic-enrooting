import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Siren, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/app');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Back Link */}
      <div className="max-w-sm mx-auto w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Login Box */}
      <div className="max-w-sm mx-auto w-full">
        <div className="p-8 bg-white border border-[#E5E7EB] rounded-xl shadow-xs text-center">
          {/* Brand Icon */}
          <div className="w-9 h-9 rounded-lg bg-accent-500 flex items-center justify-center mx-auto mb-4 text-white">
            <Siren size={18} />
          </div>

          {/* Heading */}
          <h1 className="text-lg font-bold text-[#111827] tracking-tight">
            Traffic Analytics
          </h1>
          <p className="text-2xs text-[#6B7280] font-medium mt-0.5">
            Emergency Route Intelligence
          </p>
          <p className="text-xs text-[#4B5563] mt-3 mb-6">
            Sign in to continue.
          </p>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-10 flex items-center justify-center gap-2.5 px-4 bg-white hover:bg-[#F9FAFB] active:bg-[#F3F4F6] text-[#374151] border border-[#D1D5DB] hover:border-[#9CA3AF] rounded-lg text-xs font-semibold shadow-2xs transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent-500/20 disabled:opacity-60"
          >
            {loading ? (
              <span className="w-3.5 h-3.5 border-2 border-accent-500 border-t-transparent rounded-full spin" />
            ) : (
              <GoogleIcon className="flex-shrink-0" />
            )}
            <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-2xs text-[#9CA3AF]">
        Traffic Analytics — Emergency Route Intelligence
      </div>
    </div>
  );
};

export default Login;
