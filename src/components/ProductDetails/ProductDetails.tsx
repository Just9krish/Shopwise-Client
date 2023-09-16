import loadable from '@loadable/component';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../../styles/style';
import { IProduct } from '../../Interface';
import formatPrice from '../../helper/formatPrice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addToWishlistAsync,
  removeToWishlistAsync,
  selectWishlist,
  selectWishlistLoading,
} from '../../redux/features/Wishlist/wishlistSlice';
import { selectIsUserAuthenticate } from '../../redux/features/User/userSlice';
import getImageSource from '../../helper/getImageSource';

const AddtoCart = loadable(() => import('./AddtoCart/AddtoCart'));
const Carousel = loadable(() => import('./Carousel/Carousel'));
const Slider = loadable(() => import('./Slider/Slider'));

export default function ProductDetails({ product }: { product: IProduct }) {
  const { images, name, discount_price, price, description, shop, discount_percentage } = product;
  const [isWish, setIsWish] = useState(false);
  const wishlists = useAppSelector(selectWishlist);
  const isWishlistLoading = useAppSelector(selectWishlistLoading);
  const isUserAuthenticated = useAppSelector(selectIsUserAuthenticate);

  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  function addToWishlistHandler(productId: string) {
    if (isUserAuthenticated) {
      dispatch(addToWishlistAsync(productId));
    } else {
      navigation('/login');
    }
  }

  function removeFromWishlistHandler(productId: string) {
    dispatch(removeToWishlistAsync(productId));
  }

  useEffect(() => {
    if (wishlists?.find((i: IProduct) => i._id === product._id)) {
      setIsWish(true);
    } else {
      setIsWish(false);
    }
  }, [wishlists, product]);

  return (
    <div className="w-full py-5 mt-8">
      <div className="block w-full lg:flex">
        <div className="w-full lg:w-1/2">
          <Carousel images={images} />
          <Slider images={images} />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="space-y-10 px-3 py-9 lg:p-10">
            <h1 className={`${style.productTitle}`}>{name}</h1>
            <p className="text-sm lg:text-base">{description.slice(0, 599)}.....</p>
            <div>
              <h4 className="text-green-700 font-semibold text-lg">Deal of a Day</h4>
              <div className={`${style.flex_normal}`}>
                <span className="text-2xl text-[#CC0C39] mr-3">-{discount_percentage}%</span>
                <span className={`${style.productDiscountPrice} text-[28px]`}>
                  {formatPrice(discount_price)}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-[#565959]">M.R.P.:</span>
                <span className={`${style.price}`}>{formatPrice(price)}</span>
              </div>
            </div>
            <div className={`${style.flex_normal} justify-between`}>
              <AddtoCart product={product} variant="detail" />
              {isWish ? (
                <button
                  type="button"
                  disabled={isWishlistLoading}
                  onClick={() => removeFromWishlistHandler(product._id)}>
                  <AiFillHeart title="Remove from wish list" color="red" size={30} />
                </button>
              ) : (
                <button
                  disabled={isWishlistLoading}
                  type="button"
                  onClick={() => addToWishlistHandler(product._id)}>
                  <AiOutlineHeart title="Add to wish list" color="red" size={30} />
                </button>
              )}
            </div>
            <div className={`${style.flex_normal} flex-col md:flex-row gap-8`}>
              <div className={`${style.flex_normal} gap-3`}>
                <img
                  className="h-12 w-12 rounded-full"
                  src={getImageSource(shop.avatar)}
                  loading="lazy"
                  alt="Shop Profile"
                />
                <div>
                  <h4 className={`${style.shop_name}`}>{shop.name}</h4>
                  {/* <h4>{shop.ratings} Ratings</h4> */}
                </div>
              </div>
              <button
                type="button"
                className={`${style.button} text-white bg-blue-500 hover:bg-blue-600 transition-all focus:bg-blue-600`}>
                Send Message
                <AiOutlineMessage title="Send Message" className="ml-1.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
