"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { maxQuantity, type Product, type Quantities } from "@/lib/catalog";

const QuoteContext = createContext<{
  quantities: Quantities;
  changeQuantity: (id: Product["id"], amount: number) => void;
  drawerOpen: boolean;
  openQuote: () => void;
  closeQuote: () => void;
} | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const changeQuantity = useCallback((id: Product["id"], amount: number) => {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(0, Math.min(maxQuantity, (previous[id] ?? 0) + amount)),
    }));
  }, []);

  const openQuote = useCallback(() => setDrawerOpen(true), []);
  const closeQuote = useCallback(() => setDrawerOpen(false), []);

  return (
    <QuoteContext.Provider value={{ quantities, changeQuantity, drawerOpen, openQuote, closeQuote }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const quote = useContext(QuoteContext);
  if (!quote) throw new Error("QuoteProvider is required");
  return quote;
}
