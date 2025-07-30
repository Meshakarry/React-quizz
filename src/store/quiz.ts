import { create } from 'zustand'
import quizData from '../data/quiz.json'

// TO DO: consider adding types folder to handle this
export interface QuizItem {
  id: string
  image: string
  price: number
  title: string
}

interface QuizStep {
  id: number;
  title: string;
  logo: string;
  text: string;
  color: string;
  items: QuizItem[];
}

interface QuizStore {
  // reading data from json just temporary
  steps: QuizStep[];
  currentStepId: number;
  selectedItems: Record<number, QuizItem>;
  quizFinished: boolean
  isEdit: boolean,
  // methods
  finishQuiz: (finished?: boolean) => void,
  updateSelectedItem: (selectedItem: QuizItem | undefined) => void,
  toggleIsEdit: (edit?: boolean) => void,
  goToNextStep: () => void,
  setCurrentStepId: (id: number) => void,
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  steps: quizData,
  currentStepId: 0,
  data: quizData,
  selectedItems: {}, // mapped selected items instead of array
  quizFinished: false,
  isEdit: false,
  finishQuiz: (finished = true) => set(() => ({
    quizFinished: finished
  })),
  updateSelectedItem: (selectedItem) =>
    set((state) => {
      if (selectedItem) {
        return {
          selectedItems: {
            ...state.selectedItems,
              [state.currentStepId]: selectedItem
          }
        }
      }

      return state;
  }),
  setCurrentStepId: (id: number) => set(() => ({ currentStepId: id })),
  goToNextStep: () => set((state) => {
    const currentIndex = state.steps.findIndex(s => s.id === state.currentStepId);
    const nextStep = state.isEdit ? null : state.steps[currentIndex + 1];
    return {
      currentStepId: nextStep?.id,
      quizFinished: !nextStep,
      isEdit: state.isEdit,
    };
  }),
  toggleIsEdit: (edit) => set((state) => ({
    isEdit: edit ?? !state.isEdit
  })),
}))
