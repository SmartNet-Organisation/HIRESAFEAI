import React, { useState } from 'react';
import { Zap, Users, Building, Shield, TrendingUp, FileText, Settings, Download, Plus, Eye, Calendar, AlertTriangle } from 'lucide-react';

interface InstitutionDashboardProps {
  onNavigate: (page: string) => void;
  userName: string;
}

export const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({ onNavigate, userName }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Students',
      value: '12,847',
      change: '+5%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Career Centers',
      value: '8',
      change: '+1',
      icon: Building,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Threats Blocked',
      value: '456',
      change: '+12%',
      icon: Shield,
      color: 'from-red-500 to-rose-500'
    },
    {
      title: 'Safety Score',
      value: '96%',
      change: '+2%',
      icon: TrendingUp,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const careerCenters = [
    {
      id: 1,
      name: 'Engineering Career Center',
      students: 3245,
      activeJobs: 156,
      alertsToday: 12,
      safetyScore: 94,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Business School Career Services',
      students: 2890,
      activeJobs: 203,
      alertsToday: 8,
      safetyScore: 97,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Liberal Arts Career Center',
      students: 1876,
      activeJobs: 89,
      alertsToday: 5,
      safetyScore: 95,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Graduate School Placement',
      students: 1234,
      activeJobs: 67,
      alertsToday: 3,
      safetyScore: 98,
      status: 'Active'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      center: 'Engineering Career Center',
      type: 'High Risk Job Posting',
      description: 'Suspicious internship posting detected',
      timestamp: '2 hours ago',
      severity: 'High',
      status: 'Under Investigation'
    },
    {
      id: 2,
      center: 'Business School Career Services',
      type: 'Phishing Email',
      description: 'Fake recruiter email targeting MBA students',
      timestamp: '4 hours ago',
      severity: 'Medium',
      status: 'Resolved'
    },
    {
      id: 3,
      center: 'Liberal Arts Career Center',
      type: 'Unverified Company',
      description: 'New company posting without verification',
      timestamp: '1 day ago',
      severity: 'Low',
      status: 'Monitoring'
    }
  ];

  const monthlyReports = [
    {
      month: 'January 2024',
      totalThreats: 89,
      studentsProtected: 12847,
      safetyScore: 96,
      downloadUrl: '#'
    },
    {
      month: 'December 2023',
      totalThreats: 76,
      studentsProtected: 12654,
      safetyScore: 94,
      downloadUrl: '#'
    },
    {
      month: 'November 2023',
      totalThreats: 92,
      studentsProtected: 12543,
      safetyScore: 93,
      downloadUrl: '#'
    }
  ];

  const apiIntegrations = [
    {
      name: 'University Job Board',
      status: 'Connected',
      lastSync: '2 hours ago',
      jobsProcessed: 1234
    },
    {
      name: 'Alumni Network Portal',
      status: 'Connected',
      lastSync: '1 day ago',
      jobsProcessed: 567
    },
    {
      name: 'External Job Platforms',
      status: 'Pending',
      lastSync: 'Never',
      jobsProcessed: 0
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'connected': return 'text-green-400 bg-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'inactive': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
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
                <span className="text-purple-400 text-sm ml-2">Institution Portal</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {userName}!</span>
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
          <h1 className="text-3xl font-bold text-white mb-2">Institution Dashboard</h1>
          <p className="text-gray-400">Monitor campus-wide career safety and manage multiple career centers</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-800">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'centers', name: 'Career Centers' },
                { id: 'reports', name: 'Reports' },
                { id: 'integrations', name: 'API Integrations' }
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
                <h3 className="text-lg font-bold text-white mb-2">Add Career Center</h3>
                <p className="text-purple-100 text-sm">Connect new career center</p>
              </button>

              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-2xl text-left hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
                <FileText className="h-8 w-8 text-white mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Generate Report</h3>
                <p className="text-blue-100 text-sm">Create safety analytics report</p>
              </button>

              <button className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-left hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
                <Download className="h-8 w-8 text-white mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Export Data</h3>
                <p className="text-green-100 text-sm">Download all analytics</p>
              </button>
            </div>

            {/* Recent Alerts */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Recent Security Alerts</h2>
                <button className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                  View All Alerts
                </button>
              </div>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-semibold">{alert.type}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>{alert.center}</span>
                        <span>•</span>
                        <span>{alert.timestamp}</span>
                        <span>•</span>
                        <span>{alert.status}</span>
                      </div>
                    </div>
                    <button className="text-purple-400 hover:text-purple-300 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'centers' && (
          <div className="space-y-8">
            {/* Career Centers Overview */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Career Centers</h2>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    <Plus className="h-4 w-4 inline mr-2" />
                    Add Center
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Center Name</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Students</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Active Jobs</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Alerts Today</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Safety Score</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Status</th>
                      <th className="text-left text-gray-400 font-medium py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careerCenters.map((center) => (
                      <tr key={center.id} className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="text-white font-semibold">{center.name}</div>
                        </td>
                        <td className="py-4 px-6 text-gray-300">{center.students.toLocaleString()}</td>
                        <td className="py-4 px-6 text-gray-300">{center.activeJobs}</td>
                        <td className="py-4 px-6">
                          <span className={`${center.alertsToday > 10 ? 'text-red-400' : center.alertsToday > 5 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {center.alertsToday}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-green-400 font-semibold">{center.safetyScore}%</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(center.status)}`}>
                            {center.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-purple-400 hover:text-purple-300 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-8">
            {/* Monthly Reports */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Monthly Safety Reports</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Generate New Report
                </button>
              </div>
              
              <div className="space-y-4">
                {monthlyReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">{report.month}</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Threats Blocked: </span>
                          <span className="text-red-400 font-medium">{report.totalThreats}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Students Protected: </span>
                          <span className="text-green-400 font-medium">{report.studentsProtected.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Safety Score: </span>
                          <span className="text-purple-400 font-medium">{report.safetyScore}%</span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-8">
            {/* API Integrations */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">API Integrations</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Add Integration
                </button>
              </div>
              
              <div className="space-y-4">
                {apiIntegrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">{integration.name}</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Status: </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                            {integration.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Last Sync: </span>
                          <span className="text-gray-300">{integration.lastSync}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Jobs Processed: </span>
                          <span className="text-white font-medium">{integration.jobsProcessed.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        Configure
                      </button>
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Guide */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Integration Guide</h3>
              <p className="text-blue-300 text-sm mb-4">
                Connect your existing job boards and career platforms to HireSafe AI for comprehensive protection.
              </p>
              <ul className="text-blue-300 text-sm space-y-2">
                <li>• Real-time job posting analysis</li>
                <li>• Automatic threat detection</li>
                <li>• Seamless data synchronization</li>
                <li>• Custom API endpoints available</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};