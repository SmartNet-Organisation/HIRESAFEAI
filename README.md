# HireSafe AI - Job Scam Detection Platform

A comprehensive AI-powered platform that protects job seekers from fraudulent job postings and scams using advanced machine learning.

## Features

- **Real-Time AI Scam Detection**: Advanced NLP analysis of job postings
- **User Dashboard**: Comprehensive protection monitoring
- **Multiple User Types**: Job seekers, recruiters, career centers, and institutions
- **Responsive Design**: Beautiful, production-ready UI

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for production deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

3. Start the development server:
```bash
npm run dev
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
├── services/           # API services (currently mock)
├── hooks/              # Custom React hooks
├── lib/                # Library configurations
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Current Status

The application is currently running in **mock mode** with simulated authentication and email services. The frontend is fully functional and ready for backend integration.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Next Steps

To integrate with a real backend:

1. Set up your database (Supabase, Firebase, etc.)
2. Replace the mock services in `src/services/` with real implementations
3. Add environment variables for your backend configuration
4. Update the authentication flow to use your chosen provider

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.