import { AccordionProvider } from 'context/AccordionContext'

interface AccordionProps {
  children: React.ReactNode
  className?: React.HTMLProps<HTMLElement>["className"]
}

export default function Accordion ({ children, className }: AccordionProps) {
  return (
      <AccordionProvider className={className}>
          { children }
      </AccordionProvider>
  )
}
