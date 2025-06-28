// HireSafe AI Extension Popup Script

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Popup loaded');
  
  // Load stats from storage
  await loadStats();
  
  // Setup event listeners
  setupEventListeners();
  
  // Load recent scans
  loadRecentScans();
});

async function loadStats() {
  try {
    const stats = await chrome.storage.sync.get(['scansToday', 'threatsBlocked']);
    
    document.getElementById('scans-today').textContent = stats.scansToday || 0;
    document.getElementById('threats-blocked').textContent = stats.threatsBlocked || 0;
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

function setupEventListeners() {
  // Scan current page button
  document.getElementById('scan-current').addEventListener('click', async () => {
    const button = document.getElementById('scan-current');
    const loading = document.getElementById('loading');
    
    try {
      // Show loading state
      button.style.display = 'none';
      loading.style.display = 'block';
      
      // Get current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Send scan message to content script
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'scanPage' });
      
      if (response && response.success) {
        // Update stats
        await loadStats();
        showNotification('Page scanned successfully!', 'success');
      } else {
        showNotification('Failed to scan page. Make sure you\'re on a job site.', 'error');
      }
    } catch (error) {
      console.error('Scan error:', error);
      showNotification('Error scanning page. Please try again.', 'error');
    } finally {
      // Hide loading state
      loading.style.display = 'none';
      button.style.display = 'flex';
    }
  });
  
  // Open dashboard button
  document.getElementById('open-dashboard').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') });
  });
  
  // Toggle switches
  document.getElementById('auto-scan-toggle').addEventListener('click', async (e) => {
    const toggle = e.currentTarget;
    const isActive = toggle.classList.contains('active');
    
    if (isActive) {
      toggle.classList.remove('active');
      await chrome.storage.sync.set({ autoScan: false });
    } else {
      toggle.classList.add('active');
      await chrome.storage.sync.set({ autoScan: true });
    }
  });
  
  document.getElementById('notifications-toggle').addEventListener('click', async (e) => {
    const toggle = e.currentTarget;
    const isActive = toggle.classList.contains('active');
    
    if (isActive) {
      toggle.classList.remove('active');
      await chrome.storage.sync.set({ notifications: false });
    } else {
      toggle.classList.add('active');
      await chrome.storage.sync.set({ notifications: true });
    }
  });
}

async function loadRecentScans() {
  try {
    const data = await chrome.storage.local.get(['recentScans']);
    const recentScans = data.recentScans || [];
    const container = document.getElementById('recent-scans-list');
    
    if (recentScans.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; opacity: 0.6; font-size: 12px; padding: 20px;">
          No recent scans
        </div>
      `;
      return;
    }
    
    container.innerHTML = recentScans.slice(0, 3).map(scan => `
      <div class="scan-item">
        <div class="scan-title">${scan.title}</div>
        <div class="scan-meta">
          <span>${scan.company}</span>
          <span class="risk-badge risk-${scan.riskLevel}">${scan.riskLevel} risk</span>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading recent scans:', error);
  }
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Load settings on popup open
chrome.storage.sync.get(['autoScan', 'notifications'], (result) => {
  if (result.autoScan !== false) {
    document.getElementById('auto-scan-toggle').classList.add('active');
  }
  if (result.notifications !== false) {
    document.getElementById('notifications-toggle').classList.add('active');
  }
});