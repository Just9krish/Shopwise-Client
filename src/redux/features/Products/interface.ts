import { IShop } from "../Shop/interface";

export interface IProduct {
  _id: string;
  category?: string;
  name: string;
  description: string;
  price: number;
  discount_percentage: number;
  discount_price: number;
  tags?: string;
  images: {
    id: number;
    url: string;
    name: string;
    type: string;
    size: number;
  }[];
  shop: IShop;
  reviews?: { user: {}; comment: string; rating: number }[];
  rating: number;
  sold_out: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export interface IAddProduct {
  name: string;
  description: string;
  category: string;
  tags?: string;
  price: number;
  discount_percentage?: number;
  discount_price?: number;
  stock: number;
  images: File[];
}

export interface IDeleteProduct {
  productId: string;
  shopId: string;
}

export interface IProductState {
  isProductLoading: boolean;
  shopProducts: IProduct[];
  allProducts: IProduct[];
  productError: null | string;
  productMessage: string;
  totalProducts: number;
  selectedProduct: IProduct | null;
}

export interface FilterQuery {
  filter?: any;
  sort?: any;
  pagination?: any;
}
