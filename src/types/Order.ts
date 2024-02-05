import { Address } from "./Address";
import { CartItem } from "./CartItem";

export type OrderStatus = "preparing" | "sent" | "delivered";

export type Order = {
  id: number;
  status: OrderStatus;
  orderDate: string;
  userId: string;
  userName?: string;
  shippingAddress: Address;
  shippingPrice: number;
  paymentType: "card" | "money";
  changeValue?: number;
  cupom?: string;
  cupomDiscount: number;
  products: CartItem[];
  subtotal: number;
  total: number;
};
