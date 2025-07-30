import { useQuizStore } from '../store/quiz';

import { formatPrice } from '../helpers/formatPrice'

import QuizTitle from './QuizTitle';
import Accordion from './Accordion/Accordion';
import AccordionItem from './Accordion/AccordionItem';
import AccordionTrigger from './Accordion/AccordionTrigger';
import AccordionContent from './Accordion/AccordionContent';

interface QuizInfoProps {
  onChangeHandler: (index: number) => void,
}

export default function QuizInfo ({ onChangeHandler }: QuizInfoProps) {
  const { selectedItems, steps } = useQuizStore();

  return (
     <div className="bg-white rounded-[20px] pl-8 pr-6 flex flex-col min-h-[400px] mx-auto md:max-w-[720px]">
            <Accordion>
              { steps.map((screen, index) =>
                <AccordionItem id={screen.title} key={index}>
                  <AccordionTrigger>
                    <div className="py-5">
                      <QuizTitle
                        icon={screen.logo}
                        title={screen.title}
                        hideMarginBottom={true}
                      />
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="flex items-center justify-between gap-2 pb-6 pt-1 text-2xl leading-tight font-bold">
                      <span>{ formatPrice(Object.values(selectedItems)[index]?.price) }</span>
                      <button onClick={() => onChangeHandler(index)}>Change ?</button>
                    </div>
                  </AccordionContent>

                  <hr className="border border-[#e0dddd]"/>
                </AccordionItem>
              )}
            </Accordion>
          </div>
  )
}
