import loadable from '@loadable/component';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../hooks';
import { selectShop, selectShopAuthenticated } from '../../../redux/features/Shop/shopSlice';

const CreateShop = loadable(() => import('../../../components/shop/CreateShop'));

export default function CreateShopPage() {
  const navigate = useNavigate();

  const shop = useAppSelector(selectShop);
  const isShopAuthenticated = useAppSelector(selectShopAuthenticated);

  useEffect(() => {
    if (isShopAuthenticated) {
      toast.info('You are already logged in');
      navigate(`/shop/${shop?._id}`);
    }
  }, [isShopAuthenticated, shop, navigate]);

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <CreateShop />
    </section>
  );
}
