import { Action, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constant";

export const loadSeller = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: "LoadSellerRequest" });

    const { data } = await axios.get(API_URL.GET_SHOP_INFO, {
      withCredentials: true,
    });

    dispatch({ type: "LoadSellerSuccess", payload: data.shop });
  } catch (error: any) {
    dispatch({
      type: "LoadSellerFail",
      error: error.message,
    });
  }
};
