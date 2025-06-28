import React from 'react';
import { Eye } from 'lucide-react';
import { Card } from '../ui/Card';
import { getRiskColor } from '../../utils/helpers';

interface Alert {
  id: number;
  type: string;
  title: string;
  company: string;
  time: string;
  severity: string;
}

interface RecentAlertsProps {
  alerts: Alert[];
  onViewAll: () => void;
}

export const RecentAlerts: React.FC<RecentAlertsProps> = ({ alerts, onViewAll }) => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Recent Security Alerts</h2>
        <button
          onClick={onViewAll}
          className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
        >
          View All
        </button>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300 cursor-pointer">
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
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(alert.severity)}`}>
              {alert.type}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};