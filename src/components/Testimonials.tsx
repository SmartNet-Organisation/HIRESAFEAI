import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      title: 'Senior Software Architect',
      company: 'Google',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      quote: "HireSafe AI's quantum-powered detection saved me from a sophisticated deepfake recruiter scam. The AI caught subtle language patterns I never would have noticed."
    },
    {
      name: 'Marcus Rodriguez',
      title: 'VP of Engineering',
      company: 'Microsoft',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      quote: "The blockchain verification system gives me complete confidence. Every job posting is cryptographically verified - it's revolutionary technology for career security."
    },
    {
      name: 'Dr. Aisha Patel',
      title: 'Chief Data Scientist',
      company: 'Tesla',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      rating: 5,
      quote: "The neural network analysis is incredibly sophisticated. It's like having a team of cybersecurity experts analyze every opportunity for potential threats."
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-purple-200">Trusted by Industry Leaders</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Success <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from professionals who've been protected by our quantum-powered AI
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Verified Badge */}
              <div className="absolute top-4 right-4">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>

              {/* Avatar and Info */}
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-purple-500/30"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                  <p className="text-purple-300 text-sm">{testimonial.title}</p>
                  <p className="text-purple-400 text-sm font-semibold">{testimonial.company}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-300 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};