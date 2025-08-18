import { useAccordionContext, useAccordionItemContext } from 'context/AccordionContext'
import DownArrow from 'components/Icons/DownArrow';

interface AccordionTriggerProps {
  children: React.ReactNode
  showArrow?: boolean
  className?: React.HTMLProps<HTMLElement>["className"]
}

export default function AccordionTrigger ({ children, showArrow = true, className }: AccordionTriggerProps) {
  const context = useAccordionContext();
  const item = useAccordionItemContext();

  if (!context || !item) {
    return null
  }

  return (
    <button 
      onClick={() => context?.handleTrigger(item?.id)}
      className={`w-full ${className ?? ''}`}
     >
        <div className="flex items-center justify-between gap-2">
          { children }

          { showArrow && <DownArrow className={`w-4 h-2.5 ${item.id === context.activeContent ? 'rotate-180' : ''}`} /> }
        </div>
    </button>
  )
}
