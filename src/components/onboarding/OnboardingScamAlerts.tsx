import React, { useState } from 'react';
import { Zap, ArrowRight, ArrowLeft, Shield, AlertTriangle, Eye, Clock } from 'lucide-react';

interface OnboardingScamAlertsProps {
  onNext: () => void;
  onBack: () => void;
}

export const OnboardingScamAlerts: React.FC<OnboardingScamAlertsProps> = ({ onNext, onBack }) => {
  const [alertLevel, setAlertLevel] = useState('medium');
  const [alertTypes, setAlertTypes] = useState({
    jobPostings: true,
    emails: true,
    recruiters: true,
    companies: false
  });
  const [autoBlock, setAutoBlock] = useState(false);

  const alertLevels = [
    {
      id: 'low',
      name: 'Low Sensitivity',
      description: 'Only alert for high-confidence scams',
      icon: Eye,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'medium',
      name: 'Medium Sensitivity',
      description: 'Balanced protection with moderate alerts',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'high',
      name: 'High Sensitivity',
      description: 'Maximum protection with frequent alerts',
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-500'
    }
  ];

  const handleAlertTypeChange = (type: string) => {
    setAlertTypes(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const handleContinue = () => {
    // Save preferences here
    onNext();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HIRESAFE AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Set Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Alert Preferences</span>
          </h2>
          <p className="text-xl text-gray-400">Customize how you want to be protected</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800">
          {/* Alert Sensitivity Level */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Alert Sensitivity Level</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alertLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setAlertLevel(level.id)}
                  className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                    alertLevel === level.id
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                  }`}
                >
                  <div className={`bg-gradient-to-r ${level.color} p-3 rounded-xl w-fit mb-4`}>
                    <level.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{level.name}</h4>
                  <p className="text-gray-400 text-sm">{level.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Alert Types */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">What to Monitor</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <div>
                  <h4 className="text-lg font-semibold text-white">Suspicious Job Postings</h4>
                  <p className="text-gray-400 text-sm">Alert when AI detects potential scam job listings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alertTypes.jobPostings}
                    onChange={() => handleAlertTypeChange('jobPostings')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <div>
                  <h4 className="text-lg font-semibold text-white">Phishing Emails</h4>
                  <p className="text-gray-400 text-sm">Protect against malicious recruiter communications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alertTypes.emails}
                    onChange={() => handleAlertTypeChange('emails')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <div>
                  <h4 className="text-lg font-semibold text-white">Unverified Recruiters</h4>
                  <p className="text-gray-400 text-sm">Get notified about recruiters without KYC verification</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alertTypes.recruiters}
                    onChange={() => handleAlertTypeChange('recruiters')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <div>
                  <h4 className="text-lg font-semibold text-white">Suspicious Companies</h4>
                  <p className="text-gray-400 text-sm">Monitor for fake or fraudulent company profiles</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alertTypes.companies}
                    onChange={() => handleAlertTypeChange('companies')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Auto-Block Option */}
          <div className="mb-12">
            <div className="p-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Auto-Block High-Risk Content</h4>
                  <p className="text-gray-400">Automatically hide confirmed scam postings and emails</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoBlock}
                    onChange={() => setAutoBlock(!autoBlock)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleContinue}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <span>Continue</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        </div>
        <p className="text-gray-500 text-sm mt-2 text-center">Step 3 of 4</p>
      </div>
    </div>
  );
};