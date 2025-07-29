import { AccordionProvider } from '../../context/AccordionContext'

interface AccordionProps {
  children: React.ReactNode
}

export default function Accordion ({ children }: AccordionProps) {
  return (
      <AccordionProvider>
          { children }
      </AccordionProvider>
  )
}