import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import logo from "../../../assets/shopwise.png";
import loadable from "@loadable/component";
const PasswordInput = loadable(() => import("../passwordInput/PasswordInput"));
import style from "../../../styles/style";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ICustomResponse } from "../../../Interface";
import { API_URL } from "../../../constant";

const initialState = {
  file: null as File | null,
  fullname: "",
  email: "",
  password: "",
};

export default function Signup() {
  const [formData, setFormData] = useState(initialState);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, files } = event.target;

    if (type === "file" && files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files?.[0] || null,
      }));
      // Create a preview of the uploaded image and display it in the UI
      const reader = new FileReader();
      reader.onload = () => {
        const imgPreview = document.getElementById(
          "img-preview"
        ) as HTMLImageElement;
        if (imgPreview) {
          imgPreview.src = reader.result as string;
        }
      };
      reader.readAsDataURL(files?.[0]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { file, fullname, email, password } = formData;

    const newFrom = new FormData();

    newFrom.append("name", fullname);
    newFrom.append("email", email);
    newFrom.append("password", password);
    if (file) {
      newFrom.append("file", file);
    }

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post<ICustomResponse>(
        API_URL.REGISTER_USER,
        newFrom,
        config
      );
      toast(res.data.message);
      setFormData(initialState);
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src={logo} alt="Shopwise" />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register as a new user
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className={`${style.flex_normal} justify-center flex-col`}>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="file"
              id="file"
              hidden
              required
            />
            <img
              id="img-preview"
              src="https://i.ibb.co/kK2JV13/Png-Item-1503945.png"
              className="h-40 w-40 rounded-full shadow-sm"
              alt="Profile Preview"
              loading="lazy"
            />
            <label
              htmlFor="file"
              className="text-[#ff7d1a] mt-2 cursor-pointer hover:text-orange-500 focus:text-orange-500"
            >
              Edit profile picture
            </label>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              required
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
            />
          </div>
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

          <button
            className="flex w-full justify-center rounded-md bg-[#ff7d1a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            type="submit"
          >
            Submit
          </button>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="font-semibold leading-6 text-[#ff7d1a] hover:text-orange-500 ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
