import { IProduct } from '../Interface';

export default function getCartItemPrice(item: IProduct) {
  return item.discountPercentage > 0 ? item.discountPrice : item.price;
}
