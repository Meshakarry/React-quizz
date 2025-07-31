import { Gender, useQuizStore } from '../store/quiz';
import QuizOverview from './QuizOverview';
import QuizSelectGender from './QuizSelectGender';
import QuizStep from './QuizStep';

export default function QuizMain () {
  const { selectedGender, quizFinished, getCurrentStep, setGender, goToNextStep } = useQuizStore();
  const currentStep = getCurrentStep();

  function handleGenderSelect (gender: Gender) {
    setGender(gender)
    goToNextStep()
  }

  // if (!currentStep) {
  //   return null;
  // }
  // TO DO: avoid magic string
  if (!selectedGender && currentStep?.title === 'gender') {
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