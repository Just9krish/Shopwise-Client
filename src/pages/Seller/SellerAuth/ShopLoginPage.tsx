import loadable from "@loadable/component";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ShopLogin = loadable(() => import("../../../components/shop/ShopLogin"));
import { useAppSelector } from "../../../hooks";

export default function ShopLoginPage() {
  const navigate = useNavigate();

  const { isSellerAuthenticate, isSellerLoading } = useAppSelector(
    (state) => state.seller
  );

  useEffect(() => {
    if (isSellerAuthenticate === true) {
      toast.info("You logged in");
      navigate(`/dashboard`);
    }
  }, [isSellerLoading, isSellerAuthenticate]);

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <ShopLogin />
    </section>
  );
}
