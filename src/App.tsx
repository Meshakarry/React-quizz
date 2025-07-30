import { useEffect, useMemo} from 'react';

import QuizMain from './components/QuizMain';
import QuizWelcome from './components/QuizWelcome';
import { useQuizStore } from './store/quiz';
import themes from './data/themes.json'

function App() {
  const { currentStepId } = useQuizStore();
  const bgColor = useMemo(() => {
    const DEFAULT_BG_COLOR = '#fff'

    if (themes?.[currentStepId]?.color) {
      return themes?.[currentStepId]?.color;
    }
    // last step
    if (!currentStepId) {
      return themes?.[themes.length - 1]?.color
    }

    return DEFAULT_BG_COLOR;
  }, [currentStepId]);

  useEffect(() => {
    document.body.style.setProperty('--bg-color', `${bgColor}`)
  }, [bgColor])

return (
    <main className="bg-[var(--bg-color)]">
      <div className="min-h-dvh max-h-dvh overflow-y-auto flex flex-col py-20 container">
        {
          currentStepId === 0 ? (
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
