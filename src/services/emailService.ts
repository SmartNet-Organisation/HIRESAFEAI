// Mock email service - Supabase integration removed
// This will be replaced when you reintegrate Supabase

export class EmailService {
  private static instance: EmailService;

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendOTPEmail(email: string, otp: string, name: string): Promise<{ success: boolean; message: string }> {
    console.log(`📧 Mock: Sending OTP to ${email}`);
    console.log(`🔐 Mock OTP Code: ${otp}`);
    console.log(`👤 User: ${name}`);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show mock OTP in alert for demo purposes
    const alertMessage = `🛡️ HireSafe AI - Mock Email Verification\n\n` +
                        `Hello ${name}!\n\n` +
                        `Your mock verification code is:\n\n` +
                        `${otp}\n\n` +
                        `This is a demo code (any 6 digits will work).\n\n` +
                        `📧 Email: ${email}\n\n` +
                        `Note: Supabase is not connected. This is mock mode.`;
    
    alert(alertMessage);
    
    return {
      success: true,
      message: 'Mock verification code sent successfully!'
    };
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    console.log(`📧 Mock: Sending welcome email to ${email}`);
    console.log(`👤 Welcome ${name} to HireSafe AI! (Mock mode)`);
  }
}

export const emailService = EmailService.getInstance();