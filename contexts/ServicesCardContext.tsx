"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ServicesCardContextValue = {
  cardIndex: number;
  setCardIndex: (index: number) => void;
};

const ServicesCardContext = createContext<ServicesCardContextValue | null>(null);

export function ServicesCardProvider({ children }: { children: ReactNode }) {
  const [cardIndex, setCardIndex] = useState(0);
  return (
    <ServicesCardContext.Provider value={{ cardIndex, setCardIndex }}>
      {children}
    </ServicesCardContext.Provider>
  );
}

export function useServicesCard() {
  const ctx = useContext(ServicesCardContext);
  return ctx ?? { cardIndex: 0, setCardIndex: () => {} };
}
