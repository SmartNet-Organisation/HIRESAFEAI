import React, { useState } from 'react';
import { Zap, ArrowLeft, Check, Crown, Shield, Star, Users, Building, ArrowRight, CreditCard } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      icon: Shield,
      description: 'Perfect for getting started with basic protection',
      features: [
        'Access to basic scam detection',
        'View limited company details',
        '5 free scam reports per month',
        'Limited scam database access',
        'Email support',
        'Basic job posting analysis',
        'Community scam alerts'
      ],
      limitations: [
        'Limited to 5 scans per month',
        'Basic threat detection only',
        'No priority support',
        'No advanced analytics'
      ],
      cta: 'Get Started Free',
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'individual',
      name: 'Individual Premium',
      price: { monthly: 7, yearly: 70 },
      icon: Zap,
      description: 'Complete protection for serious job seekers',
      features: [
        'Unlimited scam detection & reporting',
        'Full company insights & verification',
        'Human verification on flagged jobs',
        'Custom scam alerts & notifications',
        'Early warning for trending scams',
        'Priority support (24/7)',
        'Advanced AI analysis',
        'Real-time threat monitoring',
        'Detailed risk assessments',
        'Email & SMS alerts',
        'Browser extension access',
        'Mobile app premium features'
      ],
      limitations: [],
      cta: 'Start 14-Day Free Trial',
      popular: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 'Custom', yearly: 'Custom' },
      icon: Crown,
      description: 'For institutions, universities, and job boards',
      features: [
        'Full API integration & white-labeling',
        'Custom dashboard & branding',
        'Recruiter verification service',
        'Bulk user management',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantees',
        'On-premise deployment options',
        'Custom training & onboarding',
        'Priority feature requests',
        'Compliance & audit support'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const additionalFeatures = [
    {
      category: 'AI Protection',
      features: [
        'Advanced NLP scam detection',
        'Real-time job posting analysis',
        'Behavioral pattern recognition',
        'Predictive threat modeling'
      ]
    },
    {
      category: 'Verification',
      features: [
        'Company background checks',
        'Recruiter KYC verification',
        'Blockchain-verified reports',
        'Social media validation'
      ]
    },
    {
      category: 'Alerts & Monitoring',
      features: [
        'Multi-channel notifications',
        'Custom alert thresholds',
        'Emergency safety alerts',
        'Trend analysis reports'
      ]
    },
    {
      category: 'Support & Community',
      features: [
        '24/7 priority support',
        'Community protection network',
        'Expert human review',
        'Educational resources'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Tech Startup',
      quote: 'HireSafe Premium saved me from 3 different scam attempts. The investment pays for itself.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Career Counselor',
      company: 'State University',
      quote: 'Our students are much safer now. The enterprise features help us protect hundreds of job seekers.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  ];

  const faq = [
    {
      question: 'How does the free trial work?',
      answer: 'Get 14 days of full Individual Premium access with no credit card required. Cancel anytime during the trial period.'
    },
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption and never share your personal information with third parties.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.'
    }
  ];

  const getPrice = (plan: any) => {
    if (typeof plan.price[billingCycle] === 'number') {
      return billingCycle === 'yearly' ? `$${plan.price.yearly}` : `$${plan.price.monthly}`;
    }
    return plan.price[billingCycle];
  };

  const getPeriod = () => {
    return billingCycle === 'yearly' ? '/year' : '/month';
  };

  const getSavings = (plan: any) => {
    if (billingCycle === 'yearly' && typeof plan.price.yearly === 'number' && typeof plan.price.monthly === 'number') {
      const yearlyMonthly = plan.price.yearly / 12;
      const savings = Math.round(((plan.price.monthly - yearlyMonthly) / plan.price.monthly) * 100);
      return savings > 0 ? `Save ${savings}%` : null;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">HIRESAFE AI</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('signup')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Protection Level
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            From basic scam detection to enterprise-grade security. Protect your career journey with AI-powered threat detection.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                Save up to 17%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
                  plan.popular
                    ? 'border-purple-500/50 ring-2 ring-purple-500/20'
                    : 'border-gray-700 hover:border-purple-500/30'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${plan.color} mb-6`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-white">{getPrice(plan)}</span>
                      {typeof plan.price[billingCycle] === 'number' && (
                        <span className="text-gray-400 ml-2">{getPeriod()}</span>
                      )}
                    </div>
                    {getSavings(plan) && (
                      <span className="text-green-400 text-sm font-medium">{getSavings(plan)}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-gray-400 mb-2">Limitations:</h5>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="text-gray-500 text-sm">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    if (plan.id === 'enterprise') {
                      // Handle enterprise contact
                      console.log('Contact sales');
                    } else {
                      onNavigate('signup');
                    }
                  }}
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

      {/* Feature Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Feature Comparison</h2>
            <p className="text-xl text-gray-300">See what's included in each plan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((category, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Professionals</h2>
            <p className="text-xl text-gray-300">See what our users say about their protection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <blockquote className="text-gray-300 italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-3">{item.question}</h3>
                <p className="text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Protect Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who trust HireSafe AI to keep them safe from job scams.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => onNavigate('signup')}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <div className="flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <button
              onClick={() => onNavigate('billing')}
              className="group bg-transparent text-white px-8 py-4 rounded-xl font-semibold border border-white/30 hover:border-white transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>View Billing</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};