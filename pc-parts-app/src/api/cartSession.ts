const BASE_URL = `${import.meta.env.VITE_API_URL}/cart/session`;
import axios from "axios";
import { CartItem } from "./cart";
axios.defaults.withCredentials = true;

export type SessionCart = {
  id: string;
  user_id: number;
  cartItems: CartItem[];
  total: number;
};

export const getSessionCart = async () => {
  const response: { data: SessionCart } = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getSessionCartItem = async (id: string | number) => {
  const response: { data: CartItem } = await axios.get(
    `${BASE_URL}/item/${id}`
  );
  return response.data;
};

export const addToSessionCart = async (body: {
  product_id: number;
  quantity: number;
}) => {
  const response: { data: CartItem } = await axios.post(
    `${BASE_URL}/item`,
    body
  );
  return response.data;
};

export const updateSessionCartItem = async (
  id: string | number,
  method: "add" | "remove"
) => {
  const response: { data: CartItem } = await axios.put(
    `${BASE_URL}/item/${id}?method=${method}`
  );
  return response.data;
};

export const deleteSessionCartItem = async (id: string | number) => {
  const response = await axios.delete(`${BASE_URL}/item/${id}`);
  return response.data;
};

export const clearSessionCart = async () => {
  const response = await axios.delete(`${BASE_URL}`);
  return response.data;
};
