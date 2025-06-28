import { supabase } from '../lib/supabase';

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

export class AuthService {
  // Generate 6-digit OTP
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP via email using Supabase Edge Function
  private async sendOTPEmail(email: string, otp: string, name: string): Promise<void> {
    try {
      const { error } = await supabase.functions.invoke('send-otp-email', {
        body: {
          email,
          otp,
          name
        }
      });

      if (error) {
        console.error('Error sending OTP email:', error);
        // Fallback: For demo purposes, we'll show the OTP in an alert
        console.log(`OTP for ${email}: ${otp}`);
        alert(`Demo Mode: Your OTP is ${otp}`);
      }
    } catch (error) {
      console.error('Error sending OTP email:', error);
      // Fallback: For demo purposes, we'll show the OTP in an alert
      console.log(`OTP for ${email}: ${otp}`);
      alert(`Demo Mode: Your OTP is ${otp}`);
    }
  }

  // Sign up user and send OTP
  async signUp(data: SignUpData): Promise<{ success: boolean; message: string }> {
    try {
      // Create user account with Supabase Auth
      // The database trigger will automatically handle inserting into the users table
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
        return { success: false, message: authError.message };
      }

      if (!authData.user) {
        return { success: false, message: 'Failed to create user account' };
      }

      // Generate and store OTP
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      const { error: otpError } = await supabase
        .from('otp_verifications')
        .insert({
          email: data.email,
          otp_code: otp,
          expires_at: expiresAt.toISOString(),
          is_used: false
        });

      if (otpError) {
        console.error('Error storing OTP:', otpError);
        return { success: false, message: 'Failed to generate verification code' };
      }

      // Send OTP email
      await this.sendOTPEmail(data.email, otp, data.name);

      return { 
        success: true, 
        message: 'Account created successfully! Please check your email for the verification code.' 
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  }

  // Verify OTP
  async verifyOTP(email: string, otp: string): Promise<{ success: boolean; message: string }> {
    try {
      // Get the latest OTP for this email
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

      if (otpError || !otpData) {
        return { success: false, message: 'Invalid or expired verification code' };
      }

      // Mark OTP as used
      const { error: updateOtpError } = await supabase
        .from('otp_verifications')
        .update({ is_used: true })
        .eq('id', otpData.id);

      if (updateOtpError) {
        console.error('Error updating OTP:', updateOtpError);
        return { success: false, message: 'Failed to verify code' };
      }

      // Update user verification status
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({ is_verified: true })
        .eq('email', email);

      if (userUpdateError) {
        console.error('Error updating user verification:', userUpdateError);
        return { success: false, message: 'Failed to verify user' };
      }

      return { success: true, message: 'Email verified successfully!' };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  }

  // Sign in user
  async signIn(data: LoginData): Promise<{ success: boolean; message: string; user?: any }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (authError) {
        return { success: false, message: authError.message };
      }

      if (!authData.user) {
        return { success: false, message: 'Invalid credentials' };
      }

      // Get user data from our custom table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError || !userData) {
        return { success: false, message: 'User data not found' };
      }

      if (!userData.is_verified) {
        return { success: false, message: 'Please verify your email before signing in' };
      }

      return { 
        success: true, 
        message: 'Signed in successfully!',
        user: userData
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  }

  // Sign out user
  async signOut(): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Signed out successfully!' };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, message: 'An unexpected error occurred' };
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
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Resend OTP
  async resendOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
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

      // Generate new OTP
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      // Mark previous OTPs as used
      await supabase
        .from('otp_verifications')
        .update({ is_used: true })
        .eq('email', email)
        .eq('is_used', false);

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
        console.error('Error storing new OTP:', otpError);
        return { success: false, message: 'Failed to generate new verification code' };
      }

      // Send OTP email
      await this.sendOTPEmail(email, otp, userData.name);

      return { 
        success: true, 
        message: 'New verification code sent to your email!' 
      };
    } catch (error) {
      console.error('Resend OTP error:', error);
      return { success: false, message: 'An unexpected error occurred' };
    }
  }
}

export const authService = new AuthService();