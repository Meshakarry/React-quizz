import { formatPrice } from 'helpers/formatPrice'
import { QuizItem } from 'types/quiz'
import QuizCardAvatar from 'components/Main/QuizCardAvatar'
import QuizCardRating from 'components/Main/QuizCardRating'

interface QuizCardDetailsProps {
  card: QuizItem
  selected: boolean
}

export default function QuizCardDetails ({ card, selected }: QuizCardDetailsProps) {
  console.log(card.options?.rating, 'card')
  return (
     <div
      className={
        `
          absolute z-[2] -bottom-1 left-0 w-full rounded-[20px] py-8 px-4 bg-white flex items-center justify-between text-base leading-tight
          ${selected ? 'text-[var(--current-step-color)]' : 'text-[#143656]'}
        `
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xl">{ card.title }</span>
          { card.options?.agent.exists && (
            <QuizCardAvatar
              agentName={card?.options.agent.name}
              avatar={card.options.agent.avatar}
            />
          )}

          { card.options?.rating.exists && (
            <QuizCardRating
              rating={card.options?.rating.value}
              review_count={card.options?.rating.review_amount}
            />
          )}
        </div>
      </div>
      { card?.price && <span>{ formatPrice(card?.price) }</span> }
    </div>
  )
}
