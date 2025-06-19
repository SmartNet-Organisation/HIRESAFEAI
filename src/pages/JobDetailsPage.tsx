import React from 'react';
import { Zap, ArrowLeft, AlertTriangle, MapPin, Calendar, DollarSign, Building, Flag, ExternalLink, Shield } from 'lucide-react';

interface JobDetailsPageProps {
  onNavigate: (page: string, data?: any) => void;
  jobData?: any;
}

export const JobDetailsPage: React.FC<JobDetailsPageProps> = ({ onNavigate, jobData }) => {
  const job = jobData || {
    title: 'Senior Software Engineer',
    company: 'TechCorp Solutions',
    location: 'Remote',
    salary: '$150,000 - $300,000',
    postedDate: '2 days ago',
    riskLevel: 'High',
    riskScore: 85,
    flaggedReasons: ['Suspicious salary range', 'Unverified company', 'Vague job description'],
    description: `We are looking for a Senior Software Engineer to join our dynamic team. 

Responsibilities:
- Develop cutting-edge software solutions
- Work with the latest technologies
- Collaborate with international teams
- Lead innovative projects

Requirements:
- Bachelor's degree in Computer Science
- 3+ years of experience
- Strong problem-solving skills
- Excellent communication abilities

We offer competitive salary, flexible working hours, and amazing benefits!

Contact us immediately at hiring@techcorp-solutions.com for fast processing!`,
    credibilityScore: 25,
    companyProfile: {
      name: 'TechCorp Solutions',
      website: 'Not verified',
      founded: 'Unknown',
      employees: 'Unverified',
      address: 'Multiple locations claimed',
      verified: false
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{job.postedDate}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full border ${getRiskColor(job.riskLevel)}`}>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-semibold">{job.riskLevel} Risk</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2 text-green-400">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-semibold">{job.salary}</span>
                </div>
              </div>

              {/* Red Flags */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">🚩 Red Flags</h3>
                <div className="flex flex-wrap gap-2">
                  {job.flaggedReasons.map((reason: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm border border-red-500/30">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <Flag className="h-4 w-4" />
                    <span>Report as Scam</span>
                  </div>
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Request Human Review</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
              <div className="prose prose-invert max-w-none">
                <pre className="text-gray-300 whitespace-pre-wrap font-sans">{job.description}</pre>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Credibility Score */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Credibility Score</h3>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getCredibilityColor(job.credibilityScore)}`}>
                  {job.credibilityScore}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${job.credibilityScore >= 70 ? 'bg-green-500' : job.credibilityScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${job.credibilityScore}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm">
                  {job.credibilityScore >= 70 ? 'Highly credible' : 
                   job.credibilityScore >= 40 ? 'Moderately credible' : 'Low credibility'}
                </p>
              </div>
            </div>

            {/* Company Profile */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Company Profile</h3>
                <button
                  onClick={() => onNavigate('company-insights', { companyData: job.companyProfile })}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Company:</span>
                  <span className="text-white">{job.companyProfile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Website:</span>
                  <span className="text-red-400">{job.companyProfile.website}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Founded:</span>
                  <span className="text-gray-300">{job.companyProfile.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Employees:</span>
                  <span className="text-gray-300">{job.companyProfile.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Address:</span>
                  <span className="text-gray-300">{job.companyProfile.address}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Verified:</span>
                  <span className={`px-2 py-1 rounded text-xs ${job.companyProfile.verified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {job.companyProfile.verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-4">🛡️ Safety Tips</h3>
              <ul className="text-blue-300 text-sm space-y-2">
                <li>• Never pay upfront fees</li>
                <li>• Verify company independently</li>
                <li>• Be cautious of urgent hiring</li>
                <li>• Check official company website</li>
                <li>• Trust your instincts</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};