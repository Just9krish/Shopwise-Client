import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FilterQuery, IDeleteProduct, IProductState } from './interface';
import {
  deleteProduct,
  getAllProductsByFilters,
  getBestDealsProducts,
  getFeaturedProducts,
  getProduct,
  getShopProducts,
} from './productAPI';
import { RootState } from '../../type';

const initialState: IProductState = {
  allProducts: [],
  isProductLoading: false,
  selectedProduct: null,
  productError: null,
  totalProducts: 0,
  productMessage: '',
  shopProducts: [],
  bestDealsProducts: [],
  featuredProducts: [],
};

export const getAllProductsByFiltersAsync = createAsyncThunk(
  'product/getAllProducts',
  async ({ filter, sort, pagination }: FilterQuery) => {
    const res: any = await getAllProductsByFilters({
      filter,
      sort,
      pagination,
    });
    return res.data;
  }
);

export const getProductAsync = createAsyncThunk('product/getProduct', async (productId: string) => {
  const res: any = await getProduct(productId);
  return res.data;
});

export const getShopProductsAsync = createAsyncThunk(
  'product/getShopProducts',
  async (shopId: string) => {
    const res: any = await getShopProducts(shopId);
    return res.data;
  }
);

export const deleteShopProductAsync = createAsyncThunk(
  'product/deleteShopProduct',
  async ({ productId, shopId }: IDeleteProduct) => {
    const res: any = await deleteProduct({ productId, shopId });
    return res.data;
  }
);

export const getBestDealsProductsAsync = createAsyncThunk(
  'product/getBestDealsProducts',
  async () => {
    const res: any = await getBestDealsProducts();
    return res.data;
  }
);

export const getFeaturedProductsAsync = createAsyncThunk(
  'product/getFeaturedProducts',
  async () => {
    const res: any = await getFeaturedProducts();
    return res.data;
  }
);

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsByFiltersAsync.pending, (state) => {
      state.isProductLoading = true;
    });
    builder.addCase(getAllProductsByFiltersAsync.fulfilled, (state, action) => {
      state.isProductLoading = false;
      state.allProducts = action.payload.products;
      state.totalProducts = action.payload.totalDocs;
    });
    builder.addCase(getAllProductsByFiltersAsync.rejected, (state, action) => {
      state.isProductLoading = false;
      state.productError = action.error.message ? action.error.message : 'Something went wrong';
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
      state.productError = action.error.message ? action.error.message : 'Something went wrong';
      state.selectedProduct = null;
    });
    builder.addCase(getShopProductsAsync.pending, (state) => {
      state.isProductLoading = true;
    });
    builder.addCase(getShopProductsAsync.fulfilled, (state, action) => {
      state.isProductLoading = false;
      state.shopProducts = action.payload.products;
    });
    builder.addCase(getShopProductsAsync.rejected, (state, action) => {
      state.isProductLoading = false;
      state.productError = action.error.message ? action.error.message : 'Something went wrong';
      state.selectedProduct = null;
    });
    builder.addCase(deleteShopProductAsync.pending, (state) => {
      state.isProductLoading = true;
    });
    builder.addCase(deleteShopProductAsync.fulfilled, (state, action: any) => {
      state.isProductLoading = false;
      const deletedProductId = action.payload.deletedProductId;
      state.shopProducts = state.shopProducts.filter((product) => product._id !== deletedProductId);

      state.productMessage = action.payload.message;
    });
    builder.addCase(deleteShopProductAsync.rejected, (state, action) => {
      state.isProductLoading = false;
      state.productError = action.error.message ? action.error.message : 'Something went wrong';
      state.selectedProduct = null;
    });
    builder.addCase(getBestDealsProductsAsync.pending, (state) => {
      state.isProductLoading = true;
    });
    builder.addCase(getBestDealsProductsAsync.fulfilled, (state, action) => {
      state.isProductLoading = false;
      state.bestDealsProducts = action.payload.bestDealProducts;
    });
    builder.addCase(getFeaturedProductsAsync.pending, (state) => {
      state.isProductLoading = true;
    });
    builder.addCase(getFeaturedProductsAsync.fulfilled, (state, action) => {
      state.isProductLoading = false;
      state.featuredProducts = action.payload.featuredProducts;
    });
  },
});

export const selectProducts = (state: RootState) => state.productsState.allProducts;
export const selectProductLoading = (state: RootState) => state.productsState.isProductLoading;
export const selectProductError = (state: RootState) => state.productsState.productError;
export const selectProductMessage = (state: RootState) => state.productsState.productMessage;
export const selectShopProducts = (state: RootState) => state.productsState.shopProducts;
export const selectSelectedProduct = (state: RootState) => state.productsState.selectedProduct;
export const selectTotalProducts = (state: RootState) => state.productsState.totalProducts;
export const selectBestDealsProducts = (state: RootState) => state.productsState.bestDealsProducts;
export const selectFeaturedProducts = (state: RootState) => state.productsState.featuredProducts;

export default productsSlice.reducer;
