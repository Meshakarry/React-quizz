import { useAccordionContext, useAccordionItemContext } from '../../context/AccordionContext'

// TO DO: children global type
// TO DO: add chevron down to be here by default, also add support to shwo/hide it

interface AccordionTriggerProps {
  children: React.ReactNode
}

export default function AccordionTrigger ({ children }: AccordionTriggerProps) {
  const context = useAccordionContext();
  const item = useAccordionItemContext();

  if (!context || !item) {
    return null
  }

  return (
    <button 
      onClick={() => context?.handleTrigger(item?.id)}
      className="w-full"
     >
        <div className="flex items-center justify-between gap-2">
          { children }

          <img
            className={item.id === context.activeContent ? 'rotate-180' : ''}
            src={require('../../assets/svg/down-arrow.svg?data').default}
            alt="down-arrow"
            width="16"
            height="9"
          />
        </div>
    </button>
  )
}