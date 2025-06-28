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

  // Generate 6-digit OTP
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Sign up user and send OTP
  async signUp(data: SignUpData): Promise<AuthResult> {
    try {
      console.log('🚀 Starting signup process for:', data.email);

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('email, is_verified')
        .eq('email', data.email)
        .maybeSingle();

      if (existingUser) {
        if (existingUser.is_verified) {
          return { 
            success: false, 
            message: 'An account with this email already exists. Please sign in instead.' 
          };
        } else {
          // User exists but not verified, allow resending OTP
          return await this.resendOTP(data.email);
        }
      }

      // Create user account with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            user_type: data.userType
          }
        }
      });

      if (authError) {
        console.error('❌ Auth signup error:', authError);
        return { success: false, message: authError.message };
      }

      if (!authData.user) {
        return { success: false, message: 'Failed to create user account' };
      }

      console.log('✅ Auth user created:', authData.user.id);

      // The database trigger will automatically create the user record
      // Wait a moment for the trigger to complete
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate and store OTP
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      console.log('🔐 Generated OTP:', otp);
      console.log('⏰ OTP expires at:', expiresAt.toISOString());

      // Clear any existing OTPs for this email first
      await supabase
        .from('otp_verifications')
        .delete()
        .eq('email', data.email);

      const { error: otpError } = await supabase
        .from('otp_verifications')
        .insert({
          email: data.email,
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
      const emailResult = await emailService.sendOTPEmail(data.email, otp, data.name);
      
      if (!emailResult.success) {
        console.error('❌ Failed to send OTP email');
        // Don't fail the signup, just log the error
      }

      console.log('✅ Signup process completed successfully');

      return { 
        success: true, 
        message: 'Account created successfully! Please check your email for the verification code.',
        requiresVerification: true
      };
    } catch (error) {
      console.error('❌ Signup error:', error);
      return { success: false, message: 'An unexpected error occurred during signup' };
    }
  }

  // Verify OTP
  async verifyOTP(email: string, otp: string): Promise<AuthResult> {
    try {
      console.log('🔍 Verifying OTP for:', email);
      console.log('🔐 OTP provided:', otp);
      console.log('⏰ Current time:', new Date().toISOString());

      // First, let's check all OTPs for this email to debug
      const { data: allOtps, error: debugError } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

      if (debugError) {
        console.error('❌ Debug query error:', debugError);
      } else {
        console.log('🔍 All OTPs for email:', allOtps);
      }

      // Get the latest valid OTP for this email
      const { data: otpData, error: otpError } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('email', email)
        .eq('otp_code', otp.trim())
        .eq('is_used', false)
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (otpError) {
        console.error('❌ OTP query error:', otpError);
        return { success: false, message: 'Failed to verify code' };
      }

      console.log('🔍 Found OTP data:', otpData);

      if (!otpData) {
        // Let's check if there's an OTP that matches but might be expired or used
        const { data: expiredOtp } = await supabase
          .from('otp_verifications')
          .select('*')
          .eq('email', email)
          .eq('otp_code', otp.trim())
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (expiredOtp) {
          if (expiredOtp.is_used) {
            console.log('❌ OTP already used');
            return { success: false, message: 'This verification code has already been used' };
          } else if (new Date(expiredOtp.expires_at) < new Date()) {
            console.log('❌ OTP expired');
            return { success: false, message: 'Verification code has expired. Please request a new one' };
          }
        }

        console.log('❌ Invalid OTP - no matching record found');
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
        .eq('email', email)
        .select('*')
        .single();

      if (userUpdateError) {
        console.error('❌ Error updating user verification:', userUpdateError);
        return { success: false, message: 'Failed to verify user' };
      }

      console.log('✅ User verified successfully');

      // Send welcome email
      await emailService.sendWelcomeEmail(email, updatedUser.name);

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
    try {
      console.log('🔑 Signing in user:', data.email);

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (authError) {
        console.error('❌ Auth signin error:', authError);
        return { success: false, message: authError.message };
      }

      if (!authData.user) {
        return { success: false, message: 'Invalid credentials' };
      }

      console.log('✅ Auth signin successful');

      // Get user data from our custom table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError || !userData) {
        console.error('❌ User data not found:', userError);
        return { success: false, message: 'User profile not found' };
      }

      if (!userData.is_verified) {
        console.log('⚠️ User not verified');
        return { 
          success: false, 
          message: 'Please verify your email before signing in',
          requiresVerification: true
        };
      }

      console.log('✅ Signin completed successfully');

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
    try {
      console.log('🔄 Resending OTP for:', email);

      // Check if user exists
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('name, is_verified')
        .eq('email', email)
        .single();

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
        .eq('email', email);

      // Generate new OTP
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      console.log('🔐 Generated new OTP:', otp);
      console.log('⏰ New OTP expires at:', expiresAt.toISOString());

      // Insert new OTP
      const { error: otpError } = await supabase
        .from('otp_verifications')
        .insert({
          email,
          otp_code: otp,
          expires_at: expiresAt.toISOString(),
          is_used: false
        });

      if (otpError) {
        console.error('❌ Error storing new OTP:', otpError);
        return { success: false, message: 'Failed to generate new verification code' };
      }

      // Send OTP email
      const emailResult = await emailService.sendOTPEmail(email, otp, userData.name);
      
      if (!emailResult.success) {
        console.error('❌ Failed to send OTP email');
      }

      console.log('✅ OTP resent successfully');

      return { 
        success: true, 
        message: 'New verification code sent to your email!' 
      };
    } catch (error) {
      console.error('❌ Resend OTP error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  }

  // Check if email exists and is verified
  async checkEmailStatus(email: string): Promise<{ exists: boolean; verified: boolean }> {
    try {
      const { data: userData } = await supabase
        .from('users')
        .select('is_verified')
        .eq('email', email)
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