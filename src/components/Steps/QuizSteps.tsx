import { useQuizStore } from 'store/quiz';
// components
import QuizOverview from 'components/Overview/QuizOverview';
import QuizSelectGenderStep from 'components/Steps/QuizSelectGenderStep';
import QuizStep from 'components/Common/QuizStep';

export default function QuizSteps () {
  const {
    steps,
    selectedGender,
    quizFinished,
    currentStepIndex,
    getCurrentStep,
    setGender,
  } = useQuizStore();
  const currentStep = getCurrentStep();

  function handleGenderSelect (gender: string) {
    setGender(gender)
  }

  if (!selectedGender && currentStepIndex === steps.mainSteps.length) {
    return (
      <QuizSelectGenderStep onGenderSelect={(gender) => handleGenderSelect(gender) } />
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
