/*
  # Initial Schema for HireSafe AI

  1. New Tables
    - `users` - User accounts and profiles
    - `companies` - Company information and verification data
    - `job_analyses` - Job posting analysis results
    - `scam_reports` - User-reported scam incidents
    - `user_settings` - User preferences and settings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for data access control

  3. Indexes
    - Add performance indexes for common queries
    - Add full-text search indexes
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  user_type text NOT NULL CHECK (user_type IN ('job_seeker', 'career_center', 'recruiter', 'institution')),
  subscription_tier text NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'enterprise')),
  is_verified boolean DEFAULT false,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text UNIQUE NOT NULL,
  website_url text,
  is_verified boolean DEFAULT false,
  verification_score integer DEFAULT 0 CHECK (verification_score >= 0 AND verification_score <= 100),
  founded_year integer,
  employee_count text,
  headquarters text,
  industry text,
  description text,
  logo_url text,
  social_links jsonb DEFAULT '{}',
  red_flags text[] DEFAULT '{}',
  trust_score integer DEFAULT 50 CHECK (trust_score >= 0 AND trust_score <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Job analyses table
CREATE TABLE IF NOT EXISTS job_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text NOT NULL,
  company_name text NOT NULL,
  job_description text,
  job_url text,
  domain text NOT NULL,
  risk_score integer NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_level text NOT NULL CHECK (risk_level IN ('Low', 'Medium', 'High')),
  red_flags text[] DEFAULT '{}',
  analysis_result text,
  recommendations text[] DEFAULT '{}',
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  company_id uuid REFERENCES companies(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Scam reports table
CREATE TABLE IF NOT EXISTS scam_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_analysis_id uuid REFERENCES job_analyses(id) ON DELETE SET NULL,
  reporter_id uuid REFERENCES users(id) ON DELETE SET NULL,
  report_type text NOT NULL CHECK (report_type IN ('fake_job', 'phishing', 'payment_fraud', 'identity_theft', 'other')),
  description text NOT NULL,
  evidence_urls text[] DEFAULT '{}',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'confirmed', 'dismissed')),
  severity text DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User settings table (for complex settings that need querying)
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  setting_key text NOT NULL,
  setting_value jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, setting_key)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE scam_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for companies table
CREATE POLICY "Companies are readable by all authenticated users"
  ON companies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Companies can be inserted by authenticated users"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Companies can be updated by authenticated users"
  ON companies
  FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for job_analyses table
CREATE POLICY "Users can read own job analyses"
  ON job_analyses
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert job analyses"
  ON job_analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update own job analyses"
  ON job_analyses
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for scam_reports table
CREATE POLICY "Users can read own scam reports"
  ON scam_reports
  FOR SELECT
  TO authenticated
  USING (reporter_id = auth.uid() OR reporter_id IS NULL);

CREATE POLICY "Users can insert scam reports"
  ON scam_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (reporter_id = auth.uid() OR reporter_id IS NULL);

CREATE POLICY "Users can update own scam reports"
  ON scam_reports
  FOR UPDATE
  TO authenticated
  USING (reporter_id = auth.uid());

-- RLS Policies for user_settings table
CREATE POLICY "Users can manage own settings"
  ON user_settings
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_companies_domain ON companies(domain);
CREATE INDEX IF NOT EXISTS idx_companies_name_trgm ON companies USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_job_analyses_user_id ON job_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_job_analyses_domain ON job_analyses(domain);
CREATE INDEX IF NOT EXISTS idx_job_analyses_risk_level ON job_analyses(risk_level);
CREATE INDEX IF NOT EXISTS idx_job_analyses_created_at ON job_analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scam_reports_reporter_id ON scam_reports(reporter_id);
CREATE INDEX IF NOT EXISTS idx_scam_reports_status ON scam_reports(status);
CREATE INDEX IF NOT EXISTS idx_scam_reports_created_at ON scam_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_analyses_updated_at BEFORE UPDATE ON job_analyses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scam_reports_updated_at BEFORE UPDATE ON scam_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();