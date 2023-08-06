import loadable from "@loadable/component";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ShopLogin = loadable(() => import("../../../components/shop/ShopLogin"));
import { useAppSelector } from "../../../hooks";
import {
  selectShopAuthenticated,
  selectShopLoading,
} from "../../../redux/features/Shop/shopSlice";

export default function ShopLoginPage() {
  const navigate = useNavigate();

  const isShopAuthenticated = useAppSelector(selectShopAuthenticated);
  const isShopLoading = useAppSelector(selectShopLoading);

  useEffect(() => {
    if (isShopAuthenticated === true) {
      toast.info("You logged in");
      navigate(`/dashboard`);
    }
  }, [isShopLoading, isShopAuthenticated]);

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <ShopLogin />
    </section>
  );
}
