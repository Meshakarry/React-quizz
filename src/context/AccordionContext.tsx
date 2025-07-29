import React, { useContext, useState, createContext } from "react";

interface AccordionContextProps {
  activeContent: string | null
  handleTrigger: (id: string | null) => void;
}

interface AccordionItemContextProps {
  id: string | null
}

interface AccordionProviderProps {
  children: React.ReactNode
}

interface AccordionItemProviderProps {
  id: string | null
  children: React.ReactNode
}

export const AccordionContext = createContext<AccordionContextProps | null>(null);
export const AccordionItemContext = createContext<AccordionItemContextProps | null>(null)

export const AccordionProvider = ({ children }: AccordionProviderProps) => {
  const [activeContent, setActiveContent] = useState<string | null >(null);

  function handleTrigger (id: string | null) {
    setActiveContent(prevActiveContent => prevActiveContent === id ? null : id)
  }

  const value = {
    activeContent,
    handleTrigger
  }

  return (
    <AccordionContext.Provider value={value}>
      { children }
    </AccordionContext.Provider>
  )
}

export const AccordionItemProvider = ({ id, children }: AccordionItemProviderProps) => {
  const value = {
    id
  }

  return (
    <AccordionItemContext.Provider value={value}>
      { children }
    </AccordionItemContext.Provider>
  )
}


export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if( context === undefined) {
      throw new Error("useAccordion must be used within a <Accordion />");
  }
  return context;
}

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if( context === undefined) {
      throw new Error("useAccordionItemContext must be used within <AccordionItem />")
  }
  return context;
}
