import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FilterQuery, IDeleteProduct, IProductState } from './interface';
import {
  addProduct,
  deleteProduct,
  getAllProductsByFilters,
  getBestDealsProducts,
  getFeaturedProducts,
  getProduct,
  getShopProducts,
} from './productAPI';
import { RootState } from '../../store';

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

export const addShopProductAsync = createAsyncThunk(
  'product/addProduct',
  async (data: FormData) => {
    const res: any = await addProduct(data);
    return res.data;
  }
);

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsByFiltersAsync.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getAllProductsByFiltersAsync.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.allProducts = action.payload.products;
        state.totalProducts = action.payload.totalDocs;
      })
      .addCase(getAllProductsByFiltersAsync.rejected, (state, action) => {
        state.isProductLoading = false;
        state.productError = action.error.message ? action.error.message : 'Something went wrong';
      })
      .addCase(getProductAsync.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.selectedProduct = action.payload.product;
      })
      .addCase(getProductAsync.rejected, (state, action) => {
        state.isProductLoading = false;
        state.productError = action.error.message ? action.error.message : 'Something went wrong';
        state.selectedProduct = null;
      })
      .addCase(getShopProductsAsync.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getShopProductsAsync.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.shopProducts = action.payload.products;
      })
      .addCase(getShopProductsAsync.rejected, (state, action) => {
        state.isProductLoading = false;
        state.productError = action.error.message ? action.error.message : 'Something went wrong';
        state.selectedProduct = null;
      })
      .addCase(deleteShopProductAsync.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(deleteShopProductAsync.fulfilled, (state, action) => {
        const { deletedProductId, message } = action.payload;

        return {
          ...state,
          isProductLoading: false,
          shopProducts: state.shopProducts.filter((product) => product._id !== deletedProductId),
          productMessage: message,
        };
      })
      .addCase(deleteShopProductAsync.rejected, (state, action) => {
        state.isProductLoading = false;
        state.productError = action.error.message ? action.error.message : 'Something went wrong';
        state.selectedProduct = null;
      })
      .addCase(getBestDealsProductsAsync.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getBestDealsProductsAsync.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.bestDealsProducts = action.payload.bestDealProducts;
      })
      .addCase(getFeaturedProductsAsync.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getFeaturedProductsAsync.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.featuredProducts = action.payload.featuredProducts;
      })
      .addCase(addShopProductAsync.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(addShopProductAsync.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.shopProducts.push(action.payload.product);
        state.productMessage = action.payload.message;
      })
      .addCase(addShopProductAsync.rejected, (state, action) => {
        state.isProductLoading = false;
        state.productError = action.error.message ? action.error.message : 'Something went wrong';
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
