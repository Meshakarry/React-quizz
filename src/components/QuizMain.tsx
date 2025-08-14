import { useQuizStore } from '../store/quiz';
// components
import QuizOverview from './QuizOverview';
import QuizSelectGender from './QuizSelectGender';
import QuizStep from './QuizStep';

export default function QuizMain () {
  const {
    steps,
    selectedGender,
    quizFinished,
    currentStepIndex,
    getCurrentStep,
    setGender,
    goToNextStep
  } = useQuizStore();
  const currentStep = getCurrentStep();

  function handleGenderSelect (gender: string) {
    setGender(gender)
    goToNextStep()
  }

  if (!selectedGender && currentStepIndex === steps.mainSteps.length) {
    return (
      <QuizSelectGender onGenderSelect={(gender) => handleGenderSelect(gender) } />
    )
  }

  return (
    <div>
      { !quizFinished ? (
          <QuizStep
            step={currentStep}
          />
        ) : (
          <QuizOverview />
        )
      }
    </div>
  )
}