import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IProductState } from "./interface";
import { getAllProducts } from "./productAPI";

const initialState: IProductState = {
  allProducts: [],
  isProductLoading: false,
  productError: null,
  productMessage: "",
  shopProducts: [],
};

export const getAllProductsAsync = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const res: any = await getAllProducts();
    return res.data;
  }
);

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAsync.pending, (state) => {
      state.isProductLoading = true;
    });
    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      state.isProductLoading = false;
      state.allProducts = action.payload.products;
    });
    builder.addCase(getAllProductsAsync.rejected, (state, action) => {
      state.isProductLoading = false;
      state.productError = action.error.message
        ? action.error.message
        : "Something went wrong";
    });
  },
});

export const selectProducts = (state: RootState) =>
  state.productsState.allProducts;
export const selectProductLoading = (state: RootState) =>
  state.productsState.isProductLoading;
export const selectProductError = (state: RootState) =>
  state.productsState.productError;
export const selectProductMessage = (state: RootState) =>
  state.productsState.productMessage;
export const selectShopProducts = (state: RootState) =>
  state.productsState.shopProducts;

export default productsSlice.reducer;
