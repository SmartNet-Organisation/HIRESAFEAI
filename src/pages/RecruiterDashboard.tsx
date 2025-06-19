import React, { useState } from 'react';
import { Zap, Shield, FileText, CheckCircle, Clock, AlertTriangle, Upload, Eye, Edit, Plus, Users, Building } from 'lucide-react';

interface RecruiterDashboardProps {
  onNavigate: (page: string) => void;
  userName: string;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onNavigate, userName }) => {
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, verified, rejected
  const [activeTab, setActiveTab] = useState('overview');

  const verificationData = {
    status: 'Under Review',
    submittedDate: '2024-01-10',
    estimatedCompletion: '2024-01-17',
    documentsUploaded: 4,
    documentsRequired: 5,
    progress: 80
  };

  const jobPostings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      status: 'Active',
      applications: 45,
      views: 234,
      postedDate: '2024-01-08',
      verificationScore: 95
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'TechCorp Inc.',
      location: 'Remote',
      type: 'Full-time',
      status: 'Under Review',
      applications: 12,
      views: 89,
      postedDate: '2024-01-12',
      verificationScore: 88
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'TechCorp Inc.',
      location: 'New York, NY',
      type: 'Contract',
      status: 'Draft',
      applications: 0,
      views: 0,
      postedDate: '2024-01-15',
      verificationScore: 92
    }
  ];

  const requiredDocuments = [
    {
      name: 'Company Registration Certificate',
      status: 'uploaded',
      uploadDate: '2024-01-10'
    },
    {
      name: 'Business License',
      status: 'uploaded',
      uploadDate: '2024-01-10'
    },
    {
      name: 'Tax ID Documentation',
      status: 'uploaded',
      uploadDate: '2024-01-11'
    },
    {
      name: 'Professional ID/LinkedIn Profile',
      status: 'uploaded',
      uploadDate: '2024-01-11'
    },
    {
      name: 'Company Website Verification',
      status: 'pending',
      uploadDate: null
    }
  ];

  const stats = [
    {
      title: 'Active Job Posts',
      value: '3',
      change: '+1',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Applications',
      value: '57',
      change: '+12',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Profile Views',
      value: '323',
      change: '+23',
      icon: Eye,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Trust Score',
      value: '92%',
      change: '+5%',
      icon: Shield,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'verified': return 'text-green-400 bg-green-500/20';
      case 'under review': return 'text-yellow-400 bg-yellow-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'draft': return 'text-gray-400 bg-gray-500/20';
      case 'rejected': return 'text-red-400 bg-red-500/20';
      case 'uploaded': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'uploaded': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'rejected': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">HIRESAFE AI</span>
                <span className="text-purple-400 text-sm ml-2">Recruiter Portal</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">Welcome, {userName}!</span>
                {verificationStatus === 'verified' && (
                  <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    <CheckCircle className="h-3 w-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => onNavigate('landing')}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Recruiter Dashboard</h1>
          <p className="text-gray-400">Manage your verification status and job postings</p>
        </div>

        {/* Verification Status Banner */}
        {verificationStatus !== 'verified' && (
          <div className="mb-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-500/20 p-3 rounded-xl">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-yellow-400">Verification In Progress</h3>
                  <p className="text-yellow-300 text-sm">
                    Your account is being verified. Estimated completion: {verificationData.estimatedCompletion}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{verificationData.progress}%</div>
                <div className="text-yellow-300 text-sm">Complete</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${verificationData.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-800">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'verification', name: 'Verification' },
                { id: 'jobs', name: 'Job Postings' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl text-left hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                <Plus className="h-8 w-8 text-white mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Post New Job</h3>
                <p className="text-purple-100 text-sm">Create a new job posting</p>
              </button>

              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-2xl text-left hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
                <Upload className="h-8 w-8 text-white mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Upload Documents</h3>
                <p className="text-blue-100 text-sm">Complete verification process</p>
              </button>

              <button className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-left hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
                <Building className="h-8 w-8 text-white mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Company Profile</h3>
                <p className="text-green-100 text-sm">Update company information</p>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="space-y-8">
            {/* Verification Progress */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6">Verification Progress</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <div className="text-2xl font-bold text-white mb-1">{verificationData.documentsUploaded}/{verificationData.documentsRequired}</div>
                  <div className="text-gray-400 text-sm">Documents Uploaded</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{verificationData.status}</div>
                  <div className="text-gray-400 text-sm">Current Status</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <div className="text-2xl font-bold text-white mb-1">3-5 days</div>
                  <div className="text-gray-400 text-sm">Processing Time</div>
                </div>
              </div>

              {/* Document Checklist */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Required Documents</h3>
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="flex items-center space-x-4">
                      {getVerificationIcon(doc.status)}
                      <div>
                        <h4 className="text-white font-semibold">{doc.name}</h4>
                        {doc.uploadDate && (
                          <p className="text-gray-400 text-sm">Uploaded on {doc.uploadDate}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      {doc.status === 'pending' && (
                        <button className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors">
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KYC Information */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6">KYC Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                  <input
                    type="text"
                    value="TechCorp Inc."
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Registration Number</label>
                  <input
                    type="text"
                    value="TC-2023-001234"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Business Address</label>
                  <input
                    type="text"
                    value="123 Tech Street, San Francisco, CA 94105"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value="hr@techcorp.com"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-8">
            {/* Job Postings Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Job Postings</h2>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="h-4 w-4 inline mr-2" />
                Post New Job
              </button>
            </div>

            {/* Job Postings List */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Job Title</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Location</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Type</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Status</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Applications</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Trust Score</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobPostings.map((job) => (
                      <tr key={job.id} className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <div className="text-white font-semibold">{job.title}</div>
                            <div className="text-gray-400 text-sm">Posted {job.postedDate}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-300">{job.location}</td>
                        <td className="py-4 px-6 text-gray-300">{job.type}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-white">{job.applications}</div>
                          <div className="text-gray-400 text-sm">{job.views} views</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-green-400 font-semibold">{job.verificationScore}%</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="text-purple-400 hover:text-purple-300 transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};