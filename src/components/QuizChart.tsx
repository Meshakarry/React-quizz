
import { useMemo } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import { useQuizStore } from '../store/quiz';

interface QuizChartProps {
  totalPrice: number
}

export default function QuizChart({ totalPrice }: QuizChartProps) {
  const { selectedItems, steps } = useQuizStore();

  const pricesPercentages = useMemo(() =>
    Object.values(selectedItems).map(item => Math.round((item.price * 100) / totalPrice))
  , [selectedItems, totalPrice])

  const chartData = useMemo(() => {
    return steps.map((screen, index) => ({
      color: screen.color,
      value: Object.values(selectedItems)[index]?.price
    }))
  }, [steps, selectedItems])

  return (
    <div className="bg-white mx-auto rounded-[20px] pl-12 pr-14 py-7 gap-4 mb-9 flex justify-around items-center md:max-w-[720px]">
        <div className="max-w-28 max-h-28">
          <PieChart
            data={chartData}
          />
        </div>

        <ul className="flex flex-col justify-center gap-2.5">
          { steps.map((screen, index) =>
            <li key={index}>
              <span
                 className="w-4 h-4 mr-2 inline-block bg-[var(--legend-bg-color)]"
                 style={{'--legend-bg-color': `${screen.color}`} as React.CSSProperties}
              />
              <span>{ pricesPercentages[index] }% { screen.title }</span>
            </li>
          )}
        </ul>
      </div>
  )
}