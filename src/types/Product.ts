import { Catergory } from "./Category";

export type Product = {
  id: number;
  image: string;
  category: Catergory;
  name: string;
  price: number;
  description?: string;
};
