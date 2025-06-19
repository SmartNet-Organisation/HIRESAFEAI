import React, { useState } from 'react';
import { Zap, ArrowRight, Users, Building, GraduationCap, Briefcase } from 'lucide-react';

interface OnboardingUserTypeProps {
  onNext: (userType: string) => void;
  userName: string;
}

export const OnboardingUserType: React.FC<OnboardingUserTypeProps> = ({ onNext, userName }) => {
  const [selectedUserType, setSelectedUserType] = useState('');

  const userTypes = [
    {
      id: 'job-seeker',
      name: 'Job Seeker',
      description: 'Individual looking for career opportunities',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      features: ['Personal job scam protection', 'Real-time threat alerts', 'Company verification']
    },
    {
      id: 'career-center',
      name: 'Career Center',
      description: 'University or institutional career services',
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-500',
      features: ['Student safety monitoring', 'Bulk threat detection', 'Analytics dashboard']
    },
    {
      id: 'recruiter',
      name: 'Recruiter',
      description: 'Professional talent acquisition specialist',
      icon: Briefcase,
      color: 'from-purple-500 to-indigo-500',
      features: ['Verified recruiter status', 'Job posting verification', 'Trust score building']
    },
    {
      id: 'institution',
      name: 'Institution',
      description: 'Educational institution or organization',
      icon: Building,
      color: 'from-yellow-500 to-orange-500',
      features: ['Campus-wide protection', 'Multi-center management', 'API integrations']
    }
  ];

  const handleContinue = () => {
    if (selectedUserType) {
      onNext(selectedUserType);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
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
          Let's customize your protection experience. Choose your role to get started with features tailored for you.
        </p>

        {/* User Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {userTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedUserType(type.id)}
              className={`p-8 rounded-3xl border transition-all duration-300 text-left transform hover:scale-105 ${
                selectedUserType === type.id
                  ? 'border-purple-500 bg-purple-500/20 shadow-2xl shadow-purple-500/25'
                  : 'border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 hover:border-purple-500/50'
              }`}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${type.color} mb-6`}>
                <type.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{type.name}</h3>
              <p className="text-gray-400 mb-6">{type.description}</p>
              
              <div className="space-y-2">
                {type.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedUserType}
          className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 disabled:transform-none"
        >
          <div className="flex items-center space-x-3">
            <span>Continue Setup</span>
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