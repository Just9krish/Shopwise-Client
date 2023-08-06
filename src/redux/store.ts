import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducer";
import { allProductsReducer } from "./reducers/allProductsReducer";
import { cartReducer } from "./reducers/cartReducer";
import { wishListReducer } from "./reducers/wishlist";
import { filterReducer } from "./reducers/filterReducers";
import { orderReducer } from "./reducers/orders.reducer";
import userReducer from "./features/User/userSlice";
import shopReducer from "./features/Shop/shopSlice";
import eventReducer from "./features/Events/eventSlice";

const store = configureStore({
  reducer: {
    userState: userReducer,
    shopState: shopReducer,
    products: productReducer,
    eventState: eventReducer,
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
