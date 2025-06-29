// Mock authentication service - Supabase integration removed
// This will be replaced when you reintegrate Supabase

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

  // Mock sign up - will be replaced with real Supabase integration
  async signUp(data: SignUpData): Promise<AuthResult> {
    console.log('🚀 Mock signup for:', data.email);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always succeed
    return { 
      success: true, 
      message: 'Account created successfully! (Mock mode - Supabase not connected)',
      requiresVerification: true
    };
  }

  // Mock OTP verification
  async verifyOTP(email: string, otp: string): Promise<AuthResult> {
    console.log('🔍 Mock OTP verification for:', email, 'with code:', otp);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any 6-digit code
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

  // Mock sign in
  async signIn(data: LoginData): Promise<AuthResult> {
    console.log('🔑 Mock signin for:', data.email);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always succeed with any credentials
    return { 
      success: true, 
      message: 'Signed in successfully! (Mock mode)',
      user: { name: 'Demo User', email: data.email }
    };
  }

  // Mock sign out
  async signOut(): Promise<AuthResult> {
    console.log('👋 Mock signout');
    return { success: true, message: 'Signed out successfully! (Mock mode)' };
  }

  // Mock get current user
  async getCurrentUser() {
    return null;
  }

  // Mock resend OTP
  async resendOTP(email: string): Promise<AuthResult> {
    console.log('🔄 Mock resend OTP for:', email);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { 
      success: true, 
      message: 'New verification code sent! (Mock mode - enter any 6 digits)' 
    };
  }

  // Mock check email status
  async checkEmailStatus(email: string): Promise<{ exists: boolean; verified: boolean }> {
    return { exists: false, verified: false };
  }
}

export const authService = AuthService.getInstance();