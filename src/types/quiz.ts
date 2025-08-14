export type Gender = 'male' | 'female';

export interface QuizItem {
  id: string
  image: string
  price: number
  title: string
  location?: string
  brand?: string
}

export interface QuizSingleStep {
  id: number;
  title: string;
  logo: string;
  text: string;
  items: QuizItem[];
  color?: string;
}

export interface GenderOption {
  id: Gender;
  label: string;
  image: string;
  color: string;
}

export interface GenderStep {
  id: number
  text: string;
  title: string
  logo: string
  options: GenderOption[];
  color?: string
}

export interface CategoryItems {
  items: QuizItem[];
}

export interface GenderCategory {
  color?: string;
  options: Record<string, CategoryItems>;
}

export interface GenderBasedStep extends Omit<QuizSingleStep, 'items'> {
  genderSpecific: Record<string, GenderCategory>;
}

export interface QuizData {
  mainSteps: QuizSingleStep[];
  genderStep: GenderStep;
  genderBasedSteps: GenderBasedStep[];
}