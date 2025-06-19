import React, { useState } from 'react';
import { Zap, ArrowRight, ArrowLeft, Bell, Mail, Smartphone, Monitor, CheckCircle } from 'lucide-react';

interface OnboardingNotificationsProps {
  onComplete: () => void;
  onBack: () => void;
}

export const OnboardingNotifications: React.FC<OnboardingNotificationsProps> = ({ onComplete, onBack }) => {
  const [notificationChannels, setNotificationChannels] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true
  });
  const [frequency, setFrequency] = useState('immediate');
  const [quietHours, setQuietHours] = useState({
    enabled: false,
    start: '22:00',
    end: '08:00'
  });

  const channels = [
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Receive alerts via email',
      icon: Mail,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'push',
      name: 'Push Notifications',
      description: 'Browser push notifications',
      icon: Bell,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'sms',
      name: 'SMS Alerts',
      description: 'Text message notifications',
      icon: Smartphone,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'desktop',
      name: 'Desktop Notifications',
      description: 'System desktop alerts',
      icon: Monitor,
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const frequencies = [
    { id: 'immediate', name: 'Immediate', description: 'Get notified instantly' },
    { id: 'hourly', name: 'Hourly Digest', description: 'Summary every hour' },
    { id: 'daily', name: 'Daily Summary', description: 'Once per day summary' }
  ];

  const handleChannelToggle = (channelId: string) => {
    setNotificationChannels(prev => ({
      ...prev,
      [channelId]: !prev[channelId as keyof typeof prev]
    }));
  };

  const handleComplete = () => {
    // Save notification preferences
    onComplete();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HIRESAFE AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Notification</span> Preferences
          </h2>
          <p className="text-xl text-gray-400">Choose how you want to stay informed</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800">
          {/* Notification Channels */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Notification Channels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className={`p-6 rounded-2xl border transition-all duration-300 ${
                    notificationChannels[channel.id as keyof typeof notificationChannels]
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-700 bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-r ${channel.color} p-3 rounded-xl`}>
                      <channel.icon className="h-6 w-6 text-white" />
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationChannels[channel.id as keyof typeof notificationChannels]}
                        onChange={() => handleChannelToggle(channel.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{channel.name}</h4>
                  <p className="text-gray-400 text-sm">{channel.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Frequency */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Notification Frequency</h3>
            <div className="space-y-4">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => setFrequency(freq.id)}
                  className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                    frequency === freq.id
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{freq.name}</h4>
                      <p className="text-gray-400 text-sm">{freq.description}</p>
                    </div>
                    {frequency === freq.id && (
                      <CheckCircle className="h-6 w-6 text-purple-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Quiet Hours</h3>
            <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-white">Enable Quiet Hours</h4>
                  <p className="text-gray-400 text-sm">Pause non-urgent notifications during specified hours</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={quietHours.enabled}
                    onChange={() => setQuietHours(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>

              {quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={quietHours.start}
                      onChange={(e) => setQuietHours(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
                    <input
                      type="time"
                      value={quietHours.end}
                      onChange={(e) => setQuietHours(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleComplete}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <div className="flex items-center space-x-2">
                <span>Complete Setup</span>
                <CheckCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
        </div>
        <p className="text-gray-500 text-sm mt-2 text-center">Step 4 of 4</p>
      </div>
    </div>
  );
};