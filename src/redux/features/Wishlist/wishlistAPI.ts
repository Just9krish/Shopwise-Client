import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../../constant';
import { IWishlistResponse } from './interface';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

export function getWishlist() {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_WISHLIST, config);

      resolve({ data: res.data });
    } catch (error: any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function addToWishlist(productId: string): Promise<IWishlistResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.post(API_URL.ADD_TO_WISHLIST, { productId }, config);

      resolve({ data: res.data });
    } catch (error: any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function removeFromWishlist(productId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.delete(
        API_URL.REMOVE_FROM_WISHLIST(productId),
        config
      );

      resolve({ data: res.data });
    } catch (error: any) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}
