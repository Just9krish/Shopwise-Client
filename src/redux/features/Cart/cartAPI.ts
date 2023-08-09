import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../../../constant";
import { IAddToCart } from "./interface";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export function addToCart({ productId, quantity }: IAddToCart) {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse = await axios.post(
        API_URL.ADD_TO_CART,
        { productId, quantity },
        config
      );
      resolve({ data: response.data });
    } catch (error: AxiosError | any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function removeFromCart(itemId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse = await axios.delete(
        API_URL.REMOVE_FROM_CART(itemId),
        config
      );
      resolve({ data: response.data });
    } catch (error: AxiosError | any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function updateQuantity({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse = await axios.put(
        API_URL.UPDATE_CART,
        { productId, quantity },
        config
      );
      resolve({ data: response.data });
    } catch (error: AxiosError | any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function fetchCartDetails() {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse = await axios.get(API_URL.GET_CART, config);
      resolve({ data: response.data });
    } catch (error: AxiosError | any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}
