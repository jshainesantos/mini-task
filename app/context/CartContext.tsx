import React, { createContext, useCallback, useMemo, useState } from "react";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  total: number;
  discountedTotal: number;
  applyVoucher: (code: string) => boolean;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const qtyToAdd = product.quantity ?? 1;
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item,
        );
      }
      return [...prev, { ...product, quantity: qtyToAdd }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) return prev.filter((item) => item.id !== id);
      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
    });
  }, []);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const discountedTotal = useMemo(
    () => total * (1 - discount),
    [total, discount],
  );

  const applyVoucher = useCallback((code: string): boolean => {
    const voucherKey = code.trim().toLowerCase();

    const vouchers: Record<string, number> = {
      discount10: 0.1,
      discount20: 0.2,
    };

    if (voucherKey in vouchers) {
      setDiscount(vouchers[voucherKey]);
      return true;
    }

    setDiscount(0);
    return false;
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        discountedTotal,
        applyVoucher,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
