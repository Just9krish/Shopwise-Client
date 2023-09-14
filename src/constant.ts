// constants.ts

export const SERVER_URL = import.meta.env.VITE_SERVER_DOMAIN;
export const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

export const DOMAIN = `${SERVER_URL}/api/v2`;

export const API_URL = {
  // User APIs
  REGISTER_USER: `${DOMAIN}/users/signup`,
  ACTIVATE_USER: `${DOMAIN}/users/activation`,
  LOGIN_USER: `${DOMAIN}/users/login`,
  GET_USER_INFO: `${DOMAIN}/users/getuser`,
  FORGOT_USER_PASSWORD: `${DOMAIN}/users/forgotpassword`,
  REST_USER_PASSWORD: (resetToken: string) => `${DOMAIN}/users/resetpassword/${resetToken}`,
  UPDATE_USER: `${DOMAIN}/users/profile`,
  UPDATE_USER_PROFILE: `${DOMAIN}/users/avatar`,
  ADD_USER_ADDRESS: `${DOMAIN}/users/address`,
  DELETE_USER_ADDRESS: (addressId: string) => `${DOMAIN}/users/address/${addressId}`,
  USER_PASSWORD_CHANGE: `${DOMAIN}/users/password-change`,
  GET_USER_ORDERS: (userId: string) => `${DOMAIN}/users/${userId}/orders`,
  LOGOUT_USER: `${DOMAIN}/users/logout`,

  // Shop APIs
  CREATE_SHOP: `${DOMAIN}/shops/create-shop`,
  ACTIVATE_SHOP: `${DOMAIN}/shops/activation`,
  LOGIN_SHOP: `${DOMAIN}/shops/login-shop`,
  LOGOUT_SHOP: `${DOMAIN}/shops/logout`,
  GET_SHOP_INFO: `${DOMAIN}/shops/get-shop`,
  CREATE_SHOP_EVENT: `${DOMAIN}/shops/events`,
  GET_SHOP_EVENTS: (shopId: string) => `${DOMAIN}/shops/${shopId}/events`,
  DELETE_SHOP_EVENT: (shopId: string, eventId: string) =>
    `${DOMAIN}/shops/${shopId}/events/${eventId}`,
  GET_SHOP_PRODUCTS: (shopId: string) => `${DOMAIN}/shops/${shopId}/products`,
  DELETE_SHOP_PRODUCT: (shopId: string, productId: string) =>
    `${DOMAIN}/shops/${shopId}/products/${productId}`,
  CREATE_SHOP_COUPON: (shopId: string) => `${DOMAIN}/shops/${shopId}/coupons`,
  GET_SHOP_COUPONS: (shopId: string) => `${DOMAIN}/shops/${shopId}/coupons`,
  DELETE_SHOP_COUPON: (shopId: string, couponId: string) =>
    `${DOMAIN}/shops/${shopId}/coupons/${couponId}`,
  GET_SHOP_ORDERS: (shopId: string) => `${DOMAIN}/shops/${shopId}/orders`,
  UPDATE_SHOP_ORDERS: (shopId: string, orderId: string) =>
    `${DOMAIN}/shops/${shopId}/orders/${orderId}`,

  // Coupon APIs
  GET_ALL_COUPONS: `${DOMAIN}/coupons`,
  VERIFY_COUPON: `${DOMAIN}/coupons`,

  // Event APIs
  GET_ALL_EVENTS: `${DOMAIN}/events`,

  // Order APIs
  CREATE_ORDER: `${DOMAIN}/orders`,
  GET_ALL_ORDERS: `${DOMAIN}/orders`,
  GET_SINGLE_USER_ORDER: (orderId: string) => `${DOMAIN}/orders/${orderId}`,

  // Payment APIs
  CREATE_PAYMENT_INTENT: `${DOMAIN}/payments/create-payment-intent`,
  GET_STRIPE_SECRET_KEY: `${DOMAIN}/payments/stripe-secret-key`,

  // Product APIs
  ADD_PRODUCT: `${DOMAIN}/products`,
  GET_FILTERED_PRODUCTS: (queryString: string) => `${DOMAIN}/products?${queryString}`,
  GET_SINGLE_PRODUCT: (productId: string) => `${DOMAIN}/products/${productId}`,
  GET_BEST_DEALS: `${DOMAIN}/products/best-deals`,
  GET_FEATURED_PRODUCTS: `${DOMAIN}/products/featured`,

  // Cart API's
  ADD_TO_CART: `${DOMAIN}/cart`,
  REMOVE_FROM_CART: (productId: string) => `${DOMAIN}/cart/${productId}`,
  UPDATE_CART: `${DOMAIN}/cart/update-quantity`,
  GET_CART: `${DOMAIN}/cart`,

  // Wishlist API's
  ADD_TO_WISHLIST: `${DOMAIN}/wishlist`,
  GET_WISHLIST: `${DOMAIN}/wishlist`,
  REMOVE_FROM_WISHLIST: (productId: string) => `${DOMAIN}/wishlist/${productId}`,
};

export const maxQuantityItem = 4;
export const minQuantityItem = 1;

export const PRODUCT_PER_PAGE = 10;
