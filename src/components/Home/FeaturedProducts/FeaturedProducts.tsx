import style from '../../../styles/style';
import loadable from '@loadable/component';
const Product = loadable(() => import('../../Product/Product'));
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getFeaturedProductsAsync,
  selectFeaturedProducts,
} from '../../../redux/features/Products/productSlice';
import { useEffect } from 'react';

export default function FeaturedProducts() {
  const featuredProducts = useAppSelector(selectFeaturedProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeaturedProductsAsync());
  }, [dispatch]);

  return (
    <section>
      <div className={`${style.section}`}>
        <h1 className={`${style.heading}`}>Featured Products</h1>
        {featuredProducts && featuredProducts.length == 0 ? (
          <div>
            <h4>There is no featured products right now to show.</h4>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-8">
            {featuredProducts?.map((product, idx) => <Product key={idx} product={product} />)}
          </div>
        )}
      </div>
    </section>
  );
}
