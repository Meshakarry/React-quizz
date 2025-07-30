import { useMemo } from 'react';
import { useQuizStore } from '../store/quiz';
import QuizChart from './QuizChart';

import { QuizSpenderTypeBadge } from './QuizSpenderTypeBadge';
import QuizInfo from './QuizInfo';

export default function QuizOverview () {
  const { steps, selectedItems, setCurrentStepId, finishQuiz, toggleIsEdit } = useQuizStore();

  const totalPrice = useMemo(() => {
    return Object.values(selectedItems).reduce((price, item) => price + item.price, 0)
  }, [selectedItems])

  function handleUpdateSelectedItem (index: number) {
    const step = steps[index];
    if (!step) return;

    finishQuiz(false);
    setCurrentStepId(index + 1);
    toggleIsEdit(true);
  }

  return (
    <div>
      <h1 className="text-center text-black font-bold text-4xl leading-tight mb-2.5">
        ${ totalPrice }
      </h1>

      <QuizSpenderTypeBadge totalPrice={totalPrice} />
      <QuizChart totalPrice={totalPrice} />
      <QuizInfo onChangeHandler={handleUpdateSelectedItem} />
    </div>
  )
}