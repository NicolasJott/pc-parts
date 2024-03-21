const BASE_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { Order } from "./orders";

export type Profile = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

// The getProfile function sends a GET request to the /profile endpoint to get the user's profile. It returns the user's profile from the response.
export const getProfile = async () => {
  const response: { data: Profile } = await axios.get(`${BASE_URL}/profile`);
  return response.data;
};

// deleteProfile function sends a DELETE request to the /profile endpoint to delete the user's profile.
export const deleteProfile = async () => {
  const response = await axios.delete(`${BASE_URL}/profile`);
  return response.data;
};

// The getMyOrders function sends a GET request to the /profile/orders endpoint to get the user's orders. It returns the orders from the response.
export const getMyOrders = async () => {
  const response: { data: Order[] } = await axios.get(
    `${BASE_URL}/profile/orders`
  );
  return response.data;
};
