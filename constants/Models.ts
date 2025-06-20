export interface TProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface TCart extends TProduct {
  quantity: number;
}