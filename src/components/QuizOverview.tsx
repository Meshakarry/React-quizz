import { useMemo } from 'react';
import { useQuizStore } from 'store/quiz';
import { formatPrice } from 'helpers/formatPrice'
//components
import { QuizSpenderTypeBadge } from 'components/QuizSpenderTypeBadge';
import QuizChart from 'components/QuizChart';
import QuizInfo from 'components/QuizInfo';

const GENDER_INTERMEDIATE_STEP = 'gender'

export default function QuizOverview () {
  const { selectedItems, getSteps, toggleIsEdit, setCurrentStepIndex, finishQuiz } = useQuizStore();
  const dataSteps = getSteps().filter(step => step.title !== GENDER_INTERMEDIATE_STEP);

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
      <QuizChart totalPrice={totalPrice} allSteps={dataSteps} />
      <QuizInfo allSteps={dataSteps} onChangeHandler={handleUpdateSelectedItem} />
    </div>
  )
}
