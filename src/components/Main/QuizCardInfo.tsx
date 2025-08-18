import React from 'react'
import QuizCardAvatar from 'components/Main/QuizCardAvatar'
import QuizCardRating from 'components/Main/QuizCardRating'
import { Agent, Rating } from 'types/quiz'

interface QuizCardInfoProps {
  agent?: Agent
  rating?: Rating
}

export default function QuizCardInfo ({ agent, rating }: QuizCardInfoProps) {
  return (
    <React.Fragment>
      { agent?.exists && (
        <QuizCardAvatar
          agentName={agent.name}
          avatar={agent.avatar}
        />
      )}

      { rating?.exists && (
        <QuizCardRating
          rating={rating.value}
          review_count={rating.review_amount}
        />
      )}
    </React.Fragment>
  )
}