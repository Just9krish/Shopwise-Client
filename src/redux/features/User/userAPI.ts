import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../../../constant";
import { IAddressFrom, IUpdateData, LoginData, UserData } from "./interface";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export function createUser(userData: UserData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.post(
        API_URL.REGISTER_USER,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
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

export function loginUser(loginData: LoginData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.post(
        API_URL.LOGIN_USER,
        loginData,
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

export function fetchUserDetails() {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(API_URL.GET_USER_INFO, config);

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

export function updateUserInfo(updateData: IUpdateData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.put(
        API_URL.UPDATE_USER,
        updateData,
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

export function updateUserAddress(address: IAddressFrom) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.post(
        API_URL.ADD_USER_ADDRESS,
        address,
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

export function deleteUserAddress(addressId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.delete(
        API_URL.DELETE_USER_ADDRESS(addressId),
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
