import React, { useState } from 'react';
import { OnboardingWelcome } from '../components/onboarding/OnboardingWelcome';
import { OnboardingWalkthrough } from '../components/onboarding/OnboardingWalkthrough';
import { OnboardingScamAlerts } from '../components/onboarding/OnboardingScamAlerts';
import { OnboardingNotifications } from '../components/onboarding/OnboardingNotifications';

interface OnboardingPageProps {
  onComplete: () => void;
  userName: string;
}

type OnboardingStep = 'welcome' | 'walkthrough' | 'scam-alerts' | 'notifications';

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete, userName }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');

  const nextStep = () => {
    switch (currentStep) {
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

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <OnboardingWelcome onNext={nextStep} userName={userName} />;
      case 'walkthrough':
        return <OnboardingWalkthrough onNext={nextStep} onBack={prevStep} />;
      case 'scam-alerts':
        return <OnboardingScamAlerts onNext={nextStep} onBack={prevStep} />;
      case 'notifications':
        return <OnboardingNotifications onComplete={nextStep} onBack={prevStep} />;
      default:
        return <OnboardingWelcome onNext={nextStep} userName={userName} />;
    }
  };

  return <div className="min-h-screen">{renderStep()}</div>;
};