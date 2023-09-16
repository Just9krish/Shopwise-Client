import loadable from '@loadable/component';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IProduct } from '../Interface';
import { useAppDispatch, useAppSelector } from '../hooks';
import style from '../styles/style';
import { API_URL } from '../constant';
import { getProductAsync, selectSelectedProduct } from '../redux/features/Products/productSlice';
import getImageSource from '../helper/getImageSource';

const ProductDetails = loadable(() => import('../components/ProductDetails/ProductDetails'));
const Loader = loadable(() => import('../components/Loader/Loader'));
const RelatedProducts = loadable(
  () => import('../components/ProductDetails/RelatedProducts/RelatedProducts')
);

export default function ProductPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectSelectedProduct);

  useEffect(() => {
    if (productId) {
      dispatch(getProductAsync(productId));
    }
  }, [productId, dispatch]);

  return (
    <div>
      {product ? (
        <section>
          <div className={`${style.section}`}>
            <ProductDetails product={product} />
            <ProductDetailsInfo product={product} />
            {product && <RelatedProducts product={product} />}
          </div>
        </section>
      ) : (
        <section className="min-h-screen flex justify-center items-center">
          <Loader />
        </section>
      )}
    </div>
  );
}

function ProductDetailsInfo({ product }: { product: IProduct }) {
  const [activeTab, setActiveTab] = useState('productDetails');
  const [shopProducts, setShopProducts] = useState(0);
  const { description, shop } = product;

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    axios
      .get(API_URL.GET_SHOP_PRODUCTS(shop?._id))
      .then((res) => setShopProducts(res.data.products.length));
  }, [shop?._id]);

  return (
    <div className="bg-white lg:px-10 rounded my-16 px-3 py-6">
      <div className="w-full flex justify-between border-b py-4">
        <div
          role="button"
          className={`text-base font-medium lg:font-semibold cursor-pointer lg:text-xl relative py-1.5 after:bg-red-400 after:absolute after:left-0 after:bottom-0 after:h-1 ${
            activeTab === 'productDetails' ? 'after:w-full' : 'after:w-0'
          }`}
          onClick={() => handleTabClick('productDetails')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTabClick('productDetails');
            }
          }}
          tabIndex={0}>
          Products Details
        </div>
        <div
          role="button"
          className={`text-base font-medium lg:font-semibold cursor-pointer lg:text-xl relative py-1.5 after:bg-red-400 after:absolute after:left-0 after:bottom-0 after:h-1 ${
            activeTab === 'reviews' ? 'after:w-full' : 'after:w-0'
          }`}
          onClick={() => handleTabClick('reviews')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTabClick('reviews');
            }
          }}
          tabIndex={0}>
          Products Reviews
        </div>
        <div
          role="button"
          className={`text-base font-medium lg:font-semibold cursor-pointer lg:text-xl relative py-1.5 after:bg-red-400 after:absolute after:left-0 after:bottom-0 after:h-1 ${
            activeTab === 'shop' ? 'after:w-full' : 'after:w-0'
          }`}
          onClick={() => handleTabClick('shop')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTabClick('shop');
            }
          }}
          tabIndex={0}>
          Shop Information
        </div>
      </div>

      {activeTab === 'productDetails' && (
        <div className="space-y-6 lg:space-y-10 px-4 lg:px-8 py-5">
          <p className="text-base lg:text-lg whitespace-pre-line">{description.slice(0, 500)}</p>
          <p className="text-base lg:text-lg whitespace-pre-line">{description.slice(501, 1000)}</p>
          <p className="text-base lg:text-lg whitespace-pre-line">
            {description.slice(1001, 1500)}
          </p>
        </div>
      )}
      {activeTab === 'reviews' && (
        <div className="flex justify-center items-center h-[40vh]">
          <p>No review yet</p>
        </div>
      )}
      {activeTab === 'shop' && (
        <div className="w-full p-5 lg:flex">
          <div className="w-full lg:w-1/2 space-y-3">
            <div className={`${style.flex_normal} gap-3`}>
              <img
                className="h-12 w-12 rounded-full"
                src={getImageSource(shop?.avatar)}
                loading="lazy"
                alt="Shop Profile"
              />
              <div>
                <h4 className={`${style.shop_name} text-xl`}>{shop.name}</h4>
                {/* <h4>{shop.ratings} Ratings</h4> */}
              </div>
            </div>
            <p>{shop.address}</p>
          </div>
          <div className="w-full lg:w-1/2 lg:flex flex-col items-end">
            <div className="text-left space-y-2">
              <h4 className="font-medium">
                Joined on :<span>{new Date(shop.createdAt).toLocaleDateString()}</span>
              </h4>
              <h4 className="font-medium">
                Total Products : <span>{shopProducts}</span>
              </h4>
              <h4 className="font-medium">
                Total Reviews : <span>23</span>
              </h4>
              <Link className="inline-block" to="/shop">
                <button type="button" className={` ${style.button} text-white `}>
                  Visit Shop
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
