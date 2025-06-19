import React, { useState } from 'react';
import { Zap, ArrowLeft, Search, Filter, Calendar, AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';

interface ScamReportHistoryPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export const ScamReportHistoryPage: React.FC<ScamReportHistoryPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const reports = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      platform: 'LinkedIn',
      reportDate: '2023-10-15',
      status: 'Confirmed Scam',
      type: 'Fake Job Posting',
      riskLevel: 'High',
      description: 'Unrealistic salary range and suspicious company information'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      company: 'Digital Marketing Pro',
      platform: 'Indeed',
      reportDate: '2023-10-12',
      status: 'Under Review',
      type: 'Suspicious Recruiter',
      riskLevel: 'Medium',
      description: 'Recruiter requesting personal information upfront'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Analytics Corp',
      platform: 'Glassdoor',
      reportDate: '2023-10-08',
      status: 'Safe',
      type: 'False Positive',
      riskLevel: 'Low',
      description: 'Initially flagged but verified as legitimate'
    },
    {
      id: 4,
      title: 'Remote Customer Service',
      company: 'Global Support Inc',
      platform: 'ZipRecruiter',
      reportDate: '2023-10-05',
      status: 'Pending Review',
      type: 'Phishing Attempt',
      riskLevel: 'High',
      description: 'Email requesting bank details for direct deposit setup'
    },
    {
      id: 5,
      title: 'Graphic Designer',
      company: 'Creative Studios',
      platform: 'Behance',
      reportDate: '2023-09-28',
      status: 'Confirmed Scam',
      type: 'Payment Fraud',
      riskLevel: 'High',
      description: 'Required upfront payment for software licenses'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed Scam': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Under Review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Pending Review': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Safe': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed Scam': return <AlertTriangle className="h-4 w-4" />;
      case 'Under Review': return <Clock className="h-4 w-4" />;
      case 'Pending Review': return <Clock className="h-4 w-4" />;
      case 'Safe': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Scam Report History</h1>
          <p className="text-gray-400">Track and manage your reported suspicious activities</p>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Statuses</option>
              <option value="Confirmed Scam">Confirmed Scam</option>
              <option value="Under Review">Under Review</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Safe">Safe</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              <option value="Fake Job Posting">Fake Job Posting</option>
              <option value="Suspicious Recruiter">Suspicious Recruiter</option>
              <option value="Phishing Attempt">Phishing Attempt</option>
              <option value="Payment Fraud">Payment Fraud</option>
              <option value="False Positive">False Positive</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last 3 Months</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Reports</p>
                <p className="text-2xl font-bold text-white">{reports.length}</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Confirmed Scams</p>
                <p className="text-2xl font-bold text-red-400">
                  {reports.filter(r => r.status === 'Confirmed Scam').length}
                </p>
              </div>
              <div className="bg-red-500/20 p-3 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Under Review</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {reports.filter(r => r.status.includes('Review')).length}
                </p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Safe/Cleared</p>
                <p className="text-2xl font-bold text-green-400">
                  {reports.filter(r => r.status === 'Safe').length}
                </p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Report History</h2>
          </div>
          
          <div className="divide-y divide-gray-800">
            {filteredReports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-800/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(report.status)}
                          <span>{report.status}</span>
                        </div>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <span>{report.company}</span>
                      <span>•</span>
                      <span>{report.platform}</span>
                      <span>•</span>
                      <span>{report.reportDate}</span>
                      <span>•</span>
                      <span className={getRiskColor(report.riskLevel)}>{report.riskLevel} Risk</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{report.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                        {report.type}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onNavigate('job-details', { jobData: report })}
                    className="ml-4 flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredReports.length === 0 && (
            <div className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No Reports Found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};