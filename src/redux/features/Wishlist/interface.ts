import { IProduct } from '../Products/interface';

export interface IWishlistState {
  wishlist: IProduct[];
  isWishlistLoading: boolean;
}

export interface IWishlistResponse {
  data: {
    products: IProduct[];
    user: string;
    _id: string;
  };
}
