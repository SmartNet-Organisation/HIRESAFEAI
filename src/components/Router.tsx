import React, { useState } from 'react';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { OTPVerificationPage } from '../pages/OTPVerificationPage';
import { VerificationStatusPage } from '../pages/VerificationStatusPage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CareerCenterDashboard } from '../pages/CareerCenterDashboard';
import { RecruiterDashboard } from '../pages/RecruiterDashboard';
import { InstitutionDashboard } from '../pages/InstitutionDashboard';
import { JobAnalysisPage } from '../pages/JobAnalysisPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { CompanyInsightsPage } from '../pages/CompanyInsightsPage';
import { ScamReportHistoryPage } from '../pages/ScamReportHistoryPage';
import { EmergencySafetyPage } from '../pages/EmergencySafetyPage';
import { UserProfilePage } from '../pages/UserProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { PricingPage } from '../pages/PricingPage';
import { BillingPage } from '../pages/BillingPage';

type Page = 'landing' | 'login' | 'signup' | 'forgot-password' | 'otp-verification' | 'verification-status' | 'onboarding' | 'dashboard' | 'career-center-dashboard' | 'recruiter-dashboard' | 'institution-dashboard' | 'job-analysis' | 'job-details' | 'company-insights' | 'scam-reports' | 'emergency-safety' | 'profile' | 'settings' | 'pricing' | 'billing';

export const Router: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [verificationData, setVerificationData] = useState<{
    email?: string;
    success?: boolean;
    message?: string;
    userName?: string;
    userType?: string;
    jobData?: any;
    companyData?: any;
  }>({});

  const navigate = (page: Page, data?: any) => {
    setCurrentPage(page);
    if (data) {
      setVerificationData(prev => ({ ...prev, ...data }));
    }
  };

  const handleOnboardingComplete = () => {
    // Navigate to appropriate dashboard based on user type
    const userType = verificationData.userType || 'job-seeker';
    switch (userType) {
      case 'career-center':
        navigate('career-center-dashboard');
        break;
      case 'recruiter':
        navigate('recruiter-dashboard');
        break;
      case 'institution':
        navigate('institution-dashboard');
        break;
      default:
        navigate('dashboard');
        break;
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
            userType={verificationData.userType || 'job-seeker'}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={navigate}
            userName={verificationData.userName || 'User'}
          />
        );
      case 'career-center-dashboard':
        return (
          <CareerCenterDashboard
            onNavigate={navigate}
            userName={verificationData.userName || 'Career Center'}
          />
        );
      case 'recruiter-dashboard':
        return (
          <RecruiterDashboard
            onNavigate={navigate}
            userName={verificationData.userName || 'Recruiter'}
          />
        );
      case 'institution-dashboard':
        return (
          <InstitutionDashboard
            onNavigate={navigate}
            userName={verificationData.userName || 'Institution'}
          />
        );
      case 'job-analysis':
        return (
          <JobAnalysisPage
            onNavigate={navigate}
            userName={verificationData.userName || 'User'}
          />
        );
      case 'job-details':
        return (
          <JobDetailsPage
            onNavigate={navigate}
            jobData={verificationData.jobData}
          />
        );
      case 'company-insights':
        return (
          <CompanyInsightsPage
            onNavigate={navigate}
            companyData={verificationData.companyData}
          />
        );
      case 'scam-reports':
        return (
          <ScamReportHistoryPage
            onNavigate={navigate}
          />
        );
      case 'emergency-safety':
        return (
          <EmergencySafetyPage
            onNavigate={navigate}
          />
        );
      case 'profile':
        return (
          <UserProfilePage
            onNavigate={navigate}
            userName={verificationData.userName || 'User'}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            onNavigate={navigate}
          />
        );
      case 'pricing':
        return (
          <PricingPage
            onNavigate={navigate}
          />
        );
      case 'billing':
        return (
          <BillingPage
            onNavigate={navigate}
          />
        );
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
};