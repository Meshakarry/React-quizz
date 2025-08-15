import { create } from 'zustand'
import quizData from 'data/quiz.json'
import {
  QuizData,
  QuizItem,
  QuizStepUnion
} from 'types/quiz'

interface QuizStore {
  steps: QuizData
  currentStepIndex: number;
  selectedItems: Record<number, QuizItem>;
  quizFinished: boolean
  isEdit: boolean,
  selectedGender: string | null
  // methods
  finishQuiz: (finished?: boolean) => void,
  updateSelectedItem: (selectedItem: QuizItem | undefined) => void,
  toggleIsEdit: (edit?: boolean) => void,
  goToNextStep: () => void,
  setCurrentStepIndex: (id: number) => void,
  setGender: (gender: string) => void;
  // getters(helpers)
  getSteps: () => QuizStepUnion[]
  getCurrentStep: () => QuizStepUnion | null;
  getTotalSteps: () => number;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  steps: quizData as QuizData,
  currentStepIndex: -1, // no active step
  selectedItems: {},
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
              [state.currentStepIndex]: selectedItem
          }
        }
      }

      return state;
  }),
  goToNextStep: () => set(() => {
    const { currentStepIndex, isEdit, getTotalSteps } = get();
    const totalSteps = getTotalSteps();
    const currentIndex = !isEdit ? currentStepIndex + 1 : totalSteps + 1; // (totalSteps + 1) = finish quiz

    return {
      currentStepIndex: currentIndex,
      quizFinished: currentIndex >= totalSteps,
      isEdit: isEdit,
    };
  }),
  toggleIsEdit: (edit) => set((state) => ({
    isEdit: edit ?? !state.isEdit
  })),
  // getters(helpers)
  getSteps: () => {
    const { steps } = get();
    const quizSteps: QuizStepUnion[] = [
      ...steps.mainSteps,
      ...steps.genderBasedSteps
    ];

    return quizSteps;
  },
  getCurrentStep: () => {
    const { getSteps, currentStepIndex } = get();

    const quizSteps = getSteps();
    return quizSteps[currentStepIndex] ?? null;
  },
  getTotalSteps: () => {
    const { getSteps } = get();
    return getSteps().length;
  },
}))
