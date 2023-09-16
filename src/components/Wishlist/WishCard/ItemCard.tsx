import { BsCartPlus } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from '../../../styles/style';
import { formattedPrice } from '../../../helper/formatPrice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IProduct } from '../../../redux/features/Products/interface';
import { addToCartAsync, selectCart, toggleCart } from '../../../redux/features/Cart/cartSlice';
import { removeToWishlistAsync } from '../../../redux/features/Wishlist/wishlistSlice';
import getImageSource from '../../../helper/getImageSource';

interface IProps {
  item: IProduct;
  toggleWishlist: () => void;
}

function ItemCard({ item, toggleWishlist }: IProps) {
  const { name, price, images, discount_price, discount_percentage, _id: productId } = item;
  const [isInCart, setIsInCart] = useState(false);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  function handleToggleCart() {
    toggleWishlist();
    dispatch(toggleCart());
  }

  useEffect(() => {
    if (cart && item && cart.find((i) => i.product?._id === item?._id)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cart, item]);

  return (
    <div className={`${style.flex_normal} w-full border-b p-4 justify-between gap-4`}>
      <button type="button" onClick={() => dispatch(removeToWishlistAsync(productId))}>
        <RxCross1 className="cursor-pointer" size={10} />
      </button>
      <Link to={`/products/${productId}`}>
        <img
          src={getImageSource(images[0].url)}
          className="w-12 rounded-md h-12"
          loading="lazy"
          alt={images[0].name}
        />
      </Link>
      <div className="flex-grow">
        <Link to={`/products/${productId}`}>
          <h4 className="text-xs font-medium text-[#333333] hover:text-blue-400 transition-all">
            {name}
          </h4>
        </Link>
        <h4 className="text-xs text-[#777777,] line-through">{formattedPrice(price)}</h4>
        <div className="flex gap-3 items-center">
          <p className="text-[#2D3436] font-thin">{discount_percentage}% off</p>
          <h4 className="text-[#00B894] font-bold">{formattedPrice(discount_price)}</h4>
        </div>
      </div>
      {!isInCart ? (
        <button type="button" onClick={() => dispatch(addToCartAsync({ productId, quantity: 1 }))}>
          <BsCartPlus size={20} className="cursor-pointer" color="#ff7d1a" title="Add to Cart" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleToggleCart}
          className="text-xs bg-[#ff7d1a] text-white px-2 py-2 rounded">
          Cart
        </button>
      )}
    </div>
  );
}

export default ItemCard;
