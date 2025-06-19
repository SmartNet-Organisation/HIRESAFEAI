import React, { useState } from 'react';
import { Zap, ArrowRight, ArrowLeft, Shield, Brain, Bell, Users } from 'lucide-react';

interface OnboardingWalkthroughProps {
  onNext: () => void;
  onBack: () => void;
}

export const OnboardingWalkthrough: React.FC<OnboardingWalkthroughProps> = ({ onNext, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Shield,
      title: "AI-Powered Scam Detection",
      description: "Our advanced AI analyzes job postings in real-time, checking for suspicious patterns, fake company information, and common scam indicators.",
      features: [
        "Real-time job posting analysis",
        "Pattern recognition technology",
        "Fake company detection",
        "Suspicious language identification"
      ],
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Brain,
      title: "Smart Email Protection",
      description: "Advanced email security that protects you from phishing attempts and malicious communications from fake recruiters.",
      features: [
        "Email threat detection",
        "Phishing protection",
        "Recruiter verification",
        "Malicious link blocking"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Bell,
      title: "Instant Alert System",
      description: "Get notified immediately when our system detects potential threats, suspicious job postings, or risky recruiter behavior.",
      features: [
        "Real-time notifications",
        "Customizable alert levels",
        "Multi-channel alerts",
        "Threat severity scoring"
      ],
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Users,
      title: "Community Protection",
      description: "Join a community of protected job seekers. Your reports help strengthen our AI and protect others from similar threats.",
      features: [
        "Community-driven intelligence",
        "Blockchain-verified reports",
        "Shared threat database",
        "Collective protection network"
      ],
      color: "from-green-500 to-emerald-500"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onNext();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HIRESAFE AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400">Learn about your powerful protection features</p>
        </div>

        {/* Main Content */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800 max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Icon and Visual */}
            <div className="flex-shrink-0">
              <div className={`bg-gradient-to-r ${currentSlideData.color} p-8 rounded-3xl mb-6`}>
                <currentSlideData.icon className="h-16 w-16 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-white mb-6">{currentSlideData.title}</h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {currentSlideData.description}
              </p>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {currentSlideData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={currentSlide === 0 ? onBack : prevSlide}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{currentSlide === 0 ? 'Back' : 'Previous'}</span>
            </button>

            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <span>{currentSlide === slides.length - 1 ? 'Continue' : 'Next'}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        </div>
        <p className="text-gray-500 text-sm mt-2 text-center">Step 2 of 4</p>
      </div>
    </div>
  );
};