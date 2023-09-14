import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../../../constant';
import { FilterQuery, IAddProduct, IDeleteProduct } from './interface';

const config = {
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
};

export function getAllProductsByFilters({ filter, sort, pagination }: FilterQuery) {
  let queryString = '';

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_FILTERED_PRODUCTS(queryString));
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
      const res: AxiosResponse = await axios.post(API_URL.ADD_PRODUCT, data, config);
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
      const res: AxiosResponse = await axios.get(API_URL.GET_SHOP_PRODUCTS(shopId), {
        withCredentials: true,
      });
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

export function getProduct(productId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_SINGLE_PRODUCT(productId));
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

export function getBestDealsProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_BEST_DEALS);
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

export function getFeaturedProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_FEATURED_PRODUCTS);
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
