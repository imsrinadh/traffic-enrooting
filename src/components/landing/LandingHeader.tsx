import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Siren, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const LandingHeader: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E4E7EB] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
            <Siren size={16} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <span className="text-sm font-bold text-[#111827] tracking-tight block leading-tight">
              Traffic Analytics
            </span>
            <span className="text-2xs text-[#6B7280] font-medium block leading-tight">
              Emergency Route Intelligence
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#4B5563]" aria-label="Landing navigation">
          <button
            onClick={() => scrollToSection('product-preview')}
            className="hover:text-[#111827] transition-colors"
          >
            Product
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-[#111827] transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('capabilities')}
            className="hover:text-[#111827] transition-colors"
          >
            Capabilities
          </button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-xs font-medium text-[#4B5563] hover:text-[#111827] px-3 py-1.5 rounded transition-colors"
          >
            Sign In
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/analysis')}
            icon={<ArrowRight size={13} />}
            iconPosition="right"
          >
            Start Emergency Analysis
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
