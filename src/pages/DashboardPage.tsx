import React from 'react';
import { Zap, Shield, TrendingUp, AlertTriangle, Users, CheckCircle } from 'lucide-react';

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
      severity: 'high'
    },
    {
      type: 'Medium Risk',
      title: 'Unverified Recruiter Contact',
      company: 'Global Innovations',
      time: '5 hours ago',
      severity: 'medium'
    },
    {
      type: 'Low Risk',
      title: 'Company Profile Incomplete',
      company: 'StartupXYZ',
      time: '1 day ago',
      severity: 'low'
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
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
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

        {/* Recent Alerts */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Recent Security Alerts</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl text-left hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
            <Shield className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Scan New Job</h3>
            <p className="text-purple-100 text-sm">Check a job posting for potential scams</p>
          </button>

          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-2xl text-left hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
            <Users className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Verify Recruiter</h3>
            <p className="text-blue-100 text-sm">Check recruiter credentials and history</p>
          </button>

          <button className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-left hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
            <TrendingUp className="h-8 w-8 text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">View Reports</h3>
            <p className="text-green-100 text-sm">Access detailed security analytics</p>
          </button>
        </div>
      </main>
    </div>
  );
};