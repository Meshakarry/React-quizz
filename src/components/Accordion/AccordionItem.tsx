import { AccordionItemProvider } from 'context/AccordionContext'

interface AccordionItemProps {
  id: string | null
  children: React.ReactNode
}

export default function AccordionItem({ children, id }: AccordionItemProps) {
  return (
    <AccordionItemProvider id={id}>
      { children }
    </AccordionItemProvider>
  )
}
