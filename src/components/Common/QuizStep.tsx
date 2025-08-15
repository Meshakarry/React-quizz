import { useState, useEffect, useMemo } from 'react';
import { QuizItem, QuizStepUnion, GenderBasedStep} from 'types/quiz';
import { useQuizStore } from 'store/quiz';

// components
import QuizTitle from 'components/Common/QuizTitle';
import QuizButton from 'components/Common/QuizButton';
import QuizGenderCategoryStep from 'components/Steps/QuizGenderCategoryStep'
import QuizMainStep from 'components/Steps/QuizMainStep';

interface QuizStepProps {
  step: QuizStepUnion | null
}

// move to the utils
export function isGenderBasedStep(
  step: QuizStepUnion,
): step is GenderBasedStep {
  return step?.type === 'gender-based';
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

  const stepProgress = useMemo(() => {
    const activeIndex = currentStepIndex >= totalSteps ? totalSteps : currentStepIndex + 1 // current step index starts at zero

    return `${activeIndex}/${totalSteps}`
  }, [currentStepIndex, totalSteps])

  function handleButtonClick() {
    if (!step) return;

    // SINGLE STEP
    if (step.type === 'single') {
      const selectedItem = step.items.find(item => item.id === selectedCardId);
      if (!selectedItem) return;
      updateSelectedItem(selectedItem);
    }

    // GENDER-BASED STEP
    else if (isGenderBasedStep(step) && selectedGender) {
      const categories = step.genderSpecific[selectedGender];
      const selectedCategory = Object.entries(categories.options).find(([categoryId]) => categoryId === selectedCardId);

      if (!selectedCategory) return;

      const [categoryId, category] = selectedCategory;
      const totalPrice = category.items.reduce((sum, item) => sum + item.price, 0);
      const previewImage = category.items[0]?.thumbnail;

      const formattedCategory: QuizItem = {
        id: categoryId,
        title: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
        thumbnail: previewImage,
        price: totalPrice,
      };

      updateSelectedItem(formattedCategory);
    }

    goToNextStep();
  }


  function handleCardSelect (itemId: string) {
    setSelectedCardId((prevSelected) => prevSelected === itemId ? '' : itemId);
  }

  useEffect(() => {
    if (step) {
      const color = isGenderBasedStep(step) && selectedGender ? step?.genderSpecific[selectedGender]?.color : step?.color;
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
        isGenderBasedStep(step) && selectedGender ? (
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
        stepProgress={stepProgress}
        nextStep={handleButtonClick}
      />
    </div>
  )
}
