import { GenderCategory } from 'types/quiz';
import { formatPrice } from 'helpers/formatPrice'
// components
import QuizGenderCategoryCard from 'components/GenderBased/QuizGenderCategoryCard'
import QuizItemSelectedOverlay from 'components/Common/QuizItemSelectedOverlay'

interface QuizGenderCategoryStepProps {
  categories: GenderCategory;
  selectedCardId?: string
  onSelectCategory: (itemId: string) => void
}

export default function QuizGenderCategoryStep({ categories, selectedCardId, onSelectCategory }: QuizGenderCategoryStepProps) {
  function handleCategoryClick(categoryName: string) {
    onSelectCategory(categoryName);
  }

  return (
    <div>
      {Object.entries(categories.options).map(([categoryName, category]) => {
        const totalPrice = category.items.reduce((sum, item) => sum + item.price, 0);
        return (
          <div
            key={categoryName}
            className="relative mb-8 bg-white rounded-[20px] px-2.5 py-16"
          >
            <h3 className="text-lg font-semibold capitalize mb-2">{categoryName}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              {category.items.map(item => (
                <QuizGenderCategoryCard category={item} key={item.id} />
              ))}
            </div>

            <div className="flex justify-between items-center py-2.5 border-t border-[#14365680]/50">
              <span>Total cost</span>
              <span>{ formatPrice(totalPrice) }</span>
            </div>
            <button
              className="absolute inset-0 z-10"
              onClick={() => handleCategoryClick(categoryName)}
            />

            {
              selectedCardId === categoryName && (
                <QuizItemSelectedOverlay
                  className="w-20 h-20 top-1/2 -translate-y-1/2"
                  icon={{
                    width: 76,
                    height: 76
                  }}
                />
              )
            }
          </div>
        )
    })}
    </div>
  );
}
