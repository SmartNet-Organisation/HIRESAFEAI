# HireSafe AI - Job Scam Detection Platform

A comprehensive AI-powered platform that protects job seekers from fraudulent job postings and scams using advanced machine learning and blockchain technology.

## Features

- **Real-Time AI Scam Detection**: Advanced NLP analysis of job postings
- **Email Verification System**: OTP-based secure account verification
- **User Dashboard**: Comprehensive protection monitoring
- **Multiple User Types**: Job seekers, recruiters, career centers, and institutions
- **Blockchain Integration**: Immutable scam reports on Algorand
- **Responsive Design**: Beautiful, production-ready UI

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for production deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

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

4. Update `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. Apply database migrations:
```bash
npm run apply-migration
```

6. Start the development server:
```bash
npm run dev
```

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
├── hooks/              # Custom React hooks
├── lib/                # Library configurations
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Authentication Flow

1. **Sign Up**: User creates account with email/password
2. **OTP Verification**: Email verification with 6-digit code
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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.