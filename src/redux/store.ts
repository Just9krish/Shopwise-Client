import { configureStore } from "@reduxjs/toolkit";
import { SellerReducer } from "./reducers/sellerReducer";
import { productReducer } from "./reducers/productReducer";
import { eventReducer } from "./reducers/eventReducer";
import { allProductsReducer } from "./reducers/allProductsReducer";
import { cartReducer } from "./reducers/cartReducer";
import { wishListReducer } from "./reducers/wishlist";
import { filterReducer } from "./reducers/filterReducers";
import { orderReducer } from "./reducers/orders.reducer";
import userReducer from "./features/User/userSlice";

const store = configureStore({
  reducer: {
    userState: userReducer,
    seller: SellerReducer,
    products: productReducer,
    events: eventReducer,
    allProducts: allProductsReducer,
    cart: cartReducer,
    wishlists: wishListReducer,
    filteredProducts: filterReducer,
    orders: orderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
