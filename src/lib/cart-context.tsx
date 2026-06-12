"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
  productId: string;
  switchId: string;
  caseId: string;
  keycapId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
});

export function useCart() {
  return useContext(CartContext);
}

function getInitialItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("signal-cart");
  if (!saved) return [];
  try {
    return JSON.parse(saved) as CartItem[];
  } catch {
    return [];
  }
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getInitialItems);

  useEffect(() => {
    localStorage.setItem("signal-cart", JSON.stringify(items));
  }, [items]);

  function addItem(item: Omit<CartItem, "quantity">) {
    setItems((prev) => {
      const existing = prev.findIndex(
        (i) => i.productId === item.productId && i.switchId === item.switchId && i.caseId === item.caseId && i.keycapId === item.keycapId
      );
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...next[existing], quantity: next[existing].quantity + 1 };
        return next;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateQuantity(index: number, quantity: number) {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity };
      return next;
    });
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}
