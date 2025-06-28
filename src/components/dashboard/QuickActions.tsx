import React from 'react';
import { Search, FileText, Building, Phone } from 'lucide-react';
import { NavigationProps } from '../../types';

export const QuickActions: React.FC<NavigationProps> = ({ onNavigate }) => {
  const actions = [
    {
      title: 'Quick Scan',
      description: 'Analyze a job posting instantly',
      icon: Search,
      color: 'from-purple-600 to-pink-600',
      onClick: () => onNavigate('job-analysis')
    },
    {
      title: 'View Reports',
      description: 'Check your scam report history',
      icon: FileText,
      color: 'from-blue-600 to-cyan-600',
      onClick: () => onNavigate('scam-reports')
    },
    {
      title: 'Company Check',
      description: 'Verify company credentials',
      icon: Building,
      color: 'from-green-600 to-emerald-600',
      onClick: () => onNavigate('company-insights')
    },
    {
      title: 'Emergency',
      description: 'Safety alert system',
      icon: Phone,
      color: 'from-red-600 to-rose-600',
      onClick: () => onNavigate('emergency-safety')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={`bg-gradient-to-r ${action.color} p-6 rounded-2xl text-left hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
        >
          <action.icon className="h-8 w-8 text-white mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">{action.title}</h3>
          <p className="text-white/80 text-sm">{action.description}</p>
        </button>
      ))}
    </div>
  );
};