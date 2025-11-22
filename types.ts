
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'researcher' | 'mentor';
  skills: string[];
  gpa: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  dateEarned: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  participants: number;
  status: 'active' | 'completed' | 'upcoming';
}

export interface StartupPlan {
  startupName: string;
  tagline: string;
  valueProposition: string;
  targetAudience: string;
  roadmap: {
    phase: string;
    description: string;
  }[];
}

export interface Scholarship {
  id: string;
  title: string;
  amount: string;
  deadline: string;
  description: string;
  matchScore: number;
}

export interface ReadinessData {
  gpa: number;
  milestonesCompleted: number;
  pitchQualityScore: number;
  totalScore: number;
  history: { date: string; score: number }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppRoutes {
  HOME = '/',
  STARTUP = '/startup',
  COLLAB = '/collab',
  SCHOLARSHIPS = '/scholarships',
  READINESS = '/readiness',
  CHALLENGES = '/challenges',
  IMPACT = '/impact',
  LOGIN = '/login'
}
