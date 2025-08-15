import { useMemo } from 'react';
import { useQuizStore } from 'store/quiz';
import { formatPrice } from 'helpers/formatPrice'
//components
import { QuizSpenderTypeBadge } from 'components/Overview/QuizSpenderTypeBadge';
import QuizChart from 'components/Overview/QuizChart';
import QuizInfo from 'components/Overview/QuizInfo';

export default function QuizOverview () {
  const { selectedItems, getSteps, toggleIsEdit, setCurrentStepIndex, finishQuiz } = useQuizStore();
  const dataSteps = getSteps();

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
        { formatPrice(totalPrice) }
      </h1>

      <QuizSpenderTypeBadge totalPrice={totalPrice} />
      <QuizChart totalPrice={totalPrice} quizSteps={dataSteps} />
      <QuizInfo quizSteps={dataSteps} onChangeHandler={handleUpdateSelectedItem} />
    </div>
  )
}
