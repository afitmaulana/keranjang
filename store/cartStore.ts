import { create } from "zustand";
import { TCart, TProduct } from "@/constants/Models";

interface CartState {
  cartItems: TCart[];
  addItemToCart: (item: TProduct) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItemFromCart: (productId: number) => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addItemToCart: (item) => {
    const cartItems = get().cartItems;
    const itemExists = cartItems.find(cartItem => cartItem.id === item.id);

    if (itemExists) {
      const updatedCart = cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
          : cartItem
      );
      set({ cartItems: updatedCart });
    } else {
      set({
        cartItems: [...cartItems, { ...item, quantity: 1 }],
      });
    }
  },

  increaseQuantity: (productId) => {
    const updatedCart = get().cartItems.map(cartItem =>
      cartItem.id === productId
        ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
        : cartItem
    );
    set({ cartItems: updatedCart });
  },

  decreaseQuantity: (productId) => {
    const cartItems = get().cartItems;
    const item = cartItems.find(cartItem => cartItem.id === productId);

    if (!item) return;

    if (item.quantity && item.quantity > 1) {
      const updatedCart = cartItems.map(cartItem =>
        cartItem.id === productId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      set({ cartItems: updatedCart });
    } else {
      const filteredCart = cartItems.filter(cartItem => cartItem.id !== productId);
      set({ cartItems: filteredCart });
    }
  },

  removeItemFromCart: (productId) => {
    const itemExists = get().cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    if (itemExists) {
      const updatedCartItems = get().cartItems.filter(
        (item) => item.id !== productId
      );
      set({ cartItems: updatedCartItems });
    }
  }
}));

export default useCartStore;