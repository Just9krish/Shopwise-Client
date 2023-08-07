import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrderState } from "./interface";
import { RootState } from "../../store";
import { getAllOrdersOfShop } from "./orderAPI";

const initialState: IOrderState = {
  isOrderLoading: false,
  orderError: null,
  shopOrders: [],
  orderMessage: "",
};

export const getAllOrdersOfShopAsync = createAsyncThunk(
  "order/getAllOrdersOfShop",
  async (shopId: string) => {
    const res: any = await getAllOrdersOfShop(shopId);
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError(state) {
      state.orderError = null;
    },
    clearOrderMessage(state) {
      state.orderMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrdersOfShopAsync.pending, (state) => {
      state.isOrderLoading = true;
    });
    builder.addCase(getAllOrdersOfShopAsync.fulfilled, (state, action) => {
      state.isOrderLoading = false;
      state.shopOrders = action.payload;
    });
    builder.addCase(getAllOrdersOfShopAsync.rejected, (state, action) => {
      state.isOrderLoading = false;
      state.orderError = action.error.message
        ? action.error.message
        : "Something went wrong";
    });
  },
});

export const selectShopOrders = (state: RootState) =>
  state.orderState.shopOrders;
export const selectOrderError = (state: RootState) =>
  state.orderState.orderError;
export const selectOrderMessage = (state: RootState) =>
  state.orderState.orderMessage;
export const selectOrdersLoading = (state: RootState) =>
  state.orderState.isOrderLoading;

export const { clearOrderError, clearOrderMessage } = orderSlice.actions;

export default orderSlice.reducer;
