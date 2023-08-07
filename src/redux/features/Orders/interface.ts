import { IProduct } from "../Products/interface";

export interface IShopOrder {
  //   shippingAddress: IShippingAddress;
  shippingAddress: any;
  //   paymentInfo: IPaymentInfo;
  paymentInfo: any;
  _id: string;
  cart: {
    product: IProduct;
    quantity: number;
    _id: string;
  }[];
  user: string;
  totalPrice: number;
  orderStatus: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IOrderState {
  isOrderLoading: boolean;
  shopOrders: IShopOrder[];
  orderError: string | null;
  orderMessage: string;
}
