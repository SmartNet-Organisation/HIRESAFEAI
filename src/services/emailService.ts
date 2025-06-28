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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show OTP in alert for demo purposes with better formatting
      const alertMessage = `🛡️ HireSafe AI - Email Verification\n\n` +
                          `Hello ${name}!\n\n` +
                          `Your verification code is: ${otp}\n\n` +
                          `This code will expire in 10 minutes.\n\n` +
                          `📧 Email: ${email}\n\n` +
                          `Note: In production, this code would be sent to your email inbox.`;
      
      alert(alertMessage);
      
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
      
      // Show welcome message
      console.log(`✅ Welcome email sent to ${name} at ${email}`);
    } catch (error) {
      console.error('Welcome email error:', error);
    }
  }
}

export const emailService = EmailService.getInstance();