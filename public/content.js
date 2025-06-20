// Content script for job board analysis
console.log('HireSafe AI Content Script Loaded on:', window.location.hostname);

class JobBoardAnalyzer {
  constructor() {
    this.isEnabled = true;
    this.autoScan = true;
    this.scannedJobs = new Set();
    this.init();
  }

  async init() {
    // Get user settings
    const settings = await this.getSettings();
    this.isEnabled = settings.isEnabled !== false;
    this.autoScan = settings.autoScan !== false;

    if (!this.isEnabled) return;

    // Initialize based on current site
    this.initializeSite();
    
    // Set up observers for dynamic content
    this.setupObservers();
    
    // Add HireSafe UI elements
    this.addHireSafeUI();
  }

  async getSettings() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
        resolve(response.success ? response.data : {});
      });
    });
  }

  initializeSite() {
    const hostname = window.location.hostname;
    
    if (hostname.includes('linkedin.com')) {
      this.initLinkedIn();
    } else if (hostname.includes('indeed.com')) {
      this.initIndeed();
    } else if (hostname.includes('glassdoor.com')) {
      this.initGlassdoor();
    } else {
      this.initGeneric();
    }
  }

  initLinkedIn() {
    console.log('Initializing LinkedIn integration');
    
    // LinkedIn job selectors
    this.jobSelectors = {
      jobCard: '.job-search-card, .jobs-search-results__list-item',
      title: '.job-search-card__title, .t-16',
      company: '.job-search-card__subtitle, .t-14',
      location: '.job-search-card__location, .t-12',
      description: '.job-search-card__description, .jobs-description-content__text'
    };

    this.scanExistingJobs();
  }

  initIndeed() {
    console.log('Initializing Indeed integration');
    
    this.jobSelectors = {
      jobCard: '[data-jk], .job_seen_beacon',
      title: '[data-testid="job-title"], .jobTitle',
      company: '[data-testid="company-name"], .companyName',
      location: '[data-testid="job-location"], .companyLocation',
      description: '.jobsearch-jobDescriptionText, .jobsearch-JobComponent-description'
    };

    this.scanExistingJobs();
  }

  initGlassdoor() {
    console.log('Initializing Glassdoor integration');
    
    this.jobSelectors = {
      jobCard: '.react-job-listing, .jobListing',
      title: '.jobTitle, .job-search-key-9ujsbx',
      company: '.employerName, .job-search-key-1f2w7i',
      location: '.jobLocation, .job-search-key-1f2w7i',
      description: '.jobDescription, .job-search-key-18w2zk'
    };

    this.scanExistingJobs();
  }

  initGeneric() {
    console.log('Initializing generic job board integration');
    
    // Generic selectors that might work on various job sites
    this.jobSelectors = {
      jobCard: '[class*="job"], [class*="listing"], [class*="card"]',
      title: '[class*="title"], [class*="job-title"], h1, h2, h3',
      company: '[class*="company"], [class*="employer"]',
      location: '[class*="location"], [class*="city"]',
      description: '[class*="description"], [class*="summary"]'
    };

    this.scanExistingJobs();
  }

  setupObservers() {
    // Watch for new job listings being added dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.scanNewJobs(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  scanExistingJobs() {
    if (!this.autoScan) return;

    const jobCards = document.querySelectorAll(this.jobSelectors.jobCard);
    console.log(`Found ${jobCards.length} existing job cards`);

    jobCards.forEach((card, index) => {
      setTimeout(() => this.processJobCard(card), index * 100);
    });
  }

  scanNewJobs(container) {
    if (!this.autoScan) return;

    const jobCards = container.querySelectorAll ? 
      container.querySelectorAll(this.jobSelectors.jobCard) : 
      (container.matches && container.matches(this.jobSelectors.jobCard) ? [container] : []);

    jobCards.forEach(card => this.processJobCard(card));
  }

  async processJobCard(card) {
    if (!card || this.scannedJobs.has(card)) return;
    
    this.scannedJobs.add(card);

    try {
      const jobData = this.extractJobData(card);
      if (!jobData.title) return;

      // Add HireSafe indicator
      this.addJobIndicator(card, 'scanning');

      // Analyze job
      const analysis = await this.analyzeJob(jobData);
      
      // Update indicator with results
      this.updateJobIndicator(card, analysis);

    } catch (error) {
      console.error('Error processing job card:', error);
      this.addJobIndicator(card, 'error');
    }
  }

  extractJobData(card) {
    const getData = (selector) => {
      const element = card.querySelector(selector);
      return element ? element.textContent.trim() : '';
    };

    return {
      title: getData(this.jobSelectors.title),
      company: getData(this.jobSelectors.company),
      location: getData(this.jobSelectors.location),
      description: getData(this.jobSelectors.description),
      url: window.location.href,
      domain: window.location.hostname,
      extractedAt: new Date().toISOString()
    };
  }

  async analyzeJob(jobData) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        action: 'analyzeJob',
        data: jobData
      }, (response) => {
        if (response && response.success) {
          resolve(response.data);
        } else {
          reject(new Error(response?.error || 'Analysis failed'));
        }
      });
    });
  }

  addJobIndicator(card, status) {
    // Remove existing indicator
    const existing = card.querySelector('.hiresafe-indicator');
    if (existing) existing.remove();

    const indicator = document.createElement('div');
    indicator.className = 'hiresafe-indicator';
    indicator.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 1000;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: bold;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
    `;

    switch (status) {
      case 'scanning':
        indicator.style.background = 'linear-gradient(45deg, #6366f1, #8b5cf6)';
        indicator.innerHTML = '🔍 Scanning...';
        break;
      case 'error':
        indicator.style.background = 'linear-gradient(45deg, #ef4444, #f87171)';
        indicator.innerHTML = '❌ Error';
        break;
    }

    // Position the card relatively if needed
    if (getComputedStyle(card).position === 'static') {
      card.style.position = 'relative';
    }

    card.appendChild(indicator);
  }

  updateJobIndicator(card, analysis) {
    const indicator = card.querySelector('.hiresafe-indicator');
    if (!indicator) return;

    const { riskLevel, riskScore } = analysis;

    // Update indicator based on risk level
    switch (riskLevel) {
      case 'High':
        indicator.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
        indicator.innerHTML = `🚨 High Risk (${riskScore}%)`;
        break;
      case 'Medium':
        indicator.style.background = 'linear-gradient(45deg, #f59e0b, #d97706)';
        indicator.innerHTML = `⚠️ Medium Risk (${riskScore}%)`;
        break;
      case 'Low':
        indicator.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        indicator.innerHTML = `✅ Low Risk (${riskScore}%)`;
        break;
    }

    // Add click handler for detailed view
    indicator.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showAnalysisDetails(analysis);
    });

    // Add hover effect
    indicator.addEventListener('mouseenter', () => {
      indicator.style.transform = 'scale(1.05)';
    });

    indicator.addEventListener('mouseleave', () => {
      indicator.style.transform = 'scale(1)';
    });
  }

  showAnalysisDetails(analysis) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'hiresafe-modal-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'hiresafe-modal';
    modal.style.cssText = `
      background: #1f2937;
      border-radius: 16px;
      padding: 24px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      color: white;
      border: 1px solid #374151;
    `;

    const riskColor = analysis.riskLevel === 'High' ? '#ef4444' : 
                     analysis.riskLevel === 'Medium' ? '#f59e0b' : '#10b981';

    modal.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h3 style="margin: 0; font-size: 20px; font-weight: bold;">HireSafe AI Analysis</h3>
        <button class="close-modal" style="background: none; border: none; color: #9ca3af; font-size: 24px; cursor: pointer;">&times;</button>
      </div>
      
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="display: inline-block; padding: 12px 24px; border-radius: 12px; background: ${riskColor}; color: white; font-weight: bold; margin-bottom: 8px;">
          ${analysis.riskLevel} Risk - ${analysis.riskScore}%
        </div>
        <p style="color: #d1d5db; margin: 0;">${analysis.analysis}</p>
      </div>

      ${analysis.redFlags.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h4 style="color: #ef4444; margin-bottom: 12px;">🚩 Red Flags Detected:</h4>
          <ul style="margin: 0; padding-left: 20px; color: #fca5a5;">
            ${analysis.redFlags.map(flag => `<li style="margin-bottom: 8px;">${flag}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="margin-bottom: 20px;">
        <h4 style="color: #60a5fa; margin-bottom: 12px;">💡 Recommendations:</h4>
        <ul style="margin: 0; padding-left: 20px; color: #93c5fd;">
          ${analysis.recommendations.map(rec => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <button class="report-scam" style="flex: 1; background: #ef4444; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer;">
          Report as Scam
        </button>
        <button class="close-modal" style="flex: 1; background: #6b7280; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer;">
          Close
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Add event listeners
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
      }
    });

    modal.querySelectorAll('.close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        document.body.removeChild(overlay);
      });
    });

    modal.querySelector('.report-scam').addEventListener('click', () => {
      this.reportScam(analysis);
      document.body.removeChild(overlay);
    });
  }

  async reportScam(analysis) {
    try {
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage({
          action: 'reportScam',
          data: {
            analysis,
            url: window.location.href,
            domain: window.location.hostname,
            userAgent: navigator.userAgent
          }
        }, resolve);
      });

      if (response.success) {
        this.showNotification('Scam reported successfully! Thank you for helping keep the community safe.', 'success');
      } else {
        this.showNotification('Failed to report scam. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error reporting scam:', error);
      this.showNotification('Failed to report scam. Please try again.', 'error');
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10001;
      padding: 16px 20px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      max-width: 300px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.3s ease-out;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  addHireSafeUI() {
    // Add floating action button
    const fab = document.createElement('div');
    fab.className = 'hiresafe-fab';
    fab.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      transition: all 0.3s ease;
      font-size: 24px;
    `;

    fab.innerHTML = '🛡️';
    fab.title = 'HireSafe AI - Click to scan page';

    fab.addEventListener('click', () => {
      this.scanExistingJobs();
      this.showNotification('Scanning page for job postings...', 'info');
    });

    fab.addEventListener('mouseenter', () => {
      fab.style.transform = 'scale(1.1)';
      fab.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.6)';
    });

    fab.addEventListener('mouseleave', () => {
      fab.style.transform = 'scale(1)';
      fab.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
    });

    document.body.appendChild(fab);
  }
}

// Initialize the analyzer when the page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new JobBoardAnalyzer();
  });
} else {
  new JobBoardAnalyzer();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .hiresafe-indicator:hover {
    transform: scale(1.05) !important;
  }

  .hiresafe-fab:hover {
    transform: scale(1.1) !important;
  }
`;

document.head.appendChild(style);