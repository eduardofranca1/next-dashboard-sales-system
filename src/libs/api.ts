import { Order, OrderStatus } from "@/types/Order";
import { Product } from "@/types/Product";

const tempProduct: Product = {
  id: 121,
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqbG63NGDZxaab4ut6E0v7PzbuCXCppKQY9URzRykXgg&s",
  category: {
    id: 99,
    name: "Burguers",
  },
  name: "Hamburgão",
  price: 35.5,
  description: "Super burgão",
};

export const api = {
  login: async (
    email: string,
    password: string
  ): Promise<{ error: string; token?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email !== "teste@email.com") {
          resolve({
            error: "Invalid credentials",
          });
        } else {
          resolve({
            error: "",
            token: "123",
          });
        }
      }, 1000);
    });
  },

  forgotPassword: async (email: string): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ error: "" });
      }, 1000);
    });
  },

  redefinePassword: async (
    password: string,
    confirmPassword: string,
    token: string
  ): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password !== confirmPassword) {
          resolve({ error: "Passwords need to be equal" });
        } else {
          resolve({ error: "" });
        }
      }, 1000);
    });
  },

  getOrders: async (): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders: Order[] = [];
        const status: OrderStatus[] = ["preparing", "sent", "delivered"];

        for (let i = 0; i < 6; i++) {
          orders.push({
            id: parseInt("12" + i),
            status: status[Math.floor(Math.random() * 3)],
            orderDate: "2024-01-31 18:30",
            userId: "1",
            userName: "Dudu",
            shippingAddress: {
              id: 1,
              cep: "57039-800",
              address: "Rua do Açaí",
              number: "777",
              neighborhood: "Açaílândia",
              city: "Maceió",
              state: "AL",
              complement: "Prédio",
            },
            shippingPrice: 12,
            paymentType: "card",
            changeValue: 0,
            cupom: "Açaízada",
            cupomDiscount: 2,
            products: [
              {
                amount: 2,
                product: tempProduct,
              },
              {
                amount: 3,
                product: { ...tempProduct, id: 999, name: "Vegan Mega burgão" },
              },
            ],
            subtotal: 99,
            total: 120,
          });
        }

        resolve(orders);
      }, 1000);
    });
  },

  changeOrderStatus: async (id: number, newStatus: OrderStatus) => {
    return true;
  },
};
