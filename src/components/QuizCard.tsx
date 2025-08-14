import { QuizItem } from '../types/quiz'
import LocationIcon from './Icons/Location'
// components
import QuizCardDetails from './QuizCardDetails'
import QuizCardSelectedOverlay from './QuizCardSelectedOverlay'

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

      {
        card?.location && (
          <span className="absolute left-6 top-7 whitespace-nowrap bg-white/65 backdrop-blur-[20px] z-[1] rounded-[50px] px-4 py-1.5 flex items-center justify-center gap-1 text-[#143656] text-xs leading-none tracking-tight">
            <LocationIcon className="min-w-3.5" />
            { card.location }
          </span>
        )
      }

      {
        selected && (
          <QuizCardSelectedOverlay />
        )
      }

      <QuizCardDetails
        card={card}
        selected={selected}
      />

      <button
        className="absolute inset-0 -bottom-1 z-10"
        onClick={() => onSelectCard(card)}
      />
    </div>
  )
}