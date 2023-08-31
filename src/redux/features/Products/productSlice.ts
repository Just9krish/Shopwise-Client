import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { FilterQuery, IProductState } from "./interface";
import { getAllProductsByFilters, getProduct } from "./productAPI";

const initialState: IProductState = {
  allProducts: [],
  isProductLoading: false,
  selectedProduct: null,
  productError: null,
  productMessage: "",
  shopProducts: [],
};

export const getAllProductsByFiltersAsync = createAsyncThunk(
  "product/getAllProducts",
  async ({ filter, sort, pagination }: FilterQuery) => {
    const res: any = await getAllProductsByFilters({
      filter,
      sort,
      pagination,
    });
    return res.data;
  }
);

export const getProductAsync = createAsyncThunk(
  "product/getProduct",
  async (productId: string) => {
    const res: any = await getProduct(productId);
    return res.data;
  }
);

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsByFiltersAsync.pending, (state) => {
      state.isProductLoading = true;
    });
    builder.addCase(getAllProductsByFiltersAsync.fulfilled, (state, action) => {
      state.isProductLoading = false;
      state.allProducts = action.payload.products;
    });
    builder.addCase(getAllProductsByFiltersAsync.rejected, (state, action) => {
      state.isProductLoading = false;
      state.productError = action.error.message
        ? action.error.message
        : "Something went wrong";
    });
    builder.addCase(getProductAsync.pending, (state) => {
      state.isProductLoading = true;
    });
    builder.addCase(getProductAsync.fulfilled, (state, action) => {
      state.isProductLoading = false;
      state.selectedProduct = action.payload.product;
    });
    builder.addCase(getProductAsync.rejected, (state, action) => {
      state.isProductLoading = false;
      state.productError = action.error.message
        ? action.error.message
        : "Something went wrong";
      state.selectedProduct = null;
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
export const selectSelectedProduct = (state: RootState) =>
  state.productsState.selectedProduct;

export default productsSlice.reducer;
