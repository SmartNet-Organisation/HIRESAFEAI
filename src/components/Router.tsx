import React, { useState } from 'react';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { OTPVerificationPage } from '../pages/OTPVerificationPage';
import { VerificationStatusPage } from '../pages/VerificationStatusPage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { DashboardPage } from '../pages/DashboardPage';

type Page = 'landing' | 'login' | 'signup' | 'forgot-password' | 'otp-verification' | 'verification-status' | 'onboarding' | 'dashboard';

export const Router: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [verificationData, setVerificationData] = useState<{
    email?: string;
    success?: boolean;
    message?: string;
    userName?: string;
  }>({});

  const navigate = (page: Page, data?: any) => {
    setCurrentPage(page);
    if (data) {
      setVerificationData(prev => ({ ...prev, ...data }));
    }
  };

  const handleOnboardingComplete = () => {
    navigate('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'signup':
        return <SignUpPage onNavigate={navigate} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={navigate} />;
      case 'otp-verification':
        return <OTPVerificationPage onNavigate={navigate} email={verificationData.email} />;
      case 'verification-status':
        return (
          <VerificationStatusPage
            onNavigate={navigate}
            success={verificationData.success}
            message={verificationData.message}
          />
        );
      case 'onboarding':
        return (
          <OnboardingPage
            onComplete={handleOnboardingComplete}
            userName={verificationData.userName || 'User'}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={navigate}
            userName={verificationData.userName || 'User'}
          />
        );
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
};