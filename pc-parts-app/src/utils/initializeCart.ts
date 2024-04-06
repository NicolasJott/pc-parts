import Cookies from "universal-cookie";

import { v4 as uuidv4 } from "uuid";

const cookies = new Cookies(null, { path: "/" });

export const initializeCart = () => {
  let cartId = cookies.get("cart_id");
  console.log("cartId");
  if (!cartId) {
    cartId = uuidv4();
    cookies.set("cart_id", cartId);
  }
  return cartId;
};
