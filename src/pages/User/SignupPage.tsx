import loadable from "@loadable/component";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Signup = loadable(() => import("../../components/Auth/signup/Signup"));
import { useAppSelector } from "../../hooks";

export default function SignupPage() {
  const navigate = useNavigate();

  const { isUserAuthenticate } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isUserAuthenticate) {
      toast.info("You are already logged in");
      navigate("/");
    }
  }, []);
  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Signup />
    </section>
  );
}
