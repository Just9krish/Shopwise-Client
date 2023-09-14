import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { useAppSelector } from '../hooks';
import { selectShopAuthenticated, selectShopLoading } from '../redux/features/Shop/shopSlice';

interface IProps {
  children: JSX.Element;
}

function SellerProtectedRoute({ children }: IProps): JSX.Element {
  const isShopLoading = useAppSelector(selectShopLoading);
  const isShopAuthenticated = useAppSelector(selectShopAuthenticated);

  if (isShopLoading) {
    return <Loader />;
  }

  if (!isShopAuthenticated) {
    return <Navigate to="/login-shop" replace />;
  }

  return children;
}
export default SellerProtectedRoute;
