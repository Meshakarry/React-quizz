export type Gender = 'male' | 'female';

export interface QuizItem {
  id: string
  thumbnail: {
    dir: string,
    filename: string
  }
  price: number
  title: string
  location?: string
  brand?: string
  options?: Record<string, any>
}

export interface BaseStep {
  id: number;
  title: string;
  logo: string;
  text: string;
  color?: string;
}

export interface QuizSingleStep extends BaseStep {
  items: QuizItem[];
  type: 'single'
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
  type?: 'gender'
}

export interface CategoryItems {
  items: QuizItem[];
}

export interface GenderCategory {
  color?: string;
  options: Record<string, CategoryItems>;
}

export interface GenderBasedStep extends BaseStep {
  type: 'gender-based'
  genderSpecific: Record<string, GenderCategory>;
}

export interface QuizData {
  mainSteps: QuizSingleStep[];
  // genderStep: GenderStep;
  genderBasedSteps: GenderBasedStep[];
}

export type QuizStepUnion = QuizSingleStep | GenderBasedStep
