import { QuizItem } from '../store/quiz'

interface QuizCardProps {
  card: QuizItem
  selected: boolean
  onSelectCard: (card: QuizItem) => void
}

export default function QuizCard ({ card, selected, onSelectCard } : QuizCardProps) {
  return (
    <div className="h-[250px] relative">
      <img
        className="rounded-[20px] h-full w-full"
        src={require(`../assets/images/${card.image}`)}
        alt={card.title}
      />

      <div
        className={
          `
           absolute z-[2] -bottom-1 left-0 w-full rounded-[20px] py-8 px-4 bg-white flex items-center justify-between text-base leading-tight
           ${selected ? 'text-[var(--current-step-color)]' : 'text-black'}
          `
        }
      >
        <span>{ card.title }</span>
        <span>${ card.price }</span>
      </div>

      {
        selected && (
          <div className="absolute rounded-[20px] inset-0 bg-black/70 flex items-center justify-center">
            <div className="absolute top-1/4 bg-[var(--current-step-color)] w-14 h-14 rounded-full p-3 flex items-center justify-center">
              {/* TO DO: fix icon loading */}
              <img
                src={require('../assets/svg/check.svg').default}
                alt="Check icon"
                width={44}
                height={44}
                className="object-cover"
              />
            </div>
          </div>
        )
      }


      <button
        className="absolute inset-0 -bottom-1 z-10"
        onClick={() => onSelectCard(card)}
      />
    </div>
  )
}