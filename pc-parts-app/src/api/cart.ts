const BASE_URL = `${import.meta.env.VITE_API_URL}/cart`;
import axios from "axios";

export type CartItem = {
  id: number;
  quantity: number;
  product_id: number;
};

export type Cart = {
  id: number;
  user_id: number;
  cartItems: CartItem[];
  total: number;
};

export const getCart = async () => {
  const response: { data: Cart } = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getCartItem = async (id: string | number) => {
  const response: { data: CartItem } = await axios.get(
    `${BASE_URL}/item/${id}`
  );
  return response.data;
};

export const addToCart = async (body: {
  product_id: number;
  quantity: number;
}) => {
  const response: { data: CartItem } = await axios.post(
    `${BASE_URL}/item`,
    body
  );
  return response.data;
};

export const updateCartItem = async (
  id: string | number,
  method: "add" | "remove"
) => {
  const response: { data: CartItem } = await axios.put(
    `${BASE_URL}/item/${id}?method=${method}`
  );
  return response.data;
};

export const deleteCartItem = async (id: string | number) => {
  const response = await axios.delete(`${BASE_URL}/item/${id}`);
  return response.data;
};
