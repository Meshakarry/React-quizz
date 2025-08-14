import { QuizSingleStep, GenderBasedStep, GenderStep } from '../types/quiz';
import { useQuizStore } from '../store/quiz';
import { formatPrice } from '../helpers/formatPrice';
// components
import QuizTitle from './QuizTitle';
import Accordion from './Accordion/Accordion';
import AccordionItem from './Accordion/AccordionItem';
import AccordionTrigger from './Accordion/AccordionTrigger';
import AccordionContent from './Accordion/AccordionContent';

interface QuizInfoProps {
  allSteps: (QuizSingleStep | GenderBasedStep | GenderStep)[]
  onChangeHandler: (index: number) => void,
}

export default function QuizInfo ({ allSteps, onChangeHandler }: QuizInfoProps) {
  const { selectedItems } = useQuizStore();

  return (
     <div className="bg-white rounded-[20px] pl-8 pr-6 flex flex-col min-h-[400px] mx-auto md:max-w-[720px]">
        <Accordion>
          { allSteps.map((step, index) =>
            <AccordionItem id={step.title} key={index}>
              <AccordionTrigger>
                <div className="py-5">
                  <QuizTitle
                    icon={step.logo}
                    title={step.title}
                    hideMarginBottom={true}
                  />
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="flex items-center justify-between gap-2 pb-6 pt-1 text-2xl leading-tight font-bold">
                  <span>{ formatPrice(Object.values(selectedItems)[index]?.price) }</span>
                  <button onClick={() => onChangeHandler(step.id)}>Change ?</button>
                </div>
              </AccordionContent>

              <hr className="border border-[#e0dddd]"/>
            </AccordionItem>
          )}
        </Accordion>
    </div>
  )
}
