import { QuizItem, GenderCategory, CategoryItems } from '../store/quiz';
import { formatPrice } from '../helpers/formatPrice'
import QuizGenderCategoryCard from './QuizGenderCategoryCard'

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
      {Object.entries(categories).map(([categoryName, category]) => {
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
              {/* add click option here as well */}
            <button
              className="absolute inset-0 z-10"
              onClick={() => handleCategoryClick(categoryName, category)}
            />
          </div>
        )
    })}
    </div>
  );
}
