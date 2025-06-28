import React from 'react';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, User, Settings } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { PageLayout } from '../components/layout/PageLayout';
import { StatCard } from '../components/ui/StatCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentAlerts } from '../components/dashboard/RecentAlerts';
import { DashboardProps } from '../types';

export const DashboardPage: React.FC<DashboardProps> = ({ onNavigate, userName }) => {
  const stats = [
    { title: 'Jobs Scanned', value: '1,247', change: '+12%', icon: Shield, color: 'from-blue-500 to-cyan-500' },
    { title: 'Threats Blocked', value: '23', change: '+5%', icon: AlertTriangle, color: 'from-red-500 to-rose-500' },
    { title: 'Safe Applications', value: '156', change: '+18%', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { title: 'Protection Score', value: '98%', change: '+2%', icon: TrendingUp, color: 'from-purple-500 to-indigo-500' }
  ];

  const recentAlerts = [
    { id: 1, type: 'High Risk', title: 'Suspicious Job Posting Detected', company: 'TechCorp Solutions', time: '2 hours ago', severity: 'high' },
    { id: 2, type: 'Medium Risk', title: 'Unverified Recruiter Contact', company: 'Global Innovations', time: '5 hours ago', severity: 'medium' },
    { id: 3, type: 'Low Risk', title: 'Company Profile Incomplete', company: 'StartupXYZ', time: '1 day ago', severity: 'low' }
  ];

  const headerActions = (
    <>
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
    </>
  );

  return (
    <PageLayout
      header={<PageHeader title="Dashboard" actions={headerActions} />}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Protection Dashboard</h1>
        <p className="text-gray-400">Monitor your job search security in real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <QuickActions onNavigate={onNavigate} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentAlerts 
          alerts={recentAlerts} 
          onViewAll={() => onNavigate('scam-reports')} 
        />
      </div>
    </PageLayout>
  );
};