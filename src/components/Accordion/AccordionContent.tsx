import { useAccordionContext, useAccordionItemContext } from 'context/AccordionContext'

interface AccordionContentProps {
  children: React.ReactNode
}

export default function AccordionContent ({ children }: AccordionContentProps) {
  const context = useAccordionContext();
  const item = useAccordionItemContext();

  return (
    <>
        {
            context?.activeContent === item?.id ? (
                <div>
                    { children }
                </div>
            ) : null
        }
    </>
  )
}
