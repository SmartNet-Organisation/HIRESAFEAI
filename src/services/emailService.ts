export class EmailService {
  private static instance: EmailService;

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendOTPEmail(email: string, otp: string, name: string): Promise<{ success: boolean; message: string }> {
    try {
      // For demo purposes, we'll show the OTP in console and alert
      // In production, this would integrate with a real email service
      console.log(`📧 Sending OTP to ${email}`);
      console.log(`🔐 OTP Code: ${otp}`);
      console.log(`👤 User: ${name}`);
      
      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show OTP in alert for demo purposes
      alert(`Demo Mode: Your verification code is ${otp}\n\nIn production, this would be sent to your email: ${email}`);
      
      return {
        success: true,
        message: 'Verification code sent successfully!'
      };
    } catch (error) {
      console.error('Email service error:', error);
      return {
        success: false,
        message: 'Failed to send verification code. Please try again.'
      };
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      console.log(`📧 Sending welcome email to ${email}`);
      console.log(`👤 Welcome ${name} to HireSafe AI!`);
      
      // In production, send actual welcome email
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Welcome email error:', error);
    }
  }
}

export const emailService = EmailService.getInstance();