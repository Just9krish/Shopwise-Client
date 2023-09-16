import loadable from '@loadable/component';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectShop } from '../../../redux/features/Shop/shopSlice';
import {
  getShopProductsAsync,
  selectShopProducts,
} from '../../../redux/features/Products/productSlice';

const Product = loadable(() => import('../../Product/Product'));

export default function ShopProducts() {
  const shop = useAppSelector(selectShop);
  const dispatch = useAppDispatch();
  const shopProducts = useAppSelector(selectShopProducts);

  useEffect(() => {
    if (shop) dispatch(getShopProductsAsync(shop._id));
  }, [shop, dispatch]);

  return shopProducts.length > 0 ? (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-y-10 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 xl:gap-y-10">
      {shopProducts?.map((product) => <Product product={product} key={product._id} />)}
    </div>
  ) : (
    <div className="h-full w-full">
      <p className="text-center text-gray-900">No products available.</p>
    </div>
  );
}
