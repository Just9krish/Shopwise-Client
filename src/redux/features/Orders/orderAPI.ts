import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../../../constant";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export function getAllOrdersOfShop(shopId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axios.get(
        API_URL.GET_SHOP_ORDERS(shopId),
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
