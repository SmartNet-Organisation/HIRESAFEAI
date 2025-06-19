import React, { useState } from 'react';
import { Zap, ArrowLeft, Phone, Users, MapPin, AlertTriangle, Plus, Trash2, CheckCircle } from 'lucide-react';

interface EmergencySafetyPageProps {
  onNavigate: (page: string) => void;
}

export const EmergencySafetyPage: React.FC<EmergencySafetyPageProps> = ({ onNavigate }) => {
  const [trustedContacts, setTrustedContacts] = useState([
    { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', relationship: 'Family' },
    { id: 2, name: 'Jane Smith', phone: '+1 (555) 987-6543', relationship: 'Friend' }
  ]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  const [location, setLocation] = useState('');

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setTrustedContacts([
        ...trustedContacts,
        { ...newContact, id: Date.now() }
      ]);
      setNewContact({ name: '', phone: '', relationship: '' });
      setIsAddingContact(false);
    }
  };

  const handleRemoveContact = (id: number) => {
    setTrustedContacts(trustedContacts.filter(contact => contact.id !== id));
  };

  const handleTriggerEmergency = () => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setEmergencyTriggered(true);
          
          // Simulate sending emergency alerts
          setTimeout(() => {
            setEmergencyTriggered(false);
          }, 5000);
        },
        () => {
          setLocation('Location unavailable');
          setEmergencyTriggered(true);
          setTimeout(() => {
            setEmergencyTriggered(false);
          }, 5000);
        }
      );
    } else {
      setLocation('Location not supported');
      setEmergencyTriggered(true);
      setTimeout(() => {
        setEmergencyTriggered(false);
      }, 5000);
    }
  };

  if (emergencyTriggered) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-red-500/20 border border-red-500/30 rounded-2xl p-8 text-center">
          <div className="bg-red-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 animate-pulse">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Emergency Alert Sent!</h2>
          <p className="text-red-300 mb-6">
            Your trusted contacts have been notified with your location and emergency status.
          </p>
          {location && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-red-300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Location: {location}</span>
              </div>
            </div>
          )}
          <div className="space-y-2 text-red-300 text-sm">
            <p>✓ Emergency contacts notified</p>
            <p>✓ Location shared</p>
            <p>✓ Timestamp recorded</p>
          </div>
        </div>
      </div>
    );
  }

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Emergency Safety Alert</h1>
          <p className="text-gray-400">Set up trusted contacts and emergency alert system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trusted Contacts */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Trusted Contacts</h2>
              <button
                onClick={() => setIsAddingContact(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Contact</span>
              </button>
            </div>

            {/* Add Contact Form */}
            {isAddingContact && (
              <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Add New Contact</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <select
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Relationship</option>
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddContact}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Contact
                    </button>
                    <button
                      onClick={() => setIsAddingContact(false)}
                      className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Contacts List */}
            <div className="space-y-4">
              {trustedContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{contact.name}</h4>
                      <p className="text-gray-400 text-sm">{contact.phone}</p>
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {contact.relationship}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {trustedContacts.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No trusted contacts added yet</p>
                <p className="text-gray-500 text-sm">Add contacts who should be notified in emergencies</p>
              </div>
            )}
          </div>

          {/* Emergency Alert */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Emergency Alert System</h2>
            
            {/* Alert Information */}
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <h3 className="text-red-400 font-semibold mb-3">⚠️ When to Use Emergency Alert</h3>
              <ul className="text-red-300 text-sm space-y-2">
                <li>• You feel unsafe during a job interview</li>
                <li>• Suspicious or threatening behavior from recruiters</li>
                <li>• You're being asked to meet in unsafe locations</li>
                <li>• Any situation where you feel threatened</li>
              </ul>
            </div>

            {/* What Happens */}
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <h3 className="text-blue-400 font-semibold mb-3">📱 What Happens When Triggered</h3>
              <ul className="text-blue-300 text-sm space-y-2">
                <li>• Instant SMS/call to all trusted contacts</li>
                <li>• Your current location is shared</li>
                <li>• Timestamp and alert reason recorded</li>
                <li>• Optional: Authorities can be contacted</li>
              </ul>
            </div>

            {/* Emergency Button */}
            <div className="text-center">
              <button
                onClick={handleTriggerEmergency}
                disabled={trustedContacts.length === 0}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none"
              >
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6" />
                  <span className="text-lg">TRIGGER EMERGENCY ALERT</span>
                </div>
              </button>
              
              {trustedContacts.length === 0 && (
                <p className="text-gray-500 text-sm mt-3">
                  Add trusted contacts to enable emergency alerts
                </p>
              )}
            </div>

            {/* Safety Tips */}
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <h3 className="text-green-400 font-semibold mb-3">🛡️ Safety Tips</h3>
              <ul className="text-green-300 text-sm space-y-1">
                <li>• Always meet in public places</li>
                <li>• Tell someone about your interviews</li>
                <li>• Trust your instincts</li>
                <li>• Keep your phone charged</li>
                <li>• Have an exit strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};