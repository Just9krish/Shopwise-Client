import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../../constant';
import { FilterQuery, IDeleteProduct } from './interface';

const config = {
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
};

export function getAllProductsByFilters({ filter, sort, pagination }: FilterQuery) {
  const filterKeys = Object.keys(filter);
  const sortKeys = Object.keys(sort);
  const paginationKeys = Object.keys(pagination);

  const filterQueryString = filterKeys
    .filter((key) => filter[key].length)
    .map((key) => `${key}=${filter[key]}`)
    .join('&');

  const sortQueryString = sortKeys.map((key) => `${key}=${sort[key]}`).join('&');

  const paginationQueryString = paginationKeys.map((key) => `${key}=${pagination[key]}`).join('&');

  const queryString = `${filterQueryString}&${sortQueryString}&${paginationQueryString}`;

  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_FILTERED_PRODUCTS(queryString));
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

export function addProduct(data: FormData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.post(API_URL.ADD_PRODUCT, data, config);
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

export function getShopProducts(shopId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_SHOP_PRODUCTS(shopId), {
        withCredentials: true,
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

export function deleteProduct({ productId, shopId }: IDeleteProduct) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.delete(
        API_URL.DELETE_SHOP_PRODUCT(shopId, productId),
        { withCredentials: true }
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

export function getProduct(productId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_SINGLE_PRODUCT(productId));
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

export function getBestDealsProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_BEST_DEALS);
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

export function getFeaturedProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_FEATURED_PRODUCTS);
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
