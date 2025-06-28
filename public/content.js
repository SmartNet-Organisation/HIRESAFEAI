// HireSafe AI Content Script - Runs on job sites

console.log('🛡️ HireSafe AI Content Script Loaded');

// Configuration for different job sites
const JOB_SITES = {
  'linkedin.com': {
    selectors: {
      title: '.job-details-jobs-unified-top-card__job-title, .jobs-unified-top-card__job-title',
      company: '.job-details-jobs-unified-top-card__company-name, .jobs-unified-top-card__company-name',
      description: '.jobs-description-content__text, .jobs-box__html-content',
      salary: '.job-details-jobs-unified-top-card__job-insight'
    }
  },
  'indeed.com': {
    selectors: {
      title: '[data-jk] h1, .jobsearch-JobInfoHeader-title',
      company: '[data-jk] .icl-u-lg-mr--sm, .jobsearch-CompanyInfoContainer',
      description: '.jobsearch-jobDescriptionText, #jobDescriptionText',
      salary: '.icl-u-xs-mr--xs'
    }
  },
  'glassdoor.com': {
    selectors: {
      title: '.job-title, [data-test="job-title"]',
      company: '.employer-name, [data-test="employer-name"]',
      description: '.job-description, [data-test="job-description"]',
      salary: '.salary-estimate'
    }
  }
};

let scanButton = null;
let statusDisplay = null;
let isScanning = false;

// Initialize the extension
function init() {
  const hostname = window.location.hostname;
  const isJobSite = Object.keys(JOB_SITES).some(site => hostname.includes(site));
  
  if (isJobSite) {
    console.log('🎯 Job site detected:', hostname);
    createScanButton();
    setupAutoScan();
  }
}

// Create the floating scan button
function createScanButton() {
  if (scanButton) return;
  
  scanButton = document.createElement('button');
  scanButton.id = 'hiresafe-scan-btn';
  scanButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
    </svg>
    Scan Job
  `;
  
  // Styling
  Object.assign(scanButton.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '2147483647',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease'
  });
  
  scanButton.addEventListener('click', handleScanClick);
  document.body.appendChild(scanButton);
}

// Handle scan button click
async function handleScanClick() {
  if (isScanning) return;
  
  isScanning = true;
  updateScanButton('Scanning...', true);
  
  try {
    const jobData = extractJobData();
    
    if (!jobData.title && !jobData.description) {
      showStatus('No job posting found on this page', 'warning');
      return;
    }
    
    // Send to background script for analysis
    const response = await new Promise((resolve) => {
      chrome.runtime.sendMessage({
        action: 'scanJobPosting',
        data: jobData
      }, resolve);
    });
    
    if (response.success) {
      displayScanResults(response);
    } else {
      showStatus('Scan failed: ' + response.error, 'error');
    }
    
  } catch (error) {
    console.error('Scan error:', error);
    showStatus('Scan failed. Please try again.', 'error');
  } finally {
    isScanning = false;
    updateScanButton('Scan Job', false);
  }
}

// Extract job data from the page
function extractJobData() {
  const hostname = window.location.hostname;
  const siteConfig = Object.entries(JOB_SITES).find(([site]) => hostname.includes(site))?.[1];
  
  if (!siteConfig) {
    // Generic extraction for unknown sites
    return {
      title: document.title,
      company: '',
      description: document.body.innerText.slice(0, 1000),
      salary: '',
      url: window.location.href
    };
  }
  
  const { selectors } = siteConfig;
  
  return {
    title: getTextFromSelector(selectors.title),
    company: getTextFromSelector(selectors.company),
    description: getTextFromSelector(selectors.description),
    salary: getTextFromSelector(selectors.salary),
    url: window.location.href
  };
}

function getTextFromSelector(selector) {
  const element = document.querySelector(selector);
  return element ? element.innerText.trim() : '';
}

// Display scan results
function displayScanResults(results) {
  const { riskLevel, riskScore, flags } = results;
  
  let statusColor, statusText, statusIcon;
  
  switch (riskLevel) {
    case 'high':
      statusColor = '#ef4444';
      statusText = 'High Risk - Potential Scam';
      statusIcon = '⚠️';
      break;
    case 'medium':
      statusColor = '#f59e0b';
      statusText = 'Medium Risk - Be Cautious';
      statusIcon = '⚡';
      break;
    default:
      statusColor = '#10b981';
      statusText = 'Low Risk - Looks Safe';
      statusIcon = '✅';
  }
  
  const flagsText = flags.length > 0 ? 
    `\n\nRed flags detected:\n• ${flags.join('\n• ')}` : 
    '\n\nNo major red flags detected.';
  
  showStatus(
    `${statusIcon} ${statusText}\nRisk Score: ${riskScore}/100${flagsText}`,
    riskLevel,
    statusColor
  );
}

// Show status message
function showStatus(message, type = 'info', color = '#6366f1') {
  // Remove existing status
  if (statusDisplay) {
    statusDisplay.remove();
  }
  
  statusDisplay = document.createElement('div');
  statusDisplay.id = 'hiresafe-status';
  statusDisplay.innerHTML = message.replace(/\n/g, '<br>');
  
  Object.assign(statusDisplay.style, {
    position: 'fixed',
    top: '80px',
    right: '20px',
    maxWidth: '320px',
    background: 'rgba(17, 24, 39, 0.95)',
    color: 'white',
    border: `2px solid ${color}`,
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    zIndex: '2147483646',
    lineHeight: '1.4',
    backdropFilter: 'blur(10px)'
  });
  
  document.body.appendChild(statusDisplay);
  
  // Auto-hide after 8 seconds
  setTimeout(() => {
    if (statusDisplay) {
      statusDisplay.style.opacity = '0';
      statusDisplay.style.transform = 'translateX(100%)';
      setTimeout(() => statusDisplay?.remove(), 300);
    }
  }, 8000);
}

// Update scan button state
function updateScanButton(text, loading) {
  if (!scanButton) return;
  
  const icon = loading ? 
    '<div style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 6px;"></div>' :
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>';
  
  scanButton.innerHTML = icon + text;
  scanButton.style.opacity = loading ? '0.8' : '1';
  scanButton.style.cursor = loading ? 'not-allowed' : 'pointer';
}

// Setup auto-scan functionality
function setupAutoScan() {
  chrome.runtime.sendMessage({ action: 'getSettings' }, (settings) => {
    if (settings.autoScan) {
      // Auto-scan when page loads (with delay)
      setTimeout(() => {
        if (!isScanning) {
          handleScanClick();
        }
      }, 2000);
    }
  });
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanSelection') {
    handleScanClick();
  }
  sendResponse({ success: true });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-initialize on navigation (for SPAs)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(init, 1000); // Delay to allow page to load
  }
}).observe(document, { subtree: true, childList: true });