import React from 'react';
import { Brain, Shield, Zap } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          {/* Mobile Animation - Shows on top for mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="relative">
              <div className="w-64 h-64 border border-purple-500/20 rounded-full animate-spin-slow"></div>
              <div className="absolute top-4 left-4 w-56 h-56 border border-blue-500/20 rounded-full animate-spin-reverse"></div>
              <div className="absolute top-8 left-8 w-48 h-48 border border-pink-500/20 rounded-full animate-spin-slow"></div>
              
              {/* Center Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Floating Icons for Mobile */}
              <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-full animate-float">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div className="absolute bottom-2 left-2 bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-full animate-float-delay">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div className="absolute top-1/2 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-full animate-float">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-full animate-float-delay">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Left Side - Content */}
          <div className="flex-1 max-w-2xl lg:pr-8">
            <p className="text-purple-400 text-sm font-semibold mb-6 tracking-wide uppercase">
              OUR APPROACH
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Built On Our Unique
              <br />
              <span className="text-gray-400">AI Approach</span>
            </h2>
            <p className="text-xl text-gray-300 mb-16 leading-relaxed">
              HireSafe uses advanced machine learning models trained on millions of job listings to detect 
              patterns of fraudulent behavior. Our models continuously learn and adapt to new scam techniques.
            </p>

            {/* Features List with Better Spacing */}
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl flex-shrink-0">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4">Advanced NLP Analysis</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Our system analyzes the language patterns in job descriptions to identify red flags that 
                    indicate potential scams.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl flex-shrink-0">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4">Algorand Blockchain Verification</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    All scam reports are stored on the Algorand blockchain, creating an immutable record that 
                    helps protect the entire community.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-xl flex-shrink-0">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4">Real-Time API Integration</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Seamlessly integrate our protection with job boards and career sites to provide real-time 
                    protection wherever you search.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Desktop Animation */}
          <div className="hidden lg:flex flex-1 justify-end">
            <div className="relative">
              <div className="w-96 h-96 border border-purple-500/20 rounded-full animate-spin-slow"></div>
              <div className="absolute top-8 left-8 w-80 h-80 border border-blue-500/20 rounded-full animate-spin-reverse"></div>
              <div className="absolute top-16 left-16 w-64 h-64 border border-pink-500/20 rounded-full animate-spin-slow"></div>
              
              {/* Center Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-full">
                  <Brain className="h-12 w-12 text-white" />
                </div>
              </div>

              {/* Floating Icons for Desktop */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full animate-float">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full animate-float-delay">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-1/2 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full animate-float">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full animate-float-delay">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};