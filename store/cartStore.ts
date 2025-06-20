import { create } from "zustand";
import { Product } from "@/constants/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addItemToCart: (item: Product, quantity?: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addItemToCart: (item, quantity = 1) => {
    set((state) => {
      const itemExists = state.cartItems.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          ),
        };
      }
      return { cartItems: [...state.cartItems, { ...item, quantity }] };
    });
  },

  increaseQuantity: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },
  
  decreaseQuantity: (productId) => {
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  removeItemFromCart: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },
}));

export default useCartStore;