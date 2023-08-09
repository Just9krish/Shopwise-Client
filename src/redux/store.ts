import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducer";
import cartReducer from "./features/Cart/cartSlice";
import wishListReducer from "../redux/features/Wishlist/wishlistSlice";
import { filterReducer } from "./reducers/filterReducers";
import userReducer from "./features/User/userSlice";
import shopReducer from "./features/Shop/shopSlice";
import eventReducer from "./features/Events/eventSlice";
import orderReducer from "./features/Orders/orderSlice";
import allProductsReducer from "./features/Products/productSlice";

const store = configureStore({
  reducer: {
    userState: userReducer,
    shopState: shopReducer,
    products: productReducer,
    eventState: eventReducer,
    productsState: allProductsReducer,
    cartState: cartReducer,
    wishlistState: wishListReducer,
    filteredProducts: filterReducer,
    orderState: orderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
