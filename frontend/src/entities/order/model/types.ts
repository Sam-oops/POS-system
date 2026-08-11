export interface Order {
  _id: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    lineTotal: number;
  }[];
  total: number;
  status: "pending_payment" | "paid";
  createdAt: string;
}
