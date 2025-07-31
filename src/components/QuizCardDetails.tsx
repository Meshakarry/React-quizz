import { formatPrice } from '../helpers/formatPrice'

import { QuizItem } from '../store/quiz'

interface QuizCardDetailsProps {
  card: QuizItem
  selected: boolean
}

export default function QuizCardDetails ({ card, selected }: QuizCardDetailsProps) {
  return (
     <div
      className={
        `
          absolute z-[2] -bottom-1 left-0 w-full rounded-[20px] py-8 px-4 bg-white flex items-center justify-between text-base leading-tight
          ${selected ? 'text-[var(--current-step-color)]' : 'text-black'}
        `
      }
    >
      <span>{ card.title }</span>
      { card?.price && <span>{ formatPrice(card?.price) }</span> }
    </div>
  )
}