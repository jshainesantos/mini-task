import React, { createContext, useState } from "react";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  total: number;
  discountedTotal: number;
  applyVoucher: (code: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = total - total * discount;

  const applyVoucher = (code: string) => {
    if (code === "discount10") {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total, discountedTotal, applyVoucher }}>
      {children}
    </CartContext.Provider>
  );
};
