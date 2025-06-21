/*
  # Sample data for demonstration

  1. New Data
    - Sample companies
    - Sample job analyses
    - Sample scam reports
  
  2. Changes
    - Adds sample data with conflict handling
*/

-- Insert sample companies with conflict handling
INSERT INTO companies (name, domain, website_url, is_verified, verification_score, founded_year, employee_count, headquarters, industry, description, trust_score, red_flags)
SELECT 'Google LLC', 'google.com', 'https://www.google.com', true, 95, 1998, '100,000+', 'Mountain View, CA', 'Technology', 'Multinational technology company specializing in Internet-related services and products.', 98, '{}'
WHERE NOT EXISTS (SELECT 1 FROM companies WHERE domain = 'google.com');

INSERT INTO companies (name, domain, website_url, is_verified, verification_score, founded_year, employee_count, headquarters, industry, description, trust_score, red_flags)
SELECT 'Microsoft Corporation', 'microsoft.com', 'https://www.microsoft.com', true, 94, 1975, '100,000+', 'Redmond, WA', 'Technology', 'American multinational technology corporation producing computer software, consumer electronics, and personal computers.', 97, '{}'
WHERE NOT EXISTS (SELECT 1 FROM companies WHERE domain = 'microsoft.com');

INSERT INTO companies (name, domain, website_url, is_verified, verification_score, founded_year, employee_count, headquarters, industry, description, trust_score, red_flags)
SELECT 'TechCorp Solutions', 'techcorp-solutions.com', 'https://techcorp-solutions.com', false, 25, 2018, '50-200', 'San Francisco, CA', 'Technology', 'A technology company focused on innovative software solutions.', 35, ARRAY['Website recently created', 'No verifiable business address', 'Limited online presence']
WHERE NOT EXISTS (SELECT 1 FROM companies WHERE domain = 'techcorp-solutions.com');

INSERT INTO companies (name, domain, website_url, is_verified, verification_score, founded_year, employee_count, headquarters, industry, description, trust_score, red_flags)
SELECT 'Global Innovations Inc', 'globalinnovations.biz', 'https://globalinnovations.biz', false, 15, 2023, 'Unknown', 'Multiple locations', 'Consulting', 'Innovative solutions for global challenges.', 20, ARRAY['Generic company description', 'Suspicious domain extension', 'No employee information', 'Multiple claimed locations']
WHERE NOT EXISTS (SELECT 1 FROM companies WHERE domain = 'globalinnovations.biz');

INSERT INTO companies (name, domain, website_url, is_verified, verification_score, founded_year, employee_count, headquarters, industry, description, trust_score, red_flags)
SELECT 'StartupXYZ', 'startupxyz.io', 'https://startupxyz.io', false, 45, 2020, '10-50', 'Austin, TX', 'Technology', 'Early-stage startup building the future of work.', 55, ARRAY['Limited company history', 'Vague business model']
WHERE NOT EXISTS (SELECT 1 FROM companies WHERE domain = 'startupxyz.io');

INSERT INTO companies (name, domain, website_url, is_verified, verification_score, founded_year, employee_count, headquarters, industry, description, trust_score, red_flags)
SELECT 'Amazon.com Inc', 'amazon.com', 'https://www.amazon.com', true, 96, 1994, '1,000,000+', 'Seattle, WA', 'E-commerce', 'American multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.', 96, '{}'
WHERE NOT EXISTS (SELECT 1 FROM companies WHERE domain = 'amazon.com');

INSERT INTO companies (name, domain, website_url, is_verified, verification_score, founded_year, employee_count, headquarters, industry, description, trust_score, red_flags)
SELECT 'Digital Marketing Pro', 'digitalmarketingpro.net', 'https://digitalmarketingpro.net', false, 30, 2019, '20-100', 'New York, NY', 'Marketing', 'Professional digital marketing services for businesses.', 40, ARRAY['Vague service descriptions', 'No client testimonials', 'Generic website content']
WHERE NOT EXISTS (SELECT 1 FROM companies WHERE domain = 'digitalmarketingpro.net');

-- Insert sample job analyses with unique constraints
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM job_analyses WHERE job_title = 'Senior Software Engineer' AND company_name = 'Google LLC') THEN
    INSERT INTO job_analyses (job_title, company_name, job_description, job_url, domain, risk_score, risk_level, red_flags, analysis_result, recommendations)
    VALUES ('Senior Software Engineer', 'Google LLC', 'We are looking for a Senior Software Engineer to join our team working on cutting-edge technologies. You will be responsible for designing and implementing scalable systems.', 'https://careers.google.com/jobs/123', 'careers.google.com', 15, 'Low', '{}', 'This job posting appears legitimate with standard requirements and realistic compensation.', ARRAY['Verify through official company channels', 'Research team and role details']);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM job_analyses WHERE job_title = 'Software Developer - High Pay!' AND company_name = 'TechCorp Solutions') THEN
    INSERT INTO job_analyses (job_title, company_name, job_description, job_url, domain, risk_score, risk_level, red_flags, analysis_result, recommendations)
    VALUES ('Software Developer - High Pay!', 'TechCorp Solutions', 'URGENT HIRING! Software developer needed immediately. $150k-$300k salary! Work from home! No experience required! Contact us now for immediate placement!', 'https://techcorp-solutions.com/jobs/urgent', 'techcorp-solutions.com', 85, 'High', ARRAY['Unrealistic salary range', 'Excessive urgency', 'No experience required for senior role', 'Vague job description'], 'This job posting shows multiple red flags indicating potential fraud.', ARRAY['Do not provide personal information', 'Verify company legitimacy', 'Be cautious of upfront payments', 'Research company independently']);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM job_analyses WHERE job_title = 'Marketing Manager' AND company_name = 'Digital Marketing Pro') THEN
    INSERT INTO job_analyses (job_title, company_name, job_description, job_url, domain, risk_score, risk_level, red_flags, analysis_result, recommendations)
    VALUES ('Marketing Manager', 'Digital Marketing Pro', 'Looking for a marketing manager to handle our client accounts. Must be willing to work flexible hours and handle multiple projects.', 'https://digitalmarketingpro.net/careers', 'digitalmarketingpro.net', 55, 'Medium', ARRAY['Vague job responsibilities', 'Unverified company'], 'This job posting has some concerning elements but may be legitimate. Exercise caution.', ARRAY['Research company background', 'Ask detailed questions about role', 'Verify company address and contacts']);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM job_analyses WHERE job_title = 'Data Analyst' AND company_name = 'Amazon.com Inc') THEN
    INSERT INTO job_analyses (job_title, company_name, job_description, job_url, domain, risk_score, risk_level, red_flags, analysis_result, recommendations)
    VALUES ('Data Analyst', 'Amazon.com Inc', 'Join our data analytics team to help drive business decisions through data insights. You will work with large datasets and create meaningful reports for stakeholders.', 'https://amazon.jobs/en/jobs/456', 'amazon.jobs', 20, 'Low', '{}', 'Legitimate job posting from verified company with realistic requirements.', ARRAY['Apply through official channels', 'Prepare for standard interview process']);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM job_analyses WHERE job_title = 'Remote Customer Service Representative' AND company_name = 'Global Innovations Inc') THEN
    INSERT INTO job_analyses (job_title, company_name, job_description, job_url, domain, risk_score, risk_level, red_flags, analysis_result, recommendations)
    VALUES ('Remote Customer Service Representative', 'Global Innovations Inc', 'Work from home opportunity! Earn $25-$40/hour! No experience needed! We provide all training! Must have bank account for direct deposit setup. Send SSN and bank details to get started!', 'https://globalinnovations.biz/jobs/remote', 'globalinnovations.biz', 95, 'High', ARRAY['Requests sensitive financial information', 'Too good to be true salary', 'No experience required', 'Immediate start', 'Suspicious contact method'], 'CRITICAL: This appears to be a scam designed to steal personal and financial information.', ARRAY['DO NOT provide SSN or bank details', 'Report this posting', 'Block all communication', 'Warn others about this scam']);
  END IF;
END $$;

-- Insert sample scam reports with unique constraints
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM scam_reports WHERE report_type = 'fake_job' AND description LIKE '%upfront payment for equipment%') THEN
    INSERT INTO scam_reports (report_type, description, evidence_urls, status, severity)
    VALUES ('fake_job', 'Job posting requesting upfront payment for equipment and training materials. Company claimed to be Google but used suspicious email domain.', ARRAY['https://example.com/screenshot1.png'], 'confirmed', 'high');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM scam_reports WHERE report_type = 'phishing' AND description LIKE '%Microsoft HR%') THEN
    INSERT INTO scam_reports (report_type, description, evidence_urls, status, severity)
    VALUES ('phishing', 'Received email claiming to be from Microsoft HR requesting personal information and bank details for background check.', ARRAY['https://example.com/email-screenshot.png'], 'investigating', 'critical');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM scam_reports WHERE report_type = 'payment_fraud' AND description LIKE '%pay $500 for software%') THEN
    INSERT INTO scam_reports (report_type, description, evidence_urls, status, severity)
    VALUES ('payment_fraud', 'Asked to pay $500 for software licenses before starting remote work. Company disappeared after payment.', ARRAY['https://example.com/payment-proof.png'], 'confirmed', 'high');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM scam_reports WHERE report_type = 'identity_theft' AND description LIKE '%drivers license, SSN%') THEN
    INSERT INTO scam_reports (report_type, description, evidence_urls, status, severity)
    VALUES ('identity_theft', 'Recruiter requested copy of drivers license, SSN, and passport for verification before interview.', '{}', 'pending', 'medium');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM scam_reports WHERE report_type = 'fake_job' AND description LIKE '%data entry work%') THEN
    INSERT INTO scam_reports (report_type, description, evidence_urls, status, severity)
    VALUES ('fake_job', 'Job posting for data entry work with unrealistic pay rates. No actual company address or phone number provided.', ARRAY['https://example.com/job-posting.png'], 'dismissed', 'low');
  END IF;
END $$;