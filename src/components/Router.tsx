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
    console.log(`🧭 Navigating to: ${page}`, data);
    
    try {
      setCurrentPage(page);
      if (data) {
        setUserData(prev => ({ ...prev, ...data }));
        console.log('📝 Updated user data:', { ...userData, ...data });
      }
    } catch (error) {
      console.error('❌ Navigation error:', error);
      // If navigation fails, stay on current page
    }
  };

  const renderPage = () => {
    console.log(`🎯 Rendering page: ${currentPage}`);
    console.log('📊 Current user data:', userData);
    
    try {
      switch (currentPage) {
        case 'landing':
          return <LandingPage onNavigate={navigate} />;
        case 'login':
          return <LoginPage onNavigate={navigate} />;
        case 'signup':
          return <SignUpPage onNavigate={navigate} />;
        case 'otp-verification':
          console.log('📧 Rendering OTP verification with data:', userData);
          // Ensure we have required data for OTP verification
          if (!userData.email) {
            console.warn('⚠️ No email found for OTP verification, redirecting to signup');
            setTimeout(() => navigate('signup'), 100);
            return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
          }
          return (
            <OTPVerificationPage 
              onNavigate={navigate} 
              email={userData.email || ''} 
              userName={userData.userName || 'User'}
            />
          );
        case 'dashboard':
          // Ensure we have required data for dashboard
          if (!userData.userName) {
            console.warn('⚠️ No user name found for dashboard, redirecting to login');
            setTimeout(() => navigate('login'), 100);
            return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
          }
          return <DashboardPage onNavigate={navigate} userName={userData.userName || 'User'} />;
        default:
          console.warn('⚠️ Unknown page:', currentPage, 'redirecting to landing');
          setTimeout(() => navigate('landing'), 100);
          return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
      }
    } catch (error) {
      console.error('❌ Error rendering page:', error);
      // If page rendering fails, go back to landing page
      setTimeout(() => navigate('landing'), 100);
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-4">Redirecting to home page...</p>
          </div>
        </div>
      );
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
};