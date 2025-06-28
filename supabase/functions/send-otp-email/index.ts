import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, otp, name } = await req.json()

    // Email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HireSafe AI - Email Verification</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #000000; }
          .container { max-width: 600px; margin: 0 auto; background-color: #111827; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center; }
          .logo { color: white; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { padding: 40px 20px; color: #d1d5db; }
          .otp-box { background-color: #1f2937; border: 2px solid #6366f1; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
          .otp-code { font-size: 36px; font-weight: bold; color: #6366f1; letter-spacing: 8px; margin: 20px 0; }
          .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #374151; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🛡️ HIRESAFE AI</div>
            <div style="color: rgba(255,255,255,0.9); font-size: 16px;">AI-Powered Job Scam Protection</div>
          </div>
          
          <div class="content">
            <h2 style="color: white; margin-bottom: 20px;">Welcome to HireSafe AI, ${name}!</h2>
            
            <p>Thank you for joining our mission to protect job seekers from scams. To complete your account setup, please verify your email address using the code below:</p>
            
            <div class="otp-box">
              <div style="color: #9ca3af; margin-bottom: 10px;">Your Verification Code</div>
              <div class="otp-code">${otp}</div>
              <div style="color: #9ca3af; font-size: 14px;">This code expires in 10 minutes</div>
            </div>
            
            <p>Enter this code on the verification page to activate your account and start protecting your job search journey.</p>
            
            <div style="background-color: #1f2937; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <strong style="color: #f59e0b;">Security Note:</strong> Never share this code with anyone. HireSafe AI will never ask for your verification code via phone or email.
            </div>
            
            <p>If you didn't create this account, please ignore this email.</p>
          </div>
          
          <div class="footer">
            <p>© 2025 HireSafe AI. All rights reserved.</p>
            <p>This email was sent to ${email}</p>
          </div>
        </div>
      </body>
      </html>
    `

    // For demo purposes, we'll just log the email content
    // In production, you would integrate with an email service like SendGrid, Resend, etc.
    console.log('Sending OTP email to:', email)
    console.log('OTP Code:', otp)
    console.log('Email HTML:', emailHtml)

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP email sent successfully',
        // For demo purposes, return the OTP in the response
        demo_otp: otp 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending OTP email:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})