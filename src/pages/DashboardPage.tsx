import React from 'react';
import { Zap, Shield, TrendingUp, AlertTriangle, Users, CheckCircle, Search, FileText, Building, Phone, User, Settings } from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  userName: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, userName }) => {
  const stats = [
    {
      title: 'Jobs Scanned',
      value: '1,247',
      change: '+12%',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Threats Blocked',
      value: '23',
      change: '+5%',
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-500'
    },
    {
      title: 'Safe Applications',
      value: '156',
      change: '+18%',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Protection Score',
      value: '98%',
      change: '+2%',
      icon: TrendingUp,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const recentAlerts = [
    {
      type: 'High Risk',
      title: 'Suspicious Job Posting Detected',
      company: 'TechCorp Solutions',
      time: '2 hours ago',
      severity: 'high',
      id: 1
    },
    {
      type: 'Medium Risk',
      title: 'Unverified Recruiter Contact',
      company: 'Global Innovations',
      time: '5 hours ago',
      severity: 'medium',
      id: 2
    },
    {
      type: 'Low Risk',
      title: 'Company Profile Incomplete',
      company: 'StartupXYZ',
      time: '1 day ago',
      severity: 'low',
      id: 3
    }
  ];

  const flaggedJobs = [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      location: 'Remote',
      riskLevel: 'High',
      flaggedReasons: ['Suspicious salary range', 'Unverified company'],
      postedDate: '2 days ago'
    },
    {
      title: 'Marketing Manager',
      company: 'Digital Marketing Pro',
      location: 'New York, NY',
      riskLevel: 'Medium',
      flaggedReasons: ['Vague job description', 'No company website'],
      postedDate: '1 week ago'
    }
  ];

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
              <span className="text-xl font-bold text-white">HIRESAFE AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome back, {userName}!</span>
              <button
                onClick={() => onNavigate('profile')}
                className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <User className="h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
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
          <h1 className="text-3xl font-bold text-white mb-2">Your Protection Dashboard</h1>
          <p className="text-gray-400">Monitor your job search security in real-time</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button 
            onClick={() => onNavigate('job-analysis')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl text-left hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            <Search className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Quick Scan</h3>
            <p className="text-purple-100 text-sm">Analyze a job posting instantly</p>
          </button>

          <button 
            onClick={() => onNavigate('scam-reports')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-2xl text-left hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
          >
            <FileText className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">View Reports</h3>
            <p className="text-blue-100 text-sm">Check your scam report history</p>
          </button>

          <button 
            onClick={() => onNavigate('company-insights')}
            className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-left hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
          >
            <Building className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Company Check</h3>
            <p className="text-green-100 text-sm">Verify company credentials</p>
          </button>

          <button 
            onClick={() => onNavigate('emergency-safety')}
            className="bg-gradient-to-r from-red-600 to-rose-600 p-6 rounded-2xl text-left hover:from-red-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105"
          >
            <Phone className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Emergency</h3>
            <p className="text-red-100 text-sm">Safety alert system</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Alerts */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Security Alerts</h2>
              <button 
                onClick={() => onNavigate('scam-reports')}
                className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-500' :
                      alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <h4 className="text-white font-semibold">{alert.title}</h4>
                      <p className="text-gray-400 text-sm">{alert.company} • {alert.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                    alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {alert.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Flagged Jobs */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recently Flagged Jobs</h2>
              <button 
                onClick={() => onNavigate('job-analysis')}
                className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
                Scan New Job
              </button>
            </div>
            <div className="space-y-4">
              {flaggedJobs.map((job, index) => (
                <div 
                  key={index} 
                  onClick={() => onNavigate('job-details', { jobData: job })}
                  className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{job.title}</h4>
                      <p className="text-gray-400 text-sm">{job.company} • {job.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.riskLevel === 'High' ? 'bg-red-500/20 text-red-400' :
                      job.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {job.riskLevel} Risk
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {job.flaggedReasons.map((reason, reasonIndex) => (
                      <span key={reasonIndex} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {reason}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs">{job.postedDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};