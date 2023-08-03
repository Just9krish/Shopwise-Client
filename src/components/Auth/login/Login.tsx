import loadable from "@loadable/component";
import logo from "../../../assets/shopwise.png";
const PasswordInput = loadable(() => import("../passwordInput/PasswordInput"));
import { useState, ChangeEvent, FormEvent } from "react";
import style from "../../../styles/style";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../constant";

const initialState = {
  email: "",
  password: "",
  isRemeber: false,
};

export default function Login() {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await axios.post(
        API_URL.LOGIN_USER,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      if (res.status) {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload();
      }
    } catch (error: AxiosError | any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src={logo} alt="Shopwise" />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Log in to your account
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
            />
          </div>

          <PasswordInput
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className={`${style.flex_normal} justify-between`}>
            <div className={`${style.flex_normal}`}>
              <input
                type="checkbox"
                name="isRemeber"
                id="remeberme"
                checked={formData.isRemeber}
                onChange={handleChange}
                className="h-4 w-4 text-[#ff7d1a] focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remeberme"
                className="ml-2 block text-sm text-gray-900"
              >
                Remeber me
              </label>
            </div>
            <div className="text-sm">
              <Link
                to="/forgotpassword"
                className="font-medium text-[#ff7d1a] transition-all hover:text-orange-500 focus:text-orange-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <button
            className="w-full group bg-[#ff7d1a] text-white py-2 rounded hover:bg-orange-500 focus:bg-ornage-500 transition-all"
            type="submit"
          >
            Login
          </button>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not have any account?
            <Link
              to="/signup"
              className="font-medium text-[#ff7d1a] transition-all hover:text-orange-500 ml-1 focus:text-orange-500 leading-6"
            >
              Signup
            </Link>
          </p>
          <p className="text-center text-sm text-gray-500">
            Send me back to
            <Link
              to="/"
              className="font-medium text-blue-500 transition-all hover:text-blue-500 ml-1 focus:text-blue-500"
            >
              Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
