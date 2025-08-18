import { formatPrice } from 'helpers/formatPrice'

import Info from 'components/Icons/Info'
import Accordion from 'components/Accordion/Accordion';
import AccordionItem from 'components/Accordion/AccordionItem';
import AccordionTrigger from 'components/Accordion/AccordionTrigger';
import AccordionContent from 'components/Accordion/AccordionContent';

interface QuizCardTooltipInfoProps {
  data?: {
    name: string
    value: number
  }[]
}

export default function QuizCardTooltipInfo ({ data }: QuizCardTooltipInfoProps) {
  return (
    <div className="z-[11] pointer-events-none">
      <Accordion>
          <AccordionItem id="card-tooltip">
            <AccordionTrigger
              showArrow={false}
              className="w-auto absolute right-0 top-1 pointer-events-auto"
            >
              <Info className="w-5 h-5" />
            </AccordionTrigger>

            <AccordionContent>
                <hr className="border border-[#143656]"/>
                <ul className="pt-4">
                  {
                    data?.map(tooltip => 
                      <li
                        className="flex justify-between items-center"
                        key={tooltip.name}
                      >
                        <span>{ tooltip?.name.replace('%s', 'Weekly')}</span>
                        <span className={
                          `
                            text-right flex flex-1 font-bold
                            before:flex-grow before:inline-block before:h-[1px] before:mt-4 before:mr-6 before:ml-3
                            before:bg-[repeating-linear-gradient(to_right,currentColor,currentColor_1px,transparent_2px,transparent_4px)]
                          `
                        }
                        >
                          { formatPrice(tooltip?.value)}</span>
                      </li>
                    )
                  }
                </ul>
            </AccordionContent>
          </AccordionItem>
      </Accordion>
    </div>
  )
}