import loadable from '@loadable/component';
import { useEffect } from 'react';
import style from '../../../styles/style';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getBestDealsProductsAsync,
  selectBestDealsProducts,
} from '../../../redux/features/Products/productSlice';

const Product = loadable(() => import('../../Product/Product'));

export default function BeastDeals() {
  const beastDealsProducts = useAppSelector(selectBestDealsProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBestDealsProductsAsync());
  }, [dispatch]);

  return (
    <section>
      <div className={`${style.section} text-`}>
        <h1 className={`${style.heading}`}>Best Deals on different products:</h1>

        {beastDealsProducts && beastDealsProducts.length === 0 ? (
          <div className="text-[#070707] ">
            <h4>There is no product right now to show.</h4>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-8">
            {beastDealsProducts?.map((product) => <Product key={product._id} product={product} />)}
          </div>
        )}
      </div>
    </section>
  );
}
