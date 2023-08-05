import loadable from "@loadable/component";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = loadable(() => import("../../components/Auth/login/Login"));
import { useAppSelector } from "../../hooks";
import {
  selectIsUserAuthenticate,
  selectUser,
} from "../../redux/features/User/userSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const isUserAuthenticated = useAppSelector(selectIsUserAuthenticate);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/");
    }
  }, [user]);

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Login />
    </section>
  );
}
