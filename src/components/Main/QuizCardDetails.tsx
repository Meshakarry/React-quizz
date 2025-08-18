import { QuizItem } from 'types/quiz'
//components
import QuizCardMetaDetails from 'components/Main/QuizCardMetaDetails'
import QuizCardTooltipInfo from 'components/Main/QuizCardTooltipInfo'
import QuizCardPrice from 'components/Main/QuizCardPrice'
import QuizCardInfo from 'components/Main/QuizCardInfo'

interface QuizCardDetailsProps {
  card: QuizItem
  selected: boolean
}

export default function QuizCardDetails ({ card, selected }: QuizCardDetailsProps) {
  const { agent, rating, meta, price_per_week, tooltip } = card.options ?? {}

  return (
     <div
      className={
        `
          absolute -bottom-1 left-0 w-full rounded-[20px] py-8 px-4 bg-white flex flex-col text-base leading-tight
          ${selected ? 'text-[var(--current-step-color)]' : 'text-[#143656]'}
          ${meta?.exists && 'pb-3'}
        `
      }
    >
      <div className={`flex justify-between ${!meta?.exists && 'items-center'}`}>
        <div className="flex flex-col gap-2">
          <span className="text-xl">{ card.title }</span>

          <QuizCardInfo
            agent={agent}
            rating={rating}
          />

          {
            card.description && (
              <span>{ card.description }</span>
            )
          }
        </div>

        <QuizCardPrice
          price_per_week={price_per_week}
          price={card?.price}
        />
      </div>

      {
        meta?.exists && (
          <div className="relative flex flex-col">
            <QuizCardMetaDetails items={meta?.items} />
            <QuizCardTooltipInfo data={tooltip?.data} />
          </div>
        )
      }
    </div>
  )
}
