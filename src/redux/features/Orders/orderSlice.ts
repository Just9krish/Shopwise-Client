import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrderState, IUpdateOrderStatus } from "./interface";
import { RootState } from "../../store";
import {
  getAllOrdersOfShop,
  getAllOrdersOfUser,
  updateOrderStatus,
} from "./orderAPI";

const initialState: IOrderState = {
  isOrderLoading: false,
  orderError: null,
  shopOrders: [],
  userOrders: [],
  orderMessage: "",
};

export const getAllOrdersOfShopAsync = createAsyncThunk(
  "order/getAllOrdersOfShop",
  async (shopId: string) => {
    const res: any = await getAllOrdersOfShop(shopId);
    return res.data;
  }
);

export const getAllOrdersOfUserAsnyc = createAsyncThunk(
  "order/getAllOrdersOfUser",
  async (userId: string) => {
    const res: any = await getAllOrdersOfUser(userId);
    return res.data;
  }
);

export const updateOrderStatusAsync = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, orderStatus, shopId }: IUpdateOrderStatus) => {
    const res: any = await updateOrderStatus({ orderId, orderStatus, shopId });
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
      state.shopOrders = action.payload.orders;
    });
    builder.addCase(getAllOrdersOfShopAsync.rejected, (state, action) => {
      state.isOrderLoading = false;
      state.orderError = action.error.message
        ? action.error.message
        : "Something went wrong";
    });
    builder.addCase(getAllOrdersOfUserAsnyc.pending, (state) => {
      state.isOrderLoading = true;
    });
    builder.addCase(getAllOrdersOfUserAsnyc.fulfilled, (state, action) => {
      state.isOrderLoading = false;
      state.userOrders = action.payload.orders;
    });
    builder.addCase(getAllOrdersOfUserAsnyc.rejected, (state, action) => {
      state.isOrderLoading = false;
      state.orderError = action.error.message
        ? action.error.message
        : "Something went wrong";
    });
    builder.addCase(updateOrderStatusAsync.pending, (state) => {
      state.isOrderLoading = true;
    });
    builder.addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
      state.isOrderLoading = false;
      state.userOrders = action.payload.message;
    });
    builder.addCase(updateOrderStatusAsync.rejected, (state, action) => {
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
export const selectUserOrders = (state: RootState) =>
  state.orderState.userOrders;

export const { clearOrderError, clearOrderMessage } = orderSlice.actions;

export default orderSlice.reducer;
