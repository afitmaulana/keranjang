import { create } from "zustand";

interface WishlistState {
  wishlist: string[]; // Array of product IDs
  toggleWishlist: (productId: string) => void;
}

const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: [],
  toggleWishlist: (productId) => {
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    }));
  },
}));

export default useWishlistStore;