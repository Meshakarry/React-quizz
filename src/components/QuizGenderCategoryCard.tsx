import { QuizItem } from 'types/quiz'
import { formatPrice } from 'helpers/formatPrice'

interface QuizGenderCatgoryCardProps {
  category: QuizItem
}

export default function QuizGenderCatgoryCard ({ category } : QuizGenderCatgoryCardProps) {
  return (
    <div>
      <img
        alt={category.title}
        src={require(`../assets/images/fashion/${category.image}`)}
        className="w-full h-[100px] object-cover rounded-[20px] mb-3"
      />

      <div className="font-medium flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xl leading-none font-normal">{category.title}</span>
          {category.brand && <span className="text-xs font-light leading-none">{category.brand}</span>}
        </div>

        <h3 className="text-xl leading-none text-[#143656]">{formatPrice(category.price)}</h3>
      </div>
    </div>
  )
}
