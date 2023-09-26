import loadable from '@loadable/component';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { IProduct } from '../../../redux/features/Products/interface';
import style from '../../../styles/style';
import { selectProducts } from '../../../redux/features/Products/productSlice';

const Product = loadable(() => import('../../Product/Product'));

interface IProps {
  product: IProduct;
}

export default function RelatedProducts({ product }: IProps) {
  const { category } = product;

  const allProducts = useAppSelector(selectProducts);

  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const filteredProducts = allProducts?.filter((pro) => pro.category === category);
    setRelatedProducts(filteredProducts);
  }, [category, allProducts]);

  if (relatedProducts.length !== 0) {
    return (
      <div className="p-4">
        <h1 className={`${style.heading} border-b`}>Related Products</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-8">
          {relatedProducts?.map((pro) => <Product product={pro} key={pro._id} />)}
        </div>
      </div>
    );
  }
  return null;
}
