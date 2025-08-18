export type Gender = 'male' | 'female';

export interface Thumbnail {
  dir: string
  filename: string
}

export interface Agent {
  exists: boolean
  name: string
  avatar: Thumbnail
}

export interface Rating {
  exists: boolean
  value: number
  review_amount: number
}

export interface TooltipData {
  name: string
  value: number
}

export interface Tooltip {
  exists: boolean
  data: TooltipData[]
}

export interface Meta {
  exists: boolean
  items: string[]
}

export interface ItemOptions {
  price_per_week?: number
  agent?: Agent
  rating?: Rating
  tooltip?: Tooltip
  meta?: Meta
}

export interface QuizItem {
  id: string
  thumbnail: Thumbnail
  price: number
  title: string
  location?: string
  description?: string
  options?: ItemOptions
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
