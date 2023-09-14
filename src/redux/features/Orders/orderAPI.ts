import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../../../constant';
import { IUpdateOrderStatus } from './interface';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

export function getAllOrdersOfShop(shopId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_SHOP_ORDERS(shopId), config);
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

export function getAllOrdersOfUser(userId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_USER_ORDERS(userId), config);
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

export function updateOrderStatus({ orderId, orderStatus, shopId }: IUpdateOrderStatus) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.put(
        API_URL.UPDATE_SHOP_ORDERS(shopId, orderId),
        { orderStatus },
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

export function getOrderOfUser(orderId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_SINGLE_USER_ORDER(orderId), config);
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
