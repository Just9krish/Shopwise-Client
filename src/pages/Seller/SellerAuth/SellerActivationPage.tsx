import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../constant";
import axios from "axios";
import { AiOutlineReload } from "react-icons/ai";

export default function SellerActivationPage() {
  const { activation_token } = useParams();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const activateShop = async () => {
    try {
      const response = await axios.post(
        API_URL.ACTIVATE_SHOP,
        {
          verificationToken: activation_token,
        },
        { withCredentials: true }
      );

      setMessage(response.data.message);
    } catch (error: any) {
      setError(true);
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    activateShop();
  }, [activation_token]);

  const handleRetryClick = () => {
    setIsLoading(true);
    activateShop(); // Call your activation function again
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg max-w-sm">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Shop Verification
          </h2>
          {isLoading ? (
            <p className="text-gray-600">Verifying your shop...</p>
          ) : (
            <p
              className={`${
                error ? "text-red-500" : "text-green-500"
              } text-lg mb-6`}
            >
              {message}
            </p>
          )}
        </div>
        <div className="mt-4 space-x-4">
          {error ? (
            <button
              className="w-full px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 flex items-center justify-center"
              onClick={handleRetryClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <AiOutlineReload className="animate-spin mr-2" />
              ) : (
                "Retry"
              )}
            </button>
          ) : (
            <Link
              to="/dashboard"
              className="w-full px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 flex items-center justify-center"
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
