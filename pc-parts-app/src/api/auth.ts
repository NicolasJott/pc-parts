const BASE_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export type Token = {
  access_token: string;
  token_type: string;
};

// The signUp function sends a POST request to the /signup endpoint with the name, email, and password as the request body. It returns the access token and token type from the response.
export const signUp = async (name: string, email: string, password: string) => {
  const response: { data: Token } = await axios.post(`${BASE_URL}/signup`, {
    name,
    email,
    password,
  });
  return response.data;
};

// The login function sends a POST request to the /login endpoint with the email and password as the request body. It returns the access token and token type from the response.
export const login = async (email: string, password: string) => {
  const response: { data: Token } = await axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

// The logout function sends a POST request to the /logout endpoint to log out the user.
export const logout = async () => {
  const response = await axios.post(`${BASE_URL}/logout`);
  return response.data;
};
