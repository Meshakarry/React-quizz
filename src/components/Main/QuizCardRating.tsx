import Star from 'components/Icons/Star'

interface QuizCardRatingProps {
  rating: number
  review_count: number
}

export default function QuizCardRating ({ rating, review_count } : QuizCardRatingProps) {
  return (
    <div className="flex gap-2.5 items-center">
      <div className="flex gap-2">
        {
          [1,2,3,4,5].map(index =>
            <Star
              key={index}
              className={
                `
                  w-3.5 h-3.5
                 ${index > rating ? 'text-[#f0f0f0]' : 'text-[#be1e2d]'}
                `
              }
            />
          )
        }
        <span className="text-black/20 text-[10px] font-light">{ review_count } reviews</span>
      </div>
    </div>
  )
}