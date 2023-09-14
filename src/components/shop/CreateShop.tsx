import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import logo from '../../assets/shopwise.png';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createShopAsync, selectShopLoading } from '../../redux/features/Shop/shopSlice';

export default function CreateShop() {
  const isShopLoading = useAppSelector(selectShopLoading);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src={logo} alt="Shopwise" />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register as a new Seller
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          noValidate
          className="space-y-6"
          onSubmit={handleSubmit((data) => {
            const shopData = {
              name: data.fullname,
              email: data.email,
              password: data.password,
              confirmPassword: data.confirmPassword,
              address: data.address,
              phoneNumber: +data.phoneNumber,
              zipcode: +data.zipcode,
            };

            dispatch(createShopAsync(shopData));
          })}
        >
          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
              {...register('fullname', {
                required: 'Full Name is required!',
              })}
            />
            {errors?.fullname && (
              <span className="text-red-500 text-sm">{errors?.fullname.message?.toString()}</span>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
              {...register('email', {
                required: 'Email is required!',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Email is not Valid!',
                },
              })}
            />
            {errors?.email && (
              <span className="text-red-500 text-sm">{errors.email.message?.toString()}</span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
              {...register('phoneNumber', {
                required: 'Phone number is required!',
              })}
            />
            {errors?.phoneNumber && (
              <span className="text-red-500 text-sm">{errors.phoneNumber.message?.toString()}</span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Zip Code
            </label>
            <input
              type="number"
              placeholder="Zip Code"
              className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
              {...register('zipcode', {
                required: 'Zipcode is required!',
              })}
            />
            {errors?.zipcode && (
              <span className="text-red-500 text-sm">{errors.zipcode.message?.toString()}</span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Address
            </label>

            <textarea
              id="address"
              cols={30}
              rows={3}
              className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
              {...register('address', {
                required: 'Address is required!',
              })}
            ></textarea>
            {errors?.address && (
              <span className="text-red-500 text-sm">{errors.address.message?.toString()}</span>
            )}
          </div>

          <div>
            <label className="sr-only" htmlFor="password">
              password
            </label>
            <div className="relative">
              <input
                id="password"
                placeholder="Password"
                type={isPasswordShown ? 'text' : 'password'}
                className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
                {...register('password', {
                  required: 'Password is requried!',
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message:
                      'Password requirements:\n\n' +
                      '- At least 8 characters\n' +
                      '- Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n' +
                      '- Can contain special characters',
                  },
                })}
              />
              <div
                className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-4"
                onClick={() => setIsPasswordShown(!isPasswordShown)}
              >
                {isPasswordShown ? (
                  <AiOutlineEyeInvisible color="orange" size={20} />
                ) : (
                  <AiOutlineEye color="orange" size={20} />
                )}
              </div>
            </div>
            {errors?.password && (
              <span className="text-red-500 text-sm">{errors?.password.message?.toString()}</span>
            )}
          </div>

          <div>
            <label className="sr-only" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                placeholder="Confirm Password"
                type={isConfirmPasswordShown ? 'text' : 'password'}
                className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
                {...register('confirmPassword', {
                  required: 'Confirm password is requied!',
                  validate: (value, formValues) =>
                    value === formValues.password || 'Password is not matching!',
                })}
              />
              <div
                className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-4"
                onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
              >
                {isConfirmPasswordShown ? (
                  <AiOutlineEyeInvisible color="orange" size={20} />
                ) : (
                  <AiOutlineEye color="orange" size={20} />
                )}
              </div>
            </div>
            {errors?.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors?.confirmPassword.message?.toString()}
              </span>
            )}
          </div>

          <button
            disabled={isShopLoading}
            className={`flex w-full justify-center rounded-md bg-[#ff7d1a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${
              isShopLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-orange-500'
            }`}
            type="submit"
          >
            {isShopLoading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isShopLoading ? 'Creating...' : 'Create a Account'}
          </button>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have shop?
            <Link
              to="/login-shop"
              className="font-semibold leading-6 text-[#ff7d1a] hover:text-orange-500 ml-1"
            >
              Login
            </Link>
          </p>
          <p className="text-center text-sm text-gray-500">
            Send me back to
            <Link
              to="/"
              className="font-medium text-[#ff7d1a] transition-all hover:text-orange-500 ml-1 focus:text-orange-500"
            >
              Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
