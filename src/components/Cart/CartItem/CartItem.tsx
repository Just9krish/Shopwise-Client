import { useEffect, useState } from "react";
import style from "../../../styles/style";
import { HiPlus, HiMinus } from "react-icons/hi";
import { toast } from "react-toastify";
import { formattedPrice } from "../../../helper/formatPrice";
import { RxCross1 } from "react-icons/rx";
import { host } from "../../../server";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Link } from "react-router-dom";
import { getCartItemPrice } from "../../../helper/getCartItemPrice";
import { ICartItem } from "../../../redux/features/Cart/interface";
import {
  removeFromCartAsync,
  selectCartLoading,
  updateQuantityAsync,
} from "../../../redux/features/Cart/cartSlice";
import getImageSource from "../../../helper/getImageSource";

interface IProps {
  item: ICartItem;
}

export default function CartItem({ item }: IProps) {
  const { product, quantity } = item;
  const { name, _id, images } = product;
  const dispatch = useAppDispatch();
  const isCartLoading = useAppSelector(selectCartLoading);

  function increaseQuantity() {
    if (item.quantity < 4) {
      dispatch(
        updateQuantityAsync({ productId: _id, quantity: item.quantity + 1 })
      ).catch((error) => {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity.");
      });
    } else {
      toast.info("You cannot add more than 4 quantities.");
    }
  }

  function decreaseQuantity() {
    if (item.quantity > 1) {
      dispatch(
        updateQuantityAsync({ productId: _id, quantity: item.quantity - 1 })
      ).catch((error) => {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity.");
      });
    } else {
      toast.info("Quantity cannot be less than 1");
    }
  }

  function handleRemoveItem(itemId: string) {
    dispatch(removeFromCartAsync(itemId));
  }

  return (
    <div className={`${style.flex_normal} w-full border-b p-4 justify-between`}>
      <div className={`${style.flex_normal} flex-col`}>
        <button
          type="button"
          disabled={isCartLoading}
          className={`border-none bg-none bg-orange-500 rounded-full h-6 w-6 ${
            style.flex_normal
          } justify-center text-white ${isCartLoading ? "opacity-75" : ""}`}
          onClick={increaseQuantity}
        >
          <HiPlus title="Increment" />
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          disabled={isCartLoading}
          className={`border-none bg-none bg-slate-300 rounded-full h-6 w-6 ${
            style.flex_normal
          } justify-center text-white ${isCartLoading ? "opacity-75" : ""}`}
          onClick={decreaseQuantity}
        >
          <HiMinus title="Decrement" color="#7d879c" />
        </button>
      </div>
      <div className={`${style.flex_normal} gap-4 flex-grow p-1`}>
        <Link
          className="block font-bold text-sm capitalize hover:text-blue-500 transition-all"
          to={`/products/${_id}`}
        >
          <img
            src={getImageSource(images[0].url)}
            className="w-16 rounded-md h-16 ml-2"
            loading="lazy"
          />
        </Link>
        <div>
          <Link
            className="block font-bold capitalize hover:text-blue-500 transition-all"
            to={`/products/${_id}`}
          >
            <h4 className="text-xs font-extralight">{name}</h4>
          </Link>
          <h4 className="text-xs text-gray-500">
            {formattedPrice(getCartItemPrice(item.product))} × {quantity}
          </h4>
          <h4 className="font-medium text-sm">
            {formattedPrice(getCartItemPrice(item.product) * quantity)}
          </h4>
        </div>
      </div>
      <button onClick={() => handleRemoveItem(item.product._id)}>
        <RxCross1 className="cursor-pointer" size={20} />
      </button>
    </div>
  );
}
