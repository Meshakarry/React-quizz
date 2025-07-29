import { useState, useEffect } from 'react';

import { useQuizStore, QuizItem } from '../store/quiz';

import QuizTitle from './QuizTitle';
import QuizButton from './QuizButton';
import QuizCard from './QuizCard';

export default function QuizCardsList() {
  const {
    data,
    currentStep,
    selectedItems,
    isEdit,
    setStep,
    incrementStep,
    finishQuiz,
    addSelectedItem,
    updateSelectedItem
  } = useQuizStore();
  const [selectedCardId, setSelectedCardId] = useState('');

  function handleButtonClick () {
    const selectedItem = data[currentStep - 1].items.find(item => item.id === selectedCardId);

    if (isEdit && selectedItem) {
      updateSelectedItem(selectedItem);
    }

    if (selectedItem && !isEdit) {
      addSelectedItem(selectedItem);
      incrementStep();
    }

    if (currentStep >= data.length || isEdit) {
      finishQuiz();
      setStep(data.length + 1)
    }
  }

  function handleCardSelect (card: QuizItem) {
    setSelectedCardId((prevSelected) => prevSelected === card.id ? '' : card.id);
  }

  useEffect(() => {
    document.body.style.setProperty('--current-step-color', `${data[currentStep - 1].color}`)
  }, [currentStep, data])

  useEffect(() => {
    setSelectedCardId(selectedItems[currentStep - 1]?.id ?? '');
  }, [currentStep, selectedItems])

  return (
    <div>
      <QuizTitle
        title={data[currentStep - 1].title}
        icon={data[currentStep - 1].logo}
      />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
        {
          data[currentStep - 1].items.map((card, index) =>
            <QuizCard
              card={card}
              key={index}
              selected={card.id === selectedCardId}
              onSelectCard={handleCardSelect}
            />
          )
        }
      </div>

      <QuizButton
        text={data[currentStep - 1].text}
        disabled={!selectedCardId}
        stepper={`${currentStep}/${data.length}`}
        nextStep={handleButtonClick}
      />
    </div>
  )
}