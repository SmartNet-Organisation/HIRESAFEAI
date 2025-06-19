import React, { useState } from 'react';
import { Zap, ArrowLeft, Search, AlertTriangle, Shield, CheckCircle, Copy, ExternalLink, Flag } from 'lucide-react';

interface JobAnalysisPageProps {
  onNavigate: (page: string, data?: any) => void;
  userName: string;
}

export const JobAnalysisPage: React.FC<JobAnalysisPageProps> = ({ onNavigate, userName }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult = {
      riskScore: 75,
      riskLevel: 'High',
      overallAssessment: 'This job posting shows multiple red flags indicating potential fraud.',
      redFlags: [
        {
          category: 'Compensation',
          issue: 'Unrealistic salary range ($150k-$300k for entry level)',
          severity: 'high'
        },
        {
          category: 'Company Information',
          issue: 'Company website not found or suspicious',
          severity: 'high'
        },
        {
          category: 'Job Description',
          issue: 'Vague job responsibilities and requirements',
          severity: 'medium'
        },
        {
          category: 'Contact Method',
          issue: 'Personal email instead of company domain',
          severity: 'medium'
        },
        {
          category: 'Urgency',
          issue: 'Excessive urgency in hiring process',
          severity: 'low'
        }
      ],
      recommendations: [
        'Do not provide personal information or documents',
        'Verify company legitimacy through official channels',
        'Research the company independently',
        'Be cautious of upfront payment requests'
      ],
      companyInfo: {
        name: 'TechCorp Solutions',
        website: 'Not verified',
        founded: 'Unknown',
        employees: 'Unverified',
        location: 'Multiple locations claimed'
      }
    };
    
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'medium': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'low': return <AlertTriangle className="h-5 w-5 text-green-400" />;
      default: return <Shield className="h-5 w-5 text-gray-400" />;
    }
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
            <span className="text-gray-300">Welcome, {userName}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Job Scam Analysis</h1>
          <p className="text-gray-400">Paste a job description below for AI-powered scam detection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Job Description Input</h2>
            <div className="space-y-4">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              />
              
              <div className="flex space-x-4">
                <button
                  onClick={handleAnalyze}
                  disabled={!jobDescription.trim() || isAnalyzing}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Job'}</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setJobDescription('')}
                  className="bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <h3 className="text-blue-400 font-semibold mb-2">💡 Quick Tips</h3>
              <ul className="text-blue-300 text-sm space-y-1">
                <li>• Copy the entire job posting for best results</li>
                <li>• Include company information if available</li>
                <li>• Our AI analyzes 50+ scam indicators</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
                <h3 className="text-lg font-semibold text-white mb-2">Analyzing Job Posting...</h3>
                <p className="text-gray-400 text-center">Our AI is checking for scam indicators and red flags</p>
              </div>
            ) : analysisResult ? (
              <div className="space-y-6">
                {/* Risk Score */}
                <div className="text-center">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${getRiskColor(analysisResult.riskLevel)}`}>
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    {analysisResult.riskLevel} Risk ({analysisResult.riskScore}%)
                  </div>
                  <p className="text-gray-300 mt-2">{analysisResult.overallAssessment}</p>
                </div>

                {/* Red Flags */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">🚩 Red Flags Detected</h3>
                  <div className="space-y-3">
                    {analysisResult.redFlags.map((flag: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        {getSeverityIcon(flag.severity)}
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{flag.category}</h4>
                          <p className="text-gray-400 text-sm">{flag.issue}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(flag.severity)}`}>
                          {flag.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">💡 Recommendations</h3>
                  <div className="space-y-2">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <p className="text-green-300 text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => onNavigate('company-insights', { companyData: analysisResult.companyInfo })}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>Company Details</span>
                    </div>
                  </button>
                  
                  <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    <div className="flex items-center justify-center space-x-2">
                      <Flag className="h-4 w-4" />
                      <span>Report Scam</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Shield className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Ready to Analyze</h3>
                <p className="text-gray-500">Paste a job description and click "Analyze Job" to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};