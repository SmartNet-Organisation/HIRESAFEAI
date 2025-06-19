import React from 'react';
import { Zap, ArrowRight, Shield, Brain, Bell, Users, Building, GraduationCap, Briefcase } from 'lucide-react';

interface OnboardingWelcomeProps {
  onNext: () => void;
  userName: string;
  userType?: string;
}

export const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({ onNext, userName, userType }) => {
  const getUserTypeInfo = () => {
    switch (userType) {
      case 'career-center':
        return {
          icon: GraduationCap,
          title: 'Career Center Portal',
          description: 'Protect your students with comprehensive job scam detection and safety monitoring.',
          features: [
            { icon: Shield, title: 'Student Protection', description: 'Monitor student job search safety' },
            { icon: Brain, title: 'Bulk Analysis', description: 'Analyze multiple job postings at once' },
            { icon: Bell, title: 'Safety Alerts', description: 'Real-time alerts for student threats' }
          ]
        };
      case 'recruiter':
        return {
          icon: Briefcase,
          title: 'Recruiter Portal',
          description: 'Build trust with verified status and create safe job postings for candidates.',
          features: [
            { icon: Shield, title: 'Verified Status', description: 'Get verified recruiter badge' },
            { icon: Brain, title: 'Job Verification', description: 'Ensure your postings are trusted' },
            { icon: Bell, title: 'Trust Building', description: 'Build credibility with candidates' }
          ]
        };
      case 'institution':
        return {
          icon: Building,
          title: 'Institution Portal',
          description: 'Manage campus-wide career safety across multiple departments and centers.',
          features: [
            { icon: Shield, title: 'Campus Protection', description: 'Institution-wide safety monitoring' },
            { icon: Brain, title: 'Multi-Center Management', description: 'Oversee multiple career centers' },
            { icon: Bell, title: 'Analytics Dashboard', description: 'Comprehensive safety analytics' }
          ]
        };
      default:
        return {
          icon: Users,
          title: 'Personal Protection',
          description: 'Your personal AI-powered shield against job scams and fraudulent opportunities.',
          features: [
            { icon: Shield, title: 'Real-Time Protection', description: 'AI scans every job posting instantly' },
            { icon: Brain, title: 'Smart Analysis', description: 'Advanced ML detects hidden patterns' },
            { icon: Bell, title: 'Instant Alerts', description: 'Get notified of threats immediately' }
          ]
        };
    }
  };

  const typeInfo = getUserTypeInfo();

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
          {typeInfo.description}
        </p>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {typeInfo.features.map((feature, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl w-fit mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
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
        <p className="text-gray-500 text-sm mt-2">Step 2 of 4</p>
      </div>
    </div>
  );
};