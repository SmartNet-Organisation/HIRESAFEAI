import React from 'react';
import { Zap, ArrowLeft, Building, Globe, Users, Calendar, MapPin, Shield, AlertTriangle, CheckCircle, ExternalLink, Twitter, Linkedin, Facebook } from 'lucide-react';

interface CompanyInsightsPageProps {
  onNavigate: (page: string, data?: any) => void;
  companyData?: any;
}

export const CompanyInsightsPage: React.FC<CompanyInsightsPageProps> = ({ onNavigate, companyData }) => {
  const company = companyData || {
    name: 'TechCorp Solutions',
    website: 'https://techcorp-solutions.com',
    founded: '2018',
    employees: '50-200',
    location: 'San Francisco, CA',
    verified: false,
    verificationScore: 35,
    description: 'A technology company focused on innovative software solutions for businesses worldwide.',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techcorp-solutions',
      twitter: 'https://twitter.com/techcorpsol',
      facebook: null
    },
    fraudHistory: [
      {
        date: '2023-08-15',
        type: 'Fake Job Posting',
        description: 'Posted unrealistic salary ranges for entry-level positions',
        status: 'Confirmed'
      },
      {
        date: '2023-06-22',
        type: 'Identity Theft',
        description: 'Attempted to collect personal information under false pretenses',
        status: 'Under Investigation'
      }
    ],
    employeeTestimonials: [
      {
        name: 'Anonymous Employee',
        role: 'Software Developer',
        rating: 2,
        review: 'Company promises were not kept. Salary was much lower than advertised.',
        date: '2023-09-01'
      }
    ],
    redFlags: [
      'Website recently created (less than 1 year old)',
      'No verifiable business address',
      'Limited online presence',
      'Multiple fraud reports',
      'Unrealistic job postings'
    ],
    verifiedData: {
      businessRegistration: false,
      taxId: false,
      physicalAddress: false,
      phoneNumber: false,
      emailDomain: true
    }
  };

  const getVerificationColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getVerificationBadge = (verified: boolean) => {
    return verified ? (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
        <CheckCircle className="h-3 w-3 mr-1" />
        Verified
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Unverified
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">HIRESAFE AI</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Company Insights</h1>
          <p className="text-gray-400">Comprehensive analysis and verification data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Overview */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{company.name}</h2>
                  <div className="flex items-center space-x-4 text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{company.website}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{company.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-300">{company.description}</p>
                </div>
                {getVerificationBadge(company.verified)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <Calendar className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">{company.founded}</div>
                  <div className="text-gray-400 text-sm">Founded</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">{company.employees}</div>
                  <div className="text-gray-400 text-sm">Employees</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className={`font-semibold ${getVerificationColor(company.verificationScore)}`}>
                    {company.verificationScore}%
                  </div>
                  <div className="text-gray-400 text-sm">Trust Score</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <Building className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Tech</div>
                  <div className="text-gray-400 text-sm">Industry</div>
                </div>
              </div>
            </div>

            {/* Verified Data */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Verification Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(company.verifiedData).map(([key, verified]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    {verified ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Social Media Presence</h3>
              <div className="flex space-x-4">
                {company.socialMedia.linkedin && (
                  <a href={company.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {company.socialMedia.twitter && (
                  <a href={company.socialMedia.twitter} target="_blank" rel="noopener noreferrer"
                     className="flex items-center space-x-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors">
                    <Twitter className="h-4 w-4" />
                    <span>Twitter</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {company.socialMedia.facebook && (
                  <a href={company.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                     className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                    <Facebook className="h-4 w-4" />
                    <span>Facebook</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Employee Testimonials */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Employee Testimonials</h3>
              <div className="space-y-4">
                {company.employeeTestimonials.map((testimonial: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                            ★
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">"{testimonial.review}"</p>
                    <p className="text-gray-500 text-xs">{testimonial.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fraud History */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-4">🚨 Fraud History</h3>
              <div className="space-y-4">
                {company.fraudHistory.map((incident: any, index: number) => (
                  <div key={index} className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-red-300 font-semibold">{incident.type}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        incident.status === 'Confirmed' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {incident.status}
                      </span>
                    </div>
                    <p className="text-red-200 text-sm mb-2">{incident.description}</p>
                    <p className="text-red-400 text-xs">{incident.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* HireSafe Verified Badge */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center">
              <div className="mb-4">
                {company.verified ? (
                  <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                ) : (
                  <div className="bg-red-500/20 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {company.verified ? 'HireSafe Verified' : 'Not Verified'}
              </h3>
              <p className="text-gray-400 text-sm">
                {company.verified 
                  ? 'This company has passed our verification process'
                  : 'This company has not completed verification'
                }
              </p>
            </div>

            {/* Red Flags */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-4">🚩 Red Flags</h3>
              <ul className="space-y-2">
                {company.redFlags.map((flag: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-red-300 text-sm">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors">
                Report Company
              </button>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Request Verification
              </button>
              <button className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                Share Insights
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};