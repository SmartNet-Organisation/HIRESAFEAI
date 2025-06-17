import React from 'react';
import { Shield, Brain, Bell, Fingerprint, Users, Link } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Real-Time AI Scam Detection',
      description: 'Our AI analyzes job postings and flags high-risk listings based on multiple scam indicators in real-time.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'AI Cloud Email Security',
      description: 'Advanced protection against phishing attempts through recruiter emails and malicious communications.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Bell,
      title: 'Real-Time Scam Alerts',
      description: 'Receive instant notifications when our system detects suspicious job listings or recruiter behavior.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Fingerprint,
      title: 'Outsmarts Identity Threats',
      description: 'Protects against identity theft and financial fraud through advanced pattern recognition.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Verified Recruiter System',
      description: 'Recruiters undergo KYC verification to earn trusted badges visible to job seekers.',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Link,
      title: 'Blockchain Integration',
      description: 'Immutable scam reports stored on Algorand blockchain for transparent, tamper-proof records.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm font-semibold mb-4 tracking-wide uppercase">
            REVOLUTIONARY FEATURES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Proactive Job Security
            <br />
            <span className="text-gray-400">Across Your Career Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From real-time AI powered scam detection to blockchain verification, our platform provides 
            comprehensive protection for your job search experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};