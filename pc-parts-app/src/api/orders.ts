const BASE_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { IProduct } from "./products";

type DeliveryAddress = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: number;
};

type Item = {
  id: number;
  quantity: number;
};

export type LineItem = {
  product: IProduct;
} & Item;

export type CreateOrderRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  products: Item[];
  deliveryAddress: DeliveryAddress;
};

export type Order = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  created_at: string;
  delivery_address: DeliveryAddress;
  line_items: LineItem[];
};

// The getOrders function sends a GET request to the /orders endpoint to get all the orders. It returns the orders from the response.
export const createOrder = async (order: CreateOrderRequest) => {
  const response: { data: Order } = await axios.post(
    `${BASE_URL}/orders`,
    order
  );
  return response.data;
};

// The getOrder function sends a GET request to the /orders/:id endpoint to get the order with the specified ID. It returns the order from the response.
export const getOrder = async (id: string) => {
  const response: { data: Order } = await axios.get(`${BASE_URL}/orders/${id}`);
  return response.data;
};

// The updateOrder function sends a PUT request to the /orders/:id endpoint with the updated order details. It returns the updated order from the response.
export const updateOrder = async (id: string, order: CreateOrderRequest) => {
  const response: { data: Order } = await axios.put(
    `${BASE_URL}/orders/${id}`,
    order
  );
  return response.data;
};

// The deleteOrder function sends a DELETE request to the /orders/:id endpoint to delete the order with the specified ID.
export const deleteOrder = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/orders/${id}`);
  return response.data;
};
