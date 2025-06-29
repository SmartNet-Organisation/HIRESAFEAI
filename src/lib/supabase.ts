// Placeholder file - Supabase integration removed
// This file will be recreated when you reintegrate Supabase

export const supabase = null;

// Placeholder types
export interface User {
  id: string;
  email: string;
  name: string;
  user_type: 'job-seeker' | 'career-center' | 'recruiter' | 'institution';
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface OTPVerification {
  id: string;
  email: string;
  otp_code: string;
  expires_at: string;
  is_used: boolean;
  created_at: string;
}