import { create } from 'zustand'
import quizData from '../data/quiz.json'

// TO DO: consider adding types folder to handle this

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

export interface CategoryItems {
  items: QuizItem[];
}

export type GenderCategory = Record<string, CategoryItems>;

export interface GenderBasedStep extends Omit<QuizSingleStep, 'items'> {
  genderSpecific: Record<Gender, GenderCategory>;
}

export interface GenderStep {
  text: string;
  title: string
  logo: string
  options: GenderOption[];
  color?: string
  id?: number
}

export interface QuizData {
  mainSteps: QuizSingleStep[];
  genderStep: GenderStep;
  genderBasedSteps: GenderBasedStep[];
}

interface QuizStore {
  // reading data from json just temporary
  steps: QuizData
  currentStepIndex: number;
  selectedItems: Record<number, QuizItem>;
  quizFinished: boolean
  isEdit: boolean,
  selectedGender: Gender | null
  // methods
  finishQuiz: (finished?: boolean) => void,
  updateSelectedItem: (selectedItem: QuizItem | undefined) => void,
  toggleIsEdit: (edit?: boolean) => void,
  goToNextStep: () => void,
  setCurrentStepIndex: (id: number) => void,
  getCurrentStep: () => QuizSingleStep | GenderBasedStep | GenderStep | null; // check this type
  getTotalSteps: () => number;
  setGender: (gender: Gender) => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  steps: quizData as QuizData,
  currentStepIndex: 0,
  data: quizData,
  selectedItems: {}, // mapped selected items instead of array
  quizFinished: false,
  isEdit: false,
  selectedGender: null,
  setGender: (gender) => set(() =>
    ({ selectedGender: gender })
  ),
  finishQuiz: (finished = true) => set(() => ({
    quizFinished: finished
  })),
  setCurrentStepIndex: (id: number) => set(() =>
    ({ currentStepIndex: id })
  ),
  updateSelectedItem: (selectedItem) =>
    set((state) => {
      if (selectedItem) {
        return {
          selectedItems: {
            ...state.selectedItems,
              [state.currentStepIndex - 1]: selectedItem
          }
        }
      }

      return state;
  }),
  goToNextStep: () => set((state) => {
    const totalSteps = get().getTotalSteps() + 1;
    const nextIndex = state.isEdit ? undefined : state.currentStepIndex + 1;
    console.log(nextIndex, 'next index')
    console.log(totalSteps, 'total stepsis')

    return {
      currentStepIndex: nextIndex,
      quizFinished: nextIndex ? nextIndex > totalSteps : true, // optimize
      isEdit: state.isEdit,
    };
  }),
  toggleIsEdit: (edit) => set((state) => ({
    isEdit: edit ?? !state.isEdit
  })),
  // getters(helpers)
  getTotalSteps: () => {
    const { steps } = get();
    const genderSteps = steps.genderBasedSteps.length;
    const mainSteps = steps.mainSteps.length;

    return mainSteps + genderSteps;
  },
  getCurrentStep: () => {
    const { steps, currentStepIndex, selectedGender } = get();
    const mainLength = steps.mainSteps.length;
    console.log(currentStepIndex, 'current step index')

    if (currentStepIndex <= mainLength) {
      return steps.mainSteps[currentStepIndex - 1];
    } else if (currentStepIndex === (mainLength + 1)) { // optimize this
      return steps.genderStep;
    } else if (selectedGender) {
      const genderStepIndex = currentStepIndex - (mainLength + 1);
      return steps.genderBasedSteps[genderStepIndex - 1];
    }

    return null;
  },
}))