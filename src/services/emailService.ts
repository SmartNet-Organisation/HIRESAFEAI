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
      console.log(`📧 Attempting to send OTP email to ${email}`);
      
      // Check if we're in production mode with Resend API key
      const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
      
      console.log('🔑 Environment check:');
      console.log('  - API key exists:', !!resendApiKey);
      console.log('  - API key starts with re_:', resendApiKey?.startsWith('re_'));
      console.log('  - API key is not placeholder:', resendApiKey !== 'your-resend-api-key-here');
      console.log('  - API key length:', resendApiKey?.length || 0);
      console.log('  - First 10 chars:', resendApiKey?.substring(0, 10) || 'none');
      
      if (resendApiKey && resendApiKey.startsWith('re_') && resendApiKey !== 'your-resend-api-key-here' && resendApiKey.length > 10) {
        // Production mode - send real email via Resend
        console.log('✅ Using production mode - sending real email via Resend');
        return await this.sendRealEmail(email, otp, name, resendApiKey);
      } else {
        // Demo mode - show in console only
        console.log('⚠️ Using demo mode - API key not valid or not found');
        console.log('⚠️ Reasons for demo mode:');
        console.log('  - No API key:', !resendApiKey);
        console.log('  - Wrong format:', !resendApiKey?.startsWith('re_'));
        console.log('  - Is placeholder:', resendApiKey === 'your-resend-api-key-here');
        console.log('  - Too short:', (resendApiKey?.length || 0) <= 10);
        console.log(`📧 Demo mode: OTP for ${email} is: ${otp}`);
        
        // Show alert in demo mode for now
        alert(`🛡️ HireSafe AI - Email Verification (Demo Mode)\n\nYour verification code is: ${otp}\n\nEmail: ${email}\n\nNote: Add your valid Resend API key to .env file to send real emails.\n\nMake sure your .env file contains:\nVITE_RESEND_API_KEY=re_your_actual_api_key_here`);
        
        return {
          success: true,
          message: 'Verification code sent! (Demo mode - check alert popup)'
        };
      }
      
    } catch (error) {
      console.error('❌ Email service error:', error);
      return {
        success: false,
        message: 'Failed to send verification code. Please try again.'
      };
    }
  }

  private async sendRealEmail(email: string, otp: string, name: string, apiKey: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log('📧 Sending real email via Resend API...');
      console.log('📧 Email details:', { to: email, from: 'HireSafe AI <noreply@hiresafe.ai>' });
      console.log('📧 Using API key:', apiKey.substring(0, 10) + '...');
      
      const emailData = {
        from: 'HireSafe AI <noreply@hiresafe.ai>',
        to: [email],
        subject: 'Verify your HireSafe AI account',
        html: this.generateEmailHTML(otp, name, email)
      };

      console.log('📧 Making API request to Resend...');
      
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      console.log('📧 Resend API response status:', response.status);
      console.log('📧 Resend API response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Resend API error response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        console.error('❌ Resend API error:', errorData);
        
        // Show specific error message
        if (errorData.message) {
          console.error('❌ Resend error message:', errorData.message);
          
          // Check for common errors
          if (errorData.message.includes('API key') || errorData.message.includes('Unauthorized')) {
            return {
              success: false,
              message: 'Invalid Resend API key. Please check your .env file and make sure you have a valid API key from resend.com'
            };
          } else if (errorData.message.includes('domain') || errorData.message.includes('sender')) {
            return {
              success: false,
              message: 'Email domain not verified in Resend. Please verify your domain in Resend dashboard or use their test domain.'
            };
          } else if (errorData.message.includes('rate limit')) {
            return {
              success: false,
              message: 'Rate limit exceeded. Please wait a moment and try again.'
            };
          }
        }
        
        // Fallback to demo mode with alert
        console.log('📧 Falling back to demo mode with alert...');
        alert(`🛡️ HireSafe AI - Email Verification (Fallback)\n\nYour verification code is: ${otp}\n\nEmail: ${email}\n\nNote: Email sending failed - ${errorData.message || 'Unknown error'}`);
        
        return {
          success: true,
          message: 'Verification code provided! (Email sending failed - check console for details)'
        };
      }

      const result = await response.json();
      console.log('✅ Email sent successfully via Resend:', result);

      return {
        success: true,
        message: 'Verification code sent to your email! Check your inbox (and spam folder).'
      };

    } catch (error) {
      console.error('❌ Real email sending failed:', error);
      
      // Fallback to demo mode with alert
      console.log('📧 Falling back to demo mode with alert...');
      alert(`🛡️ HireSafe AI - Email Verification (Fallback)\n\nYour verification code is: ${otp}\n\nEmail: ${email}\n\nNote: Network error occurred - ${error.message}`);
      
      return {
        success: true,
        message: 'Verification code provided! (Network error - check console for details)'
      };
    }
  }

  private generateEmailHTML(otp: string, name: string, email: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HireSafe AI - Email Verification</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 0; 
            background-color: #000000; 
            color: #ffffff;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #111827; 
            border-radius: 12px;
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
            padding: 40px 20px; 
            text-align: center; 
          }
          .logo { 
            color: white; 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 10px; 
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          .content { 
            padding: 40px 20px; 
            color: #d1d5db; 
            line-height: 1.6;
          }
          .otp-box { 
            background-color: #1f2937; 
            border: 2px solid #6366f1; 
            border-radius: 12px; 
            padding: 30px; 
            text-align: center; 
            margin: 30px 0; 
          }
          .otp-code { 
            font-size: 36px; 
            font-weight: bold; 
            color: #6366f1; 
            letter-spacing: 8px; 
            margin: 20px 0; 
            font-family: 'Courier New', monospace;
          }
          .footer { 
            padding: 20px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px; 
            border-top: 1px solid #374151; 
          }
          .security-note {
            background-color: #1f2937; 
            border-left: 4px solid #f59e0b; 
            padding: 15px; 
            margin: 20px 0; 
            border-radius: 4px;
          }
          .security-note strong {
            color: #f59e0b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              🛡️ HIRESAFE AI
            </div>
            <div style="color: rgba(255,255,255,0.9); font-size: 16px;">AI-Powered Job Scam Protection</div>
          </div>
          
          <div class="content">
            <h2 style="color: white; margin-bottom: 20px;">Welcome to HireSafe AI, ${name}!</h2>
            
            <p>Thank you for joining our mission to protect job seekers from scams. To complete your account setup, please verify your email address using the code below:</p>
            
            <div class="otp-box">
              <div style="color: #9ca3af; margin-bottom: 10px; font-size: 14px;">Your Verification Code</div>
              <div class="otp-code">${otp}</div>
              <div style="color: #9ca3af; font-size: 14px;">This code expires in 10 minutes</div>
            </div>
            
            <p>Enter this code on the verification page to activate your account and start protecting your job search journey.</p>
            
            <div class="security-note">
              <strong>Security Note:</strong> Never share this code with anyone. HireSafe AI will never ask for your verification code via phone or email.
            </div>
            
            <p>If you didn't create this account, please ignore this email.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #9ca3af; font-size: 14px;">
                Having trouble? Contact our support team at support@hiresafe.ai
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2025 HireSafe AI. All rights reserved.</p>
            <p>This email was sent to ${email}</p>
            <p style="margin-top: 10px;">
              <a href="#" style="color: #6366f1; text-decoration: none;">Privacy Policy</a> | 
              <a href="#" style="color: #6366f1; text-decoration: none;">Terms of Service</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      console.log(`📧 Sending welcome email to ${email}`);
      
      const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
      
      if (resendApiKey && resendApiKey.startsWith('re_') && resendApiKey !== 'your-resend-api-key-here') {
        // Send real welcome email
        const emailData = {
          from: 'HireSafe AI <welcome@hiresafe.ai>',
          to: [email],
          subject: 'Welcome to HireSafe AI! Your account is now protected',
          html: this.generateWelcomeEmailHTML(name, email)
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Welcome email sent successfully:', result.id);
        } else {
          const errorData = await response.json();
          console.error('❌ Failed to send welcome email:', errorData);
        }
      } else {
        // Demo mode
        console.log(`✅ Welcome email sent to ${name} at ${email} (Demo mode)`);
      }
    } catch (error) {
      console.error('Welcome email error:', error);
    }
  }

  private generateWelcomeEmailHTML(name: string, email: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to HireSafe AI</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 0; 
            background-color: #000000; 
            color: #ffffff;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #111827; 
            border-radius: 12px;
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
            padding: 40px 20px; 
            text-align: center; 
          }
          .logo { 
            color: white; 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 10px; 
          }
          .content { 
            padding: 40px 20px; 
            color: #d1d5db; 
            line-height: 1.6;
          }
          .feature-box {
            background-color: #1f2937;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #6366f1;
          }
          .footer { 
            padding: 20px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px; 
            border-top: 1px solid #374151; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🛡️ HIRESAFE AI</div>
            <div style="color: rgba(255,255,255,0.9); font-size: 18px;">Welcome to the Future of Job Security!</div>
          </div>
          
          <div class="content">
            <h2 style="color: white; margin-bottom: 20px;">🎉 Welcome ${name}!</h2>
            
            <p>Your HireSafe AI account is now active and protecting your job search journey. You're now part of a community dedicated to eliminating job scams and creating a safer employment landscape.</p>
            
            <div class="feature-box">
              <h3 style="color: #6366f1; margin-top: 0;">🔍 What's Next?</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Start scanning job postings for potential scams</li>
                <li>Set up custom alerts for your job search</li>
                <li>Access our comprehensive scam database</li>
                <li>Join our community of protected job seekers</li>
              </ul>
            </div>
            
            <div class="feature-box">
              <h3 style="color: #10b981; margin-top: 0;">🛡️ Your Protection Features</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li><strong>Real-time AI Scam Detection</strong> - Instant analysis of job postings</li>
                <li><strong>Email Security</strong> - Protection against phishing attempts</li>
                <li><strong>Company Verification</strong> - Check recruiter credentials</li>
                <li><strong>Blockchain Reports</strong> - Immutable scam records</li>
              </ul>
            </div>
            
            <p>Ready to start your protected job search? Log in to your dashboard and begin exploring opportunities with confidence.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://hiresafe.ai/dashboard" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                Access Your Dashboard
              </a>
            </div>
            
            <p style="color: #9ca3af; font-size: 14px;">
              Need help getting started? Check out our <a href="#" style="color: #6366f1;">Quick Start Guide</a> or contact our support team.
            </p>
          </div>
          
          <div class="footer">
            <p>© 2025 HireSafe AI. All rights reserved.</p>
            <p>This email was sent to ${email}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const emailService = EmailService.getInstance();