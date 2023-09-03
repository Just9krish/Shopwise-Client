import style from "../../../../styles/style";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { host } from "../../../../server";
import { IUserState } from "../../../../Interface";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  selectCart,
  toggleCart,
} from "../../../../redux/features/Cart/cartSlice";
import { selectWishlist } from "../../../../redux/features/Wishlist/wishlistSlice";
import getImageSource from "../../../../helper/getImageSource";

interface IProps {
  userState: IUserState;
  toggleWishlist: () => void;
}

export default function UserNavigation({ userState, toggleWishlist }: IProps) {
  const { user, isUserAuthenticated } = userState;
  const cart = useAppSelector(selectCart);
  const wishlists = useAppSelector(selectWishlist);

  const dispatch = useAppDispatch();

  return (
    <>
      {user && (
        <div className={`${style.flex_normal} gap-6`}>
          <button className="relative cursor-pointer" onClick={toggleWishlist}>
            <AiOutlineHeart color="white" size={30} />
            <span className="absolute top-0 right-0 bg-black text-white text-xs p-1.5 rounded-full h-4 w-4 flex justify-center items-center">
              {wishlists.length}
            </span>
          </button>
          <button
            className="relative cursor-pointer"
            onClick={() => dispatch(toggleCart())}
          >
            <AiOutlineShoppingCart color="white" size={30} />
            <span className="absolute top-0 right-0 bg-black text-white text-xs p-1.5 rounded-full h-4 w-4 flex justify-center items-center">
              {cart?.length}
            </span>
          </button>
          <div className="relative cursor-pointer">
            {isUserAuthenticated ? (
              <Link to="/profile">
                <img
                  className="h-7 w-7 rounded-full"
                  src={getImageSource(user?.avatar)}
                  alt={user?.name}
                />
              </Link>
            ) : (
              <Link to="/login">
                <BiUserCircle
                  color="white"
                  size={30}
                  title="Login to account"
                  className="hover:fill-gray-900 transition-all"
                />
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
