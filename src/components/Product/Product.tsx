import loadable from "@loadable/component";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formattedPrice } from "../../helper/formatPrice";
import style from "../../styles/style";
const Stars = loadable(() => import("./Stars/Stars"));
import { IProduct } from "../../Interface";
import { host } from "../../server";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import AddtoCart from "../ProductDetails/AddtoCart/AddtoCart";
import {
  addToWishlistAsync,
  removeToWishlistAsync,
  selectWishlist,
  selectWishlistLoading,
} from "../../redux/features/Wishlist/wishlistSlice";
export interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const { name, category, description, price, discount_price, images, _id } =
    product;
  const wishlists = useAppSelector(selectWishlist);
  const isWishlistLoading = useAppSelector(selectWishlistLoading);
  const [isWish, setIsWish] = useState(false);
  const dispatch = useAppDispatch();

  // const productSlug = product.name.replace(/\s+/g, "-");

  useEffect(() => {
    if (wishlists?.find((i: IProduct) => i._id === product._id)) {
      setIsWish(true);
    } else {
      setIsWish(false);
    }
  }, [wishlists]);

  return (
    <>
      <div className="border p-4 bg-white relative overflow-visible shadow-lg rounded-md">
        <Link
          className="block font-bold text-sm capitalize hover:text-blue-500 transition-all"
          to={`/products/${_id}`}
        >
          <div className="h-40 overflow-hidden rounded-lg">
            <img
              src={`${host}/${images[0]?.url}`}
              loading="lazy"
              className="object-cover h-full w-full hover:scale-110 transition-all duration-300"
            />
          </div>
        </Link>
        <div className="pt-[10%] pb-3 space-y-1">
          <Link
            className="block font-bold text-sm capitalize hover:text-blue-500 transition-all"
            to={`/products/${_id}`}
          >
            {name.length > 55 ? name.slice(0, 55) + "..." : name}
          </Link>
          <span className="capitalize inline-block bg-red-300 text-white text-xs px-1.5 rounded-xl">
            {category}
          </span>
          <Stars stars={5} />
        </div>
        <div className="space-y-3 border-t border-[#ddd] pt-3">
          <div className={`${style.flex_normal} justify-between`}>
            <div className="">
              <span className="text-green-600 font-bold text-base block">
                {formattedPrice(discount_price)}
              </span>
              <span className="text-xs text-gray-400 line-through block">
                {formattedPrice(price)}
              </span>
            </div>
            {isWish ? (
              <button
                disabled={isWishlistLoading}
                type="button"
                onClick={() => dispatch(removeToWishlistAsync(product._id))}
              >
                <AiFillHeart
                  title="Remove from wish list"
                  color="red"
                  size={25}
                />
              </button>
            ) : (
              <button
                disabled={isWishlistLoading}
                type="button"
                onClick={() => dispatch(addToWishlistAsync(product._id))}
              >
                <AiOutlineHeart
                  title="Add to wish list"
                  color="red"
                  size={25}
                />
              </button>
            )}
          </div>
          {/* <p className="text-xs">{description.slice(0, 110)}...</p> */}
          <AddtoCart product={product} variant="card" />
        </div>
      </div>
    </>
  );
}
