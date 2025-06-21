/*
  # Sample Data for HireSafe AI

  1. Sample Companies
    - Mix of legitimate and suspicious companies
    - Various verification statuses and trust scores

  2. Sample Job Analyses
    - Different risk levels and scenarios
    - Realistic job posting data

  3. Sample Scam Reports
    - Various report types and statuses
    - Different severity levels
*/

-- Insert sample companies
INSERT INTO companies (name, domain, website_url, is_verified, verification_score, founded_year, employee_count, headquarters, industry, description, trust_score, red_flags) VALUES
('Google LLC', 'google.com', 'https://www.google.com', true, 95, 1998, '100,000+', 'Mountain View, CA', 'Technology', 'Multinational technology company specializing in Internet-related services and products.', 98, '{}'),
('Microsoft Corporation', 'microsoft.com', 'https://www.microsoft.com', true, 94, 1975, '100,000+', 'Redmond, WA', 'Technology', 'American multinational technology corporation producing computer software, consumer electronics, and personal computers.', 97, '{}'),
('TechCorp Solutions', 'techcorp-solutions.com', 'https://techcorp-solutions.com', false, 25, 2018, '50-200', 'San Francisco, CA', 'Technology', 'A technology company focused on innovative software solutions.', 35, ARRAY['Website recently created', 'No verifiable business address', 'Limited online presence']),
('Global Innovations Inc', 'globalinnovations.biz', 'https://globalinnovations.biz', false, 15, 2023, 'Unknown', 'Multiple locations', 'Consulting', 'Innovative solutions for global challenges.', 20, ARRAY['Generic company description', 'Suspicious domain extension', 'No employee information', 'Multiple claimed locations']),
('StartupXYZ', 'startupxyz.io', 'https://startupxyz.io', false, 45, 2020, '10-50', 'Austin, TX', 'Technology', 'Early-stage startup building the future of work.', 55, ARRAY['Limited company history', 'Vague business model']),
('Amazon.com Inc', 'amazon.com', 'https://www.amazon.com', true, 96, 1994, '1,000,000+', 'Seattle, WA', 'E-commerce', 'American multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.', 96, '{}'),
('Digital Marketing Pro', 'digitalmarketingpro.net', 'https://digitalmarketingpro.net', false, 30, 2019, '20-100', 'New York, NY', 'Marketing', 'Professional digital marketing services for businesses.', 40, ARRAY['Vague service descriptions', 'No client testimonials', 'Generic website content']);

-- Insert sample job analyses (anonymous data for demonstration)
INSERT INTO job_analyses (job_title, company_name, job_description, job_url, domain, risk_score, risk_level, red_flags, analysis_result, recommendations) VALUES
('Senior Software Engineer', 'Google LLC', 'We are looking for a Senior Software Engineer to join our team working on cutting-edge technologies. You will be responsible for designing and implementing scalable systems.', 'https://careers.google.com/jobs/123', 'careers.google.com', 15, 'Low', '{}', 'This job posting appears legitimate with standard requirements and realistic compensation.', ARRAY['Verify through official company channels', 'Research team and role details']),

('Software Developer - High Pay!', 'TechCorp Solutions', 'URGENT HIRING! Software developer needed immediately. $150k-$300k salary! Work from home! No experience required! Contact us now for immediate placement!', 'https://techcorp-solutions.com/jobs/urgent', 'techcorp-solutions.com', 85, 'High', ARRAY['Unrealistic salary range', 'Excessive urgency', 'No experience required for senior role', 'Vague job description'], 'This job posting shows multiple red flags indicating potential fraud.', ARRAY['Do not provide personal information', 'Verify company legitimacy', 'Be cautious of upfront payments', 'Research company independently']),

('Marketing Manager', 'Digital Marketing Pro', 'Looking for a marketing manager to handle our client accounts. Must be willing to work flexible hours and handle multiple projects.', 'https://digitalmarketingpro.net/careers', 'digitalmarketingpro.net', 55, 'Medium', ARRAY['Vague job responsibilities', 'Unverified company'], 'This job posting has some concerning elements but may be legitimate. Exercise caution.', ARRAY['Research company background', 'Ask detailed questions about role', 'Verify company address and contacts']),

('Data Analyst', 'Amazon.com Inc', 'Join our data analytics team to help drive business decisions through data insights. You will work with large datasets and create meaningful reports for stakeholders.', 'https://amazon.jobs/en/jobs/456', 'amazon.jobs', 20, 'Low', '{}', 'Legitimate job posting from verified company with realistic requirements.', ARRAY['Apply through official channels', 'Prepare for standard interview process']),

('Remote Customer Service Representative', 'Global Innovations Inc', 'Work from home opportunity! Earn $25-$40/hour! No experience needed! We provide all training! Must have bank account for direct deposit setup. Send SSN and bank details to get started!', 'https://globalinnovations.biz/jobs/remote', 'globalinnovations.biz', 95, 'High', ARRAY['Requests sensitive financial information', 'Too good to be true salary', 'No experience required', 'Immediate start', 'Suspicious contact method'], 'CRITICAL: This appears to be a scam designed to steal personal and financial information.', ARRAY['DO NOT provide SSN or bank details', 'Report this posting', 'Block all communication', 'Warn others about this scam']);

-- Insert sample scam reports
INSERT INTO scam_reports (report_type, description, evidence_urls, status, severity) VALUES
('fake_job', 'Job posting requesting upfront payment for equipment and training materials. Company claimed to be Google but used suspicious email domain.', ARRAY['https://example.com/screenshot1.png'], 'confirmed', 'high'),

('phishing', 'Received email claiming to be from Microsoft HR requesting personal information and bank details for background check.', ARRAY['https://example.com/email-screenshot.png'], 'investigating', 'critical'),

('payment_fraud', 'Asked to pay $500 for software licenses before starting remote work. Company disappeared after payment.', ARRAY['https://example.com/payment-proof.png'], 'confirmed', 'high'),

('identity_theft', 'Recruiter requested copy of drivers license, SSN, and passport for verification before interview.', '{}', 'pending', 'medium'),

('fake_job', 'Job posting for data entry work with unrealistic pay rates. No actual company address or phone number provided.', ARRAY['https://example.com/job-posting.png'], 'dismissed', 'low');