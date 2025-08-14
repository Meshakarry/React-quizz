import { useMemo } from 'react';
import { useQuizStore } from '../store/quiz';
import QuizChart from './QuizChart';

import { QuizSpenderTypeBadge } from './QuizSpenderTypeBadge';
import QuizInfo from './QuizInfo';

export default function QuizOverview () {
  const { selectedItems, getSteps, toggleIsEdit, setCurrentStepIndex, finishQuiz } = useQuizStore();
  const dataSteps = getSteps().filter(step => step.title !== 'gender');

  const totalPrice = useMemo(() => {
    return Object.values(selectedItems).reduce((price, item) => price + item.price, 0)
  }, [selectedItems])


  function handleUpdateSelectedItem (index: number) {
    finishQuiz(false);
    setCurrentStepIndex(index);
    toggleIsEdit(true);
  }

  return (
    <div>
      <h1 className="text-center text-black font-bold text-4xl leading-tight mb-2.5">
        ${ totalPrice }
      </h1>

      <QuizSpenderTypeBadge totalPrice={totalPrice} />
      <QuizChart totalPrice={totalPrice} allSteps={dataSteps} />
      <QuizInfo allSteps={dataSteps} onChangeHandler={handleUpdateSelectedItem} />
    </div>
  )
}