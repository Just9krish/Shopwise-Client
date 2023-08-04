import { useForm } from "react-hook-form";
import logo from "../../../assets/shopwise.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Shopwise" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {success ? "Password reset successfully" : "Reset your password"}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {!success ? (
          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              setSuccess(true);
            })}
          >
            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="password"
              >
                New Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  placeholder="Enter a new password"
                  type={isPasswordShown ? "text" : "password"}
                  className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
                  {...register("password", {
                    required: "Password is requried!",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message:
                        "Password requirements:\n\n" +
                        "- At least 8 characters\n" +
                        "- Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n" +
                        "- Can contain special characters",
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
                <span className="text-red-500 text-sm">
                  {errors?.password.message?.toString()}
                </span>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="password"
              >
                Confirm New Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  placeholder="Confirm your new password"
                  type={isConfirmPasswordShown ? "text" : "password"}
                  className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
                  {...register("confirmPassword", {
                    required: "Confirm password is requied!",
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "Password is not matching!",
                  })}
                />
                <div
                  className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-4"
                  onClick={() =>
                    setIsConfirmPasswordShown(!isConfirmPasswordShown)
                  }
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
              className="flex w-full justify-center rounded-md bg-[#ff7d1a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              type="submit"
            >
              Reset my password
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <p className="text-[#333B54] text-center">
              You can now use your new password to login to your account!🙌
            </p>
            <Link
              to="/login"
              className="flex w-full justify-center rounded-md bg-[#ff7d1a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              type="button"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
