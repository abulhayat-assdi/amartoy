"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products } from "@/data/site";
import type { ReactNode } from "react";
import type { Product } from "@/types/site";

const STORAGE_KEY = "amartoy-store";

interface CartEntry {
  id: number;
  quantity: number;
}

interface PersistedStoreState {
  cart: CartEntry[];
  wishlist: number[];
}

type CartProduct = Product & { quantity: number };

interface StoreContextValue {
  ready: boolean;
  cart: CartEntry[];
  cartItems: CartProduct[];
  cartCount: number;
  wishlist: number[];
  wishlistItems: Product[];
  wishlistCount: number;
  subtotal: number;
  toggleWishlist: (id: number) => void;
  addToCart: (id: number, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  removeManyFromCart: (ids: number[]) => void;
  clearCart: () => void;
}

const initialState: PersistedStoreState = {
  cart: [
    { id: 3, quantity: 1 },
    { id: 11, quantity: 2 },
  ],
  wishlist: [4, 9],
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState(initialState.cart);
  const [wishlist, setWishlist] = useState(initialState.wishlist);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<PersistedStoreState>;
        setCart(parsed.cart || initialState.cart);
        setWishlist(parsed.wishlist || initialState.wishlist);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart,
        wishlist,
      }),
    );
  }, [cart, wishlist, ready]);

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean),
    [cart],
  );

  const wishlistItems = useMemo(
    () => products.filter((product) => wishlist.includes(product.id)),
    [wishlist],
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.originalPrice ? item.price : item.price) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );
  };

  const addToCart = (id: number, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === id);

      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...current, { id, quantity }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((current) => current.filter((item) => item.id !== id));
      return;
    }

    setCart((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const removeManyFromCart = (ids: number[]) => {
    const idSet = new Set(ids);
    setCart((current) => current.filter((item) => !idSet.has(item.id)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value: StoreContextValue = {
    ready,
    cart,
    cartItems,
    cartCount,
    wishlist,
    wishlistItems,
    wishlistCount: wishlist.length,
    subtotal,
    toggleWishlist,
    addToCart,
    updateQuantity,
    removeFromCart,
    removeManyFromCart,
    clearCart,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
