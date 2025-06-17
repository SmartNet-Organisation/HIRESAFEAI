import React from 'react';
import { Check, Zap, Shield, Crown } from 'lucide-react';

interface PricingProps {
  onNavigate: (page: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      icon: Shield,
      description: 'Perfect for getting started',
      features: [
        'Access to basic scam detection',
        'View limited company details',
        '5 free scam reports per month',
        'Limited scam database access',
        'Email support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Individual Premium',
      price: '$7',
      period: 'per month',
      icon: Zap,
      description: 'Complete protection for job seekers',
      features: [
        'Unlimited scam detection & reporting',
        'Full company insights',
        'Human verification on flagged jobs',
        'Custom scam alerts',
        'Early warning for trending scams',
        'Priority support'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      icon: Crown,
      description: 'For institutions and job boards',
      features: [
        'Full API integration',
        'Custom dashboard',
        'Recruiter verification service',
        'White-label solutions',
        'Dedicated support',
        'Custom integrations'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Protection Level
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From basic protection to enterprise-grade security
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular
                  ? 'border-purple-500/50 ring-2 ring-purple-500/20'
                  : 'border-gray-700 hover:border-purple-500/30'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
                <plan.icon className="h-6 w-6 text-white" />
              </div>

              {/* Plan Details */}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 ml-2">/{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => onNavigate('signup')}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/25'
                    : 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-600'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};