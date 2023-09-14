import loadable from '@loadable/component';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectIsUserAuthenticate } from '../../redux/features/User/userSlice';

const Login = loadable(() => import('../../components/Auth/login/Login'));

export default function LoginPage() {
  const navigate = useNavigate();
  const isUserAuthenticated = useAppSelector(selectIsUserAuthenticate);

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate('/');
    }
  }, [isUserAuthenticated, navigate]);

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Login />
    </section>
  );
}
