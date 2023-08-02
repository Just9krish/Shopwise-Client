import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../constant";

export const getAllOrdersOfSeller =
  (shopid: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "getShopOrders" });

      const { data } = await axios.get(API_URL.GET_SHOP_ORDERS(shopid), {
        withCredentials: true,
      });

      dispatch({ type: "getShopOrdersSuccess", payload: data.orders });
    } catch (error: AxiosError | any) {
      dispatch({
        type: "getShopOrdersFailure",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
