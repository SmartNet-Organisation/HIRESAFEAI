// HireSafe AI Popup Script
document.addEventListener('DOMContentLoaded', function() {
  console.log('HireSafe AI Popup Loaded');
  
  // Initialize popup
  initializePopup();
  
  // Event listeners
  document.getElementById('scan-current').addEventListener('click', scanCurrentPage);
  document.getElementById('open-dashboard').addEventListener('click', openDashboard);
  document.getElementById('auto-scan-toggle').addEventListener('click', toggleAutoScan);
  document.getElementById('notifications-toggle').addEventListener('click', toggleNotifications);
  
  function initializePopup() {
    // Load settings
    chrome.storage.sync.get(['autoScan', 'notifications'], (result) => {
      updateToggle('auto-scan-toggle', result.autoScan !== false);
      updateToggle('notifications-toggle', result.notifications !== false);
    });
    
    // Load stats
    loadStats();
    
    // Load recent scans
    loadRecentScans();
  }
  
  function loadStats() {
    chrome.storage.local.get(['scanHistory'], (result) => {
      const history = result.scanHistory || [];
      const today = new Date().toDateString();
      
      // Count scans today
      const scansToday = history.filter(scan => 
        new Date(scan.timestamp).toDateString() === today
      ).length;
      
      // Count high-risk detections
      const threatsBlocked = history.filter(scan => 
        scan.analysis && scan.analysis.riskLevel === 'high'
      ).length;
      
      document.getElementById('scans-today').textContent = scansToday;
      document.getElementById('threats-blocked').textContent = threatsBlocked;
    });
  }
  
  function loadRecentScans() {
    chrome.storage.local.get(['scanHistory'], (result) => {
      const history = result.scanHistory || [];
      const recentScans = history.slice(0, 5); // Show last 5 scans
      
      const container = document.getElementById('recent-scans-list');
      
      if (recentScans.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; opacity: 0.6; font-size: 12px; padding: 20px;">
            No recent scans
          </div>
        `;
        return;
      }
      
      container.innerHTML = recentScans.map(scan => `
        <div class="scan-item">
          <div class="scan-title">${truncateText(scan.title, 40)}</div>
          <div class="scan-meta">
            <span>${formatDate(scan.timestamp)}</span>
            <span class="risk-badge risk-${scan.analysis.riskLevel}">
              ${scan.analysis.riskLevel}
            </span>
          </div>
        </div>
      `).join('');
    });
  }
  
  function scanCurrentPage() {
    const button = document.getElementById('scan-current');
    const loading = document.getElementById('loading');
    const content = document.querySelector('.content');
    
    // Show loading state
    content.style.display = 'none';
    loading.style.display = 'block';
    
    // Get current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      
      if (!currentTab) {
        showError('Unable to access current tab');
        return;
      }
      
      // Check if it's a supported site
      const supportedSites = [
        'linkedin.com', 'indeed.com', 'glassdoor.com', 
        'jobs.google.com', 'monster.com', 'ziprecruiter.com'
      ];
      
      const isSupported = supportedSites.some(site => 
        currentTab.url.includes(site)
      );
      
      if (!isSupported) {
        showError('This site is not currently supported for job scanning');
        return;
      }
      
      // Inject content script and trigger scan
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        files: ['content.js']
      }, () => {
        // Send message to content script to perform scan
        chrome.tabs.sendMessage(currentTab.id, {
          action: 'performScan'
        }, (response) => {
          // Hide loading
          loading.style.display = 'none';
          content.style.display = 'block';
          
          if (response && response.success) {
            // Refresh stats and recent scans
            loadStats();
            loadRecentScans();
            
            // Show success message
            showNotification('Scan completed successfully!');
          } else {
            showError('Failed to scan current page');
          }
        });
      });
    });
  }
  
  function openDashboard() {
    // Open the main web app in a new tab
    chrome.tabs.create({
      url: chrome.runtime.getURL('popup.html') + '?dashboard=true'
    });
  }
  
  function toggleAutoScan() {
    const toggle = document.getElementById('auto-scan-toggle');
    const isActive = toggle.classList.contains('active');
    
    updateToggle('auto-scan-toggle', !isActive);
    
    chrome.storage.sync.set({ autoScan: !isActive }, () => {
      console.log('Auto-scan setting updated:', !isActive);
    });
  }
  
  function toggleNotifications() {
    const toggle = document.getElementById('notifications-toggle');
    const isActive = toggle.classList.contains('active');
    
    updateToggle('notifications-toggle', !isActive);
    
    chrome.storage.sync.set({ notifications: !isActive }, () => {
      console.log('Notifications setting updated:', !isActive);
    });
  }
  
  function updateToggle(toggleId, isActive) {
    const toggle = document.getElementById(toggleId);
    if (isActive) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
  }
  
  function showError(message) {
    const loading = document.getElementById('loading');
    const content = document.querySelector('.content');
    
    loading.style.display = 'none';
    content.style.display = 'block';
    
    // Show error notification
    showNotification(message, 'error');
  }
  
  function showNotification(message, type = 'info') {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      right: 10px;
      background: ${type === 'error' ? '#ef4444' : '#10b981'};
      color: white;
      padding: 12px;
      border-radius: 8px;
      font-size: 12px;
      z-index: 1000;
      animation: slideDown 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  }
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);