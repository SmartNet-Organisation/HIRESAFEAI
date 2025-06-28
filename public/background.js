// HireSafe AI Chrome Extension Background Script

// Extension installation handler
chrome.runtime.onInstalled.addListener((details) => {
  console.log('HireSafe AI Extension installed:', details.reason);
  
  if (details.reason === 'install') {
    // Set default settings
    chrome.storage.sync.set({
      autoScan: true,
      notifications: true,
      scansToday: 0,
      threatsBlocked: 0
    });
    
    // Show welcome notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'HireSafe AI Installed!',
      message: 'Your job search is now protected. Click the extension icon to get started.'
    });
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);
  
  switch (request.action) {
    case 'scanJobPosting':
      handleJobScan(request.data, sender.tab)
        .then(result => sendResponse(result))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Keep message channel open for async response
      
    case 'updateStats':
      updateExtensionStats(request.data);
      sendResponse({ success: true });
      break;
      
    case 'getSettings':
      chrome.storage.sync.get(['autoScan', 'notifications'], (result) => {
        sendResponse(result);
      });
      return true;
      
    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
});

// Job scanning logic
async function handleJobScan(jobData, tab) {
  try {
    console.log('Scanning job posting:', jobData);
    
    // Simulate AI analysis (in production, this would call your API)
    const riskScore = analyzeJobPosting(jobData);
    const riskLevel = getRiskLevel(riskScore);
    
    // Update stats
    await updateScanCount();
    
    if (riskLevel === 'high') {
      await updateThreatCount();
      
      // Show warning notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: '⚠️ High Risk Job Detected!',
        message: `Potential scam detected: ${jobData.title}. Click for details.`
      });
    }
    
    return {
      success: true,
      riskScore,
      riskLevel,
      flags: getScamFlags(jobData, riskScore)
    };
  } catch (error) {
    console.error('Job scan error:', error);
    return { success: false, error: error.message };
  }
}

// Simple AI analysis simulation
function analyzeJobPosting(jobData) {
  let riskScore = 0;
  const text = (jobData.title + ' ' + jobData.description + ' ' + jobData.company).toLowerCase();
  
  // Check for common scam indicators
  const scamKeywords = [
    'work from home', 'easy money', 'no experience required',
    'guaranteed income', 'make money fast', 'urgent hiring',
    'wire transfer', 'western union', 'bitcoin', 'cryptocurrency',
    'personal information', 'social security', 'bank account',
    'upfront payment', 'training fee', 'equipment fee'
  ];
  
  scamKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      riskScore += 10;
    }
  });
  
  // Check for suspicious patterns
  if (jobData.salary && jobData.salary.includes('$') && parseInt(jobData.salary.replace(/\D/g, '')) > 100000) {
    riskScore += 15; // Unusually high salary
  }
  
  if (jobData.description && jobData.description.length < 100) {
    riskScore += 10; // Very short description
  }
  
  if (!jobData.company || jobData.company.length < 3) {
    riskScore += 20; // Missing or very short company name
  }
  
  return Math.min(riskScore, 100);
}

function getRiskLevel(score) {
  if (score >= 50) return 'high';
  if (score >= 25) return 'medium';
  return 'low';
}

function getScamFlags(jobData, riskScore) {
  const flags = [];
  const text = (jobData.title + ' ' + jobData.description + ' ' + jobData.company).toLowerCase();
  
  if (text.includes('work from home') && text.includes('easy money')) {
    flags.push('Promises easy money for remote work');
  }
  
  if (text.includes('no experience') && riskScore > 30) {
    flags.push('No experience required with high pay');
  }
  
  if (text.includes('upfront') || text.includes('fee')) {
    flags.push('Requests upfront payment or fees');
  }
  
  if (!jobData.company || jobData.company.length < 3) {
    flags.push('Missing or incomplete company information');
  }
  
  return flags;
}

async function updateScanCount() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['scansToday'], (result) => {
      const newCount = (result.scansToday || 0) + 1;
      chrome.storage.sync.set({ scansToday: newCount }, resolve);
    });
  });
}

async function updateThreatCount() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['threatsBlocked'], (result) => {
      const newCount = (result.threatsBlocked || 0) + 1;
      chrome.storage.sync.set({ threatsBlocked: newCount }, resolve);
    });
  });
}

function updateExtensionStats(data) {
  chrome.storage.sync.set(data);
}

// Context menu setup
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'scanJobPosting',
    title: 'Scan with HireSafe AI',
    contexts: ['selection', 'page']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'scanJobPosting') {
    chrome.tabs.sendMessage(tab.id, { action: 'scanSelection' });
  }
});