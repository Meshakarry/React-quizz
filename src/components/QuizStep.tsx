import { useState, useEffect } from 'react';
import { useQuizStore, QuizItem, QuizSingleStep, GenderStep, GenderBasedStep } from '../store/quiz';

import QuizTitle from './QuizTitle';
import QuizButton from './QuizButton';
import QuizGenderCategoryStep from './QuizGenderCategoryStep'
import QuizMainStep from './QuizMainStep';

interface QuizStepProps {
  step: QuizSingleStep | GenderBasedStep | GenderStep | null
}

export default function QuizStep ({ step }: QuizStepProps) {
  const { selectedItems, currentStepIndex, selectedGender, steps, goToNextStep, getTotalSteps, updateSelectedItem } = useQuizStore();
  // TO DO: add another state to handle selected category
  const [selectedCardId, setSelectedCardId] = useState('');
  const totalSteps = getTotalSteps();

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
      const selectedCategory = Object.entries(categories).find(([categoryId]) => categoryId === selectedCardId);

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
    document.body.style.setProperty('--current-step-color', `${step?.color}`)
  }, [step])

  useEffect(() => {
    setSelectedCardId(selectedItems[currentStepIndex - 1]?.id ?? '');
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
          {/* TO DO: fix ts and this condition for gender specific */}
      {
        selectedGender && 'genderSpecific' in step ? (
          <QuizGenderCategoryStep
            categories={step.genderSpecific[selectedGender]}
            onSelectCategory={handleCardSelect}
          />
        ) : (
          <QuizMainStep
            items={steps.mainSteps?.[currentStepIndex - 1]?.items}
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