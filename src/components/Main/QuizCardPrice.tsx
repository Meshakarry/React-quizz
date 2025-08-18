import React from 'react'
import { formatPrice } from 'helpers/formatPrice'

interface QuizCardPriceProps {
  price: number
  price_per_week?: number
}

export default function QuizCardPrice({ price, price_per_week }: QuizCardPriceProps) {
  return (
    <React.Fragment>
      { price_per_week ? (
          <span>{ formatPrice(price_per_week) } per week</span>
        ) : (
          <span className="text-xl font-bold">{ formatPrice(price) }</span>
        )
      }
    </React.Fragment>
  )
}