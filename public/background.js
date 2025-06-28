// HireSafe AI Background Script
console.log('HireSafe AI Background Script Loaded');

// Install/Update handler
chrome.runtime.onInstalled.addListener((details) => {
  console.log('HireSafe AI Extension Installed/Updated');
  
  if (details.reason === 'install') {
    // Set default settings
    chrome.storage.sync.set({
      enabled: true,
      scanLevel: 'medium',
      notifications: true,
      autoScan: true
    });
    
    // Open welcome page
    chrome.tabs.create({
      url: chrome.runtime.getURL('popup.html')
    });
  }
});

// Tab update handler - scan job pages automatically
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if it's a job site
    const jobSites = [
      'linkedin.com',
      'indeed.com',
      'glassdoor.com',
      'jobs.google.com',
      'monster.com',
      'ziprecruiter.com',
      'careerbuilder.com'
    ];
    
    const isJobSite = jobSites.some(site => tab.url.includes(site));
    
    if (isJobSite) {
      // Get user settings
      chrome.storage.sync.get(['enabled', 'autoScan'], (result) => {
        if (result.enabled && result.autoScan) {
          // Inject content script if not already injected
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
          }).catch(() => {
            // Content script might already be injected
          });
        }
      });
    }
  }
});

// Message handler for communication with content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);
  
  switch (request.action) {
    case 'scanJobPosting':
      handleJobScan(request.data, sendResponse);
      return true; // Keep message channel open for async response
      
    case 'getSettings':
      chrome.storage.sync.get(null, (settings) => {
        sendResponse(settings);
      });
      return true;
      
    case 'updateSettings':
      chrome.storage.sync.set(request.settings, () => {
        sendResponse({ success: true });
      });
      return true;
      
    case 'showNotification':
      showScamAlert(request.data);
      break;
  }
});

// AI-powered job posting analysis
async function handleJobScan(jobData, sendResponse) {
  try {
    console.log('Scanning job posting:', jobData);
    
    // Simulate AI analysis (in production, this would call your AI service)
    const analysis = await analyzeJobPosting(jobData);
    
    // Store scan result
    const scanResult = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      url: jobData.url,
      title: jobData.title,
      company: jobData.company,
      analysis: analysis,
      riskLevel: analysis.riskLevel
    };
    
    // Save to storage
    chrome.storage.local.get(['scanHistory'], (result) => {
      const history = result.scanHistory || [];
      history.unshift(scanResult);
      
      // Keep only last 100 scans
      if (history.length > 100) {
        history.splice(100);
      }
      
      chrome.storage.local.set({ scanHistory: history });
    });
    
    // Show notification if high risk
    if (analysis.riskLevel === 'high') {
      showScamAlert({
        title: 'High Risk Job Detected!',
        message: `${jobData.title} at ${jobData.company} has been flagged as potentially fraudulent.`,
        riskLevel: 'high'
      });
    }
    
    sendResponse(scanResult);
    
  } catch (error) {
    console.error('Job scan error:', error);
    sendResponse({ error: 'Failed to scan job posting' });
  }
}

// AI Analysis simulation (replace with actual AI service in production)
async function analyzeJobPosting(jobData) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const scamIndicators = [
    'work from home',
    'no experience required',
    'earn $',
    'guaranteed income',
    'pay upfront',
    'wire transfer',
    'western union',
    'money order',
    'processing fee',
    'training fee'
  ];
  
  const text = `${jobData.title} ${jobData.description}`.toLowerCase();
  const flaggedTerms = scamIndicators.filter(term => text.includes(term));
  
  let riskScore = 0;
  let riskLevel = 'low';
  const reasons = [];
  
  // Calculate risk based on various factors
  if (flaggedTerms.length > 0) {
    riskScore += flaggedTerms.length * 15;
    reasons.push(`Contains ${flaggedTerms.length} potential scam indicator(s)`);
  }
  
  if (!jobData.company || jobData.company.length < 3) {
    riskScore += 20;
    reasons.push('Company name is missing or too short');
  }
  
  if (text.includes('urgent') || text.includes('immediate')) {
    riskScore += 10;
    reasons.push('Uses urgency tactics');
  }
  
  if (text.includes('no interview') || text.includes('hired immediately')) {
    riskScore += 25;
    reasons.push('No proper interview process mentioned');
  }
  
  // Determine risk level
  if (riskScore >= 50) {
    riskLevel = 'high';
  } else if (riskScore >= 25) {
    riskLevel = 'medium';
  }
  
  return {
    riskScore,
    riskLevel,
    flaggedTerms,
    reasons,
    recommendation: getRiskRecommendation(riskLevel),
    scannedAt: new Date().toISOString()
  };
}

function getRiskRecommendation(riskLevel) {
  switch (riskLevel) {
    case 'high':
      return 'AVOID: This job posting shows multiple red flags. Do not apply or provide personal information.';
    case 'medium':
      return 'CAUTION: This job posting has some concerning elements. Research the company thoroughly before applying.';
    case 'low':
      return 'PROCEED: This job posting appears legitimate, but always verify company details before sharing personal information.';
    default:
      return 'Unable to determine risk level.';
  }
}

// Show scam alert notification
function showScamAlert(data) {
  chrome.storage.sync.get(['notifications'], (result) => {
    if (result.notifications !== false) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: data.title || 'HireSafe AI Alert',
        message: data.message,
        priority: data.riskLevel === 'high' ? 2 : 1
      });
    }
  });
}