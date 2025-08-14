import { useEffect, useMemo} from 'react';

import QuizMain from './components/QuizMain';
import QuizWelcome from './components/QuizWelcome';
import { useQuizStore } from './store/quiz';
import themes from './data/themes.json'

function App() {
  const { currentStepIndex, selectedGender, getCurrentStep } = useQuizStore();
  const currentStep = getCurrentStep();

  const bgColor = useMemo(() => {
    // this needs to be optimized as soon as possible
    const DEFAULT_BG_COLOR = '#fff';
    const stepId = currentStep?.title?.toLowerCase();
    const genderTheme = themes.find(theme => theme?.gender === selectedGender && theme.stepId === stepId)
    const mainStepTheme = stepId ? themes.find(theme => theme.stepId === stepId) : themes[themes.length - 1];
    const theme = selectedGender && genderTheme ? genderTheme : mainStepTheme

    return theme?.color ?? DEFAULT_BG_COLOR;
  }, [currentStep, selectedGender]);

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
