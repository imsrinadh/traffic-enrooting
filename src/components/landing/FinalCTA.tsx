import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAFBFD] border-t border-[#E5E7EB] pt-14 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mb-3">
          Plan the route before traffic becomes the problem.
        </h2>

        <p className="text-xs sm:text-sm text-[#4B5563] max-w-lg mx-auto mb-6 leading-relaxed">
          Use predictive traffic intelligence to support faster emergency route decisions.
        </p>

        <div className="flex items-center justify-center gap-3 mb-12">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/app/analysis')}
            icon={<ArrowRight size={14} />}
            iconPosition="right"
          >
            Start Emergency Analysis
          </Button>
        </div>

        {/* Minimal Footer */}
        <div className="border-t border-[#E5E7EB] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-2xs text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#4B5563]">Traffic Analytics</span>
            <span>—</span>
            <span>Emergency Route Intelligence</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/login" className="hover:text-[#4B5563] transition-colors">
              Sign In
            </Link>
            <Link to="/app" className="hover:text-[#4B5563] transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
