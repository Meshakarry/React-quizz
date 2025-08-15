import { QuizItem, GenderCategory, CategoryItems } from 'types/quiz';
import { formatPrice } from 'helpers/formatPrice'
// components
import QuizGenderCategoryCard from 'components/QuizGenderCategoryCard'
import Check from 'components/Icons/Check';

interface QuizGenderCategoryStepProps {
  categories: GenderCategory;
  selectedCardId?: string
  onSelectCategory: (card: QuizItem) => void
}

export default function QuizGenderCategoryStep({ categories, selectedCardId, onSelectCategory }: QuizGenderCategoryStepProps) {
  function handleCategoryClick(categoryName: string, category: CategoryItems) {
    const totalPrice = category.items.reduce((sum: number, item: QuizItem) => sum + item.price, 0);
    const previewImage = category.items[0]?.image;

    const formattedCategory: QuizItem = {
      id: categoryName,
      title: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
      image: previewImage ?? '',
      price: totalPrice,
    };

    onSelectCategory(formattedCategory);
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
              onClick={() => handleCategoryClick(categoryName, category)}
            />

            {
              selectedCardId === categoryName && (
                <div className="absolute rounded-[20px] inset-0 bg-black/70 flex items-center justify-center">
                  <div className="absolute top-1/2 -translate-y-1/2 bg-[var(--current-step-color)] w-20 h-20 rounded-full p-3 flex items-center justify-center">
                    <Check className="w-[76px] h-[76px] text-white" />
                  </div>
                </div>
              )
            }
          </div>
        )
    })}
    </div>
  );
}
