export interface Product {
  _id: string;
  name: string;
  price: number;
  costPrice?: number;
  stock: number;
  categoryId: { _id: string; name: string };
}
