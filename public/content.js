// HireSafe AI Content Script
console.log('HireSafe AI Content Script Loaded');

// Initialize the extension on job sites
(function() {
  'use strict';
  
  let isInitialized = false;
  let scanButton = null;
  let statusIndicator = null;
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    if (isInitialized) return;
    isInitialized = true;
    
    console.log('Initializing HireSafe AI on:', window.location.hostname);
    
    // Create floating scan button
    createScanButton();
    
    // Auto-scan if enabled
    chrome.storage.sync.get(['autoScan'], (result) => {
      if (result.autoScan !== false) {
        setTimeout(autoScanPage, 2000); // Wait for page to fully load
      }
    });
    
    // Monitor for dynamic content changes
    observePageChanges();
  }
  
  function createScanButton() {
    // Remove existing button if present
    const existing = document.getElementById('hiresafe-scan-btn');
    if (existing) existing.remove();
    
    // Create scan button
    scanButton = document.createElement('div');
    scanButton.id = 'hiresafe-scan-btn';
    scanButton.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        padding: 12px 16px;
        border-radius: 12px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
        border: none;
        user-select: none;
      " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
        <span id="scan-text">Scan Job</span>
      </div>
    `;
    
    scanButton.addEventListener('click', handleScanClick);
    document.body.appendChild(scanButton);
    
    // Create status indicator
    createStatusIndicator();
  }
  
  function createStatusIndicator() {
    statusIndicator = document.createElement('div');
    statusIndicator.id = 'hiresafe-status';
    statusIndicator.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 10000;
      background: rgba(17, 24, 39, 0.95);
      backdrop-filter: blur(10px);
      color: white;
      padding: 12px 16px;
      border-radius: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 13px;
      max-width: 300px;
      display: none;
      border: 1px solid rgba(99, 102, 241, 0.3);
    `;
    
    document.body.appendChild(statusIndicator);
  }
  
  function handleScanClick() {
    const scanText = document.getElementById('scan-text');
    if (!scanText) return;
    
    scanText.textContent = 'Scanning...';
    scanButton.style.pointerEvents = 'none';
    
    // Extract job data from current page
    const jobData = extractJobData();
    
    if (!jobData.title && !jobData.description) {
      showStatus('No job posting detected on this page', 'warning');
      resetScanButton();
      return;
    }
    
    // Send to background script for analysis
    chrome.runtime.sendMessage({
      action: 'scanJobPosting',
      data: jobData
    }, (response) => {
      resetScanButton();
      
      if (response && response.analysis) {
        showScanResult(response);
      } else {
        showStatus('Failed to scan job posting', 'error');
      }
    });
  }
  
  function resetScanButton() {
    const scanText = document.getElementById('scan-text');
    if (scanText) scanText.textContent = 'Scan Job';
    if (scanButton) scanButton.style.pointerEvents = 'auto';
  }
  
  function extractJobData() {
    const url = window.location.href;
    const hostname = window.location.hostname;
    
    let title = '';
    let company = '';
    let description = '';
    let location = '';
    
    // Site-specific extraction logic
    if (hostname.includes('linkedin.com')) {
      title = getTextContent('h1') || getTextContent('.job-title') || getTextContent('[data-test-id="job-title"]');
      company = getTextContent('.job-details-jobs-unified-top-card__company-name') || 
                getTextContent('.jobs-unified-top-card__company-name') ||
                getTextContent('[data-test-id="job-poster-name"]');
      description = getTextContent('.jobs-description-content__text') || 
                   getTextContent('.jobs-box__html-content') ||
                   getTextContent('[data-test-id="job-description"]');
      location = getTextContent('.jobs-unified-top-card__bullet') ||
                getTextContent('[data-test-id="job-location"]');
    } 
    else if (hostname.includes('indeed.com')) {
      title = getTextContent('h1[data-jk]') || getTextContent('.jobsearch-JobInfoHeader-title');
      company = getTextContent('[data-testid="inlineHeader-companyName"]') || 
                getTextContent('.jobsearch-InlineCompanyRating');
      description = getTextContent('#jobDescriptionText') || 
                   getTextContent('.jobsearch-jobDescriptionText');
      location = getTextContent('[data-testid="job-location"]');
    }
    else if (hostname.includes('glassdoor.com')) {
      title = getTextContent('[data-test="job-title"]') || getTextContent('h1');
      company = getTextContent('[data-test="employer-name"]');
      description = getTextContent('[data-test="jobDescriptionContainer"]');
      location = getTextContent('[data-test="job-location"]');
    }
    else {
      // Generic extraction for other sites
      title = getTextContent('h1') || 
              getTextContent('[class*="title"]') || 
              getTextContent('[class*="job-title"]');
      company = getTextContent('[class*="company"]') || 
                getTextContent('[class*="employer"]');
      description = getTextContent('[class*="description"]') || 
                   getTextContent('[class*="job-description"]') ||
                   getTextContent('main') ||
                   document.body.innerText.substring(0, 1000);
    }
    
    return {
      url,
      title: title || document.title,
      company: company || 'Unknown Company',
      description: description || '',
      location: location || '',
      extractedAt: new Date().toISOString()
    };
  }
  
  function getTextContent(selector) {
    const element = document.querySelector(selector);
    return element ? element.textContent.trim() : '';
  }
  
  function showScanResult(result) {
    const { analysis } = result;
    const riskColor = {
      'low': '#10b981',
      'medium': '#f59e0b', 
      'high': '#ef4444'
    }[analysis.riskLevel] || '#6b7280';
    
    const riskEmoji = {
      'low': '✅',
      'medium': '⚠️',
      'high': '🚨'
    }[analysis.riskLevel] || '❓';
    
    showStatus(`
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="font-size: 16px;">${riskEmoji}</span>
        <strong style="color: ${riskColor}; text-transform: uppercase;">
          ${analysis.riskLevel} Risk (${analysis.riskScore}%)
        </strong>
      </div>
      <div style="margin-bottom: 8px; font-size: 12px; line-height: 1.4;">
        ${analysis.recommendation}
      </div>
      ${analysis.reasons.length > 0 ? `
        <div style="font-size: 11px; color: #9ca3af;">
          Issues: ${analysis.reasons.join(', ')}
        </div>
      ` : ''}
    `, analysis.riskLevel, 8000);
  }
  
  function showStatus(message, type = 'info', duration = 3000) {
    if (!statusIndicator) return;
    
    const colors = {
      'info': '#3b82f6',
      'success': '#10b981',
      'warning': '#f59e0b',
      'error': '#ef4444',
      'low': '#10b981',
      'medium': '#f59e0b',
      'high': '#ef4444'
    };
    
    statusIndicator.innerHTML = message;
    statusIndicator.style.display = 'block';
    statusIndicator.style.borderColor = colors[type] || colors.info;
    
    // Auto-hide after duration
    setTimeout(() => {
      if (statusIndicator) {
        statusIndicator.style.display = 'none';
      }
    }, duration);
  }
  
  function autoScanPage() {
    // Only auto-scan if we detect job-related content
    const jobKeywords = ['job', 'position', 'career', 'employment', 'hiring', 'apply'];
    const pageText = document.body.innerText.toLowerCase();
    const hasJobContent = jobKeywords.some(keyword => pageText.includes(keyword));
    
    if (hasJobContent && document.querySelector('h1')) {
      handleScanClick();
    }
  }
  
  function observePageChanges() {
    // Watch for dynamic content changes (SPAs)
    const observer = new MutationObserver((mutations) => {
      let shouldRescan = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if significant content was added
          for (let node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const text = node.textContent || '';
              if (text.length > 100 && (text.includes('job') || text.includes('position'))) {
                shouldRescan = true;
                break;
              }
            }
          }
        }
      });
      
      if (shouldRescan) {
        // Debounce rescanning
        clearTimeout(window.hiresafeRescanTimeout);
        window.hiresafeRescanTimeout = setTimeout(() => {
          chrome.storage.sync.get(['autoScan'], (result) => {
            if (result.autoScan !== false) {
              autoScanPage();
            }
          });
        }, 2000);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
})();