import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../../constant';
import { IDeleteEventData } from './interface';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

const formConfig = {
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
};

export function getAllEvents() {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_ALL_EVENTS);
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

export function getShopAllEvents(shopId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_SHOP_EVENTS(shopId), config);
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

export function deleteShopEvent({ shopId, eventId }: IDeleteEventData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.delete(
        API_URL.DELETE_SHOP_EVENT(shopId, eventId),
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

export function createEvent(form: FormData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.post(API_URL.CREATE_SHOP_EVENT, form, formConfig);
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
