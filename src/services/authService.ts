import { supabase } from '../lib/supabase';
import { emailService } from './emailService';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  userType: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: any;
  requiresVerification?: boolean;
}

export class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Check if Supabase is available
  private isSupabaseAvailable(): boolean {
    return supabase !== null;
  }

  // Generate 6-digit OTP
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Sign up user and send OTP
  async signUp(data: SignUpData): Promise<AuthResult> {
    if (!this.isSupabaseAvailable()) {
      console.log('🚀 Mock signup for:', data.email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        success: true, 
        message: 'Account created successfully! (Mock mode - Supabase not connected)',
        requiresVerification: true
      };
    }

    try {
      console.log('🚀 Starting signup process for:', data.email);

      const cleanEmail = data.email.toLowerCase().trim();
      
      // Check if user already exists in our users table
      const { data: existingUser } = await supabase
        .from('users')
        .select('email, is_verified')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (existingUser) {
        if (existingUser.is_verified) {
          return { 
            success: false, 
            message: 'An account with this email already exists. Please sign in instead.' 
          };
        } else {
          console.log('🔄 User exists but not verified, resending OTP');
          return await this.resendOTP(cleanEmail);
        }
      }

      // Create user account with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: data.password,
        options: {
          emailRedirectTo: undefined,
          data: {
            name: data.name,
            user_type: data.userType,
            email_confirm: true
          }
        }
      });

      if (authError) {
        console.error('❌ Auth signup error:', authError);
        
        if (authError.message.includes('email_address_invalid') || authError.message.includes('invalid')) {
          return { success: false, message: 'Please enter a valid email address in the format: example@domain.com' };
        } else if (authError.message.includes('Password should be')) {
          return { success: false, message: 'Password must be at least 6 characters long' };
        } else if (authError.message.includes('User already registered') || authError.message.includes('already been registered')) {
          return { success: false, message: 'An account with this email already exists. Please sign in instead.' };
        } else if (authError.message.includes('weak_password')) {
          return { success: false, message: 'Password is too weak. Please use a stronger password.' };
        }
        
        return { success: false, message: authError.message };
      }

      if (!authData.user) {
        return { success: false, message: 'Failed to create user account' };
      }

      console.log('✅ Auth user created:', authData.user.id);

      // Generate and store OTP
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      console.log('🔐 Generated OTP:', otp);

      // Clear any existing OTPs for this email first
      await supabase
        .from('otp_verifications')
        .delete()
        .eq('email', cleanEmail);

      const { error: otpError } = await supabase
        .from('otp_verifications')
        .insert({
          email: cleanEmail,
          otp_code: otp,
          expires_at: expiresAt.toISOString(),
          is_used: false
        });

      if (otpError) {
        console.error('❌ Error storing OTP:', otpError);
        return { success: false, message: 'Failed to generate verification code' };
      }

      console.log('✅ OTP stored in database');

      // Send OTP email
      const emailResult = await emailService.sendOTPEmail(cleanEmail, otp, data.name);
      
      if (!emailResult.success) {
        console.error('❌ Failed to send OTP email');
      }

      console.log('✅ Signup process completed successfully');

      return { 
        success: true, 
        message: 'Account created successfully! Please check the alert popup for your verification code.',
        requiresVerification: true
      };
    } catch (error) {
      console.error('❌ Signup error:', error);
      return { success: false, message: 'An unexpected error occurred during signup. Please try again.' };
    }
  }

  // Verify OTP
  async verifyOTP(email: string, otp: string): Promise<AuthResult> {
    if (!this.isSupabaseAvailable()) {
      console.log('🔍 Mock OTP verification for:', email, 'with code:', otp);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        return { 
          success: true, 
          message: 'Email verified successfully! (Mock mode)',
          user: { name: 'Demo User', email }
        };
      }
      
      return { 
        success: false, 
        message: 'Invalid verification code (Mock mode - enter any 6 digits)' 
      };
    }

    try {
      console.log('🔍 Verifying OTP for:', email);

      const cleanEmail = email.toLowerCase().trim();
      const cleanOtp = otp.trim();

      // Get the latest valid OTP for this email
      const { data: otpData, error: otpError } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('email', cleanEmail)
        .eq('otp_code', cleanOtp)
        .eq('is_used', false)
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (otpError) {
        console.error('❌ OTP query error:', otpError);
        return { success: false, message: 'Failed to verify code' };
      }

      if (!otpData) {
        const { data: expiredOtp } = await supabase
          .from('otp_verifications')
          .select('*')
          .eq('email', cleanEmail)
          .eq('otp_code', cleanOtp)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (expiredOtp) {
          if (expiredOtp.is_used) {
            return { success: false, message: 'This verification code has already been used' };
          } else if (new Date(expiredOtp.expires_at) < new Date()) {
            return { success: false, message: 'Verification code has expired. Please request a new one' };
          }
        }

        return { success: false, message: 'Invalid verification code. Please check and try again' };
      }

      console.log('✅ Valid OTP found');

      // Mark OTP as used
      const { error: updateOtpError } = await supabase
        .from('otp_verifications')
        .update({ is_used: true })
        .eq('id', otpData.id);

      if (updateOtpError) {
        console.error('❌ Error updating OTP:', updateOtpError);
        return { success: false, message: 'Failed to verify code' };
      }

      // Update user verification status
      const { data: updatedUser, error: userUpdateError } = await supabase
        .from('users')
        .update({ is_verified: true })
        .eq('email', cleanEmail)
        .select('*')
        .single();

      if (userUpdateError) {
        console.error('❌ Error updating user verification:', userUpdateError);
        return { success: false, message: 'Failed to verify user' };
      }

      console.log('✅ User verified successfully');

      await emailService.sendWelcomeEmail(cleanEmail, updatedUser.name);

      return { 
        success: true, 
        message: 'Email verified successfully!',
        user: updatedUser
      };
    } catch (error) {
      console.error('❌ OTP verification error:', error);
      return { success: false, message: 'An unexpected error occurred during verification' };
    }
  }

  // Sign in user
  async signIn(data: LoginData): Promise<AuthResult> {
    if (!this.isSupabaseAvailable()) {
      console.log('🔑 Mock signin for:', data.email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        success: true, 
        message: 'Signed in successfully! (Mock mode)',
        user: { name: 'Demo User', email: data.email }
      };
    }

    try {
      console.log('🔑 Signing in user:', data.email);

      const cleanEmail = data.email.toLowerCase().trim();

      // First check if user exists in our users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (userError) {
        console.error('❌ Database error checking user:', userError);
        return { success: false, message: 'Database error. Please try again.' };
      }

      if (!userData) {
        console.error('❌ User not found in users table');
        return { success: false, message: 'Invalid email or password' };
      }

      if (!userData.is_verified) {
        console.log('⚠️ User not verified');
        return { 
          success: false, 
          message: 'Please verify your email before signing in. Check your email for the verification code.',
          requiresVerification: true
        };
      }

      // Now attempt to sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: data.password
      });

      if (authError) {
        console.error('❌ Auth signin error:', authError);
        
        if (authError.message.includes('Invalid login credentials') || 
            authError.message.includes('invalid_credentials') ||
            authError.message.includes('Invalid email or password')) {
          return { success: false, message: 'Invalid email or password' };
        } else if (authError.message.includes('Email not confirmed')) {
          return { 
            success: false, 
            message: 'Please verify your email before signing in',
            requiresVerification: true
          };
        } else if (authError.message.includes('too_many_requests')) {
          return { success: false, message: 'Too many login attempts. Please wait a moment and try again.' };
        }
        
        return { success: false, message: 'Login failed. Please check your credentials and try again.' };
      }

      if (!authData.user) {
        return { success: false, message: 'Invalid credentials' };
      }

      console.log('✅ Auth signin successful');

      return { 
        success: true, 
        message: 'Signed in successfully!',
        user: userData
      };
    } catch (error) {
      console.error('❌ Signin error:', error);
      return { success: false, message: 'An unexpected error occurred during signin' };
    }
  }

  // Sign out user
  async signOut(): Promise<AuthResult> {
    if (!this.isSupabaseAvailable()) {
      console.log('👋 Mock signout');
      return { success: true, message: 'Signed out successfully! (Mock mode)' };
    }

    try {
      console.log('👋 Signing out user');

      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Signout error:', error);
        return { success: false, message: error.message };
      }

      console.log('✅ Signout successful');
      return { success: true, message: 'Signed out successfully!' };
    } catch (error) {
      console.error('❌ Signout error:', error);
      return { success: false, message: 'An unexpected error occurred during signout' };
    }
  }

  // Get current user
  async getCurrentUser() {
    if (!this.isSupabaseAvailable()) {
      return null;
    }

    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError || !userData) {
        return null;
      }

      return userData;
    } catch (error) {
      console.error('❌ Get current user error:', error);
      return null;
    }
  }

  // Resend OTP
  async resendOTP(email: string): Promise<AuthResult> {
    if (!this.isSupabaseAvailable()) {
      console.log('🔄 Mock resend OTP for:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        success: true, 
        message: 'New verification code sent! (Mock mode - enter any 6 digits)' 
      };
    }

    try {
      console.log('🔄 Resending OTP for:', email);

      const cleanEmail = email.toLowerCase().trim();

      // Check if user exists
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('name, is_verified')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (userError || !userData) {
        return { success: false, message: 'User not found' };
      }

      if (userData.is_verified) {
        return { success: false, message: 'Email is already verified' };
      }

      // Clear all previous OTPs for this email
      await supabase
        .from('otp_verifications')
        .delete()
        .eq('email', cleanEmail);

      // Generate new OTP
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      console.log('🔐 Generated new OTP:', otp);

      // Insert new OTP
      const { error: otpError } = await supabase
        .from('otp_verifications')
        .insert({
          email: cleanEmail,
          otp_code: otp,
          expires_at: expiresAt.toISOString(),
          is_used: false
        });

      if (otpError) {
        console.error('❌ Error storing new OTP:', otpError);
        return { success: false, message: 'Failed to generate new verification code' };
      }

      // Send OTP email
      const emailResult = await emailService.sendOTPEmail(cleanEmail, otp, userData.name);
      
      if (!emailResult.success) {
        console.error('❌ Failed to send OTP email');
      }

      console.log('✅ OTP resent successfully');

      return { 
        success: true, 
        message: 'New verification code sent! Check the alert popup for your new code.' 
      };
    } catch (error) {
      console.error('❌ Resend OTP error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  }

  // Check if email exists and is verified
  async checkEmailStatus(email: string): Promise<{ exists: boolean; verified: boolean }> {
    if (!this.isSupabaseAvailable()) {
      return { exists: false, verified: false };
    }

    try {
      const cleanEmail = email.toLowerCase().trim();
      const { data: userData } = await supabase
        .from('users')
        .select('is_verified')
        .eq('email', cleanEmail)
        .maybeSingle();

      return {
        exists: !!userData,
        verified: userData?.is_verified || false
      };
    } catch (error) {
      console.error('❌ Check email status error:', error);
      return { exists: false, verified: false };
    }
  }
}

export const authService = AuthService.getInstance();