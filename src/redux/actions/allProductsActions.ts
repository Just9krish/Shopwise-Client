import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../constant";

export const getAllProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: "getAllProducts" });

    const { data } = await axios.get(API_URL.GET_ALL_PRODUCTS);

    dispatch({ type: "getAllProductsSuccess", payload: data.products });
  } catch (error: AxiosError | any) {
    dispatch({
      type: "ProductAddFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
