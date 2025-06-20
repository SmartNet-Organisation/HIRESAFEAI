import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface JobAnalysis {
  id: string
  job_title: string
  company_name: string
  job_description: string
  job_url: string
  domain: string
  risk_score: number
  risk_level: 'Low' | 'Medium' | 'High'
  red_flags: string[]
  analysis_result: string
  recommendations: string[]
  user_id?: string
  created_at: string
  updated_at: string
}

export interface ScamReport {
  id: string
  job_analysis_id?: string
  reporter_id?: string
  report_type: 'fake_job' | 'phishing' | 'payment_fraud' | 'identity_theft' | 'other'
  description: string
  evidence_urls?: string[]
  status: 'pending' | 'investigating' | 'confirmed' | 'dismissed'
  severity: 'low' | 'medium' | 'high' | 'critical'
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  domain: string
  website_url?: string
  is_verified: boolean
  verification_score: number
  founded_year?: number
  employee_count?: string
  headquarters?: string
  industry?: string
  description?: string
  logo_url?: string
  social_links?: Record<string, string>
  red_flags: string[]
  trust_score: number
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  user_type: 'job_seeker' | 'career_center' | 'recruiter' | 'institution'
  subscription_tier: 'free' | 'premium' | 'enterprise'
  is_verified: boolean
  settings: Record<string, any>
  created_at: string
  updated_at: string
}

// Database functions
export const dbOperations = {
  // Job Analysis operations
  async createJobAnalysis(analysis: Omit<JobAnalysis, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('job_analyses')
      .insert([analysis])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getJobAnalyses(userId?: string, limit = 50) {
    let query = supabase
      .from('job_analyses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getJobAnalysisById(id: string) {
    const { data, error } = await supabase
      .from('job_analyses')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Scam Report operations
  async createScamReport(report: Omit<ScamReport, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('scam_reports')
      .insert([report])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getScamReports(limit = 50) {
    const { data, error } = await supabase
      .from('scam_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async updateScamReportStatus(id: string, status: ScamReport['status']) {
    const { data, error } = await supabase
      .from('scam_reports')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Company operations
  async createOrUpdateCompany(company: Omit<Company, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('companies')
      .upsert([company], { onConflict: 'domain' })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getCompanyByDomain(domain: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('domain', domain)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async searchCompanies(query: string, limit = 20) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .or(`name.ilike.%${query}%,domain.ilike.%${query}%`)
      .limit(limit)

    if (error) throw error
    return data
  },

  // User operations
  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async updateUserSettings(id: string, settings: Record<string, any>) {
    const { data, error } = await supabase
      .from('users')
      .update({ settings, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Analytics operations
  async getAnalytics(userId?: string, timeframe = '30d') {
    const startDate = new Date()
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90
    startDate.setDate(startDate.getDate() - days)

    let query = supabase
      .from('job_analyses')
      .select('risk_level, risk_score, created_at')
      .gte('created_at', startDate.toISOString())

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query
    if (error) throw error

    // Process analytics data
    const totalScans = data.length
    const highRiskCount = data.filter(item => item.risk_level === 'High').length
    const mediumRiskCount = data.filter(item => item.risk_level === 'Medium').length
    const lowRiskCount = data.filter(item => item.risk_level === 'Low').length
    const averageRiskScore = data.reduce((sum, item) => sum + item.risk_score, 0) / totalScans || 0

    return {
      totalScans,
      highRiskCount,
      mediumRiskCount,
      lowRiskCount,
      averageRiskScore: Math.round(averageRiskScore),
      timeframe,
      data
    }
  }
}