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
      // No need to manually insert or check for user data

      // Generate and store OTP
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      console.log('🔐 Generated OTP:', otp);

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

      // Get the latest valid OTP for this email
      const { data: otpData, error: otpError } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('email', email)
        .eq('otp_code', otp)
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
        console.log('❌ Invalid or expired OTP');
        return { success: false, message: 'Invalid or expired verification code' };
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

      // Mark previous OTPs as used
      await supabase
        .from('otp_verifications')
        .update({ is_used: true })
        .eq('email', email)
        .eq('is_used', false);

      // Generate new OTP
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      console.log('🔐 Generated new OTP:', otp);

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