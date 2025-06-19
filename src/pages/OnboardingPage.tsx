import React, { useState } from 'react';
import { OnboardingUserType } from '../components/onboarding/OnboardingUserType';
import { OnboardingWelcome } from '../components/onboarding/OnboardingWelcome';
import { OnboardingWalkthrough } from '../components/onboarding/OnboardingWalkthrough';
import { OnboardingScamAlerts } from '../components/onboarding/OnboardingScamAlerts';
import { OnboardingNotifications } from '../components/onboarding/OnboardingNotifications';

interface OnboardingPageProps {
  onComplete: () => void;
  userName: string;
  userType?: string;
}

type OnboardingStep = 'user-type' | 'welcome' | 'walkthrough' | 'scam-alerts' | 'notifications';

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete, userName, userType: initialUserType }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialUserType ? 'welcome' : 'user-type');
  const [selectedUserType, setSelectedUserType] = useState(initialUserType || '');

  const nextStep = () => {
    switch (currentStep) {
      case 'user-type':
        setCurrentStep('welcome');
        break;
      case 'welcome':
        setCurrentStep('walkthrough');
        break;
      case 'walkthrough':
        setCurrentStep('scam-alerts');
        break;
      case 'scam-alerts':
        setCurrentStep('notifications');
        break;
      case 'notifications':
        onComplete();
        break;
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case 'welcome':
        setCurrentStep(initialUserType ? 'welcome' : 'user-type');
        break;
      case 'walkthrough':
        setCurrentStep('welcome');
        break;
      case 'scam-alerts':
        setCurrentStep('walkthrough');
        break;
      case 'notifications':
        setCurrentStep('scam-alerts');
        break;
    }
  };

  const handleUserTypeSelection = (userType: string) => {
    setSelectedUserType(userType);
    nextStep();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'user-type':
        return <OnboardingUserType onNext={handleUserTypeSelection} userName={userName} />;
      case 'welcome':
        return <OnboardingWelcome onNext={nextStep} userName={userName} userType={selectedUserType} />;
      case 'walkthrough':
        return <OnboardingWalkthrough onNext={nextStep} onBack={prevStep} userType={selectedUserType} />;
      case 'scam-alerts':
        return <OnboardingScamAlerts onNext={nextStep} onBack={prevStep} userType={selectedUserType} />;
      case 'notifications':
        return <OnboardingNotifications onComplete={nextStep} onBack={prevStep} userType={selectedUserType} />;
      default:
        return <OnboardingUserType onNext={handleUserTypeSelection} userName={userName} />;
    }
  };

  return <div className="min-h-screen">{renderStep()}</div>;
};