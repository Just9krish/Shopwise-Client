import { useEffect, useState } from 'react';
import { BsFillBagFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getSingleUserOrderAsync,
  selectSelectedOrder,
} from '../../../redux/features/Orders/orderSlice';
import formatPrice from '../../../helper/formatPrice';
import formateDate from '../../../helper/formatDate';
import getImageSource from '../../../helper/getImageSource';
import styles from '../../../styles/style';

export default function UserOrderDetails() {
  const [open, setOpen] = useState(false);
  const { orderId } = useParams();
  const dispatch = useAppDispatch();

  const order = useAppSelector(selectSelectedOrder);

  useEffect(() => {
    if (orderId) {
      dispatch(getSingleUserOrderAsync(orderId));
    }
  }, [dispatch, orderId]);

  return (
    <div>
      {order ? (
        <div className={`py-4 min-h-screen ${styles.section}`}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <BsFillBagFill size={30} color="crimson" />
              <h1 className="pl-2 text-[25px]">Order Details</h1>
            </div>
          </div>

          <div className="w-full flex items-center justify-between pt-6">
            <h5 className="text-[#00000084]">
              Order ID: <span>{order?._id}</span>
            </h5>
            <h5 className="text-[#00000084]">
              Placed on: <span>{formateDate(order?.createdAt)}</span>
            </h5>
          </div>

          {/* order items */}
          <br />
          <br />
          {order &&
            order?.cart.map((item) => {
              return (
                <div key={item._id} className="w-full flex items-start mb-5">
                  <img
                    src={getImageSource(item.product.images[0].url)}
                    alt=""
                    className="w-[80x] h-[80px]"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px]">{item.product.name}</h5>
                    <h5 className="pl-3 text-[20px] text-[#00000091]">
                      {formatPrice(item.product.discount_price)} x {item.quantity}
                    </h5>
                  </div>
                  {/* {!item.isReviewed && data?.status === "Delivered" ? (
            <div
              className={`${styles.button} text-[#fff]`}
              onClick={() => setOpen(true) || setSelectedItem(item)}
            >
              Write a review
            </div>
          ) : null} */}
                </div>
              );
            })}

          {/* review popup */}
          {open && (
            <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
              <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
                <div className="w-full flex justify-end p-3">
                  <RxCross1 size={30} onClick={() => setOpen(false)} className="cursor-pointer" />
                </div>
                <h2 className="text-[30px] font-[500] font-Poppins text-center">Give a Review</h2>
                <br />
                <div className="w-full flex">
                  {/* <img
            src={`${backend_url}/${selectedItem?.images[0]}`}
            alt=""
            className="w-[80px] h-[80px]"
          /> */}
                  <div>
                    {/* <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
            <h4 className="pl-3 text-[20px]">
              US${selectedItem?.discountPrice} x {selectedItem?.qty}
            </h4> */}
                  </div>
                </div>

                <br />
                <br />

                {/* ratings */}
                <h5 className="pl-3 text-[20px] font-[500]">
                  Give a Rating <span className="text-red-500">*</span>
                </h5>
                {/* <div className="flex w-full ml-2 pt-1">
          {[1, 2, 3, 4, 5].map((i) =>
            rating >= i ? (
              <AiFillStar
                key={i}
                className="mr-1 cursor-pointer"
                color="rgb(246,186,0)"
                size={25}
                onClick={() => setRating(i)}
              />
            ) : (
              <AiOutlineStar
                key={i}
                className="mr-1 cursor-pointer"
                color="rgb(246,186,0)"
                size={25}
                onClick={() => setRating(i)}
              />
            )
          )}
        </div> */}
                <br />
                <div className="w-full ml-3">
                  <p className="block text-[20px] font-[500]">
                    Write a comment
                    <span className="ml-1 font-[400] text-[16px] text-[#00000052]">(optional)</span>
                  </p>
                  <textarea
                    name="comment"
                    // value={comment}
                    // onChange={(e) => setComment(e.target.value)}
                    placeholder="How was your product? write your expresion about it!"
                    className="mt-2 w-[95%] border p-2 outline-none"
                  />
                </div>
                <div
                  className={`${styles.button} text-white text-[20px] ml-3`}
                  //   onClick={rating > 1 ? reviewHandler : null}
                >
                  Submit
                </div>
              </div>
            </div>
          )}

          <div className="border-t w-full text-right">
            <h5 className="pt-3 text-[18px]">
              Total Price: <strong>{formatPrice(order?.totalPrice)}</strong>
            </h5>
          </div>
          <br />
          <br />
          <div className="w-full 800px:flex items-center">
            <div className="w-full 800px:w-[60%]">
              <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
              <h4 className="pt-3 text-[20px]">
                {`${order?.shippingAddress.address1} ${order?.shippingAddress.address2}`}
              </h4>
              <h4 className=" text-[20px]">{order?.shippingAddress.country}</h4>
              <h4 className=" text-[20px]">{order?.shippingAddress.state}</h4>
              <h4 className=" text-[20px]">{order.shippingAddress.primaryNumber}</h4>
            </div>
            <div className="w-full 800px:w-[40%]">
              <h4 className="pt-3 text-[20px]">Payment Info:</h4>
              <h4>
                Status: {order?.paymentInfo?.status ? order?.paymentInfo?.status : 'Not Paid'}
              </h4>
              <br />
              {order?.orderStatus === 'Delivered' && (
                <div className={`${styles.button} text-white`}>Give a Refund</div>
              )}
            </div>
          </div>
          <br />
          <Link to="/">
            <div className={`${styles.button} text-white`}>Send Message</div>
          </Link>
          <br />
          <br />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
