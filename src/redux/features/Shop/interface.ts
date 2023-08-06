interface IShopData {
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  zipcode: string;
}

interface IShop {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  phoneNumber: number;
  address: string;
  zipcode: number;
  createdAt: string;
}

interface IShopState {
  isShopAuthenticated: boolean;
  isShopLoading: boolean;
  shopError: null | string;
  shop: null | IShop;
  shopMessage: string;
}

interface IShopLoginData {
  email: string;
  password: string;
}
