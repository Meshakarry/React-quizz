import { useMemo } from 'react';
import { useQuizStore } from '../store/quiz';
import QuizChart from './QuizChart';

import { QuizSpenderTypeBadge } from './QuizSpenderTypeBadge';
import QuizInfo from './QuizInfo';

export default function QuizOverview () {
  const { steps, selectedItems,  finishQuiz, toggleIsEdit, setCurrentStepIndex } = useQuizStore();

  const totalPrice = useMemo(() => {
    return Object.values(selectedItems).reduce((price, item) => price + item.price, 0)
  }, [selectedItems])

  const allSteps = useMemo(() => {
    return [
      ...steps.mainSteps,
      ...steps.genderBasedSteps.map(step => ({
        ...step,
      }))
    ];
  }, [steps])

  function handleUpdateSelectedItem (index: number) {
    finishQuiz(false);
    setCurrentStepIndex(index + 1);
    toggleIsEdit(true);
  }

  return (
    <div>
      <h1 className="text-center text-black font-bold text-4xl leading-tight mb-2.5">
        ${ totalPrice }
      </h1>

      <QuizSpenderTypeBadge totalPrice={totalPrice} />
      <QuizChart totalPrice={totalPrice} allSteps={allSteps} />
      <QuizInfo allSteps={allSteps} onChangeHandler={handleUpdateSelectedItem} />
    </div>
  )
}