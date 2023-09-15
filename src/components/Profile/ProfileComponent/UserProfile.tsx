import { AiOutlineCamera } from 'react-icons/ai';
import { ChangeEvent, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import style from '../../../styles/style';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { API_URL } from '../../../constant';
import {
  fetchUserDetailsAsync,
  selectUser,
  updateUserInfoAsync,
} from '../../../redux/features/User/userSlice';
import getImageSource from '../../../helper/getImageSource';
import { toast } from 'react-toastify';

export default function UserProfile() {
  const user = useAppSelector(selectUser);
  const [isDisabled, setIsDisabled] = useState(true);
  const [profilePic, setProfilePic] = useState<null | File>(null);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();

  function handleUpdate() {
    setIsDisabled((prev) => !prev);
    window.scrollTo(0, 176);
    toast.info('Now you can make change.');
  }

  async function handleProfilePictureChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setProfilePic(file);

      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      try {
        await axios.put(API_URL.UPDATE_USER_PROFILE, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });

        dispatch(fetchUserDetailsAsync());
      } catch (e: AxiosError | any) {
        if (e.response) {
          toast.error(e.response.data.message);
        } else {
          toast.error(e.message);
        }
      }
    }
  }

  function handleCancel() {
    setIsDisabled((prev) => !prev);
    clearErrors();
    toast.info('No changes made.');
  }

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('primaryPhoneNumber', user.primaryPhoneNumber);
      setValue('secondaryPhoneNumber', user.secondaryPhoneNumber);
    }
  }, [user]);

  return (
    <>
      {user && (
        <div className={`${style.flex_normal} flex-col w-full space-y-10`}>
          <div className="relative w-fit">
            <img
              className="h-36 w-36 rounded-full object-cover"
              src={getImageSource(user?.avatar)}
              alt="User Avatar"
            />
            <button className="w-8 h-8 rounded-full flex justify-center items-center absolute bottom-1 right-1 cursor-pointer bg-gray-200">
              <label htmlFor="avatar">
                <AiOutlineCamera cursor="pointer" />
              </label>
            </button>
            <input
              type="file"
              accept="image/*"
              name="avatar"
              id="avatar"
              onChange={(e) => handleProfilePictureChange(e)}
              className="hidden"
            />
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                const updateData = {
                  password: data.password,
                  name: data.name,
                  primaryPhoneNumber: parseInt(data.primaryPhoneNumber),
                  secondaryPhoneNumber: parseInt(data.secondaryPhoneNumber),
                  email: data.email,
                };

                dispatch(updateUserInfoAsync(updateData));
              })}
              className="space-y-7 md:space-y-9">
              <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-8">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2" htmlFor="name">
                    Full Name :
                  </label>
                  <input
                    className={`${style.input} w-full`}
                    type="text"
                    id="name"
                    disabled={isDisabled}
                    {...register('name', {
                      required: 'Full name is required!',
                    })}
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message?.toString()}</p>}
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block mb-2" htmlFor="email">
                    Email :
                  </label>
                  <input
                    className={`${style.input} w-full`}
                    type="email"
                    id="email"
                    disabled={isDisabled}
                    {...register('email', {
                      required: 'Email is required!',
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: 'Email not valid!',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message?.toString()}</p>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-8">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2" htmlFor="phone">
                    Phone number (Primary) :
                  </label>
                  <input
                    className={`${style.input} w-full`}
                    type="number"
                    id="phone"
                    disabled={isDisabled}
                    {...register('primaryPhoneNumber', {
                      required: 'Primary phone number is required!',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Only numbers are allowed!',
                      },
                      maxLength: {
                        value: 10,
                        message: 'Maximum length is 10!',
                      },
                      minLength: {
                        value: 10,
                        message: 'Minimum length is 10!',
                      },
                    })}
                  />
                  {errors.primaryPhoneNumber && (
                    <p className="text-red-500">{errors.primaryPhoneNumber.message?.toString()}</p>
                  )}
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block mb-2" htmlFor="alternateNumber">
                    Alternate Number (Secondary) :
                  </label>
                  <input
                    className={`${style.input} w-full`}
                    type="number"
                    id="alternateNumber"
                    disabled={isDisabled}
                    {...register('secondaryPhoneNumber', {
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Only numbers are allowed!',
                      },
                      maxLength: {
                        value: 10,
                        message: 'Maximum length is 10!',
                      },
                      minLength: {
                        value: 10,
                        message: 'Minimum length is 10!',
                      },
                    })}
                  />
                  {errors.secondaryPhoneNumber && (
                    <p className="text-red-500">
                      {errors.secondaryPhoneNumber.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
              <hr />
              <div className="w-full">
                <label className="block mb-2" htmlFor="password">
                  Enter Password to update Details:
                </label>
                <input
                  className={`${style.input} w-1/2`}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  disabled={isDisabled}
                  {...register('password', {
                    required: 'Password is required!',
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message?.toString()}</p>
                )}
              </div>
              <div className={`${style.flex_normal} gap-6`}>
                {isDisabled && (
                  <button
                    className={`${style.button} text-blue-500 bg-transparent border border-blue-500 transition-all hover:bg-blue-500 hover:text-white focus:text-white focus:bg-blue-500`}
                    type="button"
                    onClick={handleUpdate}>
                    Update Details
                  </button>
                )}
                {!isDisabled && (
                  <button
                    className={`${style.button} text-red-500 bg-transparent border border-red-500 transition-all hover:bg-red-500 hover:text-white focus:text-white focus:bg-red-500`}
                    onClick={handleCancel}
                    type="button">
                    Cancel
                  </button>
                )}
                {!isDisabled && (
                  <button
                    className={`${style.button} bg-green-500 text-white transition-all hover:bg-green-600 focus:bg-green-600`}
                    type="submit">
                    Save Details
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
