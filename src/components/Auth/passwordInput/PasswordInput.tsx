import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IPasswordInputProps } from "../../../Interface";

export default function PasswordInput({
  placeholder,
  value,
  onChange,
  name,
}: IPasswordInputProps) {
  const [isShow, setIsShow] = useState(false);

  function handleClick() {
    setIsShow((prev) => !prev);
  }

  return (
    <div className="relative">
      <label className="sr-only" htmlFor={name}>
        {name}
      </label>
      <input
        type={isShow ? "text" : "password"}
        placeholder={placeholder}
        required
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        minLength={6}
        className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
      />
      <div
        className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-4"
        onClick={handleClick}
      >
        {isShow ? (
          <AiOutlineEyeInvisible color="orange" size={20} />
        ) : (
          <AiOutlineEye color="orange" size={20} />
        )}
      </div>
    </div>
  );
}
