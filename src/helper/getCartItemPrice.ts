import { IProduct } from '../Interface';

export function getCartItemPrice(item: IProduct) {
  return item.discount_percentage > 0 ? item.discount_price : item.price;
}
