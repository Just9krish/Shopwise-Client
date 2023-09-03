import { IProduct } from "../Products/interface";
import { IAddressFrom } from "../User/interface";

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

export interface IShippingAddress extends IAddressFrom {
  primaryNumber: number;
  alternateNumber: number;
  fullname: string;
}

export interface IPaymentInfo {
  id: string;
  status: string;
  paymentMethod: string;
}

export interface IOrder {
  shippingAddress: IShippingAddress;
  paymentInfo: IPaymentInfo;
  _id: string;
  cart: {
    product: string;
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
  userOrders: IOrder[];
  orderError: string | null;
  orderMessage: string;
}

export interface IUpdateOrderStatus {
  orderId: string;
  shopId: string;
  orderStatus: string;
}
