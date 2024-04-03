const BASE_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export interface IProduct {
  id: number;
  name: string;
  model: string;
  price: number;
  category: string;
  product_image: string;
  description: string;
  specifications: string[];
}

export const getProducts = async () => {
  const response: { data: IProduct[] } = await axios.get(
    `${BASE_URL}/products`
  );
  return response.data;
};

export const getProduct = async (id: string | number) => {
  const response: { data: IProduct } = await axios.get(
    `${BASE_URL}/products/${id}`
  );
  return response.data;
};
