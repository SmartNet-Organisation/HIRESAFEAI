import React, { useState } from 'react';
import { Zap, ArrowLeft, CreditCard, Download, Calendar, CheckCircle, AlertTriangle, Edit, Trash2, Plus } from 'lucide-react';

interface BillingPageProps {
  onNavigate: (page: string) => void;
}

export const BillingPage: React.FC<BillingPageProps> = ({ onNavigate }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const currentSubscription = {
    plan: 'Individual Premium',
    status: 'Active',
    nextBilling: '2024-01-15',
    amount: '$7.00',
    cycle: 'Monthly',
    renewalDate: 'January 15, 2024'
  };

  const paymentMethods = [
    {
      id: '1',
      type: 'Visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: '2',
      type: 'Mastercard',
      last4: '8888',
      expiry: '09/25',
      isDefault: false
    }
  ];

  const invoices = [
    {
      id: 'INV-2024-001',
      date: '2023-12-15',
      amount: '$7.00',
      status: 'Paid',
      plan: 'Individual Premium',
      period: 'Dec 15, 2023 - Jan 15, 2024'
    },
    {
      id: 'INV-2023-012',
      date: '2023-11-15',
      amount: '$7.00',
      status: 'Paid',
      plan: 'Individual Premium',
      period: 'Nov 15, 2023 - Dec 15, 2023'
    },
    {
      id: 'INV-2023-011',
      date: '2023-10-15',
      amount: '$7.00',
      status: 'Paid',
      plan: 'Individual Premium',
      period: 'Oct 15, 2023 - Nov 15, 2023'
    },
    {
      id: 'INV-2023-010',
      date: '2023-09-15',
      amount: '$7.00',
      status: 'Paid',
      plan: 'Individual Premium',
      period: 'Sep 15, 2023 - Oct 15, 2023'
    },
    {
      id: 'INV-2023-009',
      date: '2023-08-15',
      amount: '$0.00',
      status: 'Paid',
      plan: 'Free Trial',
      period: 'Aug 1, 2023 - Aug 15, 2023'
    }
  ];

  const usageStats = {
    jobsScanned: 1247,
    scamsDetected: 23,
    reportsGenerated: 156,
    apiCalls: 8934
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'paid': return 'text-green-400 bg-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const handleCancelSubscription = () => {
    console.log('Subscription cancelled');
    setShowCancelModal(false);
  };

  const handleAddPaymentMethod = () => {
    console.log('Add payment method');
    setShowAddCardModal(false);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Download invoice:', invoiceId);
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
              onClick={() => onNavigate('pricing')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Plans
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Payments</h1>
          <p className="text-gray-400">Manage your subscription, payment methods, and billing history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Subscription */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Current Subscription</h2>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-purple-400">{currentSubscription.plan}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentSubscription.status)}`}>
                      {currentSubscription.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Change Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <div className="text-2xl font-bold text-white mb-1">{currentSubscription.amount}</div>
                  <div className="text-gray-400 text-sm">{currentSubscription.cycle}</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <div className="text-2xl font-bold text-white mb-1">{currentSubscription.nextBilling}</div>
                  <div className="text-gray-400 text-sm">Next Billing</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <div className="text-2xl font-bold text-green-400 mb-1">Auto-Renew</div>
                  <div className="text-gray-400 text-sm">Enabled</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-blue-300 text-sm">
                  Your subscription will automatically renew on {currentSubscription.renewalDate} for {currentSubscription.amount}.
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Payment Methods</h2>
                <button
                  onClick={() => setShowAddCardModal(true)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Card</span>
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-500/20 p-3 rounded-lg">
                        <CreditCard className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-semibold">{method.type} •••• {method.last4}</span>
                          {method.isDefault && (
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Default</span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">Expires {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6">Billing History</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-400 font-medium py-3">Invoice</th>
                      <th className="text-left text-gray-400 font-medium py-3">Date</th>
                      <th className="text-left text-gray-400 font-medium py-3">Amount</th>
                      <th className="text-left text-gray-400 font-medium py-3">Status</th>
                      <th className="text-left text-gray-400 font-medium py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-800">
                        <td className="py-4">
                          <div>
                            <div className="text-white font-medium">{invoice.id}</div>
                            <div className="text-gray-400 text-sm">{invoice.plan}</div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-white">{new Date(invoice.date).toLocaleDateString()}</div>
                          <div className="text-gray-400 text-sm">{invoice.period}</div>
                        </td>
                        <td className="py-4 text-white font-medium">{invoice.amount}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <button
                            onClick={() => handleDownloadInvoice(invoice.id)}
                            className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            <span className="text-sm">Download</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Stats */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">This Month's Usage</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Jobs Scanned</span>
                  <span className="text-white font-semibold">{usageStats.jobsScanned.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Scams Detected</span>
                  <span className="text-red-400 font-semibold">{usageStats.scamsDetected}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Reports Generated</span>
                  <span className="text-white font-semibold">{usageStats.reportsGenerated}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">API Calls</span>
                  <span className="text-white font-semibold">{usageStats.apiCalls.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('pricing')}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Upgrade Plan
                </button>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Update Billing Info
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Download All Invoices
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
              <p className="text-blue-300 text-sm mb-4">
                Our billing support team is here to help with any questions about your subscription.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="bg-red-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cancel Subscription</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 max-w-md w-full mx-4">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Add Payment Method</h3>
              <p className="text-gray-400">Add a new credit or debit card to your account</p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="default" className="rounded" />
                <label htmlFor="default" className="text-gray-300 text-sm">Set as default payment method</label>
              </div>
            </form>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowAddCardModal(false)}
                className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPaymentMethod}
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};