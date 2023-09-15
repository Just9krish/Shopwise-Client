import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../../constant';
import { IShopData, IShopLoginData } from './interface';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

export function createShop(shopData: IShopData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.post(API_URL.CREATE_SHOP, shopData, {
        headers: { 'Content-Type': 'application/json' },
      });
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

export async function loginShop(loginData: IShopLoginData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.post(API_URL.LOGIN_SHOP, loginData, config);
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

export async function fetchShop() {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_SHOP_INFO, config);
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
