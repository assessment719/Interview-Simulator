export interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  expectedKeywords: string[];
}

export interface InterviewSession {
  id: string;
  date: string;
  score: number;
  questions: {
    questionId: string;
    score: number;
    feedback: string;
  }[];
}

export interface UserProgress {
  totalSessions: number;
  averageScore: number;
  strengths: string[];
  weaknesses: string[];
  recentScores: number[];
}