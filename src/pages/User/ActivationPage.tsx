import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constant";

export default function ActivationPage() {
  const { activation_token } = useParams();

  const [error, setError] = useState(false);

  useEffect(() => {
    const activationEmail = async () => {
      try {
        const res = await axios.post(API_URL.ACTIVATE_USER, {
          activation_token,
        });
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    activationEmail();
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {error ? (
        <p>Your Token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
}
