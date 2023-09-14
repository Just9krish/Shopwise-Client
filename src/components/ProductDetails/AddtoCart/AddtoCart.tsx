import { TiPlus, TiMinus } from 'react-icons/ti';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IProduct } from '../../../Interface';
import style from '../../../styles/style';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toast } from 'react-toastify';
import {
  addToCartAsync,
  removeFromCartAsync,
  selectCart,
  updateQuantityAsync,
} from '../../../redux/features/Cart/cartSlice';
import { maxQuantityItem, minQuantityItem } from '../../../constant';
import { useNavigate } from 'react-router-dom';
import { selectIsUserAuthenticate } from '../../../redux/features/User/userSlice';

interface AddtoCartProps {
  product: IProduct;
  variant: 'card' | 'detail';
}

export default function AddtoCart({ product, variant }: AddtoCartProps) {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const isUserAuthenticated = useAppSelector(selectIsUserAuthenticate);

  const itemInCart = cart?.find((item) => item.product._id === product._id);
  const quantity = itemInCart?.quantity || 1;

  function increment() {
    if (quantity < maxQuantityItem) {
      dispatch(updateQuantityAsync({ productId: product._id, quantity: quantity + 1 }));
    } else {
      toast.info(`Cannot add more than ${maxQuantityItem} quantities.`);
    }
  }

  function decrement() {
    if (quantity > minQuantityItem) {
      dispatch(updateQuantityAsync({ productId: product._id, quantity: quantity - 1 }));
    } else {
      // If quantity becomes less than 1, remove the item from the cart
      dispatch(removeFromCartAsync(product._id)).then(() => {
        toast.info('Item removed from cart');
      });
    }
  }

  function handleAddToCart(productId: string) {
    if (isUserAuthenticated) {
      if (!itemInCart) {
        dispatch(addToCartAsync({ productId, quantity }));
      } else {
        toast.error('Item already in cart');
      }
    } else {
      navigation('/login');
    }
  }

  return (
    <div className="flex flex-col justify-center lg:space-y-4">
      {itemInCart ? (
        <div
          className={`${style.flex_normal} justify-between ${
            variant === 'card' ? 'w-full' : 'w-36 bg-[#f7f8fd]'
          }  py-6 rounded-lg h-6`}
        >
          <button
            type="button"
            className={`p-2 text-orange-500 bg-white  ${
              variant === 'card' ? 'rounded-full border border-gray-400' : ''
            }`}
            onClick={decrement}
          >
            <TiMinus />
          </button>
          <p className="font-semibold">{quantity}</p>
          <button
            type="button"
            className={`p-2 text-orange-500 bg-white ${
              variant === 'card' ? 'rounded-full border border-gray-400' : ''
            }`}
            disabled={quantity >= maxQuantityItem}
            onClick={increment}
          >
            <TiPlus />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={`${style.cart_button} px-3 py-1.5`}
          onClick={() => handleAddToCart(product._id)}
        >
          <AiOutlineShoppingCart title="Add to Cart" />
          <span className="ml-2">Add to cart</span>
        </button>
      )}
    </div>
  );
}
