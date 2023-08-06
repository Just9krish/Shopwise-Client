import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createShop, fetchShop, loginShop } from "./shopAPI";
import { RootState } from "../../store";
import { IShopData, IShopLoginData, IShopState } from "./interface";

const initialState: IShopState = {
  isShopAuthenticated: false,
  isShopLoading: false,
  shopError: null,
  shop: null,
  shopMessage: "",
};

export const createShopAsync = createAsyncThunk(
  "shop/createShop",
  async (shopData: IShopData) => {
    const res: any = await createShop(shopData);
    return res.data;
  }
);

export const loginShopAsync = createAsyncThunk(
  "shop/loginShop",
  async (shopData: IShopLoginData) => {
    const res: any = await loginShop(shopData);
    return res.data;
  }
);

export const fetchShopAsync = createAsyncThunk("shop/fetchShop", async () => {
  const res: any = await fetchShop();
  return res.data;
});

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    clearShopError: (state) => {
      state.shopError = null;
    },
    clearShopMessage: (state) => {
      state.shopMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShopAsync.pending, (state) => {
        state.isShopLoading = true;
      })
      .addCase(createShopAsync.fulfilled, (state, action) => {
        state.isShopLoading = false;
        state.shopMessage = action.payload.message;
      })
      .addCase(createShopAsync.rejected, (state, action) => {
        state.isShopLoading = false;
        state.shopError = action.error.message
          ? action.error.message
          : "Something went wrong";
      })
      .addCase(loginShopAsync.pending, (state) => {
        state.isShopLoading = true;
      })
      .addCase(loginShopAsync.fulfilled, (state, action) => {
        state.isShopLoading = false;
        state.isShopAuthenticated = true;
        state.shop = action.payload.seller;
        state.shopMessage = action.payload.message;
      })
      .addCase(loginShopAsync.rejected, (state, action) => {
        state.isShopLoading = false;
        state.shopError = action.error.message
          ? action.error.message
          : "Something went wrong";
      })
      .addCase(fetchShopAsync.pending, (state) => {
        state.isShopLoading = true;
      })
      .addCase(fetchShopAsync.fulfilled, (state, action) => {
        state.isShopLoading = false;
        state.isShopAuthenticated = true;
        state.shop = action.payload.shop;
      })
      .addCase(fetchShopAsync.rejected, (state, action) => {
        state.isShopLoading = false;
        state.shopError = action.error.message
          ? action.error.message
          : "Something went wrong";
      });
  },
});

export const selectShop = (state: RootState) => state.shopState.shop;
export const selectShopError = (state: RootState) => state.shopState.shopError;
export const selectShopMessage = (state: RootState) =>
  state.shopState.shopMessage;
export const selectShopLoading = (state: RootState) =>
  state.shopState.isShopLoading;
export const selectShopAuthenticated = (state: RootState) =>
  state.shopState.isShopAuthenticated;

export const { clearShopError, clearShopMessage } = shopSlice.actions;

export default shopSlice.reducer;
