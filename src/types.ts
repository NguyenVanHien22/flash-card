export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  moduleId: string;
}

export interface ParsedQuestion {
  question: string;
  options: string[];
  moduleId: string;
  moduleTitle: string;
}

export interface Module {
  id: string;
  title: string;
  questions: Question[];
}