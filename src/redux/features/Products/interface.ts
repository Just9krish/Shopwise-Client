import { IShop } from '../Shop/interface';

export interface IProduct {
  _id: string;
  category?: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  discountPrice: number;
  tags?: string;
  images: {
    id: number;
    url: string;
    name: string;
    type: string;
    size: number;
  }[];
  shop: IShop;
  reviews?: { user: any; comment: string; rating: number }[];
  rating: number;
  soldOut: number;
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
  discountPercentage?: number;
  discountPrice?: number;
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
  featuredProducts: IProduct[];
  bestDealsProducts: IProduct[];
}

export interface FilterQuery {
  filter?: any;
  sort?: any;
  pagination?: any;
}

export interface Category {
  id: number;
  title: string;
  value: string;
  checked: boolean;
  image_Url?: string;
}

export interface Section {
  id: string;
  name: string;
  options: Category[];
}

export interface Filter {
  [key: string]: string[] | undefined;
}

export interface IFilter {
  id: string;
  name: string;
  options: Category[];
}
