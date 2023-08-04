import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../../constant";
import { set, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function UserPasswordChange() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false);
  const [isConfirmNewPasswordShown, setIsConfirmNewPasswordShown] =
    useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handlePasswordChange(
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    try {
      const { data } = await axios.post(
        API_URL.USER_PASSWORD_CHANGE,
        { oldPassword, newPassword, confirmNewPassword },
        { withCredentials: true }
      );

      toast.success(data.message);
      reset();
    } catch (error: AxiosError | any) {
      if (error.response) {
        toast.error(error.response);
      } else {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="w-full px-5">
      <h1 className="text-[#000000ba] pb-2 text-2xl">Change Password</h1>

      <div className="mt-8">
        <p className="mx-auto w-full max-w-xl text-gray-700 mb-6 text-center">
          Please enter your old password as it required to change your password,
          then enter your new password and confirm the new password.
        </p>
        <form
          className="space-y-4 w-full max-w-xl mx-auto"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            handlePasswordChange(
              data.oldPassword,
              data.newPassword,
              data.confirmNewPassword
            );
          })}
        >
          <div>
            <label className="sr-only" htmlFor="password">
              Old Password
            </label>
            <div className="relative">
              <input
                type={isPasswordShown ? "text" : "password"}
                className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
                {...register("oldPassword", {
                  required: "Old password is requried!",
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
            {errors?.oldPassword && (
              <span className="text-red-500 text-sm">
                {errors?.oldPassword.message?.toString()}
              </span>
            )}
          </div>

          <div>
            <label className="sr-only" htmlFor="password">
              New Password
            </label>
            <div className="relative">
              <input
                type={isNewPasswordShown ? "text" : "password"}
                className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
                {...register("newPassword", {
                  required: "New password is requried!",
                })}
              />
              <div
                className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-4"
                onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
              >
                {isNewPasswordShown ? (
                  <AiOutlineEyeInvisible color="orange" size={20} />
                ) : (
                  <AiOutlineEye color="orange" size={20} />
                )}
              </div>
            </div>
            {errors?.newPassword && (
              <span className="text-red-500 text-sm">
                {errors?.newPassword.message?.toString()}
              </span>
            )}
          </div>

          <div>
            <label className="sr-only" htmlFor="password">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={isConfirmNewPasswordShown ? "text" : "password"}
                className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
                {...register("confirmNewPassword", {
                  required: "Confrim new password is requried!",
                })}
              />
              <div
                className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-4"
                onClick={() =>
                  setIsConfirmNewPasswordShown(!isConfirmNewPasswordShown)
                }
              >
                {isConfirmNewPasswordShown ? (
                  <AiOutlineEyeInvisible color="orange" size={20} />
                ) : (
                  <AiOutlineEye color="orange" size={20} />
                )}
              </div>
            </div>
            {errors?.newPassword && (
              <span className="text-red-500 text-sm">
                {errors?.newPassword.message?.toString()}
              </span>
            )}
          </div>

          <div>
            <button
              className={`bg-[#28a745] text-white rounded py-1.5 px-4 hover:shadow transition-all hover:bg-green-600`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
