export const DOMAIN = "http://localhost:3000/api/v2";

export const IMAGE_URL = "http://localhost:3000";

export const API_URL = {
  // User APIs
  REGISTER_USER: DOMAIN + "/users/signup",
  ACTIVATE_USER: DOMAIN + "/users/activation",
  LOGIN_USER: DOMAIN + "/users/login",
  GET_USER_INFO: DOMAIN + "/users/getuser",
  UPDATE_USER: DOMAIN + "/users/profile",
  UPDATE_USER_PROFILE: DOMAIN + "/users/avatar",
  ADD_USER_ADDRESS: DOMAIN + "/users/address",
  DELETE_USER_ADDRESS: DOMAIN + "/users/address/:addressId",
  USER_PASSWORD_CHANGE: DOMAIN + "/users/password-change",
  GET_ALL_USER_ORDERS: DOMAIN + "/users/:userId/orders",
  LOGOUT_USER: DOMAIN + "/logout",

  // Shop APIs
  CREATE_SHOP: DOMAIN + "/shops/create-shop",
  ACTIVATE_SHOP: DOMAIN + "/shops/activation",
  LOGIN_SHOP: DOMAIN + "/shops/login-shop",
  LOGOUT_SHOP: DOMAIN + "/shops/logout",
  GET_SHOP_INFO: DOMAIN + "/shops/get-shop",
  CREATE_SHOP_EVENT: DOMAIN + "/shops/events",
  GET_SHOP_EVENTS: DOMAIN + "/shops/:shopId/events",
  DELETE_SHOP_EVENT: DOMAIN + "/shops/:shopId/events/:eventId",
  GET_SHOP_PRODUCTS: DOMAIN + "/shops/:shopId/products",
  DELETE_SHOP_PRODUCT: DOMAIN + "/shops/:shopId/products/:productId",
  CREATE_SHOP_COUPON: DOMAIN + "/shops/:shopId/coupons",
  GET_SHOP_COUPONS: DOMAIN + "/shops/:shopId/coupons",
  DELETE_SHOP_COUPON: DOMAIN + "/shops/:shopId/coupons/:couponId",
  GET_SHOP_ORDERS: DOMAIN + "/shops/:shopId/orders",
  UPDATE_SHOP_ORDERS: DOMAIN + "/shops/:shopId/orders/:orderId",

  // Coupon APIs
  GET_ALL_COUPONS: DOMAIN + "/coupons",
  VERIFY_COUPON: DOMAIN + "/coupons",

  // Event APIs
  GET_ALL_EVENTS: DOMAIN + "/events",

  // Order APIs
  CREATE_ORDER: DOMAIN + "/orders",
  GET_ALL_ORDERS: DOMAIN + "/orders",

  // Payment APIs
  CREATE_PAYMENT_INTENT: DOMAIN + "/payments/create-payment-intent",
  GET_STRIPE_SECRET_KEY: DOMAIN + "/payments/stripe-secret-key",

  // Product APIs
  ADD_PRODUCT: DOMAIN + "/products",
  GET_ALL_PRODUCTS: DOMAIN + "/products",
};
