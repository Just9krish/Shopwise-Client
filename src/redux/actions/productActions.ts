import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IAddProduct } from "../../Interface";
import { API_URL } from "../../constant";

axios.defaults.withCredentials = true;

export const addProduct =
  (newForm: IAddProduct) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "productAddRequest" });

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(API_URL.ADD_PRODUCT, newForm, config);

      dispatch({ type: "productAddSuccess", payload: data.product });
    } catch (error: AxiosError | any) {
      dispatch({
        type: "ProductAddFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const getShopAllProducts =
  (sellerId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "getShopAllProducts" });

      const { data } = await axios.get(API_URL.GET_SHOP_PRODUCTS(sellerId));

      dispatch({ type: "getShopAllProductsSuccess", payload: data.products });
    } catch (error: AxiosError | any) {
      console.log(error);
      dispatch({
        type: "getShopAllProductsFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const deleteProduct =
  (productId: string, shopId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "deleteProductRequest" });

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.delete(
        API_URL.DELETE_SHOP_PRODUCT(shopId, productId),
        config
      );

      dispatch({
        type: "deleteProductSuccess",
        payload: { message: data.message, productId },
      });
    } catch (error: AxiosError | any) {
      dispatch({
        type: "deleteProductFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
