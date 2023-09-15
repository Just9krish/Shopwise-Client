import { formattedPrice } from '../../../helper/formatPrice';
import { useAppSelector } from '../../../hooks';
import style from '../../../styles/style';
import { selectCart, selectCartPrice } from '../../../redux/features/Cart/cartSlice';

export default function TotalBill() {
  const cart = useAppSelector(selectCart);
  const cartPrice = useAppSelector(selectCartPrice);

  // to show difference between the mrp price and selling price
  const mrpCartPrice = cart?.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  // verfiy the enterd coupon code with server

  return (
    <div className="w-full bg-white p-8 shadow rounded space-y-2">
      <div
        className={`${style.flex_normal} justify-between  
      `}>
        <p className="text-[#000000a4]">Cart MRP Value:</p>
        <p className="font-semibold text-lg line-through">{formattedPrice(mrpCartPrice)}</p>
      </div>
      <div
        className={`${style.flex_normal} justify-between  
      `}>
        <p className="text-[#000000a4]">Cart Discount Value:</p>
        <p className="font-semibold text-lg">{formattedPrice(cartPrice)}</p>
      </div>

      <div
        className={`${style.flex_normal} justify-between
      `}>
        <p className="text-[#000000a4]">Shipping:</p>
        {/* <p
          className={`text-lg ${
            !shippingCharged ? "line-through font-extralight" : "font-semibold"
          }`}
        >
          {formattedPrice(shippingCharge)}
        </p> */}
      </div>
      <div
        className={`${style.flex_normal} justify-between
      `}>
        {/* <p
          className={`${
            couponDiscount > 0 ? "text-[#5cb85c] font-bold" : "text-[#000000a4]"
          } `}
        >
          Coupon Discount:
        </p> */}
        {/* <p
          className={`${
            couponDiscount > 0
              ? "text-[#5cb85c] font-bold "
              : "text-[#000000a4]"
          } text-lg`}
        >
          {couponDiscount > 0 ? formattedPrice(couponDiscount) : "---"}
        </p> */}
      </div>
      <div
        className={`${style.flex_normal} justify-between  
      `}>
        {/* <p
          className={`font-bold ${
            totalSaving > 0 ? "text-[#5cb85c]" : "text-red-500"
          }`}
        >
          Total Saving:
        </p> */}
        {/* <p
          className={`${
            totalSaving > 0 ? "text-[#5cb85c]" : "text-red-500"
          }  font-bold text-lg`}
        >
          {formattedPrice(totalSaving)}
        </p> */}
      </div>

      <div className="w-full py-2 border-t font-bold">
        <p className="text-lg text-end">{formattedPrice(cartPrice)}</p>
      </div>

      <form>
        <input type="text" className={`${style.input} block w-full px-3 py-1.5`} required />
        {/* {isCouponApplied && (
          <div className="flex px-2 items-center justify-between text-gray-800 bg-green-50 border border-green-500 rounded text-sm mt-2 italic">
            <p>
              coupon code <span className="font-bold ">"{coupon?.name}"</span>
              applied
            </p>
            <RxCross2
              cursor="pointer"
             
            />
          </div>
        )} */}

        <div className="mt-6">
          <button
            type="button"
            className="w-full border border-orange-500 py-1.5 rounded text-orange-500 font-medium transition-all hover:text-white hover:bg-orange-500">
            Apply Coupon Code
          </button>
        </div>
      </form>
    </div>
  );
}
