import { QuizItem } from 'types/quiz';
import QuizCard from 'components/Main/QuizCard';

interface QuizStepProps {
  items: QuizItem[]
  selectedCardId?: string
  onSelectCard: (itemId: string) => void
}

export default function QuizMainStep ({ items, selectedCardId,  onSelectCard }: QuizStepProps) {
  return (
      <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
        {
          items.map((card) =>
            <QuizCard
              card={card}
              key={card.id}
              selected={selectedCardId === card.id}
              onSelectCard={onSelectCard}
            />
          )
        }
      </div>
  )
}
