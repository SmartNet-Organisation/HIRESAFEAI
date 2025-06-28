export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'job-seeker' | 'career-center' | 'recruiter' | 'institution';
  subscriptionTier: 'free' | 'premium' | 'enterprise';
  isVerified: boolean;
  settings: Record<string, any>;
}

export interface JobAnalysis {
  id: string;
  title: string;
  company: string;
  location: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  riskScore: number;
  flaggedReasons: string[];
  description: string;
  postedDate: string;
}

export interface ScamReport {
  id: string;
  title: string;
  company: string;
  platform: string;
  reportDate: string;
  status: string;
  type: string;
  riskLevel: string;
  description: string;
}

export interface NavigationProps {
  onNavigate: (page: string, data?: any) => void;
}

export interface DashboardProps extends NavigationProps {
  userName: string;
}