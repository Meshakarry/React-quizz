import { useState, useEffect, useMemo } from 'react';

import { useQuizStore, QuizItem } from '../store/quiz';

import QuizTitle from './QuizTitle';
import QuizButton from './QuizButton';
import QuizCard from './QuizCard';

export default function QuizCardsList() {
  const {
    steps,
    currentStepId,
    selectedItems,
    goToNextStep,
    updateSelectedItem,
  } = useQuizStore();

  const currentStep = useMemo(() => {
    return steps.find(step => step.id === currentStepId);
  }, [steps, currentStepId]);

  const selectedItemForStep = selectedItems[currentStepId];
  const [selectedCardId, setSelectedCardId] = useState('');

  function handleButtonClick() {
    if (!currentStep) return;
    const selectedItem = currentStep.items.find(item => item.id === selectedCardId);
    if (!selectedItem) return;

    updateSelectedItem(selectedItem);
    goToNextStep();
  }

  function handleCardSelect (card: QuizItem) {
    setSelectedCardId((prevSelected) => prevSelected === card.id ? '' : card.id);
  }

  useEffect(() => {
    document.body.style.setProperty('--current-step-color', `${currentStep?.color}`)
  }, [currentStep])

  useEffect(() => {
    setSelectedCardId(selectedItemForStep?.id ?? '');
  }, [selectedItemForStep])

  if (!currentStep) {
    return null;
  }

  return (
    <div>
      <QuizTitle
        title={currentStep.title}
        icon={currentStep.logo}
      />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
        {
          currentStep.items.map((card) =>
            <QuizCard
              card={card}
              key={card.id}
              selected={card.id === selectedCardId}
              onSelectCard={handleCardSelect}
            />
          )
        }
      </div>

      <QuizButton
        text={currentStep.text}
        disabled={!selectedCardId}
        stepper={`${currentStep.id}/${steps.length}`}
        nextStep={handleButtonClick}
      />
    </div>
  )
}