import React, { useState } from 'react';
import { Zap, ArrowLeft, User, Mail, Calendar, Crown, Award, Star, Camera, Edit3, Save, X } from 'lucide-react';

interface UserProfilePageProps {
  onNavigate: (page: string) => void;
  userName: string;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ onNavigate, userName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userName,
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate software engineer with 5+ years of experience in full-stack development.',
    joinDate: '2023-01-15',
    userType: 'Job Seeker',
    subscription: 'Individual Premium'
  });

  const [editData, setEditData] = useState(profileData);

  const achievements = [
    {
      id: 1,
      title: 'Scam Hunter',
      description: 'Reported 10+ confirmed scams',
      icon: Award,
      color: 'from-yellow-500 to-orange-500',
      earned: true,
      date: '2023-09-15'
    },
    {
      id: 2,
      title: 'Safety Guardian',
      description: 'Helped protect 50+ job seekers',
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      earned: true,
      date: '2023-10-20'
    },
    {
      id: 3,
      title: 'Community Hero',
      description: 'Top contributor in community reports',
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      earned: false,
      progress: 75
    },
    {
      id: 4,
      title: 'Verification Expert',
      description: 'Verified 25+ company profiles',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      earned: false,
      progress: 40
    }
  ];

  const stats = [
    { label: 'Jobs Scanned', value: '1,247', icon: User },
    { label: 'Scams Detected', value: '23', icon: Award },
    { label: 'Community Points', value: '2,850', icon: Star },
    { label: 'Days Protected', value: '287', icon: Calendar }
  ];

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

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
            <button
              onClick={() => onNavigate('settings')}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">User Profile</h1>
          <p className="text-gray-400">Manage your account information and view achievements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                      <Camera className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{profileData.name}</h2>
                    <p className="text-purple-400 mb-2">{profileData.userType}</p>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span>Member since {new Date(profileData.joinDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="text-green-400">{profileData.subscription}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-white bg-gray-800/50 px-4 py-2 rounded-lg">{profileData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-white bg-gray-800/50 px-4 py-2 rounded-lg">{profileData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-white bg-gray-800/50 px-4 py-2 rounded-lg">{profileData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-white bg-gray-800/50 px-4 py-2 rounded-lg">{profileData.location}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  ) : (
                    <p className="text-white bg-gray-800/50 px-4 py-2 rounded-lg">{profileData.bio}</p>
                  )}
                </div>
              </div>

              {/* Save/Cancel Buttons */}
              {isEditing && (
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-6">Achievements & Badges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      achievement.earned
                        ? 'border-purple-500/50 bg-purple-500/10'
                        : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`bg-gradient-to-r ${achievement.color} p-3 rounded-xl ${
                        !achievement.earned ? 'opacity-50' : ''
                      }`}>
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold mb-1 ${
                          achievement.earned ? 'text-white' : 'text-gray-400'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                        {achievement.earned ? (
                          <span className="text-green-400 text-xs">
                            Earned on {new Date(achievement.date!).toLocaleDateString()}
                          </span>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-gray-400">{achievement.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full bg-gradient-to-r ${achievement.color}`}
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Your Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <stat.icon className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{stat.label}</span>
                    </div>
                    <span className="text-white font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Status */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Crown className="h-6 w-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Premium Member</h3>
              </div>
              <p className="text-purple-300 text-sm mb-4">
                You're enjoying full protection with unlimited scam detection and priority support.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Manage Subscription
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('job-analysis')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Quick Job Scan
              </button>
              <button
                onClick={() => onNavigate('scam-reports')}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                View Reports
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Account Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};