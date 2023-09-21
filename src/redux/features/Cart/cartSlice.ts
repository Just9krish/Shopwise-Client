import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAddToCart, ICartState } from './interface';
import { addToCart, fetchCartDetails, removeFromCart, updateQuantity } from './cartAPI';
import { RootState } from '../../store';

const initialState: ICartState = {
  cartPrice: 0,
  cart: [],
  isCartOpen: false,
  cartMessage: '',
  isCartLoading: false,
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ productId, quantity }: IAddToCart) => {
    const res: any = await addToCart({ productId, quantity });
    return res.data;
  }
);

export const fetchCartDetailsAsync = createAsyncThunk('cart/fetchCartDetails', async () => {
  const res: any = await fetchCartDetails();
  return res.data;
});

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId: string) => {
    const res: any = await removeFromCart(itemId);
    return res.data;
  }
);

export const updateQuantityAsync = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const res: any = await updateQuantity({ productId, quantity });
    return res.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload.cart.items;
        state.cartPrice = action.payload.cart.totalPrice;
        state.cartMessage = action.payload.message;
      })
      .addCase(fetchCartDetailsAsync.fulfilled, (state, action) => {
        state.cart = action.payload.cart.items;
        state.cartPrice = action.payload.cart.totalPrice;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload.cart.items;
        state.cartPrice = action.payload.cart.totalPrice;
        state.cartMessage = action.payload.message;
      })
      .addCase(updateQuantityAsync.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.cart = action.payload.cart.items;
        state.cartPrice = action.payload.cart.totalPrice;
      });
  },
});

export const selectCart = (state: RootState) => state.cartState.cart;
export const selectCartPrice = (state: RootState) => state.cartState.cartPrice;
export const selectCartMessage = (state: RootState) => state.cartState.cartMessage;
export const selectCartOpen = (state: RootState) => state.cartState.isCartOpen;
export const selectCartLoading = (state: RootState) => state.cartState.isCartLoading;

export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;
