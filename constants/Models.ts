export interface TProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  store: string; // Tambahkan properti toko
}

export interface TCart extends TProduct {
  quantity: number;
}