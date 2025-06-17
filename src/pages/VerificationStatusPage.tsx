import React from 'react';
import { Zap, CheckCircle, XCircle } from 'lucide-react';

interface VerificationStatusPageProps {
  onNavigate: (page: string) => void;
  success?: boolean;
  message?: string;
}

export const VerificationStatusPage: React.FC<VerificationStatusPageProps> = ({
  onNavigate,
  success = true,
  message = 'Operation completed successfully!'
}) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HIRESAFE</span>
          </div>

          {/* Status Icon */}
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
            success 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-red-500 to-rose-500'
          }`}>
            {success ? (
              <CheckCircle className="h-10 w-10 text-white" />
            ) : (
              <XCircle className="h-10 w-10 text-white" />
            )}
          </div>

          {/* Status Message */}
          <h2 className="text-2xl font-bold text-white mb-4">
            {success ? 'Success!' : 'Oops!'}
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            {success ? (
              <>
                <button
                  onClick={() => onNavigate('landing')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Continue to Dashboard
                </button>
                <button
                  onClick={() => onNavigate('landing')}
                  className="w-full bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold border border-gray-600 hover:bg-gray-600 transition-all duration-300"
                >
                  Back to Home
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('signup')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Try Again
                </button>
                <button
                  onClick={() => onNavigate('landing')}
                  className="w-full bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold border border-gray-600 hover:bg-gray-600 transition-all duration-300"
                >
                  Back to Home
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};