import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToWishlist, getWishlist, removeFromWishlist } from "./wishlistAPI";
import { RootState } from "../../store";

const initialState = {
  wishlist: [],
  isWishlistLoading: false,
};

export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId: string) => {
    const response: any = await addToWishlist(productId);
    return response.data;
  }
);

export const removeToWishlistAsync = createAsyncThunk(
  "wishlist/removeToWishlist",
  async (productId: string) => {
    const response: any = await removeFromWishlist(productId);
    return response.data;
  }
);

export const getWishlistAsync = createAsyncThunk(
  "wishlist/getWishlist",
  async () => {
    const response: any = await getWishlist();
    return response.data;
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistAsync.pending, (state) => {
        state.isWishlistLoading = true;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.wishlist = action.payload.products;
        state.isWishlistLoading = false;
      })
      .addCase(addToWishlistAsync.rejected, (state) => {
        state.isWishlistLoading = false;
      })
      .addCase(removeToWishlistAsync.pending, (state) => {
        state.isWishlistLoading = true;
      })
      .addCase(removeToWishlistAsync.fulfilled, (state, action) => {
        state.wishlist = action.payload.products;
        state.isWishlistLoading = false;
      })
      .addCase(removeToWishlistAsync.rejected, (state) => {
        state.isWishlistLoading = false;
      })
      .addCase(getWishlistAsync.pending, (state) => {
        state.isWishlistLoading = true;
      })
      .addCase(getWishlistAsync.fulfilled, (state, action) => {
        state.wishlist = action.payload.products;
        state.isWishlistLoading = false;
      })
      .addCase(getWishlistAsync.rejected, (state) => {
        state.isWishlistLoading = false;
      });
  },
});

export const selectWishlist = (state: RootState) =>
  state.wishlistState.wishlist;
export const selectWishlistLoading = (state: RootState) =>
  state.wishlistState.isWishlistLoading;

export default wishlistSlice.reducer;
