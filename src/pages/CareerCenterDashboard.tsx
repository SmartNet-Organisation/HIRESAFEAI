import React, { useState } from 'react';
import { Zap, Users, TrendingUp, AlertTriangle, Shield, FileText, Settings, Download, Plus, Eye, Filter, Calendar } from 'lucide-react';

interface CareerCenterDashboardProps {
  onNavigate: (page: string) => void;
  userName: string;
}

export const CareerCenterDashboard: React.FC<CareerCenterDashboardProps> = ({ onNavigate, userName }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');

  const stats = [
    {
      title: 'Active Students',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Scams Prevented',
      value: '156',
      change: '+23%',
      icon: Shield,
      color: 'from-red-500 to-rose-500'
    },
    {
      title: 'Jobs Verified',
      value: '1,234',
      change: '+8%',
      icon: FileText,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Safety Score',
      value: '94%',
      change: '+3%',
      icon: TrendingUp,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      student: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      jobTitle: 'Software Engineer Intern',
      riskLevel: 'High',
      timestamp: '2 hours ago',
      status: 'Under Review'
    },
    {
      id: 2,
      student: 'Michael Chen',
      company: 'Digital Marketing Pro',
      jobTitle: 'Marketing Assistant',
      riskLevel: 'Medium',
      timestamp: '4 hours ago',
      status: 'Resolved'
    },
    {
      id: 3,
      student: 'Emily Davis',
      company: 'StartupXYZ',
      jobTitle: 'Data Analyst',
      riskLevel: 'Low',
      timestamp: '1 day ago',
      status: 'Safe'
    }
  ];

  const topThreats = [
    {
      type: 'Fake Internship Postings',
      count: 23,
      trend: '+15%',
      severity: 'High'
    },
    {
      type: 'Phishing Emails',
      count: 18,
      trend: '+8%',
      severity: 'Medium'
    },
    {
      type: 'Unverified Recruiters',
      count: 12,
      trend: '-5%',
      severity: 'Medium'
    },
    {
      type: 'Payment Scams',
      count: 7,
      trend: '+12%',
      severity: 'High'
    }
  ];

  const studentActivity = [
    {
      name: 'Sarah Johnson',
      department: 'Computer Science',
      lastActive: '2 hours ago',
      jobsScanned: 45,
      alertsReceived: 3,
      status: 'Active'
    },
    {
      name: 'Michael Chen',
      department: 'Business',
      lastActive: '1 day ago',
      jobsScanned: 32,
      alertsReceived: 1,
      status: 'Active'
    },
    {
      name: 'Emily Davis',
      department: 'Data Science',
      lastActive: '3 days ago',
      jobsScanned: 28,
      alertsReceived: 2,
      status: 'Inactive'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
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
                <span className="text-purple-400 text-sm ml-2">Career Center Portal</span>
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
          <h1 className="text-3xl font-bold text-white mb-2">Career Center Dashboard</h1>
          <p className="text-gray-400">Monitor student safety and job market threats in real-time</p>
        </div>

        {/* Time Filter */}
        <div className="mb-8 flex items-center space-x-4">
          <span className="text-gray-400">Time Period:</span>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
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
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl text-left hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            <Plus className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Add Students</h3>
            <p className="text-purple-100 text-sm">Bulk import student accounts</p>
          </button>

          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-2xl text-left hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
            <FileText className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Safety Report</h3>
            <p className="text-blue-100 text-sm">Generate monthly safety report</p>
          </button>

          <button className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-left hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
            <Shield className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">API Integration</h3>
            <p className="text-green-100 text-sm">Manage job feed integrations</p>
          </button>

          <button className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 rounded-2xl text-left hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105">
            <Download className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Export Data</h3>
            <p className="text-yellow-100 text-sm">Download analytics data</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Security Alerts */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Security Alerts</h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white font-semibold">{alert.student}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(alert.riskLevel)}`}>
                        {alert.riskLevel}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{alert.jobTitle} at {alert.company}</p>
                    <p className="text-gray-500 text-xs">{alert.timestamp}</p>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Top Threats */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Top Threats This Month</h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                View Details
              </button>
            </div>
            <div className="space-y-4">
              {topThreats.map((threat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{threat.type}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-400">{threat.count} incidents</span>
                      <span className={`${threat.trend.startsWith('+') ? 'text-red-400' : 'text-green-400'}`}>
                        {threat.trend}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(threat.severity)}`}>
                    {threat.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Student Activity Overview */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Student Activity Overview</h2>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              <button className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                View All Students
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 font-medium py-3">Student</th>
                  <th className="text-left text-gray-400 font-medium py-3">Department</th>
                  <th className="text-left text-gray-400 font-medium py-3">Last Active</th>
                  <th className="text-left text-gray-400 font-medium py-3">Jobs Scanned</th>
                  <th className="text-left text-gray-400 font-medium py-3">Alerts</th>
                  <th className="text-left text-gray-400 font-medium py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {studentActivity.map((student, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="py-4">
                      <div className="text-white font-medium">{student.name}</div>
                    </td>
                    <td className="py-4 text-gray-300">{student.department}</td>
                    <td className="py-4 text-gray-400">{student.lastActive}</td>
                    <td className="py-4 text-white">{student.jobsScanned}</td>
                    <td className="py-4">
                      <span className={`${student.alertsReceived > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {student.alertsReceived}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};