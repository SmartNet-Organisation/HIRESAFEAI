// Popup script for HireSafe AI Extension
console.log('HireSafe AI Popup Loaded');

class PopupController {
  constructor() {
    this.settings = {};
    this.stats = { jobsScanned: 0, threatsBlocked: 0 };
    this.init();
  }

  async init() {
    await this.loadSettings();
    await this.loadStats();
    this.setupEventListeners();
    this.updateUI();
    this.loadRecentActivity();
  }

  async loadSettings() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
        if (response && response.success) {
          this.settings = response.data;
        } else {
          this.settings = {
            isEnabled: true,
            autoScan: true,
            notifications: true,
            alertLevel: 'medium'
          };
        }
        resolve();
      });
    });
  }

  async loadStats() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['analysisHistory', 'scamReports'], (data) => {
        const history = data.analysisHistory || [];
        const reports = data.scamReports || [];
        
        this.stats.jobsScanned = history.length;
        this.stats.threatsBlocked = history.filter(item => 
          item.analysis && item.analysis.riskLevel === 'High'
        ).length + reports.length;
        
        resolve();
      });
    });
  }

  setupEventListeners() {
    // Toggle switches
    document.getElementById('enableToggle').addEventListener('click', () => {
      this.toggleSetting('isEnabled');
    });

    document.getElementById('autoScanToggle').addEventListener('click', () => {
      this.toggleSetting('autoScan');
    });

    document.getElementById('notificationsToggle').addEventListener('click', () => {
      this.toggleSetting('notifications');
    });

    // Action buttons
    document.getElementById('scanPageBtn').addEventListener('click', () => {
      this.scanCurrentPage();
    });

    document.getElementById('viewDashboardBtn').addEventListener('click', () => {
      this.openDashboard();
    });

    document.getElementById('openDashboard').addEventListener('click', () => {
      this.openDashboard();
    });
  }

  toggleSetting(setting) {
    this.settings[setting] = !this.settings[setting];
    
    // Update storage
    chrome.runtime.sendMessage({
      action: 'updateSettings',
      data: this.settings
    }, (response) => {
      if (response && response.success) {
        this.updateUI();
      }
    });
  }

  updateUI() {
    // Update status
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    
    if (this.settings.isEnabled) {
      statusIndicator.classList.remove('disabled');
      statusText.textContent = 'Active - Protecting your job search';
    } else {
      statusIndicator.classList.add('disabled');
      statusText.textContent = 'Disabled - Click to enable protection';
    }

    // Update toggles
    this.updateToggle('enableToggle', this.settings.isEnabled);
    this.updateToggle('autoScanToggle', this.settings.autoScan);
    this.updateToggle('notificationsToggle', this.settings.notifications);

    // Update stats
    document.getElementById('jobsScanned').textContent = this.stats.jobsScanned;
    document.getElementById('threatsBlocked').textContent = this.stats.threatsBlocked;
  }

  updateToggle(toggleId, isActive) {
    const toggle = document.getElementById(toggleId);
    if (isActive) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
  }

  async scanCurrentPage() {
    const button = document.getElementById('scanPageBtn');
    const originalText = button.textContent;
    
    button.textContent = 'Scanning...';
    button.disabled = true;

    try {
      // Get current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Inject content script to scan page
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          // Trigger a manual scan
          if (window.jobBoardAnalyzer) {
            window.jobBoardAnalyzer.scanExistingJobs();
          }
        }
      });

      // Show success message
      this.showMessage('Page scan initiated!', 'success');
      
    } catch (error) {
      console.error('Error scanning page:', error);
      this.showMessage('Failed to scan page', 'error');
    } finally {
      button.textContent = originalText;
      button.disabled = false;
    }
  }

  openDashboard() {
    chrome.tabs.create({
      url: chrome.runtime.getURL('index.html')
    });
    window.close();
  }

  async loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    
    chrome.storage.local.get(['analysisHistory'], (data) => {
      const history = data.analysisHistory || [];
      
      if (history.length === 0) {
        activityList.innerHTML = `
          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            No recent activity.<br>
            Visit job sites to start scanning!
          </div>
        `;
        return;
      }

      // Show last 5 activities
      const recentActivities = history.slice(0, 5);
      
      activityList.innerHTML = recentActivities.map(activity => {
        const riskLevel = activity.analysis?.riskLevel || 'Low';
        const riskClass = riskLevel.toLowerCase() + '-risk';
        const riskIcon = riskLevel === 'High' ? '🚨' : 
                        riskLevel === 'Medium' ? '⚠️' : '✅';
        
        const timeAgo = this.getTimeAgo(new Date(activity.timestamp));
        
        return `
          <div class="activity-item">
            <div class="activity-icon ${riskClass}">
              ${riskIcon}
            </div>
            <div class="activity-content">
              <div class="activity-text">
                ${activity.jobData?.title || 'Job'} at ${activity.jobData?.company || 'Unknown Company'}
              </div>
              <div class="activity-time">${timeAgo} • ${activity.domain}</div>
            </div>
          </div>
        `;
      }).join('');
    });
  }

  getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }

  showMessage(text, type = 'info') {
    // Create temporary message element
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      right: 10px;
      padding: 12px;
      border-radius: 8px;
      color: white;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      z-index: 1000;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
    `;
    
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
      if (document.body.contains(message)) {
        document.body.removeChild(message);
      }
    }, 3000);
  }
}

// Initialize popup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});