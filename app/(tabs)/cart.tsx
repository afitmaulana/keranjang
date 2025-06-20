// import { create } from "zustand";
// import { TCart, TProduct } from "@/constants/Models";

// interface CartState {
//   cartItems: TCart[];
//   selectedItems: number[]; // Menyimpan ID produk yang dipilih
//   addItemToCart: (item: TProduct) => void;
//   increaseQuantity: (productId: number) => void;
//   decreaseQuantity: (productId: number) => void;
//   removeItemFromCart: (productId: number) => void;
//   toggleItemSelection: (productId: number) => void;
//   toggleSelectAll: () => void;
//   toggleSelectStore: (storeName: string) => void;
//   clearSelection: () => void;
//   checkout: () => void;
// }

// const useCartStore = create<CartState>((set, get) => ({
//   cartItems: [],
//   selectedItems: [],

//   addItemToCart: (item) => {
//     const cartItems = get().cartItems;
//     const itemExists = cartItems.find((cartItem) => cartItem.id === item.id);

//     if (itemExists) {
//       const updatedCart = cartItems.map((cartItem) =>
//         cartItem.id === item.id
//           ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
//           : cartItem
//       );
//       set({ cartItems: updatedCart });
//     } else {
//       set({
//         cartItems: [...cartItems, { ...item, quantity: 1 }],
//       });
//     }
//   },

//   increaseQuantity: (productId) => {
//     const updatedCart = get().cartItems.map((cartItem) =>
//       cartItem.id === productId
//         ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
//         : cartItem
//     );
//     set({ cartItems: updatedCart });
//   },

//   decreaseQuantity: (productId) => {
//     const cartItems = get().cartItems;
//     const item = cartItems.find((cartItem) => cartItem.id === productId);

//     if (!item) return;

//     if (item.quantity > 1) {
//       const updatedCart = cartItems.map((cartItem) =>
//         cartItem.id === productId
//           ? { ...cartItem, quantity: cartItem.quantity - 1 }
//           : cartItem
//       );
//       set({ cartItems: updatedCart });
//     } else {
//       // Jika kuantitas 1, hapus dari keranjang
//       get().removeItemFromCart(productId);
//     }
//   },

//   removeItemFromCart: (productId) => {
//     const updatedCartItems = get().cartItems.filter(
//       (item) => item.id !== productId
//     );
//     // Hapus juga dari item yang dipilih
//     const updatedSelectedItems = get().selectedItems.filter(
//       (id) => id !== productId
//     );
//     set({ cartItems: updatedCartItems, selectedItems: updatedSelectedItems });
//   },

//   toggleItemSelection: (productId) => {
//     const selectedItems = get().selectedItems;
//     if (selectedItems.includes(productId)) {
//       set({ selectedItems: selectedItems.filter((id) => id !== productId) });
//     } else {
//       set({ selectedItems: [...selectedItems, productId] });
//     }
//   },

//   toggleSelectAll: () => {
//     const { cartItems, selectedItems } = get();
//     if (selectedItems.length === cartItems.length && cartItems.length > 0) {
//       set({ selectedItems: [] });
//     } else {
//       set({ selectedItems: cartItems.map((item) => item.id) });
//     }
//   },
  
//   toggleSelectStore: (storeName) => {
//     const { cartItems, selectedItems } = get();
//     const storeItems = cartItems.filter(item => item.store === storeName);
//     const storeItemIds = storeItems.map(item => item.id);
//     const areAllSelected = storeItemIds.every(id => selectedItems.includes(id));

//     if (areAllSelected) {
//       // Batal pilih semua item dari toko ini
//       set({ selectedItems: selectedItems.filter(id => !storeItemIds.includes(id)) });
//     } else {
//       // Pilih semua item dari toko ini
//       set({ selectedItems: [...new Set([...selectedItems, ...storeItemIds])] });
//     }
//   },

//   clearSelection: () => {
//     set({ selectedItems: [] });
//   },

//   checkout: () => {
//     const { cartItems, selectedItems } = get();
//     const itemsToCheckout = cartItems.filter(item => selectedItems.includes(item.id));
//     const newCartItems = cartItems.filter(item => !selectedItems.includes(item.id));
    
//     set({ cartItems: newCartItems, selectedItems: [] });
//     return itemsToCheckout;
//   }
// }));

// export default useCartStore;