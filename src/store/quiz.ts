import { create } from 'zustand'
import quizData from '../data/quiz.json'

// TO DO: consider adding types folder to handle this
export interface QuizItem {
  id: string
  image: string
  price: number
  title: string
}

interface QuizStore {
  // reading data from json just temporary
  data: typeof quizData,
  currentStep: number
  selectedItems: QuizItem[],
  quizFinished: boolean
  isEdit: boolean,
  incrementStep: () => void,
  setStep: (step: number) => void,
  finishQuiz: (finished?: boolean) => void,
  addSelectedItem: (selectedItem: QuizItem) => void,
  updateSelectedItem: (selectedItem: QuizItem) => void,
  toggleIsEdit: (edit?: boolean) => void,
}

export const useQuizStore = create<QuizStore>((set) => ({
  currentStep: 0,
  data: quizData,
  selectedItems: [],
  quizFinished: false,
  isEdit: false,
  incrementStep: () => set((state) => ({
    currentStep: state.currentStep + 1,
  })),
  setStep: (step) => set(() => ({
    currentStep: step,
  })),
  finishQuiz: (finished = true) => set(() => ({ quizFinished: finished })),
  addSelectedItem: (selectedItem) => set((state) => ({
    selectedItems: [...state.selectedItems, selectedItem]
  })),
  updateSelectedItem: (selectedItem) => set((state) => {
    const updated = [...state.selectedItems];
    updated[state.currentStep - 1] = selectedItem;
    return { selectedItems: updated };
  }),
  // TO DO: consider moving this from this store, it is not kinda related to the quiz logic
  toggleIsEdit: (edit) => set((state) => ({
    isEdit: edit ?? !state.isEdit
  }))
}))
