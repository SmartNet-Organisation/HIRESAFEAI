# Email Service Debugging Guide

## Steps to Debug Email Issues

1. **Check Console Logs**: Open browser developer tools (F12) and look at the console when you sign up. You should see detailed debugging information.

2. **Verify Environment Variables**: 
   - Make sure your `.env` file is in the root directory (same level as package.json)
   - Restart the development server after adding the API key
   - Check that the API key starts with `re_` and is longer than 15 characters

3. **Common Issues**:
   - **API Key Format**: Must start with `re_` (e.g., `re_123abc...`)
   - **Domain Verification**: For production, you need to verify your domain in Resend
   - **Rate Limits**: Free tier has sending limits
   - **Email Provider Blocking**: Some email providers block automated emails

4. **Testing Steps**:
   - Try with a different email address (Gmail, Yahoo, etc.)
   - Check spam/junk folder
   - Verify the API key is active in your Resend dashboard

5. **Fallback**: If real emails don't work, the system will show the OTP code in the success message for testing.

## Environment File Example

Your `.env` file should look like this:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
VITE_RESEND_API_KEY=re_your_actual_api_key_here
```

## Resend Setup

1. Go to https://resend.com and create an account
2. Verify your email address
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `re_`) to your `.env` file
6. For testing, you can use the default `resend.dev` domain
7. For production, add and verify your own domain