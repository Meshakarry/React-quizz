import { useCallback } from 'react';

const THRIFTY_SPENDER_THRESHOLD = 1100;
const NORMAL_SPENDER_THRESHOLD = 1500;
enum SPENDER_TYPES {
  THRIFTY = 'thrifty',
  NORMAL = 'Normal',
  BIG_SPENDER = 'Big spender'
}

export const DisplaySpenderTypeColors: Record<SPENDER_TYPES, string> = {
  [SPENDER_TYPES.THRIFTY]: '#46d0d9',
  [SPENDER_TYPES.NORMAL]: '#46d9b5',
  [SPENDER_TYPES.BIG_SPENDER]: '#d946a7',
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
    <div
      style={{'--spender-type-bg': DisplaySpenderTypeColors[spenderType]} as React.CSSProperties}
      className="max-w-fit mx-auto text-center mb-7 rounded-[10px] pl-2.5 pr-2 py-1 bg-[var(--spender-type-bg)] font-bold text-base leading-tight"
    >
      { spenderType }
    </div>
  )
}