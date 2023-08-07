import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../../../constant";
import { IAddProduct, IDeleteProduct } from "./interface";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
};

export function getAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_ALL_PRODUCTS);
      resolve({ data: res.data });
    } catch (error: AxiosError | any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function addProduct(data: IAddProduct) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.post(
        API_URL.ADD_PRODUCT,
        data,
        config
      );
      resolve({ data: res.data });
    } catch (error: AxiosError | any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function getShopProducts(shopId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(
        API_URL.GET_SHOP_PRODUCTS(shopId),
        { withCredentials: true }
      );
      resolve({ data: res.data });
    } catch (error: AxiosError | any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function deleteProduct({ productId, shopId }: IDeleteProduct) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.delete(
        API_URL.DELETE_SHOP_PRODUCT(shopId, productId),
        { withCredentials: true }
      );
      resolve({ data: res.data });
    } catch (error: AxiosError | any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}
