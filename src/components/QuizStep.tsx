import { useState, useEffect } from 'react';
import { QuizItem, QuizStepUnion } from '../types/quiz';
import { useQuizStore } from '../store/quiz';

// components
import QuizTitle from './QuizTitle';
import QuizButton from './QuizButton';
import QuizGenderCategoryStep from './QuizGenderCategoryStep'
import QuizMainStep from './QuizMainStep';

interface QuizStepProps {
  step: QuizStepUnion
}

export default function QuizStep ({ step }: QuizStepProps) {
  const {
    selectedItems,
    currentStepIndex,
    selectedGender,
    steps,
    goToNextStep,
    getTotalSteps,
    updateSelectedItem,
  } = useQuizStore();
  const [selectedCardId, setSelectedCardId] = useState('');
  const totalSteps = getTotalSteps();
  console.log(Object.values(steps))

  function handleButtonClick() {
    if (!step) return;

    // SINGLE STEP
    if ('items' in step) {
      const selectedItem = step.items.find(item => item.id === selectedCardId);
      if (!selectedItem) return;
      updateSelectedItem(selectedItem);
    }

    // GENDER-BASED STEP
    else if ('genderSpecific' in step && selectedGender) {
      const categories = step.genderSpecific[selectedGender];
      const selectedCategory = Object.entries(categories.options).find(([categoryId]) => categoryId === selectedCardId);

      if (!selectedCategory) return;

      const [categoryId, category] = selectedCategory;
      const totalPrice = category.items.reduce((sum, item) => sum + item.price, 0);
      const previewImage = category.items[0]?.image;

      const formattedCategory: QuizItem = {
        id: categoryId,
        title: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
        image: previewImage ?? '',
        price: totalPrice,
      };

      updateSelectedItem(formattedCategory);
    }

    goToNextStep();
  }


  function handleCardSelect (card: QuizItem) {
    setSelectedCardId((prevSelected) => prevSelected === card.id ? '' : card.id);
  }

  useEffect(() => {
    if (step) {
      const color = selectedGender && 'genderSpecific' in step ? step?.genderSpecific[selectedGender]?.color : step?.color
      document.body.style.setProperty('--current-step-color', `${color}`)
    }
  }, [step, selectedGender])

  useEffect(() => {
    setSelectedCardId(selectedItems[currentStepIndex]?.id ?? '');
  }, [selectedItems, currentStepIndex])

  if (!step) {
    return null;
  }

  return (
    <div>
      <QuizTitle
        title={step.title}
        icon={step.logo}
      />
      {
        selectedGender && 'genderSpecific' in step ? (
          <QuizGenderCategoryStep
            selectedCardId={selectedCardId}
            categories={step.genderSpecific[selectedGender]}
            onSelectCategory={handleCardSelect}
          />
        ) : (
          <QuizMainStep
            items={steps.mainSteps?.[currentStepIndex]?.items}
            selectedCardId={selectedCardId}
            onSelectCard={handleCardSelect}
          />
        )
      }

      <QuizButton
        text={step.text}
        disabled={!selectedCardId}
        stepper={`${step?.id}/${totalSteps}`}
        nextStep={handleButtonClick}
      />
    </div>
  )
}