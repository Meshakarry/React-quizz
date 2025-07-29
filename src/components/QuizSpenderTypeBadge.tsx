import { useCallback } from 'react';

const THRIFTY_SPENDER_THRESHOLD = 1100;
const NORMAL_SPENDER_THRESHOLD = 1500;
enum SPENDER_TYPES {
  THRIFTY = 'thrifty',
  NORMAL = 'Normal',
  BIG_SPENDER = 'Big spender'
}

interface QuizSpenderTypeBadgeProps {
  totalPrice: number
}

export function QuizSpenderTypeBadge ({ totalPrice } : QuizSpenderTypeBadgeProps) {
  const calculateSpenderType = useCallback((price: number) => {
    if (price <= THRIFTY_SPENDER_THRESHOLD) {
      return SPENDER_TYPES.THRIFTY;
    }
    else if (price > THRIFTY_SPENDER_THRESHOLD && price <= NORMAL_SPENDER_THRESHOLD) {
      return SPENDER_TYPES.NORMAL;
    }
    else {
      return SPENDER_TYPES.BIG_SPENDER;
    }
  }, [])

  const spenderType = calculateSpenderType(totalPrice)

  return (
    <div className="max-w-fit mx-auto text-center mb-7 rounded-[10px] pl-2.5 pr-2 py-1 bg-white font-bold text-base leading-tight">
      { spenderType }
    </div>
  )
}