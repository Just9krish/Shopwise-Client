import { IProduct } from "../Products/interface";

export interface ICartItem {
  _id: string;
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  cartPrice: number;
  cart: ICartItem[];
  isCartOpen: boolean;
  cartMessage: string;
  isCartLoading: boolean;
}

export interface IAddToCart {
  productId: string;
  quantity: number;
}
