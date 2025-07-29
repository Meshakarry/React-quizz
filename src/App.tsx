import { useEffect, useMemo} from 'react';

import QuizMain from './components/QuizMain';
import QuizWelcome from './components/QuizWelcome';
import { useQuizStore } from './store/quiz';
import themes from './data/themes.json'

function App() {
  const { currentStep } = useQuizStore();
  const bgColor = useMemo(() => themes[currentStep].color ?? '#fff', [currentStep]);

  useEffect(() => {
    document.body.style.setProperty('--bg-color', `${bgColor}`)
  }, [bgColor])

  return (
    <main className="bg-[var(--bg-color)]">
      <div className="min-h-dvh max-h-dvh overflow-y-auto flex flex-col py-20 container">
        {
          currentStep === 0 ? (
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
