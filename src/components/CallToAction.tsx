import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CallToActionProps {
  onNavigate: (page: string) => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-800/60 via-purple-700/50 to-pink-700/60 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          With HireSafe AI
        </h2>
        <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
          Start protecting your career journey today with our powerful AI-driven platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => onNavigate('signup')}
            className="group bg-white text-purple-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button className="group bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/30 hover:border-white transition-all duration-300">
            See a Demo
          </button>
        </div>
      </div>
    </section>
  );
};