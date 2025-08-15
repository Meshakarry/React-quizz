import { useEffect, useMemo} from 'react';

import QuizMain from 'components/QuizMain';
import QuizWelcome from 'components/QuizWelcome';
import { useQuizStore } from 'store/quiz';
import themes from 'data/themes.json'

function App() {
  const { currentStepIndex, selectedGender, quizFinished, getCurrentStep } = useQuizStore();
  const currentStep = getCurrentStep();

  const bgColor = useMemo(() => {
    const DEFAULT_BG_COLOR = '#fff';
    const stepId = currentStep?.title?.toLowerCase();
    if (quizFinished) {
      return themes[themes.length - 1]?.color; // quiz overview
    }

    const genderTheme = themes.find(theme => theme?.gender === selectedGender && theme.stepId === stepId)
    if (genderTheme) {
      return genderTheme?.color
    }

    const mainStepTheme = themes.find(theme => theme.stepId === stepId);

    if (mainStepTheme) {
      return mainStepTheme?.color;
    }

    return DEFAULT_BG_COLOR;
  }, [currentStep, selectedGender, quizFinished]);

  useEffect(() => {
    document.body.style.setProperty('--bg-color', `${bgColor}`)
  }, [bgColor])

return (
    <main className="bg-[var(--bg-color)]">
      <div className="min-h-dvh max-h-dvh overflow-y-auto flex flex-col py-20 container">
        {
          currentStepIndex === -1 ? (
            <QuizWelcome />
          ) : (
            <QuizMain />
          )
        }
      </div>
    </main>
  );
}

export default App;
