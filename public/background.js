// Background service worker for HireSafe AI Extension
console.log('HireSafe AI Background Script Loaded');

// Initialize extension
chrome.runtime.onInstalled.addListener((details) => {
  console.log('HireSafe AI Extension installed:', details.reason);
  
  // Set default settings
  chrome.storage.sync.set({
    isEnabled: true,
    alertLevel: 'medium',
    autoScan: true,
    notifications: true
  });

  // Show welcome notification
  if (details.reason === 'install') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'HireSafe AI Installed!',
      message: 'Your job search is now protected. Click on job postings to analyze them.'
    });
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);

  switch (request.action) {
    case 'analyzeJob':
      handleJobAnalysis(request.data, sender.tab)
        .then(result => sendResponse({ success: true, data: result }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Keep message channel open for async response

    case 'reportScam':
      handleScamReport(request.data)
        .then(result => sendResponse({ success: true, data: result }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true;

    case 'getSettings':
      chrome.storage.sync.get(['isEnabled', 'alertLevel', 'autoScan', 'notifications'], (result) => {
        sendResponse({ success: true, data: result });
      });
      return true;

    case 'updateSettings':
      chrome.storage.sync.set(request.data, () => {
        sendResponse({ success: true });
      });
      return true;

    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
});

// Job analysis function
async function handleJobAnalysis(jobData, tab) {
  try {
    console.log('Analyzing job:', jobData);

    // Simulate AI analysis (replace with actual API call)
    const analysis = await analyzeJobWithAI(jobData);
    
    // Store analysis result
    await storeAnalysisResult(jobData, analysis, tab);
    
    // Show notification if high risk
    if (analysis.riskLevel === 'High' && analysis.riskScore > 70) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: '⚠️ High Risk Job Detected!',
        message: `${jobData.title} at ${jobData.company} shows multiple red flags.`
      });
    }

    return analysis;
  } catch (error) {
    console.error('Job analysis failed:', error);
    throw error;
  }
}

// AI Analysis simulation (replace with actual Supabase Edge Function)
async function analyzeJobWithAI(jobData) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock analysis based on job data
  const redFlags = [];
  let riskScore = 0;

  // Check for suspicious patterns
  if (jobData.salary && (jobData.salary.includes('$100k+') || jobData.salary.includes('$200k+'))) {
    redFlags.push('Unrealistic salary range for position level');
    riskScore += 25;
  }

  if (jobData.description && jobData.description.length < 100) {
    redFlags.push('Vague or minimal job description');
    riskScore += 15;
  }

  if (jobData.company && jobData.company.toLowerCase().includes('solutions')) {
    redFlags.push('Generic company name pattern');
    riskScore += 10;
  }

  if (jobData.description && /urgent|immediate|asap|quick hire/i.test(jobData.description)) {
    redFlags.push('Excessive urgency in hiring');
    riskScore += 20;
  }

  if (jobData.description && /work from home|remote|flexible/i.test(jobData.description) && riskScore > 20) {
    redFlags.push('Remote work combined with other red flags');
    riskScore += 15;
  }

  // Determine risk level
  let riskLevel = 'Low';
  if (riskScore >= 70) riskLevel = 'High';
  else if (riskScore >= 40) riskLevel = 'Medium';

  return {
    riskScore,
    riskLevel,
    redFlags,
    analysis: `This job posting has been analyzed for potential scam indicators. Risk score: ${riskScore}/100`,
    timestamp: new Date().toISOString(),
    recommendations: riskLevel === 'High' ? [
      'Do not provide personal information',
      'Verify company independently',
      'Be cautious of upfront payments',
      'Research company website and reviews'
    ] : [
      'Proceed with normal caution',
      'Verify company details',
      'Trust your instincts'
    ]
  };
}

// Store analysis result
async function storeAnalysisResult(jobData, analysis, tab) {
  const result = {
    id: Date.now().toString(),
    jobData,
    analysis,
    url: tab?.url || '',
    domain: tab?.url ? new URL(tab.url).hostname : '',
    timestamp: new Date().toISOString()
  };

  // Store locally
  chrome.storage.local.get(['analysisHistory'], (data) => {
    const history = data.analysisHistory || [];
    history.unshift(result);
    
    // Keep only last 100 analyses
    if (history.length > 100) {
      history.splice(100);
    }
    
    chrome.storage.local.set({ analysisHistory: history });
  });

  // TODO: Store in Supabase database
  console.log('Analysis result stored:', result);
}

// Handle scam reports
async function handleScamReport(reportData) {
  console.log('Processing scam report:', reportData);
  
  // Store report locally
  chrome.storage.local.get(['scamReports'], (data) => {
    const reports = data.scamReports || [];
    reports.unshift({
      id: Date.now().toString(),
      ...reportData,
      timestamp: new Date().toISOString()
    });
    
    chrome.storage.local.set({ scamReports: reports });
  });

  // TODO: Send to Supabase database
  
  return { success: true, message: 'Report submitted successfully' };
}

// Handle tab updates to inject content script if needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const jobSites = [
      'linkedin.com',
      'indeed.com',
      'glassdoor.com',
      'monster.com',
      'ziprecruiter.com',
      'careerbuilder.com',
      'dice.com',
      'simplyhired.com'
    ];

    const isJobSite = jobSites.some(site => tab.url.includes(site));
    
    if (isJobSite) {
      console.log('Job site detected:', tab.url);
      // Content script will be automatically injected via manifest
    }
  }
});