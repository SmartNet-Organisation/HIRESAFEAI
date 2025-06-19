import React from 'react';
import { Zap, ArrowRight, Shield, Brain, Bell } from 'lucide-react';

interface OnboardingWelcomeProps {
  onNext: () => void;
  userName: string;
}

export const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({ onNext, userName }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-2xl animate-bounce">
            <Zap className="h-12 w-12 text-white" />
          </div>
          <span className="text-3xl font-bold text-white">HIRESAFE AI</span>
        </div>

        {/* Welcome Message */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Welcome, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{userName}!</span>
        </h1>

        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          You're now protected by the world's most advanced AI-powered job scam detection system. 
          Let's get you set up in just a few quick steps.
        </p>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Real-Time Protection</h3>
            <p className="text-gray-400 text-sm">AI scans every job posting instantly</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart Analysis</h3>
            <p className="text-gray-400 text-sm">Advanced ML detects hidden patterns</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Bell className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Instant Alerts</h3>
            <p className="text-gray-400 text-sm">Get notified of threats immediately</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNext}
          className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
        >
          <div className="flex items-center space-x-3">
            <span>Let's Get Started</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Progress Indicator */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        </div>
        <p className="text-gray-500 text-sm mt-2">Step 1 of 4</p>
      </div>
    </div>
  );
};