import { useAccordionContext, useAccordionItemContext } from 'context/AccordionContext'
import DownArrow from 'components/Icons/DownArrow';

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

          <DownArrow className={`w-4 h-2.5 ${item.id === context.activeContent ? 'rotate-180' : ''}`} />
        </div>
    </button>
  )
}
