# HireSafe AI - Job Scam Detection Platform

A comprehensive AI-powered platform that protects job seekers from fraudulent job postings and scams using advanced machine learning and blockchain technology.

## Features

- **Real-Time AI Scam Detection**: Advanced NLP analysis of job postings
- **Email Verification System**: OTP-based secure account verification with real email delivery
- **User Dashboard**: Comprehensive protection monitoring
- **Multiple User Types**: Job seekers, recruiters, career centers, and institutions
- **Blockchain Integration**: Immutable scam reports on Algorand
- **Responsive Design**: Beautiful, production-ready UI

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Email Service**: Resend API for transactional emails
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for production deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Resend account (optional, for real email sending)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hiresafe-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: For real email sending (otherwise uses demo mode)
VITE_RESEND_API_KEY=your_resend_api_key_here
```

5. Apply database migrations:
```bash
npm run apply-migration
```

6. Start the development server:
```bash
npm run dev
```

## Email Configuration

### Demo Mode (Default)
By default, the application runs in demo mode where OTP codes are shown in alert popups. This is perfect for development and testing.

### Production Mode (Real Emails)
To send real emails to users:

1. **Sign up for Resend**: Go to [resend.com](https://resend.com) and create an account
2. **Get your API key**: In your Resend dashboard, generate an API key
3. **Add to environment**: Set `VITE_RESEND_API_KEY=re_your_api_key_here` in your `.env` file
4. **Restart the server**: The application will automatically detect the API key and switch to real email mode

### Email Features
- **OTP Verification**: Beautiful HTML emails with verification codes
- **Welcome Emails**: Sent after successful account verification
- **Responsive Design**: Emails look great on all devices
- **Security Focused**: Clear security warnings and best practices

## Database Setup

The application uses Supabase with the following tables:

- **users**: User profiles and verification status
- **otp_verifications**: Email verification codes

Run the migration script to set up the database schema:
```bash
npm run apply-migration
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── layout/         # Layout components
│   └── dashboard/      # Dashboard-specific components
├── pages/              # Page components
│   └── auth/          # Authentication pages
├── services/           # API services
│   ├── authService.ts  # Authentication logic
│   └── emailService.ts # Email sending logic
├── hooks/              # Custom React hooks
├── lib/                # Library configurations
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Authentication Flow

1. **Sign Up**: User creates account with email/password
2. **OTP Verification**: Email verification with 6-digit code (real email or demo alert)
3. **Sign In**: Authenticated access to dashboard
4. **Dashboard**: Protected user interface

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run apply-migration` - Apply database migrations

## Environment Variables

Required environment variables:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for migrations)

Optional environment variables:

- `VITE_RESEND_API_KEY` - Resend API key for real email sending (demo mode if not provided)

## Deployment

The application is ready for deployment on platforms like:

- Vercel
- Netlify
- AWS Amplify
- Any static hosting service

Build the project:
```bash
npm run build
```

The `dist` folder contains the production-ready files.

## Email Service Setup

### Using Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use their test domain for development)
3. Generate an API key
4. Add `VITE_RESEND_API_KEY=re_your_key_here` to your `.env` file

### Alternative Email Services

The email service is modular and can be easily adapted for other providers like:
- SendGrid
- Mailgun
- AWS SES
- Postmark

Simply modify the `sendRealEmail` method in `src/services/emailService.ts`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.