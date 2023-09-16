import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../../assets/shopwise.png';
import { API_URL } from '../../../constant';

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(email: string) {
    try {
      const res = await axios.post(API_URL.FORGOT_USER_PASSWORD, { email });

      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Shopwise" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter email to reset password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            onSubmit(data.email);
          })}
          className="space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    // eslint-disable-next-line no-useless-escape
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: 'Email is not valid',
                  },
                })}
                type="email"
                className="appearance-none block w-full py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 rounded-md focus:outline-none shadow-sm placeholder-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-orange-500"
              />
              {errors.email && (
                <p id="email-error" className="text-red-500">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#ff7d1a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7d1a] transition-all"
            >
              Send Email
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Send me back to{' '}
          <Link
            to="/login"
            className="font-semibold leading-6 text-[#ff7d1a] hover:text-orange-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
