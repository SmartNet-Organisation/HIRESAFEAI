import React, { useState } from 'react';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignUpPage } from '../pages/auth/SignUpPage';
import { OTPVerificationPage } from '../pages/auth/OTPVerificationPage';
import { DashboardPage } from '../pages/DashboardPage';

type Page = 'landing' | 'login' | 'signup' | 'otp-verification' | 'dashboard';

export const Router: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userData, setUserData] = useState<any>({});

  const navigate = (page: Page, data?: any) => {
    setCurrentPage(page);
    if (data) {
      setUserData(prev => ({ ...prev, ...data }));
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'signup':
        return <SignUpPage onNavigate={navigate} />;
      case 'otp-verification':
        return (
          <OTPVerificationPage 
            onNavigate={navigate} 
            email={userData.email || ''} 
            userName={userData.userName || 'User'}
          />
        );
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} userName={userData.userName || 'User'} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
};